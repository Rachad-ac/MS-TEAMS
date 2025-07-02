package com.webgram.stage.repository;

import com.webgram.stage.entity.EmployeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository Spring Data JPA pour l'entité Employe.
 * Permet d'effectuer les opérations CRUD sur la table employe.
 */
@Repository
public interface EmployeRepository extends JpaRepository<EmployeEntity, Integer> {
    // Ajoutez ici des méthodes de requête personnalisées si besoin
} 