package com.example.backend.common.configure;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

public class CloudinaryConfig {
    @Value("${spring.cloudinary.url}")
    public static String cloudinary_url;
    private static Cloudinary cloudinary;
    public static Cloudinary getInstance() {
        if(cloudinary == null) {
            cloudinary = new Cloudinary(cloudinary_url);
            cloudinary.config.secure = true;
        }
        return cloudinary;
    }

    public static Map options(String name) {
        return ObjectUtils.asMap(
                "use_filename", true,
                "filename_override", name,
                "unique_filename", false,
                "overwrite", true);
    }
}
