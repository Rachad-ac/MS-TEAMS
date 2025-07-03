package com.webgram.stage.mapper;

import com.webgram.stage.entity.PresenceEntity;
import com.webgram.stage.model.PresenceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring" ,
        uses = { SessionFormationMapper.class /*, EmployeMapper.class*/} )
public interface PresenceMapper extends EntityMapper<PresenceDTO , PresenceEntity>{

    @Mapping(source = "sessionFormationId", target = "sessionFormation.id")
    //@Mapping(source = "employeId", target = "employe.id")
    PresenceEntity asEntity(PresenceDTO dto);

    @Mapping(source = "sessionFormation.id", target = "sessionFormationId")
    //@Mapping(source = "employe.id", target = "employeId")
    PresenceDTO asDto(PresenceEntity entity);

}
