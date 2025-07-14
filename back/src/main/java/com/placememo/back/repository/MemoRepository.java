package com.placememo.back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placememo.back.entity.Member;
import com.placememo.back.entity.Memo;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long>{
	// 회원의 전체 메모 조회
	List<Memo> findAllByMember(Member member);
	
	// 특정 장소에 대한 메모 조회
	List<Memo> findByMemberAndPlaceId(Member member, String placeId);
	
	// 회원의 특정 메모 삭제
	Optional<Memo> findByMemberAndPk(Member member, Long pk);
	
}
