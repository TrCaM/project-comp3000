package com.carleton.comp3000.models;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ErrorMessage {

    private String message;
    private int code;
    private String documentation;
    
    public ErrorMessage() {
        
    }
    
    public ErrorMessage(String errorMessage, int errorCode, String documentation) {
        message = errorMessage;
        code = errorCode;
        this.documentation = documentation;
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

    public String getDocumentation() {
        return documentation;
    }

    public void setDocumentation(String documentation) {
        this.documentation = documentation;
    }
    
    
}
