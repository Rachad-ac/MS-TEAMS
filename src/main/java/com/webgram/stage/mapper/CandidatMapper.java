package com.webgram.stage.mapper;
import com.webgram.stage.entity.CandidatEntity;
import com.webgram.stage.model.CandidatDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface CandidatMapper extends EntityMapper<CandidatDTO, CandidatEntity> {
    @Override
    @Mapping(source = "recrutementId", target = "recrutement.id")
    CandidatEntity asEntity(CandidatDTO dto);

    @Override
    @Mapping(source = "recrutement.id", target = "recrutementId")
    CandidatDTO asDto(CandidatEntity entity);
}
