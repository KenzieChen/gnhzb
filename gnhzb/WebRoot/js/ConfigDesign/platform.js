function createPlatform(){
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
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].value == '' || outputparam[i].value == null ||outputparam[i].value == 'null'){
				Edo.MessageBox.alert("提示",'输出参数值不完整');
				return null;
			}
				
		}
		
		return outputparam;
	}
	this.inittask=function(){
		return null;
	}
	var panel=Edo.create({
		type: 'panel', id:'', title:'<h3><font color="blue">平台类型</font></h3>', padding: [0,0,0,0],
		width:'100%', height:'100%', verticalGap: 0,
	    children:[
			{
    		    type: 'group',
    		    width: '100%',
			    layout: 'horizontal',
			    cls: 'e-toolbar',
			    children: [
			        {type: 'button',id:'paltform_createPlatForm',text: '新建平台'},
					{type: 'split'},
			        {type: 'button',id:'paltform_updatePlatForm',text: '编辑平台'}, 
					{type: 'split'},
			        {type: 'button',id:'paltform_deletePlatForm',text: '删除平台'},
			    ]
        	},
      		{
			    id: 'platform_platTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
			    padding:[0,0,0,0],rowSelectMode : 'single',
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
					{dataIndex:'id',visible:false},
					{dataIndex:'statusId',visible:false},
			        { header: '平台名称', enableSort: true, dataIndex: 'platName', headerAlign: 'center',align: 'center'},
			        //{ header: '搭建者', enableSort: true,dataIndex: 'inputUserName', headerAlign: 'center',align: 'center' },
			        //{ header: '审核者', enableSort: true, dataIndex: 'checkUserName', headerAlign: 'center',align: 'center'},
			        { header: '状态', enableSort: true, dataIndex: 'statusName', headerAlign: 'center',align: 'center',			        				        },
			        { header: '平台描述', enableSort: true, dataIndex: 'info', headerAlign: 'center',align: 'center'},
			        { header: '最后修改时间', enableSort: true, dataIndex: 'beginDate', headerAlign: 'center',align: 'center'}			      
			    ]    			    
			}
      ]
	
	});
	platform_platTable.set('data',cims201.utils.getData('platform/platform-manage!getAllPlatform.action'));
	
	paltform_createPlatForm.on('click',function(e){
		var form = showCreatePlatForm();
		form.reset();
	});
	
	paltform_updatePlatForm.on('click',function(e){
		if(platform_platTable.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择编辑项');
			return;
		}
		var form = showCreatePlatForm();
		form.set('title','编辑产品平台');
		form.setForm(platform_platTable.selected);
		//form.children[2].children[0].set('enable',false);
	});
	
	paltform_deletePlatForm.on('click',function(e){
		if(platform_platTable.selecteds.length!=1){
			Edo.MessageBox.alert('提示','请选择删除项');
			return;
		}
		Edo.MessageBox.confirm('提示','确定删除该平台吗？',function(action){
			if('yes'==action){
                Edo.util.Ajax.request({
				    url: 'platform/platform-manage!deletePlatform.action',
				    type: 'post',
				    params:{id:platform_platTable.selected.id},
				    onSuccess: function(text){
				    	if('平台删除成功！'==text){
					    	 platform_platTable.set('data',cims201.utils.getData('platform/platform-manage!getAllPlatform.action'));
				    	}
				    	 Edo.MessageBox.alert('提示',text);
				    	 Edo.get("paltform_createPlatForm").set('enable',true);
				    },
				    onFail: function(code){
				        //code是网络交互错误码,如404,500之类
				        Edo.MessageBox.alert("提示", "操作失败"+code);
				    }
				});
			}
		});
	});
	
	function showCreatePlatForm(){
	    if(!Edo.get('platform_CreatePlatForm')) {
	        //创建用户面板
	        Edo.create({
	            id: 'platform_CreatePlatForm',            
	            type: 'window',title: '新建产品平台',
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
	                {type:'formitem',visible:false,children:[{type:'text',name:'id'}]},
	                {
	                    type: 'formitem',padding:[20,0,10,0],labelWidth :'60',label: '平台名称:',
	                    children:[{type: 'text', width:'170',name: 'platName'}]
	                },
/*	                {
	                    type: 'formitem',labelWidth :'60',label: '审核人员:',
	                    children:[{type: 'combo', width:'170',name: ''}]
	                },*/
	                {
	                    type: 'formitem',padding:[10,0,0,0],labelWidth :'60',label: '平台描述:',
	                    children:[{type: 'textarea', width:'170',height:'100',name: 'info'}]
	                },                 
	                {
	                    type: 'formitem',layout:'horizontal', padding: [20,0,10, 0],
	                    children:[
	                        {type: 'button', text: '提交', 
	                            onclick: function(){
	                                if(platform_CreatePlatForm.valid()){
	                                    var o = platform_CreatePlatForm.getForm();
	                                    var urlStr ='';
	                                    if(platform_CreatePlatForm.title=='新建产品平台'){
	                                    	urlStr='platform/platform-manage!createPlatform.action';
	                                    	o.id=0;
	                                    }
	                                    if(platform_CreatePlatForm.title=='编辑产品平台'){
	                                    	urlStr='platform/platform-manage!updatePlatform.action';
	                                    }
	                                    console.log(o);
	                                    Edo.util.Ajax.request({
										    url: urlStr,
										    type: 'post',
										    params:o,
										    onSuccess: function(text){
										    	var data=Edo.util.Json.decode(text);
										    	Edo.MessageBox.alert("提示", data.message);
										    	if(data.type == 'create'){
										    		if(data.isSuccess == '1'){
											    		var resultlist=data.resultlist;
											    		for(var i=0;i<resultlist.length;i++){
												    		for (var j=0;j<outputparam.length;j++){
																if(outputparam[j].name == resultlist[i].name){
																	outputparam[j].value=resultlist[i].value;
																}
															}
											    		}
											    		platform_CreatePlatForm.destroy();				
											    	}
										    	}else{
											    	 platform_CreatePlatForm.destroy();										    		
										    	}
										    	 platform_platTable.set('data',cims201.utils.getData('platform/platform-manage!getAllPlatform.action'));
										    	 Edo.get("paltform_createPlatForm").set('enable',false);
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
	                    			platform_CreatePlatForm.destroy();
	                    		}
	                    	}
	                        
	                    ]
	                }
	            ]
	        });
	    }
	    platform_CreatePlatForm.show('center', 'middle', true);
	    return platform_CreatePlatForm;
	}
	
	this.getPanel =function(e){
		return panel;
	};

}
