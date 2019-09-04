package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.registrationfee;

public interface registrationfeeMapper {
    
    //传入ID是Register表的ID
    public List<registrationfee> getregisterfee(int id);
    
    public int registerfeetstate(int id);
    
    public int registerrefundtstate(int id);
}