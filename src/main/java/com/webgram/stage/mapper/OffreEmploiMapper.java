package com.webgram.stage.mapper;

import com.webgram.stage.entity.OffreEmploiEntity;
import com.webgram.stage.model.OffreEmploiDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface OffreEmploiMapper extends EntityMapper<OffreEmploiDTO, OffreEmploiEntity> {
}
