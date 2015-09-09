var taskid;
//var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
var myPager = Edo.create({
	id: 'paging',
	type: 'pagingbar',
    border: 0,
    padding:[0,0,0,0], cls: 'e-toolbar',
    width: '100%',
    height: 20
});	
myPager.index = 0;
myPager.size = 15;
Edo.build({
	type: 'app',
	width: '100%',
	height: '100%',
	border:[0,0,0,0],
	padding:[0,0,0,0],
	render: document.body,
	children:[
        {
        type: 'box',
        width: '100%',
        height: '100%',
        enableCollapse: true,   //1)设置为可伸缩               
        splitRegion: 'north',   //2)设置调节方向
        splitPlace: 'after' ,
        padding:[0,0,0,0],
        border:[0,0,0,0],
        verticalGap:'0',
        children:[
            {
			type: 'group',
		    width: "100%",
		    layout: 'horizontal',
		    cls: 'e-toolbar',
		    children: [
        		{type: 'button', text: '查看任务',width:100,
		        	onclick: function(e){
		        		if(!Edo.get("detail")){
		    		    	var content=new taskdetail().getdetail();
		    		    	this.parent.parent.addChild(content);
		    		    	}
		        		var r = Edo.get("myjob").getSelected();
			        	taskid=r.id;
			        	Edo.get('taskname').set('text', r.name);
			        	Edo.get('carriername').set('text', r.carriername);
			        	Edo.get('starttime').set('text', r.starttime);
			        	Edo.get('finishtime').set('text', r.endtime);
			        	/*Edo.get('pjname').set('text', r.projectname);*/}},
	        	{type: 'button', text: '执行任务',width:100,
		        	onclick: function(e){
		        		var r = Edo.get("myjob").getSelected();
			        	taskid=r.id;
		        		window.open(basepathh+'/cqz/js/pdm/re.jsp?taskid='+taskid);}}
		    ]
			} ,      
           {
			id: 'myjob', 
			type: 'table', 
			width: '100%', 
			height: '100%',
			//autoColumns: true,
			border:[0,0,0,0],
			padding:[0,0,0,0],
		    rowSelectMode : 'single',
		    /*horizontalLine:false,
		    verticalLine:false,*/
		    horizontalScrollPolicy:'off',
		    columns:[{	    	
	                headerText: '编号',
	                headerAlign: 'center',
	                align: 'center',
	                width: 100,height:80,                     
	                //enableSort: false,
	                //enableDragDrop: true,
	                //enableColumnDragDrop: false,
	                style:  'cursor:move;',
	                renderer: function(v, r, c, i, data, t){
	                    return i+1;
	            	}
	            },
	            {header:'任务名称',dataIndex: 'name', headerAlign: 'center',align: 'center',width: 250,height:80},
/*	            {header:'创建时间',dataIndex: 'jobtime',headerAlign: 'center',align: 'center',width: 200,height:80,renderer: function(v, r, c, i, data, t){
	                return v;
	        	}},*/
	            
	            {header:'要求开始时间',dataIndex: 'starttime',headerAlign: 'center',align: 'center',width: 200,height:80,
	            },
	            {header:'要求完成时间',dataIndex: 'endtime', headerAlign: 'center',width: 200,height:80,align: 'center'},
	            {header:'状态',dataIndex: 'status', headerAlign: 'center',align: 'center',width: 150,height:80},
	            {header:'完成度',dataIndex: 'finish', headerAlign: 'center',align: 'center',width: 150,height:80},
		    ]
	/*	    onselectionchange: function(e){	
		    	if(!Edo.get("detail")){
		    	var content=new taskdetail().getdetail();
		    	this.parent.parent.addChild(content);
		    	}
		    	var r = this.getSelected();
	        	Edo.get('taskname').set('text', r.name);
	        	Edo.get('carriername').set('text', r.carriername);
	        	Edo.get('starttime').set('text', r.starttime);
	        	Edo.get('finishtime').set('text', r.endtime);
	        	Edo.get('pjname').set('text', r.projectname);
	        	taskid=r.id;
			}*/
		    
		},
		myPager]}
		]
});
search();
myPager.on('paging',function(e){
	search();	
});	
function search(){ 
	//alert('ss')
	    var index = myPager.index;    
	    var size = myPager.size;	
	    var data = cims201.utils.getData("pdmtask/task!getMytasks.action",{index:index,size:size,tasktype:"Pdm"});
	    var myTable=Edo.get("myjob");
	    myTable.data.load(data.data);
		myPager.total = data.total;
		myPager.totalPage = data.totalPage;
		myPager.refresh();
}
function taskdetail(id){
	var detail=Edo.create(
			{
    	                    /*type: 'ct',
    	                    width: '100%',*/
				 			type: 'panel',
				 			id:'detail',
    	                    title: '任务详情',
    	                    width: '100%',
    	                    height: 200,
    	                    enableCollapse: true,   //1)设置为可伸缩               
    	                    splitRegion: 'south',   //2)设置调节方向
    	                    splitPlace: 'before' ,
    	                    style:'border:0;',
    	        			padding:[0,0,0,0],
    	                    children:[
    	                              {
    	                  	    	    type: 'box',
    	                  	    	    width: '100%',
    	                  	    		height:50,
    	                  	    	    layout: 'horizontal',
    	                  	    	    style:'border:0;',
    	                  	    	    padding:[5,0,0,0],
    	                  	    	    children:[
	                  	    	            {	type : 'formitem',label : '任务名称:',labelWidth : 100,labelAlign : 'center',
							               	    children : [{type : 'text',width : 200,id : 'taskname'}]
							               	},
	    					               	{	type : 'formitem',label : '执行人:',labelWidth : 100,labelAlign : 'center',
	    						               	    children : [{type : 'text',width : 200,id : 'carriername'}]
						               	    }
						               	]
    	                              },
    	                              {
	    	                  	    	    type: 'box',
	    	                  	    	    width: '100%',
	    	                  	    		height:50,
	    	                  	    	    layout: 'horizontal',
	    	                  	    	    style:'border:0;',
	    	                  	    	    padding:[0,0,0,0],
	    	                  	    	    children:[
											{	type : 'formitem',label : '要求开始时间:',labelWidth : 100,labelAlign : 'center',
												    children : [{type : 'text',width : 200,id : 'starttime'}]
									        } ,
									        {	type : 'formitem',label : '要求结束时间:',labelWidth : 100,labelAlign : 'center',
											    children : [{type : 'text',width : 200,id : 'finishtime'}]
									        } 
                  	    	                ]
    	                              }
    	                              	
    	                               
    	                               ]
    	                    	
    	                    
    	                }
    	     
    	);
		
		
		
	this.getdetail=function(){
		return detail;
	}
}



























/*


var taskid;
var myPager = Edo.create({
	id: 'paging',
	type: 'pagingbar',
    border: 0,
    padding:[0,0,0,0], cls: 'e-toolbar',
    width: '100%',
    height: '30'
});	
myPager.index = 0;
myPager.size = 15;
Edo.build({
	type: 'app',
	width: '100%',
	height: '100%',
	border:[0,0,0,0],
	padding:[0,0,0,0],
	render: document.body,
	children:[
	          {
    	                    type: 'ct',
    	                    width: '100%',
    	                    height: '100%',
    	                    enableCollapse: true,   //1)设置为可伸缩               
    	                    splitRegion: 'north',   //2)设置调节方向
    	                    splitPlace: 'after' ,
    	                    padding:[0,0,0,0],
    	                    children:[{
		id: 'myjob', 
		type: 'table', 
		width: '100%', 
		height: '100%',
		autoColumns: true,
		padding:[0,0,0,0],
	    rowSelectMode : 'single',
	    columns:[{	    	
                headerText: '',
                align: 'center',
                width: 10,                        
                enableSort: false,
                enableDragDrop: true,
                enableColumnDragDrop: false,
                style:  'cursor:move;',
                renderer: function(v, r, c, i, data, t){
                    return i+1;
            	}
            },
            {header:'任务名称',dataIndex: 'name', headerAlign: 'center',align: 'center'},
            {header:'创建时间',dataIndex: 'jobtime', headerAlign: 'center',align: 'center'},
            {header:'要求开始时间',dataIndex: 'starttime',headerAlign: 'center',align: 'center',
            },
            {header:'要求完成时间',dataIndex: 'endtime', headerAlign: 'center',align: 'center'},
            {header:'状态',dataIndex: 'status', headerAlign: 'center',align: 'center'},
            {header:'完成度',dataIndex: 'finish', headerAlign: 'center',align: 'center'},
	    ],
	    onselectionchange: function(e){	
	    	if(!Edo.get("detail")){
	    	var content=new taskdetail().getdetail();
	    	this.parent.parent.addChild(content);
	    	}
	    	var r = this.getSelected();
        	Edo.get('taskname').set('text', r.name);
        	Edo.get('carriername').set('text', r.carriername);
        	Edo.get('starttime').set('text', r.starttime);
        	Edo.get('finishtime').set('text', r.endtime);
        	Edo.get('pjname').set('text', r.projectname);
        	taskid=r.id;
		}
	    
	},
	myPager]}
	]
});
search();
myPager.on('paging',function(e){
	search();	
});	
function search(){ 
	    var index = myPager.index;    
	    var size = myPager.size;		   
	    var data = cims201.utils.getData("task/task!getMytasks.action",{index:index,size:size});
	    var myTable=Edo.get("myjob");
	    myTable.data.load(data.data);
		myPager.total = data.total;
		myPager.totalPage = data.totalPage;
		myPager.refresh();
}
function taskdetail(id){
	var detail=Edo.create({
		    id:'detail',
    	    type: 'box',
    	    width: '100%',
    		height:'100%',
    	    layout: 'vertical',
    	    children:[
    	       
    	                {
    	                    type: 'ct',
    	                    width: '100%',
    	                    height: 150,
    	                    enableCollapse: true,   //1)设置为可伸缩               
    	                    splitRegion: 'north',   //2)设置调节方向
    	                    splitPlace: 'after' ,
    	                    children:[
    	                              {
    	                  	    	    type: 'box',
    	                  	    	    width: '100%',
    	                  	    		height:'33%',
    	                  	    	    layout: 'horizontal',
    	                  	    	    children:[
	                  	    	            {	type : 'formitem',label : '任务名称:',labelWidth : 100,labelAlign : 'center',
							               	    children : [{type : 'text',width : 200,id : 'taskname'}]
							               	},
	    					               	{	type : 'formitem',label : '创建人:',labelWidth : 100,labelAlign : 'center',
	    						               	    children : [{type : 'text',width : 200,id : 'carriername'}]
						               	    }
						               	]
    	                              },
    	                              {
	    	                  	    	    type: 'box',
	    	                  	    	    width: '100%',
	    	                  	    		height:'33%',
	    	                  	    	    layout: 'horizontal',
	    	                  	    	    children:[
											{	type : 'formitem',label : '要求开始时间:',labelWidth : 100,labelAlign : 'center',
												    children : [{type : 'text',width : 200,id : 'starttime'}]
									        } ,
									        {	type : 'formitem',label : '要求结束时间:',labelWidth : 100,labelAlign : 'center',
											    children : [{type : 'text',width : 200,id : 'finishtime'}]
									        } 
                  	    	                ]
    	                              },
    	                              {
	    	                  	    	    type: 'box',
	    	                  	    	    width: '100%',
	    	                  	    		height:'33%',
	    	                  	    	    layout: 'horizontal',
	    	                  	    	    children:[
											   {	type : 'formitem',label : '项目名称:',labelWidth : 100,labelAlign : 'center',
							               	    children : [{type : 'text',width : 200,id : 'pjname'}]
							               	},
							             	{type:'button',text:'执行项目',onclick: function(e){
							             		window.open('taskcommit.jsp?taskid='+taskid);
	    	                              	}},
							               	{type:'button',text:'分配任务',onclick: function(e){
		    	                              		
		    	                              		Edo.get('modulebuilder').set('src',basepathh+'//taskassignment.jsp?taskid='+taskid);
		    	                              	}}
	    	                  	    	              ]
    	                              }
    	                              	
    	                               
    	                               ]
    	                    	
    	                    
    	                }, 
    	                {
		    	        	type: 'module',
		    	        	id:'modulebuilder',
		    	    		width: '100%',
		    	    		height:'100%'
    	        }
    	    ]
    	});
		
		
		
	this.getdetail=function(){
		return detail;
	}
}*/
