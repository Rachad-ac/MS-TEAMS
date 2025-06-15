package com.webgram.stage.mapper;

import com.webgram.stage.entity.OffreEmploiEntity;
import com.webgram.stage.model.OffreEmploiDTO;
import com.webgram.stage.model.OffreEmploiDTO.OffreEmploiDTOBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-15T19:43:01+0000",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 21.0.7 (Amazon.com Inc.)"
)
@Component
public class OffreEmploiMapperImpl implements OffreEmploiMapper {

    @Override
    public OffreEmploiEntity asEntity(OffreEmploiDTO dto) {
        if ( dto == null ) {
            return null;
        }

        OffreEmploiEntity offreEmploiEntity = new OffreEmploiEntity();

        offreEmploiEntity.setId( dto.getId() );
        offreEmploiEntity.setTitre( dto.getTitre() );
        offreEmploiEntity.setDescription( dto.getDescription() );
        offreEmploiEntity.setDatePublication( dto.getDatePublication() );

        return offreEmploiEntity;
    }

    @Override
    public OffreEmploiDTO asDto(OffreEmploiEntity entity) {
        if ( entity == null ) {
            return null;
        }

        OffreEmploiDTOBuilder offreEmploiDTO = OffreEmploiDTO.builder();

        offreEmploiDTO.id( entity.getId() );
        offreEmploiDTO.titre( entity.getTitre() );
        offreEmploiDTO.description( entity.getDescription() );
        offreEmploiDTO.datePublication( entity.getDatePublication() );

        return offreEmploiDTO.build();
    }

    @Override
    public List<OffreEmploiDTO> parse(List<OffreEmploiEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<OffreEmploiDTO> list = new ArrayList<OffreEmploiDTO>( entities.size() );
        for ( OffreEmploiEntity offreEmploiEntity : entities ) {
            list.add( asDto( offreEmploiEntity ) );
        }

        return list;
    }

    @Override
    public List<OffreEmploiEntity> parseToEntity(List<OffreEmploiDTO> entities) {
        if ( entities == null ) {
            return null;
        }

        List<OffreEmploiEntity> list = new ArrayList<OffreEmploiEntity>( entities.size() );
        for ( OffreEmploiDTO offreEmploiDTO : entities ) {
            list.add( asEntity( offreEmploiDTO ) );
        }

        return list;
    }
}
