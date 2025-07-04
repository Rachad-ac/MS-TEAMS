package com.webgram.stage.controller;
import com.webgram.stage.model.ModuleDTO;
import com.webgram.stage.model.Response;
import com.webgram.stage.services.ModuleService;
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
@RequestMapping("/modules")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ModuleController {

    private final ModuleService moduleService;

    @Operation(summary = "Create Module", description = "This endpoint takes input Module and saves it")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Module successfully created"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Response<Object> createModule(@RequestBody ModuleDTO moduleDTO) {
        try {
            var dto = moduleService.createModule(moduleDTO);
            return Response.ok().setPayload(dto).setMessage("Module créé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> updateModule(
            @Parameter(name = "id", description = "ID du Module à modifier") @PathVariable Long id,
            @RequestBody ModuleDTO moduleDTO
    ) {
        try {
            moduleDTO.setId(id);
            var dto = moduleService.updateModule(moduleDTO);
            return Response.ok().setPayload(dto).setMessage("Module modifié");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get Module by ID", description = "Récupère un module par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success"),
            @ApiResponse(responseCode = "404", description = "module not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getModule(@PathVariable Long id) {
        try {
            var dto = moduleService.getModule(id);
            return Response.ok().setPayload(dto).setMessage("Module trouvé");
        } catch (Exception ex) {
            return Response.badRequest().setMessage(ex.getMessage());
        }
    }

    @Operation(summary = "Get all Modules", description = "Retourne tous les modules filtrés et paginés")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success")
    })
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Response<Object> getAllModules(@RequestParam Map<String, String> searchParams, Pageable pageable) {
        var page = moduleService.getAllModules(searchParams, pageable);
        Response.PageMetadata metadata = Response.PageMetadata.builder()
                .number(page.getNumber())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .totalPages(page.getTotalPages())
                .build();
        return Response.ok().setPayload(page.getContent()).setMetadata(metadata);
    }

    // @Operation(summary = "Get Modules by Formation", description = "Retourne les modules d'une formation, paginés et ordonnés")
    //  @ApiResponses(value = {
    //         @ApiResponse(responseCode = "200", description = "Success"),
    //       @ApiResponse(responseCode = "404", description = "Formation not found")
    // })
    //  @GetMapping("/formation/{formationId}")
    // @ResponseStatus(HttpStatus.OK)
    // public Response<Object> getModulesByFormation(
    //      @PathVariable Long formationId,
    //     Pageable pageable
    // ) {
    // try {
    //     var page = moduleService.getModulesByFormation(formationId, pageable);
    //   Response.PageMetadata metadata = Response.PageMetadata.builder()
    //  .number(page.getNumber())
    //    .totalElements(page.getTotalElements())
    //    .size(page.getSize())
    //         .totalPages(page.getTotalPages())
            //          .build();
    //   return Response.ok()
    //            .setPayload(page.getContent())
    //           .setMetadata(metadata);
    //    } catch (Exception ex) {
        //    return Response.badRequest().setMessage(ex.getMessage());
// }
//   }

    @Operation(summary = "Delete Module", description = "Supprime un Module par son ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Module supprimé"),
            @ApiResponse(responseCode = "404", description = "Module not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteModule(@PathVariable Long id) {
        try {
            moduleService.deleteModule(id);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression : " + e.getMessage(), e);
        }
    }
}
