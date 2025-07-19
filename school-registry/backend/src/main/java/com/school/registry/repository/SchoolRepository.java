package com.school.registry.repository;

import com.school.registry.model.School;
import com.school.registry.model.SchoolType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchoolRepository extends JpaRepository<School, Long> {
    
    @Query("SELECT s FROM School s WHERE " +
           "(:region IS NULL OR s.region = :region) AND " +
           "(:type IS NULL OR s.type = :type) AND " +
           "(:isActive IS NULL OR s.isActive = :isActive)")
    List<School> findByFilters(@Param("region") String region,
                               @Param("type") SchoolType type,
                               @Param("isActive") Boolean isActive);
} 