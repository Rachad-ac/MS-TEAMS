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
 * DTO pour l'entité Candidature.
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
    private Long idCandidature;

    // Date et heure de la candidature
    private LocalDateTime dateCandidature;

    // Statut de la candidature (EN_ATTENTE, ACCEPTEE, REJETEE)
    @NotNull
    private StatutCandidature statut;

    // Identifiant du recrutement associé à la candidature
    private Long recrutementId;

    // Objet du candidat ayant postulé
    private CandidatDTO candidat;

    // Identifiants simples pour l'affichage et l'édition
    private Long candidatId;

    // Nom du candidat
    private String nomCandidat;

    // Titre du recrutement
    private String titreRecrutement;

    // Getters et setters
    public Long getIdCandidature() { return idCandidature; }
    public void setIdCandidature(Long idCandidature) { this.idCandidature = idCandidature; }
    public LocalDateTime getDateCandidature() { return dateCandidature; }
    public void setDateCandidature(LocalDateTime dateCandidature) { this.dateCandidature = dateCandidature; }
    public StatutCandidature getStatut() { return statut; }
    public void setStatut(StatutCandidature statut) { this.statut = statut; }
    public Long getRecrutementId() { return recrutementId; }
    public void setRecrutementId(Long recrutementId) { this.recrutementId = recrutementId; }
    public CandidatDTO getCandidat() { return candidat; }
    public void setCandidat(CandidatDTO candidat) { this.candidat = candidat; }
    public Long getCandidatId() { return candidatId; }
    public void setCandidatId(Long candidatId) { this.candidatId = candidatId; }
    public String getNomCandidat() { return nomCandidat; }
    public void setNomCandidat(String nomCandidat) { this.nomCandidat = nomCandidat; }
    public String getTitreRecrutement() { return titreRecrutement; }
    public void setTitreRecrutement(String titreRecrutement) { this.titreRecrutement = titreRecrutement; }
} 