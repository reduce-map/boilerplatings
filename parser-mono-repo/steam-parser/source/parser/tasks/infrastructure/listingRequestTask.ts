import SteamExecutor from "../../steamExecutor";
import { Task } from "../../../actions/taskBase";


export abstract class ListingRequestTask extends Task<SteamExecutor> {
  public constructor() {
    super();
  }
  get TaskType(): string {
     return ListingRequestTask.name;
  }
}
