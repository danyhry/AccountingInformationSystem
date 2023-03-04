package com.danyhry.diplomaapplication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserException extends RuntimeException {

    public UserException(String errorMessage) {
        super(errorMessage);
    }

}
