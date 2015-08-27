package edu.zju.cims201.GOF.web.bom;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.rs.dto.BomDTO;
import edu.zju.cims201.GOF.rs.dto.BomDetailDTO;
import edu.zju.cims201.GOF.service.bom.BomService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class BomAction extends ActionSupport implements ServletResponseAware{
	
	private BomService bomService;
	private HttpServletResponse response;
	private long orderId;
	private long platId;
	private String bomName;
	private long bomStatusId;
	private long bomId;
	private long parentId;
	//未配置
	//private long checkerId;
	private String checkinfo;
	private String info;
	PrintWriter out;

	/**
	 * 提交BOM的审核信息
	 */
	public void checkDone(){
		String msg = bomService.saveBomCheckResultById(bomId,bomStatusId,checkinfo);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		out.print(msg);
		
	}
	/**
	 * 保存BOM
	 * @throws IOException 
	 */
	public void saveBom() throws IOException{
		HashMap<String, Object> resultmap = bomService.insertNewBom(orderId, platId, bomName, info);
		out = response.getWriter();
		String jsonString =JSONUtil.write(resultmap);
		out.print(jsonString);
	}
	
	public  void getBom2Check(){
		List<BomDTO> bomList = bomService.getBom2Check();
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String bomListStr = JSONUtil.write(bomList);
		
		out.print(bomListStr);
	}
	//luweijiang
	public  void getBom2CheckById(){
		List<BomDTO> bomList = bomService.getBom2CheckById(bomId);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String bomListStr = JSONUtil.write(bomList);
		
		out.print(bomListStr);
	}
	public void getAllBom(){
		List<BomDTO> bomList = bomService.getAllBom();
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String bomListStr = JSONUtil.write(bomList);
		
		out.print(bomListStr);
	}
	
/*	public void getBomStructTree(){
		List<BomDetailDTO> bomTree = bomService.getBomStructTreeByBomId(bomId);
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String bomListStr = JSONUtil.write(bomTree);
		
		out.print(bomListStr);
	}*/
	
	public void getBomStructRoot(){
		BomDetailDTO root = bomService.getBomStructRootByBomId(bomId);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String rootStr = JSONUtil.write(root);

		out.print(rootStr);
		
	}
	
	public void getBomStructNode(){
		
		List<BomDetailDTO> nodeList = bomService.getBomStructNodeByParentId(parentId,bomId);
		
		try {
			out = response.getWriter();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String nodeListStr = JSONUtil.write(nodeList);

		out.print(nodeListStr);
	}
	
	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}
	
	public BomService getBomService() {
		return bomService;
	}
	@Autowired
	public void setBomService(BomService bomService) {
		this.bomService = bomService;
	}
	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public long getPlatId() {
		return platId;
	}

	public void setPlatId(long platId) {
		this.platId = platId;
	}

	public String getBomName() {
		return bomName;
	}

	public void setBomName(String bomName) {
		this.bomName = bomName;
	}

	public String getCheckinfo() {
		return checkinfo;
	}

	public void setCheckinfo(String checkinfo) {
		this.checkinfo = checkinfo;
	}

	public long getBomId() {
		return bomId;
	}

	public void setBomId(long bomId) {
		this.bomId = bomId;
	}

	public long getParentId() {
		return parentId;
	}

	public void setParentId(long parentId) {
		this.parentId = parentId;
	}
	public long getBomStatusId() {
		return bomStatusId;
	}
	public void setBomStatusId(long bomStatusId) {
		this.bomStatusId = bomStatusId;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	
}
