import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '0G Compute Network API',
      version: '1.0.0',
      description: 'REST API for interacting with the 0G Compute Network using SDK v0.6.2',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: '0G Labs',
        url: 'https://0g.ai',
      },
    },
    servers: [
      {
        url: '/api',
        description: '0G Compute Network API',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export default swaggerJsdoc(options); 