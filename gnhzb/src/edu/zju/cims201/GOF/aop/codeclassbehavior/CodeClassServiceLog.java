package edu.zju.cims201.GOF.aop.codeclassbehavior;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import edu.zju.cims201.GOF.service.codeclass.CodeClassServiceImpl;

@Component
@Aspect
public class CodeClassServiceLog {
	private final Logger logger = LoggerFactory.getLogger(CodeClassServiceImpl.class);
	@Pointcut("execution(* edu.zju.cims201.GOF.service.codeclass.CodeClassServiceImpl.findAll() )")
	public void pointcut1(){}
	
	@After("pointcut1()")
	public void logFindAllCodeClass(JoinPoint jp){
		logger.info(jp.getSignature().getName()+"找到了所有的产品大类");
	};
}
