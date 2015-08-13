var projectobj={
		versionid:null,
		productid:null,
		projectname:null,
		projectnote:null,
		projecttype:null,
		moduleid:null,
		modulename:null,
		Createdate:null,
		Version:null,
		createuserid:null
		}
var basepathh='http://localhost:8080/gnhzb';
var cell=null;
var levelmodule=null;
var currentmoduleid=null;
var cellcollection=new Array();
function getmodulediv(){
    new moduledivdefine();
    var box= new getmodulebox();
    Edo.get('mdct').addChild(box);
    movemodulediv();
}

function getmywin(width,height,title,children){
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title',title);
	win.set('titlebar',
	    [      // 头部按钮栏
	        {
	            cls: 'e-titlebar-close',
	            onclick: function(e){
	                // this是按钮
	                // this.parent是按钮的父级容器, 就是titlebar对象
	                // this.parent.owner就是窗体
	                this.parent.owner.destroy();
	                // deleteMask();
	            }
	        }
	    ]
	);
	
	win.addChild({
	    type: 'box',
	    width: width,
	    height: height, 
	    style:'border:0;',
	    padding:0,
	    children: children
	});	
	return win;
}
function gettoolbar(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 30,
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
function getmodulebox(){
	var moduledata= cims201.utils.getData(basepathh+'/module/module!getModuletree.action',{moduletype:'PDM'});
	/*
	 * var componentmodeltree=getcomponentmodeltree(); var
	 * moduledetail=getmoduledetail();
	 */
	var modulebox=Edo.create(
			{type: 'ct',id:'modulebox',width: 400,height: '100%',padding:[0,0,0,0],border:[0,0,0,0],layout:'vertical',verticalGap:'0',
	              children:[
                	              {
									type: 'group',
									width: '100%',
								    layout: 'horizontal',
								    cls: 'e-toolbar',
								    width:400,
								    children: [
								        {
								            type: 'button',
								            text: '选择该模型创建',
								            onclick: function(e){
								            	var r = moduletree.getSelected();
								            	projectobj.moduleid=r.superparentid;
								            	projectobj.modulename=r.name;
									        	projectobj.createdate=r.createdate;
									        	projectobj.version=r.version;
									        	projectobj.createuserid=r.createuserid;
								            	modulebox.destroy();
								            	 var a=document.getElementById('moduledefineContainer');
								            	 a.style.width=0;
								            	 resetm();
								            	 aa.initproject(projectobj);
								            	 aa.showmodule(r.id);
								            }                
								            
								        }]
                	              },
	                              {
			                	    type: 'tree',
				   			        width: '100%',
				   			        height:'100%',
				   			        autoColumns:true,
				   			        headerVisible: false,
				   			        verticalLine:false,
				   			        horizontalLine:false,
				   			        id: 'moduletree',
				   			        enabelCellSelect: false,
							        autoColumns: true,
							        enableDragDrop: true,
							        showHeader: false,
							        /*
									 * ondblclick:function(e){ var r =
									 * this.getSelected();
									 * Edo.get('modulename').set('text',r.name);
									 * Edo.get('Createdate').set('text',r.Createdate);
									 * Edo.get('Version').set('text',r.Version);
									 * Edo.get('createuserid').set('text',r.createuserid);
									 * Edo.get('componentmodelTree').set('data',
									 * []); moduleid=r.id;
									 * Edo.util.Ajax.request({ type: 'post',
									 * url:
									 * basepathh+'/lca/lcamodule!getmoduleComponentsList.action',
									 * params: { parentId: null,
									 * //传递父节点的Name(也可以是ID) id:r.componentid,
									 * moduleid:r.id }, onSuccess:
									 * function(text){ // alert(text); var data =
									 * Edo.util.Json.decode(text);
									 * Edo.get('componentmodelTree').set('data',
									 * data); }
									 * 
									 * }); },
									 */
							        columns:[
							            {   
							                enableDragDrop: true,
							                dataIndex: "name"
							            
				                        }
							            ],
				                     data:moduledata
							           
				            }
	                              
		         ]
	})
	return modulebox;
}
function showdetail(editcell,module,moduleid){
		cell=editcell;
		levelmodule=module;
		currentmoduleid=moduleid;
		/*
		 * var data=
		 * cims201.utils.getData(basepathh+'/module/module!getmoduleprocesscontent.action',{moduleid:currentmoduleid,processid:cell.getId()});
		 * levelmodule.levelmoduleobject.processname=data.name;
		 * levelmodule.levelmoduleobject.processnote=data.note;
		 * levelmodule.levelmoduleobject.knowledgecategoryindex=Edo.get('category').data.indexOf(Edo.get('category').selectedItem);
		 * levelmodule.levelmoduleobject.knowledgecategoryid=Edo.get('category').getValue();
		 * levelmodule.levelmoduleobject.tasktreenodeid=data.tasktreenodeid;
		 * levelmodule.levelmoduleobject.tasktreenodename=data.tasktreenodename;
		 * levelmodule.levelmoduleobject.input=data.input;
		 * levelmodule.levelmoduleobject.output=data.output;
		 */
		if(!Edo.get('processct')){
			new processdivdefine();
		}
		 if(Edo.get('moduleprocessbox')){
			 resetprocessdiv(); 
			 Edo.get('moduleprocessbox').destroy();
		 }
		 var box=new getmoduleprocessdefinebox(cell);
	     Edo.get('processct').addChild(box);
	     moveprocessdiv();
	}
function getmoduleprocessdefinebox(cell){
	var index=null;
	if(levelmodule.levelmoduleobject.knowledgecategoryindex!=null)
	{
		/* alert(levelmodule.levelmoduleobject.knowledgecategoryindex) */
		index=levelmodule.levelmoduleobject.knowledgecategoryindex;
		/*
		 * var
		 * r=Edo.get('category').data.getAt(levelmodule.levelmoduleobject.knowledgecategoryindex);
		 * alert(r.name) Edo.get('category').data.beginChange()
		 * Edo.get('category').data.select(r)
		 * Edo.get('category').data.endChange()
		 */
	}
	var box=Edo.create(
			{type: 'box',id:'moduleprocessbox',width: '100%',border: [0,0,0,0],padding: [20,0,0,0],layout: 'vertical',verticalGap:'20',
           	    children: [
					{	type : 'formitem',label : '执行模块:',labelWidth : 100,labelAlign : 'right',layout: 'horizontal',
						    children : [{type : 'text',width : 200,id : 'tasktreenodename',enable:'false',text:levelmodule.levelmoduleobject.tasktreenodename}
						                ]
						    },
	           	    {	type : 'formitem',label : '模块名称:',labelWidth : 100,labelAlign : 'right',
	           	    children : [{type : 'text',width : 200,id : 'processname',enable:'false',text:levelmodule.levelmoduleobject.processname}]
	           	    },
	           	    {
						type : 'formitem',
						label : '前置流程模块:',
						labelWidth : 100,
						labelAlign : 'right',
						layout : 'horizontal',
						children : [
								{
									type : 'text',
									width : 200,
									id : 'prevmodulename',
									enable:'false',
									text : levelmodule.levelmoduleobject.prevmodulename,
								},
								{
									type : 'text',
									width : 200,
									id : 'prevmoduleid',
									text : levelmodule.levelmoduleobject.prevmoduleid,
									visible:'false'
								}]
					},
					{
						type : 'formitem',
						label : '后置流程模块:',
						labelWidth : 100,
						enable:'false',
						labelAlign : 'right',
						layout : 'horizontal',
						children : [
							{
								type : 'text',
								width : 200,
								id : 'nextmodulename',
								text : levelmodule.levelmoduleobject.nextmodulename,
							},
							{
								type : 'text',
								width : 200,
								id : 'nextmoduleid',
								text : levelmodule.levelmoduleobject.nextmoduleid,
								visible:'false'
							}
							]
					},
           
		           	 {	type : 'formitem',label : '知识领域:',labelWidth : 100,labelAlign : 'right',
		               	    children : [{type : 'text',width : 200,id : 'categorynames',enable:'false',text:levelmodule.levelmoduleobject.categorynames}
								        ],
		               	    },
//		               	 {
//								type : 'formitem',
//								label : '输入参数:',
//								labelWidth : 100,
//								labelAlign : 'right',
//								children : [ {
//									type : 'text',
//									width : 200,
//									id : 'input',
//									text : levelmodule.levelmoduleobject.input
//								} ]
//							},
							{
								type : 'formitem',
								label : '输入参数:',
								labelWidth : 100,
								labelAlign : 'right',
								enable:'false',
								children : [ {
									type : 'text',
									width : 200,
									enable:false,
									id : 'inputparam',
								} ]
							},
							{
								type : 'formitem',
								label : '输出参数:',
								enable:'false',
								labelWidth : 100,
								labelAlign : 'right',
								children : [ {
									type : 'text',
									width : 200,
									enable:false,
									id : 'outputparam',
								} ]
							},
//							{
//								type : 'formitem',
//								label : '输出说明:',
//								labelWidth : 100,
//								labelAlign : 'right',
//								children : [ {
//									type : 'text',
//									width : 200,
//									id : 'outputdescrip',
//									text : levelmodule.levelmoduleobject.outputdescrip
//								} ]
//							},
	           	 {	type : 'formitem',label : '说明:',labelWidth : 100,labelAlign : 'right',
	               	    children : [{type : 'textarea',width : 200,height:50,id : 'processnote',text:levelmodule.levelmoduleobject.processnote}]
	               	    },
               	 {type: 'ct',
               	     cls: 'e-dialog-toolbar',
               	     width: '100%',
               	     layout: 'horizontal',
               	     height: 30,
               	     horizontalAlign: 'center',
               	     verticalAlign: 'middle',
               	     horizontalGap: 10,
               	     children: [
               	                
               	         {
               	             type: 'button',
               	             text: '确定',
               	             minWidth: 70,
               	             onclick: function(e){
               	   /*
					 * levelmodule.levelmoduleobject.processname=Edo.get('processname').text;
					 * levelmodule.levelmoduleobject.processnote=Edo.get('description').text;
					 * aa.changecelllabel(Edo.get('processname').text,cell);
					 * levelmodule.levelmoduleobject.knowledgecategoryindex=Edo.get('category').data.indexOf(Edo.get('category').selectedItem);
					 * levelmodule.levelmoduleobject.knowledgecategoryid=Edo.get('category').getValue();
					 * levelmodule.levelmoduleobject.description=Edo.get('description').text;
					 * levelmodule.levelmoduleobject.tasktreenodeid=Edo.get('tasktreenodeid').text;
					 * levelmodule.levelmoduleobject.tasktreenodename=Edo.get('tasktreenodename').text;
					 * levelmodule.levelmoduleobject.input=Edo.get('input').text;
					 * levelmodule.levelmoduleobject.output=Edo.get('output').text;
					 */
	               	             resetprocessdiv();
	               	             this.parent.parent.destroy();
               	             }
               	         },{
               	             type: 'button',
               	             text: '取消',
               	             minWidth: 70,
               	             onclick: function(e){
               	            	resetprocessdiv();	
	               	             this.parent.parent.destroy();

               	             }
               	         }
               	     ]
               	 }
	    			]
				});
	if(levelmodule.levelmoduleobject.Inparamlist != null){
		var rows=levelmodule.levelmoduleobject.Inparamlist;
		var inputparams = '';
		for ( var i = 0; i < rows.length; i++) {
			var paramobj={};
			paramobj.name=rows[i].name;
			paramobj.descri=rows[i].descri;
			inputparams = inputparams
					+ rows[i].name+':'+rows[i].descri
					+ ";"
		}
		inputparams = inputparams
				.substr(0,inputparams.length - 1);
		Edo.get('inputparam').set(
				'text', inputparams);
	}
	if(levelmodule.levelmoduleobject.Inparamlist != null){
		var rows2=levelmodule.levelmoduleobject.Outparamlist;
		var outputparams = '';
		for ( var i = 0; i < rows2.length; i++) {
			var paramobj={};
			paramobj.name=rows2[i].name;
			paramobj.descri=rows2[i].descri;
			outputparams = outputparams
					+ rows2[i].name+':'+rows2[i].descri
					+ ";"
		}
		outputparams = outputparams
				.substr(0,outputparams.length - 1);
		Edo.get('outputparam').set(
				'text', outputparams);
	}
	
   return box;	 
}