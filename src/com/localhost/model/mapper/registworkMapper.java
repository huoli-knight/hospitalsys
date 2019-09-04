package com.localhost.model.mapper;

import com.localhost.model.po.registwork;

public interface registworkMapper {
    int insert(registwork record);

    int insertSelective(registwork record);
    
    //查上次日结结束时间
    public registwork getregisterdailymin();
}