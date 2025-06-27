package com.webgram.stage.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webgram.stage.entity.enums.EvaluationType;
import com.webgram.stage.entity.enums.StatutType;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class EvaluationDTO implements Serializable {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotEmpty
    private EvaluationType type;
    private double score;
    private double noteGenerale;
    private String commentaire;
    private LocalDateTime dateEvaluation;
    private String recruteur;
    private StatutType statut;

    /*
    private PosteDTO poste;
    private CandidatureDTO candidature;
    private CandidatDTO candidat;

    private Long posteId;
    private Long candidatId;
    private Long candidatureId;
     */
}
