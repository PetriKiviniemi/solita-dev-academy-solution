package com.petri.solitaexercise.persistence.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.petri.solitaexercise.core.models.ElectricityDataPointModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "electricitydata")
public class ElectricityDataPointEntity {
    @Id
    private Long id;
    @NotNull
    @Column(name = "date")
    private LocalDate date;
    @NotNull
    @Column(name = "starttime")
    private LocalDateTime startTime;
    @Column(name = "productionamount", precision = 11, scale = 5)
    private BigDecimal productionAmount;
    @Column(name = "consumptionamount", precision = 11, scale = 3)
    private BigDecimal consumptionAmount;
    @Column(name = "hourlyprice", precision = 6, scale = 3)
    private BigDecimal hourlyPrice;

    public ElectricityDataPointModel toDomain() {
        return ElectricityDataPointModel.builder()
                .id(this.id)
                .date(this.date)
                .startTime(this.startTime)
                .productionAmount(this.productionAmount)
                .consumptionAmount(this.consumptionAmount)
                .hourlyPrice(this.hourlyPrice)
                .build();
    }
}
