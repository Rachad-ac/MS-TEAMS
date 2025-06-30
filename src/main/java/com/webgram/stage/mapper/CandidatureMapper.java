package com.webgram.stage.mapper;

import com.webgram.stage.entity.Candidature;
import com.webgram.stage.model.CandidatureDTO;
import org.mapstruct.*;
import org.mapstruct.ReportingPolicy;

/**
 * Mapper MapStruct pour convertir entre Candidature et CandidatureDTO.
 * Gère la conversion des relations (recrutement, candidat) en ids et inversement.
 */
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CandidatureMapper extends EntityMapper<CandidatureDTO, Candidature> {

    @Mapping(target = "recrutementId", source = "recrutement.id")
    @Mapping(target = "titreRecrutement", source = "recrutement.titre")
    // @Mapping(target = "candidatId", source = "candidat.id") // TODO: à réactiver quand CandidatEntity existera
    @Mapping(target = "statut", source = "statut")
    CandidatureDTO asDto(Candidature entity);

    @Mapping(target = "recrutement", source = "recrutementId", qualifiedByName = "recrutementFromId")
    // @Mapping(target = "candidat", source = "candidatId", qualifiedByName = "candidatFromId") // TODO: à réactiver quand CandidatEntity existera
    @Mapping(target = "statut", source = "statut")
    Candidature asEntity(CandidatureDTO dto);

    // Méthode utilitaire pour mapper un id vers un objet RecrutementEntity
    @Named("recrutementFromId")
    default com.webgram.stage.entity.RecrutementEntity recrutementFromId(Long id) {
        if (id == null) return null;
        com.webgram.stage.entity.RecrutementEntity r = new com.webgram.stage.entity.RecrutementEntity();
        r.setId(id);
        return r;
    }

    // TODO: Décommenter quand CandidatEntity sera créée
    // @Named("candidatFromId")
    // default com.webgram.stage.entity.CandidatEntity candidatFromId(Long id) {
    //     if (id == null) return null;
    //     com.webgram.stage.entity.CandidatEntity c = new com.webgram.stage.entity.CandidatEntity();
    //     c.setId(id);
    //     return c;
    // }
}