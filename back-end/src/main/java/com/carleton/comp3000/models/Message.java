package com.carleton.comp3000.models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Message {

    private String message;
    private int code;
    
    public Message() {
        
    }
    
    public Message(String errorMessage, int errorCode) {
        message = errorMessage;
        code = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }
    
}
