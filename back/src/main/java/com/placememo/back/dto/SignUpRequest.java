package com.placememo.back.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class SignUpRequest {
	
	@NotBlank(message = "IDを入力してください。")
	@Size(min = 4, max = 20, message = "IDは4～20文字で入力してください。")
	private String userId;
	
	@NotBlank(message = "ニックネームを入力してください。")
	@Size(min = 2, max = 10, message = "ニックネームは2～10文字で入力してください。")
	private String nickname;
	
	@NotBlank(message = "パスワードを入力してください。")
	@Size(min = 6, max = 20, message = "パスワードは6～20文字で入力してください。")
	private String password;
	
}
