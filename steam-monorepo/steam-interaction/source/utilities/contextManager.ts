import { Apps } from "../enums/apps";

export class ContextManager {
    public static getContextId(appId: number): number {
        switch (appId) {
            case Apps.H1Z1:
                return 1;
            case Apps.Steam:
                return 6;
            default:
                return 2;
        }
    }
}
