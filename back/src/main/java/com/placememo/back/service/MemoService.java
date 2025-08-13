package com.placememo.back.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.MemoRequest;
import com.placememo.back.dto.MemoResponse;
import com.placememo.back.entity.Member;
import com.placememo.back.entity.Memo;
import com.placememo.back.repository.MemberRepository;
import com.placememo.back.repository.MemoRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class MemoService {

    private final MemoRepository memoRepository;
    private final MemberRepository memberRepository;

    // 메모 등록
    public ResponseEntity<MemoResponse> createMemo(MemoRequest request, String userId) {
        // Optional에서 Member 객체를 꺼냄
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        Memo memo = new Memo();
        memo.setMember(member);
        memo.setMemoText(request.getMemoText());
        memo.setTags(request.getTags());
        memo.setIconUrl(request.getIconUrl());
        memo.setPlaceId(request.getPlaceId());
        memo.setPlaceName(request.getPlaceName());
        memo.setPlaceLat(request.getPlaceLat());
        memo.setPlaceLng(request.getPlaceLng());
        memo.setPlaceAddress(request.getPlaceAddress());
        memo.setPlaceStatus(request.getPlaceStatus());
        memoRepository.save(memo);

        MemoResponse response = new MemoResponse(memo);
        return ResponseEntity.ok(response);
        
    }
    
    //전체 메모 조회
    public List<MemoResponse> getAllMemos(String userId) {
    	Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
    
    	List<Memo> memos = memoRepository.findAllByMember(member);
    	
    	 return memos.stream()
    	            .map(memo -> new MemoResponse(
    	            	memo.getPk(),
    	                memo.getMember().getUserId(),
    	                memo.getMemoText(),
    	                memo.getTags(),
    	                memo.getIconUrl(),
    	                memo.getPlaceName(),
    	                memo.getPlaceId(),
    	                memo.getPlaceLat(),
    	                memo.getPlaceLng(),
    	                memo.getPlaceAddress(),
    	                memo.getPlaceStatus(),
    	                memo.getCreatedAt()))
    	            .collect(Collectors.toList());
    }
    
    
    // 메모 삭제
    public ResponseEntity<Map<String, String>> deleteMemo(String userId, Long pk) {
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        Memo memo = memoRepository.findByMemberAndPk(member, pk)
                .orElseThrow(() -> new RuntimeException("メモが見つかりません"));

        memoRepository.delete(memo);
        
        return ResponseEntity.ok(Map.of(
        		"message", "メモを削除しました！"));
    }
    
    // 메모 수정
    public MemoResponse updateMemo(MemoRequest request, String userId, Long pk) {
    	Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        Memo memo = memoRepository.findByMemberAndPk(member, pk)
                .orElseThrow(() -> new RuntimeException("メモが見つかりません"));
    	
        memo.setMemoText(request.getMemoText());
        memo.setIconUrl(request.getIconUrl());
        memo.setPlaceId(request.getPlaceId());
        memo.setTags(request.getTags());
        
       
        
        memoRepository.save(memo);
        
        return new MemoResponse(memo); // DTO 리턴

    }
    
    // 특정 마커별 필터링 기능
	public List<MemoResponse> getSortedMarkers(String userId, String iconUrl) {
		Member member = memberRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

		List<Memo> memos = memoRepository.findByMemberAndIconUrl(member, iconUrl);
		
		return memos.stream()
	            .map(memo -> new MemoResponse(
	            	memo.getPk(),
	                memo.getMember().getUserId(),
	                memo.getMemoText(),
	                memo.getTags(),
	                memo.getIconUrl(),
	                memo.getPlaceName(),
	                memo.getPlaceId(),
	                memo.getPlaceLat(),
	                memo.getPlaceLng(),
	                memo.getPlaceAddress(),
	                memo.getPlaceStatus(),
	                memo.getCreatedAt()))
	            .collect(Collectors.toList());

	}
	
	// 특정 태그별 필터링 기능
	public List<MemoResponse> getSortedTags(String userId, List<String> tags, long tagCount) {
		Member member = memberRepository.findByUserId(userId)
				.orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
	
		
		List<Memo> memos = memoRepository.findByAllTags(member, tags, tagCount);
		
		return memos.stream()
	            .map(memo -> new MemoResponse(
	            	memo.getPk(),
	                memo.getMember().getUserId(),
	                memo.getMemoText(),
	                memo.getTags(),
	                memo.getIconUrl(),
	                memo.getPlaceName(),
	                memo.getPlaceId(),
	                memo.getPlaceLat(),
	                memo.getPlaceLng(),
	                memo.getPlaceAddress(),
	                memo.getPlaceStatus(),
	                memo.getCreatedAt()))
	            .collect(Collectors.toList());
		
	}
	
	// placeId로 특정 메모 불러오기
	public List<MemoResponse> getMemo(String userId, String placeId) {
		Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));
		
		List<Memo> memos = memoRepository.findByMemberAndPlaceId(member, placeId);
		
		return memos.stream()
	            .map(memo -> new MemoResponse(
	            	memo.getPk(),
	                memo.getMember().getUserId(),
	                memo.getMemoText(),
	                memo.getTags(),
	                memo.getIconUrl(),
	                memo.getPlaceName(),
	                memo.getPlaceId(),
	                memo.getPlaceLat(),
	                memo.getPlaceLng(),
	                memo.getPlaceAddress(),
	                memo.getPlaceStatus(),
	                memo.getCreatedAt()))
	            .collect(Collectors.toList());
		
	}
	
	
	
	
	
	
	
	
 
}
