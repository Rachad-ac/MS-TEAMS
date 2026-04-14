package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QResultatEntity;
import com.webgram.stage.mapper.ResultatMapper;
import com.webgram.stage.model.ResultatDTO;
import com.webgram.stage.repository.ResultatRepository;
import com.webgram.stage.services.ResultatService;
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
public class ResultatServiceImpl implements ResultatService {

    private final ResultatRepository resultatRepository;
    private final ResultatMapper resultatMapper;

    @Override
    public ResultatDTO createResultat(ResultatDTO resultatDTO){
        var entity = resultatMapper.asEntity(resultatDTO);
        var entitySave = resultatRepository.save(entity);
        return resultatMapper.asDto(entitySave);
    }

    @Override
    public ResultatDTO updateResultat(ResultatDTO resultatDTO){
        var entityUpdate = resultatMapper.asEntity(resultatDTO);
        var updatedEntity = resultatRepository.save(entityUpdate);
        return resultatMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteResultat(Long id){
        if (!resultatRepository.existsById(id)) {
            throw new RuntimeException("Resultat not found");
        }
        resultatRepository.deleteById(id);
    }

    @Override
    public ResultatDTO getResultat(Long id){
        var entity = resultatRepository.findById(id);
        return resultatMapper.asDto(entity.get());
    }

    @Override
    public Page<ResultatDTO> getAllResultat(Map<String, String> searchParams, Pageable pageable){
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return resultatRepository.findAll(booleanBuilder, pageable)
                .map(resultatMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QResultatEntity.resultatEntity;

            if (searchParams.containsKey("note")) {
                try {
                    double montant = Double.parseDouble(searchParams.get("note"));
                    booleanBuilder.and(qEntity.note.eq(montant));
                } catch (NumberFormatException e) {
                    throw new RuntimeException("La note doit être un nombre valide", e);
                }
            }

            if (searchParams.containsKey("commentaire"))
                booleanBuilder.and(qEntity.commentaire.containsIgnoreCase(searchParams.get("commentaire")));

        }
    }
}
