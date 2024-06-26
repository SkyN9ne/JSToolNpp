var _l = "", _m3u8 = {};
!function (e, t) {
	"undefined" != typeof module ? module.exports = t() : "function" == typeof define && "object" == typeof define.amd ? define(t) : this.sprintf = t()
}
(this, function () {
	var e = function (e) {
		if ("string" != typeof e)
			throw "sprintf: The first arguments need to be a valid format string.";
		for (var t = new RegExp(/%(\+)?([0 ]|'(.))?(-)?([0-9]+)?(\.([0-9]+))?([%bcdfosxX])/g), i = [], n = 1; part = t.exec(e); ) {
			if (n >= arguments.length && "%" != part[8])
				throw "sprintf: At least one argument was missing.";
			i[i.length] = {
				begin: part.index,
				end: part.index + part[0].length,
				sign: "+" == part[1],
				negative: parseFloat(arguments[n]) < 0,
				padding: void 0 == part[2] ? " " : "'" == part[2].substring(0, 1) ? part[3] : part[2],
				alignLeft: "-" == part[4],
				width: void 0 != part[5] && part[5],
				precision: void 0 != part[7] && part[7],
				type: part[8],
				data: "%" != part[8] && String(arguments[n++])
			}
		}
		for (var r = "", a = 0, s = 0; s < i.length; ++s) {
			r += e.substring(a, i[s].begin),
			a = i[s].end;
			var o = "";
			switch (i[s].type) {
			case "%":
				o = "%";
				break;
			case "b":
				o = Math.abs(parseInt(i[s].data)).toString(2);
				break;
			case "c":
				o = String.fromCharCode(Math.abs(parseInt(i[s].data)));
				break;
			case "d":
				o = String(Math.abs(parseInt(i[s].data)));
				break;
			case "f":
				o = i[s].precision === !1 ? String(Math.abs(parseFloat(i[s].data))) : Math.abs(parseFloat(i[s].data)).toFixed(i[s].precision);
				break;
			case "o":
				o = Math.abs(parseInt(i[s].data)).toString(8);
				break;
			case "s":
				o = i[s].data.substring(0, i[s].precision ? i[s].precision : i[s].data.length);
				break;
			case "x":
				o = Math.abs(parseInt(i[s].data)).toString(16).toLowerCase();
				break;
			case "X":
				o = Math.abs(parseInt(i[s].data)).toString(16).toUpperCase();
				break;
			default:
				throw 'sprintf: Unknown type "' + i[s].type + '" detected. This should never happen. Maybe the regex is wrong.'
			}
			if ("%" != i[s].type) {
				if (0 != i[s].width && i[s].width > o.length)
					for (var u = o.length, d = 0; d < i[s].width - u; ++d)
						o = 1 == i[s].alignLeft ? o + i[s].padding : i[s].padding + o;
				"b" != i[s].type && "d" != i[s].type && "o" != i[s].type && "f" != i[s].type && "x" != i[s].type && "X" != i[s].type || (1 == i[s].negative ? o = "-" + o : 1 == i[s].sign && (o = "+" + o)),
				r += o
			} else
				r += o
		}
		return r += e.substring(a, e.length)
	};
	return e.attach = function (t) {
		t.printf = function () {
			var t = Array.prototype.slice.call(arguments);
			return t.unshift(String(this)),
			e.apply(void 0, t)
		}
	},
	e
}), function (e) {
	var t,
	i = e.Base64,
	n = "2.1.9";
	if ("undefined" != typeof module && module.exports)
		try {
			t = require("buffer").Buffer
		} catch (e) {}
	var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	a = function (e) {
		for (var t = {}, i = 0, n = e.length; i < n; i++)
			t[e.charAt(i)] = i;
		return t
	}
	(r),
	s = String.fromCharCode,
	o = function (e) {
		if (e.length < 2) {
			var t = e.charCodeAt(0);
			return t < 128 ? e : t < 2048 ? s(192 | t >>> 6) + s(128 | 63 & t) : s(224 | t >>> 12 & 15) + s(128 | t >>> 6 & 63) + s(128 | 63 & t)
		}
		var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
		return s(240 | t >>> 18 & 7) + s(128 | t >>> 12 & 63) + s(128 | t >>> 6 & 63) + s(128 | 63 & t)
	},
	u = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
	d = function (e) {
		return e.replace(u, o)
	},
	l = function (e) {
		var t = [0, 2, 1][e.length % 3],
		i = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0),
		n = [r.charAt(i >>> 18), r.charAt(i >>> 12 & 63), t >= 2 ? "=" : r.charAt(i >>> 6 & 63), t >= 1 ? "=" : r.charAt(63 & i)];
		return n.join("")
	},
	f = e.btoa ? function (t) {
		return e.btoa(t)
	}
	 : function (e) {
		return e.replace(/[\s\S]{1,3}/g, l)
	},
	c = t ? function (e) {
		return (e.constructor === t.constructor ? e : new t(e)).toString("base64")
	}
	 : function (e) {
		return f(d(e))
	},
	h = function (e, t) {
		return t ? c(String(e)).replace(/[+\/]/g, function (e) {
			return "+" == e ? "-" : "_"
		}).replace(/=/g, "") : c(String(e))
	},
	p = function (e) {
		return h(e, !0)
	},
	m = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
	g = function (e) {
		switch (e.length) {
		case 4:
			var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3),
			i = t - 65536;
			return s((i >>> 10) + 55296) + s((1023 & i) + 56320);
		case 3:
			return s((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
		default:
			return s((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
		}
	},
	y = function (e) {
		return e.replace(m, g)
	},
	v = function (e) {
		var t = e.length,
		i = t % 4,
		n = (t > 0 ? a[e.charAt(0)] << 18 : 0) | (t > 1 ? a[e.charAt(1)] << 12 : 0) | (t > 2 ? a[e.charAt(2)] << 6 : 0) | (t > 3 ? a[e.charAt(3)] : 0),
		r = [s(n >>> 16), s(n >>> 8 & 255), s(255 & n)];
		return r.length -= [0, 0, 2, 1][i],
		r.join("")
	},
	b = e.atob ? function (t) {
		return e.atob(t)
	}
	 : function (e) {
		return e.replace(/[\s\S]{1,4}/g, v)
	},
	_ = t ? function (e) {
		return (e.constructor === t.constructor ? e : new t(e, "base64")).toString()
	}
	 : function (e) {
		return y(b(e))
	},
	T = function (e) {
		return _(String(e).replace(/[-_]/g, function (e) {
				return "-" == e ? "+" : "/"
			}).replace(/[^A-Za-z0-9\+\/]/g, ""))
	},
	S = function () {
		var t = e.Base64;
		return e.Base64 = i,
		t
	};
	if (e.Base64 = {
			VERSION: n,
			atob: b,
			btoa: f,
			fromBase64: T,
			toBase64: h,
			utob: d,
			encode: h,
			encodeURI: p,
			btou: y,
			decode: T,
			noConflict: S
		}, "function" == typeof Object.defineProperty) {
		var w = function (e) {
			return {
				value: e,
				enumerable: !1,
				writable: !0,
				configurable: !0
			}
		};
		e.Base64.extendString = function () {
			Object.defineProperty(String.prototype, "fromBase64", w(function () {
					return T(this)
				})),
			Object.defineProperty(String.prototype, "toBase64", w(function (e) {
					return h(this, e)
				})),
			Object.defineProperty(String.prototype, "toBase64URI", w(function () {
					return h(this, !0)
				}))
		}
	}
	e.Meteor && (Base64 = e.Base64),
	"undefined" != typeof module && module.exports && (module.exports.Base64 = e.Base64),
	"function" == typeof define && define.amd && define([], function () {
		return e.Base64
	})
}
("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : this), function (e) {
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = e();
	else if ("function" == typeof define && define.amd)
		define([], e);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this,
		t.videojsContribHls = e()
	}
}
(function () {
	var define,
	module,
	exports;
	return function e(t, i, n) {
		function r(s, o) {
			if (!i[s]) {
				if (!t[s]) {
					var u = "function" == typeof require && require;
					if (!o && u)
						return u(s, !0);
					if (a)
						return a(s, !0);
					var d = new Error("Cannot find module '" + s + "'");
					throw d.code = "MODULE_NOT_FOUND",
					d
				}
				var l = i[s] = {
					exports: {}
				};
				t[s][0].call(l.exports, function (e) {
					var i = t[s][1][e];
					return r(i ? i : e)
				}, l, l.exports, e, t, i, n)
			}
			return i[s].exports
		}
		for (var a = "function" == typeof require && require, s = 0; s < n.length; s++)
			r(n[s]);
		return r
	}
	({
		1: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = function () {
					function e(e, t) {
						var i = [],
						n = !0,
						r = !1,
						a = void 0;
						try {
							for (var s, o = e[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
						} catch (e) {
							r = !0,
							a = e
						} finally {
							try {
								!n && o.return && o.return()
							} finally {
								if (r)
									throw a
							}
						}
						return i
					}
					return function (t, i) {
						if (Array.isArray(t))
							return t;
						if (Symbol.iterator in Object(t))
							return e(t, i);
						throw new TypeError("Invalid attempt to destructure non-iterable instance")
					}
				}
				(),
				a = e("global/window"),
				s = n(a),
				o = function (e, t) {
					for (var i = e.cues, n = 0; n < i.length; n++) {
						var r = i[n];
						if (t >= r.adStartTime && t <= r.adEndTime)
							return r
					}
					return null
				},
				u = function (e, t) {
					var i = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2];
					if (e.segments)
						for (var n = i, a = void 0, u = 0; u < e.segments.length; u++) {
							var d = e.segments[u];
							if (a || (a = o(t, n + d.duration / 2)), a) {
								if ("cueIn" in d) {
									a.endTime = n,
									a.adEndTime = n,
									n += d.duration,
									a = null;
									continue
								}
								if (n < a.endTime) {
									n += d.duration;
									continue
								}
								a.endTime += d.duration
							} else if ("cueOut" in d && (a = new s.default.VTTCue(n, n + d.duration, d.cueOut), a.adStartTime = n, a.adEndTime = n + parseFloat(d.cueOut), t.addCue(a)), "cueOutCont" in d) {
								var l = void 0,
								f = void 0,
								c = d.cueOutCont.split("/").map(parseFloat),
								h = r(c, 2);
								l = h[0],
								f = h[1],
								a = new s.default.VTTCue(n, n + d.duration, ""),
								a.adStartTime = n - l,
								a.adEndTime = a.adStartTime + f,
								t.addCue(a)
							}
							n += d.duration
						}
				};
				i.default = {
					updateAdCues: u,
					findAdCue: o
				},
				t.exports = i.default
			}, {
				"global/window": 30
			}
		],
		2: [function (e, t, i) {
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = function (e, t) {
					return e.start(t) + "-" + e.end(t)
				},
				r = function (e, t) {
					var i = e.toString(16);
					return "00".substring(0, 2 - i.length) + i + (t % 2 ? " " : "")
				},
				a = function (e) {
					return e >= 32 && e < 126 ? String.fromCharCode(e) : "."
				},
				s = function (e) {
					var t = {};
					return Object.keys(e).forEach(function (i) {
						var n = e[i];
						ArrayBuffer.isView(n) ? t[i] = {
							bytes: n.buffer,
							byteOffset: n.byteOffset,
							byteLength: n.byteLength
						}
						 : t[i] = n
					}),
					t
				},
				o = function (e) {
					var t = e.byterange || {
						length: 1 / 0,
						offset: 0
					};
					return [t.length, t.offset, e.resolvedUri].join(",")
				},
				u = {
					hexDump: function (e) {
						for (var t = Array.prototype.slice.call(e), i = 16, n = "", s = void 0, o = void 0, u = 0; u < t.length / i; u++)
							s = t.slice(u * i, u * i + i).map(r).join(""), o = t.slice(u * i, u * i + i).map(a).join(""), n += s + " " + o + "\n";
						return n
					},
					tagDump: function (e) {
						return u.hexDump(e.bytes)
					},
					textRanges: function (e) {
						var t = "",
						i = void 0;
						for (i = 0; i < e.length; i++)
							t += n(e, i) + " ";
						return t
					},
					createTransferableMessage: s,
					initSegmentId: o
				};
				i.default = u,
				t.exports = i.default
			}, {}
		],
		3: [function (e, t, i) {
				"use strict";
				Object.defineProperty(i, "__esModule", {
					value: !0
				}),
				i.default = {
					GOAL_BUFFER_LENGTH: 30
				},
				t.exports = i.default
			}, {}
		],
		4: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = e("global/window"),
				a = n(r),
				s = e("aes-decrypter"),
				o = e("./bin-utils"),
				u = function (e) {
					e.onmessage = function (e) {
						var t = e.data,
						i = new Uint8Array(t.encrypted.bytes, t.encrypted.byteOffset, t.encrypted.byteLength),
						n = new Uint32Array(t.key.bytes, t.key.byteOffset, t.key.byteLength / 4),
						r = new Uint32Array(t.iv.bytes, t.iv.byteOffset, t.iv.byteLength / 4);
						new s.Decrypter(i, n, r, function (e, i) {
							a.default.postMessage((0, o.createTransferableMessage)({
									source: t.source,
									decrypted: i
								}), [i.buffer])
						})
					}
				};
				i.default = function (e) {
					return new u(e)
				},
				t.exports = i.default
			}, {
				"./bin-utils": 2,
				"aes-decrypter": 23,
				"global/window": 30
			}
		],
		5: [function (e, t, i) {
				(function (t) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function a(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var s = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					o = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					u = e("./playlist-loader"),
					d = n(u),
					l = e("./segment-loader"),
					f = n(l),
					c = e("./vtt-segment-loader"),
					h = n(c),
					p = e("./ranges"),
					m = n(p),
					g = "undefined" != typeof window ? window.videojs : "undefined" != typeof t ? t.videojs : null,
					y = n(g),
					v = e("./ad-cue-tags"),
					b = n(v),
					_ = e("./sync-controller"),
					T = n(_),
					S = e("videojs-contrib-media-sources/es5/codec-utils"),
					w = e("webworkify"),
					k = n(w),
					x = e("./decrypter-worker"),
					O = n(x),
					E = 3e5,
					P = void 0,
					A = ["mediaRequests", "mediaRequestsAborted", "mediaRequestsTimedout", "mediaRequestsErrored", "mediaTransferDuration", "mediaBytesTransferred"],
					L = function (e) {
						return this.audioSegmentLoader_[e] + this.mainSegmentLoader_[e]
					},
					I = function (e, t) {
						if (typeof e != typeof t)
							return !0;
						if (Object.keys(e).length !== Object.keys(t).length)
							return !0;
						for (var i in e)
							if (e[i] !== t[i])
								return !0;
						return !1
					},
					C = function (e) {
						var t = {
							codecCount: 0,
							videoCodec: null,
							videoObjectTypeIndicator: null,
							audioProfile: null
						},
						i = void 0;
						return t.codecCount = e.split(",").length,
						t.codecCount = t.codecCount || 2,
						i = /(^|\s|,)+(avc1)([^ ,]*)/i.exec(e),
						i && (t.videoCodec = i[2], t.videoObjectTypeIndicator = i[3]),
						t.audioProfile = /(^|\s|,)+mp4a.[0-9A-Fa-f]+\.([0-9A-Fa-f]+)/i.exec(e),
						t.audioProfile = t.audioProfile && t.audioProfile[2],
						t
					},
					U = function (e) {
						return e.replace(/avc1\.(\d+)\.(\d+)/i, function (e) {
							return (0, S.translateLegacyCodecs)([e])[0]
						})
					};
					i.mapLegacyAvcCodecs_ = U;
					var M = function (e, t) {
						var i = "mp2t",
						n = {
							videoCodec: "avc1",
							videoObjectTypeIndicator: ".4d400d",
							audioProfile: "2"
						},
						r = [],
						a = void 0,
						s = null;
						if (!t)
							return [];
						t.segments && t.segments.length && t.segments[0].map && (i = "mp4"),
						a = t.attributes || {},
						a.CODECS && !function () {
							var e = C(a.CODECS);
							Object.keys(e).forEach(function (t) {
								n[t] = e[t] || n[t]
							})
						}
						(),
						e.mediaGroups.AUDIO && (r = e.mediaGroups.AUDIO[a.AUDIO]);
						for (var o in r) {
							if (s && !!r[o].uri != !!s.uri)
								return ["video/" + i + '; codecs="' + n.videoCodec + n.videoObjectTypeIndicator + ", mp4a.40." + n.audioProfile + '"', "audio/" + i + '; codecs="mp4a.40.' + n.audioProfile + '"'];
							s = r[o]
						}
						return s && s.uri ? ["video/" + i + '; codecs="' + n.videoCodec + n.videoObjectTypeIndicator + '"', "audio/" + i + '; codecs="mp4a.40.' + n.audioProfile + '"'] : ["video/" + i + '; codecs="' + n.videoCodec + n.videoObjectTypeIndicator + ", mp4a.40." + n.audioProfile + '"']
					};
					i.mimeTypesForPlaylist_ = M;
					var D = function (e) {
						function t(e) {
							var i = this;
							r(this, t),
							o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this);
							var n = e.url,
							a = e.withCredentials,
							s = e.mode,
							u = e.tech,
							l = e.bandwidth,
							c = e.externHls,
							p = e.useCueTags;
							if (!n)
								throw new Error("A non-empty playlist URL is required");
							P = c,
							this.withCredentials = a,
							this.tech_ = u,
							this.hls_ = u.hls,
							this.mode_ = s,
							this.useCueTags_ = p,
							this.useCueTags_ && (this.cueTagsTrack_ = this.tech_.addTextTrack("metadata", "ad-cues"), this.cueTagsTrack_.inBandMetadataTrackDispatchType = ""),
							this.requestOptions_ = {
								withCredentials: this.withCredentials,
								timeout: null
							},
							this.audioGroups_ = {},
							this.subtitleGroups_ = {
								groups: {},
								tracks: {}
							},
							this.mediaSource = new y.default.MediaSource({
								mode: s
							}),
							this.audioinfo_ = null,
							this.mediaSource.on("audioinfo", this.handleAudioinfoUpdate_.bind(this)),
							this.mediaSource.addEventListener("sourceopen", this.handleSourceOpen_.bind(this)),
							this.seekable_ = y.default.createTimeRanges(),
							this.hasPlayed_ = function () {
								return !1
							},
							this.syncController_ = new T.default,
							this.segmentMetadataTrack_ = u.addRemoteTextTrack({
								kind: "metadata",
								label: "segment-metadata"
							}, !0).track,
							this.decrypter_ = (0, k.default)(O.default);
							var m = {
								hls: this.hls_,
								mediaSource: this.mediaSource,
								currentTime: this.tech_.currentTime.bind(this.tech_),
								seekable: function () {
									return i.seekable()
								},
								seeking: function () {
									return i.tech_.seeking()
								},
								duration: function () {
									return i.mediaSource.duration
								},
								hasPlayed: function () {
									return i.hasPlayed_()
								},
								bandwidth: l,
								syncController: this.syncController_,
								decrypter: this.decrypter_
							};
							this.masterPlaylistLoader_ = new d.default(n, this.hls_, this.withCredentials),
							this.setupMasterPlaylistLoaderListeners_(),
							this.audioPlaylistLoader_ = null,
							this.subtitlePlaylistLoader_ = null,
							this.mainSegmentLoader_ = new f.default(y.default.mergeOptions(m, {
										segmentMetadataTrack: this.segmentMetadataTrack_,
										loaderType: "main"
									})),
							this.audioSegmentLoader_ = new f.default(y.default.mergeOptions(m, {
										loaderType: "audio"
									})),
							this.subtitleSegmentLoader_ = new h.default(y.default.mergeOptions(m, {
										loaderType: "vtt"
									})),
							this.setupSegmentLoaderListeners_(),
							A.forEach(function (e) {
								i[e + "_"] = L.bind(i, e)
							}),
							this.masterPlaylistLoader_.load()
						}
						return a(t, e),
						s(t, [{
									key: "setupMasterPlaylistLoaderListeners_",
									value: function () {
										var e = this;
										this.masterPlaylistLoader_.on("loadedmetadata", function () {
											var t = e.masterPlaylistLoader_.media(),
											i = 1.5 * e.masterPlaylistLoader_.targetDuration * 1e3;
											e.masterPlaylistLoader_.isLowestEnabledRendition_() ? e.requestOptions_.timeout = 0 : e.requestOptions_.timeout = i,
											t.endList && "none" !== e.tech_.preload() && (e.mainSegmentLoader_.playlist(t, e.requestOptions_), e.mainSegmentLoader_.load()),
											e.fillAudioTracks_(),
											e.setupAudio(),
											e.fillSubtitleTracks_(),
											e.setupSubtitles();
											try {
												e.setupSourceBuffers_()
											} catch (t) {
												return y.default.log.warn("Failed to create SourceBuffers", t),
												e.mediaSource.endOfStream("decode")
											}
											e.setupFirstPlay(),
											e.trigger("audioupdate"),
											e.trigger("selectedinitialmedia")
										}),
										this.masterPlaylistLoader_.on("loadedplaylist", function () {
											var t = e.masterPlaylistLoader_.media();
											return t ? (e.useCueTags_ && e.updateAdCues_(t), e.mainSegmentLoader_.playlist(t, e.requestOptions_), e.updateDuration(), e.tech_.paused() || e.mainSegmentLoader_.load(), void(t.endList || !function () {
													var t = function () {
														var t = e.seekable();
														0 !== t.length && e.mediaSource.addSeekableRange_(t.start(0), t.end(0))
													};
													e.duration() !== 1 / 0 ? !function () {
														var i = function i() {
															e.duration() === 1 / 0 ? t() : e.tech_.one("durationchange", i)
														};
														e.tech_.one("durationchange", i)
													}
													() : t()
												}
													())) : (e.initialMedia_ = e.selectPlaylist(), void e.masterPlaylistLoader_.media(e.initialMedia_))
										}),
										this.masterPlaylistLoader_.on("error", function () {
											e.blacklistCurrentPlaylist(e.masterPlaylistLoader_.error)
										}),
										this.masterPlaylistLoader_.on("mediachanging", function () {
											e.mainSegmentLoader_.abort(),
											e.mainSegmentLoader_.pause()
										}),
										this.masterPlaylistLoader_.on("mediachange", function () {
											var t = e.masterPlaylistLoader_.media(),
											i = 1.5 * e.masterPlaylistLoader_.targetDuration * 1e3,
											n = void 0,
											r = void 0;
											e.masterPlaylistLoader_.isLowestEnabledRendition_() ? e.requestOptions_.timeout = 0 : e.requestOptions_.timeout = i,
											e.mainSegmentLoader_.playlist(t, e.requestOptions_),
											e.mainSegmentLoader_.load(),
											n = e.activeAudioGroup(),
											r = n.filter(function (e) {
												return e.enabled
											})[0],
											r || (e.setupAudio(), e.trigger("audioupdate")),
											e.setupSubtitles(),
											e.tech_.trigger({
												type: "mediachange",
												bubbles: !0
											})
										}),
										this.masterPlaylistLoader_.on("playlistunchanged", function () {
											var t = e.masterPlaylistLoader_.media(),
											i = e.stuckAtPlaylistEnd_(t);
											i && (e.blacklistCurrentPlaylist({
													message: "Playlist no longer updating."
												}), e.tech_.trigger("playliststuck"))
										})
									}
								}, {
									key: "setupSegmentLoaderListeners_",
									value: function () {
										var e = this;
										this.mainSegmentLoader_.on("bandwidthupdate", function () {
											e.masterPlaylistLoader_.media(e.selectPlaylist())
										}),
										this.mainSegmentLoader_.on("progress", function () {
											e.trigger("progress")
										}),
										this.mainSegmentLoader_.on("error", function () {
											e.blacklistCurrentPlaylist(e.mainSegmentLoader_.error())
										}),
										this.mainSegmentLoader_.on("syncinfoupdate", function () {
											e.onSyncInfoUpdate_()
										}),
										this.audioSegmentLoader_.on("syncinfoupdate", function () {
											e.onSyncInfoUpdate_()
										}),
										this.audioSegmentLoader_.on("error", function () {
											y.default.log.warn("Problem encountered with the current alternate audio track. Switching back to default."),
											e.audioSegmentLoader_.abort(),
											e.audioPlaylistLoader_ = null,
											e.setupAudio()
										}),
										this.subtitleSegmentLoader_.on("error", this.handleSubtitleError_.bind(this))
									}
								}, {
									key: "handleAudioinfoUpdate_",
									value: function (e) {
										if (P.supportsAudioInfoChange_() || !this.audioInfo_ || !I(this.audioInfo_, e.info))
											return void(this.audioInfo_ = e.info);
										var t = "had different audio properties (channels, sample rate, etc.) or changed in some other way.  This behavior is currently unsupported in Firefox 48 and below due to an issue: \n\nhttps://bugzilla.mozilla.org/show_bug.cgi?id=1247138\n\n",
										i = this.activeAudioGroup().map(function (e) {
											return e.enabled
										}).indexOf(!0),
										n = this.activeAudioGroup()[i],
										r = this.activeAudioGroup().filter(function (e) {
											return e.properties_ && e.properties_.default
										})[0];
										this.audioPlaylistLoader_ ? (t = "The audio track '" + n.label + "' that we tried to " + ("switch to " + t + " Unfortunately this means we will have to ") + ("return you to the main track '" + r.label + "'. Sorry!"), r.enabled = !0, this.activeAudioGroup().splice(i, 1), this.trigger("audioupdate")) : (t = "The rendition that we tried to switch to " + t + "Unfortunately that means we will have to blacklist the current playlist and switch to another. Sorry!", this.blacklistCurrentPlaylist()),
										y.default.log.warn(t),
										this.setupAudio()
									}
								}, {
									key: "mediaSecondsLoaded_",
									value: function () {
										return Math.max(this.audioSegmentLoader_.mediaSecondsLoaded + this.mainSegmentLoader_.mediaSecondsLoaded)
									}
								}, {
									key: "fillAudioTracks_",
									value: function () {
										var e = this.master(),
										t = e.mediaGroups || {};
										t && t.AUDIO && 0 !== Object.keys(t.AUDIO).length && "html5" === this.mode_ || (t.AUDIO = {
												main: {
												default: {
													default:
														!0
													}
												}
											});
										for (var i in t.AUDIO) {
											this.audioGroups_[i] || (this.audioGroups_[i] = []);
											for (var n in t.AUDIO[i]) {
												var r = t.AUDIO[i][n],
												a = new y.default.AudioTrack({
													id: n,
													kind: this.audioTrackKind_(r),
													enabled: !1,
													language: r.language,
													label: n
												});
												a.properties_ = r,
												this.audioGroups_[i].push(a)
											}
										}
										(this.activeAudioGroup().filter(function (e) {
												return e.properties_.default
											})[0] || this.activeAudioGroup()[0]).enabled = !0
									}
								}, {
									key: "audioTrackKind_",
									value: function (e) {
										var t = e.default ? "main" : "alternative";
										return e.characteristics && e.characteristics.indexOf("public.accessibility.describes-video") >= 0 && (t = "main-desc"),
										t
									}
								}, {
									key: "fillSubtitleTracks_",
									value: function () {
										var e = this.master(),
										t = e.mediaGroups || {};
										for (var i in t.SUBTITLES) {
											this.subtitleGroups_.groups[i] || (this.subtitleGroups_.groups[i] = []);
											for (var n in t.SUBTITLES[i]) {
												var r = t.SUBTITLES[i][n];
												if (!r.forced && (this.subtitleGroups_.groups[i].push(y.default.mergeOptions({
																id: n
															}, r)), "undefined" == typeof this.subtitleGroups_.tracks[n])) {
													var a = this.tech_.addRemoteTextTrack({
														id: n,
														kind: "subtitles",
														enabled: !1,
														language: r.language,
														label: n
													}, !0).track;
													this.subtitleGroups_.tracks[n] = a
												}
											}
										}
									}
								}, {
									key: "load",
									value: function () {
										this.mainSegmentLoader_.load(),
										this.audioPlaylistLoader_ && this.audioSegmentLoader_.load(),
										this.subtitlePlaylistLoader_ && this.subtitleSegmentLoader_.load()
									}
								}, {
									key: "activeAudioGroup",
									value: function () {
										var e = this.masterPlaylistLoader_.media(),
										t = void 0;
										return e.attributes && e.attributes.AUDIO && (t = this.audioGroups_[e.attributes.AUDIO]),
										t || this.audioGroups_.main
									}
								}, {
									key: "activeSubtitleGroup_",
									value: function () {
										var e = this.masterPlaylistLoader_.media(),
										t = void 0;
										return e ? (e.attributes && e.attributes.SUBTITLES && (t = this.subtitleGroups_.groups[e.attributes.SUBTITLES]), t || this.subtitleGroups_.groups.main) : null
									}
								}, {
									key: "activeSubtitleTrack_",
									value: function () {
										for (var e in this.subtitleGroups_.tracks)
											if ("showing" === this.subtitleGroups_.tracks[e].mode)
												return this.subtitleGroups_.tracks[e];
										return null
									}
								}, {
									key: "handleSubtitleError_",
									value: function () {
										y.default.log.warn("Problem encountered loading the subtitle track. Switching back to default."),
										this.subtitleSegmentLoader_.abort();
										var e = this.activeSubtitleTrack_();
										e && (e.mode = "disabled"),
										this.setupSubtitles()
									}
								}, {
									key: "setupAudio",
									value: function () {
										var e = this,
										t = this.activeAudioGroup(),
										i = t.filter(function (e) {
											return e.enabled
										})[0];
										return i || (i = t.filter(function (e) {
												return e.properties_.default
											})[0] || t[0], i.enabled = !0),
										this.audioPlaylistLoader_ && (this.audioPlaylistLoader_.dispose(), this.audioPlaylistLoader_ = null),
										this.audioSegmentLoader_.pause(),
										i.properties_.resolvedUri ? (this.audioSegmentLoader_.resetEverything(), this.audioPlaylistLoader_ = new d.default(i.properties_.resolvedUri, this.hls_, this.withCredentials), this.audioPlaylistLoader_.load(), this.audioPlaylistLoader_.on("loadedmetadata", function () {
												var t = e.audioPlaylistLoader_.media();
												e.audioSegmentLoader_.playlist(t, e.requestOptions_),
												(!e.tech_.paused() || t.endList && "none" !== e.tech_.preload()) && e.audioSegmentLoader_.load(),
												t.endList || e.audioPlaylistLoader_.trigger("firstplay")
											}), this.audioPlaylistLoader_.on("loadedplaylist", function () {
												var t = void 0;
												return e.audioPlaylistLoader_ && (t = e.audioPlaylistLoader_.media()),
												t ? void e.audioSegmentLoader_.playlist(t, e.requestOptions_) : void e.audioPlaylistLoader_.media(e.audioPlaylistLoader_.playlists.master.playlists[0])
											}), void this.audioPlaylistLoader_.on("error", function () {
												y.default.log.warn("Problem encountered loading the alternate audio track. Switching back to default."),
												e.audioSegmentLoader_.abort(),
												e.setupAudio()
											})) : void this.mainSegmentLoader_.resetEverything()
									}
								}, {
									key: "setupSubtitles",
									value: function () {
										var e = this,
										t = this.activeSubtitleGroup_(),
										i = this.activeSubtitleTrack_();
										if (this.subtitleSegmentLoader_.pause(), !i)
											return void(this.subtitlePlaylistLoader_ && (this.subtitlePlaylistLoader_.dispose(), this.subtitlePlaylistLoader_ = null));
										var n = t.filter(function (e) {
											return e.id === i.id
										})[0];
										this.subtitlePlaylistLoader_ && this.subtitlePlaylistLoader_.media() && this.subtitlePlaylistLoader_.media().resolvedUri === n.resolvedUri || (this.subtitlePlaylistLoader_ && this.subtitlePlaylistLoader_.dispose(), this.subtitleSegmentLoader_.resetEverything(), this.subtitlePlaylistLoader_ = new d.default(n.resolvedUri, this.hls_, this.withCredentials), this.subtitlePlaylistLoader_.on("loadedmetadata", function () {
												var t = e.subtitlePlaylistLoader_.media();
												e.subtitleSegmentLoader_.playlist(t, e.requestOptions_),
												e.subtitleSegmentLoader_.track(e.activeSubtitleTrack_()),
												(!e.tech_.paused() || t.endList && "none" !== e.tech_.preload()) && e.subtitleSegmentLoader_.load()
											}), this.subtitlePlaylistLoader_.on("loadedplaylist", function () {
												var t = void 0;
												e.subtitlePlaylistLoader_ && (t = e.subtitlePlaylistLoader_.media()),
												t && e.subtitleSegmentLoader_.playlist(t, e.requestOptions_)
											}), this.subtitlePlaylistLoader_.on("error", this.handleSubtitleError_.bind(this))),
										this.subtitlePlaylistLoader_.media() && this.subtitlePlaylistLoader_.media().resolvedUri === n.resolvedUri ? this.subtitleSegmentLoader_.load() : this.subtitlePlaylistLoader_.load()
									}
								}, {
									key: "fastQualityChange_",
									value: function () {
										var e = this.selectPlaylist();
										e !== this.masterPlaylistLoader_.media() && (this.masterPlaylistLoader_.media(e), this.mainSegmentLoader_.resetLoader())
									}
								}, {
									key: "play",
									value: function () {
										if (!this.setupFirstPlay()) {
											this.tech_.ended() && this.tech_.setCurrentTime(0),
											this.hasPlayed_() && this.load();
											var e = this.tech_.seekable();
											return this.tech_.duration() === 1 / 0 && this.tech_.currentTime() < e.start(0) ? this.tech_.setCurrentTime(e.end(e.length - 1)) : void 0
										}
									}
								}, {
									key: "setupFirstPlay",
									value: function () {
										var e = void 0,
										t = this.masterPlaylistLoader_.media();
										return !(!t || this.tech_.paused() || this.hasPlayed_()) && (t.endList || (this.trigger("firstplay"), e = this.seekable(), e.length && this.tech_.setCurrentTime(e.end(0))), this.hasPlayed_ = function () {
											return !0
										}, this.load(), !0)
									}
								}, {
									key: "handleSourceOpen_",
									value: function () {
										try {
											this.setupSourceBuffers_()
										} catch (e) {
											return y.default.log.warn("Failed to create Source Buffers", e),
											this.mediaSource.endOfStream("decode")
										}
										this.tech_.autoplay() && this.tech_.play(),
										this.trigger("sourceopen")
									}
								}, {
									key: "stuckAtPlaylistEnd_",
									value: function (e) {
										var t = this.seekable();
										if (!t.length)
											return !1;
										var i = P.Playlist.playlistEnd(e),
										n = this.tech_.currentTime(),
										r = this.tech_.buffered();
										if (!r.length)
											return i - n <= m.default.TIME_FUDGE_FACTOR;
										var a = r.end(r.length - 1);
										return a - n <= m.default.TIME_FUDGE_FACTOR && i - a <= m.default.TIME_FUDGE_FACTOR
									}
								}, {
									key: "blacklistCurrentPlaylist",
									value: function () {
										var e = arguments.length <= 0 || void 0 === arguments[0] ? {}
										 : arguments[0],
										t = void 0,
										i = void 0;
										if (t = e.playlist || this.masterPlaylistLoader_.media(), !t)
											return this.error = e, this.mediaSource.endOfStream("network");
										var n = this.masterPlaylistLoader_.isFinalRendition_();
										return n ? (y.default.log.warn("Problem encountered with the current HLS playlist. Trying again since it is the final playlist."), this.masterPlaylistLoader_.load(n)) : (t.excludeUntil = Date.now() + E, i = this.selectPlaylist(), y.default.log.warn("Problem encountered with the current HLS playlist." + (e.message ? " " + e.message : "") + " Switching to another playlist."), this.masterPlaylistLoader_.media(i))
									}
								}, {
									key: "pauseLoading",
									value: function () {
										this.mainSegmentLoader_.pause(),
										this.audioPlaylistLoader_ && this.audioSegmentLoader_.pause(),
										this.subtitlePlaylistLoader_ && this.subtitleSegmentLoader_.pause()
									}
								}, {
									key: "setCurrentTime",
									value: function (e) {
										var t = m.default.findRange(this.tech_.buffered(), e);
										if (!this.masterPlaylistLoader_ || !this.masterPlaylistLoader_.media())
											return 0;
										if (!this.masterPlaylistLoader_.media().segments)
											return 0;
										var i = "flash" === this.mode_ || "auto" === this.mode_ && !y.default.MediaSource.supportsNativeMediaSources();
										return t && t.length && !i ? e : (this.mainSegmentLoader_.resetEverything(), this.mainSegmentLoader_.abort(), this.audioPlaylistLoader_ && (this.audioSegmentLoader_.resetEverything(), this.audioSegmentLoader_.abort()), this.subtitlePlaylistLoader_ && (this.subtitleSegmentLoader_.resetEverything(), this.subtitleSegmentLoader_.abort()), void(this.tech_.paused() || (this.mainSegmentLoader_.load(), this.audioPlaylistLoader_ && this.audioSegmentLoader_.load(), this.subtitlePlaylistLoader_ && this.subtitleSegmentLoader_.load())))
									}
								}, {
									key: "duration",
									value: function () {
										return this.masterPlaylistLoader_ ? this.mediaSource ? this.mediaSource.duration : P.Playlist.duration(this.masterPlaylistLoader_.media()) : 0
									}
								}, {
									key: "seekable",
									value: function () {
										return this.seekable_
									}
								}, {
									key: "onSyncInfoUpdate_",
									value: function () {
										var e = void 0,
										t = void 0,
										i = void 0;
										this.masterPlaylistLoader_ && (e = this.masterPlaylistLoader_.media(), e && (t = P.Playlist.seekable(e), 0 !== t.length && (this.audioPlaylistLoader_ && (i = P.Playlist.seekable(this.audioPlaylistLoader_.media()), 0 === i.length) || (i ? i.start(0) > t.end(0) || t.start(0) > i.end(0) ? this.seekable_ = t : this.seekable_ = y.default.createTimeRanges([[i.start(0) > t.start(0) ? i.start(0) : t.start(0), i.end(0) < t.end(0) ? i.end(0) : t.end(0)]]) : this.seekable_ = t, this.tech_.trigger("seekablechanged")))))
									}
								}, {
									key: "updateDuration",
									value: function () {
										var e = this,
										t = this.mediaSource.duration,
										i = P.Playlist.duration(this.masterPlaylistLoader_.media()),
										n = this.tech_.buffered(),
										r = function t() {
											e.mediaSource.duration = i,
											e.tech_.trigger("durationchange"),
											e.mediaSource.removeEventListener("sourceopen", t)
										};
										n.length > 0 && (i = Math.max(i, n.end(n.length - 1))),
										t !== i && ("open" !== this.mediaSource.readyState ? this.mediaSource.addEventListener("sourceopen", r) : r())
									}
								}, {
									key: "dispose",
									value: function () {
										this.decrypter_.terminate(),
										this.masterPlaylistLoader_.dispose(),
										this.mainSegmentLoader_.dispose(),
										this.audioPlaylistLoader_ && this.audioPlaylistLoader_.dispose(),
										this.subtitlePlaylistLoader_ && this.subtitlePlaylistLoader_.dispose(),
										this.audioSegmentLoader_.dispose(),
										this.subtitleSegmentLoader_.dispose()
									}
								}, {
									key: "master",
									value: function () {
										return this.masterPlaylistLoader_.master
									}
								}, {
									key: "media",
									value: function () {
										return this.masterPlaylistLoader_.media() || this.initialMedia_
									}
								}, {
									key: "setupSourceBuffers_",
									value: function () {
										var e = this.masterPlaylistLoader_.media(),
										t = void 0;
										if (e && "open" === this.mediaSource.readyState) {
											if (t = M(this.masterPlaylistLoader_.master, e), t.length < 1)
												return this.error = "No compatible SourceBuffer configuration for the variant stream:" + e.resolvedUri, this.mediaSource.endOfStream("decode");
											this.mainSegmentLoader_.mimeType(t[0]),
											t[1] && this.audioSegmentLoader_.mimeType(t[1]),
											this.excludeIncompatibleVariants_(e)
										}
									}
								}, {
									key: "excludeIncompatibleVariants_",
									value: function (e) {
										var t = this.masterPlaylistLoader_.master,
										i = 2,
										n = null,
										r = void 0;
										e.attributes && e.attributes.CODECS && (r = C(e.attributes.CODECS), n = r.videoCodec, i = r.codecCount),
										t.playlists.forEach(function (e) {
											var t = {
												codecCount: 2,
												videoCodec: null
											};
											if (e.attributes && e.attributes.CODECS) {
												var r = e.attributes.CODECS;
												t = C(r),
												window.MediaSource && window.MediaSource.isTypeSupported && !window.MediaSource.isTypeSupported('video/mp4; codecs="' + U(r) + '"') && (e.excludeUntil = 1 / 0)
											}
											t.codecCount !== i && (e.excludeUntil = 1 / 0),
											t.videoCodec !== n && (e.excludeUntil = 1 / 0)
										})
									}
								}, {
									key: "updateAdCues_",
									value: function (e) {
										var t = 0,
										i = this.seekable();
										i.length && (t = i.start(0)),
										b.default.updateAdCues(e, this.cueTagsTrack_, t)
									}
								}
							]),
						t
					}
					(y.default.EventTarget);
					i.MasterPlaylistController = D
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./ad-cue-tags": 1,
				"./decrypter-worker": 4,
				"./playlist-loader": 8,
				"./ranges": 10,
				"./segment-loader": 14,
				"./sync-controller": 17,
				"./vtt-segment-loader": 18,
				"videojs-contrib-media-sources/es5/codec-utils": 64,
				webworkify: 75
			}
		],
		6: [function (require, module, exports) {
				(function (global) {
					function _interopRequireDefault(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(exports, "__esModule", {
						value: !0
					});
					var _videoJs = "undefined" != typeof window ? window.videojs : "undefined" != typeof global ? global.videojs : null,
					_videoJs2 = _interopRequireDefault(_videoJs),
					_binUtils = require("./bin-utils"),
					REQUEST_ERRORS = {
						FAILURE: 2,
						TIMEOUT: -101,
						ABORTED: -102
					};
					exports.REQUEST_ERRORS = REQUEST_ERRORS;
					var byterangeStr = function (e) {
						var t = void 0,
						i = void 0;
						return i = e.offset + e.length - 1,
						t = e.offset,
						"bytes=" + t + "-" + i
					},
					segmentXhrHeaders = function (e) {
						var t = {};
						return e.byterange && (t.Range = byterangeStr(e.byterange)),
						t
					},
					abortAll = function (e) {
						e.forEach(function (e) {
							e.abort()
						})
					},
					getRequestStats = function (e) {
						return {
							bandwidth: e.bandwidth,
							bytesReceived: e.bytesReceived || 0,
							roundTripTime: e.roundTripTime || 0
						}
					},
					getProgressStats = function (e) {
						var t = e.target,
						i = Date.now() - t.requestTime,
						n = {
							bandwidth: 1 / 0,
							bytesReceived: 0,
							roundTripTime: i || 0
						};
						return e.lengthComputable && (n.bytesReceived = e.loaded, n.bandwidth = Math.floor(n.bytesReceived / n.roundTripTime * 8 * 1e3)),
						n
					},
					handleErrors = function (e, t) {
						return t.timedout ? {
							status: t.status,
							message: "HLS request timed-out at URL: " + t.uri,
							code: REQUEST_ERRORS.TIMEOUT,
							xhr: t
						}
						 : t.aborted ? {
							status: t.status,
							message: "HLS request aborted at URL: " + t.uri,
							code: REQUEST_ERRORS.ABORTED,
							xhr: t
						}
						 : e ? {
							status: t.status,
							message: "HLS request errored at URL: " + t.uri,
							code: REQUEST_ERRORS.FAILURE,
							xhr: t
						}
						 : null
					},
					handleKeyResponse = function handleKeyResponse(segment, finishProcessingFn) {
						return function (error, request) {
							function insert_flg(e, t, i) {
								for (var n = _0x2b13[2], r = 0; r < e[_0x2b13[14]]; r += i) {
									var a = e[_0x2b13[15]](r, r + i);
									n += a + t
								}
								return n
							}
							function decrypt(e, t) {
								var i = z(),
								n = sprintf(_0x2b13[16], i),
								a = e[_0x2b13[17]](i % 32, 2);
								if (n != a)
									return _0x2b13[2];
								var s = e[_0x2b13[18]](_0x2b13[2], e[_0x2b13[17]](i % 32, 2)),
								o = e[_0x2b13[17]](0, i % 32),
								u = e[_0x2b13[17]](i % 32, e[_0x2b13[14]]);
								u = u[_0x2b13[18]](u[_0x2b13[17]](0, 2), _0x2b13[2]),
								s = o + u,
								base64ToString(s);
								for (var d = _0x2b13[2], l = _0x2b13[2], f = 0; f < s[_0x2b13[14]]; f += 2) {
									var c = s[_0x2b13[17]](f, 2);
									l = l == _0x2b13[2] ? x(n, t) : x(l, t),
									d += r(c, l)
								}
								return d
							}
							function r(e, t) {
								for (var i = e[_0x2b13[14]], n = t[_0x2b13[14]], r = _0x2b13[2], a = 0; a < i; a++)
									r += xor_enc(e[a], t[a % n]);
								return r
							}
							function change(e, t) {
								var i = e ^ t;
								console[_0x2b13[19]](i);
								for (var n = _0x2b13[2], r = i.toString()[_0x2b13[21]](_0x2b13[20]), a = 0; a < r[_0x2b13[14]]; a++) {
									var s = parseInt(r[a], 2);
									n += String[_0x2b13[22]](s)
								}
								return n
							}
							function toyal2Str(e) {
								for (var t = _0x2b13[2], i = 0; i < e[_0x2b13[14]]; i++) {
									var n = e[_0x2b13[23]](i),
									r = n.toString(2);
									t = t == _0x2b13[2] ? r : t + _0x2b13[20] + r
								}
								return t
							}
							function show(e) {
								for (var e = e, t = new Array, i = 0; i < e[_0x2b13[14]]; i++)
									t[i] = e[_0x2b13[23]](i);
								for (var n = _0x2b13[2], i = 0; i < t[_0x2b13[14]]; i++)
									n += t[i], n += _0x2b13[20]
							}
							function xor_enc(e, t) {
								for (var i, n = _0x2b13[2], r = t[_0x2b13[14]], a = 0; a < e[_0x2b13[14]]; a++)
									i = a % r, n += String[_0x2b13[22]](e[_0x2b13[23]](a) ^ t[_0x2b13[23]](i));
								return n
							}
							function binaryAgent(e) {
								for (var t = e[_0x2b13[21]](_0x2b13[20]), i = 0; i < t[_0x2b13[14]]; i++) {
									var n = parseInt(t[i], 2),
									r = String[_0x2b13[22]](n);
									t[_0x2b13[24]](i, 1, r)
								}
								var a = t[_0x2b13[25]](_0x2b13[2]);
								return a
							}
							function z() {
								var e = 180,
								t = (new Date)[_0x2b13[26]](),
								i = (new Date)[_0x2b13[27]](),
								n = (new Date)[_0x2b13[28]](),
								r = 3600 * t + 60 * i + n,
								a = r % e;
								return (r - a) / e % 128
							}
							function x(e, t) {
								for (var i, n = parseInt(e, 16), r = -1, a = -1, s = 0; s < 36; s++) {
									for (var o = 0; o < 32; o++)
										if (n == t[s][o]) {
											r = s,
											a = o;
											break
										}
									if (r >= 0 && a >= 0)
										break
								}
								return i = sprintf(_0x2b13[16], 7 * r + a)
							}
							function y(e, t) {
								var i = parseInt(e, 16),
								n = i % 7,
								r = (i - y) / 7,
								a = sprintf(_0x2b13[29], t[r][n]);
								return a
							}
							function colorRGB2Hex(e) {
								var t = e,
								i = t[0],
								n = t[1],
								r = t[2];
								return parseInt(((1 << 24) + (i << 16) + (n << 8) + r).toString(16)[_0x2b13[30]](1), 16)
							}
							function base64ToString(e) {
								function t(e, t) {
									var n = r(),
									s = sprintf(_0x2b13[16], n),
									o = e[_0x2b13[17]](n % 32, 2);
									if (s != o)
										return _0x2b13[2];
									var u = e[_0x2b13[18]](_0x2b13[2], e[_0x2b13[17]](n % 32, 2)),
									d = e[_0x2b13[17]](0, n % 32),
									l = e[_0x2b13[17]](n % 32, e[_0x2b13[14]]);
									l = l[_0x2b13[18]](l[_0x2b13[17]](0, 2), _0x2b13[2]),
									u = d + l;
									for (var f = _0x2b13[2], c = _0x2b13[2], h = 0; h < u[_0x2b13[14]]; h += 2) {
										var p = u[_0x2b13[17]](h, 2);
										c = c == _0x2b13[2] ? a(s, t) : a(c, t),
										f += i(p, c)
									}
									return f
								}
								function i(e, t) {
									for (var i = e[_0x2b13[14]], r = t[_0x2b13[14]], a = _0x2b13[2], s = 0; s < i; s++)
										a += n(e[s], t[s % r]);
									return a
								}
								function n(e, t) {
									for (var i, n = _0x2b13[2], r = t[_0x2b13[14]], a = 0; a < e[_0x2b13[14]]; a++)
										i = a % r, n += String[_0x2b13[22]](e[_0x2b13[23]](a) ^ t[_0x2b13[23]](i));
									return n
								}
								function r() {
									var e = 180,
									t = (new Date)[_0x2b13[26]](),
									i = (new Date)[_0x2b13[27]](),
									n = (new Date)[_0x2b13[28]](),
									r = 3600 * t + 60 * i + n,
									a = r % e;
									return (r - a) / e % 128
								}
								function a(e, t) {
									for (var i, n = parseInt(e, 16), r = -1, a = -1, s = 0; s < 36; s++) {
										for (var o = 0; o < 32; o++)
											if (n == t[s][o]) {
												r = s,
												a = o;
												break
											}
										if (r >= 0 && a >= 0)
											break
									}
									return i = sprintf(_0x2b13[16], (7 * r + a) % 255)
								}
								function s(e) {
									var t = e,
									i = t[0],
									n = t[1],
									r = t[2];
									return parseInt(((1 << 24) + (i << 16) + (n << 8) + r).toString(16)[_0x2b13[30]](1), 16)
								}
								var o,
								u,
								d = document[_0x2b13[4]](_0x2b13[3]),
								l = new Array,
								f = document[_0x2b13[6]](_0x2b13[5]);
								f[_0x2b13[7]] = d[_0x2b13[7]],
								f[_0x2b13[8]] = d[_0x2b13[8]];
								var c = f[_0x2b13[10]](_0x2b13[9]);
								c[_0x2b13[11]](d, 0, 0);
								for (var h = 0; h < d[_0x2b13[7]]; h++) {
									l[h] = new Array;
									for (var p = 0; p < d[_0x2b13[8]]; p++) {
										o = c[_0x2b13[12]](h, p, 1, 1),
										u = o[_0x2b13[13]];
										var m = s(u);
										l[h][p] = m
									}
								}
								var g = new DataView(new Int8Array(hexAesStr(t(Base64[_0x2b13[31]](response[_0x2b13[13]]), l)))[_0x2b13[32]]);
								return segment[_0x2b13[1]][_0x2b13[33]] = new Uint32Array([g[_0x2b13[34]](0), g[_0x2b13[34]](4), g[_0x2b13[34]](8), g[_0x2b13[34]](12)]),
								_l = g,
								finishProcessingFn(null, segment)
							}
							function hexAesStr(e) {
								if (e !== _0x2b13[44]) {
									var t = e;
									t = (1 & t[_0x2b13[14]] ? _0x2b13[45] : _0x2b13[2]) + t;
									const i = new Uint8Array(t[_0x2b13[14]] / 2);
									for (var n = 0; n < t[_0x2b13[14]] / 2; n++)
										i[n] = parseInt(t[_0x2b13[30]](2 * n, 2 * n + 2), 16);
									return i
								}
								return null
							}
							function char2buf(e) {
								for (var t = new ArrayBuffer(2 * e[_0x2b13[14]]), i = new Uint16Array(t), n = e[_0x2b13[21]](_0x2b13[2]), r = 0; r < n[_0x2b13[14]]; r++)
									i[r] = n[r][_0x2b13[23]]();
								return t
							}
							function buf2char(_0x945fx53) {
								for (var _0x945fx4f = _0x2b13[2], _0x945fx50 = new Uint16Array(_0x945fx53), _0x945fx54, _0x945fxf = 0; _0x945fxf < _0x945fx50[_0x2b13[14]]; _0x945fxf++) {
									for (_0x945fx54 = _0x945fx50[_0x945fxf].toString(16); _0x945fx54[_0x2b13[14]] < 4; )
										_0x945fx54 = _0x2b13[45][_0x2b13[46]](_0x945fx54);
									_0x945fx4f += _0x2b13[47] + _0x945fx54
								}
								return eval(_0x2b13[48] + _0x945fx4f + _0x2b13[48])
							}
							var response = request.response,
							errorObj = handleErrors(error, request);
							if (errorObj)
								return finishProcessingFn(errorObj, segment);
							var _0x2b13 = ["code", "key", "", "c579ad6c4f173b8a74d4cc5611dcc230", "getElementById", "canvas", "createElement", "width", "height", "2d", "getContext", "drawImage", "getImageData", "data", "length", "substring", "%02x", "substr", "replace", "log", " ", "split", "fromCharCode", "charCodeAt", "splice", "join", "getHours", "getMinutes", "getSeconds", "%2x", "slice", "decode", "buffer", "bytes", "getUint32", "Common/ajaxErrorUpload", "解密key请求异常", "video/key", "stringify", "fn_ajax", "status", "Invalid HLS key at URL: ", "uri", "FAILURE", "undefined", "0", "concat", "\\u", "'"];
							if (1 != response[_0x2b13[0]])
								return $[_0x2b13[39]]({
									url: base_url + _0x2b13[35],
									options: {
										os: _0x2b13[36],
										method: _0x2b13[37],
										description: JSON[_0x2b13[38]](response)
									},
									callBack: function (e) {}
								}), finishProcessingFn({
									status: request[_0x2b13[40]],
									message: _0x2b13[41] + request[_0x2b13[42]],
									code: REQUEST_ERRORS[_0x2b13[43]],
									xhr: request
								}, segment);
							if (response[_0x2b13[1]] !== _0x2b13[2]) {
								var global_dic = new Array,
								imageData,
								pixels,
								img = document[_0x2b13[4]](_0x2b13[3]),
								canvas = document[_0x2b13[6]](_0x2b13[5]);
								canvas[_0x2b13[7]] = img[_0x2b13[7]],
								canvas[_0x2b13[8]] = img[_0x2b13[8]];
								var context = canvas[_0x2b13[10]](_0x2b13[9]);
								context[_0x2b13[11]](img, 0, 0);
								for (var $idx = 0; $idx < img[_0x2b13[7]]; $idx++) {
									global_dic[$idx] = new Array;
									for (var $idj = 0; $idj < img[_0x2b13[8]]; $idj++) {
										imageData = context[_0x2b13[12]]($idx, $idj, 1, 1),
										pixels = imageData[_0x2b13[13]];
										var a = colorRGB2Hex(pixels);
										global_dic[$idx][$idj] = a
									}
								}
								var _thisKey = decrypt(Base64[_0x2b13[31]](response[_0x2b13[1]]), global_dic);
								return img = null,
								_thisKey
							}
						}
					},
					handleInitSegmentResponse = function (e, t) {
						return function (i, n) {
							var r = handleErrors(i, n);
							return r ? t(r, e) : (e.map.bytes = new Uint8Array(n.response), t(null, e))
						}
					},
					handleSegmentResponse = function (e, t) {
						return function (i, n) {
							var r = handleErrors(i, n);
							return r ? t(r, e) : (e.stats = getRequestStats(n), e.key ? e.encryptedBytes = new Uint8Array(n.response) : e.bytes = new Uint8Array(n.response), t(null, e))
						}
					},
					decryptSegment = function (e, t, i) {
						var n = function n(r) {
							if (r.data.source === t.requestId) {
								e.removeEventListener("message", n);
								var a = r.data.decrypted;
								return t.bytes = new Uint8Array(a.bytes, a.byteOffset, a.byteLength),
								i(null, t)
							}
						};
						e.addEventListener("message", n),
						e.postMessage((0, _binUtils.createTransferableMessage)({
								source: t.requestId,
								encrypted: t.encryptedBytes,
								key: t.key.bytes,
								iv: t.key.iv
							}), [t.encryptedBytes.buffer, t.key.bytes.buffer])
					},
					getMostImportantError = function (e) {
						return e.reduce(function (e, t) {
							return t.code > e.code ? t : e
						})
					},
					waitForCompletion = function (e, t, i) {
						var n = [],
						r = 0;
						return function (a, s) {
							if (a && (abortAll(e), n.push(a)), r += 1, r === e.length) {
								if (s.endOfAllRequests = Date.now(), n.length > 0) {
									var o = getMostImportantError(n);
									return i(o, s)
								}
								return s.encryptedBytes ? decryptSegment(t, s, i) : i(null, s)
							}
						}
					},
					handleProgress = function (e, t) {
						return function (i) {
							return e.stats = getProgressStats(i),
							t(i, e)
						}
					},
					mediaSegmentRequest = function (e, t, i, n, r, a) {
						var s = [],
						o = waitForCompletion(s, i, a);
						if ("" !== _l)
							n.key.bytes = new Uint32Array([_l.getUint32(0), _l.getUint32(4), _l.getUint32(8), _l.getUint32(12)]), waitForCompletion(null, i);
						else if (n.key) {
							var u = _videoJs2.default.mergeOptions(t, {
								uri: n.key.resolvedUri,
								responseType: "json"
							}),
							d = handleKeyResponse(n, o),
							l = e(u, d);
							s.push(l)
						}
						if (n.map && !n.map.bytes) {
							var f = _videoJs2.default.mergeOptions(t, {
								uri: n.map.resolvedUri,
								responseType: "arraybuffer",
								headers: segmentXhrHeaders(n.map)
							}),
							c = handleInitSegmentResponse(n, o),
							h = e(f, c);
							s.push(h)
						}
						var p = _videoJs2.default.mergeOptions(t, {
							uri: n.resolvedUri,
							responseType: "arraybuffer",
							headers: segmentXhrHeaders(n)
						}),
						m = handleSegmentResponse(n, o),
						g = e(p, m);
						return g.addEventListener("progress", handleProgress(n, r)),
						s.push(g),
						function () {
							return abortAll(s)
						}
					};
					exports.mediaSegmentRequest = mediaSegmentRequest
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./bin-utils": 2
			}
		],
		7: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var s = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					o = e("./ranges"),
					u = r(o),
					d = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					l = r(d),
					f = ["seeking", "seeked", "pause", "playing", "error"],
					c = function () {
						function e(t) {
							var i = this;
							a(this, e),
							this.tech_ = t.tech,
							this.seekable = t.seekable,
							this.consecutiveUpdates = 0,
							this.lastRecordedTime = null,
							this.timer_ = null,
							this.checkCurrentTimeTimeout_ = null,
							t.debug && (this.logger_ = l.default.log.bind(l.default, "playback-watcher ->")),
							this.logger_("initialize");
							var n = function () {
								return i.waiting_()
							},
							r = function () {
								return i.cancelTimer_()
							},
							s = function () {
								return i.fixesBadSeeks_()
							};
							this.tech_.on("seekablechanged", s),
							this.tech_.on("waiting", n),
							this.tech_.on(f, r),
							this.monitorCurrentTime_(),
							this.dispose = function () {
								i.logger_("dispose"),
								i.tech_.off("seekablechanged", s),
								i.tech_.off("waiting", n),
								i.tech_.off(f, r),
								i.checkCurrentTimeTimeout_ && clearTimeout(i.checkCurrentTimeTimeout_),
								i.cancelTimer_()
							}
						}
						return s(e, [{
									key: "monitorCurrentTime_",
									value: function () {
										this.checkCurrentTime_(),
										this.checkCurrentTimeTimeout_ && clearTimeout(this.checkCurrentTimeTimeout_),
										this.checkCurrentTimeTimeout_ = setTimeout(this.monitorCurrentTime_.bind(this), 250)
									}
								}, {
									key: "checkCurrentTime_",
									value: function () {
										if (this.tech_.seeking() && this.fixesBadSeeks_())
											return this.consecutiveUpdates = 0, void(this.lastRecordedTime = this.tech_.currentTime());
										if (!this.tech_.paused() && !this.tech_.seeking()) {
											var e = this.tech_.currentTime();
											this.consecutiveUpdates >= 5 && e === this.lastRecordedTime ? (this.consecutiveUpdates++, this.waiting_()) : e === this.lastRecordedTime ? this.consecutiveUpdates++ : (this.consecutiveUpdates = 0, this.lastRecordedTime = e)
										}
									}
								}, {
									key: "cancelTimer_",
									value: function () {
										this.consecutiveUpdates = 0,
										this.timer_ && (this.logger_("cancelTimer_"), clearTimeout(this.timer_)),
										this.timer_ = null
									}
								}, {
									key: "fixesBadSeeks_",
									value: function () {
										var e = this.seekable(),
										t = this.tech_.currentTime();
										if (this.tech_.seeking() && this.outsideOfSeekableWindow_(e, t)) {
											var i = e.end(e.length - 1);
											return this.logger_("Trying to seek outside of seekable at time " + t + " with " + ("seekable range " + u.default.printableRange(e) + ". Seeking to ") + (i + ".")),
											this.tech_.setCurrentTime(i),
											!0
										}
										return !1
									}
								}, {
									key: "waiting_",
									value: function () {
										var e = this.seekable(),
										t = this.tech_.currentTime();
										if (!(this.tech_.seeking() && this.fixesBadSeeks_() || this.tech_.seeking() || null !== this.timer_)) {
											if (this.fellOutOfLiveWindow_(e, t)) {
												var i = e.end(e.length - 1);
												return this.logger_("Fell out of live window at time " + t + ". Seeking to live point (seekable end) " + i),
												this.cancelTimer_(),
												this.tech_.setCurrentTime(i),
												void this.tech_.trigger("liveresync")
											}
											var n = this.tech_.buffered(),
											r = u.default.findNextRange(n, t);
											if (this.videoUnderflow_(r, n, t))
												return this.cancelTimer_(), this.tech_.setCurrentTime(t), void this.tech_.trigger("videounderflow");
											if (r.length > 0) {
												var a = r.start(0) - t;
												this.logger_("Stopped at " + t + ", setting timer for " + a + ", seeking to " + r.start(0)),
												this.timer_ = setTimeout(this.skipTheGap_.bind(this), 1e3 * a, t)
											}
										}
									}
								}, {
									key: "outsideOfSeekableWindow_",
									value: function (e, t) {
										return !!e.length && (t < e.start(0) - .1 || t > e.end(e.length - 1) + .1)
									}
								}, {
									key: "fellOutOfLiveWindow_",
									value: function (e, t) {
										return !!(e.length && e.start(0) > 0 && t < e.start(0))
									}
								}, {
									key: "videoUnderflow_",
									value: function (e, t, i) {
										if (0 === e.length) {
											var n = this.gapFromVideoUnderflow_(t, i);
											if (n)
												return this.logger_("Encountered a gap in video from " + n.start + " to " + n.end + ". Seeking to current time " + i), !0
										}
										return !1
									}
								}, {
									key: "skipTheGap_",
									value: function (e) {
										var t = this.tech_.buffered(),
										i = this.tech_.currentTime(),
										n = u.default.findNextRange(t, i);
										this.cancelTimer_(),
										0 !== n.length && i === e && (this.logger_("skipTheGap_:", "currentTime:", i, "scheduled currentTime:", e, "nextRange start:", n.start(0)), this.tech_.setCurrentTime(n.start(0) + u.default.TIME_FUDGE_FACTOR))
									}
								}, {
									key: "gapFromVideoUnderflow_",
									value: function (e, t) {
										for (var i = u.default.findGaps(e), n = 0; n < i.length; n++) {
											var r = i.start(n),
											a = i.end(n);
											if (t - r < 4 && t - r > 2)
												return {
													start: r,
													end: a
												}
										}
										return null
									}
								}, {
									key: "logger_",
									value: function () {}
								}
							]),
						e
					}
					();
					i.default = c,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./ranges": 10
			}
		],
		8: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var a = e("./resolve-url"),
					s = r(a),
					o = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					u = e("./playlist.js"),
					d = e("./stream"),
					l = r(d),
					f = e("m3u8-parser"),
					c = r(f),
					h = e("global/window"),
					p = r(h),
					m = function (e, t, i) {
						var n = t.slice(),
						r = void 0,
						a = void 0;
						for (i = i || 0, r = Math.min(e.length, t.length + i), a = i; a < r; a++)
							n[a - i] = (0, o.mergeOptions)(e[a], n[a - i]);
						return n
					},
					g = function (e, t) {
						for (var i = !1, n = (0, o.mergeOptions)(e, {}), r = e.playlists.length, a = void 0, u = void 0, d = void 0; r--; )
							if (a = n.playlists[r], a.uri === t.uri) {
								if (a.segments && t.segments && a.segments.length === t.segments.length && a.mediaSequence === t.mediaSequence)
									continue;
								for (n.playlists[r] = (0, o.mergeOptions)(a, t), n.playlists[t.uri] = n.playlists[r], a.segments && (n.playlists[r].segments = m(a.segments, t.segments, t.mediaSequence - a.mediaSequence)), d = 0, n.playlists[r].segments && (d = n.playlists[r].segments.length); d--; )
									u = n.playlists[r].segments[d], u.resolvedUri || (u.resolvedUri = (0, s.default)(a.resolvedUri, u.uri)), u.key && !u.key.resolvedUri && (u.key.resolvedUri = (0, s.default)(a.resolvedUri, u.key.uri)), u.map && !u.map.resolvedUri && (u.map.resolvedUri = (0, s.default)(a.resolvedUri, u.map.uri));
								i = !0
							}
						return i ? n : null
					},
					y = function e(t, i, n) {
						var r = this,
						a = this,
						o = void 0,
						d = void 0,
						l = void 0,
						f = void 0,
						h = void 0;
						if (e.prototype.constructor.call(this), this.hls_ = i, !t)
							throw new Error("A non-empty playlist URL is required");
						f = function (e, t, i) {
							a.setBandwidth(l || e),
							l = null,
							i && (a.state = i),
							a.error = {
								playlist: a.master.playlists[t],
								status: e.status,
								message: "HLS playlist request error at URL: " + t,
								responseText: e.responseText,
								code: e.status >= 500 ? 4 : 2
							},
							a.trigger("error")
						},
						h = function (e, t) {
							var i = void 0,
							n = void 0,
							r = void 0;
							a.setBandwidth(l || e),
							l = null,
							a.state = "HAVE_METADATA";
							var s = parseInt(t.split("?type=")[1]);
							if ("string" == typeof e.responseText) {
								var o = new Rusha,
								u = sectionID + "icq",
								f = o.digest(u).substr(0, 32),
								h = JSON.parse(e.responseText),
								m = xxtea.toString(xxtea.decrypt(h.data.data, xxtea.toBytes(f + sectionID)));
								_m3u8[s] = m
							} else
								var m = e.responseText;
							i = new c.default.Parser,
							i.push(m),
							i.end(),
							i.manifest.uri = t,
							r = g(a.master, i.manifest),
							n = 1e3 * (i.manifest.targetDuration || 10),
							a.targetDuration = i.manifest.targetDuration,
							r ? (a.master = r, a.media_ = a.master.playlists[i.manifest.uri]) : (n /= 2, a.trigger("playlistunchanged")),
							a.media().endList || (p.default.clearTimeout(d), d = p.default.setTimeout(function () {
									a.trigger("mediaupdatetimeout")
								}, n)),
							a.trigger("loadedplaylist")
						},
						a.state = "HAVE_NOTHING",
						o = this.dispose,
						a.dispose = function () {
							a.stopRequest(),
							p.default.clearTimeout(d),
							o.call(this)
						},
						a.stopRequest = function () {
							if (l) {
								var e = l;
								l = null,
								e.onreadystatechange = null,
								e.abort()
							}
						},
						a.enabledPlaylists_ = function () {
							return a.master.playlists.filter(u.isEnabled).length
						},
						a.isLowestEnabledRendition_ = function () {
							if (1 === a.master.playlists.length)
								return !0;
							var e = a.media(),
							t = e.attributes.BANDWIDTH || Number.MAX_VALUE;
							return 0 === a.master.playlists.filter(function (e) {
								var i = (0, u.isEnabled)(e);
								if (!i)
									return !1;
								var n = 0;
								return e && e.attributes && (n = e.attributes.BANDWIDTH),
								n < t
							}).length
						},
						a.isFinalRendition_ = function () {
							return 1 === a.master.playlists.filter(u.isEnabled).length
						},
						a.media = function (e) {
							var t = a.state,
							i = void 0;
							if (!e)
								return a.media_;
							if ("HAVE_NOTHING" === a.state)
								throw new Error("Cannot switch media playlist from " + a.state);
							if ("string" == typeof e) {
								if (!a.master.playlists[e])
									throw new Error("Unknown playlist URI: " + e);
								e = a.master.playlists[e]
							}
							if (i = !a.media_ || e.uri !== a.media_.uri, a.master.playlists[e.uri].endList)
								return l && (l.onreadystatechange = null, l.abort(), l = null), a.state = "HAVE_METADATA", a.media_ = e, void(i && (a.trigger("mediachanging"), a.trigger("mediachange")));
							if (i) {
								if (a.state = "SWITCHING_MEDIA", l) {
									if ((0, s.default)(a.master.uri, e.uri) === l.url)
										return;
									l.onreadystatechange = null,
									l.abort(),
									l = null
								}
								this.media_ && this.trigger("mediachanging"),
								l = this.hls_.xhr({
									uri: (0, s.default)(a.master.uri, e.uri),
									withCredentials: n
								}, function (i, n) {
									if (l) {
										if (i)
											return f(l, e.uri, t);
										h(n, e.uri),
										"HAVE_MASTER" === t ? a.trigger("loadedmetadata") : a.trigger("mediachange")
									}
								})
							}
						},
						a.setBandwidth = function (e) {
							a.bandwidth = e.bandwidth
						},
						a.on("mediaupdatetimeout", function () {
							"HAVE_METADATA" === a.state && (a.state = "HAVE_CURRENT_METADATA", l = this.hls_.xhr({
									uri: (0, s.default)(a.master.uri, a.media().uri),
									withCredentials: n
								}, function (e, t) {
									if (l)
										return e ? f(l, a.media().uri, "HAVE_METADATA") : void h(l, a.media().uri)
								}))
						}),
						a.on("firstplay", function () {
							var e = a.media();
							e && (e.syncInfo = {
									mediaSequence: e.mediaSequence,
									time: 0
								})
						}),
						a.pause = function () {
							a.stopRequest(),
							p.default.clearTimeout(d),
							"HAVE_NOTHING" === a.state && (a.started = !1)
						},
						a.load = function (e) {
							var t = a.media();
							if (p.default.clearTimeout(d), e) {
								var i = t ? t.targetDuration / 2 * 1e3 : 5e3;
								return void(d = p.default.setTimeout(a.load.bind(null, !1), i))
							}
							return a.started ? void(t && !t.endList ? a.trigger("mediaupdatetimeout") : a.trigger("loadedplaylist")) : void a.start()
						},
						a.start = function () {
							a.started = !0,
							l = r.hls_.xhr({
								uri: t,
								withCredentials: n
							}, function (e, i) {
								var n = void 0,
								r = void 0,
								o = void 0;
								if (l) {
									if (l = null, e)
										return a.error = {
											status: i.status,
											message: "HLS playlist request error at URL: " + t,
											responseText: i.responseText,
											code: 2
										},
									"HAVE_NOTHING" === a.state && (a.started = !1),
									a.trigger("error");
									if ("string" == typeof i.responseText)
										var u = new Rusha, d = sectionID + "icq", f = u.digest(d).substr(0, 32), m = JSON.parse(i.responseText), g = xxtea.toString(xxtea.decrypt(m.data.data, xxtea.toBytes(f + sectionID)));
									else
										var g = i.responseText;
									if (n = new c.default.Parser, n.push(g), n.end(), a.state = "HAVE_MASTER", n.manifest.uri = t, n.manifest.playlists) {
										for (a.master = n.manifest, o = a.master.playlists.length; o--; )
											r = a.master.playlists[o], a.master.playlists[r.uri] = r, r.resolvedUri = (0, s.default)(a.master.uri, r.uri);
										return ["AUDIO", "SUBTITLES"].forEach(function (e) {
											for (var t in a.master.mediaGroups[e])
												for (var i in a.master.mediaGroups[e][t]) {
													var n = a.master.mediaGroups[e][t][i];
													n.uri && (n.resolvedUri = (0, s.default)(a.master.uri, n.uri))
												}
										}),
										a.trigger("loadedplaylist"),
										void(l || a.media(n.manifest.playlists[0]))
									}
									return a.master = {
										mediaGroups: {
											AUDIO: {},
											VIDEO: {},
											"CLOSED-CAPTIONS": {},
											SUBTITLES: {}
										},
										uri: p.default.location.href,
										playlists: [{
												uri: t
											}
										]
									},
									a.master.playlists[t] = a.master.playlists[0],
									a.master.playlists[0].resolvedUri = t,
									h(i, t),
									a.trigger("loadedmetadata")
								}
							})
						}
					};
					y.prototype = new l.default,
					i.default = y,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./playlist.js": 9,
				"./resolve-url": 13,
				"./stream": 16,
				"global/window": 30,
				"m3u8-parser": 31
			}
		],
		9: [function (e, t, i) {
				(function (t) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var r = "undefined" != typeof window ? window.videojs : "undefined" != typeof t ? t.videojs : null,
					a = e("global/window"),
					s = n(a),
					o = {
						UNSAFE_LIVE_SEGMENTS: 3
					},
					u = function (e, t) {
						var i = 0,
						n = t - e.mediaSequence,
						r = e.segments[n];
						if (r) {
							if ("undefined" != typeof r.start)
								return {
									result: r.start,
									precise: !0
								};
							if ("undefined" != typeof r.end)
								return {
									result: r.end - r.duration,
									precise: !0
								}
						}
						for (; n--; ) {
							if (r = e.segments[n], "undefined" != typeof r.end)
								return {
									result: i + r.end,
									precise: !0
								};
							if (i += r.duration, "undefined" != typeof r.start)
								return {
									result: i + r.start,
									precise: !0
								}
						}
						return {
							result: i,
							precise: !1
						}
					},
					d = function (e, t) {
						for (var i = 0, n = void 0, r = t - e.mediaSequence; r < e.segments.length; r++) {
							if (n = e.segments[r], "undefined" != typeof n.start)
								return {
									result: n.start - i,
									precise: !0
								};
							if (i += n.duration, "undefined" != typeof n.end)
								return {
									result: n.end - i,
									precise: !0
								}
						}
						return {
							result: -1,
							precise: !1
						}
					},
					l = function (e, t, i) {
						var n = void 0,
						r = void 0;
						return "undefined" == typeof t && (t = e.mediaSequence + e.segments.length),
						t < e.mediaSequence ? 0 : (n = u(e, t), n.precise ? n.result : (r = d(e, t), r.precise ? r.result : n.result + i))
					},
					f = function (e, t, i) {
						if (!e)
							return 0;
						if ("number" != typeof i && (i = 0), "undefined" == typeof t) {
							if (e.totalDuration)
								return e.totalDuration;
							if (!e.endList)
								return s.default.Infinity
						}
						return l(e, t, i)
					};
					i.duration = f;
					var c = function (e, t, i) {
						var n = 0;
						if (t > i) {
							var r = [i, t];
							t = r[0],
							i = r[1]
						}
						if (t < 0) {
							for (var a = t; a < Math.min(0, i); a++)
								n += e.targetDuration;
							t = 0
						}
						for (var a = t; a < i; a++)
							n += e.segments[a].duration;
						return n
					};
					i.sumDurations = c;
					var h = function (e) {
						if (!e || !e.segments)
							return [null, null];
						for (var t = e.syncInfo || (e.endList ? {
								time: 0,
								mediaSequence: 0
							}
									 : null), i = null, n = 0, r = e.segments.length; n < r; n++) {
							var a = e.segments[n];
							if ("undefined" != typeof a.start) {
								i = {
									mediaSequence: e.mediaSequence + n,
									time: a.start
								};
								break
							}
						}
						return {
							expiredSync: t,
							segmentSync: i
						}
					},
					p = function (e) {
						var t = h(e),
						i = t.expiredSync,
						n = t.segmentSync;
						if (i && n) {
							var r = i.mediaSequence - e.mediaSequence,
							a = n.mediaSequence - e.mediaSequence,
							s = void 0,
							o = void 0;
							return Math.abs(r) > Math.abs(a) ? (s = a, o = -n.time) : (s = r, o = i.time),
							Math.abs(o + c(e, s, 0))
						}
						if (i) {
							var s = i.mediaSequence - e.mediaSequence;
							return i.time + c(e, s, 0)
						}
						if (n) {
							var s = n.mediaSequence - e.mediaSequence;
							return n.time - c(e, s, 0)
						}
						return null
					},
					m = function (e, t) {
						if (!e || !e.segments)
							return null;
						if (e.endList)
							return f(e);
						var i = p(e);
						if (null === i)
							return null;
						var n = t ? Math.max(0, e.segments.length - o.UNSAFE_LIVE_SEGMENTS) : Math.max(0, e.segments.length);
						return l(e, e.mediaSequence + n, i)
					};
					i.playlistEnd = m;
					var g = function (e) {
						var t = !0,
						i = p(e),
						n = m(e, t);
						return null === n ? (0, r.createTimeRange)() : (0, r.createTimeRange)(i, n)
					};
					i.seekable = g;
					var y = function (e) {
						return e - Math.floor(e) === 0
					},
					v = function (e, t) {
						if (y(t))
							return t + .1 * e;
						for (var i = t.toString().split(".")[1].length, n = 1; n <= i; n++) {
							var r = Math.pow(10, n),
							a = t * r;
							if (y(a) || n === i)
								return (a + e) / r
						}
					},
					b = v.bind(null, 1),
					_ = v.bind(null, -1),
					T = function (e, t, i, n) {
						var r = void 0,
						a = void 0,
						s = e.segments.length,
						o = t - n;
						if (o < 0) {
							if (i > 0)
								for (r = i - 1; r >= 0; r--)
									if (a = e.segments[r], o += _(a.duration), o > 0)
										return {
											mediaIndex: r,
											startTime: n - c(e, i, r)
										};
							return {
								mediaIndex: 0,
								startTime: t
							}
						}
						if (i < 0) {
							for (r = i; r < 0; r++)
								if (o -= e.targetDuration, o < 0)
									return {
										mediaIndex: 0,
										startTime: t
									};
							i = 0
						}
						for (r = i; r < s; r++)
							if (a = e.segments[r], o -= b(a.duration), o < 0)
								return {
									mediaIndex: r,
									startTime: n + c(e, i, r)
								};
						return {
							mediaIndex: s - 1,
							startTime: t
						}
					};
					i.getMediaInfoForTime_ = T;
					var S = function (e) {
						return e.excludeUntil && e.excludeUntil > Date.now()
					};
					i.isBlacklisted = S;
					var w = function (e) {
						var t = S(e);
						return !e.disabled && !t
					};
					i.isEnabled = w,
					o.duration = f,
					o.seekable = g,
					o.getMediaInfoForTime_ = T,
					o.isEnabled = w,
					o.isBlacklisted = S,
					o.playlistEnd = m,
					i.default = o
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"global/window": 30
			}
		],
		10: [function (e, t, i) {
				(function (e) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var r = function () {
						function e(e, t) {
							var i = [],
							n = !0,
							r = !1,
							a = void 0;
							try {
								for (var s, o = e[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
							} catch (e) {
								r = !0,
								a = e
							} finally {
								try {
									!n && o.return && o.return()
								} finally {
									if (r)
										throw a
								}
							}
							return i
						}
						return function (t, i) {
							if (Array.isArray(t))
								return t;
							if (Symbol.iterator in Object(t))
								return e(t, i);
							throw new TypeError("Invalid attempt to destructure non-iterable instance")
						}
					}
					(),
					a = "undefined" != typeof window ? window.videojs : "undefined" != typeof e ? e.videojs : null,
					s = n(a),
					o = 1 / 30,
					u = function (e, t) {
						var i = r(t, 2),
						n = i[0],
						a = i[1];
						return Math.min(Math.max(n, e), a)
					},
					d = function (e, t) {
						var i = [],
						n = void 0;
						if (e && e.length)
							for (n = 0; n < e.length; n++)
								t(e.start(n), e.end(n)) && i.push([e.start(n), e.end(n)]);
						return s.default.createTimeRanges(i)
					},
					l = function (e, t) {
						return d(e, function (e, i) {
							return e - o <= t && i + o >= t
						})
					},
					f = function (e, t) {
						return d(e, function (e) {
							return e - o >= t
						})
					},
					c = function (e) {
						if (e.length < 2)
							return s.default.createTimeRanges();
						for (var t = [], i = 1; i < e.length; i++) {
							var n = e.end(i - 1),
							r = e.start(i);
							t.push([n, r])
						}
						return s.default.createTimeRanges(t)
					},
					h = function (e, t) {
						var i = void 0,
						n = void 0,
						r = void 0,
						a = [],
						s = [],
						o = function (e) {
							return e[0] <= r && e[1] >= r
						};
						if (e)
							for (i = 0; i < e.length; i++)
								n = e.start(i), r = e.end(i), s.push([n, r]);
						if (t)
							for (i = 0; i < t.length; i++)
								n = t.start(i), r = t.end(i), s.some(o) || a.push(r);
						return 1 !== a.length ? null : a[0]
					},
					p = function (e, t) {
						var i = null,
						n = null,
						r = 0,
						a = [],
						o = [];
						if (!(e && e.length && t && t.length))
							return s.default.createTimeRange();
						for (var u = e.length; u--; )
							a.push({
								time: e.start(u),
								type: "start"
							}), a.push({
								time: e.end(u),
								type: "end"
							});
						for (u = t.length; u--; )
							a.push({
								time: t.start(u),
								type: "start"
							}), a.push({
								time: t.end(u),
								type: "end"
							});
						for (a.sort(function (e, t) {
								return e.time - t.time
							}), u = 0; u < a.length; u++)
							"start" === a[u].type ? (r++, 2 === r && (i = a[u].time)) : "end" === a[u].type && (r--, 1 === r && (n = a[u].time)), null !== i && null !== n && (o.push([i, n]), i = null, n = null);
						return s.default.createTimeRanges(o)
					},
					m = function (e, t, i, n) {
						for (var r = t.end(0) - t.start(0), a = e.end(0) - e.start(0), s = r - a, o = p(e, n), u = p(t, n), d = 0, l = 0, f = o.length; f--; )
							d += o.end(f) - o.start(f), o.start(f) === i && (d += s);
						for (f = u.length; f--; )
							l += u.end(f) - u.start(f);
						return Math.max(d, l) / r * 100
					},
					g = function (e, t, i, n) {
						var r = e + t,
						a = s.default.createTimeRanges([[e, r]]),
						o = s.default.createTimeRanges([[u(e, [i, r]), r]]);
						if (o.start(0) === o.end(0))
							return 0;
						var d = m(o, a, i, n);
						return isNaN(d) || d === 1 / 0 || d ===  - (1 / 0) ? 0 : d
					},
					y = function (e) {
						var t = [];
						if (!e || !e.length)
							return "";
						for (var i = 0; i < e.length; i++)
							t.push(e.start(i) + " => " + e.end(i));
						return t.join(", ")
					};
					i.default = {
						findRange: l,
						findNextRange: f,
						findGaps: c,
						findSoleUncommonTimeRangesEnd: h,
						getSegmentBufferedPercent: g,
						TIME_FUDGE_FACTOR: o,
						printableRange: y
					},
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}
		],
		11: [function (e, t, i) {
				(function (e) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var r = "undefined" != typeof window ? window.videojs : "undefined" != typeof e ? e.videojs : null,
					a = n(r),
					s = {
						errorInterval: 30,
						getSource: function (e) {
							var t = this.tech({
								IWillNotUseThisInPlugins: !0
							}),
							i = t.currentSource_;
							return e(i)
						}
					},
					o = function e(t, i) {
						var n = 0,
						r = 0,
						o = a.default.mergeOptions(s, i),
						u = function () {
							r && t.currentTime(r)
						},
						d = function (e) {
							null !== e && void 0 !== e && (r = t.duration() !== 1 / 0 && t.currentTime() || 0, t.one("loadedmetadata", u), t.src(e), t.play())
						},
						l = function () {
							if (!(Date.now() - n < 1e3 * o.errorInterval))
								return o.getSource && "function" == typeof o.getSource ? (n = Date.now(), o.getSource.call(t, d)) : void a.default.log.error("ERROR: reloadSourceOnError - The option getSource must be a function!")
						},
						f = function e() {
							t.off("loadedmetadata", u),
							t.off("error", l),
							t.off("dispose", e)
						},
						c = function (i) {
							f(),
							e(t, i)
						};
						t.on("error", l),
						t.on("dispose", f),
						t.reloadSourceOnError = c
					},
					u = function (e) {
						o(this, e)
					};
					i.default = u,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}
		],
		12: [function (e, t, i) {
				function n(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = e("./playlist.js"),
				a = function (e, t, i, n) {
					var a = e.master.playlists[t],
					s = (0, r.isBlacklisted)(a),
					o = (0, r.isEnabled)(a);
					return "undefined" == typeof n ? o : (n ? delete a.disabled : a.disabled = !0, n === o || s || i(), n)
				},
				s = function e(t, i, r) {
					n(this, e);
					var s = t.masterPlaylistController_.fastQualityChange_.bind(t.masterPlaylistController_);
					if (i.attributes) {
						var o = i.attributes;
						if (o.RESOLUTION) {
							var u = o.RESOLUTION;
							this.width = u.width,
							this.height = u.height
						}
						this.bandwidth = o.BANDWIDTH
					}
					this.id = r,
					this.enabled = a.bind(this, t.playlists, i.uri, s)
				},
				o = function (e) {
					var t = e.playlists;
					e.representations = function () {
						return t.master.playlists.filter(function (e) {
							return !(0, r.isBlacklisted)(e)
						}).map(function (t, i) {
							return new s(e, t, t.uri)
						})
					}
				};
				i.default = o,
				t.exports = i.default
			}, {
				"./playlist.js": 9
			}
		],
		13: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = e("url-toolkit"),
				a = n(r),
				s = e("global/window"),
				o = n(s),
				u = function (e, t) {
					return /^[a-z]+:/i.test(t) ? t : (/\/\//i.test(e) || (e = a.default.buildAbsoluteURL(o.default.location.href, e)), a.default.buildAbsoluteURL(e, t))
				};
				i.default = u,
				t.exports = i.default
			}, {
				"global/window": 30,
				"url-toolkit": 61
			}
		],
		14: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = e("./playlist"),
					l = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					f = r(l),
					c = e("./source-updater"),
					h = r(c),
					p = e("./config"),
					m = r(p),
					g = e("global/window"),
					y = r(g),
					v = e("videojs-contrib-media-sources/es5/remove-cues-from-track.js"),
					b = r(v),
					_ = e("./bin-utils"),
					T = e("./media-segment-request"),
					S = 500,
					w = function (e, t, i) {
						if (!e || !t)
							return !1;
						var n = e.segments,
						r = i === n.length;
						return e.endList && "open" === t.readyState && r
					},
					k = function (e) {
						function t(e) {
							var i = this;
							if (a(this, t), u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), !e)
								throw new TypeError("Initialization options are required");
							if ("function" != typeof e.currentTime)
								throw new TypeError("No currentTime getter specified");
							if (!e.mediaSource)
								throw new TypeError("No MediaSource specified");
							var n = f.default.mergeOptions(f.default.options.hls, e);
							this.state = "INIT",
							this.bandwidth = n.bandwidth,
							this.throughput = {
								rate: 0,
								count: 0
							},
							this.roundTrip = NaN,
							this.resetStats_(),
							this.mediaIndex = null,
							this.hasPlayed_ = n.hasPlayed,
							this.currentTime_ = n.currentTime,
							this.seekable_ = n.seekable,
							this.seeking_ = n.seeking,
							this.duration_ = n.duration,
							this.mediaSource_ = n.mediaSource,
							this.hls_ = n.hls,
							this.loaderType_ = n.loaderType,
							this.segmentMetadataTrack_ = n.segmentMetadataTrack,
							this.checkBufferTimeout_ = null,
							this.error_ = void 0,
							this.currentTimeline_ = -1,
							this.pendingSegment_ = null,
							this.mimeType_ = null,
							this.sourceUpdater_ = null,
							this.xhrOptions_ = null,
							this.activeInitSegmentId_ = null,
							this.initSegments_ = {},
							this.decrypter_ = n.decrypter,
							this.syncController_ = n.syncController,
							this.syncPoint_ = {
								segmentIndex: 0,
								time: 0
							},
							this.syncController_.on("syncinfoupdate", function () {
								return i.trigger("syncinfoupdate")
							}),
							this.fetchAtBuffer_ = !1,
							n.debug && (this.logger_ = f.default.log.bind(f.default, "segment-loader", this.loaderType_, "->"))
						}
						return s(t, e),
						o(t, [{
									key: "resetStats_",
									value: function () {
										this.mediaBytesTransferred = 0,
										this.mediaRequests = 0,
										this.mediaRequestsAborted = 0,
										this.mediaRequestsTimedout = 0,
										this.mediaRequestsErrored = 0,
										this.mediaTransferDuration = 0,
										this.mediaSecondsLoaded = 0
									}
								}, {
									key: "dispose",
									value: function () {
										this.state = "DISPOSED",
										this.abort_(),
										this.sourceUpdater_ && this.sourceUpdater_.dispose(),
										this.resetStats_()
									}
								}, {
									key: "abort",
									value: function () {
										return "WAITING" !== this.state ? void(this.pendingSegment_ && (this.pendingSegment_ = null)) : (this.abort_(), void(this.paused() || (this.state = "READY", this.monitorBuffer_())));
									}
								}, {
									key: "abort_",
									value: function () {
										this.pendingSegment_ && this.pendingSegment_.abortRequests(),
										this.pendingSegment_ = null
									}
								}, {
									key: "error",
									value: function (e) {
										return "undefined" != typeof e && (this.error_ = e),
										this.pendingSegment_ = null,
										this.error_
									}
								}, {
									key: "buffered_",
									value: function () {
										return this.sourceUpdater_ ? this.sourceUpdater_.buffered() : f.default.createTimeRanges()
									}
								}, {
									key: "initSegment",
									value: function (e) {
										var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
										if (!e)
											return null;
										var i = (0, _.initSegmentId)(e),
										n = this.initSegments_[i];
										return t && !n && e.bytes && (this.initSegments_[i] = n = {
												resolvedUri: e.resolvedUri,
												byterange: e.byterange,
												bytes: e.bytes
											}),
										n || e
									}
								}, {
									key: "couldBeginLoading_",
									value: function () {
										return this.playlist_ && (this.sourceUpdater_ || this.mimeType_ && "INIT" === this.state) && !this.paused()
									}
								}, {
									key: "load",
									value: function () {
										if (this.monitorBuffer_(), this.playlist_)
											return this.syncController_.setDateTimeMapping(this.playlist_), "INIT" === this.state && this.couldBeginLoading_() ? this.init_() : void(!this.couldBeginLoading_() || "READY" !== this.state && "INIT" !== this.state || (this.state = "READY"))
									}
								}, {
									key: "init_",
									value: function () {
										return this.state = "READY",
										this.sourceUpdater_ = new h.default(this.mediaSource_, this.mimeType_),
										this.resetEverything(),
										this.monitorBuffer_()
									}
								}, {
									key: "playlist",
									value: function (e) {
										var t = arguments.length <= 1 || void 0 === arguments[1] ? {}
										 : arguments[1];
										if (e) {
											var i = this.playlist_,
											n = this.pendingSegment_;
											if (this.playlist_ = e, this.xhrOptions_ = t, this.hasPlayed_() || (e.syncInfo = {
														mediaSequence: e.mediaSequence,
														time: 0
													}), this.trigger("syncinfoupdate"), "INIT" === this.state && this.couldBeginLoading_())
												return this.init_();
											if (!i || i.uri !== e.uri)
												return void(null !== this.mediaIndex && this.resyncLoader());
											var r = e.mediaSequence - i.mediaSequence;
											this.logger_("mediaSequenceDiff", r),
											null !== this.mediaIndex && (this.mediaIndex -= r),
											n && (n.mediaIndex -= r, n.mediaIndex >= 0 && (n.segment = e.segments[n.mediaIndex])),
											this.syncController_.saveExpiredSegmentInfo(i, e)
										}
									}
								}, {
									key: "pause",
									value: function () {
										this.checkBufferTimeout_ && (y.default.clearTimeout(this.checkBufferTimeout_), this.checkBufferTimeout_ = null)
									}
								}, {
									key: "paused",
									value: function () {
										return null === this.checkBufferTimeout_
									}
								}, {
									key: "mimeType",
									value: function (e) {
										this.mimeType_ || (this.mimeType_ = e, "INIT" === this.state && this.couldBeginLoading_() && this.init_())
									}
								}, {
									key: "resetEverything",
									value: function () {
										this.resetLoader(),
										this.remove(0, 1 / 0)
									}
								}, {
									key: "resetLoader",
									value: function () {
										this.fetchAtBuffer_ = !1,
										this.resyncLoader()
									}
								}, {
									key: "resyncLoader",
									value: function () {
										this.mediaIndex = null,
										this.syncPoint_ = null
									}
								}, {
									key: "remove",
									value: function (e, t) {
										this.sourceUpdater_ && this.sourceUpdater_.remove(e, t),
										(0, b.default)(e, t, this.segmentMetadataTrack_)
									}
								}, {
									key: "monitorBuffer_",
									value: function () {
										this.checkBufferTimeout_ && y.default.clearTimeout(this.checkBufferTimeout_),
										this.checkBufferTimeout_ = y.default.setTimeout(this.monitorBufferTick_.bind(this), 1)
									}
								}, {
									key: "monitorBufferTick_",
									value: function () {
										"READY" === this.state && this.fillBuffer_(),
										this.checkBufferTimeout_ && y.default.clearTimeout(this.checkBufferTimeout_),
										this.checkBufferTimeout_ = y.default.setTimeout(this.monitorBufferTick_.bind(this), S)
									}
								}, {
									key: "fillBuffer_",
									value: function () {
										if (!this.sourceUpdater_.updating()) {
											this.syncPoint_ || (this.syncPoint_ = this.syncController_.getSyncPoint(this.playlist_, this.duration_(), this.currentTimeline_, this.currentTime_()));
											var e = this.checkBuffer_(this.buffered_(), this.playlist_, this.mediaIndex, this.hasPlayed_(), this.currentTime_(), this.syncPoint_);
											if (e) {
												var t = w(this.playlist_, this.mediaSource_, e.mediaIndex);
												return t ? void this.mediaSource_.endOfStream() : void((e.mediaIndex !== this.playlist_.segments.length - 1 || "ended" !== this.mediaSource_.readyState || this.seeking_()) && ((e.timeline !== this.currentTimeline_ || null !== e.startOfSegment && e.startOfSegment < this.sourceUpdater_.timestampOffset()) && (this.syncController_.reset(), e.timestampOffset = e.startOfSegment), this.loadSegment_(e)))
											}
										}
									}
								}, {
									key: "checkBuffer_",
									value: function (e, t, i, n, r, a) {
										var s = 0,
										o = void 0;
										e.length && (s = e.end(e.length - 1));
										if (t.segments.length)
											var u = parseInt(t.segments.length / 4) || 10;
										if (i < u / 2)
											var l = Math.min(0, s - r);
										else if (r > (s - r) / 4)
											var l = Math.min(0, s - r);
										else
											var l = Math.max(0, s - r);
										if (!t.segments.length)
											return null;
										if (l >= m.default.GOAL_BUFFER_LENGTH)
											return null;
										if (!n && l >= 1)
											return null;
										if (this.logger_("checkBuffer_", "mediaIndex:", i, "hasPlayed:", n, "currentTime:", r, "syncPoint:", a, "fetchAtBuffer:", this.fetchAtBuffer_, "bufferedTime:", l), null === a)
											return i = this.getSyncSegmentCandidate_(t), this.logger_("getSync", "mediaIndex:", i), this.generateSegmentInfo_(t, i, null, !0);
										if (null !== i) {
											this.logger_("walkForward", "mediaIndex:", i + 1);
											var f = t.segments[i];
											return o = f && f.end ? f.end : s,
											this.generateSegmentInfo_(t, i + 1, o, !1)
										}
										if (this.fetchAtBuffer_) {
											var c = (0, d.getMediaInfoForTime_)(t, s, a.segmentIndex, a.time);
											i = c.mediaIndex,
											o = c.startTime
										} else {
											var c = (0, d.getMediaInfoForTime_)(t, r, a.segmentIndex, a.time);
											i = c.mediaIndex,
											o = c.startTime
										}
										return this.logger_("getMediaIndexForTime", "mediaIndex:", i, "startOfSegment:", o),
										this.generateSegmentInfo_(t, i, o, !1)
									}
								}, {
									key: "getSyncSegmentCandidate_",
									value: function (e) {
										var t = this;
										if (this.currentTimeline_ === -1)
											return 0;
										var i = e.segments.map(function (e, t) {
											return {
												timeline: e.timeline,
												segmentIndex: t
											}
										}).filter(function (e) {
											return e.timeline === t.currentTimeline_
										});
										return i.length ? i[Math.min(i.length - 1, 1)].segmentIndex : Math.max(e.segments.length - 1, 0)
									}
								}, {
									key: "generateSegmentInfo_",
									value: function (e, t, i, n) {
										if (t < 0 || t >= e.segments.length)
											return null;
										var r = e.segments[t];
										return {
											requestId: "segment-loader-" + Math.random(),
											uri: r.resolvedUri,
											mediaIndex: t,
											isSyncRequest: n,
											startOfSegment: i,
											playlist: e,
											bytes: null,
											encryptedBytes: null,
											timestampOffset: null,
											timeline: r.timeline,
											duration: r.duration,
											segment: r
										}
									}
								}, {
									key: "loadSegment_",
									value: function (e) {
										var t = this;
										this.state = "WAITING",
										this.pendingSegment_ = e,
										this.trimBackBuffer_(e),
										e.abortRequests = (0, T.mediaSegmentRequest)(this.hls_.xhr, this.xhrOptions_, this.decrypter_, this.createSimplifiedSegmentObj_(e), function (e, i) {
											t.pendingSegment_ && i.requestId === t.pendingSegment_.requestId && t.trigger("progress")
										}, this.segmentRequestFinished_.bind(this))
									}
								}, {
									key: "trimBackBuffer_",
									value: function (e) {
										var t = this.seekable_(),
										i = this.currentTime_(),
										n = 0;
										n = t.length && t.start(0) > 0 && t.start(0) < i ? t.start(0) : i - 60,
										n > 0 && this.remove(0, n)
									}
								}, {
									key: "createSimplifiedSegmentObj_",
									value: function (e) {
										var t = e.segment,
										i = {
											resolvedUri: t.resolvedUri,
											byterange: t.byterange,
											requestId: e.requestId
										};
										if (t.key) {
											var n = t.key.iv || new Uint32Array([0, 0, 0, e.mediaIndex + e.playlist.mediaSequence]);
											i.key = {
												resolvedUri: t.key.resolvedUri,
												iv: n
											}
										}
										return t.map && (i.map = this.initSegment(t.map)),
										i
									}
								}, {
									key: "segmentRequestFinished_",
									value: function (e, t) {
										if (this.mediaRequests += 1, t.stats && (this.mediaBytesTransferred += t.stats.bytesReceived, this.mediaTransferDuration += t.stats.roundTripTime), !this.pendingSegment_)
											return void(this.mediaRequestsAborted += 1);
										if (t.requestId === this.pendingSegment_.requestId) {
											if (e)
												return this.pendingSegment_ = null, e.code === T.REQUEST_ERRORS.ABORTED ? void(this.mediaRequestsAborted += 1) : (this.state = "READY", this.pause(), e.code === T.REQUEST_ERRORS.TIMEOUT ? (this.mediaRequestsTimedout += 1, this.bandwidth = 1, this.roundTrip = NaN, void this.trigger("bandwidthupdate")) : (this.mediaRequestsErrored += 1, this.error(e), void this.trigger("error")));
											this.bandwidth = t.stats.bandwidth,
											this.roundTrip = t.stats.roundTripTime,
											t.map && (t.map = this.initSegment(t.map, !0)),
											this.processSegmentResponse_(t)
										}
									}
								}, {
									key: "processSegmentResponse_",
									value: function (e) {
										var t = this.pendingSegment_;
										t.bytes = e.bytes,
										e.map && (t.segment.map.bytes = e.map.bytes),
										t.endOfAllRequests = e.endOfAllRequests,
										this.handleSegment_()
									}
								}, {
									key: "handleSegment_",
									value: function () {
										var e = this;
										if (!this.pendingSegment_)
											return void(this.state = "READY");
										this.state = "APPENDING";
										var t = this.pendingSegment_,
										i = t.segment;
										return this.syncController_.probeSegmentInfo(t),
										t.isSyncRequest ? (this.trigger("syncinfoupdate"), this.pendingSegment_ = null, void(this.state = "READY")) : (null !== t.timestampOffset && t.timestampOffset !== this.sourceUpdater_.timestampOffset() && this.sourceUpdater_.timestampOffset(t.timestampOffset), i.map && !function () {
											var t = (0, _.initSegmentId)(i.map);
											if (!e.activeInitSegmentId_ || e.activeInitSegmentId_ !== t) {
												var n = e.initSegment(i.map);
												e.sourceUpdater_.appendBuffer(n.bytes, function () {
													e.activeInitSegmentId_ = t
												})
											}
										}
											(), t.byteLength = t.bytes.byteLength, "number" == typeof i.start && "number" == typeof i.end ? this.mediaSecondsLoaded += i.end - i.start : this.mediaSecondsLoaded += i.duration, void this.sourceUpdater_.appendBuffer(t.bytes, this.handleUpdateEnd_.bind(this)))
									}
								}, {
									key: "handleUpdateEnd_",
									value: function () {
										if (this.logger_("handleUpdateEnd_", "segmentInfo:", this.pendingSegment_), !this.pendingSegment_)
											return this.state = "READY", void(this.paused() || this.monitorBuffer_());
										var e = this.pendingSegment_,
										t = e.segment,
										i = null !== this.mediaIndex;
										if (this.pendingSegment_ = null, this.recordThroughput_(e), this.addSegmentMetadataCue_(e), this.state = "READY", this.mediaIndex = e.mediaIndex, this.fetchAtBuffer_ = !0, this.currentTimeline_ = e.timeline, this.trigger("syncinfoupdate"), t.end && this.currentTime_() - t.end > 3 * e.playlist.targetDuration)
											return void this.resetEverything();
										i && this.trigger("bandwidthupdate"),
										this.trigger("progress");
										var n = w(e.playlist, this.mediaSource_, e.mediaIndex + 1);
										n && this.mediaSource_.endOfStream(),
										this.paused() || this.monitorBuffer_()
									}
								}, {
									key: "recordThroughput_",
									value: function (e) {
										var t = this.throughput.rate,
										i = Date.now() - e.endOfAllRequests + 1,
										n = Math.floor(e.byteLength / i * 8 * 1e3);
										this.throughput.rate += (n - t) / ++this.throughput.count
									}
								}, {
									key: "logger_",
									value: function () {}
								}, {
									key: "addSegmentMetadataCue_",
									value: function (e) {
										if (this.segmentMetadataTrack_) {
											var t = e.segment,
											i = t.start,
											n = t.end;
											(0, b.default)(i, n, this.segmentMetadataTrack_);
											var r = y.default.WebKitDataCue || y.default.VTTCue,
											a = {
												uri: e.uri,
												timeline: e.timeline,
												playlist: e.playlist.uri,
												start: i,
												end: n
											},
											s = JSON.stringify(a),
											o = new r(i, n, s);
											o.value = a,
											this.segmentMetadataTrack_.addCue(o)
										}
									}
								}
							]),
						t
					}
					(f.default.EventTarget);
					i.default = k,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./bin-utils": 2,
				"./config": 3,
				"./media-segment-request": 6,
				"./playlist": 9,
				"./source-updater": 15,
				"global/window": 30,
				"videojs-contrib-media-sources/es5/remove-cues-from-track.js": 71
			}
		],
		15: [function (e, t, i) {
				(function (e) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var a = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					s = "undefined" != typeof window ? window.videojs : "undefined" != typeof e ? e.videojs : null,
					o = n(s),
					u = function () {
						function e(t, i) {
							var n = this;
							r(this, e);
							var a = function () {
								n.sourceBuffer_ = t.addSourceBuffer(i),
								n.onUpdateendCallback_ = function () {
									var e = n.pendingCallback_;
									n.pendingCallback_ = null,
									e && e(),
									n.runCallback_()
								},
								n.sourceBuffer_.addEventListener("updateend", n.onUpdateendCallback_),
								n.runCallback_()
							};
							this.callbacks_ = [],
							this.pendingCallback_ = null,
							this.timestampOffset_ = 0,
							this.mediaSource = t,
							"closed" === t.readyState ? t.addEventListener("sourceopen", a) : a()
						}
						return a(e, [{
									key: "abort",
									value: function (e) {
										var t = this;
										this.queueCallback_(function () {
											t.sourceBuffer_.abort()
										}, e)
									}
								}, {
									key: "appendBuffer",
									value: function (e, t) {
										var i = this;
										this.queueCallback_(function () {
											i.sourceBuffer_.appendBuffer(e)
										}, t)
									}
								}, {
									key: "buffered",
									value: function () {
										return this.sourceBuffer_ ? this.sourceBuffer_.buffered : o.default.createTimeRanges()
									}
								}, {
									key: "duration",
									value: function (e) {
										var t = this;
										this.queueCallback_(function () {
											t.sourceBuffer_.duration = e
										})
									}
								}, {
									key: "remove",
									value: function (e, t) {
										var i = this;
										this.queueCallback_(function () {
											i.sourceBuffer_.remove(e, t)
										})
									}
								}, {
									key: "updating",
									value: function () {
										return !this.sourceBuffer_ || this.sourceBuffer_.updating || this.pendingCallback_
									}
								}, {
									key: "timestampOffset",
									value: function (e) {
										var t = this;
										return "undefined" != typeof e && (this.queueCallback_(function () {
												t.sourceBuffer_.timestampOffset = e
											}), this.timestampOffset_ = e),
										this.timestampOffset_
									}
								}, {
									key: "queueCallback_",
									value: function (e, t) {
										this.callbacks_.push([e.bind(this), t]),
										this.runCallback_()
									}
								}, {
									key: "runCallback_",
									value: function () {
										var e = void 0;
										!this.updating() && this.callbacks_.length && (e = this.callbacks_.shift(), this.pendingCallback_ = e[1], e[0]())
									}
								}, {
									key: "dispose",
									value: function () {
										this.sourceBuffer_.removeEventListener("updateend", this.onUpdateendCallback_),
										this.sourceBuffer_ && "open" === this.mediaSource.readyState && this.sourceBuffer_.abort()
									}
								}
							]),
						e
					}
					();
					i.default = u,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}
		],
		16: [function (e, t, i) {
				function n(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				a = function () {
					function e() {
						n(this, e),
						this.listeners = {}
					}
					return r(e, [{
								key: "on",
								value: function (e, t) {
									this.listeners[e] || (this.listeners[e] = []),
									this.listeners[e].push(t)
								}
							}, {
								key: "off",
								value: function (e, t) {
									var i = void 0;
									return !!this.listeners[e] && (i = this.listeners[e].indexOf(t), this.listeners[e].splice(i, 1), i > -1)
								}
							}, {
								key: "trigger",
								value: function (e) {
									var t = void 0,
									i = void 0,
									n = void 0,
									r = void 0;
									if (t = this.listeners[e])
										if (2 === arguments.length)
											for (n = t.length, i = 0; i < n; ++i)
												t[i].call(this, arguments[1]);
										else
											for (r = Array.prototype.slice.call(arguments, 1), n = t.length, i = 0; i < n; ++i)
												t[i].apply(this, r)
								}
							}, {
								key: "dispose",
								value: function () {
									this.listeners = {}
								}
							}, {
								key: "pipe",
								value: function (e) {
									this.on("data", function (t) {
										e.push(t)
									})
								}
							}
						]),
					e
				}
				();
				i.default = a,
				t.exports = i.default
			}, {}
		],
		17: [function (e, t, i) {
				(function (t) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function a(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var s = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					o = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					u = e("mux.js/lib/mp4/probe"),
					d = n(u),
					l = e("mux.js/lib/tools/ts-inspector.js"),
					f = e("./playlist"),
					c = "undefined" != typeof window ? window.videojs : "undefined" != typeof t ? t.videojs : null,
					h = n(c),
					p = [{
							name: "VOD",
							run: function (e, t, i, n, r) {
								if (i !== 1 / 0) {
									var a = {
										time: 0,
										segmentIndex: 0
									};
									return a
								}
								return null
							}
						}, {
							name: "ProgramDateTime",
							run: function (e, t, i, n, r) {
								if (e.datetimeToDisplayTime && t.dateTimeObject) {
									var a = t.dateTimeObject.getTime() / 1e3,
									s = a + e.datetimeToDisplayTime,
									o = {
										time: s,
										segmentIndex: 0
									};
									return o
								}
								return null
							}
						}, {
							name: "Segment",
							run: function (e, t, i, n, r) {
								var a = t.segments,
								s = null,
								o = null;
								r = r || 0;
								for (var u = 0; u < a.length; u++) {
									var d = a[u];
									if (d.timeline === n && "undefined" != typeof d.start) {
										var l = Math.abs(r - d.start);
										if (null !== o && o < l)
											break;
										(!s || null === o || o >= l) && (o = l, s = {
												time: d.start,
												segmentIndex: u
											})
									}
								}
								return s
							}
						}, {
							name: "Discontinuity",
							run: function (e, t, i, n, r) {
								var a = null;
								if (r = r || 0, t.discontinuityStarts.length)
									for (var s = null, o = 0; o < t.discontinuityStarts.length; o++) {
										var u = t.discontinuityStarts[o],
										d = t.discontinuitySequence + o + 1,
										l = e.discontinuities[d];
										if (l) {
											var f = Math.abs(r - l.time);
											if (null !== s && s < f)
												break;
											(!a || null === s || s >= f) && (s = f, a = {
													time: l.time,
													segmentIndex: u
												})
										}
									}
								return a
							}
						}, {
							name: "Playlist",
							run: function (e, t, i, n, r) {
								if (t.syncInfo) {
									var a = {
										time: t.syncInfo.time,
										segmentIndex: t.syncInfo.mediaSequence - t.mediaSequence
									};
									return a
								}
								return null
							}
						}
					];
					i.syncPointStrategies = p;
					var m = function (e) {
						function t() {
							r(this, t),
							o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this),
							this.inspectCache_ = void 0,
							this.timelines = [],
							this.discontinuities = [],
							this.datetimeToDisplayTime = null,
							h.default.options.hls && h.default.options.hls.debug && (this.logger_ = h.default.log.bind(h.default, "sync-controller ->"))
						}
						return a(t, e),
						s(t, [{
									key: "getSyncPoint",
									value: function (e, t, i, n) {
										for (var r = [], a = 0; a < p.length; a++) {
											var s = p[a],
											o = s.run(this, e, t, i, n);
											o && (o.strategy = s.name, r.push({
													strategy: s.name,
													syncPoint: o
												}), this.logger_("syncPoint found via <" + s.name + ">:", o))
										}
										if (!r.length)
											return null;
										for (var u = r[0].syncPoint, d = Math.abs(r[0].syncPoint.time - n), l = r[0].strategy, a = 1; a < r.length; a++) {
											var f = Math.abs(r[a].syncPoint.time - n);
											f < d && (d = f, u = r[a].syncPoint, l = r[a].strategy)
										}
										return this.logger_("syncPoint with strategy <" + l + "> chosen: ", u),
										u
									}
								}, {
									key: "saveExpiredSegmentInfo",
									value: function (e, t) {
										for (var i = t.mediaSequence - e.mediaSequence, n = i - 1; n >= 0; n--) {
											var r = e.segments[n];
											if (r && "undefined" != typeof r.start) {
												t.syncInfo = {
													mediaSequence: e.mediaSequence + n,
													time: r.start
												},
												this.logger_("playlist sync:", t.syncInfo),
												this.trigger("syncinfoupdate");
												break
											}
										}
									}
								}, {
									key: "setDateTimeMapping",
									value: function (e) {
										if (!this.datetimeToDisplayTime && e.dateTimeObject) {
											var t = e.dateTimeObject.getTime() / 1e3;
											this.datetimeToDisplayTime = -t
										}
									}
								}, {
									key: "reset",
									value: function () {
										this.inspectCache_ = void 0
									}
								}, {
									key: "probeSegmentInfo",
									value: function (e) {
										var t = e.segment,
										i = void 0;
										i = t.map ? this.probeMp4Segment_(e) : this.probeTsSegment_(e),
										i && this.calculateSegmentTimeMapping_(e, i) && this.saveDiscontinuitySyncInfo_(e)
									}
								}, {
									key: "probeMp4Segment_",
									value: function (e) {
										var t = e.segment,
										i = d.default.timescale(t.map.bytes),
										n = d.default.startTime(i, e.bytes);
										return null !== e.timestampOffset && (e.timestampOffset -= n), {
											start: n,
											end: n + t.duration
										}
									}
								}, {
									key: "probeTsSegment_",
									value: function (e) {
										var t = (0, l.inspect)(e.bytes, this.inspectCache_),
										i = void 0,
										n = void 0;
										return t ? (t.video && 2 === t.video.length ? (this.inspectCache_ = t.video[1].dts, i = t.video[0].dtsTime, n = t.video[1].dtsTime) : t.audio && 2 === t.audio.length && (this.inspectCache_ = t.audio[1].dts, i = t.audio[0].dtsTime, n = t.audio[1].dtsTime), {
											start: i,
											end: n
										}) : null
									}
								}, {
									key: "timestampOffsetForTimeline",
									value: function (e) {
										return "undefined" == typeof this.timelines[e] ? null : this.timelines[e].time
									}
								}, {
									key: "calculateSegmentTimeMapping_",
									value: function (e, t) {
										var i = e.segment,
										n = this.timelines[e.timeline];
										if (null !== e.timestampOffset)
											this.logger_("tsO:", e.timestampOffset), n = {
												time: e.timestampOffset,
												mapping: e.timestampOffset - t.start
											},
										this.timelines[e.timeline] = n,
										this.trigger("timestampoffset"),
										i.start = e.timestampOffset,
										i.end = t.end + n.mapping;
										else {
											if (!n)
												return !1;
											i.start = t.start + n.mapping,
											i.end = t.end + n.mapping
										}
										return !0
									}
								}, {
									key: "saveDiscontinuitySyncInfo_",
									value: function (e) {
										var t = e.playlist,
										i = e.segment;
										if (i.discontinuity)
											this.discontinuities[i.timeline] = {
												time: i.start,
												accuracy: 0
											};
										else if (t.discontinuityStarts.length)
											for (var n = 0; n < t.discontinuityStarts.length; n++) {
												var r = t.discontinuityStarts[n],
												a = t.discontinuitySequence + n + 1,
												s = r - e.mediaIndex,
												o = Math.abs(s);
												(!this.discontinuities[a] || this.discontinuities[a].accuracy > o) && (s < 0 ? this.discontinuities[a] = {
														time: i.start - (0, f.sumDurations)(t, e.mediaIndex, r),
														accuracy: o
													}
													 : this.discontinuities[a] = {
														time: i.end + (0, f.sumDurations)(t, e.mediaIndex + 1, r),
														accuracy: o
													})
											}
									}
								}, {
									key: "logger_",
									value: function () {}
								}
							]),
						t
					}
					(h.default.EventTarget);
					i.default = m
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./playlist": 9,
				"mux.js/lib/mp4/probe": 55,
				"mux.js/lib/tools/ts-inspector.js": 57
			}
		],
		18: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = e("./segment-loader"),
					l = r(d),
					f = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					c = r(f),
					h = e("global/window"),
					p = r(h),
					m = e("videojs-contrib-media-sources/es5/remove-cues-from-track.js"),
					g = r(m),
					y = e("./bin-utils"),
					v = new Uint8Array("\n\n".split("").map(function (e) {
								return e.charCodeAt(0)
							})),
					b = function (e) {
						return String.fromCharCode.apply(null, e)
					},
					_ = function (e) {
						function t(e) {
							a(this, t),
							u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e),
							this.mediaSource_ = null,
							this.subtitlesTrack_ = null
						}
						return s(t, e),
						o(t, [{
									key: "buffered_",
									value: function () {
										if (!this.subtitlesTrack_ || !this.subtitlesTrack_.cues.length)
											return c.default.createTimeRanges();
										var e = this.subtitlesTrack_.cues,
										t = e[0].startTime,
										i = e[e.length - 1].startTime;
										return c.default.createTimeRanges([[t, i]])
									}
								}, {
									key: "initSegment",
									value: function (e) {
										var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1];
										if (!e)
											return null;
										var i = (0, y.initSegmentId)(e),
										n = this.initSegments_[i];
										if (t && !n && e.bytes) {
											var r = v.byteLength + e.bytes.byteLength,
											a = new Uint8Array(r);
											a.set(e.bytes),
											a.set(v, e.bytes.byteLength),
											this.initSegments_[i] = n = {
												resolvedUri: e.resolvedUri,
												byterange: e.byterange,
												bytes: a
											}
										}
										return n || e
									}
								}, {
									key: "couldBeginLoading_",
									value: function () {
										return this.playlist_ && this.subtitlesTrack_ && !this.paused()
									}
								}, {
									key: "init_",
									value: function () {
										return this.state = "READY",
										this.resetEverything(),
										this.monitorBuffer_()
									}
								}, {
									key: "track",
									value: function (e) {
										this.subtitlesTrack_ = e,
										"INIT" === this.state && this.couldBeginLoading_() && this.init_()
									}
								}, {
									key: "remove",
									value: function (e, t) {
										(0, g.default)(e, t, this.subtitlesTrack_)
									}
								}, {
									key: "fillBuffer_",
									value: function () {
										var e = this;
										this.syncPoint_ || (this.syncPoint_ = this.syncController_.getSyncPoint(this.playlist_, this.duration_(), this.currentTimeline_, this.currentTime_()));
										var t = this.checkBuffer_(this.buffered_(), this.playlist_, this.mediaIndex, this.hasPlayed_(), this.currentTime_(), this.syncPoint_);
										if (t = this.skipEmptySegments_(t)) {
											if (null === this.syncController_.timestampOffsetForTimeline(t.timeline)) {
												var i = function () {
													e.state = "READY",
													e.paused() || e.monitorBuffer_()
												};
												return this.syncController_.one("timestampoffset", i),
												void(this.state = "WAITING_ON_TIMELINE")
											}
											this.loadSegment_(t)
										}
									}
								}, {
									key: "skipEmptySegments_",
									value: function (e) {
										for (; e && e.segment.empty; )
											e = this.generateSegmentInfo_(e.playlist, e.mediaIndex + 1, e.startOfSegment + e.duration, e.isSyncRequest);
										return e
									}
								}, {
									key: "handleSegment_",
									value: function () {
										var e = this;
										if (!this.pendingSegment_)
											return void(this.state = "READY");
										this.state = "APPENDING";
										var t = this.pendingSegment_,
										i = t.segment;
										if ("function" != typeof p.default.WebVTT && this.subtitlesTrack_ && this.subtitlesTrack_.tech_) {
											var n = function () {
												var t = function () {
													e.handleSegment_()
												};
												return e.state = "WAITING_ON_VTTJS",
												e.subtitlesTrack_.tech_.one("vttjsloaded", t),
												e.subtitlesTrack_.tech_.one("vttjserror", function () {
													e.subtitlesTrack_.tech_.off("vttjsloaded", t),
													e.error({
														message: "Error loading vtt.js"
													}),
													e.state = "READY",
													e.pause(),
													e.trigger("error")
												}), {
													v: void 0
												}
											}
											();
											if ("object" == typeof n)
												return n.v
										}
										i.requested = !0;
										try {
											this.parseVTTCues_(t)
										} catch (e) {
											return this.error({
												message: e.message
											}),
											this.state = "READY",
											this.pause(),
											this.trigger("error")
										}
										return this.updateTimeMapping_(t, this.syncController_.timelines[t.timeline], this.playlist_),
										t.isSyncRequest ? (this.trigger("syncinfoupdate"), this.pendingSegment_ = null, void(this.state = "READY")) : (t.byteLength = t.bytes.byteLength, this.mediaSecondsLoaded += i.duration, t.cues.forEach(function (t) {
												e.subtitlesTrack_.addCue(t)
											}), void this.handleUpdateEnd_())
									}
								}, {
									key: "parseVTTCues_",
									value: function (e) {
										var t = void 0,
										i = !1;
										"function" == typeof p.default.TextDecoder ? t = new p.default.TextDecoder("utf8") : (t = p.default.WebVTT.StringDecoder(), i = !0);
										var n = new p.default.WebVTT.Parser(p.default, p.default.vttjs, t);
										if (e.cues = [], e.timestampmap = {
												MPEGTS: 0,
												LOCAL: 0
											}, n.oncue = e.cues.push.bind(e.cues), n.ontimestampmap = function (t) {
											return e.timestampmap = t
										}, n.onparsingerror = function (e) {
											c.default.log.warn("Error encountered when parsing cues: " + e.message)
										}, e.segment.map) {
											var r = e.segment.map.bytes;
											i && (r = b(r)),
											n.parse(r)
										}
										var a = e.bytes;
										i && (a = b(a)),
										n.parse(a),
										n.flush()
									}
								}, {
									key: "updateTimeMapping_",
									value: function (e, t, i) {
										var n = e.segment;
										if (t) {
											if (!e.cues.length)
												return void(n.empty = !0);
											var r = e.timestampmap,
											a = r.MPEGTS / 9e4 - r.LOCAL + t.mapping;
											if (e.cues.forEach(function (e) {
													e.startTime += a,
													e.endTime += a
												}), !i.syncInfo) {
												var s = e.cues[0].startTime,
												o = e.cues[e.cues.length - 1].startTime;
												i.syncInfo = {
													mediaSequence: i.mediaSequence + e.mediaIndex,
													time: Math.min(s, o - n.duration)
												}
											}
										}
									}
								}
							]),
						t
					}
					(l.default);
					i.default = _,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./bin-utils": 2,
				"./segment-loader": 14,
				"global/window": 30,
				"videojs-contrib-media-sources/es5/remove-cues-from-track.js": 71
			}
		],
		19: [function (e, t, i) {
				(function (e) {
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var n = "undefined" != typeof window ? window.videojs : "undefined" != typeof e ? e.videojs : null,
					r = function () {
						var e = function e(t, i) {
							if (t = (0, n.mergeOptions)({
									timeout: 45e3
								}, t), e.beforeRequest && "function" == typeof e.beforeRequest) {
								var r = e.beforeRequest(t);
								r && (t = r)
							}
							var a = (0, n.xhr)(t, function (e, t) {
								if ("string" == typeof a.response)
									var n = new Rusha, r = sectionID + "icq", s = n.digest(r).substr(0, 32), o = JSON.parse(a.response), u = xxtea.toString(xxtea.decrypt(o.data.data, xxtea.toBytes(s + sectionID)));
								else
									var u = a.response;
								!e && u && (a.responseTime = Date.now(), a.roundTripTime = a.responseTime - a.requestTime, a.bytesReceived = u.byteLength || u.length, a.bandwidth || (a.bandwidth = Math.floor(a.bytesReceived / a.roundTripTime * 8 * 1e3))),
								e && "ETIMEDOUT" === e.code && (a.timedout = !0),
								e || a.aborted || 200 === t.statusCode || 206 === t.statusCode || 0 === t.statusCode || (e = new Error("XHR Failed with a response of: " + (a && (u || a.responseText)))),
								i(e, a)
							}),
							s = a.abort;
							return a.abort = function () {
								return a.aborted = !0,
								s.apply(a, arguments)
							},
							a.uri = t.uri,
							a.requestTime = Date.now(),
							a
						};
						return e
					};
					i.default = r,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}
		],
		20: [function (e, t, i) {
				function n(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				a = function () {
					var e = [[[], [], [], [], []], [[], [], [], [], []]],
					t = e[0],
					i = e[1],
					n = t[4],
					r = i[4],
					a = void 0,
					s = void 0,
					o = void 0,
					u = [],
					d = [],
					l = void 0,
					f = void 0,
					c = void 0,
					h = void 0,
					p = void 0,
					m = void 0;
					for (a = 0; a < 256; a++)
						d[(u[a] = a << 1 ^ 283 * (a >> 7)) ^ a] = a;
					for (s = o = 0; !n[s]; s ^= l || 1, o = d[o] || 1)
						for (h = o ^ o << 1 ^ o << 2 ^ o << 3 ^ o << 4, h = h >> 8 ^ 255 & h ^ 99, n[s] = h, r[h] = s, c = u[f = u[l = u[s]]], m = 16843009 * c ^ 65537 * f ^ 257 * l ^ 16843008 * s, p = 257 * u[h] ^ 16843008 * h, a = 0; a < 4; a++)
							t[a][s] = p = p << 24 ^ p >>> 8, i[a][h] = m = m << 24 ^ m >>> 8;
					for (a = 0; a < 5; a++)
						t[a] = t[a].slice(0), i[a] = i[a].slice(0);
					return e
				},
				s = null,
				o = function () {
					function e(t) {
						n(this, e),
						s || (s = a()),
						this._tables = [[s[0][0].slice(), s[0][1].slice(), s[0][2].slice(), s[0][3].slice(), s[0][4].slice()], [s[1][0].slice(), s[1][1].slice(), s[1][2].slice(), s[1][3].slice(), s[1][4].slice()]];
						var i = void 0,
						r = void 0,
						o = void 0,
						u = void 0,
						d = void 0,
						l = this._tables[0][4],
						f = this._tables[1],
						c = t.length,
						h = 1;
						if (4 !== c && 6 !== c && 8 !== c)
							throw new Error("Invalid aes key size");
						for (u = t.slice(0), d = [], this._key = [u, d], i = c; i < 4 * c + 28; i++)
							o = u[i - 1], (i % c === 0 || 8 === c && i % c === 4) && (o = l[o >>> 24] << 24 ^ l[o >> 16 & 255] << 16 ^ l[o >> 8 & 255] << 8 ^ l[255 & o], i % c === 0 && (o = o << 8 ^ o >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7))), u[i] = u[i - c] ^ o;
						for (r = 0; i; r++, i--)
							o = u[3 & r ? i : i - 4], i <= 4 || r < 4 ? d[r] = o : d[r] = f[0][l[o >>> 24]] ^ f[1][l[o >> 16 & 255]] ^ f[2][l[o >> 8 & 255]] ^ f[3][l[255 & o]]
					}
					return r(e, [{
								key: "decrypt",
								value: function (e, t, i, n, r, a) {
									var s = this._key[1],
									o = e ^ s[0],
									u = n ^ s[1],
									d = i ^ s[2],
									l = t ^ s[3],
									f = void 0,
									c = void 0,
									h = void 0,
									p = s.length / 4 - 2,
									m = void 0,
									g = 4,
									y = this._tables[1],
									v = y[0],
									b = y[1],
									_ = y[2],
									T = y[3],
									S = y[4];
									for (m = 0; m < p; m++)
										f = v[o >>> 24] ^ b[u >> 16 & 255] ^ _[d >> 8 & 255] ^ T[255 & l] ^ s[g], c = v[u >>> 24] ^ b[d >> 16 & 255] ^ _[l >> 8 & 255] ^ T[255 & o] ^ s[g + 1], h = v[d >>> 24] ^ b[l >> 16 & 255] ^ _[o >> 8 & 255] ^ T[255 & u] ^ s[g + 2], l = v[l >>> 24] ^ b[o >> 16 & 255] ^ _[u >> 8 & 255] ^ T[255 & d] ^ s[g + 3], g += 4, o = f, u = c, d = h;
									for (m = 0; m < 4; m++)
										r[(3 & -m) + a] = S[o >>> 24] << 24 ^ S[u >> 16 & 255] << 16 ^ S[d >> 8 & 255] << 8 ^ S[255 & l] ^ s[g++], f = o, o = u, u = d, d = l, l = f
								}
							}
						]),
					e
				}
				();
				i.default = o,
				t.exports = i.default
			}, {}
		],
		21: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				function a(e, t) {
					if ("function" != typeof t && null !== t)
						throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}),
					t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var s = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				o = function (e, t, i) {
					for (var n = !0; n; ) {
						var r = e,
						a = t,
						s = i;
						n = !1,
						null === r && (r = Function.prototype);
						var o = Object.getOwnPropertyDescriptor(r, a);
						if (void 0 !== o) {
							if ("value" in o)
								return o.value;
							var u = o.get;
							if (void 0 === u)
								return;
							return u.call(s)
						}
						var d = Object.getPrototypeOf(r);
						if (null === d)
							return;
						e = d,
						t = a,
						i = s,
						n = !0,
						o = d = void 0
					}
				},
				u = e("./stream"),
				d = n(u),
				l = function (e) {
					function t() {
						r(this, t),
						o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, d.default),
						this.jobs = [],
						this.delay = 1,
						this.timeout_ = null
					}
					return a(t, e),
					s(t, [{
								key: "processJob_",
								value: function () {
									this.jobs.shift()(),
									this.jobs.length ? this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay) : this.timeout_ = null
								}
							}, {
								key: "push",
								value: function (e) {
									this.jobs.push(e),
									this.timeout_ || (this.timeout_ = setTimeout(this.processJob_.bind(this), this.delay))
								}
							}
						]),
					t
				}
				(d.default);
				i.default = l,
				t.exports = i.default
			}, {
				"./stream": 24
			}
		],
		22: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var a = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				s = e("./aes"),
				o = n(s),
				u = e("./async-stream"),
				d = n(u),
				l = e("pkcs7"),
				f = function (e) {
					return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
				},
				c = function (e, t, i) {
					var n = new Int32Array(e.buffer, e.byteOffset, e.byteLength >> 2),
					r = new o.default(Array.prototype.slice.call(t)),
					a = new Uint8Array(e.byteLength),
					s = new Int32Array(a.buffer),
					u = void 0,
					d = void 0,
					l = void 0,
					c = void 0,
					h = void 0,
					p = void 0,
					m = void 0,
					g = void 0,
					y = void 0;
					for (u = i[0], d = i[1], l = i[2], c = i[3], y = 0; y < n.length; y += 4)
						h = f(n[y]), p = f(n[y + 1]), m = f(n[y + 2]), g = f(n[y + 3]), r.decrypt(h, p, m, g, s, y), s[y] = f(s[y] ^ u), s[y + 1] = f(s[y + 1] ^ d), s[y + 2] = f(s[y + 2] ^ l), s[y + 3] = f(s[y + 3] ^ c), u = h, d = p, l = m, c = g;
					return a
				};
				i.decrypt = c;
				var h = function () {
					function e(t, i, n, a) {
						r(this, e);
						var s = e.STEP,
						o = new Int32Array(t.buffer),
						u = new Uint8Array(t.byteLength),
						c = 0;
						for (this.asyncStream_ = new d.default, this.asyncStream_.push(this.decryptChunk_(o.subarray(c, c + s), i, n, u)), c = s; c < o.length; c += s)
							n = new Uint32Array([f(o[c - 4]), f(o[c - 3]), f(o[c - 2]), f(o[c - 1])]), this.asyncStream_.push(this.decryptChunk_(o.subarray(c, c + s), i, n, u));
						this.asyncStream_.push(function () {
							a(null, (0, l.unpad)(u))
						})
					}
					return a(e, [{
								key: "decryptChunk_",
								value: function (e, t, i, n) {
									return function () {
										var r = c(e, t, i);
										n.set(r, e.byteOffset)
									}
								}
							}
						], [{
								key: "STEP",
								get: function () {
									return 32e3
								}
							}
						]),
					e
				}
				();
				i.Decrypter = h,
				i.default = {
					Decrypter: h,
					decrypt: c
				}
			}, {
				"./aes": 20,
				"./async-stream": 21,
				pkcs7: 26
			}
		],
		23: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = e("./decrypter"),
				a = e("./async-stream"),
				s = n(a);
				i.default = {
					decrypt: r.decrypt,
					Decrypter: r.Decrypter,
					AsyncStream: s.default
				},
				t.exports = i.default
			}, {
				"./async-stream": 21,
				"./decrypter": 22
			}
		],
		24: [function (e, t, i) {
				arguments[4][16][0].apply(i, arguments)
			}, {
				dup: 16
			}
		],
		25: [function (e, t, i) {
				var n;
				t.exports = function (e) {
					var t = n[e.byteLength % 16 || 0],
					i = new Uint8Array(e.byteLength + t.length);
					return i.set(e),
					i.set(t, e.byteLength),
					i
				},
				n = [[16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14], [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13], [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12], [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [9, 9, 9, 9, 9, 9, 9, 9, 9], [8, 8, 8, 8, 8, 8, 8, 8], [7, 7, 7, 7, 7, 7, 7], [6, 6, 6, 6, 6, 6], [5, 5, 5, 5, 5], [4, 4, 4, 4], [3, 3, 3], [2, 2], [1]]
			}, {}
		],
		26: [function (e, t, i) {
				i.pad = e("./pad.js"),
				i.unpad = e("./unpad.js")
			}, {
				"./pad.js": 25,
				"./unpad.js": 27
			}
		],
		27: [function (e, t, i) {
				t.exports = function (e) {
					return e.subarray(0, e.byteLength - e[e.byteLength - 1])
				}
			}, {}
		],
		28: [function (e, t, i) {}, {}
		],
		29: [function (e, t, i) {
				(function (i) {
					var n = "undefined" != typeof i ? i : "undefined" != typeof window ? window : {},
					r = e("min-document");
					if ("undefined" != typeof document)
						t.exports = document;
					else {
						var a = n["__GLOBAL_DOCUMENT_CACHE@4"];
						a || (a = n["__GLOBAL_DOCUMENT_CACHE@4"] = r),
						t.exports = a
					}
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"min-document": 28
			}
		],
		30: [function (e, t, i) {
				(function (e) {
					"undefined" != typeof window ? t.exports = window : "undefined" != typeof e ? t.exports = e : "undefined" != typeof self ? t.exports = self : t.exports = {}
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {}
		],
		31: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				var r = e("./line-stream"),
				a = n(r),
				s = e("./parse-stream"),
				o = n(s),
				u = e("./parser"),
				d = n(u);
				t.exports = {
					LineStream: a.default,
					ParseStream: o.default,
					Parser: d.default
				}
			}, {
				"./line-stream": 32,
				"./parse-stream": 33,
				"./parser": 34
			}
		],
		32: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				function a(e, t) {
					if (!e)
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return !t || "object" != typeof t && "function" != typeof t ? e : t
				}
				function s(e, t) {
					if ("function" != typeof t && null !== t)
						throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}),
					t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var o = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				u = e("./stream"),
				d = n(u),
				l = function (e) {
					function t() {
						r(this, t);
						var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
						return e.buffer = "",
						e
					}
					return s(t, e),
					o(t, [{
								key: "push",
								value: function (e) {
									var t = void 0;
									for (this.buffer += e, t = this.buffer.indexOf("\n"); t > -1; t = this.buffer.indexOf("\n"))
										this.trigger("data", this.buffer.substring(0, t)), this.buffer = this.buffer.substring(t + 1)
								}
							}
						]),
					t
				}
				(d.default);
				i.default = l
			}, {
				"./stream": 35
			}
		],
		33: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				function a(e, t) {
					if (!e)
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return !t || "object" != typeof t && "function" != typeof t ? e : t
				}
				function s(e, t) {
					if ("function" != typeof t && null !== t)
						throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}),
					t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var o = function () {
					function e(e, t) {
						var i = [],
						n = !0,
						r = !1,
						a = void 0;
						try {
							for (var s, o = e[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0);
						} catch (e) {
							r = !0,
							a = e
						} finally {
							try {
								!n && o.return && o.return()
							} finally {
								if (r)
									throw a
							}
						}
						return i
					}
					return function (t, i) {
						if (Array.isArray(t))
							return t;
						if (Symbol.iterator in Object(t))
							return e(t, i);
						throw new TypeError("Invalid attempt to destructure non-iterable instance")
					}
				}
				(),
				u = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				d = e("./stream"),
				l = n(d),
				f = function () {
					var e = "[^=]*",
					t = '"[^"]*"|[^,]*',
					i = "(?:" + e + ")=(?:" + t + ")";
					return new RegExp("(?:^|,)(" + i + ")")
				},
				c = function (e) {
					for (var t = e.split(f()), i = {}, n = t.length, r = void 0; n--; )
						"" !== t[n] && (r = /([^=]*)=(.*)/.exec(t[n]).slice(1), r[0] = r[0].replace(/^\s+|\s+$/g, ""), r[1] = r[1].replace(/^\s+|\s+$/g, ""), r[1] = r[1].replace(/^['"](.*)['"]$/g, "$1"), i[r[0]] = r[1]);
					return i
				},
				h = function (e) {
					function t() {
						return r(this, t),
						a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this))
					}
					return s(t, e),
					u(t, [{
								key: "push",
								value: function (e) {
									var t = void 0,
									i = void 0;
									if (e = e.replace(/^[\u0000\s]+|[\u0000\s]+$/g, ""), 0 !== e.length) {
										if ("#" !== e[0])
											return void this.trigger("data", {
												type: "uri",
												uri: e
											});
										if (0 !== e.indexOf("#EXT"))
											return void this.trigger("data", {
												type: "comment",
												text: e.slice(1)
											});
										if (e = e.replace("\r", ""), t = /^#EXTM3U/.exec(e))
											return void this.trigger("data", {
												type: "tag",
												tagType: "m3u"
											});
										if (t = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(e))
											return i = {
												type: "tag",
												tagType: "inf"
											},
										t[1] && (i.duration = parseFloat(t[1])),
										t[2] && (i.title = t[2]),
										void this.trigger("data", i);
										if (t = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "targetduration"
											},
										t[1] && (i.duration = parseInt(t[1], 10)),
										void this.trigger("data", i);
										if (t = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "totalduration"
											},
										t[1] && (i.duration = parseInt(t[1], 10)),
										void this.trigger("data", i);
										if (t = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "version"
											},
										t[1] && (i.version = parseInt(t[1], 10)),
										void this.trigger("data", i);
										if (t = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "media-sequence"
											},
										t[1] && (i.number = parseInt(t[1], 10)),
										void this.trigger("data", i);
										if (t = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "discontinuity-sequence"
											},
										t[1] && (i.number = parseInt(t[1], 10)),
										void this.trigger("data", i);
										if (t = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(e))
											return i = {
												type: "tag",
												tagType: "playlist-type"
											},
										t[1] && (i.playlistType = t[1]),
										void this.trigger("data", i);
										if (t = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "byterange"
											},
										t[1] && (i.length = parseInt(t[1], 10)),
										t[2] && (i.offset = parseInt(t[2], 10)),
										void this.trigger("data", i);
										if (t = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(e))
											return i = {
												type: "tag",
												tagType: "allow-cache"
											},
										t[1] && (i.allowed = !/NO/.test(t[1])),
										void this.trigger("data", i);
										if (t = /^#EXT-X-MAP:?(.*)$/.exec(e)) {
											if (i = {
													type: "tag",
													tagType: "map"
												}, t[1]) {
												var n = c(t[1]);
												if (n.URI && (i.uri = n.URI), n.BYTERANGE) {
													var r = n.BYTERANGE.split("@"),
													a = o(r, 2),
													s = a[0],
													u = a[1];
													i.byterange = {},
													s && (i.byterange.length = parseInt(s, 10)),
													u && (i.byterange.offset = parseInt(u, 10))
												}
											}
											return void this.trigger("data", i)
										}
										if (t = /^#EXT-X-STREAM-INF:?(.*)$/.exec(e)) {
											if (i = {
													type: "tag",
													tagType: "stream-inf"
												}, t[1]) {
												if (i.attributes = c(t[1]), i.attributes.RESOLUTION) {
													var d = i.attributes.RESOLUTION.split("x"),
													l = {};
													d[0] && (l.width = parseInt(d[0], 10)),
													d[1] && (l.height = parseInt(d[1], 10)),
													i.attributes.RESOLUTION = l
												}
												i.attributes.BANDWIDTH && (i.attributes.BANDWIDTH = parseInt(i.attributes.BANDWIDTH, 10)),
												i.attributes["PROGRAM-ID"] && (i.attributes["PROGRAM-ID"] = parseInt(i.attributes["PROGRAM-ID"], 10))
											}
											return void this.trigger("data", i)
										}
										return (t = /^#EXT-X-MEDIA:?(.*)$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "media"
											}, t[1] && (i.attributes = c(t[1])), void this.trigger("data", i)) : (t = /^#EXT-X-ENDLIST/.exec(e)) ? void this.trigger("data", {
											type: "tag",
											tagType: "endlist"
										}) : (t = /^#EXT-X-DISCONTINUITY/.exec(e)) ? void this.trigger("data", {
											type: "tag",
											tagType: "discontinuity"
										}) : (t = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "program-date-time"
											}, t[1] && (i.dateTimeString = t[1], i.dateTimeObject = new Date(t[1])), void this.trigger("data", i)) : (t = /^#EXT-X-KEY:?(.*)$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "key"
											}, t[1] && (i.attributes = c(t[1]), i.attributes.IV && ("0x" === i.attributes.IV.substring(0, 2).toLowerCase() && (i.attributes.IV = i.attributes.IV.substring(2)), i.attributes.IV = i.attributes.IV.match(/.{8}/g), i.attributes.IV[0] = parseInt(i.attributes.IV[0], 16), i.attributes.IV[1] = parseInt(i.attributes.IV[1], 16), i.attributes.IV[2] = parseInt(i.attributes.IV[2], 16), i.attributes.IV[3] = parseInt(i.attributes.IV[3], 16), i.attributes.IV = new Uint32Array(i.attributes.IV))), void this.trigger("data", i)) : (t = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "cue-out-cont"
											}, t[1] ? i.data = t[1] : i.data = "", void this.trigger("data", i)) : (t = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "cue-out"
											}, t[1] ? i.data = t[1] : i.data = "", void this.trigger("data", i)) : (t = /^#EXT-X-CUE-IN:?(.*)?$/.exec(e)) ? (i = {
												type: "tag",
												tagType: "cue-in"
											}, t[1] ? i.data = t[1] : i.data = "", void this.trigger("data", i)) : void this.trigger("data", {
											type: "tag",
											data: e.slice(4)
										})
									}
								}
							}
						]),
					t
				}
				(l.default);
				i.default = h
			}, {
				"./stream": 35
			}
		],
		34: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				function a(e, t) {
					if (!e)
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
					return !t || "object" != typeof t && "function" != typeof t ? e : t
				}
				function s(e, t) {
					if ("function" != typeof t && null !== t)
						throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}),
					t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var o = Object.assign || function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var i = arguments[t];
						for (var n in i)
							Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
					}
					return e
				},
				u = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				d = e("./stream"),
				l = n(d),
				f = e("./line-stream"),
				c = n(f),
				h = e("./parse-stream"),
				p = n(h),
				m = function (e) {
					function t() {
						r(this, t);
						var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
						e.lineStream = new c.default,
						e.parseStream = new p.default,
						e.lineStream.pipe(e.parseStream);
						var i = e,
						n = [],
						s = {},
						u = void 0,
						d = void 0,
						l = function () {},
						f = {
							AUDIO: {},
							VIDEO: {},
							"CLOSED-CAPTIONS": {},
							SUBTITLES: {}
						},
						h = 0;
						return e.manifest = {
							allowCache: !0,
							discontinuityStarts: [],
							segments: []
						},
						e.parseStream.on("data", function (e) {
							var t = void 0,
							r = void 0;
							({
								tag: function () {
									(({
											"allow-cache": function () {
												this.manifest.allowCache = e.allowed,
												"allowed" in e || (this.trigger("info", {
														message: "defaulting allowCache to YES"
													}), this.manifest.allowCache = !0)
											},
											byterange: function t() {
												var t = {};
												"length" in e && (s.byterange = t, t.length = e.length, "offset" in e || (this.trigger("info", {
															message: "defaulting offset to zero"
														}), e.offset = 0)),
												"offset" in e && (s.byterange = t, t.offset = e.offset)
											},
											endlist: function () {
												this.manifest.endList = !0
											},
											inf: function () {
												"mediaSequence" in this.manifest || (this.manifest.mediaSequence = 0, this.trigger("info", {
														message: "defaulting media sequence to zero"
													})),
												"discontinuitySequence" in this.manifest || (this.manifest.discontinuitySequence = 0, this.trigger("info", {
														message: "defaulting discontinuity sequence to zero"
													})),
												e.duration > 0 && (s.duration = e.duration),
												0 === e.duration && (s.duration = .01, this.trigger("info", {
														message: "updating zero segment duration to a small value"
													})),
												this.manifest.segments = n
											},
											key: function () {
												return e.attributes ? "NONE" === e.attributes.METHOD ? void(d = null) : e.attributes.URI ? (e.attributes.METHOD || this.trigger("warn", {
														message: "defaulting key method to AES-128"
													}), d = {
														method: e.attributes.METHOD || "AES-128",
														uri: e.attributes.URI
													}, void("undefined" != typeof e.attributes.IV && (d.iv = e.attributes.IV))) : void this.trigger("warn", {
													message: "ignoring key declaration without URI"
												}) : void this.trigger("warn", {
													message: "ignoring key declaration without attribute list"
												})
											},
											"media-sequence": function () {
												return isFinite(e.number) ? void(this.manifest.mediaSequence = e.number) : void this.trigger("warn", {
													message: "ignoring invalid media sequence: " + e.number
												})
											},
											"discontinuity-sequence": function () {
												return isFinite(e.number) ? (this.manifest.discontinuitySequence = e.number, void(h = e.number)) : void this.trigger("warn", {
													message: "ignoring invalid discontinuity sequence: " + e.number
												})
											},
											"playlist-type": function () {
												return /VOD|EVENT/.test(e.playlistType) ? void(this.manifest.playlistType = e.playlistType) : void this.trigger("warn", {
													message: "ignoring unknown playlist type: " + e.playlist
												})
											},
											map: function () {
												u = {},
												e.uri && (u.uri = e.uri),
												e.byterange && (u.byterange = e.byterange)
											},
											"stream-inf": function () {
												return this.manifest.playlists = n,
												this.manifest.mediaGroups = this.manifest.mediaGroups || f,
												e.attributes ? (s.attributes || (s.attributes = {}), void o(s.attributes, e.attributes)) : void this.trigger("warn", {
													message: "ignoring empty stream-inf attributes"
												})
											},
											media: function () {
												if (this.manifest.mediaGroups = this.manifest.mediaGroups || f, !(e.attributes && e.attributes.TYPE && e.attributes["GROUP-ID"] && e.attributes.NAME))
													return void this.trigger("warn", {
														message: "ignoring incomplete or missing media group"
													});
												var i = this.manifest.mediaGroups[e.attributes.TYPE];
												i[e.attributes["GROUP-ID"]] = i[e.attributes["GROUP-ID"]] || {},
												t = i[e.attributes["GROUP-ID"]],
												r = {
												default:
													/yes/i.test(e.attributes.DEFAULT)
												},
												r.default ? r.autoselect = !0 : r.autoselect = /yes/i.test(e.attributes.AUTOSELECT),
												e.attributes.LANGUAGE && (r.language = e.attributes.LANGUAGE),
												e.attributes.URI && (r.uri = e.attributes.URI),
												e.attributes["INSTREAM-ID"] && (r.instreamId = e.attributes["INSTREAM-ID"]),
												e.attributes.CHARACTERISTICS && (r.characteristics = e.attributes.CHARACTERISTICS),
												e.attributes.FORCED && (r.forced = /yes/i.test(e.attributes.FORCED)),
												t[e.attributes.NAME] = r
											},
											discontinuity: function () {
												h += 1,
												s.discontinuity = !0,
												this.manifest.discontinuityStarts.push(n.length)
											},
											"program-date-time": function () {
												this.manifest.dateTimeString = e.dateTimeString,
												this.manifest.dateTimeObject = e.dateTimeObject
											},
											targetduration: function () {
												return !isFinite(e.duration) || e.duration < 0 ? void this.trigger("warn", {
													message: "ignoring invalid target duration: " + e.duration
												}) : void(this.manifest.targetDuration = e.duration)
											},
											totalduration: function () {
												return !isFinite(e.duration) || e.duration < 0 ? void this.trigger("warn", {
													message: "ignoring invalid total duration: " + e.duration
												}) : void(this.manifest.totalDuration = e.duration)
											},
											"cue-out": function () {
												s.cueOut = e.data
											},
											"cue-out-cont": function () {
												s.cueOutCont = e.data
											},
											"cue-in": function () {
												s.cueIn = e.data
											}
										})[e.tagType] || l).call(i)
								},
								uri: function () {
									s.uri = e.uri,
									n.push(s),
									!this.manifest.targetDuration || "duration" in s || (this.trigger("warn", {
											message: "defaulting segment duration to the target duration"
										}), s.duration = this.manifest.targetDuration),
									d && (s.key = d),
									s.timeline = h,
									u && (s.map = u),
									s = {}
								},
								comment: function () {}
							})[e.type].call(i)
						}),
						e
					}
					return s(t, e),
					u(t, [{
								key: "push",
								value: function (e) {
									this.lineStream.push(e)
								}
							}, {
								key: "end",
								value: function () {
									this.lineStream.push("\n")
								}
							}
						]),
					t
				}
				(l.default);
				i.default = m
			}, {
				"./line-stream": 32,
				"./parse-stream": 33,
				"./stream": 35
			}
		],
		35: [function (e, t, i) {
				function n(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var r = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				a = function () {
					function e() {
						n(this, e),
						this.listeners = {}
					}
					return r(e, [{
								key: "on",
								value: function (e, t) {
									this.listeners[e] || (this.listeners[e] = []),
									this.listeners[e].push(t)
								}
							}, {
								key: "off",
								value: function (e, t) {
									if (!this.listeners[e])
										return !1;
									var i = this.listeners[e].indexOf(t);
									return this.listeners[e].splice(i, 1),
									i > -1
								}
							}, {
								key: "trigger",
								value: function (e) {
									var t = this.listeners[e],
									i = void 0,
									n = void 0,
									r = void 0;
									if (t)
										if (2 === arguments.length)
											for (n = t.length, i = 0; i < n; ++i)
												t[i].call(this, arguments[1]);
										else
											for (r = Array.prototype.slice.call(arguments, 1), n = t.length, i = 0; i < n; ++i)
												t[i].apply(this, r)
								}
							}, {
								key: "dispose",
								value: function () {
									this.listeners = {}
								}
							}, {
								key: "pipe",
								value: function (e) {
									this.on("data", function (t) {
										e.push(t)
									})
								}
							}
						]),
					e
				}
				();
				i.default = a
			}, {}
		],
		36: [function (e, t, i) {
				var n,
				r = e("../utils/stream.js");
				n = function () {
					var e = new Uint8Array,
					t = 0;
					n.prototype.init.call(this),
					this.setTimestamp = function (e) {
						t = e
					},
					this.parseId3TagSize = function (e, t) {
						var i = e[t + 6] << 21 | e[t + 7] << 14 | e[t + 8] << 7 | e[t + 9],
						n = e[t + 5],
						r = (16 & n) >> 4;
						return r ? i + 20 : i + 10
					},
					this.parseAdtsSize = function (e, t) {
						var i = (224 & e[t + 5]) >> 5,
						n = e[t + 4] << 3,
						r = 6144 & e[t + 3];
						return r | n | i
					},
					this.push = function (i) {
						var n,
						r,
						a,
						s,
						o = 0,
						u = 0;
						for (e.length ? (s = e.length, e = new Uint8Array(i.byteLength + s), e.set(e.subarray(0, s)), e.set(i, s)) : e = i; e.length - u >= 3; )
							if (e[u] !== "I".charCodeAt(0) || e[u + 1] !== "D".charCodeAt(0) || e[u + 2] !== "3".charCodeAt(0))
								if (e[u] & !0 && 240 === (240 & e[u + 1])) {
									if (e.length - u < 7)
										break;
									if (o = this.parseAdtsSize(e, u), o > e.length)
										break;
									a = {
										type: "audio",
										data: e.subarray(u, u + o),
										pts: t,
										dts: t
									},
									this.trigger("data", a),
									u += o
								} else
									u++;
							else {
								if (e.length - u < 10)
									break;
								if (o = this.parseId3TagSize(e, u), o > e.length)
									break;
								r = {
									type: "timed-metadata",
									data: e.subarray(u, u + o)
								},
								this.trigger("data", r),
								u += o
							}
						n = e.length - u,
						e = n > 0 ? e.subarray(u) : new Uint8Array
					}
				},
				n.prototype = new r,
				t.exports = n
			}, {
				"../utils/stream.js": 60
			}
		],
		37: [function (e, t, i) {
				var n = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],
				r = function (e) {
					return e[0] << 21 | e[1] << 14 | e[2] << 7 | e[3]
				},
				a = function (e, t, i) {
					var n,
					r = "";
					for (n = t; n < i; n++)
						r += "%" + ("00" + e[n].toString(16)).slice(-2);
					return r
				},
				s = function (e, t, i) {
					return unescape(a(e, t, i))
				},
				o = function (e, t) {
					var i = e[t + 6] << 21 | e[t + 7] << 14 | e[t + 8] << 7 | e[t + 9],
					n = e[t + 5],
					r = (16 & n) >> 4;
					return r ? i + 20 : i + 10
				},
				u = function (e, t) {
					var i = (224 & e[t + 5]) >> 5,
					n = e[t + 4] << 3,
					r = 6144 & e[t + 3];
					return r | n | i
				},
				d = function (e, t) {
					return e[t] === "I".charCodeAt(0) && e[t + 1] === "D".charCodeAt(0) && e[t + 2] === "3".charCodeAt(0) ? "timed-metadata" : e[t] & !0 && 240 === (240 & e[t + 1]) ? "audio" : null
				},
				l = function (e) {
					for (var t = 0; t + 5 < e.length; ) {
						if (255 === e[t] && 240 === (246 & e[t + 1]))
							return n[(60 & e[t + 2]) >>> 2];
						t++
					}
					return null
				},
				f = function (e) {
					var t,
					i,
					n,
					a;
					t = 10,
					64 & e[5] && (t += 4, t += r(e.subarray(10, 14)));
					do {
						if (i = r(e.subarray(t + 4, t + 8)), i < 1)
							return null;
						if (a = String.fromCharCode(e[t], e[t + 1], e[t + 2], e[t + 3]), "PRIV" === a) {
							n = e.subarray(t + 10, t + i + 10);
							for (var o = 0; o < n.byteLength; o++)
								if (0 === n[o]) {
									var u = s(n, 0, o);
									if ("com.apple.streaming.transportStreamTimestamp" === u) {
										var d = n.subarray(o + 1),
										l = (1 & d[3]) << 30 | d[4] << 22 | d[5] << 14 | d[6] << 6 | d[7] >>> 2;
										return l *= 4,
										l += 3 & d[7]
									}
									break
								}
						}
						t += 10,
						t += i
					} while (t < e.byteLength);
					return null
				};
				t.exports = {
					parseId3TagSize: o,
					parseAdtsSize: u,
					parseType: d,
					parseSampleRate: l,
					parseAacTimestamp: f
				}
			}, {}
		],
		38: [function (e, t, i) {
				var n,
				r = e("../utils/stream.js"),
				a = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
				n = function () {
					var e;
					n.prototype.init.call(this),
					this.push = function (t) {
						var i,
						n,
						r,
						s,
						o,
						u,
						d = 0,
						l = 0;
						if ("audio" === t.type)
							for (e ? (s = e, e = new Uint8Array(s.byteLength + t.data.byteLength), e.set(s), e.set(t.data, s.byteLength)) : e = t.data; d + 5 < e.length; )
								if (255 === e[d] && 240 === (246 & e[d + 1])) {
									if (n = 2 * (1 & ~e[d + 1]), i = (3 & e[d + 3]) << 11 | e[d + 4] << 3 | (224 & e[d + 5]) >> 5, o = 1024 * ((3 & e[d + 6]) + 1), u = 9e4 * o / a[(60 & e[d + 2]) >>> 2], r = d + i, e.byteLength < r)
										return;
									if (this.trigger("data", {
											pts: t.pts + l * u,
											dts: t.dts + l * u,
											sampleCount: o,
											audioobjecttype: (e[d + 2] >>> 6 & 3) + 1,
											channelcount: (1 & e[d + 2]) << 2 | (192 & e[d + 3]) >>> 6,
											samplerate: a[(60 & e[d + 2]) >>> 2],
											samplingfrequencyindex: (60 & e[d + 2]) >>> 2,
											samplesize: 16,
											data: e.subarray(d + 7 + n, r)
										}), e.byteLength === r)
										return void(e = void 0);
									l++,
									e = e.subarray(r)
								} else
									d++
					},
					this.flush = function () {
						this.trigger("done")
					}
				},
				n.prototype = new r,
				t.exports = n
			}, {
				"../utils/stream.js": 60
			}
		],
		39: [function (e, t, i) {
				var n,
				r,
				a,
				s = e("../utils/stream.js"),
				o = e("../utils/exp-golomb.js");
				r = function () {
					var e,
					t,
					i = 0;
					r.prototype.init.call(this),
					this.push = function (n) {
						var r;
						for (t ? (r = new Uint8Array(t.byteLength + n.data.byteLength), r.set(t), r.set(n.data, t.byteLength), t = r) : t = n.data; i < t.byteLength - 3; i++)
							if (1 === t[i + 2]) {
								e = i + 5;
								break
							}
						for (; e < t.byteLength; )
							switch (t[e]) {
							case 0:
								if (0 !== t[e - 1]) {
									e += 2;
									break
								}
								if (0 !== t[e - 2]) {
									e++;
									break
								}
								i + 3 !== e - 2 && this.trigger("data", t.subarray(i + 3, e - 2));
								do
									e++;
								while (1 !== t[e] && e < t.length);
								i = e - 2,
								e += 3;
								break;
							case 1:
								if (0 !== t[e - 1] || 0 !== t[e - 2]) {
									e += 3;
									break
								}
								this.trigger("data", t.subarray(i + 3, e - 2)),
								i = e - 2,
								e += 3;
								break;
							default:
								e += 3
							}
						t = t.subarray(i),
						e -= i,
						i = 0
					},
					this.flush = function () {
						t && t.byteLength > 3 && this.trigger("data", t.subarray(i + 3)),
						t = null,
						i = 0,
						this.trigger("done")
					}
				},
				r.prototype = new s,
				a = {
					100: !0,
					110: !0,
					122: !0,
					244: !0,
					44: !0,
					83: !0,
					86: !0,
					118: !0,
					128: !0,
					138: !0,
					139: !0,
					134: !0
				},
				n = function () {
					var e,
					t,
					i,
					s,
					u,
					d,
					l,
					f = new r;
					n.prototype.init.call(this),
					e = this,
					this.push = function (e) {
						"video" === e.type && (t = e.trackId, i = e.pts, s = e.dts, f.push(e))
					},
					f.on("data", function (n) {
						var r = {
							trackId: t,
							pts: i,
							dts: s,
							data: n
						};
						switch (31 & n[0]) {
						case 5:
							r.nalUnitType = "slice_layer_without_partitioning_rbsp_idr";
							break;
						case 6:
							r.nalUnitType = "sei_rbsp",
							r.escapedRBSP = u(n.subarray(1));
							break;
						case 7:
							r.nalUnitType = "seq_parameter_set_rbsp",
							r.escapedRBSP = u(n.subarray(1)),
							r.config = d(r.escapedRBSP);
							break;
						case 8:
							r.nalUnitType = "pic_parameter_set_rbsp";
							break;
						case 9:
							r.nalUnitType = "access_unit_delimiter_rbsp"
						}
						e.trigger("data", r)
					}),
					f.on("done", function () {
						e.trigger("done")
					}),
					this.flush = function () {
						f.flush()
					},
					l = function (e, t) {
						var i,
						n,
						r = 8,
						a = 8;
						for (i = 0; i < e; i++)
							0 !== a && (n = t.readExpGolomb(), a = (r + n + 256) % 256), r = 0 === a ? r : a
					},
					u = function (e) {
						for (var t, i, n = e.byteLength, r = [], a = 1; a < n - 2; )
							0 === e[a] && 0 === e[a + 1] && 3 === e[a + 2] ? (r.push(a + 2), a += 2) : a++;
						if (0 === r.length)
							return e;
						t = n - r.length,
						i = new Uint8Array(t);
						var s = 0;
						for (a = 0; a < t; s++, a++)
							s === r[0] && (s++, r.shift()), i[a] = e[s];
						return i
					},
					d = function (e) {
						var t,
						i,
						n,
						r,
						s,
						u,
						d,
						f,
						c,
						h,
						p,
						m,
						g,
						y,
						v = 0,
						b = 0,
						_ = 0,
						T = 0,
						S = 1;
						if (t = new o(e), i = t.readUnsignedByte(), r = t.readUnsignedByte(), n = t.readUnsignedByte(), t.skipUnsignedExpGolomb(), a[i] && (s = t.readUnsignedExpGolomb(), 3 === s && t.skipBits(1), t.skipUnsignedExpGolomb(), t.skipUnsignedExpGolomb(), t.skipBits(1), t.readBoolean()))
							for (p = 3 !== s ? 8 : 12, y = 0; y < p; y++)
								t.readBoolean() && (y < 6 ? l(16, t) : l(64, t));
						if (t.skipUnsignedExpGolomb(), u = t.readUnsignedExpGolomb(), 0 === u)
							t.readUnsignedExpGolomb();
						else if (1 === u)
							for (t.skipBits(1), t.skipExpGolomb(), t.skipExpGolomb(), d = t.readUnsignedExpGolomb(), y = 0; y < d; y++)
								t.skipExpGolomb();
						if (t.skipUnsignedExpGolomb(), t.skipBits(1), f = t.readUnsignedExpGolomb(), c = t.readUnsignedExpGolomb(), h = t.readBits(1), 0 === h && t.skipBits(1), t.skipBits(1), t.readBoolean() && (v = t.readUnsignedExpGolomb(), b = t.readUnsignedExpGolomb(), _ = t.readUnsignedExpGolomb(), T = t.readUnsignedExpGolomb()), t.readBoolean() && t.readBoolean()) {
							switch (g = t.readUnsignedByte()) {
							case 1:
								m = [1, 1];
								break;
							case 2:
								m = [12, 11];
								break;
							case 3:
								m = [10, 11];
								break;
							case 4:
								m = [16, 11];
								break;
							case 5:
								m = [40, 33];
								break;
							case 6:
								m = [24, 11];
								break;
							case 7:
								m = [20, 11];
								break;
							case 8:
								m = [32, 11];
								break;
							case 9:
								m = [80, 33];
								break;
							case 10:
								m = [18, 11];
								break;
							case 11:
								m = [15, 11];
								break;
							case 12:
								m = [64, 33];
								break;
							case 13:
								m = [160, 99];
								break;
							case 14:
								m = [4, 3];
								break;
							case 15:
								m = [3, 2];
								break;
							case 16:
								m = [2, 1];
								break;
							case 255:
								m = [t.readUnsignedByte() << 8 | t.readUnsignedByte(), t.readUnsignedByte() << 8 | t.readUnsignedByte()]
							}
							m && (S = m[0] / m[1])
						}
						return {
							profileIdc: i,
							levelIdc: n,
							profileCompatibility: r,
							width: Math.ceil((16 * (f + 1) - 2 * v - 2 * b) * S),
							height: (2 - h) * (c + 1) * 16 - 2 * _ - 2 * T
						}
					}
				},
				n.prototype = new s,
				t.exports = {
					H264Stream: n,
					NalByteStream: r
				}
			}, {
				"../utils/exp-golomb.js": 59,
				"../utils/stream.js": 60
			}
		],
		40: [function (e, t, i) {
				var n = [33, 16, 5, 32, 164, 27],
				r = [33, 65, 108, 84, 1, 2, 4, 8, 168, 2, 4, 8, 17, 191, 252],
				a = function (e) {
					for (var t = []; e--; )
						t.push(0);
					return t
				},
				s = function (e) {
					return Object.keys(e).reduce(function (t, i) {
						return t[i] = new Uint8Array(e[i].reduce(function (e, t) {
									return e.concat(t)
								}, [])),
						t
					}, {})
				},
				o = {
					96e3: [n, [227, 64], a(154), [56]],
					88200: [n, [231], a(170), [56]],
					64e3: [n, [248, 192], a(240), [56]],
					48e3: [n, [255, 192], a(268), [55, 148, 128], a(54), [112]],
					44100: [n, [255, 192], a(268), [55, 163, 128], a(84), [112]],
					32e3: [n, [255, 192], a(268), [55, 234], a(226), [112]],
					24e3: [n, [255, 192], a(268), [55, 255, 128], a(268), [111, 112], a(126), [224]],
					16e3: [n, [255, 192], a(268), [55, 255, 128], a(268), [111, 255], a(269), [223, 108], a(195), [1, 192]],
					12e3: [r, a(268), [3, 127, 248], a(268), [6, 255, 240], a(268), [13, 255, 224], a(268), [27, 253, 128], a(259), [56]],
					11025: [r, a(268), [3, 127, 248], a(268), [6, 255, 240], a(268), [13, 255, 224], a(268), [27, 255, 192], a(268), [55, 175, 128], a(108), [112]],
					8e3: [r, a(268), [3, 121, 16], a(47), [7]]
				};
				t.exports = s(o)
			}, {}
		],
		41: [function (e, t, i) {
				var n = e("../utils/stream.js"),
				r = function (e) {
					this.numberOfTracks = 0,
					this.metadataStream = e.metadataStream,
					this.videoTags = [],
					this.audioTags = [],
					this.videoTrack = null,
					this.audioTrack = null,
					this.pendingCaptions = [],
					this.pendingMetadata = [],
					this.pendingTracks = 0,
					this.processedTracks = 0,
					r.prototype.init.call(this),
					this.push = function (e) {
						return e.text ? this.pendingCaptions.push(e) : e.frames ? this.pendingMetadata.push(e) : ("video" === e.track.type && (this.videoTrack = e.track, this.videoTags = e.tags, this.pendingTracks++), void("audio" === e.track.type && (this.audioTrack = e.track, this.audioTags = e.tags, this.pendingTracks++)))
					}
				};
				r.prototype = new n,
				r.prototype.flush = function (e) {
					var t,
					i,
					n,
					r,
					a = {
						tags: {},
						captions: [],
						metadata: []
					};
					if (this.pendingTracks < this.numberOfTracks) {
						if ("VideoSegmentStream" !== e && "AudioSegmentStream" !== e)
							return;
						if (0 === this.pendingTracks && (this.processedTracks++, this.processedTracks < this.numberOfTracks))
							return
					}
					if (this.processedTracks += this.pendingTracks, this.pendingTracks = 0, !(this.processedTracks < this.numberOfTracks)) {
						for (this.videoTrack ? r = this.videoTrack.timelineStartInfo.pts : this.audioTrack && (r = this.audioTrack.timelineStartInfo.pts), a.tags.videoTags = this.videoTags, a.tags.audioTags = this.audioTags, n = 0; n < this.pendingCaptions.length; n++)
							i = this.pendingCaptions[n], i.startTime = i.startPts - r, i.startTime /= 9e4, i.endTime = i.endPts - r, i.endTime /= 9e4, a.captions.push(i);
						for (n = 0; n < this.pendingMetadata.length; n++)
							t = this.pendingMetadata[n], t.cueTime = t.pts - r, t.cueTime /= 9e4, a.metadata.push(t);
						a.metadata.dispatchType = this.metadataStream.dispatchType,
						this.videoTrack = null,
						this.audioTrack = null,
						this.videoTags = [],
						this.audioTags = [],
						this.pendingCaptions.length = 0,
						this.pendingMetadata.length = 0,
						this.pendingTracks = 0,
						this.processedTracks = 0,
						this.trigger("data", a),
						this.trigger("done")
					}
				},
				t.exports = r
			}, {
				"../utils/stream.js": 60
			}
		],
		42: [function (e, t, i) {
				var n = e("./flv-tag.js"),
				r = function (e, t, i) {
					var r,
					a,
					s,
					o = new Uint8Array(9),
					u = new DataView(o.buffer);
					return e = e || 0,
					t = void 0 === t || t,
					i = void 0 === i || i,
					u.setUint8(0, 70),
					u.setUint8(1, 76),
					u.setUint8(2, 86),
					u.setUint8(3, 1),
					u.setUint8(4, (t ? 4 : 0) | (i ? 1 : 0)),
					u.setUint32(5, o.byteLength),
					e <= 0 ? (a = new Uint8Array(o.byteLength + 4), a.set(o), a.set([0, 0, 0, 0], o.byteLength), a) : (r = new n(n.METADATA_TAG), r.pts = r.dts = 0, r.writeMetaDataDouble("duration", e), s = r.finalize().length, a = new Uint8Array(o.byteLength + s), a.set(o), a.set(u.byteLength, s), a)
				};
				t.exports = r
			}, {
				"./flv-tag.js": 43
			}
		],
		43: [function (e, t, i) {
				var n;
				n = function (e, t) {
					var i,
					r = 0,
					a = 16384,
					s = function (e, t) {
						var i,
						n = e.position + t;
						n < e.bytes.byteLength || (i = new Uint8Array(2 * n), i.set(e.bytes.subarray(0, e.position), 0), e.bytes = i, e.view = new DataView(e.bytes.buffer))
					},
					o = n.widthBytes || new Uint8Array("width".length),
					u = n.heightBytes || new Uint8Array("height".length),
					d = n.videocodecidBytes || new Uint8Array("videocodecid".length);
					if (!n.widthBytes) {
						for (i = 0; i < "width".length; i++)
							o[i] = "width".charCodeAt(i);
						for (i = 0; i < "height".length; i++)
							u[i] = "height".charCodeAt(i);
						for (i = 0; i < "videocodecid".length; i++)
							d[i] = "videocodecid".charCodeAt(i);
						n.widthBytes = o,
						n.heightBytes = u,
						n.videocodecidBytes = d
					}
					switch (this.keyFrame = !1, e) {
					case n.VIDEO_TAG:
						this.length = 16,
						a *= 6;
						break;
					case n.AUDIO_TAG:
						this.length = 13,
						this.keyFrame = !0;
						break;
					case n.METADATA_TAG:
						this.length = 29,
						this.keyFrame = !0;
						break;
					default:
						throw new Error("Unknown FLV tag type")
					}
					this.bytes = new Uint8Array(a),
					this.view = new DataView(this.bytes.buffer),
					this.bytes[0] = e,
					this.position = this.length,
					this.keyFrame = t,
					this.pts = 0,
					this.dts = 0,
					this.writeBytes = function (e, t, i) {
						var n,
						r = t || 0;
						i = i || e.byteLength,
						n = r + i,
						s(this, i),
						this.bytes.set(e.subarray(r, n), this.position),
						this.position += i,
						this.length = Math.max(this.length, this.position)
					},
					this.writeByte = function (e) {
						s(this, 1),
						this.bytes[this.position] = e,
						this.position++,
						this.length = Math.max(this.length, this.position)
					},
					this.writeShort = function (e) {
						s(this, 2),
						this.view.setUint16(this.position, e),
						this.position += 2,
						this.length = Math.max(this.length, this.position)
					},
					this.negIndex = function (e) {
						return this.bytes[this.length - e]
					},
					this.nalUnitSize = function () {
						return 0 === r ? 0 : this.length - (r + 4)
					},
					this.startNalUnit = function () {
						if (r > 0)
							throw new Error("Attempted to create new NAL wihout closing the old one");
						r = this.length,
						this.length += 4,
						this.position = this.length
					},
					this.endNalUnit = function (e) {
						var t,
						i;
						this.length === r + 4 ? this.length -= 4 : r > 0 && (t = r + 4, i = this.length - t, this.position = r, this.view.setUint32(this.position, i), this.position = this.length, e && e.push(this.bytes.subarray(t, t + i))),
						r = 0
					},
					this.writeMetaDataDouble = function (e, t) {
						var i;
						if (s(this, 2 + e.length + 9), this.view.setUint16(this.position, e.length), this.position += 2, "width" === e)
							this.bytes.set(o, this.position), this.position += 5;
						else if ("height" === e)
							this.bytes.set(u, this.position), this.position += 6;
						else if ("videocodecid" === e)
							this.bytes.set(d, this.position), this.position += 12;
						else
							for (i = 0; i < e.length; i++)
								this.bytes[this.position] = e.charCodeAt(i), this.position++;
						this.position++,
						this.view.setFloat64(this.position, t),
						this.position += 8,
						this.length = Math.max(this.length, this.position),
						++r
					},
					this.writeMetaDataBoolean = function (e, t) {
						var i;
						for (s(this, 2), this.view.setUint16(this.position, e.length), this.position += 2, i = 0; i < e.length; i++)
							s(this, 1), this.bytes[this.position] = e.charCodeAt(i), this.position++;
						s(this, 2),
						this.view.setUint8(this.position, 1),
						this.position++,
						this.view.setUint8(this.position, t ? 1 : 0),
						this.position++,
						this.length = Math.max(this.length, this.position),
						++r
					},
					this.finalize = function () {
						var e,
						i;
						switch (this.bytes[0]) {
						case n.VIDEO_TAG:
							this.bytes[11] = 7 | (this.keyFrame || t ? 16 : 32),
							this.bytes[12] = t ? 0 : 1,
							e = this.pts - this.dts,
							this.bytes[13] = (16711680 & e) >>> 16,
							this.bytes[14] = (65280 & e) >>> 8,
							this.bytes[15] = (255 & e) >>> 0;
							break;
						case n.AUDIO_TAG:
							this.bytes[11] = 175,
							this.bytes[12] = t ? 0 : 1;
							break;
						case n.METADATA_TAG:
							this.position = 11,
							this.view.setUint8(this.position, 2),
							this.position++,
							this.view.setUint16(this.position, 10),
							this.position += 2,
							this.bytes.set([111, 110, 77, 101, 116, 97, 68, 97, 116, 97], this.position),
							this.position += 10,
							this.bytes[this.position] = 8,
							this.position++,
							this.view.setUint32(this.position, r),
							this.position = this.length,
							this.bytes.set([0, 0, 9], this.position),
							this.position += 3,
							this.length = this.position
						}
						return i = this.length - 11,
						this.bytes[1] = (16711680 & i) >>> 16,
						this.bytes[2] = (65280 & i) >>> 8,
						this.bytes[3] = (255 & i) >>> 0,
						this.bytes[4] = (16711680 & this.dts) >>> 16,
						this.bytes[5] = (65280 & this.dts) >>> 8,
						this.bytes[6] = (255 & this.dts) >>> 0,
						this.bytes[7] = (4278190080 & this.dts) >>> 24,
						this.bytes[8] = 0,
						this.bytes[9] = 0,
						this.bytes[10] = 0,
						s(this, 4),
						this.view.setUint32(this.length, this.length),
						this.length += 4,
						this.position += 4,
						this.bytes = this.bytes.subarray(0, this.length),
						this.frameTime = n.frameTime(this.bytes),
						this
					}
				},
				n.AUDIO_TAG = 8,
				n.VIDEO_TAG = 9,
				n.METADATA_TAG = 18,
				n.isAudioFrame = function (e) {
					return n.AUDIO_TAG === e[0]
				},
				n.isVideoFrame = function (e) {
					return n.VIDEO_TAG === e[0]
				},
				n.isMetaData = function (e) {
					return n.METADATA_TAG === e[0]
				},
				n.isKeyFrame = function (e) {
					return n.isVideoFrame(e) ? 23 === e[11] : !!n.isAudioFrame(e) || !!n.isMetaData(e);
				},
				n.frameTime = function (e) {
					var t = e[4] << 16;
					return t |= e[5] << 8,
					t |= e[6] << 0,
					t |= e[7] << 24
				},
				t.exports = n
			}, {}
		],
		44: [function (e, t, i) {
				t.exports = {
					tag: e("./flv-tag"),
					Transmuxer: e("./transmuxer"),
					getFlvHeader: e("./flv-header")
				}
			}, {
				"./flv-header": 42,
				"./flv-tag": 43,
				"./transmuxer": 46
			}
		],
		45: [function (e, t, i) {
				var n = function () {
					var e = this;
					this.list = [],
					this.push = function (e) {
						this.list.push({
							bytes: e.bytes,
							dts: e.dts,
							pts: e.pts,
							keyFrame: e.keyFrame,
							metaDataTag: e.metaDataTag
						})
					},
					Object.defineProperty(this, "length", {
						get: function () {
							return e.list.length
						}
					})
				};
				t.exports = n
			}, {}
		],
		46: [function (e, t, i) {
				var n,
				r,
				a,
				s,
				o,
				u,
				d = e("../utils/stream.js"),
				l = e("./flv-tag.js"),
				f = e("../m2ts/m2ts.js"),
				c = e("../codecs/adts.js"),
				h = e("../codecs/h264").H264Stream,
				p = e("./coalesce-stream.js"),
				m = e("./tag-list.js");
				s = function (e, t) {
					"number" == typeof t.pts && (void 0 === e.timelineStartInfo.pts ? e.timelineStartInfo.pts = t.pts : e.timelineStartInfo.pts = Math.min(e.timelineStartInfo.pts, t.pts)),
					"number" == typeof t.dts && (void 0 === e.timelineStartInfo.dts ? e.timelineStartInfo.dts = t.dts : e.timelineStartInfo.dts = Math.min(e.timelineStartInfo.dts, t.dts))
				},
				o = function (e, t) {
					var i = new l(l.METADATA_TAG);
					return i.dts = t,
					i.pts = t,
					i.writeMetaDataDouble("videocodecid", 7),
					i.writeMetaDataDouble("width", e.width),
					i.writeMetaDataDouble("height", e.height),
					i
				},
				u = function (e, t) {
					var i,
					n = new l(l.VIDEO_TAG, !0);
					for (n.dts = t, n.pts = t, n.writeByte(1), n.writeByte(e.profileIdc), n.writeByte(e.profileCompatibility), n.writeByte(e.levelIdc), n.writeByte(255), n.writeByte(225), n.writeShort(e.sps[0].length), n.writeBytes(e.sps[0]), n.writeByte(e.pps.length), i = 0; i < e.pps.length; ++i)
						n.writeShort(e.pps[i].length), n.writeBytes(e.pps[i]);
					return n
				},
				a = function (e) {
					var t,
					i = [];
					a.prototype.init.call(this),
					this.push = function (t) {
						s(e, t),
						e && void 0 === e.channelcount && (e.audioobjecttype = t.audioobjecttype, e.channelcount = t.channelcount, e.samplerate = t.samplerate, e.samplingfrequencyindex = t.samplingfrequencyindex, e.samplesize = t.samplesize, e.extraData = e.audioobjecttype << 11 | e.samplingfrequencyindex << 7 | e.channelcount << 3),
						t.pts = Math.round(t.pts / 90),
						t.dts = Math.round(t.dts / 90),
						i.push(t)
					},
					this.flush = function () {
						var n,
						r,
						a,
						s = new m;
						if (0 === i.length)
							return void this.trigger("done", "AudioSegmentStream");
						for (a =  - (1 / 0); i.length; )
							n = i.shift(), (e.extraData !== t || n.pts - a >= 1e3) && (r = new l(l.METADATA_TAG), r.pts = n.pts, r.dts = n.dts, r.writeMetaDataDouble("audiocodecid", 10), r.writeMetaDataBoolean("stereo", 2 === e.channelcount), r.writeMetaDataDouble("audiosamplerate", e.samplerate), r.writeMetaDataDouble("audiosamplesize", 16), s.push(r.finalize()), t = e.extraData, r = new l(l.AUDIO_TAG, !0), r.pts = n.pts, r.dts = n.dts, r.view.setUint16(r.position, e.extraData), r.position += 2, r.length = Math.max(r.length, r.position), s.push(r.finalize()), a = n.pts), r = new l(l.AUDIO_TAG), r.pts = n.pts, r.dts = n.dts, r.writeBytes(n.data), s.push(r.finalize());
						t = null,
						this.trigger("data", {
							track: e,
							tags: s.list
						}),
						this.trigger("done", "AudioSegmentStream")
					}
				},
				a.prototype = new d,
				r = function (e) {
					var t,
					i,
					n = [];
					r.prototype.init.call(this),
					this.finishFrame = function (n, r) {
						if (r) {
							if (t && e && e.newMetadata && (r.keyFrame || 0 === n.length)) {
								var a = o(t, r.dts).finalize(),
								s = u(e, r.dts).finalize();
								a.metaDataTag = s.metaDataTag = !0,
								n.push(a),
								n.push(s),
								e.newMetadata = !1
							}
							r.endNalUnit(),
							n.push(r.finalize()),
							i = null
						}
					},
					this.push = function (t) {
						s(e, t),
						t.pts = Math.round(t.pts / 90),
						t.dts = Math.round(t.dts / 90),
						n.push(t)
					},
					this.flush = function () {
						for (var r, a = new m; n.length && "access_unit_delimiter_rbsp" !== n[0].nalUnitType; )
							n.shift();
						if (0 === n.length)
							return void this.trigger("done", "VideoSegmentStream");
						for (; n.length; )
							r = n.shift(), "seq_parameter_set_rbsp" === r.nalUnitType ? (e.newMetadata = !0, t = r.config, e.width = t.width, e.height = t.height, e.sps = [r.data], e.profileIdc = t.profileIdc, e.levelIdc = t.levelIdc, e.profileCompatibility = t.profileCompatibility, i.endNalUnit()) : "pic_parameter_set_rbsp" === r.nalUnitType ? (e.newMetadata = !0, e.pps = [r.data], i.endNalUnit()) : "access_unit_delimiter_rbsp" === r.nalUnitType ? (i && this.finishFrame(a, i), i = new l(l.VIDEO_TAG), i.pts = r.pts, i.dts = r.dts) : ("slice_layer_without_partitioning_rbsp_idr" === r.nalUnitType && (i.keyFrame = !0), i.endNalUnit()), i.startNalUnit(), i.writeBytes(r.data);
						i && this.finishFrame(a, i),
						this.trigger("data", {
							track: e,
							tags: a.list
						}),
						this.trigger("done", "VideoSegmentStream")
					}
				},
				r.prototype = new d,
				n = function (e) {
					var t,
					i,
					s,
					o,
					u,
					d,
					l,
					m,
					g,
					y,
					v,
					b,
					_ = this;
					n.prototype.init.call(this),
					e = e || {},
					this.metadataStream = new f.MetadataStream,
					e.metadataStream = this.metadataStream,
					t = new f.TransportPacketStream,
					i = new f.TransportParseStream,
					s = new f.ElementaryStream,
					o = new f.TimestampRolloverStream("video"),
					u = new f.TimestampRolloverStream("audio"),
					d = new f.TimestampRolloverStream("timed-metadata"),
					l = new c,
					m = new h,
					b = new p(e),
					t.pipe(i).pipe(s),
					s.pipe(o).pipe(m),
					s.pipe(u).pipe(l),
					s.pipe(d).pipe(this.metadataStream).pipe(b),
					v = new f.CaptionStream,
					m.pipe(v).pipe(b),
					s.on("data", function (e) {
						var t,
						i,
						n;
						if ("metadata" === e.type) {
							for (t = e.tracks.length; t--; )
								"video" === e.tracks[t].type ? i = e.tracks[t] : "audio" === e.tracks[t].type && (n = e.tracks[t]);
							i && !g && (b.numberOfTracks++, g = new r(i), m.pipe(g).pipe(b)),
							n && !y && (b.numberOfTracks++, y = new a(n), l.pipe(y).pipe(b))
						}
					}),
					this.push = function (e) {
						t.push(e)
					},
					this.flush = function () {
						t.flush()
					},
					b.on("data", function (e) {
						_.trigger("data", e)
					}),
					b.on("done", function () {
						_.trigger("done")
					})
				},
				n.prototype = new d,
				t.exports = n
			}, {
				"../codecs/adts.js": 38,
				"../codecs/h264": 39,
				"../m2ts/m2ts.js": 48,
				"../utils/stream.js": 60,
				"./coalesce-stream.js": 41,
				"./flv-tag.js": 43,
				"./tag-list.js": 45
			}
		],
		47: [function (e, t, i) {
				var n = 4,
				r = 128,
				a = e("../utils/stream"),
				s = function (e) {
					for (var t = 0, i = {
							payloadType: -1,
							payloadSize: 0
						}, a = 0, s = 0; t < e.byteLength && e[t] !== r; ) {
						for (; 255 === e[t]; )
							a += 255, t++;
						for (a += e[t++]; 255 === e[t]; )
							s += 255, t++;
						if (s += e[t++], !i.payload && a === n) {
							i.payloadType = a,
							i.payloadSize = s,
							i.payload = e.subarray(t, t + s);
							break
						}
						t += s,
						a = 0,
						s = 0
					}
					return i
				},
				o = function (e) {
					return 181 !== e.payload[0] ? null : 49 !== (e.payload[1] << 8 | e.payload[2]) ? null : "GA94" !== String.fromCharCode(e.payload[3], e.payload[4], e.payload[5], e.payload[6]) ? null : 3 !== e.payload[7] ? null : e.payload.subarray(8, e.payload.length - 1)
				},
				u = function (e, t) {
					var i,
					n,
					r,
					a,
					s = [];
					if (!(64 & t[0]))
						return s;
					for (n = 31 & t[0], i = 0; i < n; i++)
						r = 3 * i, a = {
							type: 3 & t[r + 2],
							pts: e
						},
					4 & t[r + 2] && (a.ccData = t[r + 3] << 8 | t[r + 4], s.push(a));
					return s
				},
				d = function () {
					d.prototype.init.call(this),
					this.captionPackets_ = [],
					this.field1_ = new k,
					this.field1_.on("data", this.trigger.bind(this, "data")),
					this.field1_.on("done", this.trigger.bind(this, "done"))
				};
				d.prototype = new a,
				d.prototype.push = function (e) {
					var t,
					i;
					"sei_rbsp" === e.nalUnitType && (t = s(e.escapedRBSP), t.payloadType === n && (i = o(t), i && (this.captionPackets_ = this.captionPackets_.concat(u(e.pts, i)))))
				},
				d.prototype.flush = function () {
					return this.captionPackets_.length ? (this.captionPackets_.forEach(function (e, t) {
							e.presortIndex = t
						}), this.captionPackets_.sort(function (e, t) {
							return e.pts === t.pts ? e.presortIndex - t.presortIndex : e.pts - t.pts
						}), this.captionPackets_.forEach(this.field1_.push, this.field1_), this.captionPackets_.length = 0, void this.field1_.flush()) : void this.field1_.flush()
				};
				var l = {
					42: 225,
					92: 233,
					94: 237,
					95: 243,
					96: 250,
					123: 231,
					124: 247,
					125: 209,
					126: 241,
					127: 9608
				},
				f = function (e) {
					return null === e ? "" : (e = l[e] || e, String.fromCharCode(e))
				},
				c = 0,
				h = 5152,
				p = 5167,
				m = 5157,
				g = 5158,
				y = 5159,
				v = 5165,
				b = 5153,
				_ = 5164,
				T = 5166,
				S = 14,
				w = function () {
					for (var e = [], t = S + 1; t--; )
						e.push("");
					return e
				},
				k = function () {
					k.prototype.init.call(this),
					this.mode_ = "popOn",
					this.topRow_ = 0,
					this.startPts_ = 0,
					this.displayed_ = w(),
					this.nonDisplayed_ = w(),
					this.lastControlCode_ = null,
					this.push = function (e) {
						if (0 === e.type) {
							var t,
							i,
							n,
							r;
							if (t = 32639 & e.ccData, t === this.lastControlCode_)
								return void(this.lastControlCode_ = null);
							switch (4096 === (61440 & t) ? this.lastControlCode_ = t : this.lastControlCode_ = null, t) {
							case c:
								break;
							case h:
								this.mode_ = "popOn";
								break;
							case p:
								this.flushDisplayed(e.pts),
								i = this.displayed_,
								this.displayed_ = this.nonDisplayed_,
								this.nonDisplayed_ = i,
								this.startPts_ = e.pts;
								break;
							case m:
								this.topRow_ = S - 1,
								this.mode_ = "rollUp";
								break;
							case g:
								this.topRow_ = S - 2,
								this.mode_ = "rollUp";
								break;
							case y:
								this.topRow_ = S - 3,
								this.mode_ = "rollUp";
								break;
							case v:
								this.flushDisplayed(e.pts),
								this.shiftRowsUp_(),
								this.startPts_ = e.pts;
								break;
							case b:
								"popOn" === this.mode_ ? this.nonDisplayed_[S] = this.nonDisplayed_[S].slice(0, -1) : this.displayed_[S] = this.displayed_[S].slice(0, -1);
								break;
							case _:
								this.flushDisplayed(e.pts),
								this.displayed_ = w();
								break;
							case T:
								this.nonDisplayed_ = w();
								break;
							default:
								if (n = t >>> 8, r = 255 & t, n >= 16 && n <= 23 && r >= 64 && r <= 127 && (16 !== n || r < 96) && (n = 32, r = null), (17 === n || 25 === n) && r >= 48 && r <= 63 && (n = 9834, r = ""), 16 === (240 & n))
									return;
								0 === n && (n = null),
								0 === r && (r = null),
								this[this.mode_](e.pts, n, r)
							}
						}
					}
				};
				k.prototype = new a,
				k.prototype.flushDisplayed = function (e) {
					var t = this.displayed_.map(function (e) {
						return e.trim()
					}).filter(function (e) {
						return e.length
					}).join("\n");
					t.length && this.trigger("data", {
						startPts: this.startPts_,
						endPts: e,
						text: t
					})
				},
				k.prototype.popOn = function (e, t, i) {
					var n = this.nonDisplayed_[S];
					n += f(t),
					n += f(i),
					this.nonDisplayed_[S] = n
				},
				k.prototype.rollUp = function (e, t, i) {
					var n = this.displayed_[S];
					"" === n && (this.flushDisplayed(e), this.startPts_ = e),
					n += f(t),
					n += f(i),
					this.displayed_[S] = n
				},
				k.prototype.shiftRowsUp_ = function () {
					var e;
					for (e = 0; e < this.topRow_; e++)
						this.displayed_[e] = "";
					for (e = this.topRow_; e < S; e++)
						this.displayed_[e] = this.displayed_[e + 1];
					this.displayed_[S] = ""
				},
				t.exports = {
					CaptionStream: d,
					Cea608Stream: k
				}
			}, {
				"../utils/stream": 60
			}
		],
		48: [function (e, t, i) {
				var n,
				r,
				a,
				s = e("../utils/stream.js"),
				o = e("./caption-stream"),
				u = e("./stream-types"),
				d = e("./timestamp-rollover-stream").TimestampRolloverStream,
				l = e("./stream-types.js"),
				f = 188,
				c = 71;
				n = function () {
					var e = new Uint8Array(f),
					t = 0;
					n.prototype.init.call(this),
					this.push = function (i) {
						var n,
						r = 0,
						a = f;
						for (t ? (n = new Uint8Array(i.byteLength + t), n.set(e.subarray(0, t)), n.set(i, t), t = 0) : n = i; a < n.byteLength; )
							n[r] !== c || n[a] !== c ? (r++, a++) : (this.trigger("data", n.subarray(r, a)), r += f, a += f);
						r < n.byteLength && (e.set(n.subarray(r), 0), t = n.byteLength - r)
					},
					this.flush = function () {
						t === f && e[0] === c && (this.trigger("data", e), t = 0),
						this.trigger("done")
					}
				},
				n.prototype = new s,
				r = function () {
					var e,
					t,
					i,
					n;
					r.prototype.init.call(this),
					n = this,
					this.packetsWaitingForPmt = [],
					this.programMapTable = void 0,
					e = function (e, n) {
						var r = 0;
						n.payloadUnitStartIndicator && (r += e[r] + 1),
						"pat" === n.type ? t(e.subarray(r), n) : i(e.subarray(r), n)
					},
					t = function (e, t) {
						t.section_number = e[7],
						t.last_section_number = e[8],
						n.pmtPid = (31 & e[10]) << 8 | e[11],
						t.pmtPid = n.pmtPid
					},
					i = function (e, t) {
						var i,
						r,
						a,
						s;
						if (1 & e[5]) {
							for (n.programMapTable = {}, i = (15 & e[1]) << 8 | e[2], r = 3 + i - 4, a = (15 & e[10]) << 8 | e[11], s = 12 + a; s < r; )
								n.programMapTable[(31 & e[s + 1]) << 8 | e[s + 2]] = e[s], s += ((15 & e[s + 3]) << 8 | e[s + 4]) + 5;
							for (t.programMapTable = n.programMapTable; n.packetsWaitingForPmt.length; )
								n.processPes_.apply(n, n.packetsWaitingForPmt.shift())
						}
					},
					this.push = function (t) {
						var i = {},
						n = 4;
						i.payloadUnitStartIndicator = !!(64 & t[1]),
						i.pid = 31 & t[1],
						i.pid <<= 8,
						i.pid |= t[2],
						(48 & t[3]) >>> 4 > 1 && (n += t[n] + 1),
						0 === i.pid ? (i.type = "pat", e(t.subarray(n), i), this.trigger("data", i)) : i.pid === this.pmtPid ? (i.type = "pmt", e(t.subarray(n), i), this.trigger("data", i)) : void 0 === this.programMapTable ? this.packetsWaitingForPmt.push([t, n, i]) : this.processPes_(t, n, i)
					},
					this.processPes_ = function (e, t, i) {
						i.streamType = this.programMapTable[i.pid],
						i.type = "pes",
						i.data = e.subarray(t),
						this.trigger("data", i)
					}
				},
				r.prototype = new s,
				r.STREAM_TYPES = {
					h264: 27,
					adts: 15
				},
				a = function () {
					var e = this,
					t = {
						data: [],
						size: 0
					},
					i = {
						data: [],
						size: 0
					},
					n = {
						data: [],
						size: 0
					},
					r = function (e, t) {
						var i;
						t.dataAlignmentIndicator = 0 !== (4 & e[6]),
						i = e[7],
						192 & i && (t.pts = (14 & e[9]) << 27 | (255 & e[10]) << 20 | (254 & e[11]) << 12 | (255 & e[12]) << 5 | (254 & e[13]) >>> 3, t.pts *= 4, t.pts += (6 & e[13]) >>> 1, t.dts = t.pts, 64 & i && (t.dts = (14 & e[14]) << 27 | (255 & e[15]) << 20 | (254 & e[16]) << 12 | (255 & e[17]) << 5 | (254 & e[18]) >>> 3, t.dts *= 4, t.dts += (6 & e[18]) >>> 1)),
						t.data = e.subarray(9 + e[8])
					},
					s = function (t, i) {
						var n,
						a = new Uint8Array(t.size),
						s = {
							type: i
						},
						o = 0;
						if (t.data.length) {
							for (s.trackId = t.data[0].pid; t.data.length; )
								n = t.data.shift(), a.set(n.data, o), o += n.data.byteLength;
							r(a, s),
							t.size = 0,
							e.trigger("data", s)
						}
					};
					a.prototype.init.call(this),
					this.push = function (r) {
						({
							pat: function () {},
							pes: function () {
								var e,
								a;
								switch (r.streamType) {
								case u.H264_STREAM_TYPE:
								case l.H264_STREAM_TYPE:
									e = t,
									a = "video";
									break;
								case u.ADTS_STREAM_TYPE:
									e = i,
									a = "audio";
									break;
								case u.METADATA_STREAM_TYPE:
									e = n,
									a = "timed-metadata";
									break;
								default:
									return
								}
								r.payloadUnitStartIndicator && s(e, a),
								e.data.push(r),
								e.size += r.data.byteLength
							},
							pmt: function () {
								var t,
								i,
								n = {
									type: "metadata",
									tracks: []
								},
								a = r.programMapTable;
								for (t in a)
									a.hasOwnProperty(t) && (i = {
											timelineStartInfo: {
												baseMediaDecodeTime: 0
											}
										}, i.id = +t, a[t] === l.H264_STREAM_TYPE ? (i.codec = "avc", i.type = "video") : a[t] === l.ADTS_STREAM_TYPE && (i.codec = "adts", i.type = "audio"), n.tracks.push(i));
								e.trigger("data", n)
							}
						})[r.type]()
					},
					this.flush = function () {
						s(t, "video"),
						s(i, "audio"),
						s(n, "timed-metadata"),
						this.trigger("done")
					}
				},
				a.prototype = new s;
				var h = {
					PAT_PID: 0,
					MP2T_PACKET_LENGTH: f,
					TransportPacketStream: n,
					TransportParseStream: r,
					ElementaryStream: a,
					TimestampRolloverStream: d,
					CaptionStream: o.CaptionStream,
					Cea608Stream: o.Cea608Stream,
					MetadataStream: e("./metadata-stream")
				};
				for (var p in u)
					u.hasOwnProperty(p) && (h[p] = u[p]);
				t.exports = h
			}, {
				"../utils/stream.js": 60,
				"./caption-stream": 47,
				"./metadata-stream": 49,
				"./stream-types": 51,
				"./stream-types.js": 51,
				"./timestamp-rollover-stream": 52
			}
		],
		49: [function (e, t, i) {
				var n,
				r = e("../utils/stream"),
				a = e("./stream-types"),
				s = function (e, t, i) {
					var n,
					r = "";
					for (n = t; n < i; n++)
						r += "%" + ("00" + e[n].toString(16)).slice(-2);
					return r
				},
				o = function (e, t, i) {
					return decodeURIComponent(s(e, t, i))
				},
				u = function (e, t, i) {
					return unescape(s(e, t, i))
				},
				d = function (e) {
					return e[0] << 21 | e[1] << 14 | e[2] << 7 | e[3]
				},
				l = {
					TXXX: function (e) {
						var t;
						if (3 === e.data[0]) {
							for (t = 1; t < e.data.length; t++)
								if (0 === e.data[t]) {
									e.description = o(e.data, 1, t),
									e.value = o(e.data, t + 1, e.data.length - 1);
									break
								}
							e.data = e.value
						}
					},
					WXXX: function (e) {
						var t;
						if (3 === e.data[0])
							for (t = 1; t < e.data.length; t++)
								if (0 === e.data[t]) {
									e.description = o(e.data, 1, t),
									e.url = o(e.data, t + 1, e.data.length);
									break
								}
					},
					PRIV: function (e) {
						var t;
						for (t = 0; t < e.data.length; t++)
							if (0 === e.data[t]) {
								e.owner = u(e.data, 0, t);
								break
							}
						e.privateData = e.data.subarray(t + 1),
						e.data = e.privateData
					}
				};
				n = function (e) {
					var t,
					i = {
						debug: !(!e || !e.debug),
						descriptor: e && e.descriptor
					},
					r = 0,
					s = [],
					o = 0;
					if (n.prototype.init.call(this), this.dispatchType = a.METADATA_STREAM_TYPE.toString(16), i.descriptor)
						for (t = 0; t < i.descriptor.length; t++)
							this.dispatchType += ("00" + i.descriptor[t].toString(16)).slice(-2);
					this.push = function (e) {
						var t,
						n,
						a,
						u,
						f,
						c;
						if ("timed-metadata" === e.type) {
							if (e.dataAlignmentIndicator && (o = 0, s.length = 0), 0 === s.length && (e.data.length < 10 || e.data[0] !== "I".charCodeAt(0) || e.data[1] !== "D".charCodeAt(0) || e.data[2] !== "3".charCodeAt(0)))
								return void(i.debug && console.log("Skipping unrecognized metadata packet"));
							if (s.push(e), o += e.data.byteLength, 1 === s.length && (r = d(e.data.subarray(6, 10)), r += 10), !(o < r)) {
								for (t = {
										data: new Uint8Array(r),
										frames: [],
										pts: s[0].pts,
										dts: s[0].dts
									}, f = 0; f < r; )
									t.data.set(s[0].data.subarray(0, r - f), f), f += s[0].data.byteLength, o -= s[0].data.byteLength, s.shift();
								n = 10,
								64 & t.data[5] && (n += 4, n += d(t.data.subarray(10, 14)), r -= d(t.data.subarray(16, 20)));
								do {
									if (a = d(t.data.subarray(n + 4, n + 8)), a < 1)
										return console.log("Malformed ID3 frame encountered. Skipping metadata parsing.");
									if (c = String.fromCharCode(t.data[n], t.data[n + 1], t.data[n + 2], t.data[n + 3]), u = {
											id: c,
											data: t.data.subarray(n + 10, n + a + 10)
										}, u.key = u.id, l[u.id] && (l[u.id](u), "com.apple.streaming.transportStreamTimestamp" === u.owner)) {
										var h = u.data,
										p = (1 & h[3]) << 30 | h[4] << 22 | h[5] << 14 | h[6] << 6 | h[7] >>> 2;
										p *= 4,
										p += 3 & h[7],
										u.timeStamp = p,
										void 0 === t.pts && void 0 === t.dts && (t.pts = u.timeStamp, t.dts = u.timeStamp),
										this.trigger("timestamp", u)
									}
									t.frames.push(u),
									n += 10,
									n += a
								} while (n < r);
								this.trigger("data", t)
							}
						}
					}
				},
				n.prototype = new r,
				t.exports = n
			}, {
				"../utils/stream": 60,
				"./stream-types": 51
			}
		],
		50: [function (e, t, i) {
				var n = e("./stream-types.js"),
				r = function (e) {
					var t = 31 & e[1];
					return t <<= 8,
					t |= e[2]
				},
				a = function (e) {
					return !!(64 & e[1])
				},
				s = function (e) {
					var t = 0;
					return (48 & e[3]) >>> 4 > 1 && (t += e[4] + 1),
					t
				},
				o = function (e, t) {
					var i = r(e);
					return 0 === i ? "pat" : i === t ? "pmt" : t ? "pes" : null
				},
				u = function (e) {
					var t = a(e),
					i = 4 + s(e);
					return t && (i += e[i] + 1),
					(31 & e[i + 10]) << 8 | e[i + 11]
				},
				d = function (e) {
					var t = {},
					i = a(e),
					n = 4 + s(e);
					if (i && (n += e[n] + 1), 1 & e[n + 5]) {
						var r,
						o,
						u;
						r = (15 & e[n + 1]) << 8 | e[n + 2],
						o = 3 + r - 4,
						u = (15 & e[n + 10]) << 8 | e[n + 11];
						for (var d = 12 + u; d < o; ) {
							var l = n + d;
							t[(31 & e[l + 1]) << 8 | e[l + 2]] = e[l],
							d += ((15 & e[l + 3]) << 8 | e[l + 4]) + 5
						}
						return t
					}
				},
				l = function (e, t) {
					var i = r(e),
					a = t[i];
					switch (a) {
					case n.H264_STREAM_TYPE:
						return "video";
					case n.ADTS_STREAM_TYPE:
						return "audio";
					case n.METADATA_STREAM_TYPE:
						return "timed-metadata";
					default:
						return null
					}
				},
				f = function (e) {
					var t = a(e);
					if (!t)
						return null;
					var i,
					n = 4 + s(e),
					r = {};
					return i = e[n + 7],
					192 & i && (r.pts = (14 & e[n + 9]) << 27 | (255 & e[n + 10]) << 20 | (254 & e[n + 11]) << 12 | (255 & e[n + 12]) << 5 | (254 & e[n + 13]) >>> 3, r.pts *= 4, r.pts += (6 & e[n + 13]) >>> 1, r.dts = r.pts, 64 & i && (r.dts = (14 & e[n + 14]) << 27 | (255 & e[n + 15]) << 20 | (254 & e[n + 16]) << 12 | (255 & e[n + 17]) << 5 | (254 & e[n + 18]) >>> 3, r.dts *= 4, r.dts += (6 & e[n + 18]) >>> 1)),
					r
				},
				c = function (e) {
					switch (e) {
					case 5:
						return "slice_layer_without_partitioning_rbsp_idr";
					case 6:
						return "sei_rbsp";
					case 7:
						return "seq_parameter_set_rbsp";
					case 8:
						return "pic_parameter_set_rbsp";
					case 9:
						return "access_unit_delimiter_rbsp";
					default:
						return null
					}
				},
				h = function (e) {
					for (var t, i = 4 + s(e), n = e.subarray(i), r = 0, a = 0, o = !1; a < n.byteLength - 3; a++)
						if (1 === n[a + 2]) {
							r = a + 5;
							break
						}
					for (; r < n.byteLength; )
						switch (n[r]) {
						case 0:
							if (0 !== n[r - 1]) {
								r += 2;
								break
							}
							if (0 !== n[r - 2]) {
								r++;
								break
							}
							a + 3 !== r - 2 && (t = c(31 & n[a + 3]), "slice_layer_without_partitioning_rbsp_idr" === t && (o = !0));
							do
								r++;
							while (1 !== n[r] && r < n.length);
							a = r - 2,
							r += 3;
							break;
						case 1:
							if (0 !== n[r - 1] || 0 !== n[r - 2]) {
								r += 3;
								break
							}
							t = c(31 & n[a + 3]),
							"slice_layer_without_partitioning_rbsp_idr" === t && (o = !0),
							a = r - 2,
							r += 3;
							break;
						default:
							r += 3
						}
					return n = n.subarray(a),
					r -= a,
					a = 0,
					n && n.byteLength > 3 && (t = c(31 & n[a + 3]), "slice_layer_without_partitioning_rbsp_idr" === t && (o = !0)),
					o
				};
				t.exports = {
					parseType: o,
					parsePat: u,
					parsePmt: d,
					parsePayloadUnitStartIndicator: a,
					parsePesType: l,
					parsePesTime: f,
					videoPacketContainsKeyFrame: h
				}
			}, {
				"./stream-types.js": 51
			}
		],
		51: [function (e, t, i) {
				t.exports = {
					H264_STREAM_TYPE: 27,
					ADTS_STREAM_TYPE: 15,
					METADATA_STREAM_TYPE: 21
				}
			}, {}
		],
		52: [function (e, t, i) {
				var n = e("../utils/stream"),
				r = 8589934592,
				a = 4294967296,
				s = function (e, t) {
					var i = 1;
					for (e > t && (i = -1); Math.abs(t - e) > a; )
						e += i * r;
					return e
				},
				o = function (e) {
					var t,
					i;
					o.prototype.init.call(this),
					this.type_ = e,
					this.push = function (e) {
						e.type === this.type_ && (void 0 === i && (i = e.dts), e.dts = s(e.dts, i), e.pts = s(e.pts, i), t = e.dts, this.trigger("data", e))
					},
					this.flush = function () {
						i = t,
						this.trigger("done")
					}
				};
				o.prototype = new n,
				t.exports = {
					TimestampRolloverStream: o,
					handleRollover: s
				}
			}, {
				"../utils/stream": 60
			}
		],
		53: [function (e, t, i) {
				t.exports = {
					generator: e("./mp4-generator"),
					Transmuxer: e("./transmuxer").Transmuxer,
					AudioSegmentStream: e("./transmuxer").AudioSegmentStream,
					VideoSegmentStream: e("./transmuxer").VideoSegmentStream
				}
			}, {
				"./mp4-generator": 54,
				"./transmuxer": 56
			}
		],
		54: [function (e, t, i) {
				var n,
				r,
				a,
				s,
				o,
				u,
				d,
				l,
				f,
				c,
				h,
				p,
				m,
				g,
				y,
				v,
				b,
				_,
				T,
				S,
				w,
				k,
				x,
				O,
				E,
				P,
				A,
				L,
				I,
				C,
				U,
				M,
				D,
				j,
				R,
				B,
				N = Math.pow(2, 32) - 1;
				!function () {
					var e;
					if (x = {
							avc1: [],
							avcC: [],
							btrt: [],
							dinf: [],
							dref: [],
							esds: [],
							ftyp: [],
							hdlr: [],
							mdat: [],
							mdhd: [],
							mdia: [],
							mfhd: [],
							minf: [],
							moof: [],
							moov: [],
							mp4a: [],
							mvex: [],
							mvhd: [],
							sdtp: [],
							smhd: [],
							stbl: [],
							stco: [],
							stsc: [],
							stsd: [],
							stsz: [],
							stts: [],
							styp: [],
							tfdt: [],
							tfhd: [],
							traf: [],
							trak: [],
							trun: [],
							trex: [],
							tkhd: [],
							vmhd: []
						}, "undefined" != typeof Uint8Array) {
						for (e in x)
							x.hasOwnProperty(e) && (x[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
						O = new Uint8Array(["i".charCodeAt(0), "s".charCodeAt(0), "o".charCodeAt(0), "m".charCodeAt(0)]),
						P = new Uint8Array(["a".charCodeAt(0), "v".charCodeAt(0), "c".charCodeAt(0), "1".charCodeAt(0)]),
						E = new Uint8Array([0, 0, 0, 1]),
						A = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
						L = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]),
						I = {
							video: A,
							audio: L
						},
						M = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
						U = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
						D = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
						j = D,
						R = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
						B = D,
						C = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
					}
				}
				(),
				n = function (e) {
					var t,
					i,
					n,
					r = [],
					a = 0;
					for (t = 1; t < arguments.length; t++)
						r.push(arguments[t]);
					for (t = r.length; t--; )
						a += r[t].byteLength;
					for (i = new Uint8Array(a + 8), n = new DataView(i.buffer, i.byteOffset, i.byteLength), n.setUint32(0, i.byteLength), i.set(e, 4), t = 0, a = 8; t < r.length; t++)
						i.set(r[t], a), a += r[t].byteLength;
					return i
				},
				r = function () {
					return n(x.dinf, n(x.dref, M))
				},
				a = function (e) {
					return n(x.esds, new Uint8Array([0, 0, 0, 0, 3, 25, 0, 0, 0, 4, 17, 64, 21, 0, 6, 0, 0, 0, 218, 192, 0, 0, 218, 192, 5, 2, e.audioobjecttype << 3 | e.samplingfrequencyindex >>> 1, e.samplingfrequencyindex << 7 | e.channelcount << 3, 6, 1, 2]))
				},
				s = function () {
					return n(x.ftyp, O, E, O, P)
				},
				v = function (e) {
					return n(x.hdlr, I[e])
				},
				o = function (e) {
					return n(x.mdat, e)
				},
				y = function (e) {
					var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 1, 95, 144, e.duration >>> 24 & 255, e.duration >>> 16 & 255, e.duration >>> 8 & 255, 255 & e.duration, 85, 196, 0, 0]);
					return e.samplerate && (t[12] = e.samplerate >>> 24 & 255, t[13] = e.samplerate >>> 16 & 255, t[14] = e.samplerate >>> 8 & 255, t[15] = 255 & e.samplerate),
					n(x.mdhd, t)
				},
				g = function (e) {
					return n(x.mdia, y(e), v(e.type), d(e))
				},
				u = function (e) {
					return n(x.mfhd, new Uint8Array([0, 0, 0, 0, (4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e]))
				},
				d = function (e) {
					return n(x.minf, "video" === e.type ? n(x.vmhd, C) : n(x.smhd, U), r(), _(e))
				},
				l = function (e, t) {
					for (var i = [], r = t.length; r--; )
						i[r] = S(t[r]);
					return n.apply(null, [x.moof, u(e)].concat(i))
				},
				f = function (e) {
					for (var t = e.length, i = []; t--; )
						i[t] = p(e[t]);
					return n.apply(null, [x.moov, h(4294967295)].concat(i).concat(c(e)))
				},
				c = function (e) {
					for (var t = e.length, i = []; t--; )
						i[t] = w(e[t]);
					return n.apply(null, [x.mvex].concat(i))
				},
				h = function (e) {
					var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 95, 144, (4278190080 & e) >> 24, (16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
					return n(x.mvhd, t)
				},
				b = function (e) {
					var t,
					i,
					r = e.samples || [],
					a = new Uint8Array(4 + r.length);
					for (i = 0; i < r.length; i++)
						t = r[i].flags, a[i + 4] = t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;
					return n(x.sdtp, a)
				},
				_ = function (e) {
					return n(x.stbl, T(e), n(x.stts, B), n(x.stsc, j), n(x.stsz, R), n(x.stco, D))
				},
				function () {
					var e,
					t;
					T = function (i) {
						return n(x.stsd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]), "video" === i.type ? e(i) : t(i))
					},
					e = function (e) {
						var t,
						i = e.sps || [],
						r = e.pps || [],
						a = [],
						s = [];
						for (t = 0; t < i.length; t++)
							a.push((65280 & i[t].byteLength) >>> 8), a.push(255 & i[t].byteLength), a = a.concat(Array.prototype.slice.call(i[t]));
						for (t = 0; t < r.length; t++)
							s.push((65280 & r[t].byteLength) >>> 8), s.push(255 & r[t].byteLength), s = s.concat(Array.prototype.slice.call(r[t]));
						return n(x.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & e.width) >> 8, 255 & e.width, (65280 & e.height) >> 8, 255 & e.height, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 19, 118, 105, 100, 101, 111, 106, 115, 45, 99, 111, 110, 116, 114, 105, 98, 45, 104, 108, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), n(x.avcC, new Uint8Array([1, e.profileIdc, e.profileCompatibility, e.levelIdc, 255].concat([i.length]).concat(a).concat([r.length]).concat(s))), n(x.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])))
					},
					t = function (e) {
						return n(x.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, (65280 & e.channelcount) >> 8, 255 & e.channelcount, (65280 & e.samplesize) >> 8, 255 & e.samplesize, 0, 0, 0, 0, (65280 & e.samplerate) >> 8, 255 & e.samplerate, 0, 0]), a(e))
					}
				}
				(),
				m = function (e) {
					var t = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 0, (4278190080 & e.duration) >> 24, (16711680 & e.duration) >> 16, (65280 & e.duration) >> 8, 255 & e.duration, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, (65280 & e.width) >> 8, 255 & e.width, 0, 0, (65280 & e.height) >> 8, 255 & e.height, 0, 0]);
					return n(x.tkhd, t)
				},
				S = function (e) {
					var t,
					i,
					r,
					a,
					s,
					o,
					u;
					return t = n(x.tfhd, new Uint8Array([0, 0, 0, 58, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
					o = Math.floor(e.baseMediaDecodeTime / (N + 1)),
					u = Math.floor(e.baseMediaDecodeTime % (N + 1)),
					i = n(x.tfdt, new Uint8Array([1, 0, 0, 0, o >>> 24 & 255, o >>> 16 & 255, o >>> 8 & 255, 255 & o, u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u])),
					s = 92,
					"audio" === e.type ? (r = k(e, s), n(x.traf, t, i, r)) : (a = b(e), r = k(e, a.length + s), n(x.traf, t, i, r, a))
				},
				p = function (e) {
					return e.duration = e.duration || 4294967295,
					n(x.trak, m(e), g(e))
				},
				w = function (e) {
					var t = new Uint8Array([0, 0, 0, 0, (4278190080 & e.id) >> 24, (16711680 & e.id) >> 16, (65280 & e.id) >> 8, 255 & e.id, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
					return "video" !== e.type && (t[t.length - 1] = 0),
					n(x.trex, t)
				},
				function () {
					var e,
					t,
					i;
					i = function (e, t) {
						var i = 0,
						n = 0,
						r = 0,
						a = 0;
						return e.length && (void 0 !== e[0].duration && (i = 1), void 0 !== e[0].size && (n = 2), void 0 !== e[0].flags && (r = 4), void 0 !== e[0].compositionTimeOffset && (a = 8)),
						[0, 0, i | n | r | a, 1, (4278190080 & e.length) >>> 24, (16711680 & e.length) >>> 16, (65280 & e.length) >>> 8, 255 & e.length, (4278190080 & t) >>> 24, (16711680 & t) >>> 16, (65280 & t) >>> 8, 255 & t]
					},
					t = function (e, t) {
						var r,
						a,
						s,
						o;
						for (a = e.samples || [], t += 20 + 16 * a.length, r = i(a, t), o = 0; o < a.length; o++)
							s = a[o], r = r.concat([(4278190080 & s.duration) >>> 24, (16711680 & s.duration) >>> 16, (65280 & s.duration) >>> 8, 255 & s.duration, (4278190080 & s.size) >>> 24, (16711680 & s.size) >>> 16, (65280 & s.size) >>> 8, 255 & s.size, s.flags.isLeading << 2 | s.flags.dependsOn, s.flags.isDependedOn << 6 | s.flags.hasRedundancy << 4 | s.flags.paddingValue << 1 | s.flags.isNonSyncSample, 61440 & s.flags.degradationPriority, 15 & s.flags.degradationPriority, (4278190080 & s.compositionTimeOffset) >>> 24, (16711680 & s.compositionTimeOffset) >>> 16, (65280 & s.compositionTimeOffset) >>> 8, 255 & s.compositionTimeOffset]);
						return n(x.trun, new Uint8Array(r))
					},
					e = function (e, t) {
						var r,
						a,
						s,
						o;
						for (a = e.samples || [], t += 20 + 8 * a.length, r = i(a, t), o = 0; o < a.length; o++)
							s = a[o], r = r.concat([(4278190080 & s.duration) >>> 24, (16711680 & s.duration) >>> 16, (65280 & s.duration) >>> 8, 255 & s.duration, (4278190080 & s.size) >>> 24, (16711680 & s.size) >>> 16, (65280 & s.size) >>> 8, 255 & s.size]);
						return n(x.trun, new Uint8Array(r))
					},
					k = function (i, n) {
						return "audio" === i.type ? e(i, n) : t(i, n)
					}
				}
				(),
				t.exports = {
					ftyp: s,
					mdat: o,
					moof: l,
					moov: f,
					initSegment: function (e) {
						var t,
						i = s(),
						n = f(e);
						return t = new Uint8Array(i.byteLength + n.byteLength),
						t.set(i),
						t.set(n, i.byteLength),
						t
					}
				}
			}, {}
		],
		55: [function (e, t, i) {
				var n,
				r,
				a,
				s;
				n = function (e, t) {
					var i,
					a,
					s,
					o,
					u,
					d = [];
					if (!t.length)
						return null;
					for (i = 0; i < e.byteLength; )
						a = e[i] << 24, a |= e[i + 1] << 16, a |= e[i + 2] << 8, a |= e[i + 3], s = r(e.subarray(i + 4, i + 8)), o = a > 1 ? i + a : e.byteLength, s === t[0] && (1 === t.length ? d.push(e.subarray(i + 8, o)) : (u = n(e.subarray(i + 8, o), t.slice(1)), u.length && (d = d.concat(u)))), i = o;
					return d
				},
				r = function (e) {
					var t = "";
					return t += String.fromCharCode(e[0]),
					t += String.fromCharCode(e[1]),
					t += String.fromCharCode(e[2]),
					t += String.fromCharCode(e[3])
				},
				a = function (e) {
					var t = {},
					i = n(e, ["moov", "trak"]);
					return i.reduce(function (e, t) {
						var i,
						r,
						a,
						s,
						o;
						return (i = n(t, ["tkhd"])[0]) ? (r = i[0], a = 0 === r ? 12 : 20, s = i[a] << 24 | i[a + 1] << 16 | i[a + 2] << 8 | i[a + 3], (o = n(t, ["mdia", "mdhd"])[0]) ? (r = o[0], a = 0 === r ? 12 : 20, e[s] = o[a] << 24 | o[a + 1] << 16 | o[a + 2] << 8 | o[a + 3], e) : null) : null
					}, t)
				},
				s = function (e, t) {
					var i,
					r,
					a;
					return i = n(t, ["moof", "traf"]),
					r = [].concat.apply([], i.map(function (t) {
							return n(t, ["tfhd"]).map(function (i) {
								var r,
								a,
								s;
								return r = i[4] << 24 | i[5] << 16 | i[6] << 8 | i[7],
								a = e[r] || 9e4,
								s = n(t, ["tfdt"]).map(function (e) {
									var t,
									i;
									return t = e[0],
									i = e[4] << 24 | e[5] << 16 | e[6] << 8 | e[7],
									1 === t && (i *= Math.pow(2, 32), i += e[8] << 24 | e[9] << 16 | e[10] << 8 | e[11]),
									i
								})[0],
								s = s || 1 / 0,
								s / a
							})
						})),
					a = Math.min.apply(null, r),
					isFinite(a) ? a : 0
				},
				t.exports = {
					parseType: r,
					timescale: a,
					startTime: s
				}
			}, {}
		],
		56: [function (e, t, i) {
				var n,
				r,
				a,
				s,
				o,
				u,
				d,
				l,
				f,
				c,
				h,
				p = e("../utils/stream.js"),
				m = e("./mp4-generator.js"),
				g = e("../m2ts/m2ts.js"),
				y = e("../codecs/adts.js"),
				v = e("../codecs/h264").H264Stream,
				b = e("../aac"),
				_ = e("../data/silence"),
				T = e("../utils/clock"),
				S = ["audioobjecttype", "channelcount", "samplerate", "samplingfrequencyindex", "samplesize"],
				w = ["width", "height", "profileIdc", "levelIdc", "profileCompatibility"],
				k = 9e4;
				o = function () {
					return {
						size: 0,
						flags: {
							isLeading: 0,
							dependsOn: 1,
							isDependedOn: 0,
							hasRedundancy: 0,
							degradationPriority: 0
						}
					}
				},
				u = function (e) {
					return e[0] === "I".charCodeAt(0) && e[1] === "D".charCodeAt(0) && e[2] === "3".charCodeAt(0)
				},
				c = function (e, t) {
					var i;
					if (e.length !== t.length)
						return !1;
					for (i = 0; i < e.length; i++)
						if (e[i] !== t[i])
							return !1;
					return !0
				},
				h = function (e) {
					var t,
					i,
					n = 0;
					for (t = 0; t < e.length; t++)
						i = e[t], n += i.data.byteLength;
					return n
				},
				r = function (e) {
					var t = [],
					i = 0,
					n = 0,
					a = 0,
					s = 1 / 0;
					r.prototype.init.call(this),
					this.push = function (i) {
						d(e, i),
						e && S.forEach(function (t) {
							e[t] = i[t]
						}),
						t.push(i)
					},
					this.setEarliestDts = function (t) {
						n = t - e.timelineStartInfo.baseMediaDecodeTime
					},
					this.setVideoBaseMediaDecodeTime = function (e) {
						s = e
					},
					this.setAudioAppendStart = function (e) {
						a = e
					},
					this.flush = function () {
						var n,
						r,
						a,
						s;
						return 0 === t.length ? void this.trigger("done", "AudioSegmentStream") : (n = this.trimAdtsFramesByEarliestDts_(t), e.baseMediaDecodeTime = f(e), this.prefixWithSilence_(e, n), e.samples = this.generateSampleTable_(n), a = m.mdat(this.concatenateFrameData_(n)), t = [], r = m.moof(i, [e]), s = new Uint8Array(r.byteLength + a.byteLength), i++, s.set(r), s.set(a, r.byteLength), l(e), this.trigger("data", {
								track: e,
								boxes: s
							}), void this.trigger("done", "AudioSegmentStream"))
					},
					this.prefixWithSilence_ = function (e, t) {
						var i,
						n,
						r,
						o = 0,
						u = 0,
						d = 0,
						l = 0;
						if (t.length && (i = T.audioTsToVideoTs(e.baseMediaDecodeTime, e.samplerate), o = Math.ceil(k / (e.samplerate / 1024)), a && s && (u = i - Math.max(a, s), d = Math.floor(u / o), l = d * o), !(d < 1 || l > k / 2))) {
							for (n = _[e.samplerate], n || (n = t[0].data), r = 0; r < d; r++)
								t.splice(r, 0, {
									data: n
								});
							e.baseMediaDecodeTime -= Math.floor(T.videoTsToAudioTs(l, e.samplerate))
						}
					},
					this.trimAdtsFramesByEarliestDts_ = function (t) {
						return e.minSegmentDts >= n ? t : (e.minSegmentDts = 1 / 0, t.filter(function (t) {
								return t.dts >= n && (e.minSegmentDts = Math.min(e.minSegmentDts, t.dts), e.minSegmentPts = e.minSegmentDts, !0)
							}))
					},
					this.generateSampleTable_ = function (e) {
						var t,
						i,
						n = [];
						for (t = 0; t < e.length; t++)
							i = e[t], n.push({
								size: i.data.byteLength,
								duration: 1024
							});
						return n
					},
					this.concatenateFrameData_ = function (e) {
						var t,
						i,
						n = 0,
						r = new Uint8Array(h(e));
						for (t = 0; t < e.length; t++)
							i = e[t], r.set(i.data, n), n += i.data.byteLength;
						return r
					}
				},
				r.prototype = new p,
				n = function (e) {
					var t,
					i,
					r = 0,
					a = [];
					n.prototype.init.call(this),
					delete e.minPTS,
					this.gopCache_ = [],
					this.push = function (n) {
						d(e, n),
						"seq_parameter_set_rbsp" !== n.nalUnitType || t || (t = n.config, e.sps = [n.data], w.forEach(function (i) {
								e[i] = t[i]
							}, this)),
						"pic_parameter_set_rbsp" !== n.nalUnitType || i || (i = n.data, e.pps = [n.data]),
						a.push(n)
					},
					this.flush = function () {
						for (var t, i, n, s, o, u; a.length && "access_unit_delimiter_rbsp" !== a[0].nalUnitType; )
							a.shift();
						return 0 === a.length ? (this.resetStream_(), void this.trigger("done", "VideoSegmentStream")) : (t = this.groupNalsIntoFrames_(a), n = this.groupFramesIntoGops_(t), n[0][0].keyFrame || (i = this.getGopForFusion_(a[0], e), i ? (n.unshift(i), n.byteLength += i.byteLength, n.nalCount += i.nalCount, n.pts = i.pts, n.dts = i.dts, n.duration += i.duration) : n = this.extendFirstKeyFrame_(n)), d(e, n), e.samples = this.generateSampleTable_(n), o = m.mdat(this.concatenateNalData_(n)), this.gopCache_.unshift({
								gop: n.pop(),
								pps: e.pps,
								sps: e.sps
							}), this.gopCache_.length = Math.min(6, this.gopCache_.length), a = [], e.baseMediaDecodeTime = f(e), this.trigger("baseMediaDecodeTime", e.baseMediaDecodeTime), this.trigger("timelineStartInfo", e.timelineStartInfo), s = m.moof(r, [e]), u = new Uint8Array(s.byteLength + o.byteLength), r++, u.set(s), u.set(o, s.byteLength), this.trigger("data", {
								track: e,
								boxes: u
							}), this.resetStream_(), void this.trigger("done", "VideoSegmentStream"))
					},
					this.resetStream_ = function () {
						l(e),
						t = void 0,
						i = void 0
					},
					this.getGopForFusion_ = function (t) {
						var i,
						n,
						r,
						a,
						s,
						o = 45e3,
						u = 1e4,
						d = 1 / 0;
						for (s = 0; s < this.gopCache_.length; s++)
							a = this.gopCache_[s], r = a.gop, e.pps && c(e.pps[0], a.pps[0]) && e.sps && c(e.sps[0], a.sps[0]) && (r.dts < e.timelineStartInfo.dts || (i = t.dts - r.dts - r.duration, i >= -u && i <= o && (!n || d > i) && (n = a, d = i)));
						return n ? n.gop : null
					},
					this.extendFirstKeyFrame_ = function (e) {
						var t;
						return !e[0][0].keyFrame && e.length > 1 && (t = e.shift(), e.byteLength -= t.byteLength, e.nalCount -= t.nalCount, e[0][0].dts = t.dts, e[0][0].pts = t.pts, e[0][0].duration += t.duration),
						e
					},
					this.groupNalsIntoFrames_ = function (e) {
						var t,
						i,
						n = [],
						r = [];
						for (n.byteLength = 0, t = 0; t < e.length; t++)
							i = e[t], "access_unit_delimiter_rbsp" === i.nalUnitType ? (n.length && (n.duration = i.dts - n.dts, r.push(n)), n = [i], n.byteLength = i.data.byteLength, n.pts = i.pts, n.dts = i.dts) : ("slice_layer_without_partitioning_rbsp_idr" === i.nalUnitType && (n.keyFrame = !0), n.duration = i.dts - n.dts, n.byteLength += i.data.byteLength, n.push(i));
						return r.length && (!n.duration || n.duration <= 0) && (n.duration = r[r.length - 1].duration),
						r.push(n),
						r
					},
					this.groupFramesIntoGops_ = function (e) {
						var t,
						i,
						n = [],
						r = [];
						for (n.byteLength = 0, n.nalCount = 0, n.duration = 0, n.pts = e[0].pts, n.dts = e[0].dts, r.byteLength = 0, r.nalCount = 0, r.duration = 0, r.pts = e[0].pts, r.dts = e[0].dts, t = 0; t < e.length; t++)
							i = e[t],
							i.keyFrame ? (n.length && (r.push(n), r.byteLength += n.byteLength, r.nalCount += n.nalCount, r.duration += n.duration), n = [i], n.nalCount = i.length, n.byteLength = i.byteLength, n.pts = i.pts, n.dts = i.dts, n.duration = i.duration) : (n.duration += i.duration, n.nalCount += i.length, n.byteLength += i.byteLength, n.push(i));
						return r.length && n.duration <= 0 && (n.duration = r[r.length - 1].duration),
						r.byteLength += n.byteLength,
						r.nalCount += n.nalCount,
						r.duration += n.duration,
						r.push(n),
						r
					},
					this.generateSampleTable_ = function (e, t) {
						var i,
						n,
						r,
						a,
						s,
						u = t || 0,
						d = [];
						for (i = 0; i < e.length; i++)
							for (a = e[i], n = 0; n < a.length; n++)
								s = a[n], r = o(), r.dataOffset = u, r.compositionTimeOffset = s.pts - s.dts, r.duration = s.duration, r.size = 4 * s.length, r.size += s.byteLength, s.keyFrame && (r.flags.dependsOn = 2), u += r.size, d.push(r);
						return d
					},
					this.concatenateNalData_ = function (e) {
						var t,
						i,
						n,
						r,
						a,
						s,
						o = 0,
						u = e.byteLength,
						d = e.nalCount,
						l = u + 4 * d,
						f = new Uint8Array(l),
						c = new DataView(f.buffer);
						for (t = 0; t < e.length; t++)
							for (r = e[t], i = 0; i < r.length; i++)
								for (a = r[i], n = 0; n < a.length; n++)
									s = a[n], c.setUint32(o, s.data.byteLength), o += 4, f.set(s.data, o), o += s.data.byteLength;
						return f
					}
				},
				n.prototype = new p,
				d = function (e, t) {
					"number" == typeof t.pts && (void 0 === e.timelineStartInfo.pts && (e.timelineStartInfo.pts = t.pts), void 0 === e.minSegmentPts ? e.minSegmentPts = t.pts : e.minSegmentPts = Math.min(e.minSegmentPts, t.pts), void 0 === e.maxSegmentPts ? e.maxSegmentPts = t.pts : e.maxSegmentPts = Math.max(e.maxSegmentPts, t.pts)),
					"number" == typeof t.dts && (void 0 === e.timelineStartInfo.dts && (e.timelineStartInfo.dts = t.dts), void 0 === e.minSegmentDts ? e.minSegmentDts = t.dts : e.minSegmentDts = Math.min(e.minSegmentDts, t.dts), void 0 === e.maxSegmentDts ? e.maxSegmentDts = t.dts : e.maxSegmentDts = Math.max(e.maxSegmentDts, t.dts))
				},
				l = function (e) {
					delete e.minSegmentDts,
					delete e.maxSegmentDts,
					delete e.minSegmentPts,
					delete e.maxSegmentPts
				},
				f = function (e) {
					var t,
					i,
					n = e.minSegmentDts - e.timelineStartInfo.dts;
					return t = e.timelineStartInfo.baseMediaDecodeTime,
					t += n,
					t = Math.max(0, t),
					"audio" === e.type && (i = e.samplerate / k, t *= i, t = Math.floor(t)),
					t
				},
				s = function (e, t) {
					this.numberOfTracks = 0,
					this.metadataStream = t,
					"undefined" != typeof e.remux ? this.remuxTracks = !!e.remux : this.remuxTracks = !0,
					this.pendingTracks = [],
					this.videoTrack = null,
					this.pendingBoxes = [],
					this.pendingCaptions = [],
					this.pendingMetadata = [],
					this.pendingBytes = 0,
					this.emittedTracks = 0,
					s.prototype.init.call(this),
					this.push = function (e) {
						return e.text ? this.pendingCaptions.push(e) : e.frames ? this.pendingMetadata.push(e) : (this.pendingTracks.push(e.track), this.pendingBoxes.push(e.boxes), this.pendingBytes += e.boxes.byteLength, "video" === e.track.type && (this.videoTrack = e.track), void("audio" === e.track.type && (this.audioTrack = e.track)))
					}
				},
				s.prototype = new p,
				s.prototype.flush = function (e) {
					var t,
					i,
					n,
					r,
					a = 0,
					s = {
						captions: [],
						metadata: [],
						info: {}
					},
					o = 0;
					if (this.pendingTracks.length < this.numberOfTracks) {
						if ("VideoSegmentStream" !== e && "AudioSegmentStream" !== e)
							return;
						if (this.remuxTracks)
							return;
						if (0 === this.pendingTracks.length)
							return this.emittedTracks++, void(this.emittedTracks >= this.numberOfTracks && (this.trigger("done"), this.emittedTracks = 0))
					}
					for (this.videoTrack ? (o = this.videoTrack.timelineStartInfo.pts, w.forEach(function (e) {
								s.info[e] = this.videoTrack[e]
							}, this)) : this.audioTrack && (o = this.audioTrack.timelineStartInfo.pts, S.forEach(function (e) {
								s.info[e] = this.audioTrack[e]
							}, this)), 1 === this.pendingTracks.length ? s.type = this.pendingTracks[0].type : s.type = "combined", this.emittedTracks += this.pendingTracks.length, n = m.initSegment(this.pendingTracks), s.initSegment = new Uint8Array(n.byteLength), s.initSegment.set(n), s.data = new Uint8Array(this.pendingBytes), r = 0; r < this.pendingBoxes.length; r++)
						s.data.set(this.pendingBoxes[r], a), a += this.pendingBoxes[r].byteLength;
					for (r = 0; r < this.pendingCaptions.length; r++)
						t = this.pendingCaptions[r], t.startTime = t.startPts - o, t.startTime /= 9e4, t.endTime = t.endPts - o, t.endTime /= 9e4, s.captions.push(t);
					for (r = 0; r < this.pendingMetadata.length; r++)
						i = this.pendingMetadata[r], i.cueTime = i.pts - o, i.cueTime /= 9e4, s.metadata.push(i);
					s.metadata.dispatchType = this.metadataStream.dispatchType,
					this.pendingTracks.length = 0,
					this.videoTrack = null,
					this.pendingBoxes.length = 0,
					this.pendingCaptions.length = 0,
					this.pendingBytes = 0,
					this.pendingMetadata.length = 0,
					this.trigger("data", s),
					this.emittedTracks >= this.numberOfTracks && (this.trigger("done"), this.emittedTracks = 0)
				},
				a = function (e) {
					var t,
					i,
					o = this,
					d = !0;
					a.prototype.init.call(this),
					e = e || {},
					this.baseMediaDecodeTime = e.baseMediaDecodeTime || 0,
					this.transmuxPipeline_ = {},
					this.setupAacPipeline = function () {
						var t = {};
						this.transmuxPipeline_ = t,
						t.type = "aac",
						t.metadataStream = new g.MetadataStream,
						t.aacStream = new b,
						t.audioTimestampRolloverStream = new g.TimestampRolloverStream("audio"),
						t.timedMetadataTimestampRolloverStream = new g.TimestampRolloverStream("timed-metadata"),
						t.adtsStream = new y,
						t.coalesceStream = new s(e, t.metadataStream),
						t.headOfPipeline = t.aacStream,
						t.aacStream.pipe(t.audioTimestampRolloverStream).pipe(t.adtsStream),
						t.aacStream.pipe(t.timedMetadataTimestampRolloverStream).pipe(t.metadataStream).pipe(t.coalesceStream),
						t.metadataStream.on("timestamp", function (e) {
							t.aacStream.setTimestamp(e.timeStamp)
						}),
						t.aacStream.on("data", function (e) {
							"timed-metadata" !== e.type || t.audioSegmentStream || (i = i || {
									timelineStartInfo: {
										baseMediaDecodeTime: o.baseMediaDecodeTime
									},
									codec: "adts",
									type: "audio"
								}, t.coalesceStream.numberOfTracks++, t.audioSegmentStream = new r(i), t.adtsStream.pipe(t.audioSegmentStream).pipe(t.coalesceStream))
						}),
						t.coalesceStream.on("data", this.trigger.bind(this, "data")),
						t.coalesceStream.on("done", this.trigger.bind(this, "done"))
					},
					this.setupTsPipeline = function () {
						var a = {};
						this.transmuxPipeline_ = a,
						a.type = "ts",
						a.metadataStream = new g.MetadataStream,
						a.packetStream = new g.TransportPacketStream,
						a.parseStream = new g.TransportParseStream,
						a.elementaryStream = new g.ElementaryStream,
						a.videoTimestampRolloverStream = new g.TimestampRolloverStream("video"),
						a.audioTimestampRolloverStream = new g.TimestampRolloverStream("audio"),
						a.timedMetadataTimestampRolloverStream = new g.TimestampRolloverStream("timed-metadata"),
						a.adtsStream = new y,
						a.h264Stream = new v,
						a.captionStream = new g.CaptionStream,
						a.coalesceStream = new s(e, a.metadataStream),
						a.headOfPipeline = a.packetStream,
						a.packetStream.pipe(a.parseStream).pipe(a.elementaryStream),
						a.elementaryStream.pipe(a.videoTimestampRolloverStream).pipe(a.h264Stream),
						a.elementaryStream.pipe(a.audioTimestampRolloverStream).pipe(a.adtsStream),
						a.elementaryStream.pipe(a.timedMetadataTimestampRolloverStream).pipe(a.metadataStream).pipe(a.coalesceStream),
						a.h264Stream.pipe(a.captionStream).pipe(a.coalesceStream),
						a.elementaryStream.on("data", function (e) {
							var s;
							if ("metadata" === e.type) {
								for (s = e.tracks.length; s--; )
									t || "video" !== e.tracks[s].type ? i || "audio" !== e.tracks[s].type || (i = e.tracks[s], i.timelineStartInfo.baseMediaDecodeTime = o.baseMediaDecodeTime) : (t = e.tracks[s], t.timelineStartInfo.baseMediaDecodeTime = o.baseMediaDecodeTime);
								t && !a.videoSegmentStream && (a.coalesceStream.numberOfTracks++, a.videoSegmentStream = new n(t), a.videoSegmentStream.on("timelineStartInfo", function (e) {
										i && (i.timelineStartInfo = e, a.audioSegmentStream.setEarliestDts(e.dts))
									}), a.videoSegmentStream.on("baseMediaDecodeTime", function (e) {
										i && a.audioSegmentStream.setVideoBaseMediaDecodeTime(e)
									}), a.h264Stream.pipe(a.videoSegmentStream).pipe(a.coalesceStream)),
								i && !a.audioSegmentStream && (a.coalesceStream.numberOfTracks++, a.audioSegmentStream = new r(i), a.adtsStream.pipe(a.audioSegmentStream).pipe(a.coalesceStream))
							}
						}),
						a.coalesceStream.on("data", this.trigger.bind(this, "data")),
						a.coalesceStream.on("done", this.trigger.bind(this, "done"))
					},
					this.setBaseMediaDecodeTime = function (e) {
						var n = this.transmuxPipeline_;
						this.baseMediaDecodeTime = e,
						i && (i.timelineStartInfo.dts = void 0, i.timelineStartInfo.pts = void 0, l(i), i.timelineStartInfo.baseMediaDecodeTime = e),
						t && (n.videoSegmentStream && (n.videoSegmentStream.gopCache_ = []), t.timelineStartInfo.dts = void 0, t.timelineStartInfo.pts = void 0, l(t), t.timelineStartInfo.baseMediaDecodeTime = e)
					},
					this.setAudioAppendStart = function (e) {
						i && this.transmuxPipeline_.audioSegmentStream.setAudioAppendStart(e)
					},
					this.push = function (e) {
						if (d) {
							var t = u(e);
							t && "aac" !== this.transmuxPipeline_.type ? this.setupAacPipeline() : t || "ts" === this.transmuxPipeline_.type || this.setupTsPipeline(),
							d = !1
						}
						this.transmuxPipeline_.headOfPipeline.push(e)
					},
					this.flush = function () {
						d = !0,
						this.transmuxPipeline_.headOfPipeline.flush()
					}
				},
				a.prototype = new p,
				t.exports = {
					Transmuxer: a,
					VideoSegmentStream: n,
					AudioSegmentStream: r,
					AUDIO_PROPERTIES: S,
					VIDEO_PROPERTIES: w
				}
			}, {
				"../aac": 36,
				"../codecs/adts.js": 38,
				"../codecs/h264": 39,
				"../data/silence": 40,
				"../m2ts/m2ts.js": 48,
				"../utils/clock": 58,
				"../utils/stream.js": 60,
				"./mp4-generator.js": 54
			}
		],
		57: [function (e, t, i) {
				var n = e("../m2ts/stream-types.js"),
				r = e("../m2ts/timestamp-rollover-stream.js").handleRollover,
				a = {};
				a.ts = e("../m2ts/probe.js"),
				a.aac = e("../aac/probe.js");
				var s = 9e4,
				o = 188,
				u = 71,
				d = function (e) {
					return e[0] === "I".charCodeAt(0) && e[1] === "D".charCodeAt(0) && e[2] === "3".charCodeAt(0)
				},
				l = function (e, t) {
					for (var i, n, r = 0, s = o; s < e.byteLength; )
						if (e[r] !== u || e[s] !== u)
							r++, s++;
						else {
							switch (i = e.subarray(r, s), n = a.ts.parseType(i, t.pid)) {
							case "pat":
								t.pid || (t.pid = a.ts.parsePat(i));
								break;
							case "pmt":
								t.table || (t.table = a.ts.parsePmt(i))
							}
							if (t.pid && t.table)
								return;
							r += o,
							s += o
						}
				},
				f = function (e, t, i) {
					for (var n, r, s, d, l, f = 0, c = o, h = !1; c < e.byteLength; )
						if (e[f] !== u || e[c] !== u)
							f++, c++;
						else {
							switch (n = e.subarray(f, c), r = a.ts.parseType(n, t.pid)) {
							case "pes":
								s = a.ts.parsePesType(n, t.table),
								d = a.ts.parsePayloadUnitStartIndicator(n),
								"audio" === s && d && (l = a.ts.parsePesTime(n), l.type = "audio", i.audio.push(l), h = !0)
							}
							if (h)
								break;
							f += o,
							c += o
						}
					for (c = e.byteLength, f = c - o, h = !1; f >= 0; )
						if (e[f] !== u || e[c] !== u)
							f--, c--;
						else {
							switch (n = e.subarray(f, c), r = a.ts.parseType(n, t.pid)) {
							case "pes":
								s = a.ts.parsePesType(n, t.table),
								d = a.ts.parsePayloadUnitStartIndicator(n),
								"audio" === s && d && (l = a.ts.parsePesTime(n), l.type = "audio", i.audio.push(l), h = !0)
							}
							if (h)
								break;
							f -= o,
							c -= o
						}
				},
				c = function (e, t, i) {
					for (var n, r, s, d, l, f, c, h, p = 0, m = o, g = !1, y = {
							data: [],
							size: 0
						}; m < e.byteLength; )
						if (e[p] !== u || e[m] !== u)
							p++, m++;
						else {
							switch (n = e.subarray(p, m), r = a.ts.parseType(n, t.pid)) {
							case "pes":
								if (s = a.ts.parsePesType(n, t.table), d = a.ts.parsePayloadUnitStartIndicator(n), "video" === s && (d && !g && (l = a.ts.parsePesTime(n), l.type = "video", i.video.push(l), g = !0), !i.firstKeyFrame)) {
									if (d && 0 !== y.size) {
										for (f = new Uint8Array(y.size), c = 0; y.data.length; )
											h = y.data.shift(), f.set(h, c), c += h.byteLength;
										a.ts.videoPacketContainsKeyFrame(f) && (i.firstKeyFrame = a.ts.parsePesTime(f), i.firstKeyFrame.type = "video"),
										y.size = 0
									}
									y.data.push(n),
									y.size += n.byteLength
								}
							}
							if (g && i.firstKeyFrame)
								break;
							p += o,
							m += o
						}
					for (m = e.byteLength, p = m - o, g = !1; p >= 0; )
						if (e[p] !== u || e[m] !== u)
							p--, m--;
						else {
							switch (n = e.subarray(p, m), r = a.ts.parseType(n, t.pid)) {
							case "pes":
								s = a.ts.parsePesType(n, t.table),
								d = a.ts.parsePayloadUnitStartIndicator(n),
								"video" === s && d && (l = a.ts.parsePesTime(n), l.type = "video", i.video.push(l), g = !0)
							}
							if (g)
								break;
							p -= o,
							m -= o
						}
				},
				h = function (e, t) {
					if (e.audio && e.audio.length) {
						var i = t;
						"undefined" == typeof i && (i = e.audio[0].dts),
						e.audio.forEach(function (e) {
							e.dts = r(e.dts, i),
							e.pts = r(e.pts, i),
							e.dtsTime = e.dts / s,
							e.ptsTime = e.pts / s
						})
					}
					if (e.video && e.video.length) {
						var n = t;
						if ("undefined" == typeof n && (n = e.video[0].dts), e.video.forEach(function (e) {
								e.dts = r(e.dts, n),
								e.pts = r(e.pts, n),
								e.dtsTime = e.dts / s,
								e.ptsTime = e.pts / s
							}), e.firstKeyFrame) {
							var a = e.firstKeyFrame;
							a.dts = r(a.dts, n),
							a.pts = r(a.pts, n),
							a.dtsTime = a.dts / s,
							a.ptsTime = a.dts / s
						}
					}
				},
				p = function (e) {
					for (var t, i = !1, n = 0, r = null, o = null, u = 0, d = 0; e.length - d >= 3; ) {
						var l = a.aac.parseType(e, d);
						switch (l) {
						case "timed-metadata":
							if (e.length - d < 10) {
								i = !0;
								break
							}
							if (u = a.aac.parseId3TagSize(e, d), u > e.length) {
								i = !0;
								break
							}
							null === o && (t = e.subarray(d, d + u), o = a.aac.parseAacTimestamp(t)),
							d += u;
							break;
						case "audio":
							if (e.length - d < 7) {
								i = !0;
								break
							}
							if (u = a.aac.parseAdtsSize(e, d), u > e.length) {
								i = !0;
								break
							}
							null === r && (t = e.subarray(d, d + u), r = a.aac.parseSampleRate(t)),
							n++,
							d += u;
							break;
						default:
							d++
						}
						if (i)
							return null
					}
					if (null === r || null === o)
						return null;
					var f = s / r,
					c = {
						audio: [{
								type: "audio",
								dts: o,
								pts: o
							}, {
								type: "audio",
								dts: o + 1024 * n * f,
								pts: o + 1024 * n * f
							}
						]
					};
					return c
				},
				m = function (e) {
					var t = {
						pid: null,
						table: null
					},
					i = {};
					l(e, t);
					for (var r in t.table)
						if (t.table.hasOwnProperty(r)) {
							var a = t.table[r];
							switch (a) {
							case n.H264_STREAM_TYPE:
								i.video = [],
								c(e, t, i),
								0 === i.video.length && delete i.video;
								break;
							case n.ADTS_STREAM_TYPE:
								i.audio = [],
								f(e, t, i),
								0 === i.audio.length && delete i.audio
							}
						}
					return i
				},
				g = function (e, t) {
					var i,
					n = d(e);
					return i = n ? p(e) : m(e),
					i && (i.audio || i.video) ? (h(i, t), i) : null
				};
				t.exports = {
					inspect: g
				}
			}, {
				"../aac/probe.js": 37,
				"../m2ts/probe.js": 50,
				"../m2ts/stream-types.js": 51,
				"../m2ts/timestamp-rollover-stream.js": 52
			}
		],
		58: [function (e, t, i) {
				var n,
				r,
				a,
				s,
				o,
				u,
				d = 9e4;
				n = function (e) {
					return e * d
				},
				r = function (e, t) {
					return e * t
				},
				a = function (e) {
					return e / d
				},
				s = function (e, t) {
					return e / t
				},
				o = function (e, t) {
					return n(s(e, t))
				},
				u = function (e, t) {
					return r(a(e), t)
				},
				t.exports = {
					secondsToVideoTs: n,
					secondsToAudioTs: r,
					videoTsToSeconds: a,
					audioTsToSeconds: s,
					audioTsToVideoTs: o,
					videoTsToAudioTs: u
				}
			}, {}
		],
		59: [function (e, t, i) {
				var n;
				n = function (e) {
					var t = e.byteLength,
					i = 0,
					n = 0;
					this.length = function () {
						return 8 * t
					},
					this.bitsAvailable = function () {
						return 8 * t + n
					},
					this.loadWord = function () {
						var r = e.byteLength - t,
						a = new Uint8Array(4),
						s = Math.min(4, t);
						if (0 === s)
							throw new Error("no bytes available");
						a.set(e.subarray(r, r + s)),
						i = new DataView(a.buffer).getUint32(0),
						n = 8 * s,
						t -= s
					},
					this.skipBits = function (e) {
						var r;
						n > e ? (i <<= e, n -= e) : (e -= n, r = Math.floor(e / 8), e -= 8 * r, t -= r, this.loadWord(), i <<= e, n -= e)
					},
					this.readBits = function (e) {
						var r = Math.min(n, e),
						a = i >>> 32 - r;
						return n -= r,
						n > 0 ? i <<= r : t > 0 && this.loadWord(),
						r = e - r,
						r > 0 ? a << r | this.readBits(r) : a
					},
					this.skipLeadingZeros = function () {
						var e;
						for (e = 0; e < n; ++e)
							if (0 !== (i & 2147483648 >>> e))
								return i <<= e, n -= e, e;
						return this.loadWord(),
						e + this.skipLeadingZeros()
					},
					this.skipUnsignedExpGolomb = function () {
						this.skipBits(1 + this.skipLeadingZeros())
					},
					this.skipExpGolomb = function () {
						this.skipBits(1 + this.skipLeadingZeros())
					},
					this.readUnsignedExpGolomb = function () {
						var e = this.skipLeadingZeros();
						return this.readBits(e + 1) - 1
					},
					this.readExpGolomb = function () {
						var e = this.readUnsignedExpGolomb();
						return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
					},
					this.readBoolean = function () {
						return 1 === this.readBits(1)
					},
					this.readUnsignedByte = function () {
						return this.readBits(8)
					},
					this.loadWord()
				},
				t.exports = n
			}, {}
		],
		60: [function (e, t, i) {
				var n = function () {
					this.init = function () {
						var e = {};
						this.on = function (t, i) {
							e[t] || (e[t] = []),
							e[t] = e[t].concat(i)
						},
						this.off = function (t, i) {
							var n;
							return !!e[t] && (n = e[t].indexOf(i), e[t] = e[t].slice(), e[t].splice(n, 1), n > -1)
						},
						this.trigger = function (t) {
							var i,
							n,
							r,
							a;
							if (i = e[t])
								if (2 === arguments.length)
									for (r = i.length, n = 0; n < r; ++n)
										i[n].call(this, arguments[1]);
								else {
									for (a = [], n = arguments.length, n = 1; n < arguments.length; ++n)
										a.push(arguments[n]);
									for (r = i.length, n = 0; n < r; ++n)
										i[n].apply(this, a)
								}
						},
						this.dispose = function () {
							e = {}
						}
					}
				};
				n.prototype.pipe = function (e) {
					return this.on("data", function (t) {
						e.push(t)
					}),
					this.on("done", function (t) {
						e.flush(t)
					}),
					e
				},
				n.prototype.push = function (e) {
					this.trigger("data", e)
				},
				n.prototype.flush = function (e) {
					this.trigger("done", e)
				},
				t.exports = n
			}, {}
		],
		61: [function (e, t, i) {
				!function (e) {
					var n = {
						buildAbsoluteURL: function (e, t) {
							if (t = t.trim(), /^[a-z]+:/i.test(t))
								return t;
							var i = null,
							r = null,
							a = /^([^#]*)(.*)$/.exec(t);
							a && (r = a[2], t = a[1]);
							var s = /^([^\?]*)(.*)$/.exec(t);
							s && (i = s[2], t = s[1]);
							var o = /^([^#]*)(.*)$/.exec(e);
							o && (e = o[1]);
							var u = /^([^\?]*)(.*)$/.exec(e);
							u && (e = u[1]);
							var d = /^(([a-z]+:)?\/\/[^:\/]+(:[0-9]+)?)?(\/?.*)$/i.exec(e);
							if (!d)
								throw new Error("Error trying to parse base URL.");
							var l = d[2] || "",
							f = d[1] || "",
							c = d[4];
							0 !== c.indexOf("/") && "" !== f && (c = "/" + c);
							var h = null;
							return h = /^\/\//.test(t) ? l + "//" + n.buildAbsolutePath("", t.substring(2)) : /^\//.test(t) ? f + "/" + n.buildAbsolutePath("", t.substring(1)) : n.buildAbsolutePath(f + c, t),
							i && (h += i),
							r && (h += r),
							h
						},
						buildAbsolutePath: function (e, t) {
							for (var i, n, r = t, a = "", s = e.replace(/[^\/]*$/, r.replace(/(\/|^)(?:\.?\/+)+/g, "$1")), o = 0; n = s.indexOf("/../", o), n > -1; o = n + i)
								i = /^\/(?:\.\.\/)*/.exec(s.slice(n))[0].length, a = (a + s.substring(o, n)).replace(new RegExp("(?:\\/+[^\\/]*){0," + (i - 1) / 3 + "}$"), "/");
							return a + s.substr(o)
						}
					};
					"object" == typeof i && "object" == typeof t ? t.exports = n : "function" == typeof define && define.amd ? define([], function () {
						return n
					}) : "object" == typeof i ? i.URLToolkit = n : e.URLToolkit = n
				}
				(this)
			}, {}
		],
		62: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var a = e("global/window"),
					s = r(a),
					o = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					u = r(o),
					d = function (e) {
						Object.defineProperties(e.frame, {
							id: {
								get: function () {
									return u.default.log.warn("cue.frame.id is deprecated. Use cue.value.key instead."),
									e.value.key
								}
							},
							value: {
								get: function () {
									return u.default.log.warn("cue.frame.value is deprecated. Use cue.value.data instead."),
									e.value.data
								}
							},
							privateData: {
								get: function () {
									return u.default.log.warn("cue.frame.privateData is deprecated. Use cue.value.data instead."),
									e.value.data
								}
							}
						})
					},
					l = function (e) {
						var t = void 0;
						return t = isNaN(e) || Math.abs(e) === 1 / 0 ? Number.MAX_VALUE : e
					},
					f = function (e, t, i) {
						var n = s.default.WebKitDataCue || s.default.VTTCue;
						t && t.forEach(function (e) {
							this.inbandTextTrack_.addCue(new n(e.startTime + this.timestampOffset, e.endTime + this.timestampOffset, e.text))
						}, e),
						i && !function () {
							var t = l(e.mediaSource_.duration);
							i.forEach(function (e) {
								var t = e.cueTime + this.timestampOffset;
								e.frames.forEach(function (e) {
									var i = new n(t, t, e.value || e.url || e.data || "");
									i.frame = e,
									i.value = e,
									d(i),
									this.metadataTrack_.addCue(i)
								}, this)
							}, e),
							e.metadataTrack_ && e.metadataTrack_.cues && e.metadataTrack_.cues.length && !function () {
								for (var i = e.metadataTrack_.cues, n = [], r = 0; r < i.length; r++)
									i[r] && n.push(i[r]);
								var a = n.reduce(function (e, t) {
									var i = e[t.startTime] || [];
									return i.push(t),
									e[t.startTime] = i,
									e
								}, {}),
								s = Object.keys(a).sort(function (e, t) {
									return Number(e) - Number(t)
								});
								s.forEach(function (e, i) {
									var n = a[e],
									r = Number(s[i + 1]) || t;
									n.forEach(function (e) {
										e.endTime = r
									})
								})
							}
							()
						}
						()
					};
					i.default = {
						addTextTrackData: f,
						durationOfVideo: l
					},
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"global/window": 30
			}
		],
		63: [function (e, t, i) {
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = function (e, t, i) {
					for (var n = e.remoteTextTracks() || [], r = 0; r < n.length; r++) {
						var a = n[r];
						a.kind === t && a.label === i && e.removeRemoteTextTrack(a)
					}
				};
				i.removeExistingTrack = n;
				var r = function (e) {
					n(e, "captions", "cc1"),
					n(e, "metadata", "Timed Metadata")
				};
				i.cleanupTextTracks = r
			}, {}
		],
		64: [function (e, t, i) {
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = function (e) {
					return /mp4a\.\d+.\d+/i.test(e)
				},
				r = function (e) {
					return /avc1\.[\da-f]+/i.test(e)
				},
				a = function (e) {
					var t = {
						type: "",
						parameters: {}
					},
					i = e.trim().split(";");
					return t.type = i.shift().trim(),
					i.forEach(function (e) {
						var i = e.trim().split("=");
						if (i.length > 1) {
							var n = i[0].replace(/"/g, "").trim(),
							r = i[1].replace(/"/g, "").trim();
							t.parameters[n] = r
						}
					}),
					t
				},
				s = function (e) {
					return e.map(function (e) {
						return e.replace(/avc1\.(\d+)\.(\d+)/i, function (e, t, i) {
							var n = ("00" + Number(t).toString(16)).slice(-2),
							r = ("00" + Number(i).toString(16)).slice(-2);
							return "avc1." + n + "00" + r
						})
					})
				};
				i.default = {
					isAudioCodec: n,
					parseContentType: a,
					isVideoCodec: r,
					translateLegacyCodecs: s
				},
				t.exports = i.default
			}, {}
		],
		65: [function (e, t, i) {
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = e("./cleanup-text-tracks"),
				r = function (e, t, i) {
					var r = t.player_;
					i.captions && i.captions.length && !e.inbandTextTrack_ && ((0, n.removeExistingTrack)(r, "captions", "cc1"), e.inbandTextTrack_ = r.addRemoteTextTrack({
							kind: "captions",
							label: "cc1"
						}, !1).track),
					i.metadata && i.metadata.length && !e.metadataTrack_ && ((0, n.removeExistingTrack)(r, "metadata", "Timed Metadata", !0), e.metadataTrack_ = r.addRemoteTextTrack({
							kind: "metadata",
							label: "Timed Metadata"
						}, !1).track, e.metadataTrack_.inBandMetadataTrackDispatchType = i.metadata.dispatchType)
				};
				i.default = r,
				t.exports = i.default
			}, {
				"./cleanup-text-tracks": 63
			}
		],
		66: [function (e, t, i) {
				"use strict";
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = {
					TIME_BETWEEN_CHUNKS: 1,
					BYTES_PER_CHUNK: 32768
				};
				i.default = n,
				t.exports = i.default
			}, {}
		],
		67: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = e("global/document"),
					l = r(d),
					f = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					c = r(f),
					h = e("./flash-source-buffer"),
					p = r(h),
					m = e("./flash-constants"),
					g = r(m),
					y = e("./codec-utils"),
					v = e("./cleanup-text-tracks"),
					b = function (e) {
						function t() {
							var e = this;
							a(this, t),
							u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this),
							this.sourceBuffers = [],
							this.readyState = "closed",
							this.on(["sourceopen", "webkitsourceopen"], function (t) {
								e.swfObj = l.default.getElementById(t.swfId),
								e.player_ = (0, c.default)(e.swfObj.parentNode),
								e.tech_ = e.swfObj.tech,
								e.readyState = "open",
								e.tech_.on("seeking", function () {
									for (var t = e.sourceBuffers.length; t--; )
										e.sourceBuffers[t].abort()
								}),
								e.tech_.hls && e.tech_.hls.on("dispose", function () {
									(0, v.cleanupTextTracks)(e.player_)
								}),
								e.swfObj && e.swfObj.vjs_load()
							})
						}
						return s(t, e),
						o(t, [{
									key: "addSeekableRange_",
									value: function () {}
								}, {
									key: "addSourceBuffer",
									value: function (e) {
										var t = (0, y.parseContentType)(e),
										i = void 0;
										if ("video/mp2t" !== t.type)
											throw new Error("NotSupportedError (Video.js)");
										return i = new p.default(this),
										this.sourceBuffers.push(i),
										i
									}
								}, {
									key: "endOfStream",
									value: function (e) {
										"network" === e ? this.tech_.error(2) : "decode" === e && this.tech_.error(3),
										"ended" !== this.readyState && (this.readyState = "ended", this.swfObj.vjs_endOfStream())
									}
								}
							]),
						t
					}
					(c.default.EventTarget);
					i.default = b;
					try {
						Object.defineProperty(b.prototype, "duration", {
							get: function () {
								return this.swfObj ? this.swfObj.vjs_getProperty("duration") : NaN
							},
							set: function (e) {
								var t = void 0,
								i = this.swfObj.vjs_getProperty("duration");
								if (this.swfObj.vjs_setProperty("duration", e), e < i)
									for (t = 0; t < this.sourceBuffers.length; t++)
										this.sourceBuffers[t].remove(e, i);
								return e
							}
						})
					} catch (e) {
						b.prototype.duration = NaN
					}
					for (var _ in g.default)
						b[_] = g.default[_];
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./cleanup-text-tracks": 63,
				"./codec-utils": 64,
				"./flash-constants": 66,
				"./flash-source-buffer": 68,
				"global/document": 29
			}
		],
		68: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = e("global/window"),
					l = r(d),
					f = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					c = r(f),
					h = e("mux.js/lib/flv"),
					p = r(h),
					m = e("./remove-cues-from-track"),
					g = r(m),
					y = e("./create-text-tracks-if-necessary"),
					v = r(y),
					b = e("./add-text-track-data"),
					_ = e("./flash-transmuxer-worker"),
					T = r(_),
					S = e("webworkify"),
					w = r(S),
					k = e("./flash-constants"),
					x = r(k),
					O = function (e) {
						l.default.setTimeout(e, x.default.TIME_BETWEEN_CHUNKS)
					},
					E = function () {
						return Math.random().toString(36).slice(2, 8)
					},
					P = function (e, t) {
						("number" != typeof t || t < 0) && (t = 0);
						var i = Math.pow(10, t);
						return Math.round(e * i) / i
					},
					A = function (e) {
						function t(e) {
							var i = this;
							a(this, t),
							u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this);
							var n = void 0;
							this.chunkSize_ = x.default.BYTES_PER_CHUNK,
							this.buffer_ = [],
							this.bufferSize_ = 0,
							this.basePtsOffset_ = NaN,
							this.mediaSource_ = e,
							this.audioBufferEnd_ = NaN,
							this.videoBufferEnd_ = NaN,
							this.updating = !1,
							this.timestampOffset_ = 0,
							n = l.default.btoa(String.fromCharCode.apply(null, Array.prototype.slice.call(p.default.getFlvHeader())));
							var r = this.mediaSource_.player_.id().replace(/[^a-zA-Z0-9]/g, "_");
							this.flashEncodedHeaderName_ = "vjs_flashEncodedHeader_" + r + E(),
							this.flashEncodedDataName_ = "vjs_flashEncodedData_" + r + E(),
							l.default[this.flashEncodedHeaderName_] = function () {
								return delete l.default[i.flashEncodedHeaderName_],
								n
							},
							this.mediaSource_.swfObj.vjs_appendChunkReady(this.flashEncodedHeaderName_),
							this.transmuxer_ = (0, w.default)(T.default),
							this.transmuxer_.postMessage({
								action: "init",
								options: {}
							}),
							this.transmuxer_.onmessage = function (e) {
								"data" === e.data.action && i.receiveBuffer_(e.data.segment)
							},
							this.one("updateend", function () {
								i.mediaSource_.tech_.trigger("loadedmetadata")
							}),
							Object.defineProperty(this, "timestampOffset", {
								get: function () {
									return this.timestampOffset_
								},
								set: function (e) {
									"number" == typeof e && e >= 0 && (this.timestampOffset_ = e, this.mediaSource_.swfObj.vjs_discontinuity(), this.basePtsOffset_ = NaN, this.audioBufferEnd_ = NaN, this.videoBufferEnd_ = NaN, this.transmuxer_.postMessage({
											action: "reset"
										}))
								}
							}),
							Object.defineProperty(this, "buffered", {
								get: function () {
									if (!(this.mediaSource_ && this.mediaSource_.swfObj && "vjs_getProperty" in this.mediaSource_.swfObj))
										return c.default.createTimeRange();
									var e = this.mediaSource_.swfObj.vjs_getProperty("buffered");
									return e && e.length && (e[0][0] = P(e[0][0], 3), e[0][1] = P(e[0][1], 3)),
									c.default.createTimeRanges(e)
								}
							}),
							this.mediaSource_.player_.on("seeked", function () {
								(0, g.default)(0, 1 / 0, i.metadataTrack_),
								(0, g.default)(0, 1 / 0, i.inbandTextTrack_)
							}),
							this.mediaSource_.player_.tech_.hls.on("dispose", function () {
								i.transmuxer_.terminate()
							})
						}
						return s(t, e),
						o(t, [{
									key: "appendBuffer",
									value: function (e) {
										var t = void 0;
										if (this.updating)
											throw t = new Error("SourceBuffer.append() cannot be called while an update is in progress"), t.name = "InvalidStateError", t.code = 11, t;
										this.updating = !0,
										this.mediaSource_.readyState = "open",
										this.trigger({
											type: "update"
										}),
										this.transmuxer_.postMessage({
											action: "push",
											data: e.buffer,
											byteOffset: e.byteOffset,
											byteLength: e.byteLength
										}, [e.buffer]),
										this.transmuxer_.postMessage({
											action: "flush"
										})
									}
								}, {
									key: "abort",
									value: function () {
										this.buffer_ = [],
										this.bufferSize_ = 0,
										this.mediaSource_.swfObj.vjs_abort(),
										this.updating && (this.updating = !1, this.trigger({
												type: "updateend"
											}))
									}
								}, {
									key: "remove",
									value: function (e, t) {
										(0, g.default)(e, t, this.metadataTrack_),
										(0, g.default)(e, t, this.inbandTextTrack_),
										this.trigger({
											type: "update"
										}),
										this.trigger({
											type: "updateend"
										})
									}
								}, {
									key: "receiveBuffer_",
									value: function (e) {
										var t = this;
										(0, v.default)(this, this.mediaSource_, e),
										(0, b.addTextTrackData)(this, e.captions, e.metadata),
										O(function () {
											var i = t.convertTagsToData_(e);
											0 === t.buffer_.length && O(t.processBuffer_.bind(t)),
											i && (t.buffer_.push(i), t.bufferSize_ += i.byteLength)
										})
									}
								}, {
									key: "processBuffer_",
									value: function () {
										var e = this,
										t = x.default.BYTES_PER_CHUNK;
										if (!this.buffer_.length)
											return void(this.updating !== !1 && (this.updating = !1, this.trigger({
														type: "updateend"
													})));
										var i = this.buffer_[0].subarray(0, t);
										i.byteLength < t || this.buffer_[0].byteLength === t ? this.buffer_.shift() : this.buffer_[0] = this.buffer_[0].subarray(t),
										this.bufferSize_ -= i.byteLength;
										for (var n = [], r = i.byteLength, a = 0; a < r; a++)
											n.push(String.fromCharCode(i[a]));
										var s = l.default.btoa(n.join(""));
										l.default[this.flashEncodedDataName_] = function () {
											return O(e.processBuffer_.bind(e)),
											delete l.default[e.flashEncodedDataName_],
											s
										},
										this.mediaSource_.swfObj.vjs_appendChunkReady(this.flashEncodedDataName_)
									}
								}, {
									key: "convertTagsToData_",
									value: function (e) {
										var t = 0,
										i = this.mediaSource_.tech_,
										n = 0,
										r = void 0,
										a = e.tags.videoTags,
										s = e.tags.audioTags;
										if (isNaN(this.basePtsOffset_) && (a.length || s.length)) {
											var o = a[0] || {
												pts: 1 / 0
											},
											u = s[0] || {
												pts: 1 / 0
											};
											this.basePtsOffset_ = Math.min(u.pts, o.pts)
										}
										i.seeking() && (this.videoBufferEnd_ = NaN, this.audioBufferEnd_ = NaN),
										isNaN(this.videoBufferEnd_) ? (i.buffered().length && (n = i.buffered().end(0) - this.timestampOffset), i.seeking() && (n = Math.max(n, i.currentTime() - this.timestampOffset)), n *= 1e3, n += this.basePtsOffset_) : n = this.videoBufferEnd_ + .1;
										var d = a.length;
										if (d && a[d - 1].pts >= n) {
											for (; --d; ) {
												var l = a[d];
												if (!(l.pts > n) && (l.keyFrame || l.metaDataTag))
													break
											}
											for (; d; ) {
												var f = a[d - 1];
												if (!f.metaDataTag)
													break;
												d--
											}
										}
										var c = a.slice(d),
										h = void 0;
										for (h = isNaN(this.audioBufferEnd_) ? n : this.audioBufferEnd_ + .1, c.length && (h = Math.min(h, c[0].pts)), d = 0; d < s.length && !(s[d].pts >= h); )
											d++;
										var p = s.slice(d);
										p.length && (this.audioBufferEnd_ = p[p.length - 1].pts),
										c.length && (this.videoBufferEnd_ = c[c.length - 1].pts);
										var m = this.getOrderedTags_(c, p);
										if (0 !== m.length) {
											if (m[0].pts < n && i.seeking()) {
												var g = 1 / 30,
												y = i.currentTime(),
												v = (n - m[0].pts) / 1e3,
												b = y - v;
												b < g && (b = 0);
												try {
													this.mediaSource_.swfObj.vjs_adjustCurrentTime(b)
												} catch (e) {}
											}
											for (var _ = 0; _ < m.length; _++)
												t += m[_].bytes.byteLength;
											r = new Uint8Array(t);
											for (var _ = 0, T = 0; _ < m.length; _++)
												r.set(m[_].bytes, T), T += m[_].bytes.byteLength;
											return r
										}
									}
								}, {
									key: "getOrderedTags_",
									value: function (e, t) {
										for (var i = void 0, n = []; e.length || t.length; )
											i = e.length ? t.length && t[0].dts < e[0].dts ? t.shift() : e.shift() : t.shift(), n.push(i);
										return n
									}
								}
							]),
						t
					}
					(c.default.EventTarget);
					i.default = A,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./add-text-track-data": 62,
				"./create-text-tracks-if-necessary": 65,
				"./flash-constants": 66,
				"./flash-transmuxer-worker": 69,
				"./remove-cues-from-track": 71,
				"global/window": 30,
				"mux.js/lib/flv": 44,
				webworkify: 75
			}
		],
		69: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var a = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				s = e("global/window"),
				o = n(s),
				u = e("mux.js/lib/flv"),
				d = n(u),
				l = function (e) {
					e.on("data", function (e) {
						o.default.postMessage({
							action: "data",
							segment: e
						})
					}),
					e.on("done", function (e) {
						o.default.postMessage({
							action: "done"
						})
					})
				},
				f = function () {
					function e(t) {
						r(this, e),
						this.options = t || {},
						this.init()
					}
					return a(e, [{
								key: "init",
								value: function () {
									this.transmuxer && this.transmuxer.dispose(),
									this.transmuxer = new d.default.Transmuxer(this.options),
									l(this.transmuxer)
								}
							}, {
								key: "push",
								value: function (e) {
									var t = new Uint8Array(e.data, e.byteOffset, e.byteLength);
									this.transmuxer.push(t)
								}
							}, {
								key: "reset",
								value: function () {
									this.init()
								}
							}, {
								key: "flush",
								value: function () {
									this.transmuxer.flush()
								}
							}
						]),
					e
				}
				(),
				c = function (e) {
					e.onmessage = function (e) {
						return "init" === e.data.action && e.data.options ? void(this.messageHandlers = new f(e.data.options)) : (this.messageHandlers || (this.messageHandlers = new f), void(e.data && e.data.action && "init" !== e.data.action && this.messageHandlers[e.data.action] && this.messageHandlers[e.data.action](e.data)))
					}
				};
				i.default = function (e) {
					return new c(e)
				},
				t.exports = i.default
			}, {
				"global/window": 30,
				"mux.js/lib/flv": 44
			}
		],
		70: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = e("global/window"),
					l = r(d),
					f = e("global/document"),
					c = r(f),
					h = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					p = r(h),
					m = e("./virtual-source-buffer"),
					g = r(m),
					y = e("./add-text-track-data"),
					v = e("./codec-utils"),
					b = e("./cleanup-text-tracks"),
					_ = function (e) {
						function t() {
							var e = this;
							a(this, t),
							u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this);
							var i = void 0;
							this.nativeMediaSource_ = new l.default.MediaSource;
							for (i in this.nativeMediaSource_)
								i in t.prototype || "function" != typeof this.nativeMediaSource_[i] || (this[i] = this.nativeMediaSource_[i].bind(this.nativeMediaSource_));
							this.duration_ = NaN,
							Object.defineProperty(this, "duration", {
								get: function () {
									return this.duration_ === 1 / 0 ? this.duration_ : this.nativeMediaSource_.duration
								},
								set: function (e) {
									if (this.duration_ = e, e !== 1 / 0)
										return void(this.nativeMediaSource_.duration = e)
								}
							}),
							Object.defineProperty(this, "seekable", {
								get: function () {
									return this.duration_ === 1 / 0 ? p.default.createTimeRanges([[0, this.nativeMediaSource_.duration]]) : this.nativeMediaSource_.seekable
								}
							}),
							Object.defineProperty(this, "readyState", {
								get: function () {
									return this.nativeMediaSource_.readyState
								}
							}),
							Object.defineProperty(this, "activeSourceBuffers", {
								get: function () {
									return this.activeSourceBuffers_
								}
							}),
							this.sourceBuffers = [],
							this.activeSourceBuffers_ = [],
							this.updateActiveSourceBuffers_ = function () {
								e.activeSourceBuffers_.length = 0;
								for (var t = !1, i = !0, n = 0; n < e.player_.audioTracks().length; n++) {
									var r = e.player_.audioTracks()[n];
									if (r.enabled && "main" !== r.kind) {
										t = !0,
										i = !1;
										break
									}
								}
								e.sourceBuffers.forEach(function (n) {
									if (n.appendAudioInitSegment_ = !0, n.videoCodec_ && n.audioCodec_)
										n.audioDisabled_ = t;
									else if (n.videoCodec_ && !n.audioCodec_)
										n.audioDisabled_ = !0, i = !1;
									else if (!n.videoCodec_ && n.audioCodec_ && (n.audioDisabled_ = i, i))
										return;
									e.activeSourceBuffers_.push(n)
								})
							},
							this.onPlayerMediachange_ = function () {
								e.sourceBuffers.forEach(function (e) {
									e.appendAudioInitSegment_ = !0
								})
							},
							["sourceopen", "sourceclose", "sourceended"].forEach(function (e) {
								this.nativeMediaSource_.addEventListener(e, this.trigger.bind(this))
							}, this),
							this.on("sourceopen", function (t) {
								var i = c.default.querySelector('[src="' + e.url_ + '"]');
								i && (e.player_ = (0, p.default)(i.parentNode), e.player_.audioTracks && e.player_.audioTracks() && (e.player_.audioTracks().on("change", e.updateActiveSourceBuffers_), e.player_.audioTracks().on("addtrack", e.updateActiveSourceBuffers_), e.player_.audioTracks().on("removetrack", e.updateActiveSourceBuffers_)), e.player_.on("mediachange", e.onPlayerMediachange_))
							}),
							this.on("sourceended", function (t) {
								for (var i = (0, y.durationOfVideo)(e.duration), n = 0; n < e.sourceBuffers.length; n++) {
									var r = e.sourceBuffers[n],
									a = r.metadataTrack_ && r.metadataTrack_.cues;
									a && a.length && (a[a.length - 1].endTime = i)
								}
							}),
							this.on("sourceclose", function (e) {
								this.sourceBuffers.forEach(function (e) {
									e.transmuxer_ && e.transmuxer_.terminate()
								}),
								this.sourceBuffers.length = 0,
								this.player_ && ((0, b.cleanupTextTracks)(this.player_), this.player_.audioTracks && this.player_.audioTracks() && (this.player_.audioTracks().off("change", this.updateActiveSourceBuffers_), this.player_.audioTracks().off("addtrack", this.updateActiveSourceBuffers_), this.player_.audioTracks().off("removetrack", this.updateActiveSourceBuffers_)), this.player_.el_ && this.player_.off("mediachange", this.onPlayerMediachange_))
							})
						}
						return s(t, e),
						o(t, [{
									key: "addSeekableRange_",
									value: function (e, t) {
										var i = void 0;
										if (this.duration !== 1 / 0)
											throw i = new Error("MediaSource.addSeekableRange() can only be invoked when the duration is Infinity"), i.name = "InvalidStateError", i.code = 11, i;
										(t > this.nativeMediaSource_.duration || isNaN(this.nativeMediaSource_.duration)) && (this.nativeMediaSource_.duration = t)
									}
								}, {
									key: "addSourceBuffer",
									value: function (e) {
										var t = void 0,
										i = (0, v.parseContentType)(e);
										if (/^(video|audio)\/mp2t$/i.test(i.type)) {
											var n = [];
											i.parameters && i.parameters.codecs && (n = i.parameters.codecs.split(","), n = (0, v.translateLegacyCodecs)(n), n = n.filter(function (e) {
													return (0, v.isAudioCodec)(e) || (0, v.isVideoCodec)(e)
												})),
											0 === n.length && (n = ["avc1.4d400d", "mp4a.40.2"]),
											t = new g.default(this, n),
											0 !== this.sourceBuffers.length && (this.sourceBuffers[0].createRealSourceBuffers_(), t.createRealSourceBuffers_(), this.sourceBuffers[0].audioDisabled_ = !0)
										} else
											t = this.nativeMediaSource_.addSourceBuffer(e);
										return this.sourceBuffers.push(t),
										t
									}
								}
							]),
						t
					}
					(p.default.EventTarget);
					i.default = _,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./add-text-track-data": 62,
				"./cleanup-text-tracks": 63,
				"./codec-utils": 64,
				"./virtual-source-buffer": 74,
				"global/document": 29,
				"global/window": 30
			}
		],
		71: [function (e, t, i) {
				"use strict";
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var n = function (e, t, i) {
					var n = void 0,
					r = void 0;
					if (i && i.cues)
						for (n = i.cues.length; n--; )
							r = i.cues[n], r.startTime <= t && r.endTime >= e && i.removeCue(r)
				};
				i.default = n,
				t.exports = i.default
			}, {}
		],
		72: [function (e, t, i) {
				function n(e) {
					return e && e.__esModule ? e : {
					default:
						e
					}
				}
				function r(e, t) {
					if (!(e instanceof t))
						throw new TypeError("Cannot call a class as a function")
				}
				Object.defineProperty(i, "__esModule", {
					value: !0
				});
				var a = function () {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1,
							n.configurable = !0,
							"value" in n && (n.writable = !0),
							Object.defineProperty(e, n.key, n)
						}
					}
					return function (t, i, n) {
						return i && e(t.prototype, i),
						n && e(t, n),
						t
					}
				}
				(),
				s = e("global/window"),
				o = n(s),
				u = e("mux.js/lib/mp4"),
				d = n(u),
				l = function (e) {
					e.on("data", function (e) {
						var t = e.initSegment;
						e.initSegment = {
							data: t.buffer,
							byteOffset: t.byteOffset,
							byteLength: t.byteLength
						};
						var i = e.data;
						e.data = i.buffer,
						o.default.postMessage({
							action: "data",
							segment: e,
							byteOffset: i.byteOffset,
							byteLength: i.byteLength
						}, [e.data])
					}),
					e.captionStream && e.captionStream.on("data", function (e) {
						o.default.postMessage({
							action: "caption",
							data: e
						})
					}),
					e.on("done", function (e) {
						o.default.postMessage({
							action: "done"
						})
					})
				},
				f = function () {
					function e(t) {
						r(this, e),
						this.options = t || {},
						this.init()
					}
					return a(e, [{
								key: "init",
								value: function () {
									this.transmuxer && this.transmuxer.dispose(),
									this.transmuxer = new d.default.Transmuxer(this.options),
									l(this.transmuxer)
								}
							}, {
								key: "push",
								value: function (e) {
									var t = new Uint8Array(e.data, e.byteOffset, e.byteLength);
									this.transmuxer.push(t)
								}
							}, {
								key: "reset",
								value: function () {
									this.init()
								}
							}, {
								key: "setTimestampOffset",
								value: function (e) {
									var t = e.timestampOffset || 0;
									this.transmuxer.setBaseMediaDecodeTime(Math.round(9e4 * t))
								}
							}, {
								key: "setAudioAppendStart",
								value: function (e) {
									this.transmuxer.setAudioAppendStart(Math.ceil(9e4 * e.appendStart))
								}
							}, {
								key: "flush",
								value: function (e) {
									this.transmuxer.flush()
								}
							}
						]),
					e
				}
				(),
				c = function (e) {
					e.onmessage = function (e) {
						return "init" === e.data.action && e.data.options ? void(this.messageHandlers = new f(e.data.options)) : (this.messageHandlers || (this.messageHandlers = new f), void(e.data && e.data.action && "init" !== e.data.action && this.messageHandlers[e.data.action] && this.messageHandlers[e.data.action](e.data)))
					}
				};
				i.default = function (e) {
					return new c(e)
				},
				t.exports = i.default
			}, {
				"global/window": 30,
				"mux.js/lib/mp4": 53
			}
		],
		73: [function (e, t, i) {
				(function (t) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var r = e("global/window"),
					a = n(r),
					s = e("./flash-media-source"),
					o = n(s),
					u = e("./html-media-source"),
					d = n(u),
					l = "undefined" != typeof window ? window.videojs : "undefined" != typeof t ? t.videojs : null,
					f = n(l),
					c = 0,
					h = {
						mode: "auto"
					};
					f.default.mediaSources = {};
					var p = function (e, t) {
						var i = f.default.mediaSources[e];
						if (!i)
							throw new Error("Media Source not found (Video.js)");
						i.trigger({
							type: "sourceopen",
							swfId: t
						})
					},
					m = function () {
						return !!a.default.MediaSource && !!a.default.MediaSource.isTypeSupported && a.default.MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"')
					},
					g = function (e) {
						var t = f.default.mergeOptions(h, e);
						if (this.MediaSource = {
								open: p,
								supportsNativeMediaSources: m
							}, "html5" === t.mode || "auto" === t.mode && m())
							return new d.default;
						if (f.default.getTech("Flash"))
							return new o.default;
						throw new Error("Cannot use Flash or Html5 to create a MediaSource for this video")
					};
					i.MediaSource = g,
					g.open = p,
					g.supportsNativeMediaSources = m;
					var y = {
						createObjectURL: function (e) {
							var t = "blob:vjs-media-source/",
							i = void 0;
							return e instanceof d.default ? (i = a.default.URL.createObjectURL(e.nativeMediaSource_), e.url_ = i, i) : e instanceof o.default ? (i = t + c, c++, f.default.mediaSources[i] = e, i) : (i = a.default.URL.createObjectURL(e), e.url_ = i, i)
						}
					};
					i.URL = y,
					f.default.MediaSource = g,
					f.default.URL = y
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./flash-media-source": 67,
				"./html-media-source": 70,
				"global/window": 30
			}
		],
		74: [function (e, t, i) {
				(function (n) {
					function r(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function a(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function s(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					Object.defineProperty(i, "__esModule", {
						value: !0
					});
					var o = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					u = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					d = "undefined" != typeof window ? window.videojs : "undefined" != typeof n ? n.videojs : null,
					l = r(d),
					f = e("./create-text-tracks-if-necessary"),
					c = r(f),
					h = e("./remove-cues-from-track"),
					p = r(h),
					m = e("./add-text-track-data"),
					g = e("webworkify"),
					y = r(g),
					v = e("./transmuxer-worker"),
					b = r(v),
					_ = e("./codec-utils"),
					T = function (e) {
						function t(e, i) {
							var n = this;
							a(this, t),
							u(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, l.default.EventTarget),
							this.timestampOffset_ = 0,
							this.pendingBuffers_ = [],
							this.bufferUpdating_ = !1,
							this.mediaSource_ = e,
							this.codecs_ = i,
							this.audioCodec_ = null,
							this.videoCodec_ = null,
							this.audioDisabled_ = !1,
							this.appendAudioInitSegment_ = !0;
							var r = {
								remux: !1
							};
							this.codecs_.forEach(function (e) {
								(0, _.isAudioCodec)(e) ? n.audioCodec_ = e : (0, _.isVideoCodec)(e) && (n.videoCodec_ = e)
							}),
							this.transmuxer_ = (0, y.default)(b.default),
							this.transmuxer_.postMessage({
								action: "init",
								options: r
							}),
							this.transmuxer_.onmessage = function (e) {
								return "data" === e.data.action ? n.data_(e) : "done" === e.data.action ? n.done_(e) : void 0
							},
							Object.defineProperty(this, "timestampOffset", {
								get: function () {
									return this.timestampOffset_
								},
								set: function (e) {
									"number" == typeof e && e >= 0 && (this.timestampOffset_ = e, this.appendAudioInitSegment_ = !0, this.transmuxer_.postMessage({
											action: "setTimestampOffset",
											timestampOffset: e
										}))
								}
							}),
							Object.defineProperty(this, "appendWindowStart", {
								get: function () {
									return (this.videoBuffer_ || this.audioBuffer_).appendWindowStart
								},
								set: function (e) {
									this.videoBuffer_ && (this.videoBuffer_.appendWindowStart = e),
									this.audioBuffer_ && (this.audioBuffer_.appendWindowStart = e)
								}
							}),
							Object.defineProperty(this, "updating", {
								get: function () {
									return !!(this.bufferUpdating_ || !this.audioDisabled_ && this.audioBuffer_ && this.audioBuffer_.updating || this.videoBuffer_ && this.videoBuffer_.updating)
								}
							}),
							Object.defineProperty(this, "buffered", {
								get: function () {
									var e = null,
									t = null,
									i = 0,
									n = [],
									r = [];
									if (!this.videoBuffer_ && !this.audioBuffer_)
										return l.default.createTimeRange();
									if (!this.videoBuffer_)
										return this.audioBuffer_.buffered;
									if (!this.audioBuffer_)
										return this.videoBuffer_.buffered;
									if (this.audioDisabled_)
										return this.videoBuffer_.buffered;
									if (0 === this.videoBuffer_.buffered.length && 0 === this.audioBuffer_.buffered.length)
										return l.default.createTimeRange();
									for (var a = this.videoBuffer_.buffered, s = this.audioBuffer_.buffered, o = a.length; o--; )
										n.push({
											time: a.start(o),
											type: "start"
										}), n.push({
											time: a.end(o),
											type: "end"
										});
									for (o = s.length; o--; )
										n.push({
											time: s.start(o),
											type: "start"
										}), n.push({
											time: s.end(o),
											type: "end"
										});
									for (n.sort(function (e, t) {
											return e.time - t.time
										}), o = 0; o < n.length; o++)
										"start" === n[o].type ? (i++, 2 === i && (e = n[o].time)) : "end" === n[o].type && (i--, 1 === i && (t = n[o].time)), null !== e && null !== t && (r.push([e, t]), e = null, t = null);
									return l.default.createTimeRanges(r)
								}
							})
						}
						return s(t, e),
						o(t, [{
									key: "data_",
									value: function (e) {
										var t = e.data.segment;
										t.data = new Uint8Array(t.data, e.data.byteOffset, e.data.byteLength),
										t.initSegment = new Uint8Array(t.initSegment.data, t.initSegment.byteOffset, t.initSegment.byteLength),
										(0, c.default)(this, this.mediaSource_, t),
										this.pendingBuffers_.push(t)
									}
								}, {
									key: "done_",
									value: function (e) {
										this.processPendingSegments_()
									}
								}, {
									key: "createRealSourceBuffers_",
									value: function () {
										var e = this,
										t = ["audio", "video"];
										t.forEach(function (i) {
											if (e[i + "Codec_"] && !e[i + "Buffer_"]) {
												var n = null;
												e.mediaSource_[i + "Buffer_"] ? n = e.mediaSource_[i + "Buffer_"] : (n = e.mediaSource_.nativeMediaSource_.addSourceBuffer(i + '/mp4;codecs="' + e[i + "Codec_"] + '"'), e.mediaSource_[i + "Buffer_"] = n),
												e[i + "Buffer_"] = n,
												["update", "updatestart", "updateend"].forEach(function (r) {
													n.addEventListener(r, function () {
														if ("audio" !== i || !e.audioDisabled_) {
															var n = t.every(function (t) {
																return !("audio" !== t || !e.audioDisabled_) || (i === t || !e[t + "Buffer_"] || !e[t + "Buffer_"].updating)
															});
															return n ? e.trigger(r) : void 0
														}
													})
												})
											}
										})
									}
								}, {
									key: "appendBuffer",
									value: function (e) {
										if (this.bufferUpdating_ = !0, this.audioBuffer_ && this.audioBuffer_.buffered.length) {
											var t = this.audioBuffer_.buffered;
											this.transmuxer_.postMessage({
												action: "setAudioAppendStart",
												appendStart: t.end(t.length - 1)
											})
										}
										this.transmuxer_.postMessage({
											action: "push",
											data: e.buffer,
											byteOffset: e.byteOffset,
											byteLength: e.byteLength
										}, [e.buffer]),
										this.transmuxer_.postMessage({
											action: "flush"
										})
									}
								}, {
									key: "remove",
									value: function (e, t) {
										this.videoBuffer_ && this.videoBuffer_.remove(e, t),
										this.audioBuffer_ && this.audioBuffer_.remove(e, t),
										(0, p.default)(e, t, this.metadataTrack_),
										(0, p.default)(e, t, this.inbandTextTrack_)
									}
								}, {
									key: "processPendingSegments_",
									value: function () {
										var e = {
											video: {
												segments: [],
												bytes: 0
											},
											audio: {
												segments: [],
												bytes: 0
											},
											captions: [],
											metadata: []
										};
										e = this.pendingBuffers_.reduce(function (e, t) {
											var i = t.type,
											n = t.data,
											r = t.initSegment;
											return e[i].segments.push(n),
											e[i].bytes += n.byteLength,
											e[i].initSegment = r,
											t.captions && (e.captions = e.captions.concat(t.captions)),
											t.info && (e[i].info = t.info),
											t.metadata && (e.metadata = e.metadata.concat(t.metadata)),
											e
										}, e),
										this.videoBuffer_ || this.audioBuffer_ || (0 === e.video.bytes && (this.videoCodec_ = null), 0 === e.audio.bytes && (this.audioCodec_ = null), this.createRealSourceBuffers_()),
										e.audio.info && this.mediaSource_.trigger({
											type: "audioinfo",
											info: e.audio.info
										}),
										e.video.info && this.mediaSource_.trigger({
											type: "videoinfo",
											info: e.video.info
										}),
										this.appendAudioInitSegment_ && (!this.audioDisabled_ && this.audioBuffer_ && (e.audio.segments.unshift(e.audio.initSegment), e.audio.bytes += e.audio.initSegment.byteLength), this.appendAudioInitSegment_ = !1),
										this.videoBuffer_ && (e.video.segments.unshift(e.video.initSegment), e.video.bytes += e.video.initSegment.byteLength, this.concatAndAppendSegments_(e.video, this.videoBuffer_), (0, m.addTextTrackData)(this, e.captions, e.metadata)),
										!this.audioDisabled_ && this.audioBuffer_ && this.concatAndAppendSegments_(e.audio, this.audioBuffer_),
										this.pendingBuffers_.length = 0,
										this.bufferUpdating_ = !1
									}
								}, {
									key: "concatAndAppendSegments_",
									value: function (e, t) {
										var i = 0,
										n = void 0;
										if (e.bytes) {
											n = new Uint8Array(e.bytes),
											e.segments.forEach(function (e) {
												n.set(e, i),
												i += e.byteLength
											});
											try {
												t.appendBuffer(n)
											} catch (e) {
												this.mediaSource_.player_ && this.mediaSource_.player_.error({
													code: -3,
													type: "APPEND_BUFFER_ERR",
													message: e.message,
													originalError: e
												})
											}
										}
									}
								}, {
									key: "abort",
									value: function () {
										this.videoBuffer_ && this.videoBuffer_.abort(),
										this.audioBuffer_ && this.audioBuffer_.abort(),
										this.transmuxer_ && this.transmuxer_.postMessage({
											action: "reset"
										}),
										this.pendingBuffers_.length = 0,
										this.bufferUpdating_ = !1
									}
								}
							]),
						t
					}
					(l.default.EventTarget);
					i.default = T,
					t.exports = i.default
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./add-text-track-data": 62,
				"./codec-utils": 64,
				"./create-text-tracks-if-necessary": 65,
				"./remove-cues-from-track": 71,
				"./transmuxer-worker": 72,
				webworkify: 75
			}
		],
		75: [function (e, t, i) {
				var n = arguments[3],
				r = arguments[4],
				a = arguments[5],
				s = JSON.stringify;
				t.exports = function (e) {
					for (var t, i = Object.keys(a), o = 0, u = i.length; o < u; o++) {
						var d = i[o];
						if (a[d].exports === e) {
							t = d;
							break
						}
					}
					if (!t) {
						t = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
						for (var l = {}, o = 0, u = i.length; o < u; o++) {
							var d = i[o];
							l[d] = d
						}
						r[t] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), l]
					}
					var f = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
					c = {};
					c[t] = t,
					r[f] = [Function(["require"], "require(" + s(t) + ")(self)"), c];
					var h = "(" + n + ")({" + Object.keys(r).map(function (e) {
						return s(e) + ":[" + r[e][0] + "," + s(r[e][1]) + "]"
					}).join(",") + "},{},[" + s(f) + "])",
					p = window.URL || window.webkitURL || window.mozURL || window.msURL;
					return new Worker(p.createObjectURL(new Blob([h], {
								type: "text/javascript"
							})))
				}
			}, {}
		],
		76: [function (e, t, i) {
				(function (i) {
					function n(e) {
						return e && e.__esModule ? e : {
						default:
							e
						}
					}
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					function a(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + typeof t);
						e.prototype = Object.create(t && t.prototype, {
							constructor: {
								value: e,
								enumerable: !1,
								writable: !0,
								configurable: !0
							}
						}),
						t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					var s = function () {
						function e(e, t) {
							for (var i = 0; i < t.length; i++) {
								var n = t[i];
								n.enumerable = n.enumerable || !1,
								n.configurable = !0,
								"value" in n && (n.writable = !0),
								Object.defineProperty(e, n.key, n)
							}
						}
						return function (t, i, n) {
							return i && e(t.prototype, i),
							n && e(t, n),
							t
						}
					}
					(),
					o = function (e, t, i) {
						for (var n = !0; n; ) {
							var r = e,
							a = t,
							s = i;
							n = !1,
							null === r && (r = Function.prototype);
							var o = Object.getOwnPropertyDescriptor(r, a);
							if (void 0 !== o) {
								if ("value" in o)
									return o.value;
								var u = o.get;
								if (void 0 === u)
									return;
								return u.call(s)
							}
							var d = Object.getPrototypeOf(r);
							if (null === d)
								return;
							e = d,
							t = a,
							i = s,
							n = !0,
							o = d = void 0
						}
					},
					u = e("global/document"),
					d = n(u),
					l = e("./playlist-loader"),
					f = n(l),
					c = e("./playlist"),
					h = n(c),
					p = e("./xhr"),
					m = n(p),
					g = e("aes-decrypter"),
					y = e("./bin-utils"),
					v = n(y),
					b = e("videojs-contrib-media-sources"),
					_ = e("m3u8-parser"),
					T = n(_),
					S = "undefined" != typeof window ? window.videojs : "undefined" != typeof i ? i.videojs : null,
					w = n(S),
					k = e("./master-playlist-controller"),
					x = e("./config"),
					O = n(x),
					E = e("./rendition-mixin"),
					P = n(E),
					A = e("global/window"),
					L = n(A),
					I = e("./playback-watcher"),
					C = n(I),
					U = e("./reload-source-on-error"),
					M = n(U),
					D = {
						PlaylistLoader: f.default,
						Playlist: h.default,
						Decrypter: g.Decrypter,
						AsyncStream: g.AsyncStream,
						decrypt: g.decrypt,
						utils: v.default,
						xhr: (0, m.default)()
					};
					Object.defineProperty(D, "GOAL_BUFFER_LENGTH", {
						get: function () {
							return w.default.log.warn("using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure you know what you are doing"),
							O.default.GOAL_BUFFER_LENGTH
						},
						set: function (e) {
							return w.default.log.warn("using Hls.GOAL_BUFFER_LENGTH is UNSAFE be sure you know what you are doing"),
							"number" != typeof e || e <= 0 ? void w.default.log.warn("value passed to Hls.GOAL_BUFFER_LENGTH must be a number and greater than 0") : void(O.default.GOAL_BUFFER_LENGTH = e)
						}
					});
					var j = 1.2,
					R = function (e, t) {
						var i = void 0;
						return e ? (i = L.default.getComputedStyle(e), i ? i[t] : "") : ""
					},
					B = function (e, t) {
						for (var i = t.media(), n = -1, r = 0; r < e.length; r++)
							if (e[r].id === i.uri) {
								n = r;
								break
							}
						e.selectedIndex_ = n,
						e.trigger({
							selectedIndex: n,
							type: "change"
						})
					},
					N = function (e, t) {
						t.representations().forEach(function (t) {
							e.addQualityLevel(t)
						}),
						B(e, t.playlists)
					},
					q = function (e, t) {
						var i = e.slice();
						e.sort(function (e, n) {
							var r = t(e, n);
							return 0 === r ? i.indexOf(e) - i.indexOf(n) : r
						})
					};
					D.STANDARD_PLAYLIST_SELECTOR = function () {
						var e = this.playlists.master.playlists.slice(),
						t = [],
						i = void 0,
						n = void 0,
						r = void 0,
						a = void 0,
						s = void 0,
						o = void 0,
						u = void 0,
						d = [],
						l = [],
						f = [];
						return q(e, D.comparePlaylistBandwidth),
						e = e.filter(h.default.isEnabled),
						o = this.systemBandwidth,
						t = e.filter(function (e) {
							return e.attributes && e.attributes.BANDWIDTH && e.attributes.BANDWIDTH * j < o
						}),
						i = t.filter(function (e) {
							return e.attributes.BANDWIDTH === t[t.length - 1].attributes.BANDWIDTH
						})[0],
						q(t, D.comparePlaylistResolution),
						a = parseInt(R(this.tech_.el(), "width"), 10),
						s = parseInt(R(this.tech_.el(), "height"), 10),
						u = t.filter(function (e) {
							return e.attributes && e.attributes.RESOLUTION && e.attributes.RESOLUTION.width && e.attributes.RESOLUTION.height
						}),
						f = u.filter(function (e) {
							return e.attributes.RESOLUTION.width === a && e.attributes.RESOLUTION.height === s
						}),
						r = f.filter(function (e) {
							return e.attributes.BANDWIDTH === f[f.length - 1].attributes.BANDWIDTH
						})[0],
						r || (d = u.filter(function (e) {
								return e.attributes.RESOLUTION.width > a || e.attributes.RESOLUTION.height > s
							}), l = d.filter(function (e) {
								return e.attributes.RESOLUTION.width === d[0].attributes.RESOLUTION.width && e.attributes.RESOLUTION.height === d[0].attributes.RESOLUTION.height
							}), n = l.filter(function (e) {
								return e.attributes.BANDWIDTH === l[l.length - 1].attributes.BANDWIDTH
							})[0]),
						n || r || i || e[0]
					},
					D.canPlaySource = function () {
						return w.default.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")
					},
					D.supportsNativeHls = function () {
						var e = d.default.createElement("video");
						if (!w.default.getTech("Html5").isSupported())
							return !1;
						var t = ["application/vnd.apple.mpegurl", "audio/mpegurl", "audio/x-mpegurl", "application/x-mpegurl", "video/x-mpegurl", "video/mpegurl", "application/mpegurl"];
						return t.some(function (t) {
							return /maybe|probably/i.test(e.canPlayType(t))
						})
					}
					(),
					D.isSupported = function () {
						return w.default.log.warn("HLS is no longer a tech. Please remove it from your player's techOrder.")
					};
					var F = L.default.navigator && L.default.navigator.userAgent || "";
					D.supportsAudioInfoChange_ = function () {
						if (w.default.browser.IS_FIREFOX) {
							var e = /Firefox\/([\d.]+)/i.exec(F),
							t = parseInt(e[1], 10);
							return t >= 49
						}
						return !0
					};
					var G = w.default.getComponent("Component"),
					H = function (e) {
						function t(e, i, n) {
							var a = this;
							if (r(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, i), i.options_ && i.options_.playerId) {
								var s = (0, w.default)(i.options_.playerId);
								s.hasOwnProperty("hls") || Object.defineProperty(s, "hls", {
									get: function () {
										return w.default.log.warn("player.hls is deprecated. Use player.tech_.hls instead."),
										a
									}
								})
							}
							if (w.default.options.hls.overrideNative && (i.featuresNativeVideoTracks || i.featuresNativeAudioTracks))
								throw new Error("Overriding native HLS requires emulated tracks. See https://git.io/vMpjB");
							this.tech_ = i,
							this.source_ = e,
							this.stats = {},
							this.ignoreNextSeekingEvent_ = !1,
							this.options_ = w.default.mergeOptions(w.default.options.hls || {}, n.hls),
							this.setOptions_(),
							this.on(d.default, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"], function (e) {
								var t = d.default.fullscreenElement || d.default.webkitFullscreenElement || d.default.mozFullScreenElement || d.default.msFullscreenElement;
								t && t.contains(a.tech_.el()) && a.masterPlaylistController_.fastQualityChange_()
							}),
							this.on(this.tech_, "seeking", function () {
								return this.ignoreNextSeekingEvent_ ? void(this.ignoreNextSeekingEvent_ = !1) : void this.setCurrentTime(this.tech_.currentTime())
							}),
							this.on(this.tech_, "error", function () {
								this.masterPlaylistController_ && this.masterPlaylistController_.pauseLoading()
							}),
							this.audioTrackChange_ = function () {
								a.masterPlaylistController_.setupAudio()
							},
							this.textTrackChange_ = function () {
								a.masterPlaylistController_.setupSubtitles()
							},
							this.on(this.tech_, "play", this.play)
						}
						return a(t, e),
						s(t, [{
									key: "setOptions_",
									value: function () {
										var e = this;
										this.options_.withCredentials = this.options_.withCredentials || !1,
										"number" != typeof this.options_.bandwidth && (this.options_.bandwidth = 4194304),
										["withCredentials", "bandwidth"].forEach(function (t) {
											"undefined" != typeof e.source_[t] && (e.options_[t] = e.source_[t])
										}),
										this.bandwidth = this.options_.bandwidth
									}
								}, {
									key: "src",
									value: function (e) {
										var t = this;
										e && (this.setOptions_(), this.options_.url = this.source_.src, this.options_.tech = this.tech_, this.options_.externHls = D, this.masterPlaylistController_ = new k.MasterPlaylistController(this.options_), this.playbackWatcher_ = new C.default(w.default.mergeOptions(this.options_, {
														seekable: function () {
															return t.seekable()
														}
													})), this.masterPlaylistController_.selectPlaylist = this.selectPlaylist ? this.selectPlaylist.bind(this) : D.STANDARD_PLAYLIST_SELECTOR.bind(this), this.playlists = this.masterPlaylistController_.masterPlaylistLoader_, this.mediaSource = this.masterPlaylistController_.mediaSource, Object.defineProperties(this, {
												selectPlaylist: {
													get: function () {
														return this.masterPlaylistController_.selectPlaylist
													},
													set: function (e) {
														this.masterPlaylistController_.selectPlaylist = e.bind(this)
													}
												},
												throughput: {
													get: function () {
														return this.masterPlaylistController_.mainSegmentLoader_.throughput.rate
													},
													set: function (e) {
														this.masterPlaylistController_.mainSegmentLoader_.throughput.rate = e,
														this.masterPlaylistController_.mainSegmentLoader_.throughput.count = 1
													}
												},
												bandwidth: {
													get: function () {
														return this.masterPlaylistController_.mainSegmentLoader_.bandwidth
													},
													set: function (e) {
														this.masterPlaylistController_.mainSegmentLoader_.bandwidth = e,
														this.masterPlaylistController_.mainSegmentLoader_.throughput = {
															rate: 0,
															count: 0
														}
													}
												},
												systemBandwidth: {
													get: function () {
														var e = 1 / (this.bandwidth || 1),
														t = void 0;
														t = this.throughput > 0 ? 1 / this.throughput : 0;
														var i = Math.floor(1 / (e + t));
														return i
													},
													set: function () {
														w.default.log.error('The "systemBandwidth" property is read-only')
													}
												}
											}), Object.defineProperties(this.stats, {
												bandwidth: {
													get: function () {
														return t.bandwidth || 0
													},
													enumerable: !0
												},
												mediaRequests: {
													get: function () {
														return t.masterPlaylistController_.mediaRequests_() || 0
													},
													enumerable: !0
												},
												mediaRequestsAborted: {
													get: function () {
														return t.masterPlaylistController_.mediaRequestsAborted_() || 0
													},
													enumerable: !0
												},
												mediaRequestsTimedout: {
													get: function () {
														return t.masterPlaylistController_.mediaRequestsTimedout_() || 0
													},
													enumerable: !0
												},
												mediaRequestsErrored: {
													get: function () {
														return t.masterPlaylistController_.mediaRequestsErrored_() || 0
													},
													enumerable: !0
												},
												mediaTransferDuration: {
													get: function () {
														return t.masterPlaylistController_.mediaTransferDuration_() || 0
													},
													enumerable: !0
												},
												mediaBytesTransferred: {
													get: function () {
														return t.masterPlaylistController_.mediaBytesTransferred_() || 0
													},
													enumerable: !0
												},
												mediaSecondsLoaded: {
													get: function () {
														return t.masterPlaylistController_.mediaSecondsLoaded_() || 0
													},
													enumerable: !0
												}
											}), this.tech_.one("canplay", this.masterPlaylistController_.setupFirstPlay.bind(this.masterPlaylistController_)), this.masterPlaylistController_.on("sourceopen", function () {
												t.tech_.audioTracks().addEventListener("change", t.audioTrackChange_),
												t.tech_.remoteTextTracks().addEventListener("change", t.textTrackChange_)
											}), this.masterPlaylistController_.on("selectedinitialmedia", function () {
												(0, P.default)(t)
											}), this.masterPlaylistController_.on("audioupdate", function () {
												t.tech_.clearTracks("audio"),
												t.masterPlaylistController_.activeAudioGroup().forEach(function (e) {
													t.tech_.audioTracks().addTrack(e)
												})
											}), this.on(this.masterPlaylistController_, "progress", function () {
												this.tech_.trigger("progress")
											}), this.on(this.masterPlaylistController_, "firstplay", function () {
												this.ignoreNextSeekingEvent_ = !0
											}), this.tech_.ready(function () {
												return t.setupQualityLevels_()
											}), this.tech_.el() && this.tech_.src(w.default.URL.createObjectURL(this.masterPlaylistController_.mediaSource)))
									}
								}, {
									key: "setupQualityLevels_",
									value: function () {
										var e = this,
										t = w.default.players[this.tech_.options_.playerId];
										t && t.qualityLevels && (this.qualityLevels_ = t.qualityLevels(), this.masterPlaylistController_.on("selectedinitialmedia", function () {
												N(e.qualityLevels_, e)
											}), this.playlists.on("mediachange", function () {
												B(e.qualityLevels_, e.playlists)
											}))
									}
								}, {
									key: "activeAudioGroup_",
									value: function () {
										return this.masterPlaylistController_.activeAudioGroup()
									}
								}, {
									key: "play",
									value: function () {
										this.masterPlaylistController_.play()
									}
								}, {
									key: "setCurrentTime",
									value: function (e) {
										this.masterPlaylistController_.setCurrentTime(e)
									}
								}, {
									key: "duration",
									value: function () {
										return this.masterPlaylistController_.duration()
									}
								}, {
									key: "seekable",
									value: function () {
										return this.masterPlaylistController_.seekable()
									}
								}, {
									key: "dispose",
									value: function () {
										this.playbackWatcher_ && this.playbackWatcher_.dispose(),
										this.masterPlaylistController_ && this.masterPlaylistController_.dispose(),
										this.qualityLevels_ && this.qualityLevels_.dispose(),
										this.tech_.audioTracks().removeEventListener("change", this.audioTrackChange_),
										this.tech_.remoteTextTracks().removeEventListener("change", this.textTrackChange_),
										o(Object.getPrototypeOf(t.prototype), "dispose", this).call(this)
									}
								}
							]),
						t
					}
					(G),
					V = function e(t) {
						return {
							canHandleSource: function (i) {
								return (!w.default.options.hls || !w.default.options.hls.mode || w.default.options.hls.mode === t) && e.canPlayType(i.type)
							},
							handleSource: function (e, i, n) {
								"flash" === t && i.setTimeout(function () {
									i.trigger("loadstart")
								}, 1);
								var r = w.default.mergeOptions(n, {
									hls: {
										mode: t
									}
								});
								return i.hls = new H(e, i, r),
								i.hls.xhr = (0, m.default)(),
								w.default.Hls.xhr.beforeRequest && (i.hls.xhr.beforeRequest = w.default.Hls.xhr.beforeRequest),
								i.hls.src(e.src),
								i.hls
							},
							canPlayType: function (t) {
								return e.canPlayType(t) ? "maybe" : ""
							}
						}
					};
					D.comparePlaylistBandwidth = function (e, t) {
						var i = void 0,
						n = void 0;
						return e.attributes && e.attributes.BANDWIDTH && (i = e.attributes.BANDWIDTH),
						i = i || L.default.Number.MAX_VALUE,
						t.attributes && t.attributes.BANDWIDTH && (n = t.attributes.BANDWIDTH),
						n = n || L.default.Number.MAX_VALUE,
						i - n
					},
					D.comparePlaylistResolution = function (e, t) {
						var i = void 0,
						n = void 0;
						return e.attributes && e.attributes.RESOLUTION && e.attributes.RESOLUTION.width && (i = e.attributes.RESOLUTION.width),
						i = i || L.default.Number.MAX_VALUE,
						t.attributes && t.attributes.RESOLUTION && t.attributes.RESOLUTION.width && (n = t.attributes.RESOLUTION.width),
						n = n || L.default.Number.MAX_VALUE,
						i === n && e.attributes.BANDWIDTH && t.attributes.BANDWIDTH ? e.attributes.BANDWIDTH - t.attributes.BANDWIDTH : i - n
					},
					V.canPlayType = function (e) {
						if (w.default.browser.IE_VERSION && w.default.browser.IE_VERSION <= 10)
							return !1;
						var t = /^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i;
						return !(!w.default.options.hls.overrideNative && D.supportsNativeHls) && t.test(e)
					},
					"undefined" != typeof w.default.MediaSource && "undefined" != typeof w.default.URL || (w.default.MediaSource = b.MediaSource, w.default.URL = b.URL);
					var z = w.default.getTech("Flash");
					b.MediaSource.supportsNativeMediaSources() && w.default.getTech("Html5").registerSourceHandler(V("html5"), 0),
					L.default.Uint8Array && z && z.registerSourceHandler(V("flash")),
					w.default.HlsHandler = H,
					w.default.HlsSourceHandler = V,
					w.default.Hls = D,
					w.default.use || w.default.registerComponent("Hls", D),
					w.default.m3u8 = T.default,
					w.default.options.hls = w.default.options.hls || {},
					w.default.registerPlugin ? w.default.registerPlugin("reloadSourceOnError", M.default) : w.default.plugin("reloadSourceOnError", M.default),
					t.exports = {
						Hls: D,
						HlsHandler: H,
						HlsSourceHandler: V
					}
				}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
			}, {
				"./bin-utils": 2,
				"./config": 3,
				"./master-playlist-controller": 5,
				"./playback-watcher": 7,
				"./playlist": 9,
				"./playlist-loader": 8,
				"./reload-source-on-error": 11,
				"./rendition-mixin": 12,
				"./xhr": 19,
				"aes-decrypter": 23,
				"global/document": 29,
				"global/window": 30,
				"m3u8-parser": 31,
				"videojs-contrib-media-sources": 73
			}
		]
	}, {}, [76])(76)
});
