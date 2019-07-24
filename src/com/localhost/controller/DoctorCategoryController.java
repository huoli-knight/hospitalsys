package com.localhost.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.po.register;
import com.localhost.model.service.DoctorCategoryService;
import com.localhost.utils.Jurisdiction;

@Controller
@RequestMapping("/doctor")
public class DoctorCategoryController {
	
	@Autowired
	DoctorCategoryService doctorCategoryService;
	
	@RequestMapping(value = "/getSeekingDoctor", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<register> getSeekingDoctor() {
		return doctorCategoryService.getSeekingDoctor();
	}
	
	@RequestMapping(value = "/getNoSeekingDoctor", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<register> getNoSeekingDoctor() {
		return doctorCategoryService.getNoSeekingDoctor();
	}
	
}
