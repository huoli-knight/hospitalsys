package com.localhost.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.invoiceMapper;
import com.localhost.model.mapper.registworkMapper;
import com.localhost.model.po.invoice;
import com.localhost.model.po.registwork;
import com.localhost.utils.Jurisdiction;

@Controller
public class RegistrationDayreportController{
	
	//查上次日结结束时间
	@Autowired
	private registworkMapper registworkmapper;
	
	@RequestMapping("/registergetdailymin")
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody Date getregisterdailymin(HttpServletRequest request) {
		Date endtime=registworkmapper.getregisterdailymin().getEndtime();
		return endtime;
	}
	 
	//查发票信息
	@Autowired
	private invoiceMapper invoicemapper;
	
	@RequestMapping(value = "/registergetreport", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<invoice> getregisterinformation(HttpServletRequest request) {
		Date mintime=registworkmapper.getregisterdailymin().getEndtime();
		
		//传入最小时间
		return invoicemapper.getregisterreport(mintime);
	}
	
	//结算报账
	@RequestMapping(value = "/registercloseaccount", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int registercloseaccount(HttpServletRequest request) {
		//获取两个时间
		Date maxtime=new Date();
		
		//传入两个时间
		return invoicemapper.registercloseaccount(maxtime);
	}
	
	//填日结表
	@RequestMapping(value = "/registinsertdailywork", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int insertregisterdailywork(HttpServletRequest request) {
		registwork registwork0=new registwork();
		registwork0.setRegisterid(Integer.valueOf(request.getParameter("registid")));
		registwork0.setStarttime(registworkmapper.getregisterdailymin().getEndtime());
		registwork0.setEndtime(new Date());
		return registworkmapper.insertSelective(registwork0);
	}
}
