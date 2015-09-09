//定义lca模型
var basepathh='/gnhzb';
function getlcamoduledefine(){
	var componentTree=new getcomponentTree();
    var toolbar=new getnextbar();
	var win=cims201.utils.getWin(400,300,'选择产品',[componentTree,toolbar]);
	Edo.util.Ajax.request({
        type: 'post',        
        url: basepathh+'/lca/lcamodule!getComponentList.action',
        params: {
            parentId: '0'   //传递父节点的Name(也可以是ID)
        },
        onSuccess: function(text){
            var data = Edo.util.Json.decode(text);
           
            Edo.get('componentTree').set('data', data);
        }
        
    });
    	win.show('center', 'middle', true);
		   
}
//定建模产品树
function getcomponentTree(){
    var componentTree = Edo.create({
        type: 'tree',
        width: '100%',
        height: '70%',
        horizontalScrollPolicy:'off',
        verticalLine:false,
        horizontalLine:false,
        id: 'componentTree',
        onbodymousedown: function(e){
        	var r = this.getSelected();
        },
        autoColumns: true,
        enableDragDrop: true,
        headerVisible:false,
        
        columns:[
            {
            	
                enableDragDrop: true,
                headerText: "选择产品类别",                
                dataIndex: "name"
            }
        ]
    }); 
	    return componentTree;
}
//定义选择产品后的下一步，用于模型信息填写
function getnextbar(){
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
            id:'mm',
            type: 'button',
            text: '下一步',
            minWidth: 70,
            onclick: function(e){
               //定义填写完模型信息后的功能，包括模型panel的信息赋值，
             	var func=function(id){
             		moduleobj.productid=Edo.get('pdid').text;
             		moduleobj.modulename=Edo.get('mdname').text;
             		moduleobj.modulenote=Edo.get('mdnote').text;
             		moduleobj.productdname=Edo.get('pdname').text;
             		
             		var content=new getmodulebuilttype();
	         		var win=new Edo.containers.Window();
	         		var win = new Edo.containers.Window();
	         		win.set('title','选择构建方式');
	         		win.set('titlebar',
	         		    [      //头部按钮栏
	         		        {
	         		            cls: 'e-titlebar-close',
	         		            onclick: function(e){
	         		                //this是按钮
	         		                //this.parent是按钮的父级容器, 就是titlebar对象
	         		                //this.parent.owner就是窗体
	         		                this.parent.owner.destroy();
	         		                //deleteMask();
	         		            }
	         		        }
	         		    ]
	         		);
	         		
	         		win.addChild({
	         		    type: 'box',
	         		    width: 300,
	         		    height: 200, 
	         		    style:'border:0;',
	         		    padding:0,
	         		    children: content
	         		});	
	         		deleteMask();
	         	    win.show('center', 'middle', true);
             	}
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentTree').getSelected()!=null){
				    var row=Edo.get('componentTree').getSelected();
		            var content=new getlcaprojectdef();
				    var toolbar=new gettoolbar(row.id,func);
				    var row=Edo.get('componentTree').getSelected();
				    Edo.get('pdname').set('text', row.name);
				    Edo.get('pdid').set('text', row.id);
				    
	            	var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
				    win.show('center', 'middle', true);
				    this.parent.parent.parent.destroy();
             	}else{
             		alert('请选择产品类别！');
             	}
            
            }
        },
        {
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

function getmodulebuilttype(){
	var content = Edo.create(
		    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalAlign:'middle',
	       	    children: [
	       	    	{	type : 'button',text : '简单方式构建',width:150,height:40,align:'center',onclick:function(e){
	       	    		moduleobj.moduletype='LCA';new getlcamoduledefine();this.parent.parent.parent.destroy();
	       	    		}
	       	    },
	       	    {	type : 'button',text : '任务分配式构建',width:150,height:40,align:'center',onclick:function(e){
	       	    	moduleobj.modulebuilttype='taskassign';
	       	        Edo.util.Ajax.request({
   			        type: 'post',        
   			        url: basepathh+'/lca/lcamodule!addVersionnandModule.action',
   			        params: {
   		                pdid:moduleobj.productid, 
   		                mdname:moduleobj.modulename,
   		                mdnote:moduleobj.modulenote
   		                
   		            },
   			        onSuccess: function(text){
   			            var data = Edo.util.Json.decode(text);
   			            moduleobj.versionid=data;
   			            new modulepaneldefine();
   			            createmb();
   			            delivermoduleobject();
   			            //定义右侧滑动条lca部分特有组件
   			            var formitem1=Edo.create(
   	                   	    {type : 'formitem',label : '构建零件:',labelWidth : 80,labelAlign : 'left',
   	                   	    children : [{type : 'text',width : 80,id : 'compname'}]
   	                   	    });
   			            var formitem2=Edo.create(
   	                   	    {type : 'formitem',label : '构建阶段',labelWidth : 80,labelAlign : 'left',
   	                   	    children : [{type : 'text',width : 80,id : 'stage'}]
   	                   	    });
   			            var formitem3=Edo.create(
   	                   	    {type : 'formitem',label : '产品名称:',labelWidth : 80,labelAlign : 'left',
   	                   	    children : [{type : 'text',width : 80,id : 'productdname',text:moduleobj.productdname}]
   	                   	    });
   			            Edo.get('modulecontent').addChild(formitem1); 
   			            Edo.get('modulecontent').addChild(formitem2); 
   			            Edo.get('modulecontent').addChild(formitem3); 
   			            alert("创建成功！");
   			            createcompmodule();
   			            
   			        }
   			        
   			       });
             	   new lcatreedivdefine();
             	   //定义零部件树panel的零部件树和工具按钮以及按钮的功能，成功则进行建模阶段的选择
		           var componentmodelTreeandStage=new getcomponentmodelTreeandStage();
		           var builtandbuildingcomps=new getbuiltandbuildingcomponnets();
		           var func=function(id){
		        	   var r = Edo.get('componentmodelTree').getSelected();
		        	   if(r==null){
		        		   alert('请选择建模对象！');
		        		   return;
            		}
		        	Edo.get('compname').set('text',r.name);
		            //更新零部件模型信息
		        	moduleobj.componentname=r.name;
	         		moduleobj.componentid=r.id;
	         		//建模阶段panel创建
		        	new getcompstageDefine(r.name); 
		            };
		            var toolbar=new getnextbarstage();
		            Edo.get('componentmodelTreeandStage').addChild(toolbar);
		            Edo.get('treect').addChild(componentmodelTreeandStage);
		            Edo.get('treect').addChild(builtandbuildingcomps);
		            Edo.util.Ajax.request({
			        type: 'post',        
			        url: basepathh+'/lca/lcamodule!getComponentsList.action',
			        params: {
		                parentId: null,   //传递父节点的Name(也可以是ID)
		                id:moduleobj.productid
		            },
			        onSuccess: function(text){
			            var data = Edo.util.Json.decode(text);
			            Edo.get('componentmodelTree').set('data', data);
			            
			        }
			        
			    });
	       	    	this.parent.parent.parent.destroy();
	       	    	}
	       	    }	           
	       	  
	       	    ]
	       	});
	return content;
}
function newmodel(){
	/*var r = Edo.get('componentmodelTree').getSelecteds();
	if(r==null){
	   alert('请选择零部件对象！');
	   return;
	}
	Edo.get('compname').set('text',r.name);*/
    //更新零部件模型信息
	/*moduleobj.componentname=r.name;
	moduleobj.componentid=r.id;*/
	//建模阶段panel创建
	/*var sels = getTreeSelect(componentmodelTree);
    var components = [];
    for(var i=0,l=sels.length; i<l; i++){
    	var obj1={};
    	obj1.name=sels[i].name;
    	obj1.id=sels[i].id;
    	components.add(obj1);
    }*/
	var components=buildingcomp.data.source;
	var stages = stagegroup.getSelecteds();
	if(stages==null){
		alert('请选择阶段！');
		return;
	}
	//Edo.get('stage').set('text',stagegroup.getValue());
	//刷新零部件模型信息到构建器，以便模型器准确进行建模
	 /*s.style.width=0;
	 resetm2();*/
	 createsb();
	 aa.initgraph();
	 /*stagegroup.getValue()
	   stages=stagevalue.split(',');*/
	 aa.drawstage(stages);
	 moduleobj.components=components;
 	 moduleobj.stages=stages;
 	 refreshcompmodule(moduleobj);
 	 var a=document.getElementById('productContainer');
	 a.style.width=0;
     resetm1();
     
}
function clearcompmodule(){
	enablemm();
	var data = buildingcomp.data.source;
	 for(var i=0;i<data.length;i++){
		 componentmodelTree.data.update(data[i], 'choosen', false);
	 }
	 buildingcomp.set('data',[]);
	
	
}
function enablemm(){
	mm.set('enable',true);
}
function getnextbarstage(){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 40,
    horizontalAlign: 'center',
    verticalAlign: 'top',
    horizontalGap: 10,
    children: [
               
        {
            id:'mm',
            type: 'button',
            text: '开始创建',
            minWidth: 70,
            onclick: function(e){
               //定义填写完模型信息后的功能，包括模型panel的信息赋值，
            	/*if(!aa.judgesave()){
            		var func=newmodel;
            		aa.askifsave(func);
            	}else{
            		newmodel();
            	}*/
            	newmodel();
            	this.set('enable',false);
	        	/*new getcompstageDefine(components); */
              
            }
        }
      /*  ,
        {
            type: 'button',
            text: '取消',
            minWidth: 70,
            onclick: function(e){
            	var a=document.getElementById('productContainer');
        		a.style.width=0;
        	    resetm1();
        	    buildingcomp.set('data',[]);
            }
        }*/
    ]
});
return toolbar;
}
//定义工具按钮
function gettoolbar(id,func,type){
    var toolbar = Edo.create({
		type: 'ct',
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
	            if(type!='normal'){
	            this.parent.parent.parent.destroy();}
	            }
	        },
	        {
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
//定义零部件结构树
function getbuiltandbuildingcomponnets(){
	var box=Edo.create(
			{type: 'box',width: 300,height:500,layout: 'vertical',border: [0,0,0,0],padding: [0,0,0,0], verticalGap:'0',
		    horizontalGap:'0',
			children:[
				{
					type: 'group',
				    width: 300,
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
							          
								{
								    type: 'button',
								    text: '删除建模零部件',
								    minWidth: 70,
								    onclick: function(e){
								    	 var r = buildingcomp.getSelecteds();
								    	 for(var i=0;i<r.length;i++){
								    		 buildingcomp.data.remove(r[i]);
								    		 componentmodelTree.data.update(r[i], 'choosen', false);
								    	 }
								   
								    }
								}]
				},
				
				{
				id: 'buildingcomp', type: 'table', width: 300, height: 218,
			    rowSelectMode : 'multi',
			    horizontalScrollPolicy:'off',
			    columns:[
			         /*{
	            	 align: 'center',
	            	 width: 10,                        
	            	 enableSort: false,
	            	 enableDragDrop: true,
	            	 enableColumnDragDrop: false,
	            	 style:  'cursor:move;',
	            	 renderer: function(v, r, c, i, data, t){
	        		 return i+1;}},*/
				 Edo.lists.Table.createMultiColumn(),
				 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
				 {header:'正建模名称',dataIndex: 'name',headerAlign: 'center',width:230,align: 'center'}
	             ]
		   		},
		   		{type: 'panel',title:'已完成建模零部件',width:300,height:300,layout: 'vertical',border: [0,0,0,1],padding: [0,0,0,0],
	    			children:[
				   		{
							id: 'builtcomp', type: 'table', width: 300, height: '100%',
						    rowSelectMode : 'multi',
						    horizontalScrollPolicy:'off',
						    columns:[
							 {header:'编号',dataIndex: 'id', headerAlign: 'center',width:60,align: 'center'},
							 {header:'已完成名称',dataIndex: 'name',headerAlign: 'center',width:240,align: 'center'}
				             ]
					   		}
				   		]}
		   		
		     
			]});
    return box;
}
function getcomponentmodelTreeandStage(){
    var componentmodelTreeandStage = Edo.create(
    		{type: 'box',id:'componentmodelTreeandStage',width:300,height:500,layout: 'vertical',border: [0,0,0,0],padding: [0,0,0,0],
    			verticalGap:'0',
    		    horizontalGap:'0',
    			children:[
					{
						type: 'group',
					    width: 300,
					    layout: 'horizontal',
					    cls: 'e-toolbar',
						children:[
							{
							    type: 'button',
							    style:'margin-left:5px',
							    text: '添加建模零部件',
							    minWidth: 70,
							    onclick: function(e){
							    	var sels = getTreeSelect(componentmodelTree);
					                for(var i=0,l=sels.length; i<l; i++){
					                	/*var obj1={};
					                	obj1.name=sels[i].name;
					                	obj1.id=sels[i].id;*/
					                	componentmodelTree.data.update(sels[i], 'checked', false);
					                	componentmodelTree.data.update(sels[i], 'choosen', true);
					                }
					                for(var i=0;i<sels.length;i++){
					                	buildingcomp.data.insert(0,sels[i]);
							    	 }
					               
							    }
							}]
					},
		    		{
				        type: 'tree',
				        width: '100%',
				        height: 218,
				        //autoColumns:true,
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
				                    url: basepathh+'/lca/lcamodule!getComponentsList.action',
				                    params: {
				                        parentId: row.id   //传递父节点的Name(也可以是ID)
				                    },
				                    defer: 200,
				                    onSuccess: function(text){
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
				        enabelCellSelect: false,
				        horizontalScrollPolicy:'off',
				        autoColumns: true,
				        enableDragDrop: true,
				        showHeader: false,
				        columns:[
				            {   
				                enableDragDrop: true,
				                dataIndex: "name",
				                renderer: function(v, r){
				                    return (r.isfinished ? v+'——已完成':(r.choosen ? v+'——正在建模':'<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>'));}
				            }
				        ]
				    },
				    {type: 'panel',title:'选择构建阶段',width:'100%',height:180,layout: 'vertical',verticalAlign:'middle',border: [0,0,0,0],padding: [0,0,0,0],
		    			children:[
					    	{
				    			
				    		    type:'RadioGroup',
					        	id:'stagegroup',
					        	width: '100%',
					        	height: 60,
								displayField : 'name',
								repeatDirection : 'horizontal',
								repeatItems : 4,
								repeatLayout : 'table',
								itemWidth : '50px',
								valueField : 'name',
								multiSelect:true,
								data : [{stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}],
							/*	onItemclick : function(e) {
									var st='';
									for(var s in stagegroup){
										   var reBatCatRat =/get/gi;
										   var arrMatches = s.match(reBatCatRat);
										   if(arrMatches!=null){
										   st=st+','+s;}
									}
									alert(st);
									//alert(e.item.id);
							}*/
							}]
				    }
		    		]
    		}); 
    componentmodelTree.on('bodymousedown', function(e){
        var r = this.getSelected();
           
        if(r){
            var inCheckIcon = Edo.util.Dom.hasClass(e.target, 'e-tree-check-icon');
            var hasChildren = r.children && r.children.length > 0;
            if(inCheckIcon && r.checked){
                setTreeSelect(r, false, true);
            }else{
                setTreeSelect(r, true, true);
            }
        }
    });
    return componentmodelTreeandStage;
}
function setTreeSelect(sels, checked, deepSelect){//deepSelect:是否深度跟随选择
    //多选
    if(!Edo.isArray(sels)) sels = [sels];
    componentmodelTree.data.beginChange();
    for(var i=0,l=sels.length; i<l; i++){
        var r = sels[i];        
        var cs = r.children;        
        if(deepSelect){
        	componentmodelTree.data.iterateChildren(r, function(o){
                this.data.update(o, 'checked', checked);
            },componentmodelTree);
        }
        componentmodelTree.data.update(r, 'checked', checked);
    }
    componentmodelTree.data.endChange();

    //单选
//    if(!Edo.isArray(sels)) sels = [sels];
//    tree.data.beginChange();
//    tree.data.source.each(function(o){                
//        this.data.update(o, 'checked', false);
//    },tree);
    
    
//    sels.each(function(o){
//        if(o.children && o.children.length > 0){    //只有父任务才可以选中
//            this.data.update(o, 'checked', checked);
//        }
//    },tree);
    
    componentmodelTree.data.endChange();
}
function getTreeSelect(tree){
    var sels = [];
    componentmodelTree.data.source.each(function(node){        
        if(node.checked) sels.add(node);
    });
    return sels;
}


function savecompleted()
{
	var data = buildingcomp.data.source;
    for(var i=0,l=data.length; i<l; i++){
    	componentmodelTree.data.update(data[i], 'isfinished', true);
    }
    for(var i=0;i<data.length;i++){
    	builtcomp.data.insert(0,data[i]);
	 }
    buildingcomp.set('data',[]);
    enablemm();
}	

//定义模型信息内容
function getlcaprojectdef(){
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
	       	    {type : 'formitem',label : '模板名称:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'mdname'}]
	       	    },
	       	    {type : 'formitem',label : '模板备注:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'mdnote'}]
	       	    },
	       	    {type : 'formitem',label : '产品类别:',labelWidth : 150,labelAlign : 'right',
	       	    children : [{type : 'text',width : 200,id : 'pdname'},{type : 'text',width : 200,visible:false ,id : 'pdid'}]
	       	    } 
       	    ]
       	});
   	return content;
}
//定义阶段信息内容和工具按钮以及按钮的功能
function getcompstageDefine(components){
/*	var func=function(id){*/
		var a=document.getElementById('productContainer');
		var s=document.getElementById('stageContainer');
		if(!Edo.get('stagect')){
			var stagegroup = new Edo.controls.RadioGroup().set({
	        	id:'stagegroup',
				displayField : 'name',
				repeatDirection : 'vertical',
				repeatItems : 4,
				repeatLayout : 'table',
				itemWidth : '160px',
				valueField : 'name',
				multiSelect:true,
				data : [{stage:'design',name:'设计'},{stage:'manufacture',name:'制造'},{stage:'use',name:'使用'},{stage:'recycle',name:'回收'}],
			/*	onItemclick : function(e) {
					var st='';
					for(var s in stagegroup){
						   var reBatCatRat =/get/gi;
						   var arrMatches = s.match(reBatCatRat);
						   if(arrMatches!=null){
						   st=st+','+s;}
					}
					alert(st);
					//alert(e.item.id);
			}*/
			
			
			});
			var func1=function(id){
	        	var stages = stagegroup.getSelecteds();
	    		if(stages==null){
	    			alert('请选择阶段！');
	    			return;
	    		}
	    		//Edo.get('stage').set('text',stagegroup.getValue());
	    		//刷新零部件模型信息到构建器，以便模型器准确进行建模
	    		 s.style.width=0;
	    		 resetm2();
	    		 createsb();
	    		 /*stagegroup.getValue()
	    		   stages=stagevalue.split(',');*/
	    		 aa.drawstage(stages);
	    		 moduleobj.components=components;
		     	 moduleobj.stages=stages;
		     	 refreshcompmodule(moduleobj);
	    		
	        };
	        new lcastagedivdefine();
			Edo.get('stagect').addChild(stagegroup);
			var toolbar1=new gettoolbar(null,func1,'normal');
	        Edo.get('stagect').addChild(toolbar1);
		}
		//更新零部件模型信息
       /* moduleobj.modulename=Edo.get('mdname').text;
 		moduleobj.modulenote=Edo.get('mdnote').text;*/
        a.style.width=0;
        resetm1();
		moves();
 	/*}*/
	/*var i=0;
	var func2=function(i){
		if(i<components.length-1){
		 i++
		var content=new getcompLcacontentdef(components[i].name);
	    var toolbar=new gettoolbar(null,func2(i));
	    var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
		}else if(i==components.length-1){
			var content=new getcompLcacontentdef(components[i].name);
		    var toolbar=new gettoolbar(null,func);
		    var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
		}
	}*/
	/*var content=new getcompLcacontentdef(components[i].name);
    var toolbar=new gettoolbar(null,func2);
    var win=cims201.utils.getWin(400,200,'填写模板信息',[content,toolbar]);
    win.show('center', 'middle', true);*/
	
}
//没选择一个阶段进行刷新，保证建模器的模型信息的准确
function refreshcompmodule(moduleobj){
	aa.refreshcompmodule(moduleobj);
}
function createsb(){
	 var sb=document.getElementById('stagebutton');
	 sb.style.width='20px';
	 sb.style.height='100px';
	 var e = document.createElement("input");  
     e.type = "button";
     //e.style.top='200px';
     e.style.width='20px';
     e.style.height='100px';
     e.style.left='0px';
     e.style.position='absolute';
     e.value = '查\n看\n详\n情\n';  
     e.onclick=function(){
    	 sb.removeChild(e);
    	 movep();
     }
     sb.appendChild(e);
}
//定义零部件模型信息
function getcompLcacontentdef(compname){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {type : 'formitem',label : '模板名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdname'}]
       	    },
       	    {type : 'formitem',label : '模板备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'mdnote'}]
       	    },
       	    {type : 'formitem',label : '零部件名称:',labelWidth : 150,labelAlign : 'right',
           	children : [{type : 'text',width : 200,text:compname}]
       	    }
       	   
       	    ]
       	});
   	return content;
       	
}
