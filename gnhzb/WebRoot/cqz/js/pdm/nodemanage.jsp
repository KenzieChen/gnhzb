<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
	<title>新建节点</title>
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
		<link href="<%=basePath%>css/liuchang/edo_orange_theme/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />

		<script src="<%=basePath%>css/liuchang/edo_orange_theme/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/utils.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/lca/nodemanage.js" type="text/javascript"></script>
		
	<script type="text/javascript">
		// Program starts here. Creates a sample graph in the
		// DOM node with the specified ID. This function is invoked
		// from the onLoad event handler of the document (see below).
		
		function main(container, outline, toolbar, modelbar, status)
		{
		var editor = new mxEditor();
		var graph = editor.graph;
		var versionid=null;
		var cmpid=null;
		var pdid=null;
		var nodeobject={};
		
				graphh=graph;
				
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
						    var nodecategorydata=cims201.utils.getData('http://localhost:8080/Myproject20140827/node/node!getnodelist.action',{});
						    var nodetypedata=cims201.utils.getData('http://localhost:8080/Myproject20140827/node/node!getnodeypetlist.action',{});
				                	var box=Edo.create(
										{type: 'box',width: '100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
					               	    children: [
						               	    {type:'box',width: '100%',height:30,border: [0,0,0,0],padding: [0,0,0,0],layout: 'horizontal',
						               	    children:[{type:'label',text:'节点名称',width:80},{type:'text',id:'name',text:nodeobject.nodename,width:100},
							               	    {type:'label',text:'节点类型',width:80},{type:'combo',id:'categorycombo',displayField:'name',width:100,valueField: 'id',selectedIndex:nodeobject.categoryid,
							               	    data:nodecategorydata
							               	    }
						               	    ]},
						               	    {type:'box',width: '100%',height:30,border: [0,0,0,0],padding: [0,0,0,0],layout: 'horizontal',
						               	    children:[{type:'label',text:'节点领域',width:80},{type:'combo',id:'typecombo',displayField:'name',width:100,valueField: 'id',selectedIndex:nodeobject.nodetypeid,
						               	    data:nodetypedata
						               	    	}]},
					               	        {type:'box',width: '100%',height:80,border: [0,0,0,0],padding: [0,0,0,0],layout: 'horizontal',
						               	    children:[{type:'label',text:'节点说明',width:80},{type:'textarea',id:'description',width:250,height:80}]
						               	    },
					   		           	    {type:'box',width: '100%',height:30,border: [0,0,0,0],padding: [0,0,0,0],layout: 'horizontal',
						               	    children:[
							               	    {type:'button',text:'新增',onclick:function(e){
							               	    var funtiontree=new showfunctiontable().getfunctiontable();
							               	    var func=function(){
						            			   var sels= getTreeSelect(funtiontree);
						            			   for(var i=0;i<sels.length;i++){
						            			   var r1=sels[i];
										              
						            			   Edo.get('choosenfunction').data.insert(0, {id:r1.id,name:r1.name,type:r1.type});
						            			   }
						            			   
						            			   
						            			  
									           } 
							               	   var toolbar=new gettoolbar(null,func);
											   var winfunction=cims201.utils.getWin(320,300,'选择功能',[funtiontree,toolbar]);
											   winfunction.show('center', 'middle', true);
							               	    }},
							               	     {type:'button',text:'删除',onclick:function(e){
							               	    }}
						               	    ]
						               	    },
					               	    
						               	     {id: 'choosenfunction',
										        type: 'table',                
										        width: '100%',
										        height:160,
										        showHeader: true,
										        rowSelectMode: 'single',        
										        enableDragDrop: true,   
										        foolterVisible: true,               //false
										        columns:[
										            
										                    {header: '编号', dataIndex: 'id',width:50
										                    },
										                    {header: '名称', dataIndex: 'name',width:100
										                    },
										                    {header: '类型', dataIndex: 'type',width:100
										                    }
												        ],
												 data:nodeobject.functionlist
												    }
											    ]
		               				
								
								});
									var func=function(){
								 	nodeobject.functionlist=Edo.get('choosenfunction').data.source;
								 	nodeobject.nodetype=Edo.get('typecombo').getValue();
								 	//alert(Edo.get('typecombo').selectedIndex);
								 	nodeobject.nodecategory=Edo.get('categorycombo').getValue();
								 	nodeobject.nodename=Edo.get('name').text;
								 	nodeobject.nodetypename =Edo.get('typecombo').selectedItem.name;
								 	nodeobject.categoryid =Edo.get('categorycombo').selectedIndex;
								 	nodeobject.description =Edo.get('description').text;
								 		var graph=editor.graph;
								 		var cell=graph.getSelectionCell();
								 	    var label =  graph.convertValueToString(cell);
								 	    nodeobject.style=cell.getStyle();
					    		        var nodelabel =  label.slice(0,label.length);
					    		        
					    		        var newlabel = label.replace(nodelabel,
					    		       '<div style=" text-align: center;padding:0px 0px 0px 0px;width:120px;background:#41B9F5;height:50px;opacity:100">'+
										'<table style=" margin: auto;padding:0px 0px 0px 0px;font-size:4px">'+
							                '<tr>'+
							                   ' <td>节点名称:</td>'+
							                    ' <td>'+nodeobject.nodename+'</td>'+
							                '</tr>'+
							                '<tr>'+ 
							                   ' <td>节点类型:</td>'+
							                   ' <td>'+nodeobject.nodetypename+'</td>'+
							                '</tr>'+
							                '</table>'+
							                '</div>');
							                nodeobject.label=newlabel;
							                graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
								 	/* 	var graph=editor.graph;
			        					var model=graph.getModel();
			        					model.clear();
			        					var data= cims201.utils.getData('welcome!getnodelist.action',{});
			        					Edo.get('nodetree').set('data',data); */
								    }
								var toolbar=new gettoolbar(null,func);
								var winprocess=cims201.utils.getWin(400,450,'节点设置',[box,toolbar]);
								winprocess.show('center', 'middle', true);
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
				addSidebarIcon(graph, modelbar, '', 'img/gear.png','process;image=img/check.png');
				
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
				 
					alert('确定保存节点？');
				    var functionlist=nodeobject.functionlist;
					var nodetype=nodeobject.nodetype;
					var nodecategory=nodeobject.nodecategory;		
					var nodename=nodeobject.nodename;
					var label=nodeobject.label;
					var nodedrawtype=nodeobject.style;		
					var description=nodeobject.description;	 	
				    var data= cims201.utils.getData('http://localhost:8080/Myproject20140827/node/node!addnode.action',{label:label,nodecategory:nodecategory,nodetype:nodetype,data:functionlist,nodename:nodename,description:description,nodedrawtype:nodedrawtype});
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

				var outln = new mxOutline(graph, outline);
		
		var menubar= Edo.create({
		type: 'box',
		width: '100%',
		height:'100%',
	    layout: 'horizontal',   //横向布局
	    render:toolbar,
	    children: [
	     
	        {type: 'button', text: '保存',onclick: function(e){editor.execute('savemodule');}}
	        /* {type: 'button', text: '导出',onclick: function(e){editor.execute('export');}},
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
	        {type: 'button', text: '缩小',onclick: function(e){editor.execute('zoomOut');}} */
	            
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
		var data= cims201.utils.getData('http://localhost:8080/Myproject20140827/node/node!getnodelist.action',{});
		var procucttreebox = Edo.create({
			type:'box',
			width: 180,
			render:sidebartree,
			height:500,
			children:[
	          	{type: 'box',
	          	 width: '100%',height: '100%', 
			    cls: 'e-title-collapse',
			    children:[
	          
			        {
			            type: 'panel',padding:0,
			            width: '100%',height: '100%',              
			            title: '<span style="font-size:13px">节点库</span>',
			            enableCollapse: true,
			            
			            expanded: true, 
			            onclick: onPanelClick,                                           
			            titlebar:[{
			                cls:'e-titlebar-accordion',
			                onclick: toggle
			                
			            }],
			            children: [
				                
						    {type:'tree',
						    id:'nodetree',
						    headerVisible: false,
						    cls: 'e-tree-allow',
						    ScrollPolicy:'on',
						    style: 'cursor:pointer;',
						    width: '100%',
						    height: '100%',
						    autoColumns: true,    
						    cellEditAction: 'celldblclick',
						     onselectionchange: function(e){	
						     alert(e.selected.name);
				                      //  var nodetype= moduleobject.getnodetype();
							           // getcollection(graph,modelbar,nodetype,e.selected.name);
							        },
						    columns: [
						        {
						            dataIndex: 'name',
						            renderer: function(v, r){
						                return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';
						            }
						        }
						    ],
						    data:data
						}]
			          
			        }]}
				
			]});
	  
		function gettoolbar(id,func){
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
		            this.parent.parent.parent.destroy();
		
		            }
		        }
		    ]
		});
		return toolbar;
		}

	/* 	document.oncontextmenu = function(){
        	if(editor.graph.getSelectionCell()!=null){
        	editor.toolbar
        	}else{
        	alert('b');
        	}
		}; */
		function getcomponentmodelTree(){
		    var componentmodelTree = Edo.create({
		             
			        type: 'tree',
			        width: '100%',
			        height: '100%',
			        autoColumns:true,
			        headerVisible: false,
			        verticalLine:false,
			        horizontalLine:false,
			        id: 'componentmodelTree',
			        onbodymousedown: function(e){
			        	var r = this.getSelected();
			        	//Edo.get('componentNameInput').set('text', r.name);
			        },
			        ondblclick:function(e){
			            graphhh=null;
			        	var graph=editor.graph;
			        	var model=graph.getModel();
			        	model.clear();
			        	
			        },
			        onbeforetoggle: function(e){
			            var row = e.record;
			            var dataTree = this.data;                        
			           
			            if(!row.children || row.children.length == 0){
			                //显示树形节点的loading图标,表示正在加载
			                this.addItemCls(row, 'tree-node-loading');
			                Edo.util.Ajax.request({
			                    //url: 'nodes.txt',
			                    url: 'welcome!getComponentsList.action',
			                    params: {
			                        parentId: row.id   //传递父节点的Name(也可以是ID)
			                    },
			                    defer: 200,
			                    onSuccess: function(text){
			                   // alert(text);
			                        var data = Edo.util.Json.decode(text);
			                        dataTree.beginChange();
			                        if(!(data instanceof Array)) data = [data]; //必定是数组
			                        data.each(function(o){
			                            dataTree.insert(0, o, row);    
			                        });                    
			                        dataTree.endChange();    
			                    }
			                });
			            }
			            return !!row.children;
			        },
			        //verticalLine: false,
			        
			        //data: tree,
			        enabelCellSelect: false,
			        autoColumns: true,
			        enableDragDrop: true,
			        showHeader: false,
			        columns:[
			            {   
			                enableDragDrop: true,
			                dataIndex: "name"
			            }
			        ]
			    }); 
			    return componentmodelTree;
			    }
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
		
		
		function addSidebarIcon(graph, modelbar, label, image,prompt)
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
				
				};
			// Creates the image which is used as the sidebar icon (drag source)
		/* 	if(!modelbar.hasChildNodes())
			{ */
			var img = document.createElement('img');
			img.setAttribute('src', image);
			img.style.width = '36px';
			img.style.height = '36px';
			img.title = '拖入工作界面创建节点';
			
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
