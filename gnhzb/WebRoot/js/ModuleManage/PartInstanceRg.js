function createPartInstanceRg(){
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
			       {	type:'combo', id:'PartInstanceRgClassNameCombo',
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
					    	PartInstanceRgTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'PartInstanceRgTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
					   partInstanceRgSearch(arrangedPaging,arrangedPart_Table);
				   }
			   },
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	
	PartInstanceRgClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function partInstanceRgTask(classficationTreeId){
		PartInstanceRgClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
	}
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
		isexist=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'classificationtreeid'){
				for(var j=0;j<outputparam.length;j++){
					if(outputparam[j].name == 'partinstanceclassificationtreeid'){
						outputparam[j].value=inputparam[i].value;
						isexist=true;
						break;
					}
				}
				}
				break;
			}
		if(!isexist){
			Edo.MessageBox.alert("提示",'对应的编码结构树不存在');
			return null;
		}
		return outputparam;
	}
	this.inittask=function(){
		var classificationtreeid=null;
		var isexist=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'classificationtreeid'){
				isexist=true;
				classificationtreeid=inputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classificationtreeid});
			if(data.isSuccess == '1'){
				var resultdata=data.result;
				PartInstanceRgClassNameCombo.set('data',resultdata);
			}else{
				PartInstanceRgClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			PartInstanceRgClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			Edo.MessageBox.alert("提示","查询前置任务输出结果出错，请联系管理员！");
		}
	}

	var rgPanel =Edo.create({
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		children:[
	          {
	        	type:'panel',title :'已分类零部件',layout:'vertical',verticalGap:0,width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',text:'全选',onclick:function(){
        	            	 arrangedPart_Table.selectRange(arrangedPart_Table.data.source);
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'全不选',onclick:function(){
        	            	 arrangedPart_Table.deselectRange (arrangedPart_Table.data.source);
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'取消分类',onclick:function(){
        	            	 console.log(arrangedPart_Table.selecteds.length);
        	            	 if(arrangedPart_Table.selecteds.length==0){
        	            		 Edo.MessageBox.alert("提示","请先选择要取消分类的零部件！");
        	            	 }else{
        	            		 var partIds = new Array();
        	            		 for(var i=0;i<arrangedPart_Table.selecteds.length;i++){
        	            			 partIds[i] = arrangedPart_Table.selecteds[i].id;
        	            		 }
        	            		 var treeId =PartInstanceRgTree.selected.id;
        	            		 Edo.util.Ajax.request({
        	            			 url:'part/part!deArrangingPart.action',
        	            			 type:'post',
        	            			 params:{partIds:partIds,treeId:treeId},
        	            			 onSuccess:function(text){
        	            				 if("取消分类成功！"==text){
        	            					 partInstanceRgSearch(unArrangePaging,unArrangePart_Table);
        	            					 partInstanceRgSearch(arrangedPaging,arrangedPart_Table);
     	            						 Edo.MessageBox.alert("提示",text);
        	            				 }else{
        	            					 Edo.MessageBox.alert("提示",'未知错误，请联系管理员！');
        	            				 }
        	            			 },
        	            			 onFail:function(code){
        	            				 alert(code);
        	            			 }
        	            		 });
        	            	 }
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'编辑零件描述',
        	            	 onclick:function(e){
        	            		 if(arrangedPart_Table.selecteds.length!=1){
        	            			 Edo.MessageBox.alert("提示","请选择一条零部件记录进行编辑！");
        	            		 }else{
        	            			 var form=showEditForm();
        	            			 form.setForm(arrangedPart_Table.selected);
        	            		 }
        	             }},
        	             {type:'split'},
        	             {type:'text'},
        	             {type:'button',text:'查询'}
		        	   ]
		           },
		           {
		        	   id:'arrangedPart_Table',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,rowSelectMode :'multi',
		        	   columns:[
		        	     Edo.lists.Table.createMultiColumn(),
	        	         {header:'零部件号',dataIndex:'partNumber',headerAlign:'center',align:'center'},
        	             {header:'零部件名称',dataIndex:'partName',headerAlign:'center',align:'center'},
        	             {header:'创建时间',dataIndex:'createTime',headerAlign:'center',align:'center'}
		        	   ],
		        	   onbodydblclick:function(e){
		        		   if(e.record.description==null){
		        			   Edo.MessageBox.alert(e.record.partNumber+'的描述信息','无');
		        		   }else{
		        			   Edo.MessageBox.alert(e.record.partNumber+'的描述信息',e.record.description);
		        		   }
		        	   }
		           },
		           {
		        	   id:'arrangedPaging',type:'pagingbar',width:'100%',padding:[0,0,0,0],border:[0,0,0,0],
		        	   onpaging:function(e){
		        		   partInstanceRgSearch(arrangedPaging,arrangedPart_Table);
		        	   }
		           }
	        	]
	          },
	          {type:'hsplit',height:5},
	          {
	        	type:'panel',title :'未分类零部件',layout:'vertical',verticalGap:0, width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',text:'全选',onclick:function(){
        	            	 unArrangePart_Table.selectRange(unArrangePart_Table.data.source);
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'全不选',onclick:function(){
        	            	 unArrangePart_Table.deselectRange (unArrangePart_Table.data.source);
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'提交分类',onclick:function(){
        	            	 if(PartInstanceRgTree.selected){
        	            		 if(PartInstanceRgTree.selected.text=='请先选择结构所属分类' ||unArrangePart_Table.selecteds.length==0){
        	            			 Edo.MessageBox.alert("提示", "请先选择分类并选择要分类的零部件！");
        	            		 }else{
        	            			 var partIds = new Array();
        	            			 var treeId =PartInstanceRgTree.selected.id;
        	            			 for(var i =0;i<unArrangePart_Table.selecteds.length;i++){
        	            				 partIds[i]=unArrangePart_Table.selecteds[i].id;
        	            			 }
        	            			 Edo.util.Ajax.request({
        	            				url:'part/part!arrangingPart.action',
        	            				type:'post',
        	            				params:{partIds:partIds,treeId:treeId},
        	            				onSuccess:function(text){
        	            					if("添加分类成功！" == text){
        	            						partInstanceRgSearch(unArrangePaging,unArrangePart_Table);
        	            						partInstanceRgSearch(arrangedPaging,arrangedPart_Table);
        	            						Edo.MessageBox.alert("提示",text);
        	            					}else{
        	            						Edo.MessageBox.alert("提示",'未知错误，请联系管理员！');
        	            					}			
        	            				},
        	            				onFail:function(code){
        	            					alert(code);
        	            				}
        	            			});
        	            		 }
        	            	 }else{
        	            		 Edo.MessageBox.alert("提示", "请先选择分类！");
        	            	 }
        	             }},
        	             {type:'split'},
        	             {type:'button',text:'时间条件查询', arrowMode: 'menu',
        	                 menu: [
        	                        {type: 'button', text: '单日查询'},
        	                        {type: 'button', text: '日期区段查询'}
        	             ]},
        	             {type:'split'},
        	             {type:'button',text:'零部件条件查询 ',arrowMode: 'menu',
        	                 menu: [
        	                        {type: 'button',text: '名称查询'},
        	                        {type: 'button', text: '号码查询'},
        	                        {type: 'button', text: '类型查询',
        	                        	menu:[
        	                        	      {type:'label',text:'选择零部件类型'},
        	                        	      {type: 'hsplit'},
        	                        	      {type: 'button', text: '零件(A)）'},
        	        	                      {type: 'button', text: '基础件(B)'},
        	        	                      {type: 'button', text: '装配件(C)'},
        	        	                      {type: 'button', text: '焊接件(D)'},
        	        	                      {type: 'button', text: '系统件(E)'},
        	        	                      {type: 'button', text: '整机(F)'}
        	                        ]}
        	             ]},
        	             {type:'split'},
        	             {type:'button',text:'同步WinChill数据'}
		        	   ]
		           },
		           {
		        	   id:'unArrangePart_Table',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,rowSelectMode :'multi',
		        	   columns:[
		        	         Edo.lists.Table.createMultiColumn(),
		        	         {header:'零部件号',dataIndex:'partNumber',headerAlign:'center',align:'center'},
	        	             {header:'零部件名称',dataIndex:'partName',headerAlign:'center',align:'center'},
	        	             {header:'创建时间',dataIndex:'createTime',headerAlign:'center',align:'center'}
		        	   ]
		           },
		           {
		        	   id:'unArrangePaging',type:'pagingbar',width:'100%',padding:[0,0,15,0],border:[0,0,0,0],
		        	   onpaging:function(e){
		        		   		partInstanceRgSearch(unArrangePaging,unArrangePart_Table);
		        	   }
		           }
	        	]
	          }
		]
	});
	//根据分页组件和表格组件搜索已分类 或者未分类零部件
	function partInstanceRgSearch(paging,table){
		paging.size=15;
		var url = '';
		var partData =null;
		if(table.id=='unArrangePart_Table'){
			url = 'part/part!getUnArrangePart.action?index='+paging.index+'&size='+paging.size;
			partData=cims201.utils.getData(url);
		}
		if(table.id=='arrangedPart_Table'){
			if(PartInstanceRgTree.selected &&PartInstanceRgTree.selected.text!='请先选择结构所属分类'){
				url = 'part/part!getArrangedPart.action?index='+paging.index+'&size='+paging.size+'&treeId='+PartInstanceRgTree.selected.id;
				partData=cims201.utils.getData(url);
			}
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
	
	function showEditForm(){
		if(!Edo.get('partInstanceRgEditForm')){
			Edo.create({
				id:'partInstanceRgEditForm',
				type:'window',
				title:'零件描述编辑窗口',
				render:document.body,
				width:330,
				titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
	                    }
	                }
	            ],
	            children:[
	                  {type:'formitem',visible:false,children:[
	                      {type:'text',name:'id'}                                     
	                  ]},
                      {type:'formitem',label:'输入描述：',labelWidth:70,padding:[10,0,10,0],children:[{
                    	  type:'textarea',
                    	  name : 'description',
                          width:'220',
                          height:'100' 
                      }]},
                      {
                    	  type:'ct',layout:'horizontal',children:[
                	         {type:'space',width:90},
                	         {type:'button',text:'提交',onclick:function(){
                	        	 var treeId =partInstanceRgEditForm.getForm().id;
                	        	 var description =partInstanceRgEditForm.getForm().description;
                	        	 Edo.util.Ajax.request({
                	        		 url:'part/part!edtiPartDes.action',
                	        		 type:'post',
                	        		 params:{treeId:treeId,description:description},
                	        		 onSuccess:function(text){
                	        			 if("修改成功！"==text){
                	        				 Edo.MessageBox.alert("提示",text);
                	        				 partInstanceRgEditForm.destroy();
                	        				 partInstanceRgSearch(arrangedPaging,arrangedPart_Table);
                	        			 }else{
                	        				 Edo.MessageBox.alert("提示","系统出错，请与管理员联系！");
                	        			 }
                	        		 },
                	        		 onFail:function(code){
                	        			 alert(code);
                	        		 }
                	        	 });
                	         }},
                	         {type:'space',width:30},
                	         {type:'button',text:'取消',onclick:function(){
                	        	 partInstanceRgEditForm.destroy();
                	         }}    
                      ]}
	            ]
			});
		}
		partInstanceRgEditForm.show('center','middle',true);
		return partInstanceRgEditForm;
	}
	
	partInstanceRgSearch(unArrangePaging,unArrangePart_Table);
	
	this.getCodeClassChoose=function(){
		return CodeClassChoose;
	};
	
	this.getRgPanel = function(){
		return rgPanel;
	};
	partInstanceRgTask(3041);
}