package com.placememo.back.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	
    @NotBlank(message = "IDは必須です。")
    private String userId;

    @NotBlank(message = "パスワードは必須です。")
	private String password;
	
}
