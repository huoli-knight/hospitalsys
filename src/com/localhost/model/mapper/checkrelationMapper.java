package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.Relation;
import com.localhost.model.po.checkrelation;
import com.localhost.model.po.checktemplate;

public interface checkrelationMapper {
	public List<Relation> getRelationData(checkrelation ch);
	
    int insert(checkrelation record);

    int insertSelective(checkrelation record);

	public int delete(Integer id);

	public int delete2(Integer id);
}