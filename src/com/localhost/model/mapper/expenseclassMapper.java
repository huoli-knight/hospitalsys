package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.expenseclass;

public interface expenseclassMapper {
    int insert(expenseclass record);

    int insertSelective(expenseclass record);
    
public List<expenseclass> getsubjectData(String expcode);
    
    public List<expenseclass> getallsubjectData(String expcode);
}