package com.localhost.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.localhost.model.mapper.ZHSFmeditemMapper;
import com.localhost.model.po.ZHSFmeditem;
import com.localhost.model.po.ZHSFmeditemTemplate;


public class ZHSFmeditemServiceImpl implements ZHSFmeditemService {
	@Autowired
	private ZHSFmeditemMapper fmeditemMapper;
	
	@Override
	public List<ZHSFmeditem> selectFmeditem(ZHSFmeditemTemplate fmeditemTemplate) {
		return fmeditemMapper.findFmeditem(fmeditemTemplate);
	}

	@Override
	public void insertFmeditem(ZHSFmeditemTemplate fmeditemTemplate) {
		fmeditemMapper.addFmeditem(fmeditemTemplate);
	}

	@Override
	public void updateFmeditem(ZHSFmeditemTemplate fmeditemTemplate) {
		fmeditemMapper.refreshFmeditem(fmeditemTemplate);
	}

	@Override
	public void deleteFmeditem(ZHSFmeditemTemplate fmeditemTemplate) {
		fmeditemMapper.removeFmeditem(fmeditemTemplate);
	}

}
