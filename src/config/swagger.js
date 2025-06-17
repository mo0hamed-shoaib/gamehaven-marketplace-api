const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GameHaven Marketplace API',
            version: '1.0.0',
            description: 'API documentation for GameHaven Marketplace',
            contact: {
                name: 'API Support',
                email: 'support@gamehaven.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server'
            },
            {
                url: 'https://gamehaven-marketplace-api.vercel.app/api',
                description: 'Production server'
            }
        ],
        basePath: '/api',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'error' },
                        message: { type: 'string', example: 'Error message' }
                    }
                },
                Success: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        message: { type: 'string', example: 'Success message' }
                    }
                },
                Game: {
                    type: 'object',
                    required: ['title', 'description', 'price', 'platform', 'genre', 'stock'],
                    properties: {
                        title: {
                            type: 'string',
                            description: "The game's title",
                            example: 'The Legend of Zelda: Breath of the Wild'
                        },
                        description: {
                            type: 'string',
                            description: 'Detailed description of the game',
                            example: 'An action-adventure game set in a vast open world where you can explore, fight, and solve puzzles.'
                        },
                        price: {
                            type: 'number',
                            format: 'float',
                            minimum: 0,
                            description: "The game's price in USD",
                            example: 59.99
                        },
                        platform: {
                            type: 'string',
                            enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
                            description: "The game's platform",
                            example: 'Nintendo Switch'
                        },
                        genre: {
                            type: 'string',
                            enum: ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing', 'Puzzle'],
                            description: "The game's genre",
                            example: 'Adventure'
                        },
                        stock: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Available stock quantity',
                            example: 50
                        },
                        coverImage: {
                            type: 'string',
                            format: 'binary',
                            description: "The game's cover image"
                        }
                    }
                },
                CartItem: {
                    type: 'object',
                    properties: {
                        gameId: { type: 'string', example: '60d21b4667d0d8992e610c85' },
                        quantity: { type: 'integer', example: 2 }
                    }
                },
                CartItemResponse: {
                    type: 'object',
                    properties: {
                        game: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string', example: '60d21b4667d0d8992e610c85' },
                                title: { type: 'string', example: 'The Legend of Zelda' },
                                price: { type: 'number', example: 59.99 },
                                coverImage: { type: 'string', example: 'https://example.com/images/zelda.jpg' }
                            }
                        },
                        quantity: { type: 'integer', example: 2 },
                        subtotal: { type: 'number', example: 119.98 }
                    }
                },
                Cart: {
                    type: 'object',
                    properties: {
                        items: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/CartItemResponse' }
                        },
                        total: {
                            type: 'number',
                            description: 'Total cart amount',
                            example: 119.98
                        }
                    }
                },
                CartResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        data: {
                            type: 'object',
                            properties: {
                                cart: { $ref: '#/components/schemas/Cart' }
                            }
                        }
                    }
                },
                GameResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                game: { $ref: '#/components/schemas/Game' }
                            }
                        }
                    }
                },
                GamesListResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success'
                        },
                        data: {
                            type: 'object',
                            properties: {
                                games: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Game' }
                                },
                                page: {
                                    type: 'integer',
                                    example: 1
                                },
                                pages: {
                                    type: 'integer',
                                    example: 5
                                },
                                total: {
                                    type: 'integer',
                                    example: 50
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                            example: {
                                status: 'error',
                                message: 'Please authenticate to access this resource'
                            }
                        }
                    }
                },
                NotFoundError: {
                    description: 'The specified resource was not found',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                            example: {
                                status: 'error',
                                message: 'Resource not found'
                            }
                        }
                    }
                },
                ValidationError: {
                    description: 'Invalid input data',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                            example: {
                                status: 'error',
                                message: 'Invalid input data',
                                errors: [
                                    {
                                        field: 'email',
                                        message: 'Invalid email format'
                                    }
                                ]
                            }
                        }
                    }
                },
                ServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/Error' },
                            example: {
                                status: 'error',
                                message: 'Internal server error'
                            }
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = specs;
