package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSRegisterMapper;
import com.localhost.model.po.ZHSRegister;



public class ZHSRegisterServiceImpl implements ZHSRegisterService {
	@Autowired
	private ZHSRegisterMapper registerMapper;

	@Override
	public List<ZHSRegister> selectRegisterByCaseNumber(int CaseNumber) {
		return registerMapper.findRegisterByCaseNumber(CaseNumber);
	}

	@Override
	public List<ZHSRegister> selectRegisterByName(String Name) {
		return registerMapper.findRegisterByName(Name);
	}
	
}
