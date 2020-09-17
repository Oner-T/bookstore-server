import App from './app';
import config from './config';

const { PORT } = config;

App.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));