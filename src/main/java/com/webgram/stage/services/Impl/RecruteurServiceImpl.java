package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QRecruteurEntity;
import com.webgram.stage.mapper.RecruteurMapper;
import com.webgram.stage.model.RecruteurDTO;
import com.webgram.stage.repository.RecruteurRepository;
import com.webgram.stage.services.RecruteurService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class RecruteurServiceImpl implements RecruteurService {

    private final RecruteurRepository recruteurRepository;
    private final RecruteurMapper recruteurMapper;

    @Override
    public RecruteurDTO createRecruteur(RecruteurDTO recruteurDTO) {
        var entity = recruteurMapper.asEntity(recruteurDTO);
        var entitySave = recruteurRepository.save(entity);
        return recruteurMapper.asDto(entitySave);
    }

    @Override
    public RecruteurDTO updateRecruteur(RecruteurDTO recruteurDTO) {
        var entityUpdate = recruteurMapper.asEntity(recruteurDTO);
        var updatedEntity = recruteurRepository.save(entityUpdate);
        return recruteurMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteRecruteur(Long id) {
        if (!recruteurRepository.existsById(id)) {
            throw new RuntimeException("Evaluation not found");
        }
        recruteurRepository.deleteById(id);
    }

    @Override
    public RecruteurDTO getRecruteur(Long id) {
        var entity = recruteurRepository.findById(id);
        return recruteurMapper.asDto(entity.get());
    }

    @Override
    public Page<RecruteurDTO> getAllRecruteur(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return recruteurRepository.findAll(booleanBuilder, pageable)
                .map(recruteurMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QRecruteurEntity.recruteurEntity;
            if (searchParams.containsKey("nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));
            if (searchParams.containsKey("prenom"))
                booleanBuilder.and(qEntity.prenom.containsIgnoreCase(searchParams.get("prenom")));
            if (searchParams.containsKey("email"))
                booleanBuilder.and(qEntity.email.containsIgnoreCase(searchParams.get("email")));
            if (searchParams.containsKey("telephone"))
                booleanBuilder.and(qEntity.telephone.containsIgnoreCase(searchParams.get("telephone")));
            if (searchParams.containsKey("poste"))
                booleanBuilder.and(qEntity.poste.containsIgnoreCase(searchParams.get("poste")));

            String departement = searchParams.get("departement");
            if (departement != null && !departement.isEmpty()) {
                booleanBuilder.and(qEntity.departement.stringValue().lower().containsIgnoreCase(departement.toLowerCase()));
            }
            String sexe = searchParams.get("sexe");
            if (sexe != null && !sexe.isEmpty()) {
                booleanBuilder.and(qEntity.sexe.stringValue().lower().containsIgnoreCase(sexe.toLowerCase()));
            }
        }
    }
}
