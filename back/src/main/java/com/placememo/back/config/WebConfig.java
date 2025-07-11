package com.placememo.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 api 경로에 대해
				.allowedOrigins("http://localhost:5173")
				.allowedMethods("*")
				.allowedHeaders("*")
				.allowCredentials(true);

	}
	
}
