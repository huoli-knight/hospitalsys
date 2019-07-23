package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.medicalrecordMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.po.medicalrecord;
import com.localhost.model.po.register;

public class DoctorCategoryServiceImpl implements DoctorCategoryService {

	@Autowired
	private registerMapper registerMapperState;
	@Autowired
	private medicalrecordMapper medicalRecordMapper;
	
	@Override
	public List<register> getSeekingDoctor() {
		return registerMapperState.getSeekingDoctor();
	}

	@Override
	public List<register> getNoSeekingDoctor() {
		return registerMapperState.getNoSeekingDoctor();
	}

	@Override
	public medicalrecord getPatientData(int id) {
		return medicalRecordMapper.getPatientData(id);
	}
	
	

}
