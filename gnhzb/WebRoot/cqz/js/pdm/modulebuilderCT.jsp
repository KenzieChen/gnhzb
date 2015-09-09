<%@ page contentType="text/html;charset=UTF-8"%>
<%
String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<html>
	<head>
		<title>环境化设计知识服务平台</title>
	</head>
	<body style="margin: 0px;  width: 100%; overflow:hidden;" scroll="no">
	<div id="moduledefineContainer"
		style="position:absolute;overflow:hidden;top:50px;width:0px;right:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="stagebutton"
		style="position:absolute;overflow:hidden;left:0px;top:200px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="modulebutton"
		style="position:absolute;overflow:hidden;right:0px;top:200px;cursor:default;padding-top:0px;z-index:1">
	</div>
	<div id="builder"
		style="position:absolute;overflow:hidden;top:0px;left:0px;right:0px;bottom:0px;cursor:default;padding-top:0px;">
		<iframe id="aa" height= 100%  width=100%  src="<%=basePath%>cqz/js/pdm/modulebuilder.jsp"></iframe>
	</div>
	<div id="productContainer
		style="position:absolute;overflow:hidden;top:50px;left:0px;width:0px;cursor:default;padding-top:0px;z-index:1">
	</div>
	</body>
</html>
  	
  	<script type="text/javascript">
  		//整个应用的全局变量
  		//系统用户
  		cims201User = null;
  		
  	</script>
     	<link rel="stylesheet" type="text/css"
			href="<%=basePath%>css/welcome.css">
		<link href="<%=basePath%>css/liuchang/edo_orange_theme/res/css/edo-all.css" rel="stylesheet"
			type="text/css" />
		<link href="<%=basePath%>css/icon.css" rel="stylesheet"
			type="text/css" />

		<script src="<%=basePath%>css/liuchang/edo_orange_theme/edo.js" type="text/javascript"></script>
		<script src="<%=basePath %>js/cims201.js" type="text/javascript"></script>
		<script src="<%=basePath%>js/utils.js" type="text/javascript"></script>	
		<%-- <script src="<%=basePath%>js/lca/moduledefine.js" type="text/javascript"></script> --%>
		<script src="<%=basePath%>js/lca/pdm_moduledefine.js" type="text/javascript"></script>
		<%-- <script src="<%=basePath%>js/lca/lca_moduledefine_CT.js" type="text/javascript"></script> --%>
		<script src="<%=basePath %>js/swfupload/swfupload.js" type="text/javascript"></script>
	
	<!-- 统计分析 -->
	
	<!-- 系统管理 -->
		<!-- 本体编辑管理 -->
	<!--标准集成  -->
	
	<script type="text/javascript">
	//传递模型对象到iframe aa,即构建页面中
	function delivermoduleobject(){
		aa.initmodule(moduleobj);
	
	}
	function movemoduleprocessdiv(){
		var sb=document.getElementById('stagebutton');
		sb.style.width='0px';
		movep();
	}
	function movemodulediv(){
		var sb=document.getElementById('modulebutton');
		sb.style.width='0px';
		move();
	}
    function resetmoduledefineContainer(){
        var sb=document.getElementById('modulebutton');
        var a=document.getElementById('moduledefineContainer');
		sb.style.width='0px';
		if(a.style.width!="0px"){
	            a.style.width="0px";
	            resetm();
            	}
       	if(Edo.get('moduleprocesschoosebox')){
       	 Edo.get('moduleprocesschoosebox').destroy();
       	}
        if(Edo.get('moduleprocessbox')){
       	 Edo.get('moduleprocessbox').destroy();
       	}
		
    }
	//var toolbar=getnextbar();
	/* var content=new gettypedefine();
	var win=new Edo.containers.Window();
	var win = new Edo.containers.Window();
	win.set('title','选择构建类型');
	win.set('titlebar',
	    [      //头部按钮栏
	        {
	            cls: 'e-titlebar-close',
	            onclick: function(e){
	                //this是按钮
	                //this.parent是按钮的父级容器, 就是titlebar对象
	                //this.parent.owner就是窗体
	                this.parent.owner.destroy();
	                //deleteMask();
	            }
	        }
	    ]
	);
	
	win.addChild({
	    type: 'box',
	    width: 300,
	    height: 200, 
	    style:'border:0;',
	    padding:0,
	    children: content
	});	
	deleteMask();
    win.show('center', 'middle', true); */
    var c=document.getElementById('moduledefineContainer');
    var t;
    var m=0;
    //展开模型信息panel
    function move(){ 
		     if(m<400){
		         m=m+10;
    			 c.style.width=m;
    			 t=setTimeout('move()',10);
		     }
	     	
    }
    //重置宽度计数m
    function resetm(){
    	m=0;
    }
    var a=document.getElementById('productContainer');
    //a.addEventListener('mouseover', movep, false);
    var t1;
    var m1=0;
     //展开零件信息panel
    function movep(){ 
 		if(m1<400){
	     m1=m1+20;
		 a.style.width=m1;
		 t1=setTimeout('movep()',1);
 
		}
	}
    function resetm1(){
    	m1=0;
    }
    //定义模型类型选择
    function gettypedefine(){
	
	var content = Edo.create(
	    {type: 'box',width: '100%',height:'70%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',horizontalAlign:'center',verticalAlign:'middle',
       	    children: [
       	    	{	type : 'button',text : '已有产品模块化过程',width:150,height:40,align:'center',onclick:function(e){/* moduleobj.moduletype='PDM'; */moduleobj.moduletype='PDM';moduleobj.style='oldprocess';delivermoduleobject(); aa.buildoldproductpdmmodule();this.parent.parent.parent.destroy();}
       	    },
       	    {	type : 'button',text : '新产品的模块化过程',width:150,height:40,align:'center',onclick:function(e){moduleobj.moduletype='PDM';moduleobj.style='newprocess';delivermoduleobject();aa.buildnewproductpdmmodule();this.parent.parent.parent.destroy();}
       	    }	           
       	   /*  {	type : 'button',text : 'LCA模型',width:150,height:40,align:'center',onclick:function(e){moduleobj.moduletype='LCA';new getlcamoduledefine();this.parent.parent.parent.destroy();}
       	    },
       	    {	type : 'button',text : 'PDM模型',width:150,height:40,align:'center',onclick:function(e){moduleobj.moduletype='PDM';new getPDMmoduledefine();this.parent.parent.parent.destroy();} 
       	    } */
       	    ]
       	});
       	return content;
       	
       	}
	function createcompmodule(){
		var sb=document.getElementById('stagebutton');
		sb.style.width='0px';
		movep();
	}
	function createmoduledefinediv(){
		var sb=document.getElementById('stagebutton');
		sb.style.width='0px';
		movep();
	}
 	//构建模型信息
 	function moduledivdefine(){
	    Edo.create(
		    {
	        id:'mdct',
	        type: 'panel',
	       	title: '模型信息',
	        width: 400,
	        height: 600,
	        verticalGap:'0',
	        horizontalGap:'0',
	  		padding:[0,0,0,0],
	    	render: document.getElementById('moduledefineContainer'),
	        collapseProperty: 'width',
	        enableCollapse: true,
	        layout:'vertical',
	        /* titlebar:[
	           {
	            cls:'e-titlebar-toggle-east',
	            icon: 'button',
	            align:'left',
	            onclick: function(e){
		          	resetmoduleproces();
		            createmb();
	            }
	            }
	        ] */
	        });
       } 
       
       //创建查看模型信息按钮
    function createmb(){
	    var mb=document.getElementById('modulebutton');
		 mb.style.width='20px';
		 mb.style.height='100px';
		 var e1 = document.createElement("input");  
	     e1.type = "button";
	     //e.style.top='200px';
	     e1.style.width='20px';
	     e1.style.height='100px';
	     e1.style.right='0px';
	     e1.style.position='absolute';
	     e1.value = '查\n看\n模\n型\n';  
	     e1.onclick=function(){
	    	 mb.removeChild(e1);
	    	 move();
	     }
	     mb.appendChild(e1);	
    }
    //构建零部件树信息
    function processdivdefine(){
        Edo.create(
	    {
        id:'processct',
        type: 'panel',
       	title: '选择零部件类别和生命周期边界',
        width: 400,
        height: 600,
        verticalGap:'0',
        horizontalGap:'0',
  		padding:[0,0,0,0],
    	render: a,
        collapseProperty: 'width',
        enableCollapse: true,
        layout:'horizontal',
        titlebar:[
           {
            cls:'e-titlebar-toggle-west',
            icon: 'button',
   			onclick: function(e){
   			resetmoduleproces();
   			createsb();
   			}
   			}
	          
        ]
       });

       }
       function resetmoduleproces(){
          var a=document.getElementById('moduledefineContainer');
          if(a.style.width!="0px"){
           a.style.width="0px";
           resetm();
          	}
          }
       function initgraph(){
    	   moduleobj.moduletype='PDM';
           delivermoduleobject(); 
           aa.buildproductpdmmodule();
          /*  new moduledivdefine();
           var box= new moduleprocesschoosedefine();
           Edo.get('mdct').addChild(box);
           movemodulediv(); */
       }
       function moduleprocesschoosedefine(){
       var box=Edo.create( 
           {type: 'box',id:'moduleprocesschoosebox',width: '100%',height:'100%',border: [0,0,0,0],padding: [0,0,0,0],layout: 'vertical',
       	    children: [
                {
	        	type: 'button',
	        	text: '上移',
	        	onclick: function(e){
	        	var r=choosenprocess.getSelected();
	        	alert(choosenprocess.data.indexOf(r))
	        	var index=choosenprocess.data.indexOf(r);
	        	choosenprocess.data.move(r,index-1) 
	        	alert(choosenprocess.data.indexOf(r))
	        	}
                },
                {
	        	type: 'button',
	        	text: '查询',
	        	onclick: function(e){
	        	var r=choosenprocess.getSelected();
	        	alert(choosenprocess.data.indexOf(r))
	        	}
                },        	
	            {
	        	id: 'choosenprocess',
	        	type: 'table', 
	        	width: '100%', 
	        	height: '100%',
	        	autoColumns: true,
	            padding:[0,0,0,0],
				rowSelectMode : 'single',
				columns:[
				   {headerText: '',
				    dataIndex: 'num',
	                align: 'center',
	                width: 10,                        
	                enableSort: false,
	                enableDragDrop: true,
	                enableColumnDragDrop: false,
	                style:  'cursor:move;',
	                renderer: function(v, r, c, i, data, t){
	                return i+1;}},
	                Edo.lists.Table.createMultiColumn(),
	                {header:'模块名称',dataIndex: 'name', width: '100',headerAlign: 'center',align: 'center'}],
	                data:[{name:'a'},{name:'b'},{name:'c'}]
	            }
	        ]
	       });
	       return box;
       }
     
</script>
