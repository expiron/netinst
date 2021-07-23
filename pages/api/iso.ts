
import type { NextApiRequest, NextApiResponse } from 'next'

function getRequestProtocol(req: NextApiRequest): string {
  let protocol = <string>(req.headers['x-forwarded-proto'] || req.headers['x-forwarded-protocol'] || req.headers['x-url-scheme']);
  if (!protocol)
    protocol = (req.headers['x-forwarded-ssl'] === 'off' || req.headers['front-end-https'] === 'off') ? 'http' : 'https';
  if (!/^https?$/i.test(protocol))
    protocol = 'https';
  return protocol;
}

const mirrors: { [mirror: string]: string } = {
  'bupt': 'mirrors.bupt.edu.cn/ubuntu-cdimage',
  'hit': 'mirrors.hit.edu.cn/ubuntu-cdimage',
  'cn': 'mirror.sjtu.edu.cn/ubuntu-cdimage',
  'sjtu': 'mirror.sjtu.edu.cn/ubuntu-cdimage',
  'us': 'cdimage.ubuntu.com',
};

const getMirrorBaseURL = (m: string): string => mirrors[m] || mirrors['us'];

const getCodename = (codename: string): string => codename && /bionic/i.test(codename) ? 'bionic' : 'focal'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (/cloud-init/i.test(<string>req.headers['user-agent']))
    res.status(200).send('');
  else {
    const protocol = getRequestProtocol(req);
    const mirror = getMirrorBaseURL(<string>req.query.mirror);
    const codename = getCodename(<string>req.query.codename);
    res.redirect(302, `${protocol}://${mirror}/ubuntu-server/${codename}/daily-live/current/${codename}-live-server-amd64.iso`)
  }
}
