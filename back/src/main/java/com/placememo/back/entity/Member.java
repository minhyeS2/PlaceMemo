package com.placememo.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "members")
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long pk;
	
	// null값 저장 안됨, 값 중복 안됨
	@Column(nullable = false, unique = true)
	private String userId;
	
	@Column(nullable = false)
	private String nickname;
	
	@Column(nullable = false)
	private String password;

	
}
