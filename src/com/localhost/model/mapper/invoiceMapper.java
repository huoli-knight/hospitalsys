package com.localhost.model.mapper;

import java.util.Date;
import java.util.List;

import com.localhost.model.po.invoice;

public interface invoiceMapper {
    int insert(invoice record);

    int insertSelective(invoice record);
    
    public invoice getinvoicenum();
    
    
    
    //查发票信息
    public List<invoice> getregisterinvoiceinformation(int id);
    
    
    //传入起始和截止时间
    //查询发票
    public List<invoice> getregisterreport(Date time);
    //结算报账，修改状态为已日结
    public int registercloseaccount(Date maxtime);
    
    //ID为病历号，打印发票，修改状态未打印->已打印
    public int registerimmediatelyprintstate(int id);
    
    //ID为病历号，补打发票，修改状态未打印->已补打
    public int registerprintstate(int id);
    
    
    
    
}