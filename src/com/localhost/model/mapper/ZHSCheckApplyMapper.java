package com.localhost.model.mapper;

import java.util.HashMap;
import java.util.List;

import com.localhost.model.po.ZHSCheckApply;


public interface ZHSCheckApplyMapper {
	public List<ZHSCheckApply> findCheckApplyByRid(HashMap map);
	public void refreshStateByRid(HashMap map);
	public void refreshResult(ZHSCheckApply checkApply);
}
