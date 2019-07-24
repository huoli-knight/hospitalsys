package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.medicaldisease;
import org.apache.ibatis.annotations.Param;

public interface medicaldiseaseMapper {
    int insert(medicaldisease record);

    int insertSelective(medicaldisease record);
    
    public int getDiagnosisType(int registId);
    
    public List<medicaldisease> getMedicalTime(int registId);
    
    public int deleteDieaseId(@Param("diseaseId") int registId, @Param("icd") int icd);
    
}