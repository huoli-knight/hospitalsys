package com.localhost.model.po;

import java.util.Date;

public class checktemplate {
    private Integer id;

    private String name;

    private Integer userid;

    private Date creationtime;

    private String scope;

    private Integer recordtype;

    private Integer delmark;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Date getCreationtime() {
        return creationtime;
    }

    public void setCreationtime(Date creationtime) {
        this.creationtime = creationtime;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope == null ? null : scope.trim();
    }

    public Integer getRecordtype() {
        return recordtype;
    }

    public void setRecordtype(Integer recordtype) {
        this.recordtype = recordtype;
    }

    public Integer getDelmark() {
        return delmark;
    }

    public void setDelmark(Integer delmark) {
        this.delmark = delmark;
    }
}