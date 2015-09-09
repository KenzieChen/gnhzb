package edu.zju.cims201.GOF.web.server;

import java.util.List;

import javax.activation.DataHandler;
import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTreeA;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraftA;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeAService;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeService;

public class BomDraftService {
	private ApplicationContext cxt;
	private ClassificationTreeAService classificationTreeAService;
	private ClassificationTreeService classificationTreeService;
	public BomDraftService(){
		cxt= new ClassPathXmlApplicationContext("applicationContext.xml");
		classificationTreeAService = (ClassificationTreeAService) cxt.getBean("classificationTreeAService");
		classificationTreeService = (ClassificationTreeService)cxt.getBean("classificationTreeServiceImpl");
	}

	/*
	 * 模块化：同步零件的示意图信息
	 */
	public void synImg(){
		//获得需要同步示意图的零件信息
		List<ClassificationTree> treeNodes = classificationTreeService.getTreeNodes2UpdateImg();
		if(treeNodes.size()==0){
			System.out.println("没有主BOM示意图需要进行同步!");
			return;
		}
		JSONArray jsonArr = new JSONArray();
		jsonArr.addAll(treeNodes);
		String treeNodesStr = jsonArr.toString();
		
		DataHandler fileZip =classificationTreeService.getFileZip(treeNodes);
		try{
			 //String wsdlUrl= "http://localhost:8080/gnhzb/services/moduleService?wsdl";
            // String nameSpaceUri= "http://localhost:8080/gnhzb/services/moduleService";
            	//马步青
			 	String wsdlUrl= "http://10.15.43.43:8080/gdksp/services/moduleService?wsdl";
			 	String nameSpaceUri= "http://10.15.43.43:8080/gdksp/services/moduleService";  
          //屈鹏飞
		 	//String wsdlUrl= "http://172.22.156.3:8080/gdksp/services/moduleService?wsdl";
		 	// nameSpaceUri= "http://172.22.156.3:8080/gdksp/services/moduleService";
			// 创建调用对象
            Service service = new Service();
            Call call = null;
            call = (Call) service.createCall();
            call.setOperationName(new QName(nameSpaceUri, "saveTreeNodesImg"));
            call.addParameter("treeNodes", XMLType.SOAP_STRING, ParameterMode.IN);
            call.addParameter("fileZip", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
            call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
            call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
            Boolean ret = (Boolean) call.invoke(new Object[] {treeNodesStr,fileZip});
            if(ret){
            	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
            	classificationTreeService.UpdateImgFinish(treeNodes); 
            }
            System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	/**
	 * 属于模块化方法，同步树节点主模型
	 */
	public void synModel() {
		//选出模块树节点，根据节点选择主模型，再打包主模型
		//如果无需要同步的节点，不同步
		List<ClassificationTree> treeNodes = classificationTreeService.getTreeNodes2UpdateModel();
		if(treeNodes.size() == 0){
			return;
		}
		JSONArray jsonArray = new JSONArray();
		jsonArray.addAll(treeNodes);
		String treeNodesStr = jsonArray.toString();
		//如果无需要同步的treeDrafts，压缩文件的DataHandler设置为null
		List<TreeDraft> treeDrafts = classificationTreeService.getTreeDraftsByTreeNodes(treeNodes,true);
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new PropertyFilter(){
			public boolean apply(Object arg0, String arg1, Object arg2) {
				// TODO Auto-generated method stub
				if("draftType".equals(arg1)){
					return true;
				}
				return false;
			}
		});
		
		JSONArray jsonArray2 = new JSONArray();
		jsonArray2.addAll(treeDrafts,jsonConfig);
		String treeDraftsStr = jsonArray2.toString();
		DataHandler zipFile = null;
		if(treeDrafts.size() != 0){
			zipFile = classificationTreeService.getFileZip(treeDrafts,true);
		}
		try{
			//String wsdlUrl= "http://localhost:8080/gnhzb/services/moduleService?wsdl";
			//String nameSpaceUri= "http://localhost:8080/gnhzb/services/moduleService";
           	//马步青
			String wsdlUrl= "http://10.15.43.43:8080/gdksp/services/moduleService?wsdl";
			String nameSpaceUri= "http://10.15.43.43:8080/gdksp/services/moduleService";  
			//屈鹏飞
		 	//String wsdlUrl= "http://172.22.156.3:8080/gdksp/services/moduleService?wsdl";
		 	//String nameSpaceUri= "http://172.22.156.3:8080/gdksp/services/moduleService";
			// 创建调用对象
           Service service = new Service();
           Call call = null;
           call = (Call) service.createCall();
           call.setOperationName(new QName(nameSpaceUri, "saveTreeNodesModel"));
           call.addParameter("treeNodes", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("treeDrafts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("zipFile", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
           call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
           call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
           Boolean ret = (Boolean) call.invoke(new Object[] {treeNodesStr,treeDraftsStr,zipFile});
           if(ret){
           	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
          	 	classificationTreeService.UpdateModelFinish(treeNodes);
           }
           System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 属于模块化方法，同步树节点自定义文档
	 */
	public void synSelf() {
		//选出模块树节点，根据节点选择主文档，再打包主文档
		//如果无需要同步的节点，不同步
		List<ClassificationTree> treeNodes = classificationTreeService.getTreeNodes2UpdateSelf();
		if(treeNodes.size()==0){
			return;
		}
		
		JSONArray jsonArray = new JSONArray();
		jsonArray.addAll(treeNodes);
		String treeNodesStr = jsonArray.toString();
		//如果无需要同步的treeDrafts，压缩文件的DataHandler设置为null
		List<TreeDraft> treeDrafts = classificationTreeService.getTreeDraftsByTreeNodes(treeNodes,false);
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new PropertyFilter(){
			public boolean apply(Object arg0, String arg1, Object arg2) {
				// TODO Auto-generated method stub
				if("draftType".equals(arg1)){
					return true;
				}
				return false;
			}
		});
		
		JSONArray jsonArray2 = new JSONArray();
		jsonArray2.addAll(treeDrafts,jsonConfig);
		String treeDraftsStr = jsonArray2.toString();
		DataHandler zipFile = null;
		if(treeDrafts.size() != 0){
			zipFile = classificationTreeService.getFileZip(treeDrafts,false);
		}
		try{
			//String wsdlUrl= "http://localhost:8080/gnhzb/services/moduleService?wsdl";
			//String nameSpaceUri= "http://localhost:8080/gnhzb/services/moduleService";
           	//马步青
			String wsdlUrl= "http://10.15.43.43:8080/gdksp/services/moduleService?wsdl";
			String nameSpaceUri= "http://10.15.43.43:8080/gdksp/services/moduleService";  
			//屈鹏飞
		 	//String wsdlUrl= "http://172.22.156.3:8080/gdksp/services/moduleService?wsdl";
		 	//String nameSpaceUri= "http://172.22.156.3:8080/gdksp/services/moduleService";
			// 创建调用对象
           Service service = new Service();
           Call call = null;
           call = (Call) service.createCall();
           call.setOperationName(new QName(nameSpaceUri, "saveTreeNodesSelf"));
           call.addParameter("treeNodes", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("treeDrafts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("zipFile", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
           call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
           call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
           Boolean ret = (Boolean) call.invoke(new Object[] {treeNodesStr,treeDraftsStr,zipFile});
           if(ret){
           	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
          	 	classificationTreeService.UpdateSelfFinish(treeNodes);
           }
           System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/*
	 * 设计资源：保存树节点模型信息
	 */
	public boolean saveTreeNodesModel(String treeNodes,String treeDrafts,DataHandler zipFile) throws Exception{
		JSONArray jsonArr = JSONArray.fromObject(treeNodes);
		JSONArray jsonArr2 = JSONArray.fromObject(treeDrafts);
		
		@SuppressWarnings("unchecked")
		List<ClassificationTreeA> treeNodeList  = JSONArray.toList(jsonArr,ClassificationTreeA.class);
		@SuppressWarnings("unchecked")
		List<TreeDraftA> treeDraftList = JSONArray.toList(jsonArr2,TreeDraftA.class);
	
		classificationTreeAService.saveTreeNodesModelOrSelf(treeNodeList,treeDraftList ,zipFile,true);
		
		return true;
	}
	
	/*
	 * 设计资源：保存树节点文档 信息
	 */
	public boolean saveTreeNodesSelf(String treeNodes,String treeDrafts,DataHandler zipFile) throws Exception{
		JSONArray jsonArr = JSONArray.fromObject(treeNodes);
		JSONArray jsonArr2 = JSONArray.fromObject(treeDrafts);
		
		@SuppressWarnings("unchecked")
		List<ClassificationTreeA> treeNodeList  = JSONArray.toList(jsonArr,ClassificationTreeA.class);
		@SuppressWarnings("unchecked")
		List<TreeDraftA> treeDraftList = JSONArray.toList(jsonArr2,TreeDraftA.class);
	
		classificationTreeAService.saveTreeNodesModelOrSelf(treeNodeList,treeDraftList ,zipFile,false);

		return true;
	}
	/*
	 * 设计资源：保存树节点文档 信息
	 */
	public boolean saveTreeNodesImg(String treeNodes,DataHandler zipFile){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(ClassificationTreeA.class);
		JSONArray jsonArr = JSONArray.fromObject(treeNodes);
		@SuppressWarnings("unchecked")
		List<ClassificationTreeA> treeNodeList = JSONArray.toList(jsonArr,jsonConfig);
		classificationTreeAService.saveTreeNodesImg(treeNodeList,zipFile);
		return true;
	}
}
