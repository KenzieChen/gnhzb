package edu.zju.cims201.GOF.service.platform;

import java.util.List;

import edu.zju.cims201.GOF.rs.dto.PlatformManageDTO;

public interface PlatformManageService {

	public String createPlatform(String platName,String info);

	public List<PlatformManageDTO> getAllPlatform();

	public String updatePlatform(long id, String platName, String info);

	public String deletePlatform(long id);

	public List<PlatformManageDTO> getPlatform2Check();

	public String changePlat2CheckStatus(long id);

	public String checkDone(long id, long statusId, String checkinfo);

	public List<PlatformManageDTO> getFinishedPlatform();
	/**
	 * luweijiang
	 * @param id
	 * @return
	 */
	public List<PlatformManageDTO> getPlatform2CheckById(long id);

	public List<PlatformManageDTO> getFinishedPlatformById(long id);

}
