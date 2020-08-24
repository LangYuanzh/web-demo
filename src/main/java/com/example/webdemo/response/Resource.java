package com.example.webdemo.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Resource {

   private int id;
   private int  hostId;
   private double totalMemorySize;
   private double maxMemorySize;
   private double usedMemorySize;
   private double totalDiskSpace;
   private double freeDiskSpace;
   private double usableDiskSpace;
   private String systemUtilization;
   private  String userUsage;
   private  String waitingRate;
   private  String freeRate;
   private  String cores;
   private  String date;
   private  String cpuload;
   //private  List<Process> processList;
   private String osName;
}
