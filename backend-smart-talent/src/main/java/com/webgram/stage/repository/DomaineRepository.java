package com.webgram.stage.repository;

import com.webgram.stage.entity.DomaineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DomaineRepository extends JpaRepository<DomaineEntity, Long> , QuerydslPredicateExecutor<DomaineEntity> {

}
