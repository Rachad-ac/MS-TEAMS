package com.webgram.stage.repository;

import com.webgram.stage.entity.RecruteurEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface RecruteurRepository extends JpaRepository <RecruteurEntity , Long> , QuerydslPredicateExecutor<RecruteurEntity> {
}
