package edu.zju.cims201.GOF.web.pdmproject;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.util.CollectionUtils;

import edu.zju.cims201.GOF.web.CrudActionSupport;
import edu.zju.cims201.GOF.dao.task.PdmtaskDAO;
import edu.zju.cims201.GOF.hibernate.pojo.CProject;
import edu.zju.cims201.GOF.hibernate.pojo.Function;
import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessUrl;
import edu.zju.cims201.GOF.hibernate.pojo.RelatedModel;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProject;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LcaTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.project.ProjectService;
import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.service.task.TaskService;
import edu.zju.cims201.GOF.util.Constants;
import edu.zju.cims201.GOF.util.JSONUtil;

@Namespace("/project")
@Results({ @Result(name = CrudActionSupport.RELOAD, location = "project.action", type = "redirect") })
public class ProjectAction extends CrudActionSupport<CProject> implements
		ServletResponseAware, ServletRequestAware {
	private static final long serialVersionUID = 8683878162525847072L;
	@Resource(name = "departmentServiceImpl")
	private DepartmentService departmentService;
	@Resource(name = "projectServiceImpl")
	private ProjectService projectService;
	@Resource(name = "taskServiceImpl")
	private TaskService taskService;
	@Resource(name = "userServiceImpl")
	private UserService userservice;
	@Resource(name = "moduleServiceImpl")
	private ModuleService moduleService;
	private HttpServletRequest request;
	private HttpServletResponse response;
	private String cellcollection;
	private String moduleid;
	private String projectdetail;
	private String projectname;
	private String projecttype;
	private String starttime;
	private String finishtime;
	private String processid;
	private String projectobjectdefine;
	private long projectid;
	private String tasksdata;

	PrintWriter out;

	public String getCellcollection() {
		return cellcollection;
	}

	public void setCellcollection(String cellcollection) {
		this.cellcollection = cellcollection;
	}

	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	public String getProjectdetail() {
		return projectdetail;
	}

	public void setProjectdetail(String projectdetail) {
		this.projectdetail = projectdetail;
	}

	public String getProjectname() {
		return projectname;
	}

	public void setProjectname(String projectname) {
		this.projectname = projectname;
	}

	public String getProjecttype() {
		return projecttype;
	}

	public void setProjecttype(String projecttype) {
		this.projecttype = projecttype;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getFinishtime() {
		return finishtime;
	}

	public void setFinishtime(String finishtime) {
		this.finishtime = finishtime;
	}

	public ProjectService getProjectService() {
		return projectService;
	}

	public void setProjectService(ProjectService projectService) {
		this.projectService = projectService;
	}

	public String nodemanage() {
		return "nodemanage";
	}

	public void saveproject() throws ParseException {
		SystemUser sysuser = userservice.getUser();
		Employee user = departmentService.getEmployeebyuserid(sysuser.getId());
		HashMap projectmap = (HashMap) getJSONvalueObject(projectobjectdefine);
		String projectname = projectmap.get("projectname").toString();
		if ((!"".equals(projectname)) && projectname != null) {
			// 开发任务管理者
			// DomainTreeNode domain=domaintreeDao.get(this.domainId);
			System.out.println("开始");
			PdmProject pro = new PdmProject();
			pro.setProjectname(projectname);
			// pro.setProjectCode(projectCode);
			pro.setProjectdetail(projectmap.get("projectnote").toString());
			// pro.setDomainnode(domain);
			pro.setCreater(user);
			pro.setCreatTime(new Date());
			pro.setFinishpercent("0");
			SimpleDateFormat a = new SimpleDateFormat("yyyy-MM-dd");
			// 转换为标准时间格式
			Date startTime = a.parse(projectmap.get("starttime").toString());
			Date finishTime = a.parse(projectmap.get("finishtime").toString());
			pro.setStartTime(startTime);
			pro.setDeveloper(user);
			pro.setApplier(user);
			pro.setFinishTime(finishTime);
			String moduleid = projectmap.get("moduleid").toString();
			PdmModule pdm = new PdmModule();
			pdm.setId(Integer.valueOf(moduleid));

			pro.setPdmModule(pdm);
			int day = (int) ((finishTime.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000));
			// 开发任务
			projectService.save(pro);
			PrintWriter out;
			try {
				out = this.response.getWriter();
				out.print(pro.getId());
				out.flush();
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
			
			
			
	public void saveTasks() throws ParseException{
		PdmProject pro=projectService.getProject(projectid);
		SimpleDateFormat a = new SimpleDateFormat("yyyy-MM-dd");
		HashMap tasksmap = (HashMap) getJSONvalueObject(tasksdata);
		List tasks = (List) tasksmap.get("alltasks");
		int length = tasks.size();
		for (int i = 0; i < length; i++) {
			PdmTask t = new PdmTask();
			System.out.println("继续");
			HashMap h = (HashMap)tasks.get(i);
			String processid = String.valueOf(h.get("id"));
			String moduleid=String.valueOf(h.get("pdmmoduleid"));
			PdmProcessTemplate p = (PdmProcessTemplate) moduleService
					.getProcessTemplatebyModuleandProcess(moduleid, processid);
			t.setPdmprocessTemplate(p);
			t.setPdmModule(null);//默认是没有对任务设置子任务的模板
			Set<TaskIOParam> params=new HashSet<TaskIOParam>();
			List<HashMap> InList = (List<HashMap>) h
					.get("Inparamlist");
			if(!CollectionUtils.isEmpty(InList)){
				for(HashMap h1:InList){
					String name=String.valueOf(h1.get("name"));
					String descri=String.valueOf(h1.get("descri"));
					int isarray=Integer.valueOf(h1.get("isarray").toString());
					TaskIOParam param=new TaskIOParam();
					param.setDescri(descri);
					param.setName(name);
					param.setIotype(1);
					param.setIsarray(isarray);
					params.add(param);
				}
			}
			
			List<HashMap> OutList = (List<HashMap>) h
					.get("Outparamlist");
			if(!CollectionUtils.isEmpty(OutList)){
				for(HashMap h2:OutList){
					String name=String.valueOf(h2.get("name"));
					String descri=String.valueOf(h2.get("descri"));
					int isarray=Integer.valueOf(h2.get("isarray").toString());
					TaskIOParam param=new TaskIOParam();
					param.setDescri(descri);
					param.setName(name);
					param.setIotype(0);
					param.setIsarray(isarray);
					params.add(param);
				}
			}
			t.setParams(params);
			t.setTaskid(String.valueOf(h.get("moduleid")));
			t.setParenttaskid(String.valueOf(h.get("parentmoduleid")));
			t.setPrevtaskid(String.valueOf(h.get("prevmoduleid")));
			t.setNexttaskid(String.valueOf(h.get("nextmoduleid")));
			t.setIstop(0);
			t.setIstail(0);
			if(t.getPrevtaskid().equals("0")){
				t.setIstop(1);
				
			}
			if(t.getNexttaskid().equals("0")){
				t.setIstail(1);
			}
			if(String.valueOf(h.get("processpersonid"))!=null && !String.valueOf(h.get("processpersonid")).equals("null")){
				long carrierid = Long.valueOf(String.valueOf(h.get("processpersonid"))
						);
				Employee carrier = new Employee();
				carrier.setId(carrierid);
				t.setCarrier(carrier);
			}else{
				t.setCarrier(null);
			}
			
			if(String.valueOf(h.get("processcheckpersonid"))!=null && !String.valueOf(h.get("processcheckpersonid")).equals("null")){
				long checkid = Long.valueOf(h.get("processcheckpersonid")
						.toString());
				Employee checkperson = new Employee();
				checkperson.setId(checkid);
				t.setCheckperson(checkperson);
			}else{
				t.setCheckperson(null);
			}
			if(String.valueOf(h.get("starttime"))!=null && !String.valueOf(h.get("starttime")).equals("null")){
				String starttime = String.valueOf(h.get("starttime"));
				Date taskstartTime = a.parse(starttime);
				t.setStarttime(taskstartTime);
			}else{
				t.setStarttime(null);
			}
			if(String.valueOf(h.get("finishtime"))!=null && !String.valueOf(h.get("finishtime")).equals("null")){
				String endtime = String.valueOf(h.get("finishtime"));
				Date taskfinishTime = a.parse(endtime);
				t.setEndtime(taskfinishTime);
			}else{
				t.setEndtime(null);
			}
			String processname = String.valueOf(h.get("processname"));
			t.setName(processname);
			t.setStatus(Constants.TASK_STATUS_TO_BE_ACTIVE);
			t.setPdmProject(pro);
			taskService.savePdmTask(t);
		}
		List<PdmTask> alltaskList=new ArrayList<PdmTask>();
		List<PdmTask> parenttasksList=taskService.getTaskByParentLevelModule(1,"0",projectid);
		for(PdmTask task:parenttasksList){
			alltaskList.add(task);
			List<PdmTask> tasksList=taskService.getTaskByParentLevelModule(1,task.getTaskid(),projectid);
			task.setStatus(Constants.TASK_STATUS_ACTIVE);
			for(PdmTask task2:tasksList){
				task2.setStatus(Constants.TASK_STATUS_ACTIVE);
				alltaskList.add(task2);
			}
		}
		
		taskService.updateTaskStatus(alltaskList);
		
			
				
//		int n = tasks.size();
//		PdmModule pm = moduleService.getPdmModulebyparentandprocess(
//				"level_top", null, moduleid);
//		moduleid = String.valueOf(pm.getId());
//		for (int i = 0; i < n; i++) {
//			PdmTask t = new PdmTask();
//			System.out.println("继续");
//			HashMap h = tasks.get(i);
//			String processid = String.valueOf(h.get("id"));
//			PdmProcessTemplate p = (PdmProcessTemplate) moduleService
//					.getProcessTemplatebyModuleandProcess(moduleid, processid);
//			t.setPdmprocessTemplate(p);
//			t.setPdmModule(null);//默认是没有对任务设置子任务的模板
//			long carrierid = Long.valueOf(h.get("processpersonid")
//					.toString());
//			Employee carrier = new Employee();
//			carrier.setId(carrierid);
//			t.setCarrier(carrier);
//			long checkid = Long.valueOf(h.get("processcheckpersonid")
//					.toString());
//			Employee checkperson = new Employee();
//			checkperson.setId(checkid);
//			t.setCheckperson(checkperson);
//			String starttime = String.valueOf(h.get("starttime"));
//			String endtime = String.valueOf(h.get("finishtime"));
//			Date taskstartTime = a.parse(starttime);
//			Date taskfinishTime = a.parse(endtime);
//			t.setStarttime(taskstartTime);
//			t.setEndtime(taskfinishTime);
//			String processname = String.valueOf(h.get("processname"));
//			t.setName(processname);
//			t.setStatus(Constants.TASK_STATUS_TO_BE_ACTIVE);
//			t.setPdmProject(pro);
//			taskService.savePdmTask(t);
		

		PrintWriter out;
		try {
			out = this.response.getWriter();
			out.print("1");
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

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

	public CProject getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;

	}

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}

	public String getProcessid() {
		return processid;
	}

	public void setProcessid(String processid) {
		this.processid = processid;
	}

	public ModuleService getModuleService() {
		return moduleService;
	}

	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}

	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public UserService getUserservice() {
		return userservice;
	}

	public void setUserservice(UserService userservice) {
		this.userservice = userservice;
	}

	public String getProjectobjectdefine() {
		return projectobjectdefine;
	}

	public void setProjectobjectdefine(String projectobjectdefine) {
		this.projectobjectdefine = projectobjectdefine;
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
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void prepareModel() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public DepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public long getProjectid() {
		return projectid;
	}

	public void setProjectid(long projectid) {
		this.projectid = projectid;
	}

	public String getTasksdata() {
		return tasksdata;
	}

	public void setTasksdata(String tasksdata) {
		this.tasksdata = tasksdata;
	}

}
