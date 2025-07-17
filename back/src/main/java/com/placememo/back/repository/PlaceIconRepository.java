package com.placememo.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.placememo.back.entity.Member;
import com.placememo.back.entity.PlaceIcon;

@Repository
public interface PlaceIconRepository extends JpaRepository<PlaceIcon, Long> {

	
	Optional<PlaceIcon> findByPlaceIdAndMember(String placeId, Member member);
	
}
