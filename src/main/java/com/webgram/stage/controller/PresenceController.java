package com.webgram.stage.controller;

import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.PresenceDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.PresenceService;
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
@RequestMapping("presences")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PresenceController {

    private final PresenceService presenceService;

    @Operation(summary = "Create presence", description = "this endpoint takes input presence and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createPresence(@RequestBody PresenceDTO presenceDTO) {
        try {
            var dto = presenceService.createPresence(presenceDTO);
            return Response.ok().setPayload(dto).setMessage("Presence créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updatePresence(@Parameter(name = "id", description = "the presence id to updated") @PathVariable("id") Long id, @RequestBody PresenceDTO presenceDTO) {
        presenceDTO.setId(id);
        try {
            var dto = presenceService.updatePresence(presenceDTO);
            return Response.ok().setPayload(dto).setMessage("Presence modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the presence", description = "This endpoint is used to read presence, it takes input id presence")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getPresence(@Parameter(name = "id", description = "the type presence id to valid") @PathVariable Long id) {
        try {
            var dto = presenceService.getPresence(id);
            return Response.ok().setPayload(dto).setMessage("Presence trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllPresence(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = presenceService.getAllPresence(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the presence", description = "Delete presence, it takes input id presence")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePresence(@PathVariable("id") Long id) {
        try {
            presenceService.deletePresence(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
