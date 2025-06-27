package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QEvaluationEntity;
import com.webgram.stage.mapper.EvaluationMapper;
import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.repository.EvaluationRepository;
import com.webgram.stage.services.EvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final EvaluationMapper evaluationMapper;

    @Override
    public EvaluationDTO createEvaluation(EvaluationDTO offreEmploiDTO) {
        var entity = evaluationMapper.asEntity(offreEmploiDTO);
        var entitySave = evaluationRepository.save(entity);
        return evaluationMapper.asDto(entitySave);
    }

    @Override
    public EvaluationDTO updateEvaluation(EvaluationDTO offreEmploiDTO) {
        var entityUpdate = evaluationMapper.asEntity(offreEmploiDTO);
        var updatedEntity = evaluationRepository.save(entityUpdate);
        return evaluationMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteEvaluation(Long id) {
        if (!evaluationRepository.existsById(id)) {
            throw new RuntimeException("Evaluation not found");
        }
        evaluationRepository.deleteById(id);
    }

    @Override
    public EvaluationDTO getEvaluation(Long id) {
        var entity = evaluationRepository.findById(id);
        return evaluationMapper.asDto(entity.get());
    }

    @Override
    public Page<EvaluationDTO> getAllEvaluation(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return evaluationRepository.findAll(booleanBuilder, pageable)
                .map(evaluationMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QEvaluationEntity.evaluationEntity;

            if (searchParams.containsKey("recruteur"))
                booleanBuilder.and(qEntity.recruteur.containsIgnoreCase(searchParams.get("recruteur")));
            if (searchParams.containsKey("commentaire"))
                booleanBuilder.and(qEntity.commentaire.containsIgnoreCase(searchParams.get("commentaire")));

            if (searchParams.containsKey("score")) {
                try {
                    double montant = Double.parseDouble(searchParams.get("score"));
                    booleanBuilder.and(qEntity.score.eq(montant));
                } catch (NumberFormatException e) {
                    throw new RuntimeException("Le score doit être un nombre valide", e);
                }
            }
            if (searchParams.containsKey("noteGenerale")) {
                try {
                    double montant = Double.parseDouble(searchParams.get("noteGenerale"));
                    booleanBuilder.and(qEntity.noteGenerale.eq(montant));
                } catch (NumberFormatException e) {
                    throw new RuntimeException("La note generale net doit être un nombre valide", e);
                }
            }

            String type = searchParams.get("type");
            if (type != null && !type.isEmpty()) {
                booleanBuilder.and(qEntity.type.stringValue().lower().containsIgnoreCase(type.toLowerCase()));
            }
            String statut = searchParams.get("statut");
            if (statut != null && !statut.isEmpty()) {
                booleanBuilder.and(qEntity.statut.stringValue().lower().containsIgnoreCase(statut.toLowerCase()));
            }

            if (searchParams.containsKey("dateEvaluation")) {
                LocalDateTime date = null;
                try {
                    LocalDate localDate = LocalDate.parse(searchParams.get("dateEvaluation"), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    date = localDate.atStartOfDay();
                } catch (DateTimeParseException e) {
                    throw new RuntimeException("Format de date invalide. Attendu : yyyy-MM-dd", e);
                }
                booleanBuilder.and(qEntity.dateEvaluation.eq(date));
            }
        }
    }
}
