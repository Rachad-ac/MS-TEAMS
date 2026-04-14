package com.webgram.stage.mapper;

import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.model.CompetenceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = DomaineMapper.class)
public interface CompetenceMapper extends EntityMapper<CompetenceDTO, CompetenceEntity> {
    @Override
    @Mapping(source = "domaineId", target = "domaine.id")
    CompetenceEntity asEntity(CompetenceDTO dto);

    @Override
    @Mapping(source = "domaine.id", target = "domaineId")
    CompetenceDTO asDto(CompetenceEntity entity);
}

