# Architecture Decision Records

- **Broker**: Apache Kafka (bitnami/confluent images).
- **Communication**: Asynchronous/Event-Driven.
- **Idempotency**: Implemented at the Consumer level using an in-memory `Set` for UUID tracking.
- **Resilience**: Docker health checks ensure the Node.js app only attempts to connect once Kafka is fully initialized.