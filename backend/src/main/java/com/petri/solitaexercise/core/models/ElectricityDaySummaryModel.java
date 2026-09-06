package com.petri.solitaexercise.core.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
@AllArgsConstructor
public class ElectricityDaySummaryModel {
    @NonNull
    private final LocalDate date;

    private final BigDecimal productionAmount;
    private final BigDecimal consumptionAmount;
    private final BigDecimal averagePrice;
    private final Integer longestConsecutiveHoursOfNegativePrice;

    /** NB. Some days have missing data points */
    private final int hoursWithData;
}
