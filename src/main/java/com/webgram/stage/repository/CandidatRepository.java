package com.webgram.stage.repository;
import com.webgram.stage.entity.CandidatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface  CandidatRepository  extends JpaRepository<CandidatEntity, Long> , QuerydslPredicateExecutor<CandidatEntity> {
}
