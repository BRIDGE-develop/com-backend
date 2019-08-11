import 'module-alias/register';
import app from './app';
import logger from '@util/logger';

app.listen(process.env.SERVER_PORT, () => {
    logger.info(`App is running at http://localhost:${process.env.SERVER_PORT}`);
});
