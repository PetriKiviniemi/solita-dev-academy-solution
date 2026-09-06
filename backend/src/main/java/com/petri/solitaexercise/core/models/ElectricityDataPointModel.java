package com.petri.solitaexercise.core.models;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
@Builder
@AllArgsConstructor
public class ElectricityDataPointModel {
    @NonNull
    private final Long id;
    @NonNull
    private final LocalDate date;
    @NonNull
    private final LocalDateTime startTime;
    private final BigDecimal productionAmount;
    private final BigDecimal consumptionAmount;
    private final BigDecimal hourlyPrice;

    public BigDecimal hourlyCost() {
        return this.consumptionAmount.multiply(this.hourlyPrice).setScale(5, RoundingMode.HALF_UP);
    }
}
