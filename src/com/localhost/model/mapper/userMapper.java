package com.localhost.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.localhost.model.po.user;

public interface userMapper {
    int insert(user record);

	int insertSelective(user record);
	
	public user getUser(String username);
	
	public List<user> getregisterdoctor();
	
	//用户名对应id
	public int getuserid(@Param("name")String name);
}