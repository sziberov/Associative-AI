let sleep = (time) => new Promise((resolve) => setTimeout(resolve, Math.ceil(time)));

function levenshteinDistance(a, b) {
	if(a === b) {
		return 0;
	}

	let distance = 0;

	for(let i = 0; i < Math.max(a.length, b.length); i++) {
		distance += a[i] !== b[i];
	}

	return distance;
}

function tokenize(text) {
	return text.toLowerCase().split(/\s+/);
}

// ----------------------------------------------------------------

let memory = [],
	shortTermMemory = {
		content: '',
		associatedIDs: []
	},
	levels = {
		anxiety: 0,
		astonishment: 0,
		boredom: 0,
		confusion: 0,
		curiosity: 0,
		fatigue: 0,
		happiness: 0,
		hunger: 0,
		inspiration: 0,
		pain: 0,
		stress: 0
	}

function memory_load(memoryJSON) {
	memory = JSON.parse(memoryJSON);

	memory_sortElements();
}

function memory_save() {
	memory_sortElements();

	return JSON.stringify(memory, undefined, 4);
}

function memory_createElement(content) {
	let element = {
		ID: memory.length,
		content: content,
		levels: { ...levels },
		associatiatedIDs: []
	}

	memory.push(element);

	return element.ID;
}

function memory_destroyElement(ID) {
	let element = memory.find(v => v.ID == ID);

	if(element == null) {
		return;
	}

	for(let v of memory) {
		v.associatiatedIDs = v.associatiatedIDs.filter(v_ => v_ !== ID);
	}

	memory = memory.filter(v => v.ID !== ID);
}

function memory_createAssociation(leftID, rightID) {
	let element = memory.find(v => v.ID === leftID);

	if(element != null && !element.associatiatedIDs.includes(rightID)) {
		element.associatiatedIDs.push(rightID);
	}
}

function memory_destroyAssociation(leftID, rightID) {
	let element = memory.find(v => v.ID === leftID);

	if(element != null) {
		element.associatiatedIDs = element.associatiatedIDs.filter(v => v !== rightID);
	}
}

function memory_sortElements() {
//	memory.sort((a, b) => a.ID-b.ID);

	let IDMap = {},
		newID = 0;

	for(let v of memory) {
		let oldID = v.ID;

		v.ID = newID;
		IDMap[oldID] = newID;
		newID++;
	}

	for(let v of memory) {
		v.associatedIDs = v.associatedIDs.map(oldID => IDMap[oldID]);
	}

	return memory;
}

function memory_findElements(query, initialThreshold = 1, timeLimit = Math.min(memory.length, 2000)) {
	let exactMatches = [],
		partialMatches = [],
		queryWords = tokenize(query),
		currentThreshold = initialThreshold,
		startTime = Date.now();

	// Поиск точных и частичных совпадений
	while(true) {
		for(let element of memory) {
			// Точные
			if(element.content === query) {
				exactMatches.push(element);

				continue;
			}

			// Частичные по словам
			let elementWords = tokenize(element.content),
				foundPartialMatch = false;

			for(let queryWord of queryWords) {
				for(let elementWord of elementWords) {
					let distance = levenshteinDistance(queryWord, elementWord);

					if(distance <= currentThreshold) {
						foundPartialMatch = true;

						break;
					}
				}

				if(foundPartialMatch) break;
			}

			if(foundPartialMatch) {
				partialMatches.push(element);
			}
		}

		if(exactMatches.length > 0 || partialMatches.length > 0) {
			break;
		}

		if(Date.now()-startTime > timeLimit) {
			console.log('memory_findElements: Time ['+timeLimit+'] out.');

			break;
		}

		currentThreshold++;
	}

	return [...exactMatches, ...partialMatches]
}

function memory_getAssociatedElements(elements, depth) {
	if(depth <= 0) {
		return []
	}

	let associatedElements = [],
		stack = elements.map(e => ({
			eAssociatedIDs: e.associatedIDs,
			eDepth: 0
		}));

	while(stack.length > 0) {
		let { eAssociatedIDs,
			  eDepth } = stack.pop();

		for(let associatedID of eAssociatedIDs ?? []) {
			let associatedElement = memory.find(v => v.ID === associatedID);

			if(associatedElement != null && !elements.includes(associatedElement) && !associatedElements.includes(associatedElement)) {
				associatedElements.push(associatedElement);

				if(eDepth+1 < depth) {
					stack.push({
						eAssociatedIDs: associatedElement.associatedIDs,
						eDepth: eDepth+1
					});
				}
			}
		}
	}

	return associatedElements;
}

function shortTermMemory_append(content) {
	shortTermMemory.content += content;
}

function shortTermMemory_flush() {
	shortTermMemory_clear();
}

function shortTermMemory_clear() {
	shortTermMemory = {
		content: '',
		associatedIDs: []
	}
}

function levels_get(key) {
	return key in levels ? levels[key] : 0;
}

function levels_set(key, value) {
	if(!(key in levels)) {
		return;
	}

	levels[key] = value;

	let total = Object.values(levels).reduce((sum, value) => sum+value, 0);

	if(total > 1) {
		let factor = (1-value)/(total-value);

		for(let k in levels) {
			if(k !== key) {
				levels[k] *= factor;
			}
		}
	}
}

function levels_increase(key, value) {
	if(key in levels) {
		levels_set(key, levels[key]+value);
	}
}

function levels_decrease(key, value) {
	if(key in levels) {
		levels_set(key, levels[key]-value);
	}
}

function mind_analizeSelf() {}
function mind_reevaluateMemory() {}
function mind_generateHypotheses() {}
function mind_createAssociations() {}

async function mind_acceptInputs() {
	let textInput = document.getElementById('input'),
		shortTermMemoryOutput = document.getElementById('output_shortTermMemory'),
		textOutput = document.getElementById('output');

	if(textInput.value.match(/[ .?!\n]/) != null) {
		shortTermMemory_append(textInput.value);
		shortTermMemoryOutput.value = shortTermMemory.content;
		textInput.value = '';
	}
}

async function mind_think() {
	while(true) {
		await mind_acceptInputs();
		await sleep(1000);
	}
}

window.addEventListener('load', function() {
	memory_load(memoryJSON);
	mind_think();
});