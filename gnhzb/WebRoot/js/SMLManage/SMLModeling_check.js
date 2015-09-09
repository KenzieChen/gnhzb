function createSMLModeling_check(){
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
		var smlmodelingclassificationtreeid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'smlmodelingclassificationtreeid'){
				isexist=true;
				smlmodelingclassificationtreeid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:smlmodelingclassificationtreeid});
			console.log(data);
			if(data.isSuccess == '1'){
				for(var i=0;i<data.result.length;i++){
					data.result[i].__viewicon=true;
					data.result[i].expanded=false;
					data.result[i].icon='e-tree-folder';
				}
				
				SMLModelingTree_check.set('data',data.result);
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	
	if(!Edo.get("SMLModeling_check_window")){
		
		var CodeClassChoose_check = Edo.create({
			type:'panel',
			title:'分类结构 ',
			height:'100%',
			width:'250',
			padding:[0,0,0,0],
			layout:'vertical',
			verticalGap:0,
			children:[
			   {
				   type:'tree',id:'SMLModelingTree_check',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
				   columns:[{dataIndex:'text'}],
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
	           		},
				   onselectionchange:function(e){
					 if(e.selected){
						 if(e.selected.code){
							 var tableName =e.selected.code;
							 Edo.util.Ajax.request({
							    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
							    type: 'post',
							    params:{tableName:tableName},
							    onSuccess: function(text){
							    	if(text=='no'){
							    		SMLModeling_ct.set('enable',false);
							    		SMLModeling_SMLTableField.set('data',{});
							    	}else{
							    		SMLModeling_ct_check.set('enable',true);
							    		SMLModeling_SMLTableField_check.set('data',cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName));
							    	}
							    },
							    onFail: function(code){
							        //code是网络交互错误码,如404,500之类
							        Edo.MessageBox.alert("提示", "操作失败"+code);
							    }
							});
						 }
					 } 
				}
			   }
			]
		});


		
		var smlModeling_check =Edo.create({
			id:'SMLModeling_ct_check',
			type:'ct',
			height:'100%',
			width:'100%',
			layout:'vertical',
			verticalGap:0,
			enable:false,
			children:[
		          {
		        	type:'panel',title :'事物特性',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0],
		        	children:[
			           {
			        	   id:'SMLModeling_SMLTableField_check',type:'table',width: '100%',height: '100%',autoColumns: true,showHeader: true,
			        	   columns:[
			        	        {dataIndex:'id',visible:false},
		        	            {header:'名称',dataIndex:'headShow',headerAlign: 'center',align:'center'},
		        	            {header:'英文名称',dataIndex:'tableHead',headerAlign: 'center',align:'center'},
		        	            {header:'输出项',dataIndex:'output',headerAlign: 'center',align:'center',
		        	            	renderer:function(v){
		        	            		if(v==0){
		        	            			return '<span style="color :red;">否</span>';
		        	            		}else{
		        	            			return '<span style="color :blue;">是</span>';
		        	            		};
		        	            	}
		        	            }
			        	   ]
			           }
		        	]
		          }
			]
		});
		
		Edo.create({
			id:'SMLModeling_check_window',
			type:'box',
//			title:'事物特性表建模审批',
			height:'100%',
			width:'100%',
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
	        children:[CodeClassChoose_check,smlModeling_check]
		})
		
	}
	this.getBox=function(){
		return SMLModeling_check_window;
	}
//	var data = cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});
//	SMLModelingTree_check.set('data',data);
//	SMLModeling_check_window.show('center','middle',true);

}
