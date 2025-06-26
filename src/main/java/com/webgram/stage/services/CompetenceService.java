package com.webgram.stage.services;

import com.webgram.stage.model.CompetenceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface CompetenceService {

	CompetenceDTO createCompetence(CompetenceDTO competenceDTO);

	CompetenceDTO updateCompetence(CompetenceDTO competenceDTO);

	void deleteCompetence(Long id);

	CompetenceDTO getCompetence(Long id);

	Page<CompetenceDTO> getAllCompetences(Map<String, String> searchParams, Pageable pageable);

}
