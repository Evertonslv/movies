import 'reflect-metadata'
import { setupApp } from '@/api/config/app'
import { processCsv } from '@/csv/process-csv'

import { connection } from '../ormconfig'

connection.initialize().then(async () => {
  await processCsv()
})

const port = 3000
const app = setupApp()
app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
