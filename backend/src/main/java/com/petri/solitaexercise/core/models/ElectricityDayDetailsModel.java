package com.petri.solitaexercise.core.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
public class ElectricityDayDetailsModel {

    @NonNull
    private final LocalDate date;
    private final BigDecimal productionAmount;
    private final BigDecimal consumptionAmount;
    private final BigDecimal averagePrice;
    private final int hoursWithData;
    private final ElectricityDataPointModel peakConsumptionToProductionHour;
    private final List<ElectricityDataPointModel> cheapestHours;
}
