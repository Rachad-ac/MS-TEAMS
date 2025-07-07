package com.webgram.stage.controller;

import com.webgram.stage.model.EmployeDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.EmployeService;
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
@RequestMapping("employe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmployeController {

    private final EmployeService employeService;

    @Operation(summary = "Create employe", description = "this endpoint takes input employe and saves it")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createEmploye(@RequestBody EmployeDTO employeDTO) {
        try {
            var dto = employeService.createEmploye(employeDTO);
            return Response.ok().setPayload(dto).setMessage("Employe créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateEmploye(@Parameter(name = "id", description = "the employe id to updated") @PathVariable("id") Long id, @RequestBody EmployeDTO employeDTO) {
        employeDTO.setId(id);
        try {
            var dto = employeService.updateEmploye(employeDTO);
            return Response.ok().setPayload(dto).setMessage("Employe modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }

    }

    @Operation(summary = "Read the employe", description = "This endpoint is used to read employe, it takes input id employe")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getEmploye(@Parameter(name = "id", description = "the type recruteur id to valid") @PathVariable Long id) {
        try {
            var dto = employeService.getEmploye(id);
            return Response.ok().setPayload(dto).setMessage("Employe trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Read all Budget", description = "It takes input param of the page and returns this list related")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllEmploye(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = employeService.getAllEmploye(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder().number(page.getNumber()).totalElements(page.getTotalElements()).size(page.getSize()).totalPages(page.getTotalPages()).build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }


    @Operation(summary = "delete the employe", description = "Delete employe, it takes input id employe")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Request sent by the client was syntactically incorrect"),
            @ApiResponse(responseCode = "404", description = "Resource access does not exist"),
            @ApiResponse(responseCode = "500", description = "Internal server error during request processing")})
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmploye(@PathVariable("id") Long id) {
        try {
            employeService.deleteEmploye(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
