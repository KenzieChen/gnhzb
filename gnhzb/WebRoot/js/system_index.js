//系统主页 searchengine
function createSystemIndex(){
	var noticePanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">公告</span>',
		titleIcon: 'cims201_notice_icon',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: []
	});
	
	cims201.utils.getData_Async('message/message!listTypeMessages.action',{messageType:'notice',index:0,size:10},function(text){
		var data = Edo.util.Json.decode(text);
		data.data.each(function(r){
			noticePanel.addChild({
				type: 'box',
				width: '100%',
				//height: '100%',
				border: [0,0,0,0],
				padding: [0,0,0,0],
				layout: 'horizontal',
				bodyCls: 'cims201_notice_title',
				children: [
					{type: 'boxtext', width: '100%', style:'padding-left:10px;padding-top: 5px;', text: r.content+'<br>'+ r.sendTime+'<br><br>'}//,
					//{type: 'label', text: r.sendTime}
				]
			});
		});
	});

	
	
	//综合查询
	var myHotword = Edo.create({
		type: 'box',
		width: '100%',
		border: [0,0,0,0],
		padding: [10,0,0,0],
		bodyStyle: 'font-size:13px;',
		layout: 'horizontal',
		children: [
			{type: 'label',  align: 'center', text: '热词:'}				
		]
	});
	var mySearchInput = Edo.create({
		type: 'autocomplete', 
		width: '90%', 
		queryDelay: 2000,
		url: 'knowledge/knowledge!searchHotword.action',
		popupHeight: '100',
		valueField: 'name', 
		displayField: 'name',
		onclick: function(e){
			currentEventID = 'knowledgesearch_mainpage';
		},
		onblur: function(e){
			currentEventID = null;
		}
	});
	
	function search(){
		var myKey = mySearchInput.get('text');
		openNewTab(concatName(myKey), 'knowledgelist_fulltext', concatName(myKey), {key:myKey});						
	}
	
	cims201.utils.getData_Async('knowledge/knowledge!listHotword.action',{},function(text){
		if(text != null && text != ''){
			var data = Edo.util.Json.decode(text);
			data.each(function(o){
				myHotword.addChild({type: 'label', text: '<a href=javascript:openNewTab("'+concatName(o.name)+'","knowledgelist_fulltext","'+concatName(o.name)+'",{key:"'+o.name+'"});>'+o.name+'</a>'});
			});
		}
	});
	
	
	var mySearchIndex = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">综合查询</span>',
		titleIcon: 'cims201_search_title',
		width: '100%',
		height: '100%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		//bodyCls: 'cims201_search_body',
		layout: 'vertical',
		children: [
			{
				type: 'box',
				width: '100%',
				border: [0,0,0,0],
				padding: [0,0,0,0],
				layout: 'horizontal',
				children:[
					{type: 'label', width: 150, text: ''},
					{
						type: 'box',
						width: '100%',
						border: [0,0,0,0],
//						padding:[10,0,10,0],
						padding: [(cims201.utils.getScreenSize().height/10),(cims201.utils.getScreenSize().width/18-12),0,(cims201.utils.getScreenSize().width/18-60)],
						layout: 'vertical',
						children: [
							{type: 'label', width: '100%', style:'padding-left:'+(cims201.utils.getScreenSize().width/18)+'px;',text: '<img src="css/images/searchengine.jpg" height=100></img>'},
							{
								type: 'box',
								width: '100%',
								border: [0,0,0,0],
								padding: [0,0,0,0],
								layout: 'horizontal',
								children: [
									mySearchInput,
									{type: 'button', icon:'knowldge_search_action', text: '搜索', onclick: function(e){
										search();
									}}	
								]
							}
							,
							myHotword		
						]
					}
					
				]
			}
			
		]
	});
	
	//统计界面
	var statisticPanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">知识分类图</span>',
		titleIcon: 'cims201_statistic_title',
		
		width: '100%',
		height: '50%',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: [{
			type: 'module',
			width: '100%',
			height: '100%',
			src: 'statistic/statistic!knowledgetyperank.action'
		}]
	});
	
	//知识模板列表
	var templatePanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">兴趣十知识</span>',
		titleIcon: 'cims201_template_icon',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: []
	});
	
	
	
	//订阅信息列表数据的获取  江丁丁 2013-6-24添加
	cims201.utils.getData_Async('interestmodel/interestmodel!listinterestknowledge.action',{},function(text){
		var data = Edo.util.Json.decode(text);
		
		data.data.each(function(r){
			if(null!=r.titleName)
				
				var title_outStr = '';
			if(r.titleName.length > 10){
				title_outStr += r.titleName.substring(0,10)+'...';
			}else{
				title_outStr += r.titleName;
			}
			
			templatePanel.addChild({
				type: 'box',
				width: '100%',
				//height: '100%',
				border: [0,0,0,0],
				padding: [5,0,0,5],
				layout: 'horizontal',
				bodyCls: 'cims201_template_title',
				children: [
				           {type: 'label', width:'160', text: '<a href=\"javascript:showKnowledgeDetail('+r.id+',\''+title_outStr+'\')";><span class="knowledge_list_title">'+title_outStr+'</span></a>'},
				           {type: 'label', text: r.uploaddate}
				           ]
			});
		});
			
		
		
	});
	
	//知识模板列表
/*	var templatePanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">知识模板</span>',
		titleIcon: 'cims201_template_icon',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: []
	});
	cims201.utils.getData_Async('knowledge/ktype/ktype!listAllktype.action',{withoutCommon:true,index:0,size:10},function(text){
		var data = Edo.util.Json.decode(text);
		data.data.each(function(r){
			if(null!=r.templatePath)
			templatePanel.addChild({
				type: 'box',
				width: '100%',
				//height: '100%',
				border: [0,0,0,0],
				padding: [5,0,0,20],
				layout: 'horizontal',
				bodyCls: 'cims201_template_title',
				children: [
					{type: 'label', text: '<img src="css/application_view_detail1.png"><a href="template/'+r.templatePath+'">《'+r.ktypeName+'知识模板》</a>'}
				]
			});
		});
	});
*/	
	
	
	
	
	//用户排行
	var myRankData = cims201.utils.getData('userranking/userranking!list.action',{rankType:'totoalscore',model_:'all',size:10,index:0,rankAsTable:'yes'});
	//var myRankData = [];
	
	var rankPanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">排行榜</span>',
		titleIcon: 'cims201_rank_title',
		width: '100%',
		height: '50%',
		border: [1,1,1,1],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: [{
			type: 'table',
			width: 600,
            height: 400,
            verticalLine: false,
			horizontalLine: false,
			headerVisible: false,
			horizontalScrollPolicy : 'off',
			autoColumns: false,
			data: myRankData,
			columns:[
				{
                    headerText: '',
                    align: 'center',
                    width: 25,                        
                    enableSort: false,
                    enableDragDrop: true,
                    enableColumnDragDrop: false,
                    style:  'cursor:move;',
                    renderer: function(v, r, c, i, data, t){
                        //return '<span style="padding:2px;padding-left:6px;padding-right:6px;line-height:20px;">'+i+'</span>';
                        if(i<3){
                        	return '<div style="width:25px;height:22px;text-align:center;line-height:20px;color:red;">'+(i+1)+'</div>';
                        }else{
                        	return '<div style="width:25px;height:22px;text-align:center;line-height:20px;">'+(i+1)+'</div>';
                        }
                        //return i;
                    }
                }, 
				{header: '姓名', width: 150, dataIndex: 'name'},        
				{header: '贡献度',width: 50, dataIndex: 'id'}
			]			
		}]
	});
	
	var rightPanel_index = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		width: '20%',
		height: '100%',
		layout: 'vertical',
		children: [
			noticePanel,rankPanel
		]
	});
	var leftPanel_index = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,0,0],
		width: '20%',
		height: '100%',
		layout: 'vertical',
		children: [
			statisticPanel,templatePanel
		]
	});
	
	//江丁丁添加 2013-6-24
	var knowledgePanel = Edo.create({
		type: 'panel',
		title: '<span class="cims201_con_font">最新动态</span>',
		titleIcon: 'cims201_search_title',
		width: '100%',
		height: '100%',
		//border: [0,0,0,0],
		padding: [0,0,0,0],
		layout: 'vertical',
		children: [
		           	
		           ]
	});
	
	
	
	
	var middlePanel_index = Edo.create({
		type: 'box',
		border: [0,0,0,0],
//		padding: [0,0,20,0],
		width: '60%',
		height: '100%',
		layout: 'vertical',
		children: [
		           mySearchIndex
//		           knowledgePanel
		]
	});
		
	var cims201_indexPage = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,20,0],
		width: '100%',
		height: '100%',
		layout: 'horizontal',
		children: [
	        //leftPanel_index	, middlePanel_index,rightPanel_index
			{type: 'module', width: '100%', height: '100%',style: "border: [0,0,0,0];padding:[0,0,0,0]; background-color: #efdacd;", src: '/gnhzb/mod_desc.jsp'}
		]
	});
	
	this.getIndex = function(){
		return cims201_indexPage;
	};
	
	var cims201_resource_indexPage = Edo.create({
		type: 'box',
		border: [0,0,0,0],
		padding: [0,0,20,0],
		width: '100%',
		height: '100%',
		layout: 'horizontal',
		children: [
	        leftPanel_index	, middlePanel_index,rightPanel_index
		]
	});
	
	this.getResourceIndex = function(){
		return cims201_resource_indexPage;
	};
	
	this.enter = function(){
		mySearchInput.blur();
		search();
		mySearchInput.focus();
	};
}