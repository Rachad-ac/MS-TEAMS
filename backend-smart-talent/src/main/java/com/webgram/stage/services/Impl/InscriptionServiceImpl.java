package com.webgram.stage.services.Impl;

import com.webgram.stage.entity.InscriptionEntity;
import com.webgram.stage.mapper.InscriptionMapper;
import com.webgram.stage.model.InscriptionDTO;
import com.webgram.stage.repository.InscriptionRepository;
import com.webgram.stage.services.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implémentation du service Inscription.
 */
@Service
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Autowired
    private InscriptionMapper inscriptionMapper;

    @Override
    public InscriptionDTO createInscription(InscriptionDTO inscriptionDTO) {
        InscriptionEntity entity = inscriptionMapper.toEntity(inscriptionDTO);
        InscriptionEntity saved = inscriptionRepository.save(entity);
        return inscriptionMapper.toDto(saved);
    }

    @Override
    public InscriptionDTO updateInscription(Integer id, InscriptionDTO inscriptionDTO) {
        Optional<InscriptionEntity> optional = inscriptionRepository.findById(id);
        if (optional.isPresent()) {
            InscriptionEntity entity = inscriptionMapper.toEntity(inscriptionDTO);
            entity.setId(id);
            InscriptionEntity updated = inscriptionRepository.save(entity);
            return inscriptionMapper.toDto(updated);
        }
        return null;
    }

    @Override
    public void deleteInscription(Integer id) {
        inscriptionRepository.deleteById(id);
    }

    @Override
    public InscriptionDTO getInscriptionById(Integer id) {
        return inscriptionRepository.findById(id)
                .map(inscriptionMapper::toDto)
                .orElse(null);
    }

    @Override
    public List<InscriptionDTO> getAllInscriptions() {
        return inscriptionRepository.findAll().stream()
                .map(inscriptionMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Recherche paginée et filtrée des inscriptions.
     * @param searchParams paramètres de recherche (clé = champ, valeur = valeur recherchée)
     * @param pageable pagination
     * @return page de résultats DTO
     */
    @Override
    public Page<InscriptionDTO> getAllInscriptions(Map<String, String> searchParams, Pageable pageable) {
        // Recherche simple en mémoire (à remplacer par Specification/QueryDSL pour de gros volumes)
        List<InscriptionDTO> filtered = getAllInscriptions().stream()
            .filter(dto -> {
                boolean match = true;
                if (searchParams.containsKey("employeId")) {
                    match &= dto.getEmployeId() != null && dto.getEmployeId().toString().equals(searchParams.get("employeId"));
                }
                if (searchParams.containsKey("formationId")) {
                    match &= dto.getFormationId() != null && dto.getFormationId().toString().equals(searchParams.get("formationId"));
                }
                if (searchParams.containsKey("statut")) {
                    match &= dto.getStatut() != null && dto.getStatut().equalsIgnoreCase(searchParams.get("statut"));
                }
                return match;
            })
            .collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filtered.size());
        List<InscriptionDTO> pageContent = (start <= end) ? filtered.subList(start, end) : List.of();
        return new PageImpl<>(pageContent, pageable, filtered.size());
    }
} 