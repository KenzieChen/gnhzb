function createSMLEdit_check(){
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
		var smleditclassificationtreeid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'smleditclassificationtreeid'){
				isexist=true;
				smleditclassificationtreeid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:smleditclassificationtreeid});
			console.log(data);
			if(data.isSuccess == '1'){
				SMLEditTree_check.set('data',data.result);;
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	if(!Edo.get('SMLEdit_check_window')){
		var CodeClassChoose_check = Edo.create({
			type:'panel',
			title:'分类结构',
			height:'100%',
			width:'250',
			padding:[0,0,0,0],
			layout:'vertical',
			verticalGap:0,
			children:[
			   {
				   type:'tree',id:'SMLEditTree_check',width:'100%',height:'100%',autoColumns:true,horizontalLine:false,headerVisible:false,
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
								 var tableName=e.selected.code;
								 SMLEdit_ct_check.children[0].addChild(createSMLTable(tableName));
							 }
					   }			   
					},
					data:[{text:'请先选择结构所属分类'}]
			   }
			]
		});
		
		
		var smlEditCt_check =Edo.create({
			id:'SMLEdit_ct_check',
			type:'ct',
			height:'100%',
			width:'100%',
			layout:'vertical',
			verticalGap:0,
			enable:false,
			children:[
		          {
		        	type:'panel',title :'事物特性表编辑',layout:'vertical',verticalGap:0,width:'100%',height:'100%',padding:[0,0,0,0]
		          }
			]
		});
		
		Edo.create({
			id:'SMLEdit_check_window',
			type:'box',
//			title:'事物特性表编辑审批',
			height:'500',
			width:'900',
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
	        children:[CodeClassChoose_check,smlEditCt_check]
		})
	}


	function createSMLTable(tableName){
		if(Edo.get('SMLEdit_SMLTable_check')){
		   SMLEdit_SMLTable_check.destroy();
	    }
		var columnsData =cims201.utils.getData('sml/sml-table-field!getSmlTableField.action?tableName='+tableName);
		var columnChildren = new Array();
		columnChildren[0]={header:'id',dataIndex:'id',visible:false};
		columnChildren[1]={header:'partId',dataIndex:'partId',visible:false};
		for(var i=2;i<columnsData.length+2;i++){
			var columnData=columnsData[i-2];
			columnChildren[i] = {header:columnData.headShow+'(<span style="color:red;">'+columnData.tableHead+'</span>)',dataIndex:columnData.tableHead,headerAlign: 'center',align:'center'};
		}

		var table =new Edo.lists.Table();
		table.set('id','SMLEdit_SMLTable_check');
		table.set('width','100%');
		table.set('height','100%');
		table.set('autoColumns',true);
		table.set('showHeader',true);
		table.set('columns',columnChildren);
		table.set('enableCellSelect',true);
		
		
		Edo.util.Ajax.request({
		    url: 'sml/sml-table-field!checkSmlTableByTableName.action',
		    type: 'post',
		    params:{tableName:tableName},
		    onSuccess: function(text){
		    	if(text=='no'){
		    		SMLEdit_ct_check.set('enable',false);
		    		table.set('data',{});
		    	}else{
		    		SMLEdit_ct_check.set('enable',true);
		    		var tableData = cims201.utils.getData('sml/sml-table-field!getSmlTableByTableName.action?tableName='+tableName);
		    		table.set('data',tableData);
		    	}
		    },
		    onFail: function(code){
		        //code是网络交互错误码,如404,500之类
		        Edo.MessageBox.alert("提示", "操作失败"+code);
		    }
		});
		return table;
	}
	this.getBox=function(){
		return SMLEdit_check_window;
	}
//	var data = cims201.utils.getData('classificationtree/classification-tree!getClassStructById.action',{id:classficationTreeId});
//	SMLEditTree_check.set('data',data);
//	
//	SMLEdit_check_window.show('center','middle',true);
}
