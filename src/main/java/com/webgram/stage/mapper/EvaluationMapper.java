package com.webgram.stage.mapper;

import com.webgram.stage.entity.EvaluationEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.RecrutementDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring" ,
       uses = { RecruteurMapper.class , RecrutementMapper.class , CandidatureMapper.class , CandidatMapper.class} )
public interface EvaluationMapper extends EntityMapper<EvaluationDTO , EvaluationEntity>{

    @Override
    @Mapping(source = "recrutementId", target = "recrutement.id")
    @Mapping(source = "candidatId", target = "candidat.id")
    @Mapping(source = "candidatureId", target = "candidature.statut")
    @Mapping(source = "recruteurId", target = "recruteur.id")
    EvaluationEntity asEntity(EvaluationDTO dto);

    @Override
    @Mapping(source = "recrutement.id", target = "recrutementId")
    @Mapping(source = "candidat.id", target = "candidatId")
    @Mapping(source = "candidature.statut", target = "candidatureId")
    @Mapping(source = "recruteur.id", target = "recruteurId")
    EvaluationDTO asDto(EvaluationEntity entity);


}
