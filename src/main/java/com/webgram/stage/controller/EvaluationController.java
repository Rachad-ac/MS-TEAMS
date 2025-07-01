package com.webgram.stage.controller;

import com.webgram.stage.model.EvaluationDTO;
import com.webgram.stage.model.RecruteurDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.repository.RecruteurRepository;
import com.webgram.stage.services.EvaluationService;
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
@RequestMapping("evaluations")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EvaluationController {

    private final EvaluationService evaluationService;

    @Operation(summary = "Create evaluation", description = "this endpoint takes input evaluation and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createEvaluation(@RequestBody EvaluationDTO evaluationDTO) {
        try {
            var dto = evaluationService.createEvaluation(evaluationDTO);
            return Response.ok().setPayload(dto).setMessage("Evaluation créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateEvaluation(@Parameter(name = "id", description = "the evaluation id to updated") @PathVariable("id") Long id, @RequestBody EvaluationDTO evaluationDTO) {
        evaluationDTO.setId(id);
        try {
            var dto = evaluationService.updateEvaluation(evaluationDTO);
            return Response.ok().setPayload(dto).setMessage("Evaluation modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the Evaluation", description = "This endpoint is used to read evaluation, it takes input id evaluation")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getEvaluation(@Parameter(name = "id", description = "the type evaluation id to valid") @PathVariable Long id) {
        try {
            var dto = evaluationService.getEvaluation(id);
            return Response.ok().setPayload(dto).setMessage("Evaluation trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllEvaluation(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = evaluationService.getAllEvaluation(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the evaluation", description = "Delete evaluation, it takes input id evaluation")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEvaluation(@PathVariable("id") Long id) {
        try {
            evaluationService.deleteEvaluation(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
