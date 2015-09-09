var privilege={};
//var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
var addnewprivilege=new Array();
var removeprivilege=new Array();
var prividataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        },
        {name: 'code', mapping: 'code',  type: 'string'
        }
    ]
});
var url=basepathh+'/department/department!getPrivilege.action';
var param={};
var id='privi';
refreshdata(prividataTable,url,param,id);
function priviSelect()
{
   var r=privi.getSelected();
   if(r!=null){
   var data= cims201.utils.getData(basepathh+'/department/department!getOwnPrivilegeOperationRoles.action',{id:r.id});
   ownroledataTable.set('data',data.ownrole);
   notownroledataTable.set('data',data.unownrole);
   
   }
}
var ownroledataTable = new Edo.data.DataTable()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        }
    ]
});
var notownroledataTable = new Edo.data.DataTable()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        }
    ]
});

Edo.build({
	type: 'app',width: '100%',height: '100%',border:[0,0,0,0],padding:[0,0,0,0],
	render: document.body,layout: 'horizontal',
	children:[
		{
		type:'box',
		height: '100%',
		layout:'vertical',
		verticalGap:'0',
		padding:[0,0,0,0],
		children:[	
	      	{
			type: 'group',
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    width:'100%',
		    children: [
				        {type: 'button',text: '新增',onclick: function(e){new getNewPrivilegeWin()}},
						{type: 'split'},
				        {type: 'button',id:'xgbtn',text: '修改',onclick: function(e){
				        	var r=privi.getSelected();
				        	if(r){
				        		new getModifyPrivilegeWin(r);
				        	}
				        	}},
						{type: 'split'},
				        {type: 'button',text: '删除',onclick: function(e){
				        	var r = privi.getSelected();
				        	if(r){
				        		privi.data.remove(r);
				        		var data= cims201.utils.getData(basepathh+'/department/department!deletePrivilege.action',{id:r.id});
			        		}else{
			        			alert("请选择部门");
		        			}}},
			            {type: 'split'}
				      ]
			},
	          
	          {
				id:'privi',
				type: 'tree',
				width: '260',
		        height: '100%',
		        headerVisible: false,
		        autoColumns: true,
		        horizontalLine: false,
		        columns: [{header: '角色',dataIndex: 'name'},{header: '代号',dataIndex: 'code'}],
		        data:prividataTable,
		        onselectionchange: function(e){	
		        	new priviSelect();
		         }
		       }
			
			
			]
		},
	       {
	    	type:'panel',
	    	title: '权限列表',
	    	width: '300',
	        height: '100%',
	        verticalGap:'0',
			padding:[0,0,0,0],
	        children:[
				{
				    type: 'group',
				    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
				        {
					    	type: 'button',
					    	text: '删除',
					    	onclick: function(e){
					    		var r = ownrole.getSelecteds();
								var r2=privi.getSelected();
								if(r2&&r.length>0){
									var data= cims201.utils.getData(basepathh+'/department/department!deletePrivilegeOperationRoles.action',{id:r2.id,rolearray:r});
									/*for(var i=0;i<r.length;i++){
									ownrole.data.remove(r[i]);
									}*/
									new priviSelect();
								}else{
									alert("请选择行");}}
				        }
				    ]
				}, 
	            {
	        	id: 'ownrole',
	        	type: 'table', 
	        	width: '100%', 
	        	height: '100%',
	        	autoColumns: true,
	            padding:[0,0,0,0],
				rowSelectMode : 'multi',
				columns:[
				   {headerText: '',
				    dataIndex: 'num',
	                align: 'center',
	                width: 10,                        
	                enableSort: false,
	                enableDragDrop: true,
	                enableColumnDragDrop: false,
	                style:  'cursor:move;',
	                renderer: function(v, r, c, i, data, t){
	                return i+1;}},
	                Edo.lists.Table.createMultiColumn(),
	                {header:'权限',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}],
                data:ownroledataTable	
	            }
	        ]
	       },
	      {
	       	type:'panel',
	       	title: '未授予权限列表',
	       	width: '300',
	        height: '100%',
	        verticalGap:'0',
			padding:[0,0,0,0],
	        children:[     
				{
				    type: 'group',
				    width: '100%',
				    layout: 'horizontal',
				    cls: 'e-toolbar',
				    children: [
				        {
							type: 'button',
							text: '添加',
							onclick: function(e){
								var r = unownrole.getSelecteds();
								var r2=privi.getSelected();
								alert(r2.id);
				
								if(r2&&r.length>0){
									var data= cims201.utils.getData(basepathh+'/department/department!addPrivilegeOperationRoles.action',{id:r2.id,rolearray:r});
								/*	for(var i=0;i<r.length;i++){
										 var r3=r[i];
										 r3.num=ownrole.data.length+1
										ownrole.data.insert(ownrole.data.length,r3);
										};
									for(var i=0;i<r.length;i++){
										unownrole.data.remove(r[i]);
										}*/
									new priviSelect();
								}else{
				    				alert("请选择行");}}
						}
					]
				},      	
			    {
				id: 'unownrole',
				type: 'table', 
				width: '100%', 
				height: '100%',
				autoColumns: true,
			    padding:[0,0,0,0],
			    rowSelectMode : 'multi',
				columns:[
				   {headerText: '',
			        align: 'center',
			        width: 10,                        
			        enableSort: false,
			        enableDragDrop: true,
			        enableColumnDragDrop: false,
			        style:  'cursor:move;',
			        renderer: function(v, r, c, i, data, t){
			        return i+1;}},
			        Edo.lists.Table.createMultiColumn(),
			        {header:'权限',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}],
				data:notownroledataTable	
			    }
				]
	                  }]
	   
	});
function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getNewPrivilegeWin(){
	var func=function(id){
		privilege.code=Edo.get('code').text;
		privilege.name=Edo.get('name').text;
		var data= cims201.utils.getData(basepathh+'/department/department!savePrivilege.action',{privilege:privilege});
		var url=basepathh+'/department/department!getPrivilege.action';
		var param={};
		var id='privi';
		refreshdata(prividataTable,url,param,id);
		privilege={};
		  
		
 	}
	    var content=new prividef(null);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'填写角色信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getModifyPrivilegeWin(r){
	var func=function(id){
		privilege.code=Edo.get('code').text;
		privilege.name=Edo.get('name').text;
		privilege.id=r.id;
			
		var data= cims201.utils.getData(basepathh+'/department/department!savePrivilege.action',{privilege:privilege});
		var url=basepathh+'/department/department!getPrivilege.action';
		var param={};
		var id='dep';
		refreshdata(prividataTable,url,param,id);
		privilege={};
		  
		
 	}
	    var content=new prividef(r);
	   // Edo.get('name').set('text',r.name);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'修改部门信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function prividef(r){
	var content = Edo.create(
	    {type: 'ct',id:'priviwincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical', autoChange: true,
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '角色名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',name:'name',id:'name'}]
       	    },
       	    {	type : 'formitem',label : '角色代号:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',name:'code',id:'code'}]
       	    }
       	    ]
	       	});
	if(r!=null){
		priviwincontent.setForm(r);
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