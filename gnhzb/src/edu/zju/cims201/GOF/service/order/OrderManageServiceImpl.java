package edu.zju.cims201.GOF.service.order;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.order.OrderManageDao;
import edu.zju.cims201.GOF.hibernate.pojoA.OrderManage;
import edu.zju.cims201.GOF.hibernate.pojoA.Status;
import edu.zju.cims201.GOF.rs.dto.OrderManageDTO;

@Service
@Transactional
public class OrderManageServiceImpl implements OrderManageService {
	private OrderManageDao orderManageDao;
	
	
	
	public String addOrder(String orderNumber, String info){
		
		OrderManage omExist =orderManageDao.findUniqueBy("orderNumber", orderNumber);
		if(omExist !=null){
			return "需求号已存在，请重新添加";
		}

		OrderManage om = new OrderManage();
		om.setBeginDate(new Date());
		om.setInfo(info);
		om.setOrderNumber(orderNumber);

		Status stts = new Status();
		stts.setId(1);
		om.setStatus(stts);
		orderManageDao.save(om);
		return "添加成功！";
	}
	
	public String updateOrder(long id, String info, long statusId){
		OrderManage om = orderManageDao.get(id);
		om.setInfo(info);
		Status status = new Status();
		status.setId(statusId);
		om.setStatus(status);
		orderManageDao.save(om);
		
		return "修改成功！";
	}
	/**
	 * 待完善。。。。
	 * OrderDetail和BomTemp都是依赖于order的
	 * 1.“待录入（1）”和“待审核（2）”的时候，要检查是否有orderDetail
	 * 2.“待配置（3）”的时候，要检查是否有bomTemp
	 * 3.“已配置，BOM审核中（7）”、“已发放（4）”的时候不能删除
	 * 4.“审核不通过（6）”、“失效（5）”的时候可以删除
	 * 
	 */
	public String deleteOrder(long id){

		orderManageDao.delete(id);

		return "删除成功！";
	}

	public List<OrderManageDTO> getAllOrder(){
		List<OrderManage> omList = orderManageDao.getAll();
		List<OrderManageDTO> omDTOList = new ArrayList<OrderManageDTO>();
		int length = omList.size();
		for(int i = 0; i<length;i++){
			OrderManage om = omList.get(i);
			OrderManageDTO omDTO = new OrderManageDTO();
			Status status =om.getStatus();
			Date beginDate =om.getBeginDate();
			if(beginDate !=null && !beginDate.equals("")){
				omDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(beginDate));
			}
			
			omDTO.setCheckinfo(om.getCheckinfo());
			Date endDate = om.getEndDate();
			if(endDate !=null && !endDate.equals("")){
				omDTO.setEndDate(new SimpleDateFormat("yyyy-MM-dd").format(endDate));
			}
		    
			omDTO.setId(om.getId());
			omDTO.setInfo(om.getInfo());
			omDTO.setMingxi(om.getMingxi());
			omDTO.setOrderNumber(om.getOrderNumber());
			omDTO.setStatusId(status.getId());
			omDTO.setStatusName(status.getStatusName());
			
			omDTOList.add(omDTO);
			
		}
		
		return omDTOList;
	}
	//luweijiang
	public List<OrderManageDTO> getAllOrderById(long id) {
		OrderManage omList = orderManageDao.findUniqueBy("id", id);
		List<OrderManageDTO> omDTOList = new ArrayList<OrderManageDTO>();
			
			OrderManageDTO omDTO = new OrderManageDTO();
			Status status =omList.getStatus();
			Date beginDate =omList.getBeginDate();
			if(beginDate !=null && !beginDate.equals("")){
				omDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(beginDate));
			}
			
			omDTO.setCheckinfo(omList.getCheckinfo());
			Date endDate = omList.getEndDate();
			if(endDate !=null && !endDate.equals("")){
				omDTO.setEndDate(new SimpleDateFormat("yyyy-MM-dd").format(endDate));
			}
		    
			omDTO.setId(omList.getId());
			omDTO.setInfo(omList.getInfo());
			omDTO.setMingxi(omList.getMingxi());
			omDTO.setOrderNumber(omList.getOrderNumber());
			omDTO.setStatusId(status.getId());
			omDTO.setStatusName(status.getStatusName());
			
			omDTOList.add(omDTO);
		
		return omDTOList;
	}
	
	
	public String change2CheckStatus(long id){
		OrderManage order=orderManageDao.get(id);
		Status status =new Status();
		status.setId(2);
		order.setStatus(status);
		orderManageDao.save(order);
		return "完成配置需求录入，已经提交审核";
	}

	public String checkDone(long id, long statusId, String checkinfo){
		if(statusId==0){
			statusId=3;
		}
		if(statusId==1){
			statusId=6;
		}
		Status status =new Status();
		status.setId(statusId);
		OrderManage order=orderManageDao.get(id);
		order.setStatus(status);
		order.setCheckinfo(checkinfo);
		orderManageDao.save(order);
		
		return "成功提交审核信息";
		
	}
	
	public List<OrderManageDTO> getOrder4Confi(){
		List<OrderManage> omList = orderManageDao.find("from OrderManage om where om.status.statusName='待配置'");
		List<OrderManageDTO> omDTOList = new ArrayList<OrderManageDTO>();
		for(OrderManage om : omList){
			OrderManageDTO omDTO = new OrderManageDTO();
			omDTO.setId(om.getId());
			omDTO.setOrderNumber(om.getOrderNumber());
			omDTO.setInfo(om.getInfo());
			omDTOList.add(omDTO);
		}
		return omDTOList;
	
	}
	/**
	 * luweijiang
	 */
	public List<OrderManageDTO> getOrder4ConfiById(long orderId) {
		// TODO Auto-generated method stub
		List<OrderManage> omList = orderManageDao.find("from OrderManage om where om.status.statusName='待配置' and om.id="+orderId);
		List<OrderManageDTO> omDTOList = new ArrayList<OrderManageDTO>();
		for(OrderManage om : omList){
			OrderManageDTO omDTO = new OrderManageDTO();
			omDTO.setId(om.getId());
			omDTO.setOrderNumber(om.getOrderNumber());
			omDTO.setInfo(om.getInfo());
			omDTOList.add(omDTO);
		}
		return omDTOList;
	}

	public OrderManageDao getOrderManageDao() {
		return orderManageDao;
	}
	@Autowired
	public void setOrderManageDao(OrderManageDao orderManageDao) {
		this.orderManageDao = orderManageDao;
	}

	
	
	
	
}
