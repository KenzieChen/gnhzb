package edu.zju.cims201.GOF.service.classificationtree;

import java.util.List;

import javax.activation.DataHandler;

import edu.zju.cims201.GOF.hibernate.pojoA.ClassificationTree;
import edu.zju.cims201.GOF.hibernate.pojoA.TreeDraft;

public interface ClassificationTreeService {
	public List<ClassificationTree> getClassStruct();
	public ClassificationTree getNode(Long id);
	public List<ClassificationTree> getChildrenNode(Long pid);
	public String insertTreeNode(Long pid,ClassificationTree ct);
	public String deleteTreeNode(Long id);
	public String updateClassDes(Long id,String classDes);
	public String updateCode(Long id,String newCode);
	
	/**
	 * 用于接口服务客户端
	 * @return
	 */
	public List<ClassificationTree> getClassStruct2();
	/**
	 * 用于接口服务客户端,与public List<ClassificationTree> getClassStruct2()类似，二者可选其一
	 * @return
	 */
	public String getClassStruct3();
	/*
	 * 改变锁状态，使主BOM分类树能够同步到设计资源集成
	 */
	public void changeLock(Long id, int lock);
	/**
	 * 获取树节点用于设计资源集成的主模型的同步
	 */
	public List<ClassificationTree> getTreeNodes2UpdateModel();
	/**
	 * 根据分类树节点获取分类树的主模型或者自定义文档
	 * @param treeNodes
	 * @param isModel
	 * @return
	 */
	public List<TreeDraft> getTreeDraftsByTreeNodes(
			List<ClassificationTree> treeNodes, boolean isModel);
	/**
	 * 用于服务，根据树节点模型信息获得树节点模型压缩文件,或者根据树节点文档信息获得树节点文档压缩文件
	 * @param isModel true表示模型，false表示文档
	 */
	public DataHandler getFileZip(List<TreeDraft> treeDrafts,boolean isModel);
	/**
	 *	用于服务，更新完节点主模型之后更改标识为0
	 * @param treeNodes
	 */
	public void UpdateModelFinish(List<ClassificationTree> treeNodes);
	
	/**
	 * 获取树节点用于设计资源集成的自定义文档的同步
	 */
	public List<ClassificationTree> getTreeNodes2UpdateSelf();
	/**
	 *	用于服务，更新完节点自定义文档之后更改标识为0
	 * @param treeNodes
	 */
	public void UpdateSelfFinish(List<ClassificationTree> treeNodes);
	
	/**
	 * 用于服务，获取需要更新示意图的树节点
	 * @return
	 */
	public List<ClassificationTree> getTreeNodes2UpdateImg();
	/**
	 * 用于服务，根据树节点获取文件的压缩包
	 * @param treeNodes
	 * @return
	 */
	public DataHandler getFileZip(List<ClassificationTree> treeNodes);
	/**
	 * 用于服务，更新完树节点之后
	 * @param treeNodes
	 */
	public void UpdateImgFinish(List<ClassificationTree> treeNodes);
}
