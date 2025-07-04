package com.webgram.stage.controller;

import com.webgram.stage.model.InscriptionDTO;
import com.webgram.stage.services.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des inscriptions.
 */
@RestController
@RequestMapping("inscriptions")
public class InscriptionController {

    @Autowired
    private InscriptionService inscriptionService;

    /**
     * Créer une nouvelle inscription.
     */
    @PostMapping
    public InscriptionDTO createInscription(@RequestBody InscriptionDTO inscriptionDTO) {
        return inscriptionService.createInscription(inscriptionDTO);
    }

    /**
     * Récupérer la liste de toutes les inscriptions.
     */
    @GetMapping
    public List<InscriptionDTO> getAllInscriptions() {
        return inscriptionService.getAllInscriptions();
    }

    /**
     * Récupérer une inscription par son ID.
     */
    @GetMapping("/{id}")
    public InscriptionDTO getInscriptionById(@PathVariable Integer id) {
        return inscriptionService.getInscriptionById(id);
    }

    /**
     * Mettre à jour une inscription existante.
     */
    @PutMapping("/{id}")
    public InscriptionDTO updateInscription(@PathVariable Integer id, @RequestBody InscriptionDTO inscriptionDTO) {
        return inscriptionService.updateInscription(id, inscriptionDTO);
    }

    /**
     * Supprimer une inscription par son ID.
     */
    @DeleteMapping("/{id}")
    public void deleteInscription(@PathVariable Integer id) {
        inscriptionService.deleteInscription(id);
    }

    /**
     * Recherche paginée et filtrée des inscriptions.
     * Exemple d'appel : /api/inscriptions/search?employeId=1&statut=valide&page=0&size=10
     */
    @GetMapping("/search")
    public Page<InscriptionDTO> searchInscriptions(@RequestParam Map<String, String> searchParams, @PageableDefault Pageable pageable) {
        // On retire les paramètres de pagination de la map de recherche
        searchParams.remove("page");
        searchParams.remove("size");
        searchParams.remove("sort");
        return inscriptionService.getAllInscriptions(searchParams, pageable);
    }
} 