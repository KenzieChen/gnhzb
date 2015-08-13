package edu.zju.cims201.GOF.service.platform;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.bom.ModuleConfigStatusDao;
import edu.zju.cims201.GOF.dao.classificationtree.ClassificationTreeDao;
import edu.zju.cims201.GOF.dao.part.PartDao;
import edu.zju.cims201.GOF.dao.platform.PlatStructConfiRuleDao;
import edu.zju.cims201.GOF.dao.platform.PlatStructTreeDao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.ModuleConfigStatus;
import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatStructConfiRule;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatStructTree;
import edu.zju.cims201.GOF.hibernate.pojoA.PlatformManage;
import edu.zju.cims201.GOF.rs.dto.PlatStructTreeDTO;

@Service
@Transactional
public class PlatStructTreeServiceImpl implements PlatStructTreeService {
	private PlatStructTreeDao platStructTreeDao;
	private ClassificationTreeDao classificationTreeDao;
	private PartDao partDao;
	private PlatStructConfiRuleDao platStructConfiRuleDao;
	private ModuleConfigStatusDao moduleConfigStatusDao;

	public List<PlatStructTree> getUnfinishedPlatStruct(){
		List<PlatStructTree> list = platStructTreeDao.find("from PlatStructTree pst where pst.parent.id=null and pst.plat.status.id=1");
		List<PlatStructTree> listRe = new ArrayList<PlatStructTree>();
		for(PlatStructTree pst:list){
			platStructTreeDao.getSession().evict(pst);
			pst.setModuleConfigStatusList(null);
			pst.setParent(null);
			pst.setChildren(null);
			pst.setModuleClass(null);
			listRe.add(pst);
		}
		return listRe;
	}
	/**
	 * luweijiang
	 */
	public List<PlatStructTree> getUnfinishedPlatStructById(long id) {
		// TODO Auto-generated method stub
		PlatStructTree platStructTree=platStructTreeDao.findUniqueBy("id", id);
		List<PlatStructTree> listRe = new ArrayList<PlatStructTree>();
		platStructTreeDao.getSession().evict(platStructTree);
		platStructTree.setModuleConfigStatusList(null);
		platStructTree.setParent(null);
		platStructTree.setChildren(null);
		platStructTree.setModuleClass(null);
		listRe.add(platStructTree);
		return listRe;
	}
	
	/**
	 * 为平台添加模块的时候，同时为该模块下的所有零部件配置规则，设置必选项为零部件本身。
	 */
	public String insertTreeNode(long platId, long moduleId){
		//看该平台下是否已经有该模块
		PlatStructTree nodeExist=platStructTreeDao.findUnique("from PlatStructTree pst where pst.plat.id=? and pst.moduleClass.id=?",platId,moduleId);
		if(nodeExist!=null){
			return "平台中已存在该模块，请重新添加！";
		}
		//寻找父节点
		PlatStructTree parent = platStructTreeDao.findUnique("from PlatStructTree pst where pst.parent.id = null and pst.plat.id=?", platId);
		ClassificationTree cTree = classificationTreeDao.get(moduleId);
		PlatformManage platform = new PlatformManage();
		platform.setId(platId);
		parent.setLeaf(0);
		platStructTreeDao.save(parent);
		
		PlatStructTree child = new PlatStructTree();
		child.setClassCode(cTree.getCode());
		child.setClassText(cTree.getText());
		child.setIsmust(1);
		child.setLeaf(1);
		child.setModuleClass(cTree);
		child.setOnlyone(1);
		child.setParent(parent);
		child.setPlat(platform);
		child.setSequence(0);
		
		
		platStructTreeDao.save(child);
		
		List<Part> parts = partDao.find("from Part p where p.classificationTree.id = ?",moduleId);
		String classCode = cTree.getClassCode();
		String classText = cTree.getText();
		for(Part p :parts){
			PlatStructConfiRule rule = new PlatStructConfiRule();
			rule.setClassCode(classCode);
			rule.setClassText(classText);
			rule.setModuleClass(cTree);
			rule.setPart(p);
			rule.setPartSelected(p);
			rule.setPlat(platform);
			rule.setPlatStruct(child);
			rule.setStatus(1);
			rule.setInfo("");
			
			platStructConfiRuleDao.save(rule);
		}
		
		return "添加成功！";
	}
	
	public List<PlatStructTreeDTO> getChildrenNode(long pid){
		List<PlatStructTree> psts = platStructTreeDao.find("from PlatStructTree pst where pst.parent.id=?", pid);
		List<PlatStructTreeDTO> pstDTOs = new ArrayList<PlatStructTreeDTO>();
		for(PlatStructTree pst :psts){
			long moduleId = pst.getModuleClass().getId();
			long partsCount = (Long)partDao.createQuery("select count(*) from Part p where p.classificationTree.id=?", moduleId).uniqueResult();
			PlatStructTreeDTO pstDTO = new PlatStructTreeDTO();
			pstDTO.setClassCode(pst.getClassCode());
			pstDTO.setClassText(pst.getClassText());
			pstDTO.setId(pst.getId());
			pstDTO.setIsmust(pst.getIsmust());
			pstDTO.setLeaf(pst.getLeaf());
			pstDTO.setModuleId(pst.getModuleClass().getId());
			pstDTO.setOnlyone(pst.getOnlyone());
			pstDTO.setPlatId(pst.getPlat().getId());
			pstDTO.setSequence(pst.getSequence());
			pstDTO.setPartsCount(partsCount);
			pstDTOs.add(pstDTO);
		}
		return pstDTOs;
	}
	
	/**
	 * 删除平台树节点的时候，同时删除规则配置表中树节点对应的零部件规则数据
	 */
	public String deleteTreeNode(long id){
		PlatStructTree pst = platStructTreeDao.get(id);
		PlatStructTree parent = pst.getParent();
		ClassificationTree cTree = pst.getModuleClass();
		
		platStructConfiRuleDao.batchExecute("delete from PlatStructConfiRule rule where rule.platStruct.id = ? and rule.moduleClass.id=?", id,cTree.getId());
		
		int childrenCount = parent.getChildren().size();
		if(childrenCount==1){
			parent.setLeaf(1);
		}
		platStructTreeDao.delete(id);
		
		return "删除成功！";
	}
	
	public String updateTreeNode(long id, int ismust, int onlyone){
		PlatStructTree pst=platStructTreeDao.get(id);
		pst.setIsmust(ismust);
		pst.setOnlyone(onlyone);
		platStructTreeDao.save(pst);
		return "修改成功！";
	}

	public PlatStructTreeDTO getPlatStructByPlatId(long platId){
		PlatStructTree psTree = platStructTreeDao.findUnique("from PlatStructTree psTree where psTree.parent.id=null and psTree.plat.id=?",platId);
		PlatStructTreeDTO pstDTO = new PlatStructTreeDTO();
		pstDTO.setClassCode(psTree.getClassCode());
		pstDTO.setClassText(psTree.getClassText());
		pstDTO.setId(psTree.getId());
		pstDTO.setIsmust(psTree.getIsmust());
		pstDTO.setLeaf(psTree.getLeaf());
		pstDTO.setOnlyone(psTree.getOnlyone());
		pstDTO.setPlatId(psTree.getPlat().getId());
		pstDTO.setSequence(psTree.getSequence());
		
		return pstDTO;
	}
	/**
	 * 显示平台树结构之前，设置moduleConfigStatus的statusName为待配置
	 */
	public List<PlatStructTreeDTO> getModulesByPlatId(long platId,long orderId){
		List<PlatStructTree> psts = platStructTreeDao.find("from PlatStructTree pst where pst.plat.id= ? ", platId);
		List<PlatStructTreeDTO> pstDTOs = new ArrayList<PlatStructTreeDTO>();
		for(PlatStructTree pst :psts){
			if(pst.getParent()==null){
				continue;
			}
			ModuleConfigStatus moduleConfigStatus = moduleConfigStatusDao.findUnique("from ModuleConfigStatus status where status.platStructTree.id=? and status.order.id=?", pst.getId(),orderId);
			
			PlatStructTreeDTO pstDTO = new PlatStructTreeDTO();
			pstDTO.setClassCode(pst.getClassCode());
			pstDTO.setClassText(pst.getClassText());
			pstDTO.setId(pst.getId());
			pstDTO.setIsmust(pst.getIsmust());
			pstDTO.setLeaf(pst.getLeaf());
			pstDTO.setModuleId(pst.getModuleClass().getId());
			pstDTO.setOnlyone(pst.getOnlyone());
			pstDTO.setPlatId(pst.getPlat().getId());
			pstDTO.setSequence(pst.getSequence());
			
			if(moduleConfigStatus!=null){
				pstDTO.setConfigStatusName(moduleConfigStatus.getStatusName());
			}
			
			pstDTOs.add(pstDTO);
		}
		return pstDTOs;
	
	}
	
	public PlatStructTreeDao getPlatStructTreeDao() {
		return platStructTreeDao;
	}
	@Autowired
	public void setPlatStructTreeDao(PlatStructTreeDao platStructTreeDao) {
		this.platStructTreeDao = platStructTreeDao;
	}

	public ClassificationTreeDao getClassificationTreeDao() {
		return classificationTreeDao;
	}

	public PartDao getPartDao() {
		return partDao;
	}
	@Autowired
	public void setClassificationTreeDao(ClassificationTreeDao classificationTreeDao) {
		this.classificationTreeDao = classificationTreeDao;
	}
	@Autowired
	public void setPartDao(PartDao partDao) {
		this.partDao = partDao;
	}
	public PlatStructConfiRuleDao getPlatStructConfiRuleDao() {
		return platStructConfiRuleDao;
	}
	@Autowired
	public void setPlatStructConfiRuleDao(
			PlatStructConfiRuleDao platStructConfiRuleDao) {
		this.platStructConfiRuleDao = platStructConfiRuleDao;
	}
	
	public ModuleConfigStatusDao getModuleConfigStatusDao() {
		return moduleConfigStatusDao;
	}
	@Autowired
	public void setModuleConfigStatusDao(ModuleConfigStatusDao moduleConfigStatusDao) {
		this.moduleConfigStatusDao = moduleConfigStatusDao;
	}
	
	
	
	
}
