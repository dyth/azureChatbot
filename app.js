// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: "5f246004-556a-4b2b-9ead-8a167a6f146d", appPassword: "j0k8RCRBgxLy7JcHjo6Qhuf"}); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

function greatest(array) {
	var greatest = 0;
	var index = 0;
	for (var i = 0; i < array.length; i++) {
		if (greatest < array[i]) {
			index = i;
			greatest = array[i];
		}
	}
	return index;
}

function spelling(sentence) {
	var sentence = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase()
	if (sentence.includes(" ")) {
		var words = sentence.split(" ");
	} else {
		var words = [sentence];
	}
	return words;
}

function category(sentence) {
	var topics = [["hello", "hey", "how", "sup", "good", "hi", "pleased", "what\'s"], ["change", "topics", "subject", "different"], ["don\'t", "know", "hint", "suggestion", "what", "mean", "unsure", "strange"], ["joke", "laugh", "funny", "humour"], ["stop", "enough", "quit", "halt", "no", "end", "finish"], ["mathematics", "maths", "sum"], ["physics"]];
	var categories = ["Greetings!", "Subject!", "Hint!", "Jokes!", "Quit!", "Mathematics!", "Physics!"];
	words = spelling(sentence);
	var counting = [];
	for (count = 0; count < categories.length; count++) {
		var score = 0;
		for (i = 0; i < words.length; i++) {
			// words into lower case .toLowerCase()
			if (topics[count].includes(words[i])) {
				score++;
			}
		}
		// compute score of how many are in topic.
		counting.push(score);
	}
	// print topic
	if (counting[greatest(counting)] == 0) {
		return "Confused!";
	} else {
		return categories[greatest(counting)];
	}
}

function subject(sentence) {
	words = spelling(sentence);
	var subject = ["mathematics", "maths", "sum", "math"]
	for (i = 0; i < words.length; i++) {
		if (subject.includes(words[i])) {
			return "Mathematics!";
		} else if ("physics" == words[i]) {
			return "Physics!";
		}
	}
	return "None!";
}


function question(sentence) {
	words = spelling(sentence);
	var quit = ["give", "up", "stop", "enough", "don't", "dont"];
	for (i = 0; i < words.length; i++) {
		if (quit.includes(words[i])) {
			return "Quit";
		}
	}
	return sentence;
}



var mathntQuestions = [
	"True or False: Sum of two positive even numbers is always even.",
	"True or False: There are infinitely many primes.",
	"True or False: Sum of two even numbers is always even.",
	"What is the 10th prime number?",
	"What is the largest prime divisor of 50?",
	"How many zeroes are there at the end of 20!?",
	"How many zeroes are there at the end of 25!?"
];

var mathntAnswers = [
	"True",
	"True",
	"True",
	"29",
	"5",
	"4",
	"6"
];

var mathcnQuestions = [
	"True or False: i, the square root of -1, is a real number.",
	"True or False: The magnitude of 3i is -3.",
	"If x=1+i, what is xx*?",
	"Find the magnitude of 3+4i",
	"True or False: Roots of polynomials with integer coefficients cannot be complex.",
	"Find the real part of (4+5i)(6-7i).",
	"Find the imaginary part of i^i."
];

var mathcnAnswers = [
	"False",
	"False",
	"2",
	"5",
	"False",
	"59",
	"0"
];

var physicsmcQuestions = [
	"An object moving at 5m/s is deccelerating at 1ms^(-2). How long (in seconds) does it take to stop?",
	"Alice and Bob are 100m apart. They move towards each other at 3m/s and 7m/s respectively. When will they pass each other?",
	"What is the linear momentum of a 1kg object moving at 5m/s?",
	"What is the kinetic energy of a 2kg point object moving at 5m/s?",
	"Charlie starts from rest and accelerates at 2ms^(-2). How far has he travelled after 10s?",
	"Dennis starts running at 2m/s, and is constantly accelerating at 2ms^(-2). How far has he travelled after 10s?",
	"Eddie jumps up with velocity 10m/s. How high does he go? Take g to be 10m/s^(-2)."
];

var physicsmcAnswers = [
	"5s",
	"10s",
	"5kgm/s",
	"25J",
	"100m",
	"120m",
	"5m"
];

var physicsemQuestions = [
	"True or False: Like charges attract.",
	"True or False: Moving charges generate magnetic fields.",
	"Find the electric field from a 1nC charge 1m away. Express your answer in 3 significant figures."
];

var physicsemAnswers = [
	"False",
	"True",
	"8.99"
];

var physicssrQuestions = [
	"True or False: An object in motion is perceived to be shorter when viewed by a stationary observer.",
	"True or False: The faster you move, the slower time passes around you.",
	"Find the perceived frequency of a 500GHz electromagnetic wave when viewed by an observer moving towards the wave at 5c/13."
];

var physicssrAnswers = [
	"True",
	"True",
	"750GHz"
];

var jokes = [
	"Why was Cinderella thrown off the basketball team? She ran away from the ball.",
	"I wasn't originally going to get a brain transplant, but then I changed my mind.",
	"Did you hear about the guy who got hit in the head with a can of soda? He was lucky it was a soft drink.",
	"I'm glad I know sign language, it's pretty handy.",
	"I am on a seafood diet. Every time I see food, I eat it.",
	"When I get naked in the bathroom, the shower usually gets turned on.",
	"A book just fell on my head. I've only got myshelf to blame."
];

var ans = "";
var topic = 0;

bot.dialog('/', [
    function (session, args, next) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
	function (session, results) {
        session.userData.name = results.response;
    }
	session.beginDialog('/checkintent');
]);

bot.dialog('/checkintent', [
	function (session) {
		builder.Prompts.text(session, 'Hello ' + session.userData.name + ', how can I help you today?');
	},
	function (session, results) {
		var response = category(results.response);
		if (response == "Jokes!") {
			session.beginDialog('/telljoke'); 
		} else if (response == "Quit!") {
			session.send("Bye bye!");
			session.endDialog();
		} else if (response == "Subject!") {
			session.beginDialog('/subject');
		} else if (response == "Greetings!") {
			session.send("I've said hello already... are we going to do this forever? Fine!");
			session.beginDialog('/checkintent');
		} else if (response == "Mathematics!") {
			session.beginDialog('/math');
		} else if (response == "Physics!") {
			session.beginDialog('/physics');
		} else if (response == "Confused!") {
			session.send("If you're confused, ask for a joke!");
			session.beginDialog('/checkintent');
		} else {
			session.send("I do not understand what you are saying. Please try again.");
			session.beginDialog('/checkintent');
		}
	}
]);

bot.dialog('/telljoke', [
	function(session) {
		var n = Math.floor(Math.random() * 7);
		session.send(jokes[n]);
		session.beginDialog('/checkintent');
	}
]);

bot.dialog('/subject', [
	function(session) {
		builder.Prompts.text(session, "Which subject do you want to practice on?");
	},
	function (session, results) {
		var response = subject(results.response);
		if (response == "Physics!") {
			session.beginDialog('/physics');
		} else if (response == "Mathematics!") {
			session.beginDialog('/math');
		} else {
			session.send("I don't think that is a subject! Try again!");
			session.beginDialog('/subject');
		}
	}
]);

bot.dialog('/physics', [
	function(session) {
		builder.Prompts.text(session, 'You have selected Physics. Please choose a subtopic.');
	},
	function(session, results) {
		var response = results.response;
		if (response == "Mechanics") {
			session.beginDialog('/physicsmc');
		} else if (response == 'Electromagnetism') {
			session.beginDialog('/physicsem');
		} else if (response == 'Special Relativity') {
			session.beginDialog('/physicssr');
		}
	}
]);

bot.dialog('/math', [
	function(session) {
		builder.Prompts.text(session, 'You have selected Mathematics. Please choose a subtopic.');
	},
	function(session, results) {
		var response = results.response;
		if (response == "Number Theory") {
			session.beginDialog('/mathnt');
		} else if (response == 'Complex Numbers') {
			session.beginDialog('/mathcn');
		} else {
			session.send("Sorry! Either we do not support that topic yet or what you entered is not a valid topic! Try again!");
			session.beginDialog('/math');
		}
	}
]);

bot.dialog('/physicsmc', [
	function(session) {
		topic = 3;
		var n = Math.floor(Math.random() * 7);
		session.send(physicsmcQuestions[n]);
		ans = physicsmcAnswers[n];
		session.beginDialog('/answer');
	}
]);

bot.dialog('/physicsem', [
	function(session) {
		topic = 4;
		var n = Math.floor(Math.random() * 3);
		session.send(physicsemQuestions[n]);
		ans = physicsemAnswers[n];
		session.beginDialog('/answer');
	}
]);

bot.dialog('/physicssr', [
	function(session) {
		topic = 5;
		var n = Math.floor(Math.random() * 3);
		session.send(physicssrQuestions[n]);
		ans = physicsmcAnswers[n];
		session.beginDialog('/answer');
	}
]);

bot.dialog('/mathnt', [
	function(session) {
		topic = 1;
		var n = Math.floor(Math.random() * 7);
		session.send(mathntQuestions[n]);
		ans = mathntAnswers[n];
		session.beginDialog('/answer');
	}
]);

bot.dialog('/mathcn', [
	function(session) {
		topic = 2;
		var n = Math.floor(Math.random() * 7);
		session.send(mathcnQuestions[n]);
		ans = mathcnAnswers[n];
		session.beginDialog('/answer');
	}
]);

bot.dialog('/answer', [
	function(session) {
		builder.Prompts.text(session, 'Please give me an answer.');
	},
	function(session,results) {
		var response = question(results.response);
		if (response == "Quit") {
			session.beginDialog('/checkintent');
		} else if (response == ans) {
			session.send("Correct! Next question!");
			switch(topic) {
				case 1: session.beginDialog('/mathnt');
				case 2: session.beginDialog('/mathcn');
				case 3: session.beginDialog('/physicsmc');
				case 4: session.beginDialog('/physicsem');
				case 5: session.beginDialog('/physicssr');
				default: session.beginDialog('/checkintent');
			}
		} else {
			session.send("Wrong! Try again!");
			session.beginDialog('/answer');
		}
	}
]);
