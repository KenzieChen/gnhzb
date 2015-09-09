package edu.zju.cims201.GOF.hibernate.pojoA;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Part {
	
	private long id;
	private String partNumber;
	private String partName;
	private Date createTime;
	private String partBigVersion;
	private String partSmallVersion;
	/**
	 * 0 代表未分类
	 * 1 代表已经分类
	 */
	private int isarranged;
	private String description;
	private String state;
	private String imgUrl;
	private String imgDesc;
	private ClassificationTree classificationTree;
	
	private String uuid;
	private String moduleUuid;
	private int basicFlag;
	private int imgFlag;
	private int modelFlag;
	private int selfFlag;
	
	@Id
	@GeneratedValue
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getPartNumber() {
		return partNumber;
	}
	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}
	public String getPartName() {
		return partName;
	}
	public void setPartName(String partName) {
		this.partName = partName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getPartBigVersion() {
		return partBigVersion;
	}
	public void setPartBigVersion(String partBigVersion) {
		this.partBigVersion = partBigVersion;
	}
	public String getPartSmallVersion() {
		return partSmallVersion;
	}
	public void setPartSmallVersion(String partSmallVersion) {
		this.partSmallVersion = partSmallVersion;
	}
	public int getIsarranged() {
		return isarranged;
	}
	public void setIsarranged(int isarranged) {
		this.isarranged = isarranged;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	@ManyToOne
	@JoinColumn(name="class_id")
	public ClassificationTree getClassificationTree(){
		return classificationTree;
	}
	public void setClassificationTree(ClassificationTree classificationTree) {
		this.classificationTree = classificationTree;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getImgDesc() {
		return imgDesc;
	}
	public void setImgDesc(String imgDesc) {
		this.imgDesc = imgDesc;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getModuleUuid() {
		return moduleUuid;
	}
	public void setModuleUuid(String moduleUuid) {
		this.moduleUuid = moduleUuid;
	}
	public int getBasicFlag() {
		return basicFlag;
	}
	public void setBasicFlag(int basicFlag) {
		this.basicFlag = basicFlag;
	}
	public int getImgFlag() {
		return imgFlag;
	}
	public void setImgFlag(int imgFlag) {
		this.imgFlag = imgFlag;
	}
	public int getModelFlag() {
		return modelFlag;
	}
	public void setModelFlag(int modelFlag) {
		this.modelFlag = modelFlag;
	}
	public int getSelfFlag() {
		return selfFlag;
	}
	public void setSelfFlag(int selfFlag) {
		this.selfFlag = selfFlag;
	}
	
	
}
