import { ButtonPress } from "./core/gameLogic.js";
import { handleInput, AddScreenLetter, DeleteLetter, AddLetter, ResetGame } from "./core/uiHandler.js";
import { GetWord, getMeaning, WordExists } from "./services/apiService.js";
import { ErrorHandler, FreeColumn, GenerateGrid } from "./utils/utils.js";

window.AddLetter = AddLetter;
window.DeleteLetter = DeleteLetter;
window.handleInput = handleInput;
window.ButtonPress = ButtonPress;
window.WordExists = WordExists;
window.getMeaning = getMeaning;
window.AddScreenLetter = AddScreenLetter;
window.ErrorHandler = ErrorHandler;
window.FreeColumn = FreeColumn;
window.ResetGame = ResetGame;

GetWord();
GenerateGrid();
FreeColumn();
console.log("STARTED...");