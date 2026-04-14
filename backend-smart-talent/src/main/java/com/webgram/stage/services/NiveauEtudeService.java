package com.webgram.stage.services;
import com.webgram.stage.model.NiveauEtudeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Map;

public interface NiveauEtudeService {
	NiveauEtudeDTO createNiveauEtude(NiveauEtudeDTO niveauEtudeDTO);

	NiveauEtudeDTO updateNiveauEtude(NiveauEtudeDTO niveauEtudeDTO);

	void deleteNiveauEtude(Long id);

	NiveauEtudeDTO getNiveauEtude(Long id);

	Page<NiveauEtudeDTO> getAllNiveauEtude(Map<String, String> searchParams, Pageable pageable);

}
