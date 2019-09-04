package com.localhost.controller;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.constantitemMapper;
import com.localhost.model.mapper.departmentMapper;
import com.localhost.model.mapper.invoiceMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.mapper.registlevelMapper;
import com.localhost.model.mapper.userMapper;
import com.localhost.model.po.constantitem;
import com.localhost.model.po.department;
import com.localhost.model.po.invoice;
import com.localhost.model.po.register;
import com.localhost.model.po.registlevel;
import com.localhost.model.po.user;
import com.localhost.utils.Jurisdiction;

@Controller
public class RegistrationRegisterController{
	 
	
	//获取挂号科室
	@Autowired
	private departmentMapper departmentmapper;
			
	@RequestMapping("/registergetdeptname")
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<department> getregisterdept() {
	return departmentmapper.getregisterdept();
	}
	
	//获取医生姓名
	@Autowired
	private userMapper usermapper;
				
	@RequestMapping("/registergetdoctorname")
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<user> getregisterdoctor() {
	return usermapper.getregisterdoctor();
	}
	
	//获取发票号
	@Autowired
	private invoiceMapper invoicemapper;
	
	@RequestMapping("/registergetinvoice")
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int getregisterinvoice() {
		invoice invoice0=invoicemapper.getinvoicenum();
		int invoicenum=Integer.parseInt(invoice0.getInvoicenum())+1;
		return invoicenum;
	}
	
	//获取病历号
	@Autowired
	private registerMapper registermapper; 
	
	@RequestMapping("/registergetcasenumber")
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int getregistercasenumber() {
		register register0=registermapper.getregistercasenumber();
		int casenumber=Integer.parseInt(register0.getCasenumber())+1;
		return casenumber;
	}
	
	//专家限号
	@RequestMapping(value = "/registergetlimit", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody List<register> getregisterlimit(HttpServletRequest request) {
		String visitdate = request.getParameter("visitdate");
		SimpleDateFormat sdf = new SimpleDateFormat(("yyyy-MM-dd"));
		java.util.Date Vvisitdate = null;
		try {
			Vvisitdate = sdf.parse(visitdate);
		} catch (ParseException e) {
		e.printStackTrace();
		} 
		
		return registermapper.getregisterlimit(Vvisitdate);
	}
	
	//查询挂号级别对应的挂号费
	@Autowired
	private registlevelMapper registlevelmapper;
	
	@RequestMapping(value = "/registergetfee", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int getregisterfee(HttpServletRequest request) {
		String registerlevel = request.getParameter("registlevel").toString();
		registlevel registlevel0=registlevelmapper.getregisterfee(registerlevel);
		if (registlevel0 == null) {
			return 0;
		}
		BigDecimal BigDecimal0=registlevel0.getRegistfee();
		int fee=BigDecimal0.intValue();
		return fee;
	}
	
	//将挂号信息传入数据库
	@Autowired
	private registerMapper registermapper0; 
	
	@RequestMapping(value = "/regist", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 2)
	public @ResponseBody int insertregisterinformation(String deptname,String username,String Rvisitdate, String Rbirthdate, register register0) {
		register0.getBirthdate();
		register0.setDeptid(departmentmapper.getdepartmentid(deptname));
		register0.setUserid(usermapper.getuserid(username));
		register0.setRegisttime(new Date());
		SimpleDateFormat sdf = new SimpleDateFormat(("yyyy-MM-dd"));
		java.util.Date birthdate = null;
		try {
			birthdate = sdf.parse(Rbirthdate);
		} catch (ParseException e) {
		e.printStackTrace();
		} 
		java.util.Date visitdate = null;
		try {
			visitdate = sdf.parse(Rvisitdate);
		} catch (ParseException e) {
		e.printStackTrace();
		} 
		register0.setVisitdate(visitdate);
		register0.setBirthdate(birthdate);
		register0.setVisitstate(1);
		int result=registermapper0.insertSelective(register0);
		return result;
	}
//	@InitBinder
//    public void initBinder(WebDataBinder binder, WebRequest request) {
//        //转换日期 注意这里的转化要和传进来的字符串的格式一直 如2015-9-9 就应该为yyyy-MM-dd
//        DateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
//        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));// CustomDateEditor为自定义日期编辑器
//    }
	
	//添加发票信息
		@Autowired
		private invoiceMapper invoicemapper0; 
		@Autowired
		private constantitemMapper constantitemmapper;
		
		@RequestMapping(value = "/registinsertinvoice", method = RequestMethod.POST)
		@Jurisdiction(jurisdiction = 2)
		public @ResponseBody int insertregistinvoice(HttpServletRequest request) {
			invoice invoice0=new invoice();	
			invoice0.setInvoicenum(request.getParameter("invoicenum"));
			invoice0.setMoney(new BigDecimal(Integer.parseInt(request.getParameter("money"))));
			invoice0.setState(3);
			invoice0.setCreationtime(new Date());
			invoice0.setUserid(Integer.valueOf(request.getParameter("userid")));
			//registID在sql语句中查找当前最大ID
			register register1=registermapper.getregistercasenumber();
			invoice0.setRegistid(register1.getId());
			//传入的是收费方式name，查id
			String feetype=request.getParameter("feetype");
			invoice0.setFeetype(constantitemmapper.getfeetypeid(feetype));
			invoice0.setDailystate(0);
			int result=invoicemapper0.insertSelective(invoice0);
			return result;
		}
		
		//获取收费方式
		@RequestMapping("/registergetfeetypename")
		@Jurisdiction(jurisdiction = 2)
		public @ResponseBody List<constantitem> getregisterfeetypename() {
		return constantitemmapper.getregisterfeetypename();
		}
		
		//查发票信息
		@RequestMapping("/registergetregistinvoice")
		@Jurisdiction(jurisdiction = 2)
		public @ResponseBody List<invoice> getregisterinformation(HttpServletRequest request) {
			register register1=registermapper.getregistercasenumber();
			int pid1 = register1.getId();
			return invoicemapper.getregisterinvoiceinformation(pid1);
		}
		
		//修改发票状态，未打印->已打印
		@RequestMapping(value = "/registerimmediatelyprint", method = RequestMethod.POST)
		@Jurisdiction(jurisdiction = 2)
		public @ResponseBody int registerprint(HttpServletRequest request) {
			String pid = request.getParameter("pid");
			int pid1 = Integer.parseInt(pid);
			Integer pid2 = new Integer(pid1);
			return invoicemapper.registerimmediatelyprintstate(pid2);
		}
}
