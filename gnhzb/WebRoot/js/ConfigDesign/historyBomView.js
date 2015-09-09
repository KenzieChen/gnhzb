function createHistoryBomView(){
	var group1 = Edo.create({    	  
		    type: 'group',
		    width: '100%',
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    children: [					        								       
		        {type: 'button',id:'historyBomView_BomViewBtn',text: '查看'},
		        {type:'split'},
		        {type:'button',id:'historyBomView_Refresh',text:'刷新',onclick:function(){
		        	historyBomView_BomViewTable.set('data',cims201.utils.getData('bom/bom!getAllBom.action'));
		        }},
		        {type: 'space',width:'100%'},				        
		    ]
	});
	
	var table = Edo.create({
	   	 id:'historyBomView_BomViewTable',type:'table',width:'100%',height:'100%',autoColumns: true,
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
	        //{ header: '创建人', enableSort: true,dataIndex: 'bomCreator', headerAlign: 'center',align: 'center' },
	        //{ header: '审核人', enableSort: true, dataIndex: 'bomChecker', headerAlign: 'center',align: 'center'},
	        { header: '创建时间', enableSort: true, dataIndex: 'createTime', headerAlign: 'center',align: 'center'},
	        { header: 'BOM状态', enableSort: true, dataIndex: 'bomStatus', headerAlign: 'center',align: 'center'}
	    ]
  });
	
	historyBomView_BomViewTable.set('data',cims201.utils.getData('bom/bom!getAllBom.action'));
	
	historyBomView_BomViewBtn.on('click',function(){
		console.log(historyBomView_BomViewTable.selecteds);
		if(historyBomView_BomViewTable.selecteds.length !=1){
			Edo.MessageBox.alert('提示','请选择要查看的BOM');
			return;
		}
		showBomStructWin();
		
		var bomName = historyBomView_BomViewTable.selected.bomName;

    	var bomId = historyBomView_BomViewTable.selected.id;
    	historyBomView_bomStructWin.set('title','BOM名称为：<span style="color:red;">'+bomName+'</span>的BOM结构查看');
		
		//动态展开
    	var data = cims201.utils.getData('bom/bom!getBomStructRoot.action?bomId='+bomId);
    	
    	//模块没有零件数量属性，隐藏之
    	data.partCount='';
    	//设置节点图标
		data.__viewicon=true;
		data.expanded=false;
		data.icon='e-tree-folder';
		historyBomView_bomStruct2CheckGridTree.set('data',data)
		
	});
	function showBomStructWin(){
		if(!Edo.get('historyBomView_bomStructWin')){

			Edo.create({
				id:'historyBomView_bomStructWin',
				type:'window',
				title:'BOM结构查看',
				width:800,
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
	 					   id:'historyBomView_bomStruct2CheckGridTree',type:'tree',width: '100%',height: '100%',autoColumns: true,showHeader: true,
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
	 							
	 					}   
	 				]
			});
		}
		historyBomView_bomStructWin.show('center','middle',true);
		return historyBomView_bomStructWin;
		
	}
/*	var group2 = Edo.create({    	  
		    type: 'group',
		    width: '100%',
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    padding:[2,0,17,2],
		    children: [					        								       
		        {type: 'button',id:'',text: '全部显示'},
		        {type:'split'},
		        {type:'button',id:'',text:'冻结BOM'},
		        {type:'split'},
		        {type:'button',id:'',text:'解除冻结'},
		        {type: 'space',width:'100%'},				        
		    ]
	});*/
	this.getGroup1 = function(){
		return group1;
	};
	
	this.getTable =function(){
		return table;
	};
	
/*	this.getGroup2 = function(){
		return group2;
	};*/
}