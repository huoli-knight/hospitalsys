package com.localhost.model.mapper;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.registlevel;

public interface registlevelMapper {
    int insert(registlevel record);

    int insertSelective(registlevel record);
    
    public List<Integer> getNumber();
    
    public BigDecimal getRegistFee(@Param("LevelId") int LevelId);
}
