package com.webgram.stage.model;

import java.time.LocalDateTime;

public class CandidatureDTO {
    private Long idCandidature;
    private LocalDateTime dateCandidature;
    private String statut;
    private Long posteId;
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