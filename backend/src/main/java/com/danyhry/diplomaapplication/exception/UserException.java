package com.danyhry.diplomaapplication.exception;

public class UserException extends Exception {

    public UserException(String errorMessage) {
        super(errorMessage);
    }

    public UserException(String errorMessage, Throwable error) {
        super(errorMessage, error);
    }
}
