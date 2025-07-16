package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.DomaineEntity;
import com.webgram.stage.entity.QDomaineEntity;
import com.webgram.stage.mapper.DomaineMapper;
import com.webgram.stage.model.DomaineDTO;
import com.webgram.stage.repository.DomaineRepository;
import com.webgram.stage.repository.RecrutementRepository;
import com.webgram.stage.services.DomaineService;
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
public class DomaineServiceImpl implements DomaineService {
    private final DomaineRepository domaineRepository;
    private final DomaineMapper domaineMapper;
    private final RecrutementRepository recrutementRepository;

    @Override
    public DomaineDTO createDomaine(DomaineDTO domaineDTO) {
        var entity = domaineMapper.asEntity(domaineDTO);
        var entitySave = domaineRepository.save(entity);
        return domaineMapper.asDto(entitySave);
    }

    @Override
    public DomaineDTO updateDomaine(DomaineDTO domaineDTO) {
        DomaineEntity existing = domaineRepository.findById(domaineDTO.getId())
                .orElseThrow(() -> new RuntimeException("Domaine introuvable avec l'ID : " + domaineDTO.getId()));

        // Mettre à jour les champs simples
        existing.setNom(domaineDTO.getNom());
        existing.setDescription(domaineDTO.getDescription());
        DomaineEntity updatedEntity = domaineRepository.save(existing);
        return domaineMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteDomaine(Long id) {
        if (!domaineRepository.existsById(id)) {
            throw new RuntimeException("Domaine not found");
        }
        domaineRepository.deleteById(id);
    }

    @Override
    public DomaineDTO getDomaine(Long id) {
        var entity = domaineRepository.findById(id);
        return domaineMapper.asDto(entity.get());
    }

    @Override
    public Page<DomaineDTO> getAllDomaines(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return domaineRepository.findAll(booleanBuilder, pageable)
                .map(domaineMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QDomaineEntity.domaineEntity;
            if (searchParams.containsKey("nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));
        }

    }
}

