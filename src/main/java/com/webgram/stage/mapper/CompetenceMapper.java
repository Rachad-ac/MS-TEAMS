package com.webgram.stage.mapper;

import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.model.CompetenceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface CompetenceMapper extends EntityMapper<CompetenceDTO, CompetenceEntity> {

}

