package com.webgram.stage.repository;

import com.webgram.stage.entity.InscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository Spring Data JPA pour l'entité Inscription.
 * Permet d'effectuer les opérations CRUD sur la table inscription.
 */
@Repository
public interface InscriptionRepository extends JpaRepository<InscriptionEntity, Integer> {
    // Ajoutez ici des méthodes de requête personnalisées si besoin
} 