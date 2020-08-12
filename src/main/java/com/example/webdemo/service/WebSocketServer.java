package com.example.webdemo.service;

import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.CopyOnWriteArraySet;


/**
 * 用于和前端网页保持websocket连接，实现后端主动向页面推送消息
 */
@ServerEndpoint(value = "/WebSocket/{id}/{name}")
@Component
public class WebSocketServer {

    // 用来记录当前连接数的变量
    private static volatile int onlineCount = 0;

    // concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象
    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<WebSocketServer>();

    // 与某个客户端的连接会话，需要通过它来与客户端进行数据收发
    Session session;

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketServer.class);

    @OnOpen
    public void onOpen( Session session, @PathParam("id") long id, @PathParam("name") String name) throws Exception {
        this.session = session;
        webSocketSet.add(this);
        LOGGER.info("Open a websocket. id={}, name={}", id, name);
    }

    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        LOGGER.info("Close a websocket. ");
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        LOGGER.info("Receive a message from client: " + message);

        JSONObject jmessage = JSONObject.fromObject(message);
        String type = jmessage.getString("type");
        switch(type) {
            // 客户端回应服务端的心跳
            case "pong":
                return;
            // 客户端登录 message格式: {type:login, name:xx, room_id:1} ，添加到客户端，广播给所有客户端xx进入聊天室
            case "login":
                JSONObject systemstate = new JSONObject();
                systemstate.put("type","login");
                systemstate.put("system","on");
                send(systemstate.toString());
                System.out.println(systemstate.toString());
                return;
        }

    }

    @OnError
    public void onError( Session session, Throwable error) {
        LOGGER.error("Error while websocket. ", error);
    }

    public  void sendMessage(String message) throws Exception {
        if (this.session.isOpen()) {
            this.session.getBasicRemote().sendText(message);
        }
    }
    public void send(String message){
        try{
            sendMessage(message);
        }
        catch (Exception e)
        {

        }
    }
    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }

    public static synchronized  CopyOnWriteArraySet<WebSocketServer>  getwebSocketSet() {
        return webSocketSet;
    }



}
