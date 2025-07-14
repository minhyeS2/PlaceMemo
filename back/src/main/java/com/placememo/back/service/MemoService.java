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
    public ResponseEntity<Map<String, String>> createMemo(MemoRequest request, String userId) {
        // Optional에서 Member 객체를 꺼냄
        Member member = memberRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        Memo memo = new Memo();
        memo.setMember(member);
        memo.setMemoText(request.getMemoText());
        memo.setPlaceId(request.getPlaceId());
        memo.setPlaceName(request.getPlaceName());

        memoRepository.save(memo);

        return ResponseEntity.ok(Map.of(
        		"message", "メモを作成しました！"));
        
    }
    
    // 메모 조회
    public List<MemoResponse> getMemosByUserAndPlace(String userId, String placeId) {
        Member member = memberRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        List<Memo> memos = memoRepository.findByMemberAndPlaceId(member, placeId);

        return memos.stream()
            .map(memo -> new MemoResponse(
                memo.getMember().getUserId(),
                memo.getMemoText(),
                memo.getPlaceName(),
                memo.getCreatedAt()))
            .collect(Collectors.toList());
    }

    
    
    
    
    
}
