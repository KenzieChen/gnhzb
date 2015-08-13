package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;

public class PdmTask {

	
	private Long id;
	private String name;
	private String status;
	private Employee checkperson;
	private TaskTreeNode checkTaskTreeNode;
	private Employee carrier;
	private String mainFileName;
	private Date starttime;
	private PdmProcessTemplate pdmprocessTemplate;
	private PdmModule pdmModule;//子任务模板
	private String prevtaskid;
	private String nexttaskid;
	private String parenttaskid;
	private String taskid;
	private String taskindex;//任务index,如1,1.1，1.2
	private int istail;
	private int istop;
	private Date endtime;
	private PdmProject pdmProject;
	private PdmTask parentPdmTask;
	private Set<PdmTask> subPdmTasks=new HashSet<PdmTask>();
	private Set<TaskIOParam> params=new HashSet<TaskIOParam>();
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStarttime() {
		return starttime;
	}
	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}
	public Date getEndtime() {
		return endtime;
	}
	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}
	public Employee getCheckperson() {
		return checkperson;
	}
	public void setCheckperson(Employee checkperson) {
		this.checkperson = checkperson;
	}
	
	public PdmModule getPdmModule() {
		return pdmModule;
	}
	public void setPdmModule(PdmModule pdmModule) {
		this.pdmModule = pdmModule;
	}
	public String getMainFileName() {
		return mainFileName;
	}
	public void setMainFileName(String mainFileName) {
		this.mainFileName = mainFileName;
	}
	public Employee getCarrier() {
		return carrier;
	}
	public void setCarrier(Employee carrier) {
		this.carrier = carrier;
	}
	public PdmProject getPdmProject() {
		return pdmProject;
	}
	public void setPdmProject(PdmProject pdmProject) {
		this.pdmProject = pdmProject;
	}
	public PdmTask getParentPdmTask() {
		return parentPdmTask;
	}
	public void setParentPdmTask(PdmTask parentPdmTask) {
		this.parentPdmTask = parentPdmTask;
	}
	public Set<PdmTask> getSubPdmTasks() {
		return subPdmTasks;
	}
	public void setSubPdmTasks(Set<PdmTask> subPdmTasks) {
		this.subPdmTasks = subPdmTasks;
	}
	public PdmProcessTemplate getPdmprocessTemplate() {
		return pdmprocessTemplate;
	}
	public void setPdmprocessTemplate(PdmProcessTemplate pdmprocessTemplate) {
		this.pdmprocessTemplate = pdmprocessTemplate;
	}
	
	public int getIstail() {
		return istail;
	}
	public void setIstail(int istail) {
		this.istail = istail;
	}
	public int getIstop() {
		return istop;
	}
	public void setIstop(int istop) {
		this.istop = istop;
	}

	public String getPrevtaskid() {
		return prevtaskid;
	}
	public void setPrevtaskid(String prevtaskid) {
		this.prevtaskid = prevtaskid;
	}
	public String getNexttaskid() {
		return nexttaskid;
	}
	public void setNexttaskid(String nexttaskid) {
		this.nexttaskid = nexttaskid;
	}
	public String getParenttaskid() {
		return parenttaskid;
	}
	public void setParenttaskid(String parenttaskid) {
		this.parenttaskid = parenttaskid;
	}
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public TaskTreeNode getCheckTaskTreeNode() {
		return checkTaskTreeNode;
	}
	public void setCheckTaskTreeNode(TaskTreeNode checkTaskTreeNode) {
		this.checkTaskTreeNode = checkTaskTreeNode;
	}
	public String getTaskindex() {
		return taskindex;
	}
	public void setTaskindex(String taskindex) {
		this.taskindex = taskindex;
	}
	public Set<TaskIOParam> getParams() {
		return params;
	}
	public void setParams(Set<TaskIOParam> params) {
		this.params = params;
	}

}
