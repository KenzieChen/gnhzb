package edu.zju.cims201.GOF.web.platform;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatStructTree;
import edu.zju.cims201.GOF.rs.dto.PlatStructTreeDTO;
import edu.zju.cims201.GOF.service.platform.PlatStructTreeService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class PlatStructTreeAction extends ActionSupport implements
	ServletResponseAware {
	private HttpServletResponse response;
	private PlatStructTreeService platStructTreeService;
	PrintWriter out;
	private long platId;
	private long moduleId;
	private long pid;
	private long id;
	private int ismust;
	private int onlyone;
	private long orderId;
	/**
	 * 获取所有未审核的平台树的根节点
	 * @throws IOException
	 */
	public void getUnfinishedPlatStruct() throws IOException{
		List<PlatStructTree> list=platStructTreeService.getUnfinishedPlatStruct();
		String listStr = JSONUtil.write(list);
		out =response.getWriter();
		out.print(listStr);
	}
	/**
	 * luweijiang
	 */
	public void getUnfinishedPlatStructById() throws IOException{
		
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		List<PlatStructTree> list=platStructTreeService.getUnfinishedPlatStructById(id);
		if(CollectionUtils.isNotEmpty(list)){
			resultmap.put("isSuccess", "1");
			resultmap.put("message", "成功");
			resultmap.put("result", list);
		}else{
			resultmap.put("isSuccess", "0");
			resultmap.put("message", "查询出错，请联系管理员！");
		}
		
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
	}
	
	public void getPlatStructById() throws IOException{
		HashMap<String, Object> resultmap=new HashMap<String, Object>();
		List<PlatStructTree> list=platStructTreeService.getPlatStructById(id);
		if(CollectionUtils.isNotEmpty(list)){
			resultmap.put("isSuccess", "1");
			resultmap.put("message", "成功");
			resultmap.put("result", list);
		}else{
			resultmap.put("isSuccess", "0");
			resultmap.put("message", "查询出错，请联系管理员！");
		}
		
		String jsonString =JSONUtil.write(resultmap);
		out=response.getWriter();
		out.print(jsonString);
	}
	/**
	 * 获取平台树的根节点
	 * @throws IOException
	 */
	public void getPlatStructByPlatId() throws IOException{
		PlatStructTreeDTO psTree = platStructTreeService.getPlatStructByPlatId(platId);
		String psTreeStr = JSONUtil.write(psTree);
		out =response.getWriter();
		out.print(psTreeStr);
	}

	public void insertTreeNode() throws IOException{
		String msg=platStructTreeService.insertTreeNode(platId,moduleId);
		
		
		out = response.getWriter();
		out.print(msg);
	}
	
	public void getChildrenNode() throws IOException{
		List<PlatStructTreeDTO> platStructTreeDTOSList = platStructTreeService.getChildrenNode(pid);
		String nodesStr = JSONUtil.write(platStructTreeDTOSList);
		out = response.getWriter();
		out.print(nodesStr);
	}
	
	public void getModulesByPlatId() throws IOException{
		List<PlatStructTreeDTO> platStructTreeDTOSList = platStructTreeService.getModulesByPlatId(platId,orderId);
		String nodesStr = JSONUtil.write(platStructTreeDTOSList);
		out = response.getWriter();
		out.print(nodesStr);
	}
	
	public void deleteTreeNode() throws IOException{
		String msg = platStructTreeService.deleteTreeNode(id);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void updateTreeNode() throws IOException{
		String msg = platStructTreeService.updateTreeNode(id,ismust,onlyone);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response=arg0;
	}

	public PlatStructTreeService getPlatStructTreeService() {
		return platStructTreeService;
	}
	@Autowired
	public void setPlatStructTreeService(PlatStructTreeService platStructTreeService) {
		this.platStructTreeService = platStructTreeService;
	}

	public long getPlatId() {
		return platId;
	}

	public long getModuleId() {
		return moduleId;
	}

	public void setPlatId(long platId) {
		this.platId = platId;
	}

	public void setModuleId(long moduleId) {
		this.moduleId = moduleId;
	}

	public long getPid() {
		return pid;
	}

	public void setPid(long pid) {
		this.pid = pid;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public int getIsmust() {
		return ismust;
	}

	public int getOnlyone() {
		return onlyone;
	}

	public void setIsmust(int ismust) {
		this.ismust = ismust;
	}

	public void setOnlyone(int onlyone) {
		this.onlyone = onlyone;
	}
	public long getOrderId() {
		return orderId;
	}
	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	
}
