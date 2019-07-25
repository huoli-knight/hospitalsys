package com.localhost.model.service;

import java.util.Date;
import java.util.List;

import com.localhost.model.po.disease;
import com.localhost.model.po.medicaldisease;
import com.localhost.model.po.medicalrecord;

public interface DoctorSystemBaseService {
	
	public medicalrecord getMedicalRecordData(int id);
	
	public List<disease> getDiseaseMedical(int id);

	public int getDiagnosisType(int medicalDiseaseId);
	
	public int getDieaseState(int medicalDiseaseId);
	
	public List<medicaldisease> getMedicalTime(int medicalDiseaseId);
	
	public int insertICDData(String patientName, String icd, String radioICD, Date time);
	
	public int deleteICDData(int medicalDiseaseId, String icd);
	
	public String saveIndexData(String patientName, String data0, medicalrecord medicalRecord);
	
}
