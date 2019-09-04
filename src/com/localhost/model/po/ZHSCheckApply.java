package com.localhost.model.po;

import java.util.Date;

public class ZHSCheckApply {
	private Integer ID;
	private Integer RegistID;
	private Integer ItemID;
	private String Name;
	private Integer IsUrgent;
	private String Objective;
	private String Position;
	private Integer Num;
	private Date CreationTime;
	private Integer State;
	
	private Integer CheckOperID;
	private Date CheckTime;
	private Integer ResultOperID;
	private Date ResultTime;
	private String Result;
	
	public Integer getCheckOperID() {
		return CheckOperID;
	}
	public void setCheckOperID(Integer checkOperID) {
		CheckOperID = checkOperID;
	}
	public Date getCheckTime() {
		return CheckTime;
	}
	public void setCheckTime(Date checkTime) {
		CheckTime = checkTime;
	}
	public Integer getResultOperID() {
		return ResultOperID;
	}
	public void setResultOperID(Integer resultOperID) {
		ResultOperID = resultOperID;
	}
	public Date getResultTime() {
		return ResultTime;
	}
	public void setResultTime(Date resultTime) {
		ResultTime = resultTime;
	}
	public String getResult() {
		return Result;
	}
	public void setResult(String result) {
		Result = result;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public Integer getRegistID() {
		return RegistID;
	}
	public void setRegistID(Integer registID) {
		RegistID = registID;
	}
	public Integer getItemID() {
		return ItemID;
	}
	public void setItemID(Integer itemID) {
		ItemID = itemID;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Integer getIsUrgent() {
		return IsUrgent;
	}
	public void setIsUrgent(Integer isUrgent) {
		IsUrgent = isUrgent;
	}
	public String getObjective() {
		return Objective;
	}
	public void setObjective(String objective) {
		Objective = objective;
	}
	public String getPosition() {
		return Position;
	}
	public void setPosition(String position) {
		Position = position;
	}
	public Integer getNum() {
		return Num;
	}
	public void setNum(Integer num) {
		Num = num;
	}
	public Date getCreationTime() {
		return CreationTime;
	}
	public void setCreationTime(Date creationTime) {
		CreationTime = creationTime;
	}
	public Integer getState() {
		return State;
	}
	public void setState(Integer state) {
		State = state;
	}
	
	@Override
	public String toString() {
		return "ZHSCheckApply [ID=" + ID + ", RegistID=" + RegistID + ", ItemID=" + ItemID + ", Name=" + Name
				+ ", IsUrgent=" + IsUrgent + ", Objective=" + Objective + ", Position=" + Position + ", Num=" + Num
				+ ", CreationTime=" + CreationTime + ", State=" + State + ", CheckOperID=" + CheckOperID
				+ ", CheckTime=" + CheckTime + ", ResultOperID=" + ResultOperID + ", ResultTime=" + ResultTime
				+ ", Result=" + Result + "]";
	}
	
}
