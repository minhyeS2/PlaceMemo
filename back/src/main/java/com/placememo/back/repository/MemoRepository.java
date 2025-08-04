package com.placememo.back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.placememo.back.entity.Member;
import com.placememo.back.entity.Memo;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long>{
	// 회원의 전체 메모 조회
	List<Memo> findAllByMember(Member member);
	
	// 특정 장소에 대한 메모 조회, 디테일페이지에서 메모 불러오기 위한
	List<Memo> findByMemberAndPlaceId(Member member, String placeId);
	
	// 회원의 특정 메모 삭제
	Optional<Memo> findByMemberAndPk(Member member, Long pk);
	
	// 특정 마커별 필터링
	List<Memo> findByMemberAndIconUrl(Member member, String iconUrl);
	
	// 특정 태그별 필터링
	@Query("""
		    SELECT m FROM Memo m
		    JOIN m.tags t
		    WHERE m.member = :member AND t IN :tags
		    GROUP BY m
		    HAVING COUNT(DISTINCT t) = :tagCount
		""")
	List<Memo> findByAllTags(
		    @Param("member") Member member,
		    @Param("tags") List<String> tags,
		    @Param("tagCount") long tagCount
		);
	
	
	
}
