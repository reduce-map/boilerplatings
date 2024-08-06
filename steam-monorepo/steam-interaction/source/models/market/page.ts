import { Listing } from "./listing";
/**
 * @totalCount quantity listings in all pages
 * 
 * @currentPosition current listing in current page
 * 
 * @currentPage current page number
 * 
 * @pageSize quantity listings in one page 
 * 
 * @data array listings
 * 
 * @pagesCount all quantity pages 
 * 
 * @nextPageUrl url to next page with listings
 * 
 * */
export class Page {
	totalCount?: number;
	currentPosition?: number;
	currentPage?: number;
	pageSize?: number;
	data?: Listing[];
	pagesCount: number = 0;
	nextPageUrl?: string;
}
