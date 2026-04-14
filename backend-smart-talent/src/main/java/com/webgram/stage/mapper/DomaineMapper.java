package com.webgram.stage.mapper;

import com.webgram.stage.entity.DomaineEntity;
import com.webgram.stage.model.DomaineDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface DomaineMapper extends EntityMapper<DomaineDTO, DomaineEntity>{

}
