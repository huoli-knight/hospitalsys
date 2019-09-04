package com.localhost.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.registerMapper;
import com.localhost.model.po.register;

@Controller
public class PRController {

	@Autowired
	private registerMapper registerMapper2;
	
	@RequestMapping(value = "/PRgetdata")
	public @ResponseBody List<register> getregisterData1(String casenumber){
		List<register> register = registerMapper2.getregisterData1(casenumber);
		
		return register;
		
	}
	
	@RequestMapping("/PRgetdataAndDate")
	public @ResponseBody List<register> getregisterData1(String casenumber, String min, String max) {
		List<register> register = registerMapper2.getregisterData1(casenumber).stream().filter(x -> {
			Date start = null;
			try {
				start = new SimpleDateFormat("yyyy-MM-dd").parse(min);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Date end = null;
			try {
				end = new SimpleDateFormat("yyyy-MM-dd").parse(max);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return x.getRegisttime().getTime() >= start.getTime() && x.getRegisttime().getTime() <= end.getTime();
		}).collect(Collectors.toList());
		return register;
	}
	//退药
		@RequestMapping("returndrugs")
		public ResponseEntity returndrugs(String ids,String number) {
			String idsArray[]=ids.split(",");
			for(int i=0;i<idsArray.length;i++) {
				if(idsArray[i]!=null&&idsArray[i].trim().length()>0) {
					Integer id=Integer.parseInt(idsArray[i]);
					this.registerMapper2.returndrugs(id,number);}
				}
				return ResponseEntity.ok().build();}
}
