import { ButtonPress } from "../core/gameLogic.js";
import { handleInput, AddScreenLetter, DeleteLetter, AddLetter } from "../core/uiHandler.js";
import { GetWord, getMeaning, WordExists } from "../services/apiService.js";
import { ErrorHandler, FreeColumn, GenerateGrid } from "../utils/utils.js";

GetWord();
GenerateGrid();
FreeColumn();
console.log("EVOO MEE");
window.AddLetter = AddLetter;
window.DeleteLetter = DeleteLetter;
window.handleInput = handleInput;
window.ButtonPress = ButtonPress;
window.WordExists = WordExists;
window.getMeaning = getMeaning;
window.AddScreenLetter = AddScreenLetter;
window.ErrorHandler = ErrorHandler;
window.FreeColumn = FreeColumn;
