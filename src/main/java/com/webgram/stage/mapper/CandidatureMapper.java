package com.webgram.stage.mapper;

import com.webgram.stage.entity.CandidatureEntity;
import com.webgram.stage.model.CandidatureDTO;
import org.mapstruct.*;
import org.mapstruct.ReportingPolicy;

/**
 * Mapper MapStruct pour convertir entre Candidature et CandidatureDTO.
 * Gère la conversion des relations (recrutement, candidat) en ids et inversement.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CandidatureMapper extends EntityMapper<CandidatureDTO, CandidatureEntity> {

    @Mapping(target = "recrutementId", source = "recrutement.id")
    @Mapping(target = "titreRecrutement", source = "recrutement.titre")
    @Mapping(target = "candidatId", source = "candidat.id")
    @Mapping(target = "nomCandidat", source = "candidat.nom")
    @Mapping(target = "statut", source = "statut")
    CandidatureDTO asDto(CandidatureEntity entity);

    @Mapping(target = "candidat", source = "candidatId", qualifiedByName = "candidatFromId")
    @Mapping(target = "statut", source = "statut")
    CandidatureEntity asEntity(CandidatureDTO dto);

    @Named("recrutementFromId")
    default com.webgram.stage.entity.RecrutementEntity recrutementFromId(Long id) {
        if (id == null) return null;
        com.webgram.stage.entity.RecrutementEntity r = new com.webgram.stage.entity.RecrutementEntity();
        r.setId(id);
        return r;
    }

    @Named("candidatFromId")
    default com.webgram.stage.entity.CandidatEntity candidatFromId(Long id) {
        if (id == null) return null;
        com.webgram.stage.entity.CandidatEntity c = new com.webgram.stage.entity.CandidatEntity();
        c.setId(id);
        return c;
    }
}