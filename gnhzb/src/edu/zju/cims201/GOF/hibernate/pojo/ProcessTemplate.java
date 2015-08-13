package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.Date;

public class ProcessTemplate {
	private long id;
	private String name;
	private String processid;
	private Date starttime;
	private Date endtime;
	private Node node;
	private String note;
	public ProcessTemplate() {
		
	}


	public ProcessTemplate(long id, String name, String processid,
		Date starttime,Date endtime,Node node) {
		this.id = id;
		this.name = name;
		this.processid = processid;
		this.starttime=starttime;
		this.endtime=endtime;
		this.node=node;
	}





	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public Date getStarttime() {
		return starttime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}




	public Date getEndtime() {
		return endtime;
	}


	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}


	public Node getNode() {
		return node;
	}


	public void setNode(Node node) {
		this.node = node;
	}


	public String getNote() {
		return note;
	}


	public void setNote(String note) {
		this.note = note;
	}


	public String getProcessid() {
		return processid;
	}


	public void setProcessid(String processid) {
		this.processid = processid;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


}
