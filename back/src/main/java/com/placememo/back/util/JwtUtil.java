package com.placememo.back.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    
	// encrypt
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    // 토큰 유효 시간 (1시간)
    private final long expirationMs = 1000 * 60 * 60; 
    
    //사용자의 userId을 바탕으로 JWT 토큰을 생성
    public String generateToken(String userId, String nickname) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("nickname", nickname)
                .setIssuedAt(new Date()) // 최초 로그인 할때부터
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                // 이 시간까지 쓸 수 있게 설정함
                .signWith(key) // 암호화 
                .compact(); // 서버
    }
    
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            System.out.println("Invalid JWT: " + e.getMessage());
            return false;
        }
    }
    
    
    
    
}
