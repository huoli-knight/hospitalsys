package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.drugs;

public interface drugsMapper {
    int insert(drugs record);

    int insertSelective(drugs record);
 public List<drugs> getDrugsData(String mnemoniccode);
    
    public List<drugs> getDrugsallData(String mnemoniccode);

	void deleteById(@Param("id")int id);

	drugs queryById(Integer id);

	void updateSelective(drugs drugs);
}