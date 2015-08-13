function createCheckplatform(){
	//luweijiang
	function checkplatformTask(platformManageId){
		checkplatform_CheckPlatChooseTable.set('data',cims201.utils.getData('platform/platform-manage!getPlatform2CheckById.action',{id:platformManageId}));  	 
	}
	var panel =Edo.create({
		id:'checkplatform_topPanel',
		type:'panel',title:'<span style="color:red;">请先选择要进行审核的配置平台</span>',width:'100%',height:'100%',
		padding:[0,0,0,0],
		layout:'vertical',
		verticalGap:0,
    	children:[
			{
			    type: 'group',
			    width: '100%',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
			        {type:'button',id:'checkplatform_platChooseBtn',text:'选择配置平台',onclick:function(e){
			        	if(checkplatform_platChooseBtn.text=='选择配置平台'){
				        	 showPlat2CheckWin();	
				        	 checkplatformTask(3147);
				        	 //checkplatform_CheckPlatChooseTable.set('data',cims201.utils.getData('platform/platform-manage!getPlatform2Check.action'));  	 
			        	}
			        	if(checkplatform_platChooseBtn.text=='取消该配置平台审核'){
			        		checkplatform_plat2CheckWin.destroy();
			        		checkplatform_platChooseBtn.set('text','选择配置平台');
			        		checkplatform_topPanel.set('title','<span style="color:red;">请先选择要进行审核的配置平台</span>');
			        		checkplatform_platStruct2CheckGridTree.set('data',[]);
			        		checkplatform_TableAndGroupCt.set('enable',false);
			        	}
			        }}								        		        
			    ]
			},
			{
				type:'box',id:'checkplatform_TableAndGroupCt',height:'100%',width:'100%',border:[0,0,0,0],padding:[0,0,0,0],enable:false,
				children:[
					{
					   id:'checkplatform_platStruct2CheckGridTree',type:'tree',width: '100%',height: '100%',autoColumns: true,showHeader: true,
					   horizontalLine : false,verticalLine : false,
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
							},
							oncelldblclick:function(e){
				    			  //如果moduleId=0，则是根节点，没有规则
				    			  if(e.record.moduleId!=0){
				    				  var win = showPartRuleWin();
				    				  var data = {platStructId:e.record.id,moduleClassId:e.record.moduleId};
				    				  checkplatform_partRuleTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data));
				    			  }else{
				    				  Edo.MessageBox.alert('提示','请选择模块数据');
				    			  }
							}
							
					},
					{
					    type: 'group',
					    width: '100%',
					    layout: 'horizontal',
					    cls: 'e-toolbar',
					    padding:[0,0,15,0],
					    children: [
					        {type: 'button',id:'',text: '提交审核信息',onclick:function(e){
					        	var form =showCheckPlatForm();
					        }}
						]
					}     
				]
			}     
		]
	});
	function showPlat2CheckWin(){
		if(!Edo.get('checkplatform_plat2CheckWin')){
			Edo.create({
				id:'checkplatform_plat2CheckWin',
				type:'window',
				title:'请选择你要审核的配置平台',
				width:600,
				height:400,
	            render: document.body,
	            titlebar: [
	                {                  
	                    cls:'e-titlebar-close',
                        onclick: function(e){
                            this.parent.owner.destroy();
                        } 
	                }
	            ],
	            layout:'vertical',
	            verticalGap:0,
	            padding:0,
	            children:[
                      {
                    	 id:'checkplatform_CheckPlatChooseTable',type:'table',width:'100%',height:'100%',autoColumns: true,
                    	 columns:[
              			    	{
            					    headerText: '',
            					    align: 'center',
            					    width: 10,                        
            					    enableSort: true,
            					    renderer: function(v, r, c, i, data, t){
            					        return i+1;
            						}
            					},        
            					Edo.lists.Table.createMultiColumn(),
            					{dataIndex:'id',visible:false},
            					{dataIndex:'statusId',visible:false},
            			        { header: '平台名称', enableSort: true, dataIndex: 'platName', headerAlign: 'center',align: 'center'},
            			        { header: '平台描述', enableSort: true, dataIndex: 'info', headerAlign: 'center',align: 'center'},
            			        { header: '状态', enableSort: true, dataIndex: 'statusName', headerAlign: 'center',align: 'center'},
            			        { header: '搭建者', enableSort: true,dataIndex: 'inputUserName', headerAlign: 'center',align: 'center' },
            			        { header: '审核者', enableSort: true, dataIndex: 'checkUserName', headerAlign: 'center',align: 'center'},
            			        { header: '最后修改时间', enableSort: true, dataIndex: 'beginDate', headerAlign: 'center',align: 'center'}			      
            			    ]
                      },
                      {
                    	  type:'box',border:[0,0,0,0],width:'100%',padding:[3,3,8,3],layout:'horizontal',
                    	  children:[
                	            {
                	            	type:'space',width:'95%'
                	            },
                	            {type:'button',text:'选择该配置平台',onclick:function(e){
                	            	if(checkplatform_CheckPlatChooseTable.selecteds.length !=1){
                	            		Edo.MessageBox.alert('提示','请选择要开始审核的配置平台');
                	            		return;
                	            	}
                	            	var platName = checkplatform_CheckPlatChooseTable.selected.platName;
                	            	var platId = checkplatform_CheckPlatChooseTable.selected.id;
                	            	checkplatform_topPanel.set('title','配置平台名称为：<span style="color:red;">'+platName+'</span> 的结构');
                	            	checkplatform_platChooseBtn.set('text','取消该配置平台审核');
                	            	checkplatform_TableAndGroupCt.set('enable',true);
                	            	checkplatform_plat2CheckWin.hide();
                	            	var data = cims201.utils.getData('platform/plat-struct-tree!getPlatStructByPlatId.action?platId='+platId);
                	            	console.log(data);
                	            	if(data.leaf==0){
                	            		data.__viewicon=true;
                	            		data.expanded=false;
                	            		data.icon='e-tree-folder';
    						    	}else{
    						    		data.icon='e-tree-folder';
    						    	}
                	            	data.partsCount='';
                	            	checkplatform_platStruct2CheckGridTree.set('data',data);
                	            }},
                	            {type:'button',text:'取消',onclick:function(e){
                	            	checkplatform_plat2CheckWin.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		checkplatform_plat2CheckWin.show('center','middle',true);
		return checkplatform_plat2CheckWin;
	}
	
	function showCheckPlatForm(){
		if(!Edo.get('checkplatform_CheckPlatForm')){
			Edo.create({
	            id: 'checkplatform_CheckPlatForm',            
	            type: 'window',title: '配置平台审核',
	            render: document.body,
	            width:330,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    	this.parent.owner.destroy();
	                    }
	                }
	            ],
	            children: [
	                {type:'formitem',visible:false,children:[{type:'text',name:'id'}]},
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'90',label: '选择审核结果:',
	                    children:[{type: 'combo',width:'195',name: 'statusId',displayField:'statusName',valueField:'id',readOnly:true,
	                    	data:[{'id':'0','statusName':'审核通过'},{'id':'1','statusName':'审核不通过'}],
	                    	selectedIndex:0
	                    }]
	                },
	                {
	                    type: 'formitem',labelWidth :'90',label: '审核意见:',
	                    children:[{type: 'textarea', height:'100',width:'195',name: 'checkinfo',valid:noEmpty}]
	                }, 
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(checkplatform_CheckPlatForm.valid()){
	                                    var o = checkplatform_CheckPlatForm.getForm();
	                                    o.id=checkplatform_CheckPlatChooseTable.selected.id;
	                                    console.log(o);
	                                    Edo.util.Ajax.request({
										    url: 'platform/platform-manage!checkDone.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	if("成功提交审核信息"==text){
										    		checkplatform_CheckPlatForm.destroy();
										    		checkplatform_plat2CheckWin.destroy();
									        		checkplatform_platChooseBtn.set('text','选择配置平台');
									        		checkplatform_topPanel.set('title','<span style="color:red;">请先选择要进行审核的配置平台</span>');
									        		checkplatform_platStruct2CheckGridTree.set('data',[]);
									        		checkplatform_TableAndGroupCt.set('enable',false);
										    	}
										    	Edo.MessageBox.alert("提示", text);						    	
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                                }
	                            }
	                        },
	                        {type: 'space', width:110},
	                        {type:'button', text:'取消',
	                    		onclick:function(){
	                    			checkplatform_CheckPlatForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
	            ]
			});
		}
		checkplatform_CheckPlatForm.show('center','middle',true);
		return checkplatform_CheckPlatForm;
	}
	
	function showPartRuleWin(){
		if(!Edo.get('checkplatform_partRuleWin')){
			Edo.create({
	            id: 'checkplatform_partRuleWin',            
	            type: 'window',title: '配置规则查看',
	            render: document.body,
	            padding:[0,0,0,0],
	            width:800,
	            height:400,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    	this.parent.owner.destroy();
	                    }
	                }
	            ],
	            children: [
					{
					    id: 'checkplatform_partRuleTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
					    padding:[0,0,0,0],rowSelectMode : 'single',
					    columns:[
					    	{
							    headerText: '',
							    align: 'center',
							    width: 10,                        
							    enableSort: true,
							    renderer: function(v, r, c, i, data, t){
							        return i+1;
								}
							},
							{dataIndex:'id',visible:false},
					        { header: '零件名称', enableSort: true, dataIndex: 'partname', headerAlign: 'center',align: 'center'},
					        { header: '零件编码', enableSort: true,dataIndex: 'partnumber', headerAlign: 'center',align: 'center' },
					        { header: '必选项', enableSort: true, dataIndex: 'and', headerAlign: 'center',align: 'center'},
					        { header: '可选项', enableSort: true, dataIndex: 'or', headerAlign: 'center',align: 'center'},
					        { header: '排除项', enableSort: true, dataIndex: 'not', headerAlign: 'center',align: 'center'},				        			      
					    ]
					}
	            ]
			});
		}
		checkplatform_partRuleWin.show('center','middle',true);
		return checkplatform_partRuleWin;
	}
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	
	this.getPanel = function(){
		return panel;
	};

}