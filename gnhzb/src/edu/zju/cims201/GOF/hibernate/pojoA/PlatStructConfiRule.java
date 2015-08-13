package edu.zju.cims201.GOF.hibernate.pojoA;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


@Entity
public class PlatStructConfiRule {

	private long id;
	private PlatformManage plat;
	private PlatStructTree platStruct;
	private ClassificationTree moduleClass;
	private String classCode;
	private String classText;
	
	private Part part;
	private Part partSelected;
	 /**
	  * 规则的状态
	  * 1：必选
	  * 2：可选
	  * 3：排除
	  */
	private int status;
	private String info;
	
	@Id
	@GeneratedValue
	public long getId() {
		return id;
	}
	@ManyToOne
	@JoinColumn(name="plat_id")
	public PlatformManage getPlat() {
		return plat;
	}
	
	@ManyToOne
	@JoinColumn(name="plat_struct_id")
	public PlatStructTree getPlatStruct() {
		return platStruct;
	}
	@OneToOne
	@JoinColumn(name="module_class_id")
	public ClassificationTree getModuleClass() {
		return moduleClass;
	}

	public String getClassCode() {
		return classCode;
	}
	public String getClassText() {
		return classText;
	}
	@OneToOne
	@JoinColumn(name="part_id")
	public Part getPart() {
		return part;
	}
	@OneToOne
	@JoinColumn(name="part_selected_id")
	public Part getPartSelected() {
		return partSelected;
	}
	public int getStatus() {
		return status;
	}
	public String getInfo() {
		return info;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setPlat(PlatformManage plat) {
		this.plat = plat;
	}
	public void setPlatStruct(PlatStructTree platStruct) {
		this.platStruct = platStruct;
	}
	public void setModuleClass(ClassificationTree moduleClass) {
		this.moduleClass = moduleClass;
	}
	public void setClassCode(String classCode) {
		this.classCode = classCode;
	}
	public void setClassText(String classText) {
		this.classText = classText;
	}
	public void setPart(Part part) {
		this.part = part;
	}
	public void setPartSelected(Part partSelected) {
		this.partSelected = partSelected;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	
	
}
