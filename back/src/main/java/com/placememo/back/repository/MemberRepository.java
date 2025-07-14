package com.placememo.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placememo.back.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository <Member, Long> {
	// userId 중복 체크용 메서드
	boolean existsByUserId(String userId);
	// 회원 조회용 메서드
	Optional<Member> findByUserId(String userId);
	
}
