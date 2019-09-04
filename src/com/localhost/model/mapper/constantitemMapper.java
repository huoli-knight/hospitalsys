package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.constantitem;

public interface constantitemMapper {
    int insert(constantitem record);

    int insertSelective(constantitem record);
    
    public int deleteData(int id);
    
    //查收费方式对应id
    public int getfeetypeid(String name);
    
    //获取收费方式
    public List<constantitem> getregisterfeetypename();
}