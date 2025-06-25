package com.webgram.stage.mapper;

import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.model.RecrutementDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface RecrutementMapper extends EntityMapper<RecrutementDTO, RecrutementEntity> {
}
