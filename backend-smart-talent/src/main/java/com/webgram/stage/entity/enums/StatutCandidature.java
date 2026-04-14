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

/**
 * Enumération des statuts possibles pour une candidature.
 */
public enum StatutCandidature {
    EN_ATTENTE("En attente"), // La candidature est en attente de traitement
    ACCEPTEE("Acceptée"),   // La candidature a été acceptée
    REJETEE("Rejetée");

    @Getter
    @Setter
    private String description;

    StatutCandidature(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static StatutCandidature fromValue(Object statutCandidature) {
        if (statutCandidature instanceof Map<?,?>) {
            Map<String, Object> mapStatutCandidature = (Map<String, Object>) statutCandidature;
            if (mapStatutCandidature.containsKey("name")) {
                return StatutCandidature.valueOf(mapStatutCandidature.get("name").toString());
            }
        }
        if (statutCandidature instanceof String) {
            return StatutCandidature.valueOf(statutCandidature.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", StatutCandidature.class, statutCandidature, values()));
    }

    @JsonValue
    Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<StatutCandidature> getAllSexe() {
        return stream(values())
                .collect(Collectors.toSet());
    }
} 