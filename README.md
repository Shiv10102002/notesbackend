# Project Name: Authentication & Notes API

## Description

This project provides a RESTful API for user authentication and notes management. Users can register, log in, and manage their notes. The application includes role-based access, allowing admin users to manage all users' notes and access user details.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user and notes data.
- **Mongoose**: MongoDB object modeling tool.
- **JWT (JSON Web Token)**: For secure authentication and authorization.
- **Bcrypt**: For password hashing and validation.
- **Dotenv**: For managing environment variables.

## Features

- **User Registration**: Allows new users to register by providing their name, email, password, and role.
- **User Login**: Authenticates users and generates JWT tokens for secure access.
- **Notes Management**:
  - Users can create, view, update, and delete their notes.
  - Admins have additional functionality to view all users and manage user notes.
- **Role-Based Access**:
  - Admin role: Can manage all users and their notes.
  - User role: Can only manage their own notes.

## Installation

### Prerequisites

Before getting started, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the repository

```bash
git clone https://github.com/Shiv10102002/notesbackend.git

