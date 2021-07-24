
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

export default function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  db.get(<string>req.query.id, (err, data) => {
    if (err)
      res.status(500).send(err.message + '\n');
    else if (data)
      res.setHeader('Content-Type', 'text/cloud-config')
        .status(200).send(Buffer.from(data, 'base64').toString('utf8') + '\n');
    else
      res.status(404).send('Not Found\n');
  });
}
