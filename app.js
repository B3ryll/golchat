
// ----------------------------------------------------
//  handle data in/out
//

var input =
    document.getElementById("in-text-field");

var socket = new WebSocket("ws://localhost:8080/chat");

socket.onopen = function ()
{
    console.log ("status: Connected");
};

socket.onmessage = function (ev)
{
    console.log ("Server: " + ev.data);
}

function send ()
{
    socket.send(input.value);
    input.value = "";
}

// ----------------------------------------------------
//  data flow utility
//

const txtEncode = new TextEncoder();
async function hashObject (obj)
{
    const data = txtEncoder( JSON.stringfy(obj));
    const hash =
        await crypto.subtle.digest("SHA-1", data);

    return hash;
}

function hashBufferToString (hashBuffer)
{
    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}

// ----------------------------------------------------
//  handle rendering
//

// === message component rendering ===
// @ todo
const isSenderReader = (_) => false

async function makeMessage (params)
{
    const {content, sender, time, index} = params;

    const msgMod    =
        (isSenderReader(sender) ? "local" : "external");
    const classList = "message " + msgMod;

    const compContent = `
        <img src="${sender}"
             alt="${semder.name} profile pic"
             class=message__pfp/>
        <span class=message__content>
            ${msgContent}
        </span>
        <span class=message__time>
            ${time}
        </span>
    `;
    
    return {
        _hash: await hashObject(params),
        content: CompContent, classList,
    };
};

// === message list rendering ===

function updateElements ()
{
    // @ todo
}

function makeMessageList (msgList, user)
{
    const hash = hashBufferToHex(data.dash)
    const renderMsg = (data) =>
        `
            <div class=${data.classList}
                 data-element-id=${hash}>
                ${data.content}
            </div>
        `;

    const childrenHashList = (msgCompList) =>
        msgCompList.map(({_hash}) => _hash)

    function msgListComponents (msgList)
    {
        const msgCompDataList = msgList
            .map(async (msg) => {
                const compData =
                    await makeMessage(msg);
            });
        
        return Promise
            .allSettled(msgCompDataList);
    };

    const compDataList = msgListComponents(msgList)
     
    const listContent =  compDataList
        .map((compData) => renderMsg(compData))
        .join("");

    const elementContent = `
        <ul>${listContent}</ul>
    `;

    return {
        childData: childrenHashList(compDataList),
        content: elementContent,
        classList: "chat-room",
    };
}

const chatUI = {
    init:   () =>
    {
        // @ todo
    },
    render: () =>
    {
        // @ todo
    },
};
