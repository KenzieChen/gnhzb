function createCodeClassRuleManage(){
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
			if(inputparam[i].name == 'codeclassid'){
				for(var j=0;j<outputparam.length;j++){
					if(outputparam[j].name == 'codeclassrulemanagecodeclassid'){
						outputparam[j].value=inputparam[i].value;
						isexist=true;
						break;
					}
				}
				}
				break;
			}
		if(!isexist){
			Edo.MessageBox.alert('提示','对应的编码大类不存在');
			return null;
		}
		return outputparam;
	}
	//luweijiang
	this.inittask=function(){
		var codeClassId=null;
		var isexist=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'codeclassid'){
				isexist=true;
				codeClassId=inputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data=cims201.utils.getData('codeclass/code-class!findUnConstructedCodeClassById.action',{id:codeClassId});
			if(data.isSuccess == '1'){
				ClassNameCombo.set('data',data.result);
			}else{
				ClassNameCombo.set('data',
					cims201.utils.getData('codeclass/code-class!findUnConstructedCodeClass.action')
				);
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			ClassNameCombo.set('data',
				cims201.utils.getData('codeclass/code-class!findAllCodeClass.action')
			);
			Edo.MessageBox.alert('提示',"查询上一任务输出结果出错，请联系管理员！");
		}
	}
	var topbar = Edo.create({
		
			type:'box',width: '100%',height: '40',cls: 'e-toolbar',
			layout:'horizontal',
			children:[
				{	type:'label',text:'请选择分类：'},
				{	type:'combo', id:'ClassNameCombo',
					width:'150',
					Text :'请先选择适合的分类',
					readOnly : true,
					valueField: 'id',
				    displayField: 'classname',			    
				    onselectionchange: function(e){
				    	newLayerBtn.set('enable',true);
				    	
				    	 CodeClassRuleManageTree.set('data',
				    			 cims201.utils.getData('codeclass/code-class!getRule.action',
				    					 {classcode:e.selectedItem.classcode}
				    			 )
				    	);				        
				    }
			    },
			    { 	type:'space', width:'20'},
			    {	type:'button',id:'newLayerBtn',text:'增加新层',enable:false},
			    {type: 'split'},
			    {	type:'button',id:'editLayerBtn',text:'编辑层',enable:false},
			    {type: 'split'},
			    {	type:'button',id:'deleLayerBtn',text:'删除层',enable:false}
			]
		
	});
	ClassNameCombo.set('data',cims201.utils.getData('codeclass/code-class!findAllCodeClass.action'));
	
	var ruleTree=Edo.create({
		type:'tree',id:'CodeClassRuleManageTree',width:'100%',height:'100%',
		headerVisible:false,
	    autoColumns: true,
	    horizontalLine: false,
		columns: [
	        {
	            dataIndex: 'text'
	        }
	    ],
	    data:[{'text':'请  选择大类'}],
	    onselectionchange: function(e){
	    	if(e.selected.__index!=0){
	    		editLayerBtn.set('enable',true);
	    		deleLayerBtn.set('enable',true);
	    	}else{
	    		editLayerBtn.set('enable',false);
	    		deleLayerBtn.set('enable',false);
	    	}
	    }
		
	});
	
	newLayerBtn.on('click',function(e){
		var form=showAddNewLayerForm();
		form.reset();
		form.setForm({classcode : ClassNameCombo.selectedItem.classcode});
	});
	
	
	editLayerBtn.on('click',function(e){
		var form=showEditLayerForm();
		form.reset();
		var value = CodeClassRuleManageTree.selected.value;
		var valueAra = value.split(":");
		var ruleNode = valueAra[1];
		var ruleLayerNub = valueAra[0];
		form.setForm(
			{
				encodetype:ruleNode.substr(0,1),
				codelength:ruleNode.substr(1),
				classcode : ClassNameCombo.selectedItem.classcode,
				ruleLayerNub:ruleLayerNub			
			}
		);
	});
	
	deleLayerBtn.on('click',function(e){
		var value = CodeClassRuleManageTree.selected.value;
		var ruleLayerNub = value.split(":")[0];
		Edo.util.Ajax.request({
		    url: 'codeclass/code-class!deleteRuleNode.action',
		    type: 'post',
		    params:{
		    	classcode:ClassNameCombo.selectedItem.classcode,
		    	ruleLayerNub:ruleLayerNub
		    },
		    onSuccess: function(text){
		    	 /*Edo.util.Ajax.request({
				    url: 'codeclass/getRuleByCode.action?clss='+ClassNameCombo.selectedItem.classcode,
				    type: 'get',
				    onSuccess: function(text){
				    	var o = Edo.util.Json.decode(text);
				        CodeClassRuleManageTree.set('data',o);
				        
				    },
				    onFail: function(code){
				        alert(code);
				    }
				});*/
		    	Edo.MessageBox.alert("提示", text);
		    	CodeClassRuleManageTree.set('data',
		    			 cims201.utils.getData('codeclass/code-class!getRule.action',
		    					 {classcode:ClassNameCombo.selectedItem.classcode}
		    			 )
		    	);
		    },
		    onFail: function(code){
		        Edo.MessageBox.alert("提示", "删除失败"+code);
		    }
		});
		
	});
	
	
	function showAddNewLayerForm(){
		
	    if(!Edo.get('addNewLayerForm')) {
	        Edo.create({
	            id: 'addNewLayerForm',            
	            type: 'window',title: '新增当前类编码层',
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
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'80',label: '编码类型：',
	                    children:[
	                    	{	type:'combo', id:'ClassCodeTypeCombo',
								width:'130',
								name:'encodetype',
								text:'请选择...',
								valueField: 'encodetype',
							    displayField: 'disvalue',	
							    data:[
							    	{encodetype:"N",disvalue:"数字型"},
							    	{encodetype:"C",disvalue:"字符型"},
							    	{encodetype:"B",disvalue:"混合型"}
							    ],
							    readOnly : true,
							    valid :nullRegex
						    }	
	                   ]
	                },
	                {
	                    type: 'formitem',labelWidth :'80',label: '编码长度：',
	                    children:[
	                    	{type: 'text', width:'130',name: 'codelength',valid :numberRegex}
	                    ]
	                },
	                {
	                	type:'formitem',visible : false,label:'编码类别',
	                	children:[
	                		{type:'text',name:'classcode'}
	                	]               	
	                },
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(addNewLayerForm.valid()){
	                                    var o = addNewLayerForm.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'codeclass/code-class!updateRule.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	 Edo.MessageBox.alert("提示", text);									    	 
										    	 CodeClassRuleManageTree.set('data',
										    			 cims201.utils.getData('codeclass/code-class!getRule.action',
										    					 {classcode:ClassNameCombo.selectedItem.classcode}
										    			 )
										    	);
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "新增失败"+code);
										    }
										});
	                                    addNewLayerForm.hide();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			addNewLayerForm.reset();
	                    			addNewLayerForm.hide();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    };
	    addNewLayerForm.show('center', 'middle', true);
	    return addNewLayerForm;
	};
	
	
	function showEditLayerForm(){
		
	    if(!Edo.get('editLayerForm')) {
	        //创建用户面板
	        Edo.create({
	            id: 'editLayerForm',            
	            type: 'window',title: '编辑当前类编码层',
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
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'80',label: '编码类型：',
	                    children:[
	                    	{	type:'combo', id:'ClassCodeTypeCombo2',
								width:'130',
								name:'encodetype',
								text:'请选择...',
								valueField: 'encodetype',
							    displayField: 'disvalue',	
							    data:[
							    	{encodetype:"N",disvalue:"数字型"},
							    	{encodetype:"C",disvalue:"字符型"},
							    	{encodetype:"B",disvalue:"混合型"}
							    ],
							    readOnly : true
						    }
	                    		
	                   ]
	                },
	                {
	                    type: 'formitem',labelWidth :'80',label: '编码长度：',
	                    children:[
	                    	{type: 'text', width:'130',name: 'codelength',valid :numberRegex}
	                    ]
	                },
	                {
	                	type:'formitem',visible : false,label:'编码类别',
	                	children:[
	                		{type:'text',name:'classcode'}
	                	]               	
	                },
	                {
	                	type:'formitem',visible : false,label:'编码层次',
	                	children:[
	                		{type:'text',name:'ruleLayerNub'}
	                	]               	
	                },
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {name: 'submitBtn', type: 'button', text: '确定', 
	                            onclick: function(){
	                                if(editLayerForm.valid()){
	                                    var o = editLayerForm.getForm();
	                                    Edo.util.Ajax.request({
										    url: 'codeclass/code-class!updateRule2.action',
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	Edo.MessageBox.alert("提示", text);									    	 
										    	 CodeClassRuleManageTree.set('data',
										    			 cims201.utils.getData('codeclass/code-class!getRule.action',
										    					 {classcode:ClassNameCombo.selectedItem.classcode}
										    			 )
										    	);
										    },
										    onFail: function(code){
										        //code是网络交互错误码,如404,500之类
										        Edo.MessageBox.alert("提示", "修改失败"+code);
										    }
										});
	                                    editLayerForm.hide();
	                                }
	                            }
	                        },
	                        {type: 'space', width:50},
	                        {name: 'cancleBtn', type:'button', text:'取消',
	                    		onclick:function(){
	                    			editLayerForm.reset();
	                    			editLayerForm.hide();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    };
	    editLayerForm.show('center', 'middle', true);
	    return editLayerForm;
	};

	
	function nullRegex(){
	    if (ClassCodeTypeCombo.text=="请选择..." ||ClassCodeTypeCombo.text=="")
	        return "请选择编码类型!";
	    else return true;
	};
	
	function numberRegex(v){
	    if (v.search(/^[0-9]+$/) != -1 & v>0)
	        return true;
	    else return "请输入大于零的数字!";
	};
	
	this.getTopbar = function(){
		return topbar;
	};
	this.getRuleTree = function(){
		return ruleTree;
	};
	//codeClassRuleManageTask(1822);
	//测试审批
	//createCodeClassRuleManage_check(601);
}
