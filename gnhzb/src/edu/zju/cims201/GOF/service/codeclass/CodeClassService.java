package edu.zju.cims201.GOF.service.codeclass;

import java.util.HashMap;
import java.util.List;

import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;

public interface CodeClassService{
	
	public void saveCodeClass(CodeClass codeClass);
	public  CodeClass findUniqueByClassName(String value);
	public  CodeClass findUniqueByClassCode(String value);
	public  CodeClass findUniqueByRule(String value);
	public List<CodeClass> findAll();
	public List<CodeClass> findConstructed();
	public List<CodeClass> findUnConstructed();
	public ClassificationTree addConstructedByCodeClass(String classcode);
	public void deleteConstructedByCodeClass(String classcode);
	public  void deleteById(Long id);
	public void updateById(Long id,String classname,String classcode,String codehead);
	public String getRuleByClassCode(String classcode);
	public void updateRuleByClassCode(String classcode,String encodetype,String codelength);
	public void updateRuleByClassCode2(String classcode,String encodetype,String codelength,int ruleLayerNub);
	public void deleteRuleNodByClassCode(String classcode,int ruleLayerNub);
	public List<CodeClass> findById(long id);
	
	/*luweijiang*/
	public CodeClass findUnConstructedCodeClassById(long id);
	public CodeClass findCodeClassById(long id);
	
	public HashMap<String, Object> getRuleByCodeClassId(long id);
	
}
