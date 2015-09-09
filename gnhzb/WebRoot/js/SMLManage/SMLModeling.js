function createSMLModeling(){
	var CodeClassChoose =Edo.create({
		type:'panel',
		title:'分类导航',
		height:'100%',
		width:'250',
		padding:[0,0,0,0],
		layout:'vertical',
		verticalGap:0,
		children:[
		   {
			   type:'box',width:'100%',height:'35',cls:'e-toolbar',layout:'horizontal',
			   children:[
			       {type:'label',text:'请选择分类'},
			       {	type:'combo', id:'SMLModelingClassNameCombo',
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
					    	SMLModelingTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'SMLModelingTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
					 if(e.selected.code){
						 var tableName =e.selected.code;
						 Edo.util.Ajax.request({
						    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
						    type: 'post',
						    params:{tableName:tableName},
						    onSuccess: function(text){
						    	if(text=='no'){
						    		SMLModeling_ct.set('enable',false);
						    		SMLModeling_SMLTableField.set('data',{});
						    	}else{
						    		SMLModeling_ct.set('enable',true);
						    		SMLModeling_SMLTableField.set('data',cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName));
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
				data:[{text:'请先选择结构所属分类'}]
		   }, {
        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
        	   children:[
	             {type:'button',id:'SMLModeling_CreateSMLTable',text:'建立事物特性表'},
	             {type:'space',width:'100%'},
	             {type:'button',id:'SMLModeling_DeleteSMLTable',text:'删除事物特性表'}
        	   ]
           },{
        	   type:'ct',height:'10'
           }
		]
	});
	
	SMLModelingClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function SMLModelingTask(classficationTreeId){
		SMLModelingClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
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
					if(outputparam[j].name == 'smlmodelingclassificationtreeid'){
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
				if(classificationtreeid=inputparam[i].value == null){
					isexist=false;
				}else{
					isexist=true;
					classificationtreeid=inputparam[i].value;
				}
				
				break;
			}
		}
		if(isexist){
			var data =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classificationtreeid});
			if(data.isSuccess == '1'){
				var resultdata=data.result;
				SMLModelingClassNameCombo.set('data',resultdata);
			}else{
				SMLModelingClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			SMLModelingClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			//Edo.MessageBox.alert("提示","查询前置任务输出结果出错，请联系管理员！");
		}
	}
	var smlModeling =Edo.create({
		id:'SMLModeling_ct',
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		enable:false,
		children:[
	          {
	        	type:'panel',title :'事物特性表建模',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'SMLModeling_AddSML',text:'增加事物特性'},
        	             {type:'split'},
        	             {type:'button',id:'SMLModeling_DeleteSML',text:'删除事物特性'},
        	             {type:'split'},
        	             {type:'button',text:'查看接口'},
        	             {type:'split'},
        	             {type:'button',id:'SMLModeling_Output',text:'更改输出项'}
        	             
		        	   ]
		           },
		           {
		        	   id:'SMLModeling_SMLTableField',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
		        	        {dataIndex:'id',visible:false},
	        	            {header:'名称',dataIndex:'headShow',headerAlign: 'center',align:'center'},
	        	            {header:'英文名称',dataIndex:'tableHead',headerAlign: 'center',align:'center'},
	        	            {header:'输出项',dataIndex:'output',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	        	            		if(v==0){
	        	            			return '<span style="color :red;">否</span>';
	        	            		}else{
	        	            			return '<span style="color :blue;">是</span>';
	        	            		};
	        	            	}
	        	            }
		        	   ]
		           }
	        	]
	          }
		]
	});
	SMLModeling_CreateSMLTable.on('click',function(e){
		if(SMLModelingTree.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选中分类树子节点");
			return;
		}else if(SMLModelingTree.selected.text=="请先选择结构所属分类" ){
			Edo.MessageBox.alert("提示","请先选中分类树子节点");
			return;
			
		}else if(SMLModelingTree.selected.leaf==0){
			Edo.MessageBox.alert("提示","父类节点不允许建立事物特性表");
			return;
		}
		var tableName =SMLModelingTree.selected.code;
		var treeId =SMLModelingTree.selected.id;
		 Edo.util.Ajax.request({
		    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
		    type: 'post',
		    params:{tableName:tableName},
		    onSuccess: function(text){
		    	if(text=='yes'){
		    		Edo.MessageBox.alert("提示","该节点已经存在事物特性表");
		    	}else{
		    		//此处开始建表
		    		 Edo.util.Ajax.request({
	    			    url: 'sml/sml-table-field!createSmlTableByTableName.action',
	    			    type: 'post',
	    			    params:{tableName:tableName,treeId:treeId},
	    			    onSuccess: function(text){
	    			    		Edo.MessageBox.alert("提示",text);
	    			    		SMLModeling_ct.set('enable',true);
	    			    		var data =cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName);
	    			    		SMLModeling_SMLTableField.set('data',data);
	    			    	
	    			    },
	    			    onFail: function(code){
	    			        //code是网络交互错误码,如404,500之类
	    			        Edo.MessageBox.alert("提示", "操作失败"+code);
	    			    }
	    			});
		    	}
		    },
		    onFail: function(code){
		        //code是网络交互错误码,如404,500之类
		        Edo.MessageBox.alert("提示", "操作失败"+code);
		    }
		});
		
	});
	
	SMLModeling_AddSML.on('click',function(e){
		var form = showAddSMLForm();

		var data = cims201.utils.getData('sml/sml-parameter-pool!getSmlParameterByModId.action?moduleId='+SMLModelingClassNameCombo.selectedItem.id);
		SMLModeling_AddSML_Tb.set('data',data);
	});
	
	SMLModeling_DeleteSML.on('click',function(e){
		if(SMLModeling_SMLTableField.selecteds.length != 1){
			Edo.MessageBox.alert('提示','请选择要删除的事物特性');
			return;
		}
		if(SMLModeling_SMLTableField.selected.tableHead=='partname' ||SMLModeling_SMLTableField.selected.tableHead=='partnumber'){
			Edo.MessageBox.alert('提示','该事物特性无法删除');
			return;
		}
		Edo.util.Ajax.request({
		    url: 'sml/sml-table-field!deleteSmlTableField.action',
		    type: 'post',
		    params:{id:SMLModeling_SMLTableField.selected.id},
		    onSuccess: function(text){
		    	Edo.MessageBox.alert("提示", text);
		    	SMLModeling_SMLTableField.set('data',cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+SMLModelingTree.selected.code));
		    },
		    onFail: function(code){
		        //code是网络交互错误码,如404,500之类
		        Edo.MessageBox.alert("提示", "操作失败"+code);
		    }
		});
		
	});
	
	SMLModeling_DeleteSMLTable.on("click",function(e){
		if(SMLModelingTree.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选中分类树子节点");
			return;
		}else if(!SMLModelingTree.selected.code){
			Edo.MessageBox.alert("提示","请先选中分类树子节点");
			return;
		}
		var tableName =SMLModelingTree.selected.code;
		Edo.util.Ajax.request({
		    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
		    type: 'post',
		    params:{tableName:tableName},
		    onSuccess: function(text){
		    	if(text=='yes'){
		    		//此处开始删除表
		    		 Edo.util.Ajax.request({
		    			    url: 'sml/sml-table-field!dropSmlTableByTableName.action',
		    			    type: 'post',
		    			    params:{tableName:tableName},
		    			    onSuccess: function(text){
		    			    		Edo.MessageBox.alert("提示",text);
		    			    		
		    			    		SMLModeling_SMLTableField.set('data',{});
		    			    		SMLModeling_ct.set('enable',false);
		    			    	
		    			    },
		    			    onFail: function(code){
		    			        //code是网络交互错误码,如404,500之类
		    			        Edo.MessageBox.alert("提示", "操作失败"+code);
		    			    }
		    			});
		    	}else{
		    		Edo.MessageBox.alert("提示","该节点不存在事物特性表");
		    	}
		    },
		    onFail: function(code){
		        //code是网络交互错误码,如404,500之类
		        Edo.MessageBox.alert("提示", "操作失败"+code);
		    }
		});
	});
	
	
	SMLModeling_Output.on('click',function(e){
		var length = SMLModeling_SMLTableField.selecteds.length;
		var selected = SMLModeling_SMLTableField.selected;
		if(length!=1 || selected.tableHead =='partname' || selected.tableHead =='partnumber'){
			Edo.MessageBox.alert('提示','没有选择或该项不可选，请重新选择');
			return;
		}
		var id = selected.id;
		var output = selected.output;
		if(output == 1){
			output =0;
		}else{
			output=1;
		}
		Edo.util.Ajax.request({
			    url: 'sml/sml-table-field!changeOutput.action',
			    type: 'post',
			    params:{id:id,output:output},
			    onSuccess: function(text){
			    		Edo.MessageBox.alert("提示",text);
			    		var tableName=SMLModelingTree.selected.code;
			    		SMLModeling_SMLTableField.set('data',
			    				cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName));
			    	
			    },
			    onFail: function(code){
			        //code是网络交互错误码,如404,500之类
			        Edo.MessageBox.alert("提示", "操作失败"+code);
			    }
		});
		
	});
	
	function showAddSMLForm(){	
	    if(!Edo.get('SMLModeling_AddSMLForm')) {
	        Edo.create({
	            id: 'SMLModeling_AddSMLForm',            
	            type: 'window',title: '事物特性选择',
	            render: document.body,
	            width:700,
	            padding:[0,0,0,0],
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
	                    }
	                }
	            ],
	            children: [
	            	{type:'group',layout:'horizontal',width:'100%',cls: 'e-toolbar',children:[
	            		{type:'label',text:'检索内容：'},
	            		{type:'text',id:"SMLModeling_SMLSearch",width:'100'},
	            		{type:'split'},
	            		{type:'button',text:'按名称查询',
	            			onclick:function(e){
	            				SMLModeling_SerachBy("name");
	            			}
	            		},
	            		{type:'split'},
	            		{type:'button',text:'按编码查询',
	            			onclick:function(e){
	            				SMLModeling_SerachBy("code");
	            			}
	            		},
	            		{type:'split'},
	            		{type:'split'},
	            		{type:'button',text:'移除查询',
	            			onclick:function(e){
	            				SMLModeling_AddSML_Tb.data.clearFilter(); 
	            			}
	            		},{type:'space',width:'100%'},
	            		{
	            			type:'label',text:'<span style="color:red;">双击选择名称</span>'
	            		}
	            	]},
	            	{
	            		type:'table',
	            		id:'SMLModeling_AddSML_Tb',
	            		width:'100%',height : 500,
	            		autoColumns:true,
	            		rowSelectMode: 'singel',
	            		columns:[
	            			{
			                    headerText: '',
			                    align: 'center',
			                    width: 25,                        
			                    enableSort: false,
			                    enableDragDrop: false,
			                    enableColumnDragDrop: false,
			                    style:  'cursor:move;',
			                    renderer: function(v, r, c, i, data, t){
			                        return i+1;
			                    }
			                },                
			                Edo.lists.Table.createMultiColumn(),
	            			{header:'ID',dataIndex:'id',visible:false},
	            			{header:'名称',dataIndex:'smlName', headerAlign: 'center',align: 'center'},
	            			{header:'代码',dataIndex:'smlCode', headerAlign: 'center',align: 'center'},
	            			{header:'数据类型',dataIndex:'dataType', headerAlign: 'center',align: 'center',
	            				renderer: function(v){
	    	                        if(v=="INTEGER") return "整型";
	    	                        else if(v=="FLOAT")return "浮点型";
	    	                        else return "文本型";
	    	                 }},
	            			{header:'隶属于',dataIndex:'moduleBelong',headerAlign:'center',align:'center'},
	            			{header:'单位',dataIndex:'unit',headerAlign:'center',align:'center'}
	            		],
	            		onbodydblclick:function(e){
	            			if(e.record){
	            				var tableName =SMLModelingTree.selected.code;
	            				var smlParameterId =e.record.id;
	            				var tableHead =e.record.smlCode;
	            				var headShow =e.record.smlName;
	            				var data={tableName:tableName,smlParameterId:smlParameterId,tableHead:tableHead,headShow:headShow};
	            				Edo.util.Ajax.request({
								    url: 'sml/sml-table-field!addSmlTableField.action',
								    type: 'post',
								    params:data,
								    onSuccess: function(text){
								    	if("添加成功！"==text){
								    		SMLModeling_AddSMLForm.destroy();
								    	}
								    	Edo.MessageBox.alert("提示", text);
								    	SMLModeling_SMLTableField.set('data',cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName));
								    },
								    onFail: function(code){
								        //code是网络交互错误码,如404,500之类
								        Edo.MessageBox.alert("提示", "操作失败"+code);
								    }
								});
	            			}
	            		}
	            	}
	            ]
	        });
	    };
	    SMLModeling_AddSMLForm.show('center', 'middle', true);
	    return SMLModeling_AddSMLForm;
	}
	
	function SMLModeling_SerachBy(type){
		var nameSearch=SMLModeling_SMLSearch.text;
		if(""==nameSearch ||!nameSearch){
			Edo.MessageBox.alert("提示","请输入搜索内容");
			return;
		}
		var starStr =nameSearch.charAt(0);
		var flag=0;
		SMLModeling_AddSML_Tb.data.filter(function(o){
			var content = "";
			if(type=="name"){
				content = o.smlName;
			}
			if(type=="code"){
				content = o.smlCode;
			}
			if(type=="belong"){
				content = o.moduleBelong;
			}
			for(var i=0;i<content.length;i++){
				if(content.charAt(i)==starStr &&
						content.substring(i).substring(0,nameSearch.length)==nameSearch){
						flag=1;
				}
			}
			if(flag==1){
				flag=0;
				return true;
			}else{
				flag=0;
				return false;
			}
		});
	}
	this.getCodeClassChoose=function(){
		return CodeClassChoose;
	};
	
	this.getSMLModeling =function(){
		return smlModeling;
	};

}
