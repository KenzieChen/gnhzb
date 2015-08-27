package edu.zju.cims201.GOF.service.bom;

import java.util.HashMap;
import java.util.List;

import edu.zju.cims201.GOF.rs.dto.BomDTO;
import edu.zju.cims201.GOF.rs.dto.BomDetailDTO;

public interface BomService {
	
	public HashMap<String, Object> insertNewBom(long orderId,long platId,String bomName,String info);

	public List<BomDTO> getBom2Check();

	public List<BomDetailDTO> getBomStructTreeByBomId(long bomId);
	
	public	BomDetailDTO getBomStructRootByBomId(long bomId);

	public List<BomDetailDTO> getBomStructNodeByParentId(long parentId,long bomId);

	public String saveBomCheckResultById(long bomId, long bomStatusId,
			String checkinfo);

	public List<BomDTO> getAllBom();

	public String getBoms2Syn();

	public void SynFinish(String instanceBoms);
	//luweijiang
	public List<BomDTO> getBom2CheckById(long bomId);

}
