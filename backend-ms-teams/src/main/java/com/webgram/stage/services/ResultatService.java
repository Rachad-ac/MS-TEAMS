package com.webgram.stage.services;

import com.webgram.stage.model.PresenceDTO;
import com.webgram.stage.model.ResultatDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface ResultatService {

    ResultatDTO createResultat(ResultatDTO resultatDTO);
    ResultatDTO updateResultat(ResultatDTO resultatDTO);
    void deleteResultat(Long id);
    ResultatDTO getResultat(Long id);
    Page<ResultatDTO> getAllResultat(Map<String, String> searchParams, Pageable pageable);
}
