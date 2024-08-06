/**
 * @method HTTP method (POST or GET)
 * 
 * @url relative url (not absolute)
 * 
 * @key confirmation key
 * 
 * @time timeshtamp
 * 
 * @tag tag for ("allow" or "conf") 
 * 
 * @payload body (use for POST methods) or params (use for GET methods)
 */
export type ConfirmApiParams = {
	method: string
	url: string;
	key: string;
	time: number;
	tag: string;

    payload?: any
};
