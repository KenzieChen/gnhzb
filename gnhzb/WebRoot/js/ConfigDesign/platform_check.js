function createPlatform_check(){
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
		var platformmanageid=null;
		var isexist=false;
		for(var i=0;i<outputparam.length;i++){
			if(outputparam[i].name == 'platformmanageid'){
				isexist=true;
				platformmanageid=outputparam[i].value;
				break;
			}
		}
		if(isexist){
			var data = cims201.utils.getData('platform/platform-manage!getPlatformById.action',{id:platformmanageid});
			console.log(data);
			if(data.isSuccess == '1'){
				platform_platTable_check.set('data',data.result);;
			}
			
			
			//Edo.MessageBox.alert("提示",data.message);
		}else{
			Edo.MessageBox.alert("提示","查询任务结果出错，请联系管理员！");
		}
	}
	
	if(!Edo.get("platform_check_window")){
		Edo.create({
			id:'platform_check_window',
			type:'BOX',
//			title:'平台类型审批',
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
    			    id: 'platform_platTable_check', type: 'table', width: '100%', height: '100%',autoColumns: true,
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
    					{dataIndex:'statusId',visible:false},
    			        { header: '平台名称', enableSort: true, dataIndex: 'platName', headerAlign: 'center',align: 'center'},
    			        //{ header: '搭建者', enableSort: true,dataIndex: 'inputUserName', headerAlign: 'center',align: 'center' },
    			        //{ header: '审核者', enableSort: true, dataIndex: 'checkUserName', headerAlign: 'center',align: 'center'},
    			        { header: '状态', enableSort: true, dataIndex: 'statusName', headerAlign: 'center',align: 'center',			        				        },
    			        { header: '平台描述', enableSort: true, dataIndex: 'info', headerAlign: 'center',align: 'center'},
    			        { header: '最后修改时间', enableSort: true, dataIndex: 'beginDate', headerAlign: 'center',align: 'center'}			      
    			    ]    			    
    			}
          ]
			
		});
	}
	this.getBox=function(){
		return platform_check_window;
	}
//	platform_platTable_check.set('data',
//			cims201.utils.getData('platform/platform-manage!getPlatformById.action',{id:platformId}));
//	platform_check_window.show('center','middle',true);
	
	
}