package com.webgram.stage.repository;

import com.webgram.stage.entity.CompetenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetenceRepository extends JpaRepository<CompetenceEntity, Long> , QuerydslPredicateExecutor<CompetenceEntity> {

}
