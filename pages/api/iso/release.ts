
import type { NextApiRequest, NextApiResponse } from 'next'

type Codename = 'bionic' | 'focal' | 'hirsute' | 'impish'

const mirrors: { [mirror: string]: string } = {
  'bupt': 'mirrors.bupt.edu.cn/ubuntu-releases',
  'cn': 'mirror.sjtu.edu.cn/ubuntu-releases',
  'hit': 'mirrors.hit.edu.cn/ubuntu-releases',
  'nb': 'downloads.izion.ml',
  'sjtu': 'mirror.sjtu.edu.cn/ubuntu-releases',
  'us': 'releases.ubuntu.com',
}

const versions: {
  [K in Codename]: string
} = {
  'bionic': '18.04.6',
  'focal': '20.04.3',
  'hirsute': '21.04',
  'impish': '21.10',
}

function getRequestProtocol(req: NextApiRequest): string {
  let protocol = <string>(req.headers['x-forwarded-proto'] || req.headers['x-forwarded-protocol'] || req.headers['x-url-scheme'])
  if (!protocol)
    protocol = (req.headers['x-forwarded-ssl'] === 'off' || req.headers['front-end-https'] === 'off') ? 'http' : 'https'
  if (!/^https?$/i.test(protocol))
    protocol = 'https'
  return protocol
}

const getMirrorBaseURL = (m: string): string => mirrors[m] || mirrors['us']

const getCodename = (codename: string): Codename => {
  switch (codename.trim()) {
    case 'bionic':
      return 'bionic'
    case 'focal':
      return 'focal'
    case 'hirsute':
      return 'hirsute'
    case 'impish':
      return 'impish'
    default:
      return 'focal'
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (/cloud-init/i.test(<string>req.headers['user-agent']))
    res.status(200).send('')
  else {
    const protocol = getRequestProtocol(req)
    const mirror = getMirrorBaseURL(<string>req.query.mirror)
    const codename = getCodename(<string>req.query.codename)
    res.redirect(302, `${protocol}://${mirror}/${codename}/ubuntu-${versions[codename]}-live-server-amd64.iso`)
  }
}
