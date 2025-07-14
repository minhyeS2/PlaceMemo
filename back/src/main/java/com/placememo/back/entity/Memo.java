package com.placememo.back.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "memos")
public class Memo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pk;
	
	// Member 엔티티를 참조하는 다대일 관계 설정
	// 'member_id'라는 외래키 컬럼이 memos 테이블에 생성됨
	// Member 테이블의 기본키(pk)와 자동으로 매핑
	@ManyToOne
	@JoinColumn(nullable = false, name = "member_id")
	private Member member;
	
	@Column(nullable = true, length = 1000)
	private String memoText;
	
	@Column(nullable = false)
	private String placeId;
	
	@Column(nullable = false)
	private String placeName;
	
	@CreationTimestamp
	private LocalDateTime createdAt;
	
	
	
	

}
