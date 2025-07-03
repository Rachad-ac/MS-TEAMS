package com.webgram.stage.services;

import com.webgram.stage.model.FormateurDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface FormateurService {

	FormateurDTO createFormateur(FormateurDTO formateurDTO);

	FormateurDTO updateFormateur(FormateurDTO formateurDTO);

	void deleteFormateur(Long id);

	FormateurDTO getFormateur(Long id);

	Page<FormateurDTO> getAllFormateurs(Map<String, String> searchParams, Pageable pageable);

}
