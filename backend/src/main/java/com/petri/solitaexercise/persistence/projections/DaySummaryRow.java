package com.petri.solitaexercise.persistence.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.petri.solitaexercise.core.models.ElectricityDaySummaryModel;

import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class DaySummaryRow {
    private final LocalDate date;
    private final BigDecimal productionAmount;
    private final BigDecimal consumptionAmount;
    private final BigDecimal averagePrice;
    private final Integer hoursWithData;
    private final Integer longestConsecutiveHoursOfNegativePrice;

    public ElectricityDaySummaryModel toDomain() {
        return ElectricityDaySummaryModel.builder()
                .date(date)
                .productionAmount(productionAmount)
                .consumptionAmount(consumptionAmount)
                .averagePrice(averagePrice)
                .longestConsecutiveHoursOfNegativePrice(longestConsecutiveHoursOfNegativePrice)
                .hoursWithData(hoursWithData)
                .build();
    }
}
