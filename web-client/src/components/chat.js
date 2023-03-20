class ChatService
{
    constructor(roomId)
    {
        this.id = roomId

        this.subscribers = {
            open:    [], 
            message: [],
        }
        console.assert(this.subscribers)

        this.socket = new WebSocket(
            "ws://localhost:8080/chat"
        )

        this.socket.onopen = (ev) =>
        {
            this.subscribers["open"]
                .forEach((handler) => handler(ev))
        }

        this.socket.onmessage = (ev) =>
        {
            this.subscribers["message"]
                .forEach((handler) => handler(ev))
        }
    }

    subscribeEvent(ev, callback)
    {
        console.assert(this.subscribers)
        console.assert(ev in this.subscribers)

        this.subscribers[ev].push(callback)
    }

    send(message)
    {
        this.socket.send(message) 
    }
}

export default ChatService
