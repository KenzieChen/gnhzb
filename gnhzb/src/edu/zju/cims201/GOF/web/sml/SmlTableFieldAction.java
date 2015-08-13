package edu.zju.cims201.GOF.web.sml;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.hibernate.pojoA.SmlTableField;
import edu.zju.cims201.GOF.service.sml.SmlTableFieldService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class SmlTableFieldAction extends ActionSupport implements ServletResponseAware{
	
	private HttpServletResponse response;
	private SmlTableFieldService smlTableFieldService;
	PrintWriter out;
	//该id是smlTableField类的id，不是partId
	private long id;
	private long partId;
	private long treeId;
	private String tableName;
	private long smlParameterId;
	
	private String tableHead;
	private String headShow;
	private String smlValue;
	private String dataType;
	
	private int output;
	
	public void changeOutput() throws IOException{
		smlTableFieldService.changeOutput(id,output);
		out = response.getWriter();
		out.print("更新成功!");
	}
	
	public void getSmlTableField() throws IOException{
		
		List<SmlTableField> smlTableFields=smlTableFieldService.getSmlTableFieldByTableName(tableName);
		out = response.getWriter();
		String smlTableFieldsStr =JSONUtil.write(smlTableFields);
		out.print(smlTableFieldsStr);	
	}
	
	
	public void checkSmlTableByTableName() throws IOException{
		String msg ="no";
		out = response.getWriter();
		boolean exists=smlTableFieldService.checkSmlTableByTableName(tableName);
		if(exists){
			msg ="yes";
		}
		out.print(msg);
		
	}
	
	public void createSmlTableByTableName() throws IOException{
		String msg =smlTableFieldService.createSmlTableByTableName(tableName,treeId);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void dropSmlTableByTableName() throws IOException{
		String msg =smlTableFieldService.dropSmlTableByTableName(tableName);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void addSmlTableField() throws IOException{
		String msg =smlTableFieldService.addSmlTableField(tableName,smlParameterId,tableHead,headShow);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void deleteSmlTableField() throws IOException{
		String msg =smlTableFieldService.deleteSmlTableField(id);
		out = response.getWriter();
		out.print(msg);
	}
	
	
	public void getSmlTableByTableName() throws IOException{
		String msg=smlTableFieldService.getSmlTableByTableName(tableName);
		out = response.getWriter();
		out.print(msg);
	}
	
	//根据事物特性表表名和表字段从sml_table_field表中获取unit和datatype的信息
	public void getMsgForEditPartSMLForm() throws IOException{
		String msg =smlTableFieldService.getMsgForEditPartSMLForm(tableName,tableHead);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void modifyPartSML() throws IOException{
		String msg=smlTableFieldService.modifyPartSML(tableName,partId,tableHead,smlValue,dataType);
		out = response.getWriter();
		out.print(msg);
	}
	
	
	
	public String getDataType() {
		return dataType;
	}


	public void setDataType(String dataType) {
		this.dataType = dataType;
	}


	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response =arg0;
	}
	public SmlTableFieldService getSmlTableFieldService() {
		return smlTableFieldService;
	}
	@Autowired
	public void setSmlTableFieldService(SmlTableFieldService smlTableFieldService) {
		this.smlTableFieldService = smlTableFieldService;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}


	public long getTreeId() {
		return treeId;
	}


	public void setTreeId(long treeId) {
		this.treeId = treeId;
	}
	
	public long getSmlParameterId() {
		return smlParameterId;
	}


	public String getTableHead() {
		return tableHead;
	}


	public String getHeadShow() {
		return headShow;
	}


	public void setSmlParameterId(long smlParameterId) {
		this.smlParameterId = smlParameterId;
	}


	public void setTableHead(String tableHead) {
		this.tableHead = tableHead;
	}


	public void setHeadShow(String headShow) {
		this.headShow = headShow;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}
	


	public int getOutput() {
		return output;
	}


	public void setOutput(int output) {
		this.output = output;
	}


	public String getSmlValue() {
		return smlValue;
	}


	public void setSmlValue(String smlValue) {
		this.smlValue = smlValue;
	}


	public long getPartId() {
		return partId;
	}


	public void setPartId(long partId) {
		this.partId = partId;
	}



}
