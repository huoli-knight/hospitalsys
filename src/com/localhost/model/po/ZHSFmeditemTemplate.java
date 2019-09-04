package com.localhost.model.po;

import java.math.BigDecimal;
import java.util.Date;

public class ZHSFmeditemTemplate {
	private Integer ID;
	private String ItemCode;
	private String ItemName;
	private String Format;
	private BigDecimal Price;
	private Integer ExpClassID;
	private Integer DeptID;
	private String MnemonicCode;
	private Date CreationDate;
	private Date LastUpdateDate;
	private Integer RecordType;
	private Integer DelMark;
	
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getItemCode() {
		return ItemCode;
	}
	public void setItemCode(String itemCode) {
		ItemCode = itemCode;
	}
	public String getItemName() {
		return ItemName;
	}
	public void setItemName(String itemName) {
		ItemName = itemName;
	}
	public String getFormat() {
		return Format;
	}
	public void setFormat(String format) {
		Format = format;
	}
	public BigDecimal getPrice() {
		return Price;
	}
	public void setPrice(BigDecimal price) {
		Price = price;
	}
	public void setPrice(double price) {
		Price = BigDecimal.valueOf(price);
	}
	public Integer getExpClassID() {
		return ExpClassID;
	}
	public void setExpClassID(Integer expClassID) {
		ExpClassID = expClassID;
	}
	public Integer getDeptID() {
		return DeptID;
	}
	public void setDeptID(Integer deptID) {
		DeptID = deptID;
	}
	public String getMnemonicCode() {
		return MnemonicCode;
	}
	public void setMnemonicCode(String mnemonicCode) {
		MnemonicCode = mnemonicCode;
	}
	public Date getCreationDate() {
		return CreationDate;
	}
	public void setCreationDate(Date creationDate) {
		CreationDate = creationDate;
	}
	public Date getLastUpdateDate() {
		return LastUpdateDate;
	}
	public void setLastUpdateDate(Date lastUpdateDate) {
		LastUpdateDate = lastUpdateDate;
	}
	public Integer getRecordType() {
		return RecordType;
	}
	public void setRecordType(Integer recordType) {
		RecordType = recordType;
	}
	public Integer getDelMark() {
		return DelMark;
	}
	public void setDelMark(Integer delMark) {
		DelMark = delMark;
	}
	@Override
	public String toString() {
		return "FmeditemTemplate [ID=" + ID + ", ItemCode=" + ItemCode + ", ItemName=" + ItemName + ", Format=" + Format
				+ ", Price=" + Price + ", ExpClassID=" + ExpClassID + ", DeptID=" + DeptID + ", MnemonicCode="
				+ MnemonicCode + ", CreationDate=" + CreationDate + ", LastUpdateDate=" + LastUpdateDate
				+ ", RecordType=" + RecordType + ", DelMark=" + DelMark + "]";
	}

}
