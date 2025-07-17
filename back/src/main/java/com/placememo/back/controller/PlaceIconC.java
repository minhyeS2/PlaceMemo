package com.placememo.back.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.placememo.back.dto.PlaceIconRequest;
import com.placememo.back.service.PlaceIconService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
public class PlaceIconC {
	
	private final PlaceIconService placeIconService;
	
	@PostMapping("/icon")
	public ResponseEntity<Map<String, String>> createPlaceIcon(@RequestBody PlaceIconRequest request) {
		 // 현재 로그인된 사용자의 userId 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();  // Jwt에서 setSubject(userId) 했기 때문에
		
        return placeIconService.createPlaceIcon(request, userId);

	}
	

}
