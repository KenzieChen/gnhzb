package edu.zju.cims201.GOF.web.pdm;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javassist.expr.NewArray;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.util.Streams;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.util.CollectionUtils;
import org.stringtree.json.JSONWriter;

import edu.zju.cims201.GOF.hibernate.pojo.DomainTreeNode;
import edu.zju.cims201.GOF.hibernate.pojo.Material;
import edu.zju.cims201.GOF.hibernate.pojo.PdmModule;
import edu.zju.cims201.GOF.hibernate.pojo.PdmProcessTemplate;
import edu.zju.cims201.GOF.hibernate.pojo.RelatedModel;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.TreeNode;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.Employee;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;
import edu.zju.cims201.GOF.service.department.DepartmentService;
import edu.zju.cims201.GOF.service.module.ModuleService;
import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.service.tree.TreeService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;

@Namespace("/module")
@Results({ @Result(name = CrudActionSupport.RELOAD, location = "module.action", type = "redirect") })
public class ModuleAction extends CrudActionSupport<Material> implements
		ServletResponseAware, ServletRequestAware {
	private static final long serialVersionUID = 8683878162525847072L;

	@Resource(name = "moduleServiceImpl")
	private ModuleService moduleService;

	@Resource(name = "userServiceImpl")
	private UserService userServiceImpl;
	@Resource(name = "treeServiceImpl")
	private TreeService treeService;
	@Resource(name = "departmentServiceImpl")
	private DepartmentService departmentService;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private String modulename;
	private String modulenote;
	private String cellcollection;
	private String xmldata;
	private String moduletype;
	private String moduleid;
	private String processid;
	private String moduleuuid;
	private String parentmoduleid;
	private String superparentmoduleid;
	private String moduledata;

	public String getModuleuuid() {
		return moduleuuid;
	}

	public void setModuleuuid(String moduleuuid) {
		this.moduleuuid = moduleuuid;
	}

	PrintWriter out;

	public String addnewmodule() throws Exception {
		SystemUser sysuser = userServiceImpl.getUser();
		Employee user = departmentService.getEmployeebyuserid(sysuser.getId());
		String uuid = UUID.randomUUID().toString().trim();
		String path = "D:\\module\\PDM\\";
		File moduledir = new File(path + uuid);
		if (!moduledir.exists()) {
			moduledir.mkdirs();
		}
		PdmModule m = null;
		m = new PdmModule();
		m.setName(modulename);
		m.setCreateuserid(user.getId());
		m.setNote(modulenote);
		m.setCreatedate(new Date());
		m.setModuleUUID(uuid);
		m.setModuledir(path + uuid);
		m.setIsparent(1);
		int moduleid = moduleService.addPdmModuleandprocess(m);
		response.getWriter().println(moduleid);
		return null;
	}

	public Object getJSONvalueObject(String data) {
		Object datas;
		try {
			datas = JSONUtil.read(data);
		} catch (Exception e) {
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}
	


	public void addlevelmodule() throws Exception {
		PdmModule parent = (PdmModule) moduleService.getModule(moduleid);
		
		HashMap modulemap = (HashMap) getJSONvalueObject(moduledata);
		
		List levelList = (List) modulemap.get("alllevels");
		int length = levelList.size();
		for (int i = 0; i < length; i++) {
			HashMap levelmap = (HashMap) levelList.get(i);
			String levelid = levelmap.get("levelid").toString();
			String parentlevelid = levelmap.get("parentlevelid").toString();
			String parentcellid = levelmap.get("parentcellid").toString();
			PdmModule m = new PdmModule();
			String uuid = UUID.randomUUID().toString();
			String parentdir = parent.getModuledir();
			String xmlFileName = parentdir + "//" + uuid + ".xml";
			String xmldata=levelmap.get("xmldata").toString();
			saveXml(xmlFileName,xmldata);
			m.setName(parent.getName() + '_' + levelid);
			m.setCreatedate(new Date());
			m.setCreateuserid(parent.getCreateuserid());
			m.setModuleUUID(m.getModuleUUID());
			m.setModuledir(parentdir);
			m.setParent(parent);
			m.setLevelid(levelid);
			m.setParentlevelid(parentlevelid);
			m.setIsparent(0);
			if (parentcellid != null) {
				m.setProcessid(parentcellid);
			} else {
				m.setProcessid(null);
			}
			m.setXmlFileName(uuid + ".xml");
			List<HashMap> processlist = (List<HashMap>) levelmap
					.get("cellcollection");
			Set<PdmProcessTemplate> processTemplates = new HashSet<PdmProcessTemplate>();
			int n = processlist.size();
			for (int j = 0; j < n; j++) {
				PdmProcessTemplate p = new PdmProcessTemplate();
				HashMap h = processlist.get(j);
				String processid = String.valueOf(h.get("id"));
				p.setProcessid(processid);
				p.setName(String.valueOf(h.get("processname")));
				p.setNote(String.valueOf(h.get("processnote")));
				Set<ProcessTemplateIOParam> params=new HashSet<ProcessTemplateIOParam>();
				List<HashMap> InList = (List<HashMap>) h
						.get("Inparamlist");
				if(!CollectionUtils.isEmpty(InList)){
					for(HashMap h1:InList){
						String name=String.valueOf(h1.get("name"));
						String descri=String.valueOf(h1.get("descri"));
						ProcessTemplateIOParam param=new ProcessTemplateIOParam();
						param.setDescri(descri);
						param.setName(name);
						param.setIotype(1);
						params.add(param);
					}
				}
				List<HashMap> OutList = (List<HashMap>) h
						.get("Outparamlist");
				if(!CollectionUtils.isEmpty(OutList)){
					for(HashMap h2:OutList){
						String name=String.valueOf(h2.get("name"));
						String descri=String.valueOf(h2.get("descri"));
						ProcessTemplateIOParam param=new ProcessTemplateIOParam();
						param.setDescri(descri);
						param.setName(name);
						param.setIotype(0);
						params.add(param);
					}
				}
				p.setParams(params);
				p.setLevelmoduleid(String.valueOf(h.get("moduleid")));
				p.setParentmoduleid(String.valueOf(h.get("parentmoduleid")));
				p.setParentmodulename(String.valueOf(h.get("parentmodulename")));
				p.setPrevlevelmoduleid(String.valueOf(h.get("prevmoduleid")));
				p.setPrevlevelmodulename(String.valueOf(h.get("prevmodulename")));
				p.setNextlevelmoduleid(String.valueOf(h.get("nextmoduleid")));
				p.setNextlevelmodulename(String.valueOf(h.get("nextmodulename")));
//				List knowlegecategories = (List) h.get("knowledgecategorylist");
//				Set<RelatedModel> relatedmodels = new HashSet<RelatedModel>();
//				for (int k = 0; k < knowlegecategories.size(); k++) {
//
//					RelatedModel r = new RelatedModel();
//					r.setDomainNodeId(Long.valueOf(knowlegecategories.get(k)
//							.toString()));
//					relatedmodels.add(r);
//				}
//				p.setRelatedmodels(relatedmodels);
				String tasktreenodeid = String.valueOf(h.get("tasktreenodeid"));
				TaskTreeNode taskTreeNode = new TaskTreeNode();
				taskTreeNode.setId(Long.valueOf(tasktreenodeid));
				p.setTasktreenode(taskTreeNode);
				processTemplates.add(p);
			}
			m.setPdmprocessTemplates(processTemplates);
			moduleService.addPdmModuleandprocess(m);
		}

		//
		//
		//
		//
		// PdmModule parent=(PdmModule)moduleService.getModule(moduleid);
		// PdmModule m=new PdmModule();
		// String uuid = UUID.randomUUID().toString();
		// String parentdir=parent.getModuledir();
		// String xmlFileName=parentdir+"//"+uuid+".xml";
		// saveXml(xmlFileName);
		// m.setName(parent.getName()+'_'+levelid);
		// m.setCreatedate(new Date());
		// m.setCreateuserid(parent.getCreateuserid());
		// m.setModuleUUID(m.getModuleUUID());
		// m.setModuledir(parentdir);
		// m.setParent(parent);
		// m.setLevelid(levelid);
		// m.setParentlevelid(parentlevelid);
		// m.setIsparent(0);
		// if(parentcellid!=null){
		// m.setProcessid(parentcellid);
		// }else{
		// m.setProcessid(null);
		// }
		// m.setXmlFileName(uuid+".xml");
		// List<HashMap> processlist =getJSONvalue();
		// Set<PdmProcessTemplate> processTemplates=new
		// HashSet<PdmProcessTemplate>();
		// int n=processlist.size();
		// System.out.println("大小"+n);
		// for(int i=0;i<n;i++){
		// PdmProcessTemplate p=new PdmProcessTemplate();
		// HashMap h=processlist.get(i);
		// String processid=String.valueOf(h.get("id"));
		// p.setProcessid(processid);
		// p.setName(String.valueOf(h.get("processname")));
		// p.setNote(String.valueOf(h.get("processnote")));
		// p.setInput(String.valueOf(h.get("input")));
		// p.setOutput(String.valueOf(h.get("output")));
		// p.setOrderid(Integer.valueOf(h.get("orderid").toString()));
		// List knowlegecategories=(List)h.get("knowledgecategorylist");
		// Set<RelatedModel> relatedmodels=new HashSet<RelatedModel>();
		// for(int j=0;j<knowlegecategories.size();j++)
		// {
		//
		// RelatedModel r=new RelatedModel();
		// r.setDomainNodeId(Long.valueOf(knowlegecategories.get(j).toString()));
		// relatedmodels.add(r);
		// }
		// p.setRelatedmodels(relatedmodels);
		// String tasktreenodeid=String.valueOf(h.get("tasktreenodeid"));
		// TaskTreeNode taskTreeNode=new TaskTreeNode();
		// taskTreeNode.setId(Long.valueOf(tasktreenodeid));
		// System.out.println("任务树节点id"+tasktreenodeid);
		// p.setTasktreenode(taskTreeNode);
		// processTemplates.add(p);
		// }
		// m.setPdmprocessTemplates(processTemplates);
		// moduleService.addPdmModuleandprocess(m);
		// return null;
	}

	/*
	 * public String addmodule() throws Exception{ String uuid =
	 * UUID.randomUUID().toString(); String path="D:\\module\\"; File
	 * moduledir=new File(path+uuid); if(!moduledir.exists()){
	 * moduledir.mkdirs(); } String xmlFileName=path+uuid+"//"+uuid+".xml";
	 * saveXml(xmlFileName); BaseModule m=null; System.out.println(moduletype);
	 * if(moduletype.equals("PDM")){ m=new PdmModule(); m.setName(modulename);
	 * m.setNote(modulenote); m.setCreatedate(new Date());
	 * m.setModuleUUID(uuid); m.setModuledir(path+uuid);
	 * m.setXmlFileName(uuid+".xml"); System.out.println("pdm"); }else if
	 * (moduletype=="LCC"){
	 * 
	 * }else{
	 * 
	 * } List<HashMap> processlist =getJSONvalue(); Set<ProcessTemplate>
	 * processTemplates=new HashSet<ProcessTemplate>(); int
	 * n=processlist.size(); System.out.println(n); for(int i=0;i<n;i++){
	 * ProcessTemplate p=new ProcessTemplate(); HashMap h=processlist.get(i);
	 * String processid=String.valueOf(h.get("id"));
	 * p.setProcessid(Integer.valueOf(processid)); Node node=new Node(); String
	 * nodeid=String.valueOf(h.get("nodeid"));
	 * node.setId(Integer.valueOf(nodeid)); p.setNode(node);
	 * p.setName(String.valueOf(h.get("processname"))); processTemplates.add(p);
	 * String tasktreenodeid=String.valueOf(h.get("tasktreenodeid"));
	 * TaskTreeNode taskTreeNode=new TaskTreeNode();
	 * taskTreeNode.setId(Long.valueOf(tasktreenodeid));
	 * p.setTasktreenode(taskTreeNode); }
	 * m.setProcessTemplates(processTemplates);
	 * moduleService.addModuleandprocess(m); return null; }
	 */
	public String saveXml(String xmlFileName,String xmldata) throws Exception {
		byte[] xmldatas = xmldata.getBytes("UTF-8");
		File xmlData = new File(xmlFileName);
		FileOutputStream outputStream = new FileOutputStream(xmlData);
		outputStream.write(xmldatas);
		return null;
	}

	public List<HashMap> getJSONvalue() {
		// JSONUtil jr = new JSONUtil();
		List<HashMap> datas;
		try {
			datas = (List) JSONUtil.read(cellcollection);
		} catch (Exception e) {
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}

	public List<HashMap> getknowledgecategoryJSONvalue() {
		// JSONUtil jr = new JSONUtil();
		List<HashMap> datas;
		try {
			datas = (List) JSONUtil.read(cellcollection);
		} catch (Exception e) {
			System.out.println("jason解析错误");
			e.printStackTrace();
			return null;
		}
		return datas;
	}

	public String getModuletree() throws IOException {
		List mlist = null;
		mlist = moduleService.getModulelist(null, null, "PDM");
		List<Map<String, Object>> mtlist = new ArrayList<Map<String, Object>>();
		ObjectMapper objectMapper = new ObjectMapper();
		if (!(mlist == null)) {
			for (int i = 0; i < mlist.size(); i++) {
				PdmModule m = (PdmModule) mlist.get(i);
				Map<String, Object> rootMap = new HashMap<String, Object>();
				rootMap.put("id", m.getId());
				rootMap.put("superparentid", m.getParent().getId());
				rootMap.put("moduledir", m.getModuledir());
				rootMap.put("createuserid", m.getCreateuserid());
				rootMap.put("createdate", m.getCreatedate().toString());
				rootMap.put("moduleuuid", m.getModuleUUID());
				rootMap.put("name", m.getParent().getName());
				rootMap.put("note", m.getParent().getName());
				rootMap.put("xmlfilename", m.getXmlFileName());
				rootMap.put("version", m.getVersion());
				rootMap.put("children", "");
				mtlist.add(rootMap);

			}
			objectMapper.writeValue(response.getWriter(), mtlist);
		}
		return null;
	}

	public void getsubmodule() throws IOException {
		System.out.println(parentmoduleid);
		PdmModule parent = (PdmModule) moduleService.getModule(parentmoduleid);
		String parentlevelid = parent.getLevelid();
		System.out.println(parentlevelid);
		PdmModule m = (PdmModule) moduleService.getPdmModulebyparentandprocess(
				parentlevelid, processid, superparentmoduleid);
		if (m == null) {
		} else {
			response.getWriter().println(m.getId());
		}
	}

	public void downloadXML() throws IOException {
		PdmModule m = (PdmModule) moduleService.getModule(moduleid);
		String filename = m.getModuledir() + File.separator
				+ m.getXmlFileName();
		File file = new File(filename);
		response.reset();
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");

		response.setDateHeader("Expires", 0);
		response.setContentType("application/x-msdownload;charset=UTF-8");
		response.setHeader("Content-disposition", "attachment;filename=\""
				+ new String(filename.getBytes(), "ISO_8859_1") + "\"");
		response.setContentLength((int) file.length());

		BufferedInputStream bis = new BufferedInputStream(new FileInputStream(
				file));
		BufferedOutputStream bos = new BufferedOutputStream(
				response.getOutputStream());

		Streams.copy(bis, bos, true);

	}

	public String getmoduleprocesscontent() throws IOException {
		PdmProcessTemplate pt = (PdmProcessTemplate) moduleService.getprocess(
				processid, Integer.valueOf(moduleid));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", pt.getName());
		map.put("note", pt.getNote());
		List<ProcessTemplateIOParam> params=moduleService.getProcessTemplateParamsByProcessTemplate(pt.getId());
		List<HashMap<String, String>> Inparamlist=new ArrayList<HashMap<String, String>>();
		List<HashMap<String, String>> Outparamlist=new ArrayList<HashMap<String, String>>();
		for(ProcessTemplateIOParam param:params){
			HashMap<String, String> parammap=new HashMap<String, String>();
			parammap.put("descri", param.getDescri());
			parammap.put("isarray", String.valueOf(param.getIsarray()));
			parammap.put("name", param.getName());
			if(param.getIotype()==1){
				parammap.put("type", "1");
				Inparamlist.add(parammap);
			}else{
				parammap.put("type", "0");
				Outparamlist.add(parammap);
			}
		}
		map.put("Inparamlist", Inparamlist);
		map.put("Outparamlist", Outparamlist);
		map.put("tasktreenodeid", pt.getTasktreenode().getId());
		map.put("tasktreenodename", pt.getTasktreenode().getNodeName());
		map.put("moduleid", pt.getLevelmoduleid());
		map.put("parentmoduleid", pt.getParentmoduleid());
		map.put("parentmodulename", pt.getParentmodulename());
		map.put("prevmoduleid", pt.getPrevlevelmoduleid());
		map.put("prevmodulename", pt.getPrevlevelmodulename());
		map.put("nextmoduleid", pt.getNextlevelmoduleid());
		map.put("nextmodulename", pt.getNextlevelmodulename());
		
//		Set<RelatedModel> relatedmodels = pt.getRelatedmodels();
//		Iterator it = relatedmodels.iterator();
//		String categorynames = "";
//		while (it.hasNext()) {
//			RelatedModel r = (RelatedModel) it.next();
//			TreeNode a = treeService.getTreeNode(r.getDomainNodeId());
//			categorynames = categorynames + a.getNodeName() + ";";
//		}
//		categorynames = categorynames.substring(0, categorynames.length() - 1);
//		map.put("categorynames", categorynames);
		JSONWriter writer = new JSONWriter();
		String ktypestring = writer.write(map);
		response.getWriter().println(ktypestring);
		return null;
	}

	/*
	 * public void getProcessTaskTreeNode() throws IOException{ ProcessTemplate
	 * p=moduleService.getprocess(processid, Integer.valueOf(moduleid));
	 * Map<String, Object> map = new HashMap<String, Object>(); map.put("id",
	 * p.getTasktreenode().getId()); map.put("name",
	 * p.getTasktreenode().getNodeName()); String result=JSONUtil.write(map);
	 * response.getWriter().println(result);
	 * 
	 * }
	 */
	// 获得所有的模型
	/*
	 * public String getModuletree() throws IOException{ List mlist =null;
	 * mlist=moduleService.getModulelist(null,null,moduletype); List<Map<String,
	 * Object>> mtlist = new ArrayList<Map<String, Object>>(); ObjectMapper
	 * objectMapper = new ObjectMapper(); if (!(mlist==null)){ for(int
	 * i=0;i<mlist.size();i++){ PdmModule m=(PdmModule)mlist.get(i); Map<String,
	 * Object> rootMap = new HashMap<String, Object>(); rootMap.put("id",
	 * m.getId()); rootMap.put("Moduledir", m.getModuledir());
	 * rootMap.put("Createuserid", m.getCreateuserid());
	 * rootMap.put("Createdate", m.getCreatedate().toString());
	 * rootMap.put("ModuleUUID", m.getModuleUUID()); rootMap.put("Name",
	 * m.getName()); rootMap.put("Note", m.getNote());
	 * rootMap.put("XmlFileName", m.getXmlFileName()); rootMap.put("Version",
	 * m.getVersion()); rootMap.put("children", ""); mtlist.add(rootMap);
	 * 
	 * } objectMapper.writeValue(response.getWriter(), mtlist); } return null; }
	 * 
	 * 
	 * 
	 * public String getfunctionsbyprocessid() throws IOException{
	 * ProcessTemplate
	 * p=moduleService.getNodebyModuleandProcess(moduleid,processid); Node
	 * node=p.getNode(); Set<Function> functions=node.getFunctions();
	 * List<Function> functionlist=new ArrayList<Function>(); Iterator
	 * it=functions.iterator(); while(it.hasNext()){ Function
	 * f=(Function)it.next(); functionlist.add(f); } JSONWriter writer = new
	 * JSONWriter(); String functionstring=writer.write(functionlist);
	 * response.getWriter().println(functionstring); s
	 * 
	 * return null; }
	 */
	public Material getModel() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		// TODO Auto-generated method stub
		this.request = arg0;

	}

	public void setServletResponse(HttpServletResponse arg0) {
		// TODO Auto-generated method stub
		this.response = arg0;

	}

	@Override
	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String input() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void prepareModel() throws Exception {
		// TODO Auto-generated method stub

	}

	/*
	 * public String adddata() throws IOException { List<HashMap> datas
	 * =getJSONvalue(); int n=datas.size();
	 * System.out.println(componentid+pdid+version); BaseModule module
	 * =moduleService.getModule(componentid,pdid,version); if (module==null){
	 * BaseModule m =new BaseModule(); BaseModule parent
	 * =moduleService.getModule(null,pdid,version); Component
	 * component=componentService.getComponent(Integer.valueOf(componentid));
	 * m.setComponent(component); m.setName(parent.getName());
	 * m.setNote(parent.getNote()); m.setCreatedate(new Date());
	 * m.setParent(parent); m.setVersion(parent.getVersion());
	 * moduleService.addModule(m); BaseModule m2=moduleService.addModule(m);
	 * ProcessTemplate process=new ProcessTemplate();
	 * process.setProcessid(Integer.valueOf(processid)); process.setModule(m2);
	 * process.setName(processname); moduleService.addProcess(process);
	 * ProcessTemplate p=moduleService.getprocess(processid, m2.getId());
	 * for(int i=0;i<n;i++){ Modelflow a=new Modelflow(); HashMap
	 * h=datas.get(i); String id=String.valueOf(h.get("id")); Ioflow
	 * ioflow=moduleService.getioflow(id); a.setFlow(ioflow);
	 * a.setType("input"); a.setProcess(p); moduleService.saveModelflow(a); }
	 * }else{ ProcessTemplate process=new ProcessTemplate();
	 * process.setProcessid(Integer.valueOf(processid));
	 * process.setModule(module); process.setName(processname);
	 * moduleService.addProcess(process); ProcessTemplate
	 * p=moduleService.getprocess(processid, module.getId()); for(int
	 * i=0;i<n;i++){ Modelflow a=new Modelflow(); HashMap h=datas.get(i); String
	 * id=String.valueOf(h.get("id")); Ioflow
	 * ioflow=moduleService.getioflow(id); a.setFlow(ioflow);
	 * a.setType("input"); a.setProcess(p); moduleService.saveModelflow(a); }
	 * 
	 * }
	 * 
	 * return null;
	 * 
	 * }
	 */
	public ModuleService getModuleService() {
		return moduleService;
	}

	public void setModuleService(ModuleService moduleService) {
		this.moduleService = moduleService;
	}

	public String getModulename() {
		return modulename;
	}

	public void setModulename(String modulename) {
		this.modulename = modulename;
	}

	public String getModulenote() {
		return modulenote;
	}

	public void setModulenote(String modulenote) {
		this.modulenote = modulenote;
	}

	public String getCellcollection() {
		return cellcollection;
	}

	public void setCellcollection(String cellcollection) {
		this.cellcollection = cellcollection;
	}

	public String getXmldata() {
		return xmldata;
	}

	public void setXmldata(String xmldata) {
		this.xmldata = xmldata;
	}

	public String getModuletype() {
		return moduletype;
	}

	public void setModuletype(String moduletype) {
		this.moduletype = moduletype;
	}

	public PrintWriter getOut() {
		return out;
	}

	public void setOut(PrintWriter out) {
		this.out = out;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getModuleid() {
		return moduleid;
	}

	public void setModuleid(String moduleid) {
		this.moduleid = moduleid;
	}

	public String getProcessid() {
		return processid;
	}

	public void setProcessid(String processid) {
		this.processid = processid;
	}

	public String getParentmoduleid() {
		return parentmoduleid;
	}

	public void setParentmoduleid(String parentmoduleid) {
		this.parentmoduleid = parentmoduleid;
	}

	public String getSuperparentmoduleid() {
		return superparentmoduleid;
	}

	public void setSuperparentmoduleid(String superparentmoduleid) {
		this.superparentmoduleid = superparentmoduleid;
	}

	public UserService getUserServiceImpl() {
		return userServiceImpl;
	}

	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}

	public DepartmentService getDepartmentService() {
		return departmentService;
	}

	public void setDepartmentService(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}

	public String getModuledata() {
		return moduledata;
	}

	public void setModuledata(String moduledata) {
		this.moduledata = moduledata;
	}

}
