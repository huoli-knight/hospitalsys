package com.localhost.model.service;

import java.util.List;

import com.localhost.model.po.ZHSFmeditem;
import com.localhost.model.po.ZHSFmeditemTemplate;


public interface ZHSFmeditemService {
	public List<ZHSFmeditem> selectFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void insertFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void updateFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void deleteFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
}
