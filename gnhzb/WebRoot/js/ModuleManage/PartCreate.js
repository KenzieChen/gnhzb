function createPartCreate(){
	var CodeClassChoose =Edo.create({
		type:'ct',
		height:'100%',
		width:'250',
		layout:'vertical',
		verticalGap:0,
		children:[
		   {
			   type:'box',width:'100%',height:'35',cls:'e-toolbar',layout:'horizontal',
			   children:[
			       {type:'label',text:'请选择分类'},
			       {	type:'combo', id:'PartCreateClassNameCombo',
						width:'150',
						Text :'请先选择适合的分类',
						readOnly : true,
						valueField: 'id',
					    displayField: 'text',			    
					    onselectionchange: function(e){		
					    	if(e.selectedItem.leaf==0){
					    		e.selectedItem.__viewicon=true;
					    		e.selectedItem.expanded=false;
					    		e.selectedItem.icon='e-tree-folder';
					    	}else{
					    		e.selectedItem.icon='e-tree-folder';
					    	}
					    	PartCreateTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'PartCreateTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
			   columns:[{dataIndex:'text'}],
			   onbeforetoggle: function(e){            			
           		var row = e.record;
		            var dataTree = this.data;
		            if(!row.children || row.children.length == 0){
		                //this.addItemCls(row, 'tree-node-loading');
		                Edo.util.Ajax.request({
		                    url: 'classificationtree/classification-tree!getChildrenNode.action?pid='+ row.id,
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
			   onselectionchange:function(e){
				   if(e.selected){
					   PartCreate_Search(PartCreate_ArrangedPaging,PartCreate_ArrangedTable);
				   }
				},
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	
	//PartCreateClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function partCreateTask(classficationTreeId){
		PartCreateClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
	}
	var createPartPanel =Edo.create({
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		children:[
	          {
	        	type:'panel',title :'已分类零部件',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'PartCreate_CreateNewPart',text:'创建零件'},
        	             {type:'split'},
        	             {type:'button',id:'PartCreate_DeletePart',text:'删除零件'}
		        	   ]
		           },
		           {
		        	   id:'PartCreate_ArrangedTable',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
	        	            {header:'零部件号',dataIndex:'partNumber',headerAlign: 'center',align:'center'},
	        	            {header:'零部件名称',dataIndex:'partName',headerAlign: 'center',align:'center'},
	        	            {header:'大版本',dataIndex:'partBigVersion',headerAlign: 'center',align:'center'},
	        	            {header:'小版本',dataIndex:'partSmallVersion',headerAlign: 'center',align:'center'},
	        	            {header:'创建者',dataIndex:'',headerAlign: 'center',align:'center'},
	        	            {header:'创建时间',dataIndex:'createTime',headerAlign: 'center',align:'center'}
		        	   ]
		           },{
		        	   id:'PartCreate_ArrangedPaging',type:'pagingbar',width:'100%',padding:[0,0,15,0],border:[0,0,0,0],
		        	   onpaging:function(e){
		        		   PartCreate_Search(PartCreate_ArrangedPaging,PartCreate_ArrangedTable);
		        	   }
		           }
	        	]
	          }
		]
	});
	
	PartCreate_CreateNewPart.on('click',function(e){
		if(1!=PartCreateTree.selecteds.length){
			Edo.MessageBox.alert("提示","请选择分类");
		}else if(!PartCreateTree.selected.id){
			Edo.MessageBox.alert("提示","请选择分类");
		}else{
			var form = showCreateNewPartForm();
			form.reset();
			form.setForm({treeId:PartCreateTree.selected.id});
		}
	});
	PartCreate_DeletePart.on('click',function(e){
		if(1!=PartCreate_ArrangedTable.selecteds.length){
			Edo.MessageBox.alert("提示","请选择要删除的零件");
		}else{
			Edo.MessageBox.confirm("提示","确定要删除吗？",function(action){
				if("yes"==action){
					Edo.util.Ajax.request({
					    url: 'part/part!deletePart.action',
					    type: 'post',
					    params:{id:PartCreate_ArrangedTable.selected.id,treeId:PartCreateTree.selected.id},
					    onSuccess: function(text){
					    	console.log(text);
					    	if("删除成功！"==text){
					    		Edo.MessageBox.alert("提示", text);
					    		PartCreate_Search(PartCreate_ArrangedPaging,PartCreate_ArrangedTable);
					    	}else{
					    		Edo.MessageBox.alert("提示", "系统出错，请联系管理员！");
					    	}
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
	function showCreateNewPartForm(){
	    if(!Edo.get('PartCreate_CreateNewPartForm')) {
	        //创建用户面板
	        Edo.create({
	            id: 'PartCreate_CreateNewPartForm',            
	            type: 'window',title: '创建零件',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
						
	                    }
	                }
	            ],
	            children: [
	                {type:'formitem',visible:false,children:[{type:'text',name:'treeId'}]},
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'65',label: '零件号:',
	                    children:[{type: 'text',width:'165',name: 'partNumber',valid: noEmpty,autoValid:false}]
	                },
	                {
	                    type: 'formitem',labelWidth :'65',label: '零件名称:',
	                    children:[{type: 'text', width:'165',name: 'partName',valid: noEmpty,autoValid:false}]
	                },
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'65',label: '零件描述:',
	                    children:[{type: 'textarea', height:80,width:'165',name: 'description'}]
	                },  
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(PartCreate_CreateNewPartForm.valid()){
	                                    var o = PartCreate_CreateNewPartForm.getForm();
	                                    console.log(o);
	                                    Edo.util.Ajax.request({
										    url: 'part/part!createNewPart.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	Edo.MessageBox.alert("提示", text);
										    	PartCreate_Search(PartCreate_ArrangedPaging,PartCreate_ArrangedTable);
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                                    PartCreate_CreateNewPartForm.destroy();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			PartCreate_CreateNewPartForm.destroy();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    }
	    PartCreate_CreateNewPartForm.show('center', 'middle', true);
	    return PartCreate_CreateNewPartForm;	
	}
	
	function PartCreate_Search(paging,table){
		paging.size=15;
		var url = '';
		var partData =null;

		if(PartCreateTree.selected &&PartCreateTree.selected.text!='请先选择结构所属分类'){
			url = 'part/part!getArrangedPart.action?index='+paging.index+'&size='+paging.size+'&treeId='+PartCreateTree.selected.id;
			partData=cims201.utils.getData(url);
		}
	
		if(partData){
			if(partData.data==null || partData.data.length==0){
				paging.total=0;
				paging.totalPage=0;
			}else{
				paging.total=partData.total;
				if(paging.total%paging.size==0){
					paging.totalPage = paging.total/paging.size;
				}else{
					paging.totalPage = paging.total/paging.size+1;
				}
				
			}
			table.set('data',partData.data);
			paging.refresh();
		}
	}
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	
	this.getCodeClassChoose=function(){
		return CodeClassChoose;
	};
	
	this.getCreatePartPanel =function(){
		return createPartPanel;
	};
	partCreateTask(3041);
}