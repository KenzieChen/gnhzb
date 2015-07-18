/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package edu.zju.cims201.GOF.util;

/*
 * Generated by MyEclipse Struts Template path: templates/java/JavaClass.vtl
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.cookie.CookiePolicy;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import edu.zju.cims201.GOF.dao.patent.PatentDao;
import edu.zju.cims201.GOF.hibernate.pojo.Author;
import edu.zju.cims201.GOF.hibernate.pojo.Keyword;
import edu.zju.cims201.GOF.hibernate.pojo.Patent;


/**
 * MyEclipse Struts Creation date: 05-10-2008
 * 
 * XDoclet definition:
 * 
 * @struts.action
 */
public class Parserallpatent {
	/*
	 * Generated Methods
	 */
	private static final Log log = LogFactory.getLog(Parserallpatent.class);

	/**
	 * Method execute
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward
	 * @throws Exception
	 */
	public void setProxyServer() {
		// 设置代理服务器

		ProxyUtil.useHttpProxy();

	}

	public Patent parsercn(String content,String urlstr,String ispool)
			throws Exception {
		System.out.println("现在开始解析中国专利");
			ParsePatent_sipo parser = new ParsePatent_sipo(
					content);
			// ////////////////////////////////////////////////解析
			String app_code = parser.getApp_code().trim();
	
			// ParsePatent parser=new ParsePatent(s2);
			SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
			String app_date = parser.getApp_date().trim();
	        Date app_dated= format.parse(app_date);   
			String patent_name = parser.getName().trim();
	
			String pub_code = parser.getPub_code().trim();
	
			String pub_date = parser.getPub_date();// 5
		    Date pub_dated= format.parse(app_date);   
			String IPC1 = parser.getIPC();// 6
			// IPC1=IPC1.replaceAll("&nbsp","").replaceAll("
			// ","").replaceAll(";","");
			String cat_code = parser.getCat_code();
			// cat_code=cat_code.replaceAll("&nbsp","").replaceAll("
			// ","").replaceAll(";","");
	
			// String cer_date = parser.getCer_date();// 7
			// String priory = "";
	
			String priory = parser.getPriory();
	
			String app_person = parser.getApp_person();// 9
			
			String app_address = parser.getApp_address();// 10
	
			String inv_person = parser.getInv_person();
	
			// String int_app = "";
			String int_app = parser.getInt_app();// 12
	
			// String int_pub = "";
			String int_pub = parser.getInt_pub();// 13
	
			// String ent_nation_date = "1900-01-01";
			String ent_nation_date = parser
					.getEnt_nation_date();//
			// 14
			// 得到类型
	
			// String IPC = "";
			// String IPC_part = "", IPC_lclass = "", IPC_sclass
			// = "", outer_lclass = "", outer_sclass = "",
			String cn_type = "";
	
			int app_index = app_code.indexOf(".");
			int app_code_length = 0;
			// int cn_type_int=0;
			if (app_index != -1) {
				String app_code_temp = app_code.substring(0,
						app_index);
				app_code_length = app_code_temp.length();
				if (app_code_length == 10) {
					cn_type = app_code_temp.substring(4, 5);
				} else {
					cn_type = app_code_temp.substring(6, 7);
				}
			} else {
	
				if (app_code.length() == 10) {
					cn_type = app_code.substring(4, 5);
				} else {
					cn_type = app_code.substring(6, 7);
				}
			}
	
			String sub_agent = parser.getSub_agent();
			String sub_person = parser.getSub_person();
			// String cerdate=parser.getCer_date();
			String FullUrlTmp = parser.getFullurl();
			String powerFulTmp = parser.getPoweredurl();
			String fullurl = FullUrlTmp.substring(0, FullUrlTmp
					.indexOf("-"));
			String pagenumber = FullUrlTmp.substring(FullUrlTmp
					.indexOf("-") + 1);
			System.out.println("fullurl=" + fullurl);
	
			String poweredpagenumber = "", poweredfullurl = "";
			if (powerFulTmp.trim().length() > 0) {
				poweredfullurl = powerFulTmp.substring(0,
						powerFulTmp.indexOf("-"));
				poweredpagenumber = powerFulTmp
						.substring(powerFulTmp.indexOf("-") + 1);
	
			} else {
				poweredpagenumber = "0";
	
			}
	
			// 下载专利说明书全文代码部分结束
			String _abstract = parser.getAbstract();
			String _mainpower = parser.getMain_power();
	
			String nation_address[] = new String[] { "日本",
					"德国", "美国", "俄罗斯", "法国", "苏联", "荷兰", "奥地利",
					"澳大利亚", "以色列", "加拿大", "英国", "朝鲜", "韩国",
					"巴西", "白俄罗斯", "阿根廷", "瑞士", "墨西哥", "马来西亚",
					"瑞典", "智利", "喀麦隆", "阿富汗", "哥伦比亚", "哥斯达黎加",
					"古巴", "老挝", "安格拉", "丹麦", "阿尔及利亚", "埃及",
					"西班牙", "芬兰", "阿尔巴尼亚", "格鲁吉亚", "捷克", "希腊",
					"克罗", "匈牙利", "印度尼西亚", "爱尔兰", "菲律宾", "印度",
					"伊拉克", "伊朗", "意大利", "约旦", "葡萄牙", "保加利亚",
					"乌克兰", "泰国", "比利时", "越南", "列支敦士登", "新西兰",
					"摩纳哥", "士耳其", "新加坡", "卢森堡", "英属维尔京群岛",
					"挪威", "巴哈马", "南非", "爱沙尼亚", "人岛(英属)", "波兰",
					"马尔他", "委内瑞拉", "圣马力诺", "大韩民国", "荷属安的列斯库拉索",
					"英属维京群岛托图拉布", "巴哈马", "巴巴多斯百慕大", "斯洛伐克",
					"马耳他", "哈萨克斯坦", "沙特阿拉伯利", "巴巴多斯圣迈克尔",
					"斯洛文尼亚" };
	
			String area_address[] = new String[] { "黑龙江", "吉林",
					"辽宁", "河南", "河北", "山东", "山西", "陕西", "甘肃",
					"宁夏", "湖南", "湖北", "江西", "安徽", "江苏", "浙江",
					"福建", "台湾", "广东", "广西", "贵州", "云南", "西藏",
					"内蒙古", "新疆", "四川", "北京", "天津", "上海", "海南",
					"重庆", "澳门", "香港", "青海", "中国科学院", "佛山" };
			String app_person_nation = "";
			String app_person_area = "";
	
			int nation_index = -1;
			// int area_index=0;
	
			for (int i = 0; i < nation_address.length; i++) {
				if ((app_address.indexOf(nation_address[i])) != -1) {
					app_person_nation = "国外";
					app_person_area = nation_address[i];
					nation_index = i;
					break;
	
				}
	
			}
	
			if (nation_index == -1) {
				app_person_nation = "中国";
				for (int i = 0; i < area_address.length; i++) {
					if ((app_address.indexOf(area_address[i])) != -1) {
						// area_index=i;
						app_person_area = area_address[i];
						break;
					}
					if (i == area_address.length - 1) {
						app_person_area = "中国";
					}
				}
	
			}
			if (app_person_nation.equals("大韩民国")) {
				app_person_area = "韩国";
			}
			if (app_person_area.equals("中国科学院")) {
				app_person_area = "北京";
			}
			if (app_person_area.equals("深圳")
					|| app_person_area.equals("珠海")
					|| app_person_area.equals("广州")
					|| app_person_area.equals("佛山")) {
				app_person_area = "广东";
			}
			if (app_person_area.equals("青海")) {
				app_person_area = "山东";
			}
	
			// fso.write(file.getBody().getBytes("iso8859_1"));
	
			/*
			 * 提取IPC 分类 的部 ，大类 和小类
			 */
	        if(app_person_nation.equals("国外"));
	        app_person_nation=app_person_area;
	   
			String IPC = "";
			String IPC_part = "", IPC_lclass = "", IPC_sclass = "", outer_lclass = "", outer_sclass = ""; // cn_type
																											// =
																											// "";
	
			IPC1 = IPC1.replaceAll("&nbsp;", "");
			// 修改bug 取出解析中多于的空格&nbsp;
			pub_code = pub_code.replaceAll("&nbsp;", "");
			app_person = app_person.replaceAll("&nbsp;", "");
			app_person = app_person.trim();
			patent_name = patent_name.replaceAll("&nbsp;", "");
			cat_code = cat_code.replaceAll("&nbsp;", "");
			priory = priory.replaceAll("&nbsp;", "");
			app_address = app_address.replaceAll("&nbsp;", "");
			inv_person = inv_person.replaceAll("&nbsp;", "");
			inv_person = inv_person.trim();
			ent_nation_date = ent_nation_date.replaceAll(
					"&nbsp;", "");
			int_pub = int_pub.replaceAll("&nbsp;", "");
			sub_person = sub_person.replaceAll("&nbsp;", "");
			int_app = int_app.replaceAll("&nbsp;", "");
			sub_agent = sub_agent.replaceAll("&nbsp;", "");
			sub_agent = sub_agent.trim();
			_abstract = _abstract.replaceAll("&nbsp;", "");
			_mainpower = _mainpower.replaceAll("&nbsp;", "");
	
			if (cn_type.equals("3")) {
				try{
				IPC = IPC1;
				outer_lclass = IPC.substring(0, 2);
				outer_sclass = IPC.substring(0, 2)
						+ IPC.substring(3, 5);
				IPC_part = "0";
				IPC_lclass = "0";
				IPC_sclass = "0";
				} 
				catch(Exception e)
				{
					e.printStackTrace();
					outer_lclass = "0";
					outer_sclass = "0";
				}
	
			} else {
				outer_lclass = "0";
				outer_sclass = "0";
				// IPC1 = IPC1.replaceAll("&nbsp;", "0");
				// System.out.println(IPC1.length());
	
				IPC = IPC1;
				// System.out.println("+1");
				IPC_part = IPC.substring(0, 1);
				System.out.println("IPC_part:" + IPC_part);
				IPC_lclass = IPC.substring(0, 3);
				System.out.println("IPC_lclass:" + IPC_lclass);
				IPC_sclass = IPC.substring(0, 4);
				System.out.println("IPC_sclass:" + IPC_sclass);
	
			}
			for (; IPC.indexOf(")") != -1;) {
				IPC = IPC.substring(0, IPC.lastIndexOf("("))
						+ IPC.substring(IPC.lastIndexOf(")") + 1);
	
			}
				if(IPC.indexOf("I")!=-1)
					IPC=IPC.substring(0, IPC.length()-1);
			Calendar calendar = Calendar.getInstance();
	//			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	      Date now =calendar.getTime();
		//	String addtimestr = format.format(calendar.getTime());
	
			String ispowered = "0";
			String poweredurl = "";
			poweredurl = parser.getPoweredurl();
			if (Integer.valueOf(poweredpagenumber).intValue() > 0) {
				ispowered = "1";
			}
	     Patent patent=new Patent();
			// 存储到数据库
	     patent.setPatentId("cn");
	     patent.setAppCode(app_code);
	     patent.setAppDate(app_dated);
	     patent.setTitlename(patent_name);
	     patent.setPubCode(pub_code);
	     patent.setPubDate(pub_dated);
	     patent.setIpc(IPC);
	     patent.setCatCode(cat_code);
	     patent.setPriory(priory);
		 //添加Kauthors属性
		 Author author = new Author();
		 author.setAuthorName(app_person);
		 List<Author> authorlist = new ArrayList<Author>();
		 authorlist.add(author);
	     patent.setKauthors(authorlist);
	     
	     patent.setAppAddress(app_address);
	     patent.setInvPerson(inv_person);
	     patent.setEntNationDate(ent_nation_date);
	     patent.setIntApp(int_app);
	     patent.setIntPub(int_pub);
	     patent.setSubPerson(sub_person);
	     patent.setSubAgent(sub_agent);
	     patent.setPatAbstract(_abstract);
	     patent.setMainPower(_mainpower);
	     patent.setAppPersonNation(app_person_nation);
	     patent.setAppPersonArea(app_person_area);
	     patent.setCnType(cn_type);
	     patent.setIpcPart(IPC_part);
	     patent.setIpcLclass(IPC_lclass);
	     patent.setIpcSclass(IPC_sclass);
	     patent.setOuterOlclass(outer_lclass);
	     patent.setOuterOsclass(outer_sclass);
	     patent.setUploadtime(now);
	     patent.setFullurl(urlstr);
	     patent.setPoweredurl(poweredurl);
	     patent.setIspowered(ispowered);
	     Keyword keyword = new Keyword();
	     keyword.setKeywordName("un");
	     Set<Keyword> keywords = new HashSet<Keyword>();
	     keywords.add(keyword);
	     patent.setKeywords(keywords);
	     patent.setCategory("cp");
	     patent.setFullurltmp(fullurl);
	     patent.setPagenumber(pagenumber);
	     patent.setPoweredfullurl(poweredfullurl);
	     patent.setPoweredpagenumber(poweredpagenumber);     
	     patent.setStatus("1");
	     patent.setIsvisible(true);
		 return patent;
	}
/*
	public Patent parserus(String url, String content,String patentname,String patentid,String ispool) throws Exception {
		System.out.println("现在开始解析美国授权专利");

					// patent.setKeyword((String)name_V.get(i+1));
				//	String url = (String) href_V.get(i);

					// 解析具体页面 获得具体某一条专利的结果
		
		UStifdownload tifdownLoad = new UStifdownload();
					Patent patent = new Patent();
					PatentDao patentdao = new PatentDao();
				

					patentid = patentid.replaceAll(",", "");
				//	patentid = "US" + patentid;
			
						patent.setPatentName(patentname);
						patent.setPatentId("us");
						// 20090720 转变编码修改
//						url = URLDecoder.decode(url, "ISO-8859-1");
//						url = url.replaceAll("&quot;", "\"");
//						// 修改结束
//						String urltemp = url.replaceAll("%26", "\\&");
//						url = urltemp.replaceAll(" ", "\\+");
//						urltemp = url;
//						urltemp = url.replaceAll(Constants.usreQuestUrl, "");
//						url = urltemp.replaceAll("/", "%2F");
//						url = url.replaceAll("\\?", "");
//						// System.out.println("为获得某具体专利内容的url地址是："+url);
//
//			
//						// log.info("专利"+patentid+"具体内容是："+getString);
//						// System.out.println(getString);

						patent.setFullurl(url);
						// System.out.println("进入检索页面" + Constants.usreQuestUrl
						// + url);
						String AppCode = tifdownLoad.parserUsCode(content);

						patent.setAppCode(patentid);
						patent.setPubCode(AppCode);

						String imagepageurl = tifdownLoad
								.imagepageurl(content);
						UseHttpPost useHttpPost2 = new UseHttpPost();
						useHttpPost2.setProxyServer();
						useHttpPost2.setURL(imagepageurl);
						String getString1 = useHttpPost2.getContent2();
						String poweredpagenumber = tifdownLoad
								.images(getString1);
						// System.out.println("图片数量:"+poweredpagenumber);
						patent.setPagenumber(poweredpagenumber);
//						String imagepageurl2 = imagepageurl;
//						String imagepageurl1[] = imagepageurl2.split("\\/");
//						imagepageurl2 = imagepageurl1[2]; // PageNum
						String Docid = tifdownLoad.docid(getString1);
						String IDKey = tifdownLoad.IDkey(getString1);

						String App_date = tifdownLoad
								.parserUsApp_date(content);
						String App_datetemp = App_date.replaceAll("January",
								"01");
						App_date = App_datetemp.replaceAll("February", "02");
						App_datetemp = App_date.replaceAll("March", "03");
						App_date = App_datetemp.replaceAll("April", "04");
						App_datetemp = App_date.replaceAll("May", "05");
						App_date = App_datetemp.replaceAll("June", "06");
						App_datetemp = App_date.replaceAll("July", "07");
						App_date = App_datetemp.replaceAll("August", "08");
						App_datetemp = App_date.replaceAll("September", "09");
						App_date = App_datetemp.replaceAll("October", "10");
						App_datetemp = App_date.replaceAll("November", "11");
						App_date = App_datetemp.replaceAll("December", "12");
						String App_datetemp1[] = App_date.split(" ");
						App_date = App_datetemp1[2].trim() + "-"
								+ App_datetemp1[0].replace(",", "").trim()
								+ "-" + App_datetemp1[1].trim();

						// System.out.println("App_date:"+App_date);
						// patent.setAppDate((Date)tifdownLoad.parserUsApp_date(getString));
						Date App_date1 = null;
						DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
						// String str = null;
						// String 轉換為Date
						// str = "2008-9-2";
						try {
							App_date1 = format.parse(App_date);
							// System.out.println(App_date1);
						} catch (ParseException e) {
							e.printStackTrace();
						}
						patent.setAppDate(App_date1);
						String Abstract1 = tifdownLoad
								.parserAbstract(content);
						// System.out.println("Abstract:"+Abstract1);
						patent.setAbstract_(Abstract1);

						String InvPerson = tifdownLoad
								.parserInventor(content);
						// System.out.println("Inventor:"+InvPerson);
						patent.setInvPerson(InvPerson);

						String App_Person = tifdownLoad.parserApp_Person(
								content).trim();
						App_Person=App_Person.replaceAll("<B>", "");
				
						patent.setAppPerson(App_Person);

						// System.out.println("App_Person:"+App_Person);

						String IPC = tifdownLoad.parserIPC(content);
						// System.out.println("IPC:"+IPC);
					    //详细解析ipc
						IPC = IPC.replaceAll("&nbsp;", " ");
						IPC = IPC.replaceAll("&nbsp", " ");
					    String catcode=IPC;
					    patent.setCatCode(catcode);
						IPC=IPC.replaceAll("&nbsp;", "");
						IPC=IPC.replaceAll("）", ")");
						IPC=IPC.replaceAll("（", "(");
						IPC=IPC.replaceAll(" ", "");
						for(;IPC.indexOf(")")!=-1;){
							IPC=IPC.substring(0,IPC.lastIndexOf("("))+ IPC.substring(IPC.lastIndexOf(")")+1);
							System.out.println("IPC="+IPC);
						}
						//System.out.println("IPC="+IPC);
				     	String	IPC_part = IPC.substring(0, 1);
					//	System.out.println("IPC_part:" + IPC_part);
						String	IPC_lclass = IPC.substring(0, 3);
				//		System.out.println("IPC_lclass:" + IPC_lclass);
						String	IPC_sclass = IPC.substring(0, 4);
				//		System.out.println("IPC_sclass:" + IPC_sclass);
				         patent.setIpcPart(IPC_part);
                         patent.setIpcLclass(IPC_lclass);
                         patent.setIpcSclass(IPC_sclass);
                     	IPC=IPC.substring(0, IPC.indexOf("/")+3);
						patent.setIpc(IPC);

						String Agent = tifdownLoad.parserAgent(content);
						// System.out.println("Agent:"+Agent);
						patent.setSubAgent(Agent);
						// request.setAttribute("getstring",getString);

						String pub_date = tifdownLoad.parserPub_date(content);
						// System.out.println("pub_date:"+pub_date);

						String pub_datetemp = pub_date.replaceAll("January",
								"01");

						pub_date = pub_datetemp.replaceAll("February", "02");
						pub_datetemp = pub_date.replaceAll("March", "03");
						pub_date = pub_datetemp.replaceAll("April", "04");
						pub_datetemp = pub_date.replaceAll("May", "05");
						pub_date = pub_datetemp.replaceAll("June", "06");
						pub_datetemp = pub_date.replaceAll("July", "07");
						pub_date = pub_datetemp.replaceAll("August", "08");
						pub_datetemp = pub_date.replaceAll("September", "09");
						pub_date = pub_datetemp.replaceAll("October", "10");
						pub_datetemp = pub_date.replaceAll("November", "11");
						pub_date = pub_datetemp.replaceAll("December", "12");
						String pub_datetemp1[] = pub_date.split(" ");
						pub_date = pub_datetemp1[2].trim() + "-"
								+ pub_datetemp1[0].replace(",", "").trim()
								+ "-" + pub_datetemp1[1].trim();

						// System.out.println("pub_date:"+pub_date);
						// patent.setAppDate((Date)tifdownLoad.parserUsApp_date(getString));
						Date pub_date1 = null;
						// DateFormat format1 = new
						// SimpleDateFormat("yyyy-MM-dd");
						// String str = null;
						// String 轉換為Date
						// str = "2008-9-2";
						try {
							pub_date1 = format.parse(pub_date);
							// System.out.println(pub_date1);
						} catch (ParseException e) {
							e.printStackTrace();
						}
						patent.setPubDate(pub_date1);

						String full = Constants.usreQuestUrl + url;
						String fulltemp = null;
						fulltemp = full.replaceAll("\\:", "%3A");
						full = fulltemp.replaceAll("\\/", "%2F");
						fulltemp = full.replaceAll("\\?", "%3F");
						full = fulltemp.replaceAll("\\=", "%3D");
						fulltemp = full.replaceAll("\\&", "%2526");
						full = fulltemp.replaceAll("\\+", "%252B");
						fulltemp = full.replaceAll("\"", "%252522"); // url地址转义
						// System.out.println("fulltemp:"+fulltemp);

						// request.setAttribute("app_person", App_Person);

						patent.setFullurltmp(imagepageurl); // 图片地址的解析页面
						patent.setIshaier("false");
						patent.setCategory("fp");
						patent.setKeyword("un");
						   patent.setAppPersonNation("美国");
						   patent.setAppPersonArea("美国");
							if(null!=ispool&&ispool.equals("true"))
		                		patent.setIspool("1");
							patent.setIspc("0");
	                		patent.setIspm("0");
							patentdao.save(patent);
	                 	
			
		return patent;
	}

	public Patent parserusa(String url, String content,String patentname,String patentid,String ispool)
			throws Exception {
        
		System.out.println("现在开始解析美国申请专利");
		UStifdownload tifdownLoad = new UStifdownload();
		Patent patent = new Patent();
		PatentDao patentdao = new PatentDao();

					patentid = patentid.replaceAll(",", "");
				//	patentid = "US" + patentid;
			
						patent.setPatentName(patentname);
						patent.setPatentId("us");
					

					

						patent.setFullurl(url);
						// patent.setFullurltmp(urltemp);
						// System.out.println("进入检索页面" + Constants.us2reQuestUrl
						// + url);
						String AppCode = tifdownLoad.parserUsCode(content);

						patent.setAppCode(patentid);
						patent.setPubCode(AppCode);

						String imagepageurl = tifdownLoad.imagepageurl2(content);
						UseHttpPost useHttpPost2 = new UseHttpPost();
						useHttpPost2.setProxyServer();
						useHttpPost2.setURL(imagepageurl);
						String getString1 = useHttpPost2.getContent2();
						String poweredpagenumber = tifdownLoad
								.images(getString1);
						// System.out.println("图片数量:"+poweredpagenumber);
						patent.setPagenumber(poweredpagenumber);
					
						String App_date = tifdownLoad
								.parserUsApp_date(content);
						String App_datetemp = App_date.replaceAll("January",
								"01");
						App_date = App_datetemp.replaceAll("February", "02");
						App_datetemp = App_date.replaceAll("March", "03");
						App_date = App_datetemp.replaceAll("April", "04");
						App_datetemp = App_date.replaceAll("May", "05");
						App_date = App_datetemp.replaceAll("June", "06");
						App_datetemp = App_date.replaceAll("July", "07");
						App_date = App_datetemp.replaceAll("August", "08");
						App_datetemp = App_date.replaceAll("September", "09");
						App_date = App_datetemp.replaceAll("October", "10");
						App_datetemp = App_date.replaceAll("November", "11");
						App_date = App_datetemp.replaceAll("December", "12");
						String App_datetemp1[] = App_date.split(" ");
						App_date = App_datetemp1[2].trim() + "-"
								+ App_datetemp1[0].replace(",", "").trim()
								+ "-"
								+ App_datetemp1[1].replace(",", "").trim();

						// System.out.println("App_date:"+App_date);
						// patent.setAppDate((Date)tifdownLoad.parserUsApp_date(getString));
						Date App_date1 = null;
						DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
						// String str = null;
						// String 轉換為Date
						// str = "2008-9-2";
						try {
							App_date1 = format.parse(App_date);
							// System.out.println(App_date1);
						} catch (ParseException e) {
							e.printStackTrace();
						}
						patent.setAppDate(App_date1);
						String Abstract1 = tifdownLoad
								.parserAbstract(content);
						// System.out.println("Abstract:"+Abstract1);
						patent.setAbstract_(Abstract1);

						String InvPerson = tifdownLoad
								.parserInventor(content);
						// System.out.println("Inventor:"+InvPerson);
						patent.setInvPerson(InvPerson);

						String App_Person = tifdownLoad.parserApp_Person(
								content).trim();

						patent.setAppPerson(App_Person);

						// System.out.println("App_Person:"+App_Person);

						String IPC = tifdownLoad.parserIPC2(content);
						// System.out.println("IPC:"+IPC);
					    //详细解析ipc
						IPC = IPC.replaceAll("&nbsp;", " ");
						IPC = IPC.replaceAll("&nbsp", " ");
					    String catcode=IPC;
					    patent.setCatCode(catcode);
						IPC=IPC.replaceAll("&nbsp;", "");
						IPC=IPC.replaceAll("）", ")");
						IPC=IPC.replaceAll("（", "(");
						IPC=IPC.replaceAll(" ", "");
						for(;IPC.indexOf(")")!=-1;){
							IPC=IPC.substring(0,IPC.lastIndexOf("("))+ IPC.substring(IPC.lastIndexOf(")")+1);
							//System.out.println("IPC="+IPC);
						}
						//System.out.println("IPC="+IPC);
						//if()
				     	String	IPC_part = "";
				     	String	IPC_lclass="";
				     	String	IPC_sclass="";
				     	if(IPC.length()>=1)
				     	{	IPC.substring(0, 5);
					//	System.out.println("IPC_part:" + IPC_part);
				     	
				     	
							IPC_lclass = IPC.substring(0, 3);
				//		System.out.println("IPC_lclass:" + IPC_lclass);
							IPC_sclass = IPC.substring(0, 4);
				//		System.out.println("IPC_sclass:" + IPC_sclass);
					   	IPC=IPC.substring(0, IPC.indexOf("/")+3);
					   	
				     	}
				         patent.setIpcPart(IPC_part);
                         patent.setIpcLclass(IPC_lclass);
                         patent.setIpcSclass(IPC_sclass);
						patent.setIpc(IPC);

						String Agent = tifdownLoad.parserAgent(content);
						// System.out.println("Agent:"+Agent);
						patent.setSubAgent(Agent);
						// request.setAttribute("getstring",getString);

						String pub_date = tifdownLoad.parserPub_date(content);
						// System.out.println("pub_date:"+pub_date);

						String pub_datetemp = pub_date.replaceAll("January",
								"01");

						pub_date = pub_datetemp.replaceAll("February", "02");
						pub_datetemp = pub_date.replaceAll("March", "03");
						pub_date = pub_datetemp.replaceAll("April", "04");
						pub_datetemp = pub_date.replaceAll("May", "05");
						pub_date = pub_datetemp.replaceAll("June", "06");
						pub_datetemp = pub_date.replaceAll("July", "07");
						pub_date = pub_datetemp.replaceAll("August", "08");
						pub_datetemp = pub_date.replaceAll("September", "09");
						pub_date = pub_datetemp.replaceAll("October", "10");
						pub_datetemp = pub_date.replaceAll("November", "11");
						pub_date = pub_datetemp.replaceAll("December", "12");
						String pub_datetemp1[] = pub_date.split(" ");
						pub_date = pub_datetemp1[2].trim() + "-"
								+ pub_datetemp1[0].replace(",", "").trim()
								+ "-"
								+ pub_datetemp1[1].replace(",", "").trim();

						// System.out.println("pub_date:"+pub_date);
						// patent.setAppDate((Date)tifdownLoad.parserUsApp_date(getString));
						Date pub_date1 = null;
						// DateFormat format1 = new
						// SimpleDateFormat("yyyy-MM-dd");
						// String str = null;
						// String 轉換為Date
						// str = "2008-9-2";
						try {
							pub_date1 = format.parse(pub_date);
							// System.out.println(pub_date1);
						} catch (ParseException e) {
							e.printStackTrace();
						}
						patent.setPubDate(pub_date1);

						String full = Constants.us2reQuestUrl + url;
						String fulltemp = null;
						fulltemp = full.replaceAll("\\:", "%3A");
						full = fulltemp.replaceAll("\\/", "%2F");
						fulltemp = full.replaceAll("\\?", "%3F");
						full = fulltemp.replaceAll("\\=", "%3D");
						fulltemp = full.replaceAll("\\&", "%2526");
						full = fulltemp.replaceAll("\\+", "%252B");
						fulltemp = full.replaceAll("\"", "%252522"); // url地址转义
						// System.out.println("fulltemp:"+fulltemp);

						patent.setFullurltmp(imagepageurl); // 图片地址的解析页面
						patent.setIshaier("false");
						patent.setCategory("fp");
						patent.setKeyword("un");
						   patent.setAppPersonNation("美国");
						   patent.setAppPersonArea("美国");
							patent.setIspc("0");
							patent.setIspm("0");
							if(null!=ispool&&ispool.equals("true"))
		                		patent.setIspool("1");
	                         patentdao.save(patent);
					return patent;
	}

	public Patent parserep(String url, String patentname,
			String content,String patentid,String host,String ispool)
			throws Exception {
        Patent patent=new Patent();
						patent.setPatentName(patentname);
						patent.setPatentId("ep");

						// System.out.println("为获得某具体专利内容的url地址是：" + url);
						 UseHttpPost useHttpPost=new UseHttpPost();
						 useHttpPost.setProxyServer();
						useHttpPost.setURL(url);
			            System.out.println("epurl==="+url);
						String getString = useHttpPost.getContent2();

				
						EPtifdownload tifdownLoad = new EPtifdownload();
						patent.setFullurl(url);

						// System.out.println("patentname"+patentname);
						// System.out.println("patentid"+patentid);
						// System.out.println("进入检索页面" + url);

						patent = tifdownLoad.parserEp(getString, patent);
					
						// System.out.println("AppCode:" + AppCode);
						patent.setAppCode(patentid);
						patent.setPubCode(patentid);

						// request.setAttribute("newapp_person",patent.getAppPerson());
						String imagehref = patent.getFullurltmp();
						if (!imagehref.equals("")) {
							String[] imagehrefs = imagehref
									.split("@@@@######@@@@@");

							imagehref = "";
							for (int t = 0; t < imagehrefs.length; t++) {
								imagehref += host + imagehrefs[t]
										+ "@@@@######@@@@@";
							}
							if (imagehrefs.length > 1) {
								patent.setPagenumber(imagehrefs.length + "");
								// request.setAttribute("pagenumber",imagehrefs.length+"");
							}
							// else
							// request.setAttribute("pagenumber","0");
						}
						patent.setFullurltmp(imagehref);
						patent.setCategory("fp");
						patent.setKeyword("un");
						patent.setIspc("0");
						patent.setIspm("0");
						if(null!=ispool&&ispool.equals("true"))
	                		patent.setIspool("1");
						//patent.setKeyword("un");
						   PatentDao patentdao=new PatentDao();
						   
						    patentdao.save(patent);
		return patent;
	}

	public Patent Parserjp(Patent patent,String content,String ispool)
			throws Exception 
			{
		PatentDao patentdao=new PatentDao();
		String IPC=patent.getIpc();
		IPC=IPC.replaceAll(" ", "");
		//System.out.println("IPC="+IPC);
     	String	IPC_part = IPC.substring(0, 1);
	//	System.out.println("IPC_part:" + IPC_part);
		String	IPC_lclass = IPC.substring(0, 3);
//		System.out.println("IPC_lclass:" + IPC_lclass);
		String	IPC_sclass = IPC.substring(0, 4);
//		System.out.println("IPC_sclass:" + IPC_sclass);
         patent.setIpc(IPC);
         patent.setIpcPart(IPC_part);
         patent.setIpcLclass(IPC_lclass);
         patent.setIpcSclass(IPC_sclass);
     	String appperson=patent.getAppPerson();
         appperson=appperson.replaceAll("&lt;", "[");
         appperson=appperson.replaceAll("&gt;", "]");
         appperson=appperson.replaceAll("&amp;", ";");
         appperson=appperson.replaceAll(";", " ");
		patent.setAppPerson(appperson);
		patent.setAppPersonArea("日本");
		patent.setAppPersonNation("日本");
	//	patent.setIspc("0");
		if(null==patent.getIspc()||patent.getIspc().equals(""))
		{
			patent.setIspc("0");
		}
		patent.setIspm("0");
		if(null!=ispool&&ispool.equals("true"))
    		patent.setIspool("1");
		patentdao.save(patent);
		return  patent;
			}
	
	public void pressrecord(String patentid,String userid) throws Exception {
		// 添加titleid 的点击数

		PressDAO pressdao = new PressDAO();
		Press press = new Press();
		press.setKnowledgeid(patentid + "");
		press.setType("tpatent");
		List presslist = pressdao.findByExample(press);
		int viewtimes = presslist.size();
		viewtimes += 1;
		press.setDup("1");
		presslist = pressdao.findByExample(press);
		int viewpeople = presslist.size();

		Date time = Calendar.getInstance().getTime();
		if (!userid.equals("0")) {// 用户登陆
			
			press.setUsername(userid + "");
			presslist = pressdao.findByExample(press);
			if (presslist.size() == 0) {

				press.setTime(time);
				pressdao.save(press);
				presslist = pressdao.findByExample(press);
				viewpeople += 1;
			} else {

				press.setDup("0");
				press.setTime(time);
				pressdao.save(press);

			}
		} else// 用户没有登录，只增加浏览次数
		{
			press.setDup("0");
			press.setUsername("-1");
			press.setTime(time);
			pressdao.save(press);

		}
		
	}
*/	
}