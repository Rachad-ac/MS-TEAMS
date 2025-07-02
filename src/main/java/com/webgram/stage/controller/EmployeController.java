package com.webgram.stage.controller;

import com.webgram.stage.model.EmployeDTO;
import com.webgram.stage.services.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des employés.
 */
@RestController
@RequestMapping("employes")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    /**
     * Créer un nouvel employé.
     */
    @PostMapping
    public EmployeDTO createEmploye(@RequestBody EmployeDTO employeDTO) {
        return employeService.createEmploye(employeDTO);
    }

    /**
     * Récupérer la liste de tous les employés.
     */
    @GetMapping
    public List<EmployeDTO> getAllEmployes() {
        return employeService.getAllEmployes();
    }

    /**
     * Récupérer un employé par son ID.
     */
    @GetMapping("/{id}")
    public EmployeDTO getEmployeById(@PathVariable Integer id) {
        return employeService.getEmployeById(id);
    }

    /**
     * Mettre à jour un employé existant.
     */
    @PutMapping("/{id}")
    public EmployeDTO updateEmploye(@PathVariable Integer id, @RequestBody EmployeDTO employeDTO) {
        return employeService.updateEmploye(id, employeDTO);
    }

    /**
     * Supprimer un employé par son ID.
     */
    @DeleteMapping("/{id}")
    public void deleteEmploye(@PathVariable Integer id) {
        employeService.deleteEmploye(id);
    }

    @GetMapping("/search")
    public Page<EmployeDTO> searchEmployes(
        @RequestParam Map<String, String> searchParams,
        Pageable pageable
    ) {
        return employeService.getAllEmployes(searchParams, pageable);
    }
} 