# GraphQL System API (graphql-sis)

A robust and scalable backend API built with **Node.js**, **Apollo Server**, and **MySQL**. This project demonstrates a modern implementation of a GraphQL API with persistent database storage, environment variable management, and middle-ware integration.

##  Features

- **GraphQL API**: Implementation of Queries and Mutations for efficient data fetching.
- **MySQL Integration**: Persistent storage using `mysql2` with connection pooling.
- **Security**: Environment variables managed via `dotenv` (sensitive data is ignored by Git).
- **Logging & CORS**: Request logging with `morgan` and Cross-Origin Resource Sharing enabled.
- **ES Modules**: Modern JavaScript syntax (`import/export`).

---

##  Tech Stack

- **Server:** Node.js, Express
- **API Engine:** Apollo Server 4
- **Database:** MySQL
- **Language:** JavaScript (ESM)

---

## Prerequisites

Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MySQL Server](https://www.mysql.com/)

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd graphql-sis
