import UserModel from "./UserModel";

export interface NocRoom {
    _id: string;
    name: string;
    monitors: Monitor[];
    users: UserModel[];
    creator: string;
    isHidden: boolean;
    session_id?: string;
}
