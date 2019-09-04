package com.localhost.model.service;

import com.localhost.model.po.checkrelation;

public interface TemplateService {
	public Integer addTemplate(String name,String scope,Integer recordtype);

	public String delete(String[] selectData);

//	public String deleteType(String constantTypeName);
//
//	public Integer additionType(String constantTypeName, String constantTypeCode);

	public Integer saveTemplate(Integer id,String name, String scope, Integer recordtype);

//	public Integer addRelation(Integer id);

	public Integer addProj(checkrelation ch);
}
