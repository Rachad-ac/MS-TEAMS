package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QOffreEmploiEntity;
import com.webgram.stage.mapper.OffreEmploiMapper;
import com.webgram.stage.model.OffreEmploiDTO;
import com.webgram.stage.repository.OffreEmploiRepository;
import com.webgram.stage.services.OffreEmploiService;
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
public class OffreEmploiServiceImpl implements OffreEmploiService {
    private final OffreEmploiRepository offreEmploiRepository;
    private final OffreEmploiMapper offreEmploiMapper;

    @Override
    public OffreEmploiDTO createOffreEmploi(OffreEmploiDTO offreEmploiDTO) {
        var entity = offreEmploiMapper.asEntity(offreEmploiDTO);
        var entitySave = offreEmploiRepository.save(entity);
        return offreEmploiMapper.asDto(entitySave);
    }

    @Override
    public OffreEmploiDTO updateOffreEmploi(OffreEmploiDTO offreEmploiDTO) {
        var entityUpdate = offreEmploiMapper.asEntity(offreEmploiDTO);
        var updatedEntity = offreEmploiRepository.save(entityUpdate);
        return offreEmploiMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteOffreEmploi(Long id) {
        if (!offreEmploiRepository.existsById(id)) {
            throw new RuntimeException("OffreEmploi not found");
        }
        offreEmploiRepository.deleteById(id);
    }

    @Override
    public OffreEmploiDTO getOffreEmploi(Long id) {
        var entity = offreEmploiRepository.findById(id);
        return offreEmploiMapper.asDto(entity.get());
    }

    @Override
    public Page<OffreEmploiDTO> getAllOffreEmplois(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return offreEmploiRepository.findAll(booleanBuilder, pageable)
                .map(offreEmploiMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QOffreEmploiEntity.offreEmploiEntity;
            if (searchParams.containsKey("titre"))
                booleanBuilder.and(qEntity.titre.containsIgnoreCase(searchParams.get("titre")));

            if (searchParams.containsKey("datePublication")) {
                LocalDate date = null;
                try {
                    date = LocalDate.parse(searchParams.get("datePublication"));
                } catch (DateTimeParseException e) {
                    throw new RuntimeException(e);
                }

                booleanBuilder.and(qEntity.datePublication.eq(date));
            }
        }
    }

}
