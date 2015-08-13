package edu.zju.cims201.GOF.service.department;

import java.util.List;
import javax.annotation.Resource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.department.privilegeDao;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Department;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.OperationRoles;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Privilege;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PrivilegeOperationRole;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;

@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {
	@Resource(name="sessionFactory")
	private SessionFactory sessionFactory;
	private privilegeDao privilegeDao;
	public privilegeDao getPrivilegeDao() {
		return privilegeDao;
	}
	@Autowired
	public void setPrivilegeDao(privilegeDao privilegeDao) {
		this.privilegeDao = privilegeDao;
	}
	public void save(Department department) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(department);
		
		
		
	}
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	public List<Department> getAllDepartments() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Department d").list();
	}
	public Department getDepartmentByid(String id) {
		// TODO Auto-generated method stub
		return (Department)sessionFactory.getCurrentSession().get(Department.class, Long.valueOf(id));
	}
	public void delete(String id) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().createQuery("delete from Department d where d.id=?").setParameter(0, Long.valueOf(id)).executeUpdate();
		
	}
	public void saveEmployee(Employee employee) {
		// TODO Auto-generated method stub
		
		sessionFactory.getCurrentSession().saveOrUpdate(employee);
	}
	public List getEmployeeByDepartment(String id) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Employee e where e.department.id=?").setParameter(0, Long.valueOf(id)).list();
	}
	public void savePrivilege(Privilege privi) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(privi);
	/*	privilegeDao.;
		privilegeDao.flush();*/
		
	}
	public Privilege getPrivilegeByid(String id) {
		/*List<OperationRoles> list=sessionFactory.getCurrentSession().createQuery("from OperationRoles r where r.id not in(select p.operationRoles.id from Privilege p where p.id=?) ").setParameter(0, Long.valueOf(id)).list();
		System.out.println(list.size());
		 System.out.println(list.get(0).getId());*/
		return (Privilege)sessionFactory.getCurrentSession().get(Privilege.class, Long.valueOf(id));
	}
	public List getPrivilege() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Privilege p").list();
	}
	public void deletePrivilege(String id) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().createQuery("delete from Privilege p where p.id=?").setParameter(0, Long.valueOf(id)).executeUpdate();
	}
	public List getOperationRoles() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from OperationRoles r").list();
	}
	public void saveOperationRoles(OperationRoles r) {
		sessionFactory.getCurrentSession().saveOrUpdate(r);
		
	}
	public OperationRoles getOperationRolesByid(String id) {
		// TODO Auto-generated method stub
		
		return (OperationRoles)sessionFactory.getCurrentSession().get(OperationRoles.class, Long.valueOf(id));
	}
	public List getUnOwnOperationRoles(String ownid) {
		// TODO Auto-generated method stub
		System.out.println(ownid);
		if(ownid==null){
			return sessionFactory.getCurrentSession().createQuery("from OperationRoles r").list();
		}else{
			return sessionFactory.getCurrentSession().createQuery("from OperationRoles r where r.id not in ("+ownid+")").list();
		}
	}
	public void savePrivilegeOperationRoles(PrivilegeOperationRole pr) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(pr);
	}
	public List<OperationRoles> getOperationRolesbyprivilege(String id) {
		// TODO Auto-generated method stub
		System.out.println(Long.valueOf(id));
		return sessionFactory.getCurrentSession().createQuery("select r from OperationRoles r,PrivilegeOperationRole pr,Privilege p where r.id =pr.operationRoles and pr.privilege=p.id and p.id=?").setParameter(0, Long.valueOf(id)).list(); 
	}
	public void deleteoperationRolesbyprivilege(long r, long p) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().createQuery("delete from PrivilegeOperationRole pr where pr.operationRoles.id= ? and pr.privilege.id=?").setParameter(0, r).setParameter(1, p).executeUpdate();
		
	}
	public List<Employee> getEmployee() {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from Employee e").list();
	}
	public Employee geEmployeeByid(String id) {
		// TODO Auto-generated method stub
		return (Employee)sessionFactory.getCurrentSession().get(Employee.class, Long.valueOf(id));
	}
	public void saveTaskTreeNode(TaskTreeNode taskTreeNode) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().saveOrUpdate(taskTreeNode);
		
	}
	public List<TaskTreeNode> getTaskTreebyRole(String role) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from TaskTreeNode tn where tn.parentNode=null and tn.role.id=?").setParameter(0, Long.valueOf(role)).list();
		
	}
	public TaskTreeNode getTaskTreebyid(String id) {
		// TODO Auto-generated method stub
		return (TaskTreeNode)sessionFactory.getCurrentSession().get(TaskTreeNode.class, Long.valueOf(id));
	}
	public void deleteTaskTreeNodes(String nodeid) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().createQuery("delete from TaskTreeNode tn where tn.id=?").setParameter(0, Long.valueOf(nodeid)).executeUpdate();
	}
	public List<TaskTreeNode> getTaskTreebyparentid(String parentid) {
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession().createQuery("from TaskTreeNode tn where tn.parentNode.id=? order by tn.orderid").setParameter(0, Long.valueOf(parentid)).list();
	}
	public Employee getEmployeebyuserid(long userid) {
		// TODO Auto-generated method stub
		return (Employee)sessionFactory.getCurrentSession().createQuery("from Employee e where e.user.id=?").setParameter(0, userid).list().get(0);
	}
	public List<TaskTreeIOParam> getTaskTreeParamsByTaskTreeNode(
			Long id) {
		return sessionFactory.getCurrentSession().createQuery("from TaskTreeIOParam p where p.node.id=?").setParameter(0, id).list();

	}
	
	public void deleteTaskTreeIOParamByTaskTree(Long id) {
		sessionFactory.getCurrentSession().createQuery(" delete from TaskTreeIOParam p where p.node.id="+id).executeUpdate();
		
	}

}

