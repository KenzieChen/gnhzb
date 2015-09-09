var employee={};
//var basepathh='http://localhost:8080/gnhzb/';
var basepathh='/gnhzb/';
var employdataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
        },
        {name: 'emial', mapping: 'emial',  type: 'string'
        },
        {name: 'sex', mapping: 'sex', type: 'string'
            
        },
		{name: 'sex1', mapping: 'sex1', type: 'string'

		},
        {name: 'hobby', mapping: 'hobby',  type: 'string'
        },
        {name: 'dep', mapping: 'dep',  type: 'string'
        },
        {name: 'depid', mapping: 'depid',  type: 'string'
        },
        {name: 'privi', mapping: 'privi', type: 'string'
            
        },
        {name: 'priviid', mapping: 'priviid', type: 'string'
            
        }
     
    ]
});
var url=basepathh+'department/department!getEmployee.action';
var param={};
var id='emp';
refreshdata(employdataTable,url,param,id);
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
var url=basepathh+'department/department!getPrivilege.action';
var param={};
var id='privi';
refreshdata(prividataTable,url,param,id);
var depdataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
            
        
        }
    ]
});
var url=basepathh+'department/department!getDepartment.action';
var param={};
var id='dep';
refreshdata(depdataTable,url,param,id);
Edo.build({
	type: 'app',width: '100%',height: '100%',border:[0,0,0,0],
	verticalGap:'0',
	padding:[0,0,0,0],
	render: document.body,
	children:[{
		type:'box',
		width: '100%',
		height: '100%',
		verticalGap:'0',
		padding:[0,0,0,0],
		children:[{
			type: 'group',
		    width: '100%',
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    children: [
				        {type: 'button',id:'addbtn',text: '新增',onclick: function(e){new getNewEmployeeWin()}},
						{type: 'split'},
				        {type: 'button',id:'xgbtn',text: '修改',onclick: function(e){
				        	var r=emp.getSelected();
				        	if(r){
				        		new getModifyEmployeeWin(r);
				        	}
				        }},
						{type: 'split'},
				        {type: 'button',id:'delebtn',text: '删除',onclick: function(e){var r = tb.getSelected();
	                    if(r){tb.data.remove(r);}else{alert("请选择行");}}},
			            {type: 'split'},
				        {type: 'button',id:'rebtn',text: '刷新'},]
		},
		{
			id: 'emp', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
                         Edo.lists.Table.createMultiColumn(),
                         {header:'用户姓名',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'},
                         {header:'邮箱',dataIndex: 'emial',width: '200', headerAlign: 'center',align: 'center'},
                         {header:'性别',dataIndex: 'sex', width: '100',headerAlign: 'center',align: 'center'},
                         {header:'用户姓名',dataIndex: 'hobby', width: '100',headerAlign: 'center',align: 'center'},
                         {header:'邮箱',dataIndex: 'dep',width: '100', headerAlign: 'center',align: 'center'},
                         {header:'角色',dataIndex: 'privi', width: '100',headerAlign: 'center',align: 'center'},
                         {type: 'space', width:'100%'}],
			data:employdataTable
		}]
	}]
});

function classnameRegex(v){
    if (v.search(/^[A-Za-z0-9]+$/) != -1)
        return true;
    else return "类别名称格式错误";
} 
function noEmpty(v){
    if(v == "") return "不能为空";
}function resetForm(){
    userForm.reset();
}
function resetForm(){
    userForm.reset();
}

xgbtn.on('click', function(e){});

function getNewEmployeeWin(){
	var func=function(id){
		employee.userid=Edo.get('userid').text;
		employee.depid=Edo.get('depid').getValue();
		employee.priviid=Edo.get('priviid').getValue();
		var data= cims201.utils.getData(basepathh+'department/department!saveEmployee.action',{employee:employee});
		var url=basepathh+'department/department!getEmployee.action';
		var param={};
		var id='emp';
		refreshdata(employdataTable,url,param,id);
		employee={};
 	}
	    var content=new employeedef();
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,180,'填写员工信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	
}
function getModifyEmployeeWin(r){
	var func=function(id){
		employee.depid=Edo.get('depid').getValue();
		employee.priviid=Edo.get('priviid').getValue();
		employee.id=r.id;
			
		var data= cims201.utils.getData(basepathh+'department/department!saveEmployee.action',{employee:employee});
		var url=basepathh+'department/department!getEmployee.action';
		var param={};
		var id='emp';
		refreshdata(employdataTable,url,param,id);
		employee={};
		  
		
 	}
	    var content=new employeedef(r);
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,180,'修改部门信息',[content,toolbar]);
	    win.show('center', 'middle', true);
	    
}	
function employeedef(r){
	
	var content = Edo.create(
		    {type: 'box',id:'empwincontent',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',verticalGap:'10',
	       	    children: [
	       	    //				           
	       	    {	type : 'formitem',label : '人员名称:',labelWidth : 100,labelAlign : 'right',layout: 'horizontal',
	       	    children : [{type : 'text',width : 150,id : 'name'},{type : 'text',width : 200,visible:false,id : 'userid'},{type : 'button',id:'chooseuserbtn',text:'选择已有人员',onclick:function(e){getusertable();}}]
	       	    },
	       	   
	       	    {	type : 'formitem',label : '部门:',labelWidth : 100,labelAlign : 'right',
	           	    children : [
	           	                
       	                {
					    id:'depid',
					    type: 'treeselect',            
					    multiSelect: false,
					    displayField: 'name',
					    valueField: 'id',
					    rowSelectMode: 'single',    
					    width : 150,
					    treeConfig: {
					        treeColumn: 'name',
					        columns: [     
			                  	{headerText: '',
			  	                align: 'center',
			  	                width: 10,                        
			  	                enableSort: false,
			  	                enableDragDrop: true,
			  	                enableColumnDragDrop: false,
			  	                style:  'cursor:move;',
			  	                renderer: function(v, r, c, i, data, t){
			  	                return i+1;}},      
					            {id: 'name',header: '部门名称', dataIndex: 'name'}
					        ],
					        data:depdataTable
       	                
					    }
					}]
	       	    },
	       	    {	type : 'formitem',label : '角色:',labelWidth : 100,labelAlign : 'right',
	           	    children : [
       	                {
					    id:'priviid',
					    type: 'treeselect',            
					    multiSelect: false,
					    displayField: 'name',
					    valueField: 'id',
					    rowSelectMode: 'single',    
					    width : 150,
					    treeConfig: {
					        treeColumn: 'name',
					        columns: [     
			                  	{headerText: '',
			  	                align: 'center',
			  	                width: 10,                        
			  	                enableSort: false,
			  	                enableDragDrop: true,
			  	                enableColumnDragDrop: false,
			  	                style:  'cursor:move;',
			  	                renderer: function(v, r, c, i, data, t){
			  	                return i+1;}},      
					            {id: 'name',header: '角色名称', dataIndex: 'name'}
					        ],
					        data:prividataTable
       	                
					    }
					}]
	       	    }
	       	   
	       	    ]
	       	});
	if(r!=null){
		empwincontent.setForm(r);
		Edo.get('name').set('enable',false);
		Edo.get('chooseuserbtn').set('visible',false);
	}
	       	return content;
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
function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
function getusertable()
{  
	var userdataTable = new Edo.data.DataTree()
	.set({
	    fields: [
	        {name: 'id', mapping: 'id', type: 'string'
	           
	        },
	        {name: 'name', mapping: 'name',  type: 'string'
	            
	        
	        }
	    ]
	});
	var url=basepathh+'department/department!getAllUsers.action';
	var param={};
	var id='user';
	refreshdata(userdataTable,url,param,id);
		var box=Edo.create(
		{type: 'box',width: '100%',layout: 'horizontal',padding:[20,0,0,0],border:[0,0,0,0],horizontalGap:'0',
		children:[
		
	   		{
			id: 'user', type: 'table', width: '100%', height: 200,
			padding:[0,0,0,0],
			border:[0,0,0,0],
		    rowSelectMode : 'single',
		    columns:[
			 Edo.lists.Table.createMultiColumn(),
			 {header:'用户序号',dataIndex: 'id', width: '150',headerAlign: 'center',align: 'center'},
			 {header:'用户姓名',dataIndex: 'name', width: '200',headerAlign: 'center',align: 'center'}
             ],
             data:userdataTable
	   		
	   		}
		]})
    //bbl
 
    	var func=function(){
       	    
        	var row=Edo.get('user').getSelected();
            Edo.get('name').set('text',row.name);
            Edo.get('userid').set('text',row.id);
           }

    var toolbar=new gettoolbar(null,func);
    var winfm=getmywin(400,260,'选择人员',[box,toolbar]);
    winfm.show('center', 'middle', true);
}
function getmywin(width,height,title,children){
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title',title);
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
	win.set('padding',[0,0,0,0]);
	win.addChild({
	    type: 'box',
	    width: width,
	    height: height, 
	    padding:[0,0,0,0],border:[0,0,0,0],
	    layout: 'vertical',verticalGap:'0',
	    children: children
	});	
	return win;
}