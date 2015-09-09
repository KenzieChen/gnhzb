function createStructRule(){
	var structPanel = Edo.create({
		 type: 'ct',
         width: '220',
         height: '100%',
         collapseProperty: 'width',
         enableCollapse: true,
         splitRegion: 'west',
         splitPlace: 'after',
         children: [
            {
				type: 'panel', id:'', title:'主结构', padding: [0,0,0,0],
				width:'100%', height:'100%',verticalGap:0,
				titlebar:[
					{
				    	cls:'e-titlebar-toggle-west',
				        icon: 'button',
				        onclick: function(e){
				            this.parent.owner.parent.toggle();
				        }
					}
				],
				children:[
				      {
				    	  type:'group',
				    	  width:'100%',
				    	  cls:'e-toolbar',
				    	  children:[
							{	type:'combo', id:'structRule_combo',
								width:'150',
								readOnly : true,
								valueField: 'id',
							    displayField: 'classText',			    
							    onselectionchange: function(e){
							    	if(e.selectedItem.leaf==0){
							    		e.selectedItem.__viewicon=true;
							    		e.selectedItem.expanded=false;
							    		e.selectedItem.icon='e-tree-folder';
							    	}else{
							    		e.selectedItem.icon='e-tree-folder';
							    	}
							    	structRule_structTree.set('data',e.selectedItem);
							    }
							}       
				          ]
				      },
				      {
				    	  id:'structRule_structTree',type:'tree',width:'100%',height:'100%',
				    	  autoColumns:true,horizontalLine : false,verticalLine : false,headerVisible:false,
				    	  columns:[
				    	      {dataIndex:'classText',align: 'center'}
				    	  ],
				    	  onselectionchange:function(e){
				    		  //点击展开时候，调用了两次，第二次结果是undefine
				    		  if(!!e.selected){
				    			  //如果没有moduleId，则是根节点，没有规则
				    			  if(!!e.selected.moduleId){
				    				  var data = {platStructId:e.selected.id,moduleClassId:e.selected.moduleId};
						    		  structRule_partRuleTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data));
				    			  }else{
				    				  structRule_partRuleTable.set('data',{});
				    			  }
				    		  }
				    	  },
							onbeforetoggle: function(e){            			
								var row = e.record;
							    var dataTree = this.data;
							    if(!row.children || row.children.length == 0){
							        //this.addItemCls(row, 'tree-node-loading');
							        Edo.util.Ajax.request({
							            url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+ row.id,
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
							}
				      }
				]     
            }
         ]	
	});
	
	structRule_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
	//luweijiang
	function structRuleTask(platStructTreeId){
		structRule_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStructById.action',{id:platStructTreeId}));
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
			if(inputparam[i].name == 'platstructtreeid'){
				for(var j=0;j<outputparam.length;j++){
					if(outputparam[j].name == 'structruleplatstructtreeid'){
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
		var platstructtreeid=null;
		var isexist=false;
		for(var i=0;i<inputparam.length;i++){
			if(inputparam[i].name == 'platstructtreeid'){
				isexist=true;
				platstructtreeid=inputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data =cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStructById.action',{id:platstructtreeid});
			if(data.isSuccess == '1'){
				var resultdata=data.result;
				structRule_combo.set('data',resultdata);
			}else{
				structRule_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			structRule_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
			Edo.MessageBox.alert("提示","查询前置任务输出结果出错，请联系管理员！");
		}
	}
	var structRulePanel = Edo.create({
		type: 'panel', id:'', title:'<h3><font color="blue">配置规则处理</font></h3>', padding: [0,0,0,0],
		width:'100%', height:'100%', verticalGap: 0,
		children:[
				{
        		    type: 'group',
        		    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
				        {type: 'button',id:'structRule_addYesBtn',text: '编辑必选项'},
						{type: 'split'},
				        {type: 'button',id:'structRule_addOrBtn',text: '编辑可选项'},
						{type: 'split'},
				        {type: 'button',id:'structRule_addNotBtn',text: '编辑排除项'},	
				        {type: 'split'},
				        {type: 'button',id:'',text: '接口查看'},
				        {type: 'split'},
				        {type: 'button',id:'',text: '刷新'},
				        {type: 'space',width:'100%'},
				        {type: 'button',id:'structRule_checkStruct',text:'提交审核'}
				    ]
	        	},
	      		{
				    id: 'structRule_partRuleTable', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
				        { header: '零件名称', enableSort: true, dataIndex: 'partname', headerAlign: 'center',align: 'center'},
				        { header: '零件编码', enableSort: true,dataIndex: 'partnumber', headerAlign: 'center',align: 'center' },
				        { header: '必选项', enableSort: true, dataIndex: 'and', headerAlign: 'center',align: 'center'},
				        { header: '可选项', enableSort: true, dataIndex: 'or', headerAlign: 'center',align: 'center'},
				        { header: '排除项', enableSort: true, dataIndex: 'not', headerAlign: 'center',align: 'center'},				        			      
				    ]
	        	}
	   ]
	});
/*	Edo.managers.TipManager.reg({
		target: structRule_partRuleTable.columns[4],               //注册提示的对象                //
	    html: '哈哈',
	    title: '必选项',
	    
	    //ontipshow: Edo.emptyFn,
	    //ontiphide: Edo.emptyFn,
	    
	    showTitle: true,           //是否显示标题
	    autoShow: true,             //是否mouseover显示
	    autoHide: true,             //是否mouseout隐藏
	   // showClose: false,           //是否显示关闭按钮
	   // showImage: false,           //
	    trackMouse: true,          //是否跟随鼠标移动而显示
	  //  showDelay: 200,             //显示延迟
	    hideDelay: 100,             //隐藏延迟            
	    mouseOffset:[15,18]         //显示的偏移坐标
	});*/
	
	structRule_checkStruct.on('click',function(e){
		var platName = structRule_combo.selectedItem.classText;
		Edo.MessageBox.confirm('提示','是否提交名称为：<br><span style="color:red">'+platName+'</span><br>的产品平台进行审核？',function(action){
			if(action=='yes'){
				var platId = structRule_combo.selectedItem.plat.id;			
				Edo.util.Ajax.request({
				    url: 'platform/platform-manage!changePlat2CheckStatus.action',
				    type: 'post',
				    params:{id:platId},
				    onSuccess: function(text){
				    	if("提交审核成功！"==text){
				    		//platformStruct_combo.set('data',cims201.utils.getData('platform/plat-struct-tree!getUnfinishedPlatStruct.action'));
				    		//platformStruct_combo.set('selectedIndex',0);
				    		//platformStruct_gridtree.set('data',[]);
				    		Edo.MessageBox.alert('提示',text);
				    	}else{
				    		Edo.MessageBox.alert('提示','未知错误，请与管理员联系');
				    	}					    	
				    },
				    onFail: function(code){
				        //code是网络交互错误码,如404,500之类
				        Edo.MessageBox.alert("提示", "操作失败"+code);
				    }
				});
			}
		});
	});
	
	structRule_addYesBtn.on('click',function(e){
		if(structRule_partRuleTable.selecteds.length==0){
			Edo.MessageBox.alert('提示','请选择编辑项');
			return;
		}
		var win =showAddAndWin();
		var title ='<span style="color:red;">'+structRule_structTree.selected.classText+'-'+structRule_partRuleTable.selected.partnumber+'</span>增加必选项';
		win.set('title',title);
		var platId = structRule_structTree.selected.platId;
		var moduleId = structRule_structTree.selected.moduleId;
		var platStructId = structRule_structTree.selected.id;
		var partId = structRule_partRuleTable.selected.id;
		var data4AllParts = {platId:platId,moduleClassId:moduleId};
		var data4SelectedParts ={platStructId:platStructId,moduleClassId:moduleId,partId:partId,status:1};
		structRule_allPartsTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllPartsByPlatId.action',data4AllParts));
		structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data4SelectedParts));
	});
	structRule_addOrBtn.on('click',function(e){
		if(structRule_partRuleTable.selecteds.length==0){
			Edo.MessageBox.alert('提示','请选择编辑项');
			return;
		}
		var win = showAddAndWin();
		var title ='<span style="color:red;">'+structRule_structTree.selected.classText+'-'+structRule_partRuleTable.selected.partnumber+'</span>增加可选项';
		win.set('title',title);
		var platId = structRule_structTree.selected.platId;
		var moduleId = structRule_structTree.selected.moduleId;
		var platStructId = structRule_structTree.selected.id;
		var partId = structRule_partRuleTable.selected.id;
		var data4AllParts = {platId:platId,moduleClassId:moduleId};
		var data4SelectedParts ={platStructId:platStructId,moduleClassId:moduleId,partId:partId,status:2};
		structRule_allPartsTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllPartsByPlatId.action',data4AllParts));
		structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data4SelectedParts));
	});
	structRule_addNotBtn.on('click',function(e){
		if(structRule_partRuleTable.selecteds.length==0){
			Edo.MessageBox.alert('提示','请选择编辑项');
			return;
		}
		var win = showAddAndWin();
		var title ='<span style = "color:red;">'+structRule_structTree.selected.classText+'-'+structRule_partRuleTable.selected.partnumber+'</span>增加排除项';
		win.set('title',title);
		var platId = structRule_structTree.selected.platId;
		var moduleId = structRule_structTree.selected.moduleId;
		var platStructId = structRule_structTree.selected.id;
		var partId = structRule_partRuleTable.selected.id;
		var data4AllParts = {platId:platId,moduleClassId:moduleId};
		var data4SelectedParts ={platStructId:platStructId,moduleClassId:moduleId,partId:partId,status:3};
		structRule_allPartsTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllPartsByPlatId.action',data4AllParts));
		structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data4SelectedParts));
	});
	
	function showAddAndWin(){
		if(!Edo.get('structRule_addAndWin')){
			Edo.create({
				id:'structRule_addAndWin',
				type:'window',
				title:'增加必选项',
	            render: document.body,
	            width:900,height:550,
	            titlebar: [
	                {
	                    cls: 'e-titlebar-close',
	                    onclick: function(e){
	                    this.parent.owner.destroy();
	                    }
	                }
	            ],
	            layout:'vertical',verticalGap:0,padding:[0,0,0,0],
	            children:[
	                      {type:'ct',layout:'horizontal',width:'100%',height:'95%',children:[
    	                      {
    	                    	  type:'panel',title:'已选的零部件',
    	                    	  width:300,height:'100%',
    	                    	  collapseProperty: 'width',
    	                          enableCollapse: true,
    	                          splitRegion: 'west',
    	                          splitPlace: 'after',
    	                          padding:[0,0,0,0],
    	                    	  titlebar:[
	                                    {
	                                        cls:'e-titlebar-toggle-west',
	                                        icon: 'button',
	                                        onclick: function(e){
	                                            this.parent.owner.toggle();
	                                        }
	                                    }
	                                ],
	                                children:[
                                          {
                                  			type:'table',id:"structRule_partsSelectedTable",width:'100%',height:'100%',
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
												{header:'编码',dataIndex:'partNumber',align:'center',headerAlign:'center'},
												{header:'名称',dataIndex:'partName',align:'center',headerAlign:'center'}
                                  			],
                                  			onselectionchange:function(e){}
                                          }
	                                ]
    	                      },
    	                      {
    	                    	  type:'panel',title:'所有零部件信息',
    	                    	  width:'100%',height:'100%',padding:[0,0,0,0],
    	                    	  children:[
    	                    	     {
										type:'tree',
										id:'structRule_allPartsTable',
										autoColumns :true,
										width:'100%',
										height:'100%',
										columns:[  
										    {header:'',dataIndex:'',width:'5',renderer:function(){return '';}},
										    Edo.lists.Table.createMultiColumn(),
										    {dataIndex:'id',visible:false},
											{header:'编码',dataIndex:'partNumber',align:'center',headerAlign:'center'},	
											{header:'名称',dataIndex:'partName',align:'center',headerAlign:'center'},
                              				{header:'零件描述',dataIndex:'description',align:'center',headerAlign:'center'},
										]
    	                    	     }
    	                    	  ]
    	                      }
	                      ]},
	                      {
	                    	  type:'box',layout:'horizontal',width:'100%',height:'7%',children:[
	                    	      {type:'space',width:'100%'},
	                    	      {type:'button',text:'查看事物特性'},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'增加',onclick:function(e){
	                    	    	  if(structRule_allPartsTable.selecteds.length!=1){
	                    	    		  Edo.MessageBox.alert('提示','未选择增加项');
	                    	    		  return;
	                    	    	  }else if(!structRule_allPartsTable.selected.id){
	                    	    		  Edo.MessageBox.alert('提示','未选择增加项');
	                    	    		  return;
	                    	    	  }
	                    	    	  var platId = structRule_structTree.selected.platId;
	                    	    	  var platStructId = structRule_structTree.selected.id;
	                    	    	  var moduleClassId = structRule_structTree.selected.moduleId;
	                    	    	  var classCode = structRule_structTree.selected.classCode;
	                    	    	  var classText = structRule_structTree.selected.classText;
	                    	    	  var partId = structRule_partRuleTable.selected.id;
	                    	    	  var partSelectedId = structRule_allPartsTable.selected.id;
	                    	    	  var info="";
	                    	    	  var status =0;
	                    	    	  var title = structRule_addAndWin.title.substr(-5);
	                    	    	  if(title=='增加必选项'){
	                    	    		  status = 1;
	                    	    	  }else if(title=='增加可选项'){
	                    	    		  status = 2;
	                    	    	  }else if(title=='增加排除项'){
	                    	    		  status = 3;
	                    	    	  }
	                    	    	  var formData = {platId:platId,platStructId:platStructId,moduleClassId:moduleClassId,
	                    	    			  classCode:classCode,classText:classText,partId:partId,partSelectedId:partSelectedId,
	                    	    			  info:info,status:status};
	                			      Edo.util.Ajax.request({
	                						url:'platform/plat-struct-confi-rule!addPartRule.action',
	                						type:'post',
	                						params:formData,
	                						onSuccess:function(text){								
	                							if("添加成功！"==text){
	                								var data1 ={platStructId:platStructId,moduleClassId:moduleClassId,partId:partId,status:status};
	                								structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data1));
	                								var data2 = {platStructId:platStructId,moduleClassId:moduleClassId};
	          						    		    structRule_partRuleTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data2));
	                							}    					
	                							Edo.MessageBox.alert("提示",text);
	                						},
	                						onFail:function(code){
	                							alert(code);
	                						}
	                					});
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'删除',onclick:function(e){
	                    	    	  if(structRule_partsSelectedTable.selecteds.length!=1){
	                    	    		  Edo.MessageBox.alert('提示','未选择删除项');
	                    	    		  return;
	                    	    	  }
	                    	    	  var platStructId = structRule_structTree.selected.id;
	                    	    	  var moduleClassId = structRule_structTree.selected.moduleId;
	                    	    	  var partId = structRule_partRuleTable.selected.id;
	                    	    	  var partSelectedId = structRule_partsSelectedTable.selected.id;
	                    	    	  var status =0;
	                    	    	  var title = structRule_addAndWin.title.substr(-5);
	                    	    	  if(title=='增加必选项'){
	                    	    		  status = 1;
	                    	    	  }else if(title=='增加可选项'){
	                    	    		  status = 2;
	                    	    	  }else if(title=='增加排除项'){
	                    	    		  status = 3;
	                    	    	  }
	                    	    	  var formData ={platStructId:platStructId,partId:partId,partSelectedId:partSelectedId,status:status};
	                    	    	  Edo.util.Ajax.request({
	                						url:'platform/plat-struct-confi-rule!deletePartRule.action',
	                						type:'post',
	                						params:formData,
	                						onSuccess:function(text){								
	                							if("删除成功！"==text){
	                								var data ={platStructId:platStructId,moduleClassId:moduleClassId,partId:partId,status:status};
	                								structRule_partsSelectedTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getSelectedParts.action',data));
	                								var data2 = {platStructId:platStructId,moduleClassId:moduleClassId};
	          						    		    structRule_partRuleTable.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data2));
	                							}    					
	                							Edo.MessageBox.alert("提示",text);
	                						},
	                						onFail:function(code){
	                							alert(code);
	                						}
	                					});
	                    	    	  
	                    	      }},
	                    	      {type:'space',width:'10'},
	                    	      {type:'button',text:'取消',onclick:function(e){
	                    	    	  structRule_addAndWin.destroy();
	                    	      }}
	                    	  ]
	                      }
	             ]
			
			});
		}

		structRule_addAndWin.show('center','middle',true);
		return structRule_addAndWin;
	}
	this.getStructPanel = function(){
		return structPanel;
	};
	
	this.getStructRulePanel = function(){
		return structRulePanel;
	};
	//审批测试
}
