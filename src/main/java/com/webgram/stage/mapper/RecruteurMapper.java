package com.webgram.stage.mapper;

import com.webgram.stage.entity.EvaluationEntity;
import com.webgram.stage.entity.RecruteurEntity;
import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.RecruteurDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface RecruteurMapper extends EntityMapper<RecruteurDTO , RecruteurEntity>{

}
