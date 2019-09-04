package com.localhost.model.service;

import java.util.HashMap;
import java.util.List;

import com.localhost.model.po.ZHSCheckApply;

public interface ZHSCheckApplyService {
	public List<ZHSCheckApply> selectCheckApplyByRid(HashMap map);
	public void updateStateByRid(HashMap map);
	public void updateResult(ZHSCheckApply checkApply);
}
