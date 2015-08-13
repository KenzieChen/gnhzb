package edu.zju.cims201.GOF.web.sml;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.rs.dto.VariantTaskDTO;
import edu.zju.cims201.GOF.service.sml.VariantService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class VariantAction extends ActionSupport implements ServletResponseAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private HttpServletResponse response;
	private PrintWriter out;
	private String taskname;
	private long partId;
	//private String startDate;  
	private String startDate;
	private String endDate;
	private String requirement;
	private String demo;
	private VariantService variantService;
	
	
	public void addVariantTask() throws IOException{
		String msg =variantService.addTask(taskname,partId,startDate,endDate,demo,requirement);
		out = response.getWriter();
		out.print(msg);
	}

	public void getAllVariantTask() throws IOException{
		List<VariantTaskDTO> data = variantService.getAllVariantTask();
		String dataStr = JSONUtil.write(data);
		out = response.getWriter();
		out.print(dataStr);
	}
	public long getPartId() {
		return partId;
	}

	public void setPartId(long partId) {
		this.partId = partId;
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

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}

	public VariantService getVariantService() {
		return variantService;
	}
	@Autowired
	public void setVariantService(VariantService variantService) {
		this.variantService = variantService;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getTaskname() {
		return taskname;
	}

	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	
	
}
