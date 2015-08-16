function createOrdermanage_check(orderId){
	//表格	
	if(!Edo.get('ordermanage_check_window')){
		var Table = Edo.create({
		    id: 'ordermanageTb_check', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
		    ]
		    
		});
		
		ordermanageTb_check.set('data',
				cims201.utils.getData('order/order-manage!getAllOrederById.action',{id:orderId}));
		
		Edo.create({
			id:'ordermanage_check_window',
			type:'window',
			title:'配置需求审批',
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
	
	ordermanage_check_window.show('center','middle',true);
}
	
	
