package com.webgram.stage.mapper;
import com.webgram.stage.entity.CandidatEntity;
import com.webgram.stage.entity.CompetenceEntity;
import com.webgram.stage.entity.ModuleEntity;
import com.webgram.stage.model.CandidatDTO;
import com.webgram.stage.model.ModuleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ModuleMapper extends EntityMapper<ModuleDTO, ModuleEntity> {

    // @Override
    // @Mapping(source = "formation.id", target = "formationId")
    // ModuleDTO asDto(ModuleEntity entity);

    // @Override
    // @Mapping(source = "formationId", target = "formation", qualifiedByName = "formationFromId")
    //ModuleEntity asEntity(ModuleDTO dto);

    // @Named("formationFromId")
    // default FormationEntity formationFromId(Long id) {
    //  if (id == null) {
    //       return null;
    //   }
    //   FormationEntity formation = new FormationEntity();
    //  formation.setId(id);
    //  return formation;
    // }
}
