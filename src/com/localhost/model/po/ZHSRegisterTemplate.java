package com.localhost.model.po;

import java.util.Date;

public class ZHSRegisterTemplate {
	private Integer ID;
	private String CaseNumber;
	private String RealName;
	private Integer Gender;
	private String IDnumber;
	private Date BirthDate;
	private Integer Age;
	private String AgeType;
	private String HomeAddress;
	private Date VisitDate;
	private String Noon;
	private Integer DeptID;
	private Integer UserID;
	private Integer RegistLeID;
	private Integer SettleID;
	public Integer getSettleID() {
		return SettleID;
	}
	public void setSettleID(Integer settleID) {
		SettleID = settleID;
	}
	public String getIsBook() {
		return IsBook;
	}
	public void setIsBook(String isBook) {
		IsBook = isBook;
	}
	public Date getRegistTime() {
		return RegistTime;
	}
	public void setRegistTime(Date registTime) {
		RegistTime = registTime;
	}
	public Integer getRegisterID() {
		return RegisterID;
	}
	public void setRegisterID(Integer registerID) {
		RegisterID = registerID;
	}
	public Integer getVisitState() {
		return VisitState;
	}
	public void setVisitState(Integer visitState) {
		VisitState = visitState;
	}

	private String IsBook;
	private Date RegistTime;
	private Integer RegisterID;
	private Integer VisitState;
	
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getCaseNumber() {
		return CaseNumber;
	}
	public void setCaseNumber(String caseNumber) {
		CaseNumber = caseNumber;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public Integer getGender() {
		return Gender;
	}
	public void setGender(Integer gender) {
		Gender = gender;
	}
	public String getIDnumber() {
		return IDnumber;
	}
	public void setIDnumber(String iDnumber) {
		IDnumber = iDnumber;
	}
	public Date getBirthDate() {
		return BirthDate;
	}
	public void setBirthDate(Date birthDate) {
		BirthDate = birthDate;
	}
	public Integer getAge() {
		return Age;
	}
	public void setAge(Integer age) {
		Age = age;
	}
	public String getAgeType() {
		return AgeType;
	}
	public void setAgeType(String ageType) {
		AgeType = ageType;
	}
	public String getHomeAddress() {
		return HomeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		HomeAddress = homeAddress;
	}
	public Date getVisitDate() {
		return VisitDate;
	}
	public void setVisitDate(Date visitDate) {
		VisitDate = visitDate;
	}
	public String getNoon() {
		return Noon;
	}
	public void setNoon(String noon) {
		Noon = noon;
	}
	public Integer getDeptID() {
		return DeptID;
	}
	public void setDeptID(Integer deptID) {
		DeptID = deptID;
	}
	public Integer getUserID() {
		return UserID;
	}
	public void setUserID(Integer userID) {
		UserID = userID;
	}
	public Integer getRegistLeID() {
		return RegistLeID;
	}
	public void setRegistLeID(Integer registLeID) {
		RegistLeID = registLeID;
	}
	
	@Override
	public String toString() {
		return "Register [ID=" + ID + ", CaseNumber=" + CaseNumber + ", RealName=" + RealName + ", Gender=" + Gender
				+ ", IDnumber=" + IDnumber + ", BirthDate=" + BirthDate + ", Age=" + Age + ", AgeType=" + AgeType
				+ ", HomeAddress=" + HomeAddress + ", VisitDate=" + VisitDate + ", Noon=" + Noon + ", DeptID=" + DeptID
				+ ", UserID=" + UserID + ", RegistLeID=" + RegistLeID + ", SettleID=" + SettleID + ", IsBook=" + IsBook
				+ ", RegistTime=" + RegistTime + ", RegisterID=" + RegisterID + ", VisitState=" + VisitState + "]";
	}
}
