package com.webgram.stage.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webgram.stage.entity.enums.StatutCandidature;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO pour l'entité CandidatureEntity.
 * Utilisé pour transférer les données entre le backend et le frontend.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CandidatureDTO implements Serializable {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    // Date et heure de la candidature
    private LocalDateTime dateCandidature;

    // Statut de la candidature (EN_ATTENTE, ACCEPTEE, REJETEE)
    @NotNull
    private StatutCandidature statut;

    // Identifiant du recrutement associé à la candidature
    private Long recrutementId;

    // Identifiant du candidat ayant postulé
    private Long candidatId;

    // Getters et setters
    public Long getId() { return id; }
    public void setIdCandidature(Long id) { this.id = id; }
    public LocalDateTime getDateCandidature() { return dateCandidature; }
    public void setDateCandidature(LocalDateTime dateCandidature) { this.dateCandidature = dateCandidature; }
    public StatutCandidature getStatut() { return statut; }
    public void setStatut(StatutCandidature statut) { this.statut = statut; }
    public Long getRecrutementId() { return recrutementId; }
    public void setRecrutementId(Long recrutementId) { this.recrutementId = recrutementId; }
    public Long getCandidatId() { return candidatId; }
    public void setCandidatId(Long candidatId) { this.candidatId = candidatId; }
} 