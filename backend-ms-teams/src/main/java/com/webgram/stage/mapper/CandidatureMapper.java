package com.webgram.stage.mapper;

import com.webgram.stage.entity.CandidatureEntity;
import com.webgram.stage.model.CandidatureDTO;
import org.mapstruct.*;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

/**
 * Mapper MapStruct pour convertir entre Candidature et CandidatureDTO.
 * Gère la conversion des relations (recrutement, candidat) en ids et inversement.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {RecrutementMapper.class})
public interface CandidatureMapper extends EntityMapper<CandidatureDTO, CandidatureEntity> {

    @Mapping(target = "recrutement", source = "recrutement")
    @Mapping(target = "recrutementId", source = "recrutement.id")
    @Mapping(target = "candidatId", source = "candidat.id")
    CandidatureDTO asDto(CandidatureEntity entity);

    @Mapping(target = "candidat.id", source = "candidatId")
    @Mapping(target = "recrutement.id", source = "recrutementId")
    CandidatureEntity asEntity(CandidatureDTO dto);

    // @Named("recrutementFromId")
    // default com.webgram.stage.entity.RecrutementEntity recrutementFromId(Long id) {
    //     if (id == null) return null;
    //     com.webgram.stage.entity.RecrutementEntity r = new com.webgram.stage.entity.RecrutementEntity();
    //     r.setId(id);
    //     return r;
    // }

    // @Named("candidatFromId")
    // default com.webgram.stage.entity.CandidatEntity candidatFromId(Long id) {
    //     if (id == null) return null;
    //     com.webgram.stage.entity.CandidatEntity c = new com.webgram.stage.entity.CandidatEntity();
    //     c.setId(id);
    //     return c;
    // }
}