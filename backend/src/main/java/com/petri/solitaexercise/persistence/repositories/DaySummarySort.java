package com.petri.solitaexercise.persistence.repositories;

import org.springframework.data.domain.Sort;

import com.petri.solitaexercise.core.models.enums.DaySortFieldEnum;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public final class DaySummarySort {

    private static final Sort NEWEST_FIRST = Sort.by(Sort.Order.desc(columnOf(DaySortFieldEnum.DATE)));

    public static Sort toDatabaseSort(DaySortFieldEnum field, Sort.Direction direction) {
        return Sort.by(Sort.Order.by(columnOf(field)).with(direction).nullsLast()).and(NEWEST_FIRST);
    }

    private static String columnOf(DaySortFieldEnum field) {
        return switch (field) {
            case DATE -> "date";
            case CONSUMPTION_AMOUNT -> "consumption_amount";
            case PRODUCTION_AMOUNT -> "production_amount";
            case AVERAGE_PRICE -> "average_price";
            case LONGEST_NEGATIVE_PRICE_STREAK -> "longest_negative_hours";
            case HOURS_WITH_DATA -> "hours_with_data";
        };
    }
}
