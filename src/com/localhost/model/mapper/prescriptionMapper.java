package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.prescription;

public interface prescriptionMapper {
    int insert(prescription record);

    int insertSelective(prescription record);

}