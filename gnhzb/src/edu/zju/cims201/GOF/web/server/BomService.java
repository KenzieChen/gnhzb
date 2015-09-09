package edu.zju.cims201.GOF.web.server;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.codeclass.CodeClassADao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTreeA;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClassA;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeAService;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeService;
import edu.zju.cims201.GOF.service.codeclass.CodeClassAService;
import edu.zju.cims201.GOF.service.codeclass.CodeClassService;

@Transactional
public class BomService {

	private ApplicationContext cxt;
	private ClassificationTreeAService classificationTreeAService;
	private CodeClassAService codeClassAService;
	
	private ClassificationTreeService classificationTreeService;
	
	public BomService(){
		cxt= new ClassPathXmlApplicationContext("applicationContext.xml");
		classificationTreeAService = (ClassificationTreeAService) cxt.getBean("classificationTreeAService");
		codeClassAService = (CodeClassAService)cxt.getBean("codeClassAService");
		classificationTreeService = (ClassificationTreeService)cxt.getBean("classificationTreeServiceImpl");
	}
	
	/**
	 * 设计资源：从模块化系统获取主BOM数据
	 * @param boms 所有主BOM树的json格式
	 * @return 是否保存成功
	 */
	public boolean saveBom(String boms){
		//json转对象
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(ClassificationTreeA.class);
		Map<String,Class<ClassificationTreeA>> classMap = new HashMap<String,Class<ClassificationTreeA>>();
		classMap.put("children", ClassificationTreeA.class);
		jsonConfig.setClassMap(classMap);
		
		JSONArray jsArr = JSONArray.fromObject (boms);
		@SuppressWarnings("unchecked")
		List<ClassificationTreeA> list = JSONArray.toList(jsArr,jsonConfig);
		
		for(ClassificationTreeA node : list){
			if(!("").equals(node.getUuid())){
				ClassificationTreeA existNode = classificationTreeAService.findUniqueByUuid(node.getUuid());
				if(existNode == null){
					saveBomByRecursion(null,node,null);
				}
			}
			
		}
		return true;
	}
	
	/**
	 * 设计资源:内部函数，递归保存一个主BOM的树
	 * @param parent  父节点，设置为null
	 * @param node		要保存的树的根节点
	 * @param codeClass  根节点所属的产品或零部件类，设置为null
	 */
	private void saveBomByRecursion(ClassificationTreeA parent,ClassificationTreeA node,CodeClassA codeClass){
		node.setId(null);
		if(codeClass == null){
			codeClass = node.getCodeClass();
			codeClass.setId(0);
			codeClassAService.saveCodeClass(codeClass);
		}
		node.setCodeClass(codeClass);
		node.setParent(parent);
		classificationTreeAService.save(node);
		List<ClassificationTreeA> children = node.getChildren();
		for(ClassificationTreeA child :children){
			saveBomByRecursion(node,child,codeClass);
		}
	}
	
	/**
	 * 模块化端的定时任务
	 */
	public void sendBom(){

		String boms = classificationTreeService.getClassStruct3();
		try
        {
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
               call.setOperationName(new QName(nameSpaceUri, "saveBom"));
               call.addParameter("boms", XMLType.SOAP_STRING, ParameterMode.IN);
               call.setReturnType(org.apache.axis.Constants.SOAP_BOOLEAN);
               call.setTargetEndpointAddress(new java.net.URL(wsdlUrl));
               Boolean ret = (Boolean) call.invoke(new Object[] {boms});

               System.out.println("return value is " + ret);
        }
        catch (Exception e)
        {
               e.printStackTrace();
        }
	}
	


	
	
}
