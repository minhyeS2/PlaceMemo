package com.placememo.back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaceIconResponse {
	
	private Long pk;
    private String userId;
	private String placeId;
	private String iconUrl;
	private Double placeLat;
	private Double placeLng;
	private String placeName;
	private String placeAddress;
	private String placeStatus;
	
	
}
