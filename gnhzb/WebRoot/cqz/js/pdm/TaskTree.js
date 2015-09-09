var taskTreeNode={};
//var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
//设置数据源
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

var tasktreeTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        }
    ]
});

Edo.build({
	type: 'app',
	width: '100%',
	height: '100%',
	border:[0,0,0,0],
	padding:[0,0,0,0],
	render: document.body,
	layout: 'horizontal',
	children:[
		{
		type:'box',
		height: '100%',
		layout:'vertical',
		verticalGap:'0',
		padding:[0,0,0,0],
		width:'20%', 
		children:[	
	        {		
			id: 'role', type: 'table', width: '100%', height: '100%',autoColumns: true,
			padding:[0,0,0,0],
			rowSelectMode : 'single',
			columns:[{
				 headerText: '',
				 align: 'center',
				 width: '100%',                        
				 enableSort: false,
				 enableDragDrop: true,
				 enableColumnDragDrop: false,
				 style:  'cursor:move;',
				 renderer: function(v, r, c, i, data, t){
				 return i+1;}},
				 {header:'权限名称',dataIndex: 'name', width: 150,headerAlign: 'center',align: 'center'}
				 ],
             data:roledataTable,
             onselectionchange: function(e){	
		        	new roleSelect();
		         }
			}]},
	       	
	
	    {
   		type: 'box',
   		width: '30%',
        height: '100%',
        layout: 'vertical',
        verticalGap:'0',
		padding:[0,0,0,0],
        children:[
          	{
    			type: 'group',
    		    layout: 'horizontal',
    		    cls: 'e-toolbar',
    		    width:'100%',
    		    children: [
    				        {type: 'button',text: '新增父节点',onclick: function(e){new getNewParentWin()}},
    				        {type: 'button',text: '新增子节点',onclick: function(e){
    				        	var r=tasktree.getSelected();
    				        	if(r){
    				        		new getNewChildWin();
    				        		}else{
    				        			alert('请选择父节点！');
    				        		}}},
    						{type: 'split'},
    				        {type: 'button',id:'xgbtn',text: '修改',onclick: function(e){
    				        	var r=tasktree.getSelected();
    				        	if(r){
    				        		new getModifyNodeWin(r);
    				        	}
    				        	}},
    						{type: 'split'},
    				        {type: 'button',id:'delebtn',text: '删除',onclick: function(e){
    				        	var r = tasktree.getSelecteds();
    				        	if(r.length>0){
    				        		var data= cims201.utils.getData(basepathh+'/tasktree/tasktree!deleteTaskTreeNodes.action',{deletenodes:r});
    				        		new roleSelect();
    				        	}else{
    			        			alert("请选择模块");
    		        			}}},
    			            {type: 'split'}
    				      ]
			},      
	   		{
   			id: 'tasktree',
   			type: 'tree',
			width: '100%',
	        height: '100%',
	        headerVisible: false,
	        autoColumns: true,
	        horizontalLine: false,
			padding:[0,0,0,0],
		    rowSelectMode : 'single',
		    columns:[
                 {header:'名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'
                	/* renderer: function(v, r){
                         return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';
                     }*/
                 }
                 
                 ],
             data:tasktreeTable
			
			 
	   		}]
	}]
});
/*tasktree.on('bodymousedown', function(e){
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
function setTreeSelect(sels, checked, deepSelect){//deepSelect:是否深度跟随选择
    //多选
    if(!Edo.isArray(sels)) sels = [sels];
    tasktree.data.beginChange();
    for(var i=0,l=sels.length; i<l; i++){
        var r = sels[i];        
        var cs = r.children;        
        if(deepSelect){
            tasktree.data.iterateChildren(r, function(o){
                this.data.update(o, 'checked', checked);
            },tasktree);
        }
        tasktree.data.update(r, 'checked', checked);
    }
    tasktree.data.endChange();
}*/
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

function getNewParentWin(){
	taskTreeNode={};
	var func=function(id){
		taskTreeNode.name=Edo.get('name').text;
		taskTreeNode.des=Edo.get('des').text;
		taskTreeNode.url=Edo.get('url').text;
		taskTreeNode.code=Edo.get('code').text;
		var r=role.getSelected();
		taskTreeNode.role=r.id;
		var data= cims201.utils.getData(basepathh+'/tasktree/tasktree!saveTaskTreeNode.action',{taskTreeNode:taskTreeNode});
	    new roleSelect();
	    taskTreeNode={};
	    
		  
		
 	}
	    var content=new departNodedef(true,null);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,320,'填写根节点信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getNewChildWin(){
	taskTreeNode={};
	var func=function(id){
		taskTreeNode.name=Edo.get('name').text;
		taskTreeNode.des=Edo.get('des').text;
		taskTreeNode.url=Edo.get('url').text;
		taskTreeNode.code=Edo.get('code').text;
		var r=tasktree.getSelected();
		taskTreeNode.parent=r.id;
		var r2=role.getSelected();
		taskTreeNode.role=r2.id;
		var data= cims201.utils.getData(basepathh+'/tasktree/tasktree!saveTaskTreeNode.action',{taskTreeNode:taskTreeNode});
	    new roleSelect();
	    taskTreeNode={};
		  
		
 	}
	    var content=new departNodedef(false,null);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,320,'填写子节点信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getModifyNodeWin(r){
	taskTreeNode={};
	var func=function(id){
		taskTreeNode.name=Edo.get('name').text;
		taskTreeNode.des=Edo.get('des').text;
		taskTreeNode.url=Edo.get('url').text;
		taskTreeNode.code=Edo.get('code').text;
		taskTreeNode.id=r.id;
		var data= cims201.utils.getData(basepathh+'/tasktree/tasktree!saveTaskTreeNode.action',{taskTreeNode:taskTreeNode});
		new roleSelect();
		taskTreeNode={};
		  
		
 	}
	    var content=new departNodedef(false,r);
	   // Edo.get('name').set('text',r.name);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,320,'修改信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	    
	
}

function departNodedef(isParent,r){
	var content = Edo.create(
	    {type: 'ct',id:'nodewincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical', autoChange: true,
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '模块名称:',labelWidth : 150,width:'100%',labelAlign : 'right',
       	    children : [{type : 'text',id:'name',width:200}]
       	    },
       	    {	type : 'formitem',label : '执行url:',labelWidth : 150,width:'100%',labelAlign : 'right',
           	    children : [{type : 'text',id:'url',width:200}]
       	    },
       	    {	type : 'formitem',label : '编码:',labelWidth : 150,width:'100%',labelAlign : 'right',
           	    children : [{type : 'text',id:'code',width:200}]
       	    },
       	    {	type : 'formitem',label : '输入参数',labelWidth : 150,width:'100%',labelAlign : 'right',
           	    children : [{type : 'text',id:'inputparam',width:200},
           	         	{
					type : 'button',
					text : '编辑输入参数',
					onclick : function(e) {
						var box = Edo.create({
									type : 'box',
									width : '100%',
									height : '100%',
									layout : 'vertical',
									children : [ 
									            {type : 'box',
													width : '100%',
													height : '30%',
													layout : 'horizontal',
													padding : [ 0, 0,0, 0 ],
													border:[ 0, 0,0, 0 ],
													children : [ 
															{	type : 'formitem',label : '输入参数:',labelWidth : 80,width:'40%',labelAlign : 'right',
																    children : [{type : 'text',id:'paramname'}]
															   },
																{	type : 'formitem',label : '说明:',labelWidth : 80,width:'40%',labelAlign : 'right',
															   	    children : [{type : 'text',id:'paramdescri'}]
															   },
																{
																type : 'button',
																text : '添加',
																onclick : function(e) {
																	var paramname = Edo.get(
																	'paramname').text;
																	var paramdescri = Edo.get(
																	'paramdescri').text;
																	Edo.get(
																	'paramname').set('text','');
																	Edo.get(
																	'paramdescri').set('text','');
																	inputtable.data.insert(0, {name:paramname,descri:paramdescri});
																	 
																}
																}
									            ]},
									            {
													type : 'button',
													text : '删除',
													onclick : function(e) {
														var rows = Edo.get(
														'inputtable')
														.getSelecteds();
														for ( var i = 0; i < rows.length; i++) {
															inputtable.data
																	.remove(rows[i]);
														}
														 
													}
												},
								           		{
													id : 'inputtable',
													type : 'table',
													width : '100%',
													height : '100%',
													padding : [ 0, 0,0, 0 ],
													border:[ 0, 0,0, 0 ],
													rowSelectMode : 'multi',
													columns : [
															{
																headerText : '',
																align : 'center',
																width : 10,
																enableSort : false,
																enableDragDrop : true,
																enableColumnDragDrop : false,
																style : 'cursor:move;',
																renderer : function(
																		v,
																		r,
																		c,
																		i,
																		data,
																		t) {
																	return i + 1;
																}
															},
															Edo.lists.Table
																	.createMultiColumn(),
															{
																header : '名称',
																dataIndex : 'name',
																width : 200,
																headerAlign : 'center',
																align : 'center'
															},
															{
																header : '说明',
																dataIndex : 'descri',
																width : 200,
																headerAlign : 'center',
																align : 'center'
															}
															]
												
												}
							               	    
							               	    
								           	    
						             ]
								});
						inputtable.set('data',taskTreeNode.Inparamlist);
						var func = function() {
							var rows = Edo.get(
									'inputtable')
									.data.source;
							var inputparams = '';
							var Inparamlist = new Array();
							for ( var i = 0; i < rows.length; i++) {
								var paramobj={};
								paramobj.name=rows[i].name;
								paramobj.descri=rows[i].descri;
								Inparamlist.push(paramobj);
								inputparams = inputparams
										+ rows[i].name+':'+rows[i].descri
										+ ";"
							}
							inputparams = inputparams
									.substr(0,inputparams.length - 1)
							Edo.get('inputparam').set(
									'text', inputparams);
							taskTreeNode.Inparamlist=Inparamlist;
						}
						var toolbar = new gettoolbar(null,
								func);
						var winfm = getmywin(600, 400,
								'编辑输入参数', [ box, toolbar ]);
						winfm.show('center', 'middle',
										true);
					}
				} ]
       	    },
       	    {	type : 'formitem',label : '输出参数',labelWidth : 150,width:'100%',labelAlign : 'right',
           	    children : [{type : 'text',id:'outputparam',width:200},
           	             {
					type : 'button',
					text : '编辑输出参数',
					onclick : function(e) {
						var box = Edo.create({
									type : 'box',
									width : '100%',
									height : '100%',
									layout : 'vertical',
									padding : [ 0, 0,0, 0 ],
									border:[ 0, 0,0, 0 ],
									children : [ 
									            {type : 'box',
													width : '100%',
													height : '30%',
													padding : [ 0, 0,0, 0 ],
													border:[ 0, 0,0, 0 ],
													layout : 'horizontal',
													children : [ 
															{	type : 'formitem',label : '输出参数:',labelWidth : 80,width:'40%',labelAlign : 'right',
																    children : [{type : 'text',id:'paramname'}]
															   },
																{	type : 'formitem',label : '说明:',labelWidth : 80,width:'40%',labelAlign : 'right',
															   	    children : [{type : 'text',id:'paramdescri'}]
															   },
																{
																type : 'button',
																text : '添加',
																onclick : function(e) {
																	var paramname = Edo.get(
																	'paramname').text;
																	var paramdescri = Edo.get(
																	'paramdescri').text;
																	Edo.get(
																	'paramname').set('text','');
																	Edo.get(
																	'paramdescri').set('text','');
																	outputtable.data.insert(0, {name:paramname,descri:paramdescri});
																	 
																}
																}
									            ]},
									            {
													type : 'button',
													text : '删除',
													onclick : function(e) {
														var rows = Edo.get(
														'outputtable')
														.getSelecteds();
														for ( var i = 0; i < rows.length; i++) {
															outputtable.data
																	.remove(rows[i]);
														}
														 
													}
												},
								           		{
													id : 'outputtable',
													type : 'table',
													width : '100%',
													height : '100%',
													padding : [ 0, 0,0, 0 ],
													border:[ 0, 0,0, 0 ],
													rowSelectMode : 'multi',
													columns : [
															{
																headerText : '',
																align : 'center',
																width : 10,
																enableSort : false,
																enableDragDrop : true,
																enableColumnDragDrop : false,
																style : 'cursor:move;',
																renderer : function(
																		v,
																		r,
																		c,
																		i,
																		data,
																		t) {
																	return i + 1;
																}
															},
															Edo.lists.Table
																	.createMultiColumn(),
															{
																header : '名称',
																dataIndex : 'name',
																width : 200,
																headerAlign : 'center',
																align : 'center'
															},
															{
																header : '说明',
																dataIndex : 'descri',
																width : 200,
																headerAlign : 'center',
																align : 'center'
															}
															]
												
												}
							               	    
							               	    
								           	    
						             ]
								});
						outputtable.set('data',taskTreeNode.Outparamlist);
						var func = function() {
							var rows = Edo.get('outputtable').data
									.source;
							var outputparams = '';
							var Outparamlist = new Array();
							for ( var i = 0; i < rows.length; i++) {
								var paramobj={};
								paramobj.name=rows[i].name;
								paramobj.descri=rows[i].descri;
								Outparamlist.push(paramobj);
								outputparams = outputparams
										+ rows[i].name+':'+rows[i].descri
										+ ";"
							}
							outputparams = outputparams
									.substr(0,outputparams.length - 1)
							Edo.get('outputparam').set(
									'text', outputparams);
							taskTreeNode.Outparamlist=Outparamlist;
						}
						var toolbar = new gettoolbar(null,
								func);
						var winfm = getmywin(600, 400,
								'编辑输出参数', [ box, toolbar ]);
						winfm.show('center', 'middle',
										true);
					}
				} ]
       	    },
       	    {	type : 'formitem',label : '模块说明:',labelWidth : 150,width:'100%',labelAlign : 'right',
           	    children : [{type : 'text',id:'des'}]
       	    }
       	    ]
	       	});
	if(r!=null){
		nodewincontent.setForm(r);
		var rows=r.Inparamlist;
		var inputparams = '';
		var Inparamlist = new Array();
		for ( var i = 0; i < rows.length; i++) {
			var paramobj={};
			paramobj.name=rows[i].name;
			paramobj.descri=rows[i].descri;
			Inparamlist.push(paramobj);
			inputparams = inputparams
					+ rows[i].name+':'+rows[i].descri
					+ ";"
		}
		inputparams = inputparams
				.substr(0,inputparams.length - 1);
		Edo.get('inputparam').set(
				'text', inputparams);
		taskTreeNode.Inparamlist=Inparamlist;
		
		var rows2=r.Outparamlist;
		var outputparams = '';
		var Outparamlist = new Array();
		for ( var i = 0; i < rows2.length; i++) {
			var paramobj={};
			paramobj.name=rows2[i].name;
			paramobj.descri=rows2[i].descri;
			Outparamlist.push(paramobj);
			outputparams = outputparams
					+ rows2[i].name+':'+rows2[i].descri
					+ ";"
		}
		outputparams = outputparams
				.substr(0,outputparams.length - 1);
		Edo.get('outputparam').set(
				'text', outputparams);
		taskTreeNode.Outparamlist=Outparamlist;
	}else{
		if(!isParent){
			var r=tasktree.getSelected();
			var parent=Edo.create(
					{	type : 'formitem',label : '父节点:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',id:'parent',text:r.name}]
       	    });
			content.addChild(parent);
		}
	}
	
   	return content;
}
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
function getmywin(width, height, title, children) {
	var win = new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title', title);
	win.set('titlebar', [ //头部按钮栏
	{
		cls : 'e-titlebar-close',
		onclick : function(e) {
			//this是按钮
			//this.parent是按钮的父级容器, 就是titlebar对象
			//this.parent.owner就是窗体
			this.parent.owner.destroy();
			//deleteMask();
		}
	} ]);

	win.addChild({
		type : 'box',
		width : width,
		height : height,
		style : 'border:0;',
		padding : 0,
		children : children
	});
	return win;
}