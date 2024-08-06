

export function extractBaseDomain(url:string):string | undefined
{
    const match = url.match(/(?<=^https?:\/\/)(?:[a-z0-9-]+\.)?[a-z0-9-]+\.[a-z0-9-]+|[0-9]{1,3}(\.[0-9]{1,3}){3}(?=[/:]|$)/)
    return match ? match[0] : undefined;
}