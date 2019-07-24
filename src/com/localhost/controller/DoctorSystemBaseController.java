package com.localhost.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.po.disease;
import com.localhost.model.po.medicaldisease;
import com.localhost.model.po.medicalrecord;
import com.localhost.model.service.DoctorSystemBaseService;
import com.localhost.utils.Jurisdiction;

@Controller
@RequestMapping("/doctorBase")
public class DoctorSystemBaseController {

	@Autowired
	public DoctorSystemBaseService doctorSystemBaseService;
	
	@RequestMapping(value = "/getMedicalRecordData", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody medicalrecord getMedicalRecordData(String patientName) {
		return doctorSystemBaseService.getMedicalRecordData(Integer.parseInt(patientName));
	}
	
	@RequestMapping(value = "/getDiseaseMedical", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<disease> getDiseaseMedical(String patientName) {
		return doctorSystemBaseService.getDiseaseMedical(Integer.parseInt(patientName));
	}
	
	@RequestMapping(value = "/getDiagnosisType", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String getDiagnosisType(String patientName) {
		return "{\"result0\":"  + doctorSystemBaseService.getDiagnosisType(Integer.parseInt(patientName)) + 
				"," + "\"result1\":" + doctorSystemBaseService.getDieaseState(Integer.parseInt(patientName)) + "}";
	}
	
	@RequestMapping(value = "/getMedicalTime", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<medicaldisease> getMedicalTime(String patientName) {
		return doctorSystemBaseService.getMedicalTime(Integer.parseInt(patientName));
	}

	@RequestMapping(value = "/insertICDData", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String insertICDData(String patientName, String icd, String radioICD, Date time) {
		int result = -1;
		result = doctorSystemBaseService.insertICDData(patientName, icd, radioICD, time);
		return "{\"result0\":" + result + "}";
	}
	
	@RequestMapping(value = "/deleteICD", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String deleteICD(HttpServletRequest request) {
		String result = "true";
		int number = Integer.parseInt(request.getParameter("number"));
		int id = Integer.parseInt(request.getParameter("patientName"));
		String key0 = "key";
		String key = "";
		for (int i = 0; i < number; i++) {
			key = key0 + i;
			if (doctorSystemBaseService.deleteICDData(id, Integer.parseInt(request.getParameter(key))) == 0) {
				result = "false";
			}
		}
		return "{\"result0\":" + result + "}";
	}
	
	@RequestMapping(value = "/saveIndexData", method = RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String saveIndexData(String patientName, String data0, medicalrecord medicalRecord) {
		String result = "true";
		result = doctorSystemBaseService.saveIndexData(patientName, data0, medicalRecord);
		return "{\"result0\":" + result + "}";
	}
	
	
}
