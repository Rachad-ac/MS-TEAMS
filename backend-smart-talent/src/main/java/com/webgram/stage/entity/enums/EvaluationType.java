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

public enum EvaluationType {

    TEST("TEST"),
    ENTRETIEN("ENTRETIEN"),
    AUTRE("AUTRE");

    @Getter
    @Setter
    private String description;

    EvaluationType(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static EvaluationType fromValue(Object value) {
        if (value instanceof Map map && map.containsKey("name")) {
            return EvaluationType.valueOf(map.get("name").toString());
        }
        if (value instanceof String) {
            return EvaluationType.valueOf(value.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", EvaluationType.class, value, values()));
    }

    @JsonValue
    public Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<EvaluationType> getAllTypes() {
        return stream(values()).collect(Collectors.toSet());
    }
}
