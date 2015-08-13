var basepathh='http://localhost:8080/gnhzb';
function getPDMprojectdefine(){
	var func=function(id){
		projectobject.projecttype='PDM';
		projectobject.projectname=Edo.get('pjname').text;
		projectobject.projectnote=Edo.get('pjdetail').text;
		projectobject.starttime=Edo.get('starttime').text;
		projectobject.finishtime=Edo.get('finishtime').text;
		savepdmproject();
 	}
	    var content=new getprojectdef();
	    var toolbar=new gettoolbar(null,func);
 	    var win=getmywin(400,200,'填写项目信息',[content,toolbar]);
	    win.show('center', 'middle', true);
		   
}

function getprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '项目名称:',width: '100%',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjname'}]
       	    },
       	    {	type : 'formitem',label : '项目备注:',width: '100%',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjdetail'}]
       	    },
       	    {	type : 'formitem',label : '开始时间:',width: '100%',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'starttime'}]
       	    },
       	    {	type : 'formitem',label : '结束时间:',width: '100%',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'finishtime'}]
       	    }
       	   
       	    ]
       	});
       	return content;
       	
       	}
function savepdmproject(){
   alert('sss')
   var alllevels=wholelevel.alllevels;
   if(alllevels.length==0){
	   
   }else{
       
	   var projectid= cims201.utils.getData(basepathh+'/project/project!saveproject.action',{projecttype:'Pdm',projectobjectdefine:projectobject
		});
   }
   var tasksdata={};
	for ( var j = 0; j < alllevels.length; j++) {
		var level = alllevels[j];
		var modules = level.levelmodules;
		if (modules.length == 0) {
			
		} else {
			for ( var i = 0; i < modules.length; i++) {
				if (modules[i].levelmoduleobject.type == 'process') {
					var cell = {};
					cell.processname = modules[i].levelmoduleobject.processname;
					cell.processnote = modules[i].levelmoduleobject.processnote;
					cell.id = modules[i].levelmoduleobject.cellid;
					cell.knowledge = modules[i].levelmoduleobject.knowledge;
//					cell.input = modules[i].levelmoduleobject.input;
//					cell.output = modules[i].levelmoduleobject.output;
//					cell.inputdescrip = modules[i].levelmoduleobject.inputdescrip;
//					cell.outputdescrip = modules[i].levelmoduleobject.outputdescrip;
					cell.Inparamlist = modules[i].levelmoduleobject.Inparamlist;
					cell.Outparamlist = modules[i].levelmoduleobject.Outparamlist;
					cell.parentmoduleid = modules[i].levelmoduleobject.parentmoduleid;
					cell.parentmodulename = modules[i].levelmoduleobject.parentmodulename;
					cell.moduleid = modules[i].levelmoduleobject.moduleid;
					cell.pdmmoduleid= modules[i].levelmoduleobject.pdmmoduleid;
					cell.prevmoduleid = modules[i].levelmoduleobject.prevmoduleid;
					cell.prevmodulename = modules[i].levelmoduleobject.prevmodulename;
					cell.nextmoduleid = modules[i].levelmoduleobject.nextmoduleid;
					cell.nextmodulename = modules[i].levelmoduleobject.nextmodulename;
					cell.tasktreenodeid = modules[i].levelmoduleobject.tasktreenodeid;
					
					cell.starttime= modules[i].levelmoduleobject.starttime;
		        	cell.finishtime= modules[i].levelmoduleobject.finishtime;
		            cell.processpersonid= modules[i].levelmoduleobject.processpersonid;
		            cell.processcheckpersonid= modules[i].levelmoduleobject.processcheckpersonid;
					cellcollection.push(cell);
				}
			}
		}
		
	}
	tasksdata.alltasks=cellcollection;
	var data = cims201.utils.getData(basepathh
			+ '/project/project!saveTasks.action', {tasksdata:tasksdata,projectid:projectid
	});
	if(data==null){
	  	alert('保存成功！');
	}
	cellcollection=new Array;
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
function gettaskdefinebox(cell){
	var level=wholelevel.getcurrentlevel();
    var modules=level.levelmodules;
    for(var i=0;i<modules.length;i++){
       if(modules[i].levelmoduleobject.cellid==cell.getId()){
    	   var levelmodule=modules[i];
        	var box=Edo.create(
        			{type: 'box',width: '100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',verticalGap:'10',
                   	    children: [
                   	    //				           
                   	    
                   	    {	type : 'formitem',label : '流程执行人:',width:'100%',labelWidth : 150,labelAlign : 'right',
                   	    children : [{type : 'text',width : 200,id : 'processpersonname',text:levelmodule.levelmoduleobject.processpersonname,onclick:function(e){getcarrier('carrier'); }},{type : 'text',width : 200,id : 'processpersonid',text:levelmodule.levelmoduleobject.processpersonid,visible:false}]
                   	    },
                   	    {	type : 'formitem',label : '流程审核人:',width:'100%',labelWidth : 150,labelAlign : 'right',
                       	    children : [{type : 'text',width : 200,id : 'processcheckpersonname',text:levelmodule.levelmoduleobject.processcheckpersonname,onclick:function(e){getcarrier('check'); }},{type : 'text',width : 200,id : 'processcheckpersonid',text:levelmodule.levelmoduleobject.processcheckpersonid,visible:false}]
                       	    },
                   	    {	type : 'formitem',label : '开始时间:',width:'100%',labelWidth : 150,labelAlign : 'right',
                       	    children : [{type : 'date',width : 200,id : 'starttime',text:levelmodule.levelmoduleobject.starttime}]
                   	    },
                   	    {	type : 'formitem',label : '结束时间:',width:'100%',labelWidth : 150,labelAlign : 'right',
                       	    children : [{type : 'date',width : 200,id : 'finishtime',text:levelmodule.levelmoduleobject.finishtime}]
                   	    }
                   	    ]}
        			);
        	var func=function(){
            	levelmodule.levelmoduleobject.starttime=Edo.get('starttime').text;
            	levelmodule.levelmoduleobject.finishtime=Edo.get('finishtime').text;
            	levelmodule.levelmoduleobject.processpersonid=Edo.get('processpersonid').text;
            	levelmodule.levelmoduleobject.processpersonname=Edo.get('processpersonname').text;
            	levelmodule.levelmoduleobject.processcheckpersonid=Edo.get('processcheckpersonid').text;
            	levelmodule.levelmoduleobject.processcheckpersonname=Edo.get('processpersonname').text;
            	var graph=editor.graph;
            	var label =  graph.convertValueToString(cell);
    		    var nodelabel =  label.slice(0,label.length);
    		    var newlabel = label.replace(nodelabel,
    		    		'<div style="margin:0px;padding:0px 0px 0px 0px;width:180px;height:100px;background:#00CCFF;opacity:100">'+
 						'<table style=" margin: auto;padding:0px 0px 0px 0px;width:180px;height:100px;">'+
 						 '<tr>'+
 	                    	' <td align="center">'+levelmodule.levelmoduleobject.processname+'<img src="img/check.png" />'+'</td>'+
 	                    '</tr>'+
 		                '</table>'+
 		                '</div>');
 
    	                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
    		           
            	}
               
        	var toolbar=new gettoolbar(null,func);
        	var winprocess=getmywin(400,200,'指定人员和时间',[box,toolbar]);
   		 	winprocess.show('center', 'middle', true);
   		 	break;
       }
    }
}

function refreshdata(dataTable,url,param,id){
    var data= cims201.utils.getData(url,param);
	dataTable.set('data',data);
}

function getcarrier(type)
{  
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
		var box=Edo.create(
		{type: 'box',width: '100%',layout: 'horizontal',padding:[0,0,0,0],border:[0,0,0,0],horizontalGap:'0',
		children:[
			{
			id:'dep',
			type: 'tree',		
	        width: 180,
	        height: 200,              	        
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
			id: 'emp', type: 'table', width: 270, height: 200,autoColumns: true,
			padding:[0,0,0,0],
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
			 {header:'用户姓名',dataIndex: 'name', width: '150',headerAlign: 'center',align: 'center'}
             ]
	   		}
		]})
    //bbl
    if(type=='carrier'){
    	var func=function(){
       	    
        	var row=Edo.get('emp').getSelected();
            Edo.get('processpersonname').set('text',row.name);
            Edo.get('processpersonid').set('text',row.id);
           }
    	
    }if(type=='check'){
    	var func=function(){
       	    
        	var row=Edo.get('emp').getSelected();
            Edo.get('processcheckpersonname').set('text',row.name);
            Edo.get('processcheckpersonid').set('text',row.id);
           }
    	
    }
   
    var toolbar=new gettoolbar(null,func);
    var winfm=getmywin(450,260,'选择人员',[box,toolbar]);
    winfm.show('center', 'middle', true);
}