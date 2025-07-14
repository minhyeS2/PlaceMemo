package com.placememo.back.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.placememo.back.entity.Member;
import com.placememo.back.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Member member = memberRepository.findByUserId(userId)
            .orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません"));

        return org.springframework.security.core.userdetails.User
            .withUsername(member.getUserId())
            .password(member.getPassword())
            .authorities("ROLE_USER")  // 권한 설정
            .build();
    }
}
