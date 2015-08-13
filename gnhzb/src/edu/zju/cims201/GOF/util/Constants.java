package edu.zju.cims201.GOF.util;



/**
 * @author Administrator
 *
 */
public class Constants {
	
	public static ConfigUtil config = new ConfigUtil("application.properties");
	
	//潘雷加2013.05.01 模块化组件定制配置文件读取
	public static ConfigUtil customization_config = new ConfigUtil("customization.properties");
	
	//审批状态的设置  keepTreeChildIcon
	
	public static final String SUPERADMIN=config.getValue("super_admin");
	public static String approvalFlowNodeStart = "刚刚创建";
	public static String approvalFlowNodePending = "等待审批";
	public static String approvalFlowNodeResult_Pass = "通过";
	public static String approvalFlowNodeResult_UnPass = "未通过";
	public static String approvalFlowNodeResult_PassButBlock = "通过但停止升级";
	public static String approvalFlowStart = "刚刚创建";
	public static String approvalFlowPending= "等待审批";
	public static String approvalFlowPass= "审批通过";
	public static String approvalFlowUNPass= "审批未通过";
	public static String approvalEnd = "审批结束";
	public static String approvalBlock = "停止升级";
	public static final int approvalNodesLimit = 4;
	public static final String domianTreeIcon=config.getValue("domain_tree_icon");
	public static final String domianTreeChildIcon=config.getValue("domain_tree_child_icon");
	public static final String categoryTreeIcon=config.getValue("category_tree_icon");
	public static final String categoryTreeChildIcon=config.getValue("category_tree_child_icon");
	public static final String keepTreeChildIcon=config.getValue("keep_tree_child_icon");
	public static final String roleTreeIcon=config.getValue("role_tree_icon");
	public static final String roleTreeChildIcon=config.getValue("role_tree_child_icon");
	
	
	
	public static int rawPrepage=Integer.parseInt(config.getValue("rawPrepage"));	
	
	public static final String SOURCEFILE_PRIVILEGE = config.getValue("sourcefile_privilege");
	public static final String SOURCEFILE_PATH = config.getValue("sourcefile_path");
	public static final String SOURCEFILE_PATH_TEMP =config.getValue("sourcefile_path_temp");
	public static final String ATTACHMENT_PATH =config.getValue("attachment_path");
	public static final String ATTACHMENT_PATH_TEMP =config.getValue("attahcment_path_temp");
	public static final String THUMBNAIL_PATH_TEMP =config.getValue("thumbnail_path_temp");
	public static final String THUMBNAIL_PATH =config.getValue("thumbnail_path");
	public static final String FLASHPAPER_PATH =  config.getValue("flashpaper_path");
	public static final String INDEXPATH = config.getValue("index_path");
	public static final String INDEXPATH_BACKUP= config.getValue("index_path_backup");
	public static final String SWF_PATH = config.getValue("swf_path");
	public static final String SECURITY_LEVELS = config.getValue("security_levels");
	public static final String DEFAULT_SECURITY_LEVELS = config.getValue("default_security_levels");
	
	
	//江丁丁添加 2013-5-14
//	public static final String HTTPPROXYSET = config.getValue("http.proxySet");
//	public static final String HTTPPROXYHOST = config.getValue("http.proxyHost");
//	public static final String HTTPPROXYPORT = config.getValue("http.proxyPort");
//	public static final String SOCKSPROXYHOST = config.getValue("socksProxyHost");
//	public static final String SOCKSPROXYPORT = config.getValue("socksProxyPort");
//	public static final String PROXYUSERNAME = config.getValue("proxyusername");
//	public static final String PROXYPASSWORD = config.getValue("proxypassword");	
	public static final String reQuestUrl=config.getValue("reQuestUrl");
	public static final String dir = config.getValue("dir");
	public static final String TOLOCAL = config.getValue("tolocal");
	public static final String sipoUrl=config.getValue("sipoUrl");
	public static final String sipoUrlEnd=config.getValue("sipoUrlEnd");
	public static final String sipotexturl=config.getValue("sipotexturl");
	public static final String usreQuestUrl=config.getValue("usreQuestUrl");
	
	
    public static String INTEREST_MODEL_KEYWORD="1";        //兴趣类型为关键词，即根据关键词预定知识
	public static String INTEREST_MODEL_USER="2";
	public static String INTEREST_MODEL_TREENODE="3";
	public static int INTEREST_MODEL_KNOWLEDGEVERSION=4;
	public static final String NS="webserver";//cxf 中webservice的namespace
	
	public static final String FLASH_SERVICE_ENDPOINT=config.getValue("flash_service_endpoint");

	public static final int HOTWORD_LIMIT = Integer.parseInt(config.getValue("hotwordlimit"));
	public static final int NOTICE_LIMIT = Integer.parseInt(config.getValue("noticelimit"));
	public static final int POPTAG_LIMIT = Integer.parseInt(config.getValue("poptaglimit"));
	public static final int RECOMMENTTAG_LIMIT = Integer.parseInt(config.getValue("recommenttaglimit"));
//	public static final String ONTO_FILE_PATH = config.getValue("ontofilepath");
	public static final String ONTO_IMG_FILE_PATH=config.getValue("ontoimgfilepath");
	public static final int ONTO_DEPTH=Integer.parseInt(config.getValue("ontodepth"));
    public static final String EXE_PATH=config.getValue("exepath");
    public static final String AVIDM_WEBSERVICE_NAMESPACE=config.getValue("avidm_webService_namespace");
    public static final String AVIDM_WEBSERVICE_ENDPOINT=config.getValue("avidm_webService_endpoint");
    public static final String QUALITY_WEBSERVICE_NAMESPACE=config.getValue("quality_webService_namespace");
    public static final String QUALITYDOMAINID=config.getValue("qualitydomainid");
    public static final String DISABLEINTEDOMAINID=config.getValue("disableintedomainid");
   
    
    //借阅审批组织树根节点
    public static final Long Borrow_ADMIN_ORG_TREENODEID=new Long(config.getValue("borrow_admin_org_treenodeid"));
    //avidm 书签配置
    public static final String AVIDMHOSTPROPERTY = config.getValue("avidmhostproperty");
    public static final String QUALITYHOST = config.getValue("qualityhost");
    public static final String GETFILEINFORMETHOD=config.getValue("getfileinformethod");
    public static final String FLASHCONVERTMETHOD=config.getValue("flashconvertermethod");
    
    //单点故障配置
    public static final String HEADLINE1=config.getValue("headline1");
    public static final String HEADLINE1NAME=config.getValue("headline1name");
    public static final String HEADLINE2=config.getValue("headline2");
    public static final String HEADLINE2NAME=config.getValue("headline2name");
    public static final String HEADLINE6=config.getValue("headline6");
    public static final String HEADLINE6NAME=config.getValue("headline6name");
    public static final String DANDIANNAME=config.getValue("dandianname");
    public static final String DANDIANDOMAINID=config.getValue("dandiandomainid");
    
    //本体在线编辑
	//public static final String ONTO_FILE_PATH = "C:\\Program Files\\Apache Software Foundation\\Tomcat 5.0\\webapps\\caltksp\\test.owl";	

	public static String LOCAL_ONTO_FILE_PATH = config.getValue("local_ontofile_path");
	public static String LOCAL_ONTO_FILE_DIR_PATH = config.getValue("local_ontofile_dir_path");
	public static String ONTO_NAMESPACE = config.getValue("ontoNameSpace");
	public static String ONTO_URI = config.getValue("ontoURI");
	public static String FILEBASENAME= config.getValue("fileBaseName");
	public static String FIELD_PATH = config.getValue("field_path");
	
	
	//潘雷加2013.05.01  模块化组件功能定制。根据customization.properties配置文件中的键值对匹配，判断系统是否加入某功能模块。
	//匹配原则——配置文件中的值与功能组件变量名是否相同
	//在线协同——在线聊天功能
	public static final String COOPERATION_ON_LINE = customization_config.getValue("COL");
	//知识问答功能
	public static final String KNOWLEDGE_QUESTION_ANSWER = customization_config.getValue("KQA");
	//知识地图功能
	public static final String KNOWLEDGE_MAP = customization_config.getValue("KMAP");
	//岗位知识功能
	public static final String KNOWLEDGE_POSITION = customization_config.getValue("KPO");
	//知识订阅功能
	public static final String KNOWLEDGE_RSS = customization_config.getValue("KRSS");
	//知识收藏功能
	public static final String KNOWLEDGE_KEEP = customization_config.getValue("KKEEP");
	//知识排行——优质知识（知识评分数、下载次数）
	public static final String KNOWLEDGE_VALUED = customization_config.getValue("KVAD");
	//统计分析-总体趋势
	public static final String KNOWLEDGE_TREND = customization_config.getValue("KTRD");
	//按贡献度进行用户排序
	public static final String KNOWLEDGE_CONTRIBUTION = customization_config.getValue("KCTB");
	//知识多维搜索功能
	public static final String KNOWLEDGE_MULTI_SEARCH = customization_config.getValue("KMSH");
	//知识借阅功能
	public static final String KNOWLEDGE_BORROW = customization_config.getValue("KBOR");
	//统计积分配置功能
	public static final String KNOWLEDGE_STATISTIC_CONFIG = customization_config.getValue("KSCG");
	
	//专利协同功能 江丁丁
	public static final String PATENT = customization_config.getValue("PATENT");
	//专家黄页功能 江丁丁
	public static final String EXPERT_ARTICLE = customization_config.getValue("EARTICLE");
	//模块化评价功能 江丁丁
	public static final String MDE = customization_config.getValue("MDE");
	//专家黄页功能 江丁丁
	public static final String LCA = customization_config.getValue("LCA");

	//spider配置
    public static final String WEBAPPNAME=config.getValue("webappname");
	public static String HTTPPROXYSET = config.getValue("http.proxySet");
	public static String HTTPPROXYHOST = config.getValue("http.proxyHost");
	public static String HTTPPROXYPORT = config.getValue("http.proxyPort");
	public static String SOCKSPROXYHOST = config.getValue("socksProxyHost");
	public static String SOCKSPROXYPORT = config.getValue("socksProxyPort");
	public static String PROXYUSERNAME = config.getValue("proxyusername");
	public static String PROXYPASSWORD = config.getValue("proxypassword");
	public static String APPLICATIONCONTEXT = config.getValue("applicationcontext");

	//JCCBZ
	public static final String FILEROOT=config.getValue("root");
    public static final String TEMPLATE_PATH=FILEROOT+config.getValue("template_file_path");
    public static final String UPLOADMODEL_PATH=FILEROOT+config.getValue("uploadModel_path");
    public static final String UPLOADSELF_PATH=FILEROOT+config.getValue("uploadSelf_path");
    public static final String UPLOADMODELIMG_PATH=FILEROOT+config.getValue("uploadModelImg_path");
    public static final String UPLOADPARTIMG_PATH=FILEROOT+config.getValue("uploadPartImg_path");
    public static final String UPLOADPARTMODEL_PATH=FILEROOT+config.getValue("uploadPartModel_path"); 
    public static final String UPLOADPARTSELF_PATH=FILEROOT+config.getValue("uploadPartSelf_path"); 
    //用于测试同步文档到设计资源集成
    public static final String FILEROOTA=config.getValue("rootA");
    public static final String UPLOADPARTIMG_PATHA=FILEROOTA+config.getValue("uploadPartImg_path");
    public static final String UPLOADPARTMODEL_PATHA=FILEROOTA+config.getValue("uploadPartModel_path"); 
    public static final String UPLOADPARTSELF_PATHA=FILEROOTA+config.getValue("uploadPartSelf_path"); 
    
    public static final String UPLOADMODEL_PATHA = FILEROOTA+config.getValue("uploadModel_path");
    public static final String UPLOADSELF_PATHA = FILEROOTA+config.getValue("uploadSelf_path");
    public static final String UPLOADMODELIMG_PATHA = FILEROOTA+config.getValue("uploadModelImg_path");
    
    
    //task配置
    public static final String 	TASK_STATUS_CONFIG=config.getValue("task_status_config");
    public static final String  TASK_STATUS_ACTIVE=config.getValue("task_status_active"); 
    public static final String  TASK_STATUS_TO_CHECK=config.getValue("task_status_to_check"); 
    public static final String 	TASK_STATUS_TO_BE_ACTIVE=config.getValue("task_status_to_be_active");  
    public static final String 	TASK_STATUS_FINISH=config.getValue("task_status_finish");  
	//project配置
    public static final String PROJECT_STATUS_NEWCREATE=config.getValue("project_status_newcreate");
    public static final String PROJECT_STATUS_ALLOT_TASK=config.getValue("project_status_allot_task");   
    public static final String PROJECT_STATUS_ACTIVE=config.getValue("project_status_active");
    public static final String PROJECT_STATUS_WAIT_TO_COMPILE=config.getValue("project_status_wait_to_compile");
    public static final String PROJECT_STATUS_WAIT_TO_TEST=config.getValue("project_status_wait_to_test");
    public static final String PROJECT_STATUS_END=config.getValue("project_status_end");
}
	

