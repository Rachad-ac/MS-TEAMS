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

public enum NiveauCompetence {
    DEBUTANT("Debutant"),
    INTERMEDIARE("Intermediare"),
    EXPERT("Expert");


    @Getter
    @Setter
    private String description;

    NiveauCompetence(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static NiveauCompetence fromValue(Object niveauCompetence) {
        if (niveauCompetence instanceof Map) {
            Map<String, Object> mapNiveauCompetence = (Map<String, Object>) niveauCompetence;
            if (mapNiveauCompetence.containsKey("name")) {
                return NiveauCompetence.valueOf(mapNiveauCompetence.get("name").toString());
            }
        }
        if (niveauCompetence instanceof String) {
            return NiveauCompetence.valueOf(niveauCompetence.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", NiveauCompetence.class, niveauCompetence, values()));
    }

    @JsonValue
    Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<NiveauCompetence> getAllSexe() {
        return stream(values())
                .collect(Collectors.toSet());
    }
}
