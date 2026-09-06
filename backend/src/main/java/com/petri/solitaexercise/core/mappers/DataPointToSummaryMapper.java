package com.petri.solitaexercise.core.mappers;

import com.petri.solitaexercise.core.models.ElectricityDailySummaryModel;
import com.petri.solitaexercise.core.models.ElectricityDataPointModel;

/** TODO:: The data is in hours, we need daily model */
public class DataPointToSummaryMapper {
    public static ElectricityDailySummaryModel toDailySummary(ElectricityDataPointModel model) {
        return ElectricityDailySummaryModel.builder()
                .id(model.getId())
                .date(model.getDate())
                .productionAmount(model.getProductionAmount())
                .consumptionAmount(model.getConsumptionAmount())
                .averagePrice(model.getHourlyPrice())
                .build();
    }
}
