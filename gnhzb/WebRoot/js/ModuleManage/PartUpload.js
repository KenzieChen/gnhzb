function createPartUpload(){
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
			       {	type:'combo', id:'PartUploadClassNameCombo',
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
					    	PartUploadTree.set('data',e.selectedItem);
					    }
			       }
			   ]
		   },
		   {
			   type:'tree',id:'PartUploadTree',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
				   partUploadSearch(partUploadArrangedPaging,PartUpload_PartTable);
				},
				data:[{text:'请先选择结构所属分类'}]
		   }
		]
	});
	
	PartUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
	//luweijiang
	function partUploadTask(classficationTreeId){
		PartUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId}));
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
					if(outputparam[j].name == 'partuploadclassificationtreeid'){
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
				PartUploadClassNameCombo.set('data',resultdata);
			}else{
				PartUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			PartUploadClassNameCombo.set('data',cims201.utils.getData('classificationtree/classification-tree!getClassStruct.action'));
			Edo.MessageBox.alert("提示","查询前置任务输出结果出错，请联系管理员！");
		}
	}
	var uploadPanel =Edo.create({
		type:'ct',
		height:'100%',
		width:'100%',
		layout:'vertical',
		verticalGap:0,
		children:[
	          {
	        	type:'panel',title :'零部件列表',layout:'vertical',verticalGap:0,width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	  id:'PartUpload_PartTable',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
	        	            {header:'零部件号',dataIndex:'partNumber',headerAlign:'center',align:'center'},
	        	            {header:'零部件名称',dataIndex:'partName',headerAlign:'center',align:'center'},
	        	            {header:'大版本',dataIndex:'partBigVersion',headerAlign:'center',align:'center'},
	        	            {header:'小版本',dataIndex:'partSmallVersion',headerAlign:'center',align:'center'},
	        	            {header:'创建者',dataIndex:'',headerAlign:'center',align:'center'},
	        	            {header:'创建时间',dataIndex:'createTime',headerAlign:'center',align:'center'}
		        	   ],
		        	   onbodydblclick:function(e){
		        		   if(e.record){
		        			   PartUpload_DraftTable.set("data",
				               			cims201.utils.getData('partdraft/upload-part-model!getDraftByPartId.action?partId='+e.record.id)
				               );
		        		   }
		        		   
		        	   }
		           },
		           {
		        	   id:'partUploadArrangedPaging',type:'pagingbar',width:'100%',padding:[0,0,0,0],border:[0,0,0,0],
		        	   onpaging:function(e){
		        		   partUploadSearch(partUploadArrangedPaging,PartUpload_PartTable);
		        	   }
		           }
	        	]
	          },
	          {
	        	type:'panel',title :'图文档列表',layout:'vertical',verticalGap:0, width:'100%',height:'50%',padding:[0,0,0,0],
	        	children:[
		           {
		        	   type:'box',width:'100%',height:'32',cls:'e-toolbar',layout:'horizontal',
		        	   children:[
        	             {type:'button',id:'PartUpload_UploadPicBtn',text:'上传零件示意图'},
        	             {type:'split'},
        	             {type:'button',id:'PartUpload_UploadModelBtn',text:'上传零件模型'},
        	             {type:'split'},
        	             {type:'button',id:'PartUpload_UploadSelfDefiDocBtn',text:'上传自定义图文档'},
        	             {type:'split'},
        	             {type:'button',id:'PartUpload_DeleDraftBtn',text:'删除自定义图文档'}
		        	   ]
		           },
		           {
		        	   id:'PartUpload_DraftTable',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
		        	   columns:[
		        	        {header:'id',dataIndex:'id',visible:false},   
	        	            {header:'图文档名称',dataIndex:'draftName',headerAlign: 'center',align:'center'},
	        	            {header:'类型',dataIndex:'typeName',headerAlign: 'center',align:'center',
	        	            	renderer:function(v){
	        	            		if(v=="主模型"){
	        	            			return "<font color='red'>零件模型</font>";
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
	        	            		return "<span style='margin-right:10px'><a href='partdraft/download-draft.action?fileName="+r.fileName+"&draftName="+r.draftName+"'><img src='images/modManageImages/20060905030245247.gif'></img></a></span>";
	        	            	}
	        	            }
		        	   ]
		           }
	        	]
	          }
		]
	});
	//上传示意图
	PartUpload_UploadPicBtn.on('click',function(e){
		if(PartUpload_PartTable.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选择一条零部件记录！");
			return;
		}
		var form = showUploadPartPicWin();
		PartUpload_PartImgView.children[0].set('text',
        		'<image src="partdraft/part-draft!viewPartImg.action?partId='+PartUpload_PartTable.selected.id+'"  width="100%" height="100%"/>'
          );
		PartUpload_UploadPartPic.inputField.value="";
		form.reset();
	
	});
	//上传主模型
	PartUpload_UploadModelBtn.on('click',function(e){
		if(PartUpload_PartTable.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选择一条零部件记录！");
			return;
		}
		var form = showUploadPartModelWin();
		PartUpload_UploadPartModel.inputField.value="";
		form.reset();
	});
	//上传自定义图文档
	PartUpload_UploadSelfDefiDocBtn.on('click',function(e){
		if(PartUpload_PartTable.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选择一条零部件记录！");
			return;
		}
		var form = showUploadPartSelfDefiDocWin();
		PartUpload_UploadPartSelfDefiDoc.inputField.value="";
		form.reset();
		PartUpload_TypeNameCombo.set('data',
				cims201.utils.getData('draft/draft-type!getAllIsnotMaster.action')
		);
	});
	//删除图文档
	PartUpload_DeleDraftBtn.on('click',function(e){
		if(PartUpload_DraftTable.selecteds.length != 1){
			Edo.MessageBox.alert("提示","请先选中一条要删除的文档记录！");
			return;
		}else{
			Edo.MessageBox.confirm ("提示","您确定要删除该项吗",function(action){
				if(action=='yes'){
					Edo.util.Ajax.request(
						    {
						        type: "post",                       
						        url: 'partdraft/part-draft!deleteDraft.action', 
						         params: {                    
						            id: PartUpload_DraftTable.selected.id, 
						            fileName: PartUpload_DraftTable.selected.fileName
						        },                      
						        onSuccess: function(text){     
						            	Edo.MessageBox.alert("提示",text);
						            	PartUpload_DraftTable.set("data",
						            			cims201.utils.getData('partdraft/upload-part-model!getDraftByPartId.action?partId='+PartUpload_PartTable.selected.id)
						               	);
						            	PartUpload_DraftTable.selected=null;
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
	function partUploadSearch(paging,table){
		paging.size=15;
		var url = '';
		var partData =null;
		if(table.id=='PartUpload_PartTable'){
			if(PartUploadTree.selected &&PartUploadTree.selected.text!='请先选择结构所属分类'){
				url = 'part/part!getArrangedPart.action?index='+paging.index+'&size='+paging.size+'&treeId='+PartUploadTree.selected.id;
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
	function showUploadPartPicWin(){
		if(!Edo.get('PartUpload_UploadPartPicWin')){
			Edo.create({
				id:'PartUpload_UploadPartPicWin',
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
					   type:'box',width:'100%',height:'300',padding:[0,0,0,0],id:'PartUpload_PartImgView',
					   children:[
					        {type:'label',width:'100%',height:'100%'
					        	//text:'<image src="draft/tree-draft!viewModelImg.action"  width="100%" height="100%"/>' 
					        }                                     
					   ]
				   },
				   {
					   type:'formitem',width:'100%',labelWidth:'80',label:'示意图上传：',padding:[10,5,10,5],
			        	children:[{type:'fileupload',
			        	  id:'PartUpload_UploadPartPic',
			        	  width:'100%',
			              swfUploadConfig: {              
			                  upload_url: 'partdraft/upload-part-img!uploadPartImg.action', 
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
			            	  console.log(PartUpload_PartImgView.children[0]);
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
			                    		  PartUpload_UploadPartPic.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(PartUpload_UploadPartPicWin){
			            		  PartUpload_UploadPartPicWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  PartUpload_PartImgView.children[0].set('text','');
			                  PartUpload_PartImgView.children[0].set('text',
			                		'<image src="partdraft/part-draft!viewPartImg.action?partId='+PartUpload_PartTable.selected.id+'"  width="100%" height="100%"/>'
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
	        	        			  if(PartUpload_UploadPartPic.upload.getStats().files_queued==0){
		        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
		        	        			  return;
		        	        		  }
		        	        		  var postData={
		        	        				  partId:PartUpload_PartTable.selected.id	 
		        	        		  };
		        	        		  
		        	        		  PartUpload_UploadPartPic.upload.setPostParams (postData);
		        	        		  PartUpload_UploadPartPic.upload.startUpload();

		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'关闭',
		        	        	onclick:function(){
		        	        		PartUpload_UploadPartPicWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          
				   }
				          
			    ]
			});
		}
		
		PartUpload_UploadPartPicWin.show('center', 'middle', true);
		return PartUpload_UploadPartPicWin;
	
	}
	
	function showUploadPartModelWin(){
		if(!Edo.get('PartUpload_UploadPartModelWin')){
			Edo.create({
				id:'PartUpload_UploadPartModelWin',
				type:'window',title:'上传主模型',
				render:document.body,
				width:320,
				padding:[20,20,20,20],
				titlebar:[
		          {cls:'e-titlebar-close',
		        	onclick:function(e){
		        		this.parent.owner.destroy();
		        	}  
		          }
				],
				children:[
			          {type:'formitem',labelWidth:'70',label:'模型名称：',children:[{type:'text',name:'draftName',width:'200',valid:noEmpty}]},
			          {type:'formitem',labelWidth:'70',label:'模型上传：',padding:[10,0,10,0],
			        	children:[{type:'fileupload',
			        	  id:'PartUpload_UploadPartModel',
			        	  width:'200',
			              swfUploadConfig: {              
			                  upload_url: 'partdraft/upload-part-model!uploadPartModel.action', 
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
			            	  PartUpload_UploadPartModelWin.mask();
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
			                    		  PartUpload_UploadPartModel.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(PartUpload_UploadPartModelWin){
			            		  PartUpload_UploadPartModelWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  PartUpload_UploadPartModelWin.destroy();
			                  PartUpload_DraftTable.set("data",
				               			cims201.utils.getData('partdraft/upload-part-model!getDraftByPartId.action?partId='+PartUpload_PartTable.selected.id)
				               	   );
			              }  
			          }]},
			          {type:'formitem',labelWidth:'70',label:'模型描述:',padding:[0,0,15,0],children:[{type:'text',name:'description',width:'200'}]},
			          {type:'formitem',layout:'horizontal',
			        	children:[
		        	          {type:'button',text:'确定上传',
		        	        	  onclick:function(){
		        	        		  if(PartUpload_UploadPartModelWin.valid()){
		        	        			  if(PartUpload_UploadPartModel.upload.getStats().files_queued==0){
			        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
			        	        			  return;
			        	        		  }
			        	        		  var postData={
			        	        				  partId:PartUpload_PartTable.selected.id,
			        	        				  draftName:PartUpload_UploadPartModelWin.getForm().draftName,
			        	        		  		  description:PartUpload_UploadPartModelWin.getForm().description
			        	        		  };
			        	        		  
			        	        		  PartUpload_UploadPartModel.upload.setPostParams (postData);
			        	        		  PartUpload_UploadPartModel.upload.startUpload();
		        	        		  }
		        	        		  
		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'取消上传',
		        	        	onclick:function(){
		        	        		PartUpload_UploadPartModelWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          }
	            ]
			});
		}
		PartUpload_UploadPartModelWin.show('center', 'middle', true);
		return PartUpload_UploadPartModelWin;
	
	}
	
	function showUploadPartSelfDefiDocWin(){
		if(!Edo.get('PartUpload_UploadPartSelfDefiDocWin')){
			Edo.create({
				id:'PartUpload_UploadPartSelfDefiDocWin',
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
			        		  id:'PartUpload_TypeNameCombo',type:'combo',width:'200',readOnly:true,valueField: 'typeName',displayField: 'typeName',name:'typeName'
			          }]},
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'图文档上传：',padding:[10,0,10,0],
			        	children:[{type:'fileupload',
			        	  id:'PartUpload_UploadPartSelfDefiDoc',
			        	  width:'200',
			              swfUploadConfig: {              
			                  upload_url: 'partdraft/upload-part-self!uploadPartSelf.action', 
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
			            	  PartUpload_UploadPartSelfDefiDocWin.mask();
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
			                    		  PartUpload_UploadPartSelfDefiDocWin.upload.cancelUpload();
			                    	  }
			                      }
			                      //icon: 'e-dialog-download'
			                  });
			              },
			              onfileerror: function(e){
			            	  Edo.MessageBox.alert("提示","上传失败:"+e.message);
			            	  if(PartUpload_UploadPartSelfDefiDocWin){
			            		  PartUpload_UploadPartSelfDefiDocWin.unmask();
			            	  }
			              },
			              onfilesuccess: function(e){   
			            	  Edo.MessageBox.hide();
			                  Edo.MessageBox.alert("提示",e.serverData);
			                  PartUpload_UploadPartSelfDefiDocWin.destroy();
			                  PartUpload_DraftTable.set("data",
				               			cims201.utils.getData('partdraft/upload-part-self!getDraftByPartId.action?partId='+PartUpload_PartTable.selected.id)
				              );
			              }  
			          }]},
			          {type:'formitem',labelWidth:'115',labelAlign:'right',label:'描述：',padding:[0,0,15,0],children:[{type:'text',name:'description',width:'200'}]},
			          {type:'formitem',layout:'horizontal',
			        	children:[
		        	          {type:'button',text:'确定上传',
		        	        	  onclick:function(){
		        	        		  if(PartUpload_UploadPartSelfDefiDocWin.valid()){
		        	        			  if(PartUpload_UploadPartSelfDefiDoc.upload.getStats().files_queued==0){
			        	        			  Edo.MessageBox.alert("提示","请先添加要上传的文件");
			        	        			  return;
			        	        		  }
			        	        		  var postData={
			        	        				  partId:PartUpload_PartTable.selected.id,
			        	        				  draftName:PartUpload_UploadPartSelfDefiDocWin.getForm().draftName,
			        	        				  typeName:PartUpload_UploadPartSelfDefiDocWin.getForm().typeName,
			        	        		  		  description:PartUpload_UploadPartSelfDefiDocWin.getForm().description
			        	        		  		 
			        	        		  };
			        	        		  
			        	        		  PartUpload_UploadPartSelfDefiDoc.upload.setPostParams (postData);
			        	        		  PartUpload_UploadPartSelfDefiDoc.upload.startUpload();
		        	        		  }
		        	        		  
		        	        	  }
		        	          },
		        	          {type:'space',width:'40'},
		        	          {type:'button',text:'取消上传',
		        	        	onclick:function(){
		        	        		PartUpload_UploadPartSelfDefiDocWin.destroy();
		        	        	}  
		        	          }
			        	]  
			          }
	            ]
			});
		}
		PartUpload_UploadPartSelfDefiDocWin.show('center', 'middle', true);
		return PartUpload_UploadPartSelfDefiDocWin;
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
	partUploadTask(3041);
}