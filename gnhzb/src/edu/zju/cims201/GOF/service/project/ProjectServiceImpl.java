package edu.zju.cims201.GOF.service.project;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.project.ProjectDao;
import edu.zju.cims201.GOF.hibernate.pojo.Ioflow;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PdmProject;

/**
 * 项目管理类接口实现
 * 
 * @author yetao
 * 
 */
@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	public void save(PdmProject p) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(p);
		
	}
	public PdmProject getProject(long p) {
		return (PdmProject)sessionFactory.getCurrentSession().get(PdmProject.class, p);
	}
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	
}
