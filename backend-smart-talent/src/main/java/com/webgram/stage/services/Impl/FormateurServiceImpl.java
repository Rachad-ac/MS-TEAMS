package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QFormateurEntity;
import com.webgram.stage.mapper.FormateurMapper;
import com.webgram.stage.model.FormateurDTO;
import com.webgram.stage.repository.FormateurRepository;
import com.webgram.stage.services.FormateurService;
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
public class FormateurServiceImpl implements FormateurService {
    private final FormateurRepository formateurRepository;
    private final FormateurMapper formateurMapper;

    @Override
    public FormateurDTO createFormateur(FormateurDTO formateurDTO) {
        var entity = formateurMapper.asEntity(formateurDTO);
        var entitySave = formateurRepository.save(entity);
        return formateurMapper.asDto(entitySave);
    }

    @Override
    public FormateurDTO updateFormateur(FormateurDTO formateurDTO) {
        var entityUpdate = formateurMapper.asEntity(formateurDTO);
        var updatedEntity = formateurRepository.save(entityUpdate);
        return formateurMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteFormateur(Long id) {
        if (!formateurRepository.existsById(id)) {
            throw new RuntimeException("Formateur not found");
        }
        formateurRepository.deleteById(id);
    }

    @Override
    public FormateurDTO getFormateur(Long id) {
        var entity = formateurRepository.findById(id);
        return formateurMapper.asDto(entity.get());
    }

    @Override
    public Page<FormateurDTO> getAllFormateurs(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return formateurRepository.findAll(booleanBuilder, pageable)
                .map(formateurMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QFormateurEntity.formateurEntity;
            if (searchParams.containsKey("Nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("Nom")));

            if (searchParams.containsKey("Type")) {
                booleanBuilder.and(qEntity.type.stringValue().lower().containsIgnoreCase(searchParams.get("Type")));
            }
        }
    }
}


