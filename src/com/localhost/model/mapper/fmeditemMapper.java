package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.fmeditem;

public interface fmeditemMapper {
    int insert(fmeditem record);

    int insertSelective(fmeditem record);
    
    public Integer getRecordTypeFee(@Param("typeNumber") int typeNumber, @Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);
}