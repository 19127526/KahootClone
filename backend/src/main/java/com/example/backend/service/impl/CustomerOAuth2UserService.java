//package com.example.backend.service.impl;
//
//import com.example.backend.common.configuer.CustomerOAuth2User;
//import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
//import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
//import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//@Service
//@Component
//public class CustomerOAuth2UserService extends DefaultOAuth2UserService {
//    @Override
//    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        return new CustomerOAuth2User(super.loadUser(userRequest));
//    }
//}
