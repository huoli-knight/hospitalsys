package com.localhost.model.mapper;

import com.localhost.model.po.constantitem;

public interface constantitemMapper {
    int insert(constantitem record);

    int insertSelective(constantitem record);
    
    public int deleteData(int id);
}