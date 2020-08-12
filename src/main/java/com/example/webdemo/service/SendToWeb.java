package com.example.webdemo.service;
import com.example.webdemo.dao.Environment;
import net.sf.json.JSONObject;

import java.util.concurrent.CopyOnWriteArraySet;

/**
 * 调用sendToAll 方法可以将消息发送给所有打开的前端页面
 */
public class SendToWeb {

    public static void sendSensorData( Environment data){
        JSONObject systemstate = new JSONObject();
        systemstate.put("type","login");
        systemstate.put("system","on");
        sendToAll(systemstate);
    }

    public static void sendToAll(JSONObject jsonObject){
        CopyOnWriteArraySet<WebSocketServer> webSocketSet = WebSocketServer.getwebSocketSet();
        for(WebSocketServer server : webSocketSet) {
            try {
                if (server.session.isOpen()) {
                    server.session.getBasicRemote().sendText(jsonObject.toString());
                }
            } catch (Exception e) {
            }
        }
    }
}
