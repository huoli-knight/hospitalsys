package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSExpenseClassMapper;
import com.localhost.model.po.ZHSExpenseClass;


public class ZHSExpenseClassServiceImpl implements ZHSExpenseClassService {
	@Autowired
	private ZHSExpenseClassMapper expenseClassMapper;
	
	@Override
	public List<ZHSExpenseClass> selectExpenseClass() {
		// TODO Auto-generated method stub
		return expenseClassMapper.findExpenseClass();
	}

}
