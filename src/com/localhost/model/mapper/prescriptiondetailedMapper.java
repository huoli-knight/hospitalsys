package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.prescriptiondetailed;

public interface prescriptiondetailedMapper {
    int insert(prescriptiondetailed record);

    int insertSelective(prescriptiondetailed record);  
    
    public Integer getFee(@Param("drugsType") String drugsType, @Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);
}