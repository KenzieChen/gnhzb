package edu.zju.cims201.GOF.web.classificationtree;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.xwork.StringUtils;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeService;
import edu.zju.cims201.GOF.service.classificationtree.ClassificationTreeServiceImpl;
import edu.zju.cims201.GOF.util.JSONUtil;

public class ClassificationTreeAction extends ActionSupport implements
		ServletResponseAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1522206205999734339L;
	private HttpServletResponse response;
	private ClassificationTreeServiceImpl classificationTreeService;
	private Long pid;
	private Long id;
	private int lock;
	// 节点名称
	private String text;
	// 节点描述
	private String classDes;
	// 节点原来编码
	private String code;
	// 修改后的当前节点码段
	private String currentCode;

	private PrintWriter out;

	public String insertTreeNode() throws IOException {
		ClassificationTree ct = new ClassificationTree();
		ct.setUuid(UUID.randomUUID().toString());
		ct.setLeaf(1);
		ct.setText(text);
		ct.setClassDes(classDes);
		String msg = classificationTreeService.insertTreeNode(pid, ct);
		out = response.getWriter();
		out.print(msg);
		return null;
	}

	public String deleteTreeNode() throws IOException {
		String msg = classificationTreeService.deleteTreeNode(id);
		out = response.getWriter();
		out.print(msg);
		return null;
	}

	public String getClassStruct() throws IOException {
		List<ClassificationTree> treeList = classificationTreeService
				.getClassStruct();
		String treeStr = JSONUtil.write(treeList);
		out = response.getWriter();
		out.print(treeStr);
		return null;
	}

	// luweijiang
	public String getClassStructById()throws IOException {
		//此id是classification中的id
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		ClassificationTree tree=classificationTreeService.getNode(id);
		if (tree != null) {
			List<ClassificationTree> treeList=new ArrayList<ClassificationTree>();
			treeList.add(tree);
			resultmap.put("isSuccess", "1");
			resultmap.put("message", "成功");
			resultmap.put("result", treeList);

		}else{
			resultmap.put("isSuccess", "0");
			resultmap.put("message", "查询出错，请联系管理员！");
		}
		String jsonString =JSONUtil.write(resultmap);
		out =response.getWriter();
		out.print(jsonString);
		return null;
	}
	
	public String findCodeClassByClassTreeId() throws IOException{
		//该id为classClassificationTree 
		ClassificationTree tree=classificationTreeService.getNode(id);
		CodeClass cc=tree.getCodeClass();
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		if(cc!=null){
			List<CodeClass> cclist =new ArrayList<CodeClass>();
			cclist.add(cc);
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
	public String getChildrenNode() throws IOException {
		List<ClassificationTree> treeList = classificationTreeService
				.getChildrenNode(pid);
		String treeStr = JSONUtil.write(treeList);

		out = response.getWriter();
		out.print(treeStr);
		return null;
	}

	public String updateClassDes() throws IOException {
		String msg = classificationTreeService.updateClassDes(id, classDes);
		out = response.getWriter();
		out.print(msg);
		return null;
	}

	public String updateCode() throws IOException {
		String[] codeArray = this.code.split("-");
		codeArray[codeArray.length - 1] = this.currentCode;
		String newCode = StringUtils.join(codeArray, "-");
		String msg = classificationTreeService.updateCode(id, newCode);
		out = response.getWriter();
		out.print(msg);
		return null;
	}

	// 修改分类树的锁定状态
	public void changeLock() {
		classificationTreeService.changeLock(id, lock);
	}

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}

	public ClassificationTreeService getClassificationTreeService() {
		return classificationTreeService;
	}

	@Autowired
	public void setClassificationTreeService(
			ClassificationTreeServiceImpl classificationTreeService) {
		this.classificationTreeService = classificationTreeService;
	}

	public Long getPid() {
		return pid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getClassDes() {
		return classDes;
	}

	public void setClassDes(String classDes) {
		this.classDes = classDes;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCurrentCode() {
		return currentCode;
	}

	public void setCurrentCode(String currentCode) {
		this.currentCode = currentCode;
	}

	public int getLock() {
		return lock;
	}

	public void setLock(int lock) {
		this.lock = lock;
	}

}
