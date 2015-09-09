var basepathh='/gnhzb';
function buildFunctionWin(graph,cell){
	var tasktreeTable = new Edo.data.DataTree()
		.set({
		    fields: [
		        {name: 'id', mapping: 'id', type: 'string'
		           
		        },
		        {name: 'name', mapping: 'name',  type: 'string'
		        }
		    ]
		});	
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
	var box=Edo.create(
			{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
           	    children: [
           	    //				           
           	    {	type : 'formitem',label : '流程名称:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',width : 200,id : 'processname',text:cell.processname}]
           	    },
           	  
           	    {	type : 'formitem',label : '流程执行人:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',width : 200,id : 'processperson',text:cell.processperson,onclick:function(e){getcarrier(); }},{type : 'text',width : 200,id : 'processpersonid',visible:false}]
           	    },
           	    {	type : 'formitem',label : '开始时间:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'date',width : 200,id : 'starttime',text:cell.starttime}]
           	    },
           	    {	type : 'formitem',label : '结束时间:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'date',width : 200,id : 'finishtime',text:cell.finishtime}]
           	    },
           		{	type : 'formitem',label : '操作模块:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'text',width : 200,id : 'tasktreenodeid',text:cell.tasktreenodeid,visible:false},{type : 'text',width : 200,id : 'tasktreenode',text:cell.tasktreenode,onclick: function(e){
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
               	    	var box=Edo.create(
               	    			{type: 'box',width: '100%',height:'100%',layout: 'horizontal',
               	    			children:[
               	    				{
									type:'box',
									height: '100%',
									layout:'vertical',
									children:[	
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
											 ],
							             data:roledataTable,
							             onselectionchange: function(e){	
									        	new roleSelect();
									         }
										}]},
								      
								   		{
							   			id: 'tasktree',
							   			type: 'tree',
										width: '260',
								        height: '100%',
								        headerVisible: false,
								        autoColumns: true,
								        horizontalLine: false,
										padding:[0,0,0,0],
									    rowSelectMode : 'single',
									    columns:[
							                 {header:'名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}
							                 ],
							             data:tasktreeTable
								   		}
               	    				]})
   	    				var func=function(){
					   	
		            	var row=Edo.get('tasktree').getSelected();
			            Edo.get('tasktreenode').set('text',row.name);
			            Edo.get('tasktreenodeid').set('text',row.id);
			           }
					    var toolbar=new gettoolbar(null,func);
					    var winfm=cims201.utils.getWin(400,400,'选择功能模块',[box,toolbar]);
					    winfm.show('center', 'middle', true);
               	    	}}]
           	    }
           	    
	    			]
		
		});
	    getfunctioncomponent(cell,box);
		//bbl
	    if(!cell.tasktreenode){
	    	alert('ss')
	    	var result= cims201.utils.getData(basepathh+'/module/module!getProcessTaskTreeNode.action',{moduleid:moduleid,processid:cell.getId()
	    	});
	    	Edo.get('tasktreenode').set('text',result.name);
	    	Edo.get('tasktreenodeid').set('text',result.id);
	    	}
	   
		var func=function(){
        	var processname=Edo.get('processname').text;
        	var starttime=Edo.get('starttime').text;
        	var finishtime=Edo.get('finishtime').text;
        	cell.starttime=starttime;
        	cell.finishtime=finishtime;
        	cell.processname=processname;
        	cell.processcarrier=Edo.get('processpersonid').text;
        	cell.processperson=Edo.get('processperson').text;
        	cell.tasktreenode=Edo.get('tasktreenode').text;
        	cell.tasktreenodeid=Edo.get('tasktreenodeid').text;
        	var data=cell.data;
        	var length =data.length;
        	for(var i=0;i<length;i++){
        		var typee=data[i].typee;
        		if(typee=='processurl'){
        			cell.processurl=Edo.get('url').text;
        		}else if(typee=='upload'){
        			cell.upload='www.';
        	}
        	}
            var label =  graph.convertValueToString(cell);
		    var nodelabel =  label.slice(0,label.length);
		    var newlabel = label.replace(nodelabel,
		    '<div style=" text-align: center;padding:0px 0px 0px 0px;width:120px;background:#41B9F5;height:50px;opacity:100">'+
				'<table style=" margin: auto;padding:0px 0px 0px 0px;font-size:4px">'+
	                '<tr>'+
	                   ' <td>流程名称:</td>'+
	                    ' <td>'+processname+'</td>'+
	                '</tr>'+
	                '</table>'+
	                '</div>');
	                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
		           }
		var toolbar=new gettoolbar(null,func);
		var winprocess=cims201.utils.getWin(400,200,'输入流程信息',[box,toolbar]);
		 winprocess.show('center', 'middle', true);
	
	
	
	
	
	
}
var depdataTable = new Edo.data.DataTree()
.set({
    fields: [
        {name: 'id', mapping: 'id', type: 'string'
           
        },
        {name: 'name', mapping: 'name',  type: 'string'
            
        
        }
    ]
});
function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}
var url=basepathh+'/department/department!getDepartment.action';
var param={};
var id='dep';
refreshdata(depdataTable,url,param,id);
function getcarrier(e)
{
		
		var box=Edo.create(
		{type: 'box',width: 600,height:'70%',layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
		children:[
			{
			id:'dep',
			type: 'tree',		
	        width: 200,
	        height: '99%',              	        
	        headerVisible: false,
	        autoColumns: true,
	        horizontalLine: false,
	        columns: [{header: '部门',dataIndex: 'name'}],
	        onselectionchange: function(e){	
	            var data= cims201.utils.getData(basepathh+'/department/department!getEmployeeByDepartment.action',{id:e.selected.id});
	            emp.set("data",data)
	        },
			data:depdataTable
	       	},
	   		{
			id: 'emp', type: 'table', width: 400, height: '100%',autoColumns: true,
			border: [0,0,0,0],padding: [0,0,0,0],
		    rowSelectMode : 'single',
		    columns:[{
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
			 {header:'用户姓名',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}
             ]
	   		}
		]})
    //bbl
   	var func=function(){
   	
    	var row=Edo.get('emp').getSelected();
        Edo.get('processperson').set('text',row.name);
        Edo.get('processpersonid').set('text',row.id);
       }
    var toolbar=new gettoolbar(null,func);
    var winfm=cims201.utils.getWin(600,300,'选择人员',[box,toolbar]);
    winfm.show('center', 'middle', true);
}

function getfunctioncomponent(cell,box){
	var data=cell.data;
	var length =data.length;
	for(var i=0;i<length;i++){
		if(data[i].typee=='processurl'){
			alert(data[i].name)
			var url= new makeurl().geturl();
			box.addChild(url);
		}
		
	}
	
	
	
}
function makeurl(){
	
	var url=Edo.create(
           	    {	type : 'formitem',label : '输入操作url:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',width : 200,id : 'url',text:cell.processurl,onclick: function(e){new getUrlWin()}}]
           	    }
		);
	this.geturl=function(){
		return url;
	}
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
