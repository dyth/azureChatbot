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
	var topics = [["hello", "hey", "how", "sup", "good", "hi", "pleased", "what\'s"], ["change", "topics", "subject", "different"], ["don\'t", "know", "hint", "suggestion", "what", "mean", "unsure", "strange"], ["joke", "laugh", "funny", "humour"]];
	var categories = ["greetings", "confusion", "subject", "jokes"];
	var words = sentence.replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/,"").toLowerCase().split(" ");
	var counting = [];

	for (count = 0; count < 4; count++) {
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
	return categories[greatest(counting)];
}
