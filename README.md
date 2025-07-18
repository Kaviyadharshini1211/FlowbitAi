# ✅ Ticket Completion Webhook - n8n Integration

This workflow is designed to trigger a backend API (`/api/webhook/ticket-done`) whenever a ticket is completed, using **n8n** automation. It listens for a webhook event and makes a POST request to the backend with the ticket ID.

---

## 📦 Requirements

- [n8n](https://n8n.io/) running locally (Docker or native)
- Backend API available at `http://host.docker.internal:3000/api/webhook/ticket-done`
- Ticket ID available from an external trigger (e.g., support ticket system)

---

## 🚀 How It Works

1. A `POST` request is sent to the n8n webhook URL with a `ticketId`
2. n8n receives the data using a **Webhook** node
3. n8n then calls the backend API via **HTTP Request** node
4. The backend marks the ticket as completed

---

## 🔧 Workflow Nodes Overview

### 1. Webhook Node

| Setting          | Value                          |
|------------------|-------------------------------|
| **HTTP Method**  | POST                           |
| **Path**         | `trigger-ticket`               |
| **Authentication** | None                        |
| **Respond**      | Immediately                    |

This creates a webhook URL:  
`http://localhost:5678/webhook/trigger-ticket`

### 2. HTTP Request Node

| Setting         | Value                                               |
|------------------|-----------------------------------------------------|
| **Method**       | POST                                                |
| **URL**          | `http://host.docker.internal:3000/api/webhook/ticket-done` |
| **Content-Type** | JSON                                                |
| **Body**         | `{ "ticketId": "={{ $json.ticketId }}" }`          |

---

## 🧪 Test the Webhook

You can test the workflow using `curl`:

```bash
curl -X POST http://localhost:5678/webhook/trigger-ticket \
  -H "Content-Type: application/json" \
  -d '{"ticketId": "64f5c234b5a1f409aa1f7a8a"}'
