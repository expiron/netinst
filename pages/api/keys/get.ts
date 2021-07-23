
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const id = createHash('sha256').update(String(req.query.fqdn)).digest('hex').slice(0, 8);
  db.hget(id, <string>req.query.slug, (err, data) => {
    if (err)
      res.status(500).send(err.message);
    else if (data)
      res.status(200).send(data + '\n');
    else
      res.status(200).send(req.query.slug === 'mtime' ? '0\n' : '');
  })
}
