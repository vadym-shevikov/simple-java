package com.school.registry.controller;

import com.school.registry.dto.SchoolCreateRequest;
import com.school.registry.dto.SchoolResponse;
import com.school.registry.model.SchoolType;
import com.school.registry.service.SchoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schools")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SchoolController {
    private final SchoolService schoolService;

    @GetMapping
    public ResponseEntity<List<SchoolResponse>> getSchools(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) SchoolType type,
            @RequestParam(required = false) Boolean isActive) {
        List<SchoolResponse> schools = schoolService.getSchools(region, type, isActive);
        return ResponseEntity.ok(schools);
    }

    @PostMapping
    public ResponseEntity<SchoolResponse> createSchool(@Valid @RequestBody SchoolCreateRequest request) {
        SchoolResponse createdSchool = schoolService.createSchool(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdSchool);
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<SchoolResponse> deactivateSchool(@PathVariable Long id) {
        SchoolResponse deactivatedSchool = schoolService.deactivateSchool(id);
        return ResponseEntity.ok(deactivatedSchool);
    }
} 