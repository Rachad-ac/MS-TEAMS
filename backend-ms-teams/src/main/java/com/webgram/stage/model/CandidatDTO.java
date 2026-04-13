package com.webgram.stage.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webgram.stage.entity.enums.StatutCandidature;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CandidatDTO implements Serializable  {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    @NotEmpty
    private String nom;
    private String prenom;
    private String email;
    private String telephone ;
    private LocalDate dateNaissance;
    private String adresse ;
    private NiveauEtudeDTO niveauEtude;
    private Set<CompetenceDTO> competence;
    private StatutCandidature statutCandidature;
    private RecrutementDTO recrutement;

    private Long niveauEtudeId;
    private Long recrutementId;
    private Set<Long> idCompetence;

}
