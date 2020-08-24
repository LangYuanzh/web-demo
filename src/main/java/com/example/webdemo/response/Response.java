package com.example.webdemo.response;

import com.sun.xml.internal.ws.developer.Serialization;
import lombok.Data;

@Data
@Serialization
public class Response{
    private int code;
    private String message;
    private Object data;

    public Response ( int code , String message , Object data ) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static Response build( int code, String message, Object data){
        return new Response(code,message,data);
    }
}
