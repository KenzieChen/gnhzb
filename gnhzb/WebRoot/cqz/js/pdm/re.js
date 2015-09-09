var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
//var tasktreedataTable = new Edo.data.DataTree()
//.set({
//    fields: [
//        {name: 'id', mapping: 'id', type: 'string'
//           
//        },
//        {name: 'name', mapping: 'name',  type: 'string'
//        },
//        {name: 'des', mapping: 'des',  type: 'string'
//        },
//        {name: 'url', mapping: 'url',  type: 'string'
//        },
//        {name: 'code', mapping: 'code',  type: 'string'
//        }
//       
//    ]
//});
var dataRelatedModel;
var tasktype=1;//1代表执行任务，2代表审查任务
function init ()
{
	var url=basepathh+'/pdmtask/task!getTaskDetailbyTaskid.action';
	var param={taskid:taskid};
//	var id='tasktree';
//	refreshdata(tasktreedataTable,url,param,id);
//	var i=0;
	var data= cims201.utils.getData(url,param);
	if(data.status == '等待审查'){
		//alert('等待审查');
		tasktype=2;
	}
	if(tasktype == 1){
		openNewTab('001', data.url,"<div class=cims201_tab_font align=center>任务"+data.name+"</div>",{type:data.url,btIcon:'cims201_myknowledgebase_icon_'+data.url+'_small'},data);
	}else{
		openNewTab('001', data.url+'check',"<div class=cims201_tab_font align=center>任务"+data.name+"</div>",{type:data.url,btIcon:'cims201_myknowledgebase_icon_'+data.url+'_small'},data);
	}
	var rows=data.Inparamlist;
	var inputparams='';
	for ( var i = 0; i < rows.length; i++) {
		var paramobj={};
		paramobj.name=rows[i].name;
		paramobj.descri=rows[i].descri;
		inputparams = inputparams
		+ '名称:'+rows[i].name+' 说明:'+rows[i].descri+' 值:'+rows[i].value
				+ ";"
	}
	inputparams = inputparams
			.substr(0,inputparams.length - 1);
	var rows2=data.Outparamlist;
	var outputparams='';
	for ( var i = 0; i < rows2.length; i++) {
		var paramobj={};
		paramobj.name=rows2[i].name;
		paramobj.descri=rows2[i].descri;
		outputparams = outputparams
				+ '名称:'+rows2[i].name+' 说明:'+rows2[i].descri+' 值:'+rows2[i].value
				+ ";"
	}
	outputparams = outputparams
			.substr(0,outputparams.length - 1);
	Edo.get('input').set('text',inputparams);
	Edo.get('output').set('text',outputparams);
	if(tasktype==2){
		submitbutton.set('visible',false);
		submitcheckbutton.set('visible',true);
	}
	//1.这个是在Panel中显示推送的知识名称的代码
	//需要引入的js文件： js/knowledge/knowledge-list-box.js

	//这里value中的id是与任务对应的关键字（这里就是知识域）的id，从数据库中取得
    /*
	 var processtemplateid=tasktreedataTable.source[0].processtemplateid;
	 var dataRelatedModel =cims201.utils.getData(basepathh+'/pdmtask/task!getkeywordidsbyprocess.action',{processtemplateid:processtemplateid});
	alert(dataRelatedModel[0].id);
	 var queryForm = {name:'keywordid',value:dataRelatedModel[0].id};   

	var searchlist = {searchlist: [queryForm]};
	var queryFormStr = Edo.util.Json.encode(searchlist);                                                 
	var myTable1_rt = new createKnowledgeList_box();   			
	myTable1_rt.search({formvalue:queryFormStr},'knowledge/knowledge!ksearch.action');
	
	//下面的两个rightPanel改成自己定义的需要显示知识名称的那个
	RelatedKnowledgePanel.removeAllChildren();
	RelatedKnowledgePanel.addChild(myTable1_rt.getKnowledgeList());
	}
	*/
}
//function refreshdata(dataTable,url,param,id){
//    var data= cims201.utils.getData(url,param);
//	dataTable.set('data',data[0].children);
//	Edo.get('tasktree').set('data',dataTable);
//	leftPanel.set('title',data[0].name);
//};

var myModuleSearchInput = Edo.create({
	type: 'autocomplete', 
	width: '90%', 
	queryDelay: 2000,
	url: 'knowledge/knowledge!searchHotword.action',
	popupHeight: '100',
	valueField: 'name', 
	displayField: 'name',
	onclick: function(e){
		currentEventID = 'knowledgesearch_mainpage';
	},
	onblur: function(e){
		currentEventID = null;
	}
});
	
function searchModule(){
	var myKey = myModuleSearchInput.get('text');
	openNewTab(concatName(myKey), 'knowledgelist_fulltext', concatName(myKey), {key:myKey});
}

var myModuleSearchIndex = Edo.create({
	type: 'box',
	width: '100%',
	border: [0,0,0,0],
	padding: [0,0,0,0],
	layout: 'horizontal',
	children: [
		myModuleSearchInput,
		{
			type: 'button', icon:'knowldge_search_action', text: '搜索', 
			onclick: function(e){
				searchModule();
			}
		}	
	]
});






Edo.build(
		{
			id:'main',
			type: 'app',
			width: '100%',
			height: '100%',
			layout: 'vertical',
			render: document.body,	
			style:'background:#B5E3E0',
			padding:0,
			children:[
                      //顶栏描述
			          {
			        	  type: 'ct',
			        	  width: '100%',
			        	  height: 40, 
			        	  layout: 'horizontal',			        	  
			        	  children:[
			        	            {
			        	              type:   'label',width:'100%',height: '100%',
			      		              style:  'font-size:20px;padding:5px;padding-top:8px;font-family:微软雅黑, 宋体, Verdana;font-weight:bold; ',
			      		             text: '模块执行平台 '
			        	            }/*,
			        	            { 
			        	            	type: 'label', text: '您好, admin <a href="#" style="color:black;text-decoration:none;">退出</a>'
			        	            }*/
			        	            ]
			          },
			         
			          //主界面
			          {
			        	  type: 'ct',
			              width: '100%',
			              height: '100%',
			              layout: 'horizontal',
			              padding:0,
			              children:[
//                                    //左侧边
//			                        {
//			                        	id:'leftPanel',
//			                        	type: 'panel',
//			                            title: '导航列表',
//			                            width: 260,
//			                            height: '100%',
//			                            verticalGap:'0',
//			        				    padding:[0,0,0,0],
//			                            collapseProperty: 'width',
//			                            enableCollapse: true,
//			                            splitRegion: 'west',
//			                            splitPlace: 'after',
//			                            layout:'vertical',
//			                            titlebar:[
//			                                      {
//			                                          cls:'e-titlebar-toggle-west',
//			                                          icon: 'button',
//			                                          onclick: function(e){this.parent.owner.toggle();}
//			                                      }
//			                                      ],
//			                            children:[
//											{
//												id:'tasktree',
//												type: 'tree',
//												width: '260',
//										        height: '100%',
//										        headerVisible: false,
//										        autoColumns: true,
//										        horizontalLine: false,
//										        columns: [{header: '名称',dataIndex: 'name',
//										        	 renderer: function(value, record, column, rowIndex, data, table){ 
//										        		 return (rowIndex+1)+'. '+value;
//										        		 }}],
//										        	 
//										        data:tasktreedataTable,
//										        onselectionchange: function(e){	
//										            var r=tasktree.getSelected();
//										            Edo.get('input').set('text',r.input);
//										            Edo.get('output').set('text',r.output)
//										           /* for (var s in r)
//										            	{alert(s);
//										            	alert(r['_index']);
//										            	}*/
//										            var index=tasktree.data.indexOf(r);
//										        	openNewTab('00'+(index+1), r.url,"<div class=cims201_tab_font align=center>任务"+(index+1)+r.name+"</div>",{type:r.url,btIcon:'cims201_myknowledgebase_icon_'+r.url+'_small'});
//										        	
//										         }
//										       }		                                      
//			                                    	          ]			                            
//			                                       },
			                        
			                        //右主界面
			                        {
			                        	id:'mainPanel',
			                        	type: 'ct',width: '100%',height: '100%',verticalGap: 0,padding:[0,0,0,0],
			                        	children:[
			                        		{id:'mainTabBar',type: 'tabbar',selectedIndex: 0,border: [0,0,0,0],padding:[0,0,0,0],
			                        		onselectionchange: function(e){        
			                                    mainTabContent.set('selectedIndex', e.index);
			                                  }
			                                 
			                        	    },
				                        	{
				                        	    	id: 'mainTabContent',selectedIndex: 0,layout: 'viewstack',type: 'box',padding:[0,0,0,0],
				                        	    	border: [1,0,1,1],width: '100%',height: '100%',verticalScrollPolicy: 'auto',
				                        	    	onselectionchange: function(e){
				                                        alert('content-selected');}
				                        	}]
			                        },
			                        {
			                     	   id:'rightpanel',
			                     	   type:'box',            	               	   
			                     	   width: 250,
			                     	   height: '100%',
			                     	   layout: 'vertical',
			                     	   verticalGap:'0',
			                    		   padding:[0,0,0,0],
			                    		   collapseProperty: 'width',
			                            enableCollapse: true,
			                            splitRegion: 'east',
			                            splitPlace: 'before',
			                    	       children: [
			                     	              myModuleSearchIndex,
			                     	              {
			                     	            	  //id:'RelatedKnowledgePanel',
			                     	            	  type: 'panel',
			                     	            	  layout: 'vertical', 
			                     	            	  width: '100%',
			                     	            	  height: '100%',           	            	 
			               	            		      title: '<span style="font-weight:bold;">你可能感兴趣的知识</span>',
			                     	            	 children:[
			                     	            	           {
			                     	            	        	  type: 'label', 
			                     	            	        	  width: '100%', 
			                     	            	        	  text: '模块化设计过程',
			                     	            	        	 onclick: function(e){
			                     	            					searchModule();}
			                     	            	           },
			                     	            	           {
			                     	            	        	  type: 'label', 
			                     	            	        	  width: '100%',
			                     	            	        	  text: '汽轮机编码规则',
			                     	            	           },
			                     	            	           {
				                     	            	          type: 'label', 
				                     	            	          width: '100%',
				                     	            	          text: '汽轮机零部件分类规则',
				                     	            	        },
				                     	            	        {
				                     	            	          type: 'label', 
					                     	            	      width: '100%',
					                     	            	      text: '工业汽轮机介绍',
				                     	            	        }]
			                     	              },
			                    	              {
			                    	            	  id:'knowledgeKeyWordPanel',
			                    	            	  type: 'panel',
			                     	            	  layout: 'vertical', 
			                     	            	  width: '100%',
			                     	            	  height: '30%',
			                     	            	  title: '<span style="font-weight:bold;">输入信息</span>',
			                     	            	  bodyCls: 'cims201_knowledge_keyword',  
			                     	            	  children: [
			                     	            	             {
			                                                          type: 'label',	   
			                                                          width: '100%',
			                                                          id:'input'
			                                                          
			                                                            
			                                                              }
			                     	            	         ]
			                    	              },
			                    	           {
			                    	            	  id:'recommended',
			                     	              type: 'panel',
			                     	            	  
			                     	            	  width: '100%',
			                     	            	  height: '20%',
			                     	            	  title: '<span style="font-weight:bold;">输出结果查询</span>',
			                     	            	  bodyCls: 'cims201_knowledge_keyword',  
			                     	            	  children: [
			                     	            	             {
			                                                          type: 'label',	   
			                                                          width: '100%',
			                                                          id:'output'
			                                                          
			                                                            
			                                                              }
			                                                               
			                     	            	         ]
			                    	              },
			                     	              {            	            	
			                     	            	 type:'formitem',
			                     	            	 layout: 'horizontal',
			                     	            	 width: '100%', 
			                     	            	 children:[
			                     	            	          {
				                                                    id:'submitbutton',
				         		                                    type:'button',
				         		                                    text: '提交',
				         		                                    width: '40%',
				         		                                    height: 30,
				         		                                    onclick: function(e){
				         		                                    	resultparam=realComponent.submitResult();
				         		                                    	if(resultparam != null){
				         		                                    		var url=basepathh+'/pdmtask/task!submitTask.action';
					         		                                    	var param={resultparam:resultparam,taskid:taskid};
					         		                                    	var data= cims201.utils.getData(url,param);
					         		                                    	Edo.MessageBox.alert("提示",data.message);
				         		                                    	}
				         		                                    }
			         	                                        },
			         	                                        {
				                                                    id:'submitcheckbutton',
				         		                                    type:'button',
				         		                                    visible:false,
				         		                                    text: '审核通过',
				         		                                    width: '40%',
				         		                                    height: 30,
				         		                                    onclick: function(e){
				         		                           			var url=basepathh+'/pdmtask/task!submitTaskCheck.action';
				         		                                	var param={taskid:taskid};
				         		                                	var data= cims201.utils.getData(url,param);
				         		                                	Edo.MessageBox.alert("提示", data.message);
				         		                       		}
			         	                                        }
//			                                                     {
//			                                                     id:'button',
//			         		                                    type:'button',
//			         		                                    text: '上一步',
//			         		                                    width: '40%',
//			         		                                    height: 30,
//			         	                                        },
//			         	                                        {
//			         	                                        id:'next',	
//			         	                                        type:'button',
//			         	                                        text: '下一步',
//			         	                                        width: '40%',
//			         	                                        height: 30,
//			         	                                        }
			                     	            	           ]
			                     	              }
			                     	             ]
			                        }
			                        ]
			          }
			          ]
		});

function toggle(e){
    var panel = this.parent.owner;
    var accordion = panel.parent;
    accordion.getChildren().each(function(child){
        if(panel != child) child.collapse();
    });
    panel.toggle();
}
function onPanelClick(e){
    if(e.within(this.headerCt)){
        var panel = this;
        var accordion = panel.parent;
        accordion.getChildren().each(function(child){
            if(panel != child) child.collapse();
        });
        panel.toggle();
    }
}
function openModule(src){
    alert(src);
}

//打开新的选项卡
var realComponent;
function openNewTab(id, index, title, params,data){
	//首先将enter事件取消注册
	currentEventID = null;

	var mainTabBar = Edo.get('mainTabBar');
	var mainTabContent = Edo.get('mainTabContent');
	var tabSize1 = mainTabBar.children.length;
	var tabSelectedIndex1 = mainTabBar.selectedIndex;
	var c = null;
	var resultComponent = getComponentByIndex('cont_'+index+''+id,index,params);
	var module=resultComponent.myComponent;
	if(module=='error')
	{
		
	}
	else
	{
		if(module == null){
			module = Edo.create({
		
			type: 'module',
			width: '100%',
    		height: '95%',
			src: 'building.jsp'
		});
	}
	realComponent=resultComponent.realComponent;
	var inputparam=new Array();
	var outputparam=new Array();
	if(tasktype == 1){
		
		if(data.Inparamlist.length >= 1){
			var param=data.Inparamlist;
			for (var i=0;i<param.length;i++){
				var data1={};
				data1.descri=param[i].descri;
				data1.name=param[i].name;
				data1.name=param[i].value;
				inputparam.push(data1);
			}
			realComponent.initinputparam(param);
		}
		if(data.Outparamlist.length >= 1){
			var param=data.Outparamlist;
			for (var i=0;i<param.length;i++){
				var data2={};
				data2.descri=param[i].descri;
				data2.name=param[i].name;
				data2.value=param[i].value;
				outputparam.push(data2);
			}
			realComponent.initresultparam(param);
		}
		realComponent.inittask();
	}else{
		if(data.Outparamlist.length >= 1){
			var param=data.Outparamlist;
			for (var i=0;i<param.length;i++){
				var data2={};
				data2.descri=param[i].descri;
				data2.name=param[i].name;
				data2.value=param[i].value;
				outputparam.push(data2);
			}
			realComponent.initresultparam(param);
		}
		realComponent.inittask();
	}
	
	//realComponent.submitResult();
	mainTabBar.children.each(function(o){		
		if(('tbar'+index+''+id) == o.id){
			c = o;		
		}
	});
	
	if(c==null){	
		c = mainTabBar.addChildAt(tabSize1,
			{id:'tbar'+index+''+id ,type: 'button', icon:params['btIcon']?params['btIcon']:null,width: 200, text: title, arrowMode: 'close',
			    onarrowclick:function(e){
					//删除对应的enter事件
					enterEventIDList.each(function(o,mi){
						if(('cont_'+index+''+id) == o){
							enterEventIDList.splice(mi,1);
							enterEventList.splice(mi,1);
						}
					});
					//alert(index+id);
					//根据idx, 删除对应的容器				
					var currentContent = null;
					mainTabContent.children.each(function(o){
			
						if(('cont_'+index+''+id) == o.id){
							currentContent = o;
						}
					});
					
					//currentContent = mainTabContent.getChildAt(mainTabBar.selectedIndex);
					if(currentContent != null){
						currentContent.destroy();
					}			
					//选中原来Index处					
					var tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex);					
					if(!tabitem){
					    tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex-1);						    
					}					
					mainTabBar.set('selectedItem', tabitem);				
				}
			}
		);
   var box=Edo.create({
			type:'box',
			height: '100%',
			width:'100%',
			layout:'vertical',
			padding:[0,0,0,0],
			border:[0,0,0,0],
			children:[module
			/*	{
				type:'box',
				id:'toolbar',
				layout:'horizontal',
				children:[
				          {type: 'button',id:'previous',text: '上一步',width:80,onclick: function(e){
					       	    Edo.get('tbar'+index+''+id).destroy(); 
					       	    this.parent.parent.destroy();
					       	    i=i-1;
					        	getpretask(i);
					        	}},
					{type: 'button',id:'next',text: '下一步',width:80,onclick: function(e){
							Edo.get('tbar'+index+''+id).destroy(); 	
							this.parent.parent.destroy();
							i=i+1;
				        	getnexttask(i);
				        	
				        	}},
			     
		        	
				
				]
				}*/
			]
			});
        /*if(i==0){
        previous.set('visible',false);
        };
        if(i==(data.length-1)){
        next.set('visible',false);
        var submi=Edo.create({type: 'button',id:'submi',text: '提交',onclick: function(e){
        		   opener.document.location='cqz/js/pdm/myjob.jsp';  
		       	   window.close(); 
		        	}});
		toolbar.addChild(submi);
        }*/
		mainTabContent.addChildAt(tabSize1,box);			
	};
	mainTabBar.set('selectedItem', c);		
}
}
function getnexttask(j)	
{
 openNewTab(001, data[j].url,"<div class=cims201_tab_font align=center>任务"+(j+1)+data[j].name+"</div>",{type:data[j].url,btIcon:'cims201_myknowledgebase_icon_'+data[j].url+'_small'});

}
 function getpretask(j)	
{
 openNewTab(001, data[j].url,"<div class=cims201_tab_font align=center>任务"+(j+1)+data[j].name+"</div>",{type:data[j].url,btIcon:'cims201_myknowledgebase_icon_'+data[j].url+'_small'});

}
/*cims201.utils.getData_Async('knowledge/knowledge!listRcommentKnowledge.action',{id:id},function(text){
	if(text != null && text != 'null' && text != ''){
		var relatedKnowledgeData = Edo.util.Json.decode(text);
		//相关推荐文档
		relatedKnowledgeData.each(function(o){
			var oneRelatedKnowledgeStr = '';
			
			oneRelatedKnowledgeStr += '<div class="knowledge_view_relate_word">';
			var title_outStr = '';
			if(o.titleName.length > 4){
				title_outStr += o.titleName.substring(0,4)+'...';
			}else{
				title_outStr += o.titleName;
			}
			oneRelatedKnowledgeStr += '<a href="javascript:showKnowledgeDetail('+o.id+',\''+title_outStr+'\')";>'+o.titleName+'</a>';
			oneRelatedKnowledgeStr += '<br>';
			oneRelatedKnowledgeStr += '<div style="float:left; padding-top:5px;">';
			if(o.commentRecord){
				var tempScore = o.commentRecord.rate;
			
				for(var i=1;i<=(tempScore-tempScore%1);i++){
					oneRelatedKnowledgeStr += '<div class="cims201_little_star_full"></div>';
				}
				if((tempScore%1) == 0){
					for(var j=i;j<=5;j++){
						oneRelatedKnowledgeStr += '<div class="cims201_little_star_null"></div>';
					}
				}else{
					oneRelatedKnowledgeStr += '<div class="cims201_little_star_half"></div>';
					for(var j=(i+1);j<=5;j++){
						oneRelatedKnowledgeStr += '<div class="cims201_little_star_null"></div>';
					}
				}
				oneRelatedKnowledgeStr += '</div>';
				oneRelatedKnowledgeStr += '&nbsp'+o.commentRecord.commentCount+'人评';
				
				oneRelatedKnowledgeStr += '</div>';
			}else{
				var tempScore = 0;
			
				for(var i=1;i<=(tempScore-tempScore%1);i++){
					oneRelatedKnowledgeStr += '<div class="cims201_little_star_full"></div>';
				}
				if((tempScore%1) == 0){
					for(var j=i;j<=5;j++){
						oneRelatedKnowledgeStr += '<div class="cims201_little_star_null"></div>';
					}
				}else{
					oneRelatedKnowledgeStr += '<div class="cims201_little_star_half"></div>';
					for(var j=(i+1);j<=5;j++){
						oneRelatedKnowledgeStr += '<div class="cims201_little_star_null"></div>';
					}
				}
				oneRelatedKnowledgeStr += '</div>';
				oneRelatedKnowledgeStr += '&nbsp'+0+'人评';
				
				oneRelatedKnowledgeStr += '</div>';
			}
							
			var oneRelatedKnowledge = Edo.create({
				type: 'box',
				border: [0,0,0,0],
				padding: [0,0,0,12],
				width : '100%',
				height : 45,
				children: [
					{type:'label', text: oneRelatedKnowledgeStr}
				]		
			});
			RelatedKnowledgePanel.addChild(oneRelatedKnowledge);
		})
	}else{
		RelatedKnowledgePanel.addChild({
			type: 'label',
			width: '100%',
			style: 'font-size:13px; color: blue;',
			text: '当前没有推荐知识'
		});
	}	
});
	
this.getRelatedKnowledge = function(){
	return RelatedKnowledgePanel;
}
*/
