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
	"What is the kinetic energy of a 1kg point object moving at 5m/s?",
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


bot.dialog('/', [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            session.beginDialog('/checkintent');
        }
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.dialog('/checkintent', [
	function (session) {
		builder.Prompts.text(session, 'Hello $name, how can I help you today?');
	},
	function (session, results) {
		switch(results.response) {
			case "Tell me a joke.":
				session.beginDialog('/telljoke');
			case "Physics":
				session.beginDialog('/physics');
			case: "Mathematics":
				session.beginDialog('/mathematics');
		}
	}
]);

bot.dialog('/telljoke', [
	function(session) {
		var n = Math.floor(Math.random() * 7);
		builder.Prompts.text(session, jokes[n]);
		session.endDialog();
	}
]);

bot.dialog('/physics', [
	function(session) {
		var n = Math.floor(Math.random() * 7);
		builder.Prompts.text(session, jokes[n]);
		session.endDialog();
	}
]);

bot.dialog('/mathematics', [
	function(session) {
		var n = Math.floor(Math.random() * 7);
		builder.Prompts.text(session, jokes[n]);
		session.endDialog();
	}
]);
