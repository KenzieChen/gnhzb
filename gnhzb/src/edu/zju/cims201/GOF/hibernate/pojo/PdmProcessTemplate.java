package edu.zju.cims201.GOF.hibernate.pojo;

import java.util.HashSet;
import java.util.Set;

import edu.zju.cims201.GOF.hibernate.pojo.pdm.ProcessTemplateIOParam;
import edu.zju.cims201.GOF.hibernate.pojo.pdm.TaskTreeNode;

public class PdmProcessTemplate extends ProcessTemplate {
	private PdmModule module;
	private TaskTreeNode tasktreenode;
	
	private String parentmoduleid;
	
	private String parentmodulename;
	
	private String levelmoduleid;
	
	private String prevlevelmodulename;
	
	private String prevlevelmoduleid;
	
	private String nextlevelmoduleid;
	
	private String nextlevelmodulename;
	private Set<ProcessTemplateIOParam> params=new HashSet<ProcessTemplateIOParam>();
	
	
	
	
	
	public Set<ProcessTemplateIOParam> getParams() {
		return params;
	}


	public void setParams(Set<ProcessTemplateIOParam> params) {
		this.params = params;
	}


	private Set<RelatedModel> relatedmodels=new HashSet<RelatedModel>();
	
	public TaskTreeNode getTasktreenode() {
		return tasktreenode;
	}


	public void setTasktreenode(TaskTreeNode tasktreenode) {
		this.tasktreenode = tasktreenode;
	}




	public PdmModule getModule() {
		return module;
	}


	public void setModule(PdmModule module) {
		this.module = module;
	}


	


	public Set<RelatedModel> getRelatedmodels() {
		return relatedmodels;
	}


	public void setRelatedmodels(Set<RelatedModel> relatedmodels) {
		this.relatedmodels = relatedmodels;
	}


	public String getParentmoduleid() {
		return parentmoduleid;
	}


	public void setParentmoduleid(String parentmoduleid) {
		this.parentmoduleid = parentmoduleid;
	}


	public String getParentmodulename() {
		return parentmodulename;
	}


	public void setParentmodulename(String parentmodulename) {
		this.parentmodulename = parentmodulename;
	}


	public String getLevelmoduleid() {
		return levelmoduleid;
	}


	public void setLevelmoduleid(String levelmoduleid) {
		this.levelmoduleid = levelmoduleid;
	}


	public String getPrevlevelmodulename() {
		return prevlevelmodulename;
	}


	public void setPrevlevelmodulename(String prevlevelmodulename) {
		this.prevlevelmodulename = prevlevelmodulename;
	}


	public String getPrevlevelmoduleid() {
		return prevlevelmoduleid;
	}


	public void setPrevlevelmoduleid(String prevlevelmoduleid) {
		this.prevlevelmoduleid = prevlevelmoduleid;
	}


	public String getNextlevelmoduleid() {
		return nextlevelmoduleid;
	}


	public void setNextlevelmoduleid(String nextlevelmoduleid) {
		this.nextlevelmoduleid = nextlevelmoduleid;
	}


	public String getNextlevelmodulename() {
		return nextlevelmodulename;
	}


	public void setNextlevelmodulename(String nextlevelmodulename) {
		this.nextlevelmodulename = nextlevelmodulename;
	}




}
