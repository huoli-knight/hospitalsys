package com.localhost.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.mapper.drugsMapper;
import com.localhost.model.po.drugs;

@Controller
public class PAcontroller {

	@Autowired
	private drugsMapper drugsMapper1;
	
	 @RequestMapping(value = "/PAgetalldata")
     public @ResponseBody List<drugs> getDrugsallData(String mnemoniccode){
   	  List<drugs> drugs = drugsMapper1.getDrugsallData(mnemoniccode);

   	  return drugs;
     }

	@RequestMapping(value = "/PAgetdata")
	public @ResponseBody List<drugs> getDrugsData(String mnemoniccode) {
		List<drugs> drugs = drugsMapper1.getDrugsData(mnemoniccode);

		return drugs;
	}

	/***
	 * 添加
	 */
	@RequestMapping(value = "/add")
	public ResponseEntity add(drugs drugs) {
		try {
			drugs.setCreationdate(new Date());
			drugs.setDelmark(1);
			this.drugsMapper1.insertSelective(drugs);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
	@RequestMapping("/delete")
	public ResponseEntity delete(String deleteArrayStr) {
		try {
			
		String ids[]=	deleteArrayStr.split(",");
		for(int i=0;i<ids.length;i++)
		{
			if(ids[i]!=null&&ids[i].trim().length()>0){
				int id=Integer.parseInt(ids[i]);
				this.drugsMapper1.deleteById(id);
			}
		}
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
	
	@RequestMapping("/queryById")
	@ResponseBody
	public drugs queryById(Integer id) {
		drugs drugs=this.drugsMapper1.queryById(id);
		return drugs;
	}
	
	@RequestMapping("/edit")
	@ResponseBody
	public ResponseEntity edit(drugs drugs) {
		try {
			drugs.setLastupdatedate(new Date());
			this.drugsMapper1.updateSelective(drugs);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok().build();
	}
}