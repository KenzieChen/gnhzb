function createNeworder(){
	//luweijiang
	function neworderTask(orderManageId){
		neworder_NewOrderChooseTable.set('data',cims201.utils.getData('order/order-manage!getAllOrederById.action',{id:orderManageId}));
	}
	var panel =Edo.create({
			id:'neworder_topPanel',
			type:'panel',
			title:'<span style="color:red;">请先选择需要录入的配置需求</span>',
			width:'100%',
			height:'100%',
			layout:'vertical',
			verticalGap:0,
			padding:[0,0,0,0],
			children:[
			    {
				    type: 'group',
				    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
		        	children: [
				        {type: 'button',id:'neworder_OrderChooseButton',text: '选择配置需求',onclick:function(e){
				        	if(neworder_OrderChooseButton.text=='选择配置需求'){
				        		showNewOrderChooseWin();
				        		//neworderTask(orderManageId);
				        		neworderTask(3121);
					        	//neworder_NewOrderChooseTable.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
					        	neworder_NewOrderChooseTable.data.filter(function(o, i){
					                if(o.statusName =='待录入') return true;
					                else return false;
					            });
				        	}
				        	if(neworder_OrderChooseButton.text=='取消该配置需求录入'){
				        		Edo.MessageBox.alert('提示','之前的录入信息已经保存！<br>您确定要暂停目前的录入吗？',function(e){
					        		neworder_NewOrderChooseWin.destroy();
					        		neworder_topPanel.set('title','<span style="color:red;">请先选择需要录入的配置需求</span>');
	            	            	neworder_demandValuePanel.set('title','配置需求值列表');
	            	            	neworder_OrderChooseButton.set('text','选择配置需求');
	            	            	neworder_demandValueTable.set('data',[]);
	            	            	neworder_ct.set('enable',false);				        			
				        		});
				        	}
				        }}      
					]
			    },
			    {	id:'neworder_ct',
			    	type:'ct',
			    	layout:'horizontal',
			    	horizontalGap:'0',
			    	width: '100%',
			    	height: '100%',
			    	enable:false,
			    	children:[
		    	          {
		    	        	type:'panel',
		    	        	title:'需求列表<span style="color:red;">双击选择</span>',
		    	        	width:'35%',
		    	        	height:'100%',
		    	        	padding:[0,0,0,0],
		    	        	children:[
								{
								    id: 'neworder_demandTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
								    padding:[0,0,0,0],rowSelectMode : 'single',
								    columns:[
								    	{
								            headerText: '',
								            align: 'center',
								            width: 10,                        
								            enableSort: true,
								            enableDragDrop: true,
								            enableColumnDragDrop: false,
								            style:  'cursor:move;',
								            renderer: function(v, r, c, i, data, t){
								                return i+1;
								        	}
								        },
								    	{ dataIndex: 'id',visible : false},
								        { header: '需求名称', enableSort: true, dataIndex: 'demandName', headerAlign: 'center',align: 'center'},
								        { header: '备注', enableSort: true,width:200, dataIndex: 'demandMemo', headerAlign: 'center',align: 'center' },          			       
								    ],
								    oncelldblclick:function(e){
								    	var demandId =neworder_demandTable.selected.id;
								    	var demandValueArr =neworder_demandValueTable.data.source;
								    	var demandValueArrLength = demandValueArr.length;
								    	
								    	for(var i=0;i<demandValueArrLength;i++){
								    		if(demandId==demandValueArr[i].demandId){
								    			Edo.MessageBox.alert('提示','该需求已存在');
								    			return;
								    		}
								    	}
								    	var orderId =neworder_NewOrderChooseTable.selected.id;
								    	var demandName =neworder_demandTable.selected.demandName;
								    	var form = showAddDemandForm();
								    	form.setForm({
								    		'orderId':orderId,'demandId':demandId,'demandName':demandName
								    	});
								    	form.children[4].children[0].set('data',cims201.utils.getData('demand/demand-value!getValueByDemandId.action?demandId='+demandId));
								    }
								},
		    	        	]
		    	          },
		    	          {
		    	        	 id:'neworder_demandValuePanel', 
	    	            	 type: 'panel',
	    	            	 title:'配置需求值列表',
	    	            	 width: '65%',
	    	            	 height: '100%',
	    	            	 layout: 'vertical',
	    	            	 verticalGap:0,         
	    	            	 padding:[0,0,0,0],
	    	            	 children:[         		                   
	    	                  {
	    	         		    type: 'group',
	    	         		    width: '100%',
	    	     			    layout: 'horizontal',
	    	     			    cls: 'e-toolbar',
	    	                 	children: [
	    	     			        {type: 'button',id:'',text: '辅助录入'},
	    	     					{type: 'split'},
	    	     			        {type: 'button',id:'neworder_deleteDemandValue',text: '删除'},
	    	     					{type: 'split'},
	    	     			        {type: 'button',id:'neworder_updateDemandValue',text: '修改'},
	    	     			        {type: 'split'},
	    	     			        {type: 'button',id:'neworder_deleteAllDemandValue',text: '清空'},			        
	    	     				]
	    	                  },            
	    	           		 {
	    	     			    id: 'neworder_demandValueTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
	    	     			    padding:[0,0,0,0],rowSelectMode : 'single',
	    	     			    columns:[
	    	     			    	{
	    	     	                    headerText: '',
	    	     	                    align: 'center',
	    	     	                    width: 10,                        
	    	     	                    enableSort: true,
	    	     	                    enableDragDrop: true,
	    	     	                    enableColumnDragDrop: false,
	    	     	                    style:  'cursor:move;',
	    	     	                    renderer: function(v, r, c, i, data, t){
	    	     	                        return i+1;
	    	                         	}
	    	                         },
	    	     			    	{ dataIndex: 'id',visible : false},
	    	     			    	{ dataIndex: 'orderId',visible : false},
	    	     			    	{ dataIndex: 'demandId',visible : false},
	    	     			    	{ dataIndex: 'demandValueId',visible : false},
	    	     			    	{ header: '需求名', enableSort: true, dataIndex: 'demandName', headerAlign: 'center',align: 'center'},
	    	     			        { header: '需求值', enableSort: true, dataIndex: 'demandValueName', headerAlign: 'center',align: 'center'},
	    	     			        { header: '需求值备注', enableSort: true,width:200, dataIndex: 'demandValueMemo', headerAlign: 'center',align: 'center' }      			       
	    	     			      ]    			    
	    	           		  },
	    	           		  {
	    	         		    type: 'group',
	    	         		    width: '100%',
	    	     			    layout: 'horizontal',
	    	     			    cls: 'e-toolbar',
	    	     			    padding:[0,0,15,0],
	    	                 	children: [
	    	     			        {type: 'button',id:'',text: '提交审核',onclick:function(e){
	    	     			        	var orderNumber =neworder_NewOrderChooseTable.selected.orderNumber;
	                	            	var orderId =neworder_NewOrderChooseTable.selected.id;
	    	     			        	Edo.MessageBox.confirm('提示','您确定完成了<br>配置需求号为:<span style:"color:red">'+orderNumber+'</span><br>的配置需求吗？',function(action){
	    	     			        		if(action=='yes'){
	    	     								Edo.util.Ajax.request({
	    	     								    url: 'order/order-manage!change2CheckStatus.action',
	    	     								    type: 'post',
	    	     								    params:{id:orderId},
	    	     								    onSuccess: function(text){
	    	     								    		Edo.MessageBox.alert("提示", text);
	    	     								    		neworder_NewOrderChooseWin.destroy();
	    	     							        		neworder_topPanel.set('title','<span style="color:red;">请先选择需要录入的配置需求</span>');
	    	     			            	            	neworder_demandValuePanel.set('title','配置需求值列表');
	    	     			            	            	neworder_OrderChooseButton.set('text','选择配置需求');
	    	     			            	            	neworder_demandValueTable.set('data',[]);
	    	     			            	            	neworder_ct.set('enable',false);			
	    	     								    },
	    	     								    onFail: function(code){
	    	     								        //code是网络交互错误码,如404,500之类
	    	     								        Edo.MessageBox.alert("提示", "执行失败"+code);
	    	     								    }
	    	     								});				
	    	     			        		}
	    	     			        	});
	    	     			        }}	        
	    	     				]
	    	           		  }
	    	                ]
		    	          }
			    	]
			    }
			]
	});
	neworder_updateDemandValue.on('click',function(e){
		if(neworder_demandValueTable.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择修改项');
			return;
		}

		var formData =neworder_demandValueTable.selected;
    	var form = showAddDemandForm();

    	form.set('title','修改需求值');
    	form.children[4].children[0].set('data',cims201.utils.getData('demand/demand-value!getValueByDemandId.action?demandId='+formData.demandId));  	
    	form.setForm(formData);

	});
	
	neworder_deleteDemandValue.on('click',function(e){
		if(neworder_demandValueTable.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择删除项');
			return;
		}else{
			Edo.MessageBox.confirm('提示','确定删除吗',function(action){
				if(action=='yes'){
					Edo.util.Ajax.request({
					    url: 'order/order-detail!deleteOrderDetail.action',
					    type: 'post',
					    params:{id:neworder_demandValueTable.selected.id},
					    onSuccess: function(text){
					    		Edo.MessageBox.alert("提示", text);
					    		neworder_demandValueTable.set('data',
						    			cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action?orderId='+neworder_demandValueTable.selected.orderId)
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
	
	neworder_deleteAllDemandValue.on('click',function(e){
		if(!!Edo.get('neworder_NewOrderChooseWin')&!!neworder_NewOrderChooseTable.selected){
			Edo.MessageBox.confirm('提示','确定要清空所有需求值吗',function(action){
				if(action=='yes'){
					Edo.util.Ajax.request({
					    url: 'order/order-detail!deleteAllOrderDetail.action',
					    type: 'post',
					    params:{orderId:neworder_NewOrderChooseTable.selected.id},
					    onSuccess: function(text){
					    		Edo.MessageBox.alert("提示", text);
					    		neworder_demandValueTable.set('data',[]);
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
	
	neworder_demandTable.set('data',cims201.utils.getData('demand/demand-manage!getAll.action'));
	function showNewOrderChooseWin(){
		if(!Edo.get("neworder_NewOrderChooseWin")){
			Edo.create({
				id:'neworder_NewOrderChooseWin',
				type:'window',
				title:'配置需求明细查看',
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
                    	 id:'neworder_NewOrderChooseTable',type:'table',width:'100%',height:'100%',autoColumns: true,
                    	 columns:[
							{
							    headerText: '',
							    align: 'center',
							    width: 10,                        
							    enableSort: true,
							    enableDragDrop: true,
							    enableColumnDragDrop: false,
							    style:  'cursor:move;',
							    renderer: function(v, r, c, i, data, t){
							        return i+1;
								}
							},
							{dataIndex:'id',visible:false},
                	        { header: '配置需求号', enableSort: true, dataIndex: 'orderNumber', headerAlign: 'center',align: 'center'},
                	        { header: '描述', enableSort: true, dataIndex: 'info', headerAlign: 'center',align: 'center'},
                	        { header: '开始日期', enableSort: true, dataIndex: 'beginDate', headerAlign: 'center',align: 'center'},
                	        { header: '发放日期', enableSort: true, dataIndex: 'endDate', headerAlign: 'center',align: 'center'},
                	        { header: '录入人', enableSort: true, dataIndex: '', headerAlign: 'center',align: 'center'},
                	        { header: '审核人', enableSort: true, dataIndex: '', headerAlign: 'center',align: 'center'},
                	        { header: '状态', enableSort: true, dataIndex: 'statusName', headerAlign: 'center',align: 'center',
                	        	renderer:function(v){
                	        		return '<font color="#0000FF">待录入</font>';
                	        	}
                	        }
                    	 ]
                      },
                      {
                    	  type:'box',border:[0,0,0,0],width:'100%',padding:[3,3,8,3],layout:'horizontal',
                    	  children:[
                	            {
                	            	type:'space',width:'95%'
                	            },
                	            {type:'button',text:'选择该配置需求',onclick:function(e){
                	            	if(neworder_NewOrderChooseTable.selecteds.length !=1){
                	            		Edo.MessageBox.alert('提示','请选择要开始录入的配置需求');
                	            		return;
                	            	}
                	            	var orderNumber =neworder_NewOrderChooseTable.selected.orderNumber;
                	            	var orderId =neworder_NewOrderChooseTable.selected.id;
                	            	neworder_topPanel.set('title','您正在录入需求号为：<span style="color:red;">'+orderNumber+'</span>的配置需求');
                	            	neworder_demandValuePanel.set('title','配置需求号为:<span style="color:red;">'+orderNumber+'</span>的需求值');
                	            	neworder_OrderChooseButton.set('text','取消该配置需求录入');
                	            	neworder_ct.set('enable',true);
                	            	neworder_NewOrderChooseWin.hide();
                	            	//选择id为orderId的订单号的需求与需求值
                	            	neworder_demandValueTable.set('data',cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action?orderId='+orderId));
                	            }},
                	            {type:'button',text:'取消',onclick:function(e){
                	            	neworder_NewOrderChooseWin.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		neworder_NewOrderChooseWin.show('center','middle',true);
		return neworder_NewOrderChooseWin;
		
	}
	
	function showAddDemandForm(){
		if(!Edo.get('neworder_addDemandForm')){
			Edo.create({
	            id: 'neworder_addDemandForm',            
	            type: 'window',title: '新增需求值',
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
	                {type:'formitem',visible:false,children:[{type:'text',name:'orderId'}]},
	                {type:'formitem',visible:false,children:[{type:'text',name:'demandId'}]},
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'90',label: '需求:',
	                    children:[{type: 'text',width:'195',name: 'demandName',readOnly:true}]
	                },
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '选择需求值:',
	                    children:[{type: 'combo',width:'195',name: 'demandValueId',displayField:'demandValueName',valueField:'id',readOnly:true}]
	                }, 
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(neworder_addDemandForm.valid()){
	                                    var o = neworder_addDemandForm.getForm();
	                                    if(o.demandValueId==null){
	                                    	Edo.MessageBox.alert('提示','请选择需求值');
	                                    	return;
	                                    }
	                                    var urlStr ='';
	                                    if(neworder_addDemandForm.title=='新增需求值'){
	                                    	urlStr='order/order-detail!addOrderDetail.action';
	                                    }
	                                    if(neworder_addDemandForm.title=='修改需求值'){
	                                    	urlStr='order/order-detail!updateOrderDetail.action';
	                                    }
	                                    Edo.util.Ajax.request({
										    url: urlStr,
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	if("增加需求值成功！"==text){
										    		neworder_addDemandForm.destroy();
										    	}
										    	if("修改成功！"==text){
										    		neworder_addDemandForm.destroy();
										    	}
										    	
										    	Edo.MessageBox.alert("提示", text);
										    	neworder_demandValueTable.set('data',
										    			cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action?orderId='+o.orderId)
										    	);
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
	                    			neworder_addDemandForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
	            ]
			});
			neworder_addDemandForm.show('center','middle',true);
			return neworder_addDemandForm;
		}
		
	}
	
	this.getPanel = function(){
		return panel;
	};
}