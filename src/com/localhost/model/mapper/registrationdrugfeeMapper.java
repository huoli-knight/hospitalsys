package com.localhost.model.mapper;

import java.util.List;

import com.localhost.model.po.registrationdrugfee;

public interface registrationdrugfeeMapper {
    
    //传入ID是Register表的ID
    public List<registrationdrugfee> getregisterdrugfee(int id);
    
    public int registerfeetstate(int id);
    
    public int registerrefundtstate(int id);
}