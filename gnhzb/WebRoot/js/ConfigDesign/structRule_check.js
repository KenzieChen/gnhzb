function createStructRule_check(){
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
		var structruleplatstructtreeid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'structruleplatstructtreeid'){
				isexist=true;
				structruleplatstructtreeid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('platform/plat-struct-tree!getPlatStructById.action',{id:structruleplatstructtreeid});
			console.log(data);
			if(data.isSuccess == '1'){
				if(data.result[0].leaf==0){
					data.result[0].__viewicon=true;
					data.result[0].expanded=false;
					data.result[0].icon='e-tree-folder';
				}else{
					data.result[0].icon='e-tree-folder';
				}
				
				structRule_structTree_check.set("data",data.result);
				
				
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	if(!Edo.get("structRule_check_window")){
		var structPanel_check = Edo.create({
			 type: 'ct',
	         width: '220',
	         height: '100%',
	         collapseProperty: 'width',
	         enableCollapse: true,
	         splitRegion: 'west',
	         splitPlace: 'after',
	         children: [
	            {
					type: 'panel', id:'', title:'平台主结构', padding: [0,0,0,0],
					width:'100%', height:'100%',verticalGap:0,
					titlebar:[
						{
					    	cls:'e-titlebar-toggle-west',
					        icon: 'button',
					        onclick: function(e){
					            this.parent.owner.parent.toggle();
					        }
						}
					],
					children:[
					      {
					    	  id:'structRule_structTree_check',type:'tree',width:'100%',height:'100%',
					    	  autoColumns:true,horizontalLine : false,verticalLine : false,headerVisible:false,
					    	  columns:[
					    	      {dataIndex:'classText',align: 'center'}
					    	  ],
					    	  onselectionchange:function(e){
					    		  //点击展开时候，调用了两次，第二次结果是undefine
					    		  if(!!e.selected){
					    			  //如果没有moduleId，则是根节点，没有规则
					    			  if(!!e.selected.moduleId){
					    				  var data = {platStructId:e.selected.id,moduleClassId:e.selected.moduleId};
							    		  structRule_partRuleTable_check.set('data',cims201.utils.getData('platform/plat-struct-confi-rule!getAllRuleByClass.action',data));
					    			  }else{
					    				  structRule_partRuleTable_check.set('data',{});
					    			  }
					    		  }
					    	  },
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
	            }
	         ]	
		});
		var structRulePanel_check = Edo.create({
			type: 'panel', id:'', title:'<h3><font color="blue">配置规则查看</font></h3>', padding: [0,0,0,0],
			width:'100%', height:'100%', verticalGap: 0,
			children:[
		      		{
					    id: 'structRule_partRuleTable_check', type: 'table', width: '100%', height: '100%',autoColumns: true,
					    padding:[0,0,0,0],rowSelectMode : 'single',
					    columns:[
					    	{
							    headerText: '',
							    align: 'center',
							    width: 10,                        
							    enableSort: true,
							    renderer: function(v, r, c, i, data, t){
							        return i+1;
								}
							},
							{dataIndex:'id',visible:false},
					        { header: '零件名称', enableSort: true, dataIndex: 'partname', headerAlign: 'center',align: 'center'},
					        { header: '零件编码', enableSort: true,dataIndex: 'partnumber', headerAlign: 'center',align: 'center' },
					        { header: '必选项', enableSort: true, dataIndex: 'and', headerAlign: 'center',align: 'center'},
					        { header: '可选项', enableSort: true, dataIndex: 'or', headerAlign: 'center',align: 'center'},
					        { header: '排除项', enableSort: true, dataIndex: 'not', headerAlign: 'center',align: 'center'},				        			      
					    ]
		        	}
		   ]
		});
		
		Edo.create({
			id:'structRule_check_window',
			type:'box',
//			title:'平台规则审批',
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
            layout:'horizontal',
            verticalGap:0,
            padding:0,
            children:[
        		structPanel_check,structRulePanel_check
          ]
			
		});
	}
	this.getBox=function(){
		return structRule_check_window;
	}
//	var data = cims201.utils.getData('platform/plat-struct-tree!getPlatStructById.action',{id:platStructId});
//	if(data[0].leaf==0){
//		data[0].__viewicon=true;
//		data[0].expanded=false;
//		data[0].icon='e-tree-folder';
//	}else{
//		data[0].icon='e-tree-folder';
//	}
//	structRule_structTree_check.set('data',data);
//	structRule_check_window.show('center','middle',true);
}