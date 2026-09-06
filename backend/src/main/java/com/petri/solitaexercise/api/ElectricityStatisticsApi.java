package com.petri.solitaexercise.api;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import java.time.LocalDate;

import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.petri.solitaexercise.api.dtos.ApiDaySummaryDto;
import com.petri.solitaexercise.api.dtos.ApiDayDetailsDto;
import com.petri.solitaexercise.core.models.DaySortField;
import com.petri.solitaexercise.core.services.StatisticsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@RequestMapping("/statistics")
@Tag(name = "Statistics", description = "Electricity statistics endpoints")
public interface ElectricityStatisticsApi {

        @Operation(summary = "Fetch the electricity statistics summary of the day", description = """
                        The daily data is aggregated from hourly data.""")
        @ApiResponse(responseCode = "200", description = "Page of daily electricity statistics", content = @Content(array = @ArraySchema(schema = @Schema(implementation = ApiDaySummaryDto.class))))
        @ApiResponse(responseCode = "400", description = "Unknown sort field or invalid page format", content = @Content)
        @GetMapping(value = "/days", produces = APPLICATION_JSON_VALUE)
        @ResponseStatus(HttpStatus.OK)
        PagedModel<ApiDaySummaryDto> fetchDaySummaries(
                        @RequestParam(defaultValue = "0") @Min(value = 0) int page,
                        @RequestParam(defaultValue = "20") @Min(value = 1) @Max(value = StatisticsService.MAX_PAGE_SIZE) int size,
                        @RequestParam(defaultValue = "DATE") @NotNull DaySortField sortBy,
                        @RequestParam(defaultValue = "DESC") @NotNull Sort.Direction direction);

        @Operation(summary = "Fetch the electricity statistics of a single day", description = """
                        Electricity statistics for a single day.""")
        @ApiResponse(responseCode = "200", description = "Electricity statistics of the day", content = @Content(schema = @Schema(implementation = ApiDayDetailsDto.class)))
        @ApiResponse(responseCode = "404", description = "No data recorded for the day", content = @Content)
        @GetMapping(value = "/days/{date}", produces = APPLICATION_JSON_VALUE)
        @ResponseStatus(HttpStatus.OK)
        ApiDayDetailsDto fetchDayDetails(
                        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
                        @RequestParam(defaultValue = "3") @Min(value = 1) @Max(value = 24) int cheapestHours);
}
