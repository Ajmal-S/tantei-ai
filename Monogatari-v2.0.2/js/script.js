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

let Intr = [
  "The time period is pre digital.",
  "A detective arrives at an inn for a holiday.",
  "They are greeted by a butler who doubles as a concierge named William.",
  "There is some activity in the dining room as it looks a guest, Anthony, the inn's owner Colonel Sanders and his son James seem to be having a celebratory dinner.",
  "The detective is invited to join but chooses to have a small meal in his room instead and retire early due to being tired.",
  "The detective is led to the kitchen where he sees the cook Hakim and the maids Sofia and Anya having a small get together of their own.",
  "With a half empty bottle of wine and two glasses on the kitchen counter.",
  "The detective takes their snack and goes to bed.",
  "The layout of the inn is as follows there are two floors, the ground floor has three bed rooms, a dining area, a lounge and a kitchen while the top floor has only three larger bedrooms.",
  "Anya, Sofia and William use the three bedrooms on the ground floor which are all in one corridor.",
  "The upper floor has two corridors, one with a master bedroom and another with two bedrooms, one of which the detective is using and another which Anthony is using.",
  "In the morning the detective is awoken by a scream, they quickly head towards it and see the maid Anya backing away from the master bedroom.",
  "When the detective looks inside, they see that the Colonel is plopped on his bed staring at the ceiling.",
  "There is a foul smell in the room from the body and the detective can surmise that the death occured around 2 hours ago.",
  "There is, suspiciously, a glass besides his desk that looked like it had liquor in it and some liquor splatttered on the floor.",
  "The detective rounds up every member at the inn and then questions them individually attempting to uncover the truth behind the issue before the local police arrive.",
];

let GAME_DATA = {
  introString: [],
  initialSetting:
    "The time period is pre digital. A detective arrives at an inn for a holiday. They are greeted by a butler who doubles as a concierge named William. There is some activity in the dining room as it looks a guest, Anthony, the inn's owner Colonel Sanders and his son James seem to be having a celebratory dinner. The detective is invited to join but chooses to have a small meal in his room instead and retire early due to being tired. The detective is led to the kitchen where he sees the cook Hakim and the maids Sofia and Anya having a small get together of their own. With a half empty bottle of wine and two glasses on the kitchen counter. The detective takes their snack and goes to bed. The layout of the inn is as follows there are two floors, the ground floor has three bed rooms, a dining area, a lounge and a kitchen while the top floor has only three larger bedrooms. Anya, Sofia and William use the three bedrooms on the ground floor which are all in one corridor. The upper floor has two corridors, one with a master bedroom and another with two bedrooms, one of which the detective is using and another which Anthony is using. In the morning the detective is awoken by a scream, they quickly head towards it and see the maid Anya backing away from the master bedroom. When the detective looks inside, they see that the Colonel is plopped on his bed staring at the ceiling. There is a foul smell in the room from the body and the detective can surmise that the death occured around 2 hours ago. There is, suspiciously, a glass besides his desk that looked like it had liquor in it and some liquor splatttered on the floor. The detective rounds up every member at the inn and then questions them individually attempting to uncover the truth behind the issue before the local police arrive.",
  william:
    "William is 58 years old. He has been friends with the colonel for a long time. He is quite happy to share the information about this friendship. He has a gambling problem that the colonel recently learnt about and helped with, he is very ashamed about this information and does not want to reveal it. But if made to feel guilty about withholding information it can overcome the feeling of shame. He delegates the responsibility of managing Hakim and Sofia to Anya and tends to handle administrative tasks for the colonel and the inn. He does not think about Hakim or Sofia much and has a professional respect for Anya. He does not like James, he thinks James is a bad son. He doesn't necessarily think he murdered him but does not like him. He also knew that the colonel had received a letter from James a few weeks ago and that the colonel planned to go to town to visit a solicitor with James while he was visiting. He also saw Sofia arrive back from her usual trip to the farm to collect some vegetables in the morning.",
  james:
    "James is 37 years old and the colonel's son. He is currently very shocked and not able to respond very clearlyto questions but will improve in responding after a few questions (around 4) and might give a clearer answer to questions if they are repeated after he has calmed down. He left home after his mother died 15 years ago to join the military. He washed out but blamed his father as he believed the colonel used his influence to hurt his career. He does not like telling other people the reason for their estrangement. He has been hanging around eastern europe with a woman named Roya for the last seven years and is quite ashamed of his lifestyle at the moment. He ran out of funds and had to contact his father recently, he is very reluctant to share this information with anyone almost to the point of denying it unless he feels like he is seriously being accused of being the murderer. As he had arrived the previous day, he does not have a strong feeling about any of the other occupants of the inn except William who he knew beforehand. He does not like William as the older man had a habit of belittling him. He has noticed two things that are odd, but he will not piece this unless he has calmed down and has been asked about suspicious behavior regarding the specific parties. He noticed that Hakim and Anya seemed to whispering with some concern prior to dinner and he has also noticed Sofia looking at him with an odd expression. He assumes that she had a crush on him.",
  anya: "Anya is 50 years old and has been working for the colonel for the last 10 years. She discovered the body but recovers quickly. She knows that Hakim has been stealing the colonel's expensive liquor by diluting it and selling the parts that he siphoned. She and Hakim were sharing some of that expensive liquor the previous night. Sofia had declined to join them even though she asked, but she will not think to mention this unless specifically asked to go into detail about the liquor consumed the previou night. She will also attempt to hide the liquor stealing unless directly confronted with the information or if she thinks she is going to be accused and this might help exonerate her. She works as a somewhat equal to William but they don't interact much as they have different responsibilities. She knew that the colonel had taken some money out recently after receiving a letter from James (William told her about the letter). She has guessed that the money was for James. She has also noticed that Anthony left Sofia's room around an hour before she discovered the body. This confirms a suspicion she had once she discovered what looked like a strand of Sofia's hair while cleaning Antony's room. She is very reluctant to mention this as it would be improper and she does not want to embarass the younger woman unless presented with a compelling case to do so. She also saw that Sofia had placed the basket of vegetable she had picked in the pantry.",
  hakim:
    "Hakim is 41 years old and the cook for the inn. He does not live in the inn but at a nearby village and is a fan of the local gambling house and theater. He has been stealing liquor from the colonel by diluting it and selling the extra. After Anya caught him, he convinced her to join his scheme. He does not want to reveal this information but will if he thinks it might be relevant to solving the case. Hakim knows that william often gambles in the nearby village but not much more about him. With the guest Anthony, he has subconciously noticed that he doesn't seem to have the pallete of someone from the city but will not be able to think of this explicitly unless asked about anyone reacting badly to some of the food. He also has an odd feeling that he has seen the man's face before but cannot place it. If pressed on it, he could conclude that the man reminds him of a character from a play but not much more than that. If prompted about the pantry specifically, he will remember that it looked like Sofia made a mistake with the vegetables and picked up turnips in stead of onions and this was odd as she did this chore daily. It looks ",
  anthonyAKAliam:
    "Anthony, whose real name is Liam is 27 years old is the younger brother of Sofia and is staying at the inn pretending to be a banker from the city. He is an accomplice to the murder and is looking to hdie this at all costs. He is an actor who has acted in a play that Hakim has seen, but hopes that the man won't be able to identify him. He is good at lying but is a coward and if aggressively cornered will start to make mistakes. He has been at the inn for 4 days and has noticed some things. Sofia wants him to feign total ignorance and he will attempt to do so, but if pressed his theatric side can come out and he might let slip either that things between the colonel and william seemed tense or that Hakim and Anya seemed to be more involved than just two normal staff members. He dressed up as Sofia using a wig and went to the farm, picked vegetables and retruned during the murder. This was to make it look like Sofia couldn't have done it because she was not in the house. If pressed about leaving Sofia's room in the morning, he will pretend to have been sleeping with her sheepishly. He did not know which vegetables to pick and just grabbed a few at random. Again, he is a bit of coward and if the detective is aggressive enough, his lies will start to become scattered and inconsistent.",
  sofia:
    "Sofia is 29 years old and the murderer. She was having a secret relationship with the Colonel and recently discovered that she was pregnant. The colonel also started to suspect this but to her dismay, seemed to be taking steps ensure that the unborn child would not receive any of his wealth. After the party, she snuck to the colonel's room as she had before, he lets her in , she offers a glass to drink before moving to the bed. The colonel drinks the liquor and collapses from the thallium mixed in. She will lie at almost all costs about this. She has an alibi as her brother disguised as her was seen out of the house during this time. She seems quite shook about the colonel's death as she did love him even though she eventually made the decision to kill him. This presents more as grief than guilt as she feels like she had no other choice. She will try to coyly hint at William having possible issues with the colonel but nothing concrete. She will speak like she knows something but refuse to elaborate about Anya and Hakim. If confronted by the detective that he knows Liam's real identity she will break down and confess but only in this case. If she is asked directy about maybe being pregnant, she might even come clean about the affair with the colonel. After killing him, she stole the living will he had drafted and burn it, in the hopes that the revelation would garner her sympathy without the will to indicate motive. She does not know what vegetables her brother had picked this morning, nor does she know that others saw her brother exiting her room. She will be flustered the first time she is confronted about either of this but might come up with a quick lie if asked again and will try to incorporate anything the detective gives them that could explain these things.",
};

function coherePostRequest(context) {
  try {
    const xhr = new XMLHttpRequest();
    console.log("Sending request");
    xhr.open("POST", " https://api.cohere.ai/v1/generate", false); // Setting the third parameter to false makes the request synchronous
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + COHERE_API_KEY);
    const payload = {
      max_tokens: 120,
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
  detective: {
    name: "Detective",
  },
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
    anthonyAKAliam: [],
  },
  current_investigated_character: "narrator",
  selected_murderer: "narrator",
  selected_murderer_full_name: "narrator",
  murder_justification: "",
  cohere_murder_response: "",
});

function removeAfterLastOccurrence(str, substring) {
	// Find the last occurrence of the substring
	const lastIndex = str.lastIndexOf(substring);
  
	// If the substring is not found, return the original string
	if (lastIndex === -1) {
	  return str;
	}
  
	// Remove everything after the last occurrence of the substring
	return str.substring(0, lastIndex + substring.length);
  }
  
function constructMurderPrompt(target, history, reasoning) {
  // Initialize the story string with the initial setting
  let prompt = `Give this setting ${GAME_DATA.initialSetting}\n`;

  full_investigated_name = monogatari.characters()[target].name;

  // Add the detective's investigation target
  prompt += `The detective is investigating by talking to ${full_investigated_name}\n`;

  // Add the current information regarding the target
  prompt += `This is the current information regarding ${GAME_DATA[target]}\n`;

  // Simulate a conversation between the target and the detective
  prompt += `The following is a conversation between ${full_investigated_name} the detective:\n`;

  // Iterate over the history to add previous dialogues
  for (let i = 0; i < history.length; i++) {
    prompt += `${history[i]}\n`;
  }

  // Add the detective's question
  prompt += `The Detective's reasoning for ${full_investigated_name} murdering Sanders is ${reasoning}`;

  prompt += `Summarize why the detective is correct or incorrect.`;
  return prompt;
}
function makeCohereMurderRequest() {
  // alert('This is pretty useful!');
  // alert(monogatari.storage().player.intelligence)
  murder_justification = monogatari.storage().murder_justification;
  selected_murderer = monogatari.storage().selected_murderer;
  chat_history = monogatari.storage().character_chat_log[selected_murderer];
  console.log(murder_justification);
  console.log(selected_murderer);
  console.log(chat_history)
  cohere_prompt = constructMurderPrompt(
    selected_murderer,
    chat_history,
    murder_justification
  );
  console.log(cohere_prompt);
  cohere_response = coherePostRequest(cohere_prompt);
  cohere_response = removeAfterSubstring(cohere_response, "Detective:");
  cohere_response = removeAfterSubstring(cohere_response, "detective:");
  cohere_response = removeAfterLastOccurrence(cohere_response, ".")
  console.log(cohere_prompt, cohere_response);
  monogatari
    .storage()
    .character_chat_log[current_investigated_character].push(
      "Detective: " + player_response
    );
  monogatari
    .storage()
    .character_chat_log[current_investigated_character].push(
      full_investigated_name + ": " + cohere_response
    );
  monogatari.storage().cohere_murder_response = cohere_response;
  console.log(cohere_response);
  // alert(cohere_response);
  return true;
}

function constructPrompt(target, history, question) {
  // Initialize the story string with the initial setting
  let prompt = `Give this setting ${GAME_DATA.initialSetting}\n`;

  full_investigated_name = monogatari.characters()[target].name;

  // Add the detective's investigation target
  prompt += `The detective is investigating by talking to ${full_investigated_name}\n`;

  // Add the current information regarding the target
  prompt += `This is the current information regarding ${GAME_DATA[target]}\n`;

  // Simulate a conversation between the target and the detective
  prompt += `Simulate the a single response from ${full_investigated_name} in the conversation between the target and the detective:\n`;

  // Iterate over the history to add previous dialogues
  for (let i = 0; i < history.length; i++) {
    prompt += `${history[i]}\n`;
  }

  // Add the detective's question
  prompt += `Detective: ${question}\n`;

  prompt += `${full_investigated_name}: `;
  return prompt;
}

function removeAfterSubstring(str, sub) {
  const index = str.indexOf(sub);

  if (index === -1) {
    return str; // Substring not found, return original string
  }

  return str.substring(0, index + sub.length);
}

function makeCohereRequest() {
  // alert('This is pretty useful!');
  // alert(monogatari.storage().player.intelligence)
  player_response = monogatari.storage().player.player_response;
  current_investigated_character =
    monogatari.storage().current_investigated_character;
  chat_history =
    monogatari.storage().character_chat_log[current_investigated_character];
  cohere_prompt = constructPrompt(
    current_investigated_character,
    chat_history,
    player_response
  );
  console.log(cohere_prompt);
  cohere_response = coherePostRequest(cohere_prompt);
  cohere_response = removeAfterSubstring(cohere_response, "\n");
  cohere_response = removeAfterSubstring(cohere_response, "Detective:");
  cohere_response = removeAfterSubstring(cohere_response, "detective:");
  cohere_response = removeAfterLastOccurrence(cohere_response, ".")
  console.log(cohere_prompt, cohere_response);
  monogatari
    .storage()
    .character_chat_log[current_investigated_character].push(
      "Detective: " + player_response
    );
  monogatari
    .storage()
    .character_chat_log[current_investigated_character].push(
      full_investigated_name + ": " + cohere_response
    );
  monogatari.storage().player.generated_response = cohere_response;
  console.log(monogatari.storage().character_chat_log);
  // alert(cohere_response);
  return true;
}

async function asyncSendAlert() {
  await asynchttpPost("This is an example of a vampire attack");
}
function onInvestigateChosen(character) {
  monogatari.storage().current_investigated_character = character;
}
function onMurderSelected(character) {
  full_investigated_name = monogatari.characters()[character].name;
  monogatari.storage().selected_murderer_full_name = full_investigated_name;
  monogatari.storage().selected_murderer = character
}

function checkIfFirstMessage() {
  current_investigated_character =
    monogatari.storage().current_investigated_character;
  if (
    monogatari.storage().character_chat_log[current_investigated_character]
      .length == 0
  ) {
    first_message = "What would you like to know?";
    full_investigated_name =
      monogatari.characters()[current_investigated_character].name;
    // monogatari.storage().character_chat_log[current_investigated_character].push(full_investigated_name + ": " + first_message)
    monogatari.storage().player.generated_response = first_message;
  }
}

monogatari.script({
  // The game starts here.
  Start: [
    "show scene inn with fadeIn",
    "show character narrator main",
    "narrator Hi Welcome to Murder Vacation!",
    "narrator Let's meet our supec..I mean cast!",
    "hide character narrator",
    "show character anya main",
    "anya Anya is an older maid who handles the managing of Sofia and Hakim",
    "hide character anya",
    "show character sofia main",
    "sofia Sofia is a younger maid who handles chores and collecting vegetables",
    "hide character sofia",
    "show character hakim main",
    "hakim Hakim is a middle aged cook for the inn.",
    "hide character hakim",
    "show character william main",
    "william William is an old butler who handles the administration for the inn and the colonel.",
    "hide character william",
    "show character james main",
    "james James is the colonel's son in who is in his mid thirties",
    "hide character james",
    "show character anthonyAKAliam main",
    "anthonyAKAliam Anthony is a young banker from the city who has been staying at the inn for a few days",
    "hide character anthonyAKAliam",
    "show character narrator main",
    "narrator You are a detective who has arrived this inn",
    "narrator You see the colonel, his son and William having a dinner at the dining area",
    "narrator You go to take a snack from the kitchen and retire early, you see Anya, Hakim and Sofia with a half empty bottle of liquor and two glasses",
    "narrator The next morning you are woken up by a scream",
    "narrator You quickly head towards it and see the maid Anya backing away from the master bedroom.",
    "narrator You discover the dead body of the colonel staring at the sky and surmise he has been dead for a few hours.",
    "narrator There is, suspiciously, a glass besides his desk that looked like it had liquor in it and some liquor splatttered on the floor.",
    "narrator You round up every member at the inn and then question them individually attempting to uncover the truth behind the issue before the local police arrive.",
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
          Do: "jump MakeFinalGuess",
        },
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
	"hide character {{current_investigated_character}}",
    "show character narrator main",
    "narrator So you finally figured it out. Who is it?",
    {
      Choice: {
        Dialog: "narrator Who murdered colonel Sanders?",
        Anya: {
          Text: "Anya",
          onChosen: function () {
            onMurderSelected("anya");
          },
          Do: "next",
        },
        Hakim: {
          Text: "Hakim",
          onChosen: function () {
            onMurderSelected("hakim");
          },
          Do: "next",
        },
        James: {
          Text: "James",
          onChosen: function () {
            onMurderSelected("james");
          },
          Do: "next",
        },
        Sofia: {
          Text: "Sofia",
          onChosen: function () {
            onMurderSelected("sofia");
          },
          Do: "next",
        },
        William: {
          Text: "William",
          onChosen: function () {
            onMurderSelected("william");
          },
          Do: "next",
        },
        AnthonyAKAliam: {
          Text: "Anthony",
          onChosen: function () {
            onMurderSelected("anthonyAKAliam");
          },
          Do: "next",
        },
      },
    },
    "narrator so you think {{selected_murderer_full_name}} killed him..",
    "narrator how did you arrive at that conclusion?",
    {
      Input: {
        Text: "Piece together the clues and summarize why {{selected_murderer_full_name}} murdered colonel Sanders?",
        Save: function (input) {
          monogatari.storage().murder_justification = input;
          return true;
        },
      },
    },
    makeCohereMurderRequest,
    "narrator {{cohere_murder_response}}",
	"narrator Thank you for playing Murder Vacation",
    "end",
  ],
});
