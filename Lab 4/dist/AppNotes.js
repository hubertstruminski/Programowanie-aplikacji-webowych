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

/***/ "./src/AppNotes.ts":
/*!*************************!*\
  !*** ./src/AppNotes.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.App = void 0;\r\nconst Note_1 = __webpack_require__(/*! ./Note */ \"./src/Note.ts\");\r\nconst AppStorage_1 = __webpack_require__(/*! ./AppStorage */ \"./src/AppStorage.ts\");\r\nclass App {\r\n    constructor() {\r\n        this.appStorage = new AppStorage_1.default();\r\n        this.note = new Note_1.default();\r\n        this.getLayoutAccess();\r\n        this.note.getInputsData();\r\n        this.appStorage.data = [];\r\n        this.addEventListenerToButton(this.appStorage.data);\r\n        const data = this.appStorage.readDataFromLocalStorage();\r\n        this.appStorage.data = data;\r\n        if (this.appStorage.data) {\r\n            this.renderData(this.appStorage.data);\r\n        }\r\n    }\r\n    getLayoutAccess() {\r\n        this.pinnedNotes = document.querySelector('#pinnedNotes');\r\n        this.otherNotes = document.querySelector('#otherNotes');\r\n        this.btnAdd = document.querySelector('#btnAdd');\r\n    }\r\n    addEventListenerToButton(data) {\r\n        this.btnAdd.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {\r\n            this.note.createNote(data);\r\n            this.appStorage.saveDataToLocalStorage(data);\r\n            this.renderData(data);\r\n        }));\r\n    }\r\n    renderSpan(title, value) {\r\n        const span = document.createElement('span');\r\n        span.textContent = title + \": \" + value;\r\n        span.className = \"noteSpan\";\r\n        return span;\r\n    }\r\n    renderNote(container, item) {\r\n        const { title, content, color, createdAt } = item;\r\n        const div = document.createElement('div');\r\n        div.className = \"note\";\r\n        div.style.backgroundColor = color;\r\n        const titleSpan = this.renderSpan(\"Title\", title);\r\n        const contentSpan = this.renderSpan(\"Content\", content);\r\n        const createdAtSpan = this.renderSpan(\"Created At\", createdAt.toString());\r\n        div.appendChild(titleSpan);\r\n        div.appendChild(contentSpan);\r\n        div.appendChild(createdAtSpan);\r\n        container.appendChild(div);\r\n    }\r\n    renderData(data) {\r\n        this.pinnedNotes.innerHTML = \"\";\r\n        this.otherNotes.innerHTML = \"\";\r\n        data.forEach((item) => {\r\n            const { isPinned } = item;\r\n            if (isPinned) {\r\n                this.renderNote(this.pinnedNotes, item);\r\n            }\r\n            else {\r\n                this.renderNote(this.otherNotes, item);\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.App = App;\r\nconst app = new App();\r\n\n\n//# sourceURL=webpack://lab-4/./src/AppNotes.ts?");

/***/ }),

/***/ "./src/AppStorage.ts":
/*!***************************!*\
  !*** ./src/AppStorage.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass AppStorage {\r\n    constructor() {\r\n        this.data = [];\r\n    }\r\n    saveDataToLocalStorage(data) {\r\n        localStorage.setItem('noteData', JSON.stringify(data));\r\n    }\r\n    readDataFromLocalStorage() {\r\n        return JSON.parse(localStorage.getItem('noteData'));\r\n    }\r\n}\r\nexports.default = AppStorage;\r\n\n\n//# sourceURL=webpack://lab-4/./src/AppStorage.ts?");

/***/ }),

/***/ "./src/Note.ts":
/*!*********************!*\
  !*** ./src/Note.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nclass Note {\r\n    getInputsData() {\r\n        this.title = document.querySelector('#title');\r\n        this.content = document.querySelector('#content');\r\n        this.color = document.querySelector('#color');\r\n    }\r\n    createNote(data) {\r\n        const newNote = {\r\n            title: this.title.value,\r\n            content: this.content.value,\r\n            color: this.color.value,\r\n            isPinned: false,\r\n            createdAt: new Date()\r\n        };\r\n        data.push(newNote);\r\n    }\r\n}\r\nexports.default = Note;\r\n\n\n//# sourceURL=webpack://lab-4/./src/Note.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/AppNotes.ts");
/******/ 	
/******/ })()
;