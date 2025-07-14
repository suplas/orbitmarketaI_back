declare enum EventType {
    click = "click",
    purchase = "purchase",
    video_complete = "video_complete"
}
declare class UserInfoDto {
    ip: string;
    userAgent: string;
    referer: string;
}
export declare class TrackEventDto {
    trackingId: string;
    eventType: EventType;
    userInfo: UserInfoDto;
    extra?: Record<string, any>;
}
export {};
