function createVariantDesign(){
	var VariantDesignPanel = Edo.create({
		type:'panel',
		title:'变形设计任务列表',
		layout:'vertical',
		verticalGap:0,
		width:'100%',
		height:'100%',
		padding:[0,0,0,0],
		children:[
	          {
	        	  type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
	        	  children:[
	    	            {type:'button',id:'VariantDesign_LookupTask',text:'查看任务详情'},
	    	            {type:'split'},
	    	            {type:'button',id:'VariantDesign_ExecuteTask',text:'执行任务'},
	    	            {type:'space',width:'100%'},
	    	            {type:'label',text:'<span style="color:red;">选择任务开始变型设计</span>'}
	    	       ]
	          },{
	  			id:'VariantDesign_TaskTable',type:'table',width:'100%',height:'100%',autoColumns: true,
	  			columns:[
	  			     {dataIndex:'id',visible:false},
	  			     {dataIndex:'partId',visible:false},
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
	  			     Edo.lists.Table.createMultiColumn(),
	  		         { header: '任务名称', dataIndex: 'taskName', headerAlign: 'center',align: 'center'},
	  		         { header: '开始时间', dataIndex: 'startDate', headerAlign: 'center',align: 'center'},
	  		         { header: '结束时间', dataIndex: 'endDate', headerAlign: 'center',align: 'center'},
	  		         { header: '状态', dataIndex: 'status', headerAlign: 'center',align: 'center'},
	  		         { header: '备注', dataIndex: 'demo', headerAlign: 'center',align: 'center'},
	  			 ]
	          }
		]
		
	});
	
	VariantDesign_TaskTable.set('data',cims201.utils.getData('sml/variant!getAllVariantTask.action'));
	
	VariantDesign_LookupTask.on('click',function(){
		var form  = showVariantTaskForm();
		form.setForm(VariantDesign_TaskTable.selected);
	});
	
	VariantDesign_ExecuteTask.on('click',function(){
		console.log('任务开始执行。');
	});
	function showVariantTaskForm(){
		if(!Edo.get('VariantDesign_VariantTaskForm')){
			Edo.create({
				id:'VariantDesign_VariantTaskForm',
				title:'变型任务详情',
				type:'window',
				width:'350',
				render:document.body,
				titlebar:{
					cls:'e-titlebar-close',
					onclick:function(e){
						this.parent.owner.destroy();
					}
				},
				children:[
					{
					    type: 'formitem',padding:[20,0,10,0],labelWidth :'75',label: '任务名称：',
					    children:[{type: 'text',width:'250',name: 'taskName',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '实例编码：',
					    children:[{type: 'text',width:'250',name: 'partNumber',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '实例名称：',
					    children:[{type: 'text',width:'250',name: 'partName',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '变型要求：',
					    children:[{type: 'textarea',width:'250',height:'100',name: 'requirement',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '备注：',
					    children:[{type: 'textarea',width:'250',name: 'demo',readOnly:true}]
					},
					{
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {type: 'space', width:60},
	                        {type:'button', text:'关闭',
	                    		onclick:function(){
	                    			VariantDesign_VariantTaskForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
				]
			});
		}
		VariantDesign_VariantTaskForm.show('center','middle',true);
		return VariantDesign_VariantTaskForm;
	}
	this.getPanel = function(){
		return VariantDesignPanel;
	}
}