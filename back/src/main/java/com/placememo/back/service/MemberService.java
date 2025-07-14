package com.placememo.back.service;

import java.util.Map;

import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.placememo.back.dto.LoginRequest;
import com.placememo.back.dto.SignUpRequest;
import com.placememo.back.entity.Member;
import com.placememo.back.repository.MemberRepository;
import com.placememo.back.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class MemberService {
	
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	
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
	

	// 로그인
		public ResponseEntity<Map<String, Object>> login(LoginRequest request) {
		    Member member = memberRepository.findByUserId(request.getUserId());

		    // 유저 존재 여부 + 비밀번호 일치 여부 확인
		    if (member == null || !passwordEncoder.matches(request.getPassword(), member.getPassword())) {
		        return ResponseEntity
		        		.badRequest()
		        		.body(Map.of("message", "IDまたはパスワードが間違っています。"));
		    }

		    // JWT 생성, 토큰을 반환.
		    String token = jwtUtil.generateToken(member.getUserId());
		    
		   
		    return ResponseEntity.ok(Map.of(
		    		"message", "Login成功！",
		    		"token", token
		    		));
		}
	
	
	

	
}
