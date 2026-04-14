package com.webgram.stage.mapper;
import com.webgram.stage.entity.NiveauEtudeEntity;
import com.webgram.stage.model.NiveauEtudeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface NiveauEtudeMapper extends EntityMapper<NiveauEtudeDTO, NiveauEtudeEntity> {

}

