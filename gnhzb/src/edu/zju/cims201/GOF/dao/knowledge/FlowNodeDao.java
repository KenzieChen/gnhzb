package edu.zju.cims201.GOF.dao.knowledge;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import edu.zju.cims201.GOF.hibernate.pojo.FlowNode;

@Component
public class FlowNodeDao extends HibernateDao<FlowNode, Long> {

}
