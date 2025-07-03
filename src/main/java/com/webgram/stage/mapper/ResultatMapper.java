package com.webgram.stage.mapper;

import com.webgram.stage.entity.ResultatEntity;
import com.webgram.stage.model.ResultatDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring" /*,
        uses = { EvaluationMapper.class , EmployeMapper.class}*/ )
public interface ResultatMapper extends EntityMapper<ResultatDTO , ResultatEntity>{

    /*
    @Mapping(source = "evaluationId", target = "evaluation.id")
    @Mapping(source = "employeId", target = "employe.id")
    ResultatEntity asEntity(ResultatDTO dto);

    @Mapping(source = "evaluation.id", target = "evaluationId")
    @Mapping(source = "employe.id", target = "employeId")
    ResultatDTO asDto(ResultatEntity entity);

     */
}
