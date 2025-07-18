package com.placememo.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "icons")
public class PlaceIcon {

	 	@Id
	    @GeneratedValue
	    private Long pk;

	 	@ManyToOne
	 	@JoinColumn(nullable = false, name = "member_id")
	 	private Member member;
	 	
	 	@Column(nullable = false)
	    private String placeId;
	 	
	 	@Column(nullable = false)
	    private String iconUrl;
	    
	 	@Column(nullable = false)
		private Double placeLat;
		
	 	@Column(nullable = false)
		private Double placeLng;
		
	 	@Column(nullable = false)
		private String placeName;
		
	 	@Column(nullable = false)
		private String placeAddress;
		
	 	@Column(nullable = false)
		private String placeStatus;
		

	
}
