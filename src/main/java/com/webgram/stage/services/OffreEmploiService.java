package com.webgram.stage.services;

import com.webgram.stage.model.OffreEmploiDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface OffreEmploiService {

	OffreEmploiDTO createOffreEmploi(OffreEmploiDTO offreEmploiDTO);

	OffreEmploiDTO updateOffreEmploi(OffreEmploiDTO offreEmploiDTO);

	void deleteOffreEmploi(Long id);

	OffreEmploiDTO getOffreEmploi(Long id);

	Page<OffreEmploiDTO> getAllOffreEmplois(Map<String, String> searchParams, Pageable pageable);

}
