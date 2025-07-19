package com.school.registry.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "schools")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class School {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "School name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "EDRPOU is required")
    @Pattern(regexp = "\\d{8}", message = "EDRPOU must be 8 digits")
    @Column(nullable = false, unique = true)
    private String edrpou;

    @NotBlank(message = "Region is required")
    @Column(nullable = false)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SchoolType type;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
} 