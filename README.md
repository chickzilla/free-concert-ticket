## Getting Started

Free Concert is a full-stack project built with Next.js, NestJS, and MySQL that allows users to reserve free concert tickets and manage reservations. The application includes a responsive landing page, user and admin functionality, and secure access control using cookies and JWT-based authentication.

## Set up

Follow the setup instructions below to get the application running locally.

1. Clone the repo

```bash
git clone https://github.com/chickzilla/free-concert-ticket.git
```

#### MySQL

1. run MySQL container

```bash
docker-compose up -d
```

#### Next.js

1. Install NPM packages

```bash
cd web

npm install
```

2. copy .env.example to .env

3. run application

```bash
npm run dev
```

#### NestJs

1. Install NPM packages

```bash
cd api

npm install
```

2. copy .env.example to .env

3. run application

```bash
npm run start:dev
```

## Unit test

this project uses [Jest](https://jestjs.io/) as the testing framework for unit tests.

```bash
cd api

npm run test
```

## Overview Architecture

Below are the overview architecture in this application, categorized by NestJS, Next.js and database schema.

#### Database schema

![alt text](/docs/image.png)

#### NestJS

Modules:

- UserModule: Handles login via username, send JWT tokens via cookies.

- ConcertModule: creating and deleting concerts.

- ReservationModule: Handles reservation and cancellation logic, with user history tracking.

Guards & Middleware:

- AuthGuard: Parses JWT from cookies, injects user_id, role and username into requests.

- RolesGuard: Enforces role-based access.

ORM

- [TypeORM](https://docs.nestjs.com/recipes/sql-typeorm).
- Entities include: User, Concert, and Reservation.

Seeder: Automatically inserts default users (user1, user2, admin) if not found in DB.

#### Next.js

- use [shadcn](https://ui.shadcn.com/) as component library
- Styled with [TailwindCSS](https://tailwindcss.com/)

- Navbar: Adapts based on user role and screen width; remembers expansion state via localStorage

- Route protection: A middleware.ts file handles role-based access pages ( e.g., user cant access to page /admin/... )

## Libraries

Below are the libraries used in this application, categorized by NestJS and Next.js

#### NestJS

- **@nestjs/jwt** - JWT authentication support.
- **@nestjs/typeorm** - ORM for database interaction.
- **@nestjs/config** - Environment configuration handling
- **class-validator, class-transformer** – Validation and transformation for DTOs.
- **mysql2** - MySQL's driver.

#### Next.js

- **@hookform/resolvers, react-hook-form, zod** - Form state management with schema-based validation.
- **@radix-ui/\*, class-variance-authority, clsx** - Used with the shadcn/ui component system.
- **lucide-react, react-icons** - Icon libraries for UI elements.
- **tailwindcss** - Utility-first CSS framework for fast UI development.

## Bonus tasks

- **Express your opinion about how to optimize your website in case that this
  website contains intensive data and when more people access, the lower speed
  you get?**
  -- Use load balancing to distribute incoming traffic evenly across instances to prevent server overload and improve fault tolerance.
  -- Use In-memory caching (ex. Redis) to store frequently accessed data such as concert lists or reservation stats.
  -- Deploy server on kubernetes cluster to automatically scale based on metric ( CPU or memory usage).
  <br/><br/>
- **Express your opinion about how to handle when many users want to reserve the
  ticket at the same time? We want to ensure that in the concerts there is no one
  that needs to stand up during the show.**
  -- Use message queue (ex. RabbitMQ ) process reservation requests sequentially and safely.
  &nbsp; When a user initiates a reservation, the request is added to a queue. This ensures each reservation is handled one at a time, preventing race conditions and double booking.
