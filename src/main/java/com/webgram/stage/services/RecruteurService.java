package com.webgram.stage.services;

import com.webgram.stage.model.RecruteurDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface RecruteurService {
    RecruteurDTO createRecruteur(RecruteurDTO recruteurDTO);
    RecruteurDTO updateRecruteur(RecruteurDTO recruteurDTO);
    void deleteRecruteur(Long id);
    RecruteurDTO getRecruteur(Long id);
    Page<RecruteurDTO> getAllRecruteur(Map<String, String> searchParams, Pageable pageable);
}
