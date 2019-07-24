package com.localhost.model.mapper;

import com.localhost.model.po.medicalrecord;

public interface medicalrecordMapper {
    int insert(medicalrecord record);

    int insertSelective(medicalrecord record);
    
    public medicalrecord getPatientData(int id);

    public int getDieaseState(int registId);
    
    public medicalrecord getData(int id);
    
    public void updataRecord(medicalrecord record);
    
}
