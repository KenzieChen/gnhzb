var basepathh='/gnhzb';
function showfunctiontable(){
	var data= cims201.utils.getData(basepathh+'/function/function!getfunctiondatartee.action',{});
	var dataTree = new Edo.data.DataTree(data);
	var tree = new Edo.lists.Tree();
	tree.set({
	    cls: 'e-tree-allow',
	    style: 'cursor:pointer;',
	    width: 300,
	    height: 200,
	    autoColumns: true,    
	    cellEditAction: 'celldblclick',
	    columns: [
	        {
	            header: '名称',
	            dataIndex: 'name',
	            renderer: function(v, r){
	                return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';
	                
//	                if(r.children && r.children.length > 0){
//	                    return '<div class="e-tree-checkbox"><div class="e-tree-check-icon  '+(r.checked ? 'e-table-checked' : '')+'"></div>'+v+'</div>';
//	                }else{
//	                    return v
//	                }
	            },
	            editor: {
	                type: 'text'
	            }
	        },
	        {
	            header: '类型',
	            dataIndex: 'type',
	            editor: {
	                type: 'text'
	            }
	        }
	    ]
	});

	function setTreeSelect(sels, checked, deepSelect){//deepSelect:是否深度跟随选择
	    //多选
	    if(!Edo.isArray(sels)) sels = [sels];
	    tree.data.beginChange();
	    for(var i=0,l=sels.length; i<l; i++){
	        var r = sels[i];        
	        var cs = r.children;        
	        if(deepSelect){
	            tree.data.iterateChildren(r, function(o){
	                this.data.update(o, 'checked', checked);
	            },tree);
	        }
	        tree.data.update(r, 'checked', checked);
	    }
	    tree.data.endChange();

	    //单选
//	    if(!Edo.isArray(sels)) sels = [sels];
//	    tree.data.beginChange();
//	    tree.data.source.each(function(o){                
//	        this.data.update(o, 'checked', false);
//	    },tree);
	    
	    
//	    sels.each(function(o){
//	        if(o.children && o.children.length > 0){    //只有父任务才可以选中
//	            this.data.update(o, 'checked', checked);
//	        }
//	    },tree);
	    
//	    tree.data.endChange();
	}
	

	//增加功能: 1.选择行任意部分, 都对节点进行折叠操作; 2.节点列显示一个手型,参考本页面的e-tree-treecolumn样式定义
	tree.on('bodymousedown', function(e){
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

	tree.set('data', dataTree);
	
	this.getfunctiontable=function(){
		return tree;
	}
	
	
}
function getTreeSelect(tree){
    var sels = [];
    tree.data.source.each(function(node){        
        if(node.checked) sels.add(node);
    });
    return sels;
}