export interface UserEvent {
  eventId: string;
  userId: string;
  eventType: string;
  timestamp: string;
  payload: any;
}

export const processedEvents: UserEvent[] = [];
export const seenEventIds = new Set<string>(); 