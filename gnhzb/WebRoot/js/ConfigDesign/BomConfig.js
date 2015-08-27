function createBomConfig(){
	
	function bomConfigTask(orderId){
		var data = cims201.utils.getData('order/order-manage!getOrder4ConfiById.action',{orderId:orderId});
		return data;
	}
	function bomConfig_platformTableTask(platformId){
		BomConfig_platformTable.set('data',cims201.utils.getData('platform/platform-manage!getFinishedPlatformById.action',{id:platformId}));
	}
	var BomConfig_platformTabledata=null;
	var BomConfig_orderTabledata=null;
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
		return outputparam;
	}
	this.inittask=function(){
		var platformmanageid=null;
		var ordermanageid=null;
		var isexist1=false;
		var isexist2=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'platformmanageid'){
				isexist1=true;
				platformmanageid=inputparam[i].value;
				break;
			}
		}
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'ordermanageid'){
				isexist2=true;
				ordermanageid=inputparam[i].value;
				break;
			}
		}
		
		if(isexist1){
			var data =cims201.utils.getData('platform/platform-manage!getFinishedPlatformById.action',{id:platformmanageid});
			if(data.isSuccess == '1'){
				BomConfig_platformTabledata=data.result;
			}
			Edo.MessageBox.alert(data.message);
		}
		if(isexist2){
			var data = cims201.utils.getData('order/order-manage!getOrder4ConfiById.action',{orderId:ordermanageid});
			if(data.isSuccess == '1'){
				BomConfig_orderTabledata=data.result;
			}
			Edo.MessageBox.alert(data.message);
		}
		if(!isexist1 || !isexist2){
			Edo.MessageBox.alert("查询前置任务输出结果出错，请联系管理员！");
		}
	}
	
	var orderInfo =Edo.create({          
	        type: 'ct',
	        width: '250',
	        height: '100%',
	        collapseProperty: 'width',
	        enableCollapse: true,
	        splitRegion: 'west',
	        splitPlace: 'after',
	        children: [
	            {	id:'BomConfig_orderDetailPanel',
	                type: 'panel',
	                title:'订单信息',
	                width: '100%',
	                height: '100%',
	                padding:[0,0,0,0],
	                layout:'vertical',
	                verticalGap:0,
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
			        		type:'group',width: '100%',cls: 'e-toolbar',
			        		children:[
			        			{type:'button',text:'加载配置项',onclick:function(e){
			        				var win = showOrderWin();
			        				if(BomConfig_orderTabledata == null){
			        					BomConfig_orderTabledata=cims201.utils.getData('order/order-manage!getOrder4ConfiById.action',{});
			        				}
		        					BomConfig_orderTable.set('data',BomConfig_orderTabledata);
			        				
			        			}}
			        		]
			        	},
			        	{
			        		id: 'BomConfig_orderDetailTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
								{dataIndex:'demandId',visible:false},
								{dataIndex:'demandValueId',visible:false},
						        {header: '需求', enableSort: true, dataIndex: 'demandName', headerAlign: 'center',align: 'center'},
						        {header: '需求值', enableSort: true,dataIndex: 'demandValueName', headerAlign: 'center',align: 'center' },							        			        			      
						    ] 
			        	}
	             	]
	          
	            }
	        ]
	});
	var platForm = Edo.create({	
			id:'BomConfig_platStructPanel',
	        type: 'panel',
	        title:'产品主结构',
	        width: '100%',
	        height: '100%',
	        padding:[0,0,0,0],
	        layout:'vertical',
	        verticalGap :0,
	        children:[
	        	{
	        		type:'group',width: '100%',cls: 'e-toolbar',layout:'horizontal',horizontalGap:0,
	        		children:[
	        			{type:'button',text:'加载产品主结构',onclick:function(e){
	        				if(BomConfig_orderDetailPanel.title=='订单信息'){
	        					Edo.MessageBox.alert('提示','<span style="color:red">没有加载订单项！</span>');
	        					return;
	        				}
	        				var win = showPlatformWin();
	        				if(BomConfig_platformTabledata==null){
	        					BomConfig_platformTable.set('data',cims201.utils.getData('platform/platform-manage!getFinishedPlatform.action'));
	        				}else{
	        					BomConfig_platformTable.set('data',BomConfig_platformTabledata);
	        				}
	        				
	        			}},
	        			{type:'space',width:'100%'},
	        			{type:'label',text:'<span style="color:red;">在所选行上双击选择</span>'}
	        		]
	        	},
	        	{
	        		id: 'BomConfig_platStructTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
				        { header: '模块编码', enableSort: true, dataIndex: 'classCode', headerAlign: 'center',align: 'center'},
				        { header: '模块名称', enableSort: true,dataIndex: 'classText', headerAlign: 'center',align: 'center' },
				        { header: '状态', enableSort: true,dataIndex: 'configStatusName', headerAlign: 'center',align: 'center',
				        	renderer:function(v){
				        		if(v=="待配置"){
				        			return "<span style='color:red'>待配置</span>";
				        		}else if(v=="已配置"){
				        			return "<span style='color:green'>已配置</span>";
				        		}
				        	}
				        },
				    ],
				    onbodydblclick:function(e){
				    	if(e.record){
				    		if(e.record.configStatusName=="已配置"){
				    			Edo.MessageBox.alert("提示","该模块已配置");
				    			return;
				    		}
				    		var moduleName = e.record.classText;
				    		var ismust = e.record.ismust;
				    		var onlyone = e.record.onlyone;
				    		var title = "";
				    		if(ismust==1){
				    			if(onlyone==1){
				    				title = "选配<span style='color:red;'>"+moduleName+"</span>实例信息,<span style='color:red;'>(必须选择唯一项)</span>";
				    			}else{
				    				title = "选配<span style='color:red;'>"+moduleName+"</span>实例信息,<span style='color:red;'>(必须选择一项或多项)</span>";
				    			};
				    		}else{
				    			if(onlyone==1){
				    				title = "选配<span style='color:red;'>"+moduleName+"</span>实例信息,<span style='color:red;'>选择唯一项（可选）</span>";
				    			}else{
				    				title = "选配<span style='color:red;'>"+moduleName+"</span>实例信息,<span style='color:red;'>选择一项或多项（可选）</span>";
				    			};
				    		}
				    		var configTableWin =showConfigTableWin();
				    		configTableWin.set('title',title);
              	    	  	var orderId = BomConfig_orderTable.selected.id;
              	    	  	var platStructId = e.record.id;
              	    	  	BomConfig_configTable.set("data",cims201.utils.getData('bom/bom-temp!getInstance2ChooseByPlatStructId.action',{platStructId:platStructId,orderId:orderId}));
				    	}
				    }
	        	}
	        ]
	    
	});
	
	var BomDisplay = Edo.create({             
	        type: 'ct',
	        width: '350',
	        height: '100%',
	        collapseProperty: 'width',
	        enableCollapse: true,
	        splitRegion: 'east',
	        splitPlace: 'before',
	        children: [
	            {
	                type: 'panel',
	                id:'',
	                title:'<span style="color:red;">BOM结果显示</span>',
	                width: '100%',
	                height: '100%',
	                padding:[0,0,0,0],
	                layout:'vertical',
	                verticalGap:0,
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
		                	id: 'BomConfig_bomResutlGridTree', type: 'tree', width: '100%', height: '100%',autoColumns: true,
						    padding:[0,0,0,0],
						    columns:[
						    	{header:'',dataIndex:'',width:'5',renderer:function(){return '';}},           
						        { header: '编码', enableSort: true, dataIndex: 'partNumber', headerAlign: 'center',align: 'center'},
						        { header: '名称', enableSort: true,dataIndex: 'partName', headerAlign: 'center',align: 'center' },
						        { header: '数量', enableSort: true,dataIndex: 'quantity', headerAlign: 'center',align: 'center' }
						    ] 
	                     },
	                     {
	                    	type:'group',width: '100%',cls: 'e-toolbar',padding:[3,0,17,3],
	     	        		children:[
	     	        			{type:'button',text:'提交审核',
	     	        				onclick:function(e){
	     	        					var data = BomConfig_platStructTable.data.source;
	     	        					var dataCount = data.length;
	     	        					var flag = true;
	     	        					if(dataCount == 0){
	     	        						flag =false;
	     	        					}else{
	     	        						for(var i=0;i<dataCount;i++){
	     	        							if(data[i].configStatusName =='待配置'){
	     	        								flag = false;
	     	        								break;
	     	        							}
	     	        						}
	     	        					}
	     	        					if(!flag){
	     	        						Edo.MessageBox.alert('提示','存在模块未配置,请配置完再提交！');
	     	        					}else{
	     	        						showSubmitBomWin();
	     	        					}
	     	        					
	     	        					
	     	        				}
	     	        			}
	     	        		]
	                     }
	                 ]      
	            }
	        ]
	});
	
	function showSubmitBomWin(){
		
		if(!Edo.get('BomConfig_BomSubmitWin')){
			Edo.create({
				id:'BomConfig_BomSubmitWin',
				type:'window',
				title:'提交BOM审核',
				render:document.body,
				width:300,height:290,
				titlebar:[{
					cls: 'e-titlebar-close',
                    onclick: function(e){
                    	this.parent.owner.destroy();
                    }
				}],
				layout:'vertical',verticalGap:0,padding:[0,0,0,10],
				children:[
					{
					    type: 'formitem',visible:false,label: '订单id:',
					    children:[{type: 'text',name: 'orderId'}]
					},
					{
					    type: 'formitem',visible:false,label: '平台id:',
					    children:[{type: 'text',name: 'platId'}]
					},
					{
					    type: 'formitem',padding:[20,0,10,0],labelWidth :'70',label: 'BOM编号:',
					    children:[{type: 'text',width:'195',name: 'bomName',valid:noEmpty}]
					},
					{
					    type: 'formitem',padding:[10,0,10,0],labelWidth :'70',label: '审核人员:',
					    children:[{type: 'combo',width:'195',name: 'checkerId',displayField:'checkerName',valueField:'checkerId',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[10,0,10,0],labelWidth :'70',label: '备注:',
					    children:[{type: 'textarea', height:'100',width:'195',name: 'info',valid:noEmpty}]
					},
					{
	                    type: 'formitem',layout:'horizontal', padding: [10,0,10, 0],
	                    children:[
	                        {type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(BomConfig_BomSubmitWin.valid()){
	                                    var o = BomConfig_BomSubmitWin.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'bom/bom!saveBom.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										     	var data=Edo.util.Json.decode(text);
										    	Edo.MessageBox.alert("提示", data.message);
										    	if(data.isSuccess=='1'){
										    		var resultlist=data.resultlist;
										    		for(var i=0;i<resultlist.length;i++){
											    		for (var j=0;j<outputparam.length;j++){
															if(outputparam[j].name == resultlist[i].name){
																outputparam[j].value=resultlist[i].value;
															}
														}
										    		}
										    		//订单选择窗口和平台选择窗口销毁
										    		BomConfig_orderWin.destroy();
										    		BomConfig_platformWin.destroy();
										    		
										    		//三个表数据清空
										    		BomConfig_orderDetailTable.set('data',[]);
										    		BomConfig_platStructTable.set('data',[]);
										    		BomConfig_bomResutlGridTree.set('data',[]);
										    		//两个panel标题还原
										    		BomConfig_orderDetailPanel.set('title','订单信息');
										    		BomConfig_platStructPanel.set('title','产品主结构');
										    		//自身销毁
										    		BomConfig_BomSubmitWin.destroy();
										    	}
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
	                    			BomConfig_BomSubmitWin.destroy();
	                    		}
	                    	}
	                    ]
	                }
				]
			});
		}
		//设置配置该bom所用的平台id和订单id，使后台能够读取相应的bomtemp信息。
		BomConfig_BomSubmitWin.setForm({orderId:BomConfig_orderTable.selected.id,platId:BomConfig_platformTable.selected.id});
		BomConfig_BomSubmitWin.show('center','middle',true);
		return BomConfig_BomSubmitWin;
	}
	
	function showOrderWin(){
		if(!Edo.get('BomConfig_orderWin')){
			Edo.create({
				id:'BomConfig_orderWin',
				type:'window',
				title:'审核通过的配置信息',
	            render: document.body,
	            width:400,height:500,
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
	                      {type:'ct',layout:'horizontal',width:'100%',height:'95%',children:[
    	                      {
                      			type:'table',id:"BomConfig_orderTable",width:'100%',height:'100%',
                      			autoColumns:true,
                      			rowSelectMode: 'singel',
                      			columns:[
									{
									    headerText: '',
									    align: 'center',
									    width: 15,                        
									    enableSort: false,
									    enableDragDrop: false,
									    enableColumnDragDrop: false,
									    style:  'cursor:move;',
									    renderer: function(v, r, c, i, data, t){
									        return i+1;
									    }
									},    
									Edo.lists.Table.createMultiColumn(),
									{dataIndex:'id',visible:false},
									{header:'订单号',dataIndex:'orderNumber',align:'center',headerAlign:'center'},
									{header:'描述',dataIndex:'info',align:'center',headerAlign:'center'}
                      			],
                      			onselectionchange:function(e){}
    	                      }
	                      ]},
	                      {
	                    	  type:'box',layout:'horizontal',width:'100%',height:'7%',children:[
	                    	      {type:'space',width:'100%'},
	                    	      {type:'button',text:'确定',onclick:function(e){
	                    	    	  if(BomConfig_orderTable.selecteds.length==0){
	                    	    		  Edo.MessageBox.alert('提示','未选择配置项');
	                    	    		  return;
	                    	    	  }
	                    	    	  BomConfig_orderDetailTable.set('data',cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action',{orderId:BomConfig_orderTable.selected.id}));
	                    	    	  BomConfig_orderDetailPanel.set('title','选择了：<span style="color:red">'+BomConfig_orderTable.selected.orderNumber+'</span>的配置信息');
	                    	    	  BomConfig_orderWin.hide();
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'取消',onclick:function(e){
	                    	    	  BomConfig_orderWin.destroy();
	                    	      }}
	                    	  ]
	                      }
	             ]
			
			});
		}
		BomConfig_orderWin.show('center','middle',true);
		return BomConfig_orderWin;
	}
	
	function showPlatformWin(){
		if(!Edo.get('BomConfig_platformWin')){
			Edo.create({
				id:'BomConfig_platformWin',
				type:'window',
				title:'审核通过的产品主结构信息',
	            render: document.body,
	            width:400,height:500,
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
	                      {type:'ct',layout:'horizontal',width:'100%',height:'95%',children:[
    	                      {
                      			type:'table',id:"BomConfig_platformTable",width:'100%',height:'100%',
                      			autoColumns:true,
                      			rowSelectMode: 'singel',
                      			columns:[
									{
									    headerText: '',
									    align: 'center',
									    width: 15,                        
									    enableSort: false,
									    enableDragDrop: false,
									    enableColumnDragDrop: false,
									    style:  'cursor:move;',
									    renderer: function(v, r, c, i, data, t){
									        return i+1;
									    }
									},    
									Edo.lists.Table.createMultiColumn(),
									{dataIndex:'id',visible:false},
									{header:'平台名称',dataIndex:'platName',align:'center',headerAlign:'center'},
									{header:'描述',dataIndex:'info',align:'center',headerAlign:'center'}
                      			],
                      			onselectionchange:function(e){}
    	                      }
	                      ]},
	                      {
	                    	  type:'box',layout:'horizontal',width:'100%',height:'7%',children:[
	                    	      {type:'space',width:'100%'},
	                    	      {type:'button',text:'确定',onclick:function(e){
	                    	    	  if(BomConfig_platformTable.selecteds.length==0){
	                    	    		  Edo.MessageBox.alert('提示','未选择平台数据');
	                    	    		  return;
	                    	    	  }
	                    	    	  var platId = BomConfig_platformTable.selected.id;
	                    	    	  var platName = BomConfig_platformTable.selected.platName;
	                    	    	  var orderId = BomConfig_orderTable.selected.id;
	                    	    	  /**
	                    	    	   * 初始化平台的配置状态为待配置
	                    	    	   */
	                    	    	  Edo.util.Ajax.request({
										    url: 'bom/module-config-status!initConfigStatus.action',
										    type: 'post',
										    params:{platId:platId,orderId:orderId},
										    onSuccess: function(text){
										    	if(text == "初始化成功"){
										    		//刷新产品配置平台树模块的table
											    	BomConfig_platStructTable.set('data',cims201.utils.getData('platform/plat-struct-tree!getModulesByPlatId.action',{platId:platId,orderId:orderId}));
										    	}
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                    	    	  
	                    	    	  
	                    	    	  
	                    	    	  
	                    	    	  /**
	                    	    	   * 将BOMtemp中原有的数据删除（根据订单和配置平台的id），并将新的初始化BOMtemp加入到其中
	                    	    	   */
	                    	    	  Edo.util.Ajax.request({
										    url: 'bom/bom-temp!deleteBomTempByPlatIdAndOrderId.action',
										    type: 'post',
										    params:{platId:platId,orderId:orderId},
										    onSuccess: function(text){
										    	//向bomtemp中加入平台的所有模块的零件信息
				                    	    	  Edo.util.Ajax.request({
													    url: 'bom/bom-temp!addAll2BomTemp.action',
													    type: 'post',
													    params:{platId:platId,orderId:orderId},
													    onSuccess: function(text){
													    	BomConfig_bomResutlGridTree.set('data',cims201.utils.getData('bom/bom-temp!getBomTempByPlatIdAndOrderId.action',{platId:platId,orderId:orderId}));
													    	Edo.MessageBox.alert('提示',text);
													    },
													    onFail: function(code){
													        //code是网络交互错误码,如404,500之类
													        Edo.MessageBox.alert("提示", "操作失败"+code);
													    }
													});
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                    	    	  
	                    	    	  
	                    	    	  
	                    	    	  BomConfig_platStructPanel.set('title','使用：<span style="color:red">'+platName+'</span>平台进行选配');
	                    	    	  BomConfig_platformWin.hide();
	                    	    	  
	                    	    	  
	                    	    	  
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'取消',onclick:function(e){
	                    	    	  BomConfig_platformWin.destroy();
	                    	      }}
	                    	  ]
	                      }
	             ]
			
			});
		}
		BomConfig_platformWin.show('center','middle',true);
		return BomConfig_platformWin;
	}
	
	function showConfigTableWin(){
		if(!Edo.get('BomConfig_configTableWin')){
			Edo.create({
				id:'BomConfig_configTableWin',
				type:'window',
				title:'选配实例信息',
	            render: document.body,
	            width:400,height:500,
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
	                      {type:'ct',layout:'horizontal',width:'100%',height:'95%',children:[
    	                      {
                      			type:'table',id:"BomConfig_configTable",width:'100%',height:'100%',
                      			autoColumns:true,
                      			rowSelectMode: 'multi',
                      			columns:[
									{
									    headerText: '',
									    align: 'center',
									    width: 15,                        
									    enableSort: false,
									    enableDragDrop: false,
									    enableColumnDragDrop: false,
									    style:  'cursor:move;',
									    renderer: function(v, r, c, i, data, t){
									        return i+1;
									    }
									},    
									Edo.lists.Table.createMultiColumn(),
									{dataIndex:'id',visible:false},
									{dataIndex:'platStructId',visible:false},
									{dataIndex:'orderId',visible:false},
									{header:'编码',dataIndex:'partNumber',align:'center',headerAlign:'center'},
									{header:'名称',dataIndex:'partName',align:'center',headerAlign:'center'},
									{header:'数量',dataIndex:'count',align:'center',headerAlign:'center'},
									//{header:'零件版本',dataIndex:'info',align:'center',headerAlign:'center'},
									//{header:'版本状态',dataIndex:'info',align:'center',headerAlign:'center'},
									{header:'零件描述',dataIndex:'description',align:'center',headerAlign:'center'}
                      			]
    	                      }
	                      ]},
	                      {
	                    	  type:'box',layout:'horizontal',width:'100%',height:'7%',children:[
	                    	      {type:'space',width:'100%'},
	                    	      {type:'button',text:'确定',onclick:function(e){
	                    	    	  /**
	                    	    	   * 从平台树中查看该模块的ismust和onlyone属性，与选择的零件进行对比，查看是否符合规则
	                    	    	   * 如果符合，则保留选中的，删除未选中的，
	                    	    	   */
	                    	    	  var platId = BomConfig_platStructTable.selected.platId;
	                    	    	  var orderId = BomConfig_orderTable.selected.id;
	                    	    	  var platStructId = BomConfig_platStructTable.selected.id;
	                    	    	  var onlyone = BomConfig_platStructTable.selected.onlyone;
	                    	    	  var ismust = BomConfig_platStructTable.selected.ismust;
	                    	    	  var selectedCount = BomConfig_configTable.selecteds.length;
	                    	    	  if(ismust==1){
	                    	    		  if(onlyone==1){
	                    	    			  if(selectedCount!=1){
	                    	    				  return Edo.MessageBox.alert("提示","只能选择唯一项");
	                    	    			  }
	                    	    		  }else{
	                    	    			  if(selectedCount<1){
	                    	    				  return Edo.MessageBox.alert("提示","必须至少选择一项");
	                    	    			  }
	                    	    		  }
	                    	    	  }
	                    	    	  var partIds = new Array();
	                    	    	  for(var i = 0;i < selectedCount; i++){
	                    	    		  partIds[i] = BomConfig_configTable.selecteds[i].id;
	                    	    	  }
	                    	    	//  var form =showConfigPartCountForm(platStructId,orderId,partIds,0);
	                    	    	  Edo.util.Ajax.request({
										    url: 'bom/bom-temp!configOrderByPartIds.action',
										    type: 'post',
										    params:{platStructId:platStructId,orderId:orderId,partIds:partIds},
										    onSuccess: function(text){
										    	if(text=="配置完成"){
										    		//显示设置零件数量的表单
										    		var form =showConfigPartCountForm(platId,orderId,partIds,0);
										    		//隐藏该窗口
										    		BomConfig_configTableWin.destroy();
										    		//显示结果BOM
										    		BomConfig_bomResutlGridTree.set('data',cims201.utils.getData('bom/bom-temp!getBomTempByPlatIdAndOrderId.action',{platId:platId,orderId:orderId}));
										    	}else if(text=="配置完成（不选）"){
										    		//直接显示配置完成提示，不用配置数量，因为没有选择任何零件。
										    		Edo.MessageBox.alert("提示",text);
										    		//隐藏该窗口
										    		BomConfig_configTableWin.destroy();
										    		//显示结果BOM
										    		BomConfig_bomResutlGridTree.set('data',cims201.utils.getData('bom/bom-temp!getBomTempByPlatIdAndOrderId.action',{platId:platId,orderId:orderId}));
										    		
										    	}else{
										    		Edo.MessageBox.alert("提示",text);
										    	}
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                    	    	  
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'取消',onclick:function(e){
	                    	    	  BomConfig_configTableWin.destroy();
	                    	      }}
	                    	  ]
	                      }
	             ]
			
			});
		}
		BomConfig_configTableWin.show('center','middle',true);
		return BomConfig_configTableWin;
	}
	
	function showConfigPartCountForm(platId,orderId,partIds,count){
		if(!Edo.get('BomConfig_configPartCountForm')){
			Edo.create({
				id:'BomConfig_configPartCountForm',
				type:'window',
				title:'实例数量选择',
	            render: document.body,
	            width:270,height:150,
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
		                {
		                    type: 'formitem',padding:[20,0,10,0],labelWidth :'60',label: BomConfig_configTable.selecteds[count].partNumber+"：",
		                    children:[{type: 'text', width:'170',name: 'partCount'}]
		                },              
		                {
		                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
		                    children:[
		                        {type: 'button', text: '提交', 
		                            onclick: function(){
		                            	if(BomConfig_configPartCountForm.valid()){
		                            		var partCount = BomConfig_configPartCountForm.getForm().partCount;
		                            		var partId = BomConfig_configTable.selecteds[count].id;
		                            		//将零件数量保存到后台
		                            		Edo.util.Ajax.request({
											    url: "bom/bom-temp!configPartCount.action",
											    type: 'post',
											    params:{platId:platId,orderId:orderId,partId:partId,partCount:partCount},
											    onSuccess: function(text){
											    	 //同步更新BOM结果表
											    	BomConfig_bomResutlGridTree.set('data',cims201.utils.getData('bom/bom-temp!getBomTempByPlatIdAndOrderId.action',{platId:platId,orderId:orderId}));
											    },
											    onFail: function(code){
											        //code是网络交互错误码,如404,500之类
											        Edo.MessageBox.alert("提示", "操作失败"+code);
											    }
											});
		                            		
		                            	}
		                            	//count初始值为0，增加count，判断是否还有被选零件还没有设置数,
		                            	count++;
		                            	if(count<partIds.length){
		                            		BomConfig_configPartCountForm.destroy();
		                            		showConfigPartCountForm(platId,orderId,partIds,count);
		                            	}else{        
		                            		 var platStructId = BomConfig_platStructTable.selected.id;
		                            		//设置状态为已配置
		                            		Edo.util.Ajax.request({
											    url: "bom/module-config-status!moduleConfiged.action",
											    type: 'post',
											    params:{platStructId:platStructId,orderId:orderId},
											    onSuccess: function(text){
											    	if(text=="已配置"){
											    		Edo.MessageBox.alert("提示","配置完成");
					                            		BomConfig_configPartCountForm.destroy();
					                            		//还要讲产品树节点的table刷新
					                            		BomConfig_platStructTable.set('data',cims201.utils.getData('platform/plat-struct-tree!getModulesByPlatId.action',{platId:platId,orderId:orderId}));
											    	}
											  
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
		                    			BomConfig_configPartCountForm.destroy();
		                    		}
		                    	}
		                        
		                    ]
		                }
		            ]
			
			});
		}
		BomConfig_configPartCountForm.show('center','middle',true);
		return BomConfig_configPartCountForm;
	
	}

	this.getOrderInfo = function(){
		return orderInfo;
	};
	
	this.getPlatForm = function(){
		return platForm;
	};
	
	this.getBomDisplay = function(){
		return BomDisplay;
	};
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
}