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

public enum TypeContrat {
    CDD("Contrat à Durée Déterminée"),
    CDI("Contrat à Durée Indéterminée"),
    STAGE("Stage");


    @Getter
    @Setter
    private String description;

    TypeContrat(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static TypeContrat fromValue(Object typeContrat) {
        if (typeContrat instanceof Map) {
            Map<String, Object> mapTypeContrat = (Map<String, Object>) typeContrat;
            if (mapTypeContrat.containsKey("name")) {
                return TypeContrat.valueOf(mapTypeContrat.get("name").toString());
            }
        }
        if (typeContrat instanceof String) {
            return TypeContrat.valueOf(typeContrat.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", TypeContrat.class, typeContrat, values()));
    }

    @JsonValue
    Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<TypeContrat> getAllTypeContrat() {
        return stream(values())
                .collect(Collectors.toSet());
    }
}
