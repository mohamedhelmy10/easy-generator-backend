# Easy Generator Backend

This is the backend service for Easy Generator, built with NestJS and MongoDB for user authentication and management.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mohamedhelmy10/easy-generator-backend.git
   cd easy-generator-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```sh
     NODE_ENV=development
     MONGO_URI=mongodb://localhost:27017/easy-generator
     JWT_SECRET=your_secret_key
     PORT=3000
     ```

## Running the Application

### Development Mode
```sh
npm run start:dev
```

### Production Mode
```sh
npm run start:prod
```

## API Documentation

Swagger documentation is available at:
```
http://localhost:3000/api
```

### Authentication Endpoints
- **Signup** (`POST /users/signup`)
- **Signin** (`POST /users/signin`)
- **Profile** (`GET /users/profile` - Requires JWT token)

## Formatting

Format code:
```sh
npm run format
```

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request
