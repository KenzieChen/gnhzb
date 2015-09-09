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
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.PartA;
import edu.zju.cims201.GOF.hibernate.pojoA.PartDraft;
import edu.zju.cims201.GOF.hibernate.pojoA.PartDraftA;
import edu.zju.cims201.GOF.service.part.PartAService;
import edu.zju.cims201.GOF.service.part.PartService;


@Transactional
public class PartSynService {
	private ApplicationContext cxt;
	private PartService partService;
	private PartAService partAService;
	
	public PartSynService(){
		cxt = new ClassPathXmlApplicationContext("applicationContext.xml");
		partService = (PartService)cxt.getBean("partServiceImpl");
		partAService = (PartAService) cxt.getBean("partAService");
	}
	/*
	 * 模块化：同步零件的基本信息
	 */
	public void synBasic(){
		List<Part> parts = partService.getParts2UpdateBasic();
		if(parts.size()==0){
			System.out.println("没有零件基本信息需要进行同步!");
			return;
		}
		JSONArray jsonArr = new JSONArray();
		//failed to lazily initialize a collection of role: edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree.children
		jsonArr.addAll(parts);
		String partsStr = jsonArr.toString();
		try{
			 //String wsdlUrl= "http://localhost:8080/gnhzb/services/moduleService?wsdl";
             //String nameSpaceUri= "http://localhost:8080/gnhzb/services/moduleService";
             	//马步青
			 	String wsdlUrl= "http://10.15.43.43:8080/gdksp/services/moduleService?wsdl";
			 	String nameSpaceUri= "http://10.15.43.43:8080.74:8080/gdksp/services/moduleService";  
             	//屈鹏飞
			 	//String wsdlUrl= "http://172.22.156.3:8080/gdksp/services/moduleService?wsdl";
			 	//String nameSpaceUri= "http://172.22.156.3:8080/gdksp/services/moduleService";
			// 创建调用对象
             Service service = new Service();
             Call call = null;
             call = (Call) service.createCall();
             call.setOperationName(new QName(nameSpaceUri, "savePartsBasic"));
             call.addParameter("parts", XMLType.SOAP_STRING, ParameterMode.IN);
             call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
             call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
             Boolean ret = (Boolean) call.invoke(new Object[] {partsStr});
             System.out.println("return value is " + ret);
             //如果更新成功，则更新basicFlag信息
             if(ret){
            	 partService.UpdateBasicFinish(parts);
             }
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/*
	 * 模块化：同步零件的示意图信息
	 */
	public void synImg(){
		//获得需要同步示意图的零件信息
		List<Part> parts = partService.getParts2UpdateImg();
		if(parts.size()==0){
			System.out.println("没有零件示意图需要进行同步!");
			return;
		}
		JSONArray jsonArr = new JSONArray();
		jsonArr.addAll(parts);
		String partsStr = jsonArr.toString();
		
		DataHandler fileZip =partService.getFileZip(parts);
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
            call.setOperationName(new QName(nameSpaceUri, "savePartsImg"));
            call.addParameter("parts", XMLType.SOAP_STRING, ParameterMode.IN);
            call.addParameter("fileZip", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
            call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
            call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
            Boolean ret = (Boolean) call.invoke(new Object[] {partsStr,fileZip});
            if(ret){
            	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
           	 	partService.UpdateImgFinish(parts);
            }
            System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/*
	 * 模块化：同步零件的模型信息
	 */
	public void synModel() {
		//选出零件，根据零件选择主文档，再打包主文档
		//如果无需要同步的零件，不同步
		List<Part> parts = partService.getParts2UpdateModel();
		if(parts.size()==0){
			return;
		}
		
		JSONArray jsonArray = new JSONArray();
		jsonArray.addAll(parts);
		String partsStr = jsonArray.toString();
		//如果无需要同步的partDrafts，压缩文件的DataHandler设置为null
		List<PartDraft> partDrafts = partService.getPartDraftsbyParts(parts,true);
		
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
		jsonArray2.addAll(partDrafts,jsonConfig);
		String partDraftsStr = jsonArray2.toString();
		DataHandler zipFile = null;
		if(partDrafts.size() != 0){
			zipFile =partService.getFileZip(partDrafts,true);
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
           call.setOperationName(new QName(nameSpaceUri, "savePartsModel"));
           call.addParameter("parts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("partDrafts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("zipFile", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
           call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
           call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
           Boolean ret = (Boolean) call.invoke(new Object[] {partsStr,partDraftsStr,zipFile});
           if(ret){
           	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
          	 	partService.UpdateModelFinish(parts);
           }
           System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/*
	 * 模块化：同步零件的自定义文档
	 */
	public void synSelf() {
		//选出零件，根据零件选择主文档，再打包主文档
		//如果无需要同步的零件，不同步
		List<Part> parts = partService.getParts2UpdateSelf();
		if(parts.size()==0){
			return;
		}
		
		JSONArray jsonArray = new JSONArray();
		jsonArray.addAll(parts);
		String partsStr = jsonArray.toString();
		//如果无需要同步的partDrafts，压缩文件的DataHandler设置为null
		List<PartDraft> partDrafts = partService.getPartDraftsbyParts(parts,false);
		
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
		jsonArray2.addAll(partDrafts,jsonConfig);
		String partDraftsStr = jsonArray2.toString();
		DataHandler zipFile = null;
		if(partDrafts.size() != 0){
			zipFile =partService.getFileZip(partDrafts,false);
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
           call.setOperationName(new QName(nameSpaceUri, "savePartsSelf"));
           call.addParameter("parts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("partDrafts", XMLType.SOAP_STRING, ParameterMode.IN);
           call.addParameter("zipFile", XMLType.MIME_DATA_HANDLER, ParameterMode.IN);
           call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
           call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
           Boolean ret = (Boolean) call.invoke(new Object[] {partsStr,partDraftsStr,zipFile});
           if(ret){
           	//更新成功之后需要设置更新完毕的标识，删除临时压缩文件
          	 	partService.UpdateSelfFinish(parts);
           }
           System.out.println("return value is " + ret);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 设计资源：保存零件基本信息
	 * @param parts
	 * @return
	 * @throws Exception 可能出现的同步异常
	 */
	public boolean savePartsBasic(String parts) throws Exception {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(PartA.class);
		JSONArray jsonArr = JSONArray.fromObject(parts);
		@SuppressWarnings("unchecked")
		List<PartA> partList = JSONArray.toList(jsonArr,jsonConfig);
		partAService.savePartsBasic(partList);
		return true;
	}
	
	/**
	 * 设计资源：保存零件示意图信息
	 * @param parts  需要更新的零件集合
	 * @param fileZip	示意图压缩文件
	 * @return
	 */
	public boolean savePartsImg(String parts,DataHandler zipFile){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(PartA.class);
		JSONArray jsonArr = JSONArray.fromObject(parts);
		@SuppressWarnings("unchecked")
		List<PartA> partList = JSONArray.toList(jsonArr,jsonConfig);
		partAService.savePartsImg(partList,zipFile);
		return true;
	}
	/*
	 * 设计资源：保存零件模型信息
	 */
	public boolean savePartsModel(String parts,String partDrafts,DataHandler zipFile) throws Exception{
		JSONArray jsonArr = JSONArray.fromObject(parts);
		JSONArray jsonArr2 = JSONArray.fromObject(partDrafts);
		
		@SuppressWarnings("unchecked")
		List<PartA> partList  = JSONArray.toList(jsonArr,PartA.class);
		@SuppressWarnings("unchecked")
		List<PartDraftA> partDraftList = JSONArray.toList(jsonArr2,PartDraftA.class);
	
		partAService.savePartsModelOrSelf(partList,partDraftList ,zipFile,true);
		
		return true;
	}
	
	/*
	 * 设计资源：保存零件模型信息
	 */
	public boolean savePartsSelf(String parts,String partDrafts,DataHandler zipFile) throws Exception{
		JSONArray jsonArr = JSONArray.fromObject(parts);
		JSONArray jsonArr2 = JSONArray.fromObject(partDrafts);
		
		@SuppressWarnings("unchecked")
		List<PartA> partList  = JSONArray.toList(jsonArr,PartA.class);
		@SuppressWarnings("unchecked")
		List<PartDraftA> partDraftList = JSONArray.toList(jsonArr2,PartDraftA.class);
	
		partAService.savePartsModelOrSelf(partList,partDraftList ,zipFile,false);
		
		return true;
	}
}
