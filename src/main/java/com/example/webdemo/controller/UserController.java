package com.example.webdemo.controller;

import com.example.webdemo.dao.Environment;
import com.example.webdemo.service.EnvironmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class UserController {

    @Autowired
    private EnvironmentService environmentService;

    @RequestMapping("findbydateblock")
    public List<Environment> findAllUsers( @RequestParam String starttime, String endtime ){
        System.out.println (starttime);
        System.out.println (endtime);
        return environmentService.findBySQL(starttime, endtime);
    }

    @RequestMapping("lastdata")
    public List<Environment> findLastData(){
        return environmentService.findLastData();
    }


}
