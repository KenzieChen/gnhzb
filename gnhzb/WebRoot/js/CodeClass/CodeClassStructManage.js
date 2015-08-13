function createCodeClassStructManage(){
	//类别导航
	var LbdhPanel =Edo.create({          
            type: 'ct',
            width: '220',
            height: '100%',
            collapseProperty: 'width',
            enableCollapse: true,
            splitRegion: 'west',
            splitPlace: 'after',
            children: [
                {
                    type: 'panel',
                    title:'类别导航',
                    width: '100%',
                    height: '100%',
                    padding:[0,0,0,0],
		            titlebar:[
                        {
                            cls:'e-titlebar-toggle-west',
                            icon: 'button',
                            onclick: function(e){
                                this.parent.owner.parent.toggle();
                            }
                        }
                    ],
                 	children:[
                 		{
                 			type:'tree',
                 			id:'LbdhTree',
                 			width:'100%',
                 			height:'100%',
                 			autoColumns :true,
                 			horizontalLine : false,
                 			headerVisible :false,
                 			cls: 'e-tree-allow',
                 			columns:[
                 				{header:'分类结构',dataIndex:'text'}                 				
                 			],
                 			onselectionchange:function(e){
                 				if(e.selected.text=="分类类别"){
                 					CodeClassStructManageLock.set('enable',false);
                 					return;
                 				}
                 				var fljgTreeData = e.selected;
                 				if(fljgTreeData.leaf == 0){
                 					fljgTreeData.__viewicon = true;
                 					fljgTreeData.expanded = false;
                 				}else{
                 					fljgTreeData.icon='ui-module';
                 				}
                 				FljgTree.set('data',fljgTreeData);
                 				var lock = true;
                 				//1表示解除锁定，默认情况下是锁定状态0
                 				if(fljgTreeData.lockTree == 1){
                 					lock = false;
                 				}
                 				CodeClassStructManageLock.set('checked',lock);
                 				CodeClassStructManageLock.set('enable',true);
                 			}
                 		}
                 	]
              
                }
            ]	
	});
	/*
	var lbdhTreeData = cims201.utils
			.getData('classificationtree/classification-tree!getClassStruct.action');
	for ( var i = 0; i < lbdhTreeData.length; i++) {
		lbdhTreeData[i].icon = 'e-tree-folder';
	}
	LbdhTree.set('data', [ {
		text : '分类类别',
		icon : 'e-tree-folder',
		expanded : true,
		children : lbdhTreeData
	} ]);*/
	
	//luweijiang
	function codeClassStructManageTask(classficationTreeId){
		var lbdhTreeData =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});
		//console.log(lbdhTreeData);
		for(var i =0;i<lbdhTreeData.length;i++){
			lbdhTreeData[i].icon='e-tree-folder';
		}
		LbdhTree.set('data',
				[{text:'分类类别',icon:'e-tree-folder',expanded:true,children:lbdhTreeData}]
		);
		
	}
	//分类结构
	var FljgPanel = Edo.create({		
            type: 'panel',
            title:'分类结构',
            width: '100%',
            height: '100%',
            padding:[0,0,0,0],
            layout:'vertical',
            verticalGap :0,
            children:[
            	{
            		type:'box',width: '100%',height: '30',cls: 'e-toolbar',padding:[0,0,0,0],
            		layout:'horizontal',
            		children:[
            			{type:'button',text:'全部收缩',
            				onclick:function(e){
            					if(FljgTree.data.source[0]){
            						FljgTree.data.collapse(FljgTree.data.source[0],true);
            					}		            					  
            				}
            			},
            			{type:'button',id:'CodeClassStructManageAdd',text:'添加子类',enable:false},
            			{type:'button',id:'CodeClassStructManageDel',text:' 删除类',enable:false},
            			{type:'button',id:'CodeClassStructManageUpdate',text:'修改分类信息',enable:false},
            			{type:'space',width:'100%'},
            			{type:'label',text:"<span style='color:red'>锁定：</span>"},
            			{type:'check',id:'CodeClassStructManageLock',enable:false}
            		]
            	},
            	{
            		type:'tree',
            		id:'FljgTree',
            		horizontalLine : false,
                 	headerVisible :false,
                 	autoColumns :true,
            		cls: 'e-tree-allow',
            		width:'100%',
            		height:'100%',
            		columns:[
            			{header:'分类结构',dataIndex:'text'}
            		],
            		onbeforetoggle: function(e){            			
                 		var row = e.record;
			            var dataTree = this.data;
			            if(!row.children || row.children.length == 0){
			                //this.addItemCls(row, 'tree-node-loading');
			                Edo.util.Ajax.request({
			                    url: 'classificationtree/classification-tree!getChildrenNode.action?pid='+ row.id,
			                    //defer: 500,
			                    onSuccess: function(text){
			                        var data = Edo.util.Json.decode(text);			                        
			                        dataTree.beginChange();
			                        if(!(data instanceof Array)) data = [data]; //必定是数组
			                        for(var i=0;i<data.length;i++){
			                        	if(data[i].leaf==0){
			                        		data[i].__viewicon=true,
								    		data[i].icon='e-tree-folder',
								    		data[i].expanded=false;		
			                        	}else{
			                        		data[i].icon='ui-module';
			                        	}
			                        	dataTree.insert(i, data[i], row);
			                        };                    
			                        dataTree.endChange();    
			                    }
			                });
			            }
			            return !!row.children;
                 	},
            		onselectionchange:function(e){
//            			console.log(e);            点击展开时调用了两次，为什么？
            			if(e.selected){
            				CodeClassStructManageAdd.set("enable",true);
            				CodeClassStructManageDel.set("enable",true);
            				CodeClassStructManageUpdate.set("enable",true);
            				FlmclForm.setForm(e.selected);
            			}else{
            				CodeClassStructManageAdd.set("enable",false);
            				CodeClassStructManageDel.set("enable",false);
            				CodeClassStructManageUpdate.set("enable",false);
            			}
            			
         			}

            	}
            ]
        
	});
	
	CodeClassStructManageAdd.on("click",function(e){
		var form =showCodeClassStructAddChildForm();
		form.reset();
		form.setForm({pid:FljgTree.selected.id});
		
	});
	
	CodeClassStructManageDel.on("click",function(e){
		if(FljgTree.selected.leaf==0){
			Edo.MessageBox.alert('提示','请先删除其子类后再删除该类');
			return;
		};
		Edo.MessageBox.confirm('提示','确定删除该节点？',function(action){
			if(action=="yes"){
				Edo.util.Ajax.request({
					url:'classificationtree/classification-tree!deleteTreeNode.action?id='+FljgTree.selected.id,
					onSuccess:function(text){
						if("删除子节点成功！"==text)	{
							Edo.MessageBox.alert("提示",text);
							var row = FljgTree.selected; 					                    	
					    	var dataTree = FljgTree.data;
					    	var parent=dataTree.findParent(row);
							Edo.util.Ajax.request({
			                    url: 'classificationtree/classification-tree!getChildrenNode.action?pid='+ parent.id,
			                    onSuccess: function(text){
			                        var data = Edo.util.Json.decode(text);		
			                        dataTree.beginChange();
			                        dataTree.removeRange (dataTree.getChildren(parent,true));
			                        if(data.length==0){
			                        	parent.icon='ui-module';
			                        }else{
			                        	if(!(data instanceof Array)) data = [data]; //必定是数组
				                        for(var i=0;i<data.length;i++){
				                        	if(data[i].leaf==0){
				                        		data[i].__viewicon=true,
									    		data[i].icon='e-tree-folder',
									    		data[i].expanded=false;			                       		
				                        	}else{
				                        		data[i].__viewicon=false,
				                        		data[i].icon='ui-module';
				                        	}
				                        	dataTree.insert(i, data[i], parent);
				                        };  
			                        }
			                                          
			                        dataTree.endChange();    
			                    },
			                    onFail:function(code){
			                    	alert(code);
			                    }
			                });	
						}else{
							Edo.MessageBox.alert("提示",text);
						}	
						
					},
					onFail:function(code){
						alert(code);
					}
				});
			}
		});

	});
	
	CodeClassStructManageUpdate.on("click",function(e){
		var form =showCodeClassStructEditDesForm();
		var data =FljgTree.selected;
		form.setForm(data);
	});
	
	CodeClassStructManageLock.on("checkedchange",function(e){
		console.log(LbdhTree.selected);
		var lock = LbdhTree.selected.lockTree;
		var treeId = LbdhTree.selected.id;
		//点击的时候如果分类树的状态和checkbox的状态一致，那么就不跳出文本框
		if((e.checked && lock== 0)||(!e.checked && lock == 1)){
			return;
		}
		//解锁
		if(!e.checked && lock == 0){
			Edo.MessageBox.confirm("提示","解除锁定之后，该分类树可以同步到设计资源集成模块,是否解除锁定？",function(ex){
				if(ex == 'yes' ){
					console.log(treeId);
					console.log('添加后台执行动作');
					 Edo.util.Ajax.request({
	                    url: 'classificationtree/classification-tree!changeLock.action?id='+ treeId+'&lock=1',
	                    //defer: 500,
	                    onSuccess:function(e){
	                    	var selected = LbdhTree.selected;
	                    	selected.lockTree = 1;
	                    	LbdhTree.set('selected',selected);
	                    },
	                    onFail: function(code){
					        //code是网络交互错误码,如404,500之类
					        alert(code);
					    }
		             });
				}else{
					CodeClassStructManageLock.set('checked',true);
				}
			});
		}
		//锁定
		if(e.checked && lock == 1){
			Edo.MessageBox.confirm("提示","锁定之后，禁止该分类树同步到设计资源集成模块,是否锁定？",function(ex){
				if(ex == 'yes'){
					console.log(treeId);
					console.log('添加后台执行动作');
					Edo.util.Ajax.request({
	                    url: 'classificationtree/classification-tree!changeLock.action?id='+ treeId+'&lock=0',
	                    //defer: 500,
	                    onSuccess:function(e){
	                    	var selected = LbdhTree.selected;
	                    	selected.lockTree = 0;
	                    	LbdhTree.set('selected',selected);
	                    },
	                    onFail: function(code){
					        //code是网络交互错误码,如404,500之类
					        alert(code);
					    }
		             });
				}else{
					CodeClassStructManageLock.set('checked',false);
				}
			});
		}
	});
	//分类明细栏
	var FlmclForm = Edo.create({             
            type: 'ct',
            width: '220',
            height: '100%',
            collapseProperty: 'width',
            enableCollapse: true,
            splitRegion: 'east',
            splitPlace: 'before',
            children: [
                {
                    type: 'panel',
                    id:'FlmclForm',
                    title:'分类明细栏',
                    width: '100%',
                    height: '100%',
                    layout:'vertical',
                    padding:[0,0,0,0],
                    titlebar:[
                        {
                            cls:'e-titlebar-toggle-east',
                            icon: 'button',
                            onclick: function(e){
                                this.parent.owner.parent.toggle();
                            }
                        }
                    ],
                    children:[
                    	{
		            		type:'box',width: '100%',height: '30',cls: 'e-toolbar',padding:[0,0,0,0],
		            		children:[
		            			{type:'button',id:'updateCurrentCode',text:'修改当前码段编码'}
		            		]
		            	},
		            	{type:'label',text:'&nbsp&nbsp&nbsp分类名称：'},
		            	{type: 'formitem',labelWidth:0,padding:[0,0,0,16],children: [
			                {name: 'text', type: 'text',width:180}
			            ]},
			            {type:'label',text:'&nbsp&nbsp&nbsp分类码：'},
			            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
			                {name: 'code', type: 'text',width:180}
			            ]},
			            {type:'label',text:'&nbsp&nbsp&nbsp所属大类代号：'},
			            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
			                {name: 'classCode', type: 'text',width:180}
			            ]},
			             {type:'label',text:'&nbsp&nbsp&nbsp分类信息：'},
			            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
			                {name: 'classDes', type: 'textarea',width: 180, height: 120}
			            ]}
                    ]      
                }
            ]
	});
	
	updateCurrentCode.on('click',function(e){
	
		if(!FljgTree.selected){
			Edo.MessageBox.alert('提示','请先选中分类节点！');
			return;
		}else if(FljgTree.selected.leaf==0){
			Edo.MessageBox.alert('提示','系统只支持叶子节点的分类码修改！');
			return;
		}

		var code =FljgTree.selected.code;
		var codeArray =code.split('-');
		if(codeArray.length<2){
			Edo.MessageBox.alert('提示','系统禁止对码首字段的修改！');
			return;
		}
		var currentCode =codeArray[codeArray.length-1];
		
		var form =showUpdateCurrentCodeForm();

		form.setForm({
			id:FljgTree.selected.id,
			code:code,
			currentCode:currentCode
		});

	});
	
	function showCodeClassStructAddChildForm(){
		
	    if(!Edo.get('codeClassStructAddChildForm')) {
	        Edo.create({
	            id: 'codeClassStructAddChildForm',            
	            type: 'window',title: '添加子分类节点',
	            render: document.body,
	            width:330,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
	                    }
	                }
	            ],
	            children: [
	            	{type:'formitem',visible:false,children:[{type:'text',name:'pid'}]},
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'80',label: '分类名称：',
	                    layout:'horizontal',
	                    horizontalGap:'5',
	                    children:[
	                    	{	type:'text',
	                    		name:'text',
								width:'130',
							    readOnly : true,
							    valid :nullRegex
						    },
						    {
						    	type:'button',
						    	text:'选择分类名称',
						    	onclick:function(e){
						    		showFindNameWin();
						    		Edo.util.Ajax.request({
									    url: 'namestandard/name-standard!getAll.action',
									    type: 'post',
									    onSuccess: function(text){	
									    	var o = Edo.util.Json.decode(text);
									        findNameWinTable.set('data',o);
									    },
									    onFail: function(code){
									        //code是网络交互错误码,如404,500之类
									        alert(code);
									    }
									});
						    	}
						    }
	                    		
	                   ]
	                },
	                {
	                    type: 'formitem', padding: [0,10,10, 0],label: '分类信息:<br>(不超过200字)',labelWidth :'80',
	                    layout:'horizontal',
	                    children:[
	                        {	
	                        	type: 'textarea',
	                        	name : 'classDes',
	                        	width:'200',
	                        	height:'100'                   	
	                        },
	                        {type:'space',width:'1'}
	                        
	                    ]
	                },
	                //下方按钮
	                {
	                	type:'ct',
	                	layout:'horizontal',
	                	children:[
	                		{type:'space',width:'40'},
	                		{type:'button',text:'提交并继续添加'},
	                		{type:'space',width:'10'},
	                		{type:'button',text:'提交',
	                			onclick:function(e){
	                				if(codeClassStructAddChildForm.valid()){
	                					var formData=codeClassStructAddChildForm.getForm();
		                					Edo.util.Ajax.request({
		                						url:'classificationtree/classification-tree!insertTreeNode.action',
		                						type:'post',
		                						params:formData,
		                						onSuccess:function(text){								
		                							if("添加子节点成功！"==text){
		                								Edo.MessageBox.alert("提示",text);
		                								Edo.util.Ajax.request({
										                    url: 'classificationtree/classification-tree!getChildrenNode.action?pid='+formData.pid,
										                    onSuccess: function(text){
										                    	var row = FljgTree.selected; 	
										                    	row.icon="e-tree-folder";
										                    	var dataTree = FljgTree.data;
										                        var data = Edo.util.Json.decode(text);			                        
										                        dataTree.beginChange();
										                        dataTree.removeRange (dataTree.getChildren(row,true));
										                        if(!(data instanceof Array)) data = [data]; //必定是数组
										                        for(var i=0;i<data.length;i++){
										                        	if(data[i].leaf==0){
										                        		data[i].__viewicon=true,
															    		data[i].icon='e-tree-folder',	  //data[i].icon='ui-module',
															    		data[i].expanded=false;			                       		
										                        	}else{
										                        		data[i].icon='ui-module';
										                        	}
										                        	
										                        	dataTree.insert(i, data[i], row);
										                        };                    
										                        dataTree.endChange();    
										                    },
										                    onFail:function(code){
										                    	alert(code);
										                    }
										                });	
		                							}else{
		                								Edo.MessageBox.alert("提示",text);
		                							}       							
		                							codeClassStructAddChildForm.hide();
		                						},
		                						onFail:function(code){
		                							alert(code);
		                						}
		                					});
		                				
	                				}		
	                			}
	                		},
	                		{type:'space',width:'10'},
	                		{type:'button',text:'取消',
	                			onclick:function(e){
	                				codeClassStructAddChildForm.reset();
	                				codeClassStructAddChildForm.hide();
	                			}
	                		}
	                	]
	                }
	            ]
	        });
	    };
	    codeClassStructAddChildForm.show('center', 'middle', true);
	    return codeClassStructAddChildForm;
	};
	
	function showCodeClassStructEditDesForm(){
		if(!Edo.get('codeClassStructEditDesForm')){
			Edo.create({
				id:'codeClassStructEditDesForm',
				type:'window',
				title:'修改分类信息',
				render:document.body,
				width:400,
				padding:[0,20,0,20],
				titlebar:[
					{
						cls:'e-titlebar-close',
						onclick:function(e){
							this.parent.owner.hide();
						}
					}
				],
				children:[
					{type:'formitem',visible:false,children:[
						{type:'text',name:'id'}
					]},
					{type:'formitem',label:'分类码：',labelWidth:'80',width:'100%',padding:[20,0,0,0],children:[
						{type:'text',name :'code',width:'100%',readOnly:true}
					]},
					{type:'formitem',label:'分类名称：',labelWidth:'80',width:'100%',children:[
						{type:'text',name :'text',width:'100%',readOnly:true}
					]},
					{type:'formitem',label:'分类信息：<br>（不超过200字）',labelWidth:'80',width:'100%',children:[
						{type:'textarea',name :'classDes',width:'100%',height:'150'}
					]},
					{type:'box',width:'100%',layout:'horizontal',border:[0,0,0,0],padding:[20,0,10,0],children:[
						{type:'space',width:'140'},
						{type:'button',text:'保存',
							onclick:function(e){
								if(codeClassStructEditDesForm.valid()){
									var o =codeClassStructEditDesForm.getForm();
									Edo.util.Ajax.request({
										url:'classificationtree/classification-tree!updateClassDes.action',
										type:'post',
										params:o,
										onSuccess:function(text){
											Edo.MessageBox.alert("提示",text);
											FljgTree.selected.classDes=o.classDes;
											FlmclForm.setForm(FljgTree.selected);
											codeClassStructEditDesForm.hide();
										},
										onFail:function(code){
											alert("更新失败"+code);
										}
									});
								}
							}
							
						},
						{type:'space',width:'30'},
						{type:'button',text:'取消',
							onclick:function(e){
								codeClassStructEditDesForm.reset();
								codeClassStructEditDesForm.hide();
							}
						}
						
					]}
				]
			});
		};
		codeClassStructEditDesForm.show('center','middle',true);
		return codeClassStructEditDesForm;
	}
	
	function showUpdateCurrentCodeForm(){
		if(!Edo.get('updateCurrentCodeForm')){
			Edo.create({
				id:'updateCurrentCodeForm',
				type:'window',
				title:'修改当前分类码段',
				render:document.body,
				width:300,
				padding:[0,20,0,20],
				titlebar:[
					{
						cls:'e-titlebar-close',
						onclick:function(e){
							this.parent.owner.hide();
						}
					}
				],
				children:[
					{type:'formitem',visible:false,children:[
						{type:'text',name:'id'}
					]},
					 {type:'label',text:'&nbsp&nbsp当前分类码：'},
					{type:'formitem',labelWidth:'0',width:'100%',padding:[0,0,0,0],children:[
						{type:'text',name :'code',width:'100%',readOnly:true}
					]},
					{type:'label',text:'&nbsp&nbsp修改：'},
					{type:'formitem',labelWidth:'0',width:'100%',children:[
						{type:'text',name :'currentCode',width:'100%',valid:nullRegex2}
					]},
					{type:'box',width:'100%',layout:'horizontal',border:[0,0,0,0],padding:[20,0,10,0],children:[
						{type:'space',width:'70'},
						{type:'button',text:'保存',
							onclick:function(e){
								if(updateCurrentCodeForm.valid()){
									var o =updateCurrentCodeForm.getForm();
									var codeArray=o.code.split('-');
									codeArray[codeArray.length-1]=o.currentCode;		
									var newCodeArray =codeArray.join('-');
									Edo.util.Ajax.request({
										url:'classificationtree/classification-tree!updateCode.action',
										type:'post',
										params:o,
										onSuccess:function(text){
											if("分类码修改成功！"==text){
												Edo.MessageBox.alert("提示",text);
												FljgTree.selected.code=newCodeArray;
												FlmclForm.setForm(FljgTree.selected);
												updateCurrentCodeForm.hide();
											}else{
												Edo.MessageBox.alert("提示",text);
											}
											
										},
										onFail:function(code){
											alert("更新失败"+code);
										}
									});
								}
							}
							
						},
						{type:'space',width:'30'},
						{type:'button',text:'取消',
							onclick:function(e){
								updateCurrentCodeForm.reset();
								updateCurrentCodeForm.hide();
							}
						}
						
					]}
				]
			});
		};
		updateCurrentCodeForm.show('center','middle',true);
		return updateCurrentCodeForm;
	}
	
	function showFindNameWin(){
		
	    if(!Edo.get('findNameWin')) {
	        Edo.create({
	            id: 'findNameWin',            
	            type: 'window',title: '选择名称',
	            render: document.body,
	            width:600,
	            padding:[0,0,0,0],
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
	                    }
	                }
	            ],
	            children: [
	            	{type:'group',layout:'horizontal',width:'100%',cls: 'e-toolbar',children:[
	            		{type:'label',text:'中文名称：'},
	            		{type:'text',id:"chineseNameSearch",width:'100'},
	            		{type:'button',text:'检索',
	            			onclick:function(e){
	            				//o为一行对象，i 为索引，m 为所有数据
	            				var nameSearch=chineseNameSearch.text;
	            				if(""==nameSearch ||!nameSearch){
	            					Edo.MessageBox.alert("提示","请输入中文名称");
	            					return;
	            				}
	            				var starStr =nameSearch.charAt(0);
	            				var flag=0;
	            				findNameWinTable.data.filter(function(o,i,m){
	            					for(var i=0;i<o.chinese.length;i++){
	            						if(o.chinese.charAt(i)==starStr &&
	            							o.chinese.substring(i).substring(0,nameSearch.length)==nameSearch){
	            								flag=1;
	            						}
	            					}
	            					if(flag==1){
	            						flag=0;
	            						return true;
	            					}else{
	            						flag=0;
	            						return false;
	            					}
	            				});
	            			}
	            		},
	            		{type:'button',text:'清除',
	            			onclick:function(e){
	            				findNameWinTable.data.clearFilter(); 
	            			}
	            		},{type:'space',width:'100%'},
	            		{
	            			type:'label',text:'<span style="color:red;">双击选择名称</span>'
	            		}
	            	]},
	            	{
	            		type:'table',
	            		id:'findNameWinTable',
	            		width:'100%',height : 500,
	            		autoColumns:true,
	            		rowSelectMode: 'singel',
	            		columns:[
	            			{
			                    headerText: '',
			                    align: 'center',
			                    width: 25,                        
			                    enableSort: false,
			                    enableDragDrop: false,
			                    enableColumnDragDrop: false,
			                    style:  'cursor:move;',
			                    renderer: function(v, r, c, i, data, t){
			                        //return '<span style="padding:2px;padding-left:6px;padding-right:6px;line-height:20px;">'+i+'</span>';
			                        //return '<div style="width:25px;height:22px;text-align:center;line-height:20px;">'+(i+1)+'</div>';
			                        return i+1;
			                    }
			                },                
			                Edo.lists.Table.createMultiColumn(),
	            			{header:'ID',id :'id',dataIndex:'id',visible:false},
	            			{header:'中文名称',id : 'chinese',dataIndex:'chinese'},
	            			{header:'英文名称',id : 'english',dataIndex:'english'},
	            			{header:'备注',id : 'comments',dataIndex:'comments'}
	            		],
	            		onbodydblclick:function(e){
	            			codeClassStructAddChildForm.children[1].children[0].set('text',e.item.chinese);
	            			findNameWin.hide();
	            		}
	            	}
	            ]
	        });
	    };
	    findNameWin.show('center', 'middle', true);
	    return findNameWin;
	};
	
	
	function nullRegex(){
		if(codeClassStructAddChildForm.children[1].children[0].text==""){
			return "分类名称不能为空";
		}
		return true;
	}
	function nullRegex2(){
		if(updateCurrentCodeForm.children[4].children[0].text==""){
			return "当前码段不能为空";
		}
		var codeArray =FljgTree.selected.code.split('-');
		var len1= codeArray[codeArray.length-1].length;
		var len2= updateCurrentCodeForm.children[4].children[0].text.length;
		if(len1 != len2){
			return "修改码段的长度违反了编码规则";
		}
		return true;
	}
	this.getLbdhPanel = function(){
		return LbdhPanel;
	};
	
	this.getFljgPanel = function(){
		return FljgPanel;
	};
	
	this.getFlmclForm = function(){
		return FlmclForm;
	};
}