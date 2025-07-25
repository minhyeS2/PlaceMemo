package com.placememo.back.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.placememo.back.dto.MemoRequest;
import com.placememo.back.dto.MemoResponse;
import com.placememo.back.service.MemoService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@RestController
public class MemoC {

    private final MemoService memoService;

    @PostMapping("/creatememo")
    public ResponseEntity<Map<String, String>> createMemo(@RequestBody MemoRequest request) {
        // 현재 로그인된 사용자의 userId 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();  // Jwt에서 setSubject(userId) 했기 때문에

        return memoService.createMemo(request, userId);
        		
    }
    
    @GetMapping("/memos")
    public List<MemoResponse> getMemos() {
    	// 현재 로그인된 사용자의 userId 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();  // Jwt에서 setSubject(userId) 했기 때문에
    	
    	
    	return memoService.getAllMemos(userId);
    }
    
    @DeleteMapping("/memo-d/{pk}")
    public ResponseEntity<Map<String, String>> deleteMemo(@PathVariable Long pk) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        return memoService.deleteMemo(userId, pk);
    }
    
    @PutMapping("memo-u/{pk}")
    public ResponseEntity<Map<String, String>> updateMemo(@PathVariable Long pk, @RequestBody MemoRequest request) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
       
        
        return memoService.updateMemo(request, userId, pk);
    }
    
    
    
    
    
}
