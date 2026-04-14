package com.webgram.stage.services;

import com.webgram.stage.model.SessionFormationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface SessionFormationService {

	SessionFormationDTO createSessionFormation(SessionFormationDTO sessionFormationDTO);

	SessionFormationDTO updateSessionFormation(SessionFormationDTO sessionFormationDTO);

	void deleteSessionFormation(Long id);

	SessionFormationDTO getSessionFormation(Long id);

	Page<SessionFormationDTO> getAllSessionFormations(Map<String, String> searchParams, Pageable pageable);

}
