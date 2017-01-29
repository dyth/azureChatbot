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

function category(sentence) {
	var topics = [["hello", "hey", "how", "sup", "good", "hi", "pleased", "what\'s"], ["change", "topics", "subject", "different"], ["don\'t", "know", "hint", "suggestion", "what", "mean", "unsure", "strange"], ["joke", "laugh", "funny", "humour"], ["stop", "enough", "quit", "halt", "no", "end", "finish"]];
	var categories = ["Greetings!", "Hint!", "Subject!", "Jokes!", "Quit!"];
	var words = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase().split(" ");
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
	if (category == "topic") {
		var subject = ["mathematics", "maths", "sum"]
		var words = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase().split(" ");
		for (i = 0; i < worlds.length; i++) {
			if (subject.includes([word])) {
				return "Mathematics!";
			}
		}
		return "Physics!"
	}
}

console.log(category("My hovercraft is full of eels"))
