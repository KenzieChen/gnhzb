package edu.zju.cims201.spider.grabnews.uggdhy.rule;

import java.util.regex.Pattern;

import edu.zju.cims201.spider.commontool.UrlRule;

public class HyUrlRule extends UrlRule{
	protected String exclusion_url = "css|js|jpg|png|gif|swf|pdf|doc|CSS|JS|JPG|PNG|GIF|SWF|PDF|DOC";

	protected String regExForHouzui = "\\.aspx|\\.asp|\\.css|\\.js|\\.jpg|\\.png|\\.gif|\\.swf|\\.pdf|\\.doc|\\.CSS|\\.JS|\\.JPG|\\.PNG|\\.GIF|\\.SWF|\\.PDF|\\.DOC";

//	protected String egExuserfulurl = "http://www.bzw.cn/";
	protected String egExuserfulurl = "http://www.uggd.com/news/hynews/";
	
//	protected String newspageurlpattern = "http://www.bzw.com.cn/article/show.asp\\?id=\\d+|http://www.bzw.com.cn/standard_plan/list_ProjectBook_open.asp\\?project_id=\\d+";
	protected String newspageurlpattern = "http://www.uggd.com/news/hynews/\\d{4}-\\d{2}-\\d{2}/\\d{5}.html";
//	protected String newspageurlpattern = "http://www.uggd.com/news/hynews/2012-08-20/27593.html";
	
	public boolean isUrlAdd(String url) {
		boolean isUrlAdd = false;
		if (isNewsPage(url)||isMediaSource(url)) {
			isUrlAdd = true;
		}		
		return isUrlAdd;
	}
	
	public boolean isNewsPage(String url) {
		boolean isNewsPage = false;
		isNewsPage = Pattern.compile(newspageurlpattern).matcher(url).find();
		return isNewsPage;
	}
}
