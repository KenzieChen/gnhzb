package edu.zju.cims201.GOF.service.department;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.Department;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.OperationRoles;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Privilege;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.PrivilegeOperationRole;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;

public interface DepartmentService {

	public void save(Department department);

	public List<Department> getAllDepartments();

	public Department getDepartmentByid(String id);
    public Employee getEmployeebyuserid(long id);
	public void delete(String id);

	public void saveEmployee(Employee employee);

	public List getEmployeeByDepartment(String id);

	public void savePrivilege(Privilege privi);

	public Privilege getPrivilegeByid(String string);

	public List getPrivilege();

	public void deletePrivilege(String id);

	public List getOperationRoles();

	public void saveOperationRoles(OperationRoles r);

	public OperationRoles getOperationRolesByid(String id);

	public List getUnOwnOperationRoles(String ownid);

	public void savePrivilegeOperationRoles(PrivilegeOperationRole pr);

	public List<OperationRoles> getOperationRolesbyprivilege(String id);

	public void deleteoperationRolesbyprivilege(long r, long p);

	public List<Employee> getEmployee();

	public Employee geEmployeeByid(String id);

	public void saveTaskTreeNode(TaskTreeNode taskTreeNode);

	public List<TaskTreeNode> getTaskTreebyRole(String role);

	public TaskTreeNode getTaskTreebyid(String id);

	public void deleteTaskTreeNodes(String nodeid);

	public List<TaskTreeNode> getTaskTreebyparentid(String parentid);

	/**
	 * @param id
	 * @return
	 */
	public List<TaskTreeIOParam> getTaskTreeParamsByTaskTreeNode(
			Long id);

	/**
	 * @param id
	 */
	public void deleteTaskTreeIOParamByTaskTree(Long id);



}
