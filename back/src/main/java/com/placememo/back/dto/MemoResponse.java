package com.placememo.back.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemoResponse {
	
    private String userId;
    private String memoText;
    private String placeName;
    private LocalDateTime createdAt;
    
}
