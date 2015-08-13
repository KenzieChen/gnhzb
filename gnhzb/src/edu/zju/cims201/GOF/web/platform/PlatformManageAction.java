package edu.zju.cims201.GOF.web.platform;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.dao.platform.PlatStructTreeDao;
import edu.zju.cims201.GOF.rs.dto.PlatformManageDTO;
import edu.zju.cims201.GOF.service.platform.PlatformManageService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class PlatformManageAction extends ActionSupport implements
		ServletResponseAware {
	
	private HttpServletResponse response;
	private PlatformManageService platformManageService;
	
	PrintWriter out;
	
	private long id;
	private long statusId;
	private String platName;
	private String info;
	private String checkinfo;
	
	

	public void createPlatform() throws IOException{
		String msg=platformManageService.createPlatform(platName,info);
		out =response.getWriter();
		out.print(msg);
	}
	
	public void getAllPlatform() throws IOException{
		List<PlatformManageDTO> platList=platformManageService.getAllPlatform();
		String str =JSONUtil.write(platList);
		out=response.getWriter();
		out.print(str);
	}
	
	public void getFinishedPlatform() throws IOException{
		List<PlatformManageDTO> platList = platformManageService.getFinishedPlatform();
		String platListStr =JSONUtil.write(platList);
		out=response.getWriter();
		out.print(platListStr);
	}
	/**
	 * luweijiang
	 * @throws IOException
	 */
	public void getFinishedPlatformById() throws IOException{
		List<PlatformManageDTO> platList = platformManageService.getFinishedPlatformById(id);
		String platListStr =JSONUtil.write(platList);
		out=response.getWriter();
		out.print(platListStr);
	}
	public void updatePlatform() throws IOException{
		String msg=platformManageService.updatePlatform(id,platName,info);
		out=response.getWriter();
		out.print(msg);
	} 
	
	
	public void deletePlatform() throws IOException{
		String msg =platformManageService.deletePlatform(id);
		out=response.getWriter();
		out.print(msg);
	}
	
	
	public void getPlatform2Check() throws Exception{
		List<PlatformManageDTO> platList=platformManageService.getPlatform2Check();
		String str =JSONUtil.write(platList);
		out=response.getWriter();
		out.print(str);
	}
	/*
	 * luweijiang
	 */
	public void getPlatform2CheckById() throws Exception{
		List<PlatformManageDTO> platList=platformManageService.getPlatform2CheckById(id);
		String str =JSONUtil.write(platList);
		out=response.getWriter();
		out.print(str);
	}
	public void changePlat2CheckStatus() throws IOException{
		String msg = platformManageService.changePlat2CheckStatus(id);
		out=response.getWriter();
		out.print(msg);
	}
	
	public void checkDone() throws IOException{
		String msg = platformManageService.checkDone(id,statusId,checkinfo);
		out=response.getWriter();
		out.print(msg);
	}
	
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response =arg0;
	}

	public PlatformManageService getPlatformManageService() {
		return platformManageService;
	}
	@Autowired
	public void setPlatformManageService(PlatformManageService platformManageService) {
		this.platformManageService = platformManageService;
	}

	public String getPlatName() {
		return platName;
	}

	public void setPlatName(String platName) {
		this.platName = platName;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getStatusId() {
		return statusId;
	}

	public void setStatusId(long statusId) {
		this.statusId = statusId;
	}

	public String getCheckinfo() {
		return checkinfo;
	}

	public void setCheckinfo(String checkinfo) {
		this.checkinfo = checkinfo;
	}
	
	
	

}
