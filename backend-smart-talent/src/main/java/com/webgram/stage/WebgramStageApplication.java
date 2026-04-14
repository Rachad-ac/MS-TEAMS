package com.webgram.stage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"com.webgram.stage"})
@EnableScheduling
public class WebgramStageApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebgramStageApplication.class, args);
	}

}
