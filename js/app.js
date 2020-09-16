//Init function, generate routes and sets frienship to 0

function init() {
    var router = new Router([
        new Route('profile', 'profile.html', true),            
        new Route('chat', 'chat.html')
    ]);

    if(!localStorage.getItem("friendStatus")){localStorage.setItem("friendStatus",0)};
}
init();



/* Event delegation for dynamically created elements */
//Add friend
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'colorChange'){
        document.getElementById("profile-wrapper").classList.toggle("friend");
        document.getElementById("colorChange").classList.toggle("friend");
        reverseFriendStatus();
     }
 });

 //Enter keypress for sending chat msg
 document.addEventListener('keypress',function(e){
    if(e.target && e.target.id== 'reply'){
        if(e.key==="Enter"  && !e.shiftKey || e.key==="13" && !e.shiftKey){
            newReply();
        }
     }
 });
 
 //Keyup from enter into textearea for msg to clean it.
 document.addEventListener('keyup',function(e){
    if(e.target && e.target.id== 'reply'){
        if(e.key==="Enter"  && !e.shiftKey || e.key==="13" && !e.shiftKey){
            document.getElementById('reply').value="";
        }
     }
 });


 //----------------------------------------------
 //Profile page

 //Reverses localstorage for friendship status
 reverseFriendStatus = () => {
     if(localStorage.getItem("friendStatus")==1){localStorage.setItem("friendStatus", 0)}
     else{localStorage.setItem("friendStatus", 1)}     
 }

 //Reads friend status from localstorage and applies it
 applyFriendStatus = () =>{
     if(localStorage.getItem("friendStatus")==1){
        document.getElementById("profile-wrapper").classList.add("friend");
        document.getElementById("colorChange").classList.add("friend");
     }else{
        document.getElementById("profile-wrapper").classList.remove("friend");
        document.getElementById("colorChange").classList.remove("friend");
     }
 }
 

 //----------------------------------------------
//Chat Page

//Generates random msg from the chat, storing it in sessionstorage
generateRandomMsg = (oldMsg) =>{
    const msgList= [
        "Forfeited you engrossed but gay sometimes explained. Another as studied it to evident.",
        "Merry sense given he be arise. Conduct at an replied removal an amongst",
        "Remaining determine few her two cordially admitting old.",
        "Sometimes strangers his ourselves her depending you boy.",
        "Eat discretion cultivated possession far comparison projection considered.",
        "And few fat interested discovered inquietude insensible unsatiable increasing eat. ",
        "Carried nothing on am warrant towards.",
        "Polite in of in oh needed itself silent course.",
        "Assistance travelling so especially do prosperous appearance mr no celebrated.",
        "Wanted easily in my called formed suffer. ",
        "Songs hoped sense as taken ye mirth at.",
        "Believe fat how six drawing pursuit minutes far.",
        "Same do seen head am part it dear open to. ",
        "Whatever may scarcely judgment had.",
    ];

    let newMsg="";

    oldMsg ? newMsg =oldMsg : newMsg =msgList.sort(function() {return 0.5 - Math.random()})[0]

    saveMsg(newMsg, "answer");

    let div = document.createElement('div');
    div.innerHTML = `
    <div class="chat-msg">
        <div class="chat-bubble-answer">
            <p>${newMsg}</p>
        </div>
        <div class="avatar-bubble-answer back">
            <a href="#profile"><img class="back circular" src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg"/></a>
        </div>
    </div>`;
    document.getElementById('chat-container').appendChild(div);

}

//Generates new reply in the chat, storing it in sessionstorage
newReply = (oldMsg) => {
    let div = document.createElement('div');
    let newMsg="";
    
    oldMsg ? newMsg =oldMsg : newMsg =document.getElementById('reply').value

    div.innerHTML = `
        <div class="chat-msg">

        <div class="avatar-bubble-reply">
            <img  class="circular" src="https://www.iconfinder.com/data/icons/avatars-1-5/136/87-512.png"/>
        </div>
        <div class="chat-bubble-reply">
            <p>${newMsg}</p>
        </div>
        
    </div>`;

    document.getElementById('chat-container').appendChild(div);
    saveMsg(newMsg, "reply");

    //Simulates a response from the chat
    if(!oldMsg) setTimeout(function(){ generateRandomMsg() }, 1000);
}

//Saves new message and types to session storage
saveMsg = (text, type) => {
    let msgList =sessionStorage.getItem('msgList');
    if(msgList){
        let parsedJSON=JSON.parse(msgList);
        parsedJSON.push({[type]:text});
        sessionStorage.setItem('msgList', JSON.stringify(parsedJSON));
    }else{
        msgList= [{[type] : text}]
        sessionStorage.setItem('msgList', JSON.stringify(msgList));
    }
    
}

//Loads chat history from session storage
loadChatHistory = () =>{
    let msgList =JSON.parse(sessionStorage.getItem('msgList'));
    sessionStorage.removeItem('msgList');

    msgList.forEach(function(message,index) { 
        switch (Object.keys(message)[0]){
            case "answer":
                generateRandomMsg(message[Object.keys(message)[0]]);
            break;

            case "reply":
                newReply(message[Object.keys(message)[0]]);
            break;

            default:
                alert("Something went wrong!")

        }
     })  
}

//Init chat function, loads old messages or generates the first one
initChat = () =>{   
    document.getElementById("chat-container").innerHTML="";
    
    if(sessionStorage.getItem('msgList')){/*The message history should persist when user navigates from one view to another or refreshes the page. */
        loadChatHistory();
    }else{ /*When the chat is opened, a random message from the other user should appear. */
        generateRandomMsg();
    }
    
}




