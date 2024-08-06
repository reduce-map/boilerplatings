export enum RegularExpressions{
	findNameIDFromItemInfo = "Market_LoadOrderSpread(.*?);",
	walletInfo = "var g_rgWalletInfo = (.*?);",
	registerNewKeyMessage = "<h2>Register for a new Steam Web API Key<\/h2>",
	accessDeniedMessage = "<h2>Access Denied<\/h2>",
	unableToFetchMessage = "<h3>Unable to fetch API Key.<\/h3>",
	validateEmailWebApiMessage = "You must have a validated email address to create a Steam Web API key.",
	apiKey = "<p>Key: ([0-9A-F]+)<\/p>"
};
