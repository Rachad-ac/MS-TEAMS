package com.webgram.stage.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "candidature")
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCandidature;

    private LocalDateTime dateCandidature;

    // Enum: EN_ATTENTE, ACCEPTEE, REJETEE
    private String statut;

    // Relation ManyToOne vers Poste_a_pourvoir (représentée par l'id du poste)
    private Long posteId;

    // Relation ManyToOne vers Candidat (représentée par l'id du candidat)
    private Long candidatId;

    // Getters et setters
    public Long getIdCandidature() { return idCandidature; }
    public void setIdCandidature(Long idCandidature) { this.idCandidature = idCandidature; }
    public LocalDateTime getDateCandidature() { return dateCandidature; }
    public void setDateCandidature(LocalDateTime dateCandidature) { this.dateCandidature = dateCandidature; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public Long getPosteId() { return posteId; }
    public void setPosteId(Long posteId) { this.posteId = posteId; }
    public Long getCandidatId() { return candidatId; }
    public void setCandidatId(Long candidatId) { this.candidatId = candidatId; }
} 