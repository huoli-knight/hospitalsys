package com.localhost.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.ZHSUserService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSUser;


@Controller
public class ZHSUserController {
	
	@Autowired
	private ZHSUserService userService;
	
	
	@RequestMapping("/getUser")
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSUser> getUser(){
		System.out.println("ooooooooooooooooooooooooo");
		List<ZHSUser> userlist = userService.selectUser();
		System.out.println("0================");
		System.out.println(userlist);
		System.out.println("1================");
		return userlist;
	}
}