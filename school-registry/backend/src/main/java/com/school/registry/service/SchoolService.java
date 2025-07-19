package com.school.registry.service;

import com.school.registry.dto.SchoolCreateRequest;
import com.school.registry.dto.SchoolResponse;
import com.school.registry.model.School;
import com.school.registry.model.SchoolType;
import com.school.registry.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;

    public List<SchoolResponse> getSchools(String region, SchoolType type, Boolean isActive) {
        List<School> schools = schoolRepository.findByFilters(region, type, isActive);
        return schools.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public SchoolResponse createSchool(SchoolCreateRequest request) {
        School school = new School();
        school.setName(request.getName());
        school.setEdrpou(request.getEdrpou());
        school.setRegion(request.getRegion());
        school.setType(request.getType());
        school.setIsActive(true);
        
        School savedSchool = schoolRepository.save(school);
        return mapToResponse(savedSchool);
    }

    @Transactional
    public SchoolResponse deactivateSchool(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School not found with id: " + id));
        
        school.setIsActive(false);
        School savedSchool = schoolRepository.save(school);
        return mapToResponse(savedSchool);
    }

    private SchoolResponse mapToResponse(School school) {
        return new SchoolResponse(
                school.getId(),
                school.getName(),
                school.getEdrpou(),
                school.getRegion(),
                school.getType(),
                school.getIsActive()
        );
    }
} 