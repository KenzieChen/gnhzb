function createStructUpload(){
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
			       {	type:'combo', id:'StructUploadClassNameCombo',
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
					    	StructUploadTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'StructUploadTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
				   //点击展开会调用两次，第二次的selected未定义
				   if(e.selected){
					   if(e.selected.id){
						   StructUpload_ModelTable.set("data",
			               			cims201.utils.getData('draft/upload-model!getModelByTreeId.action?treeId='+e.selected.id)
			               	   );
						   StructUpload_SelfTable.set("data",
			               			cims201.utils.getData('draft/upload-self!getSelfByTreeId.action?treeId='+e.selected.id)
			               	   );
					   }
				   }
				},
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	//StructUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function structUploadTask(classficationTreeId){
		StructUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
	}
	
	var uploadPanel =Edo.create({
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		children:[
	          {
	        	type:'panel',title :'主模型列表',layout:'vertical',verticalGap:0,width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'StructUpload_UploadModelBtn',text:'上传主模型'},
        	             {type:'split'},
        	             {type:'button',id:'StructUpload_DeleModelBtn',text:'删除主模型'},
        	             {type:'split'},
        	             {type:'button',id:'StructUpload_EditModelPicBtn',text:'编辑分类示意图'}
		        	   ]
		           },
		           {
		        	   type:'table',id:'StructUpload_ModelTable',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
		        	        {header:'id',dataIndex:'id',visible:false},
	        	            {header:'主模型名称',dataIndex:'draftName',headerAlign: 'center',align:'center'},
	        	            {header:'类型',dataIndex:'typeName',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	        	            		if(v=="主模型"){
	        	            			return "<font color='red'>"+v+"</font>";
	        	            		}else{
	        	            			return "<font color='#5E2612'"+v+"</font>";
	        	            		}
	        	            	}
	        	            },
	        	            {header:'格式',dataIndex:'draftSuffix',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	    							if (v == "gif" || v == "GIF" || v == "jpg"
	    									|| v == "JPG" || v == "png" || v == "PNG"
	    									|| v == "BMP" || v == "bmp") {
	    								return "<img src='images/modManageImages/page_white_picture.png'>";
	    							} else if (v == "doc" || v == "DOC" || v == "docx"
	    									|| v == "DOCX") {
	    								return "<img src='images/modManageImages/page_word.png'>";
	    							} else if (v == "ppt" || v == "PPT" || v == "pptx"
	    									|| v == "PPTX") {
	    								return "<img src='images/modManageImages/page_white_powerpoint.png'>";
	    							} else if (v == "txt" || v == "TXT") {
	    								return "<img src='images/modManageImages/page_white_text.png'>";
	    							} else if (v == "pdf" || v == "PDF") {
	    								return "<img src='images/modManageImages/page_white_acrobat.png'>";
	    							} else if (v == "XLS" || v == "xls" || v == "XLSX"
	    									|| v == "xlsx") {
	    								return "<img src='images/modManageImages/page_excel.png'>";
	    							} else {
	    								return "<img src='images/modManageImages/page.png'>";
	    							}
	    						
	        	            	}
	        	            },
	        	            {header:'描述',dataIndex:'description',headerAlign: 'center',align:'center'},
	        	            {header:'操作',dataIndex:'ismaster',headerAlign: 'center',align:'center',
	        	            	renderer:function(v,r){
	        	            		return "<span style='margin-right:10px'><a href='draft/download-model.action?fileName="+r.fileName+"&draftName="+r.draftName+"'><img src='images/modManageImages/20060905030245247.gif'></img></a></span>";
	        	            	}
	        	            }
		        	   ]
		           }
	        	]
	          },
	          {
	        	type:'panel',title :'自定义图文档列表',layout:'vertical',verticalGap:0, width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'StructUpload_UploadSelfDefiDocBtn',text:'上传自定义图文档'},
        	             {type:'split'},
        	             {type:'button',id:'StructUpload_DeleSelfDefiDocBtn',text:'删除自定义图文档'}
		        	   ]
		           },
		           {
		        	   type:'table',id:'StructUpload_SelfTable',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
		        	        {header:'id',dataIndex:'id',visible:false},
	        	            {header:'图文档名称',dataIndex:'draftName',headerAlign: 'center',align:'center'},
	        	            {header:'类型',dataIndex:'typeName',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	        	            		if(v=="主模型"){
	        	            			return "<font color='red'>"+v+"</font>";
	        	            		}else{
	        	            			return "<font color='#5E2612'>"+v+"</font>";
	        	            		}
	        	            	}
	        	            },
	        	            {header:'格式',dataIndex:'draftSuffix',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	    							if (v == "gif" || v == "GIF" || v == "jpg"
	    									|| v == "JPG" || v == "png" || v == "PNG"
	    									|| v == "BMP" || v == "bmp") {
	    								return "<img src='images/modManageImages/page_white_picture.png'>";
	    							} else if (v == "doc" || v == "DOC" || v == "docx"
	    									|| v == "DOCX") {
	    								return "<img src='images/modManageImages/page_word.png'>";
	    							} else if (v == "ppt" || v == "PPT" || v == "pptx"
	    									|| v == "PPTX") {
	    								return "<img src='images/modManageImages/page_white_powerpoint.png'>";
	    							} else if (v == "txt" || v == "TXT") {
	    								return "<img src='images/modManageImages/page_white_text.png'>";
	    							} else if (v == "pdf" || v == "PDF") {
	    								return "<img src='images/modManageImages/page_white_acrobat.png'>";
	    							} else if (v == "XLS" || v == "xls" || v == "XLSX"
	    									|| v == "xlsx") {
	    								return "<img src='images/modManageImages/page_excel.png'>";
	    							} else {
	    								return "<img src='images/modManageImages/page.png'>";
	    							}
	    						
	        	            	}
	        	            },
	        	            {header:'描述',dataIndex:'description',headerAlign: 'center',align:'center'},
	        	            {header:'操作',dataIndex:'ismaster',headerAlign: 'center',align:'center',
	        	            	renderer:function(v,r){
	        	            		return "<span style='margin-right:10px'><a href='draft/download-self.action?fileName="+r.fileName+"&draftName="+r.draftName+"'><img src='images/modManageImages/20060905030245247.gif'></img></a></span>";
	        	            	}
	        	            }
		        	   
		        	   ]
		           }
	        	]
	          }
		]
	});
	//点击上传主模型
	StructUpload_UploadModelBtn.on('click',function(e){
		if(!StructUploadTree.selected){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(!StructUploadTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}
		var form = showUploadModelWin();
		StructUpload_UploadModel.inputField.value="";
		form.reset();
	});
	
	//点击删除主模型
	StructUpload_DeleModelBtn.on('click',function(e){
		if(!StructUploadTree.selected){
			Edo.MessageBox.alert("提示","请先选择主模型所属分类");
			return;
		}else if(!StructUploadTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择主模型所属分类");
			return;
		}else if(!StructUpload_ModelTable.selected){
			Edo.MessageBox.alert("提示","请先选择删除项");
			return;
		}else{
			Edo.MessageBox.confirm ("提示","您确定要删除该项吗",function(action){
				if(action=='yes'){
					Edo.util.Ajax.request(
						    {
						        type: "post",                       
						        url: 'draft/tree-draft!deleteModel.action', 
						         params: {                    
						            id: StructUpload_ModelTable.selected.id, 
						            fileName: StructUpload_ModelTable.selected.fileName
						        },                      
						        onSuccess: function(text){     
						            	Edo.MessageBox.alert("提示",text);
						            	StructUpload_ModelTable.set("data",
						               			cims201.utils.getData('draft/upload-model!getModelByTreeId.action?treeId='+StructUploadTree.selected.id)
						               	);
						            	StructUpload_ModelTable.selected=null;
						         },         
						        onFail: function(code){ 
						        	Edo.MessageBox.alert("提示","删除失败"+code);
						         }            
						    }
						);
				}
			});
		}
		
	});
	//编辑分类示意图
	StructUpload_EditModelPicBtn.on('click',function(e){

		if(!StructUploadTree.selected){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(!StructUploadTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}
		var form = showEditModelPicWin();
		StructUpload_ModelImgView.children[0].set('text',
        		'<image src="draft/tree-draft!viewModelImg.action?treeId='+StructUploadTree.selected.id+'"  width="100%" height="100%"/>'
          );
		StructUpload_UploadModelPic.inputField.value="";
		form.reset();
	
		
	});
	//点击上传自定义图文档
	StructUpload_UploadSelfDefiDocBtn.on('click',function(e){
		if(!StructUploadTree.selected){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}else if(!StructUploadTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择分类！");
			return;
		}
		
		var form = showUploadSelfDefiDocWin();
		StructUpload_UploadSelfDefiDoc.inputField.value="";
		form.reset();
		StructUpload_TypeNameCombo.set('data',
				cims201.utils.getData('draft/draft-type!getAllIsnotMaster.action')
		);
	});
	//点击删除自定义图文档
	StructUpload_DeleSelfDefiDocBtn.on('click',function(e){
		if(!StructUploadTree.selected){
			Edo.MessageBox.alert("提示","请先选择主模型所属分类");
			return;
		}else if(!StructUploadTree.selected.id){
			Edo.MessageBox.alert("提示","请先选择主模型所属分类");
			return;
		}else if(!StructUpload_SelfTable.selected){
			Edo.MessageBox.alert("提示","请先选择删除项");
			return;
		}else{
			Edo.MessageBox.confirm ("提示","您确定要删除该项吗",function(action){
				if(action=='yes'){
					Edo.util.Ajax.request(
						    {
						        type: "post",                       
						        url: 'draft/tree-draft!deleteDeleSelfDefiDoc.action', 
						         params: {                    
						            id: StructUpload_SelfTable.selected.id, 
						            fileName: StructUpload_SelfTable.selected.fileName
						        },                      
						        onSuccess: function(text){     
						            	Edo.MessageBox.alert("提示",text);
						            	StructUpload_SelfTable.set("data",
						               			cims201.utils.getData('draft/upload-self!getSelfByTreeId.action?treeId='+StructUploadTree.selected.id)
						               	);
						            	StructUpload_SelfTable.selected=null;
						         },         
						        onFail: function(code){ 
						        	Edo.MessageBox.alert("提示","删除失败"+code);
						         }            
						    }
						);
				}
			});
		}
		
	});
	function showUploadModelWin(){
		if(!Edo.get('StructUpload_UploadModelWin')){
			Edo.create({
				id:'StructUpload_UploadModelWin',
				type:'window',title:'上传主模型',
				render:document.body,
				width:320,
				padding:[20,20,20,20],
				titlebar:[
		          {cls:'e-titlebar-close',
		        	onclick:function(e){
		        		this.parent.owner.hide();
		        	}  
		          }
				],
				children:[
			          {type:'formitem',labelWidth:'70',label:'模型名称：',children:[{type:'text',name:'draftName',width:'200',valid:noEmpty}]},
			          {type:'formitem',labelWidth:'70',label:'模型上传：',padding:[10,0,10,0],
			        	children:[{type:'fileupload',
			        	  id:'StructUpload_UploadModel',
			        	  width:'200',
			              swfUploadConfig: {              
			                  upload_url: 'draft/upload-model!uploadModel.action', 
			                  flash_url : 'js/swfupload/swfupload.swf',
			                  flash9_url : "js/swfupload/swfupload_fp9.swf",
			                  button_image_url : 'js/swfupload/XPButtonNoText_61x22.png',     
			                  button_text : '<span class="browseButton">浏&nbsp;览</span>',       
			                  button_text_style : '.browseButton {text-align: center;font-weight: bold; font-size: 12pt;}', 
			                  file_types: '*',                       
			                  file_post_name: 'file',                                
			                  file_size_limit: '10MB'            
			              }, 
			              onfilequeueerror: function(e){
			                  Edo.MessageBox.alert("提示","文件选择错误:"+e.message);
			              },
			              onfilestart: function(e){   
			                  //alert("开始上传");
			                  StructUpload_UploadModelWin.mask();
			                  Edo.MessageBox.show({
			                	  title:"提示",
			                      msg: '模型上传中，请稍后...',
			                      progressText: '保存中...',
			                      width:300,
			                      progress:true,
			                      wait:true,
			                      interval: 300,
			                      buttons: Edo.MessageBox.CANCEL,
			                      callback: function(action){

			                    	  if(action=="cancel"){
			                    		  StructUpload_UploadModel.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(StructUpload_UploadModelWin){
			            		  StructUpload_UploadModelWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  StructUpload_UploadModelWin.destroy();
			                  StructUpload_ModelTable.set("data",
				               			cims201.utils.getData('draft/upload-model!getModelByTreeId.action?treeId='+StructUploadTree.selected.id)
				               	   );
			              }  
			          }]},
			          {type:'formitem',labelWidth:'70',label:'模型描述:',padding:[0,0,15,0],children:[{type:'text',name:'description',width:'200'}]},
			          {type:'formitem',layout:'horizontal',
			        	children:[
		        	          {type:'button',text:'确定上传',
		        	        	  onclick:function(){
		        	        		  if(StructUpload_UploadModelWin.valid()){
		        	        			  if(StructUpload_UploadModel.upload.getStats().files_queued==0){
			        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
			        	        			  return;
			        	        		  }
			        	        		  var postData={
			        	        				  treeId:StructUploadTree.selected.id,
			        	        				  draftName:StructUpload_UploadModelWin.getForm().draftName,
			        	        		  		  description:StructUpload_UploadModelWin.getForm().description
			        	        		  };
			        	        		  
			        	        		  StructUpload_UploadModel.upload.setPostParams (postData);
			        	        		  StructUpload_UploadModel.upload.startUpload();
		        	        		  }
		        	        		  
		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'取消上传',
		        	        	onclick:function(){
		        	        		StructUpload_UploadModelWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          }
	            ]
			});
		}
		StructUpload_UploadModelWin.show('center', 'middle', true);
		return StructUpload_UploadModelWin;
	}
	
	function showUploadSelfDefiDocWin(){
		if(!Edo.get('StructUpload_UploadSelfDefiDocWin')){
			Edo.create({
				id:'StructUpload_UploadSelfDefiDocWin',
				type:'window',title:'上传图文档',
				render:document.body,
				width:340,
				padding:[20,0,20,0],
				titlebar:[
			          {cls:'e-titlebar-close',
			        	onclick:function(e){
			        		this.parent.owner.hide();
			        	}  
			          }
				],
				children:[
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'图文档名称：',children:[{type:'text',name:'draftName',width:'200',valid:noEmpty}]},
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'选择上传文件类型：',padding:[10,0,0,0],
			        	  children:[{
			        		  id:'StructUpload_TypeNameCombo',type:'combo',width:'200',readOnly:true,valueField: 'typeName',displayField: 'typeName',name:'typeName'
			          }]},
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'图文档上传：',padding:[10,0,10,0],
			        	children:[{type:'fileupload',
			        	  id:'StructUpload_UploadSelfDefiDoc',
			        	  width:'200',
			              swfUploadConfig: {              
			                  upload_url: 'draft/upload-self!uploadSelf.action', 
			                  flash_url : 'js/swfupload/swfupload.swf',
			                  flash9_url : "js/swfupload/swfupload_fp9.swf",
			                  button_image_url : 'js/swfupload/XPButtonNoText_61x22.png',     
			                  button_text : '<span class="browseButton">浏&nbsp;览</span>',       
			                  button_text_style : '.browseButton {text-align: center;font-weight: bold; font-size: 12pt;}', 
			                  file_types: '*',                       
			                  file_post_name: 'self',                                
			                  file_size_limit: '10MB'            
			              }, 
			              onfilequeueerror: function(e){
			                  Edo.MessageBox.alert("提示","文件选择错误:"+e.message);
			              },
			              onfilestart: function(e){   
			                  //alert("开始上传");
			            	  StructUpload_UploadSelfDefiDocWin.mask();
			                  Edo.MessageBox.show({
			                	  title:"提示",
			                      msg: '模型上传中，请稍后...',
			                      progressText: '保存中...',
			                      width:300,
			                      progress:true,
			                      wait:true,
			                      interval: 300,
			                      buttons: Edo.MessageBox.CANCEL,
			                      callback: function(action){
			   
			                    	  if(action=="cancel"){
			                    		  StructUpload_UploadSelfDefiDocWin.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(StructUpload_UploadSelfDefiDocWin){
			            		  StructUpload_UploadSelfDefiDocWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  StructUpload_UploadSelfDefiDocWin.destroy();
			                  StructUpload_SelfTable.set("data",
				               			cims201.utils.getData('draft/upload-self!getSelfByTreeId.action?treeId='+StructUploadTree.selected.id)
				              );
			              }  
			          }]},
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'描述：',padding:[0,0,15,0],children:[{type:'text',name:'description',width:'200'}]},
			          {type:'formitem',layout:'horizontal',
			        	children:[
		        	          {type:'button',text:'确定上传',
		        	        	  onclick:function(){
		        	        		  if(StructUpload_UploadSelfDefiDocWin.valid()){
		        	        			  if(StructUpload_UploadSelfDefiDoc.upload.getStats().files_queued==0){
			        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
			        	        			  return;
			        	        		  }
			        	        		  var postData={
			        	        				  treeId:StructUploadTree.selected.id,
			        	        				  draftName:StructUpload_UploadSelfDefiDocWin.getForm().draftName,
			        	        				  typeName:StructUpload_UploadSelfDefiDocWin.getForm().typeName,
			        	        		  		  description:StructUpload_UploadSelfDefiDocWin.getForm().description
			        	        		  		 
			        	        		  };
			        	        		  
			        	        		  StructUpload_UploadSelfDefiDoc.upload.setPostParams (postData);
			        	        		  StructUpload_UploadSelfDefiDoc.upload.startUpload();
		        	        		  }
		        	        		  
		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'取消上传',
		        	        	onclick:function(){
		        	        		StructUpload_UploadSelfDefiDocWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          }
	            ]
			});
		}
		StructUpload_UploadSelfDefiDocWin.show('center', 'middle', true);
		return StructUpload_UploadSelfDefiDocWin;
	}
	
	function showEditModelPicWin(){
		if(!Edo.get('StructUpload_EditModelPicWin')){
			Edo.create({
				id:'StructUpload_EditModelPicWin',
				type:'window',title:'分类示意图',
				render:document.body,
				width:400,
				padding:[10,5,10,5],
				titlebar:[
			          {cls:'e-titlebar-close',
			        	onclick:function(e){
			        		this.parent.owner.destroy();
			        	}
			          }
				],
				children:[
				   {
					   type:'box',width:'100%',height:'300',padding:[0,0,0,0],id:'StructUpload_ModelImgView',
					   children:[
					        {type:'label',width:'100%',height:'100%'
					        	//text:'<image src="draft/tree-draft!viewModelImg.action"  width="100%" height="100%"/>' 
					        }                                     
					   ]
				   },
				   {
					   type:'formitem',width:'100%',labelWidth:'80',label:'示意图上传：',padding:[10,5,10,5],
			        	children:[{type:'fileupload',
			        	  id:'StructUpload_UploadModelPic',
			        	  width:'100%',
			              swfUploadConfig: {              
			                  upload_url: 'draft/upload-img!uploadImg.action', 
			                  flash_url : 'js/swfupload/swfupload.swf',
			                  flash9_url : "js/swfupload/swfupload_fp9.swf",
			                  button_image_url : 'js/swfupload/XPButtonNoText_61x22.png',     
			                  button_text : '<span class="browseButton">浏&nbsp;览</span>',       
			                  button_text_style : '.browseButton {text-align: center;font-weight: bold; font-size: 12pt;}', 
			                  file_types: '*.jpg;*.bmp;*.png,;*.gif',                       
			                  file_post_name: 'pic',                                
			                  file_size_limit: '5MB'            
			              }, 
			              onfilequeued: function(e){
			            	  console.log(e);
			            	  console.log(StructUpload_ModelImgView.children[0]);
			              },
			              onfilequeueerror: function(e){
			                  Edo.MessageBox.alert("提示","文件选择错误:"+e.message);
			              },
			              onfilestart: function(e){   
	
			            	  //StructUpload_UploadSelfDefiDocWin.mask();
			                  Edo.MessageBox.show({
			                	  title:"提示",
			                      msg: '示意图上传中，请稍后...',
			                      progressText: '保存中...',
			                      width:300,
			                      progress:true,
			                      wait:true,
			                      interval: 300,
			                      buttons: Edo.MessageBox.CANCEL,
			                      callback: function(action){
			   
			                    	  if(action=="cancel"){
			                    		  StructUpload_UploadModelPic.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(StructUpload_EditModelPicWin){
			            		  StructUpload_EditModelPicWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  StructUpload_ModelImgView.children[0].set('text','');
			                  StructUpload_ModelImgView.children[0].set('text',
			                		'<image src="draft/tree-draft!viewModelImg.action?treeId='+StructUploadTree.selected.id+'"  width="100%" height="100%"/>'
			                  );
			              }  
			          }]
				   },
				   {
					   type:'formitem',layout:'horizontal',
			        	children:[
			        	      {type:'space',width:'70'},
		        	          {type:'button',text:'保存',
		        	        	  onclick:function(){
	        	        			  if(StructUpload_UploadModelPic.upload.getStats().files_queued==0){
		        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
		        	        			  return;
		        	        		  }
		        	        		  var postData={
		        	        				  treeId:StructUploadTree.selected.id	 
		        	        		  };
		        	        		  
		        	        		  StructUpload_UploadModelPic.upload.setPostParams (postData);
		        	        		  StructUpload_UploadModelPic.upload.startUpload();
		        	        		  
		        	        		  
		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'关闭',
		        	        	onclick:function(){
		        	        		StructUpload_EditModelPicWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          
				   }
				          
			    ]
			});
		}
		
		StructUpload_EditModelPicWin.show('center', 'middle', true);
		return StructUpload_EditModelPicWin;
	}

	
	function noEmpty(v){
	    if(v == "") return "名称不能为空";
	}	
	
	this.getCodeClassChoose=function(){
		return CodeClassChoose;
	};
	
	this.getUploadPanel =function(){
		return uploadPanel;
	};
	structUploadTask(3041);
}