package com.webgram.stage.controller;

import com.webgram.stage.model.RecruteurDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.RecruteurService;
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
@RequestMapping("recruteurs")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecruteurController {

    private final RecruteurService recruteurService;

    @Operation(summary = "Create recruteur", description = "this endpoint takes input evaluation and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createRecruteur(@RequestBody RecruteurDTO recruteurDTO) {
        try {
            var dto = recruteurService.createRecruteur(recruteurDTO);
            return Response.ok().setPayload(dto).setMessage("Recruteur créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateRecruteur(@Parameter(name = "id", description = "the evaluation id to updated") @PathVariable("id") Long id, @RequestBody RecruteurDTO recruteurDTO) {
        recruteurDTO.setId(id);
        try {
            var dto = recruteurService.updateRecruteur(recruteurDTO);
            return Response.ok().setPayload(dto).setMessage("Recruteur modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the Recruteur", description = "This endpoint is used to read recruteur, it takes input id recruteur")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getRecruteur(@Parameter(name = "id", description = "the type recruteur id to valid") @PathVariable Long id) {
        try {
            var dto = recruteurService.getRecruteur(id);
            return Response.ok().setPayload(dto).setMessage("Recruteur trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllRecruteur(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = recruteurService.getAllRecruteur(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the recruteur", description = "Delete evaluation, it takes input id recruteur")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecruteur(@PathVariable("id") Long id) {
        try {
            recruteurService.deleteRecruteur(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
