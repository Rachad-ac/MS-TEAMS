package com.webgram.stage.controller;

import com.webgram.stage.model.CandidatureDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.CandidatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("candidatures")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CandidatureController {
    private final CandidatureService candidatureService;

    @Operation(summary = "Créer une candidature", description = "Crée une nouvelle candidature")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Succès"), @ApiResponse(responseCode = "400", description = "Requête invalide")})
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> create(@RequestBody CandidatureDTO dto) {
        try {
            var created = candidatureService.save(dto);
            return Response.created().setPayload(created).setMessage("CandidatureEntity créée");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Mettre à jour une candidature", description = "Met à jour une candidature existante")
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> update(@PathVariable Long id, @RequestBody CandidatureDTO dto) {
        try {
            var updated = candidatureService.update(id, dto);
            return Response.ok().setPayload(updated).setMessage("CandidatureEntity modifiée");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Supprimer une candidature", description = "Supprime une candidature par son ID")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Response<Object> delete(@PathVariable Long id) {
        try {
            candidatureService.delete(id);
            return Response.deleted().setMessage("CandidatureEntity supprimée");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Obtenir une candidature par ID", description = "Récupère une candidature par son ID")
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getById(@PathVariable Long id) {
        try {
            var dto = candidatureService.getById(id);
            return Response.ok().setPayload(dto).setMessage("CandidatureEntity trouvée");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Lister toutes les candidatures", description = "Récupère la liste de toutes les candidatures")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAll() {
        try {
            List<CandidatureDTO> list = candidatureService.getAll();
            return Response.ok().setPayload(list).setMessage("Liste des candidatures");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Lister les candidatures paginées/filtrées", description = "Récupère une page de candidatures selon les filtres et la pagination")
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllPaged(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        try {
            var page = candidatureService.getAllCandidatures(searchParams, pageable);
            Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
            return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }
} 