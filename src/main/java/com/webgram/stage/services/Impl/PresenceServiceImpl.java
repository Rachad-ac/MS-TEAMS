package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QPresenceEntity;
import com.webgram.stage.mapper.PresenceMapper;
import com.webgram.stage.model.PresenceDTO;
import com.webgram.stage.repository.PresenceRepository;
import com.webgram.stage.services.PresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Objects;

@Transactional
@RequiredArgsConstructor
@Service
public class PresenceServiceImpl implements PresenceService {

    private final PresenceRepository presenceRepository;
    private final PresenceMapper presenceMapper;

    @Override
    public PresenceDTO createPresence(PresenceDTO presenceDTO){
        var entity = presenceMapper.asEntity(presenceDTO);
        var entitySave = presenceRepository.save(entity);
        return presenceMapper.asDto(entitySave);
    }

    @Override
    public PresenceDTO updatePresence(PresenceDTO presenceDTO){
        var entityUpdate = presenceMapper.asEntity(presenceDTO);
        var updatedEntity = presenceRepository.save(entityUpdate);
        return presenceMapper.asDto(updatedEntity);
    }

    @Override
    public void deletePresence(Long id){
        if (!presenceRepository.existsById(id)) {
            throw new RuntimeException("Evaluation not found");
        }
        presenceRepository.deleteById(id);
    }

    @Override
    public PresenceDTO getPresence(Long id){
        var entity = presenceRepository.findById(id);
        return presenceMapper.asDto(entity.get());
    }

    @Override
    public Page<PresenceDTO> getAllPresence(Map<String, String> searchParams, Pageable pageable){
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return presenceRepository.findAll(booleanBuilder, pageable)
                .map(presenceMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QPresenceEntity.presenceEntity;

            String statutPresence = searchParams.get("statutPresence");
            if (statutPresence != null && !statutPresence.isEmpty()) {
                booleanBuilder.and(qEntity.statutPresence.stringValue().lower().containsIgnoreCase(statutPresence.toLowerCase()));
            }

            if (searchParams.containsKey("justification"))
                booleanBuilder.and(qEntity.justification.containsIgnoreCase(searchParams.get("justification")));

        }
    }
}
