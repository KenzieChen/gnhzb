package edu.zju.cims201.GOF.service.sml;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.part.PartDao;
import edu.zju.cims201.GOF.dao.sml.SmlTableFieldDao;
import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.SmlParameterPool;
import edu.zju.cims201.GOF.hibernate.pojoA.SmlTableField;
import edu.zju.cims201.GOF.hibernate.pojoA.SmlUnitPool;

@Service
@Transactional
public class SmlTableFieldServiceImpl implements SmlTableFieldService {
	private Log log = LogFactory.getLog(SmlTableFieldServiceImpl.class);
	private SmlTableFieldDao smlTableFieldDao;
	
	private PartDao partDao;

	public List<SmlTableField> getSmlTableFieldByTableName(String tableName){
		tableName=tableName.replaceAll("-", "_");
		List<SmlTableField> smlTableFields=smlTableFieldDao.findBy("tableName", tableName);
		List<SmlTableField> result =new ArrayList<SmlTableField>();
		for(int i =0;i<smlTableFields.size();i++){
			SmlTableField smlTableField = smlTableFields.get(i);
			smlTableFieldDao.getSession().evict(smlTableField);
			smlTableField.setSmlParameterPool(null);
			
			result.add(smlTableField);
			
		}
		
		return result;
	}
	
	public boolean checkSmlTableByTableName(String tableName){
		tableName=tableName.replaceAll("-", "_");

		List<SmlTableField> stfList=smlTableFieldDao.findBy("tableName", tableName);

		if(stfList.size()!=0){
			return true;
		}
		return false;
		
	}
	
	public String createSmlTableByTableName(String tableName,long treeId){
		//建表
		tableName=tableName.replaceAll("-", "_");
		String createTableSql ="create table "+tableName+" (part_id int not null,part_number varchar(225) not null,part_name varchar(225) not null)";
		smlTableFieldDao.getSession().createSQLQuery(createTableSql).executeUpdate();
		
		List<Part> parts =partDao.find("from Part p where p.classificationTree.id = ?", treeId);
		//向表中添加数据
		for(Part p :parts){
			long part_id =p.getId();
			String part_number =p.getPartNumber();
			String part_name =p.getPartName();
			//向相应事物特性表中插入零件数据
			String insertSql ="insert into "+tableName+"(part_id,part_number,part_name) values ("+part_id+",'"+part_number+"','"+part_name+"')";
			smlTableFieldDao.getSession().createSQLQuery(insertSql).executeUpdate();
		}
		//向sml_talbe_field添加表字段数据
		SmlTableField  smlTableField1 = new SmlTableField();
		smlTableField1.setTableHead("partname");
		smlTableField1.setHeadShow("实例名称");
		smlTableField1.setTableName(tableName);
		smlTableFieldDao.save(smlTableField1);
		SmlTableField  smlTableField2 = new SmlTableField();
		smlTableField2.setTableHead("partnumber");
		smlTableField2.setHeadShow("实例编码");
		smlTableField2.setTableName(tableName);
		smlTableFieldDao.save(smlTableField2);
		
		return "事物特性表创建成功！";
	}
	
	public String dropSmlTableByTableName(String tableName){
		tableName=tableName.replaceAll("-", "_");
		String dropSql ="drop table "+tableName;
		smlTableFieldDao.getSession().createSQLQuery(dropSql).executeUpdate();
		smlTableFieldDao.batchExecute("delete from SmlTableField stf where stf.tableName =?", tableName);
	
		return "事物特性表删除成功！";
	}
	
	public String addSmlTableField(String tableName, long smlParameterId,
			String tableHead, String headShow){
		tableName=tableName.replaceAll("-", "_");
		SmlTableField stfExits=smlTableFieldDao.findUnique("from SmlTableField stf where stf.tableName=? and stf.smlParameterPool.id=?",tableName,smlParameterId);
		if(null!=stfExits){
			return "已存在该事物特性，请重新添加！";
		}
		SmlTableField stf =  new SmlTableField();
		SmlParameterPool spp = new SmlParameterPool();
		spp.setId(smlParameterId);
		stf.setHeadShow(headShow);
		stf.setSmlParameterPool(spp);
		stf.setTableHead(tableHead);
		stf.setTableName(tableName);
		smlTableFieldDao.save(stf);
		String addColumnSql ="alter table "+tableName+" add "+tableHead+" varchar(30) ";
		smlTableFieldDao.getSession().createSQLQuery(addColumnSql).executeUpdate();
		
		
		return "添加成功！";
	}
	
	public String deleteSmlTableField(long id){
		SmlTableField stf =  smlTableFieldDao.get(id);
		String tableName =stf.getTableName();
		String tableHead = stf.getTableHead();
		
		String addColumnSql ="alter table "+tableName+" drop column "+tableHead;
		smlTableFieldDao.getSession().createSQLQuery(addColumnSql).executeUpdate();
		
		smlTableFieldDao.delete(stf);
		
		return "删除成功！";
		
		
	}
	
	public String getSmlTableByTableName(String tableName){
		tableName=tableName.replaceAll("-", "_");
		String selectUrl ="select * from "+tableName;
		List list = smlTableFieldDao.getSession().createSQLQuery(selectUrl).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
		List<SmlTableField>stf = getSmlTableFieldByTableName(tableName);
		//output用于存放field的output属性为1的事物特性，用于变型设计的时候输出
		StringBuffer output = new StringBuffer("'output':'");
		StringBuffer sb = new StringBuffer("[");
		for(int i =0;i<list.size();i++){
			Map map =(Map)list.get(i); 
			sb.append("{'id':'"+map.get("ID")+"','partname':'"+map.get("PART_NAME")+"','partnumber':'"+map.get("PART_NUMBER")+"','partId':'"+map.get("PART_ID")+"',");
			 for(int j=0;j<stf.size();j++){
					if(stf.get(j).getTableHead().equals("partname") ||stf.get(j).getTableHead().equals("partnumber")||stf.get(j).getTableHead().equals("partname")){
						continue;
					}
					sb.append("'"+stf.get(j).getTableHead()+"':'");
					if(map.get(stf.get(j).getTableHead()) ==null || map.get(stf.get(j).getTableHead()).equals("")){
						sb.append("',");
					}else{
						sb.append(map.get(stf.get(j).getTableHead())+"',");
					}
					if(stf.get(j).getOutput()==1){
						output.append(stf.get(j).getTableHead()+",");
					}
			 }
			 if(output.charAt(output.length()-1)==','){
				 output.deleteCharAt(output.length()-1);
			 }
			 output.append("'");
			 sb.append(output.toString()+"},");
			 output.delete("'output':'".length(), output.length());
		}
		
		sb.deleteCharAt(sb.length()-1);
		sb.append("]");
		log.info("getSmlTableByTableName("+tableName+"):"+sb.toString());
	 	return sb.toString();
	}
	
	public String getMsgForEditPartSMLForm(String tableName, String tableHead){
		tableName=tableName.replaceAll("-", "_");
		SmlTableField stf =smlTableFieldDao.findUnique("from SmlTableField stf where stf.tableName=? and stf.tableHead=?", tableName,tableHead);
		SmlParameterPool spp=stf.getSmlParameterPool();
		String dataType = spp.getDataType();
		String smlName =spp.getSmlName();
		SmlUnitPool sp =spp.getUnit();
		String unit =sp.getUnitCode();
		String msg ="{'dataType':'"+dataType+"','unit':'"+unit+"','smlName':'"+smlName+"'}";
		return msg;
	}
	public void changeOutput(long id, int output){
		SmlTableField stf = smlTableFieldDao.get(id);
		stf.setOutput(output);
		log.info("changeOutput:更改输出状态");
	}
	public String modifyPartSML(String tableName,long partId,String tableHead, String smlValue,String dataType){
		double smlValueD =0;
		int smlValueI=0;
		tableName=tableName.replaceAll("-", "_");
		SmlTableField stf =smlTableFieldDao.findUnique("from SmlTableField stf where stf.tableName=? and stf.tableHead=?", tableName,tableHead);
		SmlParameterPool spp=stf.getSmlParameterPool();
		double maxValue =spp.getMaxValue();
		double minValue =spp.getMinValue();
		System.out.println(spp);
		if("INTEGER".equals(dataType)){
			try {
				 smlValueD = Double.parseDouble(smlValue);
				 smlValueI =(int)smlValueD;
			} catch (NullPointerException  e1) {
				e1.printStackTrace();
			} catch(NumberFormatException e2){
				return "请输入整数";
			}
			if(smlValueD != smlValueI){
				return "请输入整数";
			}
			if(smlValueI<minValue ||smlValueI>maxValue){
				return "输入值不在许可范围内，请重新输入";
			}
		}
		if("FLOAT".equals(dataType)){
			try {
				 smlValueD = Double.parseDouble(smlValue);
			} catch (NullPointerException  e1) {
				e1.printStackTrace();
			} catch(NumberFormatException e2){
				return "请输入数字";
			}
			
			if(smlValueD<minValue ||smlValueD>maxValue){
				return "输入值不在许可范围内，请重新输入";
			}
		}
		String updateSql="update "+tableName+" set "+tableHead+"='"+smlValue+"' where PART_ID="+partId;
		try {
			smlTableFieldDao.getSession().createSQLQuery(updateSql).executeUpdate();
		} catch (HibernateException e) {
			e.printStackTrace();
		}
		return "修改成功！";
	}
	
	public SmlTableFieldDao getSmlTableFieldDao() {
		return smlTableFieldDao;
	}
	@Autowired
	public void setSmlTableFieldDao(SmlTableFieldDao smlTableFieldDao) {
		this.smlTableFieldDao = smlTableFieldDao;
	}

	public PartDao getPartDao() {
		return partDao;
	}
	@Autowired
	public void setPartDao(PartDao partDao) {
		this.partDao = partDao;
	}
	
}
