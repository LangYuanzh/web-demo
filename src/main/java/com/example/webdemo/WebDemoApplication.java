package com.example.webdemo;

import com.example.webdemo.compnent.SpringUtil;
import com.example.webdemo.service.SocketServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(SpringUtil.class)
public class WebDemoApplication {

    public static void main ( String[] args ) {
        SpringApplication.run ( WebDemoApplication.class , args );
        SocketServer server = new SocketServer();
        server.startSocketServer(8082);
    }

}
