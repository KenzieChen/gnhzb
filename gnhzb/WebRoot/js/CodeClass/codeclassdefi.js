function createCodeClassDefi(){
	//菜单栏
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
		return outputparam;
	}
	this.inittask=function(){
		return null;
	}
	var Menu =Edo.create({
        		    type: 'group',
        		    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
				        {type: 'button',id:'CodeClassDefi_addbtn',text: '新增'},
						{type: 'split'},
				        {type: 'button',id:'CodeClassDefi_xgbtn',text: '修改'},
						{type: 'split'},
				        {type: 'button',id:'CodeClassDefi_delebtn',text: '删除'},
				        {type: 'split'},
				        {type: 'button',id:'CodeClassDefi_rebtn',text: '刷新'},
				        {type: 'space',width:'100%'},
				        {type: 'label', text:'提示：对于已经建立分类结构的类别不能进行编辑和删除'}
				    ]
        	});
		
	//表格	
	var Table = Edo.create({
			    id: 'codeclassdefiTb', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
                    Edo.lists.Table.createMultiColumn(),
			    	{ dataIndex: 'id',visible : false},
			        { header: '类型名称', dataIndex: 'classname', headerAlign: 'center',align: 'center'},
			        { header: '类型代号', dataIndex: 'classcode', headerAlign: 'center',align: 'center' },
			        { header: '分类结构', dataIndex: 'flag', headerAlign: 'center',align: 'center',
			          renderer: function(val){
						    var text;
							if (val > 0) {
								text = "已建立分类结构";
								return '<span style="color:green;">' + text + '</span>';
							} else {
								text = "未建立分类结构";
								return '<span style="color:red;">' + text + '</span>';
							}
							return val;
			          }
			        },
			        { header: '码首字段', dataIndex: 'rule', headerAlign: 'center',align: 'center',
			        	renderer:function codeHead(val) {	
							var text = val.split("-");
							return text[0]; 
						}
			        }
			    ]    
			    
			});
	CodeClassDefi_addbtn.on('click', function(e){
	    var form = showAddForm();
	    form.reset();
		//createCodeClassDefi_check(1822);
	});
	
	
	CodeClassDefi_rebtn.on('click', function(e){
		codeclassdefiTb.set("data",
    			cims201.utils.getData('codeclass/code-class!findAllCodeClass.action')
    	);
	});
	
	CodeClassDefi_xgbtn.on('click', function(e){
		var record = codeclassdefiTb.getSelected();
	    if(!record) {
	        Edo.MessageBox.alert("提示", "请选中要编辑的记录");
	        return;
	    }else if(record.flag==1){
	    	 Edo.MessageBox.alert("提示", "已建立分类结构，此处不提供编辑功能！");
	        return;
	    }
	    var form = showEditForm();
	    record.codehead=record.rule.split('-')[0];
	    form.setForm(record);
	    
	});    
	
	CodeClassDefi_delebtn.on('click',function(e){
		var record = codeclassdefiTb.getSelected();
		
	    if(!record){
	        Edo.MessageBox.alert("提示","请选中要删除的记录");
	        return;
	    }else if(record.flag==1){
	    	 Edo.MessageBox.alert("提示","不能对已建立分类结构的类别进行删除操作！");
	        return;
	    }
	    Edo.MessageBox.confirm("提示", "是否删除选中的记录？", action);
	    function action(text){
	    	if(text=='yes'){
	            Edo.util.Ajax.request({
				    url: 'codeclass/code-class!deleteById.action',
				    type: 'post',
				    params:{id:record.id},
				    onSuccess: function(text){
				    	 Edo.MessageBox.alert("提示", "删除成功！");
				    	 Edo.get("CodeClassDefi_addbtn").set('enable',true);
				    },
				    onFail: function(code){
				        Edo.MessageBox.alert("提示", "删除失败"+code);
				    }
				});
	    		codeclassdefiTb.data.remove(record);
	    	}
	    
	    }   
		
	});
	
	function noEmpty(v){
	    if(v == "") return "不能为空";
	}	

	function classcodeRegex(v){
	    if (v.search(/^[A-Za-z0-9]+$/) != -1)
	        return true;
	    else return "类别代号格式错误";
	}
	function codeheadRegex(v){
	    if (v.search(/^[A-Za-z0-9]+$/) != -1)
	        return true;
	    else return "类别码首字段格式错误";
	}
	function showAddForm(e){
	    if(!Edo.get('addForm')) {
	        //创建用户面板
	        Edo.create({
	            id: 'addForm',            
	            type: 'window',title: '新增类别',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
						
	                    }
	                }
	            ],
	            children: [
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'100',label: '类别名称<span style="color:red;">*</span>:',
	                    children:[{type: 'text',width:'130',name: 'classname',valid: noEmpty,autoValid:false}]
	                },
	                {
	                    type: 'formitem',labelWidth :'100',label: '类别代号<span style="color:red;">*</span>:',
	                    children:[{type: 'text', width:'130',name: 'classcode',valid: classcodeRegex,autoValid:false}]
	                },
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'100',label: '类别码首字段<span style="color:red;">*</span>:',
	                    children:[{type: 'text', width:'130',name: 'codehead',valid: codeheadRegex,autoValid:false}]
	                },            
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(addForm.valid()){
	                                    var o = addForm.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'codeclass/code-class!insertClass.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	var data=Edo.util.Json.decode(text);
										    	Edo.MessageBox.alert("提示", data.message);
										    	if(data.isSuccess=='1'){
										    		var resultlist=data.resultlist;
										    		for(var i=0;i<resultlist.length;i++){
											    		for (var j=0;j<outputparam.length;j++){
															if(outputparam[j].name == resultlist[i].name){
																outputparam[j].value=resultlist[i].value;
															}
														}
										    		}
										    	}
										    	codeclassdefiTb.set("data",
			                                			cims201.utils.getData('codeclass/code-class!findAllCodeClass.action')
			                                			
			                                	);
										    	Edo.get("CodeClassDefi_addbtn").set('enable',false);
										    	 
										    	 
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "添加失败"+code);
										    }
										});
	                                    addForm.hide();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			addForm.destroy();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    }
	    addForm.show('center', 'middle', true);
	    return addForm;

	};
	
	
	
	function showEditForm(){
	    if(!Edo.get('editForm')) {
	        //创建用户面板
	        Edo.create({
	            id: 'editForm',            
	            type: 'window',title: '修改类别',
	            render: document.body,
	            width:260,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.hide();
	                    }
	                }
	            ],
	            children: [
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'100',label: '类别名称<span style="color:red;">*</span>:',
	                    children:[{type: 'text', width:'130',name: 'classname',valid: noEmpty}]
	                },
	                {
	                    type: 'formitem',labelWidth :'100',label: '类别代号<span style="color:red;">*</span>:',
	                    children:[{type: 'text', width:'130',name: 'classcode',valid: classcodeRegex}]
	                },
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'100',label: '类别码首字段<span style="color:red;">*</span>:',
	                    children:[{type: 'text', width:'130',name: 'codehead',valid: codeheadRegex}]
	                },
	                 {
	                    type: 'formitem',visible : false,label: '后台ID<span style="color:red;">*</span>:',
	                    children:[{type: 'text',name: 'id'}]
	                }, 
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(editForm.valid()){
	                                    var o = editForm.getForm();                                                            
	                                    Edo.util.Ajax.request({
										    url: 'codeclass/code-class!updateById.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	 	Edo.MessageBox.alert("提示", text);		
										    	 	codeclassdefiTb.set("data",
				                                			cims201.utils.getData('codeclass/code-class!findAllCodeClass.action')
				                                	);
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "修改失败");
										    }
										});
	                                    editForm.hide();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			editForm.reset();
	                    			editForm.hide();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    }
	    editForm.show('center', 'middle', true);
	    return editForm;
	}

	codeclassdefiTb.set("data",
			cims201.utils.getData('codeclass/code-class!findAllCodeClass.action')
	);
	
	this.getMenu=function(){
		return Menu;
	};
	this.getTable = function(){
		return Table;
	};
}
