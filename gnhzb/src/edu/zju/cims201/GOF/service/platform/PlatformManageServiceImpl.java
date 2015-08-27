package edu.zju.cims201.GOF.service.platform;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.platform.PlatStructConfiRuleDao;
import edu.zju.cims201.GOF.dao.platform.PlatStructTreeDao;
import edu.zju.cims201.GOF.dao.platform.PlatformManageDao;
import edu.zju.cims201.GOF.dao.platform.PlatformStatusDao;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatStructTree;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatformManage;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatformStatus;
import edu.zju.cims201.GOF.rs.dto.PlatformManageDTO;

@Service
@Transactional
public class PlatformManageServiceImpl implements PlatformManageService{
	private PlatformManageDao platformManageDao;
	private PlatStructTreeDao platStructTreeDao;
	private PlatStructConfiRuleDao platStructConfiRuleDao;
	private PlatformStatusDao platformStatusDao;
	
	
	public PlatformStatusDao getPlatformStatusDao() {
		return platformStatusDao;
	}
	@Autowired
	public void setPlatformStatusDao(PlatformStatusDao platformStatusDao) {
		this.platformStatusDao = platformStatusDao;
	}
	public PlatStructConfiRuleDao getPlatStructConfiRuleDao() {
		return platStructConfiRuleDao;
	}
	@Autowired
	public void setPlatStructConfiRuleDao(
			PlatStructConfiRuleDao platStructConfiRuleDao) {
		this.platStructConfiRuleDao = platStructConfiRuleDao;
	}
	public PlatformManageDao getPlatformManageDao() {
		return platformManageDao;
	}
	@Autowired
	public void setPlatformManageDao(PlatformManageDao platformManageDao) {
		this.platformManageDao = platformManageDao;
	}
	public PlatStructTreeDao getPlatStructTreeDao() {
		return platStructTreeDao;
	}
	@Autowired
	public void setPlatStructTreeDao(PlatStructTreeDao platStructTreeDao) {
		this.platStructTreeDao = platStructTreeDao;
	}
	public HashMap<String, Object> createPlatform(String platName,String info){
		HashMap<String, Object> map=new HashMap<String, Object>();
		PlatformManage platExist = platformManageDao.findUniqueBy("platName", platName);
		if(platExist!=null){
			map.put("isSuccess", "0");
			map.put("message", "平台名称已存在，请重新添加");
			return map;
		}
		PlatformManage plat = new PlatformManage();
		Date date =new Date();
		plat.setBeginDate(date);
		plat.setInfo(info);
		plat.setPlatName(platName);
		PlatformStatus status =new PlatformStatus();
		status.setId(1);
		
		plat.setStatus(status);
		platformManageDao.save(plat);
		PlatStructTree pst =new PlatStructTree();
		pst.setClassText(platName);
		pst.setPlat(plat);
		pst.setLeaf(1);
		pst.setSequence(0);
		pst.setIsmust(1);
		pst.setOnlyone(1);
		platStructTreeDao.save(pst);
		map.put("isSuccess", "1");
		map.put("message", "平台创建成功！");
		List<HashMap<String, String>> resultlist=new ArrayList<HashMap<String,String>>();
		HashMap<String, String> resultitem1=new HashMap<String, String>();
		HashMap<String, String> resultitem=new HashMap<String, String>();
		resultitem.put("name", "platformmanageid");
		resultitem.put("value", String.valueOf(plat.getId()));
		resultlist.add(resultitem);
		resultitem1.put("name", "platstructtreeid");
		resultitem1.put("value", String.valueOf(pst.getId()));
		resultlist.add(resultitem1);
		map.put("resultlist", resultlist);
		return map;
	}
	public List<PlatformManageDTO> getPlatform2Check(){
		List<PlatformManage> platList = platformManageDao.find("from PlatformManage pm where pm.status.statusName='正在审核'");
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		
		return platListRe;
	}
	/**
	 * luweijiang
	 */
	public List<PlatformManageDTO> getPlatform2CheckById(long id) {
		// TODO Auto-generated method stub
		List<PlatformManage> platList = platformManageDao.find("from PlatformManage pm where pm.status.statusName='正在审核' and pm.id="+id);
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		
		return platListRe;
	}
	
	public List<PlatformManageDTO> getPlatformById(long id){

		// TODO Auto-generated method stub
		List<PlatformManage> platList = platformManageDao.findBy("id",id);
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		
		return platListRe;
	
	}
	
	public List<PlatformManageDTO> getAllPlatform(){
		List<PlatformManage> platList = platformManageDao.getAll();
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		
		return platListRe;
	}
	
	public List<PlatformManageDTO> getFinishedPlatform(){
		List<PlatformManage> platList = platformManageDao.find("from PlatformManage pm where pm.status.statusName='审核通过'");
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		return platListRe;
	}
	/**
	 * luweijiang
	 */
	public List<PlatformManageDTO> getFinishedPlatformById(long id) {
		// TODO Auto-generated method stub
		List<PlatformManage> platList = platformManageDao.find("from PlatformManage pm where pm.status.statusName='审核通过' and pm.id="+id);
		List<PlatformManageDTO> platListRe = new ArrayList<PlatformManageDTO>();
		for(PlatformManage plat:platList){
			PlatformManageDTO platDTO = new PlatformManageDTO();
			platDTO.setBeginDate(new SimpleDateFormat("yyyy-MM-dd").format(plat.getBeginDate()));
			platDTO.setCheckUserName("");
			platDTO.setId(plat.getId());
			platDTO.setInfo(plat.getInfo());
			platDTO.setInputUserName("");
			platDTO.setPlatName(plat.getPlatName());
			PlatformStatus status= plat.getStatus();
			platDTO.setStatusId(status.getId());
			platDTO.setStatusName(status.getStatusName());
			platListRe.add(platDTO);
		}
		return platListRe;
	}
	
	public HashMap<String, Object> updatePlatform(long id, String platName, String info){
		HashMap<String, Object> map=new HashMap<String, Object>();
		List<PlatformManage> list=platformManageDao.find("from PlatformManage plat where plat.platName=? and plat.id <>?",platName,id);
		if(list.size()>0){
			map.put("isSuccess", "0");
			map.put("message", "平台名称已存在，请重新添加");
			return map;
		}
		PlatformManage plat=platformManageDao.get(id);
		PlatStructTree pst =platStructTreeDao.findUnique("from PlatStructTree pst where pst.parent.id =null and pst.plat.id= ? ",id);
		pst.setClassText(platName);
		platStructTreeDao.save(pst);
		plat.setBeginDate(new Date());
		plat.setInfo(info);
		plat.setPlatName(platName);
		platformManageDao.save(plat);
		map.put("isSuccess", "1");
		map.put("message", "平台创建成功！");
		List<HashMap<String, String>> resultlist=new ArrayList<HashMap<String,String>>();
		HashMap<String, String> resultitem=new HashMap<String, String>();
		resultitem.put("name", "platformmanageid");
		resultitem.put("value", String.valueOf(plat.getId()));
		HashMap<String, String> resultitem1=new HashMap<String, String>();
		resultitem1.put("name", "platstructtreeid");
		resultitem1.put("value", String.valueOf(pst.getId()));
		resultlist.add(resultitem1);
		map.put("resultlist", resultlist);
		return map;
	}
	
	public String deletePlatform(long id){
		PlatformManage plat=platformManageDao.get(id);
		String statusName =plat.getStatus().getStatusName();
		if(statusName.equals("审核通过")){
			return "审核通过的平台无法删除，请与管理员联系！";
		}
		platStructTreeDao.batchExecute("delete from PlatStructTree pst where pst.plat.id=?",id);
		platStructConfiRuleDao.batchExecute("delete from PlatStructConfiRule pscr where pscr.plat.id=?", id);
		platformManageDao.delete(plat);
		return "平台删除成功！";
	}
	
	public String changePlat2CheckStatus(long id){
		PlatformManage plat=platformManageDao.get(id);
		PlatformStatus status=platformStatusDao.findUniqueBy("statusName", "正在审核");
		plat.setStatus(status);
		platformManageDao.save(plat);
		return "提交审核成功！";
	}

	public String checkDone(long id, long statusId, String checkinfo){
		if(statusId==0){
			statusId=2;
		}
		if(statusId==1){
			statusId=3;
		}
		PlatformManage plat=platformManageDao.get(id);
		PlatformStatus  status= new PlatformStatus();
		status.setId(statusId);
		plat.setStatus(status);
		plat.setCheckinfo(checkinfo);
		
		return "成功提交审核信息";
	}
	
	

	
}
