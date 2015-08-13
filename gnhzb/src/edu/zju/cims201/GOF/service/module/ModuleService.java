package edu.zju.cims201.GOF.service.module;

import java.util.List;
import java.util.Set;

import org.springside.modules.orm.Page;

import edu.zju.cims201.GOF.hibernate.pojo.Component;
import edu.zju.cims201.GOF.hibernate.pojo.LcaModule;
import edu.zju.cims201.GOF.hibernate.pojo.LccModule;
import edu.zju.cims201.GOF.hibernate.pojo.Function;
import edu.zju.cims201.GOF.hibernate.pojo.Ioflow;
import edu.zju.cims201.GOF.hibernate.pojo.Modelflow;
import edu.zju.cims201.GOF.hibernate.pojo.BaseModule;
import edu.zju.cims201.GOF.hibernate.pojo.Node;
import edu.zju.cims201.GOF.hibernate.pojo.Nodecategory;
import edu.zju.cims201.GOF.hibernate.pojo.Nodetype;
import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.ProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;


public interface ModuleService {
	public List<Component> getLcaModuleComponentlist();
	public List<BaseModule> getModulelist(String parentid,String componentid,String moduletype);
	public List<Function> getfunctionlist();
	public BaseModule addModule(BaseModule m);
	public void saveprocess(ProcessTemplate m);
	public void addModuleandprocess(BaseModule m);
	public BaseModule getModule(String cpid,String pdid,String version);
	public  List<Ioflow> getioflow(boolean a,String processid,String componentid,String version,String moduleid);
	public  Ioflow getioflow(String id);
	public  ProcessTemplate getprocess(String processid, Integer moduleid);
	public PdmProcessTemplate getprocesstemplate(String id);
	public void addProcess(ProcessTemplate process);
	public void savenode(Node node);
	public List<Node> getnode();
	public void savefunction(Function function);
	
	public void deleteprocess(String id);
	public BaseModule getModule(String id);
	public void addnode(Node node);
	public List<Node> getnodelist();
	public List<Nodetype> getnodetypelist();
	public List<Nodecategory> getnodecategorylist();
	public List<Node> getNodeListByType(String nodetype,String nodecategory);
	public Page<ProcessTemplate> getMyProcesses(SystemUser user,Page<ProcessTemplate> page);
	public ProcessTemplate getProcessTemplatebyModuleandProcess(String moduleid, String processid);
	public List getmodulelistsbycomponnet(String id);
	public LcaModule getModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid);
	public int addPdmModuleandprocess(BaseModule m);
	public PdmModule getPdmModulebyparentandprocess(String parentlevelid,
			String processid,String parentmoduleid);
	public  ProcessTemplate getprocess(String processid, int moduleid);
	public  List getprocesslists(int moduleid);
	public List getProcessTemplateParamsByProcessTemplate(long id);
	
	

}
