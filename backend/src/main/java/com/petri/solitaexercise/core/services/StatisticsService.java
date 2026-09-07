package com.petri.solitaexercise.core.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petri.solitaexercise.core.factories.DayDetailsFactory;
import com.petri.solitaexercise.core.models.enums.DaySortFieldEnum;
import com.petri.solitaexercise.core.models.ElectricityDaySummaryModel;
import com.petri.solitaexercise.core.models.ElectricityDataPointModel;
import com.petri.solitaexercise.core.models.ElectricityDayDetailsModel;
import com.petri.solitaexercise.persistence.entities.ElectricityDataPointEntity;
import com.petri.solitaexercise.persistence.projections.DaySummaryRow;
import com.petri.solitaexercise.persistence.repositories.DaySummarySort;
import com.petri.solitaexercise.persistence.repositories.ElectricityDataPointRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    public static final int MAX_PAGE_SIZE = 30;

    private final ElectricityDataPointRepository electricityDataPointRepository;

    @Transactional(readOnly = true)
    public Page<ElectricityDaySummaryModel> getDaySummaries(int page, int size, DaySortFieldEnum sortBy,
            Sort.Direction direction) {
        Page<DaySummaryRow> rows = electricityDataPointRepository
                .findDaySummaries(toPageable(page, size, sortBy, direction));

        return rows.map(DaySummaryRow::toDomain);
    }

    @Transactional(readOnly = true)
    public Optional<ElectricityDayDetailsModel> getDayDetails(LocalDate date, int cheapestHourCount) {
        List<ElectricityDataPointModel> hours = electricityDataPointRepository.findByDateOrderByStartTimeAsc(date)
                .stream()
                .map(ElectricityDataPointEntity::toDomain)
                .toList();

        if (hours.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(DayDetailsFactory.from(date, hours, cheapestHourCount));
    }

    private Pageable toPageable(int page, int size, DaySortFieldEnum sortBy, Sort.Direction direction) {
        return PageRequest.of(page, Math.min(size, MAX_PAGE_SIZE), DaySummarySort.toDatabaseSort(sortBy, direction));
    }
}
