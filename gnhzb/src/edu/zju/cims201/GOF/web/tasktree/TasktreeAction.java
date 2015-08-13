package edu.zju.cims201.GOF.web.tasktree;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.util.CollectionUtils;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.OperationRoles;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;


@Namespace("/tasktree")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "welcome.action", type = "redirect"),
		 @Result(name = "draw", location = "/WEB-INF/content/lca/filelookedu.zju.cims201.GOF2.jsp"),
		 @Result(name = "modulelook", location = "/WEB-INF/content/lca/modulelook.jsp"),
		 @Result(name = "nodemanage", location = "/WEB-INF/content/lca/nodemanage.jsp")})
public class TasktreeAction extends CrudActionSupport<TaskTreeNode> implements ServletResponseAware, ServletRequestAware {
private static final long serialVersionUID = 8683878162525847072L;
	
	@Resource(name="departmentServiceImpl")
	private DepartmentService departmentService;
	private String role;
	private String deletenodes;
	
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	private String taskTreeNode;
	public void getTaskTreebyRole() throws IOException{
		List<Map<String, Object>> nodes = new ArrayList<Map<String, Object>>();  
		ObjectMapper objectMapper = new ObjectMapper();		
		List<TaskTreeNode> parentnodes=departmentService.getTaskTreebyRole(role);
		int n =parentnodes.size();
		for(int i=0;i<n;i++){
			Map<String, Object> rootMap = new HashMap<String, Object>();
			TaskTreeNode parentnode=(TaskTreeNode)parentnodes.get(i);
			rootMap.put("id", parentnode.getId());
			rootMap.put("name", parentnode.getNodeName());	
			rootMap.put("des", parentnode.getNodeDescription());	
			rootMap.put("url", parentnode.getUrl());
			rootMap.put("code", parentnode.getCode());	
			//rootMap.put("orderid", parentnode.getOrderid());	
			List<TaskTreeIOParam> params=departmentService.getTaskTreeParamsByTaskTreeNode(parentnode.getId());
			List<HashMap<String, String>> Inparamlist=new ArrayList<HashMap<String, String>>();
			List<HashMap<String, String>> Outparamlist=new ArrayList<HashMap<String, String>>();
			for(TaskTreeIOParam param:params){
				HashMap<String, String> parammap=new HashMap<String, String>();
				parammap.put("descri", param.getDescri());
				parammap.put("name", param.getName());
				if(param.getIotype()==1){
					parammap.put("type", "1");
					Inparamlist.add(parammap);
				}else{
					parammap.put("type", "0");
					Outparamlist.add(parammap);
				}
			}
			rootMap.put("Inparamlist", Inparamlist);
			rootMap.put("Outparamlist", Outparamlist);
			rootMap.put("children", getsubNode(parentnode));
			nodes.add(rootMap);
			
		}
		objectMapper.writeValue(response.getWriter(), nodes);
	}
	private List getsubNode(TaskTreeNode parentnode){		
		List<Map<String, Object>> subnodelist = new ArrayList<Map<String, Object>>();
		Set<TaskTreeNode> subnodes=parentnode.getSubNodes();
		if(subnodes!=null){
			Iterator it=subnodes.iterator();
			while(it.hasNext()){
				TaskTreeNode subnode=(TaskTreeNode)it.next();
				Map<String, Object> subMap = new HashMap<String, Object>();
				subMap.put("id", subnode.getId());
				subMap.put("name", subnode.getNodeName());	
				subMap.put("des", subnode.getNodeDescription());	
				subMap.put("url", subnode.getUrl());
				subMap.put("code", subnode.getCode());	
				//subMap.put("orderid", subnode.getOrderid());	
				List<TaskTreeIOParam> params=departmentService.getTaskTreeParamsByTaskTreeNode(subnode.getId());
				List<HashMap<String, String>> Inparamlist=new ArrayList<HashMap<String, String>>();
				List<HashMap<String, String>> Outparamlist=new ArrayList<HashMap<String, String>>();
				for(TaskTreeIOParam param:params){
					HashMap<String, String> parammap=new HashMap<String, String>();
					parammap.put("descri", param.getDescri());
					parammap.put("name", param.getName());
					if(param.getIotype()==1){
						parammap.put("type", "1");
						Inparamlist.add(parammap);
					}else{
						parammap.put("type", "0");
						Outparamlist.add(parammap);
					}
				}
				subMap.put("Inparamlist", Inparamlist);
				subMap.put("Outparamlist", Outparamlist);
				subMap.put("children", getsubNode(subnode));
				subnodelist.add(subMap);
				
			}
		
		}
		return subnodelist;
	}
	
	
	
	
	
	
	
	public void saveTaskTreeNode(){
		HashMap projectmap=(HashMap)getJSONvalueObject(taskTreeNode);
		Object id=projectmap.get("id");
    	Object object=projectmap.get("parent");
    	String name=projectmap.get("name").toString();
    	String descri=projectmap.get("des").toString();
    	Object role=projectmap.get("role");
    	String code=projectmap.get("code").toString();
//    	String input=projectmap.get("input").toString();
//    	String inputdescrip=projectmap.get("inputdescrip").toString();
//    	String output=projectmap.get("output").toString();
//    	String outputdescrip=projectmap.get("outputdescrip").toString();
    	//String orderid=projectmap.get("orderid").toString();
    	String url=projectmap.get("url").toString();
    	List<HashMap> InList = (List<HashMap>) projectmap
				.get("Inparamlist");
    	List<HashMap> OutList = (List<HashMap>) projectmap
				.get("Outparamlist");
    	if(id==null){
    	
	    	if(object==null){
	    		TaskTreeNode taskTreeNode=new TaskTreeNode();
	    		taskTreeNode.setNodeDescription(descri);
	    		OperationRoles r=new OperationRoles();
	    		r.setId(Long.valueOf(role.toString()));
	    		taskTreeNode.setRole(r);
	    		taskTreeNode.setParentNode(null);
	    		taskTreeNode.setUrl(url);
	    		taskTreeNode.setCode(code);
	    		//taskTreeNode.setOrderid(orderid);
	    		Set<TaskTreeIOParam> params=new HashSet<TaskTreeIOParam>();
	    		if(!CollectionUtils.isEmpty(InList)){
	    			for(HashMap h1:InList){
						String hname=String.valueOf(h1.get("name"));
						String hdescri=String.valueOf(h1.get("descri"));
						TaskTreeIOParam param=new TaskTreeIOParam();
						param.setDescri(hdescri);
						param.setName(hname);
						param.setIotype(1);
						params.add(param);
					}
	    		}
	    		if(!CollectionUtils.isEmpty(OutList)){
		    		for(HashMap h2:OutList){
						String h2name=String.valueOf(h2.get("name"));
						String h2descri=String.valueOf(h2.get("descri"));
						TaskTreeIOParam param=new TaskTreeIOParam();
						param.setDescri(h2descri);
						param.setName(h2name);
						param.setIotype(0);
						params.add(param);
					}
	    		}
	    		taskTreeNode.setParams(params);
	    		taskTreeNode.setNodeName(name);
	    		departmentService.saveTaskTreeNode(taskTreeNode);
	    	}else{
	    		TaskTreeNode taskTreeNode=new TaskTreeNode();
	    		taskTreeNode.setNodeDescription(descri);
	    		OperationRoles r=new OperationRoles();
	    		r.setId(Long.valueOf(role.toString()));
	    		taskTreeNode.setRole(r);
	    		TaskTreeNode parent=new TaskTreeNode();
	    		parent.setId(Long.valueOf(object.toString()));
	    		taskTreeNode.setParentNode(parent);
	    		taskTreeNode.setUrl(url);
	    		taskTreeNode.setCode(code);
	    		//taskTreeNode.setOrderid(orderid);
	    		Set<TaskTreeIOParam> params=new HashSet<TaskTreeIOParam>();
				for(HashMap h1:InList){
					String hname=String.valueOf(h1.get("name"));
					String hdescri=String.valueOf(h1.get("descri"));
					TaskTreeIOParam param=new TaskTreeIOParam();
					param.setDescri(hdescri);
					param.setName(hname);
					param.setIotype(1);
					params.add(param);
				}
				for(HashMap h2:OutList){
					String h2name=String.valueOf(h2.get("name"));
					String h2descri=String.valueOf(h2.get("descri"));
					TaskTreeIOParam param=new TaskTreeIOParam();
					param.setDescri(h2descri);
					param.setName(h2name);
					param.setIotype(0);
					params.add(param);
				}
	    		taskTreeNode.setParams(params);
	    		taskTreeNode.setNodeName(name);
	    		departmentService.saveTaskTreeNode(taskTreeNode);
	    	};
    	}else{
    		TaskTreeNode taskTreeNode=departmentService.getTaskTreebyid(id.toString());
    		taskTreeNode.setUrl(url);
    		taskTreeNode.setCode(code);
    		taskTreeNode.setNodeName(name);
    		taskTreeNode.setNodeDescription(descri);
    		Set<TaskTreeIOParam> params=new HashSet<TaskTreeIOParam>();
			for(HashMap h1:InList){
				String hname=String.valueOf(h1.get("name"));
				String hdescri=String.valueOf(h1.get("descri"));
				TaskTreeIOParam param=new TaskTreeIOParam();
				param.setDescri(hdescri);
				param.setName(hname);
				param.setIotype(1);
				params.add(param);
			}
			for(HashMap h2:OutList){
				String h2name=String.valueOf(h2.get("name"));
				String h2descri=String.valueOf(h2.get("descri"));
				TaskTreeIOParam param=new TaskTreeIOParam();
				param.setDescri(h2descri);
				param.setName(h2name);
				param.setIotype(0);
				params.add(param);
			}
			departmentService.deleteTaskTreeIOParamByTaskTree(Long.valueOf(id.toString()));
    		taskTreeNode.setParams(params);
    		departmentService.saveTaskTreeNode(taskTreeNode);
    	}
    	
	}
	public Object getJSONvalueObject(String data){
		Object datas ;
		try{
			datas =  JSONUtil.read(data);}
		catch(Exception e ){
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	
	   public void deleteTaskTreeNodes() throws IOException{
    	PrintWriter w=response.getWriter();
    	List<HashMap> nodes =(List<HashMap>)getJSONvalueObject(deletenodes);
    	int n=nodes.size();
    	 for(int i=0;i<n;i++){
    		 HashMap h=nodes.get(i);
    		 String nodeid=h.get("id").toString();
    		 TaskTreeNode node=departmentService.getTaskTreebyid(nodeid);
    		 Set<TaskTreeNode> subNodes=node.getSubNodes();
    		 if(subNodes.size()>0){
    			 Iterator it=subNodes.iterator();
    				while(it.hasNext()){
    					TaskTreeNode subnode=(TaskTreeNode)it.next();
    					departmentService.deleteTaskTreeNodes(subnode.getId().toString());
    					
    				}
    			 
    		 }
    		 departmentService.deleteTaskTreeNodes(nodeid);
    		 
    	 }
    	 
    	
    }
	public void getTaskTreeNodeByRole(){
		
	}
	
	
	public void deleteTaskTreeNodeByRole(){
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public TaskTreeNode getModel() {
		// TODO Auto-generated method stub
		return null;
	}
	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request=arg0;
		
	}
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response=arg0;
		
	}
	@Override
	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String input() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	protected void prepareModel() throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	public DepartmentService getDepartmentService() {
		return departmentService;
	}
	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getTaskTreeNode() {
		return taskTreeNode;
	}
	public void setTaskTreeNode(String taskTreeNode) {
		this.taskTreeNode = taskTreeNode;
	}
	public String getDeletenodes() {
		return deletenodes;
	}
	public void setDeletenodes(String deletenodes) {
		this.deletenodes = deletenodes;
	}
	


	
}
