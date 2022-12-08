package com.example.backend.common.configure;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://kahoot-clone-zwc3-git-mainv2-19127526.vercel.app/")
                .allowedMethods("GET","POST","PUT","DELETE","HEAD","OPTION")
                .allowCredentials(true);
    }
}
