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

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nlet mainWindow = null;\nfunction createWindow() {\n    mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({\n        width: 900,\n        height: 680,\n        webPreferences: {\n            nodeIntegration: true,\n            contextIsolation: false,\n        },\n    });\n    mainWindow.loadFile(path__WEBPACK_IMPORTED_MODULE_1__.join(__dirname, '../../public/index.html'));\n    // Open DevTools in development\n    if (true) {\n        mainWindow.webContents.openDevTools();\n    }\n    mainWindow.on('closed', () => {\n        mainWindow = null;\n    });\n}\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(() => {\n    createWindow();\n    electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', function () {\n        if (electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getAllWindows().length === 0)\n            createWindow();\n    });\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', () => {\n    if (process.platform !== 'darwin') {\n        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();\n    }\n});\n// Handle selecting source directory\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('select-source-directory', async () => {\n    if (!mainWindow)\n        return;\n    const { canceled, filePaths } = await electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog(mainWindow, {\n        properties: ['openDirectory'],\n        title: 'Select Source Directory'\n    });\n    if (canceled) {\n        return null;\n    }\n    return filePaths[0];\n});\n// Handle selecting target directory\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('select-target-directory', async () => {\n    if (!mainWindow)\n        return;\n    const { canceled, filePaths } = await electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog(mainWindow, {\n        properties: ['openDirectory'],\n        title: 'Select Target Directory'\n    });\n    if (canceled) {\n        return null;\n    }\n    return filePaths[0];\n});\n// Function to get file extension\nfunction getFileExtension(filename) {\n    return path__WEBPACK_IMPORTED_MODULE_1__.extname(filename).slice(1).toLowerCase() || 'other';\n}\n// Handle organizing files\nelectron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle('organize-files', async (_, sourceDir, targetDir) => {\n    try {\n        // Read all files from source directory\n        const files = fs__WEBPACK_IMPORTED_MODULE_2__.readdirSync(sourceDir);\n        // Create target directory if it doesn't exist\n        if (!fs__WEBPACK_IMPORTED_MODULE_2__.existsSync(targetDir)) {\n            fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync(targetDir, { recursive: true });\n        }\n        const results = {\n            total: files.length,\n            processed: 0,\n            skipped: 0,\n            categories: {}\n        };\n        // Process each file\n        for (const file of files) {\n            const sourcePath = path__WEBPACK_IMPORTED_MODULE_1__.join(sourceDir, file);\n            // Skip directories\n            if (fs__WEBPACK_IMPORTED_MODULE_2__.statSync(sourcePath).isDirectory()) {\n                results.skipped++;\n                continue;\n            }\n            // Get file extension and create category folder if needed\n            const extension = getFileExtension(file);\n            const categoryDir = path__WEBPACK_IMPORTED_MODULE_1__.join(targetDir, extension);\n            if (!fs__WEBPACK_IMPORTED_MODULE_2__.existsSync(categoryDir)) {\n                fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync(categoryDir, { recursive: true });\n            }\n            // Track categories\n            results.categories[extension] = (results.categories[extension] || 0) + 1;\n            // Copy file to category folder\n            const targetPath = path__WEBPACK_IMPORTED_MODULE_1__.join(categoryDir, file);\n            fs__WEBPACK_IMPORTED_MODULE_2__.copyFileSync(sourcePath, targetPath);\n            results.processed++;\n        }\n        return results;\n    }\n    catch (error) {\n        console.error('Error organizing files:', error);\n        throw error;\n    }\n});\n\n\n//# sourceURL=webpack://file-otron/./src/main/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/main.ts");
/******/ 	
/******/ })()
;