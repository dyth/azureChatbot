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
	var topics = [["hello", "hey", "how", "sup", "good", "hi", "pleased", "what\'s"], ["change", "topics", "subject", "different"], ["don\'t", "know", "hint", "suggestion", "what", "mean", "unsure", "strange"], ["joke", "laugh", "funny", "humour"], ["stop", "enough", "quit", "halt", "no", "end", "finish"], ["mathematics", "maths", "sum"], ["physics"]];
	var categories = ["Greetings!", "Subject!", "Hint!", "Jokes!", "Quit!", "Mathematics!", "Physics!"];
	var sentence = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase()
	if (sentence.includes(" ")) {
		var words = sentence.split(" ");
	} else {
		var words = [sentence];
	}
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
	var sentence = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase();
	if (sentence.includes(" ")) {
		var words = sentence.split(" ");
	} else {
		var words = [sentence];
	}
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
