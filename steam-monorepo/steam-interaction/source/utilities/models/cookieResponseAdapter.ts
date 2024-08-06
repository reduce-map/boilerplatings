import { Cookie } from "@team/account-contract";


export function getConvertedCookie(cookie: any): Cookie {
    let result: any = {};
    
    // Assuming the Cookie type has defined properties that are expected
   
    for (const [key, value] of Object.entries(cookie)) {
        if (Object.prototype.hasOwnProperty.call(cookie, key)) {
            result[key] = value;
        }
    }
    
    return result as Cookie;
}

export function parseCookies(cookieString: any): Cookie {
    const cookies: { [key: string]: string } = {};

    cookieString.forEach((part: string) => {
        const [key, value] = part.trim().split('=').map(decodeURIComponent);
        cookies[key] = value;
    });
    return getConvertedCookie(cookies);
}
