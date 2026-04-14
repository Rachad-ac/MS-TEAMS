package com.webgram.stage.services;

import com.webgram.stage.model.CandidatureDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Map;

public interface CandidatureService {
    CandidatureDTO save(CandidatureDTO candidatureDTO);
    CandidatureDTO update(Long id, CandidatureDTO candidatureDTO);
    void delete(Long id);
    CandidatureDTO getById(Long id);
    List<CandidatureDTO> getAll();
    Page<CandidatureDTO> getAllCandidatures(Map<String, String> searchParams, Pageable pageable);
} 