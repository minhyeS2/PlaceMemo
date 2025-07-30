package com.placememo.back.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.placememo.back.entity.Memo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemoResponse {
	
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
    
    public MemoResponse(Memo memo) {
        this.memoText = memo.getMemoText();
        this.iconUrl = memo.getIconUrl();
        this.tags = memo.getTags();
        this.placeId = memo.getPlaceId();
    }
    
}
