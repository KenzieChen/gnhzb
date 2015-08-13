package edu.zju.cims201.GOF.hibernate.pojo.pdm;

import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;


public class ProcessTemplateIOParam {

	private Long id;
	private PdmProcessTemplate process;
	private String descri;
	private String name;
	private String value;
	private int isarray=1;
	private int iotype;
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
	public PdmProcessTemplate getProcess() {
		return process;
	}
	public void setProcess(PdmProcessTemplate process) {
		this.process = process;
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
