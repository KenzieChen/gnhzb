package edu.zju.cims201.GOF.service.platform;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojoA.PlatStructTree;
import edu.zju.cims201.GOF.rs.dto.PlatStructTreeDTO;

public interface PlatStructTreeService {

	public List<PlatStructTree> getUnfinishedPlatStruct();

	public String insertTreeNode(long platId, long moduleId);

	public List<PlatStructTreeDTO> getChildrenNode(long pid);

	public String deleteTreeNode(long id);

	public String updateTreeNode(long id, int ismust, int onlyone);

	public PlatStructTreeDTO getPlatStructByPlatId(long platId);

	public List<PlatStructTreeDTO> getModulesByPlatId(long platId,long orderId);
	//luweijiang
	public List<PlatStructTree> getUnfinishedPlatStructById(long id);

}
