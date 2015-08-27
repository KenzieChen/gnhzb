function createCodeClassRuleManage_check(){
	
//	var ruleData = cims201.utils.getData('classificationtree/classification-tree!getRuleByClassificationTreeId.action',{id:codeClassId});
//	var ruleObj =  Edo.util.JSON.decode(ruleData.rule);
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
		var codeclassrulemanagecodeclassid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'codeclassrulemanagecodeclassid'){
				isexist=true;
				codeclassrulemanagecodeclassid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('codeclass/code-class!getRuleByCodeClassId.action',{id:codeclassrulemanagecodeclassid});
			console.log(data);
			if(data.isSuccess == '1'){
				var ruleObj =  Edo.util.JSON.decode(data.result.rule);
				CodeClassRuleManageTree_check.set("data",ruleObj);
			}
			Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	if(!Edo.get('CodeClassRuleManageTree_check_window')){
		Edo.create({
			id:'CodeClassRuleManageTree_check_window',
			type:'box',
			height:'300',
			width:'500',
//			title:ruleData.className+"的规则审批",
			padding:[0,0,0,0],
//			titlebar:[
//	            {
//	                cls: 'e-titlebar-close',
//	                onclick: function(e){
//	                    this.parent.owner.hide();       //hide方法
//	                }
//	            }
//	        ],
			children:[{
				type:'tree',id:'CodeClassRuleManageTree_check',width:'100%',height:'100%',
				headerVisible:false,
			    autoColumns: true,
			    horizontalLine: false,
				columns: [
			        {
			            dataIndex: 'text'
			        }
			    ],
			    //data:[{'text':'分类码 首字段：T','value':'0:T'},{'text':'分类码 第【1】层 字符型，长度：5','value':'1:C5'},{'text':'分类码 第【2】层 字符型，长度：5','value':'2:C5'},{'text':'分类码 第【3】层 字符型，长度：5','value':'3:C5'}]
			    //data:ruleObj
			}]
		});
	}
	
	this.getBox=function(){
		return CodeClassRuleManageTree_check_window;
	}
	
//	CodeClassRuleManageTree_check_window.show('center', 'middle', true);
}