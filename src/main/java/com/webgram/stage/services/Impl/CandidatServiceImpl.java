package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QCandidatEntity;
import com.webgram.stage.mapper.CandidatMapper;
import com.webgram.stage.model.CandidatDTO;
import com.webgram.stage.repository.CandidatRepository;
import com.webgram.stage.repository.CompetenceRepository;
import com.webgram.stage.repository.NiveauEtudeRepository;
import com.webgram.stage.services.CandidatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class CandidatServiceImpl implements CandidatService {

    private final CandidatRepository candidatRepository;
    private final CandidatMapper candidatMapper;
    private final CompetenceRepository competenceRepository;
    private final NiveauEtudeRepository niveauEtudeRepository;

    @Override
    public CandidatDTO createCandidat(CandidatDTO candidatDTO) {
        var entity = candidatMapper.asEntity(candidatDTO);

        // Gestion du niveau d'étude
        /*if (candidatDTO.getNiveauEtude() != null && candidatDTO.getNiveauEtude().getId() != null) {
            var niveau = niveauEtudeRepository.findById(candidatDTO.getNiveauEtude().getId())
                    .orElseThrow(() -> new RuntimeException("Niveau d'étude introuvable"));
            entity.setNiveauEtude(niveau);
        }*/

        // Gestion des compétences
        if (candidatDTO.getIdCompetence() != null && !candidatDTO.getIdCompetence().isEmpty()) {
            var competences = competenceRepository.findAllById(candidatDTO.getIdCompetence());
            entity.setCompetence(Set.copyOf(competences));
        }

        var entitySave = candidatRepository.save(entity);
        return candidatMapper.asDto(entitySave);
    }

    @Override
    public CandidatDTO updateCandidat(CandidatDTO candidatDTO) {
        var entityUpdate = candidatMapper.asEntity(candidatDTO);

        // Gestion du niveau d'étude
        if (candidatDTO.getNiveauEtude() != null && candidatDTO.getNiveauEtude().getId() != null) {
            var niveau = niveauEtudeRepository.findById(candidatDTO.getNiveauEtude().getId())
                    .orElseThrow(() -> new RuntimeException("Niveau d'étude introuvable"));
            entityUpdate.setNiveauEtude(niveau);
        }

        // Gestion des compétences
        if (candidatDTO.getIdCompetence() != null && !candidatDTO.getIdCompetence().isEmpty()) {
            var competences = competenceRepository.findAllById(candidatDTO.getIdCompetence());
            entityUpdate.setCompetence(Set.copyOf(competences));
        } else {
            entityUpdate.setCompetence(Set.of());
        }

        var updatedEntity = candidatRepository.save(entityUpdate);
        return candidatMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteCandidat(Long id) {
        if (!candidatRepository.existsById(id)) {
            throw new RuntimeException("Candidat not found");
        }
        candidatRepository.deleteById(id);
    }

    @Override
    public CandidatDTO getCandidat(Long id) {
        var entity = candidatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidat introuvable"));
        return candidatMapper.asDto(entity);
    }

    @Override
    public Page<CandidatDTO> getAllCandidat(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return candidatRepository.findAll(booleanBuilder, pageable)
                .map(candidatMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder builder) {
        if (searchParams == null || searchParams.isEmpty()) return;

        var qEntity = QCandidatEntity.candidatEntity;

        if (searchParams.containsKey("nom")) {
            builder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));
        }

        if (searchParams.containsKey("prenom")) {
            builder.and(qEntity.prenom.containsIgnoreCase(searchParams.get("prenom")));
        }

        if (searchParams.containsKey("email")) {
            builder.and(qEntity.email.containsIgnoreCase(searchParams.get("email")));
        }

        if (searchParams.containsKey("telephone")) {
            builder.and(qEntity.telephone.containsIgnoreCase(searchParams.get("telephone")));
        }

        if (searchParams.containsKey("adresse")) {
            builder.and(qEntity.adresse.containsIgnoreCase(searchParams.get("adresse")));
        }

        String niveauEtude = searchParams.get("niveauEtude");
        if (niveauEtude != null && !niveauEtude.isEmpty()) {
            builder.and(qEntity.niveauEtude.nom.toLowerCase().contains(niveauEtude.toLowerCase()));
        }

        if (searchParams.containsKey("dateNaissance")) {
            var dateStr = searchParams.get("dateNaissance");
            if (dateStr != null && !dateStr.isBlank()) {
                try {
                    LocalDate date = LocalDate.parse(dateStr);
                    builder.and(qEntity.dateNaissance.eq(date));
                } catch (DateTimeParseException e) {
                    throw new IllegalArgumentException("Format de date invalide pour 'dateNaissance'. Format attendu : yyyy-MM-dd");
                }
            }
        }

        if (searchParams.containsKey("statutCandidature")) {
            builder.and(qEntity.statutCandidature.stringValue().lower().containsIgnoreCase(searchParams.get("statutCandidature")));
        }

        if (searchParams.containsKey("recrutementId")) {
            builder.and(qEntity.recrutement.id.eq(Long.valueOf(searchParams.get("recrutementId"))));
        }
    }
}
