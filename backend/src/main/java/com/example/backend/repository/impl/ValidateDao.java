package com.example.backend.repository.impl;

import com.example.backend.common.utils.CodeGeneratorUtils;
import com.example.backend.exception.ResourceInvalidException;
import com.example.backend.model.entity.ValidateCache;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ValidateDao {
    public static final String HASH_KEY = "OTP";
    private RedisTemplate template;

    public ValidateCache save(boolean isRegister, String email) {
        ValidateCache validateCache = new ValidateCache(CodeGeneratorUtils.invoke(),isRegister);
        template.opsForHash().put(HASH_KEY, email, validateCache);
        return validateCache;
    }

    public ValidateCache findValidate(String email) {
        return (ValidateCache) template.opsForHash().get(HASH_KEY,email);
    }

    public Boolean deleteValidate(String email) {
        try {
            template.opsForHash().delete(HASH_KEY,email);
            return true;
        } catch (Exception e) {
            throw new ResourceInvalidException(e.getMessage());
        }
    }
}
