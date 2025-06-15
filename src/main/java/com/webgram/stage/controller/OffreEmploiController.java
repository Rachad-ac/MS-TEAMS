package com.webgram.stage.controller;

import com.webgram.stage.model.OffreEmploiDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.OffreEmploiService;
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
@RequestMapping("offreEmplois")
@RequiredArgsConstructor
@CrossOrigin("*")

public class OffreEmploiController {

    private final OffreEmploiService offreEmploiService;

    @Operation(summary = "Create offreEmploi", description = "this endpoint takes input offreEmploi and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createOffreEmploi(@RequestBody OffreEmploiDTO offreEmploiDTO) {
        try {
            var dto = offreEmploiService.createOffreEmploi(offreEmploiDTO);
            return Response.ok().setPayload(dto).setMessage("OffreEmploi créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateOffreEmploi(@Parameter(name = "id", description = "the offreEmploi id to updated") @PathVariable("id") Long id, @RequestBody OffreEmploiDTO offreEmploiDTO) {
        offreEmploiDTO.setId(id);
        try {
            var dto = offreEmploiService.updateOffreEmploi(offreEmploiDTO);
            return Response.ok().setPayload(dto).setMessage("offreEmploi modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the offreEmploi", description = "This endpoint is used to read offreEmploi, it takes input id offreEmploi")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getOffreEmploi(@Parameter(name = "id", description = "the type offreEmploi id to valid") @PathVariable Long id) {
        try {
            var dto = offreEmploiService.getOffreEmploi(id);
            return Response.ok().setPayload(dto).setMessage("offreEmploi trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllOffreEmplois(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = offreEmploiService.getAllOffreEmplois(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the offreEmploi", description = "Delete offreEmploi, it takes input id offreEmploi")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"), @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"), @ApiResponse(responseCode = "404", description = "Resource access does not exist"), @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOffreEmploi(@PathVariable("id") Long id) {
        try {
            offreEmploiService.deleteOffreEmploi(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
