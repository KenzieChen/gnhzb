package edu.zju.cims201.GOF.rs.dto;


public class VariantTaskDTO {

   private long id;
   
   private String taskName;
   private long partId;
   private String partName;
   private String partNumber;
   private String startDate;
   
   private String endDate;

   private String requirement;

   private String demo;


   private String status;

	public long getId() {
		return id;
	}
	
	
	public void setId(long id) {
		this.id = id;
	}
	

	
	public String getRequirement() {
		return requirement;
	}
	
	public void setRequirement(String requirement) {
		this.requirement = requirement;
	}
	
	public String getDemo() {
		return demo;
	}
	
	public void setDemo(String demo) {
		this.demo = demo;
	}
	
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}


	public String getTaskName() {
		return taskName;
	}


	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}


	public long getPartId() {
		return partId;
	}


	public void setPartId(long partId) {
		this.partId = partId;
	}


	public String getPartName() {
		return partName;
	}


	public void setPartName(String partName) {
		this.partName = partName;
	}


	public String getPartNumber() {
		return partNumber;
	}


	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
	}


	public String getStartDate() {
		return startDate;
	}


	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}


	public String getEndDate() {
		return endDate;
	}


	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}


}
