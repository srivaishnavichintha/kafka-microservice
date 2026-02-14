import express from 'express'; 
import { v4 as uuidv4 } from 'uuid';
import { producer } from './kafka.js'; 
import { processedEvents } from './store.js';
import { startConsumer } from './consumer.js';

const app = express();
app.use(express.json());


app.post('/events/generate', async (req, res) => {
  const { userId, eventType, payload } = req.body;
  
  if (!userId || !eventType) return res.status(400).send("Missing data");

  const event = {
    eventId: uuidv4(),
    timestamp: new Date().toISOString(),
    userId,
    eventType,
    payload: payload || {}
  };

  try {
    await producer.send({
      topic: 'user-activity-events',
      messages: [{ value: JSON.stringify(event) }],
    });
    res.status(201).json({ eventId: event.eventId });
  } catch (err) {
    res.status(500).json({ error: "Failed to publish" });
  }
});

app.get('/events/processed', (req, res) => {
  res.json(processedEvents);
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await producer.connect();
  await startConsumer(); 
});