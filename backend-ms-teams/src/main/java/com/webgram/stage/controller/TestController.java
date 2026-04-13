package com.webgram.stage.controller;
import com.webgram.stage.model.Response;
import com.webgram.stage.model.TestDTO;
import com.webgram.stage.services.TestService;
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
@RequestMapping("/tests")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TestController {

    private final TestService testService;

    @Operation(summary = "Create Test", description = "This endpoint takes input Test and saves it")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Test successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createTest(@RequestBody TestDTO testDTO) {
        try {
            var dto = testService.createTest(testDTO);
            return Response.ok().setPayload(dto).setMessage("Test créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateTest(
            @Parameter(name = "id", description = "ID du Test à modifier") @PathVariable Long id,
            @RequestBody TestDTO testDTO
    ) {
        try {
            testDTO.setId(id);
            var dto = testService.updateTest(testDTO);
            return Response.ok().setPayload(dto).setMessage("Test modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get Test by ID", description = "Récupère un Test par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "Test not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getTest(@PathVariable Long id) {
        try {
            var dto = testService.getTest(id);
            return Response.ok().setPayload(dto).setMessage("Test trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get all Tests", description = "Retourne tous les Tests filtrés et paginés")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success")
    })
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllTests(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = testService.getAllTests(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder()
                .number(page.getNumber())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .totalPages(page.getTotalPages())
                .build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }

    @Operation(summary = "Delete Test", description = "Supprime un test par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Test supprimé"),
            @ApiResponse(responseCode = "404", description = "Test not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTest(@PathVariable Long id) {
        try {
            testService.deleteTest(id);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression : " + e.getMessage(), e);
        }
    }
}
