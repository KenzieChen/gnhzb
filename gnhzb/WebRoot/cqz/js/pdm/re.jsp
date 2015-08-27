<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String taskid=request.getParameter("taskid");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>re</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	 <link href="<%=basePath%>css/liuchang/edo_green_theme/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />
	
  </head>
  <body>
    <script type="text/javascript">
  		//整个应用的全局变量
  		//系统用户
  		cims201User = null;
  		
  	</script>
  </body>
		<script src="<%=basePath%>css/liuchang/edo_green_theme/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/utils.js" type="text/javascript"></script>
	    <!-- 知识搜索 -->
	    <script src="<%=basePath %>js/knowledge/knowledge-list-box.js" type="text/javascript"></script>
	    <script src="<%=basePath %>js/knowledge/knowledge-util.js" type="text/javascript"></script>
	    <script src="<%=basePath %>js/knowledge/knowledge-list-fulltext.js" type="text/javascript"></script>
	    <script src="<%=basePath %>js/systemevent.js" type="text/javascript"></script>
	    <script src="<%=basePath %>js/getComponentByIndexTask.js" type="text/javascript"></script>
		<!-- 编码管理系统 陈谦庄 -->
<script src="<%=basePath%>js/CodeClass/codeclassdefi.js" type="text/javascript"></script>
<script src="<%=basePath%>js/CodeClass/codeclassdefi_check.js" type="text/javascript"></script>
<script src="<%=basePath%>js/CodeClass/CodeClassManage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/CodeClass/CodeClassManage_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/CodeClass/CodeClassRuleManage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/CodeClass/CodeClassRuleManage_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/CodeClass/CodeClassStructManage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/CodeClass/CodeClassStructManage_check.js" type="text/javascript"></script>


<!-- 模块管理系统 陈谦庄 -->
<script src="<%=basePath%>js/ModuleManage/DocTypeManage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/ModInterface.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/ModLookup.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/PartCreate.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/PartInstanceRg.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/PartUpload.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModuleManage/StructUpload.js" type="text/javascript"></script>

<!-- 事物特性管理  陈谦庄 -->
<script src="<%=basePath%>js/SMLManage/SMLCodePool_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLCodePool.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLEdit_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLEdit.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLEdit_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/SMLManage/SMLModeling.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLModeling_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/SMLManage/SMLParamPool_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLParamPool.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLPoolManage_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/SMLManage/SMLPoolManage.js" type="text/javascript"></script>

<!-- 配置需求管理 陈谦庄 -->
<script src="<%=basePath%>js/ConfigDemandManage/checkorder.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/demandmanage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/neworder.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/neworder_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/ConfigDemandManage/newtemplate.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/ordermanage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/ordermanage_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/ConfigDemandManage/orderview.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/templatemanage.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDemandManage/templateupdate.js" type="text/javascript"></script>

<!-- 模块配置设计 陈谦庄 -->
<script src="<%=basePath%>js/ConfigDesign/BomConfig.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/historyBomView.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/platform_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/platform.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/platform_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/ConfigDesign/platformStruct_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/platformStruct.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/platformStruct_check.js" type="text/javascript"></script>

<script src="<%=basePath%>js/ConfigDesign/structRule_view.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/structRule.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ConfigDesign/structRule_check.js" type="text/javascript"></script>

<%-- <script src="<%=basePath%>js/ConfigDesign/checkplatform.js" type="text/javascript"></script> --%>

<script src="<%=basePath%>js/ModTemp/IndustryProductAnalyse.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/CustomerDemandMatch.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/ProductMarket.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/DesignTaskDeclare.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/FunctionTreeCreate.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/ProductFunctionModule.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/ModuleDivide.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/PartStatistics.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/StatisticsResult.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/SchemeDesign.js" type="text/javascript"></script>
<script src="<%=basePath%>js/ModTemp/SchemeChoose.js" type="text/javascript"></script>

<script src="<%=basePath%>js/swfupload/swfupload.js" type="text/javascript"></script>

<script src="<%=basePath %>cqz/js/pdm/re.js" type="text/javascript"></script>
		
</html>
 <script type="text/javascript">
	var basePath='<%=basePath%>';
	var taskid=<%=taskid%>;
	init();
	</script>