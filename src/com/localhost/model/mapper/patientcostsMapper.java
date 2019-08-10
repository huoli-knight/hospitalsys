package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.patientcosts;

public interface patientcostsMapper {
    int insert(patientcosts record);

    int insertSelective(patientcosts record);
    
    public Integer getNumber(@Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);
}