
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const data = await db.get(<string>req.query.id)
  if (data != null) {
    res.setHeader('Content-Type', 'text/cloud-config')
      .status(200).send(Buffer.from(data, 'base64').toString('utf8') + '\n')
  } else {
    res.status(500).send(`${data}\n`)
  }
}
