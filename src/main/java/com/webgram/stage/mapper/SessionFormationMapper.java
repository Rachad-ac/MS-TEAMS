package com.webgram.stage.mapper;

import com.webgram.stage.entity.SessionFormationEntity;
import com.webgram.stage.model.SessionFormationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface SessionFormationMapper extends EntityMapper<SessionFormationDTO, SessionFormationEntity> {
}
