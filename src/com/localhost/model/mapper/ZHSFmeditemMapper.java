package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.ZHSFmeditem;
import com.localhost.model.po.ZHSFmeditemTemplate;

public interface ZHSFmeditemMapper {
	public List<ZHSFmeditem> findFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void addFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void refreshFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
	public void removeFmeditem(ZHSFmeditemTemplate fmeditemTemplate);
}
