/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "updates/" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "da4d0d7003cd47d8a21c";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8501/static/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _createBrowserHistory = _interopRequireDefault(__webpack_require__(/*! history/createBrowserHistory */ "./node_modules/history/createBrowserHistory.js"));

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _App = _interopRequireDefault(__webpack_require__(/*! ../shared/App */ "./src/shared/App.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! store */ "./src/shared/store/index.js"));

var browserHistory = window.browserHistory || (0, _createBrowserHistory.default)();
(0, _reactDom.hydrate)(_react.default.createElement(_reactRedux.Provider, {
  store: _store.default
}, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_App.default, null))), document.getElementById('app'));

if (true) {
  if (true) {
    module.hot.accept();
  }

  if (!window.browserHistory) {
    window.browserHistory = browserHistory;
  }
}

/***/ }),

/***/ "./src/shared/App.js":
/*!***************************!*\
  !*** ./src/shared/App.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "./src/shared/store/index.js"));

var _routing = __webpack_require__(/*! routing */ "./src/shared/routing/index.js");

__webpack_require__(/*! ./assets/scss/styles.scss */ "./src/shared/assets/scss/styles.scss");

var App =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(App, _Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_routing.Routing, {
        store: _store.default
      });
    }
  }]);
  return App;
}(_react.Component);

var _default = App;
exports.default = _default;

/***/ }),

/***/ "./src/shared/api/api.js":
/*!*******************************!*\
  !*** ./src/shared/api/api.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

/**
 * @module api/api
 */
var _default = _axios.default;
exports.default = _default;

/***/ }),

/***/ "./src/shared/assets/scss/styles.scss":
/*!********************************************!*\
  !*** ./src/shared/assets/scss/styles.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768273241
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/components/Footer/Footer.js":
/*!************************************************!*\
  !*** ./src/shared/components/Footer/Footer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

__webpack_require__(/*! ./Footer.scss */ "./src/shared/components/Footer/Footer.scss");

var Footer = function Footer() {
  return _react.default.createElement("footer", {
    className: "footer sm-padding bg-dark"
  }, _react.default.createElement("div", {
    className: "container"
  }, _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", {
    className: "col-md-12"
  }, _react.default.createElement("div", {
    className: "footer__logo"
  }, _react.default.createElement("img", {
    className: "img-fluid",
    src: "../../assets/img/react-logo.png",
    alt: "react logo"
  })), _react.default.createElement("div", {
    className: "footer__copyright"
  }, _react.default.createElement("p", null, "Copyright \xA9 ", new Date().getFullYear(), ". All Rights Reserved"))))));
};

var _default = Footer;
exports.default = _default;

/***/ }),

/***/ "./src/shared/components/Footer/Footer.scss":
/*!**************************************************!*\
  !*** ./src/shared/components/Footer/Footer.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271750
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/components/Header/Header.js":
/*!************************************************!*\
  !*** ./src/shared/components/Header/Header.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

__webpack_require__(/*! ./Header.scss */ "./src/shared/components/Header/Header.scss");

var Header = function Header(_ref) {
  var heading = _ref.heading,
      subHeading = _ref.subHeading,
      _ref$imgUrl = _ref.imgUrl,
      imgUrl = _ref$imgUrl === void 0 ? '' : _ref$imgUrl;
  return _react.default.createElement("header", {
    className: "Header__masthead",
    style: {
      'background': imgUrl
    }
  }, _react.default.createElement("div", {
    className: "Header__overlay"
  }), _react.default.createElement("div", {
    className: "container"
  }, _react.default.createElement("div", {
    className: "row"
  }, _react.default.createElement("div", {
    className: "col-lg-8 col-md-10 mx-auto"
  }, _react.default.createElement("div", {
    className: "Header__page-heading"
  }, _react.default.createElement("h1", null, heading), _react.default.createElement("span", {
    className: "Header__subheading"
  }, subHeading))))));
};

var _default = Header;
exports.default = _default;

/***/ }),

/***/ "./src/shared/components/Header/Header.scss":
/*!**************************************************!*\
  !*** ./src/shared/components/Header/Header.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271835
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/components/Movie/Movie.js":
/*!**********************************************!*\
  !*** ./src/shared/components/Movie/Movie.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

__webpack_require__(/*! ./Movie.scss */ "./src/shared/components/Movie/Movie.scss");

var Movie = function Movie(_ref) {
  var movieTitle = _ref.movieTitle,
      description = _ref.description;
  return _react.default.createElement("div", {
    className: "card",
    style: {
      width: '20rem'
    }
  }, _react.default.createElement("div", {
    className: "card-body"
  }, _react.default.createElement("h4", {
    className: "card-title"
  }, movieTitle), _react.default.createElement("p", {
    className: "card-text"
  }, description), _react.default.createElement("a", {
    href: "#",
    className: "btn btn-primary"
  }, "Watch Trailer")));
};

Movie.propTypes = {
  movieTitle: _propTypes.string,
  description: _propTypes.string
};
var _default = Movie;
exports.default = _default;

/***/ }),

/***/ "./src/shared/components/Movie/Movie.scss":
/*!************************************************!*\
  !*** ./src/shared/components/Movie/Movie.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271828
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/components/MovieCard/MovieCard.js":
/*!******************************************************!*\
  !*** ./src/shared/components/MovieCard/MovieCard.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

__webpack_require__(/*! ./MovieCard.scss */ "./src/shared/components/MovieCard/MovieCard.scss");

var MovieCard =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(MovieCard, _PureComponent);

  function MovieCard() {
    (0, _classCallCheck2.default)(this, MovieCard);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MovieCard).apply(this, arguments));
  }

  (0, _createClass2.default)(MovieCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          movieGenre = _this$props.movieGenre,
          release_date = _this$props.release_date,
          overview = _this$props.overview,
          id = _this$props.id;
      return _react.default.createElement("article", {
        className: "movieCard"
      }, _react.default.createElement("div", {
        className: "card"
      }, _react.default.createElement("div", {
        className: "card-body"
      }, _react.default.createElement("h4", {
        className: "card-title movieCard__title movieCard__text-clamp"
      }, title), _react.default.createElement("p", {
        className: "card-text text-clamp"
      }, overview)), _react.default.createElement("ul", {
        className: "list-group list-group-flush"
      }, _react.default.createElement("li", {
        className: "list-group-item"
      }, release_date), _react.default.createElement("li", {
        className: "list-group-item"
      }, movieGenre)), _react.default.createElement(_reactRouterDom.NavLink, {
        to: "details/".concat(id)
      }, "See Details")));
    }
  }]);
  return MovieCard;
}(_react.PureComponent);

exports.default = MovieCard;

/***/ }),

/***/ "./src/shared/components/MovieCard/MovieCard.scss":
/*!********************************************************!*\
  !*** ./src/shared/components/MovieCard/MovieCard.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271800
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/components/Nav/Nav.js":
/*!******************************************!*\
  !*** ./src/shared/components/Nav/Nav.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _nodeUuid = __webpack_require__(/*! node-uuid */ "./node_modules/node-uuid/uuid.js");

var _Searcher = _interopRequireDefault(__webpack_require__(/*! components/Searcher/Searcher */ "./src/shared/components/Searcher/Searcher.js"));

var Nav =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Nav, _Component);

  function Nav() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Nav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Nav)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "searchTermHandler", function (searchTerm) {
      _this.setState({
        searchTerm: searchTerm
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "links", [{
      id: (0, _nodeUuid.v4)(),
      path: 'about',
      name: 'About'
    }, {
      id: (0, _nodeUuid.v4)(),
      path: 'movies',
      name: 'Movies'
    }]);
    return _this;
  }

  (0, _createClass2.default)(Nav, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          searchTerm = _this$props.searchTerm,
          showSearch = _this$props.showSearch,
          showProfile = _this$props.showProfile,
          onSearch = _this$props.onSearch;
      var space;

      if (showSearch) {
        space = _react.default.createElement(_Searcher.default, {
          searchTerm: searchTerm,
          onSearch: onSearch
        });
      } else if (showProfile) {
        space = _react.default.createElement(_reactRouterDom.NavLink, {
          to: "/profile",
          className: "btn btn-outline-secondary"
        }, "Profile");
      } else {
        space = _react.default.createElement(_reactRouterDom.NavLink, {
          to: "/movies",
          className: "navbar-brand"
        }, "Back");
      }

      return _react.default.createElement("nav", {
        className: "navbar navbar-dark navbar-expand-lg bg-dark"
      }, _react.default.createElement(_reactRouterDom.NavLink, {
        to: "/",
        className: "navbar-brand"
      }, "React Movies"), _react.default.createElement("button", {
        className: "navbar-toggler navbar-toggler-right",
        type: "button"
      }, _react.default.createElement("span", {
        className: "navbar-toggler-icon"
      })), _react.default.createElement("div", {
        className: "collapse navbar-collapse"
      }, _react.default.createElement("ul", {
        className: "navbar-nav mr-auto"
      }, this.links.map(function (_ref) {
        var path = _ref.path,
            name = _ref.name,
            id = _ref.id;
        return _react.default.createElement("li", {
          key: id,
          className: "nav-item"
        }, _react.default.createElement(_reactRouterDom.NavLink, {
          to: "/".concat(path),
          key: id,
          activeClassName: "active",
          className: "nav-link"
        }, name));
      })), _react.default.createElement("div", {
        className: "form-inline"
      }, space)));
    }
  }]);
  return Nav;
}(_react.Component);

Nav.propTypes = {
  showSearch: _propTypes.bool,
  searchTerm: _propTypes.string,
  onSearch: _propTypes.func
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Nav);

exports.default = _default;

/***/ }),

/***/ "./src/shared/components/Nav/index.js":
/*!********************************************!*\
  !*** ./src/shared/components/Nav/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Nav", {
  enumerable: true,
  get: function get() {
    return _Nav.default;
  }
});

var _Nav = _interopRequireDefault(__webpack_require__(/*! ./Nav */ "./src/shared/components/Nav/Nav.js"));

/***/ }),

/***/ "./src/shared/components/Searcher/Searcher.js":
/*!****************************************************!*\
  !*** ./src/shared/components/Searcher/Searcher.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var Searcher =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Searcher, _React$Component);

  function Searcher(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Searcher);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Searcher).call(this, props)); // This binding is necessary to make `this` work in the callback

    _this.search = _this.search.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Searcher, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "row justify-content-center"
      }, _react.default.createElement("div", {
        className: "col-xs-12 col-sm-12 col-md-12"
      }, _react.default.createElement("form", {
        name: "searcher",
        onSubmit: this.search
      }, _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("label", {
        htmlFor: "searcher",
        className: "sr-only"
      }, "Just type"), _react.default.createElement("input", {
        type: "text",
        id: "searcher",
        className: "form-control",
        name: "searcher",
        placeholder: "Type...",
        value: this.props.searchTerm,
        onChange: this.search
      })))));
    }
    /**
     * pass data to parent component
     *
     * @param {SyntheticEvent} evt - the event that comes from the input
     * @return {void}
     */

  }, {
    key: "search",
    value: function search(evt) {
      this.props.onSearch(evt.target.value);
    }
  }]);
  return Searcher;
}(_react.default.Component);

exports.default = Searcher;

/***/ }),

/***/ "./src/shared/constants/Urls.js":
/*!**************************************!*\
  !*** ./src/shared/constants/Urls.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COUNTRIES = void 0;
var COUNTRIES = 'https://restcountries.eu/rest/v2';
exports.COUNTRIES = COUNTRIES;

/***/ }),

/***/ "./src/shared/pages/About/About.js":
/*!*****************************************!*\
  !*** ./src/shared/pages/About/About.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Header = _interopRequireDefault(__webpack_require__(/*! components/Header/Header */ "./src/shared/components/Header/Header.js"));

__webpack_require__(/*! ./About.scss */ "./src/shared/pages/About/About.scss");

var About =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(About, _Component);

  function About() {
    (0, _classCallCheck2.default)(this, About);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(About).apply(this, arguments));
  }

  (0, _createClass2.default)(About, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("section", {
        className: "rmAbout"
      }, _react.default.createElement("div", {
        className: "rmAbout__wrapper"
      }, _react.default.createElement(_Header.default, {
        heading: "About",
        subHeading: "React Movies"
      }), _react.default.createElement("div", {
        className: "container pb-5"
      }, _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("div", {
        className: "col-lg-8 col-md-10 mx-auto"
      }, _react.default.createElement("p", null, "This is just an app to save and share your favorite movies, because sometimes we need a recommendation when we doesn't have anything to see, so this is the perfect place."))))));
    }
  }]);
  return About;
}(_react.Component);

var _default = About;
exports.default = _default;

/***/ }),

/***/ "./src/shared/pages/About/About.scss":
/*!*******************************************!*\
  !*** ./src/shared/pages/About/About.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271755
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/pages/Landing/Landing.js":
/*!*********************************************!*\
  !*** ./src/shared/pages/Landing/Landing.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Urls = __webpack_require__(/*! constants/Urls */ "./src/shared/constants/Urls.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/store/actions/index.js");

__webpack_require__(/*! ./Landing.scss */ "./src/shared/pages/Landing/Landing.scss");

var Landing =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Landing, _Component);

  function Landing() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Landing);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Landing)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (evt) {
      var setSelectedCountry = _this.props.setSelectedCountry;
      var selectedCountry = evt.target.value;
      setSelectedCountry(selectedCountry);
    });
    return _this;
  }

  (0, _createClass2.default)(Landing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          countries = _this$props.countries,
          getCountries = _this$props.getCountries;

      if (!countries.length) {
        getCountries("".concat(_Urls.COUNTRIES, "/all"));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          selectedCountry = _this$props2.selectedCountry,
          countries = _this$props2.countries;
      return _react.default.createElement("div", {
        className: "Landing d-flex flex-column align-items-center justify-content-center"
      }, _react.default.createElement("h1", null, "Movie Search"), _react.default.createElement("form", {
        className: "text-center col-md-4"
      }, _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("label", {
        htmlFor: "countries"
      }, "Select a Country"), _react.default.createElement("select", {
        value: selectedCountry,
        className: "form-control",
        onChange: this.handleChange
      }, countries.map(function (_ref) {
        var name = _ref.name;
        return _react.default.createElement("option", {
          id: "countries",
          key: name,
          value: name
        }, name);
      })))), _react.default.createElement(_reactRouterDom.Link, {
        to: "movies"
      }, _react.default.createElement("button", {
        type: "button",
        className: "btn btn-primary"
      }, "See all movies")));
    }
  }]);
  return Landing;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    selectedCountry: state.selectedCountry,
    countries: state.countries
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getCountries: function getCountries(url) {
      dispatch((0, _actions.getCountries)(url));
    },
    setCountry: function setCountry(country) {
      dispatch((0, _actions.setSelectedCountry)(country));
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Landing);

exports.default = _default;

/***/ }),

/***/ "./src/shared/pages/Landing/Landing.scss":
/*!***********************************************!*\
  !*** ./src/shared/pages/Landing/Landing.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271753
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/pages/MovieDetails/MovieDetails.js":
/*!*******************************************************!*\
  !*** ./src/shared/pages/MovieDetails/MovieDetails.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/store/actions/index.js");

var _Movie = _interopRequireDefault(__webpack_require__(/*! components/Movie/Movie */ "./src/shared/components/Movie/Movie.js"));

__webpack_require__(/*! ./MovieDetails.scss */ "./src/shared/pages/MovieDetails/MovieDetails.scss");

var MovieDetails =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(MovieDetails, _Component);

  function MovieDetails() {
    (0, _classCallCheck2.default)(this, MovieDetails);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MovieDetails).apply(this, arguments));
  }

  (0, _createClass2.default)(MovieDetails, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.dispatch((0, _actions.getMovie)('1'));
    }
  }, {
    key: "render",
    value: function render() {
      var movie = this.props.movie;
      return _react.default.createElement("div", null, _react.default.createElement("div", {
        className: "movieDetails d-flex flex-column align-items-center justify-content-center"
      }, _react.default.createElement(_Movie.default, movie)));
    }
  }]);
  return MovieDetails;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    movie: state.movie
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(MovieDetails);

exports.default = _default;

/***/ }),

/***/ "./src/shared/pages/MovieDetails/MovieDetails.scss":
/*!*********************************************************!*\
  !*** ./src/shared/pages/MovieDetails/MovieDetails.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271758
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/pages/Movies/Movies.js":
/*!*******************************************!*\
  !*** ./src/shared/pages/Movies/Movies.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/store/actions/index.js");

var _MovieCard = _interopRequireDefault(__webpack_require__(/*! components/MovieCard/MovieCard */ "./src/shared/components/MovieCard/MovieCard.js"));

__webpack_require__(/*! ./Movies.scss */ "./src/shared/pages/Movies/Movies.scss");

var Movies =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Movies, _Component);

  function Movies() {
    (0, _classCallCheck2.default)(this, Movies);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Movies).apply(this, arguments));
  }

  (0, _createClass2.default)(Movies, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          movies = _this$props.movies,
          fetchMovies = _this$props.fetchMovies;

      if (movies.length === 0) {
        fetchMovies('movie/popular');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          searchTerm = _this$props2.searchTerm,
          movies = _this$props2.movies;
      return _react.default.createElement("section", null, _react.default.createElement("div", {
        className: "px-3"
      }, _react.default.createElement("div", {
        className: "d-flex align-items-start justify-content-between flex-wrap"
      }, movies.map(function (movie) {
        return _react.default.createElement(_MovieCard.default, (0, _extends2.default)({
          key: movie.id
        }, movie));
      }))));
    }
  }]);
  return Movies;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    movies: state.movies
  };
};

var mapDispatchToProps = {
  fetchMovies: _actions.getMovies,
  setSearchTerm: _actions.setSearchTerm
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Movies);

exports.default = _default;

/***/ }),

/***/ "./src/shared/pages/Movies/Movies.scss":
/*!*********************************************!*\
  !*** ./src/shared/pages/Movies/Movies.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551768271744
      var cssReload = __webpack_require__(/*! ../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/shared/pages/Profile/Profile.js":
/*!*********************************************!*\
  !*** ./src/shared/pages/Profile/Profile.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var Profile =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Profile, _Component);

  function Profile() {
    (0, _classCallCheck2.default)(this, Profile);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Profile).apply(this, arguments));
  }

  (0, _createClass2.default)(Profile, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("section", {
        className: "rmProfile"
      }, _react.default.createElement("div", {
        className: "card",
        style: {
          width: '18rem'
        }
      }, _react.default.createElement("img", {
        className: "card-img-top",
        src: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_160dec4243a%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_160dec4243a%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.4375%22%20y%3D%2296.3375%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
      }), _react.default.createElement("div", {
        className: "card-body"
      }, _react.default.createElement("h5", {
        className: "card-title"
      }, "Card title"), _react.default.createElement("p", {
        className: "card-text"
      }, "Some quick example text to build on the card title and make up the bulk of the card's content.")), _react.default.createElement("ul", {
        className: "list-group list-group-flush"
      }, _react.default.createElement("li", {
        className: "list-group-item"
      }, "Cras justo odio"), _react.default.createElement("li", {
        className: "list-group-item"
      }, "Dapibus ac facilisis in"), _react.default.createElement("li", {
        className: "list-group-item"
      }, "Vestibulum at eros")), _react.default.createElement("div", {
        className: "card-body"
      }, _react.default.createElement("a", {
        href: "#",
        className: "card-link"
      }, "Card link"), _react.default.createElement("a", {
        href: "#",
        className: "card-link"
      }, "Another link"))));
    }
  }]);
  return Profile;
}(_react.Component);

var _default = Profile;
exports.default = _default;

/***/ }),

/***/ "./src/shared/routing/Routing.js":
/*!***************************************!*\
  !*** ./src/shared/routing/Routing.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _Nav = __webpack_require__(/*! components/Nav */ "./src/shared/components/Nav/index.js");

var _Footer = _interopRequireDefault(__webpack_require__(/*! components/Footer/Footer */ "./src/shared/components/Footer/Footer.js"));

var _Landing = _interopRequireDefault(__webpack_require__(/*! pages/Landing/Landing */ "./src/shared/pages/Landing/Landing.js"));

var _About = _interopRequireDefault(__webpack_require__(/*! pages/About/About */ "./src/shared/pages/About/About.js"));

var _Movies = _interopRequireDefault(__webpack_require__(/*! pages/Movies/Movies */ "./src/shared/pages/Movies/Movies.js"));

var _Profile = _interopRequireDefault(__webpack_require__(/*! pages/Profile/Profile */ "./src/shared/pages/Profile/Profile.js"));

var _MovieDetails = _interopRequireDefault(__webpack_require__(/*! pages/MovieDetails/MovieDetails */ "./src/shared/pages/MovieDetails/MovieDetails.js"));

var Loading = function Loading() {
  return _react.default.createElement("div", null, "...");
};

var Routing = function Routing() {
  return _react.default.createElement("main", null, _react.default.createElement(_Nav.Nav, null), _react.default.createElement("div", null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Landing.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/about",
    component: function component(props) {
      return _react.default.createElement(_About.default, props);
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/movies",
    component: function component(props) {
      return _react.default.createElement(_Movies.default, props);
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/Profile",
    component: function component(props) {
      return _react.default.createElement(_Profile.default, props);
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/details/:id",
    component: function component(props) {
      return _react.default.createElement(_MovieDetails.default, props);
    }
  })), _react.default.createElement(_Footer.default, null));
};

var _default = Routing;
exports.default = _default;

/***/ }),

/***/ "./src/shared/routing/index.js":
/*!*************************************!*\
  !*** ./src/shared/routing/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Routing", {
  enumerable: true,
  get: function get() {
    return _Routing.default;
  }
});

var _Routing = _interopRequireDefault(__webpack_require__(/*! ./Routing */ "./src/shared/routing/Routing.js"));

/***/ }),

/***/ "./src/shared/store/ActionTypes.js":
/*!*****************************************!*\
  !*** ./src/shared/store/ActionTypes.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOVIES_FAILURE = exports.MOVIES_SUCCESS = exports.MOVIES_REQUEST = exports.GET_COUNTRIES_FAILURE = exports.GET_COUNTRIES_SUCCESS = exports.GET_COUNTRIES_REQUEST = exports.SET_MOVIES = exports.SET_MOVIE = exports.SET_SELECTED_COUNTRY = exports.SET_SEARCH_TERM = void 0;

/**
 * @module constants/ActionTypes
 */
var SET_SEARCH_TERM = 'SET_SEARCH_TERM';
exports.SET_SEARCH_TERM = SET_SEARCH_TERM;
var SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';
exports.SET_SELECTED_COUNTRY = SET_SELECTED_COUNTRY;
var SET_MOVIE = 'SET_MOVIE';
exports.SET_MOVIE = SET_MOVIE;
var SET_MOVIES = 'SET_MOVIES';
exports.SET_MOVIES = SET_MOVIES;
var GET_COUNTRIES_REQUEST = 'GET_COUNTRIES_REQUEST';
exports.GET_COUNTRIES_REQUEST = GET_COUNTRIES_REQUEST;
var GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
exports.GET_COUNTRIES_SUCCESS = GET_COUNTRIES_SUCCESS;
var GET_COUNTRIES_FAILURE = 'GET_COUNTRIES_FAILURE';
exports.GET_COUNTRIES_FAILURE = GET_COUNTRIES_FAILURE;
var MOVIES_REQUEST = 'MOVIES_REQUEST';
exports.MOVIES_REQUEST = MOVIES_REQUEST;
var MOVIES_SUCCESS = 'MOVIES_SUCCESS';
exports.MOVIES_SUCCESS = MOVIES_SUCCESS;
var MOVIES_FAILURE = 'MOVIES_FAILURE';
exports.MOVIES_FAILURE = MOVIES_FAILURE;

/***/ }),

/***/ "./src/shared/store/actions/getCountries.js":
/*!**************************************************!*\
  !*** ./src/shared/store/actions/getCountries.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCountries = getCountries;

var _api = _interopRequireDefault(__webpack_require__(/*! api */ "./src/shared/api/api.js"));

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js"));

/**
 *
 * @param {String} query = ''
 * @return {{}}
 */
function getCountries() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    types: [types.GET_COUNTRIES_REQUEST, types.GET_COUNTRIES_SUCCESS, types.GET_COUNTRIES_FAILURE],
    callAPI: function callAPI() {
      return _api.default.get(query);
    }
  };
}

/***/ }),

/***/ "./src/shared/store/actions/getMovies.js":
/*!***********************************************!*\
  !*** ./src/shared/store/actions/getMovies.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovies = getMovies;

var _api = _interopRequireDefault(__webpack_require__(/*! api */ "./src/shared/api/api.js"));

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js"));

var API_KEY = 'cb8c255cd5c9be31d0d60734f0bbef58';
/**
 *
 * @param {String} query = ''
 * @return {{}}
 */

function getMovies() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var url = "https://api.themoviedb.org/3/".concat(query, "?api_key=").concat(API_KEY, "&language=en-US&page=1");
  console.log('url', url);
  return {
    types: [types.MOVIES_REQUEST, types.MOVIES_SUCCESS, types.MOVIES_FAILURE],
    callAPI: function callAPI() {
      return _api.default.get(url);
    }
  };
}

/***/ }),

/***/ "./src/shared/store/actions/index.js":
/*!*******************************************!*\
  !*** ./src/shared/store/actions/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovie = getMovie;
exports.getCountries = exports.setCountries = exports.setMovie = exports.getMovies = exports.setMovies = exports.setSelectedCountry = exports.setSearchTerm = void 0;

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js"));

var _makeActionCreator = _interopRequireDefault(__webpack_require__(/*! ./makeActionCreator */ "./src/shared/store/actions/makeActionCreator.js"));

var _getCountries = __webpack_require__(/*! ./getCountries */ "./src/shared/store/actions/getCountries.js");

var _getMovies = __webpack_require__(/*! ./getMovies */ "./src/shared/store/actions/getMovies.js");

/**
 * @module reducers
 */

/**
 *
 * @param {String} searchTerm
 * @return {Object.<Action>} action
 */
var setSearchTerm = (0, _makeActionCreator.default)(types.SET_SEARCH_TERM, 'searchTerm');
/**
 *
 * @param {String} selectedCountry
 * @return {Object.<Action>} action
 */

exports.setSearchTerm = setSearchTerm;
var setSelectedCountry = (0, _makeActionCreator.default)(types.SET_SELECTED_COUNTRY, 'selectedCountry');
/**
 *
 * @param {Array.<Object>} movies
 * @return {Object.<Action>}
 */

exports.setSelectedCountry = setSelectedCountry;
var setMovies = (0, _makeActionCreator.default)(types.SET_MOVIES, 'movies');
exports.setMovies = setMovies;
var getMovies = _getMovies.getMovies;
/**
 *
 * @param {Object} movie
 * @return {Object.<Action>}
 */

exports.getMovies = getMovies;
var setMovie = (0, _makeActionCreator.default)(types.SET_MOVIE, 'movie');
/**
 *
 * @param {String} id
 * @return {Function} function
 */

exports.setMovie = setMovie;

function getMovie(id) {
  return function (dispatch, getState) {
    var movies = getState().movies;
    var movie = movies.filter(function (m) {
      return m.id === +id;
    })[0];
    dispatch(setMovie(movie));
  };
}
/**
 *
 * @param {Array.<Object>} countries
 * @return {Object.<Action>}
 */


var setCountries = (0, _makeActionCreator.default)(types.SET_COUNTRIES, 'countries');
/**
 * @type {Function} getCountries
 */

exports.setCountries = setCountries;
var getCountries = _getCountries.getCountries;
exports.getCountries = getCountries;

/***/ }),

/***/ "./src/shared/store/actions/makeActionCreator.js":
/*!*******************************************************!*\
  !*** ./src/shared/store/actions/makeActionCreator.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeActionCreator;

/**
 * @module actions/makeActionCreator
 */

/**
 * Makes an action creator function to reduce boilerplate
 *
 * @param {String} type
 * @param argNames
 * @return {Function} the action creator itself
 */
function makeActionCreator(type) {
  for (var _len = arguments.length, argNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argNames[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var action = {
      type: type
    };
    argNames.forEach(function (arg, index) {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

/***/ }),

/***/ "./src/shared/store/index.js":
/*!***********************************!*\
  !*** ./src/shared/store/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _throttle = _interopRequireDefault(__webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js"));

var _localStorage = __webpack_require__(/*! ./localStorage */ "./src/shared/store/localStorage.js");

var _middlewares = _interopRequireDefault(__webpack_require__(/*! store/middlewares */ "./src/shared/store/middlewares/index.js"));

var _reducers = _interopRequireDefault(__webpack_require__(/*! store/reducers */ "./src/shared/store/reducers/index.js"));

/**
 * @module store
 */
// Middleware is the suggested way to extend Redux with custom functionality.
// import all reducers
// Get the state from localStorage
var persistedState = (0, _localStorage.loadState)();

var devtools = typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' && // when the extension is not installed, we’re using Redux compose here.
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  actionsBlacklist: []
});

var composeEnhancers = devtools || _redux.compose;
var store = (0, _redux.createStore)(_reducers.default, persistedState, composeEnhancers(_redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)(_middlewares.default))) // the third parameter is what is called an 'enhancer'
); // Save the state any time the store state changes

store.subscribe((0, _throttle.default)(function () {
  // Rather than pass the whole state object, just pass an object with the key field from the state object.
  (0, _localStorage.saveState)({
    movie: store.getState().movie
  });
}, 1000));

if (true) {
  if (true) {
    module.hot.accept(/*! store/reducers */ "./src/shared/store/reducers/index.js", function () {
      return store.replaceReducer(__webpack_require__(/*! store/reducers */ "./src/shared/store/reducers/index.js").default);
    });
  }
}

var _default = store;
exports.default = _default;

/***/ }),

/***/ "./src/shared/store/localStorage.js":
/*!******************************************!*\
  !*** ./src/shared/store/localStorage.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveState = exports.loadState = void 0;

/**
 * @module localStorage
 * persist the state of the application in the localStorage using browser localStorage API.
 */

/**
 * @desc Look into localStorage by key, retrieve a string, and try to parse it as JSON.
 *
 * @return {JSON}
 */
var loadState = function loadState() {
  /**
   * It's important that we wrap this code into try/catch because calls to localStorage.getItem can fail
   * if the user privacy mode does not allow the use of localStorage.
   */
  try {
    var serializedState = localStorage.getItem('state'); // If serializedState is null it means that the key doesn't exist so I'll return undefined to let the reducers initialize the state instead.

    if (serializedState === null) {
      return undefined;
    } // If the serializedState string exists I'm going to use JSON.parse in order to turn it into the state object.


    return JSON.parse(serializedState);
  } catch (err) {
    // In case of any errors return undefined to let reducers initialize the application.
    return undefined;
  }
};
/**
 * Sets an item on localStorage
 * @param {Object} state
 * @return {void}
 */


exports.loadState = loadState;

var saveState = function saveState(state) {
  /**
   * Serializes it to string by using JSON.stringify. This will only work if the state is serializable,
   * but this is the general recommendation in Redux. The state SHOULD be serializable.
   */
  try {
    var serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('localStorage shit: ', err);
  }
};

exports.saveState = saveState;

/***/ }),

/***/ "./src/shared/store/middlewares/apiMiddleware.js":
/*!*******************************************************!*\
  !*** ./src/shared/store/middlewares/apiMiddleware.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiMiddleware;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

/**
 * @desc handles all API's async actions
 * @param {Function} dispatch
 * @param {Function} getState
 * @return {Function}
 */
function apiMiddleware(_ref) {
  var dispatch = _ref.dispatch,
      getState = _ref.getState;
  return function (next) {
    return function (action) {
      var types = action.types,
          callAPI = action.callAPI,
          _action$shouldCallAPI = action.shouldCallAPI,
          shouldCallAPI = _action$shouldCallAPI === void 0 ? function () {
        return true;
      } : _action$shouldCallAPI,
          _action$payload = action.payload,
          payload = _action$payload === void 0 ? {} : _action$payload;

      if (!types) {
        // Normal action: pass it on
        return next(action);
      }

      if (!Array.isArray(types) || types.length !== 3 || !types.every(function (type) {
        return typeof type === 'string';
      })) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return;
      }

      var _types = (0, _slicedToArray2.default)(types, 3),
          requestType = _types[0],
          successType = _types[1],
          failureType = _types[2];

      dispatch((0, _objectSpread2.default)({}, payload, {
        type: requestType
      }));
      (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var response;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return callAPI();

              case 3:
                response = _context.sent;
                return _context.abrupt("return", dispatch((0, _objectSpread2.default)({}, payload, {
                  response: response,
                  type: successType
                })));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", dispatch((0, _objectSpread2.default)({}, payload, {
                  error: _context.t0,
                  type: failureType
                })));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    };
  };
}

/***/ }),

/***/ "./src/shared/store/middlewares/index.js":
/*!***********************************************!*\
  !*** ./src/shared/store/middlewares/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js"));

var _logger = _interopRequireDefault(__webpack_require__(/*! ./logger */ "./src/shared/store/middlewares/logger.js"));

var _apiMiddleware = _interopRequireDefault(__webpack_require__(/*! ./apiMiddleware */ "./src/shared/store/middlewares/apiMiddleware.js"));

/**
 * @module middleware
 */

/**
 * @type {middleware[]}
 */
var middlewares = [_reduxThunk.default, _apiMiddleware.default];

if (true) {
  middlewares = (0, _toConsumableArray2.default)(middlewares).concat([_logger.default]);
}

var _default = middlewares;
exports.default = _default;

/***/ }),

/***/ "./src/shared/store/middlewares/logger.js":
/*!************************************************!*\
  !*** ./src/shared/store/middlewares/logger.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = logger;

/**
 * Taken from: https://github.com/gaearon/todos/blob/17-the-middleware-chain/src/configureStore.js
 *
 * Logs debugging information
 *
 * @param {Object} store - Redux's store
 * @return {Function}
 */
function logger(store) {
  /**
   * Rather than take the next middleware from the store, we'll
   * make it injectable as an argument, so the function that calls
   * the middlewares can chose which middle ware to pass
   */
  return function (next) {
    if (!console.group) {
      return next;
    } // The actual dispatch function


    return function (action) {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      var returnValue = next(action);
      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };
}

/***/ }),

/***/ "./src/shared/store/reducers/countries.js":
/*!************************************************!*\
  !*** ./src/shared/store/reducers/countries.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/store/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js");

/**
 * @module reducers/movies
 */

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
var _default = (0, _createReducer2.default)([], (0, _defineProperty2.default)({}, _ActionTypes.GET_COUNTRIES_SUCCESS, function (state, action) {
  var data = action.response.data;
  return (0, _toConsumableArray2.default)(data);
}));

exports.default = _default;

/***/ }),

/***/ "./src/shared/store/reducers/createReducer.js":
/*!****************************************************!*\
  !*** ./src/shared/store/reducers/createReducer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createReducer;

/**
 * @module reducers/createReducer
 */

/**
 *
 * @param {any} initialState
 * @param {Object} handlers
 * @return {Function} reducer
 */
function createReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/***/ }),

/***/ "./src/shared/store/reducers/index.js":
/*!********************************************!*\
  !*** ./src/shared/store/reducers/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _movie = _interopRequireDefault(__webpack_require__(/*! ./movie */ "./src/shared/store/reducers/movie.js"));

var _movies = _interopRequireDefault(__webpack_require__(/*! ./movies */ "./src/shared/store/reducers/movies.js"));

var _searchTerm = _interopRequireDefault(__webpack_require__(/*! ./searchTerm */ "./src/shared/store/reducers/searchTerm.js"));

var _selectedCountry = _interopRequireDefault(__webpack_require__(/*! ./selectedCountry */ "./src/shared/store/reducers/selectedCountry.js"));

var _countries = _interopRequireDefault(__webpack_require__(/*! ./countries */ "./src/shared/store/reducers/countries.js"));

/**
 * @module reducers
 */
var _default = (0, _redux.combineReducers)({
  movie: _movie.default,
  movies: _movies.default,
  searchTerm: _searchTerm.default,
  selectedCountry: _selectedCountry.default,
  countries: _countries.default
});

exports.default = _default;

/***/ }),

/***/ "./src/shared/store/reducers/movie.js":
/*!********************************************!*\
  !*** ./src/shared/store/reducers/movie.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/store/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js");

/**
 * @module reducers/movie
 */

/**
 *
 * @param {Object} state = {}
 * @param {Object} action
 * @return {Object} new state
 */
var _default = (0, _createReducer2.default)({}, (0, _defineProperty2.default)({}, _ActionTypes.SET_MOVIE, function (state, action) {
  return (0, _objectSpread2.default)({}, state, {
    movie: action.movie
  });
}));

exports.default = _default;

/***/ }),

/***/ "./src/shared/store/reducers/movies.js":
/*!*********************************************!*\
  !*** ./src/shared/store/reducers/movies.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/store/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js");

/**
 * @module reducers/movies
 */

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
var _default = (0, _createReducer2.default)([], (0, _defineProperty2.default)({}, _ActionTypes.MOVIES_SUCCESS, function (state, action) {
  var results = action.response.data.results;
  return (0, _toConsumableArray2.default)(results);
}));

exports.default = _default;

/***/ }),

/***/ "./src/shared/store/reducers/searchTerm.js":
/*!*************************************************!*\
  !*** ./src/shared/store/reducers/searchTerm.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/store/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js");

/**
 * @module reducers/searchTerm
 */

/**
 *
 * @param state
 * @param action
 * @return {Function} reducer
 */
var _default = (0, _createReducer2.default)('', (0, _defineProperty2.default)({}, _ActionTypes.SET_SEARCH_TERM, function (state, action) {
  return action.searchTerm;
}));

exports.default = _default;

/***/ }),

/***/ "./src/shared/store/reducers/selectedCountry.js":
/*!******************************************************!*\
  !*** ./src/shared/store/reducers/selectedCountry.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/store/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/store/ActionTypes.js");

/**
 * @module reducers/selectedCountry
 */

/**
 *
 * @param state
 * @param action
 * @return {*}
 */
var _default = (0, _createReducer2.default)('Colombia', (0, _defineProperty2.default)({}, _ActionTypes.SET_SELECTED_COUNTRY, function (state, action) {
  return action.selectedCountry;
}));

exports.default = _default;

/***/ }),

/***/ 0:
/*!******************************************************************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=http://localhost:8501/__webpack_hmr ./node_modules/@babel/polyfill/lib/index.js ./src/client/index.js ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?path=http://localhost:8501/__webpack_hmr */"./node_modules/webpack-hot-middleware/client.js?path=http://localhost:8501/__webpack_hmr");
__webpack_require__(/*! /Users/jero/Documents/my-shit/react-movies/node_modules/@babel/polyfill/lib/index.js */"./node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! /Users/jero/Documents/my-shit/react-movies/src/client/index.js */"./src/client/index.js");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcGkvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvYXNzZXRzL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Nb3ZpZS9Nb3ZpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvTW92aWUvTW92aWUuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvTW92aWVDYXJkL01vdmllQ2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvTW92aWVDYXJkL01vdmllQ2FyZC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9OYXYvTmF2LmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9OYXYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL1NlYXJjaGVyL1NlYXJjaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29uc3RhbnRzL1VybHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9BYm91dC9BYm91dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3BhZ2VzL0Fib3V0L0Fib3V0LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9MYW5kaW5nL0xhbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9MYW5kaW5nL0xhbmRpbmcuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3BhZ2VzL01vdmllRGV0YWlscy9Nb3ZpZURldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9Nb3ZpZURldGFpbHMvTW92aWVEZXRhaWxzLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9Nb3ZpZXMvTW92aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTW92aWVzL01vdmllcy5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvUHJvZmlsZS9Qcm9maWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcm91dGluZy9Sb3V0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcm91dGluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3N0b3JlL0FjdGlvblR5cGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvc3RvcmUvYWN0aW9ucy9nZXRDb3VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9hY3Rpb25zL2dldE1vdmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3N0b3JlL2FjdGlvbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9hY3Rpb25zL21ha2VBY3Rpb25DcmVhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9sb2NhbFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9taWRkbGV3YXJlcy9hcGlNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvc3RvcmUvbWlkZGxld2FyZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9taWRkbGV3YXJlcy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9yZWR1Y2Vycy9jb3VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9yZWR1Y2Vycy9jcmVhdGVSZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvc3RvcmUvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9yZWR1Y2Vycy9tb3ZpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3N0b3JlL3JlZHVjZXJzL21vdmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3N0b3JlL3JlZHVjZXJzL3NlYXJjaFRlcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS9yZWR1Y2Vycy9zZWxlY3RlZENvdW50cnkuanMiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9idWZmZXIgKGlnbm9yZWQpIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJ1cGRhdGVzL1wiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdGlmIChudWxsKSBzY3JpcHQuY3Jvc3NPcmlnaW4gPSBudWxsO1xuIFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdChyZXF1ZXN0VGltZW91dCkge1xuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xuIFx0XHRcdH1cbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiBcdFx0XHRcdHZhciByZXF1ZXN0UGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwidXBkYXRlcy9cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCJkYTRkMGQ3MDAzY2Q0N2Q4YTIxY1wiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJidW5kbGVcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJodHRwOi8vbG9jYWxob3N0Ojg1MDEvc3RhdGljL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY3JlYXRlSGlzdG9yeSBmcm9tICdoaXN0b3J5L2NyZWF0ZUJyb3dzZXJIaXN0b3J5JztcbmltcG9ydCB7IGh5ZHJhdGUgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQge1xuICBCcm93c2VyUm91dGVyIGFzIFJvdXRlcixcbn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi4vc2hhcmVkL0FwcCc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5jb25zdCBicm93c2VySGlzdG9yeSA9IHdpbmRvdy5icm93c2VySGlzdG9yeSB8fCBjcmVhdGVIaXN0b3J5KCk7XG5cbmh5ZHJhdGUoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxSb3V0ZXI+XG4gICAgICA8QXBwIC8+XG4gICAgPC9Sb3V0ZXI+XG4gIDwvUHJvdmlkZXI+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBpZiAobW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gIH1cblxuICBpZiAoIXdpbmRvdy5icm93c2VySGlzdG9yeSkge1xuICAgIHdpbmRvdy5icm93c2VySGlzdG9yeSA9IGJyb3dzZXJIaXN0b3J5O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBSb3V0aW5nIH0gZnJvbSAncm91dGluZyc7XG5cbmltcG9ydCAnLi9hc3NldHMvc2Nzcy9zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Um91dGluZyBzdG9yZT17c3RvcmV9IC8+XG4gICAgKTtcbiAgfVxuIFxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCIvKipcbiAqIEBtb2R1bGUgYXBpL2FwaVxuICovXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBheGlvczsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNzY4MjczMjQxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAnLi9Gb290ZXIuc2Nzcyc7XG5cbmNvbnN0IEZvb3RlciA9ICgpID0+IChcbiAgPGZvb3RlciBjbGFzc05hbWU9XCJmb290ZXIgc20tcGFkZGluZyBiZy1kYXJrXCI+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb290ZXJfX2xvZ29cIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW1nLWZsdWlkXCJcbiAgICAgICAgICAgICAgc3JjPVwiLi4vLi4vYXNzZXRzL2ltZy9yZWFjdC1sb2dvLnBuZ1wiXG4gICAgICAgICAgICAgIGFsdD1cInJlYWN0IGxvZ29cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyX19jb3B5cmlnaHRcIj5cbiAgICAgICAgICAgIDxwPkNvcHlyaWdodCDCqSB7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfS4gQWxsIFJpZ2h0cyBSZXNlcnZlZDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9mb290ZXI+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNzY4MjcxNzUwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAnLi9IZWFkZXIuc2Nzcyc7XG5cbmNvbnN0IEhlYWRlciA9ICh7IGhlYWRpbmcsIHN1YkhlYWRpbmcsIGltZ1VybCA9ICcnIH0pID0+IChcbiAgPGhlYWRlciBjbGFzc05hbWU9XCJIZWFkZXJfX21hc3RoZWFkXCIgc3R5bGU9e3snYmFja2dyb3VuZCc6IGltZ1VybH19PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhZGVyX19vdmVybGF5XCIgLz5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctOCBjb2wtbWQtMTAgbXgtYXV0b1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSGVhZGVyX19wYWdlLWhlYWRpbmdcIj5cbiAgICAgICAgICAgIDxoMT57IGhlYWRpbmcgfTwvaDE+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJIZWFkZXJfX3N1YmhlYWRpbmdcIj57c3ViSGVhZGluZ308L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvaGVhZGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1NTE3NjgyNzE4MzVcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtaG90LWxvYWRlci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImZpbGVNYXBcIjpcIntmaWxlTmFtZX1cIn0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7O1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0cmluZyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgJy4vTW92aWUuc2Nzcyc7XG5cbmNvbnN0IE1vdmllID0gKHsgbW92aWVUaXRsZSwgZGVzY3JpcHRpb24gfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17IHt3aWR0aDogJzIwcmVtJ30gfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgPGg0IGNsYXNzTmFtZT1cImNhcmQtdGl0bGVcIj57IG1vdmllVGl0bGUgfTwvaDQ+XG4gICAgICA8cCBjbGFzc05hbWU9XCJjYXJkLXRleHRcIj57IGRlc2NyaXB0aW9uIH08L3A+XG4gICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPldhdGNoIFRyYWlsZXI8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKTtcblxuTW92aWUucHJvcFR5cGVzID0ge1xuICBtb3ZpZVRpdGxlOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNb3ZpZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNzY4MjcxODI4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5pbXBvcnQgJy4vTW92aWVDYXJkLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpZUNhcmQgZXh0ZW5kcyBQdXJlQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7IHRpdGxlLCBtb3ZpZUdlbnJlLCByZWxlYXNlX2RhdGUsIG92ZXJ2aWV3LCBpZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJtb3ZpZUNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgIDxoNFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjYXJkLXRpdGxlIG1vdmllQ2FyZF9fdGl0bGUgbW92aWVDYXJkX190ZXh0LWNsYW1wXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RpdGxlfVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNhcmQtdGV4dCB0ZXh0LWNsYW1wXCI+XG4gICAgICAgICAgICAgIHtvdmVydmlld31cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cCBsaXN0LWdyb3VwLWZsdXNoXCI+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+XG4gICAgICAgICAgICAgIHtyZWxlYXNlX2RhdGV9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPlxuICAgICAgICAgICAgICB7bW92aWVHZW5yZX1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8TmF2TGluayB0bz17YGRldGFpbHMvJHtpZH1gfT5cbiAgICAgICAgICAgIFNlZSBEZXRhaWxzXG4gICAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYXJ0aWNsZT5cblxuICAgICk7XG5cbiAgfVxuICBcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNzY4MjcxODAwXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBmdW5jLCBzdHJpbmcsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB2NCB9IGZyb20gJ25vZGUtdXVpZCc7XG5cbmltcG9ydCBTZWFyY2hlciBmcm9tICdjb21wb25lbnRzL1NlYXJjaGVyL1NlYXJjaGVyJztcblxuY2xhc3MgTmF2IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlYXJjaFRlcm19KTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHR5cGUge09iamVjdFtdfVxuICAgKi9cbiAgbGlua3MgPSBbXG4gICAge1xuICAgICAgaWQ6IHY0KCksXG4gICAgICBwYXRoOiAnYWJvdXQnLFxuICAgICAgbmFtZTogJ0Fib3V0J1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IHY0KCksXG4gICAgICBwYXRoOiAnbW92aWVzJyxcbiAgICAgIG5hbWU6ICdNb3ZpZXMnXG4gICAgfVxuICBdO1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFRlcm0sXG4gICAgICBzaG93U2VhcmNoLFxuICAgICAgc2hvd1Byb2ZpbGUsXG4gICAgICBvblNlYXJjaFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHNwYWNlO1xuXG4gICAgaWYgKHNob3dTZWFyY2gpIHtcbiAgICAgIHNwYWNlID0gPFNlYXJjaGVyIHNlYXJjaFRlcm09e3NlYXJjaFRlcm19IG9uU2VhcmNoPXtvblNlYXJjaH0gLz47XG4gICAgfSBlbHNlIGlmIChzaG93UHJvZmlsZSkge1xuICAgICAgc3BhY2UgPSAoXG4gICAgICAgIDxOYXZMaW5rXG4gICAgICAgICAgdG89Jy9wcm9maWxlJ1xuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcIj5cbiAgICAgICAgICBQcm9maWxlXG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwYWNlID0gKFxuICAgICAgICA8TmF2TGlua1xuICAgICAgICAgIHRvPScvbW92aWVzJ1xuICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRhcmsgbmF2YmFyLWV4cGFuZC1sZyBiZy1kYXJrXCI+XG4gICAgICAgIDxOYXZMaW5rXG4gICAgICAgICAgdG89XCIvXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIj5cbiAgICAgICAgICBSZWFjdCBNb3ZpZXNcbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdmJhci1uYXYgbXItYXV0b1wiPlxuICAgICAgICAgICAge3RoaXMubGlua3MubWFwKCh7IHBhdGgsIG5hbWUsIGlkfSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtpZH0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8TmF2TGlua1xuICAgICAgICAgICAgICAgICAgdG89e2AvJHtwYXRofWB9XG4gICAgICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdi1saW5rXCI+XG4gICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICA8L05hdkxpbms+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICAgIHtzcGFjZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICApO1xuICB9XG5cbn1cblxuTmF2LnByb3BUeXBlcyA9IHtcbiAgc2hvd1NlYXJjaDogYm9vbCxcbiAgc2VhcmNoVGVybTogc3RyaW5nLFxuICBvblNlYXJjaDogZnVuY1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWxlY3RlZENvdW50cnk6IHN0YXRlLnNlbGVjdGVkQ291bnRyeVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShOYXYpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXYgfSBmcm9tICcuL05hdic7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAvLyBUaGlzIGJpbmRpbmcgaXMgbmVjZXNzYXJ5IHRvIG1ha2UgYHRoaXNgIHdvcmsgaW4gdGhlIGNhbGxiYWNrXG4gICAgdGhpcy5zZWFyY2ggPSB0aGlzLnNlYXJjaC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGp1c3RpZnktY29udGVudC1jZW50ZXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXhzLTEyIGNvbC1zbS0xMiBjb2wtbWQtMTInPlxuICAgICAgICAgIDxmb3JtIG5hbWU9J3NlYXJjaGVyJyBvblN1Ym1pdD17dGhpcy5zZWFyY2h9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0nc2VhcmNoZXInIGNsYXNzTmFtZT0nc3Itb25seSc+SnVzdCB0eXBlPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICBpZD0nc2VhcmNoZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnXG4gICAgICAgICAgICAgICAgbmFtZT0nc2VhcmNoZXInXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J1R5cGUuLi4nXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5zZWFyY2h9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXNzIGRhdGEgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgKlxuICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldnQgLSB0aGUgZXZlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBpbnB1dFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoKGV2dCkge1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goZXZ0LnRhcmdldC52YWx1ZSk7XG4gIH1cbiAgXG59IiwiZXhwb3J0IGNvbnN0IENPVU5UUklFUyA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mic7IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJ2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlcic7XG5cbmltcG9ydCAnLi9BYm91dC5zY3NzJztcblxuY2xhc3MgQWJvdXQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicm1BYm91dFwiPlxuICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJtQWJvdXRfX3dyYXBwZXJcIj5cbiAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICBoZWFkaW5nPVwiQWJvdXRcIlxuICAgICAgICAgICAgc3ViSGVhZGluZz1cIlJlYWN0IE1vdmllc1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBwYi01XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy04IGNvbC1tZC0xMCBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICBUaGlzIGlzIGp1c3QgYW4gYXBwIHRvIHNhdmUgYW5kIHNoYXJlIHlvdXIgZmF2b3JpdGUgbW92aWVzLCBiZWNhdXNlIHNvbWV0aW1lcyB3ZSBuZWVkIGEgcmVjb21tZW5kYXRpb25cbiAgICAgICAgICAgICAgICAgIHdoZW4gd2UgZG9lc24ndCBoYXZlIGFueXRoaW5nIHRvIHNlZSwgc28gdGhpcyBpcyB0aGUgcGVyZmVjdCBwbGFjZS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFib3V0O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTc2ODI3MTc1NVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgQ09VTlRSSUVTIH0gZnJvbSAnY29uc3RhbnRzL1VybHMnO1xuaW1wb3J0IHsgZ2V0Q291bnRyaWVzIGFzIGdldENvdW50cmllc0FjdGlvbiwgc2V0U2VsZWN0ZWRDb3VudHJ5IH0gZnJvbSAnYWN0aW9ucyc7XG5cbmltcG9ydCAnLi9MYW5kaW5nLnNjc3MnO1xuXG5jbGFzcyBMYW5kaW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtTeW50aGV0aWNFdmVudH0gZXZ0XG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuICBoYW5kbGVDaGFuZ2UgPSAoZXZ0KSA9PiB7XG4gICAgY29uc3QgeyBzZXRTZWxlY3RlZENvdW50cnkgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudHJ5ID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICBzZXRTZWxlY3RlZENvdW50cnkoc2VsZWN0ZWRDb3VudHJ5KTtcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IGNvdW50cmllcywgZ2V0Q291bnRyaWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgZ2V0Q291bnRyaWVzKGAke0NPVU5UUklFU30vYWxsYCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcblxuICAgIGNvbnN0IHsgc2VsZWN0ZWRDb3VudHJ5LCBjb3VudHJpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J0xhbmRpbmcgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyJz5cbiAgICAgICAgPGgxPk1vdmllIFNlYXJjaDwvaDE+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGNvbC1tZC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNvdW50cmllc1wiPlNlbGVjdCBhIENvdW50cnk8L2xhYmVsPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDb3VudHJ5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICB7Y291bnRyaWVzLm1hcCgoeyBuYW1lIH0pID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICAgICBpZD1cImNvdW50cmllc1wiXG4gICAgICAgICAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmFtZX0+XG4gICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8TGluayB0bz1cIm1vdmllc1wiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgICAgICAgU2VlIGFsbCBtb3ZpZXNcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9MaW5rPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VsZWN0ZWRDb3VudHJ5OiBzdGF0ZS5zZWxlY3RlZENvdW50cnksXG4gIGNvdW50cmllczogc3RhdGUuY291bnRyaWVzXG59KTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKSA9PiAoe1xuICBnZXRDb3VudHJpZXModXJsKSB7XG4gICAgZGlzcGF0Y2goZ2V0Q291bnRyaWVzQWN0aW9uKHVybCkpO1xuICB9LFxuICBzZXRDb3VudHJ5KGNvdW50cnkpIHtcbiAgICBkaXNwYXRjaChzZXRTZWxlY3RlZENvdW50cnkoY291bnRyeSkpO1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoTGFuZGluZyk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTc2ODI3MTc1M1xuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgZ2V0TW92aWUgfSBmcm9tICdhY3Rpb25zJztcblxuaW1wb3J0IE1vdmllIGZyb20gJ2NvbXBvbmVudHMvTW92aWUvTW92aWUnO1xuXG5pbXBvcnQgJy4vTW92aWVEZXRhaWxzLnNjc3MnO1xuXG5jbGFzcyBNb3ZpZURldGFpbHMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGdldE1vdmllKCcxJykpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgeyBtb3ZpZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vdmllRGV0YWlscyBkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXJcIj5cbiAgICAgICAgICA8TW92aWUgey4uLm1vdmllfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgfVxuICBcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBtb3ZpZTogc3RhdGUubW92aWVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoTW92aWVEZXRhaWxzKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNzY4MjcxNzU4XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBzZXRTZWFyY2hUZXJtLCBnZXRNb3ZpZXMgfSBmcm9tICdhY3Rpb25zJztcblxuaW1wb3J0IE1vdmllQ2FyZCBmcm9tICdjb21wb25lbnRzL01vdmllQ2FyZC9Nb3ZpZUNhcmQnO1xuXG5pbXBvcnQgJy4vTW92aWVzLnNjc3MnO1xuXG5jbGFzcyBNb3ZpZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbW92aWVzLCBmZXRjaE1vdmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZmV0Y2hNb3ZpZXMoJ21vdmllL3BvcHVsYXInKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgeyBzZWFyY2hUZXJtLCBtb3ZpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLXN0YXJ0IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAge21vdmllcy5tYXAobW92aWUgPT4gKFxuICAgICAgICAgICAgICA8TW92aWVDYXJkIGtleT17bW92aWUuaWR9IHsuLi5tb3ZpZX0gLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICApO1xuXG4gIH1cblxuICBcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWFyY2hUZXJtOiBzdGF0ZS5zZWFyY2hUZXJtLFxuICBtb3ZpZXM6IHN0YXRlLm1vdmllc1xufSk7XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IHsgXG4gIGZldGNoTW92aWVzOiBnZXRNb3ZpZXMsXG4gIHNldFNlYXJjaFRlcm0sICBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKE1vdmllcyk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTc2ODI3MTc0NFxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5jbGFzcyBQcm9maWxlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJtUHJvZmlsZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17e3dpZHRoOiAnMThyZW0nfX0+XG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2FyZC1pbWctdG9wXCJcbiAgICAgICAgICAgIHNyYz1cImRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PVVURi04LCUzQ3N2ZyUyMHdpZHRoJTNEJTIyMjg2JTIyJTIwaGVpZ2h0JTNEJTIyMTgwJTIyJTIweG1sbnMlM0QlMjJodHRwJTNBJTJGJTJGd3d3LnczLm9yZyUyRjIwMDAlMkZzdmclMjIlMjB2aWV3Qm94JTNEJTIyMCUyMDAlMjAyODYlMjAxODAlMjIlMjBwcmVzZXJ2ZUFzcGVjdFJhdGlvJTNEJTIybm9uZSUyMiUzRSUzQ2RlZnMlM0UlM0NzdHlsZSUyMHR5cGUlM0QlMjJ0ZXh0JTJGY3NzJTIyJTNFJTIzaG9sZGVyXzE2MGRlYzQyNDNhJTIwdGV4dCUyMCU3QiUyMGZpbGwlM0FyZ2JhKDI1NSUyQzI1NSUyQzI1NSUyQy43NSklM0Jmb250LXdlaWdodCUzQW5vcm1hbCUzQmZvbnQtZmFtaWx5JTNBSGVsdmV0aWNhJTJDJTIwbW9ub3NwYWNlJTNCZm9udC1zaXplJTNBMTRwdCUyMCU3RCUyMCUzQyUyRnN0eWxlJTNFJTNDJTJGZGVmcyUzRSUzQ2clMjBpZCUzRCUyMmhvbGRlcl8xNjBkZWM0MjQzYSUyMiUzRSUzQ3JlY3QlMjB3aWR0aCUzRCUyMjI4NiUyMiUyMGhlaWdodCUzRCUyMjE4MCUyMiUyMGZpbGwlM0QlMjIlMjM3NzclMjIlM0UlM0MlMkZyZWN0JTNFJTNDZyUzRSUzQ3RleHQlMjB4JTNEJTIyOTkuNDM3NSUyMiUyMHklM0QlMjI5Ni4zMzc1JTIyJTNFSW1hZ2UlMjBjYXAlM0MlMkZ0ZXh0JTNFJTNDJTJGZyUzRSUzQyUyRmclM0UlM0MlMkZzdmclM0VcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+Q2FyZCB0aXRsZTwvaDU+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjYXJkLXRleHRcIj5Tb21lIHF1aWNrIGV4YW1wbGUgdGV4dCB0byBidWlsZCBvbiB0aGUgY2FyZCB0aXRsZSBhbmQgbWFrZSB1cCB0aGUgYnVsayBvZiB0aGUgY2FyZCdzIGNvbnRlbnQuPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPkNyYXMganVzdG8gb2RpbzwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+RGFwaWJ1cyBhYyBmYWNpbGlzaXMgaW48L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPlZlc3RpYnVsdW0gYXQgZXJvczwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJjYXJkLWxpbmtcIj5DYXJkIGxpbms8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImNhcmQtbGlua1wiPkFub3RoZXIgbGluazwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsZTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBSb3V0ZVxufSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuaW1wb3J0IHsgTmF2IH0gZnJvbSAnY29tcG9uZW50cy9OYXYnO1xuaW1wb3J0IEZvb3RlciBmcm9tICdjb21wb25lbnRzL0Zvb3Rlci9Gb290ZXInO1xuXG5jb25zdCBMb2FkaW5nID0gKCkgPT4gKDxkaXY+Li4uPC9kaXY+KTtcblxuaW1wb3J0IExhbmRpbmcgZnJvbSAncGFnZXMvTGFuZGluZy9MYW5kaW5nJztcblxuaW1wb3J0IEFib3V0IGZyb20gJ3BhZ2VzL0Fib3V0L0Fib3V0JztcblxuaW1wb3J0IE1vdmllcyBmcm9tICdwYWdlcy9Nb3ZpZXMvTW92aWVzJztcblxuaW1wb3J0IFByb2ZpbGUgZnJvbSAncGFnZXMvUHJvZmlsZS9Qcm9maWxlJztcblxuaW1wb3J0IE1vdmllRGV0YWlscyBmcm9tICdwYWdlcy9Nb3ZpZURldGFpbHMvTW92aWVEZXRhaWxzJztcblxuY29uc3QgUm91dGluZyA9ICgpID0+IChcbiAgPG1haW4+XG4gICAgPE5hdiAvPlxuICAgIDxkaXY+XG4gICAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0xhbmRpbmd9IC8+XG4gICAgICA8Um91dGVcbiAgICAgICAgcGF0aD1cIi9hYm91dFwiXG4gICAgICAgIGNvbXBvbmVudD17cHJvcHMgPT4gPEFib3V0IHsuLi5wcm9wc30gLz59XG4gICAgICAvPlxuICAgICAgPFJvdXRlXG4gICAgICAgIHBhdGg9XCIvbW92aWVzXCJcbiAgICAgICAgY29tcG9uZW50PXtwcm9wcyA9PiA8TW92aWVzIHsuLi5wcm9wc30gLz59XG4gICAgICAvPlxuICAgICAgPFJvdXRlXG4gICAgICAgIHBhdGg9XCIvUHJvZmlsZVwiXG4gICAgICAgIGNvbXBvbmVudD17cHJvcHMgPT4gPFByb2ZpbGUgey4uLnByb3BzfSAvPn1cbiAgICAgIC8+XG4gICAgICA8Um91dGVcbiAgICAgICAgcGF0aD1cIi9kZXRhaWxzLzppZFwiXG4gICAgICAgIGNvbXBvbmVudD17cHJvcHMgPT4gPE1vdmllRGV0YWlscyB7Li4ucHJvcHN9IC8+IH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICAgPEZvb3RlciAvPlxuICA8L21haW4+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0aW5nO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBSb3V0aW5nIH0gZnJvbSAnLi9Sb3V0aW5nJzsiLCIvKipcbiAqIEBtb2R1bGUgY29uc3RhbnRzL0FjdGlvblR5cGVzXG4gKi9cbmV4cG9ydCBjb25zdCBTRVRfU0VBUkNIX1RFUk0gPSAnU0VUX1NFQVJDSF9URVJNJztcbmV4cG9ydCBjb25zdCBTRVRfU0VMRUNURURfQ09VTlRSWSA9ICdTRVRfU0VMRUNURURfQ09VTlRSWSc7XG5leHBvcnQgY29uc3QgU0VUX01PVklFID0gJ1NFVF9NT1ZJRSc7XG5leHBvcnQgY29uc3QgU0VUX01PVklFUyA9ICdTRVRfTU9WSUVTJztcblxuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfUkVRVUVTVCA9ICdHRVRfQ09VTlRSSUVTX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfU1VDQ0VTUyA9ICdHRVRfQ09VTlRSSUVTX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfRkFJTFVSRSA9ICdHRVRfQ09VTlRSSUVTX0ZBSUxVUkUnO1xuXG5leHBvcnQgY29uc3QgTU9WSUVTX1JFUVVFU1QgPSAnTU9WSUVTX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IE1PVklFU19TVUNDRVNTID0gJ01PVklFU19TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBNT1ZJRVNfRkFJTFVSRSA9ICdNT1ZJRVNfRkFJTFVSRSc7IiwiaW1wb3J0IGFwaSBmcm9tICdhcGknO1xuXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9BY3Rpb25UeXBlcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSA9ICcnXG4gKiBAcmV0dXJuIHt7fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvdW50cmllcyhxdWVyeSA9ICcnKSB7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW1xuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19SRVFVRVNULFxuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19TVUNDRVNTLFxuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19GQUlMVVJFXG4gICAgXSxcbiAgICBjYWxsQVBJOiAoKSA9PiBhcGkuZ2V0KHF1ZXJ5KSxcbiAgfTtcblxufSIsImltcG9ydCBhcGkgZnJvbSAnYXBpJztcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG5jb25zdCBBUElfS0VZID0gJ2NiOGMyNTVjZDVjOWJlMzFkMGQ2MDczNGYwYmJlZjU4JztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5ID0gJydcbiAqIEByZXR1cm4ge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW92aWVzKHF1ZXJ5ID0gJycpIHtcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvJHtxdWVyeX0/YXBpX2tleT0ke0FQSV9LRVl9Jmxhbmd1YWdlPWVuLVVTJnBhZ2U9MWA7XG4gIGNvbnNvbGUubG9nKCd1cmwnLCB1cmwpO1xuICByZXR1cm4ge1xuICAgIHR5cGVzOiBbXG4gICAgICB0eXBlcy5NT1ZJRVNfUkVRVUVTVCxcbiAgICAgIHR5cGVzLk1PVklFU19TVUNDRVNTLFxuICAgICAgdHlwZXMuTU9WSUVTX0ZBSUxVUkVcbiAgICBdLFxuICAgIGNhbGxBUEk6ICgpID0+IGFwaS5nZXQodXJsKSxcbiAgfTtcblxufSIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vyc1xuICovXG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL0FjdGlvblR5cGVzJztcbmltcG9ydCBtYWtlQWN0aW9uQ3JlYXRvciBmcm9tICcuL21ha2VBY3Rpb25DcmVhdG9yJztcblxuaW1wb3J0IHsgZ2V0Q291bnRyaWVzIGFzIGdldENvdW50cmllc0FjdGlvbiB9IGZyb20gJy4vZ2V0Q291bnRyaWVzJztcbmltcG9ydCB7IGdldE1vdmllcyBhcyBnZXRNb3ZpZXNBY3Rpb24gfSBmcm9tICcuL2dldE1vdmllcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hUZXJtXG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59IGFjdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0U2VhcmNoVGVybSA9IG1ha2VBY3Rpb25DcmVhdG9yKHR5cGVzLlNFVF9TRUFSQ0hfVEVSTSwgJ3NlYXJjaFRlcm0nKTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0ZWRDb3VudHJ5XG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59IGFjdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0U2VsZWN0ZWRDb3VudHJ5ID0gbWFrZUFjdGlvbkNyZWF0b3IodHlwZXMuU0VUX1NFTEVDVEVEX0NPVU5UUlksICdzZWxlY3RlZENvdW50cnknKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gbW92aWVzXG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRNb3ZpZXMgPSBtYWtlQWN0aW9uQ3JlYXRvcih0eXBlcy5TRVRfTU9WSUVTLCAnbW92aWVzJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRNb3ZpZXMgPSBnZXRNb3ZpZXNBY3Rpb247XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBtb3ZpZVxuICogQHJldHVybiB7T2JqZWN0LjxBY3Rpb24+fVxuICovXG5leHBvcnQgY29uc3Qgc2V0TW92aWUgPSBtYWtlQWN0aW9uQ3JlYXRvcih0eXBlcy5TRVRfTU9WSUUsICdtb3ZpZScpO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW92aWUoaWQpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBnZXRTdGF0ZSkge1xuXG4gICAgY29uc3QgbW92aWVzID0gZ2V0U3RhdGUoKS5tb3ZpZXM7XG5cbiAgICBjb25zdCBtb3ZpZSA9IG1vdmllcy5maWx0ZXIobSA9PiBtLmlkID09PSAraWQpWzBdO1xuXG4gICAgZGlzcGF0Y2goc2V0TW92aWUobW92aWUpKTtcblxuICB9O1xuXG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IGNvdW50cmllc1xuICogQHJldHVybiB7T2JqZWN0LjxBY3Rpb24+fVxuICovXG5leHBvcnQgY29uc3Qgc2V0Q291bnRyaWVzID0gbWFrZUFjdGlvbkNyZWF0b3IodHlwZXMuU0VUX0NPVU5UUklFUywgJ2NvdW50cmllcycpO1xuXG4vKipcbiAqIEB0eXBlIHtGdW5jdGlvbn0gZ2V0Q291bnRyaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb3VudHJpZXMgPSBnZXRDb3VudHJpZXNBY3Rpb247IiwiLyoqXG4gKiBAbW9kdWxlIGFjdGlvbnMvbWFrZUFjdGlvbkNyZWF0b3JcbiAqL1xuXG4vKipcbiAqIE1ha2VzIGFuIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uIHRvIHJlZHVjZSBib2lsZXJwbGF0ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0gYXJnTmFtZXNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgYWN0aW9uIGNyZWF0b3IgaXRzZWxmXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VBY3Rpb25DcmVhdG9yKHR5cGUsIC4uLmFyZ05hbWVzKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgbGV0IGFjdGlvbiA9IHsgdHlwZSB9O1xuICAgIGFyZ05hbWVzLmZvckVhY2goKGFyZywgaW5kZXgpID0+IHtcbiAgICAgIGFjdGlvblthcmdOYW1lc1tpbmRleF1dID0gYXJnc1tpbmRleF07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuXG4gIH07XG5cbn0iLCIvKipcbiAqIEBtb2R1bGUgc3RvcmVcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC90aHJvdHRsZSc7XG5cbmltcG9ydCB7IHNhdmVTdGF0ZSwgbG9hZFN0YXRlIH0gZnJvbSAnLi9sb2NhbFN0b3JhZ2UnO1xuLy8gTWlkZGxld2FyZSBpcyB0aGUgc3VnZ2VzdGVkIHdheSB0byBleHRlbmQgUmVkdXggd2l0aCBjdXN0b20gZnVuY3Rpb25hbGl0eS5cbmltcG9ydCBtaWRkbGV3YXJlcyBmcm9tICdzdG9yZS9taWRkbGV3YXJlcyc7XG4vLyBpbXBvcnQgYWxsIHJlZHVjZXJzXG5pbXBvcnQgcmVkdWNlciBmcm9tICdzdG9yZS9yZWR1Y2Vycyc7XG4vLyBHZXQgdGhlIHN0YXRlIGZyb20gbG9jYWxTdG9yYWdlXG5jb25zdCBwZXJzaXN0ZWRTdGF0ZSA9IGxvYWRTdGF0ZSgpO1xuY29uc3QgZGV2dG9vbHMgPVxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2Ygd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAvLyB3aGVuIHRoZSBleHRlbnNpb24gaXMgbm90IGluc3RhbGxlZCwgd2XigJlyZSB1c2luZyBSZWR1eCBjb21wb3NlIGhlcmUuXG4gIHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18oeyBhY3Rpb25zQmxhY2tsaXN0OiBbXSB9KTtcblxuY29uc3QgY29tcG9zZUVuaGFuY2VycyA9IGRldnRvb2xzIHx8IGNvbXBvc2U7XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gIHJlZHVjZXIsXG4gIHBlcnNpc3RlZFN0YXRlLFxuICBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpIC8vIHRoZSB0aGlyZCBwYXJhbWV0ZXIgaXMgd2hhdCBpcyBjYWxsZWQgYW4gJ2VuaGFuY2VyJ1xuKTtcblxuLy8gU2F2ZSB0aGUgc3RhdGUgYW55IHRpbWUgdGhlIHN0b3JlIHN0YXRlIGNoYW5nZXNcbnN0b3JlLnN1YnNjcmliZSh0aHJvdHRsZSgoKSA9PiB7XG4gIC8vIFJhdGhlciB0aGFuIHBhc3MgdGhlIHdob2xlIHN0YXRlIG9iamVjdCwganVzdCBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBrZXkgZmllbGQgZnJvbSB0aGUgc3RhdGUgb2JqZWN0LlxuICBzYXZlU3RhdGUoe1xuICAgIG1vdmllOiBzdG9yZS5nZXRTdGF0ZSgpLm1vdmllLFxuICB9KTtcbn0sIDEwMDApKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgnc3RvcmUvcmVkdWNlcnMnLCAoKSA9PlxuICAgICAgc3RvcmUucmVwbGFjZVJlZHVjZXIocmVxdWlyZSgnc3RvcmUvcmVkdWNlcnMnKS5kZWZhdWx0KVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG4iLCIvKipcbiAqIEBtb2R1bGUgbG9jYWxTdG9yYWdlXG4gKiBwZXJzaXN0IHRoZSBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24gaW4gdGhlIGxvY2FsU3RvcmFnZSB1c2luZyBicm93c2VyIGxvY2FsU3RvcmFnZSBBUEkuXG4gKi9cblxuLyoqXG4gKiBAZGVzYyBMb29rIGludG8gbG9jYWxTdG9yYWdlIGJ5IGtleSwgcmV0cmlldmUgYSBzdHJpbmcsIGFuZCB0cnkgdG8gcGFyc2UgaXQgYXMgSlNPTi5cbiAqXG4gKiBAcmV0dXJuIHtKU09OfVxuICovXG5leHBvcnQgY29uc3QgbG9hZFN0YXRlID0gKCkgPT4ge1xuICAvKipcbiAgICogSXQncyBpbXBvcnRhbnQgdGhhdCB3ZSB3cmFwIHRoaXMgY29kZSBpbnRvIHRyeS9jYXRjaCBiZWNhdXNlIGNhbGxzIHRvIGxvY2FsU3RvcmFnZS5nZXRJdGVtIGNhbiBmYWlsXG4gICAqIGlmIHRoZSB1c2VyIHByaXZhY3kgbW9kZSBkb2VzIG5vdCBhbGxvdyB0aGUgdXNlIG9mIGxvY2FsU3RvcmFnZS5cbiAgICovXG4gIHRyeSB7XG4gICAgY29uc3Qgc2VyaWFsaXplZFN0YXRlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3N0YXRlJyk7XG4gICAgLy8gSWYgc2VyaWFsaXplZFN0YXRlIGlzIG51bGwgaXQgbWVhbnMgdGhhdCB0aGUga2V5IGRvZXNuJ3QgZXhpc3Qgc28gSSdsbCByZXR1cm4gdW5kZWZpbmVkIHRvIGxldCB0aGUgcmVkdWNlcnMgaW5pdGlhbGl6ZSB0aGUgc3RhdGUgaW5zdGVhZC5cbiAgICBpZiAoc2VyaWFsaXplZFN0YXRlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgc2VyaWFsaXplZFN0YXRlIHN0cmluZyBleGlzdHMgSSdtIGdvaW5nIHRvIHVzZSBKU09OLnBhcnNlIGluIG9yZGVyIHRvIHR1cm4gaXQgaW50byB0aGUgc3RhdGUgb2JqZWN0LlxuICAgIHJldHVybiBKU09OLnBhcnNlKHNlcmlhbGl6ZWRTdGF0ZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIEluIGNhc2Ugb2YgYW55IGVycm9ycyByZXR1cm4gdW5kZWZpbmVkIHRvIGxldCByZWR1Y2VycyBpbml0aWFsaXplIHRoZSBhcHBsaWNhdGlvbi5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbn07XG5cbi8qKlxuICogU2V0cyBhbiBpdGVtIG9uIGxvY2FsU3RvcmFnZVxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3Qgc2F2ZVN0YXRlID0gKHN0YXRlKSA9PiB7XG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGl0IHRvIHN0cmluZyBieSB1c2luZyBKU09OLnN0cmluZ2lmeS4gVGhpcyB3aWxsIG9ubHkgd29yayBpZiB0aGUgc3RhdGUgaXMgc2VyaWFsaXphYmxlLFxuICAgKiBidXQgdGhpcyBpcyB0aGUgZ2VuZXJhbCByZWNvbW1lbmRhdGlvbiBpbiBSZWR1eC4gVGhlIHN0YXRlIFNIT1VMRCBiZSBzZXJpYWxpemFibGUuXG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRTdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHN0YXRlKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc3RhdGUnLCBzZXJpYWxpemVkU3RhdGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdsb2NhbFN0b3JhZ2Ugc2hpdDogJywgZXJyKTtcbiAgfVxuXG59OyIsIi8qKlxuICogQGRlc2MgaGFuZGxlcyBhbGwgQVBJJ3MgYXN5bmMgYWN0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2hcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGdldFN0YXRlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBpTWlkZGxld2FyZSh7IGRpc3BhdGNoLCBnZXRTdGF0ZSB9KSB7XG4gIHJldHVybiBuZXh0ID0+IGFjdGlvbiA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgdHlwZXMsXG4gICAgICBjYWxsQVBJLFxuICAgICAgc2hvdWxkQ2FsbEFQSSA9ICgpID0+IHRydWUsXG4gICAgICBwYXlsb2FkID0ge31cbiAgICB9ID0gYWN0aW9uO1xuXG4gICAgaWYgKCF0eXBlcykge1xuICAgICAgLy8gTm9ybWFsIGFjdGlvbjogcGFzcyBpdCBvblxuICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhQXJyYXkuaXNBcnJheSh0eXBlcykgfHxcbiAgICAgIHR5cGVzLmxlbmd0aCAhPT0gMyB8fFxuICAgICAgIXR5cGVzLmV2ZXJ5KHR5cGUgPT4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiB0aHJlZSBzdHJpbmcgdHlwZXMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsQVBJICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNhbGxBUEkgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoIXNob3VsZENhbGxBUEkoZ2V0U3RhdGUoKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbcmVxdWVzdFR5cGUsIHN1Y2Nlc3NUeXBlLCBmYWlsdXJlVHlwZV0gPSB0eXBlcztcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIC4uLnBheWxvYWQsXG4gICAgICB0eXBlOiByZXF1ZXN0VHlwZVxuICAgIH0pO1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFQSSgpO1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2goe1xuICAgICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgdHlwZTogc3VjY2Vzc1R5cGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZGlzcGF0Y2goe1xuICAgICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgdHlwZTogZmFpbHVyZVR5cGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkoKTtcbiAgfTtcbn0iLCIvKipcbiAqIEBtb2R1bGUgbWlkZGxld2FyZVxuICovXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuXG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBhcGlNaWRkbGV3YXJlIGZyb20gJy4vYXBpTWlkZGxld2FyZSc7XG5cbi8qKlxuICogQHR5cGUge21pZGRsZXdhcmVbXX1cbiAqL1xubGV0IG1pZGRsZXdhcmVzID0gW1xuICB0aHVuayxcbiAgYXBpTWlkZGxld2FyZVxuXTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgbWlkZGxld2FyZXMgPSBbLi4ubWlkZGxld2FyZXMsIGxvZ2dlcl07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1pZGRsZXdhcmVzO1xuIiwiLyoqXG4gKiBUYWtlbiBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZ2FlYXJvbi90b2Rvcy9ibG9iLzE3LXRoZS1taWRkbGV3YXJlLWNoYWluL3NyYy9jb25maWd1cmVTdG9yZS5qc1xuICpcbiAqIExvZ3MgZGVidWdnaW5nIGluZm9ybWF0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0b3JlIC0gUmVkdXgncyBzdG9yZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZ2dlcihzdG9yZSkge1xuICAvKipcbiAgICogUmF0aGVyIHRoYW4gdGFrZSB0aGUgbmV4dCBtaWRkbGV3YXJlIGZyb20gdGhlIHN0b3JlLCB3ZSdsbFxuICAgKiBtYWtlIGl0IGluamVjdGFibGUgYXMgYW4gYXJndW1lbnQsIHNvIHRoZSBmdW5jdGlvbiB0aGF0IGNhbGxzXG4gICAqIHRoZSBtaWRkbGV3YXJlcyBjYW4gY2hvc2Ugd2hpY2ggbWlkZGxlIHdhcmUgdG8gcGFzc1xuICAgKi9cbiAgcmV0dXJuIChuZXh0KSA9PiB7XG4gICAgaWYgKCFjb25zb2xlLmdyb3VwKSB7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG5cbiAgICAvLyBUaGUgYWN0dWFsIGRpc3BhdGNoIGZ1bmN0aW9uXG4gICAgcmV0dXJuIChhY3Rpb24pID0+IHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoYWN0aW9uLnR5cGUpO1xuICAgICAgY29uc29sZS5sb2coJyVjIHByZXYgc3RhdGUnLCAnY29sb3I6IGdyYXknLCBzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgIGNvbnNvbGUubG9nKCclYyBhY3Rpb24nLCAnY29sb3I6IGJsdWUnLCBhY3Rpb24pO1xuICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSBuZXh0KGFjdGlvbik7XG4gICAgICBjb25zb2xlLmxvZygnJWMgbmV4dCBzdGF0ZScsICdjb2xvcjogZ3JlZW4nLCBzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoYWN0aW9uLnR5cGUpO1xuICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH07XG5cbiAgfTtcblxufSIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9tb3ZpZXNcbiAqL1xuXG5pbXBvcnQgY3JlYXRlUmVkdWNlciBmcm9tICcuL2NyZWF0ZVJlZHVjZXInO1xuXG5pbXBvcnQgeyBHRVRfQ09VTlRSSUVTX1NVQ0NFU1MgfSAgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoW10sIHtcbiAgW0dFVF9DT1VOVFJJRVNfU1VDQ0VTU10oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIGRhdGFcbiAgICAgIH1cbiAgICB9ID0gYWN0aW9uO1xuICAgIHJldHVybiBbLi4uZGF0YV07XG4gIH1cbn0pOyIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9jcmVhdGVSZWR1Y2VyXG4gKi9cblxuLyoqXG4gKlxuICogQHBhcmFtIHthbnl9IGluaXRpYWxTdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRsZXJzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVkdWNlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVSZWR1Y2VyKGluaXRpYWxTdGF0ZSwgaGFuZGxlcnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIGlmIChoYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShhY3Rpb24udHlwZSkpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyc1thY3Rpb24udHlwZV0oc3RhdGUsIGFjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH07XG59IiwiLyoqXG4gKiBAbW9kdWxlIHJlZHVjZXJzXG4gKi9cblxuaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IG1vdmllIGZyb20gJy4vbW92aWUnO1xuaW1wb3J0IG1vdmllcyBmcm9tICcuL21vdmllcyc7XG5pbXBvcnQgc2VhcmNoVGVybSBmcm9tICcuL3NlYXJjaFRlcm0nO1xuaW1wb3J0IHNlbGVjdGVkQ291bnRyeSBmcm9tICcuL3NlbGVjdGVkQ291bnRyeSc7XG5pbXBvcnQgY291bnRyaWVzIGZyb20gJy4vY291bnRyaWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgbW92aWUsXG4gIG1vdmllcyxcbiAgc2VhcmNoVGVybSxcbiAgc2VsZWN0ZWRDb3VudHJ5LFxuICBjb3VudHJpZXNcbn0pOyIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9tb3ZpZVxuICovXG5cbmltcG9ydCBjcmVhdGVSZWR1Y2VyIGZyb20gJy4vY3JlYXRlUmVkdWNlcic7XG5cbmltcG9ydCB7IFNFVF9NT1ZJRSB9IGZyb20gJy4uL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlID0ge31cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEByZXR1cm4ge09iamVjdH0gbmV3IHN0YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoe30sIHtcbiAgW1NFVF9NT1ZJRV0oc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1vdmllOiBhY3Rpb24ubW92aWVcbiAgICB9O1xuICB9XG59KTtcbiIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vycy9tb3ZpZXNcbiAqL1xuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgTU9WSUVTX1NVQ0NFU1MgfSAgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoW10sIHtcbiAgW01PVklFU19TVUNDRVNTXShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHJlc3VsdHNcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSA9IGFjdGlvbjtcbiAgICByZXR1cm4gWy4uLnJlc3VsdHNdO1xuICB9XG59KTsiLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvc2VhcmNoVGVybVxuICovXG5pbXBvcnQgY3JlYXRlUmVkdWNlciBmcm9tICcuL2NyZWF0ZVJlZHVjZXInO1xuXG5pbXBvcnQgeyBTRVRfU0VBUkNIX1RFUk0gfSAgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG5cbi8qKlxuICpcbiAqIEBwYXJhbSBzdGF0ZVxuICogQHBhcmFtIGFjdGlvblxuICogQHJldHVybiB7RnVuY3Rpb259IHJlZHVjZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUmVkdWNlcignJywge1xuICBbU0VUX1NFQVJDSF9URVJNXShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi5zZWFyY2hUZXJtO1xuICB9XG59KTsiLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvc2VsZWN0ZWRDb3VudHJ5XG4gKi9cblxuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgU0VUX1NFTEVDVEVEX0NPVU5UUlkgfSAgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoJ0NvbG9tYmlhJywge1xuICBbU0VUX1NFTEVDVEVEX0NPVU5UUlldKHN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uLnNlbGVjdGVkQ291bnRyeTtcbiAgfVxufSk7XG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3gxQkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7OztBQU5BO0FBQ0E7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFKQTs7O0FBS0E7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBWEE7QUFDQTtBQW1CQTs7Ozs7Ozs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQVJBO0FBQ0E7QUFlQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUxBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFGQTtBQUtBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQURBO0FBS0E7QUFBQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBR0E7QUFBQTtBQUlBO0FBQUE7QUFRQTs7O0FBbkNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUhBOzs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFGQTtBQUdBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUZBO0FBWUE7QUFBQTtBQU1BOzs7QUE1RkE7QUFDQTtBQStGQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUpBO0FBS0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFhQTtBQUVBOzs7Ozs7Ozs7QUFNQTtBQUNBO0FBQ0E7OztBQXZDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQVdBOzs7QUF4QkE7QUFDQTtBQTJCQTs7Ozs7Ozs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTtBQUFBO0FBRUE7QUFDQTtBQUNBOzs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQVdBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFNQTs7O0FBcERBO0FBQ0E7QUF1REE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFBQTtBQUNBO0FBUUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUlBO0FBRUE7QUFBQTtBQU1BOzs7QUFsQkE7QUFDQTtBQXFCQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBOzs7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFEQTtBQVFBOzs7QUE5QkE7QUFDQTtBQWtDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUtBOzs7QUEzQkE7QUFDQTtBQThCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFYQTtBQUFBO0FBQUE7QUFDQTtBQVdBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFqQkE7QUFDQTtBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7OztBQUdBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQUE7QUFFQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBTkE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFOQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQVRBOzs7O0FBVUE7Ozs7O0FBS0E7QUFHQTs7Ozs7OztBQUtBO0FBRUE7Ozs7Ozs7QUFLQTs7QUFFQTtBQUVBOzs7Ozs7O0FBS0E7QUFFQTs7Ozs7Ozs7QUFLQTtBQUVBO0FBRUE7QUFFQTtBQUFBO0FBQUE7QUFFQTtBQUVBO0FBRUE7QUFFQTs7Ozs7OztBQUtBO0FBRUE7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEVBOzs7O0FBSUE7Ozs7Ozs7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFaQTs7O0FBUUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7Ozs7QUFLQTs7Ozs7QUFLQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7Ozs7QUFLQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBOzs7Ozs7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBSkE7QUFBQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQThCQTtBQUVBO0FBRkE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFLQTtBQUNBO0FBSEE7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUFDQTtBQUhBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCQTtBQXBEQTtBQXFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBUEE7Ozs7QUFRQTs7O0FBR0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOzs7Ozs7OztBQVFBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQVBBOzs7O0FBUUE7Ozs7OztBQU1BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7O0FBSUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBVkE7OztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7OztBQVFBOzs7Ozs7QUFNQTtBQUVBO0FBRUE7QUFGQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7QUFPQTs7Ozs7O0FBTUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7QUFRQTs7Ozs7O0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7QUFRQTs7Ozs7O0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=