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

public enum StatutType {

    PREVUE("Prévue"),
    EN_COURS("En cours"),
    TERMINEE("Terminée"),
    ANNULEE("Annulée");

    @Getter
    @Setter
    private String description;

    StatutType(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static StatutType fromValue(Object value) {
        if (value instanceof Map map && map.containsKey("name")) {
            return StatutType.valueOf(map.get("name").toString());
        }
        if (value instanceof String) {
            return StatutType.valueOf(value.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", StatutType.class, value, values()));
    }

    @JsonValue
    public Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<StatutType> getAllStatuts() {
        return stream(values()).collect(Collectors.toSet());
    }
}
