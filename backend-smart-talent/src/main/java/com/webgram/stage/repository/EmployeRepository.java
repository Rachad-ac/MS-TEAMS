package com.webgram.stage.repository;

import com.webgram.stage.entity.EmployeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface EmployeRepository extends JpaRepository <EmployeEntity, Long> , QuerydslPredicateExecutor<EmployeEntity> {
}
