package com.webgram.stage.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.io.Serializable;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class CompetenceDTO implements Serializable {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    @NotEmpty
    private String nom;
    private String niveau;
    private String domaine;
}
