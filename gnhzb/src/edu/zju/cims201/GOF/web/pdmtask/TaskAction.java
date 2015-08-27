package edu.zju.cims201.GOF.web.pdmtask;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONString;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;
import org.springside.modules.orm.Page;


import com.hp.hpl.jena.sparql.core.Var;


import EDU.oswego.cs.dl.util.concurrent.Takable;
import edu.zju.cims201.GOF.web.CrudActionSupport;
import edu.zju.cims201.GOF.dao.task.PdmtaskDAO;
import edu.zju.cims201.GOF.hibernate.pojo.Function;
import edu.zju.cims201.GOF.hibernate.pojo.Node;
import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessUrl;
import edu.zju.cims201.GOF.hibernate.pojo.RelatedModel;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.TreeNode;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProject;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LcaTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProjectValuePool;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.rs.dto.TaskDTO;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.service.task.TaskService;
import edu.zju.cims201.GOF.service.tree.TreeService;
import edu.zju.cims201.GOF.util.Constants;
import edu.zju.cims201.GOF.util.JSONUtil;

import org.apache.commons.lang.StringUtils;


@Namespace("/pdmtask")
@Results({
		@Result(name = CrudActionSupport.RELOAD, location = "task.action", type = "redirect"),
		@Result(name = "taskmanage", location = "/WEB-INF/content/process/filelook.jsp"),
		@Result(name = "processmanage", location = "/WEB-INF/content/process/Processtest.jsp"),
		@Result(name = "processfile", location = "/WEB-INF/content/process/files.jsp") })
public class TaskAction extends CrudActionSupport<LcaTask> implements
		ServletResponseAware, ServletRequestAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Resource(name = "treeServiceImpl")
	private TreeService treeService;
	@Resource(name = "userServiceImpl")
	private UserService userServiceImpl;
	@Resource(name = "taskServiceImpl")
	private TaskService taskService;
	@Resource(name="moduleServiceImpl")
	private ModuleService moduleService;
	@Resource(name="departmentServiceImpl")
	private DepartmentService departmentService;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private int size;
	private int index;
	private String cellcollection;
	private String moduleid;
	private String taskid;
	PrintWriter out;
	private String tasktype;
	private String processtemplateid;
	private String result;
	private String resultparam;


	public LcaTask getModel() {
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

  
	public String getMytasks() {
		SystemUser sysuser = userServiceImpl.getUser();
		System.out.println(sysuser.getId());
		Employee user=departmentService.getEmployeebyuserid(sysuser.getId());
		if(tasktype.equals("Pdm")){
			
			Page<PdmTask> page = null;
			if (this.getSize() == 0) {
				page = new Page<PdmTask>(20);
			} else {
				page = new Page<PdmTask>(this.getSize());
			}
			page.setPageNo(this.getIndex());
			Page<PdmTask> newpage = null;
			newpage = taskService.getPdmtasks(user, page);
			PageDTO pagedto = new PageDTO();
			pagedto.setTotal(newpage.getTotalCount());
			pagedto.setPagesize(newpage.getPageSize());
			pagedto.setTotalPage(newpage.getTotalPages());
			List<PdmTask> tasklist = newpage.getResult();
	        pagedto.setData(new ArrayList());
	        System.out.println("ddddddddddddddddddddddddddddddddd"+user.getId());
	        System.out.println("ddddddddddddddddddddddddddddddddd"+tasklist.size());
			for (PdmTask task : tasklist) {
				TaskDTO taskdto = new TaskDTO();
				taskdto.setName(task.getName());
				taskdto.setId(task.getId());
				taskdto.setStarttime(task.getStarttime().toString());
				taskdto.setEndtime(task.getEndtime().toString());
				taskdto.setCarriername(task.getCarrier().getUser().getName());
				taskdto.setProjectname(task.getPdmProject().getProjectname());
				taskdto.setStatus(task.getStatus());
				pagedto.getData().add(taskdto);
			}
			System.out.println(tasklist.size());
			JSONUtil.write(response, pagedto);
			return null;
		
		}else if(tasktype.equals("Lca")){
			Page<LcaTask> page = null;
			if (this.getSize() == 0) {
				page = new Page<LcaTask>(20);
			} else {
				page = new Page<LcaTask>(this.getSize());
			}
			page.setPageNo(this.getIndex());
			Page<LcaTask> newpage = null;
			newpage = taskService.getLcatasks(user, page);
	
			PageDTO pagedto = new PageDTO();
			pagedto.setTotal(newpage.getTotalCount());
			pagedto.setPagesize(newpage.getPageSize());
			pagedto.setTotalPage(newpage.getTotalPages());
			List<LcaTask> tasklist = newpage.getResult();
	        pagedto.setData(new ArrayList());
			// SystemUser user = userServiceImpl.getUser();
			// if(size==0){
			// size=20;
			// }
			// if(index==0){
			// index=1;
			// }
			// List<Task> tasklist=workFlowService.getMytask(user,index,size);
			// List<TaskDTO> taskdtoList=new ArrayList<TaskDTO>();
			for (LcaTask task : tasklist) {
				TaskDTO taskdto = new TaskDTO();
				taskdto.setName(task.getName());
				taskdto.setId(task.getId());
				taskdto.setStarttime(task.getStarttime().toString());
				taskdto.setEndtime(task.getEndtime().toString());
				taskdto.setCarriername(task.getCarrier().getUser().getName());
				taskdto.setProjectname(task.getPdmProject().getProjectname());
				taskdto.setStatus(task.getStatus());
				pagedto.getData().add(taskdto);
			}
			System.out.println(tasklist.size());
			JSONUtil.write(response, pagedto);
			return null;
		}else {
			return null;
		}		
	}
	
	
	public void submitTask() throws IOException{
		HashMap<String, String> resultmap=new HashMap<String, String>();
		PdmTask task=taskService.getPdmTask(Long.valueOf(taskid));
		List<HashMap<String, Object>> resultlist=(List<HashMap<String, Object>>) getJSONvalueObject(resultparam);
		List<TaskIOParam> params=taskService.getTaskParamsByTask(Long.valueOf(taskid),0);
		List<PdmProjectValuePool> items=new ArrayList<PdmProjectValuePool>();
		for(HashMap<String, Object> parammap:resultlist){
			String name=String.valueOf(parammap.get("name"));
			String value=String.valueOf(parammap.get("value"));
			if(StringUtils.isBlank(value)){
				resultmap.put("isSuccess", "0");
				resultmap.put("message", "输出不全,"+String.valueOf(parammap.get("descri"))+"为空!");
				String jsonString =JSONUtil.write(resultmap);
				out.print(jsonString);
				return;
			}
			for(TaskIOParam param:params){
				if(name.equals(param.getName())){
					PdmProjectValuePool item=new PdmProjectValuePool();
					item.setIsarray(0);
					item.setIotype(0);
					item.setValue(value);
					item.setName(param.getName());
					item.setProject(task.getPdmProject());
					items.add(item);
					param.setValue(value);
					break;
				}
			}
		}
		taskService.savePdmProjectValuePool(items);
		taskService.saveIoPrams(params);
		List<PdmTask> alltaskList=new ArrayList<PdmTask>();
		if(task.getCheckperson() == null){
			task.setStatus(Constants.TASK_STATUS_FINISH);
			getNextTasks(task,alltaskList,params);
			
		}else{
			task.setStatus(Constants.TASK_STATUS_TO_CHECK);
			
		}
		alltaskList.add(task);
      	taskService.updateTaskStatus(alltaskList);
		resultmap.put("isSuccess", "1");
		resultmap.put("message", "任务提交成功");
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
	}
	
	public void submitTaskCheck() throws IOException{
		List<PdmTask> alltaskList=new ArrayList<PdmTask>();
		PdmTask task=taskService.getPdmTask(Long.valueOf(taskid));
		task.setStatus(Constants.TASK_STATUS_FINISH);
		getNextTasks(task,alltaskList,null);
	    taskService.updateTaskStatus(alltaskList);
	    HashMap<String, String> resultmap=new HashMap<String, String>();
	    resultmap.put("isSuccess", "1");
		resultmap.put("message", "审核成功");
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
	}
	
	public void getNextTasks(PdmTask task,List<PdmTask> alltaskList,List<TaskIOParam> params){
	    if(task.getIstail() == 1){
	    	String parenttaskid=task.getParenttaskid();
	    	Long projectid=task.getPdmProject().getId();
	    	PdmTask parenttask=taskService.getTaskByparentTaskId(parenttaskid,projectid);
	    	parenttask.setStatus(Constants.TASK_STATUS_FINISH);
	    	alltaskList.add(parenttask);
	    	String nexttaskids=parenttask.getNexttaskid();
	    	String[] nexttaskarray=nexttaskids.split(";");
	    	String nextidsstring="";
	    	for(String nexttaskid:nexttaskarray){
	    		nextidsstring=nextidsstring+nexttaskid+",";
	    	}
	    	nextidsstring=nextidsstring.substring(0,nextidsstring.length()-1);
	    	//nextidsstring=nextidsstring+")"; 
	    	if(parenttask.getIstail() == 1){
	    		return;
	    	}
	    	List<PdmTask> nextparentTasks=taskService.getTaskByNextTaskId(nextidsstring, parenttask.getPdmProject().getId());
	    	for(PdmTask task2:nextparentTasks){
	    		if(!task2.getPrevtaskid().equals(parenttask.getTaskid())){
	    			String pretaskids=task2.getPrevtaskid();
	    			int result=checkTasksIsFinished(pretaskids,task);
	    			if(result > 0){
	    	    		continue;
	    	    	}
	    		}
	    		task2.setStatus(Constants.TASK_STATUS_ACTIVE);
				alltaskList.add(task2);
				List<PdmTask> tasksList=taskService.getTaskByParentLevelModule(1,task2.getTaskid(),projectid);
				for(PdmTask task3:tasksList){
					task3.setStatus(Constants.TASK_STATUS_ACTIVE);
					alltaskList.add(task3);
				}
			}
	    }else{
	    	String nexttaskids=task.getNexttaskid();
	    	String[] nexttaskarray=nexttaskids.split(";");
	    	String nextidsstring="";
	    	for(String nexttaskid:nexttaskarray){
	    		nextidsstring=nextidsstring+nexttaskid+",";
	    	}
	    	nextidsstring=nextidsstring.substring(0,nextidsstring.length()-1);
//	    	nextidsstring=nextidsstring+")"; 
	    	List<PdmTask> nextTasks=taskService.getTaskByNextTaskId(nextidsstring, task.getPdmProject().getId());
	    	for(PdmTask t:nextTasks){
	    		
	    		if(!t.getPrevtaskid().equals(task.getTaskid())){
	    			String pretaskids1=t.getPrevtaskid();
	    			int result=checkTasksIsFinished(pretaskids1,task);
	    	    	if(result > 0){
	    	    		continue;
	    	    	}
	    			
	    		}
	        	t.setStatus(Constants.TASK_STATUS_ACTIVE);
	        	alltaskList.add(t);
	        	if(params != null){
	        		List<TaskIOParam> inputparams=taskService.getTaskParamsByTask(t.getId(),1);
	        		List<TaskIOParam> updateparams=new ArrayList<TaskIOParam>();
	        		for(TaskIOParam param:params){
	        			for(TaskIOParam inputparam:inputparams){
			        		if(inputparam.getName().equals(param.getName())){
			        			inputparam.setValue(param.getValue());
			        			updateparams.add(inputparam);
			        			break;
			        		}
			        		
			        	}
		        	}
	        		taskService.saveIoPrams(updateparams);
	        	}
	        	
	        }	
	    }
	}
	public int checkTasksIsFinished(String pretaskids,PdmTask task){
		String[] pretaskids1array=pretaskids.split(";");
		String pretaskids1string="(";
    	for(String pretaskid:pretaskids1array){
    		pretaskids1string=pretaskids1string+pretaskid+",";
    	}
    	pretaskids1string=pretaskids1string.substring(0,pretaskids1string.length()-1);
    	pretaskids1string=pretaskids1string+")"; 
    	int result=taskService.checkTasksIsFinished(pretaskids1string,task.getPdmProject().getId());
    	return result;
		
	}
	public void getkeywordidsbyprocess() throws IOException{
    	PdmProcessTemplate p=moduleService.getprocesstemplate(processtemplateid);
    	Set<RelatedModel> relatedmodels=p.getRelatedmodels();
    	Iterator it =relatedmodels.iterator();
    	List<HashMap<String, Object>> list=new ArrayList<HashMap<String,Object>>();
    	while(it.hasNext())
    	{   	
    		
				HashMap<String, Object> map = new HashMap<String, Object>();
    			RelatedModel r=(RelatedModel)it.next();
				map.put("id",   r.getDomainNodeId());
				TreeNode a=treeService.getTreeNode(r.getDomainNodeId());
				map.put("name", a.getNodeName());	
				list.add(map);
    	}
    	ObjectMapper objectMapper = new ObjectMapper();	
	    objectMapper.writeValue(response.getWriter(),list);
    }

	
	
    public void getTaskDetailbyTaskid() throws IOException{
    	PdmTask t=taskService.getPdmTask(Long.valueOf(taskid));
    	PdmProcessTemplate p=t.getPdmprocessTemplate();
    	TaskTreeNode node=p.getTasktreenode();
    	HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("id", node.getId());
		map.put("name", p.getName());	
		map.put("des", node.getNodeDescription());	
		map.put("url", node.getUrl().trim());
		map.put("status", t.getStatus());
		map.put("processtemplateid", p.getId());
		map.put("code", node.getCode());	
		List<HashMap<String, String>> Inparamlist=new ArrayList<HashMap<String, String>>();
		List<HashMap<String, String>> Outparamlist=new ArrayList<HashMap<String, String>>();
		List<TaskIOParam> params=taskService.getTaskParamsByTask(Long.valueOf(taskid),-1);
		List<PdmProjectValuePool> items=taskService.getPdmProjectValuePools(t.getPdmProject().getId());
		List<TaskIOParam> updateparams=new ArrayList<TaskIOParam>();
		for(TaskIOParam param:params){
			HashMap<String, String> parammap=new HashMap<String, String>();
			parammap.put("descri", param.getDescri());
			parammap.put("name", param.getName());
			if(param.getIotype()==1){
				parammap.put("type", "1");
				if(StringUtils.isEmpty(param.getValue())){
					updateparamvalue(param,items,updateparams);
				}
				parammap.put("value", param.getValue());
				Inparamlist.add(parammap);
			}else{
				parammap.put("value", param.getValue());
				parammap.put("type", "0");
				Outparamlist.add(parammap);
			}
			
		}
		taskService.saveIoPrams(updateparams);
		map.put("Inparamlist", Inparamlist);
		map.put("Outparamlist", Outparamlist);
    	ObjectMapper objectMapper = new ObjectMapper();	
	    objectMapper.writeValue(response.getWriter(),map);
    }
    public void updateparamvalue(TaskIOParam param,List<PdmProjectValuePool> items,List<TaskIOParam> updateparams){
    	PdmProject project=param.getTask().getPdmProject();
    	for(PdmProjectValuePool item : items){
    		if(item.getName().equals(param.getName()) && !StringUtils.isEmpty(item.getValue())){
    			param.setValue(item.getValue());
    			updateparams.add(param);
        	}
    	}
    }
    
    
    
    
    public List getsubnodes(PdmProcessTemplate p,String parentlevelid,String supermoduleid){
    	List<HashMap<String, Object>> nodelist=new ArrayList<HashMap<String,Object>>();
    	PdmModule submodule =moduleService.getPdmModulebyparentandprocess(parentlevelid,
				p.getProcessid(),supermoduleid);
    	if(submodule!=null){
    		
    		List<PdmProcessTemplate> prots=moduleService.getprocesslists(submodule.getId());
        
        for(int i=0;i<prots.size();i++){
        		PdmProcessTemplate pt=prots.get(i);
        		TaskTreeNode subnode=pt.getTasktreenode();
        		HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("id", subnode.getId());
				map.put("name", pt.getName());
//				map.put("input", pt.getInput());
//				map.put("output", pt.getOutput());
				map.put("des", subnode.getNodeDescription());	
				map.put("url", subnode.getUrl());
				map.put("processtemplateid", pt.getId());
				map.put("code", subnode.getCode());	
				map.put("children", getsubnodes(pt,submodule.getLevelid(),supermoduleid));	
				nodelist.add(map);
        	}
        	return nodelist;
    	}else{
    		return null;
    	}
    	
    }
/*    public void taskAssignment() throws ParseException{
    	  List<HashMap> tasks =getJSONvalueList();
    	  int n=tasks.size();
    	  Task task=taskService.getTask(Long.valueOf(taskid));
    	  PdmModule pdm=new PdmModule();
		  pdm.setId(Integer.valueOf(moduleid));
    	  task.setPdmModule(pdm);
    	  PdmProject pro=task.getPdmProject();
    	  SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd");
    	  for(int i=0;i<n;i++){
    		   Task t=new Task();
			   HashMap h=tasks.get(i);
			   String processid=String.valueOf(h.get("processid"));
			   ProcessTemplate p=moduleService.getNodebyModuleandProcess(moduleid, processid);
			   t.setProcessTemplate(p);
			   long carrierid=Long.valueOf(h.get("processcarrier").toString());
			   Employee carrier=new Employee();
			   carrier.setId(carrierid);
			   t.setCarrier(carrier);
			   String starttime=String.valueOf(h.get("starttime"));
			   String endtime=String.valueOf(h.get("finishtime"));
			   Date taskstartTime=a.parse(starttime);
	           Date taskfinishTime=a.parse(endtime);
			   t.setStarttime(taskstartTime);
			   t.setEndtime(taskfinishTime);
			   String processname=String.valueOf(h.get("processname"));
			   t.setName(processname);
			   t.setStatus(Constants.TASK_STATUS_TO_BE_ACTIVE);
			   t.setPdmProject(pro);
			   t.setParentTask(task);
			   taskService.saveTask(t);
			   String tasktreenodeid=String.valueOf(h.get("tasktreenodeid"));
			   TaskTreeNode node=new TaskTreeNode();
			   node.setId(Long.valueOf(tasktreenodeid));
			   ProcessUrl pu=new ProcessUrl();
			   pu.setTask(t);
		       pu.setNode(node);
			   taskService.savefunctionurl(pu);
			   Set<Function> functions= p.getNode().getFunctions();
				List<Function> functionlist=new ArrayList<Function>();
				 Iterator it=functions.iterator();
					while(it.hasNext()){
						Function f=(Function)it.next();
						String functiontype=f.getTypee();
						String typee=String.valueOf(h.get(functiontype));
						if(functiontype.equals("processurl")){
							ProcessUrl pu=new ProcessUrl();
							pu.setTask(t);
							pu.setUrl(typee);
							taskService.savefunctionurl(pu);
							
						}
					}
			  
		   }
    }*/
    
    public Object getJSONvalueObject(String data) {
		Object datas;
		try {
			datas = JSONUtil.read(data);
		} catch (Exception e) {
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	
    public List<HashMap> getJSONvalueList()
	{
		//JSONUtil jr  = new JSONUtil();
		List<HashMap> datas ;
		try{
			datas =  (List)JSONUtil.read(cellcollection);}
		catch(Exception e ){
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	public UserService getUserServiceImpl() {
		return userServiceImpl;
	}


	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}


	public TaskService getTaskService() {
		return taskService;
	}


	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}


	public HttpServletRequest getRequest() {
		return request;
	}


	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}


	public HttpServletResponse getResponse() {
		return response;
	}


	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}



	public PrintWriter getOut() {
		return out;
	}


	public void setOut(PrintWriter out) {
		this.out = out;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public int getSize() {
		return size;
	}


	public ModuleService getModuleService() {
		return moduleService;
	}


	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}


	public void setSize(int size) {
		this.size = size;
	}


	public String getModuleid() {
		return moduleid;
	}


	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}


	public String getTasktype() {
		return tasktype;
	}


	public void setTasktype(String tasktype) {
		this.tasktype = tasktype;
	}


	public int getIndex() {
		return index;
	}


	public void setIndex(int index) {
		this.index = index;
	}


	public String getCellcollection() {
		return cellcollection;
	}


	public String getTaskid() {
		return taskid;
	}


	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}


	public void setCellcollection(String cellcollection) {
		this.cellcollection = cellcollection;
	}


	public DepartmentService getDepartmentService() {
		return departmentService;
	}


	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}


	public TreeService getTreeService() {
		return treeService;
	}


	public void setTreeService(TreeService treeService) {
		this.treeService = treeService;
	}


	public String getProcesstemplateid() {
		return processtemplateid;
	}


	public void setProcesstemplateid(String processtemplateid) {
		this.processtemplateid = processtemplateid;
	}


	public String getResult() {
		return result;
	}


	public void setResult(String result) {
		this.result = result;
	}


	public String getResultparam() {
		return resultparam;
	}


	public void setResultparam(String resultparam) {
		this.resultparam = resultparam;
	}

	/**
	 * 得到关于具体某一个任务的具体信息
	 * 
	 * @author yet
	 */
	

}
