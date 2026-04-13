package com.webgram.stage.controller;
import com.webgram.stage.services.CandidatService;
import com.webgram.stage.model.CandidatDTO;
import com.webgram.stage.model.Response;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/candidats")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CandidatController {

    private final CandidatService candidatService;

    @Operation(summary = "Create Candidat", description = "This endpoint takes input Candidat and saves it")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Candidat successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createCandidat(@RequestBody CandidatDTO candidatDTO) {
        try {
            var dto = candidatService.createCandidat(candidatDTO);
            return Response.ok().setPayload(dto).setMessage("Candidat créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateCandidat(
            @Parameter(name = "id", description = "ID du candidat à modifier") @PathVariable Long id,
            @RequestBody CandidatDTO candidatDTO
    ) {
        try {
            candidatDTO.setId(id);
            var dto = candidatService.updateCandidat(candidatDTO);
            return Response.ok().setPayload(dto).setMessage("Candidat modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get Candidat by ID", description = "Récupère un candidat par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Candidat not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getCandidat(@PathVariable Long id) {
        try {
            var dto = candidatService.getCandidat(id);
            return Response.ok().setPayload(dto).setMessage("Candidat trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get all Candidats", description = "Retourne tous les candidats filtrés et paginés")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success")
    })
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllCandidat(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = candidatService.getAllCandidat(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder()
                .number(page.getNumber())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .totalPages(page.getTotalPages())
                .build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }

    @Operation(summary = "Delete Candidat", description = "Supprime un candidat par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Candidat supprimé"),
            @ApiResponse(responseCode = "404", description = "Candidat not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCandidat(@PathVariable Long id) {
        try {
            candidatService.deleteCandidat(id);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression : " + e.getMessage(), e);
        }
    }
}
