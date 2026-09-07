FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
LABEL authors="Petri Kiviniemi"

COPY pom.xml .
# Cache dependencies to speed up build time
RUN mvn -B dependency:go-offline

COPY src ./src
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

RUN adduser -S -u 10001 spring
USER spring

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
