package com.webgram.stage.controller;

import com.webgram.stage.model.CandidatureDTO;
import com.webgram.stage.services.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {
    @Autowired
    private CandidatureService candidatureService;

    @PostMapping
    public CandidatureDTO create(@RequestBody CandidatureDTO dto) {
        return candidatureService.save(dto);
    }

    @PutMapping("/{id}")
    public CandidatureDTO update(@PathVariable Long id, @RequestBody CandidatureDTO dto) {
        return candidatureService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        candidatureService.delete(id);
    }

    @GetMapping("/{id}")
    public CandidatureDTO getById(@PathVariable Long id) {
        return candidatureService.getById(id);
    }

    @GetMapping
    public List<CandidatureDTO> getAll() {
        return candidatureService.getAll();
    }
} 