function VariantDesignBuild(){
	var VariantDesign_CodeClassChoose =Edo.create({
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
			       {	type:'combo', id:'VariantDesign_ClassNameCombo',
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
					    	VariantDesign_Tree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'VariantDesign_Tree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
							 var tableName=e.selected.code;
							 VariantDesign_ct.children[0].addChild(createSMLTable(tableName));
						 }
				   }			   
				},
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	
	var variantDesignCt =Edo.create({
		id:'VariantDesign_ct',
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		enable:false,
		children:[
	          {
	        	type:'panel',title :'事物特性表',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'SMLEditBuildVariantTask',text:'建立变型任务'},
        	             {type:'space',width:'100%'}
		        	   ]
		           }
	        	]
	          }
		]
	});
	

	VariantDesign_ClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	
	SMLEditBuildVariantTask.on('click',function(e){
		if(VariantDesignBuild_SMLTable.selecteds.length!=1){
			Edo.MessageBox.alert("提示","请选择一项建立变型设计任务");
			return;
		}
		var form = showBuildVariantTaskForm();
		var selected = VariantDesignBuild_SMLTable.selected;
		form.set('title','建立<span style="color:red">'+selected.partname+'</span>的变型任务');
		var output = selected.output.split(",");
		var requirement = "实例名称="+selected.partname+";实例编码="+selected.partnumber+";";
		for(var i=0;i<output.length;i++){
			requirement += output[i] +"="+selected[output[i]]+";";
		}
		//requirement=requirement.substring(0, requirement.length-1);
		selected.requirement=requirement;
		form.setForm(selected);		
	});
	function showBuildVariantTaskForm(){
		if(!Edo.get('SMLEdit_BuildVariantTaskForm')){
			Edo.create({
				id:'SMLEdit_BuildVariantTaskForm',
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
					{type:'formitem',visible:false,children:[{type:'text',name:'partId'}]},
					{
					    type: 'formitem',padding:[20,0,10,0],labelWidth :'75',label: '任务名称：',
					    children:[{type: 'text',width:'250',name: 'taskname'}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '实例编码：',
					    children:[{type: 'text',width:'250',name: 'partnumber',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '实例名称：',
					    children:[{type: 'text',width:'250',name: 'partname',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '开始时间：',
					    children:[{type: 'date',width:'250',name: 'startDate',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '结束时间：',
					    children:[{type: 'date',width:'250',name: 'endDate',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '变型要求：',
					    children:[{type: 'textarea',width:'250',name: 'requirement',readOnly:true}]
					},
					{
					    type: 'formitem',padding:[0,0,10,0],labelWidth :'75',label: '备注：',
					    children:[{type: 'textarea',width:'250',name: 'demo'}]
					},
					{
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {type: 'space', width:40},
	                        {type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(SMLEdit_BuildVariantTaskForm.valid()){
	                                    var o = SMLEdit_BuildVariantTaskForm.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'sml/variant!addVariantTask.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	Edo.MessageBox.alert("提示", text);
										    	SMLEdit_BuildVariantTaskForm.destroy();
										    	
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "操作失败"+code);
										    }
										});
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {type:'button', text:'取消',
	                    		onclick:function(){
	                    			SMLEdit_BuildVariantTaskForm.destroy();
	                    		}
	                    	}
	                    ]
	                }
				]
			});
		}
		SMLEdit_BuildVariantTaskForm.show('center','middle',true);
		return SMLEdit_BuildVariantTaskForm;
	}
	function createSMLTable(tableName){
		if(Edo.get('VariantDesignBuild_SMLTable')){
		   VariantDesignBuild_SMLTable.destroy();
	    }
		var columnsData =cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName);
		var columnChildren = new Array();
		columnChildren[0]={header:'id',dataIndex:'id',visible:false};
		columnChildren[1]={header:'partId',dataIndex:'partId',visible:false};
		for(var i=2;i<columnsData.length+2;i++){
			var columnData=columnsData[i-2];
			columnChildren[i] = {header:columnData.headShow+'(<span style="color:red;">'+columnData.tableHead+'</span>)',dataIndex:columnData.tableHead,headerAlign: 'center',align:'center'};
		}

		var table =new Edo.lists.Table();
		table.set('id','VariantDesignBuild_SMLTable');
		table.set('width','100%');
		table.set('height','100%');
		table.set('autoColumns',true);
		table.set('showHeader',true);
		table.set('columns',columnChildren);
		table.set('enableCellSelect',true);
		
		
		Edo.util.Ajax.request({
		    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
		    type: 'post',
		    params:{tableName:tableName},
		    onSuccess: function(text){
		    	if(text=='no'){
		    		variantDesignCt.set('enable',false);
		    		table.set('data',{});
		    	}else{
		    		variantDesignCt.set('enable',true);
		    		var tableData = cims201.utils.getData('sml/sml-table-field!getSmlTableByTableName.action?tableName='+tableName);
		    		table.set('data',tableData);
		    	}
		    },
		    onFail: function(code){
		        //code是网络交互错误码,如404,500之类
		        Edo.MessageBox.alert("提示", "操作失败"+code);
		    }
		});
		return table;
	}
	this.getCodeClassChoose=function(){
		return VariantDesign_CodeClassChoose;
	};
	
	this.getVariantDesignCt=function(){
		return variantDesignCt;
	};
	//测试变型设计任务审批
	createVariantDesignBuidl_check(3430);
}