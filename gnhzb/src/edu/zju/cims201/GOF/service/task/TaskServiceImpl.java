package edu.zju.cims201.GOF.service.task;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import prefuse.activity.Pacer;

import edu.zju.cims201.GOF.dao.task.LcataskDAO;
import edu.zju.cims201.GOF.dao.task.PdmtaskDAO;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessUrl;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.LcaTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProjectValuePool;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmTask;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;
import edu.zju.cims201.GOF.util.Constants;


@Service
@Transactional
public class TaskServiceImpl implements TaskService {
    
    @Resource(name = "lcataskDAO")
    private LcataskDAO lcataskDAO;
    @Resource(name = "pdmtaskDAO")
    private PdmtaskDAO pdmtaskDAO;
    @Resource(name="sessionFactory")
	private SessionFactory sessionFactory;

	public Page<LcaTask> getLcatasks(Employee user, Page<LcaTask> page) {
		
		/*String hql=" select task from Task task, SystemUser user where " +
				" user.id in elements(task.carrier)  and user.id ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"' order by task.creatTime desc";*/
		/*String hql=" select task from Task task where " +
				" task.carrier ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"'";
		return taskDAO.findPage(page, hql);*/
		String hql=" select task from LcaTask task where " +
			" task.status !='"+Constants.TASK_STATUS_TO_BE_ACTIVE+"' and task.status !='"+Constants.TASK_STATUS_FINISH+"'"+" and task.carrier.id ="+user.getId();
		return lcataskDAO.findPage(page, hql);
		
	}
	public Page<PdmTask> getPdmtasks(Employee user, Page<PdmTask> page) {
		
		/*String hql=" select task from Task task, SystemUser user where " +
				" user.id in elements(task.carrier)  and user.id ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"' order by task.creatTime desc";*/
		/*String hql=" select task from Task task where " +
				" task.carrier ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"'";
		return taskDAO.findPage(page, hql);*/
		String hql=" select task from PdmTask task where " +
			" task.status !='"+Constants.TASK_STATUS_TO_BE_ACTIVE+"' and task.status !='"+Constants.TASK_STATUS_FINISH+"'"+" and task.carrier.id ="+user.getId();
		return pdmtaskDAO.findPage(page, hql);
		
		
	}
	public void updateTaskStatus(List<PdmTask> starttasksList) {
		for(PdmTask task:starttasksList){
			sessionFactory.getCurrentSession().update(task);
		}
		
	}
	public List<PdmTask> getTaskByPreTaskId(String prevtaskid, long projectid) {
		return sessionFactory.getCurrentSession().createQuery("from PdmTask task where task.prevtaskid=? and task.pdmProject.id=?").setParameter(0, prevtaskid).setParameter(1, projectid).list();
	}
	
	public PdmTask getTaskByparentTaskId(String parenttaskid, long projectid) {
		return (PdmTask)sessionFactory.getCurrentSession().createQuery("from PdmTask task where task.taskid=? and task.pdmProject.id=?").setParameter(0, parenttaskid).setParameter(1, projectid).list().get(0);
	}
	
	public List<PdmTask> getTaskByParentLevelModule(int istop,
			String parenttaskid,long projectid) {
		
		return sessionFactory.getCurrentSession().createQuery("from PdmTask task where task.istop=? and task.parenttaskid=? and task.pdmProject.id=?").setParameter(0, istop).setParameter(1, parenttaskid).setParameter(2, projectid).list();
	}

	public void saveLcaTask(LcaTask t) {
		
		sessionFactory.getCurrentSession().save(t);
	}
	public void savePdmTask(PdmTask t){
		
		sessionFactory.getCurrentSession().save(t);
		
	}


	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}


	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}


	public void savefunctionurl(ProcessUrl pu) {
		
		sessionFactory.getCurrentSession().save(pu);
		
	}


	public PdmTask getPdmTask(long id) {
		
		return (PdmTask)sessionFactory.getCurrentSession().get(PdmTask.class, id);
	}
	public LcaTask getLcaTask(long id) {
		
		return (LcaTask)sessionFactory.getCurrentSession().get(LcaTask.class, id);
	}
	public LcataskDAO getLcataskDAO() {
		return lcataskDAO;
	}
	public void setLcataskDAO(LcataskDAO lcataskDAO) {
		this.lcataskDAO = lcataskDAO;
	}
	public PdmtaskDAO getPdmtaskDAO() {
		return pdmtaskDAO;
	}
	public void setPdmtaskDAO(PdmtaskDAO pdmtaskDAO) {
		this.pdmtaskDAO = pdmtaskDAO;
	}
	
	public List<TaskIOParam> getTaskParamsByTask(Long id,int iotype) {
		if(iotype == -1){
			return sessionFactory.getCurrentSession().createQuery("from TaskIOParam t where t.task.id=?").setParameter(0, id).list();

		}else{
			
			return sessionFactory.getCurrentSession().createQuery("from TaskIOParam t where t.task.id=? and t.iotype=?").setParameter(0, id).setParameter(1, iotype).list();

		}
	}
	public void saveIoPrams(List<TaskIOParam> params) {
		for(TaskIOParam param:params){
			sessionFactory.getCurrentSession().saveOrUpdate(param);
		}
		
		
	}
	public void savePdmProjectValuePool(List<PdmProjectValuePool> items) {
		for(PdmProjectValuePool item:items){
			sessionFactory.getCurrentSession().saveOrUpdate(item);
		}
	}
	
	public List<PdmProjectValuePool> getPdmProjectValuePools(Long id) {
		return sessionFactory.getCurrentSession().createQuery("from PdmProjectValuePool p where p.project.id=? and p.iotype=0").setParameter(0, id).list();
	}
	
	
	

	
}
