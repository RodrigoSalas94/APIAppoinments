import express from 'express';
import { errorHandler } from './config/error';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import userRoutes from './user/routes/userRoutes';
import env from './config/env';
import authRoutes from './user/routes/authRoutes';

const app = express();
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}
const PORT = env.PORT;

app.use(express.json());

const dirSwagger = './src/docs/swagger.yml';
const swaggerDocument = YAML.load(dirSwagger);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRoutes);
app.use(authRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
