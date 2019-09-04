package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.ZHSRegister;

public interface ZHSRegisterMapper{
	public List<ZHSRegister> findRegisterByCaseNumber(int CaseNumber);
	public List<ZHSRegister> findRegisterByName(String Name);
//	public void updatecheckapplystateByRID(int RID);
}
