package com.webgram.stage.services;

import com.webgram.stage.model.EmployeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface EmployeService {
    EmployeDTO createEmploye(EmployeDTO employeDTO);
    EmployeDTO updateEmploye(EmployeDTO employeDTO);
    void deleteEmploye(Long id);
    EmployeDTO getEmploye(Long id);
    Page<EmployeDTO> getAllEmploye(Map<String, String> searchParams, Pageable pageable);
}
