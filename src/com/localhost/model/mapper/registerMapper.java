package com.localhost.model.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.register;

public interface registerMapper {
    int insert(register record);

    int insertSelective(register record);
    
    public register getregistercasenumber();
    
    public register getregisterinformation(int id);
    
    //查询当日专家号挂号数量
    public List<register> getregisterlimit(Date time);
    
    public List<register> getSeekingDoctor();
    
    public List<register> getNoSeekingDoctor();
    
    public String getCaseNumber(int id);
    
    public Integer getNumberOfVisits(@Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);

    public Integer getRegistration(@Param("LevelId") int LevelId, @Param("constantID") List<Integer> constantID, @Param("startTime") String startTime, @Param("endTime") String endTime);
public List<register> getregisterData(String casenumber);
    
    public List<register> getregisterData1(String casenumber);
    
    int changedrugsstate();

	void toY(@Param("id")Integer id,@Param("number") String number);
	
	void returndrugs(@Param("id")Integer id,@Param("number") String number);

}