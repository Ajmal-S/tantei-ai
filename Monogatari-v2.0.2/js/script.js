/* global monogatari */
let COHERE_API_KEY = "6eMUUH6enfvEKAdXQLlKR9lgRAJ5gwRnKy8o6i09";
// Define the messages used in the game.
// async function asynchttpPost(context) {
//   try {
//     const payload = {
//       max_tokens: 70,
//       truncate: "END",
//       return_likelihoods: "NONE",
//       prompt: context,
//       stream: true,
//     };
//     const response = await fetch("https://api.cohere.ai/v1/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + COHERE_API_KEY,
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     monogatari.storage().player.generated_response = "";
//     const reader = response.body.getReader();
//     while (true) {
//       const { value, done } = await reader.read();
//       let str = "";
//       if (done) break;
//       for (var i = 0; i < value.byteLength; i++) {
//         str += String.fromCharCode(value[i]);
//       }
//       result = JSON.parse(str);
//       monogatari.storage().player.generated_response += result.text;

//       console.log(result.text);
//       // alert('Received', value);
//       if (result.is_finished === "COMPLETE") break;
//     }
//     //   const data = await response.json();
//     //   return data;
//   } catch (error) {
//     console.error(`Fetch failed: ${error}`);
//     throw error;
//   }
// }

function coherePostRequest(context) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", " https://api.cohere.ai/v1/generate", false); // Setting the third parameter to false makes the request synchronous
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + COHERE_API_KEY);
    const payload = {
      max_tokens: 129,
      truncate: "END",
      return_likelihoods: "NONE",
      prompt: context,
    };
    xhr.send(JSON.stringify(payload));

    if (xhr.status !== 200) {
      throw new Error(`HTTP error! status: ${xhr.status}`);
    }

    response = JSON.parse(xhr.responseText);
    return response.generations[0].text;
  } catch (error) {
    console.error(`Request failed: ${error}`);
    throw error;
  }
}

// function httpPostSyncChat(context) {
//   try {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", " https://api.cohere.ai/v1/chat", false); // Setting the third parameter to false makes the request synchronous
//     xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhr.setRequestHeader("Authorization", "Bearer " + COHERE_API_KEY);

// 	preamble = "You are a blissful angel here to soothe the user"
//     chat_history = [
//       { user_name: "User", message: "Hey! How are you doing today?" },
//       { user_name: "Bot", message: "I am doing great! How can I help you?" },
//     ];

//     const payload = {
//       max_tokens: 20,
//       truncate: "END",
//       return_likelihoods: "NONE",
//       "preamble": preamble,
// 	  "chat_history": chat_history
//     };
//     xhr.send(JSON.stringify(payload));

//     if (xhr.status !== 200) {
//       throw new Error(`HTTP error! status: ${xhr.status}`);
//     }

//     response = JSON.parse(xhr.responseText);
// 	alert(response)
//     return response.generations[0].text;
//   } catch (error) {
//     console.error(`Request failed: ${error}`);
//     throw error;
//   }
// }

monogatari.action("message").messages({
  Help: {
    title: "Help",
    subtitle: "Some useful Links",
    body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`,
  },
});

// Define the notifications used in the game
monogatari.action("notification").notifications({
  Welcome: {
    title: "Welcome",
    body: "This is the Monogatari VN Engine",
    icon: "",
  },
});

// Define the Particles JS Configurations used in the game
monogatari.action("particles").particles({});

// Define the canvas objects used in the game
monogatari.action("canvas").objects({});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration("credits", {});

// Define the images that will be available on your game's image gallery
monogatari.assets("gallery", {});

// Define the music used in the game.
monogatari.assets("music", {});

// Define the voice files used in the game.
monogatari.assets("voices", {});

// Define the sounds used in the game.
monogatari.assets("sounds", {});

// Define the videos used in the game.
monogatari.assets("videos", {});

// Define the images used in the game.
monogatari.assets("images", {});

// Define the backgrounds for each scene.
monogatari.assets("scenes", { inn: "main.jpg" });

// Define the Characters
monogatari.characters({
  anya: {
    name: "Anya",
    directory: "anya",
    sprites: { main: "main.png" },
  },
  hakim: {
    name: "Hakim",
    directory: "hakim",
    sprites: { main: "main.png" },
  },
  james: {
    name: "James",
    directory: "james",
    sprites: { main: "main.png" },
  },
  sofia: {
    name: "Sofia",
    directory: "sofia",
    sprites: { main: "main.png" },
  },
  william: {
    name: "William",
    directory: "william",
    sprites: { main: "main.png" },
  },
  anthonyAKAliam: {
    name: "Anthony",
    directory: "anthonyAKAliam",
    sprites: { main: "main.png" },
  },
  narrator: {
    name: "Narrator",
    directory: "narrator",
    sprites: { main: "main.png" },
  },
  detective:{
	name: "Detective"
  }
});

monogatari.storage({
  player: {
    name: "",
    intelligence: 0,
  },
  character_chat_log: {
	anya: [],
	hakim: [],
	james: [],
	sofia: [],
	william: [],
	anthonyAKAliam: []
  },
  current_investigated_character: "narrator"
});

function makeCohereRequest() {
  // alert('This is pretty useful!');
  // alert(monogatari.storage().player.intelligence)
  player_response = monogatari.storage().player.player_response
  cohere_response = coherePostRequest(
    player_response
  );
  current_investigated_character = monogatari.storage().current_investigated_character
  monogatari.storage().character_chat_log[current_investigated_character].push("Detective: " + player_response)
  monogatari.storage().character_chat_log[current_investigated_character].push(full_investigated_name + ": " + cohere_response)
  monogatari.storage().player.generated_response = cohere_response;
  console.log(monogatari.storage().character_chat_log)
  // alert(cohere_response);
  return true;
}

async function asyncSendAlert() {
  await asynchttpPost("This is an example of a vampire attack");
}
function onInvestigateChosen(character) {
  monogatari.storage().current_investigated_character = character;
}

function checkIfFirstMessage(){
	current_investigated_character = monogatari.storage().current_investigated_character
	if (monogatari.storage().character_chat_log[current_investigated_character].length == 0){
		first_message = "What would you like to know?"
		full_investigated_name = monogatari.characters()[current_investigated_character].name
		// monogatari.storage().character_chat_log[current_investigated_character].push(full_investigated_name + ": " + first_message)
		monogatari.storage().player.generated_response = first_message
	}
}

monogatari.script({
  // The game starts here.
  Start: [
    "show scene inn with fadeIn",
    "show character narrator main",
    "narrator Hi {{player.name}} Welcome to Monogatari!",
	"hide character narrator",
    "show character anya main",
    "anya anya intro",
	"hide character anya",
    "show character hakim main",
    "hakim hakim intro",
	"hide character hakim",
    "show character narrator main",
    "narrator Give player intro here",
    "jump investigateChoice",
  ],
  investigateChoice: [
	"hide character {{current_investigated_character}}",
    {
	  
      Choice: {
        Dialog: "narrator Who do you want to investigate?",
        Anya: {
          Text: "Anya",
          onChosen: function () {
            onInvestigateChosen("anya");
          },
          Do: "jump InvestigateLoop",
        },
        Hakim: {
          Text: "Hakim",
          onChosen: function () {
            onInvestigateChosen("hakim");
          },
          Do: "jump InvestigateLoop",
        },
        James: {
          Text: "James",
          onChosen: function () {
            onInvestigateChosen("james");
          },
          Do: "jump InvestigateLoop",
        },
        Sofia: {
          Text: "Sofia",
          onChosen: function () {
            onInvestigateChosen("sofia");
          },
          Do: "jump InvestigateLoop",
        },
        William: {
          Text: "William",
          onChosen: function () {
            onInvestigateChosen("william");
          },
          Do: "jump InvestigateLoop",
        },
        AnthonyAKAliam: {
          Text: "Anthony",
          onChosen: function () {
            onInvestigateChosen("anthonyAKAliam");
          },
          Do: "jump InvestigateLoop",
        },
      },
    },
  ],
  InvestigateLoop: [
    "show character {{current_investigated_character}} main",
	checkIfFirstMessage,
	"{{current_investigated_character}} {{player.generated_response}}",
    // "{{current_investigated_character}} Thats awesome!",
    // "{{current_investigated_character}} Then you are ready to go ahead and create an amazing Game!",
    // "{{current_investigated_character}} I can’t wait to see what story you’ll tell!",
    {
      Choice: {
        Dialog: "narrator What do you want to do?",
        changeInvestigatationTarget: {
          Text: "Investigate someone else",
          Do: "jump investigateChoice",
        },
        respondToCurrentTarget: {
          Text: "Continue investigating {{current_investigated_character}}",
          Do: "next",
        },
		makeFinalGuess: {
			Text: "Guess the murderer",
			Do: "jump MakeFinalGuess"
		}
      },
    },
    {
      Input: {
        Text: "What is your response?",
        Save: function (input) {
          monogatari.storage().player.player_response = input;
          return true;
        },
      },
    },
	"detective {{player.player_response}}",
    makeCohereRequest,
    "jump InvestigateLoop",
  ],
  MakeFinalGuess: [
	"show character narrator main",
	"narrator So you finally figured it out. Who is it?",
	"end"
  ],
});
