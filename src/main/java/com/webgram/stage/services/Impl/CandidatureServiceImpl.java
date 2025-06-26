package com.webgram.stage.services.Impl;

import com.webgram.stage.entity.Candidature;
import com.webgram.stage.mapper.CandidatureMapper;
import com.webgram.stage.model.CandidatureDTO;
import com.webgram.stage.repository.CandidatureRepository;
import com.webgram.stage.services.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CandidatureServiceImpl implements CandidatureService {
    @Autowired
    private CandidatureRepository candidatureRepository;

    @Override
    public CandidatureDTO save(CandidatureDTO candidatureDTO) {
        Candidature entity = CandidatureMapper.toEntity(candidatureDTO);
        return CandidatureMapper.toDTO(candidatureRepository.save(entity));
    }

    @Override
    public CandidatureDTO update(Long id, CandidatureDTO candidatureDTO) {
        Optional<Candidature> optional = candidatureRepository.findById(id);
        if (optional.isPresent()) {
            Candidature entity = optional.get();
            entity.setDateCandidature(candidatureDTO.getDateCandidature());
            entity.setStatut(candidatureDTO.getStatut());
            entity.setPosteId(candidatureDTO.getPosteId());
            entity.setCandidatId(candidatureDTO.getCandidatId());
            return CandidatureMapper.toDTO(candidatureRepository.save(entity));
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        candidatureRepository.deleteById(id);
    }

    @Override
    public CandidatureDTO getById(Long id) {
        return candidatureRepository.findById(id).map(CandidatureMapper::toDTO).orElse(null);
    }

    @Override
    public List<CandidatureDTO> getAll() {
        return candidatureRepository.findAll().stream().map(CandidatureMapper::toDTO).collect(Collectors.toList());
    }
} 