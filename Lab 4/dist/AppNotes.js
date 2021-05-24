/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"css/style.blocks.css\");\n\n//# sourceURL=webpack://lab-4/./src/style.scss?");

/***/ }),

/***/ "./src/AppNotes.ts":
/*!*************************!*\
  !*** ./src/AppNotes.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.App = void 0;\r\nconst Note_1 = __webpack_require__(/*! ./Note */ \"./src/Note.ts\");\r\nconst AppStorage_1 = __webpack_require__(/*! ./AppStorage */ \"./src/AppStorage.ts\");\r\nconst Colors_1 = __webpack_require__(/*! ./Colors */ \"./src/Colors.ts\");\r\nclass App {\r\n    constructor() {\r\n        this.appStorage = new AppStorage_1.default();\r\n        this.note = new Note_1.default();\r\n        this.getLayoutAccess();\r\n        this.note.getInputsData();\r\n        this.appStorage.data = [];\r\n        this.addEventListenerToButton(this.appStorage.data);\r\n        const data = this.appStorage.readDataFromLocalStorage();\r\n        this.appStorage.data = data;\r\n        if (this.appStorage.data) {\r\n            this.renderData(this.appStorage.data);\r\n        }\r\n    }\r\n    getLayoutAccess() {\r\n        this.pinnedNotes = document.querySelector('#pinnedNotes');\r\n        this.otherNotes = document.querySelector('#otherNotes');\r\n        this.btnAdd = document.querySelector('#btnAdd');\r\n    }\r\n    addEventListenerToButton(data) {\r\n        this.btnAdd.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {\r\n            this.note.createNote(data);\r\n            this.note.clearInputs();\r\n            this.appStorage.saveDataToLocalStorage(data);\r\n            this.renderData(data);\r\n        }));\r\n    }\r\n    renderSpan(title, value) {\r\n        const span = document.createElement('span');\r\n        span.textContent = title + \": \" + value;\r\n        span.className = \"noteSpan\";\r\n        return span;\r\n    }\r\n    renderButton(container, item, callback) {\r\n        const { backgroundColor, color, text } = item;\r\n        const button = document.createElement('button');\r\n        button.style.border = \"1.5px solid \" + Colors_1.WHITE;\r\n        button.style.margin = \"5px\";\r\n        button.style.backgroundColor = backgroundColor;\r\n        button.style.color = color;\r\n        button.innerHTML = text;\r\n        button.addEventListener('click', () => callback());\r\n        container.appendChild(button);\r\n    }\r\n    renderNote(container, item) {\r\n        const { title, content, color, createdAt, id, isPinned } = item;\r\n        const div = document.createElement('div');\r\n        div.className = \"note\";\r\n        div.style.backgroundColor = color;\r\n        const titleSpan = this.renderSpan(\"Title\", title);\r\n        const contentSpan = this.renderSpan(\"Content\", content);\r\n        const createdAtSpan = this.renderSpan(\"Created At\", createdAt.toString());\r\n        div.appendChild(titleSpan);\r\n        div.appendChild(contentSpan);\r\n        div.appendChild(createdAtSpan);\r\n        const buttonContainer = document.createElement('div');\r\n        buttonContainer.className = \"buttonContainer\";\r\n        const editButton = {\r\n            text: 'Edit',\r\n            backgroundColor: Colors_1.EDIT_BUTTON_BACKGROUND,\r\n            color: Colors_1.EDIT_BUTTON_TEXT\r\n        };\r\n        this.renderButton(buttonContainer, editButton, () => this.editNote(id));\r\n        const deleteButton = {\r\n            text: 'Delete',\r\n            backgroundColor: Colors_1.REMOVE_BUTTON_BACKGROUND,\r\n            color: Colors_1.WHITE\r\n        };\r\n        this.renderButton(buttonContainer, deleteButton, () => this.deleteNote(id));\r\n        const pushPinButton = {\r\n            text: isPinned ? 'Push off pin' : 'Push pin',\r\n            backgroundColor: Colors_1.WHITE,\r\n            color: Colors_1.BLACK\r\n        };\r\n        this.renderButton(buttonContainer, pushPinButton, (button) => this.pushPinNote(id));\r\n        div.appendChild(buttonContainer);\r\n        container.appendChild(div);\r\n    }\r\n    renderData(data) {\r\n        this.pinnedNotes.innerHTML = \"\";\r\n        this.otherNotes.innerHTML = \"\";\r\n        data.forEach((item) => {\r\n            const { isPinned } = item;\r\n            if (isPinned) {\r\n                this.renderNote(this.pinnedNotes, item);\r\n            }\r\n            else {\r\n                this.renderNote(this.otherNotes, item);\r\n            }\r\n        });\r\n    }\r\n    pushPinNote(id) {\r\n        const data = this.appStorage.readDataFromLocalStorage();\r\n        const foundItem = data.filter((item) => item.id === id);\r\n        const index = data.findIndex((item) => item.id === id);\r\n        if (foundItem) {\r\n            let { id, content, title, color, createdAt, isPinned } = foundItem[0];\r\n            const newObject = {\r\n                isPinned: isPinned ? false : true,\r\n                id,\r\n                content,\r\n                title,\r\n                color,\r\n                createdAt\r\n            };\r\n            data[index] = newObject;\r\n            this.appStorage.data = data;\r\n            this.appStorage.saveDataToLocalStorage(data);\r\n            this.renderData(data);\r\n        }\r\n    }\r\n    deleteNote(id) {\r\n        const data = this.appStorage.readDataFromLocalStorage();\r\n        const newData = data.filter((item) => item.id !== id);\r\n        this.appStorage.data = newData;\r\n        this.appStorage.saveDataToLocalStorage(newData);\r\n        this.renderData(newData);\r\n    }\r\n    editNote(id) {\r\n        const data = this.appStorage.readDataFromLocalStorage();\r\n        const foundItem = data.filter((item) => item.id === id);\r\n        const newData = data.filter((item) => item.id !== id);\r\n        if (foundItem) {\r\n            let { content, title, color } = foundItem[0];\r\n            this.note.title.value = title;\r\n            this.note.content.value = content;\r\n            this.note.color.value = color;\r\n            this.appStorage.data = newData;\r\n        }\r\n    }\r\n}\r\nexports.App = App;\r\nconst app = new App();\r\n\n\n//# sourceURL=webpack://lab-4/./src/AppNotes.ts?");

/***/ }),

/***/ "./src/AppStorage.ts":
/*!***************************!*\
  !*** ./src/AppStorage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass AppStorage {\r\n    constructor() {\r\n        this.data = [];\r\n    }\r\n    saveDataToLocalStorage(data) {\r\n        localStorage.setItem('noteData', JSON.stringify(data));\r\n    }\r\n    readDataFromLocalStorage() {\r\n        return JSON.parse(localStorage.getItem('noteData'));\r\n    }\r\n}\r\nexports.default = AppStorage;\r\n\n\n//# sourceURL=webpack://lab-4/./src/AppStorage.ts?");

/***/ }),

/***/ "./src/Colors.ts":
/*!***********************!*\
  !*** ./src/Colors.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BLACK = exports.EDIT_BUTTON_TEXT = exports.WHITE = exports.REMOVE_BUTTON_BACKGROUND = exports.EDIT_BUTTON_BACKGROUND = void 0;\r\nexports.EDIT_BUTTON_BACKGROUND = \"#FFC107\";\r\nexports.REMOVE_BUTTON_BACKGROUND = \"#DC3545\";\r\nexports.WHITE = \"white\";\r\nexports.EDIT_BUTTON_TEXT = \"#840000\";\r\nexports.BLACK = \"black\";\r\n\n\n//# sourceURL=webpack://lab-4/./src/Colors.ts?");

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Note {\r\n    getInputsData() {\r\n        this.title = document.querySelector('#title');\r\n        this.content = document.querySelector('#content');\r\n        this.color = document.querySelector('#color');\r\n    }\r\n    createNote(data) {\r\n        const newNote = {\r\n            id: Date.now().toString(36) + Math.random().toString(36).substring(2),\r\n            title: this.title.value,\r\n            content: this.content.value,\r\n            color: this.color.value,\r\n            isPinned: false,\r\n            createdAt: new Date()\r\n        };\r\n        data.push(newNote);\r\n    }\r\n    clearInputs() {\r\n        this.title.value = \"\";\r\n        this.content.value = \"\";\r\n        this.color.value = \"\";\r\n    }\r\n}\r\nexports.default = Note;\r\n\n\n//# sourceURL=webpack://lab-4/./src/Note.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/AppNotes.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/style.scss");
/******/ 	
/******/ })()
;