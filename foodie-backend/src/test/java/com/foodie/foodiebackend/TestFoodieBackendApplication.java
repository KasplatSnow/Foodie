package com.foodie.foodiebackend;

import org.springframework.boot.SpringApplication;

public class TestFoodieBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(FoodieBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
