package com.webgram.stage.repository;

import com.webgram.stage.entity.SessionFormationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionFormationRepository extends JpaRepository<SessionFormationEntity, Long> , QuerydslPredicateExecutor<SessionFormationEntity> {

}
