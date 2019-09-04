package com.localhost.controller;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.constantitemMapper;
import com.localhost.model.mapper.invoiceMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.mapper.registrationfeeMapper;
import com.localhost.model.mapper.registrationdrugfeeMapper;
import com.localhost.model.po.checkapply;
import com.localhost.model.po.invoice;
import com.localhost.model.po.register;
import com.localhost.model.po.registrationdrugfee;
import com.localhost.model.po.registrationfee;
import com.localhost.utils.Jurisdiction;

@Controller
public class RegistrationFeeController{
	 
	@Autowired
	private registerMapper registermapper;
	
	@RequestMapping(value = "/registergetfeeinformation", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody register getregisterinformation(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return registermapper.getregisterinformation(pid2);
	}
	
	//查检查/检验/处置表checkapply，返回list
	@Autowired
	private registrationfeeMapper registrationfeemapper;
	
	@RequestMapping(value = "/registergetfeecheck", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<registrationfee> getregisterfeecheck(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		List<registrationfee> result=registrationfeemapper.getregisterfee(pid2);
		return result;
	}
	
	//查药品收费清单，返回list
	@Autowired
	private registrationdrugfeeMapper registrationdrugfeemapper;
		
	@RequestMapping(value = "/registergetfeedrugs", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<registrationdrugfee> getregisterfeedrug(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		List<registrationdrugfee> result=registrationdrugfeemapper.getregisterdrugfee(pid2);
		return result;
	}
	
	@RequestMapping(value = "/registerfee", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int registerfee(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return registrationfeemapper.registerfeetstate(pid2)+registrationdrugfeemapper.registerfeetstate(pid2);
	}
	
	@RequestMapping(value = "/registerrefund", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int registerrefund(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return registrationfeemapper.registerrefundtstate(pid2)+registrationdrugfeemapper.registerrefundtstate(pid2);
	}
	
	//添加发票信息
	@Autowired
	private invoiceMapper invoicemapper; 
	@Autowired
	private constantitemMapper constantitemmapper;
		
	//在这里获取新发票号（冲红发票）
	@RequestMapping(value = "/registinsertgetidinvoicered", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int insertregistinvoice(HttpServletRequest request) {
		invoice invoice0=new invoice();	
		//获取新发票号
		invoice0.setInvoicenum(String.valueOf(Integer.parseInt(invoicemapper.getinvoicenum().getInvoicenum())+1));
			
		invoice0.setMoney(new BigDecimal(Integer.parseInt(request.getParameter("money"))));
		invoice0.setState(7);
		invoice0.setCreationtime(new Date());
		invoice0.setUserid(Integer.valueOf(request.getParameter("userid")));
		invoice0.setRegistid(Integer.valueOf(request.getParameter("registid")));
		//传入的是收费方式name，查id
		String feetype=request.getParameter("feetype");
		invoice0.setFeetype(constantitemmapper.getfeetypeid(feetype));
		invoice0.setDailystate(0);
		int result=invoicemapper.insertSelective(invoice0);
		return result;
		}
}
