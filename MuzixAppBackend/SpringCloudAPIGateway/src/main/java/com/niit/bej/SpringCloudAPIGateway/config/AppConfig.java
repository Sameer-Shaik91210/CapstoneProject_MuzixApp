package com.niit.bej.SpringCloudAPIGateway.config;


//import org.springframework.cloud.gateway.route.RouteLocator;
//import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
public class AppConfig {



    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/api/v1/**")
                        .uri("lb://user-authentication-service")) // use the name of the application in the uri
//                        .uri("http://customer-authentication-service:8087"))
                .route(p->p
                        .path("/api/v2/**")
                        .uri("lb://user-movie-service"))
//                        .uri("http://customer-product-service:8089"))
                .build();
    }

}


