var basepathh='/gnhzb';
var moduleid;
var cellcollection=new Array();
function getLCAprojectdefine(){
	var moduletree=new getcomponentmodelTree();
    Edo.util.Ajax.request({
    type: 'post',        
    url: basepathh+'/lca/lcamodule!getModuletree.action',
    params: {
        parentId: null,   //传递父节点的Name(也可以是ID)
        id:componentid,
        moduleid:moduleid
    },
    onSuccess: function(text){
       // alert(text);
        var data = Edo.util.Json.decode(text);
        Edo.get('moduletree').set('data', data);
    }
    
	});
    var toolbar=new getnextbar();
	var win=cims201.utils.getWin(400,400,'选择产品',[moduletree,toolbar]);
}
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
            	var r = Edo.get('componentmodelTree').getSelected();
             	var func=function(id){
             		
             	}
             	//如果没有选择产品类别，提示选择
             	if(Edo.get('componentmodelTree').getSelected()!=null){
             		var func=function(id){
             			projectobjectdefine.projectname=Edo.get('pjname').text;
             			projectobjectdefine.projectdetail=Edo.get('pjdetail').text;
             			projectobjectdefine.starttime=Edo.get('starttime').text;
             			projectobjectdefine.finishtime=Edo.get('finishtime').text;
             			var moduledata= cims201.utils.getData(basepathh+'/module/module!getModuletreebytype.action',{moduletype:'PDM',mpduleid:r.moduleid});
             		    Edo.get('moduletree').set('data',moduledata);
             	 	}
             		    var content=new getprojectdef();
             		    var toolbar=new gettoolbar(null,func);
             	 	    var win=cims201.utils.getWin(400,200,'填写项目信息',[content,toolbar]);
             		    win.show('center', 'middle', true);
				    this.parent.parent.parent.destroy();
             	}else{
             		alert('请选择产品类别！');
             	}
            
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
function getprojectdef(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
       	    //				           
       	    {	type : 'formitem',label : '项目名称:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjname'}]
       	    },
       	    {	type : 'formitem',label : '项目备注:',labelWidth : 150,labelAlign : 'right',
       	    children : [{type : 'text',width : 200,id : 'pjdetail'}]
       	    },
       	    {	type : 'formitem',label : '开始时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'starttime'}]
       	    },
       	    {	type : 'formitem',label : '结束时间:',labelWidth : 150,labelAlign : 'right',
           	    children : [{type : 'date',width : 200,id : 'finishtime'}]
       	    }
       	   
       	    ]
       	});
       	return content;
       	
       	}
function getcomponentmodelTree(){
    var moduletree = Edo.create({
	    type: 'tree',
        width: '100%',
        height: '100%',
        autoColumns:true,
        headerVisible: false,
        verticalLine:false,
        horizontalLine:false,
        id: 'moduletree',
        enabelCellSelect: false,
        autoColumns: true,
        enableDragDrop: true,
        showHeader: false,
        onbeforetoggle: function(e){
            var row = e.record;
            var dataTree = this.data;                        
            if(!row.children || row.children.length == 0){
                //显示树形节点的loading图标,表示正在加载
                this.addItemCls(row, 'tree-node-loading');
                Edo.util.Ajax.request({
                    //url: 'nodes.txt',
                    url: basepathh+'/lca/lcamodule!getModuletree.action',
                    params: {
                        componentid: row.id   //传递父节点的Name(也可以是ID)
                    },
                    defer: 200,
                    onSuccess: function(text){
                   // alert(text);
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
        columns:[
            {   
                enableDragDrop: true,
                dataIndex: "name"
            
            }
            ],
         data:moduledata
           
}); 
	    return componentmodelTree;
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