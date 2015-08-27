function createPlatformStruct(){
	//luweijiang
	function platformStructlbdhTreeTask(classficationTreeId){
		var lbdhTreeData =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});
		for(var i =0;i<lbdhTreeData.length;i++){
			lbdhTreeData[i].icon='e-tree-folder';
		}
		return lbdhTreeData;
	}
	var lbdhTreeData=null;
	var inputparam=new Array();
	var outputparam=new Array();
	this.initinputparam=function(param){
		inputparam=param;
		return inputparam;
	}
	this.initresultparam=function(param){
		outputparam=param;
		return outputparam;

	}
	this.submitResult=function(){
		isexist=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'platstructtreeid'){
				for(var j=0;j<outputparam.length;j++){
					if(outputparam[j].name == 'platformstructplatformstructtreeid'){
						outputparam[j].value=inputparam[i].value;
						isexist=true;
						break;
					}
				}
				}
				break;
			}
		if(!isexist){
			Edo.MessageBox.alert('提示','对应的平台结构树不存在');
			return null;
		}
		return outputparam;
	}
	this.inittask=function(){
		var classificationtreeid=null;
		var platstructtreeid=null;
		var isexist1=false;
		var isexist2=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'classificationtreeid'){
				isexist1=true;
				classificationtreeid=inputparam[i].value;
				break;
			}
		}
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'platstructtreeid'){
				isexist2=true;
				platstructtreeid=inputparam[i].value;
				break;
			}
		}
		
		if(isexist1){
			var data =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classificationtreeid});
			if(data.isSuccess == '1'){
				var resultdata=data.result;
				for(var i =0;i<resultdata.length;i++){
					resultdata[i].icon='e-tree-folder';
				}
				lbdhTreeData=resultdata;
			}
			Edo.MessageBox.alert('提示',data.message);
		}
		if(isexist2){
			var data =cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStructById.action',{id:platstructtreeid});
			if(data.isSuccess == '1'){
				platformStruct_combo.set('data',data.result);
			}
			Edo.MessageBox.alert('提示',data.message);
		}
		if(!isexist1 || !isexist2){
			Edo.MessageBox.alert('提示',"查询前置任务输出结果出错，请联系管理员！");
		}
	}

	var panel =Edo.create({
			type: 'panel', id:'', title:'<h3><font color="blue">建立分类结构</font></h3>', padding: [0,0,0,0],
			width:'100%', height:'100%', verticalGap: 0,
	    	children:[
				{
        		    type: 'group',
        		    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
			            {type:'label',text:'请选择未建立结构的产品平台:'},
					    {	type:'combo', id:'platformStruct_combo',
							width:'150',
							readOnly : true,
							valueField: 'id',
						    displayField: 'classText',			    
						    onselectionchange: function(e){	
						    	platformStruct_addNode.set("enable",true);
						    	platformStruct_deleteNode.set("enable",true);
						    	platformStruct_checkStruct.set("enable",true);
						    	platformStruct_updateNode.set("enable",true);
						    	
						    	if(e.selectedItem.leaf==0){
						    		e.selectedItem.__viewicon=true;
						    		e.selectedItem.expanded=false;
						    		e.selectedItem.icon='e-tree-folder';
						    	}else{
						    		e.selectedItem.icon='e-tree-folder';
						    	}
						    	//console.log(e.selectedItem);
						    	platformStruct_gridtree.set('data',e.selectedItem);
						    	
						    }
				    	},
						{type: 'split'},
				        {type: 'button',id:'platformStruct_addNode',text: '添加子结构',enable:false},
						{type: 'split'},
						{type: 'button',id:'platformStruct_deleteNode',text: '删除子结构',enable:false},
				        {type: 'split'},
				        {type: 'button',id:'platformStruct_updateNode',text: '修改属性',enable:false},
				        {type: 'split'},
				        {type: 'button',id:'platformStruct_checkStruct',text: '提交审核',enable:false}
				    ]
	        	},
	      		{
				    id: 'platformStruct_gridtree', type: 'tree', width: '100%', height: '100%',autoColumns: true,
				    horizontalLine : false,verticalLine : false,
				    padding:[0,0,0,0],rowSelectMode : 'single',
				    columns:[
				        {dataIndex:'id',visible:false},
				        { header: '模块名称', dataIndex: 'classText', headerAlign: 'center',align: 'center'},
				        { header: '模块编码', dataIndex: 'classCode', headerAlign: 'center',align: 'center' },
				        { header: '实例个数', dataIndex: 'partsCount', headerAlign: 'center',align: 'center'},
				        { header: '是否唯一值', dataIndex: 'onlyone', headerAlign: 'center',align: 'center',
				        	renderer:function(value,record){
				        		if(record.classCode==null){
				        			return "";
				        		}
				        		if(value==1){
				        			return '<span style="color:blue">是</span>';
				        		}else{
				        			return '<span style="color:red">否</span>';
				        		}
				        }},
				        { header: '是否必选项', enableSort: true, dataIndex: 'ismust', headerAlign: 'center',align: 'center',
				        	renderer:function(value,record){
				        		if(record.classCode==null){
				        			return "";
				        		}
				        		if(value==1){
				        			return '<span style="color:blue">是</span>';
				        		}else{
				        			return '<span style="color:red">否</span>';
				        		}
				        	}}			        		      
				    ],
					onbeforetoggle: function(e){            			
						var row = e.record;
					    var dataTree = this.data;
					    if(!row.children || row.children.length == 0){
					        //this.addItemCls(row, 'tree-node-loading');
					        Edo.util.Ajax.request({
					            url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+ row.id,
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
					}
				}        	
	      ]

	});
	platformStruct_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
	function platformStructTask(platStructTreeId){
		platformStruct_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStructById.action',{id:platStructTreeId}));
	}
	
	platformStruct_addNode.on('click',function(e){
		showAddNodeWin();
	});
	//luweijiang
	function platformStruct_addNodeTask(codeClassId){
		
	}
	platformStruct_deleteNode.on('click',function(e){
		if(platformStruct_gridtree.selecteds.length != 1 ){
			Edo.MessageBox.alert('提示','请选择要删除的节点');
			return;
		}
		if( platformStruct_gridtree.selected.classCode == null){
			Edo.MessageBox.alert('提示','根节点无法删除');
			return;
		}
		
		Edo.MessageBox.confirm('提示','确定删除该节点？',function(action){
			if(action=="yes"){
				Edo.util.Ajax.request({
					url:'platform/plat-struct-tree!deleteTreeNode.action?id='+platformStruct_gridtree.selected.id,
					onSuccess:function(text){
						if("删除成功！"==text)	{
							Edo.MessageBox.alert("提示",text);
							Edo.util.Ajax.request({
								url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+platformStruct_combo.selectedItem.id,
			                    onSuccess: function(text){
			                    	var row = platformStruct_gridtree.data.children[0]; 	
			                    	row.icon="e-tree-folder";
			                    	var dataTree = platformStruct_gridtree.data;
			                    	console.log(text);
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
						
					},
					onFail:function(code){
						alert(code);
					
					}
				});
			}
		});
		
	});
	
	platformStruct_updateNode.on('click',function(e){
		if(platformStruct_gridtree.selecteds.length != 1 ){
			Edo.MessageBox.alert('提示','请选择要修改的节点');
			return;
		}
		if( platformStruct_gridtree.selected.classCode == null){
			Edo.MessageBox.alert('提示','你选择的数据项无效');
			return;
		}
		var form =showUpdateNodeForm();
		form.setForm(platformStruct_gridtree.selected);
	});
	
	//提交审核按钮的事件
	platformStruct_checkStruct.on('click',function(e){
		var platName = platformStruct_combo.selectedItem.classText;
		Edo.MessageBox.confirm('提示','是否提交名称为：<br><span style="color:red">'+platName+'</span><br>的产品平台进行审核？',function(action){
			if(action=='yes'){
				var platId = platformStruct_combo.selectedItem.plat.id;			
				Edo.util.Ajax.request({
				    url: 'platform/platform-manage!changePlat2CheckStatus.action',
				    type: 'post',
				    params:{id:platId},
				    onSuccess: function(text){
				    	if("提交审核成功！"==text){
				    		platformStruct_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
				    		platformStruct_combo.set('selectedIndex',0);
				    		platformStruct_gridtree.set('data',[]);
				    		Edo.MessageBox.alert('提示',text);
				    	}else{
				    		Edo.MessageBox.alert('提示','未知错误，请与管理员联系');
				    	}					    	
				    },
				    onFail: function(code){
				        //code是网络交互错误码,如404,500之类
				        Edo.MessageBox.alert("提示", "操作失败"+code);
				    }
				});
			}
		});
	});
	function showAddNodeWin(){
		if(!Edo.get("platformStruct_addNodeWin")){
			Edo.create({
				id: 'platformStruct_addNodeWin',            
	            type: 'window',title: '添加子分类节点',
	            render: document.body,
	            width:700,height:500,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
	                    }
	                }
	            ],
	            layout:'vertical',verticalGap:0,padding:[0,0,0,0],
	            children:[
	                      {type:'ct',layout:'horizontal',width:'100%',height:'93%',children:[
    	                      {
    	                    	  type:'panel',title:'零部件分类导航',
    	                    	  width:300,height:'100%',
    	                    	  collapseProperty: 'width',
    	                          enableCollapse: true,
    	                          splitRegion: 'west',
    	                          splitPlace: 'after',
    	                          padding:[0,0,0,0],
    	                    	  titlebar:[
	                                    {
	                                        cls:'e-titlebar-toggle-west',
	                                        icon: 'button',
	                                        onclick: function(e){
	                                            this.parent.owner.toggle();
	                                        }
	                                    }
	                                ],
	                                children:[
                                          {
                                  			type:'tree',id:"platformStruct_LbdhTree",width:'100%',height:'100%',
                                  			autoColumns:true,headerVisible:false,
                                  			horizontalLine:false,
                                  			columns:[
                                  				{dataIndex:'text'}
                                  			],
                                  			onselectionchange:function(e){
                                  				var fljgTreeData =e.selected;
                                 				if(fljgTreeData.leaf==0){
                                 					fljgTreeData.__viewicon=true;
                                 					fljgTreeData.expanded=false;
                                 				}else{
                                 					fljgTreeData.icon='ui-module';
                                 				}
                                 				platformStruct_FljgTree.set('data',fljgTreeData);
                                  			}
                                          }
	                                ]
    	                      },
    	                      {
    	                    	  type:'panel',title:'分类结构',
    	                    	  width:'100%',height:'100%',padding:[0,0,0,0],verticalGap:0,
    	                    	  children:[
    	                    	     {
    	                    	    	type: 'group',
    	         	        		    width: '100%',
    	         					    layout: 'horizontal',
    	         					    cls: 'e-toolbar',
    	         					    children:[
    	         					        {type:'button',text:'刷新'},
    	         					        {type:'button',text:'接口查看'},
    	         					    ]
    	                    	     },
    	                    	     {
										type:'tree',
										id:'platformStruct_FljgTree',
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
										}
    	                    	     }
    	                    	  ]
    	                      }
	                      ]},
	                      {
	                    	  type:'box',layout:'horizontal',width:'100%',height:'7%',children:[
	                    	      {type:'space',width:'100%'},
	                    	      {type:'button',text:'提交',onclick:function(e){
	                    	    	  if(platformStruct_FljgTree.selecteds.length!=1){
	                    	    		  Edo.MessageBox.alert('提示','未选择模块');
	                    	    		  return;
	                    	    	  }
	                    	    	  if(platformStruct_FljgTree.selected.leaf==0){
	                    	    		  Edo.MessageBox.alert('提示','此项不允许添加，请选择模块进行添加');
	                    	    		  return;
	                    	    	  }
	                    	    	  var platId = platformStruct_combo.selectedItem.plat.id;
	                    	    	  var moduleId = platformStruct_FljgTree.selected.id;
	                    	    	  var formData = {platId:platId,moduleId:moduleId};
	                					Edo.util.Ajax.request({
	                						url:'platform/plat-struct-tree!insertTreeNode.action',
	                						type:'post',
	                						params:formData,
	                						onSuccess:function(text){								
	                							if("添加成功！"==text){
	                								Edo.MessageBox.alert("提示",text);
	                								Edo.util.Ajax.request({
									                    url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+platformStruct_combo.selectedItem.id,
									                    onSuccess: function(text){
									                    	var row = platformStruct_gridtree.data.children[0]; 	
									                    	row.icon="e-tree-folder";
									                    	var dataTree = platformStruct_gridtree.data;
									                    	console.log(text);
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
	                								
/*	                								
	                								 var formData = {platId:platId,platStructId:platStructId,moduleClassId:moduleClassId,
	           	                    	    			  classCode:classCode,classText:classText,partId:partId,partSelectedId:partSelectedId,
	           	                    	    			  info:info,status:status};
	           	                			      Edo.util.Ajax.request({
	           	                						url:'platform/plat-struct-confi-rule!addPartRule.action',
	           	                						type:'post',
	           	                						params:formData,
	           	                						onSuccess:function(text){								
	           	                							if("添加成功！"==text){
	           	                								var data1 ={platStructId:platStructId,moduleClassId:moduleClassId,partId:partId,status:status};
	           	                								structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data1));
	           	                								var data2 = {platStructId:platStructId,moduleClassId:moduleClassId};
	           	          						    		    structRule_partRuleTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data2));
	           	                							}    					
	           	                							Edo.MessageBox.alert("提示",text);
	           	                						},
	           	                						onFail:function(code){
	           	                							alert(code);
	           	                						}
	           	                					});
	                								
	                								
	                								
	                								*/
	                								
	                								
	                								
	                								
	                							}else{
	                								Edo.MessageBox.alert("提示",text);
	                							}       							
	                							platformStruct_addNodeWin.destroy();
	                						},
	                						onFail:function(code){
	                							alert(code);
	                						}
	                					});
	                    	    	  
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'取消',onclick:function(e){
	                    	    	  platformStruct_addNodeWin.destroy();
	                    	      }}
	                    	  ]
	                      }
	            ]
			});
		}
		

		if(lbdhTreeData == null){
			initlbdhTreeData();
		}
		console.log(lbdhTreeData);
		for(var i=0;i<lbdhTreeData.length;i++){
			lbdhTreeData[i].icon ='e-tree-folder';
		}
		platformStruct_LbdhTree.set("data",lbdhTreeData);
		platformStruct_addNodeWin.show('center','middle',true);
		return platformStruct_addNodeWin;
	}
	
	function initlbdhTreeData(){
		lbdhTreeData=cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action');
		for(var i=0;i<lbdhTreeData.length;i++){
			lbdhTreeData[i].icon ='e-tree-folder';
		}
	}
	function showUpdateNodeForm(){
		if(!Edo.get('platformStruct_updateNodeForm')){
			Edo.create({
				id: 'platformStruct_updateNodeForm',            
	            type: 'window',title: '属性修改',
	            render: document.body,
	            width:270,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
	                    }
	                }
	            ],
	            children:[
	                    {type:'formitem',visible:false,children:[{type:'text',name:'id'}]},
	                    {
	  	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'70',label: '是否唯一值:',
	  	                    children:[{type: 'combo', width:'170',name:'onlyone',displayField:'chinese',valueField:'onlyone',
	  	                    	data:[{onlyone:0,chinese:'否'},{onlyone:1,chinese:'是'}]
	  	                    }]
	  	                },
	  	                {
		                    type: 'formitem',labelWidth :'70',label: '是否必选项:',
		                    children:[{type: 'combo', width:'170',name:'ismust',displayField:'chinese',valueField:'ismust',
	  	                    	data:[{ismust:0,chinese:'否'},{ismust:1,chinese:'是'}]
	  	                    }]
		                },
		                {
		                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
		                    children:[
		                        {type: 'button', text: '提交', 
		                            onclick: function(){
		                                if(platformStruct_updateNodeForm.valid()){
		                                    var o = platformStruct_updateNodeForm.getForm();
		                                    Edo.util.Ajax.request({
											    url:'platform/plat-struct-tree!updateTreeNode.action',
											    type: 'post',
											    params:o,
											    onSuccess: function(text){
											    	if('修改成功！'==text){
											    		platformStruct_updateNodeForm.destroy();										    		
											    	}
											    	 Edo.MessageBox.alert('提示',text);
		                								Edo.util.Ajax.request({
										                    url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+platformStruct_combo.selectedItem.id,
										                    onSuccess: function(text){
										                    	var row = platformStruct_gridtree.data.children[0]; 	
										                    	row.icon="e-tree-folder";
										                    	var dataTree = platformStruct_gridtree.data;
										                    	console.log(text);
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

											    },
											    onFail: function(code){
											        //code是网络交互错误码,如404,500之类
											        Edo.MessageBox.alert("提示", "操作失败"+code);
											    }
											});
		                                }
		                            }
		                        },
		                        {type: 'space', width:50},
		                        {type:'button', text:'取消',
		                    		onclick:function(){
		                    			platformStruct_updateNodeForm.destroy();
		                    		}
		                    	}
		                        
		                    ]
		                }
	            ]
			});
		}
		
		platformStruct_updateNodeForm.show('center','middle',true);
		return platformStruct_updateNodeForm;
		
		
	}
	
	this.getPanel =function(){
		return panel;
	};
	
	//platformStructTask(3148);
}
