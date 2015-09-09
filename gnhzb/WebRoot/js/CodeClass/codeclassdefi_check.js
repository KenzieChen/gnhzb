function createCodeClassDefi_check(){
	if(!Edo.get('createCodeClassDefi_check_Window')){
		Edo.create({
			type:'box',
			id:'createCodeClassDefi_check_Window',
//			title:'产品分类定义审批',
//			titlebar:[
//	            {
//	                cls: 'e-titlebar-close',
//	                onclick: function(e){
//	                    this.parent.owner.hide();       //hide方法
//	                }
//	            }
//	        ],
	        padding:[0,0,0,0],
	        height:'100%',
	        width:'100%',
	        children:[{
			    id: 'codeclassdefiTb_check', type: 'table', width: '100%', height: '100%',autoColumns: true,
			    padding:[0,0,0,0],
			    rowSelectMode : 'single',
			    columns:[
			    	{
	                    headerText: '',
	                    align: 'center',
	                    width: 10,                        
	                    enableSort: false,
	                    enableDragDrop: true,
	                    enableColumnDragDrop: false,
	                    style:  'cursor:move;',
	                    renderer: function(v, r, c, i, data, t){
	                        return i+1;
	                	}
	                },
	                Edo.lists.Table.createMultiColumn(),
			    	{ dataIndex: 'id',visible : false},
			        { header: '类型名称', dataIndex: 'classname', headerAlign: 'center',align: 'center'},
			        { header: '类型代号', dataIndex: 'classcode', headerAlign: 'center',align: 'center' },
			        { header: '分类结构', dataIndex: 'flag', headerAlign: 'center',align: 'center',
			          renderer: function(val){
						    var text;
							if (val > 0) {
								text = "已建立分类结构";
								return '<span style="color:green;">' + text + '</span>';
							} else {
								text = "未建立分类结构";
								return '<span style="color:red;">' + text + '</span>';
							}
							return val;
			          }
			        },
			        { header: '码首字段', dataIndex: 'rule', headerAlign: 'center',align: 'center',
			        	renderer:function codeHead(val) {	
							var text = val.split("-");
							return text[0]; 
						}
			        }
			    ]    
	        }]
		});
	}
	this.getBox=function(){
		return createCodeClassDefi_check_Window;
	}
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
		var codeClassId=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'codeclassid'){
				isexist=true;
				codeClassId=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('codeclass/code-class!findById.action',{id:codeClassId});
			console.log(data);
			if(data.isSuccess == '1'){
				codeclassdefiTb_check.set('data',data.result);
			}
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
		//createCodeClassDefi_check_Window.show('center', 'middle', true);
	}
    
}