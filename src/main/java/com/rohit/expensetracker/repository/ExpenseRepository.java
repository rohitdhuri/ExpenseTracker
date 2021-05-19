package com.rohit.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rohit.expensetracker.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	
}
