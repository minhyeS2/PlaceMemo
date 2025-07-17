package com.placememo.back.service;

import java.util.Map;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.PlaceIconRequest;
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
        
        placeIconRepository.save(icon);
        
        return ResponseEntity.ok(Map.of(
        		"message", "Markerを変更しました！")); 
	
	}
	
	
	
}
