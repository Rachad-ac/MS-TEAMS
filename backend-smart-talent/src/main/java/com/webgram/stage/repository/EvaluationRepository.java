package com.webgram.stage.repository;

import com.webgram.stage.entity.EvaluationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends JpaRepository<EvaluationEntity , Long> , QuerydslPredicateExecutor<EvaluationEntity> {
}
