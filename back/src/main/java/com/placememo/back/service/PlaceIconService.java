package com.placememo.back.service;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.placememo.back.dto.PlaceIconResponse;
import com.placememo.back.entity.Member;
import com.placememo.back.entity.Memo;
import com.placememo.back.repository.MemberRepository;
import com.placememo.back.repository.MemoRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class PlaceIconService {

	private final MemoRepository memoRepository;
	private final MemberRepository memberRepository;

	// 전체 맵에 유저의 저장한 마커 표시
	public List<PlaceIconResponse> getPlaceIcon(String userId) {
		Member member = memberRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

		List<Memo> markers = memoRepository.findAllByMember(member);

		return markers.stream()
				.map(marker -> new PlaceIconResponse(
						marker.getPk(),
						marker.getMember().getUserId(),
						marker.getMemoText(),
						marker.getTags(),
						marker.getIconUrl(),
						marker.getPlaceName(),
						marker.getPlaceId(),
						marker.getPlaceLat(),
						marker.getPlaceLng(),
						marker.getPlaceAddress(),
						marker.getPlaceStatus(),
						marker.getCreatedAt()))
				.collect(Collectors.toList());

	}

}
