package com.petri.solitaexercise.api.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.petri.solitaexercise.core.models.ElectricityDayDetailsModel;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Electricity statistics for a single day, with the hours that stand out")
public record ApiDayDetailsDto(
                @Schema(description = "The date of these statistics", example = "2024-07-07") LocalDate date,
                @Schema(description = "Total production for the day") BigDecimal productionAmount,
                @Schema(description = "Total consumption for the day") BigDecimal consumptionAmount,
                @Schema(description = "Average price over the hours of the day") BigDecimal averagePrice,
                @Schema(description = "Hours stored for this day", example = "24") int hoursWithData,
                @Schema(description = "The hour whose consumption was highest relative to its production") ApiHourDto peakConsumptionToProductionHour,
                @Schema(description = "The cheapest hours of the day") List<ApiHourDto> cheapestHours) {
        public static ApiDayDetailsDto from(ElectricityDayDetailsModel model) {
                return new ApiDayDetailsDto(
                                model.getDate(),
                                model.getProductionAmount(),
                                model.getConsumptionAmount(),
                                model.getAveragePrice(),
                                model.getHoursWithData(),
                                model.getPeakConsumptionToProductionHour() == null
                                                ? null
                                                : ApiHourDto.from(model.getPeakConsumptionToProductionHour()),
                                model.getCheapestHours().stream().map(ApiHourDto::from).toList());
        }
}
