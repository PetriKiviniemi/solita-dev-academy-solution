package com.petri.solitaexercise.persistence.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.petri.solitaexercise.persistence.entities.ElectricityDataPointEntity;
import com.petri.solitaexercise.persistence.projections.DaySummaryRow;

public interface ElectricityDataPointRepository
        extends JpaRepository<ElectricityDataPointEntity, Long> {

    /**
     * NB. This query sums the hourly rows into one row per day, sorts and pages
     * that aggregated result.
     * Longest consecutive hours of negative price is calculated as "negative"
     * islands, and hours without data are accounted for.
     * This also rounds the averge price to 3 decimals.
     */
    String SUMMARY_QUERY = """
            WITH negative_islands AS (
                SELECT date,
                       CAST(EXTRACT(EPOCH FROM (starttime AT TIME ZONE 'Europe/Helsinki')) / 3600 AS bigint)
                           - ROW_NUMBER() OVER (PARTITION BY date ORDER BY starttime) AS island
                FROM electricitydata
                WHERE hourlyprice < 0
            ),
            negative_runs AS (
                SELECT date, island, COUNT(*) AS run_length
                FROM negative_islands
                GROUP BY date, island
            ),
            negative_streaks AS (
                SELECT date, MAX(run_length) AS longest_negative_hours
                FROM negative_runs
                GROUP BY date
            ),
            daily AS (
                SELECT date,
                       SUM(consumptionamount) AS consumption_amount,
                       SUM(productionamount) AS production_amount,
                       ROUND(AVG(hourlyprice), 3) AS average_price,
                       CAST(COUNT(*) AS int) AS hours_with_data
                FROM electricitydata
                GROUP BY date
            )
            SELECT d.date AS date,
                   d.production_amount AS production_amount,
                   d.consumption_amount AS consumption_amount,
                   d.average_price AS average_price,
                   d.hours_with_data AS hours_with_data,
                   CAST(COALESCE(s.longest_negative_hours, 0) AS int) AS longest_negative_hours
            FROM daily d
            LEFT JOIN negative_streaks s ON s.date = d.date
            """;

    String COUNT_QUERY = "SELECT COUNT(DISTINCT date) FROM electricitydata";

    @Query(value = SUMMARY_QUERY, countQuery = COUNT_QUERY, nativeQuery = true)
    Page<DaySummaryRow> findDaySummaries(Pageable pageable);

    List<ElectricityDataPointEntity> findByDateOrderByStartTimeAsc(LocalDate date);
}
