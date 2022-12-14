//package com.example.backend.common.configure;
//
//import com.example.backend.common.utils.JwtTokenUtil;
//import com.example.backend.exception.ResourceInvalidException;
//import com.example.backend.service.UserService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import io.jsonwebtoken.ExpiredJwtException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;
//
//@Component
//@Slf4j
//public class JwtRequestFilter extends OncePerRequestFilter {
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//    @Autowired
//    private UserService accountService;
//
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        if(isRestrict(request)) {
//            final String requestTokenHeader = request.getHeader("Authorization");
//            String email;
//            String jwtToken;
//            if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {
//                jwtToken = requestTokenHeader.substring("Bearer ".length());
//                try {
//                    email = jwtTokenUtil.getEmailFromToken(jwtToken);
//                    if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                        UserDetails userDetails = this.accountService.loadUserByUsername(email);
//                        if(jwtTokenUtil.validateToken(jwtToken, email)) {
//                            filterChain.doFilter(request, response);
////                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
////                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////                    // After setting the Authentication in the context, we specify
////                    // that the current user is authenticated. So it passes the
////                    // Spring Security Configurations successfully.
////                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//                        }else getError(response,"invalid token");
//                    }
//                } catch (Exception e) {
//                    response.setHeader("error", e.getMessage());
//                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
////                    Map<String, String> error = new HashMap<>();
////                    error.put("error_massage", e.getMessage());
//                    ResourceInvalidException error = new ResourceInvalidException(e.getMessage());
//                    response.setContentType(APPLICATION_JSON_VALUE);
//                    new ObjectMapper().writeValue(response.getOutputStream(), error);
//                }
////                catch (IllegalArgumentException e) {
////                    System.out.println("Unable to get JWT Token");
////                    // check
////                    getError(response, e.getMessage());
////                } catch (ExpiredJwtException e) {
////                    System.out.println("JWT Token has expired");
////                    // check
////                    getError(response, e.getMessage());
////                }
//            }else {
//                getError(response, "JWT Token does not begin with Bearer String");
//            }
//        }else {
//            filterChain.doFilter(request, response);
//        }
//    }
//
//    private boolean isRestrict(HttpServletRequest request) {
//        return !(request.getServletPath().contains("/guest") || request.getServletPath().contains("/refreshToken") || request.getServletPath().contains("/auth/"));
//    }
//
//    private void getError(HttpServletResponse response, String message) throws IOException {
//    }
//}
