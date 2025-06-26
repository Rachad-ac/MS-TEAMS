package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.entity.QRecrutementEntity;
import com.webgram.stage.entity.RecrutementEntity;
import com.webgram.stage.mapper.RecrutementMapper;
import com.webgram.stage.model.RecrutementDTO;
import com.webgram.stage.repository.CompetenceRepository;
import com.webgram.stage.repository.RecrutementRepository;
import com.webgram.stage.services.RecrutementService;
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
public class RecrutementServiceImpl implements RecrutementService {
    private final RecrutementRepository recrutementRepository;
    private final RecrutementMapper recrutementMapper;
    private final CompetenceRepository competenceRepository;

    @Override
    public RecrutementDTO createRecrutement(RecrutementDTO recrutementDTO) {
        var entity = recrutementMapper.asEntity(recrutementDTO);

        if (recrutementDTO.getIdCompetences() != null && !recrutementDTO.getIdCompetences().isEmpty()) {
            Set<CompetenceEntity> competences = recrutementDTO.getIdCompetences().stream()
                    .map(id -> competenceRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Competence not found: " + id)))
                    .collect(Collectors.toSet());

            entity.setCompetences(competences);
        }
        
        var entitySave = recrutementRepository.save(entity);
        return recrutementMapper.asDto(entitySave);
    }

    @Override
    public RecrutementDTO updateRecrutement(RecrutementDTO recrutementDTO) {

        RecrutementEntity existing = recrutementRepository.findById(recrutementDTO.getId())
                .orElseThrow(() -> new RuntimeException("Recrutement introuvable avec l'ID : " + recrutementDTO.getId()));

        // Mettre à jour les champs simples
        existing.setTitre(recrutementDTO.getTitre());
        existing.setDescription(recrutementDTO.getDescription());
        existing.setDateLimite(recrutementDTO.getDateLimite());
        existing.setLieu(recrutementDTO.getLieu());
        existing.setTypeContrat(recrutementDTO.getTypeContrat());
        existing.setSalaire(recrutementDTO.getSalaire());
        existing.setDomaine(recrutementDTO.getDomaine());
        existing.setPublier(recrutementDTO.getPublier());

        // Mettre à jour les competences associés à la compétence
        if (recrutementDTO.getIdCompetences() != null) {
            Set<CompetenceEntity> competences = recrutementDTO.getIdCompetences().stream()
                    .map(id -> competenceRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Competence introuvable : " + id)))
                    .collect(Collectors.toSet());

            existing.setCompetences(competences);
        } else {
            // Si la liste est vide, on vide les competences associés
            existing.getCompetences().clear();
        }

        // Sauvegarder la mise à jour
        RecrutementEntity updatedEntity = recrutementRepository.save(existing);
        return recrutementMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteRecrutement(Long id) {
        if (!recrutementRepository.existsById(id)) {
            throw new RuntimeException("Recrutement not found");
        }
        recrutementRepository.deleteById(id);
    }

    @Override
    public RecrutementDTO getRecrutement(Long id) {
        var entity = recrutementRepository.findById(id);
        return recrutementMapper.asDto(entity.get());
    }

    @Override
    public Page<RecrutementDTO> getAllRecrutements(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return recrutementRepository.findAll(booleanBuilder, pageable)
                .map(recrutementMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QRecrutementEntity.recrutementEntity;
            if (searchParams.containsKey("titre"))
                booleanBuilder.and(qEntity.titre.containsIgnoreCase(searchParams.get("titre")));

            if (searchParams.containsKey("lieu"))
                booleanBuilder.and(qEntity.lieu.containsIgnoreCase(searchParams.get("lieu")));

            if (searchParams.containsKey("domaine"))
                booleanBuilder.and(qEntity.domaine.containsIgnoreCase(searchParams.get("domaine")));

            if (searchParams.containsKey("typeContrat"))
                booleanBuilder.and(qEntity.typeContrat.stringValue().lower().containsIgnoreCase(searchParams.get("typeContrat")));

            if (searchParams.containsKey("salaire"))
                booleanBuilder.and(qEntity.salaire.eq(Double.valueOf(searchParams.get("salaire"))));

            if (searchParams.containsKey("publier"))
                booleanBuilder.and(qEntity.publier.eq(Boolean.valueOf(searchParams.get("publier"))));

            if (searchParams.containsKey("datePublication")) {
                LocalDate date = null;
                try {
                    date = LocalDate.parse(searchParams.get("dateLimite"));
                } catch (DateTimeParseException e) {
                    throw new RuntimeException(e);
                }

                booleanBuilder.and(qEntity.dateLimite.eq(date));
            }

            if (searchParams.containsKey("competences"))
                booleanBuilder.and(qEntity.competences.any().nom.containsIgnoreCase(searchParams.get("competences")));
        }
    }
}
