package com.webgram.stage.repository;
import com.webgram.stage.entity.NiveauEtudeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NiveauEtudeRepository extends JpaRepository<NiveauEtudeEntity, Long> , QuerydslPredicateExecutor<NiveauEtudeEntity> {
}
