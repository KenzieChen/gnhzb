<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
	<title>新建实例</title>
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
		<script src="<%=basePath%>js/lca/projectdefine.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lca/pdm_projectdefine.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lca/FunctionWin.js" type="text/javascript"></script>
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		var moduleobject=null;
		var basepathh='http://localhost:8080/gnhzb/';
		var editor=null;
		var versionid=null;
		var cmpid=null;
		var pdid=null;
		var cellcollection=new Array();
		var projectobjectdefine={};
	/* 	'<div style=" text-align: center;padding:0px 0px 0px 0px;width:120px;background:#41B9F5;height:50px;opacity:100">'+
							'<table style=" margin: auto;padding:0px 0px 0px 0px;font-size:4px">'+
				                '<tr>'+
				                   ' <td>流程名称:</td>'+
				                   
				                    ' <td>null</td>'+
				                '</tr>'+
				                '<tr>'+ 
				                   ' <td>流程类型:</td>'+
				                    ' <td>null</td>'+
				                '</tr>'+
				                '</table>'+
				                '</div>',
					'img/gear.png','process' */
		function main(container, outline, toolbar, modelbar, status)
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
				var label =  graph.model.getStyle(cell);
				var processid=cell.getId();
				var data= cims201.utils.getData(basepathh+'/module/module!getfunctionsbyprocessid.action',{moduleid:moduleid,processid:processid});
				if (data){
				cell.isNode=true;
				}
				cell.data=data;
				buildFunctionWin(graph,cell);
				var type=null;
				if(label==null){
				return null;
				}
				if(label=='process'){
				type='process';
				}else{
				var endindex=label.indexOf(';');
				type=label.substring(0,endindex);
				}
				
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
						
						    var label=null;
						    var title=null;
				
						
						 
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
				{ 
				  /* cell = cell || editor.graph.getSelectionCell();
					var textarea = document.createElement('textarea');
					textarea.style.width = '400px';
					textarea.style.height = '400px';
					var enc = new mxCodec(mxUtils.createXmlDocument());
					var node = enc.encode(cell);
					textarea.value = mxUtils.getPrettyXml(node);
					showModalWindow(graph, 'XML', textarea, 410, 440); */
					alert('确定保存文件？');
					var cells =  graph.getChildCells();
					
					
				for(var i=0;i<cells.length;i++){
				    if(cells[i].isNode==true){
					var cell={};
					cell.processname=cells[i].processname;
					var processid=cells[i].getId();
					var data=cells[i].data;
					var length =data.length;
		        	for(var j=0;j<length;j++){
		        		var typee=data[j].typee;
		        		cell.typee=cells[j][typee];
		        	}
		        	cell.processid=processid;
					cell.tasktreenodeid=cells[i].tasktreenodeid;
					cell.processcarrier=cells[i].processcarrier;
					cell.starttime=cells[i].starttime;
					cell.finishtime=cells[i].finishtime;
					cellcollection.push(cell);
					alert(cell.tasktreenodeid);
					}
				}
				var data= cims201.utils.getData(basepathh+'/project/project!saveproject.action',{projectobjectdefine:projectobjectdefine,cellcollection:cellcollection
		});
	 			/* var data= cims201.utils.getData(basepathh+'/project/project!saveproject.action',{projectdetail:projectdetail,cellcollection:cellcollection,projectname:projectname,starttime:starttime,
		finishtime:finishtime,projecttype:projecttype,moduleid:moduleid}); */
				if(data==null){
				  	alert('保存成功！');
				  	
				}
			     
				    
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

				//addToolbarButton(editor, toolbar, 'export', 'Export', 'img/export1.png');

				// ---
				
				// Adds toolbar buttons into the status bar at the bottom
				// of the window.
				//addToolbarButton(editor, status, 'collapseAll', 'Collapse All', 'img/navigate_minus.png', true);
				//addToolbarButton(editor, status, 'expandAll', 'Expand All', 'img/navigate_plus.png', true);

				//status.appendChild(spacer.cloneNode(true));
				
				//addToolbarButton(editor, status, 'enterGroup', 'Enter', 'img/view_next.png', true);
				//addToolbarButton(editor, status, 'exitGroup', 'Exit', 'img/view_previous.png', true);

				//status.appendChild(spacer.cloneNode(true));

				//addToolbarButton(editor, status, 'zoomIn', '', 'img/zoom_in.png', true);
				//addToolbarButton(editor, status, 'zoomOut', '', 'img/zoom_out.png', true);
				//addToolbarButton(editor, status, 'actualSize', '', 'img/view_1_1.png', true);
				//addToolbarButton(editor, status, 'fit', '', 'img/fit_to_size.png', true);
				
				// Creates the outline (navigator, overview) for moving
				// around the graph in the top, right corner of the window.
				var outln = new mxOutline(graph, outline);
		
		var menubar= Edo.create({
		type: 'box',
		width: '100%',
		height:'100%',
	    layout: 'horizontal',   //横向布局
	    render:toolbar,
	    children: [
	     {type: 'button', text: '新增', arrowMode: 'menu',
	            menu: [
	                {type: 'button', text: 'PDM项目',onclick: function(e){
	                	projectobject=new projectdefine('PDM');
	                }
	                	}	
	            ]
	        },                        
	        {type: 'button', text: '编辑', arrowMode: 'menu',
	            menu: [
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
				
	                {type: 'button', text: '删除',onclick: function(e){editor.execute('delete');}},
	                {type: 'button', text: '剪切',onclick: function(e){editor.execute('cut');}},
	                {type: 'button', text: '复制',onclick: function(e){editor.execute('copy');}},
	                {type: 'button', text: '粘贴',onclick: function(e){editor.execute('paste');}}
	            ]
	        },
	        {type: 'button', text: '保存',onclick: function(e){editor.execute('savemodule');}},
	        {type: 'button', text: '导出',onclick: function(e){editor.execute('export');}},
	        {type: 'split'},    //分隔符
	        {type: 'button', text: '组', arrowMode: 'menu',
	            menu: [
	                {type: 'button', text: '构建组',onclick: function(e){editor.execute('groupOrUngroup');}},
	                {type: 'button', text: '删除组',onclick: function(e){editor.execute('groupOrUngroup');}},
	                {type: 'button', text: '进入组',onclick: function(e){editor.execute('enterGroup');}},
	                {type: 'button', text: '跳出组',onclick: function(e){editor.execute('exitGroup');}}
	            ]
	        }, 
	        {type: 'split'}, 
	        {type: 'button', text: '放大',onclick: function(e){editor.execute('zoomIn');}},
	        {type: 'button', text: '缩小',onclick: function(e){editor.execute('zoomOut');}}
	            
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
			        panel.toggle()
			    }
			}
		var moduledata= cims201.utils.getData(basepathh+'/module/module!getModuletree.action',{moduletype:'PDM'});
		var producttreebox = Edo.create({
			type:'box',
			width: 140,
			render:sidebartree,
			height:550,
			children:[
				{type : 'label',text : '模型名称:'},
	          	{type : 'text',id : 'modulename'},
	          	{type: 'box',
	          	 width: '100%',height: '100%', 
			    cls: 'e-title-collapse',
			    children:[
	        
			        {
			            type: 'panel',padding:0,
			            width: '100%',height: '100%',              
			            title: '<span style="font-size:13px">模型列表</span>',
			            enableCollapse: true,
			            expanded: false, 
			            onclick: onPanelClick,                                           
			            titlebar:[{
			                cls:'e-titlebar-accordion',
			                onclick: toggle
			            }],
			            children:[{
                	    type: 'tree',
	   			        width: '100%',
	   			        height: '100%',
	   			        autoColumns:true,
	   			        headerVisible: false,
	   			        verticalLine:false,
	   			        horizontalLine:false,
	   			        id: 'moduletree',
	   			        enabelCellSelect: false,
				        autoColumns: true,
				        enableDragDrop: true,
				        showHeader: false,
				        onbodymousedown: function(e){
				        	var r = this.getSelected();
				        	Edo.get('modulename').set('text', r.Name);
				        	moduleid=r.id;
				        	projectobjectdefine.moduleid=moduleid;
				        	getmodulebyid(graph,moduleid);
				        },
				        columns:[
				            {   
				                enableDragDrop: true,
				                dataIndex: "Name"
				            
	                        }
				            ],
	                    data:moduledata
				           
	            }]
			        }]}
				
			]});
		
		
	/* 	document.oncontextmenu = function(){
        	if(editor.graph.getSelectionCell()!=null){
        	editor.toolbar
        	}else{
        	alert('b');
        	}
		}; */
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
					new mxDivResizer(modelbar);
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
		};
		function getmodulebyid(graph,moduleid){
		
		
			graph.getModel().beginUpdate();
				try
				{	
					read(graph,basepathh+"module/module!downloadXML.action?moduleid="+moduleid);	
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
				
				var dec = new mxCodec(root.ownerDocument);
				 dec.decode(root, graph.getModel());
				 
					
			};
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
		function getcollection(graph,modelbar,nodetype,nodecategory){
		/* for(var s in datas){
			if(s==collectiontype){
			
				for(i=0;i<datas[s].length;i++){
					var image=datas[s][i].img;
					var label=datas[s][i].label;
					var prompt=datas[s][i].type;
					addSidebarIcon(graph, modelbar, label, image,prompt)
				}
			}
 		}
		 */
		 alert(nodetype);
		 alert(nodecategory);
		 var datas= cims201.utils.getData(basepathh+'/node/node!getNodeListByType.action',{nodetype:nodetype,nodecategory:nodecategory});
		 alert(datas.length);
		 for(i=0;i<datas.length;i++){
		            var id=datas[i].id
					var image=datas[i].img;
					var label=datas[i].label;
					var prompt=datas[i].nodedrawtype;
					addSidebarIcon(id,graph, modelbar, label, image,prompt)
				}
		}
		
		function addSidebarIcon(nodeid,graph, modelbar, label, image,prompt)
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
						
						v1 = graph.insertVertex(parent,null, label, x, y, 120, 120,prompt);
						v1.setConnectable(true);
						
						// Presets the collapsed size
						v1.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);
											
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
			img.style.width = '36px';
			img.style.height = '36px';
			img.title = 'Drag this to the diagram to create a new vertex';
			
			modelbar.appendChild(img);
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
			var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
			style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
			style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '100';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '14';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '14';
			graph.getStylesheet().putDefaultVertexStyle(style);

            style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
			style[mxConstants.STYLE_FILLCOLOR] = '#41B9F5';
			style[mxConstants.STYLE_STROKECOLOR] = '#41B9F5';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '100';
			style[mxConstants.STYLE_FONTSIZE] = '3';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '14';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '14';
			graph.getStylesheet().putCellStyle('process', style);
			
			
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
			style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
			style[mxConstants.STYLE_FONTCOLOR] = '#F8C48B';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '100';
			style[mxConstants.STYLE_STARTSIZE] = '30';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 1;
			graph.getStylesheet().putCellStyle('group', style);
			
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
			style[mxConstants.STYLE_FONTCOLOR] = '#774400';
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 2;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '14';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '14';
			graph.getStylesheet().putCellStyle('func', style);
			
		    style = mxUtils.clone(style);
			graph.getStylesheet().putCellStyle('input', style);
			
		    style = mxUtils.clone(style);
			graph.getStylesheet().putCellStyle('port', style);
			style = mxUtils.clone(style);
			graph.getStylesheet().putCellStyle('output', style);
			
			style = graph.getStylesheet().getDefaultEdgeStyle();
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
			style[mxConstants.STYLE_STROKEWIDTH] = '2';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
			
		};
		
		
	</script>
</head>

<!-- Page passes the container for the graph to the program -->
<body onload="main(document.getElementById('graphContainer'),
			document.getElementById('outlineContainer'),
		 	document.getElementById('toolbarContainer'),
			document.getElementById('modelbarContainer'),
			document.getElementById('sidebartree'),
			document.getElementById('statusContainer'));" style="margin:0px;">
	
	<!-- Creates a container for the splash screen -->
	<div id="splash"
		style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:white;z-index:1;">
		<center id="splash" style="padding-top:230px;">
			<img src="img/loading.gif">
		</center>
	</div>
	
	<!-- Creates a container for the sidebar -->
	<div id="toolbarContainer"
		style="position:absolute;white-space:nowrap;overflow:hidden;top:0px;left:0px;max-width:320px;width:400px;max-height:40px;height:36px;right:0px;padding:5px">
	</div>
    <div id="modelbarContainer"
		style="position:absolute;overflow:hidden;top:0px;left:400px;max-height:40px;height:36px;padding:5px;right:0px">
	</div>
	<!-- Creates a container for the toolboox -->
	<div id="sidebartree"
		style="position:absolute;overflow:hidden;top:50px;left:0px;bottom:36px;max-width:200px;width:200px;padding-top:5px;padding-left:4px">
	</div>
	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;overflow:hidden;top:50px;left:200px;bottom:36px;right:20px;background-image:url('img/grid.gif');cursor:default;padding-top:5px;">
	</div>

	<!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:50px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
	</div>
</body>
</html>
