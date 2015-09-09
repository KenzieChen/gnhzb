var department={};
//var basepathh='http://localhost:8080/gnhzb/';
var basepathh='/gnhzb/';
//设置数据源
var depdataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
            
        
        }
    ]
});
var url=basepathh+'/department/department!getDepartment.action';
var param={};
var id='dep';
refreshdata(depdataTable,url,param,id);
Edo.build({
	type: 'app',
	width: '100%',
	height: '100%',
	border:[0,0,0,0],
	render: document.body,
	layout: 'horizontal',
	padding:[0,0,0,0],
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
			width: '100%',
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    children: [
				        {type: 'button',id:'addbtn',text: '新增',onclick: function(e){new getNewDepartmentWin()}},
						{type: 'split'},
				        {type: 'button',id:'xgbtn',text: '修改',onclick: function(e){
				        	var r=dep.getSelected();
				        	if(r){
				        		new getModifyDepartmentWin(r);
				        	}
				        	}},
						{type: 'split'},
				        {type: 'button',id:'delebtn',text: '删除',onclick: function(e){
				        	var r = dep.getSelected();
				        	if(r){
				        		dep.data.remove(r);
				        		var data= cims201.utils.getData(basepathh+'/department/department!deleteDepartment.action',{id:r.id});
			        		}else{
			        			alert("请选择部门");
		        			}}},
			            //{type: 'split'}
				      ]
			},
	        {
			id:'dep',
			type: 'tree',		
	        width: '260',
	        height: '99%',
	        padding:[0,0,0,0],
	        headerVisible: false,
	        autoColumns: true,
	        horizontalLine: false,
	        columns: [{header: '部门',dataIndex: 'name'}],
	        onselectionchange: function(e){	
                var data= cims201.utils.getData(basepathh+'/department/department!getEmployeeByDepartment.action',{id:e.selected.id});
                emp.set("data",data)
	        },
			data:depdataTable
	       	}]},
	       	
	
	    {
   		id:'clerk',
   		type: 'box',
   		width: '50%',
        height: '100%',
        layout: 'vertical',
        padding:[0,0,0,0],
        children:[
	   		{
   			id: 'emp', type: 'table', width: '100%', height: '100%',autoColumns: true,
			padding:[0,0,0,0],
		    rowSelectMode : 'single',
		    columns:[{
            	 //headerText: '',
                 align: 'center',
                 width: 10,                        
                 enableSort: false,
                 enableDragDrop: true,
                 enableColumnDragDrop: false,
                 style:  'cursor:move;',
                 renderer: function(v, r, c, i, data, t){
                 return i+1;}},
                 Edo.lists.Table.createMultiColumn(),
                 {header:'用户序号',dataIndex: 'id', width: '100',headerAlign: 'center',align: 'center'},
                 {header:'用户姓名',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'},
                 ]
	   		}]
	}]
});

function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}


function getNewDepartmentWin(){
	var func=function(id){
		department.name=Edo.get('name').text;
		var data= cims201.utils.getData(basepathh+'/department/department!saveDepartment.action',{department:department});
		var url=basepathh+'/department/department!getDepartment.action';
		var param={};
		var id='dep';
		refreshdata(depdataTable,url,param,id);
		department={};
		  
		
 	}
	    var content=new departmentdef(null);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'填写部门信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getModifyDepartmentWin(r){
	var func=function(id){
		department.name=Edo.get('name').text;
		department.id=r.id;
			
		var data= cims201.utils.getData(basepathh+'/department/department!saveDepartment.action',{department:department});
		var url=basepathh+'/department/department!getDepartment.action';
		var param={};
		var id='dep';
		refreshdata(depdataTable,url,param,id);
		department={};
		  
		
 	}
	    var content=new departmentdef(r);
	   // Edo.get('name').set('text',r.name);
	    var toolbar=new gettoolbar(null,func);
 	    var win=cims201.utils.getWin(400,320,'修改部门信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	    
	
}

function departmentdef(r){
	var content = Edo.create(
	    {type: 'ct',id:'depwincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical', autoChange: true,
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '部门名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',name:'name',id:'name'}]
       	    }
       	    ]
	       	});
	if(r!=null){
		depwincontent.setForm(r);
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