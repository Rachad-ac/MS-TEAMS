package com.webgram.stage.mapper;
import com.webgram.stage.entity.TestEntity;
import com.webgram.stage.model.TestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface TestMapper extends EntityMapper<TestDTO, TestEntity> {
    @Override
    @Mapping(source = "formationId", target = "formation.id")
    TestEntity asEntity(TestDTO dto);

    @Override
    @Mapping(source = "formation.id", target = "formationId")
    TestDTO asDto(TestEntity entity);

}
