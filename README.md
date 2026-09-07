# Electricity Statistics

A solution for the Solita Dev Academy exercise.

The application is fully deployed to the cloud and can be visited at:

https://solita-dev-academy-solution.vercel.app/

Beware of the cold start. Loading can take a while when first navigating to the page.

## Features

### Daily statistics

The application provides a paginated and sortable list of daily electricity statistics.

For each day, the following information is displayed:

- Total electricity consumption
- Total electricity production
- Average electricity price
- Longest consecutive period in hours when the electricity price was negative

The daily statistics list supports:

- Pagination (virtualized list on FE)
- Ordering by column

### Single-day view

The single-day view provides more detailed statistics for an individual day:

- Total electricity consumption
- Total electricity production
- Average electricity price
- Hour with the highest electricity consumption compared to production
- Cheapest electricity hours, displayed as a graph
- A chip indicating the cheapest hour

## Deployment

The backend is packaged as a Docker image and deployed to Google Cloud Platform.

The frontend is deployed to Vercel.

For a more complete cloud deployment, the supplied database was deployed to Supabase instead of keeping it inside the service deployed to GCP. The application was designed so that the database can be treated as a live database, with data potentially changing frequently.

## Architecture

### Backend

The backend is implemented using Java and Spring Boot and packaged into a Docker image for easier development and deployment.

The backend follows a three-layer architecture that separates:

- Persistence
- Business logic
- API

### Frontend

The frontend is implemented using React and TypeScript.

It follows a DDD-ish approach, with the domain model separated from the UI model.

The project uses several dependencies on both the frontend and backend. Some of the notable frontend dependencies are:

- MUI
- TanStack React Query
- TanStack React Virtual
- Hey-api OpenAPI to TS generator

## Build
Prerequisites
Docker
JDK 21
Node.js 20+

From the project root:

```
cd backend
docker compose up -d --build
```

```
cd ../frontend
npm install
npm run dev
```

The frontend will be available at:

`http://localhost:5173`


The frontend must be launched on port `5173`, as this is currently the only port allowed by the backend's CORS configuration.

## Challenges and design decisions

One of the biggest challenges was deciding how to perform the grouping, aggregation, and sorting required for the daily summaries.

If I had used JPA for these operations, PostgreSQL would have had to send all rows from the electricity table to Java before the calculations could be performed. Instead, I moved the data aggregation for the required columns directly into a single SQL query.

I also considered a naive approach of creating a summary table that would be calculated once when the backend instance starts. However, this would lose its performance benefits if the data changes frequently.

A benchmark comparing the two approaches showed approximately (over local network):

- Java-side calculations: 460 ms  
- SQL-side calculations: 80 ms  

The larger gain is that the SQL approach avoids transferring megabytes of data between the database and the application and thus does not increase the cloud bill as much.

I do wonder whether there is a better approach that would allow JPA to be used directly for these calculations, if that even makes sense for this use case. One downside of using manual SQL query, is that the query is not automatically validated against the application entities in the same way as a JPA-based approach would be.

Another challenge I faced was handling the electricity data correctly because the dataset contains daylight saving time changes, as well as missing rows and values.

Casting the timestamp into epoch time with proper time zone solved the daylight saving time issue:

```
CAST(
    EXTRACT(
        EPOCH FROM (starttime AT TIME ZONE 'Europe/Helsinki')
    ) / 3600 AS bigint
)
```

For missing data points, I decided to store the number of recorded hours per day. The UI then displays a greyed-out element when a date is missing some values (and shows a tooltip explanation).

When sorting by column, rows containing null values are placed at the bottom of the sorted collection.

## Features left out
### Searching and filtering  

Since I decided to move away from using JPA and instead perform the calculations closer to the database using SQL, implementing searching and filtering would have required making the SQL query more complex.  
This would have been doable with AI, but with the limited time available for the exercise, I decided not to spend time implementing something that I would not have had enough time to fully understand and validate myself.  

### Additional graph visualizations

For example, creating daily summary comparisons from a monthly perspective would have required implementing from-to date filtering for the data.

### E2E tests 

These were left out due to the limited time available for the exercise.

For example, I could have implemented Playwright tests that navigate to a specific day's endpoint and verify that the data displayed in the UI matches the corresponding data in the database.

Unit tests were also left out for the same reason.

## Limitations
- Supabase is currently running PostgreSQL 17, while the backend docker-compose configuration uses PostgreSQL 16. This does not currently cause any issues, but it is something to be aware of.
- All application properties are currently kept in a single application.properties file. These should ideally be split into application-dev.properties and application-prod.properties.
- Since filtering has not been implemented in the SQL query, the daily summary list does not currently support filtering by a from-to date range. This also results in a less-than-ideal UX when the user wants to examine a specific period.

## AI usage  

AI was used in some parts of the backend implementation, in providing perspective on difficult design decisions, and in the frontend UI design and implementation. I used Claude Opus 5 as the model.

All architectural and design decisions were ultimately made by me. The AI agent was particularly useful for challenging my assumptions, exploring different approaches, and writing parts of the code according to the architectural and implementation style I had described.

I clearly laid out the architecture and implementation style I wanted the model to follow, and I frequently reviewed and corrected its logic and implementation when it did not match the intended solution.