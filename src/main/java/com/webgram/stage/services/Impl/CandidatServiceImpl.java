package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QCandidatEntity;
import com.webgram.stage.mapper.CandidatMapper;
import com.webgram.stage.model.CandidatDTO;
import com.webgram.stage.repository.CandidatRepository;
import com.webgram.stage.services.CandidatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;


@Service
@Transactional
@RequiredArgsConstructor
public class CandidatServiceImpl implements CandidatService {
    private final CandidatRepository candidatRepository;
    private final CandidatMapper candidatMapper;




@Override
    public CandidatDTO createCandidat (CandidatDTO candidatDTO) {
        var entity = candidatMapper.asEntity( candidatDTO);
        var entitySave = candidatRepository.save(entity);
        return candidatMapper.asDto(entitySave);
    }

    @Override
    public CandidatDTO updateCandidat (CandidatDTO candidatDTO) {
        var entityUpdate = candidatMapper.asEntity(candidatDTO);
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
        var entity = candidatRepository.findById(id);
        return candidatMapper.asDto(entity.get());
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

        if (searchParams.containsKey("niveauEtude")) {
            builder.and(qEntity.niveauEtude.containsIgnoreCase(searchParams.get("niveauEtude")));
        }

        if (searchParams.containsKey("statutCandidature")) {
            builder.and(qEntity.statutCandidature.stringValue().lower().containsIgnoreCase(searchParams.get("statutCandidature")));
        }

        if (searchParams.containsKey("recrutementId"))
            builder.and(qEntity.recrutement.id.eq(Long.valueOf(searchParams.get("recrutementId"))));

//        if (searchParams.containsKey("dateNaissance")) {
//            try {
//                LocalDate date = LocalDate.parse(searchParams.get("dateNaissance"));
//                builder.and(qEntity.dateNaissance.eq(date));
//            } catch (DateTimeParseException e) {
//                throw new IllegalArgumentException("Format de date invalide pour 'dateNaissance'. Format attendu : yyyy-MM-dd");
//            }
//        }
    }

}
