package com.webgram.stage.controller;

import com.webgram.stage.model.CompetenceDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.CompetenceService;
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
@RequestMapping("competence")
@RequiredArgsConstructor
@CrossOrigin("*")

public class CompetenceController {

    private final CompetenceService competenceService;

    @Operation(summary = "Create competence", description = "this endpoint takes input competence and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createCompetence(@RequestBody CompetenceDTO competenceDTO) {
        try {
            var dto = competenceService.createCompetence(competenceDTO);
            return Response.ok().setPayload(dto).setMessage("Competence créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateCompetence(@Parameter(name = "id", description = "the competence id to updated") @PathVariable("id") Long id, @RequestBody CompetenceDTO competenceDTO) {
        competenceDTO.setId(id);
        try {
            var dto = competenceService.updateCompetence(competenceDTO);
            return Response.ok().setPayload(dto).setMessage("competence modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the competence", description = "This endpoint is used to read competence, it takes input id competence")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getCompetence(@Parameter(name = "id", description = "the type competence id to valid") @PathVariable Long id) {
        try {
            var dto = competenceService.getCompetence(id);
            return Response.ok().setPayload(dto).setMessage("competence trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllCompetences(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = competenceService.getAllCompetences(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the competence", description = "Delete competence, it takes input id competence")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCompetence(@PathVariable("id") Long id) {
        try {
            competenceService.deleteCompetence(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
