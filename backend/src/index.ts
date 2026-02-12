import app from './app';
import config from './config/env';
import './config/db'; // Ensure DB is initialized

const port = config.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
