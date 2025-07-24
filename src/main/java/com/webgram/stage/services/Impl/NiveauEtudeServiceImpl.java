package com.webgram.stage.services.Impl;
import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QNiveauEtudeEntity;
import com.webgram.stage.mapper.NiveauEtudeMapper;
import com.webgram.stage.model.NiveauEtudeDTO;
import com.webgram.stage.repository.NiveauEtudeRepository;
import com.webgram.stage.services.NiveauEtudeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class NiveauEtudeServiceImpl implements NiveauEtudeService {
    private final NiveauEtudeRepository niveauEtudeRepository;
    private final NiveauEtudeMapper niveauEtudeMapper;

    @Transactional
    @Override
    public NiveauEtudeDTO createNiveauEtude(NiveauEtudeDTO niveauEtudeDTO) {
        var entity = niveauEtudeMapper.asEntity(niveauEtudeDTO);
        var entitySave = niveauEtudeRepository.save(entity);
        return niveauEtudeMapper.asDto(entitySave);
    }

    @Override
    public NiveauEtudeDTO updateNiveauEtude(NiveauEtudeDTO niveauEtudeDTO) {
        var entityUpdate = niveauEtudeMapper.asEntity(niveauEtudeDTO);
        var updatedEntity = niveauEtudeRepository.save(entityUpdate);
        return niveauEtudeMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteNiveauEtude(Long id) {
        if (!niveauEtudeRepository.existsById(id)) {
            throw new RuntimeException("NiveauEtude not found");
        }
        niveauEtudeRepository.deleteById(id);
    }

    @Override
    public NiveauEtudeDTO getNiveauEtude(Long id) {
        var entity = niveauEtudeRepository.findById(id);
        return niveauEtudeMapper.asDto(entity.get());
    }

    @Override
    public Page<NiveauEtudeDTO> getAllNiveauEtude(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return niveauEtudeRepository.findAll(booleanBuilder, pageable)
                .map(niveauEtudeMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QNiveauEtudeEntity.niveauEtudeEntity;

            if (searchParams.containsKey("nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));

            if (searchParams.containsKey("commentaire"))
                booleanBuilder.and(qEntity.commentaire.containsIgnoreCase(searchParams.get("commentaire")));
        }
    }
}
