
// npm i swagger-jsDoc@6.0.0 --save
// npm i swagger-ui-express --save

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJs Project where we have implement API',
      version: '1.0.0',
      description: 'My API documentation'
    },
    // servers:[
    //     {
    //         api:'http://localhost:1003/'
    //     }
    // ]
  },
  apis: ['./mongotest.js'], // replace this with the path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};