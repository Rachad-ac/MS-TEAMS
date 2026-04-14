package com.webgram.stage.repository;

import com.webgram.stage.entity.PresenceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PresenceRepository extends JpaRepository<PresenceEntity , Long> , QuerydslPredicateExecutor<PresenceEntity> {
}
