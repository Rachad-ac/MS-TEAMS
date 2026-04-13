package com.webgram.stage.services.Impl;

import com.querydsl.core.BooleanBuilder;
import com.webgram.stage.entity.QEmployeEntity;
import com.webgram.stage.mapper.EmployeMapper;
import com.webgram.stage.model.EmployeDTO;
import com.webgram.stage.repository.EmployeRepository;
import com.webgram.stage.services.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeServiceImpl implements EmployeService {

    private final EmployeRepository employeRepository;
    private final EmployeMapper recruteurMapper;

    @Override
    public EmployeDTO createEmploye(EmployeDTO employeDTO) {
        var entity = recruteurMapper.asEntity(employeDTO);
        var entitySave = employeRepository.save(entity);
        return recruteurMapper.asDto(entitySave);
    }

    @Override
    public EmployeDTO updateEmploye(EmployeDTO employeDTO) {
        var entityUpdate = recruteurMapper.asEntity(employeDTO);
        var updatedEntity = employeRepository.save(entityUpdate);
        return recruteurMapper.asDto(updatedEntity);
    }

    @Override
    public void deleteEmploye(Long id) {
        if (!employeRepository.existsById(id)) {
            throw new RuntimeException("Evaluation not found");
        }
        employeRepository.deleteById(id);
    }

    @Override
    public EmployeDTO getEmploye(Long id) {
        var entity = employeRepository.findById(id);
        return recruteurMapper.asDto(entity.get());
    }

    @Override
    public Page<EmployeDTO> getAllEmploye(Map<String, String> searchParams, Pageable pageable) {
        var booleanBuilder = new BooleanBuilder();
        buildSearch(searchParams, booleanBuilder);
        return employeRepository.findAll(booleanBuilder, pageable)
                .map(recruteurMapper::asDto);
    }

    private void buildSearch(Map<String, String> searchParams, BooleanBuilder booleanBuilder) {
        if (Objects.nonNull(searchParams)) {
            var qEntity = QEmployeEntity.employeEntity;
            if (searchParams.containsKey("nom"))
                booleanBuilder.and(qEntity.nom.containsIgnoreCase(searchParams.get("nom")));
            if (searchParams.containsKey("prenom"))
                booleanBuilder.and(qEntity.prenom.containsIgnoreCase(searchParams.get("prenom")));
            if (searchParams.containsKey("email"))
                booleanBuilder.and(qEntity.email.containsIgnoreCase(searchParams.get("email")));
            if (searchParams.containsKey("telephone"))
                booleanBuilder.and(qEntity.telephone.containsIgnoreCase(searchParams.get("telephone")));
            if (searchParams.containsKey("poste"))
                booleanBuilder.and(qEntity.poste.containsIgnoreCase(searchParams.get("poste")));
            if (searchParams.containsKey("role"))
                booleanBuilder.and(qEntity.role.containsIgnoreCase(searchParams.get("role")));

            String departement = searchParams.get("departement");
            if (departement != null && !departement.isEmpty()) {
                booleanBuilder.and(qEntity.departement.stringValue().lower().containsIgnoreCase(departement.toLowerCase()));
            }
            String sexe = searchParams.get("sexe");
            if (sexe != null && !sexe.isEmpty()) {
                booleanBuilder.and(qEntity.sexe.stringValue().lower().containsIgnoreCase(sexe.toLowerCase()));
            }

            if (searchParams.containsKey("dateEmbauche")){
                Date date = null;
                try {
                    date = new SimpleDateFormat("yyyy-MM-dd").parse(searchParams.get("dateEmbauche"));
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
                booleanBuilder.and(qEntity.dateEmbauche.eq(date));
            }

        }
    }
}
