package com.example.webdemo.controller;

import com.example.webdemo.response.Resource;
import com.example.webdemo.response.Response;
import com.example.webdemo.response.TableData;
import net.sf.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")
public class ForTest {

    @GetMapping( value = "login")
    public Response login(){
        System.out.println ("login");
        return Response.build ( 200,"登录成功",null );
    }

    @GetMapping(value = "table-init")
    public Response table(){
        System.out.println ("table");

        List<TableData> list = new ArrayList<> (  );
        list.add ( TableData.builder()
                .hostId ( 12 )
                .cores ( "4" )
                .givenName ( "we" )
                .groupName ( 2 )
                .ip ( "123.67.865.32" )
                .isDeploy ( "running" )
                .osName ( "centOs" )
                .totalDiskSpace ( 256D )
                .totalMemorySize ( 16D )
                .build() );
        list.add ( TableData.builder()
                .hostId ( 22 )
                .cores ( "4" )
                .givenName ( "ASDFS" )
                .groupName ( 2 )
                .ip ( "123.67.865.35" )
                .isDeploy ( "stop" )
                .osName ( "centOs" )
                .totalDiskSpace ( 256D )
                .totalMemorySize ( 16D )
                .build() );
        return Response.build ( 200,"ok",list );
    }

    @GetMapping("host-search")
    public Response dfd(@RequestParam String searchType, String searchValue){

        System.out.println (searchType+","+searchValue);
        List<TableData> list = new ArrayList<> (  );
        for(int i = 0; i< 10;i++) {
            list.add ( TableData.builder ()
                    .hostId ( 10 )
                    .cores ( "4" )
                    .givenName ( "we" )
                    .groupName ( 2 )
                    .ip ( "123.67.865.32" )
                    .isDeploy ( "running" )
                    .osName ( "centOs" )
                    .totalDiskSpace ( 256D )
                    .totalMemorySize ( 16D )
                    .build () );
            list.add ( TableData.builder ()
                    .hostId ( 20 )
                    .cores ( "4" )
                    .givenName ( "ASDFS" )
                    .groupName ( 2 )
                    .ip ( "123.67.865.35" )
                    .isDeploy ( "stop" )
                    .osName ( "centOs" )
                    .totalDiskSpace ( 256D )
                    .totalMemorySize ( 16D )
                    .build () );
        }
        return Response.build ( 200,"ok",list );
    }

    @RequestMapping("delete")
    public Response dsds(@RequestParam int hostId){
        System.out.println (hostId);
        return Response.build ( 200,"ok",null );
    }

    @PostMapping("update")
    public Response asd(@RequestBody JSONObject object){
        System.out.println (object);
        return Response.build ( 200,"ok",null );
    }

    @PostMapping("host-insert")
    public Response insert(@RequestBody JSONObject object){
        System.out.println (object);
        return Response.build ( 200,"ok",null );
    }

    @PostMapping("resource-search")
    public Response rs(@RequestBody JSONObject object){
        System.out.println (object);

        List<Resource> list = new ArrayList<> (  );
        for(int i = 0; i < 10; i++){
            list.add ( Resource.builder ().date ( "2020-03-24" )
                    .usedMemorySize(123d).build () );
        }
        return Response.build ( 200,"ok",list );
    }
}
