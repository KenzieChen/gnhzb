package edu.zju.cims201.GOF.test;

import org.junit.Test;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTEmpty;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import edu.zju.cims201.GOF.service.task.TaskService;


public class ModuleServiceTest {

	@Test
	public void testGetioflowBooleanStringStringString() {
		
		ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:applicationcontext.xml");
		TaskService taskService=(TaskService)ctx.getBean("taskServiceImpl");
		taskService.getTaskByNextTaskId("13,14", 3L)	;	
		//taskService.updateTaskStatus(starttasksList)
		
	}
}


