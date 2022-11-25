//package com.example.backend.common.configuer;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Component;
//
//import java.util.Collection;
//import java.util.Map;
//
//@Component
//@RequiredArgsConstructor
//public class CustomerOAuth2User implements OAuth2User {
//    private final OAuth2User oAuth2User;
//    @Override
//    public Map<String, Object> getAttributes() {
//        return oAuth2User.getAttributes();
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return oAuth2User.getAuthorities();
//    }
//
//    @Override
//    public String getName() {
//        return oAuth2User.getAttribute("name");
//    }
//}
