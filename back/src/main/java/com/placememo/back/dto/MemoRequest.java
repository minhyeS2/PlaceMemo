package com.placememo.back.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemoRequest {
	
    @Size(min = 1, max = 1000, message = "メモは1000文字以内で入力してください。")
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
