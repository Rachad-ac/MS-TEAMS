package com.webgram.stage.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.Setter;

import java.text.MessageFormat;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

public enum
StatutFormation {
    PLANIFIEE("Planifiée"),
    EN_COURS("En cours"),
    TERMINEE("Terminée");


    @Getter
    @Setter
    private String description;

    StatutFormation(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static StatutFormation fromValue(Object statutFormation) {
        if (statutFormation instanceof Map) {
            Map<String, Object> mapStatutFormation = (Map<String, Object>) statutFormation;
            if (mapStatutFormation.containsKey("name")) {
                return StatutFormation.valueOf(mapStatutFormation.get("name").toString());
            }
        }
        if (statutFormation instanceof String) {
            return StatutFormation.valueOf(statutFormation.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", StatutFormation.class, statutFormation, values()));
    }

    @JsonValue
    Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<StatutFormation> getAllStatutFormation() {
        return stream(values())
                .collect(Collectors.toSet());
    }
}
