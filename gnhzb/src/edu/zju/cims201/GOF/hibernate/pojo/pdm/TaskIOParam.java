package edu.zju.cims201.GOF.hibernate.pojo.pdm;


public class TaskIOParam {

	private Long id;
	private PdmTask task;
	private String descri;
	private String name;
	private String value;
	private int iotype;
	private int isarray=1;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public PdmTask getTask() {
		return task;
	}
	public void setTask(PdmTask task) {
		this.task = task;
	}
	public int getIotype() {
		return iotype;
	}
	public void setIotype(int iotype) {
		this.iotype = iotype;
	}
	public int getIsarray() {
		return isarray;
	}
	public void setIsarray(int isarray) {
		this.isarray = isarray;
	}
	
}
