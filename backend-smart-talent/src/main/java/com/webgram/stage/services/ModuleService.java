package com.webgram.stage.services;
import com.webgram.stage.model.ModuleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ModuleService {

	ModuleDTO createModule(ModuleDTO moduleDTO);

	ModuleDTO updateModule(ModuleDTO moduleDTO);

	void deleteModule(Long id);

	ModuleDTO getModule(Long id);

	Page<ModuleDTO> getAllModules(Map<String, String> searchParams, Pageable pageable);

	// Nouvelle méthode pour récupérer modules par formation
	//Page<ModuleDTO> getModulesByFormation(Long formationId, Pageable pageable);

	// Nouvelle méthode pour réordonner les modules
	//void reorderModules(Long formationId, List<Long> moduleIdsInOrder);
}
