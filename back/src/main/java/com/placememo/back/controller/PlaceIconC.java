package com.placememo.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.placememo.back.service.PlaceIconService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
public class PlaceIconC {
	
	private final PlaceIconService placeIconService;
	
//	// 아이콘 저장
//	@PostMapping("/savedicon")
//	public ResponseEntity<Map<String, String>> createPlaceIcon(@RequestBody PlaceIconRequest request) {
//		 // 현재 로그인된 사용자의 userId 가져오기
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String userId = authentication.getName();  // Jwt에서 setSubject(userId) 했기 때문에
//		
//        return placeIconService.createPlaceIcon(request, userId);
//
//	}
//	
//	// 아이콘 전체 맵에 조회, 불러오기
//	@GetMapping("/icons")
//	public List<PlaceIconResponse> getPlaceIcon() {
//	// 현재 로그인된 사용자의 userId 가져오기
//    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//    String userId = authentication.getName();  // Jwt에서 setSubject(userId) 했기 때문에
//
//	return placeIconService.getPlaceIcon(userId);
//	
//	}
	

}
