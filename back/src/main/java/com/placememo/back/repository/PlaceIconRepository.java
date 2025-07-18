package com.placememo.back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placememo.back.entity.Member;
import com.placememo.back.entity.PlaceIcon;

@Repository
public interface PlaceIconRepository extends JpaRepository<PlaceIcon, Long> {

	//?
	Optional<PlaceIcon> findByPlaceIdAndMember(String placeId, Member member);
	
	// 회원의 전체 마커 조회
	List<PlaceIcon> findAllByMember(Member member);
	
}
