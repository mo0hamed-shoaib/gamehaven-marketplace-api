const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GameHaven API',
            version: '1.0.0',
            description: 'GameHaven - A digital video game marketplace REST API',
        },
        servers: [
            {
                url: 'https://gamehaven-marketplace-api.vercel.app', // Update this with your Vercel deployment URL
                description: 'Production server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
}

// Write the Swagger spec to a JSON file
fs.writeFileSync(
    path.join(docsDir, 'swagger.json'),
    JSON.stringify(swaggerSpec, null, 2)
);

// Create an HTML file that loads the Swagger UI
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GameHaven API Documentation</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle({
                url: './swagger.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIBundle.SwaggerUIStandalonePreset
                ],
            });
        };
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html); 