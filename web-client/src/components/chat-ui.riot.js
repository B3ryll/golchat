import ChatService from "./chat.js"

const debugId = 323
const service = new ChatService(debugId)

export default
{
    state: {
        messageList: [],
        draft:       "",
    },

    onBeforeMount(props)
    {
        this.state = {
            messageList: [{content: "initial"}],
            draft:       "",
        }

        service.subscribeEvent("open", () => {
            this.update({
                messageList: [
                    {
                        content: 'chat connected!',
                    }
                ]
            })
        })

        service.subscribeEvent("message", ({data}) => {
            console.log({data})
    
            const initialLen = this.state.messageList
                .length

            this.update({
                messageList: [
                    ...this.state.messageList,
                    {content: "server: "+ data}, 
                ]
            })
            console.assert(
                this.state.messageList.length == initialLen + 1
            )
            this.update()
        })
    },

    sendMessage(ev)
    {
        ev.preventDefault()

        service.send(this.state.draft)
        this.update({draft: ""})
    },

    editMsgDraft({target})
    {
       this.update({draft: target.value}) 
    },
}
