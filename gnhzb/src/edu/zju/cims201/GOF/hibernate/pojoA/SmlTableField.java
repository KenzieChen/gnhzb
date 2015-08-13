package edu.zju.cims201.GOF.hibernate.pojoA;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class SmlTableField {
	private long id;
	private String tableName;
	private String tableHead;
	private String headShow;
	private SmlParameterPool smlParameterPool;
	//是否输出，0：否，1：是
	private int output;
	
	@Id
	@GeneratedValue
	public long getId() {
		return id;
	}
	public String getTableName() {
		return tableName;
	}
	public String getTableHead() {
		return tableHead;
	}
	public String getHeadShow() {
		return headShow;
	}
	@OneToOne
	@JoinColumn(name="smlParameterPool_id")
	public SmlParameterPool getSmlParameterPool() {
		return smlParameterPool;
	}
	public int getOutput() {
		return output;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public void setTableHead(String tableHead) {
		this.tableHead = tableHead;
	}
	public void setHeadShow(String headShow) {
		this.headShow = headShow;
	}
	public void setSmlParameterPool(SmlParameterPool smlParameterPool) {
		this.smlParameterPool = smlParameterPool;
	}
	public void setOutput(int output) {
		this.output = output;
	}

}
