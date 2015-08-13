package edu.zju.cims201.GOF.service.partdraft;

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

import edu.zju.cims201.GOF.dao.draft.DraftTypeDao;
import edu.zju.cims201.GOF.dao.part.PartDao;
import edu.zju.cims201.GOF.dao.partdraft.PartDraftDao;
import edu.zju.cims201.GOF.hibernate.pojoA.DraftType;
import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.PartDraft;
import edu.zju.cims201.GOF.util.Constants;

@Service
@Transactional
public class PartDraftServiceImpl implements PartDraftService{
	private PartDao partDao;
	private DraftTypeDao draftTypeDao;
	private PartDraftDao partDraftDao;
	
	
	public String uploadPartImg(Long partId,File pic,String picFileName){

		// TODO Auto-generated method stub
		String suffix = picFileName.substring(picFileName.lastIndexOf(".")+1);
		picFileName = System.currentTimeMillis()+(new Random()).nextInt(100000)+"."+suffix;
		File createPath = new File(Constants.UPLOADPARTIMG_PATH);
		if(!createPath.exists()){
			createPath.mkdir();
		}
		try {
			FileOutputStream fos =new FileOutputStream(new File(createPath,picFileName));
			FileInputStream fis =new FileInputStream(pic);
			byte[] buffer =new byte[fis.available()];
			int length =0;
			while((length = fis.read(buffer))>0){
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
		Part part =partDao.get(partId);
		String imgUrl =part.getImgUrl();
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
		imgUrl ="partImgView\\"+picFileName;
		part.setImgUrl(imgUrl);
		//表示需要同步
		part.setImgFlag(1);
		partDao.save(part);	
		return "图片保存成功！";
	
	}
	
	
	public String getPartImgUrl(long partId) {
		Part part=partDao.get(partId);
		String imgUrl =part.getImgUrl();
		if(null==imgUrl||"".equals(imgUrl)){
			return "";
		}else{
			return imgUrl;
		}
	}
	
	public String uploadPartModel(long partId, String draftName,
			String description, File file, String fileFileName) throws Exception{
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
		
		Part part =partDao.get(partId);
		//需要同步的标识
		part.setModelFlag(1);
		
		PartDraft pdraft =new PartDraft();
		pdraft.setIsmaster(1);
		pdraft.setPart(part);
		//判断数据库中文件名是否存在，不存在则上传文件
		List<PartDraft> list=partDraftDao.find("from PartDraft pd where pd.part.id=? and pd.ismaster=1", partId);
		boolean filenameexist =false;
		boolean draftnameexist =false;
		for(PartDraft partDraft:list){
			String existFileName =partDraft.getFileName();
			if(existFileName.equals(fileFileName)){
				filenameexist=true;
			}
			
			String existDraftName =partDraft.getDraftName();
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
			File createPath=new File(Constants.UPLOADPARTMODEL_PATH);
			if(!createPath.exists()){
				createPath.mkdir();
			}
			FileOutputStream fos =new FileOutputStream(new File(createPath,fileFileName));
			String url ="\\uploadPartModel\\"+fileFileName;
			FileInputStream fis =new FileInputStream(file);
			byte[] buffer = new byte[fis.available()];
			int length =0;
			while((length =fis.read(buffer))>0){
				fos.write(buffer,0,length);
				fos.flush();
			}
			fis.close();
			fos.close();
			
			pdraft.setFileName(fileFileName);
			pdraft.setDescription(description);
			pdraft.setDraftName(draftName);
			pdraft.setDraftSuffix(suffix);
			pdraft.setDraftType(dt);
			pdraft.setTypeName(typename);
			pdraft.setDraftUrl(url);
			
			pdraft.setPartUuid(part.getUuid());
			partDraftDao.save(pdraft);
			return "文件上传成功！";
		}
	
	}
	
	public List<PartDraft>  getDraftByPartId(long partId){
		List<PartDraft> pds =partDraftDao.find("from PartDraft pd where pd.part.id=?",partId);
		List<PartDraft> pdsRe =new ArrayList<PartDraft>();
		for(PartDraft pd:pds){
			partDraftDao.getSession().evict(pd);
			pd.setPart(null);
			pd.setDraftType(null);
			pdsRe.add(pd);
		}
		return pdsRe;
	
	}
	
	public String uploadPartSelf(long partId, String selfName, String description,
			File self, String selfFileName, String typeName) throws Exception {
		// TODO Auto-generated method stub
		if(description ==null){
			description="";
		}
		String suffix=selfFileName.substring(selfFileName.lastIndexOf(".")+1);
		selfFileName=System.currentTimeMillis()+(new Random()).nextInt(100000)+"."+suffix;

		DraftType dt = draftTypeDao.findUniqueBy("typeName", typeName);
		String typeSuffix = dt.getTypeSuffix();
		String[] suffixs =typeSuffix.split(",");
		//判断上传文件类型是否符合
		boolean flag =false;
		for(int i=0;i<suffixs.length;i++){
			if(suffixs[i].equalsIgnoreCase(suffix)){
				flag=true;
			}
		}
		if(flag==false){
			return "自定义图文档上传类型不支持该格式的文件！";
		}
		List<PartDraft> list=partDraftDao.find("from PartDraft pd where pd.part.id=? and pd.ismaster=0", partId);
		boolean filenameexist =false;
		boolean draftnameexist =false;
		for(PartDraft partDraft:list){
			String existFileName =partDraft.getFileName();
			if(existFileName.equals(selfFileName)){
				filenameexist=true;
			}
			String existDraftName =partDraft.getDraftName();
			if(existDraftName.equals(selfName)){
				draftnameexist=true;
			}
		}
		if(filenameexist == true){
			return "存在相同名称的文件！";
		}else if(draftnameexist==true){
			return "存在相同的自定义图文档名称！";
		}else{
			File createPath=new File(Constants.UPLOADPARTSELF_PATH);
			if(!createPath.exists()){
				createPath.mkdir();
			}
			FileOutputStream fos =new FileOutputStream(new File(createPath,selfFileName));
			String url ="\\uploadPartSelf\\"+selfFileName;
			FileInputStream fis =new FileInputStream(self);
			byte[] buffer = new byte[fis.available()];
			int length =0;
			while((length =fis.read(buffer))>0){
				fos.write(buffer,0,length);
				fos.flush();
			}
			fis.close();
			fos.close();

			Part part =partDao.get(partId);
			part.setSelfFlag(1);
			PartDraft pd =new PartDraft();
			pd.setIsmaster(0);
			pd.setPart(part);
			
			pd.setPartUuid(part.getUuid());
			pd.setFileName(selfFileName);
			pd.setDescription(description);
			pd.setDraftName(selfName);
			pd.setDraftSuffix(suffix);
			pd.setDraftType(dt);
			pd.setTypeName(typeName);
			pd.setDraftUrl(url);
			
			partDraftDao.save(pd);
			return "文件上传成功！";
		}
		
		
	}
	
	public boolean isMasterByFileName(String fileName){
		PartDraft pd=partDraftDao.findUniqueBy("fileName", fileName);
		int ismaster =pd.getIsmaster();
		if(1==ismaster){
			return true;
		}else{
			return false;
		}
	}
	

	public String deleteDraft(long id, String fileName) throws IOException {
		PartDraft pd=partDraftDao.findUniqueBy("fileName", fileName);
		Part part = pd.getPart();
		//表示需要更新
		if(pd.getIsmaster()==1){
			part.setModelFlag(1);
		}else{
			part.setSelfFlag(1);
		}
		
		
		
		int ismaster =pd.getIsmaster();
		String url="";
		if(1==ismaster){
			url =Constants.UPLOADPARTMODEL_PATH+fileName;
		}else{
			url =Constants.UPLOADPARTSELF_PATH+fileName;
		}
		try {
			File model =new File(url);
			model.delete();
		} catch (Exception e) {
			System.out.println("删除文件操作出错");
			e.printStackTrace();
		}
		partDraftDao.delete(id);
		return "删除成功！";
	
	}

	public PartDao getPartDao() {
		return partDao;
	}
	@Autowired
	public void setPartDao(PartDao partDao) {
		this.partDao = partDao;
	}
	
	public DraftTypeDao getDraftTypeDao() {
		return draftTypeDao;
	}
	@Autowired
	public void setDraftTypeDao(DraftTypeDao draftTypeDao) {
		this.draftTypeDao = draftTypeDao;
	}
	

	public PartDraftDao getPartDraftDao() {
		return partDraftDao;
	}
	@Autowired
	public void setPartDraftDao(PartDraftDao partDraftDao) {
		this.partDraftDao = partDraftDao;
	}



}
