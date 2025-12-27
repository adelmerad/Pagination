# Pagination
Build IT
---

## Summary

Pagination is a basic backend and system design concept used to efficiently manage large datasets. This project approaches pagination not as a UI feature, but as a data-access strategy with real effects on performance, consistency, and scalability.

## What Is Pagination?

Pagination is a technique used to split a large dataset into smaller, manageable chunks instead of returning all data at once. Rather than sending thousands or millions of records in a single response, the system returns a limited set of data with each request. Pagination serves mainly as a:

* Performance improvement
* Resource management strategy
* Scalability requirement

It exists to make systems usable and reliable at scale.

---

## Why Pagination Is Necessary

### Without Pagination

* APIs return very large responses
* Databases perform expensive full scans
* Memory consumption increases
* Network bandwidth is wasted
* Response times grow
* Systems fail to scale

### With Pagination

* Smaller, faster responses
* Controlled database queries
* Reduced memory usage
* Predictable performance
* Scalable systems

However, pagination is not optional in real-world applications.

---

## Pagination Strategies

### Offset-Based Pagination

#### How It Works

The system skips a number of records using an offset and returns a limited set.

```sql
SELECT * FROM items
ORDER BY id
LIMIT 10 OFFSET 20;
```

This query means:

> “Skip the first 20 records and return the next 10.”

#### Advantages

* Simple and intuitive
* Easy to implement
* Allows random page access

#### Limitations

* Performance degrades with large offsets
* Database must scan skipped rows
* Results can become inconsistent if data changes

#### Typical Use Cases

* Small datasets
* Admin dashboards
* Low-traffic applications

---

### Cursor-Based Pagination

#### How It Works

Instead of skipping rows, the system uses a cursor (reference point) such as an ID or timestamp.

```sql
SELECT * FROM items
WHERE id > 120
ORDER BY id
LIMIT 10;
```

This query means:

> “Return 10 records that come after ID 120.”

#### Advantages

* High performance
* Scales efficiently
* Stable and consistent results

#### Limitations

* Slightly more complex
* No direct jump to arbitrary pages

#### Typical Use Cases

* Social media feeds
* Infinite scrolling
* Large-scale APIs (GitHub, Twitter, Stripe)

---

## Offset vs Cursor — Trade-Offs

| Criterion                | Offset Pagination | Cursor Pagination |
| ------------------------ | ----------------- | ----------------- |
| Simplicity               |  High             |  Medium           |
| Performance (large data) |  Poor             |  Excellent        |
| Scalability              |  Limited          |  High             |
| Consistency              |  Risky            |  Stable           |
| Random Page Access       |  Yes              |  No               |

There is no universally perfect solution. The right choice depends on system needs.

---

## System Architecture

```
Client (UI / API Consumer)
        ↓ pagination parameters
Backend API (Pagination Logic)
        ↓ optimized query
Database
```

### Request Flow

1. Client sends pagination parameters (`limit`, `offset` or `cursor`)
2. Backend validates parameters
3. Pagination logic is applied on the server side
4. Database returns only the required subset
5. Backend responds with data and pagination metadata

Pagination logic belongs in the backend, where performance and consistency can be controlled.

---

## Design Decisions

* Pagination handled server-side for efficiency
* Large dataset used to support pagination
* Clear separation between pagination logic and UI
* Minimal features to avoid confusion

Every design choice serves clarity and correctness.

---

## Implementation Overview

Context: Rifters – An AR Game About Algerian History

Our implementation is integrated into Rifters, an Augmented Reality (AR) game centered around Algeria’s historical eras. In the game, players travel through different time rifts and complete missions related to specific historical periods. Each completed mission generates a historical log containing:

* Era / time period
* Mission name
* Completion date and time
* Player progress metadata

Over time, these logs can grow very large.

## Why Pagination Is Essential in This Game

# Without pagination:

* All historical logs would load at once
* The AR interface would become cluttered
* Performance would degrade on mobile devices
* User experience would suffer

# Pagination allows us to:

* Load mission logs incrementally
* Keep the AR interface lightweight
* Maintain smooth gameplay performance
* Display long player histories efficiently

## How Pagination Is Used in Rifters

Pagination is applied to pop‑out historical cards shown to the player:

* Each card represents a completed mission
* Cards are grouped by historical era
* Only a limited number of cards are loaded per request
* Players can navigate through their mission history page by page

This design mirrors a time‑based audit log, where pagination ensures scalability and clarity.

## Pagination Strategy Used

We use cursor‑based pagination for mission logs:

* The cursor represents the last completed mission (by timestamp or ID)
* The next request loads missions completed after that cursor
* This guarantees consistent ordering even if new missions are added

# This strategy is ideal for:

* Time‑ordered data
* Player activity history
* Real‑time or frequently updated systems

## Example API Flow

GET /missions/logs?cursor=2024-05-01T18:30&limit=5

# Response:

* Returns the next 5 completed missions
* Includes metadata about the next cursor

--- 
