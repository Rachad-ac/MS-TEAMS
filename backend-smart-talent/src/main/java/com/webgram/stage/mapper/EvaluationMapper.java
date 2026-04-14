package com.webgram.stage.mapper;

import com.webgram.stage.entity.EvaluationEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.RecrutementDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring" ,
       uses = { EmployeMapper.class , CandidatMapper.class } )
public interface EvaluationMapper extends EntityMapper<EvaluationDTO , EvaluationEntity>{

    @Override
    @Mapping(source = "candidatId", target = "candidat.id")
    @Mapping(source = "employeId", target = "employe.id")
    EvaluationEntity asEntity(EvaluationDTO dto);

    @Override
    @Mapping(source = "candidat.id", target = "candidatId")
    @Mapping(source = "employe.id", target = "employeId")
    EvaluationDTO asDto(EvaluationEntity entity);

}
