import { consumer } from './kafka.js'; 
import { processedEvents, seenEventIds } from './store.js';
import type { UserEvent } from './store.js'; 
export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-activity-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event: UserEvent = JSON.parse(message.value?.toString() || '{}');
      if (seenEventIds.has(event.eventId)) {
        console.log(`Duplicate event skipped: ${event.eventId}`);
        return;
      }

      console.log(`Processing: ${event.eventType} for user ${event.userId}`);
      
      seenEventIds.add(event.eventId);
      processedEvents.push(event);
    },
  });
};