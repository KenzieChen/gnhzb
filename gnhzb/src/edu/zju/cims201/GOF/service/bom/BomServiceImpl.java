package edu.zju.cims201.GOF.service.bom;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.bom.BomDao;
import edu.zju.cims201.GOF.dao.bom.BomDetailDao;
import edu.zju.cims201.GOF.dao.bom.BomTempDao;
import edu.zju.cims201.GOF.dao.classificationtree.ClassificationTreeDao;
import edu.zju.cims201.GOF.dao.order.OrderManageDao;
import edu.zju.cims201.GOF.hibernate.pojoA.Bom;
import edu.zju.cims201.GOF.hibernate.pojoA.BomA;
import edu.zju.cims201.GOF.hibernate.pojoA.BomDetail;
import edu.zju.cims201.GOF.hibernate.pojoA.BomDetailA;
import edu.zju.cims201.GOF.hibernate.pojoA.BomStatus;
import edu.zju.cims201.GOF.hibernate.pojoA.BomTemp;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;
import edu.zju.cims201.GOF.hibernate.pojoA.OrderManage;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatformManage;
import edu.zju.cims201.GOF.hibernate.pojoA.Status;
import edu.zju.cims201.GOF.rs.dto.BomDTO;
import edu.zju.cims201.GOF.rs.dto.BomDetailDTO;

@Service
@Transactional
public class BomServiceImpl implements BomService {
	
	private BomTempDao bomTempDao;
	private BomDao bomDao;
	private BomDetailDao bomDetailDao;
	private OrderManageDao orderManageDao;
	private ClassificationTreeDao classificationTreeDao;
	
	
	/**
	 *  对配置完毕的BOM表进行审核
	 * @param bomId  
	 * @param bomStatusId   bom状态id,1：正在审核；2：审核通过；3：审核不通过
	 * @param checkinfo     审核填写的信息
	 * @return 审核结果
	 */
	public String saveBomCheckResultById(long bomId, long bomStatusId,
			String checkinfo){
		Bom bom=bomDao.get(bomId);
		
		OrderManage order = bom.getOrder();
		Status orderStatus =  new Status();
		
		if(bomStatusId==2){
			//审核通过2
			orderStatus.setId(4);
			bom.setSynFlag(1);
		}else{
			//审核不通过
			orderStatus.setId(5);
		}
		order.setStatus(orderStatus);
		
		BomStatus bomStatus = new BomStatus();
		bomStatus.setId(bomStatusId);
		//设置BOM状态
		bom.setBomStatus(bomStatus);
		bom.setCheckInfo(checkinfo);
		

		return "成功提交审核信息";
	}
	
	public String insertNewBom(long orderId, long platId, String bomName,
			String info) {
		// TODO Auto-generated method stub
		
		//创建BOM
		Bom bom = new Bom();
		bom.setBomName(bomName);
		bom.setSynFlag(0);
		bom.setUuid(UUID.randomUUID().toString());
		
		//初始化BOM的状态为待审核（id=1）
		BomStatus bomStatus = new BomStatus();
		bomStatus.setId(1);
		bom.setBomStatus(bomStatus);
		
		bom.setInfo(info);
		bom.setCreateTime(new Date());
		
		OrderManage order = orderManageDao.get(orderId);
		order.setId(orderId);
		bom.setOrder(order);
		
		PlatformManage plat = new PlatformManage();
		plat.setId(platId);
		bom.setPlat(plat);
		
		//选出所有的由某一订单和某一平台配置出来的零件实例；
		List<BomTemp>  btList = bomTempDao.find("from BomTemp bt where bt.order.id=? and bt.plat.id=?", orderId,platId);
		
		List<BomDetail> bomDetailList = new ArrayList<BomDetail>();
		//将零部件实例信息添加到bomDetail中
		for(BomTemp bt : btList){
			BomDetail bd = new BomDetail();
			bd.setModuleClass(bt.getModuleClass());
			bd.setModuleUuid(bt.getModuleClass().getUuid());
			bd.setPart(bt.getPart());
			bd.setPartUuid(bt.getPart().getUuid());
			bd.setPlatStruct(bt.getPlatStruct());
			bd.setQuantity(bt.getQuantity());
			//没有setBom保存之后的bomDetail没有bomId
			bd.setBom(bom);
			bomDetailList.add(bd);
		}
		
		bom.setBomDetailList(bomDetailList);
		
		//改变order的状态
		Status s = new Status();
		s.setId(7);
		order.setStatus(s);
		orderManageDao.save(order);
		
		//保存BOM
		bomDao.save(bom);
		
		//删除bomTemp中的相关信息。
		bomTempDao.batchExecute("delete from BomTemp bt where bt.order.id=? and bt.plat.id=?", orderId,platId);
		
		return "成功提交BOM信息";
	}

	
	

	public List<BomDTO> getBom2Check() {
		// TODO Auto-generated method stub
		//将int转换为long，否则会出错。
		List<Bom> bomList = bomDao.find("from Bom bom where bom.bomStatus.id =?",(long)1);
		List<BomDTO> bomDTOList = new ArrayList<BomDTO>();
		for(Bom b: bomList){
			BomDTO bd = new BomDTO();
			bd.setBomName(b.getBomName());
			bd.setBomStatus(b.getBomStatus().getStatusName());
			bd.setBomStatusId(b.getBomStatus().getId());
			bd.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:m").format(b.getCreateTime()));
			bd.setId(b.getId());
			bd.setOrderId(b.getOrder().getId());
			bd.setOrderName(b.getOrder().getOrderNumber());
			bd.setPlatName(b.getPlat().getPlatName());
			bomDTOList.add(bd);
		}
		return bomDTOList;
	}
	//luweijiang
	public List<BomDTO> getBom2CheckById(long bomId) {
		// TODO Auto-generated method stub
		//将int转换为long，否则会出错。
				List<Bom> bomList = bomDao.find("from Bom bom where bom.bomStatus.id =? and bom.id=?",(long)1,bomId);
				List<BomDTO> bomDTOList = new ArrayList<BomDTO>();
				for(Bom b: bomList){
					BomDTO bd = new BomDTO();
					bd.setBomName(b.getBomName());
					bd.setBomStatus(b.getBomStatus().getStatusName());
					bd.setBomStatusId(b.getBomStatus().getId());
					bd.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:m").format(b.getCreateTime()));
					bd.setId(b.getId());
					bd.setOrderId(b.getOrder().getId());
					bd.setOrderName(b.getOrder().getOrderNumber());
					bd.setPlatName(b.getPlat().getPlatName());
					bomDTOList.add(bd);
				}
				return bomDTOList;
	}
	
	public List<BomDTO> getAllBom(){
		List<Bom> bomList = bomDao.getAll();
		List<BomDTO> bomDTOList = new ArrayList<BomDTO>();
		for(Bom b: bomList){
			BomDTO bd = new BomDTO();
			bd.setBomName(b.getBomName());
			bd.setBomStatus(b.getBomStatus().getStatusName());
			bd.setBomStatusId(b.getBomStatus().getId());
			bd.setCreateTime(new SimpleDateFormat("yyyy-MM-dd HH:m").format(b.getCreateTime()));
			bd.setId(b.getId());
			bd.setOrderId(b.getOrder().getId());
			bd.setOrderName(b.getOrder().getOrderNumber());
			bd.setPlatName(b.getPlat().getPlatName());
			bomDTOList.add(bd);
		}
		return bomDTOList;
	}
	
	//采用递归方法,获得整棵树.待修改
	public List<BomDetailDTO> getBomStructTreeByBomId(long bomId){
		
		List<BomDetailDTO> bomTree = new ArrayList<BomDetailDTO>();
		//找出零部件实例所属的模块
		@SuppressWarnings("unchecked")
		List<ClassificationTree> moduleList = bomDetailDao.getSession().createQuery("select distinct bd.moduleClass from BomDetail bd where bd.bom.id = "+bomId).list();
		//从其中一个模块中找出结构树的根节点
		CodeClass codeClass =moduleList.get(0).getCodeClass();
		//找到结构树的根节点
		ClassificationTree root = classificationTreeDao.findUnique("from ClassificationTree ct where ct.codeClass.id =? and ct.parent.id is null", codeClass.getId());
		

		return bomTree;
		
	}
	
	public	BomDetailDTO getBomStructRootByBomId(long bomId){
		//
		Bom bom =bomDao.get(bomId);
		String bomName = bom.getBomName();
		
		//找出零部件实例所属的模块
		@SuppressWarnings("unchecked")
		List<ClassificationTree> moduleList = bomDetailDao.getSession().createQuery("select distinct bd.moduleClass from BomDetail bd where bd.bom.id = "+bomId).list();
		//从其中一个模块中找出结构树的根节点
		CodeClass codeClass =moduleList.get(0).getCodeClass();
		//找到结构树的根节点
		ClassificationTree tempRoot = classificationTreeDao.findUnique("from ClassificationTree ct where ct.codeClass.id =? and ct.parent.id is null", codeClass.getId());
		BomDetailDTO root = new BomDetailDTO();
		root.setBomId(bomId);
		root.setModuleCode(tempRoot.getCode());
		root.setModuleId(tempRoot.getId());
		root.setModuleName(tempRoot.getText()+"("+bomName+")");
		return root;
	}
	
	public List<BomDetailDTO> getBomStructNodeByParentId(long parentId,long bomId){
		/**
		 * 分两种情况：
		 * 1.当选中节点刚好是零部件实例所属模块，直接在改模块下面挂零件实例；
		 * 2.选中节点不是零部件所属模块，找模块子节点，根据条件选择子节点
		 */
		
		//返回的节点,可能是零件信息,也可能是从备选模块节点中选择的节点
		List<BomDetailDTO> nodes = new ArrayList<BomDetailDTO>();
		
		//找出零部件实例所属的模块
		@SuppressWarnings("unchecked")
		List<ClassificationTree> moduleList = bomDetailDao.getSession().createQuery("select distinct bd.moduleClass from BomDetail bd where bd.bom.id = "+bomId).list();
		for(ClassificationTree module:moduleList){
			//第一种情况：当选中节点刚好是零部件实例所属模块，直接在改模块下面挂零件实例；
			if(module.getId() == parentId){
				List<BomDetail> bomDetailList = bomDetailDao.find("from BomDetail bd where bd.bom.id = ? and bd.moduleClass.id = ?",bomId,parentId);
				for(BomDetail bd :bomDetailList){
					BomDetailDTO node = new BomDetailDTO();
					node.setModuleId(parentId);
					node.setBomId(bomId);
					node.setPartCount(bd.getQuantity());
					node.setPartId(bd.getPart().getId());
					node.setPartName(bd.getPart().getPartName());
					node.setPartNumber(bd.getPart().getPartNumber());
					nodes.add(node);
				}
				return nodes;
			}
		}
		

		//第二种情况：选中节点不是零部件所属模块，找模块子节点，根据条件选择子节点
		//备选子节点
		List<ClassificationTree> tempNodes = classificationTreeDao.find("from ClassificationTree ct where ct.parent.id =?", parentId);
		
		//根据实例BOM零件所属模块，判断该模块是否属于备选子节点。
		for(ClassificationTree tempNode :tempNodes){
			
			//该层循环从备选子节点中选择包含零件实例的模块或者其上级模块
			flag1:for(ClassificationTree module2:moduleList){
				
				 while(module2 != null){ 
					 if(module2.getId()==tempNode.getId()){
						 //选用子节点
						 BomDetailDTO node = new BomDetailDTO();
						 node.setBomId(bomId);
						 node.setModuleCode(tempNode.getCode());
						 node.setModuleId(tempNode.getId()); 
						 node.setModuleName(tempNode.getText());
						 nodes.add(node);
						 //停止循环,跳到flag1标志的循环外面
						 break flag1;
					 }else{
						 module2 = module2.getParent();
					 }
				 }
			}
		}
		
	
		return nodes;
	}
	
	
	
	

	public BomTempDao getBomTempDao() {
		return bomTempDao;
	}
	
	@Autowired
	public void setBomTempDao(BomTempDao bomTempDao) {
		this.bomTempDao = bomTempDao;
	}

	public BomDao getBomDao() {
		return bomDao;
	}
	@Autowired
	public void setBomDao(BomDao bomDao) {
		this.bomDao = bomDao;
	}

	public BomDetailDao getBomDetailDao() {
		return bomDetailDao;
	}
	@Autowired
	public void setBomDetailDao(BomDetailDao bomDetailDao) {
		this.bomDetailDao = bomDetailDao;
	}

	public OrderManageDao getOrderManageDao() {
		return orderManageDao;
	}
	@Autowired
	public void setOrderManageDao(OrderManageDao orderManageDao) {
		this.orderManageDao = orderManageDao;
	}

	public ClassificationTreeDao getClassificationTreeDao() {
		return classificationTreeDao;
	}

	@Autowired
	public void setClassificationTreeDao(ClassificationTreeDao classificationTreeDao) {
		this.classificationTreeDao = classificationTreeDao;
	}
	
	/**
	 * 服务方法:模块化中用于获取需要同步的实例BOM
	 */
	public String getBoms2Syn() {
		// TODO Auto-generated method stub
		List<Bom> bomList = bomDao.find("from Bom b where b.synFlag =1 and b.bomStatus.id= 2");
		int length = bomList.size();
		for(int i =0; i<length;i++){
			Bom b = bomList.get(i);
			List<BomDetail> bomDetailList = b.getBomDetailList();
			int length2 = bomDetailList.size();
			bomDao.getSession().evict(b);
			//此处不要清除id值，以便同步完成后根据id更新synFlag。
			//b.setId(0);
			b.setOrder(null);
			b.setPlat(null);
			
			List<BomDetail> bomDetailList2 = new ArrayList<BomDetail>();
			
			for(int j = 0;j<length2;j++){
				BomDetail bomDetail = bomDetailList.get(j);
				bomDetailDao.getSession().evict(bomDetail);
				bomDetail.setId(0);
				bomDetail.setPlatStruct(null);
				//此处的getModuleClass拿出来的classificationTree是属于持久态的。
				//bomDetail.getModuleClass().setChildren(null);
				//bomDetail.getModuleClass().setCodeClass(null);
				//bomDetail.getModuleClass().setParent(null);
				ClassificationTree module = bomDetail.getModuleClass();
				classificationTreeDao.getSession().evict(module);
				module.setChildren(null);
				module.setCodeClass(null);
				module.setParent(null);
				bomDetail.setModuleClass(module);
				bomDetailList2.add(bomDetail);
			}
			b.setBomDetailList(bomDetailList2);
			bomList.set(i, b);
		}
		JsonConfig jsConfig = new JsonConfig();
		jsConfig.setIgnoreDefaultExcludes(true);
		jsConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		//顾虑不需要的属性
		jsConfig.setJsonPropertyFilter(new PropertyFilter(){
			public boolean apply(Object arg0,String arg1, Object arg2){
				if("plat".equals(arg1) ||"order".equals(arg1)||"platStruct".equals(arg1)){
					return true;
				}
				else{
					return false;
				}
			}
		});
		JSONArray jsonArr = new JSONArray();
		jsonArr.addAll(bomList,jsConfig);
		String boms = jsonArr.toString();
		System.out.println(boms);
		return boms;
	}
	/**
	 * 服务方法:模块化中同步完实例bom之后，更新标识，表示已经同步
	 */
	public void SynFinish(String instanceBoms){
		JSONArray jsArr = JSONArray.fromObject(instanceBoms);
		JsonConfig jsConfig = new JsonConfig();
		jsConfig.setRootClass(Bom.class);
		//防止强制转换出错
		Map<String,Class<BomDetail>> map = new HashMap<String,Class<BomDetail>>();
		map.put("bomDetailList", BomDetail.class);
		jsConfig.setClassMap(map);
		
		@SuppressWarnings("unchecked")
		List<Bom> boms = JSONArray.toList(jsArr,jsConfig);
		for(Bom b :boms){
			Bom bom = bomDao.get(b.getId());
			bom.setSynFlag(0);
			bomDao.save(bom);
		}
	}

	
}
