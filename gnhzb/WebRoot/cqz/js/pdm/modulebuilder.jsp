<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
	<title>新建模型</title>
	<style type="text/css" media="screen">
		BODY {
			font-family: Arial;
		}
		H1 {
			font-size: 18px;
		}
		H2 {
			font-size: 16px;
		}
		.skin {
            width : 100px;
            border : 1px solid gray;
            padding : 2px;
            visibility : hidden;
            position : absolute;
        }
        div.menuitems {
            margin : 1px 0;
        }
        div.menuitems a {
            text-decoration : none;
        }
        div.menuitems:hover {
            background-color : #c0c0c0;
        }
		
	</style>
	<!-- Sets the basepath for the library if not in same directory -->
	<script type="text/javascript">
	</script>
	<!-- Loads and initializes the library -->
	<script type="text/javascript" src="<%=basePath%>js/lca/flow/mxclient1.8goo.js"></script>
	<link rel="stylesheet" type="text/css"
			href="<%=basePath%>css/welcome.css">
		<link href="<%=basePath%>js/edo/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />

		<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/utils.js" type="text/javascript"></script>
		<%-- <script src="<%=basePath%>js/lca/lca_moduledefine_builder.js" type="text/javascript"></script> --%>
		<%-- <script src="<%=basePath%>js/lca/nodelist.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lca/moduledefine.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lca/lca_moduledefine.js" type="text/javascript"></script> --%>
		<script src="<%=basePath%>js/lca/pdm_modulebuilder.js" type="text/javascript"></script>
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		var basepathh='http://localhost:8080/gnhzb/'
		
		//
		var moduleobject={
			versionid:null,
			modulename:null,
			modulenote:null,
		    moduletype:null,
		    issaved:false,
		    style:null
		}
		
		//某一层的模板的某一节点信息？（层信息，可视节点id的信息，节点执行信息）
		function levelmodule(level,cell){
			this.level=level;
			this.levelmoduleobject={
				cellid:cell.getId(),
				//orderid:null,
				processname:null,
				processnote:null,
				knowledgecategoryid:null,
				knowledgecategoryindex:null,
				konwledge:null,
				/* input:null,
				output:null,
				inputdescrip:null,
				outputdescrip:null, */
				Outparamlist:null,
				Inparamlist:null,
				OutparamlistTemp:null,
				InparamlistTemp:null,
				description:null,
				type:null,
				tasktreenodeid:null,
				tasktreenodename:null,
				parentmoduleid:level.parentmoduleid,
				parentmodulename:level.parentmodulename,
				moduleid:level.levelid+'_'+cell.getId(),
				prevmoduleid:null,
				prevmodulename:null,
				nextmoduleid:null,
				nextmodulename:null
			};
			this.childlevel=null;
			
			
		}
		levelmodule.prototype.constructor = levelmodule;
		levelmodule.prototype.createlavelid=function(){
		
		}
		//表示所有层，包括跟节点层，当前层次，所有层（用数组表示）
		function alllevel(){
		}
		alllevel.prototype.constructor = alllevel;
		alllevel.prototype.rootlevel=null;
		alllevel.prototype.currentlevel=null;
		alllevel.prototype.alllevels=new Array();
		alllevel.prototype.setrootlevel=function(rootlevel){
			this.rootlevel=rootlevel;
			rootlevel.levelid='level_top';
			rootlevel.parentlevelid=0;
			rootlevel.parentcellid=0;
		    rootlevel.parentmoduleid=0;
	        rootlevel.parentmodulename=0;
			this.alllevels.add(rootlevel);
		};
		alllevel.prototype.getcurrentlevel=function(){
			return this.currentlevel;
		};
		alllevel.prototype.setcurrentlevel=function(level){
			this.currentlevel=level;
		};
		alllevel.prototype.addlevel=function(levelmodule){
			var newlevel=new level();
			var parentlevel=this.getcurrentlevel();
			newlevel.parentmoduleid=levelmodule.levelmoduleobject.moduleid;
			newlevel.parentmodulename=levelmodule.levelmoduleobject.processname;
			newlevel.setparentlevel(parentlevel);
			newlevel.parentcellid=levelmodule.levelmoduleobject.cellid;
			levelmodule.childlevel=newlevel;
			newlevel.levelid=parentlevel.levelid+'_'+levelmodule.levelmoduleobject.cellid;
			newlevel.parentlevelid=parentlevel.levelid;
			this.alllevels.add(newlevel);
			this.setcurrentlevel(newlevel);
		 
		};
		alllevel.prototype.addlevelmodule = function(cell){
			return this.currentlevel.addlevelmodule(cell);
		};
		
		//表示某一层的对象，（父层，父层id，父层节点id，xml文件信息，cells和levelmodules指什么？）
		function level(type){
	        this.parentmoduleid=null;
	        this.parentmodulename=null;
		    this.parentcellid=null;
			this.levelmodules=new Array();
			this.cells=null;
			this.levelid=null;
			this.parentlevelid=null;
			this.parentlevel=null;
			this.xml=null;
			this.type=null;
		}
		level.prototype.constructor = level;
		level.prototype.addlevelmodule=function(cell){
		    var newlevelmodule=new levelmodule(this,cell);
			this.levelmodules.add(newlevelmodule);
			return newlevelmodule;
		}
		level.prototype.setparentlevel=function(level){
			this.parentlevel=level;
		}
		level.prototype.getparentlevel=function(){
			return this.parentlevel;
		}
    	function initmoduleobject(){
	    	moduleobject.moduletype=moduleobj.moduletype;
    	}
    	function clearmodule(){
    	    var level=wholelevel.getcurrentlevel();
			level.levelmodules.clear();
    		initgraph();
    		initmoduleobject();
    		parent.clearcompmodule();
    	}
		function initgraph(){
	 		var graph=editor.graph;
        	var model=graph.getModel();
        	//graph.removeCells(graph.getChildCells());该方法id不重置
        	model.clear();
   		}
   		function judgesave(){
   		if(moduleobject.stages&&!moduleobject.issaved){
   			return false;
   		}else{
   		    return true;
   		}
   		
   		}
   		function askifsave(callback){
  				var label=Edo.create({
   	        	    type:'label',
   	        	    text:'请先保存在建模型'
   	        	    });
        	    var func=function(){
        	    editor.execute('savemodule');
           		}
           		var toolbar = Edo.create(
					    {type: 'ct',
					    cls: 'e-dialog-toolbar',
					    width: '100%',
					    layout: 'horizontal',
					    height: '30%',
					    horizontalAlign: 'center',
					    verticalAlign: 'middle',
					    horizontalGap: 10,
					    children: [
					               
					        {
					            type: 'button',
					            text: '确定',
					            minWidth: 70,
					            onclick: function(e){
					            if(func==undefined){
					            }else{
					            func(id);
					            }
					            this.parent.parent.parent.destroy();
					            }
					        },{
					            type: 'button',
					            text: '取消',
					            minWidth: 70,
					            onclick: function(e){
					            callback();
					            this.parent.parent.parent.destroy();
					
					            }
					        }
					    ]
					});
	         	var win=cims201.utils.getWin(300,100,'模型保存',[label,toolbar]);
             	win.show('center', 'middle', true);
   		}
		
		//从父窗口初始化产品模型时调用此方法，根据模型类型不同初始化也不同
		function initmodule(moduleobj){
			if(moduleobj.moduletype=='PDM'){
				moduleobject.moduletype=moduleobj.moduletype;
			}else{
			moduleobject.productid=moduleobj.productid;
			}
			
			moduleobject.versionid=moduleobj.versionid;
			moduleobject.modulename=moduleobj.modulename;
			moduleobject.modulenote=moduleobj.modulenote;
			moduleobject.moduletype=moduleobj.moduletype;
			/* moduleobject.componentname=null;
			moduleobject.componentid=null; */
			moduleobject.stages=null;
		}
		//零件模型初始化时操作
		function refreshcompmodule(moduleobj)
		{
			moduleobject.components=moduleobj.components;
     		/* moduleobject.modulename=moduleobj.modulename;
     		moduleobject.modulenote=moduleobj.modulenote; */
     		moduleobject.stages=moduleobj.stages;
		}
		//定义编辑器
		var editor=null;
		
		//定义右键菜单
	    var popmenu=new mxPopupMenu();
	    popmenu.init();
	    var groupfunc=function(){
	    	editor.execute('groupOrUngroup');
	    };
	    var exitgroupfunc=function(){
	    	editor.execute('exitGroup');
	    	tr1.hidden=true;
	    };
	    var entergroupfunc=function(){
	    	editor.execute('enterGroup');
	    	tr1.hidden=false;
	    };
	    var deletefunc=function(){
	       var graph=editor.graph;
	       var model=graph.getModel();
	       var cell=graph.getSelectionCell();
	       if(cell!=null){
              var level=wholelevel.getcurrentlevel();
		      var modules=level.levelmodules;
		      for(var i=0;i<modules.length;i++){
			       if(modules[i].levelmoduleobject.cellid==(cell.getId())){
			        modules.remove(modules[i]);
			        break;
			       }
             }
	       }
	       editor.execute('delete');
	    };
	    var copyfunc=function(){
	    	editor.execute('copy');
	    	tr.hidden=false;
	    };
	    var cutfunc=function(){
	    	editor.execute('cut');
	    	tr.hidden=false;
	    };
	    var pastefun=function(){
	    	editor.execute('paste');
	    	tr.hidden=true;
	    };
	    var tr=popmenu.addItem ('删除', 'images/delete.gif', deletefunc, popmenu);
        popmenu.addItem ('复制', 'images/copy.gif', copyfunc, popmenu);
        popmenu.addItem ('剪切','images/cut.gif', cutfunc, popmenu);
        popmenu.addItem ('构建组', 'img/group.png', groupfunc, popmenu); 
        popmenu.addItem ('进入组', 'img/groupin.gif', entergroupfunc, popmenu);
        var  popmenu2=new mxPopupMenu();
	    popmenu2.init();
	    var tr=popmenu2.addItem ('粘贴', 'images/paste.gif', pastefun, popmenu2);
	    tr.hidden=true;
        var tr1=popmenu2.addItem ('跳出组', 'img/groupout.gif', exitgroupfunc, popmenu2);
        tr1.hidden=true;
        
		function main(container, outline, toolbar, modelbar,sidebar, status)
		{
	
				editor = new mxEditor();
				var graph = editor.graph;
				var model = graph.getModel();
				//alert(mxUtils.getFunctionName(graph.constructor));

				// Disable highlight of cells when dragging from toolbar
				graph.setDropEnabled(false);

				// Uses the port icon while connections are previewed
				graph.connectionHandler.getConnectImage = function(state)
				{
					return new mxImage(state.style[mxConstants.STYLE_IMAGE], 16, 16);
				};

				// Centers the port icon on the target port
				graph.connectionHandler.targetConnectImage = true;

				// Does not allow dangling edges
				graph.setAllowDanglingEdges(false);

				// Sets the graph container and configures the editor
				editor.setGraphContainer(container);
				var config = mxUtils.load(
					'editors/config/keyhandler-commons.xml').
					getDocumentElement();
				editor.configure(config);
				
				// Defines the default group to be used for grouping. The
				// default group is a field in the mxEditor instance that
				// is supposed to be a cell which is cloned for new cells.
				// The groupBorderSize is used to define the spacing between
				// the children of a group and the group bounds.
				var group = new mxCell('Group', new mxGeometry(), 'group');
				group.setVertex(true);
				group.setConnectable(false);
				editor.defaultGroup = group;
				editor.groupBorderSize = 20;

				// Disables drag-and-drop into non-swimlanes.
				graph.isValidDropTarget = function(cell, cells, evt)
				{
					return this.isSwimlane(cell);
				};
				
				// Disables drilling into non-swimlanes.
				graph.isValidRoot = function(cell)
				{
					return this.isValidDropTarget(cell);
				}

				// Does not allow selection of locked cells
				graph.isCellSelectable = function(cell)
				{
					return !this.isCellLocked(cell);
				};

				// Returns a shorter label if the cell is collapsed and no
				// label for expanded groups
				graph.getLabel = function(cell)
				{
					var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
					
					if (this.isCellLocked(cell))
					{
						// Returns an empty label but makes sure an HTML
						// element is created for the label (for event
						// processing wrt the parent label)
						return '';
					}
					else if (this.isCellCollapsed(cell))
					{
						var index = tmp.indexOf('</h1>');
						
						if (index > 0)
						{
							tmp = tmp.substring(0, index+5);
						}
					}
					
					return tmp;
				}

				// Disables HTML labels for swimlanes to avoid conflict
				// for the event processing on the child cells. HTML
				// labels consume events before underlying cells get the
				// chance to process those events.
				//
				// NOTE: Use of HTML labels is only recommended if the specific
				// features of such labels are required, such as special label
				// styles or interactive form fields. Otherwise non-HTML labels
				// should be used by not overidding the following function.
				// See also: configureStylesheet.
				graph.isHtmlLabel = function(cell)
				{
					return !this.isSwimlane(cell);
				}
				// To disable the folding icon, use the following code:
				/*graph.isCellFoldable = function(cell)
				{
					return false;
				}*/
				// Shows a "modal" window when double clicking a vertex.
				 // 创建右键下拉菜单  
                graph.panningHandler.factoryMethod = function(menu, cell, evt)  
                {  
                    return createPopupMenu(graph, menu, cell, evt);  
                };  
                //双击不起作用？
				graph.dblClick = function(evt, cell)
				{
					var type =  graph.model.getStyle(cell);
					if(type==null){
					return null;
					}
					if(type!='process'&&type!='taskprocess'){
						return null;
					}

				/* if(label=='process'){
				type='process';
				}else{
				var endindex=label.indexOf(';');
				type=label.substring(0,endindex);
				} */
				
					// Do not fire a DOUBLE_CLICK event here as mxEditor will
					// consume the event and start the in-place editor.
					if (this.isEnabled() &&
						!mxEvent.isConsumed(evt) &&
						cell != null &&
						this.isCellEditable(cell))
					{
						if (this.model.isEdge(cell) ||
							!this.isHtmlLabel(cell))
						{
							this.startEditingAtCell(cell);
						}
						else
						{
						if(type=='process'){
						   	var processname=getmoduleproperty('processname',cell);
						    var processnote=getmoduleproperty('processnote',cell);
						   	var tasktreenodeid=getmoduleproperty('tasktreenodeid',cell);
					   		var tasktreenodename=getmoduleproperty('tasktreenodename',cell);
						    var box=Edo.create(
									{type: 'box',width: '100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
					               	    children: [
											{	type : 'formitem',label : '执行模块:',labelWidth : 100,labelAlign : 'right',layout: 'horizontal',
												    children : [{type : 'text',width : 200,id : 'tasktreenodeid',text:tasktreenodeid,visible:false},{type : 'text',width : 200,id : 'tasktreenode',text:tasktreenodename},
												                {type : 'button',text:'请选择模块',
											   	onclick: function(e){
											   	var roledataTable = new Edo.data.DataTable()
													.set({
													    fields: [
													        {name: 'id', mapping: 'id', type: 'string'
													           
													        },
													        {name: 'name', mapping: 'name',  type: 'string'
													        }
													    ]
													});
												
												var url=basepathh+'department/department!getOperationRoles.action';
												var param={};
												var id='role';
												refreshdata(roledataTable,url,param,id);
													var box=Edo.create(
													{type: 'box',width: '100%',height:'100%',layout: 'horizontal',
													children:[
														{
													type:'box',
													height: '100%',
													layout:'vertical',
													children:[	
												        {		
														id: 'role', type: 'table', width: '100%', height: '100%',autoColumns: true,
														padding:[0,0,0,0],
														rowSelectMode : 'single',
														columns:[{
															 headerText: '',
															 align: 'center',
															 width: 10,                        
															 enableSort: false,
															 enableDragDrop: true,
															 enableColumnDragDrop: false,
															 style:  'cursor:move;',
															 renderer: function(v, r, c, i, data, t){
															 return i+1;}},
															 {header:'权限名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}
															 ],
											             data:roledataTable,
											             onselectionchange: function(e){	
													        	new roleSelect();
													         }
														}]},
												      
												   		{
											   			id: 'tasktree',
											   			type: 'tree',
														width: '260',
												        height: '100%',
												        headerVisible: false,
												        autoColumns: true,
												        horizontalLine: false,
														padding:[0,0,0,0],
													    rowSelectMode : 'single',
													    columns:[
											                 {header:'名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}
											                 ],
											             data:tasktreeTable
												   		}
														]})
											   	var func=function(){
											   	
											    	var row=Edo.get('tasktree').getSelected();
											        Edo.get('tasktreenode').set('text',row.name);
											        Edo.get('tasktreenodeid').set('text',row.id);
											       }
											    var toolbar=new gettoolbar(null,func);
											    var winfm=getmywin(400,400,'选择功能模块',[box,toolbar]);
											    winfm.show('center', 'middle', true);
												}}]
												    },
					               	    {	type : 'formitem',label : '模块名称:',labelWidth : 100,labelAlign : 'right',
					               	    children : [{type : 'text',width : 200,id : 'processname',text:processname}]
					               	    },
					               	    
					               	 {	type : 'formitem',label : '知识领域:',labelWidth : 100,labelAlign : 'right',
						               	    children : [{
												type : 'combo',
												width : 200,
												id:'category',
												displayField : 'name',
												valueField : 'id',
												data : [
												        {
												        	id:1,name:'市场和客户需求'
												        },
												        {
												        	id:2,name:'零件ABC分析'
												        },
												        {
												        	id:3,name:'功能原理设计和模块化设计'
												        },
												        {
												        	id:4,name:'原理方案和结构解'
												        },
												        {
												        	id:5,name:'结构模块'
												        },
												        {
												        	id:6,name:'产品系列化'
												        },
												        {
												        	id:7,name:'编码'
												        },
												        {
												        	id:8,name:'名称词典'
												        },
												        {
												        	id:9,name:'模块接口定义'
												        },
												        {
												        	id:10,name:'模块化平台'
												        },
												        {
												        	id:11,name:'配置设计'
												        },
												        {
												        	id:12,name:'变型设计'
												        },
												        {
												        	id:13,name:'变型设计'
												        }
												        
												        ]
											}]
						               	    },
					               	 {	type : 'formitem',label : '输入:',labelWidth : 100,labelAlign : 'right',
						               	    children : [{type : 'text',width : 200,id : 'input',text:processname}]
						               	    },
					               	 {	type : 'formitem',label : '输出:',labelWidth : 100,labelAlign : 'right',
						               	    children : [{type : 'text',width : 200,id : 'output',text:processname}]
						               	    },
					               	 {	type : 'formitem',label : '文件上传:',labelWidth : 100,labelAlign : 'right',
						               	    children : [{
											    id: 'pdmfileuploader',
											    type: 'fileupload',
											    textVisible : false,
											    width: 200,
											    swfUploadConfig : { // swfUploadConfig配置对象请参考swfupload组件说明
											
													upload_url : basepathh+'lca/lcamodule!fileupload.action', // 上传地址
													flash_url : 'js/swfupload/swfupload.swf',
													flash9_url : " js/swfupload/swfupload_fp9.swf",
													button_image_url : 'js/swfupload/XPButtonUploadText_61x22.png', // 按钮图片地址
													file_types : '*.doc;*.docx', // 上传文件后缀名限制
													file_post_name : 'file', // 上传的文件引用名
													file_size_limit : '5000000',
													post_params : {
														'uploadDir' : 'uploadDir'
													}
												},
											    onfilequeueerror: function(e){
											        alert("文件选择错误:"+e.message);
											    },
											    onfilequeued: function(e){
											    	for(i in e.file ){
											    		/*  alert(i);           //获得属性 
											    		  alert(e.file[i]);  //获得属性值
			*/								    		}
											    	var a=false;
											    	var newrow={name:e.filename};
											    	choosenfiletable.data.each(function(o, i){
								                        if(o.name == e.filename) {
								                        	alert('重复上传');
								                        	a=true;
								                        }
								                        	
								                    });
								                    if(a){
								                    	return null;
								                    }
											    	choosenfiletable.data.insert(0, newrow);
											    	choosenfiletable.data.insert(knowledgetable.data.source.length, newrow);
											    	//alert(e.filename); 
											    	var ppp = lcauploader.upload;
													ppp.startUpload();
											
											    },
											    
											    onfilestart: function(e){   
											        alert("开始上传");
											    	//lcaupload.mask();
											    },
											    onfileerror: function(e){
											        alert("上传失败:"+e.message);
											        
											        //lcaupload.unmask();
											    },
											    onfilesuccess: function(e){    
											        alert("上传成功");
											        //lcaupload.unmask();
											    }
										    }]
						               	    },
					               	 {	type : 'formitem',label : '说明:',labelWidth : 100,labelAlign : 'right',
						               	    children : [{type : 'textarea',width : 200,height:50,id : 'description',text:processname}]
						               	    }
		               	    			]
										});
			               	 var func=function(){
				            	var processname=Edo.get('processname').text;
				            	var processnote=Edo.get('processnote').text;
				            	var tasktreenodename= Edo.get('tasktreenode').text;
				            	var tasktreenodeid=Edo.get('tasktreenodeid').text;
				            	setmoduleproperty('processname',cell,processname);
				            	setmoduleproperty('processnote',cell,processnote);
				            	setmoduleproperty('tasktreenodeid',cell,tasktreenodeid);
						   		setmoduleproperty('tasktreenodename',cell,tasktreenodename);
				            	/* cell.processname=processname;
				            	cell.processnote=processnote; */
					            var label =  graph.convertValueToString(cell);
				    		    var nodelabel =  label.slice(0,label.length);
				    		    var newlabel = label.replace(nodelabel,
				    		     '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
									'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
						                '<tr>'+
						                    ' <td align="center"></td>'+
						                '</tr>'+
						                '<tr>'+
						                    ' <td align="center">'+processname+'</td>'+
						                '</tr>'+
						                '</table>'+
						                '</div>');
						                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
							           }
							var toolbar=new gettoolbar(null,func);
							var winprocess=getmywin(400,350,'填写模块信息',[box,toolbar]);
							 winprocess.show('center', 'middle', true);
						   	}
						 
						}
					}

					// Disables any default behaviour for the double click
					mxEvent.consume(evt);
				};

				// Enables new connections
				graph.setConnectable(true);

				// Adds all required styles to the graph (see below)
				configureStylesheet(graph);

				// Adds sidebar icons.
				//
				// NOTE: For non-HTML labels a simple string as the third argument
				// and the alternative style as shown in configureStylesheet should
				// be used. For example, the first call to addSidebar icon would
				// be as follows:
				// addSidebarIcon(graph, sidebar, 'Website', 'img/earth.png');
				
				

				
				// Creates a new DIV that is used as a toolbar and adds
				// toolbar buttons.
				var spacer = document.createElement('div');
				spacer.style.display = 'inline';
				spacer.style.padding = '8px';
				
				//addToolbarButton(editor, toolbar, 'groupOrUngroup', '构建组', 'img/group.png');
				
				// Defines a new action for deleting or ungrouping
				editor.addAction('groupOrUngroup', function(editor, cell)
				{
					cell = cell || editor.graph.getSelectionCell();
					if (cell != null && editor.graph.isSwimlane(cell))
					{
						editor.execute('ungroup', cell);
					}
					else
					{
						editor.execute('group');
					}
				});

			
				editor.addAction('savemodule', function(editor, cell)
				{   
				   getPDMmoduledefine();
					
				});
				editor.addAction('export', function(editor, cell)
				{ 
					var textarea = document.createElement('textarea');
					textarea.style.width = '400px';
					textarea.style.height = '400px';
					var enc = new mxCodec(mxUtils.createXmlDocument());
					var node = enc.encode(editor.graph.getModel());
					textarea.value = mxUtils.getPrettyXml(node);
					showModalWindow(graph, 'XML', textarea, 410, 440);
				
				    
				});
				editor.addAction ('moduleassign', function(editor, cell)
						{ 
					     var graph=editor.graph;
						 var cells =  graph.getChildCells();
						 var choosencells=[];
						 for(var i=0;i<cells.length;i++){
							 if(cells[i].getStyle()=='process'){
								 if(cells[i].ischoosen==true)
									 {
									 choosencells.push(cells[i]);
									 }
							 }
						 }
						 parent.resetmoduledefineContainer();
						 drawchoosencells(choosencells)
						 wholelevel.getcurrentlevel().type='realmodulelevel';
						});
				var outln = new mxOutline(graph, outline);
				var menubar= Edo.create({
				type: 'box',
				id:'menubox',
				width: '100%',
				height:40,
			    layout: 'horizontal',
			    padding:[0,0,0,0], //横向布局
			    border: [0,0,0,0],
			    render:toolbar,
			    children: [
			     /* {type: 'button', width:60,height:30,text: '新增', arrowMode: 'menu',style:'background:CCFF00',
			            menu: [
			                {type: 'button', text: 'LCA模板',onclick: function(e){
			                	moduleobject=new moduledefine('LCA');
			                }
			                	},
			                {type: 'button', text: 'LCC模板',onclick: function(e){
			                	moduleobject=new moduledefine('LCC');
			                }
			                	},
			                {type: 'button', text: 'PDM模板',onclick: function(e){
			                	moduleobject=new moduledefine('PDM');
			                }
			                	}
			            ]
			        },  */                       
			       /*  {type: 'button', text: '新增零部件模型',width:120,height:35,style:'border-radius:10px;',onclick: function(e){
			            if(moduleobject.issaved){
				        	window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
			   	        	moduleobject.componentname=null;
							moduleobject.componentid=null;
							moduleobject.stage=null;
							moduleobject.modulename=null;
			     			moduleobject.modulenote=null;
			     			moduleobject.issaved=false;
		   	        	}else if(moduleobject.stage!=null){ 
		   	        	    var label=Edo.create({
		   	        	    type:'label',
		   	        	    text:'是否保存模型信息?'
		   	        	    });
		   	        	    var func=function(){
		   	        	    editor.execute('savemodule');
		   	        	    window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
			   	        	moduleobject.componentname=null;
							moduleobject.componentid=null;
							moduleobject.stage=null;
							moduleobject.modulename=null;
			     			moduleobject.modulenote=null;
			     			moduleobject.issaved=false;
			           		}
			           		var toolbar=new gettoolbar(null,func);
	   	         			var win=cims201.utils.getWin(400,200,'模型保存',[label,toolbar]);
			            
		   	        	}else{
	   	        			window.parent.createcompmodule();
			   				var graph=editor.graph;
			   	        	var model=graph.getModel();
			   	        	model.clear();
		   	        	}
		   	        	}
		   	        }, */
		   	     	{type: 'button', text: '定制模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('moduleassign');}},
			        {type: 'button', text: '保存模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('savemodule');}},
			        {type: 'button', text: '清空模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){clearmodule();}},
			      /*   {type: 'button', text: '编辑下一层模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){
				       var cell=editor.graph.getSelectionCell();
					       if(cell!=null&&editor.graph.model.getStyle(cell)==moduleobject.style){
						          var level=wholelevel.getcurrentlevel();
							       var modules=level.levelmodules;
							       level.cells=editor.graph.getChildCells();
							       for(var i=0;i<modules.length;i++){
								       if(modules[i].levelmoduleobject.cellid==cell.getId()){
								         savecells();
								            if(modules[i].childlevel!=null){
								             initgraph();
								            var childlevel=modules[i].childlevel;
								       
								             var cells=childlevel.cells;
								             editor.graph.addCells(cells);
								             wholelevel.setcurrentlevel(childlevel);
								            }else{
								            wholelevel.addlevel(modules[i]);
								            initgraph();
								       		} 
								       		break;
								       }
							       		
							       }
					       }
					       }
			       }, */
			        {type: 'button', text: '返回上一层模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){
			            returntoparentlevel();
			       	}},
			        {type: 'button', text: '放大',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomIn');}},
			        {type: 'button', text: '缩小',width:70,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('zoomOut');}}
			            
			    ]
				});
		
		    function toggle(e){

			    var panel = this.parent.owner;
			    var accordion = panel.parent;
			    accordion.getChildren().each(function(child){
			        if(panel != child) child.collapse();
			    });
			    panel.toggle()
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
		   // var data= cims201.utils.getData(basepathh+'node/node!getnodelist.action',{});
		    addSidebarIcon(null,graph, sidebar, null, 'img/start.png','start','开始');
		    var br = document.createElement('br');
			sidebar.appendChild(br);
			addSidebarIcon(null,graph, sidebar, '模块节点', 'img/cell.png','process','模块节点');
			var br = document.createElement('br');
			sidebar.appendChild(br);
			/* addSidebarIcon(null,graph, sidebar, '执行节点', 'img/cell.png','taskprocess','执行节点');
			var br = document.createElement('br');
			sidebar.appendChild(br); */
			addSidebarIcon(null,graph, sidebar, null, 'img/stop.png','end','结束');
			  /*  editor.setToolbarContainer(sidebar);
                 editor.toolbar.addMode('ss', 'img/earth.png', null, null);
                  var combo=editor.toolbar.addCombo();
                 editor.toolbar.addOption(combo,'ss','dd');
                 editor.toolbar.addOption(combo,'ss','dd'); */
                 // addOption
		/* var producttreebox = Edo.create({
			type:'box',
			width: 160,
			render:sidebartree,
			height:550,
			padding:0,
			style:'border:0;',
			children:[
				{type: 'box',
				id:'lcacompcontent',
          	 	width: '100%',
          	 	height: '25%',
		    	visible:false,
	    		children:[
			        {type : 'label',text : '产品名称:'},
	          		{type : 'text',id : 'pdmdname'},
	          		{type : 'label',text : '正在构建对象:'},
	          		{type : 'text',id : 'compname'}
          		]},
          		
	          			{
			            type: 'panel',padding:0,
			            id:'producttree',
			            headerVisible:false,
			            width: '100%',height: '60%',  
			            title: '<span style="font-size:13px">产品结构</span>',
			            enableCollapse: true,
			            expanded: false, 
			            onclick: onPanelClick, 
			            visible:false,                                          
			            titlebar:[{
			                cls:'e-titlebar-accordion',
			                onclick: toggle
			            }]
			        	},
				        {
				            type: 'panel',padding:0,
				            id:'nodetree',
				            width: '100%',height: '60%',    
				            headerVisible:false,          
				            enableCollapse: true,
				            expanded: true, 
				            onclick: onPanelClick,                                           
				            titlebar:[{
				                cls:'e-titlebar-accordion',
				                onclick: toggle
				                
				            }],
				            children: [
					                {type: 'table',id:'nodelist', autoColumns: true,headerVisible: false,width: '100%', height: '100%',verticalLine: false, horizontalLine: false, //rowHeight: 25,
					                    onselectionchange: function(e){	
					                        var nodetype= moduletype;
					                       // var nodetype='PDM';
								            getcollection(graph,modelbar,nodetype,e.selected.name);
								        },
					                    rowHeight: 20,
					                    columns: [
					                        {   
					                            renderer: function(v, r){
					                          
					                                return r.name;
					                            }
					                          
					                        }
					                    ],
					                    data:data
					                 
				            }]
				          
				        }
				
			]}); */
		
		 
	/* 	document.oncontextmenu = function(){
        	if(editor.graph.getSelectionCell()!=null){
        	editor.toolbar
        	}else{
        	alert('b');
        	}
		}; */
		
      
/* 		mxEvent.addListener(graph.container, 'contextmenu',
                  function(e) {
              var cell=editor.graph.getSelectionCell();
              var x=mxEvent.getClientX(e);
              var y=mxEvent.getClientY(e);
              if(cell==null){
               
              //alert(v1.getGeometry().x);
              	  if(popmenu2.isMenuShowing){
		      		 popmenu2.hideMenu();
		          }
		          if(popmenu.isMenuShowing){
		      		 popmenu.hideMenu();
		          }
		          var offset = mxUtils.getOffset(graph.container);
                  popmenu2.div.style.left = x+ 'px';
       			  popmenu2.div.style.top = y+'px';
                  popmenu2.showMenu();
              }else{
                   //bbl
                  if(editor.graph.model.getStyle(cell)==moduleobject.style){
                  
	                   if(popmenu.isMenuShowing){
			      		 popmenu.hideMenu();
			          }
			          if(popmenu2.isMenuShowing){
					        popmenu2.hideMenu();
				      }
	                  //var offset = mxUtils.getOffset(graph.container);
	                  popmenu.div.style.left =  x+cell.getGeometry().width/2 +'px';
	       			  popmenu.div.style.top = y +'px';
	                  popmenu.showMenu();
                  }else{
                 	 alert('该对象不允许编辑！')
                  }
               
              
              }
                });	
		  mxEvent.addListener(graph.container, 'click', 
				    function(evt) {
				        if(popmenu.isMenuShowing){
				        popmenu.hideMenu();
				        }
				         if(popmenu2.isMenuShowing){
				        popmenu2.hideMenu();
				        }
				        mxEvent.consume(evt);
				    });	 */
		
		
		
		
		
		
			// Checks if the browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Assigns some global constants for general behaviour, eg. minimum
				// size (in pixels) of the active region for triggering creation of
				// new connections, the portion (100%) of the cell area to be used
				// for triggering new connections, as well as some fading options for
				// windows and the rubberband selection.
				mxConstants.MIN_HOTSPOT_SIZE = 16;
				mxConstants.DEFAULT_HOTSPOT = 1;
				
				// Enables guides
				mxGraphHandler.prototype.guidesEnabled = true;

			    // Alt disables guides
			    mxGuide.prototype.isEnabledForEvent = function(evt)
				{
					return !mxEvent.isAltDown(evt);
				};

				// Enables snapping waypoints to terminals
				mxEdgeHandler.prototype.snapToTerminals = true;

				// Workaround for Internet Explorer ignoring certain CSS directives
				if (mxClient.IS_QUIRKS)
				{
					document.body.style.overflow = 'hidden';
					new mxDivResizer(container);
					new mxDivResizer(outline);
					new mxDivResizer(toolbar);
					//new mxDivResizer(modelbar);
					new mxDivResizer(status);
				}
				
				// Creates a wrapper editor with a graph inside the given container.
				// The editor is used to create certain functionality for the
				// graph, such as the rubberband selection, but most parts
				// of the UI are custom in this example.
				
				

				// To show the img in the outline, uncomment the following code
				//outln.outline.labelsVisible = true;
				//outln.outline.setHtmlLabels(true);
				
				// Fades-out the splash screen after the UI has been loaded.
				var splash = document.getElementById('splash');
				if (splash != null)
				{
					try
					{
						mxEvent.release(splash);
						mxEffects.fadeOut(splash, 100, true);
					}
					catch (e)
					{
					
						// mxUtils is not available (library not loaded)
						splash.parentNode.removeChild(splash);
					}
				}
			}
				    parent.initgraph()
		};
		function returntoparentlevel(){
			var level3=wholelevel.getcurrentlevel();
			var graph=editor.graph;
			var cells =  graph.getChildCells();
			level3.cells=cells;
			if(cells.length>0){
				var enc = new mxCodec(mxUtils.createXmlDocument());
				var node = enc.encode(graph.getModel());
				var xmldata = mxUtils.getPrettyXml(node);
				level3.xml=xmldata;
			}
		   initgraph();
     	   var parentlevel=level3.getparentlevel();
          /*  var modules1=parentlevel.levelmodules;
           var cells=new Array();
            for(var i=0;i<modules1.length;i++){
             var cell=modules1[i].levelmoduleobject.cell;
             cells.add(cell)
            } */
            var parentcells=parentlevel.cells;
            editor.graph.addCells(parentcells);
            wholelevel.setcurrentlevel(parentlevel);
		}
			       		
      		
		function addToolbarButton(editor, toolbar, action, label, image, isTransparent)
		{
			var button = document.createElement('button');
			button.style.fontSize = '10';
			if (image != null)
			{
				var img = document.createElement('img');
				img.setAttribute('src', image);
				img.style.width = '16px';
				img.style.height = '16px';
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				button.appendChild(img);
			}
			if (isTransparent)
			{
				button.style.background = 'transparent';
				button.style.color = '#FFFFFF';
				button.style.border = 'none';
			}
			mxEvent.addListener(button, 'click', function(evt)
			{
				editor.execute(action);
			});
			mxUtils.write(button, label);
			toolbar.appendChild(button);
		};
		//添加右键跳出菜单
		function createPopupMenu(graph, menu, cell, evt)  
		{  
		    var model = graph.getModel(); 
		    var level=wholelevel.getcurrentlevel();
		    if (cell != null)  
		    {   //
		        if (model.isVertex(cell))  
		        { 
		           if (level.type=='modulelevel')  
		       	   {  
		       	   	menu.addItem('选择/取消选择', null, function()  
		            {   
		            	var style=cell.getStyle();
			            var label =  graph.convertValueToString(cell);
			     		var nodelabel =  label.slice(0,label.length);
		            	if(cell.ischoosen){
		            	  var newlabel = label.replace(nodelabel,
			     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
			 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
			 						 '<tr>'+
			 	                    	' <td align="center">'+cell.indexname+'</td>'+
			 	                    '</tr>'+
			 		                '</table>'+
			 		                '</div>'
			     		   /* '<div style="margin:0px;padding:30px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
			 					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
			 		                '<tr>'+
			 	                    	' <td align="center">'+cell.stagename+'阶段'+'<img src="img/check.png" />'+'</td>'+
			 	                    '</tr>'+
			 		                '</table>'+
			 		                '</div>'*/);
			 		                 cell.ischoosen=false;
		            	
		            	
		            	}else{
		            		
		            		
		            		  var newlabel = label.replace(nodelabel,
				     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
				 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
				 						 '<tr>'+
				 	                    	' <td align="center">'+cell.indexname+'<img src="img/check.png" />'+'</td>'+
				 	                    '</tr>'+
				 		                '</table>'+
				 		                '</div>'
				     		   /* '<div style="margin:0px;padding:30px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
				 					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
				 		                '<tr>'+
				 	                    	' <td align="center">'+cell.stagename+'阶段'+'<img src="img/check.png" />'+'</td>'+
				 	                    '</tr>'+
				 		                '</table>'+
				 		                '</div>'*/);
		            		  cell.ischoosen=true;
				 		               
		            		
		            	}
		           	 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
		            }
		            );  
		       	    }else{
		       	        menu.addItem('编辑下一层', null, function()  
				            {  
				            	 var cell=editor.graph.getSelectionCell();
							       if(cell!=null&&editor.graph.model.getStyle(cell)=='process'){
							       			//获得当前层
								          var level=wholelevel.getcurrentlevel();
									       //当前层的modules对象
									       var modules=level.levelmodules;
									       //当前层的cell
									       level.cells=editor.graph.getChildCells();
									       //遍历当前层的所有module，找与之对应的cell
									       for(var i=0;i<modules.length;i++){
										       if(modules[i].levelmoduleobject.cellid==cell.getId()){
										         
										         savecells();
										         //如果下一层编辑过，存在childlevel，则直接获得它被设置为currentlevel,得到它的cells，初始化graph
										            if(modules[i].childlevel!=null){
										             initgraph();
										            var childlevel=modules[i].childlevel;
										            /* var childmodules=childlevel.levelmodules;
										            var cells=[];
										             for(var j=0;j<childmodules.length;j++){
										             var cell=childmodules[j].levelmoduleobject.cell;
										             cells.push(cell)
										             } */
										             var cells=childlevel.cells;
										             editor.graph.addCells(cells);
										             wholelevel.setcurrentlevel(childlevel);
										            }else{
										            //不存在下一层，那么就为modules[i]添加下一层
										            wholelevel.addlevel(modules[i]);
										            initgraph();
										       		} 
										       		break;
										       }
									       		
									       }
									      parent.resetmoduledefineContainer();
							       }
				            }
				            ); 
				             menu.addItem('编辑模型信息', null, function()  
				            {  
				            	var label =  graph.model.getStyle(cell);
				            	if(label=='process'){
							  	    var level=wholelevel.getcurrentlevel();
						      	    var modules=level.levelmodules;
									var cells =  graph.getChildCells();
							        for(var i=0;i<modules.length;i++){
								       if(modules[i].levelmoduleobject.cellid==cell.getId()){
										    parent.moduleprocessdefine(cell,modules[i],modules);
										    break;
								    	}
									}
			            		}
				            }
				            );
				             menu.addItem('复制', null, function()  
				            {  
				                copyfunc();
				            }
				            ); 
				             menu.addItem('剪切', null, function()  
				            {  
				                cutfunc();
				            }
				            );
				            menu.addItem('删除', null, function()  
				            {  
				                deletefunc();
				            }
				            );     
		       	    }
		        /*     if(style=='process'){ */
		            
		        }
		        }else if (level.type!='modulelevel')  
		        	//没有选中节点并且右击空地的时候
		       	{  
		          menu.addItem('粘贴', null, function()  
	            {  
	                pastefun();
	            }
	            );  
		        }
		        
	           
		     /*    } */
		  
		    /* if (cell != null)  
		    {  
		        if (model.isVertex(cell))  
		        {  
		            menu.addItem('Add child', 'editors/images/overlays/check.png', function()  
		            {  
		                addChild(graph, cell);  
		            });  
		        }  
		  
		        menu.addItem('Edit label', 'editors/images/text.gif', function()  
		        {  
		            graph.startEditingAtCell(cell);  
		        });  
		  
		        if (cell.id != 'treeRoot' &&  
		            model.isVertex(cell))  
		        {  
		            menu.addItem('Delete', 'editors/images/delete.gif', function()  
		            {  
		                deleteSubtree(graph, cell);  
		            });  
		        }  
		  
		        menu.addSeparator();  
		    }  
		  
		    menu.addItem('Fit', 'editors/images/zoom.gif', function()  
		    {  
		        graph.fit();  
		    });  
		  
		    menu.addItem('Actual', 'editors/images/zoomactual.gif', function()  
		    {  
		        graph.zoomActual();  
		    });  
		  
		    menu.addSeparator();  
		  
		    menu.addItem('Print', 'editors/images/print.gif', function()  
		    {  
		        var preview = new mxPrintPreview(graph, 1);  
		        preview.open();  
		    });  
		  
		    menu.addItem('Poster Print', 'editors/images/print.gif', function()  
		    {  
		        var pageCount = mxUtils.prompt('Enter maximum page count', '1');  
		  
		        if (pageCount != null)  
		        {  
		            var scale = mxUtils.getScaleForPageCount(pageCount, graph);  
		            var preview = new mxPrintPreview(graph, scale);  
		            preview.open();  
		        }  
		    });   */
		};
		function showModalWindow(graph, title, content, width, height)
		{
			
			var x = Math.max(0, document.body.scrollWidth/2-width/2);
			var y = Math.max(10, (document.body.scrollHeight ||
						document.documentElement.scrollHeight)/2-height*2/3);
			var wnd = new mxWindow(title, content, x, y, width, height, false, true);
			wnd.setClosable(true);
			
			// Fades the background out after after the window has been closed
			wnd.addListener(mxEvent.DESTROY, function(evt)
			{
				graph.setEnabled(true);
			});
			graph.setEnabled(false);
			graph.tooltipHandler.hide();
			wnd.setVisible(true);
			return wnd;
		};
		function getcollection(graph,sidebar,nodetype,nodecategory){
			 var datas= cims201.utils.getData(basepathh+'node/node!getNodeListByType.action',{nodetype:nodetype,nodecategory:nodecategory});
			 for(i=0;i<datas.length;i++){
			            var id=datas[i].id
						var image=datas[i].img;
						var label=datas[i].label;
						var prompt=datas[i].nodedrawtype;
						var description=datas[i].description;
						addSidebarIcon(id,graph, sidebar, label, image,prompt,description)
			}
		}
		function addSidebarIcon(nodeid,graph, sidebar, label, image,prompt,title)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument y
				var parent = graph.getDefaultParent();
				var model = graph.getModel();
				//alert(parent.getId());
				var v1 = null;
				//回调函数，拖拽工具栏图标的时候触发。
				var funct = function(graph, evt, cell, x, y)
			        {
			  		var parent = graph.getDefaultParent();
					var model = graph.getModel();
					var v1 = null;
					model.beginUpdate();
					try
					{
						// NOTE: For non-HTML labels the image must be displayed via the style
						// rather than the label markup, so use 'image=' + image for the style.
						// as follows: v1 = graph.insertVertex(parent, null, label,
						// pt.x, pt.y, 120, 120, 'image=' + image);
						
				
						v1 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;background:#00CCFF;height:100px;opacity:100;border:0px">'+
								'<table style=" width:170px;height:90px;margin: auto;padding:0px 0px 0px 0px;">'+
					                '<tr>'+
					                    ' <td align="center">'+label+'</td>'+
					                '</tr>'+
					                '</table>'+
					                '</div>', x, y, 180, 100,prompt);
						v1.setConnectable(true);
						
						// Presets the collapsed size
						v1.geometry.alternateBounds = new mxRectangle(0, 0, 120, 80);
							
						// Adds the ports at various relative locations
				//		var func = graph.insertVertex(v1,null, 'func', 120, 1, 12, 12,
				//				'func;image=img/flash.png;spacingLeft=18', true);
				//		func.geometry.offset = new mxPoint(-8, -8);
			
				//		var input = graph.insertVertex(v1,null, 'Input', 1, 120, 12, 12,
				//				'input;image=img/check.png;align=right;imageAlign=right;spacingRight=18', true);
				//		input.geometry.offset = new mxPoint(-6, -4);
						
						/* var port = graph.insertVertex(v1, null, 'Error', 119, 1, 16, 16,
								'port;image=img/error.png;spacingLeft=18', true);
						port.geometry.offset = new mxPoint(-8, -8); */
	
				//		var output = graph.insertVertex(v1,null, 'output', 120, 120, 12, 12,
				//				'output;image=img/information.png;spacingLeft=18', true);
				//		output.geometry.offset = new mxPoint(-8, -4);
					}
					finally
					{
						model.endUpdate();
					}   
              			if(prompt=='process'){
	              			var levelmodule=wholelevel.addlevelmodule(v1);
	              			levelmodule.levelmoduleobject.type=prompt;
              			}
				  		graph.setSelectionCell(v1);
			   
              		
					v1.nodeid=nodeid;
				};
			// Creates the image which is used as the sidebar icon (drag source)
		/* 	if(!modelbar.hasChildNodes())
			{ */
			var img = document.createElement('img');
			if(image==null){
			img.setAttribute('src', 'img/gear.png');
			}else{
			img.setAttribute('src', image);
			}
			img.style.width = '50px';
			img.style.height = '50px';
			img.title = title;
			
			sidebar.appendChild(img);
			//}
			
			var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = '120px';
			dragElt.style.height = '120px';
			  					
			// Creates the image which is used as the drag icon (preview)
			var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, 0, 0, true, true);
			ds.setGuidesEnabled(true);
		};
		
		function configureStylesheet(graph)
		{
			var style = graph.getStylesheet().getDefaultVertexStyle();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
			style[mxConstants.STYLE_FONTSIZE] = 11;
			style[mxConstants.STYLE_STARTSIZE] = 22;
			style[mxConstants.STYLE_HORIZONTAL] = false;
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_FILLCOLOR] = '#eeeeee';
			delete style[mxConstants.STYLE_FILLCOLOR];
			delete style[mxConstants.STYLE_FONTSIZE];

			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'center';
			style[mxConstants.STYLE_ROUNDED] = false;
			style[mxConstants.STYLE_HORIZONTAL] = true;
			style[mxConstants.STYLE_FONTSIZE] = 20;
			style[mxConstants.STYLE_FILLCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_SPACING_RIGHT] = 0;
			style[mxConstants.STYLE_SPACING_TOP] = 0;
			style[mxConstants.STYLE_IMAGE] = 'img/connect.png';
			delete style[mxConstants.STYLE_STARTSIZE];
			graph.getStylesheet().putCellStyle('process', style);
			style = mxUtils.clone(style);
			graph.getStylesheet().putCellStyle('taskprocess', style);
			
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_TRIANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
			style[mxConstants.STYLE_FILLCOLOR] = '#8FBC8F';
			style[mxConstants.STYLE_FONTSIZE] = 14;
			style[mxConstants.STYLE_SPACING_TOP] = 20;
			style[mxConstants.STYLE_SPACING_RIGHT] = 27;
			style[mxConstants.STYLE_IMAGE] = 'img/connect.png';
			delete style[mxConstants.STYLE_ROUNDED];
			graph.getStylesheet().putCellStyle('start', style);
											
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
			style[mxConstants.STYLE_SPACING_TOP] = 18;
			style[mxConstants.STYLE_SPACING_RIGHT] = 0;
			style[mxConstants.STYLE_IMAGE] = 'img/connect.png';
			style[mxConstants.STYLE_FILLCOLOR] = '#FFFFE0';
			graph.getStylesheet().putCellStyle('condition', style);
							
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
			style[mxConstants.STYLE_SPACING_TOP] = 18;
			style[mxConstants.STYLE_FONTSIZE] = 14;
			//style[mxConstants.STYLE_FONTSTYLE] = 1;
			style[mxConstants.STYLE_FILLCOLOR] = '#F4A460';
			delete style[mxConstants.STYLE_SPACING_RIGHT];
			style[mxConstants.STYLE_IMAGE] = 'img/stop.png';
			graph.getStylesheet().putCellStyle('end', style);
			
			style = graph.getStylesheet().getDefaultEdgeStyle();
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
			style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_STROKECOLOR] = 'black';
			
			style = mxUtils.clone(style);
			style[mxConstants.STYLE_DASHED] = true;
			style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
			style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
			graph.getStylesheet().putCellStyle('crossover', style);
			
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_FILLCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#00CCFF';
			style[mxConstants.STYLE_STROKECOLOR] = '#00CCFF';
			style[mxConstants.STYLE_FONTCOLOR] = 'black';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '100';
			style[mxConstants.STYLE_STARTSIZE] = '30';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 1;
			graph.getStylesheet().putCellStyle('group', style);

			var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '80';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
			graph.getStylesheet().putDefaultVertexStyle(style);
			
		    style = graph.getStylesheet().getDefaultEdgeStyle();  
             style[mxConstants.STYLE_ROUNDED] = true;  
             style[mxConstants.STYLE_STROKEWIDTH] = 3;  
             style[mxConstants.STYLE_EXIT_X] = 0.5; // center  
             style[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom  
             style[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled  
             style[mxConstants.STYLE_ENTRY_X] = 0.5; // center  
             style[mxConstants.STYLE_ENTRY_Y] = 0; // top  
             style[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled  
                  
                // 禁用以下几个为直线  
                style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;  
		};
		var wholelevel =new alllevel();
		var rootlevel=new level();
		rootlevel.type='modulelevel';
		wholelevel.setrootlevel(rootlevel);
		wholelevel.setcurrentlevel(rootlevel);
		function setmoduleproperty(propertyname,cell,propertyvalue){
		   var level=wholelevel.getcurrentlevel();
	       var modules=level.levelmodules;
	       level.cells=editor.graph.getChildCells();
	       for(var i=0;i<modules.length;i++){
		       if(modules[i].levelmoduleobject.cellid==cell.getId()){
		       modules[i].propertyname=propertyvalue;
		       break;
		       }
	       }
		}
		
		function getmoduleproperty(propertyname,cell){
		   var level=wholelevel.getcurrentlevel();
	       var modules=level.levelmodules;
	       level.cells=editor.graph.getChildCells();
	       for(var i=0;i<modules.length;i++){
		       if(modules[i].levelmoduleobject.cellid==cell.getId()){
		       return modules[i].propertyname;
		       }
	       }
		}
		//添加新过程节点
		function addnewprocess(label,x,y,width,height,type,color){
			var graph=editor.graph;
			var model = graph.getModel();  
			var parent = editor.graph.getDefaultParent();
			 model.beginUpdate();  
		    try  
		    {  
				var v = graph.insertVertex(parent,null, '<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;background:'+color+';height:100px;opacity:100;border:0px">'+
					'<table style=" width:170px;height:90px;margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">'+label+'</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', x, y, width, height,type);
	            /*  var geometry = model.getGeometry(v);  
	             var size = graph.getPreferredSizeForCell(v);  
	        	 geometry.width = size.width;  
	        	 geometry.height = size.height;   */
        	}  
		    finally  
		    {  
		        model.endUpdate();  
		    }  
		    v.indexname=label;
			return v;
			}
		//将cells信息和xml信息保存当前层
		function savecells(){
			var cells = editor.graph.getChildCells();
			 wholelevel.getcurrentlevel().cells=cells;
			 if(cells.length>0){
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var node = enc.encode(editor.graph.getModel());
			var xmldata = mxUtils.getPrettyXml(node);
			wholelevel.getcurrentlevel().xml=xmldata;
		}
		}
		function changecelllabel(processname,cell){
		    		var graph=editor.graph;
					var style=cell.getStyle();
		            var label =  graph.convertValueToString(cell);
		     		var nodelabel =  label.slice(0,label.length);
		 			var newlabel = label.replace(nodelabel,
				     		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
				 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
				 						 '<tr>'+
				 	                    	' <td align="center">'+processname+'<img src="img/check.png" />'+'</td>'+
				 	                    '</tr>'+
				 		                '</table>'+
				 		                '</div>');
		           	 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
		}
		function drawchoosencells(cells){
		     var graph=editor.graph;
		     initgraph();
		     var parent = graph.getDefaultParent();
			/*  var start = graph.insertVertex(parent,null, '', 100, 50, 90, 90,'start'); */
			 var v1 = addnewprocess(cells[0].indexname,100, 50, 180, 100,'process','#00CCFF');
			 var levelmodule=wholelevel.addlevelmodule(v1);
			 levelmodule.levelmoduleobject.type='process';
			 levelmodule.levelmoduleobject.processname=cells[0].indexname;
			 var previous=v1;
			 for(var i=1;i<cells.length;i++){
				 var v = addnewprocess(cells[i].indexname,100, i*150+50, 180, 100,'process','#00CCFF');
				 var levelmodule=wholelevel.addlevelmodule(v);
				 levelmodule.levelmoduleobject.type='process';
				 levelmodule.levelmoduleobject.processname=cells[i].indexname;
				 var e1=graph.insertEdge(parent, null, '', previous, v);
				 previous=v;
				 }
				/*  var end = graph.insertVertex(parent,null, '', (stages.length+1)*220+20, 205, 90, 90,'end');
			 var e1=graph.insertEdge(parent, null, '', previous, end, 'crossover'); */
				savecells();
			 
		}
		function buildproductpdmmodule(){
		var graph=editor.graph;
		var parent = editor.graph.getDefaultParent();
		var v011 = addnewprocess('市场分析及确定需求',100, 100, 180, 100,'process','#00CCFF');
		var v012 =addnewprocess('确定功能原理和功能模块及系列化规划',100, 250, 180, 100,'process','#00CCFF'); 
		var v013 =  addnewprocess('寻找原理方案及总体结构规划',100, 400,180, 100,'process','#00CCFF');
		var v014 = addnewprocess('结构模块划分',100, 550, 180, 100,'process','#00CCFF');
		var e011=graph.insertEdge(parent, null, '', v011, v012 );    
		var e012=graph.insertEdge(parent, null, '', v012, v013 );    
		var e013=graph.insertEdge(parent, null, '', v013, v014 );    
		  
		var v021 = addnewprocess('阐明任务确定需求',400, 100,180, 100,'process','#00CCFF');
		var v022 =addnewprocess('零部件ABC分析',400, 250, 180, 100,'process','#00CCFF'); 
		var v023 =  addnewprocess('产品功能系列化和模块化规划',400, 400, 180, 100,'process','#00CCFF');
		var v024 = addnewprocess('结构模块优化',400, 550, 180, 100,'process','#00CCFF');
		
		var e021=graph.insertEdge(parent, null, '', v021, v022 );    
		var e022=graph.insertEdge(parent, null, '', v022, v023 );    
		var e023=graph.insertEdge(parent, null, '', v023, v024 );    
		
		var v05 = addnewprocess('建立产品编码和名称字典',250, 700, 180, 100,'process','#00CCFF');
		var v06 = addnewprocess('标准模块设计和模块接口定义',250, 850,180, 100,'process','#00CCFF');
		var v07 =addnewprocess('模块化产品及平台总体构建',250, 1000, 180, 100,'process','#00CCFF'); 
		var v08 =  addnewprocess('产品结构及系列化设计',250, 1150, 180, 100,'process','#00CCFF');
		var v09 =  addnewprocess('产品模块化平台',250, 1300, 180, 100,'process','#00CCFF');
		var v10 = addnewprocess('产品配置设计',250, 1450,180, 100,'process','#00CCFF');
		var v11 =addnewprocess('产品变型设计',250, 1600,180, 100,'process','#00CCFF'); 
		
	
		var e014=graph.insertEdge(parent, null, '', v014, v05 );    
		var e024=graph.insertEdge(parent, null, '', v024, v05 );    
		
		var e05=graph.insertEdge(parent, null, '', v05, v06 );    
		var e06=graph.insertEdge(parent, null, '', v06, v07 );    
		var e07=graph.insertEdge(parent, null, '', v07, v08 );    
		var e08=graph.insertEdge(parent, null, '', v08, v09 );    
		var e09=graph.insertEdge(parent, null, '', v09, v10 );    
		var e10=graph.insertEdge(parent, null, '', v10, v11 );    
	/* 	var levelmodulev011=wholelevel.addlevelmodule(v011);
		var levelmodulev012=wholelevel.addlevelmodule(v012);
		var levelmodulev013=wholelevel.addlevelmodule(v013);
		var levelmodulev014=wholelevel.addlevelmodule(v014);
		var levelmodulev021=wholelevel.addlevelmodule(v021);
		var levelmodulev022=wholelevel.addlevelmodule(v022);
		var levelmodulev023=wholelevel.addlevelmodule(v023);
		var levelmodulev024=wholelevel.addlevelmodule(v024);
		var levelmodulev05=wholelevel.addlevelmodule(v05);
		var levelmodulev06=wholelevel.addlevelmodule(v06);
		var levelmodulev07=wholelevel.addlevelmodule(v07);
		var levelmodulev08=wholelevel.addlevelmodule(v08);
		var levelmodulev09=wholelevel.addlevelmodule(v09);
		var levelmodulev10=wholelevel.addlevelmodule(v10);
		var levelmodulev11=wholelevel.addlevelmodule(v11); */
		/* savecells(); */
	
		 
		}
		
	</script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),document.getElementById('outlineContainer'),document.getElementById('toolbarContainer'),document.getElementById('modelbarContainer'),document.getElementById('sidebartree'),document.getElementById('statusContainer'));" style="margin:0px;background:-webkit-gradient(linear, 0 0, 0 100%, from(#2894FF), to(#B5E3E0));">
	
	<!-- Creates a container for the splash screen -->
	<div id="splash"
		style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;">
		<center id="splash" style="padding-top:230px;">
			<img src="img/loading.gif">
		</center>
	</div>
	
	<!-- Creates a container for the sidebar -->
	<div id="toolbarContainer"
		style="position:absolute;white-space:nowrap;overflow:hidden;top:5px;left:200px;height:40px;right:0px;padding:0px">
	</div>
<!--     <div id="modelbarContainer"
		style="position:absolute;overflow:hidden;top:5px;left:500px;max-height:40px;height:40px;padding:5px;right:0px;">
	</div> -->
	<!-- Creates a container for the toolboox -->
	<div id="sidebartree"
		style="position:absolute;text-align:center;overflow:hidden;top:45px;left:0px;bottom:0px;max-width:160px;width:160px;padding-top:5px;padding-left:0px;">
	</div>
	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;border-radius:1em;overflow:hidden;top:50px;left:160px;bottom:0px;right:0px;cursor:default;background:F3F6FB;">
	</div>

	<!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:45px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
	</div>
</body>
</html>
