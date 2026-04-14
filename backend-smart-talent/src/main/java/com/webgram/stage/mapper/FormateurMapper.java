package com.webgram.stage.mapper;

import com.webgram.stage.entity.FormateurEntity;
import com.webgram.stage.model.FormateurDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface FormateurMapper extends EntityMapper<FormateurDTO, FormateurEntity> {
}
