package com.rohit.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rohit.expensetracker.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Category findByName(String name);
}
