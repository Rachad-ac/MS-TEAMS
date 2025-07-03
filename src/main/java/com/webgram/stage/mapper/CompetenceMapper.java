package com.webgram.stage.mapper;

import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.model.CompetenceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface CompetenceMapper extends EntityMapper<CompetenceDTO, CompetenceEntity> {

    @Override
    @Mapping(target="idRecrutements",source = "recrutements", qualifiedByName = "recrutementsToIdSet")
    CompetenceDTO asDto(CompetenceEntity entity);


    @Override
    @Mapping(target= "recrutements", ignore = true)
    CompetenceEntity asEntity(CompetenceDTO dto);

    @Named("recrutementsToIdSet")
    static Set<Long> recrutementsToIdSet(Set<RecrutementEntity> recrutements) {
        if (recrutements == null) {
            return null ;
        }
        return recrutements.stream()
                .map(RecrutementEntity::getId)
                .collect(Collectors.toSet());
    }
}

