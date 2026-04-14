package com.webgram.stage.repository;

import com.webgram.stage.entity.FormateurEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FormateurRepository extends JpaRepository<FormateurEntity, Long> , QuerydslPredicateExecutor<FormateurEntity> {

}
