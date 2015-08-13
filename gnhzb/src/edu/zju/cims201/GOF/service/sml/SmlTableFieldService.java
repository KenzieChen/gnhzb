package edu.zju.cims201.GOF.service.sml;

import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojoA.SmlTableField;

public interface SmlTableFieldService {
	public List<SmlTableField> getSmlTableFieldByTableName(String tableName);

	public boolean checkSmlTableByTableName(String tableName);

	public String createSmlTableByTableName(String tableName,long treeId);

	public String dropSmlTableByTableName(String tableName);

	public String addSmlTableField(String tableName, long smlParameterId,
			String tableHead, String headShow);

	public String deleteSmlTableField(long id);

	public String getSmlTableByTableName(String tableName);

	public String getMsgForEditPartSMLForm(String tableName, String tableHead);

	public String modifyPartSML(String tableName,long id,String tableHead, String smlValue,String dataType);

	public void changeOutput(long id, int output);
	
}
