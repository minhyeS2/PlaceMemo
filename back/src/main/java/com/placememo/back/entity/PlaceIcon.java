package com.placememo.back.entity;

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
	 	
	    private String placeId;

	    private String iconUrl;
	    
		private Double placeLat;
		
		private Double placeLng;

	
}
