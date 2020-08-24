package com.example.webdemo.controller;

import com.example.webdemo.dao.Environment;
import com.example.webdemo.service.EnvironmentService;
import net.sf.json.JSONObject;
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
    public JSONObject findLastData(){
        JSONObject object = new JSONObject (  );
        object.put ( "status",200 );
        object.put ( "msg","ok" );
        object.put ( "data",environmentService.findLastData());
        return object;
    }


}
