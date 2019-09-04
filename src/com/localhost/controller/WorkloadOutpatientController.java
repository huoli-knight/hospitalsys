package com.localhost.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.OutpatientService;
import com.localhost.utils.Jurisdiction;

@Controller
@RequestMapping("/outPatient")
public class WorkloadOutpatientController {

	@Autowired
	private OutpatientService outpatientService;
	
	@RequestMapping(value  = "/getFeeData", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String getFeeData(HttpServletRequest request) {
		return outpatientService.getoutpatient(request);
	}
	
}
