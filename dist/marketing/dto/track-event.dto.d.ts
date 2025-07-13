declare class UserInfo {
    ip: string;
    userAgent: string;
    referer: string;
}
declare class ExtraInfo {
    orderId: string;
}
export declare class TrackEventDto {
    trackingId: string;
    eventType: string;
    userInfo: UserInfo;
    extra: ExtraInfo;
}
export {};
