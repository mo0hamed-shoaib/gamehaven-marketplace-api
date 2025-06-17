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
                email: 'mohamed.gamal.shoaib@gmail.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs; 