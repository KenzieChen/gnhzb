package edu.zju.cims201.GOF.web.codeclass;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;
import edu.zju.cims201.GOF.service.codeclass.CodeClassService;
import edu.zju.cims201.GOF.util.JSONUtil;
@Results({
	//@Result(name ="reload", location="code-class.action," ,type="redirect")
})
public class CodeClassAction extends ActionSupport implements ServletResponseAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 8890850132239886206L;
	private long id;
	private String classname;
	private String classcode;
	private String codehead;
	
	private String encodetype;
	private String codelength;
	private int ruleLayerNub;
	
	


	private HttpServletResponse response;
	private CodeClassService codeClassService;
	PrintWriter out;
	



	public String insertClass() throws IOException{
		out =response.getWriter();
		CodeClass nameFlag =codeClassService.findUniqueByClassName(classname);
		if(nameFlag!=null){
			HashMap<String, String> map=new HashMap<String, String>();
			map.put("isSuccess", "1");
			map.put("message", "类别名称已存在！");
			String jsonString =JSONUtil.write(map);
			out.print(jsonString);
			return null;
		};
		CodeClass codeFlag =codeClassService.findUniqueByClassCode(classcode);
		if(codeFlag!=null){
			HashMap<String, String> map=new HashMap<String, String>();
			map.put("isSuccess", "1");
			map.put("message", "类别代号已存在！");
			String jsonString =JSONUtil.write(map);
			out.print(jsonString);
			return null;
		};
		CodeClass ruleFlag =codeClassService.findUniqueByRule(codehead);
		if(ruleFlag!=null){
			HashMap<String, String> map=new HashMap<String, String>();
			map.put("isSuccess", "1");
			map.put("message", "类别码首字段已存在！");
			String jsonString =JSONUtil.write(map);
			out.print(jsonString);
			return null;
		};
		
		
		CodeClass  cc = new CodeClass();
		cc.setUuid(UUID.randomUUID().toString());
		cc.setClassname(classname);
		cc.setClasscode(classcode);
		cc.setRule(codehead);	
		cc.setFlag(0);
		codeClassService.saveCodeClass(cc);
		HashMap<String, Object> map=new HashMap<String, Object>();
		map.put("isSuccess", "1");
		map.put("message", "添加成功！");
		List<HashMap<String, String>> resultlist=new ArrayList<HashMap<String,String>>();
		HashMap<String, String> resultitem=new HashMap<String, String>();
		resultitem.put("name", "codeclassid");
		resultitem.put("value", String.valueOf(cc.getId()));
		resultlist.add(resultitem);
		map.put("resultlist", resultlist);
		
		String jsonString =JSONUtil.write(map);
		out.print(jsonString);
		return null;
	}
	
	
	public String findAllCodeClass() throws IOException{
		List<CodeClass> ccs2 =new ArrayList<CodeClass>();	
		List<CodeClass> ccs1 =codeClassService.findAll();
		for(int i =0;i<ccs1.size();i++){
			CodeClass cc = new CodeClass();
			cc.setId(ccs1.get(i).getId());
			cc.setClassname(ccs1.get(i).getClassname());
			cc.setClasscode(ccs1.get(i).getClasscode());
			cc.setFlag(ccs1.get(i).getFlag());
			cc.setRule(ccs1.get(i).getRule());
			ccs2.add(cc);
		}
		
		String jsonString =JSONUtil.write(ccs2);
		
		out=response.getWriter();
		out.print(jsonString);
		
		return null;
	}
	
	public String findConstructedCodeClass() throws IOException{
		List<CodeClass> ccs = codeClassService.findConstructed();
		if(ccs!=null){
			String sscStr =JSONUtil.write(ccs);
			out=response.getWriter();
			out.print(sscStr);
		}
		return null;
	}
	
	public String findUnConstructedCodeClass() throws IOException{
		List<CodeClass> ccs = codeClassService.findUnConstructed();
		if(ccs!=null){
			String sscStr =JSONUtil.write(ccs);
			out=response.getWriter();
			out.print(sscStr);
		}
		return null;
	}
	
	/**
	 * luweijiang
	 * @return
	 * @throws Exception
	 */
	public String findUnConstructedCodeClassById() throws Exception{
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		CodeClass cc=codeClassService.findUnConstructedCodeClassById(id);
		if (cc!=null) {
			List<CodeClass> ccs=new ArrayList<CodeClass>();
			ccs.add(cc);
			resultmap.put("isSuccess", "1");
			resultmap.put("message", "成功");
			resultmap.put("result", ccs);
			
			
		}else{
			resultmap.put("isSuccess", "0");
			resultmap.put("message", "查询出错，请联系管理员！");
		}
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
		return null;
	}
	
	public String addConstructedCodeClass() throws IOException{
		codeClassService.addConstructedByCodeClass(classcode);
		out=response.getWriter();
		out.print("新增成功");
		return null;
	}
	public String deleteConstructedCodeClass() throws IOException{
		codeClassService.deleteConstructedByCodeClass(classcode);
		out=response.getWriter();
		out.print("删除成功");
		return null;
	}
	
	public String deleteById() throws IOException{
		codeClassService.deleteById(id);
		out=response.getWriter();
		out.print("删除成功！");
		return null;
	}
	
	public String findById() throws IOException{
		List<CodeClass> cc = codeClassService.findById(id);
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		if(cc!=null){
			resultmap.put("isSuccess", "1");
			resultmap.put("message", "成功");
			resultmap.put("result", cc);
		}else{
			resultmap.put("isSuccess", "0");
			resultmap.put("message", "查询任务结果出错，请联系管理员！");
		}
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
		return null;
	}
	
	public String updateById() throws IOException{
		codeClassService.updateById(id, classname, classcode, codehead);
		out=response.getWriter();
		out.print("修改成功！");
		return null;
	}
	
	public String getRule() throws IOException{
		String ruleStr = codeClassService.getRuleByClassCode(classcode);
		out =response.getWriter();
		out.print(ruleStr);
		return null;
	}
	
	public String updateRule() throws IOException{
		codeClassService.updateRuleByClassCode(classcode, encodetype, codelength);
		out =response.getWriter();
		out.print("新增成功");
		return null;
	}
	
	public String updateRule2() throws IOException{
		codeClassService.updateRuleByClassCode2(classcode, encodetype, codelength, ruleLayerNub);
		out =response.getWriter();
		out.print("修改成功");
		return null;
	}
	
	public String deleteRuleNode() throws IOException{
		codeClassService.deleteRuleNodByClassCode(classcode, ruleLayerNub);
		out =response.getWriter();
		out.print("删除成功");
		return null;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getClasscode() {
		return classcode;
	}

	public void setClasscode(String classcode) {
		this.classcode = classcode;
	}

	public String getCodehead() {
		return codehead;
	}

	public void setCodehead(String codehead) {
		this.codehead = codehead;
	}
	public CodeClassService getClassService() {
		return codeClassService;
	}


	@Autowired
	public void setClassService(CodeClassService classService) {
		this.codeClassService = classService;
	}


	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response=arg0;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getEncodetype() {
		return encodetype;
	}


	public void setEncodetype(String encodetype) {
		this.encodetype = encodetype;
	}


	public String getCodelength() {
		return codelength;
	}


	public void setCodelength(String codelength) {
		this.codelength = codelength;
	}


	public int getRuleLayerNub() {
		return ruleLayerNub;
	}


	public void setRuleLayerNub(int ruleLayerNub) {
		this.ruleLayerNub = ruleLayerNub;
	}
	
}
