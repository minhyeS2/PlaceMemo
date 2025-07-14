package com.placememo.back.service;

import jakarta.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.SignUpRequest;
import com.placememo.back.entity.Member;
import com.placememo.back.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	
	// 회원가입
	public String signUp(SignUpRequest request) {
		
		if (memberRepository.existsByUserId(request.getUserId())) {
			return "存在しているIDです。";
		}
		
		Member member = new Member();
		member.setUserId(request.getUserId());
		member.setNickname(request.getNickname());
		
		// BCryptPasswordEncoder 암호화 처리
		String encodedPassword = passwordEncoder.encode(request.getPassword());
		member.setPassword(encodedPassword);
		
		// 생성 후 레포에 저장해서 DB저장
		memberRepository.save(member);
		
		return "会員登録成功！";
		
	}

	// get요청으로 아이디 중복 검사 -> 조회
	public boolean isUsernameDuplicated(String userId) {
		return memberRepository.existsByUserId(userId);
	}
	

	
	
	

	
}
