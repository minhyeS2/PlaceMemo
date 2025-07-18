package com.placememo.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceIconRequest {
	
		private String placeId;
		private String iconUrl;
		private Double placeLat;
		private Double placeLng;
		private String placeName;
		private String placeAddress;
		private String placeStatus;



}
