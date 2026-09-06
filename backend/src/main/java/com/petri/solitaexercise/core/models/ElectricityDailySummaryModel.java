package com.petri.solitaexercise.core.models;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
@AllArgsConstructor
public class ElectricityDailySummaryModel {
    @NonNull
    private final Long id;
    @NonNull
    private final LocalDate date;

    private final BigDecimal productionAmount;
    private final BigDecimal consumptionAmount;
    private final BigDecimal averagePrice;
    private final Integer longestConsecutiveHoursOfNegativePrice;

    public ElectricityDailySummaryModel fromHourlyDataPoints(List<ElectricityDataPointModel> hourlyPoints) {
        /**
         * NB. The data for the day might not be complete (missing hours),
         * thus this model is simply a representation of the data so far.
         * This model could be extended to include information of the amount of stored
         * hours.
         */
        List<BigDecimal> hourlyPrices = hourlyPoints.stream().map(ElectricityDataPointModel::getHourlyPrice).toList();
        BigDecimal totalPrices = hourlyPrices.stream().reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal averagePrice = totalPrices.divide(BigDecimal.valueOf(hourlyPrices.size()), 3, RoundingMode.HALF_UP);
        BigDecimal productionAmount = hourlyPoints.stream().map(ElectricityDataPointModel::getProductionAmount)
                .filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal consumptionAmount = hourlyPoints.stream().map(ElectricityDataPointModel::getConsumptionAmount)
                .filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);

    }
}
