package com.webgram.stage.services.Impl;
import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QTestEntity;
import com.webgram.stage.mapper.TestMapper;
import com.webgram.stage.model.TestDTO;
import com.webgram.stage.repository.TestRepository;
import com.webgram.stage.services.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Map;

@Transactional
@RequiredArgsConstructor
@Service
public class TestServiceImpl implements TestService {
    private final TestRepository testRepository;
    private final TestMapper testMapper;



    @Override
    public TestDTO createTest (TestDTO testDTO) {
        var entity = testMapper.asEntity( testDTO);
        var entitySave = testRepository.save(entity);
        return testMapper.asDto(entitySave);
    }

    @Override
    public TestDTO updateTest (TestDTO testDTO) {
        var entityUpdate = testMapper.asEntity(testDTO);
        var updatedEntity = testRepository.save(entityUpdate);
        return testMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteTest(Long id) {
        if (!testRepository.existsById(id)) {
            throw new RuntimeException("Test not found");
        }
        testRepository.deleteById(id);
    }
    @Override
    public TestDTO getTest(Long id) {
        var entity = testRepository.findById(id);
        return testMapper.asDto(entity.get());
    }

    @Override
    public Page<TestDTO> getAllTests(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return testRepository.findAll(booleanBuilder, pageable)
                .map(testMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder builder) {
        if (searchParams == null || searchParams.isEmpty()) return;

        var qEntity = QTestEntity.testEntity;

        if (searchParams.containsKey("type")) {
            builder.and(qEntity.type.containsIgnoreCase(searchParams.get("type")));
        }

        if (searchParams.containsKey("date")) {
            try {
                LocalDate date = LocalDate.parse(searchParams.get("date"));
                builder.and(qEntity.date.eq(date));
            } catch (DateTimeParseException e) {
                // log or ignore invalid date format
            }
        }

        if (searchParams.containsKey("bareme")) {
            try {
                int bareme = Integer.parseInt(searchParams.get("bareme"));
                builder.and(qEntity.bareme.eq(bareme));
            } catch (NumberFormatException e) {
                // log or ignore invalid number
            }
        }
    }



}


