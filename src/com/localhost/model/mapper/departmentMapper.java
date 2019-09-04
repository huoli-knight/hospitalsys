package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.department;

public interface departmentMapper {
    int insert(department record);

    int insertSelective(department record);
    
	public List<department> getregisterdept();
    
    //查科室名对应id
    public int getdepartmentid(@Param("name")String name);
}