package edu.zju.cims201.GOF.hibernate.pojo.pdm;


public class TaskTreeIOParam {

	private Long id;
	private TaskTreeNode node;
	private String descri;
	private String name;
	private String value;
	private int iotype;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public TaskTreeNode getNode() {
		return node;
	}
	public void setNode(TaskTreeNode node) {
		this.node = node;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDescri() {
		return descri;
	}
	public void setDescri(String descri) {
		this.descri = descri;
	}
	public int getIotype() {
		return iotype;
	}
	public void setIotype(int iotype) {
		this.iotype = iotype;
	}
	
}
