package com.webgram.stage.services;

import com.webgram.stage.model.EvaluationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public interface EvaluationService {

    EvaluationDTO createEvaluation(EvaluationDTO evaluationDTO);
    EvaluationDTO updateEvaluation(EvaluationDTO evaluationDTO);
    void deleteEvaluation(Long id);
    EvaluationDTO getEvaluation(Long id);
    Page<EvaluationDTO> getAllEvaluation(Map<String, String> searchParams, Pageable pageable);
}
