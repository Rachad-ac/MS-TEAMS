package com.webgram.stage.repository;
import com.webgram.stage.entity.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TestRepository extends JpaRepository<TestEntity, Long> , QuerydslPredicateExecutor<TestEntity> {
}
