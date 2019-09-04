package com.localhost.model.po;

public class ZHSUser {
	private Integer ID;
	private String UserName;
	private String Password;
	private String RealName;
	private Integer UseType;
	private Integer DocTitleID;
	private String IsScheduling;
	private Integer DeptID;
	private Integer RegistLeID;
	private Integer DelMark;
	
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public Integer getUseType() {
		return UseType;
	}
	public void setUseType(Integer useType) {
		UseType = useType;
	}
	public Integer getDocTitleID() {
		return DocTitleID;
	}
	public void setDocTitleID(Integer docTitleID) {
		DocTitleID = docTitleID;
	}
	public String getIsScheduling() {
		return IsScheduling;
	}
	public void setIsScheduling(String isScheduling) {
		IsScheduling = isScheduling;
	}
	public Integer getDeptID() {
		return DeptID;
	}
	public void setDeptID(Integer deptID) {
		DeptID = deptID;
	}
	public Integer getRegistLeID() {
		return RegistLeID;
	}
	public void setRegistLeID(Integer registLeID) {
		RegistLeID = registLeID;
	}
	public Integer getDelMark() {
		return DelMark;
	}
	public void setDelMark(Integer delMark) {
		DelMark = delMark;
	}
}
