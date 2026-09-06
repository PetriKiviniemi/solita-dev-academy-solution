package com.petri.solitaexercise.persistence.repositories;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.petri.solitaexercise.persistence.entities.ElectricityDataPointEntity;

public interface ElectricityDataPointRepository extends JpaRepository<ElectricityDataPointEntity, Long> {
    @Query("SELECT DISTINCT e.date FROM ElectricityDataEntity e ORDER BY e.date")
    List<LocalDate> findDistinctDates(Pageable pageable);

    @Query("SELECT COUNT(DISTINCT e.date) FROM ElectricityDataEntity e")
    long countDistinctDates();

    List<ElectricityDataPointEntity> findByDates(List<LocalDate> dates);

    List<ElectricityDataPointEntity> findByDateInOrderByStartTimeAsc(Collection<LocalDate> dates);
}
