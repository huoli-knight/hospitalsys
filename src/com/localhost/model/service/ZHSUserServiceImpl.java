package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSUserMapper;
import com.localhost.model.po.ZHSUser;



public class ZHSUserServiceImpl implements ZHSUserService {
	
	@Autowired
	private ZHSUserMapper userMapper;

	@Override
	public List<ZHSUser> selectUser() {
		return userMapper.findUser();
	}

}
