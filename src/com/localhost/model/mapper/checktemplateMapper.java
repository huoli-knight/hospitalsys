package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.checktemplate;

public interface checktemplateMapper {
    int insert(checktemplate record);
    
    int save(checktemplate record);

    int insertSelective(checktemplate record);

    public List<checktemplate> getTemplateData();
    
   // public List<checktemplate> searchTemplateData(String scope,Integer recordtype,String name);
    
  //  public List<checktemplate> searchTemplateData(@Param("scope")String scope,@Param("recordtype")Integer recordtype,@Param("name")String name);
    public List<checktemplate> searchTemplateData(checktemplate ch);

	int delete(Integer id);

}