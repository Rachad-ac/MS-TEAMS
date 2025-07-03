package com.webgram.stage.mapper;

import com.webgram.stage.entity.EmployeEntity;
import com.webgram.stage.model.EmployeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * Mapper MapStruct pour convertir entre EmployeEntity et EmployeDTO.
 */
@Mapper(componentModel = "spring")
public interface EmployeMapper {
    EmployeMapper INSTANCE = Mappers.getMapper(EmployeMapper.class);

    // Conversion de l'entité vers le DTO (mapping automatique par défaut)
    EmployeDTO toDto(EmployeEntity entity);

    // ====== MAPPINGS COMMENTÉS EN ATTENDANT LA CRÉATION DES ENTITÉS ======
    /*
    @Mapping(target = "presenceIds", source = "presences.id")
    @Mapping(target = "resultatIds", source = "resultats.id")
    */

    // Conversion du DTO vers l'entité
    EmployeEntity toEntity(EmployeDTO dto);
} 