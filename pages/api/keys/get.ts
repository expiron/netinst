
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const id = createHash('sha256').update(String(req.query.fqdn)).digest('hex').slice(0, 8)
  let data = await db.hGet(id, <string>req.query.slug)
  if (data)
    res.status(200).send(`${data}\n`)
  else
    res.status(200).send(req.query.slug === 'mtime' ? '0\n' : '')
}
