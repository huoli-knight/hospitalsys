package com.localhost.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.localhost.model.service.ZHSCheckApplyService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSCheckApply;



@Controller
public class ZHSCheckApplyController {
	@Autowired
	private ZHSCheckApplyService checkApplyService;
	
	@RequestMapping(value="/getCheckApplyByRid",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSCheckApply> getCheckApplyByRid(int Rid, int State, int RecordType){
		System.out.println("ooooooooooooooooooooooooo" + Rid + "\t" + State);
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("Rid", Rid);
		map.put("State", State);
		map.put("RecordType", RecordType);
		List<ZHSCheckApply> checkApplylist = checkApplyService.selectCheckApplyByRid(map);
		System.out.println("0================");
		System.out.println(checkApplylist);
		System.out.println("1================");
		return checkApplylist;
	}
	
	
	@RequestMapping(value="/updateStateByRid",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String updateStateByRid(int Rid, int old_State, int new_State){
		System.out.println("ooooooooooooooooooooooooo" + Rid + "\t" + old_State + "\t" + new_State);
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("Rid", Rid);
		map.put("old_State", old_State);
		map.put("new_State", new_State);
		checkApplyService.updateStateByRid(map);
		return "{\"result\":true}";
	}
	
	@RequestMapping(value="/updateResult",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String updateResult(int che_id, int che_state, int che_oper, @DateTimeFormat(pattern = "yyyy-MM-dd") Date check_time, int res_oper, @DateTimeFormat(pattern = "yyyy-MM-dd") Date result_time, String input_result, @RequestParam MultipartFile[] resimg, HttpServletRequest request) throws IOException {
		System.out.println("=============================");
		String realPath = request.getServletContext().getRealPath("/");
		System.out.println(realPath);
		for (int i = 0; i < resimg.length; i++) {
			String fileName = resimg[i].getOriginalFilename();// 获取原文件名 
			System.out.println(fileName);
			File file = new File(realPath,fileName);		
			try {
				resimg[i].transferTo(file);
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println("ooooooooooooooooooooooooo\t" + che_id + "\t" + che_state + "\t" + che_oper + "\t" + check_time + "\t" + res_oper+ "\t" + result_time+ "\t" + input_result);
		ZHSCheckApply tempcheckapply = new ZHSCheckApply();
		tempcheckapply.setID(che_id);
		tempcheckapply.setState(che_state);
		tempcheckapply.setCheckOperID(che_oper);
		tempcheckapply.setCheckTime(check_time);
		tempcheckapply.setResultOperID(res_oper);
		tempcheckapply.setResultTime(result_time);
		tempcheckapply.setResult(input_result);
		checkApplyService.updateResult(tempcheckapply);
		return "{\"result\":true}";
	}

}
