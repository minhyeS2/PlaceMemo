package com.placememo.back.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemoResponse {
	
	private Long pk;
    private String userId;
    private String memoText;
    private String iconUrl;
    private String placeName;
	private Double placeLat;
	private Double placeLng;
	private String placeAddress;
	private String placeStatus;
    private LocalDateTime createdAt;
    
}
