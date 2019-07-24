package com.localhost.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.localhost.model.service.LoginService;

@Controller
@RequestMapping("/user")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public Integer login(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Integer result = loginService.getJudgmentResult(username, password);
		if (result.intValue() == -1) {
			return result;
		}
		HttpSession session = request.getSession();
		session.setAttribute("authorityLevel", result);
		session.setAttribute("username", username);
		session.setMaxInactiveInterval(60 * 60 * 24 * 7);
		return result;
	}
	
	@RequestMapping(value = "/showUsername", method = RequestMethod.POST)
	public @ResponseBody String showUsername(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		String name = loginService.getName((String) session.getAttribute("username"));
		return "{\"name\":\"" + name + "\"}";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public void logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		session.removeAttribute("authorityLevel");
		session.removeAttribute("username");
		return;
	}
}
