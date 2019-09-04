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
import com.localhost.model.mapper.registrationwithdrawalMapper;
import com.localhost.model.po.invoice;
import com.localhost.model.po.register;
import com.localhost.model.po.registrationwithdrawal;
import com.localhost.utils.Jurisdiction;

@Controller
public class RegistrationWithdrawalController{
	 
	@Autowired
	private registrationwithdrawalMapper registrationwithdrawalmapper;
	
	@RequestMapping(value = "/registergetdata", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<registrationwithdrawal> getregisterinformation(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return registrationwithdrawalmapper.getregisterinformation(pid2);
	}
	
	//退号，只有已挂号未就诊的可以退号
	@RequestMapping(value = "/registerdeletedata", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int deleteregisterinformation(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return registrationwithdrawalmapper.deleteregisterinformation(pid2);
	}
	
	//添加发票信息
	@Autowired
	private invoiceMapper invoicemapper; 
	@Autowired
	private constantitemMapper constantitemmapper;
	
	//在这里获取新发票号
	@RequestMapping(value = "/registinsertgetidinvoice", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int insertregistinvoice(HttpServletRequest request) {
		invoice invoice0=new invoice();	
		//获取新发票号
		invoice0.setInvoicenum(String.valueOf(Integer.parseInt(invoicemapper.getinvoicenum().getInvoicenum())+1));
		
		invoice0.setMoney(new BigDecimal(Integer.parseInt(request.getParameter("money"))));
		invoice0.setState(3);
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
