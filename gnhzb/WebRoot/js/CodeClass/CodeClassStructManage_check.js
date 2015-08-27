function createCodeClassStructManage_check(){
	var inputparam=new Array();
	var outputparam=new Array();
	this.initinputparam=function(param){
		inputparam=param;
		return inputparam;
	}
	this.initresultparam=function(param){
		outputparam=param;
		return outputparam;
		
	}
	this.submitResult=function(){
		return outputparam;
	}
	this.inittask=function(){
		var codeclassstructmanageclassificationtreeid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'codeclassstructmanageclassificationtreeid'){
				isexist=true;
				codeclassstructmanageclassificationtreeid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:codeclassstructmanageclassificationtreeid});
			console.log(data);
			if(data.isSuccess == '1'){
				FljgTree_check.set('data',data.result);;
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	
//	var fljgTreeData =cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});

	if(!Edo.get('CodeClassStructManage_check_window')){
		var FljgPanel_check = Edo.create({		
            type: 'panel',
            title:'分类结构',
            width: '100%',
            height: '100%',
            padding:[0,0,0,0],
            layout:'vertical',
            verticalGap :0,
            children:[
            	{
            		type:'tree',
            		id:'FljgTree_check',
            		horizontalLine : false,
                 	headerVisible :false,
                 	autoColumns :true,
            		cls: 'e-tree-allow',
            		width:'100%',
            		height:'100%',
            		columns:[
            			{header:'分类结构',dataIndex:'text'}
            		],
            		onselectionchange:function(e){
//            			console.log(e);            点击展开时调用了两次，为什么？
            			if(e.selected){
            				FlmclForm_check.setForm(e.selected);
            			}else{
            			}
            			
         			},
            		onbeforetoggle: function(e){            			
                 		var row = e.record;
			            var dataTree = this.data;
			            if(!row.children || row.children.length == 0){
			                //this.addItemCls(row, 'tree-node-loading');
			                Edo.util.Ajax.request({
			                    url: 'classificationtree/classification-tree!getChildrenNode.action?pid='+ row.id,
			                    //defer: 500,
			                    onSuccess: function(text){
			                        var data = Edo.util.Json.decode(text);			                        
			                        dataTree.beginChange();
			                        if(!(data instanceof Array)) data = [data]; //必定是数组
			                        for(var i=0;i<data.length;i++){
			                        	if(data[i].leaf==0){
			                        		data[i].__viewicon=true,
								    		data[i].icon='e-tree-folder',
								    		data[i].expanded=false;		
			                        	}else{
			                        		data[i].icon='ui-module';
			                        	}
			                        	dataTree.insert(i, data[i], row);
			                        };                    
			                        dataTree.endChange();    
			                    }
			                });
			            }
			            return !!row.children;
                 	}
            	}
            ]
	});
		
		//分类明细栏
		var FlmclForm_check = Edo.create({             
	            type: 'ct',
	            width: '220',
	            height: '100%',
	            collapseProperty: 'width',
	            enableCollapse: true,
	            splitRegion: 'east',
	            splitPlace: 'before',
	            children: [
	                {
	                    type: 'panel',
	                    id:'FlmclForm_check',
	                    title:'分类明细栏',
	                    width: '100%',
	                    height: '100%',
	                    layout:'vertical',
	                    padding:[0,0,0,0],
	                    children:[
			            	{type:'label',text:'&nbsp&nbsp&nbsp分类名称：'},
			            	{type: 'formitem',labelWidth:0,padding:[0,0,0,16],children: [
				                {name: 'text', type: 'text',width:180}
				            ]},
				            {type:'label',text:'&nbsp&nbsp&nbsp分类码：'},
				            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
				                {name: 'code', type: 'text',width:180}
				            ]},
				            {type:'label',text:'&nbsp&nbsp&nbsp所属大类代号：'},
				            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
				                {name: 'classCode', type: 'text',width:180}
				            ]},
				             {type:'label',text:'&nbsp&nbsp&nbsp分类信息：'},
				            {type: 'formitem',labelWidth:0,padding:[0,0,0,16], children: [
				                {name: 'classDes', type: 'textarea',width: 180, height: 120}
				            ]}
	                    ]      
	                }
	            ]
		});
		
		Edo.create({
			id:'CodeClassStructManage_check_window',
			type:'box',
//			title:'产品结构审批',
			height:'400',
			width:'600',
			padding:[0,0,0,0],
//			titlebar:[
//	            {
//	                cls: 'e-titlebar-close',
//	                onclick: function(e){
//	                    this.parent.owner.hide();       //hide方法
//	                }
//	            }
//	        ],
	        layout:'horizontal',
	        children:[FljgPanel_check,FlmclForm_check]
		})
	}
	this.getBox=function(){
		return CodeClassStructManage_check_window;
	}
//	FljgTree_check.set('data',fljgTreeData);
//	
//	CodeClassStructManage_check_window.show('center','middle',true);

}