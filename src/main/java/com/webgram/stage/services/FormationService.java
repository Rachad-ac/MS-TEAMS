package com.webgram.stage.services;

import com.webgram.stage.model.FormationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface FormationService {

	FormationDTO createFormation(FormationDTO formationDTO);

	FormationDTO updateFormation(FormationDTO formationDTO);

	void deleteFormation(Long id);

	FormationDTO getFormation(Long id);

	Page<FormationDTO> getAllFormations(Map<String, String> searchParams, Pageable pageable);

}
