import { Request, Response } from 'express';
import { Link } from '../models/link'

const links: Link[] = [];
let nextId = 1;

function generateCode(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text;
}

function postLink(req: Request, res: Response) {
    const link = req.body as Link;

    link.id = nextId++;
    link.code = generateCode();
    link.hits = 0;
    links.push(link);

    res.status(201).json(link);
}

function getLink(req: Request, res: Response, hit: boolean) {
    const code = req.params.code as string;
    const index = links.findIndex(item => item.code === code);

    if (index === -1) {
        res.sendStatus(404);
    } else {
        if(hit)
            links[index].hits++;
        res.json(links[index]);
    }
}

export default {
    postLink,
    getLink
}