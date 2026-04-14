package com.webgram.stage.mapper;

import com.webgram.stage.entity.InscriptionEntity;
import com.webgram.stage.model.InscriptionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * Mapper MapStruct pour convertir entre InscriptionEntity et InscriptionDTO.
 */
@Mapper(componentModel = "spring")
public interface InscriptionMapper {
    InscriptionMapper INSTANCE = Mappers.getMapper(InscriptionMapper.class);

    // Conversion de l'entité vers le DTO (seul employeId est mappé tant que FormationEntity n'existe pas)
    @Mapping(target = "employeId", source = "employe.id")
    InscriptionDTO toDto(InscriptionEntity entity);

    // Conversion du DTO vers l'entité (seul employeId est mappé tant que FormationEntity n'existe pas)
    @Mapping(target = "employe.id", source = "employeId")
    InscriptionEntity toEntity(InscriptionDTO dto);

    // ====== MAPPINGS AVEC FormationEntity À RÉACTIVER PLUS TARD ======
    // @Mapping(target = "formationId", source = "formation.id")
    // @Mapping(target = "formation.id", source = "formationId")
} 