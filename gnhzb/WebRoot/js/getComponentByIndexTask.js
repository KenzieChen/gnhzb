//根据index创建某个组件
var unapprovalbox;
function getComponentByIndex(id,index,params){	
	var resultComponent={
			myComponent:null,
			realComponent:null
	};
	var myComponent = null;
	//知识检索的界面
	if('knowledgesearch' == index){
	
		    var existcomponent=	iscomponentexist(id,'knowledgesearch234');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	{
		
		var myTable1_rt = new createKnowledgeList_box();   
		var mySearchUI = new knowledgeSearchPanel(myTable1_rt);
		
		//添加回车事件
		//alert(mySearchUI.getId());
		enterEventList[enterEventList.length] = mySearchUI;
		enterEventIDList[enterEventIDList.length] = 'knowledgesearch';
	
		myComponent = Edo.create({
			id: id?id:'knowledgesearch234',   
		    type: 'box',                 
		    layout: 'vertical',  
		    //width: cims201.utils.getScreenSize().width*0.8,
		    width: '100%',
		    //collapseHeight: 700,
		    //height: 1200,  
		    //height: '100%',
		    border:[0,0,0,0],
		    padding: [0,22,0,12],
		    children: [
		    	mySearchUI.getSearchUI(),
		    	myTable1_rt.getKnowledgeList()
		    ]
		});
		}
	//知识检索的界面
	}else if('knowledgelist' == index){
	 var existcomponent=	iscomponentexist(id,'knowledgelist234');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		
		var myTable1_rt = new createKnowledgeList_box;   			
		myTable1_rt.search({formvalue:params['formvalue']},'knowledge/knowledge!ksearch.action');
		
		myComponent = Edo.create({
		    id: id?id:'knowledgelist234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        myTable1_rt.getKnowledgeList()
		    ]
		});}
	}else if('knowledgeview' == index){
	
	    var existcomponent=	iscomponentexist(id,'knowledgeview234');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	
		{	
		var myId = params['knowledgeID'];
		var borrowflowid= params['borrowFlowId'];
	
		if(myId != null && myId != 'null' && myId != ''){			
  	    var mk = new createKnowledgeView(myId,borrowflowid).getKnowledgeView();
  			if(mk!='error'){
	  		myComponent = Edo.create({  
	  		    id: id?id:'knowledgeview234',  
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //width: cims201.utils.getScreenSize().width-20,
			    //height: 1200,  
			    border: [0,0,0,0], 
		    	padding: [0,22,0,12], 
			    children: [
			        mk
			    ]
			});}
		 	else
  		{
  		myComponent="error";
  		
  		}	
		}	
			
  		
 
  		
  		}
	}else if('knowledgesearchindex' == index){
		//知识搜索简约界面
	    var existcomponent=iscomponentexist(id,'knowledgesearchindex');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		var mySearchIndex = new createKnowledgeSearchIndex();
		
		//添加回车事件
		//alert(mySearchUI.getId());
		enterEventList[enterEventList.length] = mySearchIndex;
		enterEventIDList[enterEventIDList.length] = 'knowledgesearchindex';
		
	
		myComponent = Edo.create({  
  		    id: id?id:'knowledgesearch_index234',  
		    type: 'box',                 
		    layout: 'vertical',  
		  //  bodyStyle :'background-color: #000000;',
		    width: '100%',
		    //width: cims201.utils.getScreenSize().width-20,
		    //height: 1200,  
		    border: [0,0,0,0], 
	    	padding: [0,22,0,12], 
		    children: [
		        mySearchIndex.getSearchIndex()
		    ]
		});
		}
	}else if('knowledgelist_fulltext' == index){
	 var existcomponent=iscomponentexist(id,'knowledgelist_fulltext234');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		
		var myTable1_rt = new createKnowledgeList_fulltext();   			
		myTable1_rt.search({key:params['key']},'knowledge/knowledge!fulltextserach.action');
	
		myComponent = Edo.create({
		    id: id?id:'knowledgelist_fulltext234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        myTable1_rt.getKnowledgeList()
		    ]
		});}
	}else if('knowledgeupload' == index){	
		//知识上传
		
	  var existcomponent=	iscomponentexist(id,'knowledgeupload123');	
	if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		myComponent = Edo.create({
			id: id?id:'knowledgeupload123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ui!simpkupload.action' 
		});
		
		}else if('batchknowledgeupload' == index){	
			//批量知识上传
			
			  var existcomponent=	iscomponentexist(id,'batchknowledgeupload123');	
			if(null!=existcomponent)
					{
					myComponent=existcomponent;
					
					}		
				else
				myComponent = Edo.create({
					id: id?id:'batchknowledgeupload123',
					type: 'module',
					width: '100%',
		    		height: '100%',
					src: 'knowledge/ui!batchupload.action' 
				});
				
				}else if('dandianknowledgeupload' == index){	
			//知识上传
			
			  var existcomponent=	iscomponentexist(id,'knowledgeupload123');	
			if(null!=existcomponent)
					{
					myComponent=existcomponent;
					
					}		
				else
				myComponent = Edo.create({
					id: id?id:'knowledgeupload123',
					type: 'module',
					width: '100%',
		    		height: '100%',
					src: 'knowledge/ui!dandiankupload.action' 
				});
				
				}
		else if('oldknowledgeupload' == index){	
		//知识上传
	  var existcomponent=	iscomponentexist(id,'knowledgeupload124');		
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	
		myComponent = Edo.create({
			id: id?id:'knowledgeupload124',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ui!kupload.action' 
		});
	}
	else if('approvalstatistics' == index){
		
		 var existcomponent=	iscomponentexist(id,'approvalstatistics');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		var umyComponent;
		if(params['type'] == 'getUnApprovalKnowledges'){
		unapprovalbox	 = new createUnApprovalKnowledgeList_table('knowledge/approval/approval-statistics!getUnApprovalKnowledges.action', {}, [], []);
		umyComponent=unapprovalbox.getKnowledgeList().getTable();
		}else if(params['type'] == 'getPendingApprovalKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getPendingApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}else if(params['type'] == 'getPassApprovalKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getPassApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}else if(params['type'] == 'getEndApprovalKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getEndApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}else if(params['type'] == 'getNeededApprovalKnowledges'){
			umyComponent = new createKnowledgeListForBatchApprove_table('knowledge/approval/approval-statistics!getNeededApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}else if(params['type'] == 'passApprovalKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getApprovaledKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getMyAVIDMKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/knowledge!ksearch.action', {formvalue:"{\"selectedktypename\":\"Avidmknowledge\",\"searchlist\":[{\"name\":\"domainnodeisnotnull\",\"value\":\"null\",\"and_or\":\"and\",\"propertytype\":\"textfield\"}]}"}, [], []).getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getMyQualityKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/knowledge!ksearch.action', {formvalue:"{\"selectedktypename\":\"Qualityknowledge\",\"searchlist\":[{\"name\":\"domainnodeisnotnull\",\"value\":\"null\",\"and_or\":\"and\",\"propertytype\":\"textfield\"}]}"}, [], []).getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getNeedDomainAVIDMKnowledges'){
			//umyComponent = new createKnowledgeList_table('knowledge/knowledge!ksearch.action', {formvalue:"{\"selectedktypename\":\"Avidmknowledge\",\"searchlist\":[{\"name\":\"domainnodeisnull\",\"value\":\"null\",\"and_or\":\"and\",\"propertytype\":\"textfield\"}]}"}, [], []).getKnowledgeList().getTable();
			umyComponent = new createKnowledgeList_table('knowledge/knowledge!kNodtreenodeSearch.action', {formvalue:"Avidmknowledge"}, [], []).getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getNeedDomainQualityKnowledges'){
			umyComponent = new createKnowledgeList_table('knowledge/knowledge!ksearch.action', {formvalue:"{\"selectedktypename\":\"Qualityknowledge\",\"searchlist\":[{\"name\":\"domainnodeisnull\",\"value\":\"null\",\"and_or\":\"and\",\"propertytype\":\"textfield\"}]}"}, [], []).getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getPendingBorrowApprovalKnowledges'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listBuildingAndBorrowing4Initiator.action', {}, [], [],'borrowing').getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getPassBorrowApprovalKnowledges'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listBorrowedSuccess4Initiator.action', {}, [], [],'passborrow').getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getEndBorrowApprovalKnowledges'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listExpired4Initiator.action', {}, [], [],'borrowed').getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getNeedBorrowApprovalKnowledges'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listNeedBorrow4Borrower.action', {}, [], [],'approval').getKnowledgeList().getTable();
		}
		else if(params['type'] == 'getNeedBorrowApprovalKnowledgesAdmin'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listAllFlow4Admin.action', {}, [], [],'admin').getKnowledgeList().getTable();
		}
		else if(params['type'] == 'passBorrowApproval'){
			umyComponent = new createBorrowKnowledgeList_table('knowledge/approval/borrow-statistics!listBorrowed4Borrower.action', {}, [], [],'admin').getKnowledgeList().getTable();
		}
				
				myComponent = Edo.create({
		    id: id?id:'approvalstatistics', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
	}
}
	else if('myinfor' == index){
		if(params['type'] == 'myinforcard'){
			
	  var existcomponent=iscomponentexist(id,'configktype_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{	
			
		myComponent = Edo.create({
			id: id?id:'configktype_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'user/personlist.action'
		});
		}
		}else if(params['type'] == 'myinforfriend'){
		//	myComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getPendingApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
		}else if(params['type'] == 'myinformessage'){
				 var existcomponent=	iscomponentexist(id,'myinformessage');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		var umyComponent;	
			
			
		var myMessageList = new createMessageList();
		umyComponent = myMessageList.getMessageList();
		
		
		
				myComponent = Edo.create({
		    id: id?id:'myinformessage', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
		}
	}
	}
	
	else if('assignmanager' == index){
		//分配管理员
		//alert('privilege/treeassignprivilege!input.action?type='+params['type']);
		
		 var existcomponent=iscomponentexist(id,'assignmanager123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'assignmanager123',
			type: 'module',
			width: '100%',
    		height: '100%',
		    src: 'privilege/treeassignprivilege!input.action?type='+params['type'] 
		});
	}else if('edittree' == index){
		//编辑树
	   var existcomponent=iscomponentexist(id,'assignmanager234');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			
			}		
		else
		myComponent = Edo.create({
			id: id?id:'assignmanager234',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'tree/tree!input.action?type='+params['type'] 
		});
	}else if('addpermission' == index){
		//编辑三元组
		if('roleTree' == params['type']){
			
			  var existcomponent=iscomponentexist(id,'assignmanager765');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
			
			myComponent = Edo.create({
				id: id?id:'assignmanager765',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'user/role/userole!input.action' 
			});
			
		
			
			
		}else{
			
			  var existcomponent=iscomponentexist(id,'assignmanager567');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	
			
			myComponent = Edo.create({
				id: id?id:'assignmanager567',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'privilege/assignprivilege!input.action?type='+params['type'] 
			});
		}
	}else if('kmap' == index){
		
		 var existcomponent=iscomponentexist(id,'cims201_kmap123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
				id: id?id:'cims201_kmap123',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'knowledge/ui!kmap.action'
			});
	}else if('smc' == index){
		
		 var existcomponent=iscomponentexist(id,'cims201_smc123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
				id: id?id:'cims201_smc123',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'custom/customization!smc.action'
			});
	}else if('position' == index){
		
		 var existcomponent=iscomponentexist(id,'cims201_position123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
				id: id?id:'cims201_position123',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'knowledge/ui!position.action'
			});
	}
	else if('avidmsystem' == index){
		//avidm知识搜索界面
	    var existcomponent=iscomponentexist(id,'avidmsystem');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		var mySearchIndex = new createAvidmSearchIndex();
		
		//添加回车事件
		//alert(mySearchUI.getId());
		enterEventList[enterEventList.length] = mySearchIndex;
		enterEventIDList[enterEventIDList.length] =id?id:'avidmsystem';
		
	
		myComponent = Edo.create({  
  		    id: id?id:'avidmsystem',  
		    type: 'box',                 
		    layout: 'vertical',  
		  //  bodyStyle :'background-color: #000000;',
		    width: '100%',
		    //width: cims201.utils.getScreenSize().width-20,
		    //height: 1200,  
		    border: [0,0,0,0], 
	    	padding: [0,22,0,12], 
		    children: [
		        mySearchIndex.getSearchIndex()
		    ]
		});
		}
	}
	
	else if('avidmknowledgelist_fulltext' == index){
	 var existcomponent=iscomponentexist(id,'avimdknowledgelist_fulltext234');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
			
			var umyComponent=new createAVIDMSearchKnowledgeList_table('knowledge/knowledge!SearchAVIDM.action',{key:params['key'],avidmip:params['avidmip']},[], []).getKnowledgeList().getTable();
						myComponent = Edo.create({
		    id: id?id:'approvalstatistics', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
	//	var myTable1_rt = new createAVIDMKnowledgeList_table('knowledge/knowledge!SearchAVIDM.action',{key:params['key'],avidmip:params['avidmip']},[], []);   			
	//	myTable1_rt.search('knowledge/knowledge!SearchAVIDM.action',{key:params['key']});
	
//		myComponent = Edo.create({
//		    id: id?id:'avidmknowledgelist_fulltext234', 
//		    type: 'box',                 
//		    layout: 'vertical',  
//		    width: '100%',
//		    //height: 1250,  
//		    border:[0,0,0,0],
//		    padding: [0,12,0,12],
//		    children: [
//		        myTable1_rt.getKnowledgeList()
//		    ]
//		});
		
		}
	}
	else if('messagelist' == index){
		var myMessageList = new createMessageList();
		myComponent = myMessageList.getMessageList();
	}else if('userlist' == index){
		
	 var existcomponent=iscomponentexist(id,'userlist_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'userlist_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'user/userlist.action'
		});
	}else if('configktype' == index){
		
	//知识类型
		 var existcomponent=iscomponentexist(id,'configktype_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'configktype_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ktype/ktype!input.action'
		});
	}else if('configproperty' == index){
	//知识属性
	 var existcomponent=iscomponentexist(id,'configproperty');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'configproperty_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/property/property.action'
		});
	}else if('ktypelist' == index){
	//知识类型列表
		
			 var existcomponent=iscomponentexist(id,'ktypelist_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		myComponent = Edo.create({
			id: id?id:'ktypelist_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ktype/ktype.action'
		});
	}else if('cdTree' == index){
		 var existcomponent=iscomponentexist(id,'cdTree_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = new createTreeKnowledge(params['nodeId'],id).getPanel();
	}//pl 知识收藏
	else if('keep' == index){
		 var existcomponent=iscomponentexist(id,'keep_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			}		
		else
		myComponent = new createKeepTreeKnowledge(params['nodeId'],id).getPanel();
	}
	else if('indexall' == index){
	
	
	 var existcomponent=iscomponentexist(id,'index_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'index_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ui!indexall.action'
		});
	}
		else if('inituser' == index){
	
	
	 var existcomponent=iscomponentexist(id,'inituser_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'inituser_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ui!inituser.action'
		});
	}
	
	
	else if('statisticswhole' == index){
	 var existcomponent=iscomponentexist(id,'statisticswhole_123');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		myComponent = Edo.create({
			id: id?id:'statisticswhole_123',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'statistic/statistic!list.action?screenwidth='+cims201.utils.getScreenSize().width+'&screenheight='+cims201.utils.getScreenSize().height
		});
	}else if('knowledgesSubscription' == index){
		//知识订阅
			var existcomponent=iscomponentexist(id,'knowledgesSubscription001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'knowledgesSubscription001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createKnowledgeSubscribe().getKS()
		});
		}			
	}else if('getKnowledgesSubscriptionList' == index){
		//知识订阅列表		
			var existcomponent=iscomponentexist(id,'getKnowledgesSubscriptionList001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;

			}		
			else{
		myComponent = Edo.create({

			id: id?id:'getKnowledgesSubscriptionList001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new knowledgeSubscribeList().getInterestModelinput()
		});
		}	
	}
	/********************专利模块 江丁丁 jiangdingding添加，2013-5-12*************/
	else if('patentchinesesearch' == index){//中国专利检索
		  var existcomponent=iscomponentexist(id,'patentchinesesearchHome001');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			}		
			else{
				
				var patentChineseSearchHome = new createPatentChineseSearchHome();

				myComponent = Edo.create({
					id: id?id:'patentchinesesearchHome001',
					type: 'box',
					border:[0,0,0,0],
					width: '100%',
		    		height: '100%',
		    	    verticalScrollPolicy:'on',
					children: [
					           patentChineseSearchHome.getPatentChineseSearchHome()
					           ]
				});
	      }
	}else if('patentchineselist' == index){//中国专利结果列表
		  var existcomponent=iscomponentexist(id,'patentchineselist234');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			}		
		var myTable1_rt = new createPatentList();   	
		var fromsearch = "1";//从首页检索
		myTable1_rt.search({searchPatentForm:params['searchPatentForm']},'patent/patent!searchPatentCN.action?fromsearch='+fromsearch);
		
		myComponent = Edo.create({
		    id: id?id:'patentchineselist234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        myTable1_rt.getPatentList()
		    ]
		});
	}else if('patentchinesedblist' == index){//中国专利结果列表2（服务器数据库检索）
		    var existcomponent=	iscomponentexist(id,'patentchinesedblist234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			
			var myTable1_rt = new createKnowledgeList_box; 
			myTable1_rt.search({searchPatentForm:params['searchPatentForm']},'patent/patent!searchPatentFromDB.action');
			
			myComponent = Edo.create({
			    id: id?id:'patentchineselistdb234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        myTable1_rt.getKnowledgeList()
			    ]
			});
		}else if('patentcndetaillist' == index){//中国专利结果详细
				var existcomponent=	iscomponentexist(id,'patentcndetaillist234');
				if(null!=existcomponent)
					{
					myComponent=existcomponent;
					
					}		
				myComponent = Edo.create({
				    id: id?id:'patentcndetaillist234', 
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    //height: 1250,  
				    border:[0,0,0,0],
				    padding: [0,12,0,12],
				    children: [
				        new createPatentCNView(params['appCode'],params['patentType'],params['keyword']).getPatentCNView()
				    ]
				});
	}else if('patentussearch' == index){//美国专利检索
		  var existcomponent=iscomponentexist(id,'patentussearchHome001');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			}		
			else{
				
				var patentUSSearchHome = new createPatentUSSearchHome();

				myComponent = Edo.create({
					id: id?id:'patentussearchHome001',
					type: 'box',
					border:[0,0,0,0],
					width: '100%',
		    		height: '100%',
		    	    verticalScrollPolicy:'on',
					children: [
					           patentUSSearchHome.getPatentUSSearchHome()
					           ]
				});
	      }
	}else if('patentuslist' == index){//美国专利结果列表
		  var existcomponent=iscomponentexist(id,'patentuslist234');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			}		
		var myTable1_rt = new createPatentUSList();   	
		var fromsearch = "1";//从首页检索
		myTable1_rt.search({searchPatentForm:params['searchPatentForm']},'patent/patent!searchPatentUS.action?fromsearch='+fromsearch);
		
		myComponent = Edo.create({
		    id: id?id:'patentuslist234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        myTable1_rt.getPatentList()
		    ]
		});
	}
/*	else if('patentusdblist' == index){//美国专利结果列表2（服务器数据库检索）
		    var existcomponent=	iscomponentexist(id,'patentusdblist234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			
			var myTable1_rt = new createKnowledgeList_box; 
			myTable1_rt.search({searchPatentForm:params['searchPatentForm']},'patent/patent!searchPatentUSFromDB.action');
			
			myComponent = Edo.create({
			    id: id?id:'patentchineselistdb234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        myTable1_rt.getKnowledgeList()
			    ]
			});
		}*/
	else if('patentusdetaillist' == index){//美国专利结果详细
			var existcomponent=	iscomponentexist(id,'patentusdetaillist234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			myComponent = Edo.create({
			    id: id?id:'patentusdetaillist234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        new createPatentUSView(params['appCode'],params['titleName'],params['fullurl'],params['keyword']).getPatentUSView()
			    ]
			});
}
	
	/********************名人专栏模块 江丁丁 jiangdingding添加，2013-6-5*************/	
	else if('experthome' == index){//名人专栏首页
		var existcomponent=	iscomponentexist(id,'experthome234');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		
		var myTable1_rt = new createExpertHome();   	
		myTable1_rt.search();
		
		
		myComponent = Edo.create({
		    id: id?id:'experthome234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        myTable1_rt.getExpertHome()
		    ]
		});
	}
	else if('publisharticle' == index){	
		//发布文章
		 var existcomponent=iscomponentexist(id,'publisharticle001');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else
			
			myComponent = Edo.create({
				id: id?id:'publisharticle001',
				type: 'module',
				width: '100%',
	    		height: '100%',
				src: 'knowledge/ui!addarticle.action'  
			});
		}
	/************************模块化评价******************************/
	else if('mdehome' == index){//模块化评价        江丁丁添加     2013-8-13
		  var existcomponent=iscomponentexist(id,'mdehome001');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			
			}		
			else{
			myComponent = Edo.create({
				id: id?id:'mdehome001',
				type: 'box',
				border:[0,0,0,0],
				width: '100%',
	    		height: '100%',
	    	    verticalScrollPolicy:'on',
				children: new createMdeHomeIndex().getMdeHome()
			});
	      }
	}else if('product' == index){//产品管理页面
		var existcomponent=	iscomponentexist(id,'product234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
	  	    var producttable = new createProductBase().getProductBase();
  			if(producttable!='error'){
		  		myComponent = Edo.create({  
		  		    id: id?id:'product234',  
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '95%',
				    border: [0,0,0,0], 
			    	padding: [0,0,0,0], 
				    children: [
				        producttable.getTable()
				    ]
				});
	  		} else {
	  			myComponent="error";
	  		}	
		}	
	}
	else if('benefit' == index){//效益评价主页面        江丁丁添加     2013-1-15	
		  var existcomponent=iscomponentexist(id,'benefitHome001');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			
			}		
			else{
			myComponent = Edo.create({
				id: id?id:'benefitHome001',
				type: 'box',
				border:[0,0,0,0],
				width: '100%',
	    		height: '100%',
	    	    verticalScrollPolicy:'on',
				children: new createBenefitHome().getBenefitHome()
			});
	      }
	}else if('indexSelect' == index){//模块化设计效益评价指标选择页面        江丁丁添加     2012-12-11
/*		var existcomponent=	iscomponentexist(id,'indexSelect234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
	  	    var input = new createIndexSelectHome(params['product1Id'],params['product2Id']).getIndexSelectHome();
			if(input!='error'){
		  		myComponent = Edo.create({  
		  		    id: id?id:'indexSelect234',  
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '95%',
				    border: [0,0,0,0], 
			    	padding: [0,0,0,0], 
				    children: [
				        input
				    ]
				});
	  		} else {
	  			myComponent="error";
	  		}	
		}	*/
		  var existcomponent=iscomponentexist(id,'indextree001');
			if(null!=existcomponent)
			{
				myComponent=existcomponent;
			
			}		
			else{
			myComponent = Edo.create({
				id: id?id:'indextree001',
				type: 'box',
				border:[0,0,0,0],
				width: '100%',
	    		height: '100%',
	    	    verticalScrollPolicy:'on',
				children:new createTreeIndexList(params['product1Id'],params['product2Id']).gettreeIndexInput()
			});
			}
	}else if('weightInput' == index){//模块化设计效益评价指标权重页面        江丁丁添加     2012-12-11
		var existcomponent=	iscomponentexist(id,'weight234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
	  	    var input = new createBenefitWeightInput(params['benefitindexformvalue'],params['product1Id'],params['product2Id']).getWeightInput();
			if(input!='error'){
		  		myComponent = Edo.create({  
		  		    id: id?id:'weight234',  
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '95%',
				    border: [0,0,0,0], 
			    	padding: [0,0,0,0], 
				    children: [
				        input
				    ]
				});
	  		} else {
	  			myComponent="error";
	  		}	
		}	
	}
	else if('valueInput' == index){//模块化设计效益评价指标值输入页面        江丁丁添加     2012-12-11
		var existcomponent=	iscomponentexist(id,'valueInput234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
	  	    var input = new createValueInput(params['benefitindexformvalue'],params['benefitindexweightformvalue'],params['product1Id'],params['product2Id']).getValueInput();
			if(input!='error'){
		  		myComponent = Edo.create({  
		  		    id: id?id:'valueInput234',  
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '95%',
				    border: [0,0,0,0], 
			    	padding: [0,0,0,0], 
				    children: [
				        input
				    ]
				});
	  		} else {
	  			myComponent="error";
	  		}	
		}	
	}else if('degree' == index){
		var existcomponent=iscomponentexist(id,'degreeHome001');
		if(null!=existcomponent)
		{
			myComponent=existcomponent;
		
		}		
		else{
		myComponent = Edo.create({
			id: id?id:'degreeHome001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
  		height: '100%',
  	    verticalScrollPolicy:'on',
			children: new createDegreeHome().getDegreeHome()
		});
    }
	}else if('degreemain' == index){
		var existcomponent=	iscomponentexist(id,'degree234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
//			var products = params['products'];
//			if(products != null && products != 'null' && products != ''){			
		  	    var degree = new createDegree(params['product1Id'],params['product2Id']).getDegree();
	  			if(degree!='error'){
			  		myComponent = Edo.create({  
			  		    id: id?id:'degree234',  
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height: '95%',
					    border: [0,0,0,0], 
				    	padding: [0,0,0,0], 
					    children: [
					               degree
					    ]
					});
		  		} else {
		  			myComponent="error";
		  		}	
//			}	
		}
	}else if('degreeResult' == index){
		var existcomponent=	iscomponentexist(id,'degreeResult234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
			var data = params['data'];
			if(data != null && data != 'null' && data != ''){			
		  	    var degreeresultbox = new createDegreeresultbox(data).getDegreeResult();
	  			if(degreeresultbox!='error'){
			  		myComponent = Edo.create({  
			  		    id: id?id:'degreeResult234',  
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height: '95%',
					    border: [0,0,0,0], 
				    	padding: [0,0,0,0], 
					    children: [
					               degreeresultbox
					    ]
					});
		  		} else {
		  			myComponent="error";
		  		}	
			}	
		}
	}else if('benefitResult' == index){
		var existcomponent=	iscomponentexist(id,'benefitResult234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
			var data = params['data'];
			if(data != null && data != 'null' && data != ''){			
		  	    var benefitresultbox = new createBenefitresultbox(data).getBenefitResult();
	  			if(benefitresultbox!='error'){
			  		myComponent = Edo.create({  
			  		    id: id?id:'benefitResult234',  
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height: '95%',
					    border: [0,0,0,0], 
				    	padding: [0,0,0,0], 
					    children: [
					               benefitresultbox
					    ]
					});
		  		} else {
		  			myComponent="error";
		  		}	
			}	
		}
	}else if('mdeResult' == index){
		var existcomponent=	iscomponentexist(id,'mdeResult234');
		if(null!=existcomponent) {
			myComponent=existcomponent;
		} else {	
			var products = params['products'];
			if(products != null && products != 'null' && products != ''){			
		  	    var output = new createMdeResult(products).getMdeResult();
	  			if(output!='error'){
			  		myComponent = Edo.create({  
			  		    id: id?id:'mdeResult234',  
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height: '95%',
					    border: [0,0,0,0], 
				    	padding: [0,0,0,0], 
					    children: [
					        output
					    ]
					});
		  		} else {
		  			myComponent="error";
		  		}	
			}	
		}
	}else if('editindextree' == index){
		//编辑树
	    //MDE 评价指标树
		var existcomponent=iscomponentexist(id,'edittree002');
		if(null!=existcomponent)
		{
			myComponent=existcomponent;
		
		}		
		else{
		myComponent = Edo.create({
			id: id?id:'edittree002',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
    	    verticalScrollPolicy:'on',
			children:new createEditTreeIndex().getEditTreeIndex()
		});
		}
	   
	}
	
	/************************生命周期评价***********************/
	else if('lcahome' == index){//lca   杨文君  2013-8-13
		 var existcomponent=	iscomponentexist(id,'lcahome234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
			
			myComponent = Edo.create({
			    id: id?id:'lcahome234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        new createLcaHome().getLcaHome()
			    ]
			});}
		}
	
	
	/********************问答模块*************************/
	

	else if('equestiondaohang' == index){
		//领域专家问题导航
	  var existcomponent=iscomponentexist(id,'equestiondaohang001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'equestiondaohang001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createTreeExpertList().getTEinput()
		});
		}
	}else if('showHisInfo' == index){

	//显示专家的详细信息
	    var existcomponent=	iscomponentexist(id,'showHisInfo001');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	
		{	
		var myExpertId = params['expertId'];
		
	
		if(myExpertId != null && myExpertId != 'null' && myExpertId != ''){			
  	    var mk = new createExpertInfoList(myExpertId).getinfolist();
  			if(mk!='error'){
	  		myComponent = Edo.create({  
	  		    id: id?id:'showHisInfo001',  
			    type: 'box',                 			   
			    width: '100%',
			    height:600, 
			    border: [1,1,1,1], 
		    	padding: [0,0,0,0], 
			    children: mk
			});}
		 	else
  		{
  		myComponent="error";
  		
  		}	
		}		
  	    }
	}else if('qcategorydaohang' == index){
		//问题分类导航模块
		 var existcomponent=iscomponentexist(id,'qcategorydaohang001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'qcategorydaohang001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createQuestionlistPanel().getKhot()
		});
		}		
	}else if('questionsearch' == index){
	    //问题检索
		    var existcomponent=	iscomponentexist(id,'questionsearch001');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else	{
		
		//var myTable1_rt = new createKnowledgeList_box();   
		var mySearchUI = new questionSearchPanel();
		
		//添加回车事件
		//alert(mySearchUI.getId());
		enterEventList[enterEventList.length] = mySearchUI;
		enterEventIDList[enterEventIDList.length] = 'knowledgesearch';
	
		myComponent = Edo.create({
			id: id?id:'questionsearch001',   
		    type: 'box',                 
		    layout: 'vertical',  
		    //width: cims201.utils.getScreenSize().width*0.8,
		    width: '100%',
		    //collapseHeight: 700,
		    //height: 1200,  
		    //height: '100%',
		    border:[0,0,0,0],
		    padding: [0,22,0,12],
		    children: [
		    	mySearchUI.getSearchQu()
		    ]
		});
		}
	}else if('askpublish' == index){	
	//问题发布
	 var existcomponent=iscomponentexist(id,'askpublish001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'askpublish001',
			type: 'module',
			width: '100%',
    		height: '100%',
			src: 'knowledge/ui!addquestion.action'  
		});
	}else if('myquestionlist' == index){
		//问答列表
			var existcomponent=iscomponentexist(id,'myquestionlist001');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'myquestionlist001',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createMyAnswerList().getMyanswerlist()
		});
		}		
	}else if('waitedquestion' == index){
		//待解决问题）
			var existcomponent=iscomponentexist(id,'waitedquestion002');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'waitedquestion002',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createWaitedQuestionList().getMessageList()
		});
		}			
	}else if('expertset' == index){
		//领域专家设置
			var existcomponent=iscomponentexist(id,'expertset002');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'expertset002',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createExpertTreenode().getEinput()
		});
		}			
	}else if('expertmaintain' == index){
		//专家集维护		
	  var existcomponent=iscomponentexist(id,'expertmaintain002');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		myComponent = Edo.create({
			id: id?id:'expertmaintain002',
			type: 'box',
			border:[0,0,0,0],
			width: '100%',
    		height: '100%',
			children:new createExpert().getExpertList()
		});
		}
		createKnowledgeSubscribe
	}
	/********************end*************************/
	
	else if('khotlist' == index){
		//知识热度排行列表
		 var existcomponent=iscomponentexist(id,'khotlist_1234');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
			
			var umyComponent= new createKhotlistPanel().getKhot();
			myComponent = Edo.create({
		    id: id?id:'khotlist_1234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
		}}else if('userrank' == index){
		//用户排行列表
		
			
		 var existcomponent=iscomponentexist(id,'userrank_1234');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
			
			var umyComponent= new createUserRank().getUserrank();
			myComponent = Edo.create({
		    id: id?id:'userrank_1234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
		}
		
		
		
	}else if('behaviorlist' == index){
		//管理行为列表
				 var existcomponent=iscomponentexist(id,'behaviorlist_1234');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
			
			var umyComponent= new createBehaviorList().getList();
			myComponent = Edo.create({
		    id: id?id:'behaviorlist_1234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    height: '100%',  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
		        umyComponent
		    ]
		});
		}
		
	
	}
	else if('creatkgroup' == index){
	//知识类型列表
		
	 var existcomponent=iscomponentexist(id,'knowledgegroup');
			if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else
		
		myComponent = Edo.create({
			id: id?id:'knowledgegroup',
			type: 'module',
			width: '100%',
    		height: '95%',
			src: 'flash/creatgroup.swf'
		});
	}	else if('ontology' == index){
		//本体文件管理
		
		 var existcomponent=iscomponentexist(id,'editontology');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		

				else{

					
					var umyComponent= new createOntofileList().getList();
					myComponent = Edo.create({
				    id: id?id:'editontology', 
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '100%',  
				    border:[0,0,0,0],
				    padding: [0,12,0,12],
				    children: [
				        umyComponent
				    ]
				});
				
					
					
					
				}
			
		}
	else if('addontologyshuyu' == index){
		 var existcomponent=iscomponentexist(id,'addontologyshuyu1234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
		
			var myTable1_rt = new addontology_box(params['filenamevalue'],params['ontoname'],params['className']);   			
			{
				//formvalue:params['filenamevalue'];
			
			
			myComponent = Edo.create({
			    id: id?id:'addontologyshuyu1234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        myTable1_rt.getontobox()
			    ]
			});}
		}
			}
	else if('editontologyshuyu' == index){
	 var existcomponent=iscomponentexist(id,'editontolgy234');
		if(null!=existcomponent)
			{
			myComponent=existcomponent;
			
			}		
		else{
		
		var myTable1_rt = new editontology_box(params['filenamevalue'],params['ontoname']);   				
		{
		
		myComponent = Edo.create({
		    id: id?id:'editontolgy234', 
		    type: 'box',                 
		    layout: 'vertical',  
		    width: '100%',
		    //height: 1250,  
		    border:[0,0,0,0],
		    padding: [0,12,0,12],
		    children: [
             myTable1_rt.getontobox()
		    ]
		});}
	}
		}
	else if('owlFilesShowLog' == index){
		 var existcomponent=iscomponentexist(id,'owlFilesShowLog234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
			
			var myTable1_rt = new ontolog_box(params['filenamevalue']);   				
			{
			
			myComponent = Edo.create({
			    id: id?id:'owlFilesShowLog234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    height: '100%',  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
	             myTable1_rt.getontologbox()
			    ]
			});}
		}
			}
	//共建术语展示
	else if('gongjianontologyshuyu' == index){
		 
		 var existcomponent=iscomponentexist(id,'gongjianontologyshuyu1234');
			if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
		
			var myTable1_rt = new gongjianontology_box(params['ontoname']);   			
			{
				//formvalue:params['filenamevalue'];
			
			
			myComponent = Edo.create({
			    id: id?id:'gongjianontologyshuyu1234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    //height: 1250,  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        myTable1_rt.getontobox()
			    ]
			});}
		}
			}
	//共建术语列表
	else if('gongjianshuyuontologyshuyu' == index){
				 var existcomponent=iscomponentexist(id,'gongjianshuyuontologyshuyu');
					if(null!=existcomponent)
						{
						myComponent=existcomponent;
						
						}		
					else{
				
					var myTable1_rt = new creatontojieshilist_box(null);   			
					{
					
					myComponent = Edo.create({
					    id: id?id:'gongjianshuyuontologyshuyu', 
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height:'100%' ,  
					    border:[0,0,0,0],
					    padding: [0,12,0,12],
					    children: [
                        myTable1_rt
					    ]
					});}
				}
					}
	//共建术语类别导航
			else if('gongjianleibieontologyshuyu' == index){
				 var existcomponent=iscomponentexist(id,'gongjianleibieontologyshuyu');
					if(null!=existcomponent)
						{
						myComponent=existcomponent;
						
						}		
					else{
				
					var myTable1_rt = new gongjianleibieontologyshuyu_box();   			
					{
						//formvalue:params['filenamevalue'];
					
					
					myComponent = Edo.create({
					    id: id?id:'gongjianleibieontologyshuyu', 
					    type: 'box',                 
					    layout: 'vertical',  
					    width: '100%',
					    height: '100%',  
					    border:[0,0,0,0],
					    padding: [0,12,0,12],
					    children: [
					        myTable1_rt.getontobox()
					    ]
					});}
				}
					}
	
	
	
		else if('myBusiness' == index){

			 var existcomponent=iscomponentexist(id,'knowledgegroup');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
				var umyComponent;
				if(params['type'] == 'myBusiness'){
				unapprovalbox	 = new createKnowledgeList_table('knowledge/approval/approval-statistics!getUnApprovalKnowledges.action', {}, [], []);
				umyComponent=unapprovalbox.getKnowledgeList().getTable();
				}else if(params['type'] == 'getKnowledgeKeep'){
					umyComponent = new createKeepListBox('knowledge/keep/keep!getMyKeep.action', {}, [], []);
				}else if(params['type'] == 'getFriendRecommend'){
					umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getPassApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
				}else if(params['type'] == 'mySubscription'){
					umyComponent = new createKnowledgeList_table('knowledge/approval/approval-statistics!getPassApprovalKnowledges.action', {}, [], []).getKnowledgeList().getTable();
				}
						
						myComponent = Edo.create({
				    id: id?id:'approvalstatistics', 
				    type: 'box',                 
				    layout: 'vertical',  
				    width: '100%',
				    height: '100%',  
				    border:[0,0,0,0],
				    padding: [0,12,0,12],
				    children: [
				        umyComponent
				    ]
				});
			}
	}
		else if('standardsystem' == index){
			//标准搜索界面
		    var existcomponent=iscomponentexist(id,'standardsystem');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
			var mySearchIndex = new createStandardSearchIndex();
			
			//添加回车事件
			//alert(mySearchUI.getId());
			enterEventList[enterEventList.length] = mySearchIndex;
			enterEventIDList[enterEventIDList.length] =id?id:'standardsystem';
			
		
			myComponent = Edo.create({  
	  		    id: id?id:'standardsystem',  
			    type: 'box',                 
			    layout: 'vertical',  
			  //  bodyStyle :'background-color: #000000;',
			    width: '100%',
			    //width: cims201.utils.getScreenSize().width-20,
			    //height: 1200,  
			    border: [0,0,0,0], 
		    	padding: [0,22,0,12], 
			    children: [
			        mySearchIndex.getSearchIndex()
			    ]
			});
			}
		}else if('standardknowledgelist_fulltext' == index){
			 var existcomponent=iscomponentexist(id,'standardknowledgelist_fulltext234');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
				
				//var umyComponent=new createAVIDMSearchKnowledgeList_table('knowledge/knowledge!SearchAVIDM.action',{key:params['key'],standardip:params['standardip']},[], []).getKnowledgeList().getTable();
				var myTable1_rt = new createStandardKnowledgeList_box();  
				//传一个titlename的key 			
			    //myTable1_rt.search({key:params['key']},'standard/biaozhun!listBiaozhun.action');
			    myTable1_rt.search({key:params['key']},'standard/biaozhun!listBiaozhuns.action');
				myComponent = Edo.create({
			    id: id?id:'standardknowledgelist_fulltext234', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    height: '100%',  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        myTable1_rt.getKnowledgeList()
			    ]
			});			
			}
		}
		/*********标准*****************/

		else if('avidmknowledgelist_fulltext' == index){
		 var existcomponent=iscomponentexist(id,'avimdknowledgelist_fulltext234');
				if(null!=existcomponent)
				{
				myComponent=existcomponent;
				
				}		
			else{
				
				var umyComponent=new createAVIDMSearchKnowledgeList_table('knowledge/knowledge!SearchAVIDM.action',{key:params['key'],avidmip:params['avidmip']},[], []).getKnowledgeList().getTable();
							myComponent = Edo.create({
			    id: id?id:'approvalstatistics', 
			    type: 'box',                 
			    layout: 'vertical',  
			    width: '100%',
			    height: '100%',  
			    border:[0,0,0,0],
			    padding: [0,12,0,12],
			    children: [
			        umyComponent
			    ]
			});
		//	var myTable1_rt = new createAVIDMKnowledgeList_table('knowledge/knowledge!SearchAVIDM.action',{key:params['key'],avidmip:params['avidmip']},[], []);   			
		//	myTable1_rt.search('knowledge/knowledge!SearchAVIDM.action',{key:params['key']});
		
//			myComponent = Edo.create({
//			    id: id?id:'avidmknowledgelist_fulltext234', 
//			    type: 'box',                 
//			    layout: 'vertical',  
//			    width: '100%',
//			    //height: 1250,  
//			    border:[0,0,0,0],
//			    padding: [0,12,0,12],
//			    children: [
//			        myTable1_rt.getKnowledgeList()
//			    ]
//			});
			
			}
		}
		else if('CodeClassDefi'==index){
			 var existcomponent = iscomponentexist(id,'CodeClassDefi234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassDefi = new createCodeClassDefi();
				enterEventList[enterEventList.length] = myCodeClassDefi;
				enterEventIDList[enterEventIDList.length] = 'CodeClassDefi';
			  
				myComponent = Edo.create({
					id: id?id:'CodeClassDefi234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassDefi.getMenu(),
				    	myCodeClassDefi.getTable()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myCodeClassDefi
			};
		}
		else if('CodeClassDeficheck'==index){
			var existcomponent = iscomponentexist(id,'CodeClassDeficheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassDeficheck = new createCodeClassDefi_check();
				enterEventList[enterEventList.length] = myCodeClassDeficheck;
				enterEventIDList[enterEventIDList.length] = 'CodeClassDeficheck';
			  
				myComponent = Edo.create({
					id: id?id:'CodeClassDeficheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassDeficheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myCodeClassDeficheck
			};
		}
		else if('CodeClassRuleManage'==index){

			var existcomponent = iscomponentexist(id,'CodeClassRuleManage234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassRuleManage = new createCodeClassRuleManage();
				enterEventList[enterEventList.length] = myCodeClassRuleManage;
				enterEventIDList[enterEventIDList.length] = 'CodeClassRuleManage';
			
				myComponent = Edo.create({
					id: id?id:'CodeClassRuleManage234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassRuleManage.getTopbar(),
				    	myCodeClassRuleManage.getRuleTree()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myCodeClassRuleManage
				};
			}
			
		}
		else if('CodeClassRuleManagecheck'==index){
			var existcomponent = iscomponentexist(id,'CodeClassRuleManagecheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassRuleManagecheck = new createCodeClassRuleManage_check();
				enterEventList[enterEventList.length] = myCodeClassRuleManagecheck;
				enterEventIDList[enterEventIDList.length] = 'CodeClassRuleManagecheck';
			  
				myComponent = Edo.create({
					id: id?id:'CodeClassRuleManagecheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassRuleManagecheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myCodeClassRuleManagecheck
			};
		}
		else if('CodeClassManage'==index){

			var existcomponent = iscomponentexist(id,'CodeClassManage234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassManage = new createCodeClassManage();
				enterEventList[enterEventList.length] = myCodeClassManage;
				enterEventIDList[enterEventIDList.length] = 'CodeClassManage';
			
				myComponent = Edo.create({
					id: id?id:'CodeClassManage234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassManage.getTopBar(),
				    	myCodeClassManage.getTree()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myCodeClassManage
				};
			}
			
		}
		else if('CodeClassManagecheck'==index){
			var existcomponent = iscomponentexist(id,'CodeClassManagecheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mycreateCodeClassManagecheck = new createCodeClassManage_check();
				enterEventList[enterEventList.length] = mycreateCodeClassManagecheck;
				enterEventIDList[enterEventIDList.length] = 'CodeClassManagecheck';
			  
				myComponent = Edo.create({
					id: id?id:'CodeClassManagecheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	mycreateCodeClassManagecheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:mycreateCodeClassManagecheck
			};
		}
		else if('CodeClassStructManage'==index){

			var existcomponent = iscomponentexist(id,'CodeClassStructManage234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassStructManage = new createCodeClassStructManage();
				enterEventList[enterEventList.length] = myCodeClassStructManage;
				enterEventIDList[enterEventIDList.length] = 'CodeClassStructManage';
			
				myComponent = Edo.create({
					id: id?id:'CodeClassStructManage234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassStructManage.getLbdhPanel(),
				    	myCodeClassStructManage.getFljgPanel(),
				    	myCodeClassStructManage.getFlmclForm()
				    ]
				});
			    resultComponent={
							myComponent:myComponent,
							realComponent:myCodeClassStructManage
				};
			}
			
		}
		else if('CodeClassStructManagecheck'==index){
			var existcomponent = iscomponentexist(id,'CodeClassStructManagecheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCodeClassStructManagecheck = new createCodeClassStructManage_check();
				enterEventList[enterEventList.length] = myCodeClassStructManagecheck;
				enterEventIDList[enterEventIDList.length] = 'CodeClassStructManagecheck';
			  
				myComponent = Edo.create({
					id: id?id:'CodeClassStructManagecheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myCodeClassStructManagecheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myCodeClassStructManagecheck
			};
		}
		else if('StructUpload'==index){

			var existcomponent = iscomponentexist(id,'StructUpload234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myStructUpload = new createStructUpload();

				enterEventList[enterEventList.length] = myStructUpload;
				enterEventIDList[enterEventIDList.length] = 'StructUpload';
			
				myComponent = Edo.create({
					id: id?id:'StructUpload234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				        myStructUpload.getCodeClassChoose(),
				        myStructUpload. getUploadPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myStructUpload
				};
			}
		}
		else if('PartInstanceRg'==index){
			var existcomponent = iscomponentexist(id,'PartInstanceRg234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPartInstanceRg = new createPartInstanceRg();

				enterEventList[enterEventList.length] = myPartInstanceRg;
				enterEventIDList[enterEventIDList.length] = 'PartInstanceRg';
			
				myComponent = Edo.create({
					id: id?id:'PartInstanceRg234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				        myPartInstanceRg.getCodeClassChoose(),
				        myPartInstanceRg.getRgPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myPartInstanceRg
				};
			}
		}
		else if('PartUpload'==index){

			var existcomponent = iscomponentexist(id,'PartUpload234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPartUpload = new createPartUpload();

				enterEventList[enterEventList.length] = myPartUpload;
				enterEventIDList[enterEventIDList.length] = 'PartUpload';
			
				myComponent = Edo.create({
					id: id?id:'PartUpload234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				        myPartUpload.getCodeClassChoose(),
				        myPartUpload.getUploadPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myPartUpload
				};
			}
		}
		else if('DocTypeManage'==index){

			var existcomponent = iscomponentexist(id,'DocTypeManage234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myDocTypeManage = new createDocTypeManage();

				enterEventList[enterEventList.length] = myDocTypeManage;
				enterEventIDList[enterEventIDList.length] = 'DocTypeManage';
			
				myComponent = Edo.create({
					id: id?id:'DocTypeManage234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myDocTypeManage.getDocTypeTable()
				    ]
				});
			}
		}
		else if('PartCreate'==index){

			var existcomponent = iscomponentexist(id,'PartCreate234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPartCreate = new createPartCreate();

				enterEventList[enterEventList.length] = myPartCreate;
				enterEventIDList[enterEventIDList.length] = 'PartCreate';
			
				myComponent = Edo.create({
					id: id?id:'PartCreate234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myPartCreate.getCodeClassChoose(),
		               myPartCreate.getCreatePartPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myPartCreate
				};

			}
		}
		else if('ModInterface'==index){

			var existcomponent = iscomponentexist(id,'ModInterface234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myModInterface = new createModInterface();

				enterEventList[enterEventList.length] = myModInterface;
				enterEventIDList[enterEventIDList.length] = 'ModInterface';
			
				myComponent = Edo.create({
					id: id?id:'ModInterface234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myModInterface.getCodeClassChoose(),
		               myModInterface.getInterfacePanel()
				    ]
				});
			}
		}
		else if('ModLookup'==index){

			var existcomponent = iscomponentexist(id,'ModLookup234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myModLookup = new createModLookup();

				enterEventList[enterEventList.length] = myModLookup;
				enterEventIDList[enterEventIDList.length] = 'ModLookup';
			
				myComponent = Edo.create({
					id: id?id:'ModLookup234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myModLookup.getCodeClassChoose(),
		               myModLookup.getModLookupPanel()
				    ]
				});
			}
		}
		else if('SMLParamPool'==index){

			var existcomponent = iscomponentexist(id,'SMLParamPool234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLParamPool = new createSMLParamPool();

				enterEventList[enterEventList.length] = mySMLParamPool;
				enterEventIDList[enterEventIDList.length] = 'SMLParamPool';
			
				myComponent = Edo.create({
					id: id?id:'SMLParamPool234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLParamPool.getMenu(),
		               mySMLParamPool.getSMLTable()
				    ]
				});
			}
		}
		else if('SMLParamPool_view'==index){

			var existcomponent = iscomponentexist(id,'SMLParamPool_view234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLParamPool_view = new createSMLParamPool_view();

				enterEventList[enterEventList.length] = mySMLParamPool_view;
				enterEventIDList[enterEventIDList.length] = 'SMLParamPool_view';
			
				myComponent = Edo.create({
					id: id?id:'SMLParamPool_view234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLParamPool_view.getSMLTable()
				    ]
				});
			}
		}
		else if('SMLCodePool'==index){

			var existcomponent = iscomponentexist(id,'SMLCodePool234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLCodePool = new createSMLCodePool();

				enterEventList[enterEventList.length] = mySMLCodePool;
				enterEventIDList[enterEventIDList.length] = 'SMLCodePool';
			
				myComponent = Edo.create({
					id: id?id:'SMLCodePool234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLCodePool.getMenu(),
	               	   mySMLCodePool.getSMLCodeTable()
				    ]
				});
			}
		}
		else if('SMLCodePool_view'==index){

			var existcomponent = iscomponentexist(id,'SMLCodePool_view234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLCodePool_view = new createSMLCodePool_view();

				enterEventList[enterEventList.length] = mySMLCodePool_view;
				enterEventIDList[enterEventIDList.length] = 'SMLCodePool_view';
			
				myComponent = Edo.create({
					id: id?id:'SMLCodePool_view234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               mySMLCodePool_view.getSMLCodeTable()
				    ]
				});
			}
		}
		else if('SMLPoolManage'==index){

			var existcomponent = iscomponentexist(id,'SMLPoolManage234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLPoolManage = new createSMLPoolManage();

				enterEventList[enterEventList.length] = mySMLPoolManage;
				enterEventIDList[enterEventIDList.length] = 'SMLPoolManage';
			
				myComponent = Edo.create({
					id: id?id:'SMLPoolManage234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLPoolManage.getMenu(),
		               mySMLPoolManage.getSMLPoolTable()
				    ]
				});
			}
		}
		else if('SMLPoolManage_view'==index){

			var existcomponent = iscomponentexist(id,'SMLPoolManage_view234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLPoolManage_view = new createSMLPoolManage_view();

				enterEventList[enterEventList.length] = mySMLPoolManage_view;
				enterEventIDList[enterEventIDList.length] = 'SMLPoolManage_view';
			
				myComponent = Edo.create({
					id: id?id:'SMLPoolManage_view234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLPoolManage_view.getSMLPoolTable()
				    ]
				});
			}
		}
		else if('SMLModeling'==index){

			var existcomponent = iscomponentexist(id,'SMLModeling');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLModeling = new createSMLModeling();

				enterEventList[enterEventList.length] = mySMLModeling;
				enterEventIDList[enterEventIDList.length] = 'SMLModeling';
			
				myComponent = Edo.create({
					id: id?id:'SMLModeling234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				       mySMLModeling.getCodeClassChoose(),
		               mySMLModeling.getSMLModeling()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:mySMLModeling
				};
			}
		}
		else if('SMLModelingcheck'==index){
			var existcomponent = iscomponentexist(id,'SMLModelingcheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLModelingcheck = new createSMLModeling_check();
				enterEventList[enterEventList.length] = mySMLModelingcheck;
				enterEventIDList[enterEventIDList.length] = 'SMLModelingcheck';
			  
				myComponent = Edo.create({
					id: id?id:'SMLModelingcheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	mySMLModelingcheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:mySMLModelingcheck
			};
		}
		else if('SMLEdit'==index){

			var existcomponent = iscomponentexist(id,'SMLEdit');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLEdit = new createSMLEdit();

				enterEventList[enterEventList.length] = mySMLEdit;
				enterEventIDList[enterEventIDList.length] = 'SMLEdit';
			
				myComponent = Edo.create({
					id: id?id:'SMLEdit234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               mySMLEdit.getCodeClassChoose(),
		               mySMLEdit.getSMLEditCt()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:mySMLEdit
				};
			}
		}
		
		else if('SMLEditcheck'==index){
			var existcomponent = iscomponentexist(id,'SMLEditcheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLEditcheck = new createSMLEdit_check();
				enterEventList[enterEventList.length] = mySMLEditcheck;
				enterEventIDList[enterEventIDList.length] = 'SMLEditcheck';
			  
				myComponent = Edo.create({
					id: id?id:'SMLEditcheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	mySMLEditcheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:mySMLEditcheck
			};
		}
		else if('checkorder'==index){
			var existcomponent = iscomponentexist(id,'checkorder');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCheckorder = new createCheckorder();

				enterEventList[enterEventList.length] = myCheckorder;
				enterEventIDList[enterEventIDList.length] = 'checkorder';
				myComponent = Edo.create({
					id: id?id:'checkorder234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myCheckorder.getPanel()
				    ]
				});
				  resultComponent={
							myComponent:myComponent,
							realComponent:myCheckorder
					};
			}
		}
		else if('checkplatform'==index){
			var existcomponent = iscomponentexist(id,'checkplatform');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCheckplatform = new createCheckplatform();

				enterEventList[enterEventList.length] = myCheckplatform;
				enterEventIDList[enterEventIDList.length] = 'checkplatform';
				myComponent = Edo.create({
					id: id?id:'checkplatform234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myCheckplatform.getPanel()
				    ]
				});
				  resultComponent={
							myComponent:myComponent,
							realComponent:myCheckplatform
					};
			}
		}
		else if('BomCheck' == index){
			var existcomponent = iscomponentexist(id,'BomCheck');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myBomCheck = new createBomCheck();

				enterEventList[enterEventList.length] = myBomConfig;
				enterEventIDList[enterEventIDList.length] = 'BomCheck';
				myComponent = Edo.create({
					id: id?id:'BomCheck234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				               myBomCheck.getPanel()
				    ]
				});
				  resultComponent={
							myComponent:myComponent,
							realComponent:myBomCheck
					};
			}
		}
		else if('VariantDesignBuild'==index){
			var existcomponent = iscomponentexist(id,'VariantDesignBuild123');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myVariantDesignBuild = new VariantDesignBuild();

				enterEventList[enterEventList.length] = myVariantDesignBuild;
				enterEventIDList[enterEventIDList.length] = 'VariantDesignBuild';
			
				myComponent = Edo.create({
					id: id?id:'VariantDesignBuild123',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myVariantDesignBuild.getCodeClassChoose(),
		               myVariantDesignBuild.getVariantDesignCt()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:myVariantDesignBuild
				};
			}
		}
		else if('VariantDesignBuildcheck'==index){

			var existcomponent = iscomponentexist(id,'VariantDesignBuidl_check123');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var VariantDesignBuildcheck = new createVariantDesignBuidl_check();

				enterEventList[enterEventList.length] = VariantDesignBuildcheck;
				enterEventIDList[enterEventIDList.length] = 'VariantDesignBuildcheck';
			
				myComponent = Edo.create({
					id: id?id:'VariantDesignBuidl_check123',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:VariantDesignBuildcheck
				};
			}
		}
		else if('variantDesign'==index){
			var existcomponent = iscomponentexist(id,'variantDesign123');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myVariantDesign = new createVariantDesign();

				enterEventList[enterEventList.length] = myVariantDesign;
				enterEventIDList[enterEventIDList.length] = 'variantDesign';
			
				myComponent = Edo.create({
					id: id?id:'variantDesign123',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				               	myVariantDesign.getPanel()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:myVariantDesign
				};
			}
		}
		else if('SMLEdit_view'==index){

			var existcomponent = iscomponentexist(id,'SMLEdit_view');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySMLEdit_view = new createSMLEdit_view();

				enterEventList[enterEventList.length] = mySMLEdit_view;
				enterEventIDList[enterEventIDList.length] = 'SMLEdit_view';
			
				myComponent = Edo.create({
					id: id?id:'SMLEdit_view234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               mySMLEdit_view.getCodeClassChoose()
				    ]
				});
			}
		}
		else if('orderview'==index){
			var existcomponent = iscomponentexist(id,'orderview');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myOrderview = new createOrderview();

				enterEventList[enterEventList.length] = myOrderview;
				enterEventIDList[enterEventIDList.length] = 'orderview';
			
				myComponent = Edo.create({
					id: id?id:'orderview234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myOrderview.getTable()
				    ]
				});
			}
		}
		else if('ordermanage'==index){

			var existcomponent = iscomponentexist(id,'ordermanage');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myOrdermanage = new createOrdermanage();

				enterEventList[enterEventList.length] = myOrdermanage;
				enterEventIDList[enterEventIDList.length] = 'ordermanage';
			
				myComponent = Edo.create({
					id: id?id:'ordermanage234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myOrdermanage.getMenu(),
			               myOrdermanage.getTable()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:myOrdermanage
				};
			}
		}
		else if('ordermanagecheck'==index){
			var existcomponent = iscomponentexist(id,'ordermanagecheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myordermanagecheck = new createOrdermanage_check();
				enterEventList[enterEventList.length] = myordermanagecheck;
				enterEventIDList[enterEventIDList.length] = 'ordermanagecheck';
			  
				myComponent = Edo.create({
					id: id?id:'ordermanagecheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myordermanagecheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myordermanagecheck
			};
		}
		else if('neworder'==index){
			var existcomponent = iscomponentexist(id,'neworder');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myNeworder = new createNeworder();

				enterEventList[enterEventList.length] = myNeworder;
				enterEventIDList[enterEventIDList.length] = 'neworder';
			
				myComponent = Edo.create({
					id: id?id:'neworder234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myNeworder.getPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myNeworder
				};
			}
		}
		else if('newordercheck'==index){
			var existcomponent = iscomponentexist(id,'newordercheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mynewordercheck = new createNewOrder_check();
				enterEventList[enterEventList.length] = mynewordercheck;
				enterEventIDList[enterEventIDList.length] = 'newordercheck';
			  
				myComponent = Edo.create({
					id: id?id:'newordercheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	mynewordercheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:mynewordercheck
			};
		}
		else if('checkorder'==index){
			var existcomponent = iscomponentexist(id,'checkorder');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCheckorder = new createCheckorder();

				enterEventList[enterEventList.length] = myCheckorder;
				enterEventIDList[enterEventIDList.length] = 'checkorder';
				myComponent = Edo.create({
					id: id?id:'checkorder234',   
				    type: 'box',                 
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myCheckorder.getPanel()
				    ]
				});
			}
		}
		else if('demandmanage'==index){
			var existcomponent = iscomponentexist(id,'demandmanage');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myDemandmanage = new createDemandmanage();

				enterEventList[enterEventList.length] = myDemandmanage;
				enterEventIDList[enterEventIDList.length] = 'demandmanage';
				myComponent = Edo.create({
					id: id?id:'demandmanage234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               myDemandmanage.getDemandList(),
		               myDemandmanage.getDemandValueList()
				    ]
				});
			}
		}
		else if('templatemanage'==index){
			var existcomponent = iscomponentexist(id,'templatemanage');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myTemplatemanage = new createTemplatemanage();

				enterEventList[enterEventList.length] = myTemplatemanage;
				enterEventIDList[enterEventIDList.length] = 'templatemanage';
				myComponent = Edo.create({
					id: id?id:'templatemanage234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myTemplatemanage.getToolBar(),
			               myTemplatemanage.getTable()
				    ]
				});
			}
		}
		else if('newtemplate'==index){
			var existcomponent = iscomponentexist(id,'newtemplate');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myNewtemplate = new createNewtemplate();

				enterEventList[enterEventList.length] = myNewtemplate;
				enterEventIDList[enterEventIDList.length] = 'newtemplate';
				myComponent = Edo.create({
					id: id?id:'newtemplate234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myNewtemplate.getDemandList(),
			               myNewtemplate.getDefaultDemandValueList()
				    ]
				});
			}
		}
		else if('templateupdate'==index){
			var existcomponent = iscomponentexist(id,'templateupdate');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myTemplateupdate = new createTemplateupdate();

				enterEventList[enterEventList.length] = myTemplateupdate;
				enterEventIDList[enterEventIDList.length] = 'templateupdate';
				myComponent = Edo.create({
					id: id?id:'templateupdate234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    horizontalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				    ]
				});
			}
		}
		else if('platform'==index){
			var existcomponent = iscomponentexist(id,'platform');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPlatform = new createPlatform();

				enterEventList[enterEventList.length] = myPlatform;
				enterEventIDList[enterEventIDList.length] = 'platform';
				myComponent = Edo.create({
					id: id?id:'platform234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myPlatform.getPanel()
				    ]
				});
			    resultComponent={
						myComponent:myComponent,
						realComponent:myPlatform
				};
			}
		}
		else if('platformcheck'==index){
			var existcomponent = iscomponentexist(id,'platformcheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myplatformcheck = new createPlatform_check();
				enterEventList[enterEventList.length] = myplatformcheck;
				enterEventIDList[enterEventIDList.length] = 'platformcheck';
			  
				myComponent = Edo.create({
					id: id?id:'platformcheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myplatformcheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myplatformcheck
			};
		}

		else if('platform_view'==index){
			var existcomponent = iscomponentexist(id,'platform_view');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPlatform_view = new createPlatform_view();

				enterEventList[enterEventList.length] = myPlatform_view;
				enterEventIDList[enterEventIDList.length] = 'platform_view';
				myComponent = Edo.create({
					id: id?id:'platform_view234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myPlatform_view.getPanel()
				    ]
				});
			}
		}
		else if('platformStruct'==index){
			var existcomponent = iscomponentexist(id,'platformStruct');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPlatformStruct = new createPlatformStruct();

				enterEventList[enterEventList.length] = myPlatformStruct;
				enterEventIDList[enterEventIDList.length] = 'platformStruct';
				myComponent = Edo.create({
					id: id?id:'platformStruct234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myPlatformStruct.getPanel()
				    ]
				});
				resultComponent={
						myComponent:myComponent,
						realComponent:myPlatformStruct
				};
			}
		}
		else if('platformStructcheck'==index){
			var existcomponent = iscomponentexist(id,'platformStructcheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myplatformStructcheck = new createPlatformStruct_check();
				enterEventList[enterEventList.length] = myplatformcheck;
				enterEventIDList[enterEventIDList.length] = 'platformStructcheck';
			  
				myComponent = Edo.create({
					id: id?id:'platformStructcheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	myplatformStructcheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:myplatformStructcheck
			};
		}

		else if('platformStruct_view'==index){
			var existcomponent = iscomponentexist(id,'platformStruct_view');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPlatformStruct_view = new createPlatformStruct_view();

				enterEventList[enterEventList.length] = myPlatformStruct_view;
				enterEventIDList[enterEventIDList.length] = 'platformStruct_view';
				myComponent = Edo.create({
					id: id?id:'platformStruct_view234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
		               	myPlatformStruct_view.getPanel()
				    ]
				});
			}
		}
		else if('structRule'==index){
			var existcomponent = iscomponentexist(id,'structRule');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myStructRule = new createStructRule();

				enterEventList[enterEventList.length] = myStructRule;
				enterEventIDList[enterEventIDList.length] = 'structRule';
				myComponent = Edo.create({
					id: id?id:'structRule234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myStructRule.getStructPanel(),      
			               myStructRule.getStructRulePanel()
				    ]
				});
				 resultComponent={
							myComponent:myComponent,
							realComponent:myStructRule
					};
			}
		}
		else if('structRulecheck'==index){
			var existcomponent = iscomponentexist(id,'structRulecheck234');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mystructRulecheck = new createStructRule_check();
				enterEventList[enterEventList.length] = mystructRulecheck;
				enterEventIDList[enterEventIDList.length] = 'structRulecheck';
			  
				myComponent = Edo.create({
					id: id?id:'structRulecheck234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,10,0,5],
				    children: [
				    	mystructRulecheck.getBox()
				    ]
				});
			}
		    resultComponent={
					myComponent:myComponent,
					realComponent:mystructRulecheck
			};
		}
		else if('structRule_view'==index){
			var existcomponent = iscomponentexist(id,'structRule_view');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myStructRule_view = new createStructRule_view();

				enterEventList[enterEventList.length] = myStructRule_view;
				enterEventIDList[enterEventIDList.length] = 'structRule_view';
				myComponent = Edo.create({
					id: id?id:'structRule_view234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myStructRule_view.getStructPanel(),      
			               myStructRule_view.getStructRulePanel()
				    ]
				});
			}
		}
		else if('checkplatform'==index){
			var existcomponent = iscomponentexist(id,'checkplatform');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCheckplatform = new createCheckplatform();

				enterEventList[enterEventList.length] = myCheckplatform;
				enterEventIDList[enterEventIDList.length] = 'checkplatform';
				myComponent = Edo.create({
					id: id?id:'checkplatform234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
			               myCheckplatform.getPanel()
				    ]
				});
			}
		}
		else if('BomConfig'==index){
			var existcomponent = iscomponentexist(id,'BomConfig');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myBomConfig = new createBomConfig();

				enterEventList[enterEventList.length] = myBomConfig;
				enterEventIDList[enterEventIDList.length] = 'BomConfig';
				myComponent = Edo.create({
					id: id?id:'BomConfig234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myBomConfig.getOrderInfo(),
						myBomConfig.getPlatForm(),
						myBomConfig.getBomDisplay()
				    ]
				});
				 resultComponent={
							myComponent:myComponent,
							realComponent:myBomConfig
					};
			}
		}else if('BomCheck' == index){
			var existcomponent = iscomponentexist(id,'BomCheck');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myBomCheck = new createBomCheck();

				enterEventList[enterEventList.length] = myBomConfig;
				enterEventIDList[enterEventIDList.length] = 'BomCheck';
				myComponent = Edo.create({
					id: id?id:'BomCheck234',   
				    type: 'box',                 
				    layout: 'horizontal',  
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
				               myBomCheck.getPanel()
				    ]
				});
			}
		}
		else if('historyBomView'==index){
			var existcomponent = iscomponentexist(id,'historyBomView');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myHistoryBomView = new createHistoryBomView();

				enterEventList[enterEventList.length] = myHistoryBomView;
				enterEventIDList[enterEventIDList.length] = 'historyBomView';
				myComponent = Edo.create({
					id: id?id:'historyBomView234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myHistoryBomView.getGroup1(),
						myHistoryBomView.getTable()
						//myHistoryBomView.getGroup2()
				    ]
				});
			}
		}
	
	/**************************************************************************/
		else if('IndustryProductAnalyse'==index){
			var existcomponent = iscomponentexist(id,'IndustryProductAnalyse');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myIndustryProductAnalyse = new createIndustryProductAnalyse();

				enterEventList[enterEventList.length] = myIndustryProductAnalyse;
				enterEventIDList[enterEventIDList.length] = 'IndustryProductAnalyse';
				myComponent = Edo.create({
					id: id?id:'IndustryProductAnalyse234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myIndustryProductAnalyse.getComponent()
				    ]
				});
			}
		}
		else if('CustomerDemandMatch'==index){
			var existcomponent = iscomponentexist(id,'CustomerDemandMatch');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myCustomerDemandMatch = new createCustomerDemandMatch();

				enterEventList[enterEventList.length] = myCustomerDemandMatch;
				enterEventIDList[enterEventIDList.length] = 'CustomerDemandMatch';
				myComponent = Edo.create({
					id: id?id:'CustomerDemandMatch234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myCustomerDemandMatch.getComponent()
				    ]
				});
			}
		}
		else if('ProductMarket'==index){
			var existcomponent = iscomponentexist(id,'ProductMarket');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myProductMarket = new createProductMarket();

				enterEventList[enterEventList.length] = myProductMarket;
				enterEventIDList[enterEventIDList.length] = 'ProductMarket';
				myComponent = Edo.create({
					id: id?id:'ProductMarket234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myProductMarket.getComponent()
				    ]
				});
			}
		}
		else if('DesignTaskDeclare'==index){
			var existcomponent = iscomponentexist(id,'DesignTaskDeclare');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myDesignTaskDeclare = new createDesignTaskDeclare();

				enterEventList[enterEventList.length] = myDesignTaskDeclare;
				enterEventIDList[enterEventIDList.length] = 'DesignTaskDeclare';
				myComponent = Edo.create({
					id: id?id:'DesignTaskDeclare234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myDesignTaskDeclare.getComponent()
				    ]
				});
			}
		}
		else if('FunctionTreeCreate'==index){
			var existcomponent = iscomponentexist(id,'FunctionTreeCreate');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myFunctionTreeCreate = new createFunctionTreeCreate();

				enterEventList[enterEventList.length] = myFunctionTreeCreate;
				enterEventIDList[enterEventIDList.length] = 'FunctionTreeCreate';
				myComponent = Edo.create({
					id: id?id:'FunctionTreeCreate234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myFunctionTreeCreate.getComponent()
				    ]
				});
			}
		}
		else if('ProductFunctionModule'==index){
			var existcomponent = iscomponentexist(id,'ProductFunctionModule');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myProductFunctionModule = new createProductFunctionModule();

				enterEventList[enterEventList.length] = myProductFunctionModule;
				enterEventIDList[enterEventIDList.length] = 'ProductFunctionModule';
				myComponent = Edo.create({
					id: id?id:'ProductFunctionModule234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myProductFunctionModule.getComponent()
				    ]
				});
			}
		}
		else if('ModuleDivide'==index){
			var existcomponent = iscomponentexist(id,'ModuleDivide');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myModuleDivide = new createModuleDivide();

				enterEventList[enterEventList.length] = myModuleDivide;
				enterEventIDList[enterEventIDList.length] = 'ModuleDivide';
				myComponent = Edo.create({
					id: id?id:'ModuleDivide234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myModuleDivide.getComponent()
				    ]
				});
			}
		}
		else if('PartStatistics'==index){
			var existcomponent = iscomponentexist(id,'PartStatistics');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myPartStatistics = new createPartStatistics();

				enterEventList[enterEventList.length] = myPartStatistics;
				enterEventIDList[enterEventIDList.length] = 'PartStatistics';
				myComponent = Edo.create({
					id: id?id:'PartStatistics234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myPartStatistics.getComponent()
				    ]
				});
			}
		}
		else if('StatisticsResult'==index){
			var existcomponent = iscomponentexist(id,'StatisticsResult');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var myStatisticsResult = new createStatisticsResult();

				enterEventList[enterEventList.length] = myStatisticsResult;
				enterEventIDList[enterEventIDList.length] = 'StatisticsResult';
				myComponent = Edo.create({
					id: id?id:'StatisticsResult234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						myStatisticsResult.getComponent()
				    ]
				});
			}
		}
		else if('SchemeDesign'==index){
			var existcomponent = iscomponentexist(id,'SchemeDesign');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySchemeDesign = new createSchemeDesign();

				enterEventList[enterEventList.length] = mySchemeDesign;
				enterEventIDList[enterEventIDList.length] = 'SchemeDesign';
				myComponent = Edo.create({
					id: id?id:'SchemeDesign234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						mySchemeDesign.getComponent()
				    ]
				});
			}
		}
		else if('SchemeChoose'==index){
			var existcomponent = iscomponentexist(id,'SchemeChoose');
			if(null!=existcomponent){
				myComponent=existcomponent;
			}else{
				var mySchemeChoose = new createSchemeChoose();

				enterEventList[enterEventList.length] = mySchemeChoose;
				enterEventIDList[enterEventIDList.length] = 'SchemeChoose';
				myComponent = Edo.create({
					id: id?id:'SchemeChoose234',   
				    type: 'box',                 
				    layout: 'vertical',  
				    verticalGap:0,
				    width: '100%',
				    height: '100%',
				    border:[0,0,0,0],
				    padding: [0,0,0,0],
				    children: [
						mySchemeChoose.getComponent()
				    ]
				});
			}
		}
	
	
	return resultComponent;
}

function iscomponentexist(id,backupid)
	{
			var existcomponent=Edo.get(id?id:backupid);
			if(null!=existcomponent)
			return existcomponent;
			else
			return null;
	
	}