<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
  String moduleid=request.getParameter("moduleid");
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
		<link href="<%=basePath%>css/liuchang/edo_green_theme/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />

		<script src="<%=basePath%>css/liuchang/edo_green_theme/edo.js" type="text/javascript"></script>
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
		var moduleid=<%=moduleid%>;
		var basepathh='http://localhost:8080/gnhzb';
		var moduleobject={
			versionid:null,
			modulename:null,
			modulenote:null,
		    moduletype:null,
		    issaved:false
		}
		function levelmodule(level,cell){
			this.level=level;
			this.levelmoduleobject={
				cellid:cell.getId(),
				processname:null,
				processnote:null,
				type:null,
				tasktreenodeid:null,
				tasktreenodename:null
				
			
			};
			this.childlevel=null;
		}
		levelmodule.prototype.constructor = levelmodule;
		levelmodule.prototype.createlavelid=function(){
		
		}
		function alllevel(){
		}
		alllevel.prototype.constructor = alllevel;
		alllevel.prototype.rootlevel=null;
		alllevel.prototype.currentlevel=null;
		alllevel.prototype.alllevels=new Array();
		alllevel.prototype.setrootlevel=function(rootlevel){
			this.rootlevel=rootlevel;
			rootlevel.levelid='level_0';
			rootlevel.parentlevelid=0;
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
			newlevel.setparentlevel(parentlevel);
			levelmodule.childlevel=newlevel;
			newlevel.levelid=parentlevel.levelid+'_'+levelmodule.levelmoduleobject.cellid;
			newlevel.parentlevelid=parentlevel.levelid;
			this.alllevels.add(newlevel);
			this.setcurrentlevel(newlevel);
		 
		};
		alllevel.prototype.addlevelmodule=function(cell){
			return this.currentlevel.addlevelmodule(cell);
		};
		function level(){
		this.levelmodules=new Array();
		this.cells=null;
		this.levelid=null;
		this.parentlevelid=null;
		this.parentlevel=null;
		this.xml=null;
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
		
		//定义流程数组
		var cellcollection=new Array();
		//从父窗口初始化产品模型时调用此方法，根据模型类型不同初始化也不同
		function initmodule(moduleobj){
			if(moduleobj.moduletype=='PDM'){
				
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
				graph.dblClick = function(evt, cell)
				{    
				var type =  graph.model.getStyle(cell);
				if(type==null){
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
						if(type=='process'||type=='taskprocess'){
						
						
						   if(moduleobject.moduletype=='PDM'){
						   	if(type=='process'){
						   	var processname=getmoduleproperty('processname',cell);
						    var processnote=getmoduleproperty('processnote',cell);
						   	var box=Edo.create(
									{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
					               	    children: [
					               	    {	type : 'formitem',label : '流程名称:',labelWidth : 150,labelAlign : 'right',
					               	    children : [{type : 'text',width : 200,id : 'processname',text:processname}]
					               	    },
					               	    {	type : 'formitem',label : '流程备注:',labelWidth : 150,labelAlign : 'right',
					               	    children : [{type : 'text',width : 200,id : 'processnote',text:processnote}]
					               	    }
					               	    ]
					               	 });
			               	 var func=function(){
				            	var processname=Edo.get('processname').text;
				            	var processnote=Edo.get('processnote').text;
				            	setmoduleproperty('processname',cell,processname);
				            	setmoduleproperty('processnote',cell,processnote);
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
							var winprocess=getmywin(400,200,'填写流程信息',[box,toolbar]);
							 winprocess.show('center', 'middle', true);
						   	}else{
						   	var processname=getmoduleproperty('processname',cell);
						   	var tasktreenodeid=getmoduleproperty('tasktreenodeid',cell);
					   		var tasktreenodename=getmoduleproperty('tasktreenodename',cell);
						   	var tasktreeTable = new Edo.data.DataTree()
									.set({
									    fields: [
									        {name: 'id', mapping: 'id', type: 'string'
									           
									        },
									        {name: 'name', mapping: 'name',  type: 'string'
									        }
									    ]
									});	
								function refreshdata(dataTable,url,param,id){
								    var data= cims201.utils.getData(url,param);
									dataTable.set('data',data);
								}
								function roleSelect()
									{
								   var r=role.getSelected();
								   if(r!=null){
								   var data= cims201.utils.getData(basepathh+'/tasktree/tasktree!getTaskTreebyRole.action',{role:r.id});
								   tasktreeTable.set('data',data);
									   
									   }
									}
			                	var box=Edo.create(
									{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
					               	    children: [
					               	    {	type : 'formitem',label : '流程名称:',labelWidth : 150,labelAlign : 'right',
					               	    children : [{type : 'text',width : 200,id : 'processname',text:processname}]
					               	    },
					               	    {	type : 'formitem',label : '流程执行模块:',labelWidth : 150,labelAlign : 'right',
					               	    children : [{type : 'text',width : 200,id : 'tasktreenodeid',text:tasktreenodeid,visible:false},{type : 'text',width : 200,id : 'tasktreenode',text:tasktreenodename,
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
										
										var url=basepathh+'/department/department!getOperationRoles.action';
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
					               	    }
		               	    			]
										});
									var func=function(){
						            	var processname=Edo.get('processname').text;
						            	var tasktreenodeid=Edo.get('tasktreenodeid').text;
						            	var tasktreenodename=Edo.get('tasktreenode').text;
						    			setmoduleproperty('processname',cell,processname);
				            			setmoduleproperty('tasktreenodeid',cell,tasktreenodeid);
				            			setmoduleproperty('tasktretasktreenodenameenodeid',cell,tasktreenodename);
						            	/* cell.processname=processname;
						            	cell.tasktreenodeid=tasktreenodeid;
						            	cell.tasktreenodename=tasktreenodename; */
							            var label =  graph.convertValueToString(cell);
						    		    var nodelabel =  label.slice(0,label.length);
						    		    var newlabel = label.replace(nodelabel,
						    		    '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
											'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
								                '<tr>'+
								                    ' <td align="center"></td>'+
								                '</tr>'+
								                '<tr>'+
								                    ' <td align="center">'+tasktreenodename+'</td>'+
								                '</tr>'+
								                '</table>'+
								                '</div>');
								                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
									           }
									var toolbar=new gettoolbar(null,func);
									var winprocess=getmywin(400,200,'填写流程信息',[box,toolbar]);
									 winprocess.show('center', 'middle', true);
						   	}
								
								
						}else{
						new lcaProcessDefine(cell,graph);
						
						}
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

				
				
				//toolbar.appendChild(spacer.cloneNode(true));
				//addToolbarButton(editor, toolbar, 'delete', '删除', 'img/delete2.png');
				//addToolbarButton(editor, toolbar, 'cut', '剪切', 'img/cut.png');
				//addToolbarButton(editor, toolbar, 'copy', '复制', 'img/copy.png');
				//addToolbarButton(editor, toolbar, 'paste', '粘贴', 'img/paste.png');

				//toolbar.appendChild(spacer.cloneNode(true));
				
				//addToolbarButton(editor, toolbar, 'undo', '', 'img/undo.png');
				//addToolbarButton(editor, toolbar, 'redo', '', 'img/redo.png');
				
				//toolbar.appendChild(spacer.cloneNode(true));
				
				/* addToolbarButton(editor, toolbar, 'show', 'Show', 'img/camera.png');
				addToolbarButton(editor, toolbar, 'print', 'Print', 'img/printer.png'); */
				
				//toolbar.appendChild(spacer.cloneNode(true));

				// Defines a new export action
				editor.addAction('savemodule', function(editor, cell)
				{ //bbl
				    var isdefined=false;
				  /*   getPDMmoduledefine(isdefined);
				    alert(isdefined)
				    if(!isdefined){
				    	return null;
				    } */
				    var graph=editor.graph;
					var cells =  graph.getChildCells();
					/* if(cells.length>0&&moduleobject.stage!=null){ */
					if(cells.length>0&&!moduleobject.issaved){
						alert('确定保存文件？');
						if(moduleobject.moduletype=='PDM'){
							/* for(var i=0;i<cells.length;i++){
							    if(cells[i].nodeid!=null){
								var cell={};
								cell.id=cells[i].getId();
								cell.nodeid=cells[i].nodeid;
								cell.processname=cells[i].processname;
								cell.tasktreenodeid=cells[i].tasktreenodeid;
								cellcollection.push(cell);
								}
							} */
						   
						   var level=wholelevel.rootlevel;
						   var alllevels=wholelevel.alllevels;
						   //var moduleuuid= cims201.utils.getData(basepathh+'/module/module!addnewmodule.action',{modulename:moduleobject.modulename,modulenote:moduleobject.modulenote,moduletype:moduleobject.moduletype});     
						   var data=null;
						   Edo.util.Ajax.request({
								url : basepathh+'/module/module!addnewmodule.action',
								type : 'post',
								params : {modulename:moduleobject.modulename,modulenote:moduleobject.modulenote,moduletype:moduleobject.moduletype},
								async : false,
								onSuccess : function(text) {
									// text就是从url地址获得的文本字符串
									if(text == null || text == ''){
										data = null;
									}else{
										data = text;
									}			
								},
								onFail : function(code,a,b,c,d,e,f) {
									// code是网络交互错误码,如404,500之类
									if(code=="500")
									    	Edo.MessageBox.show({
														title : '警告！',
														msg : '系统内部错误！是可能有误操作，如果还有问题请联系管理员',
														buttons : Edo.MessageBox.CANCEL,
														callback : null,
														icon : Edo.MessageBox.WARNING
													});
									if(code=="403")
									    	Edo.MessageBox.show({
														title : '警告！',
														msg : '您没有权限该操作！如果还有问题请联系管理员',
														buttons : Edo.MessageBox.CANCEL,
														callback : null,
														icon : Edo.MessageBox.WARNING
													});
									if(code=="404")
									    	Edo.MessageBox.show({
														title : '警告！',
														msg : '系统错误！没有找到该页面',
														buttons : Edo.MessageBox.CANCEL,
														callback : null,
														icon : Edo.MessageBox.WARNING
													});				
									
									data = 'error'; 
								}
							});
						   var moduleuuid=data;
						   for(var j=0;j<alllevels.length;j++){
						   alert(j)
						   	   var level=alllevels[j];
						       var modules=level.levelmodules;
						       for(var i=0;i<modules.length;i++){
							       if( modules[i].levelmoduleobject.type=='process'){
							       alert('process')
						       			var cell={};
							      		cell.processname=modules[i].levelmoduleobject.processname;
							        	cell.processnote=modules[i].levelmoduleobject.processnote;
							            cell.id=modules[i].levelmoduleobject.cellid;
							            cell.processtype=modules[i].levelmoduleobject.type;
							            cellcollection.push(cell);
							       }else if( modules[i].levelmoduleobject.type=='taskprocess'){
							            var cell={};
							      		cell.processname=modules[i].levelmoduleobject.processname;
							        	cell.tasktreenodeid=modules[i].levelmoduleobject.tasktreenodeid;
							        	cell.tasktreenodename=modules[i].levelmoduleobject.tasktreenodename;
							            cell.id=modules[i].levelmoduleobject.cellid;
							            cell.processtype=modules[i].levelmoduleobject.type;
							            cellcollection.push(cell);
							       }
						     
					       	   }
					       	   var levelid=level.levelid;
					       	   var parentlevelid=level.parentlevelid;
					       	   var xmldata = level.xml;
					       	   alert(moduleuuid)
					       	   alert(cellcollection.length)
					       	   var data= cims201.utils.getData(basepathh+'/module/module!addlevelmodule.action',{levelid:levelid,parentlevelid:parentlevelid,moduleuuid:moduleuuid,cellcollection:cellcollection,xmldata:xmldata,moduletype:moduleobject.moduletype}); 
					       	   cellcollection=new Array;
					       	 }
							/* var enc = new mxCodec(mxUtils.createXmlDocument());
							var node = enc.encode(graph.getModel());
							var xmldata = mxUtils.getPrettyXml(node);
							var data= cims201.utils.getData(basepathh+'/module/module!addmodule.action',{modulename:moduleobject.modulename,modulenote:moduleobject.modulenote,cellcollection:cellcollection,xmldata:xmldata,moduletype:moduleobject.moduletype}); */
							/* var xmldata = level.xml;
					        var data= cims201.utils.getData(basepathh+'/module/module!addmodule.action',{modulename:moduleobject.modulename,modulenote:moduleobject.modulenote,cellcollection:cellcollection,xmldata:xmldata,moduletype:moduleobject.moduletype});     
 							function savechildlevel(parentlevel)
 							{
 							
 							} */
 							moduleobject.modulename=null;
			     			moduleobject.modulenote=null;
						}else if(moduleobject.moduletype=='LCA'){
							/* alert(moduleobject.componentname);
							alert(moduleobject.modulename);
							alert(moduleobject.stage); */
							var iscompleted=true;
							for(var i=0;i<cells.length;i++){
							//alert(cells[i].getStyle());
							    if(cells[i].getStyle()=='process'){
							    if(moduleobject[cells[i].stage]){
								    var stagecomponents=moduleobject[cells[i].stage].components;
								    if(stagecomponents){
									    for(var c=0;c<stagecomponents.length;c++)
									    {   
										    if(!stagecomponents[c].isassigned)
										    iscompleted=false;
									    }
								    }else{
								    iscompleted=false;
								    }
							    }else{
							    	iscompleted=false;
							    }
							    if(iscompleted){
							    var cell={};
								cell.id=cells[i].getId();
								cell.stage=cells[i].stage;
								cell.stagename=cells[i].stagename;
								cell.components=stagecomponents;
								cellcollection.push(cell);
							    }else{
							    alert('请先完成各阶段人员制定！');
							    cellcollection=null;
								cellcollection=new Array;
							    return null;
							    }
							    
								/* var cell={};
								cell.id=cells[i].getId();
								cell.nodeid=cells[i].nodeid;
								cell.processname=cells[i].processname;
								cell.stage=cells[i].stage;
								cell.processperson=cells[i].processperson;
								cellcollection.push(cell); */
								
								}
							}
							//alert(versionid);
							//alert(productid);
							/* alert(moduleobject.productid);
							alert(moduleobject.versionid);
							alert(moduleobject.moduletype);
							alert(moduleobject.modulename);
							alert(moduleobject.modulenote);
							alert(moduleobject.components.length);
							alert(cellcollection.length); */
							var enc = new mxCodec(mxUtils.createXmlDocument());
							var node = enc.encode(graph.getModel());
							var xmldata = mxUtils.getPrettyXml(node);
							/* var data= cims201.utils.getData(basepathh+'/lca/lcamodule!addmodule.action',{version:moduleobject.versionid,components:moduleobject.components,pdid:moduleobject.productid,modulename:moduleobject.modulename,modulenote:moduleobject.modulenote,cellcollection:cellcollection,xmldata:xmldata,moduletype:moduleobject.moduletype});
							moduleobject.issaved=true;
							parent.savecompleted(); */
						}else{
					    	var enc = new mxCodec(mxUtils.createXmlDocument());
							var node = enc.encode(cells);
							var xmldata = mxUtils.getPrettyXml(node);
							alert(xmldata)
							initgraph()
							
						
						}
					}else if(cells.length==0){
						alert('请完成流程图再保存!');
						return null;
					}
					if(data==null){
					  	alert('保存成功！');
					}
					cellcollection=null;
					cellcollection=new Array;
					
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
			        {type: 'button', text: '保存模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){editor.execute('savemodule');}},
			        {type: 'button', text: '清空模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){clearmodule();}},
			        {type: 'button', text: '编辑下一层模型',width:100,height:35,style:'border-radius:10px;',onclick: function(e){
				       var cell=editor.graph.getSelectionCell();
					       if(cell!=null&&editor.graph.model.getStyle(cell)=='process'){
						          var level=wholelevel.getcurrentlevel();
							       var modules=level.levelmodules;
							       level.cells=editor.graph.getChildCells();
							       for(var i=0;i<modules.length;i++){
								       if(modules[i].levelmoduleobject.cellid==cell.getId()){
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
								            wholelevel.addlevel(modules[i]);
								            initgraph();
								       		} 
								       		break;
								       }
							       		
							       }
					       }
					       }
			       },
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
		   // var data= cims201.utils.getData(basepathh+'/node/node!getnodelist.action',{});
		    addSidebarIcon(null,graph, sidebar, null, 'img/start.png','start','开始');
		    var br = document.createElement('br');
			sidebar.appendChild(br);
			addSidebarIcon(null,graph, sidebar, '模块节点', 'img/cell.png','process','模块节点');
			var br = document.createElement('br');
			sidebar.appendChild(br);
			addSidebarIcon(null,graph, sidebar, '执行节点', 'img/cell.png','taskprocess','执行节点');
			var br = document.createElement('br');
			sidebar.appendChild(br);
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
		
      
		mxEvent.addListener(graph.container, 'contextmenu',
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
				    });	
		
		
		
		
		
		
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
			getmodulebyid(graph,moduleid);
		};
		
		function getmodulebyid(graph,moduleid){
		
		
				graph.getModel().beginUpdate();
					try
					{	
						read(graph,basepathh+"/module/module!downloadXML.action?moduleid="+moduleid);	
					}
					finally
					{
						// Updates the display
					 
						graph.getModel().endUpdate();
						
					}
		
		
		}
		function read(graph, filename)
			{
			   
				var req = mxUtils.load(filename);
				var root = req.getDocumentElement();
				 alert(root)
				 /* for(var s in root){
				 alert(s);
				 alert(root[s])
				 } */
				 var dec = new mxCodec(root.ownerDocument);
				 dec.decode(root, graph.getModel());
				
				 
					
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
			 var datas= cims201.utils.getData(basepathh+'/node/node!getNodeListByType.action',{nodetype:nodetype,nodecategory:nodecategory});
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
						
						v1 = graph.insertVertex(parent,null,'<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">'+label+'</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', x, y, 120, 120,prompt);
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
              			var levelmodule=wholelevel.addlevelmodule(v1);
              			levelmodule.levelmoduleobject.type=prompt;
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
			style[mxConstants.STYLE_ROUNDED] = true;
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
		/* var wholelevel =new alllevel();
		var rootlevel=new level();
		wholelevel.setrootlevel(rootlevel);
		wholelevel.setcurrentlevel(rootlevel); */
		function drawstage(stages){
		     var graph=editor.graph;
		     var parent = graph.getDefaultParent();
			 var start = graph.insertVertex(parent,null, '', 20, 220, 80, 80,'start');
			 var previous=start;
			 for(var i=0;i<stages.length;i++){
				 var v1 = graph.insertVertex(parent,null,'<div style="margin:0px;padding:40px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">'+stages[i].name+'</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', (i+1)*150, 200, 120, 120,'process');
				 v1.stagename=stages[i].name;
				 v1.stage=stages[i].stage;
				 var e1=graph.insertEdge(parent, null, '', previous, v1,'crossover');
				 previous=v1;
				 }
				 var end = graph.insertVertex(parent,null, '', (stages.length+1)*150+20, 220, 80, 80,'end');
			 var e1=graph.insertEdge(parent, null, '', previous, end );
				 
			 
		}
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
		function addnewprocess(label,x,y,width,height,type){
			var graph=editor.graph;
			var parent = editor.graph.getDefaultParent();
			var v = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
						'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
			                '<tr>'+
			                    ' <td align="center"></td>'+
			                '</tr>'+
			                '<tr>'+
			                    ' <td align="center">'+label+'</td>'+
			                '</tr>'+
			                '</table>'+
			                '</div>', x, y, width, height,type);
			return v;
			}
		function savecells(){
			var cells = editor.graph.getChildCells();
			 wholelevel.getcurrentlevel().cells=cells;
		}
		function buildoldproductpdmmodule(){
		   /*  var graph=editor.graph;
			var parent = editor.graph.getDefaultParent();
			var v1 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">市场分析</td>'+
		                '</tr>'+
		                '<tr>'+
		                    ' <td align="center">确定需求</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 50, 50, 120, 120,'process');
			var v2 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">确定功能原理和功能</td>'+
		                '</tr>'+
		                  '<tr>'+
		                    ' <td align="center">模块及系列化规划</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 200, 50, 120, 120,'process');
			var v3 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                     ' <td align="center">寻找原理方案</td>'+
		                '</tr>'+
		                 '<tr>'+
		                    ' <td align="center">及总体结构规划</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 50, 120, 120,'process');
			var v4 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">结构模块划分</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 500, 50, 120, 120,'process');
			var cells=new Array();
			var v5 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                     ' <td align="center">建立产品编码</td>'+
		                '</tr>'+
		                  '<tr>'+
		                    ' <td align="center">和名称字典</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 650, 50, 120, 120,'process');
            cells.add(v1);
			cells.add(v2);
			cells.add(v3);
			cells.add(v4);
			cells.add(v5);
			graph.setSelectionCells(cells);
			editor.execute('group');
		    var v6 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">标准模块设计</td>'+
		                '</tr>'+
		                  '<tr>'+
		                    ' <td align="center">和模块接口定义</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 300, 120, 120,'process');
		    var e1 =graph.insertEdge(parent, null, '', v3, v6);   
		    var v7 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">模块化产品</td>'+
		                '</tr>'+
		                '<tr>'+
		                    ' <td align="center">平台总体构建</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 450, 120, 120,'process');
		    var e2=graph.insertEdge(parent, null, '', v6, v7 );   
		    var v8 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">产品结构</td>'+
		                '</tr>'+
		                 '<tr>'+
		                    ' <td align="center">系列化设计</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 600, 120, 120,'process');
		                var cells=new Array();
            cells.clear();
			cells.add(v6);
			cells.add(v7);
			cells.add(v8);
			graph.setSelectionCells(cells);
			editor.execute('group');
		    var e3=graph.insertEdge(parent, null, '', v7, v8 );    
		    var v9 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">模块化产品</td>'+
		                '</tr>'+
		                 '<tr>'+
		                    ' <td align="center">平台充实维护</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 750, 120, 120,'process');
		    var e4=graph.insertEdge(parent, null, '', v8, v9 );  
		    var v10 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                     ' <td align="center">模块化产</td>'+
		                '</tr>'+
		                '<tr>'+
		                    ' <td align="center">品平台</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 350, 900, 120, 120,'process');
		    var e5=graph.insertEdge(parent, null, '', v9, v10 );  
		    var v11 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">产品配置设计</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 150, 1050, 120, 120,'process');
		    var e6=graph.insertEdge(parent, null, '', v10, v11 );  
	        var v12 = graph.insertVertex(parent,null, '<div style="margin:0px;padding:20px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                      ' <td align="center">产品变型设计</td>'+
		                '</tr>'+
		                '</table>'+
		                '</div>', 550, 1050, 120, 120,'process');
		    var e7=graph.insertEdge(parent, null, '', v10, v12 );  
		    wholelevel.addlevelmodule(v1);
		    wholelevel.addlevelmodule(v2);
		    wholelevel.addlevelmodule(v3);
		    wholelevel.addlevelmodule(v4);
		    wholelevel.addlevelmodule(v5);
		    wholelevel.addlevelmodule(v6);
		    wholelevel.addlevelmodule(v7);
		    wholelevel.addlevelmodule(v8);
		    wholelevel.addlevelmodule(v9);
		    wholelevel.addlevelmodule(v11);
		    wholelevel.addlevelmodule(v12);
            wholelevel.addlevelmodule(e1);
		    wholelevel.addlevelmodule(e2);
		    wholelevel.addlevelmodule(e3);
		    wholelevel.addlevelmodule(e4);
		    wholelevel.addlevelmodule(e5);
		    wholelevel.addlevelmodule(e6);
		    wholelevel.addlevelmodule(e7);
		     */
		var graph=editor.graph;
		var parent = editor.graph.getDefaultParent();
		var v1 = addnewprocess('基本数据处理',200, 100, 120, 120,'process');
		var v2 = addnewprocess('模块化平台创建',200, 250, 120, 120,'process');
		var v3 = addnewprocess('模块化应用',200, 400, 120, 120,'process');
         var e1=graph.insertEdge(parent, null, '', v1, v2 ); 
         var e2=graph.insertEdge(parent, null, '', v2, v3 ); 
         var levelmodulev1=wholelevel.addlevelmodule(v1);
         levelmodulev1.levelmoduleobject.type='process';
	     var levelmodulev2=wholelevel.addlevelmodule(v2);
	     levelmodulev2.levelmoduleobject.type='process';
	     var levelmodulev3=wholelevel.addlevelmodule(v3); 
	     levelmodulev3.levelmoduleobject.type='process';
	    /*  wholelevel.addlevelmodule(e1);
		 wholelevel.addlevelmodule(e2); */
		 savecells();
		 wholelevel.addlevel(levelmodulev1);
		 initgraph();
		var v11 = addnewprocess('市场分析及确定需求',50, 200, 120, 120,'process');
		var v12 =addnewprocess('确定功能原理和功能模块及系列化规划',200, 200, 120, 120,'process'); 
		var v13 =  addnewprocess('寻找原理方案及总体结构规划',350, 200, 120, 120,'process');
		var v14 = addnewprocess('结构模块划分',500, 200, 120, 120,'process','process');
		var v15 = addnewprocess('建立产品编码和名称字典',650, 200, 120, 120,'process');
	    var levelmodulev11=wholelevel.addlevelmodule(v11);
     	var levelmodulev12=wholelevel.addlevelmodule(v12);
     	var levelmodulev13=wholelevel.addlevelmodule(v13); 
     	var levelmodulev14=wholelevel.addlevelmodule(v14);
     	var levelmodulev15=wholelevel.addlevelmodule(v15); 
     	levelmodulev11.levelmoduleobject.type='process';
     	levelmodulev12.levelmoduleobject.type='process';
     	levelmodulev13.levelmoduleobject.type='process';
     	levelmodulev14.levelmoduleobject.type='process';
     	levelmodulev15.levelmoduleobject.type='process';
		returntoparentlevel();
		wholelevel.addlevel(levelmodulev2);
		initgraph();
		var v21 = addnewprocess('标准模块设计和模块接口定义',200, 50, 120, 120,'process');
		var v22 =addnewprocess('模块化产品及平台总体构建',200, 200, 120, 120,'process'); 
		var v23 =  addnewprocess('产品结构及系列化设计',200, 350, 120, 120,'process');
		var v24 =  addnewprocess('产品模块化平台',200, 500, 120, 120,'process');
		parent = editor.graph.getDefaultParent();
	    var e1=graph.insertEdge(parent, null, '', v21, v22 ); 
        var e2=graph.insertEdge(parent, null, '', v22, v23 ); 
        var e3=graph.insertEdge(parent, null, '', v23, v24 ); 
	    var levelmodulev21=wholelevel.addlevelmodule(v21);
     	var levelmodulev22=wholelevel.addlevelmodule(v22);
     	var levelmodulev23=wholelevel.addlevelmodule(v23); 
     	var levelmodulev24=wholelevel.addlevelmodule(v24);
     	levelmodulev21.levelmoduleobject.type='process';
     	levelmodulev22.levelmoduleobject.type='process';
     	levelmodulev23.levelmoduleobject.type='process';
     	levelmodulev24.levelmoduleobject.type='process';
		returntoparentlevel(); 
		wholelevel.addlevel(levelmodulev3);
		initgraph();
		var v31 = addnewprocess('产品配置设计',300, 200, 120, 120,'process');
		var v32 =addnewprocess('产品变型设计',450, 200, 120, 120,'process'); 
		var levelmodulev31=wholelevel.addlevelmodule(v31);
     	var levelmodulev32=wholelevel.addlevelmodule(v32);
     	levelmodulev31.levelmoduleobject.type='process';
     	levelmodulev32.levelmoduleobject.type='process';
		returntoparentlevel(); 
		                
		 
		}
		
	</script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),
			document.getElementById('outlineContainer'),
		 	document.getElementById('toolbarContainer'),
			document.getElementById('modelbarContainer'),
			document.getElementById('sidebartree'),
			document.getElementById('statusContainer'));" style="margin:0px;background:-webkit-gradient(linear, 0 0, 0 100%, from(#2894FF), to(#B5E3E0));">
	
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
