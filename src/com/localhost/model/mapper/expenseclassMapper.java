package com.localhost.model.mapper;

import com.localhost.model.po.expenseclass;

public interface expenseclassMapper {
    int insert(expenseclass record);

    int insertSelective(expenseclass record);
}