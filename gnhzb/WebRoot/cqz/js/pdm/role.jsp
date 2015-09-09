<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>role</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="<%=basePath %>css/liuchang/edo_orange_theme/res/css/edo-all.css" rel="stylesheet" type="text/css" />
  </head>
  
  <body>
    
  </body>
  <script src="<%=basePath %>css/liuchang/edo_orange_theme/edo.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
   <script src="<%=basePath %>js/commontools/Window.js" type="text/javascript"></script>
   <script src="<%=basePath %>js/commontools/PopupManager.js" type="text/javascript"></script>
  <script src="<%=basePath %>js/utils.js" type="text/javascript"></script>
  <script src="<%=basePath %>cqz/js/pdm/role.js" type="text/javascript"></script>
</html>
