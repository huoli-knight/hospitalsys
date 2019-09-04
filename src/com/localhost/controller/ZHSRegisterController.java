package com.localhost.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.ZHSRegisterService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSRegister;

@Controller
public class ZHSRegisterController {
	
	@Autowired
	private ZHSRegisterService registerService;
	
//	@Autowired
//	private UserService userService;
//	
//	
//	@RequestMapping("/getUser")
//	public @ResponseBody List<User> getUser(){
//		System.out.println("ooooooooooooooooooooooooo");
//		List<User> userlist = userService.selectUser();
//		System.out.println("0================");
//		System.out.println(userlist);
//		System.out.println("1================");
//		return userlist;
//	}
	
	@RequestMapping("/getRegisterByCasenumber")
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSRegister> getRegisterByCaseNumber(int CaseNumber){
		System.out.println("ooooooooooooooooooooooooo" + CaseNumber);
		List<ZHSRegister> registerlist = registerService.selectRegisterByCaseNumber(CaseNumber);
		System.out.println("0================");
		System.out.println(registerlist);
		System.out.println("1================");
		return registerlist;
	}
	
	@RequestMapping("/getRegisterByName")
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSRegister> getRegisterByName(String Name){
		System.out.println("ooooooooooooooooooooooooo" + Name);
		List<ZHSRegister> registerlist = registerService.selectRegisterByName(Name);
		System.out.println("0================");
		System.out.println(registerlist);
		System.out.println("1================");
		return registerlist;
	}
	
//	@RequestMapping(value="/changestate",method=RequestMethod.POST)
//	public @ResponseBody String test(@RequestParam("key") String key, @RequestParam("value[]") String[] value){
//		System.out.println("ooooooooooooooooooooooooo");
//		System.out.println(key);
//		for (String s : value) {
//			System.out.println(s);
//		}
//		tempmap.put(key,value);
//		return "{\"result\":true}";
//	}
}

//@RequestParam