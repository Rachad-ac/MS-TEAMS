package com.webgram.stage.controller;

import com.webgram.stage.model.SessionFormationDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.SessionFormationService;
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
@RequestMapping("sessionFormations")
@RequiredArgsConstructor
@CrossOrigin("*")

public class SessionFormationController {

    private final SessionFormationService sessionFormationService;

    @Operation(summary = "Create sessionFormation", description = "this endpoint takes input sessionFormation and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createSessionFormation(@RequestBody SessionFormationDTO sessionFormationDTO) {
        try {
            var dto = sessionFormationService.createSessionFormation(sessionFormationDTO);
            return Response.ok().setPayload(dto).setMessage("SessionFormation créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateSessionFormation(@Parameter(name = "id", description = "the sessionFormation id to updated") @PathVariable("id") Long id, @RequestBody SessionFormationDTO sessionFormationDTO) {
        sessionFormationDTO.setId(id);
        try {
            var dto = sessionFormationService.updateSessionFormation(sessionFormationDTO);
            return Response.ok().setPayload(dto).setMessage("sessionFormation modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the sessionFormation", description = "This endpoint is used to read sessionFormation, it takes input id sessionFormation")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getSessionFormation(@Parameter(name = "id", description = "the type sessionFormation id to valid") @PathVariable Long id) {
        try {
            var dto = sessionFormationService.getSessionFormation(id);
            return Response.ok().setPayload(dto).setMessage("sessionFormation trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllSessionFormations(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = sessionFormationService.getAllSessionFormations(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the sessionFormation", description = "Delete sessionFormation, it takes input id sessionFormation")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSessionFormation(@PathVariable("id") Long id) {
        try {
            sessionFormationService.deleteSessionFormation(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
