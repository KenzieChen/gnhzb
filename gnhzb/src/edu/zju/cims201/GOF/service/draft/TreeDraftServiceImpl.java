package edu.zju.cims201.GOF.service.draft;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.zju.cims201.GOF.dao.classificationtree.ClassificationTreeDao;
import edu.zju.cims201.GOF.dao.draft.DraftTypeDao;
import edu.zju.cims201.GOF.dao.draft.TreeDraftDao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.DraftType;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;
import edu.zju.cims201.GOF.util.Constants;
 
@Service
@Transactional
public class TreeDraftServiceImpl implements TreeDraftService {
	private TreeDraftDao treeDraftDao;
	private DraftTypeDao  draftTypeDao;
	private ClassificationTreeDao classificationTreeDao;
	
	public TreeDraftDao getTreeDraftDao() {
		return treeDraftDao;
	}
	@Autowired
	public void setTreeDraftDao(TreeDraftDao treeDraftDao) {
		this.treeDraftDao = treeDraftDao;
	}
	public DraftTypeDao getDraftTypeDao() {
		return draftTypeDao;
	}
	@Autowired
	public void setDraftTypeDao(DraftTypeDao draftTypeDao) {
		this.draftTypeDao = draftTypeDao;
	}
	
	
	public ClassificationTreeDao getClassificationTreeDao() {
		return classificationTreeDao;
	}
	@Autowired
	public void setClassificationTreeDao(ClassificationTreeDao classificationTreeDao) {
		this.classificationTreeDao = classificationTreeDao;
	}
	/**
	 * 上传大类主模型
	 * @param treeId 大类结构树节点ID
	 * @param draftName 自定义的文件名
	 * @param description 对文件的描述
	 * @param file 上传的文件
	 * @param fielFileName 上传的文件名
	 * @return 提示信息
	 * @throws Exception 
	 */
	public String uploadModel(Long treeId, String draftName,
			String description, File file, String fileFileName) throws Exception {
		// TODO Auto-generated method stub
		if(description ==null){
			description="";
		}
		String suffix=null;
		//creo中保存的文件是{prt.数字}构成，改成prt后缀
		if(fileFileName.contains(".prt") && 
				!fileFileName.substring(fileFileName.lastIndexOf(".")+1).equals("prt")){
			suffix="prt"; 
		}else{
			suffix=fileFileName.substring(fileFileName.lastIndexOf(".")+1);
		}
		
		fileFileName=System.currentTimeMillis()+(new Random()).nextInt(100000)+"."+suffix;
		DraftType dt = draftTypeDao.findUniqueBy("ismaster", 1);
		String typename =dt.getTypeName();
		String typeSuffix =dt.getTypeSuffix();
		String[] suffixs =typeSuffix.split(",");
		//判断上传文件类型是否符合
		boolean flag =false;
		for(int i=0;i<suffixs.length;i++){
			if(suffixs[i].equalsIgnoreCase(suffix)){
				flag=true;
			}
			
		}
		if(flag==false){
			return "主模型上传类型不支持该格式的文件！";
		}
		
		ClassificationTree ct = classificationTreeDao.get(treeId);
		//表示需要更新
		ct.setModelFlag(1);
		
		TreeDraft td =new TreeDraft();
		td.setIsmaster(1);
		td.setClassificationTree(ct);
		//设置文档所属树节点的uuid
		td.setClassificationTreeUuid(ct.getUuid());
		
		//判断数据库中文件名是否存在，不存在则上传文件
		List<TreeDraft> list=treeDraftDao.find("from TreeDraft td where td.classificationTree.id=? and td.ismaster=1", treeId);
		boolean filenameexist =false;
		boolean draftnameexist =false;
		for(TreeDraft treeDraft:list){
			String existFileName =treeDraft.getFileName();
			if(existFileName.equals(fileFileName)){
				filenameexist=true;
			}
			
			String existDraftName =treeDraft.getDraftName();
			if(existDraftName.equals(draftName)){
				draftnameexist=true;
			}
		}
		if(filenameexist == true){
			return "存在相同名称的文件！";
		}else if(draftnameexist==true){
			return "存在相同的主模型名称！";
		}else{
			//File createPath =new File(ServletActionContext.getServletContext().getRealPath("/")+"uploadModel");
			File createPath=new File(Constants.UPLOADMODEL_PATH);
			if(!createPath.exists()){
				createPath.mkdir();
			}
			FileOutputStream fos =new FileOutputStream(new File(createPath,fileFileName));
			String url ="\\uploadModel\\"+fileFileName;
			FileInputStream fis =new FileInputStream(file);
			byte[] buffer = new byte[fis.available()];
			int length =0;
			while((length =fis.read(buffer))>0){
				fos.write(buffer,0,length);
				fos.flush();
			}
			fis.close();
			fos.close();
			
			td.setFileName(fileFileName);
			td.setDescription(description);
			td.setDraftName(draftName);
			td.setDraftSuffix(suffix);
			td.setDraftType(dt);
			td.setTypeName(typename);
			td.setDraftUrl(url);
			treeDraftDao.save(td);
			return "文件上传成功！";
		}
	}

	public List<TreeDraft> getModelByTreeId(Long treeId) {
		// TODO Auto-generated method stub
		List<TreeDraft> tds =treeDraftDao.find("from TreeDraft td where td.classificationTree.id=? and td.ismaster=1",treeId);
		List<TreeDraft> tdsRe =new ArrayList<TreeDraft>();
		for(TreeDraft td:tds){
			treeDraftDao.getSession().evict(td);
			td.setClassificationTree(null);
			td.setDraftType(null);
			tdsRe.add(td);
		}
		return tdsRe;
	}
	public String uploadSelf(Long treeId, String selfName, String description,
			File self, String selfFileName, String typeName) throws Exception {
		// TODO Auto-generated method stub
		if(description ==null){
			description="";
		}
		String suffix = selfFileName.substring(selfFileName.lastIndexOf(".")+1);
		selfFileName=System.currentTimeMillis()+(new Random()).nextInt(100000)+"."+suffix;

		DraftType dt = draftTypeDao.findUniqueBy("typeName", typeName);
		String typeSuffix = dt.getTypeSuffix();
		String[] suffixs =typeSuffix.split(",");
		//判断上传文件类型是否符合
		boolean flag = false;
		for(int i=0;i<suffixs.length;i++){
			if(suffixs[i].equalsIgnoreCase(suffix)){
				flag = true;
			}
		}
		if(flag==false){
			return "自定义图文档上传类型不支持该格式的文件！";
		}
		List<TreeDraft> list=treeDraftDao.find("from TreeDraft td where td.classificationTree.id=? and td.ismaster=0", treeId);
		boolean filenameexist =false;
		boolean draftnameexist =false;
		for(TreeDraft treeDraft:list){
			String existFileName =treeDraft.getFileName();
			if(existFileName.equals(selfFileName)){
				filenameexist=true;
			}
			String existDraftName =treeDraft.getDraftName();
			if(existDraftName.equals(selfName)){
				draftnameexist=true;
			}
		}
		if(filenameexist == true){
			return "存在相同名称的文件！";
		}else if(draftnameexist==true){
			return "存在相同的自定义图文档名称！";
		}else{
			File createPath=new File(Constants.UPLOADSELF_PATH);
			if(!createPath.exists()){
				createPath.mkdir();
			}
			FileOutputStream fos =new FileOutputStream(new File(createPath,selfFileName));
			String url ="\\uploadSelf\\"+selfFileName;
			FileInputStream fis =new FileInputStream(self);
			byte[] buffer = new byte[fis.available()];
			int length =0;
			while((length = fis.read(buffer))>0){
				fos.write(buffer,0,length);
				fos.flush();
			}
			fis.close();
			fos.close();

			ClassificationTree ct = classificationTreeDao.get(treeId);
			//表示需要更新
			ct.setSelfFlag(1);
			
			TreeDraft td = new TreeDraft();
			td.setIsmaster(0);
			td.setClassificationTree(ct);
			//设置uuid
			td.setClassificationTreeUuid(ct.getUuid());
			
			td.setFileName(selfFileName);
			td.setDescription(description);
			td.setDraftName(selfName);
			td.setDraftSuffix(suffix);
			td.setDraftType(dt);
			td.setTypeName(typeName);
			td.setDraftUrl(url);
			treeDraftDao.save(td);
			return "文件上传成功！";
		}
		
		
	}
	public List<TreeDraft> getSelfByTreeId(Long treeId) {
		// TODO Auto-generated method stub
		List<TreeDraft> tds =treeDraftDao.find("from TreeDraft td where td.classificationTree.id=? and td.ismaster=0",treeId);
		List<TreeDraft> tdsRe =new ArrayList<TreeDraft>();
		for(TreeDraft td:tds){
			treeDraftDao.getSession().evict(td);
			td.setClassificationTree(null);
			td.setDraftType(null);
			tdsRe.add(td);
		}
		return tdsRe;
	}
	public String deleteModel(Long id, String fileName) {
		String url =Constants.UPLOADMODEL_PATH+fileName;
		try {
			File model =new File(url);
			model.delete();
		} catch (Exception e) {
			System.out.println("删除文件操作出错");
			e.printStackTrace();
		}
		TreeDraft draft = treeDraftDao.get(id);
		ClassificationTree treeNode = draft.getClassificationTree();
		//表示需要更新
		treeNode.setModelFlag(1);
		treeDraftDao.delete(draft);
		return "删除成功！";
	}
	public String deleteSelfDefiDoc(Long id, String fileName) {
		String url = Constants.UPLOADSELF_PATH+fileName;
		try {
			File model =new File(url);
			model.delete();
		} catch (Exception e) {
			System.out.println("删除文件操作出错");
			e.printStackTrace();
		}
		TreeDraft draft = treeDraftDao.get(id);
		ClassificationTree treeNode = draft.getClassificationTree();
		//表示需要更新
		treeNode.setSelfFlag(1);
		treeDraftDao.delete(draft);
		return "删除成功！";
	}
	public String uploadImg(Long treeId, File pic, String picFileName)  {
		// TODO Auto-generated method stub
		String suffix=picFileName.substring(picFileName.lastIndexOf(".")+1);
		picFileName=System.currentTimeMillis()+(new Random()).nextInt(100000)+"."+suffix;
		File createPath = new File(Constants.UPLOADMODELIMG_PATH);
		if(!createPath.exists()){
			createPath.mkdir();
		}
		try {
			FileOutputStream fos =new FileOutputStream(new File(createPath,picFileName));
			FileInputStream fis =new FileInputStream(pic);
			byte[] buffer =new byte[fis.available()];
			int length =0;
			while((length=fis.read(buffer))>0){
				fos.write(buffer, 0, length);
				fos.flush();
			}
			fis.close();
			fos.close();
			
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ClassificationTree ct =classificationTreeDao.get(treeId);
		//表示需要更新
		ct.setImgFlag(1);
		String imgUrl =ct.getImgUrl();
		if(null!=imgUrl||!"".equals(imgUrl)){
			try {
				File file =new File(Constants.FILEROOT+imgUrl);
				file.delete();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("删除文件操作出错");
				e.printStackTrace();
			}
		}
		imgUrl ="modelImgView\\"+picFileName;
		ct.setImgUrl(imgUrl);
		classificationTreeDao.save(ct);	
		
		return "图片保存成功！";
	}
	/**
	 * 根据分类树id获得模块分类示意图url
	 */
	public String getModelImgUrl(Long treeId) {
		
		// TODO Auto-generated method stub
		ClassificationTree ct=classificationTreeDao.get(treeId);
		String imgUrl =ct.getImgUrl();
		if(null==imgUrl||"".equals(imgUrl)){
			return "";
		}else{
			return imgUrl;
		}
	}
	
	
}
