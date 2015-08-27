package edu.zju.cims201.GOF.service.order;

import java.util.HashMap;
import java.util.List;

import edu.zju.cims201.GOF.rs.dto.OrderManageDTO;

public interface OrderManageService {

	public HashMap<String, Object> addOrder(String orderNumber, String info);

	public String updateOrder(long id, String info, long statusId);

	public String deleteOrder(long id);

	public List<OrderManageDTO> getAllOrder();

	public String change2CheckStatus(long id);

	public String checkDone(long id, long statusId, String checkinfo);

	public List<OrderManageDTO> getOrder4Confi();
	//luweijiang
	public List<OrderManageDTO> getAllOrderById(long id);
	public List<OrderManageDTO> getOrder4ConfiById(long orderId);

}
