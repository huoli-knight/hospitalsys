package com.localhost.controller;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.localhost.model.service.ZHSFmeditemService;
import com.localhost.utils.Jurisdiction;
import com.localhost.model.po.ZHSFmeditem;
import com.localhost.model.po.ZHSFmeditemTemplate;



@Controller
public class ZHSFmeditemController {
	@Autowired
	private ZHSFmeditemService fmeditemService;

	@RequestMapping(value="/getFemditem",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody List<ZHSFmeditem> getFmeditem(ZHSFmeditemTemplate fmeditemTemplate){
		System.out.println(fmeditemTemplate);
		List<ZHSFmeditem> fmeditemlist = fmeditemService.selectFmeditem(fmeditemTemplate);
		System.out.println("0================");
		System.out.println(fmeditemlist);
		System.out.println("1================");
		return fmeditemlist;
	}
	
	@RequestMapping(value="/addFemditem",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String addFmeditem(ZHSFmeditemTemplate fmeditemTemplate){
		System.out.println("oooooooooooooooooooooooooa");
		System.out.println(fmeditemTemplate);
		fmeditemService.insertFmeditem(fmeditemTemplate);
		return "{\"result\":true}";
	}
	
	@RequestMapping(value="/updateFmeditem",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String updateFmeditem(ZHSFmeditemTemplate fmeditemTemplate){
		System.out.println("ooooooooooooooooooooooooou");
		System.out.println(fmeditemTemplate);
		fmeditemService.updateFmeditem(fmeditemTemplate);
		return "{\"result\":true}";
	}
	
	@RequestMapping(value="/deleteFmeditem",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String deleteFmeditem(ZHSFmeditemTemplate fmeditemTemplate){
		System.out.println("oooooooooooooooooooooooood");
		System.out.println(fmeditemTemplate);
		fmeditemService.deleteFmeditem(fmeditemTemplate);
		return "{\"result\":true}";
	}
	
	@RequestMapping(value="/dataexport",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String dataexport(String Path) throws IOException{
		ZHSFmeditemTemplate fmeditemTemplate =  new ZHSFmeditemTemplate();
		List<ZHSFmeditem> fmeditemlist = fmeditemService.selectFmeditem(fmeditemTemplate);
		System.out.println("0================");
		System.out.println(fmeditemlist);
		System.out.println("1================");
		String JsonStr = JSON.toJSONString(fmeditemlist);
        String filePath = Path + "data.json";
        System.out.println(filePath);
        File file = new File(filePath);
        Writer write = new FileWriter(file);  
        write.write(JsonStr);  
        write.flush();  
        write.close(); 
		System.out.println("2================");
		return "{\"result\":true}";
	}
	
	@RequestMapping(value="/dataimport",method=RequestMethod.POST)
	@Jurisdiction(jurisdiction = 3)
	public @ResponseBody String dataimport(@RequestParam MultipartFile datafile,HttpServletRequest request) throws IOException{
		System.out.println("1================");
		System.out.println(datafile);
		String fileName = datafile.getOriginalFilename();// 获取原文件名 
		System.out.println(fileName);
		String realPath = request.getServletContext().getRealPath("/");
		System.out.println(realPath);
		File file = new File(realPath,fileName);		
		try {
			datafile.transferTo(file);
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		char[] ch = new char[99999];
        Reader reader = new FileReader(file);
        reader.read(ch); 
        reader.close();
        String JsonStr = String.valueOf(ch); 
        List<ZHSFmeditem> fmeditemlist = JSON.parseArray(JsonStr, ZHSFmeditem.class);       
        for (ZHSFmeditem f : fmeditemlist) {
        	System.out.println(f);
        	fmeditemService.insertFmeditem(f);
        }     
		return "{\"result\":true}";
	}
}
