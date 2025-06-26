package com.webgram.stage.mapper;

import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.model.RecrutementDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = CompetenceMapper.class)
public interface RecrutementMapper extends EntityMapper<RecrutementDTO, RecrutementEntity> {
    @Override
    @Mapping(target = "idCompetences", source = "competences", qualifiedByName = "competencesToIdSet")
    RecrutementDTO asDto(RecrutementEntity entity);

    @Override
    @Mapping(target = "competences", ignore = true)
    RecrutementEntity asEntity(RecrutementDTO dto);

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
