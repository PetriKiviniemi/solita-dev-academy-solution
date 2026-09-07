package com.petri.solitaexercise.api;

import java.time.LocalDate;

import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.petri.solitaexercise.api.dtos.ApiDaySummaryDto;
import com.petri.solitaexercise.api.dtos.ApiDayDetailsDto;
import com.petri.solitaexercise.core.models.enums.DaySortFieldEnum;
import com.petri.solitaexercise.core.services.StatisticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ElectricityStatisticsApiImpl implements ElectricityStatisticsApi {

    private final StatisticsService statisticsService;

    @Override
    public PagedModel<ApiDaySummaryDto> fetchDaySummaries(int page, int size, DaySortFieldEnum sortBy,
            Sort.Direction direction) {
        return new PagedModel<>(statisticsService.getDaySummaries(page, size, sortBy, direction)
                .map(ApiDaySummaryDto::from));
    }

    @Override
    public ApiDayDetailsDto fetchDayDetails(LocalDate date, int cheapestHours) {
        return statisticsService.getDayDetails(date, cheapestHours)
                .map(ApiDayDetailsDto::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No electricity data recorded for " + date));
    }
}
