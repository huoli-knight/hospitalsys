package com.localhost.model.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.userMapper;
import com.localhost.model.po.user;

public class LoginServiceImpl implements LoginService{

	private user userState;
	@Autowired
	private userMapper usermapper0;
	
	@Override
	public Integer getJudgmentResult(String username, String password) {
		if (usermapper0.getUser(username) == null) {
			return Integer.valueOf(-1);
		}
		//防止注入攻击
		for (int i = 0; i < password.length(); i++) {
			if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
				continue;
			}
			if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z') {
				continue;
			}
			if (password.charAt(i) >= 'A' && password.charAt(i) <= 'Z') {
				continue;
			}
			return Integer.valueOf(-1);
		}
		userState = usermapper0.getUser(username);
		if (userState.getPassword().equals(password)) {
			return userState.getUsetype();
		}
		return Integer.valueOf(-1);
	}

	@Override
	public String getName(String username) {
		userState = usermapper0.getUser(username);
		return userState.getRealname();
	}
	
}
