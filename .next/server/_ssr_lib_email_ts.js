"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_ssr_lib_email_ts";
exports.ids = ["_ssr_lib_email_ts"];
exports.modules = {

/***/ "(ssr)/./lib/email.ts":
/*!**********************!*\
  !*** ./lib/email.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendBookingConfirmation: () => (/* binding */ sendBookingConfirmation)\n/* harmony export */ });\n/* harmony import */ var _emailjs_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @emailjs/browser */ \"(ssr)/./node_modules/@emailjs/browser/es/index.js\");\n\nconst SERVICE_ID = \"service_5zc6oqj\";\nconst TEMPLATE_ID = \"template_kjdtr1e\";\nconst PUBLIC_KEY = \"s6dC8KFr7mb-jFanf\";\nasync function sendBookingConfirmation(booking) {\n    try {\n        const result = await _emailjs_browser__WEBPACK_IMPORTED_MODULE_0__[\"default\"].send(SERVICE_ID, TEMPLATE_ID, {\n            customerName: booking.customerName,\n            customerEmail: booking.customerEmail,\n            customerPhone: booking.customerPhone,\n            serviceName: booking.serviceName,\n            servicePrice: booking.servicePrice,\n            date: booking.date,\n            time: booking.time\n        }, PUBLIC_KEY);\n        console.log(\"Email sent!\", result.text);\n        return true;\n    } catch (error) {\n        console.error(\"Email failed:\", error);\n        return false;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9saWIvZW1haWwudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBdUM7QUFFdkMsTUFBTUMsYUFBYTtBQUNuQixNQUFNQyxjQUFjO0FBQ3BCLE1BQU1DLGFBQWE7QUFFWixlQUFlQyx3QkFBd0JDLE9BUTdDO0lBQ0MsSUFBSTtRQUNGLE1BQU1DLFNBQVMsTUFBTU4sNkRBQVksQ0FDL0JDLFlBQ0FDLGFBQ0E7WUFDRU0sY0FBY0gsUUFBUUcsWUFBWTtZQUNsQ0MsZUFBZUosUUFBUUksYUFBYTtZQUNwQ0MsZUFBZUwsUUFBUUssYUFBYTtZQUNwQ0MsYUFBYU4sUUFBUU0sV0FBVztZQUNoQ0MsY0FBY1AsUUFBUU8sWUFBWTtZQUNsQ0MsTUFBTVIsUUFBUVEsSUFBSTtZQUNsQkMsTUFBTVQsUUFBUVMsSUFBSTtRQUNwQixHQUNBWDtRQUdGWSxRQUFRQyxHQUFHLENBQUMsZUFBZVYsT0FBT1csSUFBSTtRQUN0QyxPQUFPO0lBQ1QsRUFBRSxPQUFPQyxPQUFPO1FBQ2RILFFBQVFHLEtBQUssQ0FBQyxpQkFBaUJBO1FBQy9CLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF5amF5c3R5bGVzLWVjb21tZXJjZS8uL2xpYi9lbWFpbC50cz84MjgxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBlbWFpbGpzIGZyb20gJ0BlbWFpbGpzL2Jyb3dzZXInO1xuXG5jb25zdCBTRVJWSUNFX0lEID0gJ3NlcnZpY2VfNXpjNm9xaic7XG5jb25zdCBURU1QTEFURV9JRCA9ICd0ZW1wbGF0ZV9ramR0cjFlJztcbmNvbnN0IFBVQkxJQ19LRVkgPSAnczZkQzhLRnI3bWItakZhbmYnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZEJvb2tpbmdDb25maXJtYXRpb24oYm9va2luZzoge1xuICBjdXN0b21lck5hbWU6IHN0cmluZztcbiAgY3VzdG9tZXJFbWFpbDogc3RyaW5nO1xuICBjdXN0b21lclBob25lOiBzdHJpbmc7XG4gIHNlcnZpY2VOYW1lOiBzdHJpbmc7XG4gIHNlcnZpY2VQcmljZTogbnVtYmVyO1xuICBkYXRlOiBzdHJpbmc7XG4gIHRpbWU6IHN0cmluZztcbn0pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBlbWFpbGpzLnNlbmQoXG4gICAgICBTRVJWSUNFX0lELFxuICAgICAgVEVNUExBVEVfSUQsXG4gICAgICB7XG4gICAgICAgIGN1c3RvbWVyTmFtZTogYm9va2luZy5jdXN0b21lck5hbWUsXG4gICAgICAgIGN1c3RvbWVyRW1haWw6IGJvb2tpbmcuY3VzdG9tZXJFbWFpbCxcbiAgICAgICAgY3VzdG9tZXJQaG9uZTogYm9va2luZy5jdXN0b21lclBob25lLFxuICAgICAgICBzZXJ2aWNlTmFtZTogYm9va2luZy5zZXJ2aWNlTmFtZSxcbiAgICAgICAgc2VydmljZVByaWNlOiBib29raW5nLnNlcnZpY2VQcmljZSxcbiAgICAgICAgZGF0ZTogYm9va2luZy5kYXRlLFxuICAgICAgICB0aW1lOiBib29raW5nLnRpbWUsXG4gICAgICB9LFxuICAgICAgUFVCTElDX0tFWVxuICAgICk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0VtYWlsIHNlbnQhJywgcmVzdWx0LnRleHQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VtYWlsIGZhaWxlZDonLCBlcnJvcik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Il0sIm5hbWVzIjpbImVtYWlsanMiLCJTRVJWSUNFX0lEIiwiVEVNUExBVEVfSUQiLCJQVUJMSUNfS0VZIiwic2VuZEJvb2tpbmdDb25maXJtYXRpb24iLCJib29raW5nIiwicmVzdWx0Iiwic2VuZCIsImN1c3RvbWVyTmFtZSIsImN1c3RvbWVyRW1haWwiLCJjdXN0b21lclBob25lIiwic2VydmljZU5hbWUiLCJzZXJ2aWNlUHJpY2UiLCJkYXRlIiwidGltZSIsImNvbnNvbGUiLCJsb2ciLCJ0ZXh0IiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./lib/email.ts\n");

/***/ })

};
;