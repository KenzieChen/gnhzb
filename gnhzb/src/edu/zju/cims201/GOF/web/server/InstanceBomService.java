package edu.zju.cims201.GOF.web.server;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.zju.cims201.GOF.hibernate.pojoA.BomA;
import edu.zju.cims201.GOF.hibernate.pojoA.BomDetail;
import edu.zju.cims201.GOF.hibernate.pojoA.BomDetailA;
import edu.zju.cims201.GOF.service.bom.BomAService;
import edu.zju.cims201.GOF.service.bom.BomService;

public class InstanceBomService {
	private ApplicationContext ctx;
	private BomService bomService;
	private BomAService bomAService;
	
	public InstanceBomService(){
		ctx =new  ClassPathXmlApplicationContext("applicationContext.xml");
		bomService = (BomService)ctx.getBean("bomServiceImpl");
		bomAService  =(BomAService)ctx.getBean("bomAService");
	}
	/**
	 * 模块化方法
	 */
	public void sendInstanceBom(){
		String instanceBoms = bomService.getBoms2Syn();
		//获得之后发送
		try{
			//String wsdlUrl = "http://localhost:8080/gnhzb/services/moduleService?wsdl";
            //String nameSpaceUri= "http://localhost:8080/gnhzb/services/moduleService";
			 	String wsdlUrl= "http://10.15.43.43:8080/gdksp/services/moduleService?wsdl";
			 	String nameSpaceUri= "http://10.15.43.43:8080/gdksp/services/moduleService";  
			// 创建调用对象
            Service service = new Service();
            Call call = null;
            call = (Call) service.createCall();
            call.setOperationName(new QName(nameSpaceUri, "saveInstanceBoms"));
            call.addParameter("instanceBoms", XMLType.SOAP_STRING, ParameterMode.IN);
            call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
            call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
            Boolean ret = (Boolean) call.invoke(new Object[] {instanceBoms});
            System.out.println("return value is " + ret);
            //如果更新成功，则更新basicFlag信息
            if(ret){
           	 bomService.SynFinish(instanceBoms);
            }
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * 设计资源方法
	 * @return
	 * @throws Exception 
	 */
	public boolean  saveInstanceBoms(String instanceBoms) throws Exception{
		
		JSONArray jsArr = JSONArray.fromObject(instanceBoms);
		JsonConfig jsConfig = new JsonConfig();
		jsConfig.setRootClass(BomA.class);
		//防止强制转换出错
		Map<String,Class<BomDetailA>> map = new HashMap<String,Class<BomDetailA>>();
		map.put("bomDetailList", BomDetailA.class);
		jsConfig.setClassMap(map);
		
		@SuppressWarnings("unchecked")
		List<BomA> boms = JSONArray.toList(jsArr,jsConfig);
		JSONArray jsonArr = new JSONArray();
		jsonArr.addAll(boms);
		String bomsStr = jsonArr.toString();
		bomAService.saveInstanceBoms(boms);
		return true;
	}
	
	
}
