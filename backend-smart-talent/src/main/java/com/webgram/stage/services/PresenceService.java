package com.webgram.stage.services;

import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.PresenceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public interface PresenceService {

    PresenceDTO createPresence(PresenceDTO presenceDTO);
    PresenceDTO updatePresence(PresenceDTO presenceDTO);
    void deletePresence(Long id);
    PresenceDTO getPresence(Long id);
    Page<PresenceDTO> getAllPresence(Map<String, String> searchParams, Pageable pageable);
}
