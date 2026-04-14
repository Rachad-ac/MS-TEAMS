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

public enum PresenceType {
    PRESENT("Present"),
    ABSENT("Absent");


    @Getter
    @Setter
    private String description;

    PresenceType(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static PresenceType fromValue(Object presenceType) {
        if (presenceType instanceof Map<?,?>) {
            Map<String, Object> mapPresenceType = (Map<String, Object>) presenceType;
            if (mapPresenceType.containsKey("name")) {
                return PresenceType.valueOf(mapPresenceType.get("name").toString());
            }
        }
        if (presenceType instanceof String) {
            return PresenceType.valueOf(presenceType.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", SexType.class, presenceType, values()));
    }

    @JsonValue
    Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<PresenceType> getAllPresence() {
        return stream(values())
                .collect(Collectors.toSet());
    }
}
