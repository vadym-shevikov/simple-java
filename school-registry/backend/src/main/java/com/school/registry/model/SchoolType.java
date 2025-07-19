package com.school.registry.model;

public enum SchoolType {
    GYMNASIUM("Гімназія"),
    LYCEUM("Ліцей"),
    GENERAL_SECONDARY("ЗЗСО");

    private final String displayName;

    SchoolType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
} 