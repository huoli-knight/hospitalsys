package com.localhost.model.mapper;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.register;

public interface registerMapper {
    int insert(register record);

    int insertSelective(register record);
    
    public List<register> getSeekingDoctor();
    
    public List<register> getNoSeekingDoctor();
    
    public String getCaseNumber(int id);
    
    public Integer getNumberOfVisits(@Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);

    public Integer getRegistration(@Param("LevelId") int LevelId, @Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);
    
}