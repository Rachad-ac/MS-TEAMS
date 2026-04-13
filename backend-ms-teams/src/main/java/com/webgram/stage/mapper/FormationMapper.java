package com.webgram.stage.mapper;

import com.webgram.stage.entity.FormationEntity;
import com.webgram.stage.model.FormationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface FormationMapper extends EntityMapper<FormationDTO, FormationEntity> {
}
