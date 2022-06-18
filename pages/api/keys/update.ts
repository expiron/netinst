
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  if (typeof req.body !== 'object')
    res.status(400).send('Bad Request\n')
  else if (!/post/i.test(<string>req.method))
    res.status(405).send('Method Not Allowed\n')
  else {
    const id = createHash('sha256').update(String(req.query.fqdn)).digest('hex').slice(0, 8)
    const fqdn: string = req.body['fqdn'] || ''
    const dsa: string = req.body['pub_key_dsa'] || ''
    const rsa: string = req.body['pub_key_rsa'] || ''
    const ecdsa: string = req.body['pub_key_ecdsa'] || ''
    const ed25519: string = req.body['pub_key_ed25519'] || ''
    const mtime = Math.floor(Date.now() / 1000)
    let result = await db.sendCommand(['HMSET', id, 'fqdn', fqdn.trim(), 'mtime', mtime.toString(),
      'dsa', dsa.trim(), 'rsa', rsa.trim(), 'ecdsa', ecdsa.trim(), 'ed25519', ed25519.trim()])
    if (result === 'OK') {
      res.status(200).send(`${id}\n`)
    } else {
      res.status(500).send(`${result}\n`)
    }
  }
}
