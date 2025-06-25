package com.webgram.stage.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webgram.stage.entity.enums.TypeContrat;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class RecrutementDTO implements Serializable {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotEmpty
    private String titre;

    private String description;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDate dateLimite;

    private String lieu;

    @NotEmpty
    private TypeContrat typeContrat;

    private Double salaire;

    private String domaine;

    private Boolean publier;
}
