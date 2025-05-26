package com.conectarsalud.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("*")

                .exposedHeaders("Authorization") // Asegúrate de exponer este header
                .allowCredentials(true);
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // Habilitar conversión de JSON
        converters.add(new MappingJackson2HttpMessageConverter());
        // Habilitar conversión de bytes[] para las imágenes
        converters.add(new ByteArrayHttpMessageConverter());
    }
}
