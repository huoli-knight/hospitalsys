package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.registrationwithdrawal;


public interface registrationwithdrawalMapper {
	
    
    public List<registrationwithdrawal> getregisterinformation(int id);
    
    public int deleteregisterinformation(int id);
}