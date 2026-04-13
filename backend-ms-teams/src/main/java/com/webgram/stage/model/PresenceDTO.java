package com.webgram.stage.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webgram.stage.entity.enums.PresenceType;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.io.Serializable;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PresenceDTO implements Serializable {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @NotEmpty
    private PresenceType statutPresence;
    private String justification;


    private EmployeDTO employe;
    private SessionFormationDTO sessionFormation;

    private Long employeId;
    private Long sessionFormationId;

}
