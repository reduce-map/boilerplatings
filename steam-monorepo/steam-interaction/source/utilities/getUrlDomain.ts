

/**
 * Returns the domain of a url without www. if it exists;
 * support http(s) and www. prefix
 * @param url - url to get domain from like https://www.google.com or http://example.com.ua
 * @returns domain like "google.com" or "example.com.ua"
 */
export function getUrlDomain(url: string): string | undefined{
    const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/
    const match = url.match(regex);
    return match ? match[1] : undefined;
}