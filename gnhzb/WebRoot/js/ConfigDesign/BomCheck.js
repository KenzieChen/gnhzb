function createBomCheck(){
	//luweijiang
	function bomCheckTask(bomId){
		checkBom_CheckBomChooseTable.set('data',cims201.utils.getData('bom/bom!getBom2CheckById.action',{bomId:bomId}));  
	}
	var panel =Edo.create({
		id:'checkBom_topPanel',
		type:'panel',title:'<span style="color:red;">请先选择待审核的BOM</span>',width:'100%',height:'100%',
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
			        {type:'button',id:'checkBom_bomChooseBtn',text:'选择BOM',onclick:function(e){
			        	if(checkBom_bomChooseBtn.text=='选择BOM'){
				        	 showBom2CheckWin();	
				        	 //加载BOM的数据
				        	 //checkBom_CheckBomChooseTable.set('data',cims201.utils.getData('bom/bom!getBom2Check.action'));
				        	 bomCheckTask(1644);
			        	}
			        	if(checkBom_bomChooseBtn.text=='取消该BOM审核'){
			        		
			        		checkBom_bom2CheckWin.destroy();
			        		checkBom_bomChooseBtn.set('text','选择BOM');
			        		checkBom_topPanel.set('title','<span style="color:red;">请先选择待审核的BOM</span>');
			        		checkBom_bomStruct2CheckGridTree.set('data',[]);
			        		checkBom_TableAndGroupCt.set('enable',false);
			        	}
			        }}								        		        
			    ]
			},
			{
				type:'box',id:'checkBom_TableAndGroupCt',height:'100%',width:'100%',border:[0,0,0,0],padding:[0,0,0,0],enable:false,
				children:[
					{
					   id:'checkBom_bomStruct2CheckGridTree',type:'tree',width: '100%',height: '100%',autoColumns: true,showHeader: true,
					   horizontalLine : true,verticalLine : false,
					   columns:[
						        {dataIndex:'bomId',visible:false},
						        {dataIndex:'partId',visible:false},
						        {dataIndex:'moduleId',visible:false},
						        { header: 'BOM结构', dataIndex: 'moduleName', headerAlign: 'center',align: 'center'},
						        { header: '模块编码', dataIndex: 'moduleCode', headerAlign: 'center',align: 'center' },
						        { header: '实例名称', dataIndex: 'partName', headerAlign: 'center',align: 'center'},
						        { header: '实例编码', dataIndex: 'partNumber', headerAlign: 'center',align: 'center'},
						        { header: '实例个数', dataIndex: 'partCount', headerAlign: 'center',align: 'center'}
						    ],
						    onbeforetoggle: function(e){            			
								var row = e.record;
							    var dataTree = this.data;
							    if(!row.children || row.children.length == 0){
							        //this.addItemCls(row, 'tree-node-loading');
							        Edo.util.Ajax.request({
							            url: 'bom/bom!getBomStructNode.action?parentId='+ row.moduleId+"&bomId="+row.bomId,
							            //defer: 500,
							            onSuccess: function(text){
							                var data = Edo.util.Json.decode(text);			                        
							                dataTree.beginChange();
							                if(!(data instanceof Array)) data = [data]; //必定是数组
							                for(var i=0;i<data.length;i++){
							                	//设置模块显示属性
							                	if(data[i].partName ==null){
							                		data[i].__viewicon=true,
										    		data[i].icon='e-tree-folder',
										    		data[i].expanded=false;
							                		data[i].partCount='';
							                	}else{
							                		//设置零件显示属性
							                		data[i].icon='ui-module';
							                		
							                		data[i].moduleName='';
							                	}
							                	dataTree.insert(i, data[i], row);
							                };                    
							                dataTree.endChange();    
							            }
							        });
							    }
							    return !!row.children;
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
					        	var form =showcheckBom();
					        }}
						]
					}     
				]
			}     
		]
	});
	function showBom2CheckWin(){
		if(!Edo.get('checkBom_bom2CheckWin')){
			Edo.create({
				id:'checkBom_bom2CheckWin',
				type:'window',
				title:'请选择你要审核的BOM',
				width:700,
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
                    	 id:'checkBom_CheckBomChooseTable',type:'table',width:'100%',height:'100%',autoColumns: true,
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
            					{dataIndex:'orderId',visible:false},
            			        { header: 'BOM名称', enableSort: true, dataIndex: 'bomName', headerAlign: 'center',align: 'center'},
            			        { header: '使用订单', enableSort: true, dataIndex: 'orderName', headerAlign: 'center',align: 'center'},
            			        { header: '使用平台', enableSort: true, dataIndex: 'platName', headerAlign: 'center',align: 'center'},
            			        { header: '创建人', enableSort: true,dataIndex: 'bomCreator', headerAlign: 'center',align: 'center' },
            			        { header: '审核人', enableSort: true, dataIndex: 'bomChecker', headerAlign: 'center',align: 'center'},
            			        { header: '创建时间', enableSort: true, dataIndex: 'createTime', headerAlign: 'center',align: 'center'},
            			        { header: 'BOM状态', enableSort: true, dataIndex: 'bomStatus', headerAlign: 'center',align: 'center'}
            			    ]
                      },
                      {
                    	  type:'box',border:[0,0,0,0],width:'100%',padding:[3,3,8,3],layout:'horizontal',
                    	  children:[
                	            {
                	            	type:'space',width:'95%'
                	            },
                	            {type:'button',text:'选择该BOM',onclick:function(e){
                	            	if(checkBom_CheckBomChooseTable.selecteds.length !=1){
                	            		Edo.MessageBox.alert('提示','请选择要开始审核的BOM');
                	            		return;
                	            	}
                	            	
                	            	var bomName = checkBom_CheckBomChooseTable.selected.bomName;

                	            	var bomId = checkBom_CheckBomChooseTable.selected.id;
                	            	checkBom_topPanel.set('title','BOM名称为：<span style="color:red;">'+bomName+'</span>');
                	            	checkBom_bomChooseBtn.set('text','取消该BOM审核');
                	            	checkBom_TableAndGroupCt.set('enable',true);
                	            	checkBom_bom2CheckWin.hide();
                	            	
                	            	//获得配置信息,待完善...
                	            	
                	            	//获得bom的结构(一次性展开)，可以在考虑一下动态展开
                	            	//var data = cims201.utils.getData('bom/bom!getBomStructTree.action?bomId='+bomId);
                	            	//动态展开
                	            	var data = cims201.utils.getData('bom/bom!getBomStructRoot.action?bomId='+bomId);
                	            	
                	            	//模块没有零件数量属性，隐藏之
                	            	data.partCount='';
                	            	//设置节点图标
            	            		data.__viewicon=true;
            	            		data.expanded=false;
            	            		data.icon='e-tree-folder';

                	            	checkBom_bomStruct2CheckGridTree.set('data',data);
                	            }},
                	            {type:'button',text:'取消',onclick:function(e){
                	            	checkBom_bom2CheckWin.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		checkBom_bom2CheckWin.show('center','middle',true);
		return checkBom_bom2CheckWin;
	}
	
	function showcheckBom(){
		if(!Edo.get('checkBom_checkBomWin')){
			Edo.create({
	            id: 'checkBom_checkBomWin',            
	            type: 'window',title: 'BOM审核',
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
	                    children:[{type: 'combo',width:'195',name: 'bomStatusId',displayField:'statusName',valueField:'id',readOnly:true,
	                    	data:[{'id':'2','statusName':'审核通过'},{'id':'3','statusName':'审核不通过'}],
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
	                                if(checkBom_checkBomWin.valid()){
	                                    var o = checkBom_checkBomWin.getForm();
	                                    o.bomId=checkBom_CheckBomChooseTable.selected.id;
	                                    Edo.util.Ajax.request({
										    url: 'bom/bom!checkDone.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	if("成功提交审核信息"==text){
										    		checkBom_checkBomWin.destroy();
										    		checkBom_bom2CheckWin.destroy();
									        		checkBom_bomChooseBtn.set('text','选择BOM');
									        		checkBom_topPanel.set('title','<span style="color:red;">请先选择待审核的BOM</span>');
									        		checkBom_bomStruct2CheckGridTree.set('data',[]);
									        		checkBom_TableAndGroupCt.set('enable',false);
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
	                    			checkBom_checkBomWin.destroy();
	                    		}
	                    	}
	                    ]
	                }
	            ]
			});
		}
		checkBom_checkBomWin.show('center','middle',true);
		return checkBom_checkBomWin;
	}
	

	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	
	this.getPanel = function(){
		return panel;
	};

}