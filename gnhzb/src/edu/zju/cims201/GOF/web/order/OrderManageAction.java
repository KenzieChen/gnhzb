package edu.zju.cims201.GOF.web.order;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;

import edu.zju.cims201.GOF.hibernate.pojoA.Status;
import edu.zju.cims201.GOF.rs.dto.OrderManageDTO;
import edu.zju.cims201.GOF.service.order.OrderManageService;
import edu.zju.cims201.GOF.service.status.StatusService;
import edu.zju.cims201.GOF.util.JSONUtil;

public class OrderManageAction extends ActionSupport implements ServletResponseAware {
	private HttpServletResponse response;
	
	private OrderManageService orderManageService;
	private StatusService statusService;
	PrintWriter out;
	
	private long orderId;//订单的id
	private long id;
	private long statusId;
	private String orderNumber;
	private String info;
	private Date beginDate;
	
	private String checkinfo;
	
	public void addOrder() throws IOException{

		String msg =orderManageService.addOrder(orderNumber,info);

		out = response.getWriter();
		out.print(msg);
	}
	
	public void updateOrder() throws IOException{
		String msg =orderManageService.updateOrder(id,info,statusId);
		out = response.getWriter();
		out.print(msg);
	}
	
	
	
	public void deleteOrder() throws IOException{
		String msg =orderManageService.deleteOrder(id);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void getAllOrder() throws IOException{
		List<OrderManageDTO> list = orderManageService.getAllOrder();
		String listStr = JSONUtil.write(list);
		out = response.getWriter();
		out.print(listStr);
	}
	//luweijiang
	public void getAllOrederById()  throws IOException{
		List<OrderManageDTO> list = orderManageService.getAllOrderById(id);
		String listStr = JSONUtil.write(list);
		out = response.getWriter();
		out.print(listStr);
	}
	public void getAllStatus() throws IOException{
		List<Status> list= statusService.getAllStaus();
		String listStr = JSONUtil.write(list);
		out = response.getWriter();
		out.print(listStr);
	}
	
	public void change2CheckStatus() throws IOException{
		String msg =orderManageService.change2CheckStatus(id);
		out = response.getWriter();
		out.print(msg);
	}
	
	public void checkDone() throws IOException{
		String msg =orderManageService.checkDone(id,statusId,checkinfo);
		out = response.getWriter();
		out.print(msg);
	}
	/**
	 * 产品配置的时候加载需要配置的订单
	 * @throws IOException
	 */
	public void getOrder4Confi() throws IOException{
		List<OrderManageDTO> list=orderManageService.getOrder4Confi();
		String listStr = JSONUtil.write(list);
		System.out.println(listStr);
		out = response.getWriter();
		out.print(listStr);
	}
	/**
	 * luweijiang
	 * @return
	 */
	
	public void getOrder4ConfiById() throws IOException{
		List<OrderManageDTO> list=orderManageService.getOrder4ConfiById(orderId);
		String listStr = JSONUtil.write(list);
		System.out.println(listStr);
		out = response.getWriter();
		out.print(listStr);
	}
	public long getId() {
		return id;
	}

	public long getStatusId() {
		return statusId;
	}



	public String getInfo() {
		return info;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setStatusId(long statusId) {
		this.statusId = statusId;
	}


	public void setInfo(String info) {
		this.info = info;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;
	}

	public OrderManageService getOrderManageService() {
		return orderManageService;
	}

	@Autowired
	public void setOrderManageService(OrderManageService orderManageService) {
		this.orderManageService = orderManageService;
	}

	public StatusService getStatusService() {
		return statusService;
	}
	@Autowired
	public void setStatusService(StatusService statusService) {
		this.statusService = statusService;
	}

	public String getCheckinfo() {
		return checkinfo;
	}

	public void setCheckinfo(String checkinfo) {
		this.checkinfo = checkinfo;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}


}
