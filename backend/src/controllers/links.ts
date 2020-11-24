import { Request, Response } from 'express';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository'

function generateCode(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text;
}

async function postLink(req: Request, res: Response) {
    const link = req.body as Link;

    link.code = generateCode();
    const result = await linksRepository.add(link);

    if (!result.id)
        return res.sendStatus(400);

    return res.status(201).json(link);
}

async function getLink(req: Request, res: Response) {
    const code = req.params.code as string;
    const result = await linksRepository.findByCode(code);

    if (!result)
        res.sendStatus(404);
    else
        res.json(result);
}

async function hitLink(req: Request, res: Response) {
    const code = req.params.code as string;
    const result = await linksRepository.hit(code);

    if (!result)
        res.sendStatus(404);
    else
        res.json(result);
}

export default {
    postLink,
    getLink,
    hitLink
}