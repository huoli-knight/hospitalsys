package com.localhost.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSCheckApplyMapper;
import com.localhost.model.po.ZHSCheckApply;


public class ZHSCheckApplyServiceImpl implements ZHSCheckApplyService {
	@Autowired
	private ZHSCheckApplyMapper checkApplyMapper;

	@Override
	public List<ZHSCheckApply> selectCheckApplyByRid(HashMap map) {
		return checkApplyMapper.findCheckApplyByRid(map);
	}

	@Override
	public void updateStateByRid(HashMap map) {
		checkApplyMapper.refreshStateByRid(map);
	}
	
	@Override
	public void updateResult(ZHSCheckApply checkApply) {
		checkApplyMapper.refreshResult(checkApply);
	}
}
