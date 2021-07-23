
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

const duration = 3600 * 24;

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (typeof req.body !== 'string')
    res.status(400).send('Bad Request');
  else {
    db.set(<string>req.query.id, String(req.body), 'EX', duration, (err) => {
      if (err)
        res.status(500).send(err.message);
      else
        res.status(200).send(req.query.id + '\n');
    });
  }
}
