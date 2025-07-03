package com.webgram.stage.services.Impl;

import com.webgram.stage.entity.EmployeEntity;
import com.webgram.stage.mapper.EmployeMapper;
import com.webgram.stage.model.EmployeDTO;
import com.webgram.stage.repository.EmployeRepository;
import com.webgram.stage.services.EmployeService;
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
 * Implémentation du service Employe.
 */
@Service
public class EmployeServiceImpl implements EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private EmployeMapper employeMapper;

    @Override
    public EmployeDTO createEmploye(EmployeDTO employeDTO) {
        EmployeEntity entity = employeMapper.toEntity(employeDTO);
        EmployeEntity saved = employeRepository.save(entity);
        return employeMapper.toDto(saved);
    }

    @Override
    public EmployeDTO updateEmploye(Integer id, EmployeDTO employeDTO) {
        Optional<EmployeEntity> optional = employeRepository.findById(id);
        if (optional.isPresent()) {
            EmployeEntity entity = employeMapper.toEntity(employeDTO);
            entity.setId(id);
            EmployeEntity updated = employeRepository.save(entity);
            return employeMapper.toDto(updated);
        }
        return null;
    }

    @Override
    public void deleteEmploye(Integer id) {
        employeRepository.deleteById(id);
    }

    @Override
    public EmployeDTO getEmployeById(Integer id) {
        return employeRepository.findById(id)
                .map(employeMapper::toDto)
                .orElse(null);
    }

    @Override
    public List<EmployeDTO> getAllEmployes() {
        return employeRepository.findAll().stream()
                .map(employeMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Recherche paginée et filtrée des employés.
     * @param searchParams paramètres de recherche (clé = champ, valeur = valeur recherchée)
     * @param pageable pagination
     * @return page de résultats DTO
     */
    @Override
    public Page<EmployeDTO> getAllEmployes(Map<String, String> searchParams, Pageable pageable) {
        List<EmployeDTO> filtered = getAllEmployes().stream()
            .filter(dto -> {
                boolean match = true;
                if (searchParams.containsKey("nom")) {
                    match &= dto.getNom() != null && dto.getNom().toLowerCase().contains(searchParams.get("nom").toLowerCase());
                }
                if (searchParams.containsKey("prenom")) {
                    match &= dto.getPrenom() != null && dto.getPrenom().toLowerCase().contains(searchParams.get("prenom").toLowerCase());
                }
                if (searchParams.containsKey("email")) {
                    match &= dto.getEmail() != null && dto.getEmail().toLowerCase().contains(searchParams.get("email").toLowerCase());
                }
                if (searchParams.containsKey("departement")) {
                    match &= dto.getDepartement() != null && dto.getDepartement().equalsIgnoreCase(searchParams.get("departement"));
                }
                if (searchParams.containsKey("poste")) {
                    match &= dto.getPoste() != null && dto.getPoste().equalsIgnoreCase(searchParams.get("poste"));
                }
                return match;
            })
            .collect(Collectors.toList());
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), filtered.size());
        List<EmployeDTO> pageContent = (start <= end) ? filtered.subList(start, end) : List.of();
        return new PageImpl<>(pageContent, pageable, filtered.size());
    }
} 