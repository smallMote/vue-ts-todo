import CreateApp from './app/create-app'
import { VueBus } from './utils/bus'
const app = CreateApp();
new VueBus(app)
