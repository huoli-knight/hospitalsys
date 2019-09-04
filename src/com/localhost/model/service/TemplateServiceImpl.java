package com.localhost.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.constantitemMapper;
import com.localhost.model.mapper.constanttypeMapper;
import com.localhost.model.po.constantitem;
import com.localhost.model.po.constanttype;
import com.localhost.model.po.checkrelation;
import com.localhost.model.po.checktemplate;
import com.localhost.model.mapper.checkrelationMapper;
import com.localhost.model.mapper.checktemplateMapper;

public class TemplateServiceImpl implements TemplateService{

	@Autowired
	private constantitemMapper constantItemMapper;
	@Autowired
	private checktemplateMapper checkTemplateMapper;
	@Autowired
	private checkrelationMapper checkRelationMapper;
	
	@Override
	public Integer addTemplate(String name,String scope,Integer recordtype) {

		checktemplate record = new checktemplate();
		//record.setId(7);
		record.setDelmark(1);
		record.setUserid(1);
		record.setName(name);
		record.setCreationtime(new Date());
		record.setScope(scope);
		record.setRecordtype(recordtype);
		if (checkTemplateMapper.insert(record)==0) {
			return -1;
		}
		return 1;
	}

	@Override
	public String delete(String[] selectData) {
		int deleteNumber = 0;
		for (int i = 0; i < selectData.length; i++) {
			if (constantItemMapper.deleteData(Integer.valueOf(selectData[i])) != 0) {
				deleteNumber++;
			}
		}
		if (deleteNumber == 0) {
			return "false";
		}
		return "true";
	}



	@Override
	public Integer saveTemplate(Integer id,String name, String scope, Integer recordtype) {
		checktemplate record = new checktemplate();
		record.setId(id);
		record.setDelmark(1);
		record.setUserid(1);
		record.setName(name);
		record.setCreationtime(new Date());
		record.setScope(scope);
		record.setRecordtype(recordtype);
		if (checkTemplateMapper.save(record)==0) {
			return -1;
		}
		return 1;
	}

//	@Override
//	public Integer addRelation(Integer id) {
//		checkrelation record = new checkrelation();
//		
//		
//		if (checkRelationMapper.insert(record)==0) {
//			return -1;
//		}
//		return 1;
//	}

	@Override
	public Integer addProj(checkrelation ch) {
		if (checkRelationMapper.insert(ch)==0) {
			return -1;
		}
		return 1;
	}

}
