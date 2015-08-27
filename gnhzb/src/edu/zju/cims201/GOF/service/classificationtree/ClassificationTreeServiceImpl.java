package edu.zju.cims201.GOF.service.classificationtree;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;

import org.apache.commons.lang.xwork.ArrayUtils;
import org.apache.commons.lang.xwork.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.classificationtree.ClassificationTreeDao;
import edu.zju.cims201.GOF.dao.codeclass.CodeClassDao;
import edu.zju.cims201.GOF.dao.draft.TreeDraftDao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.CodeClass;
import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.PartDraft;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;
import edu.zju.cims201.GOF.util.CoderUtils;
import edu.zju.cims201.GOF.util.Constants;

@Service
@Transactional
public class ClassificationTreeServiceImpl implements ClassificationTreeService{

	private ClassificationTreeDao classificationTreeDao;
	private CodeClassDao codeClassDao;
	private TreeDraftDao treeDraftDao;

	public ClassificationTreeDao getClassificationTreeDao() {
		return classificationTreeDao;
	}
	@Autowired
	public void setClassificationTreeDao(ClassificationTreeDao classificationTreeDao) {
		this.classificationTreeDao = classificationTreeDao;
	}
	public CodeClassDao getCodeClassDao() {
		return codeClassDao;
	}
	@Autowired
	public void setCodeClassDao(CodeClassDao codeClassDao) {
		this.codeClassDao = codeClassDao;
	}
	/**
	 * 获得所有大类结构
	 */
	
	public List<ClassificationTree> getClassStruct() {
		// TODO Auto-generated method stub
		List<ClassificationTree> childrenRe =new ArrayList<ClassificationTree>();
		List<ClassificationTree> children =classificationTreeDao.find("from ClassificationTree ct where ct.parent.id=null");
		for(int i =0;i<children.size();i++){
			ClassificationTree ct =new ClassificationTree();
			//这里讲ct从持久化状态变为游离状态，分离与数据库的联系，防止事务的时候修改的ct又保存到数据库中
			
			ct=children.get(i);
			classificationTreeDao.getSession().evict(ct);
			ct.setChildren(null);
			ct.setParent(null);
			ct.setCodeClass(null);
			childrenRe.add(ct);
		}
		return childrenRe;
	}
	
	public TreeDraftDao getTreeDraftDao() {
		return treeDraftDao;
	}
	@Autowired
	public void setTreeDraftDao(TreeDraftDao treeDraftDao) {
		this.treeDraftDao = treeDraftDao;
	}
	/**
	 * 获得所有大类结构（用于接口服务客户端)
	 */
	public List<ClassificationTree> getClassStruct2() {
		// TODO Auto-generated method stub
		List<ClassificationTree> children =classificationTreeDao.find("from ClassificationTree ct where ct.parent.id=null");
		for(ClassificationTree node :children){
			addChildrenByRecursion(node);
		}
		return children;
	}
	
	/**
	 * 用于解决懒加载问题，提前把children都读出来
	 * @param parent
	 */
	private void addChildrenByRecursion(ClassificationTree parent){
		List<ClassificationTree> children = parent.getChildren();
		//parent.setChildren(children);
		for(ClassificationTree child:children){
			addChildrenByRecursion(child);
		}
	}
	/**
	 * 获得所有大类结构（用于接口服务客户端)
	 * 与public List<ClassificationTree> getClassStruct2()的效果相似，返回的是字符串
	 */
	public String getClassStruct3() {
		// TODO Auto-generated method stub
		List<ClassificationTree> children = classificationTreeDao.find("from ClassificationTree ct where ct.parent.id=null and ct.lockTree = 1");
		JSONArray jsArr = new JSONArray();
		//ClassificationTree中有属性自关联，配置JsonConfig，读取自关联
		//防止net.sf.json.JSONException: There is a cycle in the hierarchy!
		JsonConfig jsonConfig = new JsonConfig(); //建立配置文件
		jsonConfig.setIgnoreDefaultExcludes(false); //设置默认忽略
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT); 
		jsArr.addAll(children,jsonConfig);
		return jsArr.toString();
	}
	
	/**
	 * 根据父节点的id和大类编码获取父节点下面的子节点
	 * @param pid 父节点id
	 */
	public List<ClassificationTree> getChildrenNode(Long pid) {
		// TODO Auto-generated method stub
		List<ClassificationTree> childrenRe =new ArrayList<ClassificationTree>();
		List<ClassificationTree> children =classificationTreeDao.find("from ClassificationTree ct where ct.parent.id="+pid);
		for(int i =0;i<children.size();i++){
			ClassificationTree ct =new ClassificationTree();
			ct=children.get(i);
			classificationTreeDao.getSession().evict(ct);
			ct.setChildren(null);
			ct.setParent(null);
			ct.setCodeClass(null);
			childrenRe.add(ct);
		}
		return childrenRe;
	}
	/**
	* @param pid 父节点id
	* @param ct 要添加的节点对象，传入对象之前要对其增加leaf/text/classDes
	* @return 提示信息
	*/
	public String insertTreeNode(Long pid,ClassificationTree ct) {
		// TODO Auto-generated method stub
		//ClassificationTree exist =classificationTreeDao.findUniqueBy("text", ct.getText());
		//if(exist!=null){
		//	return "分类名称已经存在，请选择其他名称！";
		//}else{
			ClassificationTree parent=classificationTreeDao.findUniqueBy("id", pid);
			CodeClass cc =codeClassDao.findUniqueBy("id", parent.getCodeClass().getId());
			String[] ruleArray =cc.getRule().split("-");
			String[] codeArray =parent.getCode().split("-");
			int len = codeArray.length;
			String thisLayer="";
			try {
				thisLayer = ruleArray[len];
			} catch (Exception e) {
				return "该层没有定义编码规则，请先定义该层编码规则！";
			}
			
			//子节点类型
			char k ='A';
			if(thisLayer==null || thisLayer.equals("")){
				return "该层没有定义编码规则，请先定义该层编码规则！";
			}else{
				k =thisLayer.charAt(0);
			}
			char[] thisLayerArray =thisLayer.toCharArray();
			char[] length =ArrayUtils.remove(thisLayerArray, 0);	 //如果是['n','1','2']			
			String lengthStr =new String(length); 						//就变成"12"
			//子节点类型长度
			int le;
			if(StringUtils.isNumeric(lengthStr)){
				le = Integer.parseInt(lengthStr);
			}else{
				le=0;
				return "该层没有定义编码规则，请先定义该层编码规则！";
			}
			//得到子节点段的分类码
			String nodeCode ="";
			//1、得到完整的子节点分类码
			String newCode ="";
			String leaf =parent.getLeaf().toString();
			if("1".equals(leaf) || leaf.equals("1")){
				//父节点是叶子节点
				switch(k){
					case 'B':
							nodeCode =CoderUtils.NumDefault(le);
							break;
					case 'N':
							nodeCode =CoderUtils.NumDefault(le);
							break;
					case 'C':
							nodeCode =CoderUtils.CharDefault(le);
							break;
					default:
						nodeCode ="XXXXXXX";
				}
				
				newCode =parent.getCode()+"-"+nodeCode;
				//添加子节点后父节点变为非叶子节点
				parent.setLeaf(0);
			}else{
				String lastChildCode =parent.getLastChildCode();
				String [] childArray =lastChildCode.split("-");
				int childlen =childArray.length;
				String theCode =childArray[childlen-1];
				
				switch(k){
					case 'B':
							nodeCode =CoderUtils.BleCode(theCode);
							break;
					case 'N':
							nodeCode =CoderUtils.NumCode(theCode);
							break;
					case 'C':
							nodeCode =CoderUtils.CharCode(theCode);
							break;
					default:
						nodeCode ="XXXXXXX";
				}
				newCode =parent.getCode()+"-"+nodeCode;
				
			}
			//2、设置子节点的code
			ct.setCode(newCode);
			ct.setParent(parent);
			//3、设置树节点所属的编码大类
			ct.setCodeClass(cc);
			ct.setClassCode(parent.getClassCode());
			//4、更新父节点的lastChildCode属性
			parent.setLastChildCode(newCode);
			
			classificationTreeDao.save(parent);
			classificationTreeDao.save(ct);
		//}

		return "添加子节点成功！";
	}
	/**
	 * 删除子节点（待完善）
	 * @param id 节点的id
	 * @return 提示信息
	 */
	public String deleteTreeNode(Long id) {
		// TODO Auto-generated method stub
		ClassificationTree cTree =classificationTreeDao.findUniqueBy("id", id);
		ClassificationTree parent =cTree.getParent();
		int childrenCount =parent.getChildren().size();
		if(cTree.getLeaf()==0){
			return "请先删除其子节点";
		}
		if(childrenCount>1){
			//应该更新子节点的最新规则，classificationTreeDaofindUnique(from ClassificationTree ct where ct.lastChildCode=(select max(t.lastChildCode) from ClassificationTree t));
			classificationTreeDao.delete(cTree);
			//有事物特性表的话还要删除事物特性表
		}else if(childrenCount==1){
			classificationTreeDao.delete(cTree);
			parent.setLeaf(1);
			//由于没有子节点了，故将lastchildcode设置为null
			parent.setLastChildCode(null);
			classificationTreeDao.save(parent);
		}else{
			return "程序后台数据出错，请联系系统管理员！";
		}
		return "删除子节点成功！";
	}
	/**
	 * 根据节点id获得编码分类树节点
	 * @param id  节点id
	 */
	public ClassificationTree getNode(Long id) {
		// TODO Auto-generated method stub
		ClassificationTree cTree =classificationTreeDao.findUniqueBy("id", id);
		return cTree;
	}
	/**
	 * 更新节点的分类信息
	 */
	public String updateClassDes(Long id,String classDes) {
		// TODO Auto-generated method stub
		ClassificationTree cTree =classificationTreeDao.findUniqueBy("id", id);
		cTree.setClassDes(classDes);
		classificationTreeDao.save(cTree);
		return "修改成功！";
	}
	/**
	 * 更新节点的编码（待完善）
	 * @param id 节点id
	 * @param newCode 要更新的节点编码
	 */
	public String updateCode(Long id, String newCode) {

		ClassificationTree flag = classificationTreeDao.findUniqueBy("code", newCode);
		if(flag!=null){
			return "您所提交的分类码已存在，修改失败！";
		}
		ClassificationTree cTree = classificationTreeDao.findUniqueBy("id", id);
		ClassificationTree parent = classificationTreeDao.findUniqueBy("id", cTree.getParent().getId());
		if((newCode.compareTo(parent.getLastChildCode()))>0){
			parent.setLastChildCode(newCode);
		}
		cTree.setCode(newCode);
		classificationTreeDao.save(parent);
		classificationTreeDao.save(cTree);
		return"分类码修改成功！";
	}
	
	
	
	
	public void changeLock(Long id, int lock) {
		// TODO Auto-generated method stub
		ClassificationTree cTree = classificationTreeDao.get(id);
		cTree.setLockTree(lock);
	}
	
	
	
	/**
	 * 获取树节点用于设计资源集成的主模型的同步
	 */
	public List<ClassificationTree> getTreeNodes2UpdateModel(){
		List<ClassificationTree> treeNodes = classificationTreeDao.find("from ClassificationTree treeNode where treeNode.modelFlag = 1 ");
		int count = treeNodes.size();
		for(int i =0 ;i<count;i++) {
			ClassificationTree treeNode = treeNodes.get(i);
			classificationTreeDao.getSession().evict(treeNode);
			treeNode.setChildren(null);
			treeNode.setParent(null);
			treeNode.setCodeClass(null);
		}
		return treeNodes;
	}
	/**
	 * 根据分类树节点获取分类树的主模型或者自定义文档
	 * @param treeNodes
	 * @param isModel
	 * @return
	 */
	public List<TreeDraft> getTreeDraftsByTreeNodes(
			List<ClassificationTree> treeNodes, boolean isModel){
		
		String sql =null;
		if(isModel){
			sql = "from TreeDraft tDraft where tDraft.ismaster = 1 and tDraft.classificationTree.id = ?";
		}else{
			sql = "from TreeDraft tDraft where tDraft.ismaster = 0 and tDraft.classificationTree.id = ?";
		}
		List<TreeDraft> treeDraftList = new ArrayList<TreeDraft>();
		for(ClassificationTree treeNode : treeNodes){	
			List<TreeDraft> list = treeDraftDao.find(sql,treeNode.getId());
			if(list.size() != 0){
				treeDraftList.addAll(list);
			}
		}
		int count = treeDraftList.size();
		for(int i=0;i<count;i++){
			TreeDraft draft = treeDraftList.get(i);
			treeDraftDao.getSession().evict(draft);
			draft.setClassificationTree(null);
			draft.setDraftType(null);
		}
		System.out.println(treeDraftList.size());
		return treeDraftList;
	
	}
	
	
	/**
	 * 用于服务，根据树节点模型信息获得树节点模型压缩文件,或者根据树节点文档信息获得树节点文档压缩文件
	 * @param isModel true表示模型，false表示文档
	 */
	public DataHandler getFileZip(List<TreeDraft> treeDrafts,boolean isModel){
		String path =Constants.UPLOADMODEL_PATH;
		if(!isModel){
			path = Constants.UPLOADSELF_PATH;
		}
		List<File> drafts = new ArrayList<File>();
		File fileDirectory = new File(path);
		if(!fileDirectory.exists()){
			fileDirectory.mkdirs();
		}
		
		File tempZipFile = new File(path+"temp.zip");
		
		for(TreeDraft draft :treeDrafts) {
			
			File draftFile = new File(path+draft.getFileName());
			if(draftFile.exists()){
				drafts.add(draftFile);
			}
		}
		
		try {
			FileOutputStream fos = new FileOutputStream(tempZipFile);
			ZipOutputStream zos = new ZipOutputStream(fos);
			FileInputStream  fis =null;
			BufferedInputStream bis =null;
			
			for(File f :drafts){
				ZipEntry ze = new ZipEntry(f.getName());
				zos.putNextEntry(ze);
				fis = new FileInputStream(f);
				bis = new BufferedInputStream(fis,1024);
				byte[] buffer = new byte[1024];
				int count=-1;
				while((count = bis.read(buffer))!=-1){
					zos.write(buffer, 0, count);
				}
			}
			if(bis !=null){
				bis.close();
			}
			if(fis !=null){
				fis.close();
			}
			if(zos !=null){
				zos.close();
			}
			if(fos !=null){
				fos.close();
			}
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		

		FileDataSource dataSource = new FileDataSource(tempZipFile);
		DataHandler zipFile = new DataHandler(dataSource);
		return zipFile;
	}
	
	/**
	 *	用于服务，更新完主模型之后更改标识为0
	 * @param treeNodes
	 */
	public void UpdateModelFinish(List<ClassificationTree> treeNodes){
		for(ClassificationTree treeNode : treeNodes){
			ClassificationTree node= classificationTreeDao.get(treeNode.getId());
			node.setModelFlag(0);
		}
		File f = new File(Constants.UPLOADMODEL_PATH+"temp.zip");
		if(f.exists()){
			f.delete();
		}
	}
	
	/**
	 * 获取树节点用于设计资源集成的自定义文档的同步
	 */
	public List<ClassificationTree> getTreeNodes2UpdateSelf(){
		List<ClassificationTree> treeNodes = classificationTreeDao.find("from ClassificationTree treeNode where treeNode.selfFlag = 1 ");
		int count = treeNodes.size();
		for(int i =0 ;i<count;i++) {
			ClassificationTree treeNode = treeNodes.get(i);
			classificationTreeDao.getSession().evict(treeNode);
			treeNode.setChildren(null);
			treeNode.setParent(null);
			treeNode.setCodeClass(null);
		}
		return treeNodes;
	}
	
	public void UpdateSelfFinish(List<ClassificationTree> treeNodes){
		for(ClassificationTree treeNode : treeNodes){
			ClassificationTree node= classificationTreeDao.get(treeNode.getId());
			node.setSelfFlag(0);
		}
		File f = new File(Constants.UPLOADSELF_PATH+"temp.zip");
		if(f.exists()){
			f.delete();
		}
	}
	
	/**
	 * 用于服务，获取需要更新示意图的树节点
	 * @return
	 */
	public List<ClassificationTree> getTreeNodes2UpdateImg(){
		List<ClassificationTree> treeNodes = classificationTreeDao.find("from ClassificationTree treeNode where treeNode.imgFlag = 1 and treeNode.imgUrl is not null");
		int length = treeNodes.size();
		for(int i=0;i<length;i++){
			ClassificationTree treeNode = treeNodes.get(i);
			classificationTreeDao.getSession().evict(treeNode);
			treeNode.setParent(null);
			treeNode.setChildren(null);
			treeNode.setCodeClass(null);
		}
		return treeNodes;
	}
	
	/**
	 * 用于服务，根据树节点获取文件的压缩包
	 * @param treeNodes
	 * @return
	 */
	public DataHandler getFileZip(List<ClassificationTree> treeNodes){

		List<File> fileList = new ArrayList<File>();
		File fileDirectory = new File(Constants.UPLOADMODELIMG_PATH);
		if(!fileDirectory.exists()){
			fileDirectory.mkdirs();
		}
		File file=null;
		String filePath ="";
		File tempZipFile = new File(Constants.UPLOADMODELIMG_PATH+"temp.zip");
		//pack the file to zip then put it into the DataHandler
		for(ClassificationTree treeNode : treeNodes){
			filePath = Constants.FILEROOT+treeNode.getImgUrl();
			file = new File(filePath);
			fileList.add(file);
		}

		try {
			FileOutputStream fos = new FileOutputStream(tempZipFile);
			ZipOutputStream zos = new ZipOutputStream(fos);
			BufferedInputStream bis = null;
			FileInputStream fis = null;
			for(File f :fileList){
				if(f.isFile()){
					ZipEntry ze = new ZipEntry(f.getName());
					zos.putNextEntry(ze);
					fis = new FileInputStream(f);
					bis = new BufferedInputStream(fis,1024);
					byte[] buffer = new byte[1024];
					int count;
					while((count=bis.read(buffer)) != -1){
						zos.write(buffer, 0, count);
					}
				}
			}
			if(bis !=null){
				bis.close();
			}
			if(fis !=null){
				fis.close();
			}
			if(zos !=null){
				zos.close();
			}
			if(fos !=null){
				fos.close();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		FileDataSource dataSource = new FileDataSource(tempZipFile);
		DataHandler fileZip = new DataHandler(dataSource);
		
		return fileZip;
	
	}
	
	/**
	 * 用于服务，更新完树节点之后
	 * @param treeNodes
	 */
	public void UpdateImgFinish(List<ClassificationTree> treeNodes){
		for(ClassificationTree treeNode :treeNodes){
			ClassificationTree node = classificationTreeDao.get(treeNode.getId());
			node.setImgFlag(0);
		}
		
		File tempZip = new File(Constants.UPLOADMODELIMG_PATH+"temp.zip");
		if(tempZip.exists()){
			tempZip.delete();
		}
	}
	
}
