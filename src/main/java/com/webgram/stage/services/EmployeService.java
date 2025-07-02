package com.webgram.stage.services;

import com.webgram.stage.model.EmployeDTO;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Interface de service pour la gestion des employés.
 */
public interface EmployeService {
    EmployeDTO createEmploye(EmployeDTO employeDTO);
    EmployeDTO updateEmploye(Integer id, EmployeDTO employeDTO);
    void deleteEmploye(Integer id);
    EmployeDTO getEmployeById(Integer id);
    List<EmployeDTO> getAllEmployes();
    Page<EmployeDTO> getAllEmployes(Map<String, String> searchParams, Pageable pageable);
} 