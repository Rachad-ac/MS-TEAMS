package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.ModuleEntity;
import com.webgram.stage.entity.QModuleEntity;
import com.webgram.stage.mapper.ModuleMapper;
import com.webgram.stage.model.ModuleDTO;
import com.webgram.stage.repository.ModuleRepository;
import com.webgram.stage.services.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;

    @Override
    public ModuleDTO createModule(ModuleDTO moduleDTO) {
        var entity = moduleMapper.asEntity(moduleDTO);
        var entitySave = moduleRepository.save(entity);
        return moduleMapper.asDto(entitySave);
    }

    @Override
    public ModuleDTO updateModule(ModuleDTO moduleDTO) {
        var entityUpdate = moduleMapper.asEntity(moduleDTO);
        var updatedEntity = moduleRepository.save(entityUpdate);
        return moduleMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteModule(Long id) {
        if (!moduleRepository.existsById(id)) {
            throw new RuntimeException("Module not found");
        }
        moduleRepository.deleteById(id);
    }

    @Override
    public ModuleDTO getModule(Long id) {
        var entity = moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        return moduleMapper.asDto(entity);
    }

    @Override
    public Page<ModuleDTO> getAllModules(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return moduleRepository.findAll(booleanBuilder, pageable)
                .map(moduleMapper::asDto);
    }

    // @Override
    // public Page<ModuleDTO> getModulesByFormation(Long formationId, Pageable pageable) {
    //     var pageEntities = moduleRepository.findByFormationIdOrderByOrdreAsc(formationId, pageable);
    //     return pageEntities.map(moduleMapper::asDto);
    // }

    // @Override
    // public void reorderModules(Long formationId, List<Long> moduleIdsInOrder) {
        // Récupérer tous les modules de la formation
    //  List<ModuleEntity> modules = moduleRepository.findByFormationIdOrderByOrdreAsc(formationId);

        // Créer un map pour accès rapide par id
    //var modulesMap = modules.stream()
    //   .collect(Collectors.toMap(ModuleEntity::getId, m -> m));

        // Mettre à jour l’ordre selon la liste fournie
        // for (int i = 0; i < moduleIdsInOrder.size(); i++) {
        // Long moduleId = moduleIdsInOrder.get(i);
    //ModuleEntity module = modulesMap.get(moduleId);
    //if (module != null) {
    //     module.setOrdre(i + 1); // ordre commence à 1
    //         moduleRepository.save(module);
    //     }
    //   }
    //   }

    private Integer parseIntOrNull(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder builder) {
        if (searchParams == null || searchParams.isEmpty()) return;

        var qEntity = QModuleEntity.moduleEntity;

        if (searchParams.containsKey("titre")) {
            builder.and(qEntity.titre.containsIgnoreCase(searchParams.get("titre")));
        }
        if (searchParams.containsKey("ordre")) {
            Integer ordreValue = parseIntOrNull(searchParams.get("ordre"));
            if (ordreValue != null) {
                builder.and(qEntity.ordre.eq(ordreValue));
            }
        }
    }
}
