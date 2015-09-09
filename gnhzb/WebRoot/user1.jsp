<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.springside.modules.security.springsecurity.SpringSecurityUtils"%>
<%@ include file="/common/taglibs.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
<head>
<title>基于全生命周期的高能耗装备设计平台</title>

</head>
<body style="margin: 0px;  width: 100%; overflow:hidden;" scroll="no">
	<input type="hidden" id="cimsMessage">
	<div id="bottomBar" class="cims201_message_bar_ie"></div>

</body>
</html>

<link href="<%=basePath%>js/edo/res/css/edo-all.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>css/wenku.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath%>css/cims201.css" rel="stylesheet" type="text/css" />

<script src="<%=basePath%>js/knowledge/keep/keeputils.js" type="text/javascript"></script>
<script src="<%=basePath%>js/edo/edo.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="<%=basePath%>js/commontools/boxText.js" type="text/javascript"></script>
<script src="<%=basePath%>js/commontools/Window.js" type="text/javascript"></script>
<script src="<%=basePath%>js/commontools/PopupManager.js" type="text/javascript"></script>
<script src="<%=basePath%>js/cims201.js" type="text/javascript"></script>
<script src="<%=basePath%>js/utils.js" type="text/javascript"></script>
<script src="<%=basePath%>js/navigator/nav.js" type="text/javascript"></script>
<script src="<%=basePath%>js/navigator/navCenter.js" type="text/javascript"></script>

<script src="<%=basePath%>js/systemevent.js" type="text/javascript"></script>
<script src="<%=basePath%>js/commontools/commonTable.js" type="text/javascript"></script>
<script src="<%=basePath%>js/commontools/commonTree.js" type="text/javascript"></script>
<script src="<%=basePath%>js/tree/commontree.js" type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-list-table.js" type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-util.js" type="text/javascript"></script>
<script src="<%=basePath%>js/swfupload/swfupload.js" type="text/javascript"></script>
<script type="text/javascript" src="<%=basePath%>js/swfupload/swfupload.queue.js"></script>

<!-- 搜索 -->
<script src="<%=basePath%>js/knowledge/knowledge_search.js"
	type="text/javascript"></script>
<!-- 搜索的简约界面 -->
<script src="<%=basePath%>js/knowledge/knowledge_search_index.js"
	type="text/javascript"></script>
<!-- avidm搜索界面 -->
<script src="<%=basePath%>js/knowledge/avidm_search.js"
	type="text/javascript"></script>

<!-- 知识展示 -->
<script src="<%=basePath%>js/commontools/starJudge.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-view.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-position-view.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/question-view.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-list-box.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/knowledge-list-fulltext.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/tree/tree-util.js" type="text/javascript"></script>

<script src="<%=basePath%>js/knowledge/ktype/ktype.js"
	type="text/javascript"></script>
<!-- 借阅-->
<script src="<%=basePath%>js/knowledge/borrow/borrowapprval.js"
	type="text/javascript"></script>
<!-- 评论 -->
<script src="<%=basePath%>js/comment/comment-view.js"
	type="text/javascript"></script>

<!--术语本体共建 -->
<script src="<%=basePath%>js/ontocomment/ontocomment-view.js"
	type="text/javascript"></script>
<!-- 主页js -->
<script src="<%=basePath%>js/index.js" type="text/javascript"></script>
<script src="<%=basePath%>js/getComponentByIndex.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/tree/treeKnowledgePanel.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/system_index.js" type="text/javascript"></script>


<!-- 消息 -->
<script type="text/javascript" src="<%=basePath%>js/dwr/chat.js"></script>
<script type='text/javascript'
	src='<%=basePath%>dwr/interface/ChatManager.js'></script>
<script type='text/javascript' src='<%=basePath%>dwr/engine.js'></script>
<script type='text/javascript' src='<%=basePath%>dwr/util.js'></script>

<!-- 专利   江丁丁 添加 2013-5-12 -->
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentch_search.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentch_list.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentch_view.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentus_search.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentus_list.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/patent/patentus_view.js"></script>

<!-- 名人专栏 江丁丁添加2013-6-5 -->
<script type="text/javascript"
	src="<%=basePath%>js/expert/expert_home.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/expert/add_article.js"></script>

<script src="<%=basePath%>js/message/message-list.js"
	type="text/javascript"></script>

<script type="text/javascript">
	//整个应用的全局变量:系统用户
	cims201User = null;
</script>

<script src="${ctx}/js/message/message.js" type="text/javascript"></script>
<script src="${ctx}/js/message/message-bar.js" type="text/javascript"></script>
<script src="${ctx}/js/message/chat-box.js" type="text/javascript"></script>

<!-- 审批知识 -->
<script src="<%=basePath%>js/user/roleuserselector.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/approval/approval_new.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/keep/keeputils.js"
	type="text/javascript"></script>
<!-- 知识问答 -->
<script src="<%=basePath%>js/question/answerrank.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/expertinput.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/experttreeinput.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/treeexpertlist.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/myanswerlist.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/questionsearch.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/waitedquestionlist.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/expertinfolist.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/question/questionFilter.js"
	type="text/javascript"></script>

<!-- 兴趣模型 -->
<script src="<%=basePath%>js/interestmodel/interestmodellist.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/interestmodel/interestmodel.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/interestmodel/changeImCount.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/interestmodel/imknowledge-list-box.js"
	type="text/javascript"></script>


<!-- 统计分析 -->
<script src="<%=basePath%>js/statistics/knowledgerank.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/statistics/userrank.js"
	type="text/javascript"></script>

<!-- 系统管理 -->
<script src="<%=basePath%>js/systemmanage/behaviormanage.js"
	type="text/javascript"></script>
<!-- 本体编辑管理 -->
<script src="<%=basePath%>js/systemmanage/ontologymanage.js"
	type="text/javascript"></script>
<!--标准集成  -->
<script src="<%=basePath%>js/knowledge/standard-list-box.js"
	type="text/javascript"></script>
<script src="<%=basePath%>js/knowledge/standard_search.js"
	type="text/javascript"></script>
<!--知识收藏 -->
<script src="<%=basePath%>js/knowledge/keep/keeputils.js"
	type="text/javascript"></script>


<!-- 设计资源获取    张买军添加 -->
<script src="<%=basePath%>js/resource/resource_user.js"
	type="text/javascript"></script>

<script type="text/javascript">
	//整个应用的全局变量
	//系统用户
	cims201User = null;
	//获取当前登录用户的姓名
	currentUser = cims201.utils.getData('user/user!getuser.action', {});  		
</script>

<script type="text/javascript">	
	var cims201_indexPage = new createSystemIndex();
	//添加回车事件
	//alert(mySearchUI.getId());
	enterEventList[enterEventList.length] = cims201_indexPage;
	enterEventIDList[enterEventIDList.length] = 'knowledgesearch_mainpage';
	var basePath='<%=basePath%>';

 	//构建主体框架
    Edo.build({
        type: 'app',
        render: document.body,
        //width: cims201.utils.getScreenSize().width,
        //height: cims201.utils.getScreenSize().height,
        //height: cims201.utils.getScreenSize().height+50,
        layout: 'vertical',
        padding: [0,0,0,0],
        border: [0,0,0,0],
        //增加框架的元素
        children:[
        	//顶栏描述
        	{	id:'navBtns',
                type: 'box',border:[0,0,0,0],padding: [0,0,0,0],width: '100%',height: '76', layout: 'horizontal',titleIcon:'',
                bodyCls: 'cims201_topbar_bg9',
                children:[         
	                {
					    type: 	'label',width: 	'100%', height: '100%',
					    //style:	'font-size:20px;padding:5px;padding-top:8px;font-family:微软雅黑, 宋体, Verdana;font-weight:bold; ',    
					    text: '<div class="cims201_topbar_bg9"></div>'
	                },
	                
	                {
	                	type: 'label', height:76, style: 'font-size:13px;padding-left:2px; padding-right:2px;padding-top:50px;font-weight:bold;', text: '欢迎您，'+currentUser.name+'!'
	                },
	               
	                {

	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href=""><div class="cims201_topbar_icon">&nbsp;<image height=45 width=45 src=css/images/home2.png><br>&nbsp;系统主页</div></a>'

	                },
	                //张买军 设计资源获取
	                //{
	                //	type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href=javascript:navManager("resource")><div class="cims201_topbar_icon">&nbsp;<image height=45 width=45 src=css/images/jicheng.png><br>&nbsp;设计资源</div></a>'
	               // }, 
	                {
	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href="<%=basePath%>j_spring_security_logout"><div class="cims201_topbar_icon">&nbsp;<image style=height:45px  src="css/images/exit.png"><br>&nbsp;&nbsp;&nbsp;退出&nbsp;</div></a>'
	                }
                ]
            },
            //工具栏
            
            //主界面
            
              cims201_indexPage.getIndex()
		    
		    
        ]
    });      
	
	
	//根据不同的浏览器设置不同的样式  	
	var Sys = cims201.utils.getExploreVersion();
	if(Sys.ie == '6.0'){
		document.getElementById('bottomBar').setAttribute("className","cims201_message_bar_ie");	
		//alert('ie6');
	}else{
		document.getElementById('bottomBar').setAttribute("class","cims201_message_bar");	
	}
	var myMessageBar = new createMessageBar(document.getElementById('bottomBar')).getMessageBar();
	
	
	var data=cims201.utils.getData('privilege/show-button!whetherShowSystemManagerBtn.action');
	if(data.show == true || data.show == 'true'){
		Edo.get('navBtns').addChildAt((Edo.get('navBtns').children.length-1),{
	                    type: 'label', height:76, style: 'padding-left:2px; padding-right:2px;padding-top:5px;', text: '<a href="http://localhost:8080/gnhzb/configuration.jsp";><div class="cims201_topbar_icon">&nbsp;<image style=height:45px  src=css/images/peizhi.png><br>&nbsp;系统配置</div></a>'
	                });
	}
	

	
	
	<%if (request.getAttribute("keyword") != null) {
				//表明是从北航传过来的请求%>
		var beihang_keyword = '<%=request.getAttribute("keyword")%>';

	openNewTab(beihang_keyword, 'knowledgelist_fulltext', beihang_keyword, {
		key : beihang_keyword
	});
<%}%>
	/**
	 打开一个新的tab
	 */
	function openNewTab(id, index, title, params) {
		//首先将enter事件取消注册
		currentEventID = null;

		var mainTabBar = Edo.get('mainTabBar');
		var mainTabContent = Edo.get('mainTabContent');
		var tabSize1 = mainTabBar.children.length;
		var tabSelectedIndex1 = mainTabBar.selectedIndex;
		var c = null;
		var module = getComponentByIndex('cont_' + index + '' + id, index,
				params);
		if (module == 'error') {
		} else {
			if (module == null) {
				module = Edo.create({

					type : 'module',
					width : '100%',
					height : '95%',
					src : 'building.jsp'
				});
			}

			mainTabBar.children.each(function(o) {
				if (('tbar' + index + '' + id) == o.id) {
					c = o;
				}
			});

			if (c == null) {
				c = mainTabBar.addChildAt(tabSize1, {
					id : 'tbar' + index + '' + id,
					type : 'button',
					icon : params['btIcon'] ? params['btIcon'] : null,
					width : 100,
					text : title,
					arrowMode : 'close',
					onarrowclick : function(e) {
						//删除对应的enter事件
						enterEventIDList.each(function(o, mi) {
							if (('cont_' + index + '' + id) == o) {
								enterEventIDList.splice(mi, 1);
								enterEventList.splice(mi, 1);
							}
						});
						//alert(index+id);
						//根据idx, 删除对应的容器				
						var currentContent = null;
						mainTabContent.children.each(function(o) {

							if (('cont_' + index + '' + id) == o.id) {
								currentContent = o;
							}
						});

						//currentContent = mainTabContent.getChildAt(mainTabBar.selectedIndex);
						if (currentContent != null) {
							currentContent.destroy();
						}
						//选中原来Index处					
						var tabitem = mainTabBar
								.getChildAt(mainTabBar.selectedIndex);
						if (!tabitem) {
							tabitem = mainTabBar
									.getChildAt(mainTabBar.selectedIndex - 1);
						}
						mainTabBar.set('selectedItem', tabitem);
					}
				});

				mainTabContent.addChildAt(tabSize1, module);
			};
			mainTabBar.set('selectedItem', c);
		}
	}

	function getWinfordtree(id, uuid) {

		dtreewin = cims201.utils.getWinforcdtree(700, 470, "选择域名称",
				creatmodifydtreebox(id, "", "upload", uuid));
		setWinScreenPosition(700, 470, dtreewin);
		//return dtreewin;
	}
	function getWinforctree(id, uuid) {
		ctreewin = cims201.utils.getWinforcdtree(700, 470, "选择分类名称",
				creatmodifyctreebox(id, null, "", "upload", uuid));
		setWinScreenPosition(700, 470, ctreewin);
		//return dtreewin;
	}
	function getWinforsimupload(componentid, selectedcdtree) {
		if (Edo.get('cont_knowledgeupload4') != null) {
			Edo.get('cont_knowledgeupload4').childWindow.setcdtreeselected(
					componentid, selectedcdtree);
		}
		if (Edo.get('cont_batchknowledgeupload4')) {
			Edo.get('cont_batchknowledgeupload4').childWindow
					.setcdtreeselected(componentid, selectedcdtree);
		}

	}
	navManager('resource');
	
</script>
