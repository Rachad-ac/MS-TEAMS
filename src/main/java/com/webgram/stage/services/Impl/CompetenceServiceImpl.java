package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.entity.QCompetenceEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.entity.enums.NiveauCompetence;
import com.webgram.stage.mapper.CompetenceMapper;
import com.webgram.stage.model.CompetenceDTO;
import com.webgram.stage.repository.CompetenceRepository;
import com.webgram.stage.repository.RecrutementRepository;
import com.webgram.stage.services.CompetenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CompetenceServiceImpl implements CompetenceService {
    private final CompetenceRepository competenceRepository;
    private final CompetenceMapper competenceMapper;
    private final RecrutementRepository recrutementRepository;

    @Override
    public CompetenceDTO createCompetence(CompetenceDTO competenceDTO) {
        var entity = competenceMapper.asEntity(competenceDTO);
        var entitySave = competenceRepository.save(entity);
        return competenceMapper.asDto(entitySave);
    }

    @Override
    public CompetenceDTO updateCompetence(CompetenceDTO competenceDTO) {
        CompetenceEntity existing = competenceRepository.findById(competenceDTO.getId())
                .orElseThrow(() -> new RuntimeException("Competence introuvable avec l'ID : " + competenceDTO.getId()));

        // Mettre à jour les champs simples
        existing.setNom(competenceDTO.getNom());
        existing.setNiveau(NiveauCompetence.valueOf(competenceDTO.getNiveau()));
        CompetenceEntity updatedEntity = competenceRepository.save(existing);
        return competenceMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteCompetence(Long id) {
        if (!competenceRepository.existsById(id)) {
            throw new RuntimeException("Competence not found");
        }
        competenceRepository.deleteById(id);
    }

    @Override
    public CompetenceDTO getCompetence(Long id) {
        var entity = competenceRepository.findById(id);
        return competenceMapper.asDto(entity.get());
    }

    @Override
    public Page<CompetenceDTO> getAllCompetences(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return competenceRepository.findAll(booleanBuilder, pageable)
                .map(competenceMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QCompetenceEntity.competenceEntity;
            if (searchParams.containsKey("nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));

            if (searchParams.containsKey("niveau")) {
                booleanBuilder.and(qEntity.niveau.stringValue().lower().containsIgnoreCase(searchParams.get("niveau")));
            }

            if (searchParams.containsKey("domaineId")) {
                booleanBuilder.and(qEntity.domaine.id.eq(Long.valueOf(searchParams.get("domaineId"))));
            }
        }

    }
}

