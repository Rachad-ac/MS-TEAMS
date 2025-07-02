package com.webgram.stage.mapper;
import com.webgram.stage.entity.CandidatEntity;
import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.model.CandidatDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface CandidatMapper extends EntityMapper<CandidatDTO, CandidatEntity> {
    @Override
    @Mapping(target = "idCompetence", source = "competence", qualifiedByName = "competencesToIdSet")
    CandidatDTO asDto(CandidatEntity entity);

    @Override
    @Mapping(target = "competence", ignore = true) // Géré manuellement dans le service
    CandidatEntity asEntity(CandidatDTO dto);

    @Named("competencesToIdSet")
    static Set<Long> competencesToIdSet(Set<CompetenceEntity> competences) {
        if (competences == null) {
            return null;
        }
        return competences.stream()
                .map(CompetenceEntity::getId)
                .collect(Collectors.toSet());
    }

}
