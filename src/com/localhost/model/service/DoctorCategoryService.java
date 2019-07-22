package com.localhost.model.service;

import java.util.List;

import com.localhost.model.po.register;

public interface DoctorCategoryService {
	
	public List<register> getSeekingDoctor();
	
	public List<register> getNoSeekingDoctor();
	
}
