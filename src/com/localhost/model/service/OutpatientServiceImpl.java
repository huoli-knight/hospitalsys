package com.localhost.model.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.fmeditemMapper;
import com.localhost.model.mapper.patientcostsMapper;
import com.localhost.model.mapper.prescriptiondetailedMapper;
import com.localhost.model.mapper.registerMapper;
import com.localhost.model.mapper.registlevelMapper;


public class OutpatientServiceImpl implements OutpatientService {

	@Autowired
	private registerMapper registerMapper0;
	@Autowired
	private patientcostsMapper patientcostsMapper0;
	@Autowired
	private prescriptiondetailedMapper prescriptiondetailedMapper0;
	@Autowired
	private registlevelMapper registLevelMapper;
	@Autowired
	private fmeditemMapper fmedItemMapper;
	private String startTime;
	private String endTime;
	private int[] sumNumber = {0,0,0,0,0,0,0,0,0};
	
	@Override
	public String getoutpatient(HttpServletRequest request) {
		String result = "{";
		this.startTime = request.getParameter("startTime");
		this.endTime = request.getParameter("endTime");
		List<Integer> department = new ArrayList<Integer>();
		for (int i = 18; i < 30; i++) {
			department.add(i);
		}
		String key0 = "department";
		String key = key0 + 18;
		result += getSplicing(key, getOneData(department));
		for (int i = 17; i >= 11; i-- ) {
			if (i == 13) {
				continue;
			}
			department.clear();
			department.add(i);
			key = key0 + i;
			result += "," + getSplicing(key, getOneData(department));
		}
		result += "," + getSplicing("sum", getSum());
		result += "}";
		return result;
	}
	
	private String getSum() {
		String result = "{";
		result += getSplicingString("number0", "" + sumNumber[0]);
		for (int i = 1; i < sumNumber.length; i++) {
			result += "," + getSplicingString("number" + i, "" + sumNumber[i]);
		}
		result += "}";
		return result;
	}
	
	private String getSplicing(String key, String value) {
		return "\"" + key + "\":" + value;
	}
	
	private String getSplicingString(String key, String value) {
		return "\"" + key + "\":\"" + value + "\"";
	}
	
	private String getOneData(List<Integer> constantID) {
		String result = "{";
		Integer state = new Integer(0);
		state = registerMapper0.getNumberOfVisits(constantID, startTime, endTime);
		if (state == null) {
			result += getSplicingString("number0", "0");
		} else {
			sumNumber[0] += state.intValue();
			result += getSplicingString("number0", "" + state);
		}
		state = patientcostsMapper0.getNumber(constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number1", "0");
		} else {
			sumNumber[1] += state.intValue();
			result += "," + getSplicingString("number1", "" + state);
		}
		state = prescriptiondetailedMapper0.getFee("西药", constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number2", "0");
		} else {
			sumNumber[2] += state.intValue();
			result += "," + getSplicingString("number2", "" + state.toString());
		}
		state = prescriptiondetailedMapper0.getFee("中成药", constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number3", "0");
		} else {
			sumNumber[3] += state.intValue();
			result += "," + getSplicingString("number3", "" + state.toString());
		}
		state = prescriptiondetailedMapper0.getFee("中草药", constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number4", "0");
		} else {
			sumNumber[4] += state.intValue();
			result += "," + getSplicingString("number4", "" + state.toString());
		}
		sumNumber[5] += getRegistrationFee(constantID).intValue();
		result += "," + getSplicingString("number5", "" + getRegistrationFee(constantID));
		state = fmedItemMapper.getRecordTypeFee(1, constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number6", "0");
		} else {
			sumNumber[6] += state.intValue();
			result += "," + getSplicingString("number6", "" + state);
		}
		state = fmedItemMapper.getRecordTypeFee(2, constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number7", "0");
		} else {
			sumNumber[7] += state.intValue();
			result += "," + getSplicingString("number7", "" + state);
		}
		state = fmedItemMapper.getRecordTypeFee(3, constantID, startTime, endTime);
		if (state == null) {
			result += "," + getSplicingString("number8", "0");
		} else {
			sumNumber[8] += state.intValue();
			result += "," + getSplicingString("number8", "" + state);
		}
		result += "}";
		return result;
	}
	 
	private Integer getRegistrationFee(List<Integer> constantID) {
		Integer result = new Integer(0);
		List<Integer> number = registLevelMapper.getNumber();
		for (Integer state : number) {
			if (registerMapper0.getRegistration(state.intValue(), constantID, startTime, endTime) == null) {
				continue;
			}
			//registLevelMapper.getRegistFee 一定返回对应等级的价格，不用判断null
			result += registerMapper0.getRegistration(state.intValue(), constantID, startTime, endTime).intValue() * registLevelMapper.getRegistFee(state.intValue()).intValue();
		}
		return result;
	}

}
