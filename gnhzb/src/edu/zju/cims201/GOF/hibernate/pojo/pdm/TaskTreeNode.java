package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import java.util.HashSet;
import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.TreeNode;



public class TaskTreeNode {
	
	
	
	private Long id;
	private String code;
	private String nodeName;
	private String nodeDescription;
	private String url;
	private String orderid;
	private Set<TaskTreeNode> subNodes=new HashSet<TaskTreeNode>();
	private Set<TaskTreeIOParam> params=new HashSet<TaskTreeIOParam>();	
	private TaskTreeNode parentNode;
	private OperationRoles role;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getNodeName() {
		return nodeName;
	}
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}
	public String getNodeDescription() {
		return nodeDescription;
	}
	public void setNodeDescription(String nodeDescription) {
		this.nodeDescription = nodeDescription;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Set<TaskTreeNode> getSubNodes() {
		return subNodes;
	}
	public void setSubNodes(Set<TaskTreeNode> subNodes) {
		this.subNodes = subNodes;
	}
	public TaskTreeNode getParentNode() {
		return parentNode;
	}
	public void setParentNode(TaskTreeNode parentNode) {
		this.parentNode = parentNode;
	}
	public OperationRoles getRole() {
		return role;
	}
	public void setRole(OperationRoles role) {
		this.role = role;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public Set<TaskTreeIOParam> getParams() {
		return params;
	}
	public void setParams(Set<TaskTreeIOParam> params) {
		this.params = params;
	}
	
	

}
