// "Create note" button: shows a note creation modal
document.getElementById("show-note-form-button").addEventListener("click", (event) => {
	event.preventDefault();
	showNoteForm("Create Note");
});

const closeForm = () => {
	document.getElementById("note-name").style.boxShadow = "initial";
	document.getElementById("note-name").style.borderColor = "initial";
	document.getElementById("note-name").value = "";

	document.getElementById("content-form").style.boxShadow = "initial";
	document.getElementById("content-form").style.borderColor = "initial";

	document.getElementById("content-form").value = "";
	document.getElementById("note-form-container").style.display = "none";

	document.body.style.overflow = "auto";
}

// Closes modal if the click happened outside of the modal and resets style within modal
document.getElementById("note-form-container").addEventListener("click", (event) => {
	event.preventDefault();
	if (event.target.id === "note-form-container") {
		closeForm();
	}
})

// Clears "invalid" style of forms on key presses
document.getElementById("note-name").addEventListener("keydown", (event) => {
	document.getElementById("note-name").style.boxShadow = "initial";
    document.getElementById("note-name").style.borderColor = "initial";
});
document.getElementById("content-form").addEventListener("keydown", (event) => {
	document.getElementById("content-form").style.boxShadow = "initial";
    document.getElementById("content-form").style.borderColor = "initial";
});

// "Create note" button within modals checks if name and content aren't empty
document.getElementById("create-note-button").addEventListener("click", (event) => {
	event.preventDefault();

	const selectedCategory = document.getElementById("select-category").value;
	const noteNameForm = document.getElementById("note-name");
	const noteContent = document.getElementById("content-form");

	if (noteNameForm.value == "") {
		noteNameForm.style.boxShadow = "0 0 2px 2px red";
		noteNameForm.style.borderColor = "red";
		return;
	}

	if (noteContent.value == "") {
		noteContent.style.boxShadow = "0 0 2px 2px red";
		noteContent.style.borderColor = "red";
		return;
	}

	addNote(selectedCategory, noteNameForm.value, noteContent.value, new Date());
	closeForm();
});

// "Abort" button closes the modal and resets style in the modal
document.getElementById("abort-button").addEventListener("click", (event) => {
	event.preventDefault();

	closeForm();
});

const notes = [
	{
		name: "Lorem Ipsum",
		category: "Random thought",
		createdAt: new Date(),
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		name: "Lorem Ipsum",
		category: "Idea",
		createdAt: new Date(),
		content: "There are some dates here: 1/1/1970, 12/12/2000, eeee 9/9/2002",
	},
	{
		name: "Lorem Ipsum",
		category: "Task",
		createdAt: new Date(),
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		name: "Lorem Ipsum",
		category: "Quote",
		createdAt: new Date(),
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
	{
		name: "Lorem Ipsum",
		category: "Task",
		createdAt: new Date(),
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	},
];

const showNoteForm = (header) => {
	const noteForm = document.getElementById("note-form-container");
	const formHeader = document.getElementById("form-header");

	noteForm.style.display = "flex";
	document.body.style.overflow = "hidden";
	formHeader.innerText = header;
};

const addNote = (category, name, content, date = new Date()	) => {
	
	const noteRow = document.createElement("div");
	noteRow.classList.add("table-row");
	
	const categoryIconContainer = document.createElement("div");
	categoryIconContainer.setAttribute("id", "category-container");
	const icon = document.createElement("i");
	let iconClass = "";
	switch (category) {
		case "Random thought":
			iconClass = "brain";
			break;
		case "Idea":
			iconClass = "lightbulb";
			break;
		case "Task":
			iconClass = "check";
			break;
		case "Quote":
			iconClass = "quote-right";
			break;
	}
	icon.classList.add("fas", "fa-" + iconClass);
	categoryIconContainer.appendChild(icon);
	noteRow.appendChild(categoryIconContainer);

	const noteName = document.createElement("div");
	noteName.innerText = name;
	noteRow.appendChild(noteName);

	const creationDate = document.createElement("div");
	creationDate.innerText = date.toDateString();
	noteRow.appendChild(creationDate);

	const noteCategory = document.createElement("div");
	noteCategory.innerText = category;
	noteRow.appendChild(noteCategory);

	const noteContent = document.createElement("div");
	noteContent.innerText = content;
	noteRow.appendChild(noteContent);

	const mentionedDatesRow = document.createElement("div");
	let datesString = "";
	for (const date of content.matchAll(/(([1-9]|[12]\d|3[01])\/([1-9]|1[0-2])\/[12]\d{3})/g)) {
		datesString += date[0] + ", ";
	}
	datesString = datesString.slice(0, -2); // remove trailing comma in result string, if exists
	mentionedDatesRow.innerText = datesString;
	noteRow.appendChild(mentionedDatesRow);

	const noteManagementButtons = document.createElement("div");
	noteManagementButtons.setAttribute("id", "row-buttons");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fas", "fa-pen");
	const archiveIcon = document.createElement("i");
	archiveIcon.classList.add("fas", "fa-archive");
	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fas", "fa-trash");
	noteManagementButtons.appendChild(editIcon);
	noteManagementButtons.appendChild(archiveIcon);
	noteManagementButtons.appendChild(deleteIcon);
	noteRow.appendChild(noteManagementButtons);

	// I need to add a row to the end of the table, but appendChild(table with "allNotes" id) puts row after "Create note" button.
	// That's why I put new row specifically before the button
	const showNoteFormButton = document.getElementById("show-note-form-button");
	showNoteFormButton.before(noteRow);

};  

for (const note of notes) {
    const {name, category, createdAt: date, content} = note;
	addNote(category, name, content, date);
}