package com.placememo.back.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaceIconResponse {
	
	private Long pk;
    private String userId;
    private String memoText;
    private List<String> tags;
    private String iconUrl;
    private String placeName;
    private String placeId;
	private Double placeLat;
	private Double placeLng;
	private String placeAddress;
	private String placeStatus;
    private LocalDateTime createdAt;
    

}
