const chat = document.querySelector("#chat>ul");
const messageList = [];

const range = (start, stop, step) => {
    let a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
};

const deleteMessageByIdx = (idx) => {
    chat.removeChild(messageList[idx].child)
    messageList.splice(idx, 1);
};


ComfyJS.onChat = (user, message, flags, self, extra) => {
    
    const userState = extra?.userState;
    

    let nickNameTag = document.createElement("span");
    let messageTag = document.createElement("span");

    let newMessage = document.createElement("li");

    let userPrefix = "/usr/";

    if (!userState.username.includes("bot") && userState.mod) {
        userPrefix = "/sys/"
    } else if (userState.subscriber) {
        userPrefix = "/root/"
    } else if (userState.username.includes("bot")) {
        userPrefix = "/dev/";
    } else if ("vip" in userState.badges) {
        userPrefix = "/rwx+/";
    }
    
    //"vip": "rwx",
    let userNickname = user.toLowerCase();
    let userColor = extra?.userColor || "#2023A9";

    nickNameTag.innerText = `${userPrefix}${userNickname}`;
    nickNameTag.className = "nickname";
    nickNameTag.style = `background-color: ${userColor}`;

    messageTag.innerText = message;
    messageTag.className = "message";

    newMessage.append(nickNameTag);
    newMessage.append(messageTag);
    messageList.push({time: new Date(), child: newMessage});
    chat.append(newMessage);

    if (messageList.length >= 8) {
        deleteMessageByIdx(0);
    }

    const allMessageElements = document.getElementsByClassName("message");

    for (let idx = 0; idx < allMessageElements.length; idx++) {
        if (idx !== allMessageElements.length - 1) {
            allMessageElements[idx].className = "prev-message";
        }
    }
}

setInterval(() => {
    if (messageList.length >= 1) {
        deleteMessageByIdx(0);
    }
}, 15000);


ComfyJS.Init("iamEmo");
