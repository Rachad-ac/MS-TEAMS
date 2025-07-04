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
public enum NiveauEtude {

    AUCUN("Aucun niveau scolaire"),
    PRIMAIRE("Primaire"),
    CEP("Certificat d'Études Primaires (CEP)"),
    BEPC("Brevet d'Études du Premier Cycle (BEPC)"),
    SECONDAIRE("Secondaire"),
    BAC("Baccalauréat"),
    BAC_PLUS_1("BAC +1"),
    BAC_PLUS_2("BAC +2 (BTS, DUT...)"),
    LICENCE("Licence (BAC +3)"),
    LICENCE_PRO("Licence Professionnelle"),
    MAITRISE("Maîtrise (BAC +4)"),
    MASTER_1("Master 1 (BAC +4)"),
    MASTER_2("Master 2 (BAC +5)"),
    MASTER_PRO("Master Professionnel"),
    DOCTORAT("Doctorat (BAC +8)"),
    POST_DOCTORAT("Post-doctorat"),
    FORMATION_PROFESSIONNELLE("Formation Professionnelle"),
    AUTRE("Autre (à préciser)");

    @Getter
    @Setter
    private String description;

    NiveauEtude(String description) {
        this.description = description;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static NiveauEtude fromValue(Object niveauEtude) {
        if (niveauEtude instanceof Map<?, ?> mapNiveauEtude) {
            if (mapNiveauEtude.containsKey("name")) {
                return NiveauEtude.valueOf(mapNiveauEtude.get("name").toString());
            }
        }
        if (niveauEtude instanceof String) {
            return NiveauEtude.valueOf(niveauEtude.toString());
        }
        throw new IllegalArgumentException(MessageFormat.format("{0} not found with the value: {1} in [{2}]", NiveauEtude.class, niveauEtude, values()));
    }

    @JsonValue
    public Map<String, Object> getModule() {
        return Map.of(
                "name", name(),
                "description", description
        );
    }

    public static Set<NiveauEtude> getAllNiveaux() {
        return stream(values())
                .collect(Collectors.toSet());
    }
}
