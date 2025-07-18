package com.placememo.back.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.PlaceIconRequest;
import com.placememo.back.dto.PlaceIconResponse;
import com.placememo.back.entity.Member;
import com.placememo.back.entity.PlaceIcon;
import com.placememo.back.repository.MemberRepository;
import com.placememo.back.repository.PlaceIconRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PlaceIconService {
	
	private final PlaceIconRepository placeIconRepository;
	private final MemberRepository memberRepository;
	
	public ResponseEntity<Map<String, String>> createPlaceIcon(PlaceIconRequest request, String userId) {
		// Optional에서 Member 객체를 꺼냄
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
	
        PlaceIcon icon = new PlaceIcon();
        icon.setMember(member);
        icon.setIconUrl(request.getIconUrl());
        icon.setPlaceId(request.getPlaceId());
        icon.setPlaceLat(request.getPlaceLat());
        icon.setPlaceLng(request.getPlaceLng());
        icon.setPlaceName(request.getPlaceName());
        icon.setPlaceAddress(request.getPlaceAddress());
        icon.setPlaceStatus(request.getPlaceStatus());
        
        placeIconRepository.save(icon);
        
        return ResponseEntity.ok(Map.of(
        		"message", "Markerを変更しました！")); 
	
	}
	
	// 전체 맵에 유저의 저장한 마커 표시
	public List<PlaceIconResponse> getPlaceIcon(String userId) {
		Member member = memberRepository.findByUserId(userId)
		            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
		
		List<PlaceIcon> placeIcons = placeIconRepository.findAllByMember(member);
		
		for (PlaceIcon placeIcon : placeIcons) {
		    System.out.println( "아이콘 주소"+ placeIcon.getIconUrl());
		}
		
		return placeIcons.stream()
				.map(placeIcon -> new PlaceIconResponse(
						placeIcon.getPk(),
						placeIcon.getMember().getUserId(),
						placeIcon.getPlaceId(),
						placeIcon.getIconUrl(),
						placeIcon.getPlaceLat(),
						placeIcon.getPlaceLng(),
						placeIcon.getPlaceName(),
						placeIcon.getPlaceAddress(),
						placeIcon.getPlaceStatus()))
				.collect(Collectors.toList());
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
}
