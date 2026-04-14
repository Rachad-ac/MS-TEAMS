package com.webgram.stage.mapper;

import com.webgram.stage.entity.EmployeEntity;
import com.webgram.stage.model.EmployeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface EmployeMapper extends EntityMapper<EmployeDTO, EmployeEntity>{

}
