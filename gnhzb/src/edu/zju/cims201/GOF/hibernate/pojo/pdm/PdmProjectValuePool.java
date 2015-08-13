package edu.zju.cims201.GOF.hibernate.pojo.pdm;


public class PdmProjectValuePool {

	private Long id;
	private PdmProject project;
	private String value;
	private String name;
	public int iotype;
	public int isarray;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PdmProject getProject() {
		return project;
	}
	public void setProject(PdmProject project) {
		this.project = project;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
