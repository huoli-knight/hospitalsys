package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSDepartmentMapper;
import com.localhost.model.po.ZHSDepartment;


public class ZHSDepartmentServiceImpl implements ZHSDepartmentService{
	@Autowired
	private ZHSDepartmentMapper departmentMapper;
	
	@Override
	public List<ZHSDepartment> selectDepartment() {
		return departmentMapper.findDepartment();
	}

}
