/* global monogatari */
let COHERE_API_KEY = "6eMUUH6enfvEKAdXQLlKR9lgRAJ5gwRnKy8o6i09";
// Define the messages used in the game.
async function asynchttpPost(context) {
  try {
    const payload = {
      max_tokens: 70,
      truncate: "END",
      return_likelihoods: "NONE",
      prompt: context,
      stream: true,
    };
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + COHERE_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    monogatari.storage().player.generated_response = "";
    const reader = response.body.getReader();
    while (true) {
      const { value, done } = await reader.read();
      let str = "";
      if (done) break;
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value[i]);
      }
      result = JSON.parse(str);
      monogatari.storage().player.generated_response += result.text;

      console.log(result.text);
      // alert('Received', value);
      if (result.is_finished === "COMPLETE") break;
    }
    //   const data = await response.json();
    //   return data;
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    throw error;
  }
}

function httpPostSync(context) {
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
monogatari.assets("scenes", {});

// Define the Characters
monogatari.characters({
  y: {
    name: "Yui",
    color: "#5bcaff",
  },
});

monogatari.storage({
  player: {
    name: "",
    intelligence: 0,
  },
});

function sendAlert() {
  // alert('This is pretty useful!');
  // alert(monogatari.storage().player.intelligence)
  cohere_response = httpPostSync(monogatari.storage().player.player_response);
  monogatari.storage().player.generated_response = cohere_response;
  // alert(cohere_response);
  return true;
}

async function asyncSendAlert() {
  await asynchttpPost("This is an example of a vampire attack");
}
function bumpIntelligence() {
  monogatari.storage().player.intelligence += 5;
}

monogatari.script({
  // The game starts here.
  Start: [
    "show scene #f7f6f6 with fadeIn",
    // 'show notification Welcome',
    // {
    //   Input: {
    //     Text: "What is your name?",
    //     Validation: function (input) {
    //       return input.trim().length > 0;
    //     },
    //     Save: function (input) {
    //       this.storage({
    //         player: {
    //           name: input,
    //           intelligence: 0,
    //         },
    //       });
    //       return true;
    //     },
    //     Revert: function () {
    //       this.storage({
    //         player: {
    //           name: "",
    //           intelligence: 0,
    //         },
    //       });
    //     },
    //     Warning: "You must enter a name!",
    //   },
    // },
    "y Hi {{player.name}} Welcome to Monogatari!",
    "jump Yes",
    // {
    //   Choice: {
    //     Dialog: "y Have you already read some documentation? (hell yeah)",
    //     Yes: {
    //       Text: "Yes",
    //       Do: "jump Yes",
    //     },
    //     No: {
    //       Text: "No",
    //       Do: "jump No",
    //     },
    //   },
    // },
  ],

  Yes: [
    "y Thats awesome!",
    "y Then you are ready to go ahead and create an amazing Game!",
    "y I can’t wait to see what story you’ll tell!",
    {
      Input: {
        Text: "What is your response?",
        // Validation: function (input) {
        //   return input.trim().length > 0;
        // },
        Save: function (input) {
		  monogatari.storage().player.player_response = input
          return true;
        },
      },
    },

    sendAlert,
    "y {{player.generated_response}}",
    "jump Yes",
  ],

  No: [
    "y You can do it now.",

    "show message Help",

    "y Go ahead and create an amazing Game!",
    "y I can’t wait to see what story you’ll tell!",
    "end",
  ],
});
