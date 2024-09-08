// Helper function
/**
 * Generate an array of 10 elements based on the transform function
 * @param {Function} transform - The function to transform the array
 * @returns {Array} - The transformed array
 */
function generateArray(transform) {
  let result = [];
  for (let i = 1; i <= 10; i++) {
    result.push(transform(i));
  }
  return result;
}

// Reducer
function questionReducer(state = [], action) {
  switch (action.type) {
    case "QUESTION_1":
      return generateArray((i) => i);
    case "QUESTION_2":
      return generateArray((i) => (i % 2 === 0 ? "a" : i));
    case "QUESTION_3":
      return generateArray((i) => {
        if (i % 2 === 0) return "a";
        if (i % 3 === 0) return "b";
        return i;
      });
    case "QUESTION_4":
      return generateArray((i) => {
        if (i % 2 === 0 && i % 3 === 0) return "ab";
        if (i % 2 === 0) return "a";
        if (i % 3 === 0) return "b";
        return i;
      });
    case "QUESTION_5":
      const time = action.payload;
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return [`${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`];
    default:
      return state;
  }
}

// Create Redux store
const store = Redux.createStore(questionReducer);

// Dispatch
function dispatch(action) {
  store.dispatch(action);
  updateUI();
}

// Handle Question 5 button click
function handleQuestion5Click() {
  const timeForm = document.getElementById("timeForm");
  const timeInput = document.getElementById("timeInput");
  const resultElement = document.getElementById("result");

  if (!timeForm || !timeInput || !resultElement) return;

  resultElement.innerHTML = "";
  timeForm.style.display = "inline";
  timeInput.focus();

  function handleQuestion5(event) {
    event.preventDefault();
    if (timeInput.value) {
      dispatch({ type: "QUESTION_5", payload: timeInput.value });
    }
  }

  timeForm.addEventListener("submit", handleQuestion5);
}

// Update UI
function updateUI() {
  // Only hide the form if the state is not from QUESTION_5
  const result = store.getState();
  const resultElement = document.getElementById("result");
  const timeForm = document.getElementById("timeForm");

  if (!resultElement || !timeForm) return;

  resultElement.innerHTML = result.join("<br>");

  if (result.length !== 1 || (!result[0].includes("AM") && !result[0].includes("PM"))) {
    timeForm.style.display = "none";
  }
}
