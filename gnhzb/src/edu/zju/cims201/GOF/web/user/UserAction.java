package edu.zju.cims201.GOF.web.user;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import org.stringtree.json.JSONReader;
import org.stringtree.json.JSONWriter;



import edu.zju.cims201.GOF.dao.HibernateUtils;

import edu.zju.cims201.GOF.hibernate.pojo.AdminUser;
import edu.zju.cims201.GOF.hibernate.pojo.Ktype;
import edu.zju.cims201.GOF.hibernate.pojo.Property;
import edu.zju.cims201.GOF.hibernate.pojo.RoleTreeNode;
import edu.zju.cims201.GOF.hibernate.pojo.SystemUser;
import edu.zju.cims201.GOF.hibernate.pojo.UserRoleAssociation;
import edu.zju.cims201.GOF.hibernate.pojo.UserRolePK;
import edu.zju.cims201.GOF.rs.dto.KtypeDTO;
import edu.zju.cims201.GOF.rs.dto.PageDTO;
import edu.zju.cims201.GOF.rs.dto.UserDTO;
import edu.zju.cims201.GOF.service.ServiceException;

import edu.zju.cims201.GOF.service.systemUser.UserService;
import edu.zju.cims201.GOF.service.tree.TreeService;
import edu.zju.cims201.GOF.service.webservice.AxisWebService;
import edu.zju.cims201.GOF.util.JSONUtil;
import edu.zju.cims201.GOF.web.CrudActionSupport;

/**
 * 用户管理Action.
 * 
 * 使用Struts2 convention-plugin annotation定义Action参数.
 * 演示带分页的管理界面.
 * 
 * @author calvin
 */
//定义URL映射对应/account/user.action
@Namespace("/user")
//定义名为reload的result重定向到user.action, 其他result则按照convention默认.
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "user.action", type = "redirect") })
public class UserAction extends CrudActionSupport<SystemUser> implements ServletResponseAware{

	private static final long serialVersionUID = 8683878162525847072L;

	@Resource(name = "userServiceImpl")
	private UserService userServiceImpl;
	@Resource(name = "treeServiceImpl")
	private TreeService treeService;
	@Resource(name="axisWebService")
	private AxisWebService axisWebService;
	
	//-- 页面属性 --//
	private Long id;
	private String email;
	private SystemUser entity;

	private String json;
	
	private String roletreenodeid;
	private HttpServletResponse response;
	private int size;
	private int index;
	private String key;


	

	//-- ModelDriven 与 Preparable函数 --//
	

	public SystemUser getModel() {
		return entity;
	}

	@Override
	protected void prepareModel() throws Exception {
		
		if (email != null) {
		
			entity = userServiceImpl.getUser(email);
		} else 
			if(json!=null){
			SystemUser systemUser;
			JSONReader reader=new JSONReader();
			HashMap<String, String> jsonMap=(HashMap<String, String>)reader.read(json);
			
			if(null!=jsonMap.get("email")){
				String email=jsonMap.get("email").toString();
				systemUser=userServiceImpl.getUser(email);
				if(null==systemUser)
				{
					systemUser=new SystemUser();
					systemUser.setEmail(jsonMap.get("email"));
				}
			}
			else{
				systemUser=new SystemUser();
				
				systemUser.setEmail(jsonMap.get("email"));
			}
			
			systemUser.setHobby(jsonMap.get("hobby"));
			systemUser.setName(jsonMap.get("name"));
			systemUser.setPassword(jsonMap.get("password"));
//			systemUser.setAdministrativeRole(Integer.valueOf(jsonMap.get("administrativeRole").toString()));
			systemUser.setIntroduction(jsonMap.get("introduction"));
//			systemUser.setIsVisible(Boolean.valueOf(jsonMap.get("isVisible").toString()));
			systemUser.setPicturePath(jsonMap.get("picturePath"));
			systemUser.setSex(jsonMap.get("sex"));
             
			
			entity=systemUser;
		}
		
	
		
	}

	//-- CRUD Action 函数 --//
	@Override
	public String list() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
	public String saveAvidmUser() throws Exception{
		axisWebService.userService();
		JSONUtil.write(response,"操作成功!");
		
		
		return null;
	}
	
	
	public String listuser() throws Exception {
		PageDTO pd = new PageDTO();
//		JSONWriter writer = new JSONWriter();
//		size = 2;
//		index = 1;
			
		List<SystemUser> susers = userServiceImpl.listUsers();
		List<UserDTO> dots = new ArrayList<UserDTO>();
		for (SystemUser suser : susers) {
			UserDTO udto = new UserDTO();
			udto.setId(suser.getId());
			udto.setEmail(suser.getEmail());
			udto.setHobby(suser.getHobby());
			udto.setIntroduction(suser.getIntroduction());
//			udto.setIsVisible(suser.getIsVisible());
			udto.setName(suser.getName());
			udto.setPassword(suser.getPassword());
			udto.setPicturePath(suser.getPicturePath());
			udto.setSex(suser.getSex());
			dots.add(udto);						
		}
	//	System.out.println("到这了"+dots);
		

		List<UserDTO> subList = new ArrayList<UserDTO>();
		for (int i = index * size; i < ((index + 1) * size < dots.size() ? (index + 1)
				* size
				: dots.size()); i++) {
			subList.add(dots.get(i));
		}
	//	System.out.println("dots size:" + dots.size());

		pd.setData(subList);
		pd.setTotal(dots.size());
		int totalPage;
		if(size != 0) {
			if (dots.size() % size == 0) {
				totalPage = dots.size() / size;
			} else {
				totalPage = dots.size() / size + 1;
			}
			pd.setTotalPage(dots.size() / size + 1);
		}
		

		JSONWriter writer = new JSONWriter();
		String userstring = writer.write(pd);
		response.getWriter().print(userstring);

		return null;				

	}
public String listuser1() throws Exception {
		
		List<SystemUser> susers = userServiceImpl.listUsers();
		List<UserDTO> dots = new ArrayList<UserDTO>();
		for (SystemUser suser : susers) {
			UserDTO udto = new UserDTO();
			udto.setEmail(suser.getEmail());		
			dots.add(udto);						
		}
		
		JSONWriter writer = new JSONWriter();
		String userstring = writer.write(dots);
		response.getWriter().print(userstring);
		
		return null;				
		
	}
	
	public String searchuser() throws Exception {
		String username = key.trim();
		List<UserDTO> dots = new ArrayList<UserDTO>();
		if(!username.equals("")){			
		
			List<SystemUser> susers = userServiceImpl.searchUsers(username);
			for (SystemUser suser : susers) {
				UserDTO udto = new UserDTO();
				udto.setId(suser.getId());
				udto.setName(suser.getName());
				udto.setEmail(suser.getEmail());		
				dots.add(udto);						
			}			
		}
		JSONWriter writer = new JSONWriter();
		String userstring = writer.write(dots);
		response.getWriter().print(userstring);
		
		return null;	
	
	}
	public String getuser() throws Exception {
			
		
			SystemUser user = userServiceImpl.getUser();
		
				UserDTO udto = new UserDTO();
				udto.setId(user.getId());
				udto.setName(user.getName());
				udto.setEmail(user.getEmail());		
				udto.setPicturePath(user.getPicturePath());
		
				JSONUtil.write(response,udto);
				
		
		return null;	
		
	}
	public String listperson() throws Exception {
		PageDTO pd = new PageDTO();
		
		SystemUser person = userServiceImpl.getUser();
//		SystemUser person = userServiceImpl.getUser(new Long(56));
		
		UserDTO udto = new UserDTO();
		udto.setId(person.getId());
		udto.setEmail(person.getEmail());
		udto.setPassword(person.getPassword());
		udto.setName(person.getName());
		udto.setSex(person.getSex());
		udto.setHobby(person.getHobby());
		udto.setIntroduction(person.getIntroduction());
		udto.setPicturePath(person.getPicturePath());
		
		JSONWriter writer = new JSONWriter();
		String personstring = writer.write(udto);		
		response.getWriter().print(personstring);

		return null;				

	}

	@Override
	public String input() throws Exception {
		
		return INPUT;
	}

	@Override
	public String save() throws Exception {
		//传一个SystemUser的entity进来    
		
			entity.setIsVisible(true);//统一设为可见
			if(entity.getPicturePath().toString().equals("")) {
				if(entity.getSex().toString().equals("男"))
				entity.setPicturePath("fe74e496-7a47-441a-a53a-2c28d1846e97.gif");
				if(entity.getSex().toString().equals("女"))
					entity.setPicturePath("d910c60f-7e81-4071-bff1-8f2d80a83539.gif");
			}
			//System.out.println("json==="+json);
			userServiceImpl.createUser(entity);
			if(roletreenodeid!=null&&!roletreenodeid.trim().equals("")&&!roletreenodeid.trim().equals("undefined")){
		
			Long treenodeid=new Long(roletreenodeid);
			RoleTreeNode roleTreeNode=(RoleTreeNode)treeService.getTreeNode(treenodeid);			
			UserRolePK pk=new UserRolePK(entity.getId(),treenodeid);
			UserRoleAssociation association=new UserRoleAssociation(pk);
			association.setOrderId(entity.getId());
			roleTreeNode.getAssociations().add(association);		
			treeService.saveRoleTreeNode(roleTreeNode);
			}
		
		return null;
	}
	
	public String user2adminsave() throws Exception{
	
		SystemUser user = userServiceImpl.getUser(id);
		
		//需前台传一个SystemUser的entity，保存管理员
		
		if(!(userServiceImpl.isAdmin(user))) {
			AdminUser adminuser = userServiceImpl.changeUser2Admin(user);
			userServiceImpl.createAdmin(adminuser);
		}
		return null;
		
	}
	
	public String updateuser() throws Exception {
		//需前台传一个修改后的SystemUser的entity
       
		 
	    if(!(userServiceImpl.isUserExist(entity.getEmail()))) {
	    	//  System.out.println("heheheh 222");
			entity.setIsVisible(true);//统一设为可见
			userServiceImpl.createUser(entity);
			response.getWriter().print("恭喜保存用户成功");
						
		}
		return null;
	}

	@Override
	public String delete() throws Exception {
		//需前台传一个SystemUser的id
//		Long id = new Long(3);
	//	System.out.println("已到Action了呵呵");
		userServiceImpl.deleteUser(id);
		
		return null;
	}
	@Action(value="/user",results={@Result(name = "contentpage", location = "/user.jsp")})
	public String contentpage() throws Exception {		
		return "contentpage";
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public SystemUser getEntity() {
		return entity;
	}

	public void setEntity(SystemUser entity) {
		this.entity = entity;
	}


	public UserService getUserServiceImpl() {
		return userServiceImpl;
	}
	
	@Autowired
	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}


	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response=response;		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getJson() {
		return json;
	}

	public void setJson(String json) {
		this.json = json;
	}

	public String getRoletreenodeid() {
		return roletreenodeid;
	}

	public void setRoletreenodeid(String roletreenodeid) {
		this.roletreenodeid = roletreenodeid;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	
}
