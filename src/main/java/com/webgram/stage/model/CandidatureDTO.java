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

    // Objet du candidat ayant postulé
    private CandidatDTO candidat;
    // Identifiants simples pour l'affichage et l'édition
    private Long candidatId;



    // Titre du recrutement
    private RecrutementDTO recrutement;
    // Identifiant du recrutement associé à la candidature
     private Long recrutementId;

}