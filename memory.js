/*
Слишком большие списки ассоциаций (8 и более) рекомендуется избегать.
Это в первую очередь относится к ассоциированию от общего к конкретному, но также может быть полезно и при ассоциировании от конкретного к общему.
Вместо исчерпывающих списков стоит использовать только самые часто используемые ассоциации и создавать промежуточные, группирующие обе стороны, элементы памяти.
Подробная иерархическая структура позволяет хранить ассоциации более эффективно как с точки зрения производительности, так и с т.з. обучения.
Например:
			 Вместо "слово -> бегать, дом;
					 бегать -> слово;
					 дом -> слово"

данные хранятся как "слово -> глагол, существительное;
					 глагол -> слово;
					 существительное -> слово;
					 бегать -> глагол;
					 дом -> существительное".

Также не рекомендуется заносить избыточные данные в содержание элементов памяти.
Если элемент обладает ассоциацией с одной или двух сторон, это повод ограничится только уникальными и/или поясняющими данными в содержании.
Например:
			 Вместо "а -> [а, б - буквы русского алфавита];
					 б -> [а, б - буквы русского алфавита];
					 [а, б - буквы русского алфавита] -> а, б, алфавит;
					 алфавит -> [а, б - буквы русского алфавита]"

данные хранятся как "а -> буквы русского алфавита;
					 б -> буквы русского алфавита;
					 буквы русского алфавита -> а, б, алфавит;
					 алфавит -> буквы русского алфавита".

В то же время, иногда элемент может описывать сложную (тернарную и более) ассоциацию, не поддающуюся иерархическому структурированию.
В этом случае он должен включать в себя достаточно ясное содержание и соответствующие ассоциации как они есть.
Например:
Данные хранятся как "бежать -> глагол;
					 бегать -> глагол;
					 синоним;
					 бежать и бегать - синонимы -> бежать, бегать, синоним".
*/
window.memoryJSON = `[
	{ "ID": 0, "content": "буква", "associatedIDs": [1, 2, 3, 15, 16, 17, 18, 19] },
    { "ID": 1, "content": "а", "associatedIDs": [0, 44] },
    { "ID": 2, "content": "б", "associatedIDs": [0, 44] },
    { "ID": 3, "content": "в", "associatedIDs": [0, 44] },
    { "ID": 15, "content": "г", "associatedIDs": [0, 44] },
    { "ID": 16, "content": "д", "associatedIDs": [0, 44] },
    { "ID": 17, "content": "е", "associatedIDs": [0, 44] },
    { "ID": 18, "content": "ё", "associatedIDs": [0, 44] },
    { "ID": 19, "content": "ж", "associatedIDs": [0, 44] },
    { "ID": 20, "content": "з", "associatedIDs": [0, 44] },
    { "ID": 21, "content": "и", "associatedIDs": [0, 44] },
    { "ID": 22, "content": "й", "associatedIDs": [0, 44] },
    { "ID": 23, "content": "к", "associatedIDs": [0, 44] },
    { "ID": 24, "content": "м", "associatedIDs": [0, 44] },
    { "ID": 25, "content": "н", "associatedIDs": [0, 44] },
    { "ID": 26, "content": "о", "associatedIDs": [0, 44] },
    { "ID": 27, "content": "п", "associatedIDs": [0, 44] },
    { "ID": 28, "content": "р", "associatedIDs": [0, 44] },
    { "ID": 29, "content": "с", "associatedIDs": [0, 44] },
    { "ID": 30, "content": "т", "associatedIDs": [0, 44] },
    { "ID": 31, "content": "у", "associatedIDs": [0, 44] },
    { "ID": 32, "content": "ф", "associatedIDs": [0, 44] },
    { "ID": 33, "content": "х", "associatedIDs": [0, 44] },
    { "ID": 34, "content": "ц", "associatedIDs": [0, 44] },
    { "ID": 35, "content": "ч", "associatedIDs": [0, 44] },
    { "ID": 36, "content": "ш", "associatedIDs": [0, 44] },
    { "ID": 37, "content": "щ", "associatedIDs": [0, 44] },
    { "ID": 38, "content": "ъ", "associatedIDs": [0, 44] },
    { "ID": 39, "content": "ы", "associatedIDs": [0, 44] },
    { "ID": 40, "content": "ь", "associatedIDs": [0, 44] },
    { "ID": 41, "content": "э", "associatedIDs": [0, 44] },
    { "ID": 42, "content": "ю", "associatedIDs": [0, 44] },
    { "ID": 43, "content": "я", "associatedIDs": [0, 44] },
    { "ID": 44, "content": "буквы русского алфавита", "associatedIDs": [1, 2, 3, 15, 16, 43, 45] },
    { "ID": 45, "content": "алфавит", "associatedIDs": [44] },
    { "ID": 4, "content": "слово", "associatedIDs": [6, 46] },
    { "ID": 5, "content": "дом", "associatedIDs": [46] },
    { "ID": 6, "content": "глагол", "associatedIDs": [4] },
    { "ID": 46, "content": "существительное", "associatedIDs": [4] },
    { "ID": 7, "content": "бежать", "associatedIDs": [6] },
    { "ID": 8, "content": "бегать", "associatedIDs": [6] },
    { "ID": 9, "content": "грамматическое правило", "associatedIDs": [] },
    { "ID": 10, "content": "согласование по падежу", "associatedIDs": [9] },
    { "ID": 11, "content": "синоним", "associatedIDs": [] },
    { "ID": 12, "content": "бежать и бегать - синонимы", "associatedIDs": [7, 8, 11] },
    { "ID": 13, "content": "факт", "associatedIDs": [46] },
    { "ID": 14, "content": "вода замерзает при 0 градусах Цельсия", "associatedIDs": [13] },
    { "ID": 47, "content": "чувство", "associatedIDs": [] },
    { "ID": 48, "content": "эмоция", "associatedIDs": [] },
    { "ID": 49, "content": "чувства создают эмоции", "associatedIDs": [13, 47, 48] },
    { "ID": 50, "content": "счастье", "associatedIDs": [48] },
    { "ID": 51, "content": "боль", "associatedIDs": [47] }
]`;