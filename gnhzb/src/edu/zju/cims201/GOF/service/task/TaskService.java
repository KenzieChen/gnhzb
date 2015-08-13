package edu.zju.cims201.GOF.service.task;


import java.util.List;

import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.pojo.Function;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessUrl;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LcaTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProjectValuePool;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;


public interface TaskService {
	public Page<LcaTask> getLcatasks(Employee user,Page<LcaTask> page);
	public Page<PdmTask> getPdmtasks(Employee user,Page<PdmTask> page);
	public void saveLcaTask(LcaTask t);
	public void savePdmTask(PdmTask t);
	public void savefunctionurl(ProcessUrl pu);
	public PdmTask getPdmTask(long id);
	public LcaTask getLcaTask(long id);
	public List<PdmTask> getTaskByParentLevelModule(int istop,String parenttaskid,long projectid);
	public void updateTaskStatus(List<PdmTask> starttasksList);
	
	public List<PdmTask> getTaskByPreTaskId(String prevtaskid,long projectid);
	
	public List<TaskIOParam> getTaskParamsByTask(Long id,int iotype);
	public void saveIoPrams(List<TaskIOParam> params);
	public PdmTask getTaskByparentTaskId(String parenttaskid, long projectid);
	public void savePdmProjectValuePool(List<PdmProjectValuePool> items);
	public List<PdmProjectValuePool> getPdmProjectValuePools(Long id);
}
