package com.webgram.stage.services;

import com.webgram.stage.model.TestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface TestService {

	TestDTO createTest(TestDTO testDTO);

	TestDTO updateTest(TestDTO testDTO);

	void deleteTest(Long id);

	TestDTO getTest(Long id);

	Page<TestDTO> getAllTests(Map<String, String> searchParams, Pageable pageable);

}
