package com.webgram.stage.mapper;

import com.webgram.stage.entity.Candidature;
import com.webgram.stage.model.CandidatureDTO;

public class CandidatureMapper {
    public static CandidatureDTO toDTO(Candidature entity) {
        if (entity == null) return null;
        CandidatureDTO dto = new CandidatureDTO();
        dto.setIdCandidature(entity.getIdCandidature());
        dto.setDateCandidature(entity.getDateCandidature());
        dto.setStatut(entity.getStatut());
        dto.setPosteId(entity.getPosteId());
        dto.setCandidatId(entity.getCandidatId());
        return dto;
    }

    public static Candidature toEntity(CandidatureDTO dto) {
        if (dto == null) return null;
        Candidature entity = new Candidature();
        entity.setIdCandidature(dto.getIdCandidature());
        entity.setDateCandidature(dto.getDateCandidature());
        entity.setStatut(dto.getStatut());
        entity.setPosteId(dto.getPosteId());
        entity.setCandidatId(dto.getCandidatId());
        return entity;
    }
} 