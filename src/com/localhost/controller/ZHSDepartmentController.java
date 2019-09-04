package com.localhost.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.ZHSDepartmentService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSDepartment;


@Controller
public class ZHSDepartmentController {
	@Autowired
	private ZHSDepartmentService departmentService;
	
	@RequestMapping("/getDepartment")
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSDepartment> getDepartment() {
		System.out.println("ooooooooooooooooooooooooo1");
		List<ZHSDepartment> departmentlist = departmentService.selectDepartment();
		System.out.println("0================");
		System.out.println(departmentlist);
		System.out.println("1================");
		return departmentlist;
	}
}
