package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.medicaldisease;
import org.apache.ibatis.annotations.Param;

public interface medicaldiseaseMapper {
    int insert(medicaldisease record);

    int insertSelective(medicaldisease record);
    
    public int getDiagnosisType(int registId);
    
    public List<medicaldisease> getMedicalTime(int registId);
    
    public Integer deleteDieaseIcd(@Param("registId") int registId, @Param("icd") String icd);
    
    public medicaldisease findID(int registId);
    
    public void saveType(@Param("registId") int registId, @Param("radioICD") int radioICD);
    
    
    
}