var basepathh='/gnhzb';
function getcomponentmodelTree(){
    var componentmodelTree = Edo.create({
             
	        type: 'tree',
	        width: '100%',
	        height: '100%',
	        autoColumns:true,
	        headerVisible: false,
	        verticalLine:false,
	        horizontalLine:false,
	        id: 'componentmodelTree',
	        onbodymousedown: function(e){
	        	var r = this.getSelected();
	        },
	        onbeforetoggle: function(e){
	            var row = e.record;
	            var dataTree = this.data;                        
	            if(!row.children || row.children.length == 0){
	                //显示树形节点的loading图标,表示正在加载
	                this.addItemCls(row, 'tree-node-loading');
	                Edo.util.Ajax.request({
	                    //url: 'nodes.txt',
	                    url: basepathh+'/lca/lcamodule!getmoduleComponentsList.action',
	                    params: {
	                    	moduleid:row.moduleid,
	                        parentId: row.id   //传递父节点的Name(也可以是ID)
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
	        //verticalLine: false,
	        
	        //data: tree,
	        enabelCellSelect: false,
	        autoColumns: true,
	        enableDragDrop: true,
	        showHeader: false,
	        columns:[
	            {   
	                enableDragDrop: true,
	                dataIndex: "name"
	            }
	        ]
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
