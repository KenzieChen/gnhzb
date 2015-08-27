package edu.zju.cims201.GOF.dao.draft;


import org.springframework.stereotype.Repository;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;

@Repository
public class TreeDraftDao extends HibernateDao<TreeDraft, Long> {
/*	@Resource(name="sessionFactoryBiaozhun")
	public void setSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}*/
}
