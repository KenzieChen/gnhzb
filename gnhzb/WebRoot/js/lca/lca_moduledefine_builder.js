var basepathh='/gnhzb';
function lcaProcessDefine(cell,graph){
	var box=Edo.create(
			{type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [30,0,0,0],layout: 'vertical',
           	    children: [
           	    /*{type : 'formitem',label : '流程名称:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'text',width : 200,id : 'processname',text:cell.processname}]
           	    },*/
           	    /*{type : 'formitem',label : '流程信息填写人:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'text',width : 200,id : 'processperson',text:cell.processperson,onclick:function(e){getcarrier(); }},{type : 'text',width : 200,id : 'processpersonid',visible:false}]
           	    },*/
           	    {type : 'formitem',label : '执行阶段:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'text',width : 200,id : 'stage',text:cell.stagename,enable:false}]
           	    },
           	    {type : 'formitem',label : '流程信息填写人:',labelWidth : 150,labelAlign : 'right',
               	    children : [{type : 'button',id:'assignbtn',width : 200,text:'指定',onclick:function(e){getcarrierdiffer(cell); }}]
           	    }
    			]
				});
			//bbl
	        if(cell.isedit){
	        	assignbtn.set('text','更改');
	        }
			var func=function(){
            	/*var processname=Edo.get('processname').text;
            	var stage=Edo.get('stage').text;
            	var processperson=Edo.get('processperson').text;
            	cell.processperson=processperson;
            	cell.processname=processname;*/
	            var label =  graph.convertValueToString(cell);
    		    var nodelabel =  label.slice(0,label.length);
    		    var newlabel = label.replace(nodelabel,
    		    '<div style="margin:0px;padding:30px 0px 0px 0px;width:100px;background:#00CCFF;height:60px;opacity:100">'+
					'<table style=" margin: auto;padding:0px 0px 0px 0px;">'+
		                '<tr>'+
		                    ' <td align="center">'+'已指定执行人'+'</td>'+
		                '</tr>'+
		                '<tr>'+
	                    	' <td align="center">'+cell.stagename+'阶段'+'</td>'+
	                    '</tr>'+
		                '</table>'+
		                '</div>');
		                 graph.labelChanged(cell,newlabel,mxEvent.LABEL_CHANGED);
			           }
		    var toolbar=new gettoolbar(null,func);
			var winprocess=cims201.utils.getWin(400,200,'填写流程信息',[box,toolbar]);
			winprocess.show('center', 'middle', true);
}
function gettoolbar(id,func){
    var toolbar = Edo.create(
    {type: 'ct',
    cls: 'e-dialog-toolbar',
    width: '100%',
    layout: 'horizontal',
    height: 40,
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
		{type: 'box',width: 600,height:200,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
		children:[
          	{type: 'panel',title:'部门列表',width: 200,height:200,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
          		children:[
				{
				id:'dep',
				type: 'tree',		
		        width: 200,
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
		       	}]
          	},
        	{type: 'panel',title:'人员列表',width: 380,height:200,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
          		children:[
			   		{
					id: 'emp', type: 'table', width: 380, height: 200,
					border: [0,0,0,0],padding: [0,0,0,0],
				    rowSelectMode : 'single',
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
					 {header:'用户序号',dataIndex: 'id', headerAlign: 'center',align: 'center'},
					 {header:'用户姓名',dataIndex: 'name',headerAlign: 'center',align: 'center'}
		             ]
			   		}]
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
function getcarrierdiffer(cell)
{       
		var box=Edo.create(
				
		{type: 'box',width: 800,height:340,layout: 'horizontal',border: [0,0,0,0],padding: [0,0,0,0],
		children:[
			{type: 'panel',title:'在建零部件列表',width: 280,height:'100%',layout: 'horizontal',border: [1,1,1,1],padding: [0,0,0,0],
					children:[
						{
						id: 'comp', type: 'table', width: 280, height: '100%',
						border: [0,0,0,0],padding: [0,0,0,0],
					    rowSelectMode : 'multi',
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
						 {header:'名称',dataIndex: 'name', headerAlign: 'center',width:120,align: 'center'},
						 {header:'指定人',dataIndex: 'processperson',headerAlign: 'center',width:150,align: 'center'}
			             ]
				   		}]
	   		},
	   		{type: 'panel',title:'部门列表',width: 200,height: '100%',layout: 'horizontal',border: [1,1,1,1],padding: [0,0,0,0],
          		children:[
					{
					id:'dep',
					type: 'tree',		
			        width: 200,
			        height: '100%',             	        
			        headerVisible: false,
			        autoColumns: true,
			        horizontalLine: false,
			        columns: [{header: '部门',dataIndex: 'name'}],
			        onselectionchange: function(e){	
			            var data= cims201.utils.getData(basepathh+'/department/department!getEmployeeByDepartment.action',{id:e.selected.id});
			            emp.set("data",data)
			        },
					data:depdataTable
			       	}]
	   		},
	       	{type: 'panel',title:'人员列表',width: 280,height: '100%',layout: 'vertical',border: [1,1,1,1],padding: [0,0,0,0],verticalGap:'0',
	    		children:[
			          {
			  			type: 'group',
			  		    layout: 'horizontal',
			  		    cls: 'e-toolbar',
			  		    children: [
							{
							    type: 'button',
							    text: '指定人员',
							    onclick: function(e){
							    	var rows=Edo.get('comp').getSelecteds();
							    	var r1=Edo.get('emp').getSelected();
							    	for(var i=0;i<rows.length;i++){
							    		comp.data.update(rows[i], 'processperson', r1.name);
							    		comp.data.update(rows[i], 'processpersonid', r1.id);
							    		comp.data.update(rows[i], 'isassigned', true);
							    	}
							    	
							    	var a=comp.data.each(function(o){
						                if(o.processperson==null) return false;
						            },comp);
							    	if(a==false){
							    		
							    	}else{
							    		okbtn.set('enable',true);
							    		moduleobject.issaved=false;
							    	}
							    }
							}]
			          },
	    		          
			   		{
					id: 'emp', type: 'table', width: 280, height:'100%',
					border: [0,0,0,0],padding: [0,0,0,0],
				    rowSelectMode : 'single',
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
					 {header:'人员序号',dataIndex: 'id', headerAlign: 'center',width:120,align: 'center'},
					 {header:'人员姓名',dataIndex: 'name',headerAlign: 'center',width:150,align: 'center'}
		             ]
			   		}]
	       	}
		]})
    //bbl
		var func=function(){
			cell.isedit=true;
			assignbtn.set('text','更改');
   	
    	/*var row=Edo.get('emp').getSelected();
        Edo.get('processperson').set('text',row.name);
        Edo.get('processpersonid').set('text',row.id);*/
       }
		var toolbar=new gettoolbar(null,func);
		var okbtn=toolbar.getChildAt(0);
		if(!cell.isedit||cell.isedit==undefined){
			moduleobject[cell.stage]={};
			moduleobject[cell.stage].components=new Array();
			var proto=moduleobject.components;
			for (var j=0;j<proto.length;j++){
				var a={};
				for(var p in proto[j]){
					  a[p]=proto[j][p];
					 }
				moduleobject[cell.stage].components.push(a);
			}
			okbtn.set('enable',false);
		}
		comp.set('data',moduleobject[cell.stage].components);
    var winfm=cims201.utils.getWin(800,400,'选择人员',[box,toolbar]);
    winfm.show('center', 'middle', true);
}