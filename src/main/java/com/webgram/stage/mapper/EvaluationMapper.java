package com.webgram.stage.mapper;

import com.webgram.stage.entity.EvaluationEntity;
import com.webgram.stage.model.EvaluationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface EvaluationMapper extends EntityMapper<EvaluationDTO , EvaluationEntity>{

}
