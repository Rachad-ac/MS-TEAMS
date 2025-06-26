package com.webgram.stage.services;

import com.webgram.stage.model.CandidatureDTO;
import java.util.List;

public interface CandidatureService {
    CandidatureDTO save(CandidatureDTO candidatureDTO);
    CandidatureDTO update(Long id, CandidatureDTO candidatureDTO);
    void delete(Long id);
    CandidatureDTO getById(Long id);
    List<CandidatureDTO> getAll();
} 