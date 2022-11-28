package com.example.backend.common.configuer;

import com.example.backend.common.utils.JwtTokenUtil;
import com.example.backend.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private AccountService accountService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        filterChain.doFilter(request, response);
//        if(request.getServletPath().contains("/refreshToken") || request.getServletPath().contains("/anonymous") || request.getServletPath().contains("/login")) {
//
//        }else {
//            final String requestTokenHeader = request.getHeader("Authorization");
//            String email;
//            String jwtToken;
//            if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {
//                jwtToken = requestTokenHeader.substring("Bearer".length());
//                try {
//                    email = jwtTokenUtil.getEmailFromToken(jwtToken);
//                    if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                        UserDetails userDetails = this.accountService.loadUserByUsername(email);
//                        if(jwtTokenUtil.validateToken(jwtToken, userDetails)) {
//                            filterChain.doFilter(request, response);
////                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
////                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////                    // After setting the Authentication in the context, we specify
////                    // that the current user is authenticated. So it passes the
////                    // Spring Security Configurations successfully.
////                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//                        }else getError(response,"invalid token");
//                    }
//                } catch (IllegalArgumentException e) {
//                    System.out.println("Unable to get JWT Token");
//                    // check
//                    getError(response, e.getMessage());
//                } catch (ExpiredJwtException e) {
//                    System.out.println("JWT Token has expired");
//                    // check
//                    getError(response, e.getMessage());
//                }
//            }else {
//                getError(response, "JWT Token does not begin with Bearer String");
//            }
//        }
    }

    private void getError(HttpServletResponse response, String message) throws IOException {
        response.setHeader("error", message);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        Map<String, String> error = new HashMap<>();
        error.put("error_massage", message);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }
}
