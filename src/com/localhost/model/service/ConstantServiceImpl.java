package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.constantitemMapper;
import com.localhost.model.mapper.constanttypeMapper;
import com.localhost.model.po.constantitem;
import com.localhost.model.po.constanttype;

public class ConstantServiceImpl implements ConstantService{

	@Autowired
	private constantitemMapper constantItemMapper;
	@Autowired
	private constanttypeMapper constantTypeMapper;
	
	@Override
	public Integer addConstant(String constantName, String constantCode, String constantTypeName) {
		List<constanttype> constantTypeData = constantTypeMapper.getData();
		int position = 0;
		for (; position < constantTypeData.size(); position++) {
			if (constantTypeData.get(position).getConstanttypename().equals(constantTypeName)) {
				break;
			}
		}
		if (position == constantTypeData.size()) {
			return 0;
		}	
		constantitem record = new constantitem();
		record.setConstantcode(constantCode);
		record.setConstantname(constantName);
		record.setDelmark(1);
		record.setConstanttypeid(constantTypeData.get(position).getId());
		if (constantItemMapper.insert(record) == 0) {
			return -1;
		}
		return 1;
	}

	@Override
	public String delete(List<String> selectData) {
		int deleteNumber = 0;
		for (int i = 0; i < selectData.size(); i++) {
			int num = Integer.parseInt(selectData.get(i));
			if (constantItemMapper.deleteData(num) != 0) {
				deleteNumber++;
			}
		}
		if (deleteNumber == 0) {
			return "false";
		}
		return "true";
	}

	@Override
	public String deleteType(String constantTypeName) {
		if (constantTypeMapper.deleteData(constantTypeName) == 0) {
			return "false";
		}
		return "true";
	}

	@Override
	public Integer additionType(String constantTypeName, String constantTypeCode) {
		List<constanttype> constantTypeData = constantTypeMapper.getData();
		for (int i = 0; i < constantTypeData.size(); i++) {
			if (constantTypeData.get(i).getConstanttypename().equals(constantTypeName)) {
				return 0;
			}
			if (constantTypeData.get(i).getConstanttypecode().equals(constantTypeCode)) {
				return -1;
			}
		}
		constanttype constantType = new constanttype();
		constantType.setDelmark(new Integer(1));
		constantType.setConstanttypename(constantTypeName);
		constantType.setConstanttypecode(constantTypeCode);
		if (constantTypeMapper.insert(constantType) == 0) {
			return -1;
		}
		return 1;
	}

}
