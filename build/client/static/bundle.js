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
/******/ 	var hotCurrentHash = "c28c74210ca67c6307a0";
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

var _store = _interopRequireDefault(__webpack_require__(/*! ../shared/store */ "./src/shared/store.js"));

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

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ "./src/shared/store.js"));

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

/***/ "./src/shared/appState/ActionTypes.js":
/*!********************************************!*\
  !*** ./src/shared/appState/ActionTypes.js ***!
  \********************************************/
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

/***/ "./src/shared/appState/actions/getCountries.js":
/*!*****************************************************!*\
  !*** ./src/shared/appState/actions/getCountries.js ***!
  \*****************************************************/
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

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js"));

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

/***/ "./src/shared/appState/actions/getMovies.js":
/*!**************************************************!*\
  !*** ./src/shared/appState/actions/getMovies.js ***!
  \**************************************************/
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

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js"));

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

/***/ "./src/shared/appState/actions/index.js":
/*!**********************************************!*\
  !*** ./src/shared/appState/actions/index.js ***!
  \**********************************************/
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

var types = _interopRequireWildcard(__webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js"));

var _makeActionCreator = _interopRequireDefault(__webpack_require__(/*! ./makeActionCreator */ "./src/shared/appState/actions/makeActionCreator.js"));

var _api = _interopRequireDefault(__webpack_require__(/*! api */ "./src/shared/api/api.js"));

var _getCountries = __webpack_require__(/*! ./getCountries */ "./src/shared/appState/actions/getCountries.js");

var _getMovies = __webpack_require__(/*! ./getMovies */ "./src/shared/appState/actions/getMovies.js");

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

/***/ "./src/shared/appState/actions/makeActionCreator.js":
/*!**********************************************************!*\
  !*** ./src/shared/appState/actions/makeActionCreator.js ***!
  \**********************************************************/
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

/***/ "./src/shared/appState/middlewares/apiMiddleware.js":
/*!**********************************************************!*\
  !*** ./src/shared/appState/middlewares/apiMiddleware.js ***!
  \**********************************************************/
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
        }, _callee, this, [[0, 7]]);
      }))();
    };
  };
}

/***/ }),

/***/ "./src/shared/appState/middlewares/index.js":
/*!**************************************************!*\
  !*** ./src/shared/appState/middlewares/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/lib/index.js"));

var _logger = _interopRequireDefault(__webpack_require__(/*! ./logger */ "./src/shared/appState/middlewares/logger.js"));

var _apiMiddleware = _interopRequireDefault(__webpack_require__(/*! ./apiMiddleware */ "./src/shared/appState/middlewares/apiMiddleware.js"));

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

/***/ "./src/shared/appState/middlewares/logger.js":
/*!***************************************************!*\
  !*** ./src/shared/appState/middlewares/logger.js ***!
  \***************************************************/
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

/***/ "./src/shared/appState/reducers/countries.js":
/*!***************************************************!*\
  !*** ./src/shared/appState/reducers/countries.js ***!
  \***************************************************/
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

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/appState/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js");

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

/***/ "./src/shared/appState/reducers/createReducer.js":
/*!*******************************************************!*\
  !*** ./src/shared/appState/reducers/createReducer.js ***!
  \*******************************************************/
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

/***/ "./src/shared/appState/reducers/index.js":
/*!***********************************************!*\
  !*** ./src/shared/appState/reducers/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");

var _movie = _interopRequireDefault(__webpack_require__(/*! ./movie */ "./src/shared/appState/reducers/movie.js"));

var _movies = _interopRequireDefault(__webpack_require__(/*! ./movies */ "./src/shared/appState/reducers/movies.js"));

var _searchTerm = _interopRequireDefault(__webpack_require__(/*! ./searchTerm */ "./src/shared/appState/reducers/searchTerm.js"));

var _selectedCountry = _interopRequireDefault(__webpack_require__(/*! ./selectedCountry */ "./src/shared/appState/reducers/selectedCountry.js"));

var _countries = _interopRequireDefault(__webpack_require__(/*! ./countries */ "./src/shared/appState/reducers/countries.js"));

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

/***/ "./src/shared/appState/reducers/movie.js":
/*!***********************************************!*\
  !*** ./src/shared/appState/reducers/movie.js ***!
  \***********************************************/
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

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/appState/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js");

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

/***/ "./src/shared/appState/reducers/movies.js":
/*!************************************************!*\
  !*** ./src/shared/appState/reducers/movies.js ***!
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

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/appState/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js");

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

/***/ "./src/shared/appState/reducers/searchTerm.js":
/*!****************************************************!*\
  !*** ./src/shared/appState/reducers/searchTerm.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/appState/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js");

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

/***/ "./src/shared/appState/reducers/selectedCountry.js":
/*!*********************************************************!*\
  !*** ./src/shared/appState/reducers/selectedCountry.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _createReducer2 = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ "./src/shared/appState/reducers/createReducer.js"));

var _ActionTypes = __webpack_require__(/*! ../ActionTypes */ "./src/shared/appState/ActionTypes.js");

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

/***/ "./src/shared/assets/scss/styles.scss":
/*!********************************************!*\
  !*** ./src/shared/assets/scss/styles.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1551644897722
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
      // 1551644896359
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
      // 1551644896464
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
      // 1551644896545
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
function (_Component) {
  (0, _inherits2.default)(MovieCard, _Component);

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
        className: "card-title"
      }, title), _react.default.createElement("p", {
        className: "card-text text-clamp"
      }, overview)), _react.default.createElement("ul", {
        className: "list-group list-group-flush"
      }, _react.default.createElement("li", {
        className: "list-group-item"
      }, release_date), _react.default.createElement("li", {
        className: "list-group-item"
      }, movieGenre))), _react.default.createElement(_reactRouterDom.NavLink, {
        to: "details/".concat(id)
      }, "See Details"));
    }
  }]);
  return MovieCard;
}(_react.Component);

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
      // 1551644896559
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

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "searchTermHandler", function (searchTerm) {
      _this.setState({
        searchTerm: searchTerm
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "links", [{
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

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var Searcher =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Searcher, _React$Component);

  function Searcher(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Searcher);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Searcher).call(this, props)); // This binding is necessary to make `this` work in the callback

    _this.search = _this.search.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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

/***/ "./src/shared/localStorage.js":
/*!************************************!*\
  !*** ./src/shared/localStorage.js ***!
  \************************************/
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
      // 1551644896369
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

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _Urls = __webpack_require__(/*! ../../constants/Urls */ "./src/shared/constants/Urls.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/appState/actions/index.js");

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleChange", function (evt) {
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
      // 1551644896366
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

var _actions = __webpack_require__(/*! actions */ "./src/shared/appState/actions/index.js");

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
      // 1551644896372
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

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _actions = __webpack_require__(/*! actions */ "./src/shared/appState/actions/index.js");

var _MovieCard = _interopRequireDefault(__webpack_require__(/*! components/MovieCard/MovieCard */ "./src/shared/components/MovieCard/MovieCard.js"));

__webpack_require__(/*! ./Movies.scss */ "./src/shared/pages/Movies/Movies.scss");

var Movies =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Movies, _Component);

  function Movies() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Movies);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Movies)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "searchTermHandler", function (searchTerm) {
      var setSearchTerm = _this.props.setSearchTerm;
      setSearchTerm(searchTerm);
    });
    return _this;
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
      }, movies.filter(function (movie) {
        return "".concat(movie.movieTitle, " ").concat(movie.description).toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0;
      }).map(function (movie) {
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
      // 1551644896438
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

/***/ "./src/shared/store.js":
/*!*****************************!*\
  !*** ./src/shared/store.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");

var _throttle = _interopRequireDefault(__webpack_require__(/*! lodash/throttle */ "./node_modules/lodash/throttle.js"));

var _localStorage = __webpack_require__(/*! ./localStorage */ "./src/shared/localStorage.js");

var _middlewares = _interopRequireDefault(__webpack_require__(/*! ./appState/middlewares */ "./src/shared/appState/middlewares/index.js"));

var _reducers = _interopRequireDefault(__webpack_require__(/*! ./appState/reducers */ "./src/shared/appState/reducers/index.js"));

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
    module.hot.accept(/*! ./appState/reducers */ "./src/shared/appState/reducers/index.js", function () {
      return store.replaceReducer(__webpack_require__(/*! ./appState/reducers */ "./src/shared/appState/reducers/index.js").default);
    });
  }
}

var _default = store;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy8uL3NyYy9jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcGkvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvYXBwU3RhdGUvQWN0aW9uVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9hY3Rpb25zL2dldENvdW50cmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2FwcFN0YXRlL2FjdGlvbnMvZ2V0TW92aWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvYXBwU3RhdGUvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2FwcFN0YXRlL2FjdGlvbnMvbWFrZUFjdGlvbkNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9taWRkbGV3YXJlcy9hcGlNaWRkbGV3YXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvYXBwU3RhdGUvbWlkZGxld2FyZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9taWRkbGV3YXJlcy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9yZWR1Y2Vycy9jb3VudHJpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9yZWR1Y2Vycy9jcmVhdGVSZWR1Y2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvYXBwU3RhdGUvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9yZWR1Y2Vycy9tb3ZpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2FwcFN0YXRlL3JlZHVjZXJzL21vdmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2FwcFN0YXRlL3JlZHVjZXJzL3NlYXJjaFRlcm0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hcHBTdGF0ZS9yZWR1Y2Vycy9zZWxlY3RlZENvdW50cnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9hc3NldHMvc2Nzcy9zdHlsZXMuc2Nzcz82ZTI1Iiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyLnNjc3M/NDc0NiIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5zY3NzPzQ2MWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9jb21wb25lbnRzL01vdmllL01vdmllLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Nb3ZpZS9Nb3ZpZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Nb3ZpZUNhcmQvTW92aWVDYXJkLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9Nb3ZpZUNhcmQvTW92aWVDYXJkLnNjc3M/YWE0MiIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvTmF2L05hdi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbXBvbmVudHMvTmF2L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvY29tcG9uZW50cy9TZWFyY2hlci9TZWFyY2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL2NvbnN0YW50cy9VcmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvQWJvdXQvQWJvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9BYm91dC9BYm91dC5zY3NzPzEwNTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9MYW5kaW5nL0xhbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9wYWdlcy9MYW5kaW5nL0xhbmRpbmcuc2Nzcz81NGZlIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTW92aWVEZXRhaWxzL01vdmllRGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3BhZ2VzL01vdmllRGV0YWlscy9Nb3ZpZURldGFpbHMuc2Nzcz8xNzNmIiwid2VicGFjazovLy8uL3NyYy9zaGFyZWQvcGFnZXMvTW92aWVzL01vdmllcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3BhZ2VzL01vdmllcy9Nb3ZpZXMuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3BhZ2VzL1Byb2ZpbGUvUHJvZmlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3JvdXRpbmcvUm91dGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmVkL3JvdXRpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlZC9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2J1ZmZlciAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcInVwZGF0ZXMvXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJ1cGRhdGVzL1wiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImMyOGM3NDIxMGNhNjdjNjMwN2EwXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImJ1bmRsZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODUwMS9zdGF0aWMvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFswLFwidmVuZG9yXCJdKTtcbiBcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gcmVhZHlcbiBcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjcmVhdGVIaXN0b3J5IGZyb20gJ2hpc3RvcnkvY3JlYXRlQnJvd3Nlckhpc3RvcnknO1xuaW1wb3J0IHsgaHlkcmF0ZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLFxufSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuaW1wb3J0IEFwcCBmcm9tICcuLi9zaGFyZWQvQXBwJztcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xuXG5jb25zdCBicm93c2VySGlzdG9yeSA9IHdpbmRvdy5icm93c2VySGlzdG9yeSB8fCBjcmVhdGVIaXN0b3J5KCk7XG5cbmh5ZHJhdGUoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxSb3V0ZXI+XG4gICAgICA8QXBwIC8+XG4gICAgPC9Sb3V0ZXI+XG4gIDwvUHJvdmlkZXI+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbik7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBpZiAobW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gIH1cblxuICBpZiAoIXdpbmRvdy5icm93c2VySGlzdG9yeSkge1xuICAgIHdpbmRvdy5icm93c2VySGlzdG9yeSA9IGJyb3dzZXJIaXN0b3J5O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBSb3V0aW5nIH0gZnJvbSAncm91dGluZyc7XG5cbmltcG9ydCAnLi9hc3NldHMvc2Nzcy9zdHlsZXMuc2Nzcyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Um91dGluZyBzdG9yZT17c3RvcmV9IC8+XG4gICAgKTtcbiAgfVxuIFxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCIvKipcbiAqIEBtb2R1bGUgYXBpL2FwaVxuICovXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBheGlvczsiLCIvKipcbiAqIEBtb2R1bGUgY29uc3RhbnRzL0FjdGlvblR5cGVzXG4gKi9cbmV4cG9ydCBjb25zdCBTRVRfU0VBUkNIX1RFUk0gPSAnU0VUX1NFQVJDSF9URVJNJztcbmV4cG9ydCBjb25zdCBTRVRfU0VMRUNURURfQ09VTlRSWSA9ICdTRVRfU0VMRUNURURfQ09VTlRSWSc7XG5leHBvcnQgY29uc3QgU0VUX01PVklFID0gJ1NFVF9NT1ZJRSc7XG5leHBvcnQgY29uc3QgU0VUX01PVklFUyA9ICdTRVRfTU9WSUVTJztcblxuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfUkVRVUVTVCA9ICdHRVRfQ09VTlRSSUVTX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfU1VDQ0VTUyA9ICdHRVRfQ09VTlRSSUVTX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEdFVF9DT1VOVFJJRVNfRkFJTFVSRSA9ICdHRVRfQ09VTlRSSUVTX0ZBSUxVUkUnO1xuXG5leHBvcnQgY29uc3QgTU9WSUVTX1JFUVVFU1QgPSAnTU9WSUVTX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IE1PVklFU19TVUNDRVNTID0gJ01PVklFU19TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBNT1ZJRVNfRkFJTFVSRSA9ICdNT1ZJRVNfRkFJTFVSRSc7IiwiaW1wb3J0IGFwaSBmcm9tICdhcGknO1xuXG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9BY3Rpb25UeXBlcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSA9ICcnXG4gKiBAcmV0dXJuIHt7fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvdW50cmllcyhxdWVyeSA9ICcnKSB7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlczogW1xuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19SRVFVRVNULFxuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19TVUNDRVNTLFxuICAgICAgdHlwZXMuR0VUX0NPVU5UUklFU19GQUlMVVJFXG4gICAgXSxcbiAgICBjYWxsQVBJOiAoKSA9PiBhcGkuZ2V0KHF1ZXJ5KSxcbiAgfTtcblxufSIsImltcG9ydCBhcGkgZnJvbSAnYXBpJztcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSAnLi4vQWN0aW9uVHlwZXMnO1xuXG5jb25zdCBBUElfS0VZID0gJ2NiOGMyNTVjZDVjOWJlMzFkMGQ2MDczNGYwYmJlZjU4JztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5ID0gJydcbiAqIEByZXR1cm4ge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW92aWVzKHF1ZXJ5ID0gJycpIHtcbiAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvJHtxdWVyeX0/YXBpX2tleT0ke0FQSV9LRVl9Jmxhbmd1YWdlPWVuLVVTJnBhZ2U9MWA7XG4gIGNvbnNvbGUubG9nKCd1cmwnLCB1cmwpO1xuICByZXR1cm4ge1xuICAgIHR5cGVzOiBbXG4gICAgICB0eXBlcy5NT1ZJRVNfUkVRVUVTVCxcbiAgICAgIHR5cGVzLk1PVklFU19TVUNDRVNTLFxuICAgICAgdHlwZXMuTU9WSUVTX0ZBSUxVUkVcbiAgICBdLFxuICAgIGNhbGxBUEk6ICgpID0+IGFwaS5nZXQodXJsKSxcbiAgfTtcblxufSIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vyc1xuICovXG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL0FjdGlvblR5cGVzJztcbmltcG9ydCBtYWtlQWN0aW9uQ3JlYXRvciBmcm9tICcuL21ha2VBY3Rpb25DcmVhdG9yJztcbmltcG9ydCBhcGkgZnJvbSAnYXBpJztcblxuaW1wb3J0IHsgZ2V0Q291bnRyaWVzIGFzIGdldENvdW50cmllc0FjdGlvbiB9IGZyb20gJy4vZ2V0Q291bnRyaWVzJztcbmltcG9ydCB7IGdldE1vdmllcyBhcyBnZXRNb3ZpZXNBY3Rpb24gfSBmcm9tICcuL2dldE1vdmllcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hUZXJtXG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59IGFjdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0U2VhcmNoVGVybSA9IG1ha2VBY3Rpb25DcmVhdG9yKHR5cGVzLlNFVF9TRUFSQ0hfVEVSTSwgJ3NlYXJjaFRlcm0nKTtcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0ZWRDb3VudHJ5XG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59IGFjdGlvblxuICovXG5leHBvcnQgY29uc3Qgc2V0U2VsZWN0ZWRDb3VudHJ5ID0gbWFrZUFjdGlvbkNyZWF0b3IodHlwZXMuU0VUX1NFTEVDVEVEX0NPVU5UUlksICdzZWxlY3RlZENvdW50cnknKTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtBcnJheS48T2JqZWN0Pn0gbW92aWVzXG4gKiBAcmV0dXJuIHtPYmplY3QuPEFjdGlvbj59XG4gKi9cbmV4cG9ydCBjb25zdCBzZXRNb3ZpZXMgPSBtYWtlQWN0aW9uQ3JlYXRvcih0eXBlcy5TRVRfTU9WSUVTLCAnbW92aWVzJyk7XG5cbmV4cG9ydCBjb25zdCBnZXRNb3ZpZXMgPSBnZXRNb3ZpZXNBY3Rpb247XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBtb3ZpZVxuICogQHJldHVybiB7T2JqZWN0LjxBY3Rpb24+fVxuICovXG5leHBvcnQgY29uc3Qgc2V0TW92aWUgPSBtYWtlQWN0aW9uQ3JlYXRvcih0eXBlcy5TRVRfTU9WSUUsICdtb3ZpZScpO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW92aWUoaWQpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBnZXRTdGF0ZSkge1xuXG4gICAgY29uc3QgbW92aWVzID0gZ2V0U3RhdGUoKS5tb3ZpZXM7XG5cbiAgICBjb25zdCBtb3ZpZSA9IG1vdmllcy5maWx0ZXIobSA9PiBtLmlkID09PSAraWQpWzBdO1xuXG4gICAgZGlzcGF0Y2goc2V0TW92aWUobW92aWUpKTtcblxuICB9O1xuXG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPE9iamVjdD59IGNvdW50cmllc1xuICogQHJldHVybiB7T2JqZWN0LjxBY3Rpb24+fVxuICovXG5leHBvcnQgY29uc3Qgc2V0Q291bnRyaWVzID0gbWFrZUFjdGlvbkNyZWF0b3IodHlwZXMuU0VUX0NPVU5UUklFUywgJ2NvdW50cmllcycpO1xuXG4vKipcbiAqIEB0eXBlIHtGdW5jdGlvbn0gZ2V0Q291bnRyaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb3VudHJpZXMgPSBnZXRDb3VudHJpZXNBY3Rpb247IiwiLyoqXG4gKiBAbW9kdWxlIGFjdGlvbnMvbWFrZUFjdGlvbkNyZWF0b3JcbiAqL1xuXG4vKipcbiAqIE1ha2VzIGFuIGFjdGlvbiBjcmVhdG9yIGZ1bmN0aW9uIHRvIHJlZHVjZSBib2lsZXJwbGF0ZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0gYXJnTmFtZXNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSB0aGUgYWN0aW9uIGNyZWF0b3IgaXRzZWxmXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VBY3Rpb25DcmVhdG9yKHR5cGUsIC4uLmFyZ05hbWVzKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgbGV0IGFjdGlvbiA9IHsgdHlwZSB9O1xuICAgIGFyZ05hbWVzLmZvckVhY2goKGFyZywgaW5kZXgpID0+IHtcbiAgICAgIGFjdGlvblthcmdOYW1lc1tpbmRleF1dID0gYXJnc1tpbmRleF07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuXG4gIH07XG5cbn0iLCIvKipcbiAqIEBkZXNjIGhhbmRsZXMgYWxsIEFQSSdzIGFzeW5jIGFjdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRpc3BhdGNoXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXRTdGF0ZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwaU1pZGRsZXdhcmUoeyBkaXNwYXRjaCwgZ2V0U3RhdGUgfSkge1xuICByZXR1cm4gbmV4dCA9PiBhY3Rpb24gPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHR5cGVzLFxuICAgICAgY2FsbEFQSSxcbiAgICAgIHNob3VsZENhbGxBUEkgPSAoKSA9PiB0cnVlLFxuICAgICAgcGF5bG9hZCA9IHt9XG4gICAgfSA9IGFjdGlvbjtcblxuICAgIGlmICghdHlwZXMpIHtcbiAgICAgIC8vIE5vcm1hbCBhY3Rpb246IHBhc3MgaXQgb25cbiAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIUFycmF5LmlzQXJyYXkodHlwZXMpIHx8XG4gICAgICB0eXBlcy5sZW5ndGggIT09IDMgfHxcbiAgICAgICF0eXBlcy5ldmVyeSh0eXBlID0+IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYW4gYXJyYXkgb2YgdGhyZWUgc3RyaW5nIHR5cGVzLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2FsbEFQSSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBjYWxsQVBJIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKCFzaG91bGRDYWxsQVBJKGdldFN0YXRlKCkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgW3JlcXVlc3RUeXBlLCBzdWNjZXNzVHlwZSwgZmFpbHVyZVR5cGVdID0gdHlwZXM7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICAuLi5wYXlsb2FkLFxuICAgICAgdHlwZTogcmVxdWVzdFR5cGVcbiAgICB9KTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBUEkoKTtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKHtcbiAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgIHR5cGU6IHN1Y2Nlc3NUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKHtcbiAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIHR5cGU6IGZhaWx1cmVUeXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH07XG59IiwiLyoqXG4gKiBAbW9kdWxlIG1pZGRsZXdhcmVcbiAqL1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcblxuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgYXBpTWlkZGxld2FyZSBmcm9tICcuL2FwaU1pZGRsZXdhcmUnO1xuXG4vKipcbiAqIEB0eXBlIHttaWRkbGV3YXJlW119XG4gKi9cbmxldCBtaWRkbGV3YXJlcyA9IFtcbiAgdGh1bmssXG4gIGFwaU1pZGRsZXdhcmVcbl07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1pZGRsZXdhcmVzID0gWy4uLm1pZGRsZXdhcmVzLCBsb2dnZXJdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtaWRkbGV3YXJlcztcbiIsIi8qKlxuICogVGFrZW4gZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2dhZWFyb24vdG9kb3MvYmxvYi8xNy10aGUtbWlkZGxld2FyZS1jaGFpbi9zcmMvY29uZmlndXJlU3RvcmUuanNcbiAqXG4gKiBMb2dzIGRlYnVnZ2luZyBpbmZvcm1hdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdG9yZSAtIFJlZHV4J3Mgc3RvcmVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2dnZXIoc3RvcmUpIHtcbiAgLyoqXG4gICAqIFJhdGhlciB0aGFuIHRha2UgdGhlIG5leHQgbWlkZGxld2FyZSBmcm9tIHRoZSBzdG9yZSwgd2UnbGxcbiAgICogbWFrZSBpdCBpbmplY3RhYmxlIGFzIGFuIGFyZ3VtZW50LCBzbyB0aGUgZnVuY3Rpb24gdGhhdCBjYWxsc1xuICAgKiB0aGUgbWlkZGxld2FyZXMgY2FuIGNob3NlIHdoaWNoIG1pZGRsZSB3YXJlIHRvIHBhc3NcbiAgICovXG4gIHJldHVybiAobmV4dCkgPT4ge1xuICAgIGlmICghY29uc29sZS5ncm91cCkge1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuXG4gICAgLy8gVGhlIGFjdHVhbCBkaXNwYXRjaCBmdW5jdGlvblxuICAgIHJldHVybiAoYWN0aW9uKSA9PiB7XG4gICAgICBjb25zb2xlLmdyb3VwKGFjdGlvbi50eXBlKTtcbiAgICAgIGNvbnNvbGUubG9nKCclYyBwcmV2IHN0YXRlJywgJ2NvbG9yOiBncmF5Jywgc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zb2xlLmxvZygnJWMgYWN0aW9uJywgJ2NvbG9yOiBibHVlJywgYWN0aW9uKTtcbiAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gbmV4dChhY3Rpb24pO1xuICAgICAgY29uc29sZS5sb2coJyVjIG5leHQgc3RhdGUnLCAnY29sb3I6IGdyZWVuJywgc3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKGFjdGlvbi50eXBlKTtcbiAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9O1xuXG4gIH07XG5cbn0iLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvbW92aWVzXG4gKi9cblxuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgR0VUX0NPVU5UUklFU19TVUNDRVNTIH0gIGZyb20gJy4uL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKFtdLCB7XG4gIFtHRVRfQ09VTlRSSUVTX1NVQ0NFU1NdKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCB7XG4gICAgICByZXNwb25zZToge1xuICAgICAgICBkYXRhXG4gICAgICB9XG4gICAgfSA9IGFjdGlvbjtcbiAgICByZXR1cm4gWy4uLmRhdGFdO1xuICB9XG59KTsiLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvY3JlYXRlUmVkdWNlclxuICovXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7YW55fSBpbml0aWFsU3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyc1xuICogQHJldHVybiB7RnVuY3Rpb259IHJlZHVjZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUmVkdWNlcihpbml0aWFsU3RhdGUsIGhhbmRsZXJzKSB7XG4gIHJldHVybiBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pIHtcbiAgICBpZiAoaGFuZGxlcnMuaGFzT3duUHJvcGVydHkoYWN0aW9uLnR5cGUpKSB7XG4gICAgICByZXR1cm4gaGFuZGxlcnNbYWN0aW9uLnR5cGVdKHN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9O1xufSIsIi8qKlxuICogQG1vZHVsZSByZWR1Y2Vyc1xuICovXG5cbmltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBtb3ZpZSBmcm9tICcuL21vdmllJztcbmltcG9ydCBtb3ZpZXMgZnJvbSAnLi9tb3ZpZXMnO1xuaW1wb3J0IHNlYXJjaFRlcm0gZnJvbSAnLi9zZWFyY2hUZXJtJztcbmltcG9ydCBzZWxlY3RlZENvdW50cnkgZnJvbSAnLi9zZWxlY3RlZENvdW50cnknO1xuaW1wb3J0IGNvdW50cmllcyBmcm9tICcuL2NvdW50cmllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIG1vdmllLFxuICBtb3ZpZXMsXG4gIHNlYXJjaFRlcm0sXG4gIHNlbGVjdGVkQ291bnRyeSxcbiAgY291bnRyaWVzXG59KTsiLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvbW92aWVcbiAqL1xuXG5pbXBvcnQgY3JlYXRlUmVkdWNlciBmcm9tICcuL2NyZWF0ZVJlZHVjZXInO1xuXG5pbXBvcnQgeyBTRVRfTU9WSUUgfSBmcm9tICcuLi9BY3Rpb25UeXBlcyc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSA9IHt9XG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5ldyBzdGF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKHt9LCB7XG4gIFtTRVRfTU9WSUVdKHN0YXRlLCBhY3Rpb24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBtb3ZpZTogYWN0aW9uLm1vdmllXG4gICAgfTtcbiAgfVxufSk7XG4iLCIvKipcbiAqIEBtb2R1bGUgcmVkdWNlcnMvbW92aWVzXG4gKi9cbmltcG9ydCBjcmVhdGVSZWR1Y2VyIGZyb20gJy4vY3JlYXRlUmVkdWNlcic7XG5cbmltcG9ydCB7IE1PVklFU19TVUNDRVNTIH0gIGZyb20gJy4uL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKFtdLCB7XG4gIFtNT1ZJRVNfU1VDQ0VTU10oc3RhdGUsIGFjdGlvbikge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZXN1bHRzXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0gPSBhY3Rpb247XG4gICAgcmV0dXJuIFsuLi5yZXN1bHRzXTtcbiAgfVxufSk7IiwiLyoqXG4gKiBAbW9kdWxlIHJlZHVjZXJzL3NlYXJjaFRlcm1cbiAqL1xuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGVSZWR1Y2VyJztcblxuaW1wb3J0IHsgU0VUX1NFQVJDSF9URVJNIH0gIGZyb20gJy4uL0FjdGlvblR5cGVzJztcblxuXG4vKipcbiAqXG4gKiBAcGFyYW0gc3RhdGVcbiAqIEBwYXJhbSBhY3Rpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSByZWR1Y2VyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHVjZXIoJycsIHtcbiAgW1NFVF9TRUFSQ0hfVEVSTV0oc3RhdGUsIGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb24uc2VhcmNoVGVybTtcbiAgfVxufSk7IiwiLyoqXG4gKiBAbW9kdWxlIHJlZHVjZXJzL3NlbGVjdGVkQ291bnRyeVxuICovXG5cbmltcG9ydCBjcmVhdGVSZWR1Y2VyIGZyb20gJy4vY3JlYXRlUmVkdWNlcic7XG5cbmltcG9ydCB7IFNFVF9TRUxFQ1RFRF9DT1VOVFJZIH0gIGZyb20gJy4uL0FjdGlvblR5cGVzJztcblxuLyoqXG4gKlxuICogQHBhcmFtIHN0YXRlXG4gKiBAcGFyYW0gYWN0aW9uXG4gKiBAcmV0dXJuIHsqfVxuICovXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVSZWR1Y2VyKCdDb2xvbWJpYScsIHtcbiAgW1NFVF9TRUxFQ1RFRF9DT1VOVFJZXShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgcmV0dXJuIGFjdGlvbi5zZWxlY3RlZENvdW50cnk7XG4gIH1cbn0pO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTY0NDg5NzcyMlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgJy4vRm9vdGVyLnNjc3MnO1xuXG5jb25zdCBGb290ZXIgPSAoKSA9PiAoXG4gIDxmb290ZXIgY2xhc3NOYW1lPVwiZm9vdGVyIHNtLXBhZGRpbmcgYmctZGFya1wiPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyX19sb2dvXCI+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImltZy1mbHVpZFwiXG4gICAgICAgICAgICAgIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWcvcmVhY3QtbG9nby5wbmdcIlxuICAgICAgICAgICAgICBhbHQ9XCJyZWFjdCBsb2dvXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvb3Rlcl9fY29weXJpZ2h0XCI+XG4gICAgICAgICAgICA8cD5Db3B5cmlnaHQgwqkge25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0uIEFsbCBSaWdodHMgUmVzZXJ2ZWQ8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZm9vdGVyPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTY0NDg5NjM1OVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgJy4vSGVhZGVyLnNjc3MnO1xuXG5jb25zdCBIZWFkZXIgPSAoeyBoZWFkaW5nLCBzdWJIZWFkaW5nLCBpbWdVcmwgPSAnJyB9KSA9PiAoXG4gIDxoZWFkZXIgY2xhc3NOYW1lPVwiSGVhZGVyX19tYXN0aGVhZFwiIHN0eWxlPXt7J2JhY2tncm91bmQnOiBpbWdVcmx9fT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYWRlcl9fb3ZlcmxheVwiIC8+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTggY29sLW1kLTEwIG14LWF1dG9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkhlYWRlcl9fcGFnZS1oZWFkaW5nXCI+XG4gICAgICAgICAgICA8aDE+eyBoZWFkaW5nIH08L2gxPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiSGVhZGVyX19zdWJoZWFkaW5nXCI+e3N1YkhlYWRpbmd9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2hlYWRlcj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNjQ0ODk2NDY0XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0ICcuL01vdmllLnNjc3MnO1xuXG5jb25zdCBNb3ZpZSA9ICh7IG1vdmllVGl0bGUsIGRlc2NyaXB0aW9uIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9eyB7d2lkdGg6ICcyMHJlbSd9IH0+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgIDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+eyBtb3ZpZVRpdGxlIH08L2g0PlxuICAgICAgPHAgY2xhc3NOYW1lPVwiY2FyZC10ZXh0XCI+eyBkZXNjcmlwdGlvbiB9PC9wPlxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIj5XYXRjaCBUcmFpbGVyPC9hPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbk1vdmllLnByb3BUeXBlcyA9IHtcbiAgbW92aWVUaXRsZTogc3RyaW5nLFxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTW92aWU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU1MTY0NDg5NjU0NVxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2TGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5pbXBvcnQgJy4vTW92aWVDYXJkLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpZUNhcmQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGxldCB7IHRpdGxlLCBtb3ZpZUdlbnJlLCByZWxlYXNlX2RhdGUsIG92ZXJ2aWV3LCBpZCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8YXJ0aWNsZSBjbGFzc05hbWU9XCJtb3ZpZUNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+e3RpdGxlfTwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjYXJkLXRleHQgdGV4dC1jbGFtcFwiPlxuICAgICAgICAgICAgICB7b3ZlcnZpZXd9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPntyZWxlYXNlX2RhdGV9PC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj57bW92aWVHZW5yZX08L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxOYXZMaW5rIHRvPXtgZGV0YWlscy8ke2lkfWB9PlxuICAgICAgICAgIFNlZSBEZXRhaWxzXG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgIDwvYXJ0aWNsZT5cblxuICAgICk7XG5cbiAgfVxuICBcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNjQ0ODk2NTU5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBmdW5jLCBzdHJpbmcsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB2NCB9IGZyb20gJ25vZGUtdXVpZCc7XG5cbmltcG9ydCBTZWFyY2hlciBmcm9tICdjb21wb25lbnRzL1NlYXJjaGVyL1NlYXJjaGVyJztcblxuY2xhc3MgTmF2IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe3NlYXJjaFRlcm19KTtcbiAgfTtcblxuICAvKipcbiAgICpcbiAgICogQHR5cGUge09iamVjdFtdfVxuICAgKi9cbiAgbGlua3MgPSBbXG4gICAge1xuICAgICAgaWQ6IHY0KCksXG4gICAgICBwYXRoOiAnYWJvdXQnLFxuICAgICAgbmFtZTogJ0Fib3V0J1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IHY0KCksXG4gICAgICBwYXRoOiAnbW92aWVzJyxcbiAgICAgIG5hbWU6ICdNb3ZpZXMnXG4gICAgfVxuICBdO1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHtcbiAgICAgIHNlYXJjaFRlcm0sXG4gICAgICBzaG93U2VhcmNoLFxuICAgICAgc2hvd1Byb2ZpbGUsXG4gICAgICBvblNlYXJjaFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgbGV0IHNwYWNlO1xuXG4gICAgaWYgKHNob3dTZWFyY2gpIHtcbiAgICAgIHNwYWNlID0gPFNlYXJjaGVyIHNlYXJjaFRlcm09e3NlYXJjaFRlcm19IG9uU2VhcmNoPXtvblNlYXJjaH0gLz47XG4gICAgfSBlbHNlIGlmIChzaG93UHJvZmlsZSkge1xuICAgICAgc3BhY2UgPSAoXG4gICAgICAgIDxOYXZMaW5rXG4gICAgICAgICAgdG89Jy9wcm9maWxlJ1xuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tb3V0bGluZS1zZWNvbmRhcnlcIj5cbiAgICAgICAgICBQcm9maWxlXG4gICAgICAgIDwvTmF2TGluaz5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNwYWNlID0gKFxuICAgICAgICA8TmF2TGlua1xuICAgICAgICAgIHRvPScvbW92aWVzJ1xuICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWRhcmsgbmF2YmFyLWV4cGFuZC1sZyBiZy1kYXJrXCI+XG4gICAgICAgIDxOYXZMaW5rXG4gICAgICAgICAgdG89XCIvXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIj5cbiAgICAgICAgICBSZWFjdCBNb3ZpZXNcbiAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXIgbmF2YmFyLXRvZ2dsZXItcmlnaHRcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdG9nZ2xlci1pY29uXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbmF2YmFyLWNvbGxhcHNlXCI+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdmJhci1uYXYgbXItYXV0b1wiPlxuICAgICAgICAgICAge3RoaXMubGlua3MubWFwKCh7IHBhdGgsIG5hbWUsIGlkfSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtpZH0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8TmF2TGlua1xuICAgICAgICAgICAgICAgICAgdG89e2AvJHtwYXRofWB9XG4gICAgICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdi1saW5rXCI+XG4gICAgICAgICAgICAgICAgICB7bmFtZX1cbiAgICAgICAgICAgICAgICA8L05hdkxpbms+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L3VsPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1pbmxpbmVcIj5cbiAgICAgICAgICAgIHtzcGFjZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICApO1xuICB9XG5cbn1cblxuTmF2LnByb3BUeXBlcyA9IHtcbiAgc2hvd1NlYXJjaDogYm9vbCxcbiAgc2VhcmNoVGVybTogc3RyaW5nLFxuICBvblNlYXJjaDogZnVuY1xufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWxlY3RlZENvdW50cnk6IHN0YXRlLnNlbGVjdGVkQ291bnRyeVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShOYXYpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBOYXYgfSBmcm9tICcuL05hdic7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAvLyBUaGlzIGJpbmRpbmcgaXMgbmVjZXNzYXJ5IHRvIG1ha2UgYHRoaXNgIHdvcmsgaW4gdGhlIGNhbGxiYWNrXG4gICAgdGhpcy5zZWFyY2ggPSB0aGlzLnNlYXJjaC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncm93IGp1c3RpZnktY29udGVudC1jZW50ZXInPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nY29sLXhzLTEyIGNvbC1zbS0xMiBjb2wtbWQtMTInPlxuICAgICAgICAgIDxmb3JtIG5hbWU9J3NlYXJjaGVyJyBvblN1Ym1pdD17dGhpcy5zZWFyY2h9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Zvcm0tZ3JvdXAnPlxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj0nc2VhcmNoZXInIGNsYXNzTmFtZT0nc3Itb25seSc+SnVzdCB0eXBlPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcbiAgICAgICAgICAgICAgICBpZD0nc2VhcmNoZXInXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdmb3JtLWNvbnRyb2wnXG4gICAgICAgICAgICAgICAgbmFtZT0nc2VhcmNoZXInXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9J1R5cGUuLi4nXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5zZWFyY2h9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXNzIGRhdGEgdG8gcGFyZW50IGNvbXBvbmVudFxuICAgKlxuICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldnQgLSB0aGUgZXZlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBpbnB1dFxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoKGV2dCkge1xuICAgIHRoaXMucHJvcHMub25TZWFyY2goZXZ0LnRhcmdldC52YWx1ZSk7XG4gIH1cbiAgXG59IiwiZXhwb3J0IGNvbnN0IENPVU5UUklFUyA9ICdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mic7IiwiLyoqXG4gKiBAbW9kdWxlIGxvY2FsU3RvcmFnZVxuICogcGVyc2lzdCB0aGUgc3RhdGUgb2YgdGhlIGFwcGxpY2F0aW9uIGluIHRoZSBsb2NhbFN0b3JhZ2UgdXNpbmcgYnJvd3NlciBsb2NhbFN0b3JhZ2UgQVBJLlxuICovXG5cbi8qKlxuICogQGRlc2MgTG9vayBpbnRvIGxvY2FsU3RvcmFnZSBieSBrZXksIHJldHJpZXZlIGEgc3RyaW5nLCBhbmQgdHJ5IHRvIHBhcnNlIGl0IGFzIEpTT04uXG4gKlxuICogQHJldHVybiB7SlNPTn1cbiAqL1xuZXhwb3J0IGNvbnN0IGxvYWRTdGF0ZSA9ICgpID0+IHtcbiAgLyoqXG4gICAqIEl0J3MgaW1wb3J0YW50IHRoYXQgd2Ugd3JhcCB0aGlzIGNvZGUgaW50byB0cnkvY2F0Y2ggYmVjYXVzZSBjYWxscyB0byBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSBjYW4gZmFpbFxuICAgKiBpZiB0aGUgdXNlciBwcml2YWN5IG1vZGUgZG9lcyBub3QgYWxsb3cgdGhlIHVzZSBvZiBsb2NhbFN0b3JhZ2UuXG4gICAqL1xuICB0cnkge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRTdGF0ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzdGF0ZScpO1xuICAgIC8vIElmIHNlcmlhbGl6ZWRTdGF0ZSBpcyBudWxsIGl0IG1lYW5zIHRoYXQgdGhlIGtleSBkb2Vzbid0IGV4aXN0IHNvIEknbGwgcmV0dXJuIHVuZGVmaW5lZCB0byBsZXQgdGhlIHJlZHVjZXJzIGluaXRpYWxpemUgdGhlIHN0YXRlIGluc3RlYWQuXG4gICAgaWYgKHNlcmlhbGl6ZWRTdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgLy8gSWYgdGhlIHNlcmlhbGl6ZWRTdGF0ZSBzdHJpbmcgZXhpc3RzIEknbSBnb2luZyB0byB1c2UgSlNPTi5wYXJzZSBpbiBvcmRlciB0byB0dXJuIGl0IGludG8gdGhlIHN0YXRlIG9iamVjdC5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShzZXJpYWxpemVkU3RhdGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBJbiBjYXNlIG9mIGFueSBlcnJvcnMgcmV0dXJuIHVuZGVmaW5lZCB0byBsZXQgcmVkdWNlcnMgaW5pdGlhbGl6ZSB0aGUgYXBwbGljYXRpb24uXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG59O1xuXG4vKipcbiAqIFNldHMgYW4gaXRlbSBvbiBsb2NhbFN0b3JhZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGNvbnN0IHNhdmVTdGF0ZSA9IChzdGF0ZSkgPT4ge1xuICAvKipcbiAgICogU2VyaWFsaXplcyBpdCB0byBzdHJpbmcgYnkgdXNpbmcgSlNPTi5zdHJpbmdpZnkuIFRoaXMgd2lsbCBvbmx5IHdvcmsgaWYgdGhlIHN0YXRlIGlzIHNlcmlhbGl6YWJsZSxcbiAgICogYnV0IHRoaXMgaXMgdGhlIGdlbmVyYWwgcmVjb21tZW5kYXRpb24gaW4gUmVkdXguIFRoZSBzdGF0ZSBTSE9VTEQgYmUgc2VyaWFsaXphYmxlLlxuICAgKi9cbiAgdHJ5IHtcbiAgICBjb25zdCBzZXJpYWxpemVkU3RhdGUgPSBKU09OLnN0cmluZ2lmeShzdGF0ZSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3N0YXRlJywgc2VyaWFsaXplZFN0YXRlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignbG9jYWxTdG9yYWdlIHNoaXQ6ICcsIGVycik7XG4gIH1cblxufTsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyJztcblxuaW1wb3J0ICcuL0Fib3V0LnNjc3MnO1xuXG5jbGFzcyBBYm91dCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJybUFib3V0XCI+XG4gICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm1BYm91dF9fd3JhcHBlclwiPlxuICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgIGhlYWRpbmc9XCJBYm91dFwiXG4gICAgICAgICAgICBzdWJIZWFkaW5nPVwiUmVhY3QgTW92aWVzXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIHBiLTVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTggY29sLW1kLTEwIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgIFRoaXMgaXMganVzdCBhbiBhcHAgdG8gc2F2ZSBhbmQgc2hhcmUgeW91ciBmYXZvcml0ZSBtb3ZpZXMsIGJlY2F1c2Ugc29tZXRpbWVzIHdlIG5lZWQgYSByZWNvbW1lbmRhdGlvblxuICAgICAgICAgICAgICAgICAgd2hlbiB3ZSBkb2Vzbid0IGhhdmUgYW55dGhpbmcgdG8gc2VlLCBzbyB0aGlzIGlzIHRoZSBwZXJmZWN0IHBsYWNlLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcbiAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWJvdXQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNjQ0ODk2MzY5XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBDT1VOVFJJRVMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvVXJscyc7XG5pbXBvcnQgeyBnZXRDb3VudHJpZXMgYXMgZ2V0Q291bnRyaWVzQWN0aW9uLCBzZXRTZWxlY3RlZENvdW50cnkgfSBmcm9tICdhY3Rpb25zJztcblxuaW1wb3J0ICcuL0xhbmRpbmcuc2Nzcyc7XG5cbmNsYXNzIExhbmRpbmcgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldnRcbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG4gIGhhbmRsZUNoYW5nZSA9IChldnQpID0+IHtcbiAgICBjb25zdCB7IHNldFNlbGVjdGVkQ291bnRyeSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZENvdW50cnkgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgIHNldFNlbGVjdGVkQ291bnRyeShzZWxlY3RlZENvdW50cnkpO1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgY291bnRyaWVzLCBnZXRDb3VudHJpZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb3VudHJpZXMubGVuZ3RoKSB7XG4gICAgICBnZXRDb3VudHJpZXMoYCR7Q09VTlRSSUVTfS9hbGxgKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIgKCkge1xuXG4gICAgY29uc3QgeyBzZWxlY3RlZENvdW50cnksIGNvdW50cmllcyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nTGFuZGluZyBkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1jZW50ZXInPlxuICAgICAgICA8aDE+TW92aWUgU2VhcmNoPC9oMT5cbiAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgY29sLW1kLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY291bnRyaWVzXCI+U2VsZWN0IGEgQ291bnRyeTwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZENvdW50cnl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0+XG4gICAgICAgICAgICAgIHtjb3VudHJpZXMubWFwKCh7IG5hbWUgfSkgPT4gKFxuICAgICAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgICAgIGlkPVwiY291bnRyaWVzXCJcbiAgICAgICAgICAgICAgICAgIGtleT17bmFtZX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuYW1lfT5cbiAgICAgICAgICAgICAgICAgIHtuYW1lfVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIDxMaW5rIHRvPVwibW92aWVzXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+XG4gICAgICAgICAgICBTZWUgYWxsIG1vdmllc1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L0xpbms+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiAoe1xuICBzZWxlY3RlZENvdW50cnk6IHN0YXRlLnNlbGVjdGVkQ291bnRyeSxcbiAgY291bnRyaWVzOiBzdGF0ZS5jb3VudHJpZXNcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+ICh7XG4gIGdldENvdW50cmllcyh1cmwpIHtcbiAgICBkaXNwYXRjaChnZXRDb3VudHJpZXNBY3Rpb24odXJsKSk7XG4gIH0sXG4gIHNldENvdW50cnkoY291bnRyeSkge1xuICAgIGRpc3BhdGNoKHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KSk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShMYW5kaW5nKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTUxNjQ0ODk2MzY2XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgeyBnZXRNb3ZpZSB9IGZyb20gJ2FjdGlvbnMnO1xuXG5pbXBvcnQgTW92aWUgZnJvbSAnY29tcG9uZW50cy9Nb3ZpZS9Nb3ZpZSc7XG5cbmltcG9ydCAnLi9Nb3ZpZURldGFpbHMuc2Nzcyc7XG5cbmNsYXNzIE1vdmllRGV0YWlscyBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goZ2V0TW92aWUoJzEnKSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7IG1vdmllIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW92aWVEZXRhaWxzIGQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxuICAgICAgICAgIDxNb3ZpZSB7Li4ubW92aWV9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICB9XG4gIFxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+ICh7XG4gIG1vdmllOiBzdGF0ZS5tb3ZpZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShNb3ZpZURldGFpbHMpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1NTE2NDQ4OTYzNzJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtaG90LWxvYWRlci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImZpbGVNYXBcIjpcIntmaWxlTmFtZX1cIn0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7O1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBhcnJheU9mLCBzaGFwZSwgc3RyaW5nLCBudW1iZXIgfSBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHsgc2V0U2VhcmNoVGVybSwgZ2V0TW92aWVzIH0gZnJvbSAnYWN0aW9ucyc7XG5cbmltcG9ydCBNb3ZpZUNhcmQgZnJvbSAnY29tcG9uZW50cy9Nb3ZpZUNhcmQvTW92aWVDYXJkJztcblxuaW1wb3J0ICcuL01vdmllcy5zY3NzJztcblxuY2xhc3MgTW92aWVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAvKipcbiAgICogU2V0cyBzdGF0ZSdzIHNlYXJjaFRlcm0gYW5kIGZpbHRlciB0aGUgbW92aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VhcmNoVGVybVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cbiAgc2VhcmNoVGVybUhhbmRsZXIgPSAoc2VhcmNoVGVybSkgPT4ge1xuICAgIGNvbnN0IHsgc2V0U2VhcmNoVGVybSB9ID0gdGhpcy5wcm9wcztcbiAgICBzZXRTZWFyY2hUZXJtKHNlYXJjaFRlcm0pO1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgbW92aWVzLCBmZXRjaE1vdmllcyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAobW92aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZmV0Y2hNb3ZpZXMoJ21vdmllL3BvcHVsYXInKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3QgeyBzZWFyY2hUZXJtLCBtb3ZpZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1mbGV4IGFsaWduLWl0ZW1zLXN0YXJ0IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAge21vdmllcy5maWx0ZXIobW92aWUgPT4gKFxuICAgICAgICAgICAgICBgJHttb3ZpZS5tb3ZpZVRpdGxlfSAke21vdmllLmRlc2NyaXB0aW9ufWAudG9VcHBlckNhc2UoKS5pbmRleE9mKHNlYXJjaFRlcm0udG9VcHBlckNhc2UoKSkgPj0gMFxuICAgICAgICAgICAgKSkubWFwKG1vdmllID0+IChcbiAgICAgICAgICAgICAgPE1vdmllQ2FyZCBrZXk9e21vdmllLmlkfSB7Li4ubW92aWV9IC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgKTtcblxuICB9XG5cbiAgXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4gKHtcbiAgc2VhcmNoVGVybTogc3RhdGUuc2VhcmNoVGVybSxcbiAgbW92aWVzOiBzdGF0ZS5tb3ZpZXNcbn0pO1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSB7IFxuICBmZXRjaE1vdmllczogZ2V0TW92aWVzLFxuICBzZXRTZWFyY2hUZXJtLCAgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShNb3ZpZXMpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1NTE2NDQ4OTY0MzhcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtaG90LWxvYWRlci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImZpbGVNYXBcIjpcIntmaWxlTmFtZX1cIn0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7O1xuICAgIH1cbiAgIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgUHJvZmlsZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJybVByb2ZpbGVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkXCIgc3R5bGU9e3t3aWR0aDogJzE4cmVtJ319PlxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImNhcmQtaW1nLXRvcFwiXG4gICAgICAgICAgICBzcmM9XCJkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VVEYtOCwlM0NzdmclMjB3aWR0aCUzRCUyMjI4NiUyMiUyMGhlaWdodCUzRCUyMjE4MCUyMiUyMHhtbG5zJTNEJTIyaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJTIyJTIwdmlld0JveCUzRCUyMjAlMjAwJTIwMjg2JTIwMTgwJTIyJTIwcHJlc2VydmVBc3BlY3RSYXRpbyUzRCUyMm5vbmUlMjIlM0UlM0NkZWZzJTNFJTNDc3R5bGUlMjB0eXBlJTNEJTIydGV4dCUyRmNzcyUyMiUzRSUyM2hvbGRlcl8xNjBkZWM0MjQzYSUyMHRleHQlMjAlN0IlMjBmaWxsJTNBcmdiYSgyNTUlMkMyNTUlMkMyNTUlMkMuNzUpJTNCZm9udC13ZWlnaHQlM0Fub3JtYWwlM0Jmb250LWZhbWlseSUzQUhlbHZldGljYSUyQyUyMG1vbm9zcGFjZSUzQmZvbnQtc2l6ZSUzQTE0cHQlMjAlN0QlMjAlM0MlMkZzdHlsZSUzRSUzQyUyRmRlZnMlM0UlM0NnJTIwaWQlM0QlMjJob2xkZXJfMTYwZGVjNDI0M2ElMjIlM0UlM0NyZWN0JTIwd2lkdGglM0QlMjIyODYlMjIlMjBoZWlnaHQlM0QlMjIxODAlMjIlMjBmaWxsJTNEJTIyJTIzNzc3JTIyJTNFJTNDJTJGcmVjdCUzRSUzQ2clM0UlM0N0ZXh0JTIweCUzRCUyMjk5LjQzNzUlMjIlMjB5JTNEJTIyOTYuMzM3NSUyMiUzRUltYWdlJTIwY2FwJTNDJTJGdGV4dCUzRSUzQyUyRmclM0UlM0MlMkZnJTNFJTNDJTJGc3ZnJTNFXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FyZC1ib2R5XCI+XG4gICAgICAgICAgICA8aDUgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPkNhcmQgdGl0bGU8L2g1PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY2FyZC10ZXh0XCI+U29tZSBxdWljayBleGFtcGxlIHRleHQgdG8gYnVpbGQgb24gdGhlIGNhcmQgdGl0bGUgYW5kIG1ha2UgdXAgdGhlIGJ1bGsgb2YgdGhlIGNhcmQncyBjb250ZW50LjwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5DcmFzIGp1c3RvIG9kaW88L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiPkRhcGlidXMgYWMgZmFjaWxpc2lzIGluPC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW1cIj5WZXN0aWJ1bHVtIGF0IGVyb3M8L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiY2FyZC1saW5rXCI+Q2FyZCBsaW5rPC9hPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJjYXJkLWxpbmtcIj5Bbm90aGVyIGxpbms8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgUm91dGVcbn0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmltcG9ydCB7IE5hdiB9IGZyb20gJ2NvbXBvbmVudHMvTmF2JztcbmltcG9ydCBGb290ZXIgZnJvbSAnY29tcG9uZW50cy9Gb290ZXIvRm9vdGVyJztcblxuY29uc3QgTG9hZGluZyA9ICgpID0+ICg8ZGl2Pi4uLjwvZGl2Pik7XG5cbmltcG9ydCBMYW5kaW5nIGZyb20gJ3BhZ2VzL0xhbmRpbmcvTGFuZGluZyc7XG5cbmltcG9ydCBBYm91dCBmcm9tICdwYWdlcy9BYm91dC9BYm91dCc7XG5cbmltcG9ydCBNb3ZpZXMgZnJvbSAncGFnZXMvTW92aWVzL01vdmllcyc7XG5cbmltcG9ydCBQcm9maWxlIGZyb20gJ3BhZ2VzL1Byb2ZpbGUvUHJvZmlsZSc7XG5cbmltcG9ydCBNb3ZpZURldGFpbHMgZnJvbSAncGFnZXMvTW92aWVEZXRhaWxzL01vdmllRGV0YWlscyc7XG5cbmNvbnN0IFJvdXRpbmcgPSAoKSA9PiAoXG4gIDxtYWluPlxuICAgIDxOYXYgLz5cbiAgICA8ZGl2PlxuICAgICAgPFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgY29tcG9uZW50PXtMYW5kaW5nfSAvPlxuICAgICAgPFJvdXRlXG4gICAgICAgIHBhdGg9XCIvYWJvdXRcIlxuICAgICAgICBjb21wb25lbnQ9e3Byb3BzID0+IDxBYm91dCB7Li4ucHJvcHN9IC8+fVxuICAgICAgLz5cbiAgICAgIDxSb3V0ZVxuICAgICAgICBwYXRoPVwiL21vdmllc1wiXG4gICAgICAgIGNvbXBvbmVudD17cHJvcHMgPT4gPE1vdmllcyB7Li4ucHJvcHN9IC8+fVxuICAgICAgLz5cbiAgICAgIDxSb3V0ZVxuICAgICAgICBwYXRoPVwiL1Byb2ZpbGVcIlxuICAgICAgICBjb21wb25lbnQ9e3Byb3BzID0+IDxQcm9maWxlIHsuLi5wcm9wc30gLz59XG4gICAgICAvPlxuICAgICAgPFJvdXRlXG4gICAgICAgIHBhdGg9XCIvZGV0YWlscy86aWRcIlxuICAgICAgICBjb21wb25lbnQ9e3Byb3BzID0+IDxNb3ZpZURldGFpbHMgey4uLnByb3BzfSAvPiB9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICAgIDxGb290ZXIgLz5cbiAgPC9tYWluPlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGluZztcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgUm91dGluZyB9IGZyb20gJy4vUm91dGluZyc7IiwiLyoqXG4gKiBAbW9kdWxlIHN0b3JlXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnO1xuXG5pbXBvcnQgeyBzYXZlU3RhdGUsIGxvYWRTdGF0ZSB9IGZyb20gJy4vbG9jYWxTdG9yYWdlJztcbi8vIE1pZGRsZXdhcmUgaXMgdGhlIHN1Z2dlc3RlZCB3YXkgdG8gZXh0ZW5kIFJlZHV4IHdpdGggY3VzdG9tIGZ1bmN0aW9uYWxpdHkuXG5pbXBvcnQgbWlkZGxld2FyZXMgZnJvbSAnLi9hcHBTdGF0ZS9taWRkbGV3YXJlcyc7XG4vLyBpbXBvcnQgYWxsIHJlZHVjZXJzXG5pbXBvcnQgcmVkdWNlciBmcm9tICcuL2FwcFN0YXRlL3JlZHVjZXJzJztcbi8vIEdldCB0aGUgc3RhdGUgZnJvbSBsb2NhbFN0b3JhZ2VcbmNvbnN0IHBlcnNpc3RlZFN0YXRlID0gbG9hZFN0YXRlKCk7XG5jb25zdCBkZXZ0b29scyA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fID09PSAnZnVuY3Rpb24nICYmXG4gIC8vIHdoZW4gdGhlIGV4dGVuc2lvbiBpcyBub3QgaW5zdGFsbGVkLCB3ZeKAmXJlIHVzaW5nIFJlZHV4IGNvbXBvc2UgaGVyZS5cbiAgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyh7IGFjdGlvbnNCbGFja2xpc3Q6IFtdIH0pO1xuXG5jb25zdCBjb21wb3NlRW5oYW5jZXJzID0gZGV2dG9vbHMgfHwgY29tcG9zZTtcblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgcmVkdWNlcixcbiAgcGVyc2lzdGVkU3RhdGUsXG4gIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmVzKSkgLy8gdGhlIHRoaXJkIHBhcmFtZXRlciBpcyB3aGF0IGlzIGNhbGxlZCBhbiAnZW5oYW5jZXInXG4pO1xuXG4vLyBTYXZlIHRoZSBzdGF0ZSBhbnkgdGltZSB0aGUgc3RvcmUgc3RhdGUgY2hhbmdlc1xuc3RvcmUuc3Vic2NyaWJlKHRocm90dGxlKCgpID0+IHtcbiAgLy8gUmF0aGVyIHRoYW4gcGFzcyB0aGUgd2hvbGUgc3RhdGUgb2JqZWN0LCBqdXN0IHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGtleSBmaWVsZCBmcm9tIHRoZSBzdGF0ZSBvYmplY3QuXG4gIHNhdmVTdGF0ZSh7XG4gICAgbW92aWU6IHN0b3JlLmdldFN0YXRlKCkubW92aWUsXG4gIH0pO1xufSwgMTAwMCkpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBpZiAobW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCcuL2FwcFN0YXRlL3JlZHVjZXJzJywgKCkgPT5cbiAgICAgIHN0b3JlLnJlcGxhY2VSZWR1Y2VyKHJlcXVpcmUoJy4vYXBwU3RhdGUvcmVkdWNlcnMnKS5kZWZhdWx0KVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG4iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3gxQkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7OztBQU5BO0FBQ0E7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFKQTs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7OztBQUdBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQUE7QUFFQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBTkE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7QUFLQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFOQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFWQTs7OztBQVdBOzs7OztBQUtBO0FBR0E7Ozs7Ozs7QUFLQTtBQUVBOzs7Ozs7O0FBS0E7O0FBRUE7QUFFQTs7Ozs7OztBQUtBO0FBRUE7Ozs7Ozs7O0FBS0E7QUFFQTtBQUVBO0FBRUE7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUVBO0FBRUE7Ozs7Ozs7QUFLQTtBQUVBOzs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFQTs7OztBQUlBOzs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7Ozs7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBSkE7QUFBQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE1QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQThCQTtBQUVBO0FBRkE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFLQTtBQUNBO0FBSEE7QUFDQTtBQUpBO0FBQUE7QUFBQTtBQUFBO0FBV0E7QUFDQTtBQUhBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCQTtBQXBEQTtBQXFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBUEE7Ozs7QUFRQTs7O0FBR0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOzs7Ozs7OztBQVFBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQVBBOzs7O0FBUUE7Ozs7OztBQU1BO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBOzs7O0FBSUE7Ozs7OztBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBVkE7OztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFQQTs7OztBQVFBOzs7Ozs7QUFNQTtBQUVBO0FBRUE7QUFGQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7QUFPQTs7Ozs7O0FBTUE7QUFDQTtBQVFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7QUFRQTs7Ozs7O0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7Ozs7QUFRQTs7Ozs7O0FBTUE7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFBQTtBQVhBO0FBQ0E7QUFtQkE7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQUE7QUFSQTtBQUNBO0FBZUE7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBRkE7QUFLQTs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFJQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFJQTtBQUFBO0FBT0E7OztBQTVCQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFIQTs7Ozs7O0FBT0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBRkE7QUFNQTtBQUNBO0FBRkE7QUFHQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFGQTtBQVlBO0FBQUE7QUFNQTs7O0FBNUZBO0FBQ0E7QUErRkE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkhBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7Ozs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFKQTtBQUtBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBYUE7QUFFQTs7Ozs7Ozs7O0FBTUE7QUFDQTtBQUNBOzs7QUF2Q0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBOzs7OztBQUtBOzs7OztBQUtBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7Ozs7Ozs7OztBQUtBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBV0E7OztBQXhCQTtBQUNBO0FBMkJBOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQU9BO0FBQUE7QUFFQTtBQUNBO0FBQ0E7Ozs7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQURBO0FBV0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQU1BOzs7QUFwREE7QUFDQTtBQXVEQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUFBO0FBQ0E7QUFRQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBSUE7QUFFQTtBQUFBO0FBTUE7OztBQWxCQTtBQUNBO0FBcUJBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTtBQUFBO0FBRUE7QUFDQTs7Ozs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTs7O0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQURBO0FBUUE7OztBQTNDQTtBQUNBO0FBK0NBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBS0E7OztBQTNCQTtBQUNBO0FBOEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBO0FBQUE7QUFBQTtBQUNBO0FBV0E7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQWpCQTtBQUNBO0FBeUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFaQTs7O0FBUUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9