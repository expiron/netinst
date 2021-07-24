
import type { NextApiRequest, NextApiResponse } from 'next'
import { createHash } from 'crypto'

import db from '../../../lib/redis'

const duration = 3600 * 24;

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (typeof req.body !== 'string')
    res.status(400).send('Bad Request\n');
  else if (req.method !== 'post')
    res.status(405).send('Method Not Allowed\n')
  else {
    const id = createHash('sha256')
      .update(String(Date.now()))
      .update(String(req.body))
      .digest('hex')
      .slice(0, 8);
    db.set(id, String(req.body), 'EX', duration, (err) => {
      if (err)
        res.status(500).send(err.message + '\n');
      else
        res.status(200).send(id + '\n');
    });
  }
}
