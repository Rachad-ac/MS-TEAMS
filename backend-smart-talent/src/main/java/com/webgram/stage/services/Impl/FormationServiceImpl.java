package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QFormationEntity;
import com.webgram.stage.entity.FormationEntity;
import com.webgram.stage.mapper.FormationMapper;
import com.webgram.stage.model.FormationDTO;
import com.webgram.stage.repository.FormationRepository;
import com.webgram.stage.services.FormationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class FormationServiceImpl implements FormationService {
    private final FormationRepository formationRepository;
    private final FormationMapper formationMapper;

    @Override
    public FormationDTO createFormation(FormationDTO formationDTO) {
        var entity = formationMapper.asEntity(formationDTO);
        var entitySave = formationRepository.save(entity);
        return formationMapper.asDto(entitySave);
    }

    @Override
    public FormationDTO updateFormation(FormationDTO formationDTO) {

        FormationEntity existing = formationRepository.findById(formationDTO.getId())
                .orElseThrow(() -> new RuntimeException("Formation introuvable avec l'ID : " + formationDTO.getId()));

        // Mettre à jour les champs simples
        existing.setTitre(formationDTO.getTitre());
        existing.setDescription(formationDTO.getDescription());
        existing.setObjectif(formationDTO.getObjectif());
        existing.setDateDebut(formationDTO.getDateDebut());
        existing.setDateFin(formationDTO.getDateFin());
        existing.setNiveau(formationDTO.getNiveau());
        existing.setStatut(formationDTO.getStatut());

        // Sauvegarder la mise à jour
        FormationEntity updatedEntity = formationRepository.save(existing);
        return formationMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteFormation(Long id) {
        if (!formationRepository.existsById(id)) {
            throw new RuntimeException("Formation not found");
        }
        formationRepository.deleteById(id);
    }

    @Override
    public FormationDTO getFormation(Long id) {
        var entity = formationRepository.findById(id);
        return formationMapper.asDto(entity.get());
    }

    @Override
    public Page<FormationDTO> getAllFormations(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return formationRepository.findAll(booleanBuilder, pageable)
                .map(formationMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QFormationEntity.formationEntity;
            if (searchParams.containsKey("titre"))
                booleanBuilder.and(qEntity.titre.containsIgnoreCase(searchParams.get("titre")));

            if (searchParams.containsKey("objectif"))
                booleanBuilder.and(qEntity.objectif.containsIgnoreCase(searchParams.get("objectif")));

            String niveau = searchParams.get("niveau");
            if (niveau != null && !niveau.isEmpty()) {
                booleanBuilder.and(qEntity.niveau.stringValue().lower().containsIgnoreCase(niveau.toLowerCase()));
            }

            String statut = searchParams.get("statut");
            if (statut != null && !statut.isEmpty()) {
                booleanBuilder.and(qEntity.statut.stringValue().lower().containsIgnoreCase(statut.toLowerCase()));
            }

            if (searchParams.containsKey("dateDebut") || searchParams.containsKey("dateFin")) {
                if (searchParams.containsKey("dateDebut")) {
                    try {
                        LocalDate dateDebut = LocalDate.parse(searchParams.get("dateDebut"));
                        booleanBuilder.and(qEntity.dateDebut.eq(dateDebut));
                    } catch (DateTimeParseException e) {
                        throw new RuntimeException("Format invalide pour la date de début : " + searchParams.get("dateDebut"), e);
                    }
                }

                if (searchParams.containsKey("dateFin")) {
                    try {
                        LocalDate dateFin = LocalDate.parse(searchParams.get("dateFin"));
                        booleanBuilder.and(qEntity.dateFin.eq(dateFin));
                    } catch (DateTimeParseException e) {
                        throw new RuntimeException("Format invalide pour la date de fin : " + searchParams.get("dateFin"), e);
                    }
                }
            }
        }
    }
}
