<%@ page pageEncoding="UTF-8"%>
<%-- <%@ include file="/common/taglibs1.jsp" %> --%>

<link href="<%= request.getContextPath() %>/scripts/frontpage/imageMenu.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<%= request.getContextPath() %>/scripts/frontpage/mootools.js"></script>
<script type="text/javascript" src="<%= request.getContextPath() %>/scripts/frontpage/imageMenu.js"></script> 
<div align="center">
<table  border="0" cellspacing="0" cellpadding="0" align="center">   <!-- width="100%" -->
             
	<tr>
		<td >
			<div id="imageMenu">
			<ul>
				<li class="resource"><a href="">patent</a></li>
				<li class="modular"><a href="">knowledge</a></li>
                <li class="lcc"><a href="">NEWS</a></li>
				<li class="lca"><a href="">standard</a></li>	
				<li class="abstract"><a href="">Abstract</a></li>
			</ul>
			</div>
		
		<script type="text/javascript">
			
			window.addEvent('domready', function(){
				var myMenu = new ImageMenu($$('#imageMenu a'),{openWidth:610, border:35, onOpen:function(e,i){}});
			});
		</script>
		</td>
	</tr>
</table>
</div>
 