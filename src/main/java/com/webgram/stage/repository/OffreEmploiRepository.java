package com.webgram.stage.repository;

import com.webgram.stage.entity.OffreEmploiEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreEmploiRepository extends JpaRepository<OffreEmploiEntity, Long> , QuerydslPredicateExecutor<OffreEmploiEntity> {

}
