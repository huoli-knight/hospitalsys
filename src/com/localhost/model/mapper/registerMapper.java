package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.register;

public interface registerMapper {
    int insert(register record);

    int insertSelective(register record);
    
    public List<register> getSeekingDoctor();
    
    public List<register> getNoSeekingDoctor();
    
    public String getCaseNumber(int id);
}