package com.webgram.stage.controller;

import com.webgram.stage.model.Response;
import com.webgram.stage.model.ResultatDTO;
import com.webgram.stage.services.ResultatService;
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
@RequestMapping("resultats")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ResultatController {

    private final ResultatService resultatService;

    @Operation(summary = "Create resultat", description = "this endpoint takes input presence and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createResultat(@RequestBody ResultatDTO resultatDTO) {
        try {
            var dto = resultatService.createResultat(resultatDTO);
            return Response.ok().setPayload(dto).setMessage("Resultat créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateResultat(@Parameter(name = "id", description = "the resultat id to updated") @PathVariable("id") Long id, @RequestBody ResultatDTO resultatDTO) {
        resultatDTO.setId(id);
        try {
            var dto = resultatService.updateResultat(resultatDTO);
            return Response.ok().setPayload(dto).setMessage("Resultat modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the resultat", description = "This endpoint is used to read resultat, it takes input id resultat")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getResultat(@Parameter(name = "id", description = "the type resultat id to valid") @PathVariable Long id) {
        try {
            var dto = resultatService.getResultat(id);
            return Response.ok().setPayload(dto).setMessage("Resultat trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllResultat(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = resultatService.getAllResultat(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the resultat", description = "Delete resultat, it takes input id resultat")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResultat(@PathVariable("id") Long id) {
        try {
            resultatService.deleteResultat(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
