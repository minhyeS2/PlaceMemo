package com.placememo.back.service;

import java.util.Map;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.MemoRequest;
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
        memo.setMemoText(request.getMemoText());
        memo.setPlaceId(request.getPlaceId());
        memo.setMember(member);  // 올바르게 Member 주입

        memoRepository.save(memo);

        return ResponseEntity.ok(Map.of(
        		"message", "メモを作成しました！"));
    }
}
