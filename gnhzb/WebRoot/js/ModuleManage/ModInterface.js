function createModInterface(){
	var CodeClassChoose =Edo.create({
		type:'ct',
		height:'100%',
		width:'250',
		layout:'vertical',
		verticalGap:0,
		children:[
		   {
			   type:'box',width:'100%',height:'35',cls:'e-toolbar',layout:'horizontal',
			   children:[
			       {type:'label',text:'请选择分类'},
			       {	type:'combo', id:'ModInterfaceClassNameCombo',
						width:'150',
						Text :'请先选择适合的分类',
						readOnly : true,
						valueField: 'id',
					    displayField: 'text',			    
					    onselectionchange: function(e){	
					    	if(e.selectedItem.leaf==0){
					    		e.selectedItem.__viewicon=true;
					    		e.selectedItem.expanded=false;
					    		e.selectedItem.icon='e-tree-folder';
					    	}else{
					    		e.selectedItem.icon='e-tree-folder';
					    	}
					    	ModInterfaceTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'ModInterfaceTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
			   columns:[{dataIndex:'text'}],
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
				   if(e.selected && e.selected.id){
					   ModInterface_Table.set('data',cims201.utils.getData('interfacedata/interface-module!getInterfaceModulebyModId.action?modId='+e.selected.id));
				   }
				},
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	
	//ModInterfaceClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function modInterfaceTask(classficationTreeId){
		ModInterfaceClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
	}
	var interfacePanel =Edo.create({
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		children:[
	          {
	        	type:'panel',title :'接口管理',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'ModInterface_AddInterface',text:'增加接口'},
        	             {type:'split'},
        	             {type:'button',id:'ModInterface_EditInterface',text:'编辑接口'},
        	             {type:'split'},
        	             {type:'button',id:'ModInterface_RemoveInterface',text:'移除接口'},
        	             {type:'split'},
        	             {type:'button',id:'ModInterface_LookupInterfaceData',text:'查看接口数据'},
        	             {type:'split'},
        	             {type:'button',id:'ModInterface_EditInterfaceData',text:'编辑接口数据'}
		        	   ]
		           },
		           {
		        	   id:'ModInterface_Table',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
	        	            {dataIndex:'id',visible:false},
	        	            {dataIndex:'moduleId',visible:false},
	        	            {dataIndex:'module2Id',visible:false},
	        	            {header:'接口模块名称',dataIndex:'module2Name',headerAlign: 'center',align:'center'},
	        	            {header:'接口编号',dataIndex:'interfaceNumber',headerAlign: 'center',align:'center'},
	        	            {header:'接口关系',dataIndex:'interfaceRelation',headerAlign: 'center',align:'center'},
	        	            {header:'接口名称',dataIndex:'interfaceName',headerAlign: 'center',align:'center'},
	        	            {header:'接口类别',dataIndex:'interfaceType',headerAlign: 'center',align:'center'}
		        	   ]
		           }
	        	]
	          }
		]
	});
	//点击增加接口
	ModInterface_AddInterface.on('click',function(e){
		if(!ModInterfaceTree.selected){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(!ModInterfaceTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(-1==ModInterfaceTree.selected.__pid){
			Edo.MessageBox.alert("提示","一级模块不能作为接口模块，请重新选择");
			return;
		}
		
		var form =showAddInterfaceForm();
		form.reset();
		form.children[0].children[0].set('text',ModInterfaceTree.selected.id);
		
	});
	
	//luweijiang
	function modeInterface_AddInterfaceTask(classficationTreeId){
		if(!ModInterfaceTree.selected){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(!ModInterfaceTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(-1==ModInterfaceTree.selected.__pid){
			Edo.MessageBox.alert("提示","一级模块不能作为接口模块，请重新选择");
			return;
		}
		
		var form =showAddInterfaceFormById(classficationTreeId);
		form.reset();
		form.children[0].children[0].set('text',ModInterfaceTree.selected.id);
	}
	function showAddInterfaceFormById(classficationTreeId){
		 if(!Edo.get('ModInterface_AddInterfaceForm')) {
		        Edo.create({
		            id: 'ModInterface_AddInterfaceForm',            
		            type: 'window',title: '增加新接口',
		            render: document.body,
		            width:260,
		            titlebar: [
		                {
		                    cls: 'e-titlebar-close',
		                    onclick: function(e){
		                    this.parent.owner.destroy();
							
		                    }
		                }
		            ],
		            children: [
						{type:'formitem',visible:false,children:{
							type:'text',name:'modId'
						}},
						{type:'formitem',visible:false,children:{
							type:'text',name:'mod2Id'
						}},
		                {
		                    type: 'formitem',labelWidth :'65',label: '接口模块:',
		                    children:[{type: 'combo', width:'165',readOnly : true,text:'请选择...',
		                    	ontrigger:function(e){
		                    		var form =showModChooseWin();
		                    		var data=cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});
		                    		for(var i=0;i<data.length;i++){
		                    			if(data[i].leaf==0){
		                    				data[i].__viewicon=true,
		                    	    		data[i].icon='e-tree-folder',
		                    	    		data[i].expanded=false;
		                    			}else{
		                    				data[i].icon='e-tree-folder';
		                    			}
		                    		}
		                    		ModInterface_ModChooseTree.set('data',data);
		                    	}
		                    }]
		                },
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口编号:',
		                    children:[{type: 'text', width:'165',name: 'interfaceNumber',valid: noEmpty,autoValid:false}]
		                }, 
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口关系:',
		                    children:[{type: 'text',width:'165',name: 'interfaceRelation',valid: noEmpty,autoValid:false}]
		                },  
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口名称:',
		                    children:[{type: 'text', width:'165',name: 'interfaceName',valid: noEmpty,autoValid:false}]
		                }, 
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口类别:',
		                    children:[{type: 'text',width:'165',name: 'interfaceType',valid: noEmpty,autoValid:false}]
		                },  
		                {
		                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
		                    children:[
		                        {name: 'submitBtn', type: 'button', text: '确定', 
		                            onclick: function(){
		                                if(ModInterface_AddInterfaceForm.valid()){
		                                    var o = ModInterface_AddInterfaceForm.getForm();
		                                    if(''==o.mod2Id){
		                                    	Edo.MessageBox.alert('提示','请选择接口模块');
		                                    	return;
		                                    }
		                                    if(o.mod2Id==o.modId){
		                                    	Edo.MessageBox.alert('提示','相同模块不能组成接口，请重新选择模块');
		                                    	return;
		                                    }
		                                    Edo.util.Ajax.request({
											    url: 'interfacedata/interface-module!addInterfaceModule.action',
											    type: 'post',
											    params:o,
											    onSuccess: function(text){
											    	Edo.MessageBox.alert("提示", text);
											    	 ModInterface_Table.set('data',cims201.utils.getData('interfacedata/interface-module!getInterfaceModulebyModId.action?modId='+ModInterfaceTree.selected.id));
											    },
											    onFail: function(code){
											        //code是网络交互错误码,如404,500之类
											        Edo.MessageBox.alert("提示", "操作失败"+code);
											       
											    }
											});
		                                    ModInterface_AddInterfaceForm.destroy();
		                                }
		                            }
		                        },
		                        {type: 'space', width:50},
		                        {name: 'cancleBtn', type:'button', text:'取消',
		                    		onclick:function(){
		                    			ModInterface_AddInterfaceForm.destroy();
		                    		}
		                    	}
		                        
		                    ]
		                }
		            ]
		        });
		    }
		    ModInterface_AddInterfaceForm.show('center', 'middle', true);
		    return ModInterface_AddInterfaceForm;
	}
	
	//点击移除接口
	ModInterface_RemoveInterface.on('click',function(e){
		if(ModInterface_Table.selecteds.length!=1){
			Edo.MessageBox.alert("提示","请选择要删除的接口");
		}else{
			Edo.MessageBox.confirm("提示","删除接口将会删除相关接口数据，确定删除吗？",function(action){
				if('yes'==action){
					Edo.util.Ajax.request({
					    url: 'interfacedata/interface-module!deleteInterfaceModulebyId.action',
					    type: 'post',
					    params:{id:ModInterface_Table.selected.id},
					    onSuccess: function(text){
					    		Edo.MessageBox.alert("提示", text);
					    		ModInterface_Table.set('data',cims201.utils.getData('interfacedata/interface-module!getInterfaceModulebyModId.action?modId='+ModInterfaceTree.selected.id));
					    },
					    onFail: function(code){
					        //code是网络交互错误码,如404,500之类
					        Edo.MessageBox.alert("提示", "删除失败"+code);
					    }
					});
				}
			});
		}
		
	});
	//点击查看接口数据
	ModInterface_LookupInterfaceData.on('click',function(e){
	
	});
	//点击编辑接口数据
	ModInterface_EditInterfaceData.on('click',function(e){
		if(ModInterface_Table.selecteds.length!=1){
			Edo.MessageBox.alert("提示","请选择要编辑的接口");
		}else{
			var win = showEditInterfaceDataWin();
			ModInterface_ModInterfaceDataTree.set('data',
					cims201.utils.getData('interfacedata/interface-data!getInterfaceDataByInterfaceModId.action?interfaceModuleId='+ModInterface_Table.selected.id)
			);
		}
	});
	//跳出增加接口窗口
	function showAddInterfaceForm(){
	    if(!Edo.get('ModInterface_AddInterfaceForm')) {
	        Edo.create({
	            id: 'ModInterface_AddInterfaceForm',            
	            type: 'window',title: '增加新接口',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
						
	                    }
	                }
	            ],
	            children: [
					{type:'formitem',visible:false,children:{
						type:'text',name:'modId'
					}},
					{type:'formitem',visible:false,children:{
						type:'text',name:'mod2Id'
					}},
	                {
	                    type: 'formitem',labelWidth :'65',label: '接口模块:',
	                    children:[{type: 'combo', width:'165',readOnly : true,text:'请选择...',
	                    	ontrigger:function(e){
	                    		var form =showModChooseWin();
	                    		var data=cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action');
	                    		for(var i=0;i<data.length;i++){
	                    			if(data[i].leaf==0){
	                    				data[i].__viewicon=true,
	                    	    		data[i].icon='e-tree-folder',
	                    	    		data[i].expanded=false;
	                    			}else{
	                    				data[i].icon='e-tree-folder';
	                    			}
	                    		}
	                    		ModInterface_ModChooseTree.set('data',data);
	                    	}
	                    }]
	                },
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口编号:',
	                    children:[{type: 'text', width:'165',name: 'interfaceNumber',valid: noEmpty,autoValid:false}]
	                }, 
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口关系:',
	                    children:[{type: 'text',width:'165',name: 'interfaceRelation',valid: noEmpty,autoValid:false}]
	                },  
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口名称:',
	                    children:[{type: 'text', width:'165',name: 'interfaceName',valid: noEmpty,autoValid:false}]
	                }, 
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口类别:',
	                    children:[{type: 'text',width:'165',name: 'interfaceType',valid: noEmpty,autoValid:false}]
	                },  
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(ModInterface_AddInterfaceForm.valid()){
	                                    var o = ModInterface_AddInterfaceForm.getForm();
	                                    if(''==o.mod2Id){
	                                    	Edo.MessageBox.alert('提示','请选择接口模块');
	                                    	return;
	                                    }
	                                    if(o.mod2Id==o.modId){
	                                    	Edo.MessageBox.alert('提示','相同模块不能组成接口，请重新选择模块');
	                                    	return;
	                                    }
	                                    Edo.util.Ajax.request({
										    url: 'interfacedata/interface-module!addInterfaceModule.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	Edo.MessageBox.alert("提示", text);
										    	 ModInterface_Table.set('data',cims201.utils.getData('interfacedata/interface-module!getInterfaceModulebyModId.action?modId='+ModInterfaceTree.selected.id));
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										       
										    }
										});
	                                    ModInterface_AddInterfaceForm.destroy();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			ModInterface_AddInterfaceForm.destroy();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    }
	    ModInterface_AddInterfaceForm.show('center', 'middle', true);
	    return ModInterface_AddInterfaceForm;
	
	}
	

	function showModChooseWin(){
		if(!Edo.get('ModInterface_ModChooseWin')){
			Edo.create({
				id:'ModInterface_ModChooseWin',
				type:'window',
				title:'接口模块选择窗',
				render:document.body,
				width:300,
				height:500,
				layout:'vertical',
				titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
						
	                    }
	                }
	            ],
				children:[
			        {type:'formitem',id:'ModInterface_ChoosedMod_id',visible:false,children:[{
			        	  type:'text',name:'mod2Id'
			         }]},
				    {type:'formitem',id:'ModInterface_ChoosedMod',label:'已选模块：',labelWidth:80,
				    	children:[
				    	          {type:'text',name:'ChoosedMod',readOnly:true,width:'200'}
				    ]},
				    {type:'tree',id:'ModInterface_ModChooseTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
				    	columns:[{dataIndex:'text'}],
				    	onbeforetoggle:function(e){           			
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
				    		if(!e.selected){
				    			ModInterface_ChoosedMod_id.children[0].set('text','');
				    			ModInterface_ChoosedMod.children[0].set('text','');
				    		}else{
				    			ModInterface_ChoosedMod_id.children[0].set('text',e.selected.id);
				    			ModInterface_ChoosedMod.children[0].set('text',e.selected.text);
				    		}
				    	}
				    },
				    {type:'ct',layout:'horizontal',width:'100%',height:'25',children:[
				        {type:'space',width:80},
				        {type:'button',text:'选择',onclick:function(e){
				        	if(''==ModInterface_ChoosedMod.children[0].text){
				        		Edo.MessageBox.alert('提示','请选择接口模块');
				        		return;
				        	}
				        	if(-1==ModInterface_ModChooseTree.selected.__pid){
				        		Edo.MessageBox.alert('提示','一级模块不能作为接口模块，请重新选择');
				        	}else{
				        		ModInterface_AddInterfaceForm.children[1].children[0].set('text',ModInterface_ModChooseWin.getForm().mod2Id);
				        		ModInterface_AddInterfaceForm.children[2].children[0].set('text',ModInterface_ModChooseWin.getForm().ChoosedMod);
				        		ModInterface_ModChooseWin.destroy();
				        	}
				        }},
				        {type:'space',width:40},
				        {type:'button',text:'取消',onclick:function(e){
				        	ModInterface_ModChooseWin.destroy();
				        }}
				     ]}
				]
			});
		}
		ModInterface_ModChooseWin.show('center','middle',true);
		return ModInterface_ModChooseWin;
	}
	
	
	function showEditInterfaceDataWin(){
		if(!Edo.get('ModInterface_EditInterfaceDataWin')){
			Edo.create({
				id:'ModInterface_EditInterfaceDataWin',
				type:'window',
				title:'接口编辑',
				width:800,
				height:600,
				titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
						
	                    }
	                }
	            ],
				layout:'vertical',
				verticalGap:0,
				padding:[0,2,0,2],
				children:[
			          {
			        	 type:'panel',title:'接口简图',width:'100%',height:250,layout:'vertical',verticalGap:0,padding:[0,0,0,0],
			        	 children:[
								{
								   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
								   children:[
								      {type:'button',id:'',text:'上传简图'},
								      {type:'split'},
								      {type:'button',id:'',text:'删除简图'},
								      {type:'split'},
								      {type:'button',id:'',text:'刷新'},
								   ]
								},
		        	           {
		        	        	 type:'box',width:'100%',height:'100%',layout:'horizontal'  
		        	           }
			        	 ]
			        	 
			          },{
				        	 type:'panel',title:'接口数据',width:'100%',height:550,layout:'vertical',verticalGap:0,padding:[0,0,0,0],
				        	 children:[
									{
									   type:'box',width:'100%',height:32,cls:'e-toolbar',layout:'horizontal',
									   children:[
									      {type:'button',id:'ModInterface_AddInterfaceData',text:'添加数据'},
									      {type:'split'},
									      {type:'button',id:'ModInterface_DeleteInterfaceData',text:'删除数据'},
									      {type:'split'},
									      {type:'button',id:'ModInterface_RefreshInterfaceData',text:'刷新'},
									   ]
									},
			        	           {
			        	        	 id:'ModInterface_ModInterfaceDataTree',type:'tree',width:'100%',height:'100%',autoColumns:true,showHeader:true,
			        	        	 columns:[
			  		        	        {dataIndex:'id',visible:false},
			  		        	        {dataIndex:'interfaceInstanceId',visible:false},
			  		        	        {dataIndex:'interfaceInstance2Id',visible:false},
			  	        	            {header:'实例型号',dataIndex:'interfaceInstanceNumber',headerAlign: 'center',align:'center'},
			  	        	            {header:'关联实例',dataIndex:'interfaceInstance2Number',headerAlign: 'center',align:'center'},
			  	        	            {header:'接口类型',dataIndex:'interfaceType',headerAlign: 'center',align:'center'},
			  	        	            {header:'接口元素',dataIndex:'interfaceElement',headerAlign: 'center',align:'center'},
			  	        	            {header:'接口参数',dataIndex:'interfaceParams',headerAlign: 'center',align:'center'},
			  	        	            {header:'参数数值',dataIndex:'interfaceNumber',headerAlign: 'center',align:'center'}
			  	        	           ]
/*				  		        	   data:[
				  		        	         {interfaceInstanceNumber:'11(共1条)',children:[
				  		        	             {interfaceInstanceNumber:'11',interfaceInstance2Number:'22',interfaceType:'机械接口',des:'描述',para:'参数',v:'值'}
				  		        	         ]},
				  		        	       {interfaceInstanceNumber:'33(共3条)',children:[
				  		        	             {interfaceInstanceNumber:'33',interfaceInstance2Number:'44',interfaceType:'机械接口',interfaceElement:'元素',interfaceParams:'参数',interfaceNumber:'值'},
				  		        	             {interfaceInstanceNumber:'33',interfaceInstance2Number:'55',interfaceType:'机械接口',interfaceElement:'元素',interfaceParams:'参数',interfaceNumber:'值'},
				  		        	             {interfaceInstanceNumber:'33',interfaceInstance2Number:'66',interfaceType:'机械接口',interfaceElement:'元素',interfaceParams:'参数',interfaceNumber:'值'}
				  		        	         ]}
				  		        	   ]*/
			        	           }
				        	 ]
				        	 
				          }
				]
			});
		}
		
		ModInterface_AddInterfaceData.on('click',function(e){
			var form = showAddInterfaceDataForm();
			form.children[0].children[0].set('text',ModInterface_Table.selected.id);
			form.children[1].children[0].set('text',ModInterface_Table.selected.interfaceType);
			form.children[5].children[0].set('data',cims201.utils.getData('part/part!getArrangedPart2.action?treeId='+ModInterface_Table.selected.moduleId));
			form.children[6].children[0].set('data',cims201.utils.getData('part/part!getArrangedPart2.action?treeId='+ModInterface_Table.selected.module2Id));
		});
		
		ModInterface_DeleteInterfaceData.on('click',function(e){
			if(ModInterface_ModInterfaceDataTree.selecteds.length!=1){
				Edo.MessageBox.alert("提示","请选择删除项");
			}else if(ModInterface_ModInterfaceDataTree.selected.children !=null){
				Edo.MessageBox.alert("提示","请选择删除项");
			}else{
				Edo.MessageBox.confirm("提示","确定要删除吗？",function(action){
					if('yes'==action){
						Edo.util.Ajax.request({
						    url: 'interfacedata/interface-data!deleteInterfaceData.action',
						    type: 'post',
						    params:{id:ModInterface_ModInterfaceDataTree.selected.id},
						    onSuccess: function(text){
						    		Edo.MessageBox.alert("提示", text);
						    		ModInterface_ModInterfaceDataTree.set('data',
											cims201.utils.getData('interfacedata/interface-data!getInterfaceDataByInterfaceModId.action?interfaceModuleId='+ModInterface_Table.selected.id)
									);
						    },
						    onFail: function(code){
						        //code是网络交互错误码,如404,500之类
						        Edo.MessageBox.alert("提示", "删除失败"+code);
						    }
						});
					}
				});
			}
		});
		
		ModInterface_RefreshInterfaceData.on('click',function(e){
			ModInterface_ModInterfaceDataTree.set('data',
					cims201.utils.getData('interfacedata/interface-data!getInterfaceDataByInterfaceModId.action?interfaceModuleId='+ModInterface_Table.selected.id)
			);
		});
		
		ModInterface_EditInterfaceDataWin.show('center','middle',true);
		return  ModInterface_EditInterfaceDataWin;
	}
	

	//添加接口数据的表单
	function showAddInterfaceDataForm(){
		if(!Edo.get('ModInterface_AddInterfaceDataForm')){
	        Edo.create({
	            id: 'ModInterface_AddInterfaceDataForm',            
	            type: 'window',title: '增加接口数据',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
						
	                    }
	                }
	            ],
	            children: [
                    {type:'formitem',visible:false,children:[{type:'text',name:'interfaceModuleId'}]},
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口类型:',
	                    children:[{type: 'text', width:'165',name: 'interfaceType',readOnly:true}]
	                }, 
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口元素:',
	                    children:[{type: 'text',width:'165',name: 'interfaceElement',valid: noEmpty,autoValid:false}]
	                },  
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '接口参数:',
	                    children:[{type: 'text', width:'165',name: 'interfaceParams',valid: noEmpty,autoValid:false}]
	                }, 
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '参数数值:',
	                    children:[{type: 'text',width:'165',name: 'interfaceNumber',valid: noEmpty,autoValid:false}]
	                },  
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '实例型号:',
	                    children:[{type: 'combo', width:'165',name:'interfaceInstanceId',displayField: 'partNumber', valueField: 'id',readOnly : true,text:'请选择...'}]
	                },
	                {
	                	type:'formitem',padding:[10,0,0,0],labelWidth:'65',label:'关联实例',
	                	children:[{type:'MultiCombo',width:'165',name:'interfaceInstance2Id',multiSelect: true,displayField: 'partNumber', valueField: 'id',readOnly:true,text:'可多选...'}]
	                },
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                            	if(ModInterface_AddInterfaceDataForm.valid()){
	                            		var o = ModInterface_AddInterfaceDataForm.getForm();
	                            		if(!o.interfaceInstanceId){
	                            			Edo.MessageBox.alert("提示","实例型号不能为空");
	                            			return;
	                            		}
	                            		if(''==o.interfaceInstance2Id){
	                            			Edo.MessageBox.alert("提示","关联实例不能为空");
	                            			return;
	                            		}
	                            		 Edo.util.Ajax.request({
										    url: 'interfacedata/interface-data!addInterfaceData.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	Edo.MessageBox.alert("提示", text);
										    	ModInterface_ModInterfaceDataTree.set('data',
														cims201.utils.getData('interfacedata/interface-data!getInterfaceDataByInterfaceModId.action?interfaceModuleId='+ModInterface_Table.selected.id)
												);
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										       
										    }
										});
	                            		 ModInterface_AddInterfaceDataForm.destroy();
	                            	}
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			ModInterface_AddInterfaceDataForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
	            ]
	        });

	    }
		
		ModInterface_AddInterfaceDataForm.show('center','middle',true);
		return ModInterface_AddInterfaceDataForm;
	}
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	
	this.getCodeClassChoose=function(){
		return CodeClassChoose;
	};
	
	this.getInterfacePanel =function(){
		return interfacePanel;
	};
	modInterfaceTask(3041);
	modeInterface_AddInterfaceTask(3041);

}