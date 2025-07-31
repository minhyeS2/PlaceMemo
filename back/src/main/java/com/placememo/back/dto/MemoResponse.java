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
        this.pk = memo.getPk();
        this.memoText = memo.getMemoText();
        this.tags = memo.getTags();
        this.iconUrl = memo.getIconUrl();
        this.placeId = memo.getPlaceId();
        this.placeName = memo.getPlaceName();
        this.placeLat = memo.getPlaceLat();
        this.placeLng = memo.getPlaceLng();
        this.placeAddress = memo.getPlaceAddress();
        this.placeStatus = memo.getPlaceStatus();
        this.createdAt = memo.getCreatedAt();
    }
    
    
}
