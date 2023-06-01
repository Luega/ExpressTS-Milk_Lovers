# Milk Lovers E-Commerce API

This API is specifically designed to serve data for [the Milk Lovers E-Commerce UI](https://github.com/Luega/ReactTS-Milk_Lovers.git). It provides endpoints to retrieve data from a MongoDB database, allowing seamless integration with the Milk Lovers E-Commerce front-end.

## Table of Contents

- [Endpoints](#Endpoints)
- [Installation](#Installation)
- [Dependencies](#Dependencies)
- [License](#license)

## Endpoints

1. Get all products

- Endpoint: /api/products
- Method: GET
- Description: This endpoint retrieves all the products available in the Milk Lovers E-Commerce store.

2. Get product by ID

- Endpoint: /api/products/{id}
- Method: GET
- Description: This endpoint retrieves a single product from the Milk Lovers E-Commerce store based on the provided ID.

Parameters:

- {id}: The unique identifier of the product.

## Installation

To get started with the Milk Lovers E-Commerce UI , follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/Luega/ExpressTS-Milk_Lovers.git
```

2. Navigate to the project directory:

```bash
  cd /ExpressTS-Milk_Lovers
```

3. Install the project dependencies:

```bash
  npm install
```

4. Set the environment variables in a .env file or as system environment variables.

```bash
PORT: The port on which the API server will run.
CONNECTION_STRING_MONGODB: The connection string for your MongoDB instance.
MONGODB_DB: The name of the MongoDB database.
MONGODB_COLLECTION: The name of the collection within the MongoDB database.
```

5. Run the API server using:

```bash
  npm run start
```

6. The server will start running on the specified port, and you can now make requests to the defined endpoints.

## Dependencies

The API relies on the following dependencies:

- express: For building the API server.
- mongodb: To connect and interact with the MongoDB database.

Make sure to install these dependencies before running the API.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.
