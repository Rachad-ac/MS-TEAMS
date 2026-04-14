package com.webgram.stage.services;

import com.webgram.stage.model.CandidatDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface CandidatService {

	CandidatDTO createCandidat(CandidatDTO candidatDTO);

	CandidatDTO updateCandidat(CandidatDTO candidatDTO);

	void deleteCandidat(Long id);

	CandidatDTO getCandidat(Long id);

	Page<CandidatDTO> getAllCandidat(Map<String, String> searchParams, Pageable pageable);

}
