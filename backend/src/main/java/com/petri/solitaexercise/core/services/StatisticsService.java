package com.petri.solitaexercise.core.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.petri.solitaexercise.core.models.ElectricityDailySummaryModel;
import com.petri.solitaexercise.core.models.ElectricityDataPointModel;
import com.petri.solitaexercise.persistence.entities.ElectricityDataPointEntity;
import com.petri.solitaexercise.persistence.repositories.ElectricityDataPointRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final ElectricityDataPointRepository electricityDataPointRepository;

    Page<ElectricityDataPointModel> getDailyStatistics(Pageable pageable) {
        List<LocalDate> dates = electricityDataPointRepository.findDistinctDates(pageable);
        if (dates.isEmpty()) {
            return Page.empty(pageable);
        }
        Map<LocalDate, List<ElectricityDataPointModel>> byDate = electricityDataPointRepository.findByDates(dates)
                .stream()
                .map(ElectricityDataPointEntity::toDomain)
                .collect(Collectors.groupingBy(ElectricityDataPointModel::getDate));
    }

}
