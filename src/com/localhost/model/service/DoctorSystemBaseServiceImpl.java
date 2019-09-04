package com.localhost.model.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.diseaseMapper;
import com.localhost.model.mapper.medicaldiseaseMapper;
import com.localhost.model.mapper.medicalrecordMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.po.disease;
import com.localhost.model.po.medicaldisease;
import com.localhost.model.po.medicalrecord;

public class DoctorSystemBaseServiceImpl implements DoctorSystemBaseService {

	@Autowired
	public medicalrecordMapper medicalRecordMapper;
	@Autowired
	public diseaseMapper diseaseMapper0;
	@Autowired
	public medicaldiseaseMapper medicalDiseaseMapper;
	@Autowired
	public registerMapper registermapper0;
	
	@Override
	public medicalrecord getMedicalRecordData(int id) {
		return medicalRecordMapper.getPatientData(id);
	}

	@Override
	public List<disease> getDiseaseMedical(int id) {
		return diseaseMapper0.getDiseaseData(id);
	}

	@Override
	public int getDiagnosisType(int registId) {
		return medicalDiseaseMapper.getDiagnosisType(registId);
	}

	@Override
	public int getDieaseState(int registId) {
		return medicalRecordMapper.getDieaseState(registId);
	}

	@Override
	public List<medicaldisease> getMedicalTime(int registId) {
		return medicalDiseaseMapper.getMedicalTime(registId);
	}

	@Override
	public int insertICDData(String patientName, String icd, String radioICD, Date time) {
		medicaldisease medicalDisease = new medicaldisease();
		medicalDisease.setGetsiskdate(time);
		medicalDisease.setDiagnosetype(Integer.parseInt(radioICD));
		medicalrecord medicalRecord = medicalRecordMapper.getData(Integer.parseInt(patientName));
		medicalDisease.setRegistid(Integer.parseInt(patientName));
		medicalDisease.setMedicalid(medicalRecord.getId());
		medicalDisease.setDiagnosecate(1);
		if (diseaseMapper0.getId(icd) == 0) {
			return 0;
		}
		medicalDisease.setDiseaseid(diseaseMapper0.getId(icd));
		if (medicalDiseaseMapper.insert(medicalDisease) != 0) {
			return 1;
		}
		return 0;
	}

	@Override
	public int deleteICDData(int medicalDiseaseId, String icd) {
		return medicalDiseaseMapper.deleteDieaseIcd(medicalDiseaseId, icd);
	}

	@Override
	public String saveIndexData(String radioICD, String patientName, String data0, medicalrecord medicalRecord) {
		medicalRecord.setCasestate(Integer.parseInt(data0));
		if (medicalRecordMapper.getData(Integer.parseInt(patientName)) == null) {
			medicalRecord.setRegistid(Integer.parseInt(patientName));
			if (registermapper0.getCaseNumber(Integer.parseInt(patientName)) == null) {
				return "false";
			}
			medicalRecord.setCasenumber(registermapper0.getCaseNumber(Integer.parseInt(patientName)));
			if (medicalRecordMapper.insertSelective(medicalRecord) != 0) {
				saveType(Integer.parseInt(radioICD), Integer.parseInt(patientName));
				return "true";
			}
			return "false";
		}
		medicalRecord.setRegistid(Integer.parseInt(patientName));
		medicalRecordMapper.savaRecord(medicalRecord);
		saveType(Integer.parseInt(radioICD), Integer.parseInt(patientName));
		return "true";
	}
	
	private void saveType(int radioICD, int registId) {
		if (medicalDiseaseMapper.findID(registId) != null) {
			return;
		}
		medicaldisease medicaldisease0 = new medicaldisease();
		medicaldisease0.setRegistid(registId);
		medicaldisease0.setMedicalid(medicalRecordMapper.getData(registId).getId());
		medicaldisease0.setDiagnosetype(radioICD);
		medicaldisease0.setDiseaseid(-1);
		medicaldisease0.setDiagnosecate(1);
		medicalDiseaseMapper.insertSelective(medicaldisease0);
	}
}
