var qiche1Data = new Edo.data.DataTable().set('data', Qiche1);
var positionData = new Edo.data.DataTree(Positions);
var moduleid=null;
var basepathh='/gnhzb';
var moduledata= cims201.utils.getData(basepathh+'/lca/lcamodule!getModuletree.action',{componentid:null});
Edo.build(
		{
			type: 'app',render: document.body,width: '100%',height: '100%',layout: 'horizontal',padding:[0,0,0,0],
			children:[
                     {type: 'ct',width: '180',height: '100%',collapseProperty: 'width',
                    	         enableCollapse: true,splitRegion: 'west',splitPlace: 'after',padding:[0,0,0,0],
                    				border:[0,0,0,0],
                      children:[
                               {id: 'leftPanel',type: 'panel',title: '模板浏览',width: '100%',height: '100%',padding:[0,0,0,0],
                            	   border:[0,1,0,0],
                                children: [
                                          /*{id: 'navTree',type: 'tree',width: '100%',height: '100%',headerVisible: false,autoColumns: true,horizontalLine: false,
                                           columns: [
                                           {
                                            header: '导航树',
                                            dataIndex: 'url',
                                            renderer: function(v, r){
                                                //return '<a href="javascript:mainModule.load(\"'+r.url+'\")">'+r.name+'</a>';
                                                return r.name;
                                            }
                                           }
                                          ],
                                          data: [
                                          {id: 1,  name: '汽车', icon: 'e-tree-folder',expanded:'false',
                                           children: [
                                           {id: 'qiche1', url: '', name: '汽车1'},
                                           {id: 'qiche2', url: '', name: '汽车2'},
                                           {id: 'qiche3', url: '', name: '汽车3'},
                                           {id: 'qiche4', url: '', name: '汽车4'}
                                           ]
                                          },
                                          {id: 2,  name: '飞机', icon: 'e-tree-folder'},
                                          {id: 3,  name: '轮船', icon: 'e-tree-folder'},
                                          {id: 4,  name: '火车', icon: 'e-tree-folder'},
                                          ],
                                          onselectionchange: function(e){  
	  	                                        var r = e.selected;
	  	                                        //console.log(r);
	  	                                        //console.log(mainTabBar.children.length);
	  	                                        if(r){
	  	                                        	openNewTab(r);
	  	                                            mainTabBar.set('selectedIndex', mainTabBar.children.length);                                            
	  	                                        }
	  	                                    }
                                          }*/
                                          {
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
									        onbeforetoggle: function(e){
									            var row = e.record;
									            var dataTree = this.data;                        
									            if(!row.children || row.children.length == 0){
									                //显示树形节点的loading图标,表示正在加载
									                this.addItemCls(row, 'tree-node-loading');
									                Edo.util.Ajax.request({
									                    //url: 'nodes.txt',
									                    url: basepathh+'/lca/lcamodule!getModuletree.action',
									                    params: {
									                        componentid: row.id   //传递父节点的Name(也可以是ID)
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
									        ondblclick:function(e){
									        	var r = this.getSelected();
									        	Edo.get('componentmodelTree').set('data', []);
									        	moduleid=r.id;
									        	 Edo.util.Ajax.request({
												        type: 'post',        
												        url: basepathh+'/lca/lcamodule!getmoduleComponentsList.action',
												        params: {
											                parentId: null,   //传递父节点的Name(也可以是ID)
											                id:r.componentid,
											                moduleid:r.id
											            },
												        onSuccess: function(text){
												           // alert(text);
												            var data = Edo.util.Json.decode(text);
												            Edo.get('componentmodelTree').set('data', data);
												        }
												        
												    });
									        },
									        columns:[
									            {   
									                enableDragDrop: true,
									                dataIndex: "name"
									            
						                        }
									            ],
						                     data:moduledata
									           
						            }
                                          ]
                            },
                               
                            ]
                     },
                     {
                         id:'mainPanel',type: 'ct',width: '100%',height: '100%',verticalGap: 0,padding:[0,0,0,0],layout: 'horizontal',
                         children:[
                                   {type: 'panel',title: '零部件模型树',width: 260,height: '100%',padding:[0,0,0,0],verticalGap:'0',
                                    children: [
										{
											type: 'group',
											width: '100%',
										    layout: 'horizontal',
										    cls: 'e-toolbar',
										    width:400,
										    children: [
										        {
										        	id:'qiche1',
										            type: 'button',
										            text: '查看模型信息',
										            onclick: function(e){
										            	var r = componentmodelTree.getSelected();
										            	alert(r.Version);
										                if(r){
										                	table1.set('data',[])
										                	table1.data.insert(0,{compname:r.name,Version:r.Version,Createdate:r.Createdate,Note:r.Note,moduleid:r.moduleid})
										                }else{
										                    alert("请选择零部件");
										                }
										              
										            }                
										            
										        }]
									} ,
									{
									    
									    type: 'tree',
									    width: 260,
									    height: '100%',
									    autoColumns:true,
									    headerVisible: false,
									    verticalLine:false,
									    horizontalLine:false,
									    id: 'componentmodelTree',
									    onbodymousedown: function(e){
									    	var r = this.getSelected();
									    	
									    	
									    },
									    onbeforetoggle: function(e){
									        var row = e.record;
									        var dataTree = this.data;                        
									        if(!row.children || row.children.length == 0){
									            //显示树形节点的loading图标,表示正在加载
									            this.addItemCls(row, 'tree-node-loading');
									            Edo.util.Ajax.request({
									                //url: 'nodes.txt',
									                url: basepathh+'/lca/lcamodule!getmoduleComponentsList.action',
									                params: {
									                	moduleid:moduleid,
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
									}]
                               },
                                {type:'box',width: 920,height: '100%',padding:[0,0,0,0],verticalGap:'0',children:[
                                   
									{
										type: 'group',
										width: '100%',
									    layout: 'horizontal',
									    cls: 'e-toolbar',
									    width:400,
									    children: [
									               /*childmap.put("id", m.getId());
						               			    childmap.put("name", m.getName());
						               			    childmap.put("createuserid", m.getCreateuserid());
						               			    childmap.put("Createdate", m.getCreatedate().toString());
						               			    childmap.put("Version", m.getVersion());
						               			    childmap.put("componentid",componentid);
						               			    childmap.put("Note",m.getNote());
						               			    childmap.put("expanded", false);
						               			    childmap.put("__viewicon", true);*/
									        {
									            type: 'button',
									            text: '零部件查看',
									            onclick: function(e){
									            	  var r = table1.getSelected();
										                if(r){
										                	//??
										                }else{
										                    alert("请选择行");
										                }
									            }                
									            
									        } ,
									        {
									            type: 'button',
									            text: '零部件排序',
									            onclick: function(e){
									                table1.data.sort(function(pre, next){                        
									                    return !!(pre.power > next.power);
									                }, this);  
									            }                
									            
									        },
									        {
									            type: 'button',
									            text: '进入生命周期分析模板',
									            onclick:function(){
									            	var r = table1.getSelected();
									            	 if(r){
									            		 window.open('cqz/js/yang/qiche/qiche1_1.jsp?moduleid='+r.moduleid)
										                }else{
										                    alert("请选择行");
										                }
									            	
									            	}
									        }
									    ]        
									},
									{
							            id: 'table1',
							            type: 'table',
							            width: 820,
							            height:'100%',
							            editAction: 'click',
							            //data: qiche1Data,
							            columns:[
							                Edo.lists.Table.createMultiColumn(),
							                {header: '零部件名称', dataIndex: 'compname', width: '100',headerAlign: 'center',align: 'center'},        
							                {header: '版本信息', dataIndex: 'Version', editor: 'text', width: '150',headerAlign: 'center',align: 'center'},                        
							                {header: '创建日期', dataIndex: 'Createdate', type: 'text', width: '150',headerAlign: 'center',align: 'center'},
							                {header: '模板信息', dataIndex: 'Note', type: 'text', width: '400',headerAlign: 'center',align: 'center'},
							            ]
							        }]
                                }
                              
                   /*{
                     id:'mainTabBar',type: 'tabbar',selectedIndex: 0,border: [0,0,1,0],
                     onselectionchange: function(e){                
                       mainTabContent.set('selectedIndex', e.index);
                     },
                     children: [
                       {index:0,type: 'button',text: '主页'}
                     ]
                   },
                   {
                     id: 'mainTabContent',selectedIndex: 0,layout: 'viewstack',type: 'box',border: [0,1,1,1],width: '100%',height: '100%',verticalScrollPolicy: 'auto',
                     onselectionchange: function(e){
                       alert('content-selected');
                     },
                     children: [                    
                         {id: 'mainModule',type:"module",width: '100%',height: '100%', style: 'border:0'}
                     ]
                   }*/
                   ]
                     }
			         ]
		}
);
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
function openNewTab(r){	
  var id = r.id;
  var idx  = mainTabBar.children.length;
  var c = Edo.get("tbar_"+id);
  if(c==null){
    c = mainTabBar.addChildAt(idx,
      {id:'tbar_'+id,type: 'button',text:r.name,arrowMode: 'close',
          onarrowclick:function(e){
          //根据idx, 删除对应的容器
          var c = Edo.get('cont_'+id);          
          c.destroy();
          //选中原来Index处          
          var tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex);          
          if(!tabitem){
              tabitem = mainTabBar.getChildAt(mainTabBar.selectedIndex-1);               
          }          
          mainTabBar.set('selectedItem', tabitem);        
        }
      }
    );
    var module = mainTabContent.addChildAt(idx,
      {
        id:'cont_'+id,type:"module",width: '100%',height: '100%',style: 'border:0'
      }
    );    
    module.load('cqz/js/yang/qiche/'+r.id+'.jsp');   
  };
  mainTabBar.set('selectedItem', c);
    
};
