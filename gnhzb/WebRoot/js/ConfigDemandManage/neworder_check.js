function createNewOrder_check(orderId){
	//表格	
	if(!Edo.get('newOrder_check_window')){
		var Table = Edo.create({
		    id: 'newOrderTb_check', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
		        //{ header: '录入人', dataIndex: '', headerAlign: 'center',align: 'center'},
		        //{ header: '审核人', dataIndex: '', headerAlign: 'center',align: 'center'},
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
		    	var data= cims201.utils.getData('order/order-detail!getOrderDetailByOrderId.action?orderId='+orderId);
		    	console.log(data);
		    	neworder_orderdetail_check.set('data',data);
		    	
		    }
		    
		});
		
		newOrderTb_check.set('data',
				cims201.utils.getData('order/order-manage!getAllOrederById.action',{id:orderId}));
		
		Edo.create({
			id:'newOrder_check_window',
			type:'window',
			title:'配置需求录入审批；<span style="color:red;">双击配置需求可查看详细信息</span>',
			height:'250',
			width:'900',
			padding:[0,0,0,0],
			titlebar:[
	            {
	                cls: 'e-titlebar-close',
	                onclick: function(e){
	                    this.parent.owner.hide();       //hide方法
	                }
	            }
	        ],
	        layout:'horizontal',
	        children:[Table]
		})
	}
	
	function showOrderDetailWin(){
		if(!Edo.get("newOrder_OrderDetailWin_check")){
			Edo.create({
				id:'newOrder_OrderDetailWin_check',
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
                    	 type:'table',id:'neworder_orderdetail_check',width:'100%',height:'100%',autoColumns: true,
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
                	        { header: '需求名', enableSort: true, dataIndex: 'demandName', headerAlign: 'left',align: 'center'},
                	        { header: '需求备注', enableSort: true, dataIndex: 'demandMemo', headerAlign: 'left',align: 'center'},
                	        { header: '需求值', enableSort: true, dataIndex: 'demandValueName', headerAlign: 'left',align: 'center'},
                	        { header: '需求值备注', enableSort: true, dataIndex: 'demandValueMemo', headerAlign: 'left',align: 'center'}
                    	 ]
                      },
                      {
                    	  type:'box',border:[0,0,0,0],width:'100%',padding:[3,3,8,3],layout:'horizontal',
                    	  children:[
                	            {
                	            	type:'space',width:'95%'
                	            },
                	            {type:'button',text:'关闭',onclick:function(e){
                	            	newOrder_OrderDetailWin_check.destroy();
                	            }}
                    	  ]
                      }
	            ]
				
			});
		}
		newOrder_OrderDetailWin_check.show('center','middle',true);
		return newOrder_OrderDetailWin_check;
		
	}
	newOrder_check_window.show('center','middle',true);
}
	
	
