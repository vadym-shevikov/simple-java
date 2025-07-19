package com.school.registry.dto;

import com.school.registry.model.SchoolType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolResponse {
    private Long id;
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
    private Boolean isActive;
} 