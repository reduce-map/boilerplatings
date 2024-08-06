import { RateLimitTesterService } from "../actors/rateLimitTesterService";
import { MessageDescriber } from "../utils/messageDescriber";
import { RateLimitTesterLogger } from "../utils/rateLimitTesterLogger";

declare global {
  var logger: RateLimitTesterLogger;
  var rateLimitTesterService: RateLimitTesterService;
}
