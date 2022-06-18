
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (/cloud-init/i.test(<string>req.headers['user-agent']))
    res.status(200).send('')
  else {
    res.redirect(302, <string>req.query.url)
  }
}
