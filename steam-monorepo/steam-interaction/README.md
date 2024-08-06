# Cookies Example

```ts
  const cookie = {
        steamRefresh_steam:         '',
        steamLoginSecure:           `76561199035699070%7C%7CeyAidHlwIjogIkpXVCIsICJhbGciOiAiRWREU0EiIH0.eyAiaXNzIjogInI6MERENl8yM0FCQ0U5Rl80QUEwMyIsICJzdWIiOiAiNzY1NjExOTkwMzU2OTkwNzAiLCAiYXVkIjogWyAid2ViIiBdLCAiZXhwIjogMTcwNDY3MDU1MiwgIm5iZiI6IDE2OTU5NDI4MjIsICJpYXQiOiAxNzA0NTgyODIyLCAianRpIjogIjBERDlfMjNBQkNFQTRfODNCNTkiLCAib2F0IjogMTcwNDU1NjE2MywgInJ0X2V4cCI6IDE3MjI5MzQyNjUsICJwZXIiOiAwLCAiaXBfc3ViamVjdCI6ICIxNjYuMS4yMzAuMjU0IiwgImlwX2NvbmZpcm1lciI6ICIxNjYuMS4yMzAuMjU0IiB9.qtwJQ35SmJrsJSh-CLeUcZdri0r_G_fyimag1Ho6attigdwreJndbpKFkNoyQzbeOjKXEFpPB5h7GUl8Eo5WCA`,
        sessionid:                  '22c0035bf55f53b4b01e4a1a',
        steamCountry:               '',
        steamDataId:                '',
        steamRememberLogin:         'True',
        Steam_Language:             'english',
        steamMachineAuth:           '',
        webTradeEligibility:        '%7B%22allowed%22%3A0%2C%22reason%22%3A16416%2C%22allowed_at_time%22%3A1697620832%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A0%2C%22expiration%22%3A1697016332%2C%22time_checked%22%3A1697016032%7D',
        timezoneOffset:             '10800,0'
    } as Cookie
```
# Credentials Example

```ts
  const accountCredentials = new AccountCredentials();
  accountCredentials.login = "Your steam login";
  accountCredentials.password = "Your steam password";
  accountCredentials.shared_secret = "Your steam shared secret";
  accountCredentials.identity_secret = "Your steam identity secret";
```


# Services


### Login Service

Login method

```ts
 

  const loginService: LoginService = new LoginService({
		timezone: "Your timezone (by default 7200,0)",
		steamLanguage: "Your steam language"
	},
		'Your proxy string (optional parameter)'
	);
  //This method return cookie, acceesToken, RefreshToken and steam sessionid
const res = await loginService.login(accountCredentials);  
```

### Web Login Service

Login via credentials method

```ts
 const credentials = new AccountCredentials();
  credentials.login = "Your steam login";
  credentials.password = "Your steam password";
  credentials.shared_secret = "Your steam shared secret";
  credentials.identity_secret = "Your steam identity secret";
const webLoginService: WebLoginService = new WebLoginService({
		timezone: "Your timezone (by default 7200,0)",
		steamLanguage: "Your steam language (by default 'english')"
	},
		'Your proxy string (optional parameter)'
  );

//This method return cookie, acceesToken, RefreshToken and steam sessionid
const loginResult = await webLoginService.logOnViaCredentials(credentials);

```
### BuyOrderService

Place buy order method

```ts
 
  const buyOrderService: BuyOrderService = new BuyOrderService(
		cookie, //Your Cookie object
		'Your proxy string (optional parameter)'
	);
  const order: Order = {
			currency: ECurrencyCode.RUB, //Enter your currency from ECurrencyCode enum
			appid: 'ID of the game to which the item belongs (such as 570)',
			market_hash_name: "Your market item name with spaces",
			price_total: 123, //Total of your order in format without comma (1,23 = 123)
			quantity: 1,  // Quantity of items
		};
  const res = await buyOrderService.placeBuyOrder(order);
```

Get Item Orders

```ts
const params = { nameId: "176321160", currency: ECurrencyCode.RUB, appId: 570, itemName: "Doll of the Dead" };
const res = await buyOrderService.getItemOrdersHistory(params);
```

Cancel Order 

```ts
const orderId = "6621500342";   //You can find this from getItemOrdersHistory or steam page
const res = await buyOrderService.cancelBuyOrder(orderId);
```

Get buy order status 

```ts
const orderId = "6621666187";  //You can find this from getItemOrdersHistory or steam page
const res = await buyOrderService.getBuyOrderStatus(orderId);
```


### ConfirmationService

Get all confirmations

```ts
const confirmationService: ConfirmationService = new ConfirmationService(
		cookie,
		{
			mobileOs: "android",    //Optional
			profileId64: '783758372894', //Your steam id 64
		},
		credentials.identity_secret,
		'Your proxy string (optional parameter)'
);
const confs: Confirmation[] = await confirmService.getConfirmations();

```

#### Response confirmations

**ConfirmationResponse**
Type provides description of result statement for using respond methods. This can be used to detect state of your request.
*Properties*:
- 	success - indicates result state
- 	responsePayload - may contain message or response.data for used method

```ts
type ConfirmationResponse = {
	success: boolean;
	responsePayload: any;
}
```
**respondToConfirmationById(confirmationId, nonce, action): Promise of ConfirmationResponse**

Responds to a Steam confirmation (or confirmations) by its ID. This function can handle both single and multiple confirmations.
Parameters

    * confirmationId: string | string[]: The ID of the confirmation to respond to. This can be a single string ID for one confirmation, or an array of string IDs for multiple confirmations.
    * nonce: string | string[]: A unique, one-time use number (or array of numbers) associated with the confirmation(s), used to prevent replay attacks.
    * action: ConfirmationAction: The action to be taken. This is an enum that specifies whether the confirmation should be accepted or denied.

**Returns**

*Promise of ConfirmationResponse*:  A promise that resolves to an object containing the success status and any response payload from the server.
**Throws**

    Throws an error if the request to respond to the confirmation fails.
    Throws an error if the server responds with a message indicating failure.

**Example Usage**

``` ts
try {
  const response = await mySteamClient.respondToConfirmationById("123456", "78910", ConfirmationAction.Accept);
  if(response.success) {
    console.log("Confirmation accepted successfully!");
  } else {
    console.log("Failed to accept confirmation.", response.responsePayload);
  }
} catch (error) {
  console.error("Error responding to confirmation:", error);
}
```

**respondToConfirmation(confirmation, action): Promise of ConfirmationResponse**

Convenience method to respond to a single Steam confirmation using a Confirmation object.
*Parameters*:

    confirmation: Confirmation: An object representing the confirmation to respond to. This object must have id and nonce properties.
    action: ConfirmationAction: The action to be taken (accept or deny).

*Returns:*

*Promise of ConfirmationResponse*: A promise that resolves to an object containing the success status and any response payload from the server.
Example Usage

``` ts

const myConfirmation = { id: "123456", nonce: "78910" };
try {
  const response = await mySteamClient.respondToConfirmation(myConfirmation, ConfirmationAction.Accept);
  console.log(response.success ? "Success!" : "Failed", response.responsePayload);
} catch (error) {
  console.error("Error responding to confirmation:", error);
}
```
**respondToConfirmations(confirmations, action): Promise of ConfirmationResponse**

Responds to multiple Steam confirmations at once.
*Parameters*

    confirmations: Confirmation[]: An array of Confirmation objects to respond to. Each object must include id and nonce properties.
    action: ConfirmationAction: The action to be taken (accept or deny) for all provided confirmations.

*Returns*

*Promise of ConfirmationResponse*: A promise that resolves to an object indicating success if all confirmations are responded to successfully, along with any response payload from the server.
Example Usage

``` ts

const myConfirmations = [{ id: "123456", nonce: "78910" }, { id: "234567", nonce: "891011" }];
try {
  const response = await mySteamClient.respondToConfirmations(myConfirmations, ConfirmationAction.Accept);
  console.log(response.success ? "All confirmations accepted successfully!" : "Failed", response.responsePayload);
} catch (error) {
  console.error("Error responding to confirmations:", error);
}
```


### CookieValidationService

```ts
 let cookieValidationService: CookieValidationService = new CookieValidationService(cookie, 'Your proxy string (optional parameter)');
await cookieValidationService.isCookieHaveValidSession()	//Check cookie valid session
```

### InventoryService

Get inventory

```ts
let inventoryService: InventoryService = new InventoryService(cookie, 'Your proxy string (optional parameter)');
	const params: GetInventoryParams = {
		appID: Apps.DOTA2,
		profileId64: "76561199035699070",
		count: 5, // 2000 max number provided by steam
		startAssetId?: string; // start item asset id which will be offseted start index in inventory 
	};

const inventory = await inventoryService.getInventory(params)
```

### StoreService

```ts
const storeService: StoreService = new StoreService(cookie, 'Your proxy string (optional parameter)');
const res = await storeService.redeemWalletCode("Your wallet code");
```

### TradeOfferService

To use tradeOfferService you can choose one of two varinats: ApiKey and Access token by TradeOfferAccessType. In case ApiKey you need to specify apiKey as parameter else it does not needed
``` ts
export enum TradeOfferAccessType{
    ApiKey = "key",
    AccessToken = "access_token",
}

export type TradeOfferServiceSettings = {
    offerAccessType: TradeOfferAccessType;
    apiKey?: string;
};
```

Get Offers. We provide two methods to get offers - sent and received. Both methods takes same arguments

eOfferFilter: EOfferFilter: (EOfferFilter.All will provide historical trades and active together)

defaultHistoricalCutoff?: Date: required as cutoff for offers, not passing this argument will provide all current offers

language: string = "english": response language of offers

```ts
	const tradeOfferService: TradeOfferService = new TradeOfferService(
		{
			apiKey: 'Your steam API key',
			offerAccessType: TradeOfferAccessType.ApiKey
		},
		cookie,
		'Your proxy string (optional parameter)'
	);

 const allSentOffers = await tradeOfferService.getSentOffers();
 const allReceivedOffers = await tradeOfferService.getReceivedOffers();
```

Get concrete offer information

```ts
	const offerID = "5489849179";	//You can get this info from getOffers method or watch from steam page
	const trade = await tradeOfferService.getOffer(offerID);
```

Create simple empty trade offer

```ts
const partnerSteamId64 = "76561199111873879"	//Your partner steam id 64		
const tradeUrlToken = "lyqEqgxg"				//You can find this token from partner trade url
const res = await tradeOfferService.createOffer(partnerSteamId64, tradeUrlToken);
```

Send new trade offer. This example shows how to create a new trade offer, 
add one item from your inventory and one item from your partner’s inventory to it, and send the offer

```ts
	const offer = await createSimpleTradeOffer(tradeOfferService);
	const response = await tradeOfferService.sendOffer(offer);

async function createSimpleTradeOffer(tradeOfferService: TradeOfferService): Promise<TradeOffer> {
	const partnerId = "76561199032664256";
	const tradeOffer = tradeOfferService.createOffer(partnerId, "lyqEqgxg");

	const myItem: InventoryAssetItem | null = await getFirstInventoryItem(TestConfig.steamId.getSteamID64());
	if (myItem) {
		tradeOffer.addMyItem(myItem);
	}

	const partnerItem: InventoryAssetItem | null = await getFirstInventoryItem(partnerId);
	if (partnerItem) {
		tradeOffer.addTheirItem(partnerItem);
	}

	tradeOffer.message = "This trade offer for you";
	return tradeOffer;
}
async function getFirstInventoryItem(profileId: string): Promise<InventoryAssetItem | null> {
	const inventoryService = new InventoryService(TestConfig.cookie, undefined);
	const inventoryParams: GetInventoryParams = {
		profileId64: profileId,
		appID: Apps.DOTA2,
		count: 1,
	};
	const inventory: GetInventoryResult | null = await inventoryService.getInventory(inventoryParams);
	if (!inventory?.assets) {
		return null;
	}
	return inventory?.assets[0];
}
```

Accept active trade offer

```ts
	const offers = await getOffers(tradeOfferService);
	//We finded one active trade offer from your steam account
	const activeOffer = offers?.receivedTradeOffers.find((x) => x.tradeOfferState == ETradeOfferState.Active);
	const res = await tradeOfferService.acceptOffer(activeOffer.tradeOfferId, activeOffer.partnerId64);
```

Decline trade offer 

```ts
const offers = await getOffers(tradeOfferService);
const activeOffer = offers?.sendedTradeOffers.find(
	(x) => x.tradeOfferState == ETradeOfferState.Active ||
	x.tradeOfferState == ETradeOfferState.CreatedNeedsConfirmation
);
const res: boolean = await tradeOfferService.cancelOffer(activeOffer.tradeOfferId);
```

### MarketService

Get price history example

```ts
const historyItem: PriceHistoryItem = {
	currency: ECurrencyCode.GBP,					
	appid: Apps.CSGO,
	itemName: "Antwerp 2022 Legends Sticker Capsule",
	encodedName: "",		//This parameter is optional, is your itemName but url encoded
};
const priceHistory = await marketService.getPriceHistory(historyItem);
```

Get Market history by page parameters

```ts
const marketHistory = await marketService.getMarketHistory(0, 500);
```

Get item info by game id and item name

```ts
const itemInfo = await marketService.getItemInfo(Apps.DOTA2, "Helm of Retribution");
```

Get my listings

```ts
  let currentPage = 1;
  let cntPerPage = 100;
  const page = await marketService.getMyListings(currentPage, cntPerPage);
```

Get market listing by page

```ts
const params: ExtendedListingsPage = {
		marketItemName: "Mega-Kills: Cave Johnson",
		currency: ECurrencyCode.USD,
		cntPerPage: 100,	//Quantity elements on one page
		currentPage: 5,		//Current page number
		appId: 570,
	};
const page = await marketService.getMarketListings(params);
```

Sell item 

```ts
	const appId = Apps.DOTA2;
	const params: SellParams = {
		amount: 1,														//Quantity items
		contextid: ContextManager.getContextId(appId),					//Get information about your game id context (such as for 570 is context = 2)
		appid: appId,
		assetid: "28377029318",											//You can find assetid from getMarketListing method
		price: 100,														//price fro item without comma (100 = 1,00)
	};
	const res = await marketService.sell(params, '76561199032664256');	//Enter your steamId64
```

Buy item example

```ts

	const marketItemInfo: MarketItemInfo = {
		marketItemName: "Summer's Mirth",
		appId: 570
	}
	const listingId = "4376994758654887310";	//you can find this listing id from getMarketListing method or steam market item page
	const buyParams: BuyParams = {
		subtotal: 84,					//	price of the item itself
		fee: 12,						// 	steam commission for purchase
		total: 96,						// 	Your full price with fee+subtotal
		currency: ECurrencyCode.RUB,	//	Currency
		save_my_address: 0,				//	Is optional parameter for steam
		quantity: 1,
	};
	const res = await marketService.buy(buyParams,listingId,marketItemInfo);
```

Remove item example

```ts
	const listingId: string = "7231148125631140232";
	const res: boolean = await marketService.removeListing(listingid);
```
