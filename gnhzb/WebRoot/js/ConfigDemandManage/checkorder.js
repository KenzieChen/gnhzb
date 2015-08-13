function createCheckorder(){
	//luweijiang
	function checkorderTask(orderManageId){
		checkorder_CheckOrderChooseTable.set('data',cims201.utils.getData('order/order-manage!getAllOrederById.action',{id:orderManageId}));
	}
	var panel =Edo.create({
		id:'checkorder_topPanel',
		type:'panel',title:'<span style="color:red;">请先选择要进行审核的配置需求</span>',width:'100%',height:'100%',
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
			        {type:'button',id:'checkorder_OrderChooseBtn',text:'选择配置需求',onclick:function(e){
			        	if(checkorder_OrderChooseBtn.text=='选择配置需求'){
				        	 showOrder2CheckWin();	
				        	 
				        	 checkorderTask(3121);
				        	 //checkorder_CheckOrderChooseTable.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
				        	
				        	 checkorder_CheckOrderChooseTable.data.filter(function(o, i){
				                if(o.statusName =='待审核') return true;
				                else return false;
				            });
			        	}
			        	if(checkorder_OrderChooseBtn.text=='取消该配置需求审核'){
			        		checkorder_Order2CheckWin.destroy();
			        		checkorder_OrderChooseBtn.set('text','选择配置需求');
			        		checkorder_topPanel.set('title','<span style="color:red;">请先选择要进行审核的配置需求</span>');
			        		checkorder_OrderDetail2CheckTable.set('data',[]);
			        		checkorder_TableAndGroupCt.set('enable',false);
			        	}
			        }}								        		        
			    ]
			},
			{
				type:'box',id:'checkorder_TableAndGroupCt',height:'100%',width:'100%',border:[0,0,0,0],padding:[0,0,0,0],enable:false,
				children:[
					{
					   id:'checkorder_OrderDetail2CheckTable',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
					   columns:[
					      {header:'id',dataIndex:'id',visible:false},
					      {header:'orderId',dataIndex:'orderId',visible:false},
					      {header:'demandId',dataIndex:'demandId',visible:false},
					      {header:'demandValueId',dataIndex:'demandValueId',visible:false},
					      {header:'需求名',dataIndex:'demandName',enableSort:true,headerAlign: 'center',align:'center'},	  				    	            
					      {header:'需求备注',dataIndex:'demandMemo',enableSort:true,headerAlign: 'center',align:'center'}, 
					      {header:'需求值',dataIndex:'demandValueName',enableSort:true,headerAlign: 'center',align:'center'},
					      {header:'需求值备注',dataIndex:'demandValueMemo',enableSort:true,headerAlign: 'center',align:'center'}
				       ] 		  
					},
					{
					    type: 'group',
					    width: '100%',
					    layout: 'horizontal',
					    cls: 'e-toolbar',
					    padding:[0,0,15,0],
					    children: [
					        {type: 'button',id:'',text: '提交审核信息',onclick:function(e){
					        	var form =showCheckOrderForm();
					        }},
					        {type:'split'},
					        {
					        	type:'button',text:'导出EXCEL文件'
					        }
						]
					}     
				]
			}
		            
		]
	});
	function showOrder2CheckWin(){
		if(!Edo.get('checkorder_Order2CheckWin')){
			Edo.create({
				id:'checkorder_Order2CheckWin',
				type:'window',
				title:'请选择你要审核的配置需求',
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
                    	 id:'checkorder_CheckOrderChooseTable',type:'table',width:'100%',height:'100%',autoColumns: true,
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
                	        		return '<font color="#0000FF">待审核</font>';
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
                	            	if(checkorder_CheckOrderChooseTable.selecteds.length !=1){
                	            		Edo.MessageBox.alert('提示','请选择要开始审核的配置需求');
                	            		return;
                	            	}
                	            	var orderNumber =checkorder_CheckOrderChooseTable.selected.orderNumber;
                	            	var orderId =checkorder_CheckOrderChooseTable.selected.id;
                	            	checkorder_topPanel.set('title','配置需求号为：<span style="color:red;">'+orderNumber+'</span> 的配置需求明细');
                	            	checkorder_OrderChooseBtn.set('text','取消该配置需求审核');
                	            	checkorder_TableAndGroupCt.set('enable',true);
                	            	checkorder_Order2CheckWin.hide();
                	            	checkorder_OrderDetail2CheckTable.set('data',cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action?orderId='+orderId));
                	            }},
                	            {type:'button',text:'取消',onclick:function(e){
                	            	checkorder_Order2CheckWin.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		checkorder_Order2CheckWin.show('center','middle',true);
		return checkorder_Order2CheckWin;
	}
	
	function showCheckOrderForm(){
		if(!Edo.get('checkorder_CheckOrderForm')){
			Edo.create({
	            id: 'checkorder_CheckOrderForm',            
	            type: 'window',title: '配置需求审核',
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
	                                if(checkorder_CheckOrderForm.valid()){
	                                    var o = checkorder_CheckOrderForm.getForm();
	                                    o.id=checkorder_CheckOrderChooseTable.selected.id;
	                                    console.log(o);
	                                    Edo.util.Ajax.request({
										    url: 'order/order-manage!checkDone.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	if("成功提交审核信息"==text){
										    		checkorder_CheckOrderForm.destroy();
										    		checkorder_topPanel.set('title','<span style="color:red;">请先选择要进行审核的配置需求</span>');
				                	            	checkorder_OrderChooseBtn.set('text','选择配置需求');
				                	            	checkorder_TableAndGroupCt.set('enable',false);
				                	            	checkorder_Order2CheckWin.destroy();
				                	            	checkorder_OrderDetail2CheckTable.set('data',[]);
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
	                    			checkorder_CheckOrderForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
	            ]
			});
		}
		checkorder_CheckOrderForm.show('center','middle',true);
		return checkorder_CheckOrderForm;
	}
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	
	this.getPanel = function(){
		return panel;
	};
}