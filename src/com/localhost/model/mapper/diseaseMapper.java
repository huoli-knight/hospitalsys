package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.disease;

public interface diseaseMapper {
    int insert(disease record);

    int insertSelective(disease record);
    
    public List<disease> getDiseaseData(int id);
    
    public Integer getId(String icd);
    
}