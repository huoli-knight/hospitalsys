package com.localhost.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.ZHSExpenseClassService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSExpenseClass;


@Controller
public class ZHSExpenseClassController {
	@Autowired
	private ZHSExpenseClassService expenseclassService;
	
	@RequestMapping("/getExpenseClass")
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSExpenseClass> getDepartment() {
		System.out.println("ooooooooooooooooooooooooo2");
		List<ZHSExpenseClass> expenseclasslist = expenseclassService.selectExpenseClass();
		System.out.println("0================");
		System.out.println(expenseclasslist);
		System.out.println("1================");
		return expenseclasslist;
	}
}
