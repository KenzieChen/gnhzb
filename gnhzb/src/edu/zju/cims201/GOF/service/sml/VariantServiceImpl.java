package edu.zju.cims201.GOF.service.sml;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import edu.zju.cims201.GOF.dao.draft.TreeDraftDao;
import edu.zju.cims201.GOF.dao.part.PartDao;
import edu.zju.cims201.GOF.dao.sml.VariantTaskDao;
import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.Part;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;
import edu.zju.cims201.GOF.hibernate.pojoA.VariantTask;
import edu.zju.cims201.GOF.rs.dto.VariantTaskDTO;
import edu.zju.cims201.GOF.util.Constants;
import edu.zju.cims201.GOF.util.JSONUtil;

@Service
@Transactional
public class VariantServiceImpl implements VariantService{
	
	private Log log = LogFactory.getLog(this.getClass());
	private PartDao partDao;
	private TreeDraftDao treeDraftDao;
	
	private VariantTaskDao  variantTaskDao;
	public String addTask(String taskName,long partId,String startDate,String endDate,String demo,String requirement) {
		// TODO Auto-generated method stub
		//从模块那里获取主模型，将获取的模型保存到零件保存路径下
		Part part = partDao.get(partId);
		ClassificationTree ct = part.getClassificationTree();
		 if(ct ==null){
			 return "找不到零件所属模块！";
		 }
		 List<TreeDraft> treeDraftList  = treeDraftDao.find("from TreeDraft draft where draft.classificationTree.id=?  and draft.ismaster =1",ct.getId());
		 if(treeDraftList.get(0) == null){
			 return "找不到零件所属模块的主模型";
		 }
		 String modelFilePath = treeDraftList.get(0).getDraftUrl();
		 String modelFileName = treeDraftList.get(0).getFileName();
		 
		 File file = new File(Constants.FILEROOT+modelFilePath);
		 int a= modelFileName.lastIndexOf("\\.");
		 int b = modelFileName.lastIndexOf(".");
		 
		 String newFileName = System.currentTimeMillis()+(new Random()).nextInt(100000)+modelFileName.substring(modelFileName.lastIndexOf("."));
		 
		File newFile = new File(Constants.UPLOADPARTMODEL_PATH,newFileName);
		
		InputStream is;
		OutputStream os;
		try {
			is = new FileInputStream(file);
			os = new FileOutputStream(newFile);
			byte[] buffer = new byte[1024];
			int count =-1;
			while((count=is.read(buffer))!=-1){
				os.write(buffer);
			}
			is.close();
			os.close();
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}catch (IOException e2){
			e2.printStackTrace();
		}
		
		
		
		VariantTask vt = new VariantTask();
		vt.setTaskName(taskName);
		//Part part = new Part();
		//part.setId(partId);
		vt.setPart(part);
		
		ParsePosition p =null;
		SimpleDateFormat format = new SimpleDateFormat("\"yyyy-MM-dd'T'HH:mm:ss\"");
		Date start = null;
		Date end =null;
		
		try {
			start = format.parse(startDate);
			end = format.parse(endDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			log.error("addTask,日期格式转换错误");
			e.printStackTrace();
		}
		vt.setStartDate(start);
		vt.setEndDate(end);
		
		vt.setDemo(demo);
		vt.setRequirement(requirement);
		vt.setStatus("未完成");
		
		vt.setFilename(newFileName);
		vt.setFilePath("\\uploadPartModel\\"+newFileName);
		variantTaskDao.save(vt);
		log.info("addTask("+partId+","+endDate+","+demo+","+requirement+")：新建变型任务成功" );
		return "新建变型任务成功！";
	}
	
	public List<VariantTaskDTO> getAllVariantTask(){
		List<VariantTask> list = variantTaskDao.getAll();
		List<VariantTaskDTO> list2 = new ArrayList<VariantTaskDTO>();
		int length = list.size();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		for(int i=0;i<length;i++){
			VariantTask vt = list.get(i);
			VariantTaskDTO vt2 = new VariantTaskDTO();
			vt2.setDemo(vt.getDemo());
			String endDate = sdf.format(vt.getEndDate());
			vt2.setEndDate(endDate);
			vt2.setId(vt.getId());
			vt2.setPartId(vt.getPart().getId());
			vt2.setPartName(vt.getPart().getPartName());
			vt2.setPartNumber(vt.getPart().getPartNumber());
			vt2.setRequirement(vt.getRequirement());
			String startDate = sdf.format(vt.getStartDate());
			vt2.setStartDate(startDate);
			vt2.setStatus(vt.getStatus());
			vt2.setTaskName(vt.getTaskName());
			list2.add(vt2);
			
		}
		log.info("getAllVariantTask():"+JSONUtil.write(list2));
		return list2;
	}
	
	@Autowired
	public void setVariantTaskDao(VariantTaskDao variantTaskDao) {
		this.variantTaskDao = variantTaskDao;
	}

	public PartDao getPartDao() {
		return partDao;
	}
	@Autowired
	public void setPartDao(PartDao partDao) {
		this.partDao = partDao;
	}

	public TreeDraftDao getTreeDraftDao() {
		return treeDraftDao;
	}
	@Autowired
	public void setTreeDraftDao(TreeDraftDao treeDraftDao) {
		this.treeDraftDao = treeDraftDao;
	}

	public VariantTaskDao getVariantTaskDao() {
		return variantTaskDao;
	}

	
}
