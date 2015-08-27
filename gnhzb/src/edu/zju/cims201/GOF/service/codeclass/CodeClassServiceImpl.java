package edu.zju.cims201.GOF.service.codeclass;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.apache.commons.logging.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.classificationtree.ClassificationTreeDao;
import edu.zju.cims201.GOF.dao.codeclass.CodeClassDao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;


@Service
@Transactional
public class CodeClassServiceImpl implements CodeClassService{
	private CodeClassDao codeClassDao;
	private ClassificationTreeDao classificationTreeDao; 
	
	
	public CodeClassDao getCodeClassDao() {
		return codeClassDao;
	}
	
	@Autowired
	public void setCodeClassDao(CodeClassDao codeClassDao) {
		this.codeClassDao = codeClassDao;
	}
	public ClassificationTreeDao getClassificationTreeDao() {
		return classificationTreeDao;
	}
	@Autowired
	public void setClassificationTreeDao(ClassificationTreeDao classificationTreeDao) {
		this.classificationTreeDao = classificationTreeDao;
	}
	
	public void saveCodeClass(CodeClass codeClass) {
	
		codeClassDao.save(codeClass);
		
	}

	/**
	 * 获取所有编码大类
	 */
	public List<CodeClass> findAll() {
		
		// TODO Auto-generated method stub
		List<CodeClass> ccs = codeClassDao.getAll();		
		return ccs;
	}
	/**
	 * 根据大类的名称获得唯一的编码大类
	 */
	public CodeClass findUniqueByClassName(String value) {
		// TODO Auto-generated method stub
		CodeClass cc = codeClassDao.findUniqueBy("classname", value);
		return cc;
	}
	/**
	 * 根据大类的编码获得唯一的编码大类
	 */
	public CodeClass findUniqueByClassCode(String value) {
		// TODO Auto-generated method stub
		CodeClass cc = codeClassDao.findUniqueBy("classcode", value);
		return cc;
	}
	/**
	 * 根据大类的规则获得唯一的编码大类
	 */
	public CodeClass findUniqueByRule(String value) {
		// TODO Auto-generated method stub
		CodeClass cc = codeClassDao.findUniqueBy("rule", value);
		return cc;
	}
	/**
	 * 根据大类的ID删除编码大类
	 */
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		codeClassDao.delete(id);
	}
	/**
	 * 根据大类的id更新编码大类的首字段
	 * @param id  编码大类ID
	 * @param classname 大类名称
	 * @param classcode 大类编码
	 * @param codehead 大类的首字段
	 */
	public void updateById(Long id,String classname,String classcode,String codehead) {
		// TODO Auto-generated method stub
		CodeClass cc=codeClassDao.findUniqueBy("id", id);
		String[] list=cc.getRule().split("-");
		
		list[0]=codehead;
		StringBuffer rule=new StringBuffer();
        for(int i=0;i<list.length;i++){
             if(i==(list.length-1)){
                 rule.append(list[i]);
             }else{
                 rule.append(list[i]).append("-");
             }
        }
		cc.setClassname(classname);
		cc.setClasscode(classcode);
		cc.setRule(rule.toString());
		cc.setFlag(0);
		codeClassDao.save(cc);
		
	}
	/**
	 * 根据大类的编码获取大类的规则
	 */
	public String getRuleByClassCode(String classcode) {
		// TODO Auto-generated method stub
		CodeClass cc=codeClassDao.findUniqueBy("classcode", classcode);
		String ruleStr=cc.getRule();
		String[] ruleAra=ruleStr.split("-");
		StringBuilder sb =new StringBuilder();
		sb.append("[");
		for(int i =0;i<ruleAra.length;i++){
			sb.append("{'text':'");
			if(i==0){
				sb.append("分类码 首字段："+ruleAra[i]);
			}else{
				sb.append("分类码 第【"+i+"】层");
				if(ruleAra[i].startsWith("C")){
					sb.append(" 字符型，长度：");
					sb.append(ruleAra[i].substring(1));
				}else if(ruleAra[i].startsWith("N")){
					sb.append(" 数字，长度：");
					sb.append(ruleAra[i].substring(1));
				}else if(ruleAra[i].startsWith("B")){
					sb.append(" 混合型，长度：");
					sb.append(ruleAra[i].substring(1));
				}
			}
			sb.append("','value':'"+i+":"+ruleAra[i]+"'},");
		}
		String rule=sb.toString().substring(0, sb.lastIndexOf(","));
		rule =rule+"]";
		System.out.println(rule);
		return rule;

	}

	/**
	 * 根据大类的编码新增大类的规则层
	 * @param classcode 大类的编码
	 * @param encodetype 某一规则层型号 C、N、B分别代表字符型、数字型、混合型
	 * @param codelength 型号的长度
	 */
	public void updateRuleByClassCode(String classcode, String encodetype,
			String codelength) {
		// TODO Auto-generated method stub
		CodeClass cc=codeClassDao.findUniqueBy("classcode", classcode);
		String rule=cc.getRule()+"-"+encodetype+codelength;
		cc.setRule(rule);
		codeClassDao.save(cc);
	}
	
	/**
	 * 根据大类的编码修改大类的某一规则层
	 * @param classcode 大类的编码
	 * @param encodetype 某一规则层型号 C、N、B分别代表字符型、数字型、混合型
	 * @param codelength 型号的长度
	 * @param ruleLayerNub 所属规则层的层号
	 */
	public void updateRuleByClassCode2(String classcode, String encodetype,
			String codelength, int ruleLayerNub) {
		// TODO Auto-generated method stub
		CodeClass cc =codeClassDao.findUniqueBy("classcode", classcode);
		String[] ruleNodList=cc.getRule().split("-");
		ruleNodList[ruleLayerNub]=encodetype+codelength;
		StringBuilder sb =new StringBuilder();
		for(int i =0;i<ruleNodList.length;i++){
			if(i==ruleNodList.length-1){
				sb.append(ruleNodList[i]);
			}else{
				sb.append(ruleNodList[i]).append("-");
			}
		}
		cc.setRule(sb.toString());
		codeClassDao.save(cc);
		
	}
	/**
	 * 根据大类的编码删除大类的某一规则层
	 * @param classcode 大类编码
	 * @param ruleLayerNub 所属规则层的层号
	 */
	public void deleteRuleNodByClassCode(String classcode, int ruleLayerNub) {
		// TODO Auto-generated method stub
		CodeClass cc =codeClassDao.findUniqueBy("classcode", classcode);
		String[] ruleNodList=cc.getRule().split("-");
		StringBuilder sb= new StringBuilder();
		if(ruleLayerNub==ruleNodList.length-1){
			for(int i =0;i<ruleNodList.length-1;i++){
				if(i==ruleNodList.length-2){
					sb.append(ruleNodList[i]);
				}else{
					sb.append(ruleNodList[i]).append("-");
				}
				
			}
		}else{
			for(int i =0;i<ruleNodList.length;i++){
				if(i==ruleLayerNub){
					continue;
				}
				if(i==ruleNodList.length-1){
					sb.append(ruleNodList[i]);
				}else{
					sb.append(ruleNodList[i]).append("-");
				}
				
			}
		}
		
		cc.setRule(sb.toString());
		codeClassDao.save(cc);
		
	}
	/**
	 * 获取所有已经建立大类结构的编码大类
	 */
	public List<CodeClass> findConstructed() {
		// TODO Auto-generated method stub
		List<CodeClass> ccs =codeClassDao.getAll();
		List<CodeClass> ccs2 =new ArrayList<CodeClass>();
		for(int i =0;i<ccs.size();i++){
			if(ccs.get(i).getFlag()==0){
				continue;
			}
			ccs2.add(ccs.get(i)); 
		}
		return ccs2;
	}
	/**
	 * 获取所有未建立大类结构的编码大类
	 */
	public List<CodeClass> findUnConstructed() {
		// TODO Auto-generated method stub
		List<CodeClass> ccs =codeClassDao.getAll();
		List<CodeClass> ccs2 =new ArrayList<CodeClass>();;
		for(int i =0;i<ccs.size();i++){
			if(ccs.get(i).getFlag()==1){
				continue;
			}
			ccs2.add(ccs.get(i)); 
		}
		return ccs2;
	}
	/**
	 * 根据大类的编码为某一编码大类建立大类结构
	 * @param classcode 大类的编码
	 */
	public ClassificationTree addConstructedByCodeClass(String classcode) {
		// TODO Auto-generated method stub
		CodeClass cc =codeClassDao.findUniqueBy("classcode", classcode);
		cc.setFlag(1);
		
		ClassificationTree cTree = new ClassificationTree();
		cTree.setUuid(UUID.randomUUID().toString());
		cTree.setCodeClass(cc);
		cTree.setClassCode(cc.getClasscode());
		cTree.setText(cc.getClassname());
		cTree.setLeaf(1);
		cTree.setCode(cc.getRule().split("-")[0]);
		codeClassDao.save(cc);
		classificationTreeDao.save(cTree);
		return cTree;
	}
	/**
	 * 删除编码大类的大类结构(待完善)
	 * @param classcode 大类编码，根据它找到大类并更新状态
	 */
	public void deleteConstructedByCodeClass(String classcode) {
		// TODO Auto-generated method stub
		CodeClass cc =codeClassDao.findUniqueBy("classcode", classcode);
		cc.setFlag(0);
		//为什么不行？
		//classificationTreeDao.batchExecute("delete from ClassificationTree ct where ct.codeClass.classcode ='"+classcode+"'");
		List<ClassificationTree> list=classificationTreeDao.find("from ClassificationTree ct where ct.codeClass.classcode ='"+classcode+"'");
		for(ClassificationTree ct:list){
			classificationTreeDao.delete(ct);
		}
		codeClassDao.save(cc);
	}

	
	public List<CodeClass> findById(long id){
		List<CodeClass> cc = codeClassDao.findBy("id", id);
		return cc;
	}

	/**
	 * luweijiang
	 */
	public CodeClass findUnConstructedCodeClassById(long id) {
		CodeClass cc=codeClassDao.findUniqueBy("id", id);
		
		return cc;
	}

	public CodeClass findCodeClassById(long id) {
		CodeClass cc=codeClassDao.findUniqueBy("id", id);
		return cc;
	}


	public HashMap<String, Object> getRuleByCodeClassId(long id) {
		CodeClass cc=codeClassDao.get(id);
		String className = cc.getClassname();
		String ruleStr=cc.getRule();
		String[] ruleAra=ruleStr.split("-");
		StringBuilder sb =new StringBuilder();
		sb.append("[");
		for(int i =0;i<ruleAra.length;i++){
			sb.append("{'text':'");
			if(i==0){
				sb.append("分类码 首字段："+ruleAra[i]);
			}else{
				sb.append("分类码 第【"+i+"】层");
				if(ruleAra[i].startsWith("C")){
					sb.append(" 字符型，长度：");
					sb.append(ruleAra[i].substring(1));
				}else if(ruleAra[i].startsWith("N")){
					sb.append(" 数字，长度：");
					sb.append(ruleAra[i].substring(1));
				}else if(ruleAra[i].startsWith("B")){
					sb.append(" 混合型，长度：");
					sb.append(ruleAra[i].substring(1));
				}
			}
			sb.append("','value':'"+i+":"+ruleAra[i]+"'},");
		}
		String rule=sb.toString().substring(0, sb.lastIndexOf(","));
		rule =rule+"]";
		System.out.println(rule);
		HashMap<String,Object> data = new HashMap<String,Object>();
		data.put("className",className);
		data.put("rule", rule);
		return data;
	}
	
}
