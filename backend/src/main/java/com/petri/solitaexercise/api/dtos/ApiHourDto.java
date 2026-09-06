package com.petri.solitaexercise.api.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.petri.solitaexercise.core.models.ElectricityDataPointModel;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "A single recorded hour")
public record ApiHourDto(
        @Schema(description = "Start of the hour", example = "2024-07-07T11:00:00") LocalDateTime startTime,
        @Schema(description = "Production amount for the hour") BigDecimal productionAmount,
        @Schema(description = "Consumption amount for the hour") BigDecimal consumptionAmount,
        @Schema(description = "Hourly price") BigDecimal hourlyPrice) {
    public static ApiHourDto from(ElectricityDataPointModel model) {
        return new ApiHourDto(
                model.getStartTime(),
                model.getProductionAmount(),
                model.getConsumptionAmount(),
                model.getHourlyPrice());
    }
}
