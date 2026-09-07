package com.petri.solitaexercise.core.factories;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import com.petri.solitaexercise.core.models.ElectricityDataPointModel;
import com.petri.solitaexercise.core.models.ElectricityDayDetailsModel;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public final class DayDetailsFactory {

    private static final int RATIO_SCALE = 6;

    public static ElectricityDayDetailsModel from(LocalDate date, List<ElectricityDataPointModel> hours,
            int cheapestHourCount) {

        BigDecimal production = null;
        BigDecimal consumption = null;
        BigDecimal totalPrice = BigDecimal.ZERO;
        int pricedHours = 0;

        for (ElectricityDataPointModel hour : hours) {
            if (hour.getProductionAmount() != null) {
                production = add(production, hour.getProductionAmount());
            }
            if (hour.getConsumptionAmount() != null) {
                consumption = add(consumption, hour.getConsumptionAmount());
            }
            if (hour.getHourlyPrice() != null) {
                totalPrice = totalPrice.add(hour.getHourlyPrice());
                pricedHours++;
            }
        }

        BigDecimal averagePrice = pricedHours == 0
                ? null
                : totalPrice.divide(BigDecimal.valueOf(pricedHours), 3, RoundingMode.HALF_UP);

        return ElectricityDayDetailsModel.builder()
                .date(date)
                .productionAmount(production)
                .consumptionAmount(consumption)
                .averagePrice(averagePrice)
                .hoursWithData(hours.size())
                .peakConsumptionToProductionHour(peakConsumptionToProductionHour(hours))
                .cheapestHours(cheapestHours(hours, cheapestHourCount))
                .hours(hours)
                .build();
    }

    private static BigDecimal add(BigDecimal total, BigDecimal value) {
        return total == null ? value : total.add(value);
    }

    private static ElectricityDataPointModel peakConsumptionToProductionHour(List<ElectricityDataPointModel> hours) {
        return hours.stream()
                .filter(hour -> hour.getConsumptionAmount() != null
                        && hour.getProductionAmount() != null
                        && hour.getProductionAmount().signum() != 0)
                .max(Comparator.comparing(DayDetailsFactory::consumptionToProductionRatio)
                        .thenComparing(ElectricityDataPointModel::getStartTime, Comparator.reverseOrder()))
                .orElse(null);
    }

    private static BigDecimal consumptionToProductionRatio(ElectricityDataPointModel hour) {
        return hour.getConsumptionAmount().divide(hour.getProductionAmount(), RATIO_SCALE, RoundingMode.HALF_UP);
    }

    private static List<ElectricityDataPointModel> cheapestHours(List<ElectricityDataPointModel> hours, int count) {
        return hours.stream()
                .filter(hour -> hour.getHourlyPrice() != null)
                .sorted(Comparator.comparing(ElectricityDataPointModel::getHourlyPrice)
                        .thenComparing(ElectricityDataPointModel::getStartTime))
                .limit(count)
                .toList();
    }
}
