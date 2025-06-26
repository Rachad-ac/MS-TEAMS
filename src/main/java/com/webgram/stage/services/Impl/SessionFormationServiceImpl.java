package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QSessionFormationEntity;
import com.webgram.stage.mapper.SessionFormationMapper;
import com.webgram.stage.model.SessionFormationDTO;
import com.webgram.stage.repository.SessionFormationRepository;
import com.webgram.stage.services.SessionFormationService;
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
public class SessionFormationServiceImpl implements SessionFormationService {
    private final SessionFormationRepository sessionFormationRepository;
    private final SessionFormationMapper sessionFormationMapper;

    @Override
    public SessionFormationDTO createSessionFormation(SessionFormationDTO sessionFormationDTO) {
        var entity = sessionFormationMapper.asEntity(sessionFormationDTO);
        var entitySave = sessionFormationRepository.save(entity);
        return sessionFormationMapper.asDto(entitySave);
    }

    @Override
    public SessionFormationDTO updateSessionFormation(SessionFormationDTO sessionFormationDTO) {
        var entityUpdate = sessionFormationMapper.asEntity(sessionFormationDTO);
        var updatedEntity = sessionFormationRepository.save(entityUpdate);
        return sessionFormationMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteSessionFormation(Long id) {
        if (!sessionFormationRepository.existsById(id)) {
            throw new RuntimeException("SessionFormation not found");
        }
        sessionFormationRepository.deleteById(id);
    }

    @Override
    public SessionFormationDTO getSessionFormation(Long id) {
        var entity = sessionFormationRepository.findById(id);
        return sessionFormationMapper.asDto(entity.get());
    }

    @Override
    public Page<SessionFormationDTO> getAllSessionFormations(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return sessionFormationRepository.findAll(booleanBuilder, pageable)
                .map(sessionFormationMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QSessionFormationEntity.sessionFormationEntity;
            if (searchParams.containsKey("lieu"))
                booleanBuilder.and(qEntity.lieu.containsIgnoreCase(searchParams.get("lieu")));

            if (searchParams.containsKey("dateDebut")) {
                LocalDate date = null;
                try {
                    date = LocalDate.parse(searchParams.get("dateDebut"));
                } catch (DateTimeParseException e) {
                    throw new RuntimeException(e);
                }

                booleanBuilder.and(qEntity.dateDebut.eq(date));
            }

            if (searchParams.containsKey("dateFin")) {
                LocalDate date = null;
                try {
                    date = LocalDate.parse(searchParams.get("dateFin"));
                } catch (DateTimeParseException e) {
                    throw new RuntimeException(e);
                }

                booleanBuilder.and(qEntity.dateFin.eq(date));
            }
        }
    }
}
