package com.placememo.back.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.placememo.back.dto.SignUpRequest;
import com.placememo.back.service.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class MemberC {
	
	private final MemberService memberService;
	

	@PostMapping("/signup")
	public String signUp(@RequestBody @Valid SignUpRequest request) {
		System.out.print("requset : " +  request);
		
		return memberService.signUp(request);
		
	}
	
}
