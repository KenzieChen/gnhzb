package edu.zju.cims201.GOF.service.module;

import java.util.List;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.dao.module.ProcessDAO;
import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.Function;
import edu.zju.cims201.GOF.hibernate.pojo.Ioflow;
import edu.zju.cims201.GOF.hibernate.pojo.LcaModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.Node;
import edu.zju.cims201.GOF.hibernate.pojo.Nodecategory;
import edu.zju.cims201.GOF.hibernate.pojo.Nodetype;
import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;



@Service
@Transactional
public class ModuleServiceImpl implements ModuleService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	
	  @Resource(name = "processDAO")
	    private ProcessDAO processDAO;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}


	public BaseModule addModule(BaseModule m) {
	
		int version;
		if(m.getVersion()==0){
		List<BaseModule> modules=sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id = ? order by m.version")
				.setParameter(0, m.getComponent().getId())
				.list();
		if(modules.size()>0){
		version =modules.get(modules.size()-1).getVersion()+1;
		m.setVersion(version);
		}else{
		version =1;
		m.setVersion(version);
		}
		}
		version=m.getVersion();
		sessionFactory.getCurrentSession().saveOrUpdate(m);
		return m;
		
	}

	public BaseModule getModule(String cpid, String pdid,String version) {
	
		if(cpid==null){
			return (BaseModule)sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id = ? and m.version=?")
					.setParameter(0, Integer.valueOf(pdid)).setParameter(1, Integer.valueOf(version)).list().get(0);
		}else if(pdid==null){
			return (BaseModule)sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id = ? and m.version=?")
					.setParameter(0, Integer.valueOf(cpid)).setParameter(1, Integer.valueOf(version)).list().get(0);
			
		}else{
			List<BaseModule> modules=sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id = ? and m.parent.component.id=? and m.parent.version=?")
			.setParameter(0, Integer.valueOf(cpid)).setParameter(1, Integer.valueOf(pdid)).setParameter(2, Integer.valueOf(version)).list();
			if(modules.size()>0){
				return modules.get(0);
			}else{
				return null;
			}
			}
	}
	public Page<ProcessTemplate> getMyProcesses(SystemUser user,Page<ProcessTemplate> page){
		String hql=null;
				/*" select task from Task task, SystemUser user where " +
		" user.id in elements(task.taskCarriers)  and user.id ="+user.getId()+" and task.status !='"+Constants.TASK_STATUS_CONFIG+"' and task.status !='"+Constants.TASK_STATUS_END+"' order by task.creatTime desc";
		Query query= sessionFactory.getCurrentSession().createQuery(hql);*/
		
		return processDAO.findPage(page, hql);
	}
	public void addProcess(ProcessTemplate process) {
	
		sessionFactory.getCurrentSession().save(process);
		
	}

	public List<Ioflow> getioflow(boolean a,String processid,String componentid,String version,String moduleid) {
	
		List<Ioflow> ioflows=null;
		if(a&&(componentid!=null)){
			
			ioflows=sessionFactory.getCurrentSession().createQuery("select m.flow from ProcessTemplateFlow m where m.process.id in(select p.id from Process p where p.processid=? and p.module.version=? and p.module.component.id=?)" ).setParameter(0, processid).setParameter(1, Integer.valueOf(version)).setParameter(2, Integer.valueOf(componentid)).list();
		
			/* if(process.size()>0){
				 for(int i=0;i<process.size();i++)
			 
			{
				Set<ProcessTemplateFlow> ProcessTemplateFlows=process.get(i).getProcessTemplateFlows();
				Iterator<ProcessTemplateFlow> b=ProcessTemplateFlows.iterator();
				while(b.hasNext()){
					ProcessTemplateFlow m=(ProcessTemplateFlow)b.next();
					ioflows.add(m.getFlow());
				}
			}
		    }*/
		}
		if(a&&(componentid==null)){
			ioflows=sessionFactory.getCurrentSession().createQuery("select m.flow from ProcessTemplateFlow m where m.process.id in(select p.id from Process p where p.processid=? and p.module.id=?)" ).setParameter(0, processid).setParameter(1, Integer.valueOf(moduleid)).list();
		}
		if(!a){
			ioflows=sessionFactory.getCurrentSession().createQuery("from Ioflow i " ).list();
		}
		return ioflows;
	}

	public Ioflow getioflow(String id) {
	
		return (Ioflow)sessionFactory.getCurrentSession().get(Ioflow.class, Integer.valueOf(id));
	}
	public void deleteprocess(String id) {
	
		ProcessTemplate p=(ProcessTemplate)sessionFactory.getCurrentSession().get(ProcessTemplate.class, Integer.valueOf(id));
		sessionFactory.getCurrentSession().delete(p);
		sessionFactory.getCurrentSession().flush();
	}

	public List<BaseModule> getModulelist(String parentid,String componentid,String moduletype) {
	
		if((parentid==null)&&(componentid==null)&&moduletype.equals("PDM")){
		    return sessionFactory.getCurrentSession().createQuery("from PdmModule m where m.levelid="+"'level_top'").list();
		}else if((parentid==null)&&(componentid==null)&&moduletype.equals("LCA")){
		    return sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.parent.id=?").setParameter(0,Integer.valueOf(parentid)).list();
		}else if(!(parentid==null)&&(componentid==null)){
		    return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent.id=?").setParameter(0,Integer.valueOf(parentid)).list();
		}else if((parentid==null)&&!(componentid==null)){
			return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent= null and m.component.id=?").setParameter(0,Integer.valueOf(componentid)).list();
			}else{
			return sessionFactory.getCurrentSession().createQuery("from Module m where m.parent= null ").list();
			}
	}
	public List<Component> getLcaModuleComponentlist() {
	
		    return sessionFactory.getCurrentSession().createQuery("select distinct m.component from LcaModule m where m.parent=null").list();
		}

	public ProcessTemplate getprocess(String processid, Integer moduleid) {
	
		 return (ProcessTemplate)sessionFactory.getCurrentSession().createQuery("from ProcessTemplate p where p.processid=?and p.module.id=?").setParameter(0,processid).setParameter(1,moduleid).list().get(0);
	}
	public BaseModule getModule(String id) {
	
		Object object=sessionFactory.getCurrentSession().createQuery("from BaseModule m where m.id = ?").setParameter(0, Integer.valueOf(id)).list().get(0);
		if (object instanceof PdmModule) {
			PdmModule a = (PdmModule) object;
			System.out.println("PDM");
			return a;
		}else if (object instanceof LccModule) {
			LccModule a = (LccModule) object;
			System.out.println("LCC");
			return a;
			
	    }else if (object instanceof LcaModule) {
	    	LcaModule a = (LcaModule) object;
			System.out.println("LCA");
			return a;
	    }else{
	    	return (BaseModule)object;
	    	
	    	}
	    }
	public PdmProcessTemplate getprocesstemplate(String id) {
	
		PdmProcessTemplate object=(PdmProcessTemplate)sessionFactory.getCurrentSession().createQuery("from PdmProcessTemplate p where p.id = ?").setParameter(0, Integer.valueOf(id)).list().get(0);
		return object;
	    }
	public void savenode(Node node) {
		sessionFactory.getCurrentSession().save(node);
		
	}

	public void savefunction(Function function) {
	
		sessionFactory.getCurrentSession().save(function);
		
	}

	public List<Node> getnode() {
	
		return sessionFactory.getCurrentSession().createQuery("from Node node").list();
	}

	public List<Function> getfunctionlist() {
	
		return sessionFactory.getCurrentSession().createQuery("from Function f").list();
	}

	public void addnode(Node node) {
		sessionFactory.getCurrentSession().save(node);
		
	}

	public List<Node> getnodelist() {
	
		return sessionFactory.getCurrentSession().createQuery("from Node n  order by n.nodetype.id").list();
	}

	public List<Nodetype> getnodetypelist() {
	
		return sessionFactory.getCurrentSession().createQuery("from Nodetype nt ").list();
	}

	public List<Nodecategory> getnodecategorylist() {
	
		return sessionFactory.getCurrentSession().createQuery("from Nodecategory nc ").list();
	}

	public List<Node> getNodeListByType(String nodetype,String nodecategory) {
		return sessionFactory.getCurrentSession().createQuery("from Node n where n.nodecategory.name= '"+nodecategory+"' and n.nodetype.name in(select nt.name from Nodetype nt where nt.name='COMMON' or nt.name= '"+nodetype+"')").list();
	}


	public void addModuleandprocess(BaseModule m) {
	
		sessionFactory.getCurrentSession().save(m);
		
	}

	public void saveprocess(ProcessTemplate m) {
	
		sessionFactory.getCurrentSession().save(m);
		
	}

	public ProcessTemplate getProcessTemplatebyModuleandProcess(String moduleid, String processid) {
		ProcessTemplate p=(ProcessTemplate)sessionFactory.getCurrentSession().createQuery("from ProcessTemplate p where p.module.id=? and p.processid=?" ).setParameter(0, Integer.valueOf(moduleid)).setParameter(1,processid).list().get(0);
		return p;
		
	}

	public List getmodulelistsbycomponnet(String id) {
	
		return sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.component.id=? and m.parent=null").setParameter(0, Integer.valueOf(id)).list();
	}

	public LcaModule getModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid) {
		List list=sessionFactory.getCurrentSession().createQuery("from LcaModule m where m.processid=? and m.parentlevelid=? and m.parent.id=?").setParameter(0, processid).setParameter(1, parentlevelid).setParameter(2, Integer.valueOf(parentmoduleid)).list();
		if(list.size()>0){
			return (LcaModule)list.get(0);
		}else{
			return null;
		}
		
		
	}
	public PdmModule getPdmModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid) {
		if(processid==null){
			List list=sessionFactory.getCurrentSession().createQuery("from PdmModule m where m.parentlevelid=? and m.parent.id=?").setParameter(0, parentlevelid).setParameter(1, Integer.valueOf(parentmoduleid)).list();
			if(list.size()>0){
				return (PdmModule)list.get(0);
			}else{
				return null;
			}
		}else{
		List list=sessionFactory.getCurrentSession().createQuery("from PdmModule m where m.processid=? and m.parentlevelid=? and m.parent.id=?").setParameter(0, processid).setParameter(1, parentlevelid).setParameter(2, Integer.valueOf(parentmoduleid)).list();
		if(list.size()>0){
			return (PdmModule)list.get(0);
		}else{
			return null;
		}
		}
	}
	public int addPdmModuleandprocess(BaseModule m) {
	
		sessionFactory.getCurrentSession().save(m);
		return m.getId();
		
	}
	public ProcessTemplate getprocess(String processid, int moduleid) {
	
		 return (ProcessTemplate)sessionFactory.getCurrentSession().createQuery("from ProcessTemplate p where p.processid=?and p.module.id=?").setParameter(0,processid).setParameter(1,moduleid).list().get(0);
	}

	public List getprocesslists(int moduleid) {
	
		return sessionFactory.getCurrentSession().createQuery("from ProcessTemplate p where p.module.id=? order by p.orderid").setParameter(0,moduleid).list();
	}

	public List getProcessTemplateParamsByProcessTemplate(long id) {
	
		return sessionFactory.getCurrentSession().createQuery("from ProcessTemplateIOParam p where p.process.id=?").setParameter(0, id).list();
	}


	
}
