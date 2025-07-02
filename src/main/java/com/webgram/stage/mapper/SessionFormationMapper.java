package com.webgram.stage.mapper;

import com.webgram.stage.entity.SessionFormationEntity;
import com.webgram.stage.model.SessionFormationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring", uses = {FormationMapper.class})
public interface SessionFormationMapper extends EntityMapper<SessionFormationDTO, SessionFormationEntity> {
    @Override
    @Mapping(source = "idFormation", target = "formation.id")
    SessionFormationEntity asEntity(SessionFormationDTO dto);

    @Override
    @Mapping(source = "formation.id", target = "idFormation")
    SessionFormationDTO asDto(SessionFormationEntity entity);
}
