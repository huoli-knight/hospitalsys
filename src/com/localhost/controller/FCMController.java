package com.localhost.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.expenseclassMapper;
import com.localhost.model.po.expenseclass;

@Controller
public class FCMController {

	@Autowired
	public expenseclassMapper expenseclassMapper1;
	
	@RequestMapping(value="/FCMgetalldata")
	public @ResponseBody List<expenseclass> getsubjectallDate(String expcode){
	      
		List<expenseclass> expenseclass = expenseclassMapper1.getallsubjectData(expcode);
		
		return expenseclass;
	}
	
	@RequestMapping(value="/FCMgetdata")
	public @ResponseBody List<expenseclass> getsubjectData(String expcode){
		
		List<expenseclass> expenseclass = expenseclassMapper1.getsubjectData(expcode);
		
				return expenseclass;
	}
//	@RequestMapping(value ="/addDepartment")
//	public ResponseEntity add(expenseclass) {
//		try {
//			expenseclass.setCreationdate(new Date());
//			expenseclass.setDelmark(1);
//			this.expenseclassMapper1.insertSelective(drugs);
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().build();
//		}
//		return ResponseEntity.ok().build();
//	}

	

}

