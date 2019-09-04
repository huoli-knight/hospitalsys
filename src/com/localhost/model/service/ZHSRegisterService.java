package com.localhost.model.service;

import java.util.List;

import com.localhost.model.po.ZHSRegister;

public interface ZHSRegisterService {
	public List<ZHSRegister> selectRegisterByCaseNumber(int CaseNumber);
	public List<ZHSRegister> selectRegisterByName(String Name);
}
