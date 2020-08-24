package com.example.webdemo.response;

import lombok.Builder;
import lombok.Data;

@Builder
public class TableData {



    private Integer hostId;
    private Integer groupName;
    private String ip;
    private String givenName;
    private String isDeploy;
    private String osName;
    private Double totalDiskSpace;
    private Double totalMemorySize;
    private String cores;

    public Integer getHostId () {
        return hostId;
    }

    public void setHostId ( Integer hostId ) {
        this.hostId = hostId;
    }

    public Integer getGroupName () {
        return groupName;
    }

    public void setGroupName ( Integer groupName ) {
        this.groupName = groupName;
    }

    public String getIp () {
        return ip;
    }

    public void setIp ( String ip ) {
        this.ip = ip;
    }

    public String getGivenName () {
        return givenName;
    }

    public void setGivenName ( String givenName ) {
        this.givenName = givenName;
    }

    public String getIsDeploy () {
        return isDeploy;
    }

    public void setIsDeploy ( String isDeploy ) {
        this.isDeploy = isDeploy;
    }

    public String getOsName () {
        return osName;
    }

    public void setOsName ( String osName ) {
        this.osName = osName;
    }

    public Double getTotalDiskSpace () {
        return totalDiskSpace;
    }

    public void setTotalDiskSpace ( Double totalDiskSpace ) {
        this.totalDiskSpace = totalDiskSpace;
    }

    public Double getTotalMemorySize () {
        return totalMemorySize;
    }

    public void setTotalMemorySize ( Double totalMemorySize ) {
        this.totalMemorySize = totalMemorySize;
    }

    public String getCores () {
        return cores;
    }

    public void setCores ( String cores ) {
        this.cores = cores;
    }
}
