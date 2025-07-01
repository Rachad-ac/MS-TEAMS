package com.webgram.stage.services.Impl;

import com.webgram.stage.entity.CandidatureEntity;
import com.webgram.stage.mapper.CandidatureMapper;
import com.webgram.stage.repository.CandidatureRepository;
import com.webgram.stage.services.CandidatureService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QCandidatureEntity;
import lombok.RequiredArgsConstructor;
import com.webgram.stage.model.CandidatureDTO;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.entity.enums.StatutCandidature;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CandidatureServiceImpl implements CandidatureService {
    private final CandidatureRepository candidatureRepository;
    private final CandidatureMapper candidatureMapper;

    @Override
    public CandidatureDTO save(CandidatureDTO candidatureDTO) {
        CandidatureEntity entity = candidatureMapper.asEntity(candidatureDTO);
        return candidatureMapper.asDto(candidatureRepository.save(entity));
    }

    @Override
    public CandidatureDTO update(Long id, CandidatureDTO candidatureDTO) {
        Optional<CandidatureEntity> optional = candidatureRepository.findById(id);
        if (optional.isPresent()) {
            CandidatureEntity entity = optional.get();
            entity.setDateCandidature(candidatureDTO.getDateCandidature());
            entity.setStatut(candidatureDTO.getStatut());
            if (entity.getRecrutement() == null) {
                entity.setRecrutement(new RecrutementEntity());
            }
            entity.getRecrutement().setId(candidatureDTO.getRecrutementId());
            entity.setCandidatId(candidatureDTO.getCandidatId());
            return candidatureMapper.asDto(candidatureRepository.save(entity));
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        candidatureRepository.deleteById(id);
    }

    @Override
    public CandidatureDTO getById(Long id) {
        return candidatureRepository.findById(id).map(candidatureMapper::asDto).orElse(null);
    }

    @Override
    public List<CandidatureDTO> getAll() {
        return candidatureRepository.findAll().stream().map(candidatureMapper::asDto).collect(Collectors.toList());
    }

    @Override
    public Page<CandidatureDTO> getAllCandidatures(Map<String, String> searchParams, Pageable pageable) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (searchParams != null) {
            QCandidatureEntity qCandidatureEntity = QCandidatureEntity.candidatureEntity;
            if (searchParams.containsKey("statut"))
                booleanBuilder.and(qCandidatureEntity.statut.eq(StatutCandidature.valueOf(searchParams.get("statut"))));
            if (searchParams.containsKey("recrutementId"))
                booleanBuilder.and(qCandidatureEntity.recrutement.id.eq(Long.valueOf(searchParams.get("recrutementId"))));
            if (searchParams.containsKey("candidatId"))
                booleanBuilder.and(qCandidatureEntity.candidatId.eq(Long.valueOf(searchParams.get("candidatId"))));
            // Ajoute d'autres filtres si besoin
        }
        return candidatureRepository.findAll(booleanBuilder, pageable).map(candidatureMapper::asDto);
    }
} 