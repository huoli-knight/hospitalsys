package com.localhost.model.po;

import java.math.BigDecimal;

public class registrationdrugfee extends prescription {

	private String drugsname;
	
	private BigDecimal drugsprice;
	
	private BigDecimal amount;
	
	 private Integer state;
	
	public String getDrugsname() {
        return drugsname;
    }
	
	 public BigDecimal getDrugsprice() {
	        return drugsprice;
	    }
	 
	 public BigDecimal getAmount() {
	        return amount;
	    }
	 
	 public Integer getState() {
	        return state;
	    }

}