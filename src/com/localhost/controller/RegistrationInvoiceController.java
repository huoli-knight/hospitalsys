package com.localhost.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
public class RegistrationInvoiceController{
	 
	//查发票信息
	@Autowired
	private invoiceMapper invoicemapper;
	
	@RequestMapping(value = "/registergetinvoiceinformation", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<invoice> getregisterinformation(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		return invoicemapper.getregisterinvoiceinformation(pid1);
	}
	
	@RequestMapping(value = "/registerprint", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int registerprint(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		int pid1 = Integer.parseInt(pid);
		Integer pid2 = new Integer(pid1);
		return invoicemapper.registerprintstate(pid2);
	}
}
