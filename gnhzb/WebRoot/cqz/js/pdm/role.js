var Role={};
//var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
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
Edo.build({
	type: 'app',width: '100%',height: '100%',border:[0,0,0,0],padding:[0,0,0,0],verticalGap:'0',
	render: document.body,
	children:[{
		type:'box',
		width: '100%',
		height: '100%',
		verticalGap:'0',
		padding:[0,0,0,0],
		children:[
            {
			type: 'group',
			layout: 'horizontal',
			cls: 'e-toolbar',
			width:'100%',
			children: [
				        {type: 'button',text: '新增',onclick: function(e){new getNewRoleWin()}},
						{type: 'split'},
				        {type: 'button',id:'xgbtn',text: '修改',onclick: function(e){
				        	var r=role.getSelected();
				        	if(r){
				        		new getModifyRoleWin(r);
				        	}
				        	}},
						{type: 'split'},
				        {type: 'button',text: '删除',onclick: function(e){
				        	var r = role.getSelected();
				        	if(r){
				        		role.data.remove(r);
				        		var data= cims201.utils.getData(basepathh+'/department/department!deleteOperationRoles.action',{id:r.id});
			        		}else{
			        			alert("请选择部门");
			    			}}},
			            {type: 'split'}
				      ]
			},
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
				 /*{header:'权限说明',dataIndex: 'rolenumber',width: '100', headerAlign: 'center',align: 'center'}*/
				 ],
             data:roledataTable
			}
		]}]
});

function noEmpty(v){
    if(v == "") return "不能为空";
}function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getNewRoleWin(){
	var func=function(id){
		Role.name=Edo.get('name').text;
		var data= cims201.utils.getData(basepathh+'/department/department!saveOperationRoles.action',{role:Role});
		var url=basepathh+'/department/department!getOperationRoles.action';
		var param={};
		var id='role';
		refreshdata(roledataTable,url,param,id);
		Role={};
		  
		
 	}
	    var content=new roledef(null);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'填写权限信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getModifyRoleWin(r){
	var func=function(id){
		Role.name=Edo.get('name').text;
		Role.id=r.id;
			
		var data= cims201.utils.getData(basepathh+'/department/department!saveOperationRoles.action',{role:Role});
		var url=basepathh+'/department/department!getOperationRoles.action';
		var param={};
		var id='role';
		refreshdata(roledataTable,url,param,id);
		Role={};
		  
		
 	}
	    var content=new roledef(r);
	   // Edo.get('name').set('text',r.name);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'修改部门信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function roledef(r){
	var content = Edo.create(
	    {type: 'ct',id:'rolewincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical', autoChange: true,
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '权限名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',name:'name',id:'name'}]
       	    }
       	    ]
	       	});
	if(r!=null){
		rolewincontent.setForm(r);
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