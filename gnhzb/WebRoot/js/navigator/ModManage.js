function createNav_ModManageAccordin(){
	var myModManageAccordin = Edo.create({
			id:'leftPanel',
			type:'ct',
			//title:'<div class=cims201_tab_font align=center>导航列表</div>',
			width: '100%',
            height: '95%',
            border:[0,0,0,0],
		    padding:[3,0,0,3],
            //collapseProperty: 'width',
            //enableCollapse: true,
            //splitRegion: 'west',
            //splitPlace: 'after',
            layout:'vertical',
            verticalGap: 1,
           	children:[
				/*{
				    type: 'panel',
				    width: '100%',
				    height: '100%',              
				    title: '产品需求分析',
				    border:[0,0,0,0],
				    padding:[0,0,0,0],
				    enableCollapse: true,
				    onclick: onPanelClick,                                           
				    titlebar:[{
				        cls:'e-titlebar-accordion',
				        onclick: toggle
				    }],
				    children:[
				    	{
				    		id: 'cpxqfx', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
				    	}				            
				    ]
				},
				{
				    type: 'panel',
				    width: '100%',
				    height: '100%',              
				    title: '任务阐明',
				    border:[0,0,0,0],
				    padding:[0,0,0,0],
				    enableCollapse: true,
				    expanded: false,
				    onclick: onPanelClick,                                           
				    titlebar:[{
				        cls:'e-titlebar-accordion',
				        onclick: toggle
				    }],
				    children:[
				    	{
				    		id: 'rwcm', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
				    	}				            
				    ]
				},
				{
				    type: 'panel',
				    width: '100%',
				    height: '100%',              
				    title: '功能原理和功能模块',
				    border:[0,0,0,0],
				    padding:[0,0,0,0],
				    enableCollapse: true,
				    expanded: false,
				    onclick: onPanelClick,                                           
				    titlebar:[{
				        cls:'e-titlebar-accordion',
				        onclick: toggle
				    }],
				    children:[
				    	{
				    		id: 'gnylandgnmk', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
				    	}				            
				    ]
				},
				{
				    type: 'panel',
				    width: '100%',
				    height: '100%',              
				    title: '零部件ABC分析',
				    border:[0,0,0,0],
				    padding:[0,0,0,0],
				    enableCollapse: true,
				    expanded: false,
				    onclick: onPanelClick,                                           
				    titlebar:[{
				        cls:'e-titlebar-accordion',
				        onclick: toggle
				    }],
				    children:[
				    	{
				    		id: 'lbjABCfx', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
				    	}				            
				    ]
				},
				{
		            type: 'panel',
		            width: '100%',
		            height: '100%',              
		            title: '原理方案及总体结构',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            enableCollapse: true,
		            expanded: false,
		            onclick: onPanelClick,                                           
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children:[
		            	{
		            		id: 'ylfaandztjg', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}				            
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',
		            height: '100%',              
		            title: '产品功能系列化和模块化',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            enableCollapse: true,
		            expanded: false,
		            onclick: onPanelClick,                                           
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children:[
		            	{
		            		id: 'cpgnxlhandmkh', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}				            
		            ]
		        },*/
                {
		            type: 'panel',
		            width: '100%',
		            height: 160,              
		            title: '<div class=panel_header_font_mod>产品编码与结构管理</div>',	//
		            titleIcon:'mytitlebar',
		            headerHeight:32,											//
		            
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            enableCollapse: true,
		            expanded: true,
		            onclick: onPanelClick,                                           
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children:[
		            	{
		            		id: 'bmgl', type: 'tree', width: '100%',height: '100%',
		            		style:'border:0;background-color:#f9f0f9;',//
		            		rowHeight:30,
		            		horizontalScrollPolicy:'off',//
		            		verticalLine: false,
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {renderer:function(v,r){return '<a class=navurl>'+r.name+'</a>';}}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}				            
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: 190,
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '<div class=panel_header_font_mod>产品模块管理</div>',	//
		            titleIcon:'mytitlebar',
		            headerHeight:32,//
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'mkgl', type: 'tree', width: '100%',height: '100%',
		            		style:'border:0;background-color:#f9f0f9;',//
		            		rowHeight:30,
		            		horizontalScrollPolicy:'off',//
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {renderer:function(v,r){return '<a class=navurl>'+r.name+'</a>';}}
						    ],
					  		onselectionchange: function(e){
					  			if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					  		}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: 220,
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '<div class=panel_header_font_mod>事物特性管理</div>',	//
		            titleIcon:'mytitlebar',
		            headerHeight:32,//
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'smlgl', type: 'tree', width: '100%',height: '100%',
		            		style:'border:0;background-color:#f9f0f9;',//
		            		rowHeight:30,
		            		horizontalScrollPolicy:'off',//
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {renderer:function(v,r){return '<a class=navurl>'+r.name+'</a>';}}
						    ],
					  		onselectionchange: function(e){
					  			openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					  		}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: 160,
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '<div class=panel_header_font_mod>配置需求管理</div>',	//
		            titleIcon:'mytitlebar',
		            headerHeight:32,//
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'pzxqgl', type: 'tree', width: '100%',height: '100%',
		            		style:'border:0;background-color:#f9f0f9;',//
		            		rowHeight:30,
		            		horizontalScrollPolicy:'off',//
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {renderer:function(v,r){return '<a class=navurl>'+r.name+'</a>';}}
						    ],
					  		onselectionchange: function(e){
					  			openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					  		}
		            	}
		            ]
		        },
		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '<div class=panel_header_font_mod>模块配置设计</div>',	//
		            titleIcon:'mytitlebar',
		            headerHeight:32,//
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'mkpzsj', type: 'tree', width: '100%',height: '100%',
		            		style:'border:0;background-color:#f9f0f9;',//
		            		rowHeight:30,
		            		horizontalScrollPolicy:'off',//
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {renderer:function(v,r){return '<a class=navurl>'+r.name+'</a>';}}
						    ],
					  		onselectionchange: function(e){
					  			if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					  		}
		            	}
		            ]
		        }
/*		        {
		            type: 'panel',
		            width: '100%',height: '100%',
		            enableCollapse: true,
		            expanded: false,    
		            onclick: onPanelClick,   
		            title: '流程模板管理',
		            border:[0,0,0,0],
		            padding:[0,0,0,0],
		            titlebar:[{
		                cls:'e-titlebar-accordion',
		                onclick: toggle
		            }],
		            children: [
		                {
		            		id: 'lcmbgl', type: 'tree', width: '100%',height: '100%',
						    headerVisible: false,  
						    autoColumns: true,       
						    horizontalLine: false,  
						    columns: [   
						        {dataIndex: 'name'}
						    ],
					  		onselectionchange: function(e){	
					        	if(e.selected.index){
					        	 	openNewTab(e.selected.id, e.selected.index,"<div class=cims201_tab_font align=center>"+e.selected.name+"</div>",{type:e.selected.index,btIcon:'cims201_myknowledgebase_icon_'+e.selected.index+'_small'});
					        	}
					           
					        }
		            	}
		            ]
		        } */
           	]
	});
	/*var cpxqfxdata =[
	   			{id:001,index:'IndustryProductAnalyse',name:'行业产品分析'},
	   			{id:002,index:'CustomerDemandMatch',name:'企业顾客需求匹配'},
	   			{id:003,index:'ProductMarket',name:'产品市场'}
	   		];
	var rwcmdata =[
 	   			{id:001,index:'DesignTaskDeclare',name:'设计任务说明'}
 	   		];
	var gnylandgnmkdata =[
	   			{id:001,index:'FunctionTreeCreate',name:'功能树创建'},
	   			{id:002,index:'ProductFunctionModule',name:'产品功能模块'},
	   			{id:003,index:'ModuleDivide',name:'模块划分'},
	   			{id:004,index:'FunctionModuleStructure',name:'功能模块结构图'}
	   		];
	var lbjABCfxdata =[
 	   			{id:001,index:'PartStatistics',name:'零件统计'},
 	   			{id:002,index:'StatisticsResult',name:'统计结果'}
   			];
	var ylfaandztjgdata =[
 	   			{id:001,index:'SchemeDesign',name:'方案设计'},
 	   			{id:002,index:'SchemeChoose',name:'方案选择'}
 	   			//???
 	   			//{id:003,index:'PartCreate',name:'零部件创建'}
 	   		];
	var cpgnxlhandmkhdata =[
	   			{id:001,index:'PartSerialize',name:'产品系列化'},
	   			{id:002,index:'PrincipalParameterDetermine',name:'主参数确定'},
	   			{id:003,index:'ProductModuleDivide',name:'产品模块划分'},
	   			{id:004,index:'FoundationDesign',name:'基型设计'},
	   			{id:005,index:'ParameterSizeRatio',name:'参数和尺寸级比设计'},
	   			{id:006,index:'MainDocStructureDesign',name:'主文档主结构设计'}
	   		];*/
	var bmgldata =[
			{id:001,index:'CodeClassDefi',name:'产品分类定义'},
			{id:002,index:'CodeClassManage',name:'编码大类管理'},
			{id:003,index:'CodeClassRuleManage',name:'编码规则管理'},
			{id:004,index:'CodeClassStructManage',name:'产品结构管理'}
		];
	var mkgldata =[
	        {id:011,index:'DocTypeManage',name:'图文档类型管理'},
			{id:005,index:'StructUpload',name:'模块主模型及图文档管理'},
			{id:006,index:'PartInstanceRg',name:'零部件分类管理'},
			{id:007,index:'PartUpload',name:'零部件图文档管理'},
			{id:008,index:'PartCreate',name:'零部件实例管理'},
			//{id:09,index:'ModInterface',name:'模块接口管理'},
			//{id:010,index:'ModLookup',name:'模块库查看'},
			
		];
		
	var smldata =[
	        {id:014,index:'SMLCodePool',name:'事物特性编码管理'},
			{id:012,index:'SMLParamPool',name:'事物特性参数管理'},
			//{id:013,index:'SMLParamPool_view',name:'事物特性参数池浏览'},
			//{id:015,index:'SMLCodePool_view',name:'事物特性编码浏览'},
			//{id:016,index:'SMLPoolManage',name:'事物特性池管理'},
			//{id:017,index:'SMLPoolManage_view',name:'事物特性池浏览'},
			{id:018,index:'SMLModeling',name:'事物特性建模'},
			{id:019,index:'SMLEdit',name:'事物特性编辑'},
			{id:020,index:'VariantDesignBuild',name:'变型设计任务建立'},
			{id:021,index:'variantDesign',name:'变型设计任务执行'}
			//{id:020,index:'SMLEdit_view',name:'事物特性浏览'}
		];
	var pzxqdata =[
	        {id:025,index:'demandmanage',name:'需求管理'},
			//{id:021,index:'orderview',name:'配置需求查看'},
			{id:022,index:'ordermanage',name:'配置需求管理'},
			{id:023,index:'neworder',name:'配置需求录入'},
			{id:024,index:'checkorder',name:'配置需求审核'},
			//{id:026,index:'templatemanage',name:'默认需求管理'},
			//{id:027,index:'newtemplate',name:'默认需求录入'},
			//{id:028,index:'templateupdate',name:'默认需求修改'}
		];
	var mkpzsjdata=[
			{id:029,index:'platform',name:'平台管理'},
			//{id:030,index:'platform_view',name:'平台查看'},
			{id:031,index:'platformStruct',name:'平台结构搭建'},
			{id:032,index:'platformStruct_view',name:'平台结构查看'},
			{id:033,index:'structRule',name:'配置规则创建'},
			{id:034,index:'structRule_view',name:'配置规则查看'},
			{id:035,index:'checkplatform',name:'平台审核'},
			{id:036,index:'BomConfig',name:'产品配置'},
			{id:037,index:'BomCheck',name:'BOM审核'},
			{id:038,index:'historyBomView',name:'BOM查看'}
		];
/*	var lcmbdata = [
			{id:039,index:'TemplateCreate',name:'模板创建'},
			{id:040,index:'TemplateManage',name:'模板管理'}
		];*/
/*	Edo.get('cpxqfx').set('data',cpxqfxdata);
	Edo.get('rwcm').set('data',rwcmdata);
	Edo.get('gnylandgnmk').set('data',gnylandgnmkdata);
	Edo.get('lbjABCfx').set('data',lbjABCfxdata);
	Edo.get('ylfaandztjg').set('data',ylfaandztjgdata);
	Edo.get('cpgnxlhandmkh').set('data',cpgnxlhandmkhdata);*/
	Edo.get('bmgl').set('data',bmgldata);
	Edo.get('mkgl').set('data',mkgldata);
	Edo.get('smlgl').set('data',smldata);
	//Edo.get('lcmbgl').set('data',lcmbdata);
	Edo.get('pzxqgl').set('data',pzxqdata);
	Edo.get('mkpzsj').set('data',mkpzsjdata);
	this.getModManageAccordin = function(){
		return myModManageAccordin;
	}; 
	

	
}

function onPanelClick(e){
    if(e.within(this.headerCt)){
        var panel = this;
        var accordion = panel.parent;
        accordion.getChildren().each(function(child){
            if(panel != child) child.collapse();
        });
        panel.toggle();
    }
}

function toggle(e){
    var panel = this.parent.owner;
    var accordion = panel.parent;
    accordion.getChildren().each(function(child){
        if(panel != child) child.collapse();
    });
    panel.toggle();
}