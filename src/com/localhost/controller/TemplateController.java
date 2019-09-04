package com.localhost.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.checkrelationMapper;
import com.localhost.model.mapper.checktemplateMapper;
import com.localhost.model.po.Relation;
import com.localhost.model.po.checkrelation;
import com.localhost.model.po.checktemplate;
import com.localhost.model.service.ConstantService;
import com.localhost.model.service.TemplateService;
import com.localhost.utils.Jurisdiction;

@Controller
@RequestMapping("/template")
public class TemplateController {

	@Autowired
	private checktemplateMapper checktemplateMapper;
	@Autowired
	private TemplateService templateService;
	@Autowired
	private checkrelationMapper checkRelationMapper;

	@RequestMapping(value = "/getdata", method = RequestMethod.GET)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody List<checktemplate> getTemplateData() {
		return checktemplateMapper.getTemplateData();
	}

	@RequestMapping(value = "/searchTemplateData", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody List<checktemplate> searchTemplateData(checktemplate ch) {
		List<checktemplate> state = checktemplateMapper.searchTemplateData(ch);
		return state;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String delete(Integer id) {
		
		int result = checktemplateMapper.delete(id);
		int result2 = checkRelationMapper.delete2(id);
		return "{\"result\":" + result + "}";
	}

	@RequestMapping(value = "/delete2", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String delete2(Integer id) {
		
		int result = checkRelationMapper.delete(id);
		return "{\"result\":" + result + "}";
	}
	
	@RequestMapping(value = "/getRelation", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody List<Relation> addRelation(checkrelation ch) {
		List<Relation> state = checkRelationMapper.getRelationData(ch);
		return state;
		
	}
	
	@RequestMapping(value = "/saveTemplate", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String saveTemplate(String name, String scope,Integer recordtype,Integer id) {
		Integer result = 1;
		result = templateService.saveTemplate(id,name, scope,recordtype);
		return "{\"result\":" + result.toString() + "}";
	}
	
	@RequestMapping(value = "/addTemplate", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String addTemplate(String name, String scope,Integer recordtype) {
		Integer result = 1;
		result = templateService.addTemplate(name, scope,recordtype);
		return "{\"result\":" + result.toString() + "}";
	}
	
	@RequestMapping(value = "/addProj", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 1)
	public @ResponseBody String addProj(checkrelation ch) {
		Integer result = 1;
		result = checkRelationMapper.insert(ch);
		return "{\"result\":" + result.toString() + "}";
	}
}
