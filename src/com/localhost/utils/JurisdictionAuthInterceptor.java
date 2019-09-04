package com.localhost.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class JurisdictionAuthInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (handler.getClass().isAssignableFrom(HandlerMethod.class)) {
			Jurisdiction jurisdiction = ((HandlerMethod) handler).getMethodAnnotation(Jurisdiction.class);
			// 没有声明需要权限,或者声明不验证权限 0:root权限
			if (jurisdiction == null || jurisdiction.jurisdiction() == 0) {
				return false;
			}
			HttpSession session = request.getSession();
			Integer username = (Integer) session.getAttribute("authorityLevel");
			if (username == null) {
				return false;
			}
			if (jurisdiction.jurisdiction() >= username.intValue()) { // 验证
				return true;
			}
			// 返回到登录界面
			return false;
		}
		return true;
	}
}
