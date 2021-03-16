# **File worker** #
---

This service can receive a CSV file of coordinates (lat / lng), which will hydrate with postcodes using an endpoint, 
later it will save the info in database.

## Basic architecture

Upon receiving the CSV file, it streams the content, and makes requests to the API in batches of 1000, it has backoff retries.
Once it gets a response, it in turn saves batches in the database,

## Code Pattern

The code pattern used in the structure of this service is oriented to CLEAN code.

## How to run locally

Just run

```
docker-compose up -d
```

## API
---

### Upload a CSV file
```http
POST /upload
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `file` | `file` | **Required**. The CSV file with lat/lng columns. | |


- **EXAMPLE RESPONSE:**

```javascript
Processing File
```

## Git

The branching model used for Git is a very simple GitFlow, with its
 conrresponding main, develop and feature branches (the only ones necessaries).

---