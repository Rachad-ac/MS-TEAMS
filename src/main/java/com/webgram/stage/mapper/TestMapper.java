package com.webgram.stage.mapper;
import com.webgram.stage.entity.TestEntity;
import com.webgram.stage.model.TestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface TestMapper extends EntityMapper<TestDTO, TestEntity> {


}
