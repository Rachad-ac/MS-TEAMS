package com.webgram.stage.services;

import com.webgram.stage.model.DomaineDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface DomaineService {

	DomaineDTO createDomaine(DomaineDTO domaineDTO);

	DomaineDTO updateDomaine(DomaineDTO domaineDTO);

	void deleteDomaine(Long id);

	DomaineDTO getDomaine(Long id);

	Page<DomaineDTO> getAllDomaines(Map<String, String> searchParams, Pageable pageable);


}
