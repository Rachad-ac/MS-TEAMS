package com.webgram.stage.repository;


import com.webgram.stage.entity.ModuleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<ModuleEntity, Long>, QuerydslPredicateExecutor<ModuleEntity> {
    // Page<ModuleEntity> findByFormationIdOrderByOrdreAsc(Long formationId, Pageable pageable);

    //List<ModuleEntity> findByFormationIdOrderByOrdreAsc(Long formationId);
}
