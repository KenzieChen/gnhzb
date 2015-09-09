//var basepathh='http://localhost:8080/gnhzb';
var basepathh='/gnhzb';
function getmytask(){
var taskid;
var myPager = Edo.create({
	id: 'paging',
	type: 'pagingbar',
    border: 1,padding:2, cls: 'e-toolbar',
    width: '100%',
    height: '30'
});	
myPager.index = 0;
myPager.size = 15;
var mytask=Edo.create(
	  {
        type: 'ct',
        width: '100%',
        height: '100%',
        enableCollapse: true,   //1)设置为可伸缩               
        splitRegion: 'north',   //2)设置调节方向
        splitPlace: 'after' ,
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
		
);
this.getmytaskcontent=function(){
	return mytask;
}
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
							             	{type:'button',text:'执行任务',onclick: function(e){
							             		openNewTab(001, 'CodeClassDefi',"<div class=cims201_tab_font align=center>"+'零部件分类定义'+"</div>",{type:'CodeClassDefi',btIcon:'cims201_myknowledgebase_icon_'+'CodeClassDefi'+'_small'});					             		
	    	                              	}},
							               	{type:'button',text:'分配任务',onclick: function(e){
		    	                              		
		    	                              		Edo.get('modulebuilder').set('src',basepathh+'/cqz/js/pdm/taskassignment.jsp?taskid='+taskid);
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
}
}