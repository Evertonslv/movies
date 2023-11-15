import 'reflect-metadata'
import { setupApp } from '@/main/config/app'
import { readCsv } from '@/main/factories'

import { connection } from '../../ormconfig'

connection.initialize().then(async () => {
  await readCsv()

  const port = 3000
  const app = setupApp()
  app.listen(port, () => { console.log(`Server running at http://localhost:${port}`) })
})
