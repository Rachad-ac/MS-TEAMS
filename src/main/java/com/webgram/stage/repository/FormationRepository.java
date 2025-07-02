package com.webgram.stage.repository;

import com.webgram.stage.entity.FormationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FormationRepository extends JpaRepository<FormationEntity, Long> , QuerydslPredicateExecutor<FormationEntity> {

}
