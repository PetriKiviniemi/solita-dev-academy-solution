package com.petri.solitaexercise.api.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.petri.solitaexercise.core.models.ElectricityDaySummaryModel;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Electricity statistics for a single day")
public record ApiDaySummaryDto(
                @Schema(description = "The date of these statistics", example = "2024-07-07") LocalDate date,
                @Schema(description = "Total production for the day") BigDecimal productionAmount,
                @Schema(description = "Total consumption for the day") BigDecimal consumptionAmount,
                @Schema(description = "Average price over the hours of this day") BigDecimal averagePrice,
                @Schema(description = "Longest run of consecutive hours with a negative price", example = "24") Integer longestConsecutiveHoursOfNegativePrice,
                @Schema(description = "Hours stored for this day", example = "24") int hoursWithData) {
        public static ApiDaySummaryDto from(ElectricityDaySummaryModel model) {
                return new ApiDaySummaryDto(
                                model.getDate(),
                                model.getProductionAmount(),
                                model.getConsumptionAmount(),
                                model.getAveragePrice(),
                                model.getLongestConsecutiveHoursOfNegativePrice(),
                                model.getHoursWithData());
        }
}
