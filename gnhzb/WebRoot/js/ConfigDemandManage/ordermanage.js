function createOrdermanage(){
	//菜单栏
	var Menu =Edo.create({
    		    type: 'group',
    		    width: '100%',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
			        {type: 'button',id:'ordermanage_addbtn',text: '新增'},
					{type: 'split'},
			        {type: 'button',id:'ordermanage_delebtn',text: '删除'},
					{type: 'split'},
			        {type: 'button',id:'ordermanage_xgbtn',text: '修改属性'},
			        {type: 'space',width:'100%'},
			        {type: 'label', text:'<span style="color:red;">双击配置需求可查看详细信息</span>'}
			    ]
    	});
		
	//表格	
	var Table = Edo.create({
		    id: 'ordermanageTb', type: 'table', width: '100%', height: '100%',autoColumns: true,
		    padding:[0,0,0,0],
		    rowSelectMode : 'single',
		    columns:[
		    	{
                    headerText: '',
                    align: 'center',
                    width: 10,                        
                    enableSort: false,
                    enableDragDrop: true,
                    enableColumnDragDrop: false,
                    style:  'cursor:move;',
                    renderer: function(v, r, c, i, data, t){
                        return i+1;
                	}
                },
		    	{ dataIndex: 'id',visible : false},
		    	{dataIndex:'statusId',visible:false},
		        { header: '配置需求号', dataIndex: 'orderNumber', headerAlign: 'center',align: 'center'},
		        { header: '描述', dataIndex: 'info', headerAlign: 'center',align: 'center' },
		        { header: '开始日期', dataIndex: 'beginDate', headerAlign: 'center',align: 'center'},
		        { header: '发放日期', dataIndex: 'endDate', headerAlign: 'center',align: 'center'},
		        { header: '录入人', dataIndex: '', headerAlign: 'center',align: 'center'},
		        { header: '审核人', dataIndex: '', headerAlign: 'center',align: 'center'},
		        { header: '状态', dataIndex: 'statusName', headerAlign: 'center',align: 'center',
		        	renderer:function(v){
		        		switch(v)
		        		{
		        		case '待录入':
		        			return '<font color="#0000FF">待录入</font>';
		        			break;
		        		case '待审核':
		        			return '<font color="#FF6100">待审核</font>';
		        			break;
		        		case '已发放':
		        			return '<font color="green">已发放</font>';
		        			break;
		        		case '失效':
		        			return '<font color="gray">失效</font>';
		        			break;
		        		case '审核不通过':
		        			return '<font color="red">审核不通过</font>';
		        			break;
		        		default:
		        			return v;
		        		}
		        	}
		        }
		    ],
		    oncelldblclick:function(e){
		    	showOrderDetailWin();
		    	
		    }
		    
		});
	
	ordermanageTb.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
	
	ordermanage_addbtn.on('click',function(e){
		var form  = showAddOrderForm();
		form.reset();
	});
	ordermanage_xgbtn.on('click',function(e){
		if(ordermanageTb.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择修改项');
			return;
		}
		showUpdateOrderForm();
		
	});
	
	
	ordermanage_delebtn.on('click',function(e){
		if(ordermanageTb.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择删除项');
			return;
		}
		Edo.MessageBox.confirm('提示','确定删除吗？',function(action){
			if(action=='yes'){
				Edo.util.Ajax.request({
				    url: 'order/order-manage!deleteOrder.action',
				    type: 'post',
				    params:{id:ordermanageTb.selected.id},
				    onSuccess: function(text){
				    		Edo.MessageBox.alert("提示", text);
				    		ordermanageTb.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
				    		Edo.get("ordermanage_addbtn").set('enable',true);
				    },
				    onFail: function(code){
				        //code是网络交互错误码,如404,500之类
				        Edo.MessageBox.alert("提示", "删除失败"+code);
				    }
				});
			}
		});
	});
	
	function showAddOrderForm(){
		if(!Edo.get('ordermanage_AddOrderForm')){
			if(!Edo.get('ordermanage_AddOrderForm')){
				Edo.create({
		            id: 'ordermanage_AddOrderForm',            
		            type: 'window',title: '新增配置需求',
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
		               /* {type:'formitem',visible:false,children:[{type:'text',name:'id'}]},*/
		                {
		                    type: 'formitem',padding:[20,0,10,0],labelWidth :'90',label: '需求号:',
		                    children:[{type: 'text',width:'195',name: 'orderNumber',valid:wordOrNumber}]
		                },
		                {
		                    type: 'formitem',labelWidth :'90',label: '需求描述:',
		                    children:[{type: 'textarea', height:'100',width:'195',name: 'info'}]
		                },
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '指定录入人员:',
		                    children:[{type: 'combo',width:'195',name: '',displayField:'',valueField:'',readOnly:true}]
		                }, 
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '指定审核人员:',
		                    children:[{type: 'combo',width:'195',name: '',displayField:'',valueField:'',readOnly:true,
		                    	onselectionchange:function(e){}
		                    }]
		                },  
		                {
		                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
		                    children:[
		                        {type: 'button', text: '提交', 
		                            onclick: function(){
		                                if(ordermanage_AddOrderForm.valid()){
		                                    var o = ordermanage_AddOrderForm.getForm();
		                                    Edo.util.Ajax.request({
											    url: 'order/order-manage!addOrder.action',
											    type: 'post',
											    params:o,
											    onSuccess: function(text){
											    	if("添加成功！"==text){
											    		ordermanage_AddOrderForm.destroy();
											    	}
											    	Edo.MessageBox.alert("提示", text);
											    	ordermanageTb.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
											    	Edo.get("ordermanage_addbtn").set('enable',false);
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
		                    			ordermanage_AddOrderForm.destroy();
		                    		}
		                    	}
		                    ]
		                }
		            ]
				});
				ordermanage_AddOrderForm.show('center','middle',true);
				return ordermanage_AddOrderForm;
			}
		
	}}
	
	function showUpdateOrderForm(){
		if(!Edo.get('ordermanage_UpdateOrderForm')){
			if(!Edo.get('ordermanage_UpdateOrderForm')){
				Edo.create({
		            id: 'ordermanage_UpdateOrderForm',            
		            type: 'window',title: '修改配置需求相关信息',
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
		                    type: 'formitem',padding:[20,0,10,0],labelWidth :'90',label: '需求号:',
		                    children:[{type: 'text',width:'195',name: 'orderNumber',readOnly:true}]
		                },
		                {
		                    type: 'formitem',labelWidth :'90',label: '需求描述:',
		                    children:[{type: 'textarea', height:'100',width:'195',name: 'info'}]
		                },
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '指定录入人员:',
		                    children:[{type: 'combo',width:'195',name: '',displayField:'',valueField:'',readOnly:true}]
		                }, 
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '指定审核人员:',
		                    children:[{type: 'combo',width:'195',name: '',displayField:'',valueField:'',readOnly:true,
		                    	onselectionchange:function(e){}
		                    }]
		                },  
		                {
		                    type: 'formitem',padding:[10,0,0,0],labelWidth :'90',label: '配置需求状态:',
		                    children:[{type: 'combo',width:'195',name: 'statusId',displayField:'statusName',valueField:'id',readOnly:true}]
		                }, 
		                {
		                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
		                    children:[
		                        {type: 'button', text: '提交', 
		                            onclick: function(){
		                                if(ordermanage_UpdateOrderForm.valid()){
		                                    var o = ordermanage_UpdateOrderForm.getForm();
		                                    Edo.util.Ajax.request({
											    url: 'order/order-manage!updateOrder.action',
											    type: 'post',
											    params:o,
											    onSuccess: function(text){
											    	if("修改成功！"==text){
											    		ordermanage_UpdateOrderForm.destroy();
											    	}
											    	Edo.MessageBox.alert("提示", text);
											    	ordermanageTb.set('data',cims201.utils.getData('order/order-manage!getAllOrder.action'));
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
		                    			ordermanage_UpdateOrderForm.destroy();
		                    		}
		                    	}
		                    ]
		                }
		            ]
				});
				var statusData = cims201.utils.getData('order/order-manage!getAllStatus.action');
				statusData.splice(6,1);
				ordermanage_UpdateOrderForm.children[5].children[0].set('data',statusData);
				ordermanage_UpdateOrderForm.setForm(ordermanageTb.selected);
				ordermanage_UpdateOrderForm.show('center','middle',true);
				return ordermanage_UpdateOrderForm;
			}
		
	}}
	
	
	function showOrderDetailWin(){
		if(!Edo.get("ordermanage_OrderDetailWin")){
			Edo.create({
				id:'ordermanage_OrderDetailWin',
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
                    	 type:'table',width:'100%',height:'100%',autoColumns: true,
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
                	        { header: '需求名', enableSort: true, dataIndex: '', headerAlign: 'left',align: 'center'},
                	        { header: '需求备注', enableSort: true, dataIndex: '', headerAlign: 'left',align: 'center'},
                	        { header: '需求值', enableSort: true, dataIndex: '', headerAlign: 'left',align: 'center'},
                	        { header: '需求值备注', enableSort: true, dataIndex: '', headerAlign: 'left',align: 'center'}
                    	 ]
                      },
                      {
                    	  type:'box',border:[0,0,0,0],width:'100%',padding:[3,3,8,3],layout:'horizontal',
                    	  children:[
                	            {
                	            	type:'space',width:'95%'
                	            },
                	            {type:'button',text:'关闭',onclick:function(e){
                	            	ordermanage_OrderDetailWin.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		ordermanage_OrderDetailWin.show('center','middle',true);
		return ordermanage_OrderDetailWin;
		
	}
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	
	function wordOrNumber(v){
		if(v.search(/^[A-Za-z0-9]+$/) !=-1 & v!=""){
				return true;
		}else{
			return  "请输入字母和数字组成的配置需求号";
		};
	}
	this.getMenu = function(){
		return Menu;
	};
	
	this.getTable = function(){
		return Table;
	};
}
	
	
