package com.school.registry.dto;

import com.school.registry.model.SchoolType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SchoolCreateRequest {
    @NotBlank(message = "School name is required")
    private String name;

    @NotBlank(message = "EDRPOU is required")
    @Pattern(regexp = "\\d{8}", message = "EDRPOU must be 8 digits")
    private String edrpou;

    @NotBlank(message = "Region is required")
    private String region;

    @NotNull(message = "School type is required")
    private SchoolType type;
} 