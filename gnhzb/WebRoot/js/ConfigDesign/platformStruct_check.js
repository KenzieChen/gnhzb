function createPlatformStruct_check(){
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
		var platformstructplatformstructtreeid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'platformstructplatformstructtreeid'){
				isexist=true;
				platformstructplatformstructtreeid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('platform/plat-struct-tree!getPlatStructById.action',{id:platformstructplatformstructtreeid});
			console.log(data);
			if(data.isSuccess == '1'){
				if(data.result[0].leaf==0){
					data.result[0].__viewicon=true;
					data.result[0].expanded=false;
					data.result[0].icon='e-tree-folder';
				}else{
					data.result[0].icon='e-tree-folder';
				}
				
				platformStruct_gridtree_check.set("data",data.result);
				
				
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	

	if(!Edo.get("platformStruct_check_window")){
		Edo.create({
			id:'platformStruct_check_window',
			type:'box',
//			title:'平台结构审批',
			width:'100%',
			height:'100%',
//            titlebar: [
//                {                  
//                    cls:'e-titlebar-close',
//                    onclick: function(e){
//                        this.parent.owner.destroy();
//                    } 
//                }
//            ],
            layout:'vertical',
            verticalGap:0,
            padding:0,
            children:[
        		{
				    id: 'platformStruct_gridtree_check', type: 'tree', width: '100%', height: '100%',autoColumns: true,
				    horizontalLine : false,verticalLine : false,
				    padding:[0,0,0,0],rowSelectMode : 'single',
				    columns:[
				        {dataIndex:'id',visible:false},
				        { header: '模块名称', dataIndex: 'classText', headerAlign: 'center',align: 'center'},
				        { header: '模块编码', dataIndex: 'classCode', headerAlign: 'center',align: 'center' },
				        { header: '实例个数', dataIndex: 'partsCount', headerAlign: 'center',align: 'center'},
				        { header: '是否唯一值', dataIndex: 'onlyone', headerAlign: 'center',align: 'center',
				        	renderer:function(value,record){
				        		if(record.classCode==null){
				        			return "";
				        		}
				        		if(value==1){
				        			return '<span style="color:blue">是</span>';
				        		}else{
				        			return '<span style="color:red">否</span>';
				        		}
				        }},
				        { header: '是否必选项', enableSort: true, dataIndex: 'ismust', headerAlign: 'center',align: 'center',
				        	renderer:function(value,record){
				        		if(record.classCode==null){
				        			return "";
				        		}
				        		if(value==1){
				        			return '<span style="color:blue">是</span>';
				        		}else{
				        			return '<span style="color:red">否</span>';
				        		}
				        	}}			        		      
				    ],
					onbeforetoggle: function(e){            			
						var row = e.record;
					    var dataTree = this.data;
					    if(!row.children || row.children.length == 0){
					        //this.addItemCls(row, 'tree-node-loading');
					        Edo.util.Ajax.request({
					            url: 'platform/plat-struct-tree!getChildrenNode.action?pid='+ row.id,
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
	}
	this.getBox=function(){
		return platformStruct_check_window;
	}
//	var data = cims201.utils.getData('platform/plat-struct-tree!getPlatStructById.action',{id:platStructId});
//	if(data[0].leaf==0){
//		data[0].__viewicon=true;
//		data[0].expanded=false;
//		data[0].icon='e-tree-folder';
//	}else{
//		data[0].icon='e-tree-folder';
//	}
//	
//	platformStruct_gridtree_check.set("data",data);
//	platformStruct_check_window.show('center','middle',true);
	
}