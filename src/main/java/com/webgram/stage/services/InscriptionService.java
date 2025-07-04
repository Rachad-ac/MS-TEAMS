package com.webgram.stage.services;

import com.webgram.stage.model.InscriptionDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Map;

/**
 * Interface de service pour la gestion des inscriptions.
 */
public interface InscriptionService {
    InscriptionDTO createInscription(InscriptionDTO inscriptionDTO);
    InscriptionDTO updateInscription(Integer id, InscriptionDTO inscriptionDTO);
    void deleteInscription(Integer id);
    InscriptionDTO getInscriptionById(Integer id);
    List<InscriptionDTO> getAllInscriptions();
    Page<InscriptionDTO> getAllInscriptions(Map<String, String> searchParams, Pageable pageable);
} 