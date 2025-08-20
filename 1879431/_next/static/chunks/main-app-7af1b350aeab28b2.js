(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [358],
  {
    2970: () => {
      "use strict";
      let e = Symbol("postMessageResponseTimeout"),
        t = 0;
      class n {
        destroy() {
          this.clear(), this.removeListeners.forEach((e) => e());
        }
        isTimeout(t) {
          return t === e;
        }
        post(n, o, i) {
          t++;
          let { timeout: r, origin: s = "*" } = i || {};
          return (
            this.client.postMessage({ data: o, id: t, type: n }, s),
            new Promise((n) => {
              this.waitRes.set(t, (e) => {
                n(e);
              }),
                setTimeout(() => {
                  this.waitRes.delete(t), n(e);
                }, r || this.baseTimeout);
            })
          );
        }
        on(e, t, n) {
          let { once: o, origin: i = "*" } = n || {},
            r = async (n) => {
              let r,
                { id: l, type: a, data: d } = n.data;
              if (a === e) {
                if (
                  (console.log((r = await t(d))),
                  (l && i === n.origin) || "*" === i)
                ) {
                  var c;
                  null == (c = n.source) ||
                    c.postMessage({ fromType: e, id: l, data: r }, n.origin);
                }
                o && s();
              }
            };
          window.addEventListener("message", r);
          let s = () => {
            window.removeEventListener("message", r),
              this.removeListeners.delete(s);
          };
          return this.removeListeners.add(s), s;
        }
        emitResponse(e) {
          let { id: t, data: n } = e.data,
            o = this.waitRes.get(t);
          o && o(n);
        }
        constructor(e, t) {
          (this.waitRes = new Map()),
            (this.removeListeners = new Set()),
            (this.client = e),
            (this.baseTimeout = (null == t ? void 0 : t.timeout) || 1e3);
          let n = this.emitResponse.bind(this);
          (this.clear = () => {
            window.removeEventListener("message", n);
          }),
            window.addEventListener("message", n);
        }
      }
      let o = (e) => {
          let t = "/preview/741d55a2-fc47-4457-bbe5-3c8c71694df8/1879431";
          return t && e.startsWith(t) ? e.replaceAll(t, "") || "/" : e || "/";
        },
        i = (e) => new Promise((t) => setTimeout(t, e)),
        r = () => window.next.router,
        s = new n(window.parent),
        l = async (e, t) => {
          await s.post("routeWillChange", { next: o(e) }, t);
        },
        a = (e) => e.startsWith("http://") || e.startsWith("https://"),
        d = !1,
        c = new Proxy(WebSocket, {
          construct(e, t) {
            let [n, o] = t,
              i = new e(n, o),
              r = i.onclose,
              s = i.onopen;
            return (
              (i.onclose = function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                  t[n] = arguments[n];
                console.log("closed"), r && r.bind(this, ...t), (d = !0);
              }),
              (i.onopen = function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                  t[n] = arguments[n];
                s && s.bind(this, ...t), (d = !1);
              }),
              i
            );
          },
        });
      class u {
        _domContentLoadedListener() {
          let e = () => {
            console.log("DOMContentLoaded"),
              this._client.post("DOMContentLoaded"),
              document.removeEventListener("DOMContentLoaded", e);
          };
          "loading" === document.readyState
            ? document.addEventListener("DOMContentLoaded", e)
            : (console.log("DOMContentLoaded"),
              this._client.post("DOMContentLoaded"));
        }
        constructor() {
          (this._client = new n(window.parent)),
            this._domContentLoadedListener();
        }
      }
      let h = () => document.querySelector("nextjs-portal"),
        p = (e) => {
          if (!e) return null;
          let t = e.shadowRoot;
          return t || null;
        },
        w = (e) => (e ? e.querySelector("[data-nextjs-toast='true']") : null),
        m = (e) =>
          e ? e.querySelector('[data-nextjs-dialog-overlay="true"]') : null,
        y = (e) => !!e && null !== e.querySelector("[data-issues='true']"),
        f = (e) => {
          let t = e.querySelector('[data-nextjs-error-overlay-nav="true"]');
          return t ? t.querySelector("[data-nextjs-dialog-error-next]") : null;
        },
        b = (e) =>
          (function (e) {
            if (!e) return "";
            let t = "";
            return (
              !(function e(n) {
                n &&
                  (n.nodeType === Node.TEXT_NODE && (t += n.textContent),
                  n.childNodes.forEach((t) => {
                    e(t);
                  }));
              })(e),
              t
            );
          })(e.querySelector("[data-nextjs-dialog-content='true']")),
        g = async (e) => {
          let t = [],
            n = 0;
          for (; !(++n > 10); ) {
            let n = b(e);
            t.push(n);
            let o = f(e);
            if (!o) break;
            if ("false" === o.getAttribute("aria-disabled"))
              o.click(), await i(100);
            else break;
          }
          return t;
        },
        v = ((e, t) => {
          let n = null;
          return function () {
            for (var o = arguments.length, i = Array(o), r = 0; r < o; r++)
              i[r] = arguments[r];
            n && clearTimeout(n),
              (n = setTimeout(() => {
                e(...i);
              }, t));
          };
        })(async (e) => {
          let { errorDialog: t, postMessageClient: n, isCompileError: o } = e,
            i = await g(t);
          n.post("preview-error", { errorMessages: i, isCompileError: o });
        }, 300);
      (window.WebSocket = c),
        new n(window).on("checkWebSocket", () => d),
        (function () {
          window.location.origin;
          let e = new n(window.parent);
          function t() {
            var t, n;
            let i =
                null !=
                (n = null == (t = window.history.state) ? void 0 : t.index)
                  ? n
                  : 0,
              r = window.history.length > i + 1,
              s = window.location.pathname;
            e.post("updateNavigationState", {
              canGoForward: r,
              canGoBack: i > 0,
              currentRoute: o(s),
            });
          }
          function i() {
            let t = new MutationObserver((t) => {
                t.forEach((t) => {
                  ("childList" === t.type || "characterData" === t.type) &&
                    e.post("titleChanged", { title: document.title });
                });
              }),
              n = document.querySelector("title");
            return (
              e.post("titleChanged", { title: document.title }),
              n &&
                t.observe(n, { childList: !0, characterData: !0, subtree: !0 }),
              t
            );
          }
          e.on("routeAction", async (e) => {
            let t = r(),
              { action: n, route: o } = e;
            switch (n) {
              case "goForward":
                t.forward();
                break;
              case "goBack":
                t.back();
                break;
              case "refresh":
                t.refresh();
                break;
              case "goTo":
                o && t.push(o);
                break;
              default:
                console.warn("Unknown action:", n);
            }
          });
          let s = i();
          function l() {
            s.disconnect(),
              setTimeout(() => {
                s = i();
              }, 100);
          }
          let a = window.history.pushState,
            d = window.history.replaceState;
          (window.history.pushState = function (e, n, o) {
            a.apply(this, arguments), t(), l();
          }),
            (window.history.replaceState = function (e, n, o) {
              d.apply(this, arguments), t(), l();
            });
        })(),
        (function () {
          let e = (function () {
              let e = window.open;
              return (
                (window.open = function (t, n, o) {
                  if (t && "string" == typeof t && t.startsWith("#")) {
                    let e = document.querySelector(t);
                    return e && e.scrollIntoView({ behavior: "smooth" }), null;
                  }
                  return e(t, "_blank", o), null;
                }),
                () => {
                  window.open = e;
                }
              );
            })(),
            t = (function () {
              let e = async (e) => {
                let t = e.target.closest("a");
                if (!t || "A" !== t.tagName) return;
                let n = t.getAttribute("href");
                if (
                  !(!n || ["#", "javascript:void(0)", ""].includes(n)) &&
                  !n.startsWith("#")
                ) {
                  if ((e.preventDefault(), n.startsWith("/"))) {
                    let e = r();
                    await l(n, { timeout: 500 });
                    let t = o(n);
                    e.push(t);
                    return;
                  }
                  window.open(t.href, "_blank");
                }
              };
              return (
                window.addEventListener("click", e, !0),
                () => {
                  window.removeEventListener("click", e, !0);
                }
              );
            })(),
            n = (function () {
              let e = () => {
                let e = r(),
                  t = e.push;
                e.push = async function (e, n, o) {
                  return a(e)
                    ? (window.open(e, "_blank"), Promise.resolve(!1))
                    : (await l(e, { timeout: 500 }), t.call(this, e, n, o));
                };
                let n = e.replace;
                e.replace = async function (e, t, o) {
                  return a(e)
                    ? (window.open(e, "_blank"), Promise.resolve(!1))
                    : (await l(e, { timeout: 500 }), n.call(this, e, t, o));
                };
              };
              return (
                window.addEventListener("load", e),
                () => {
                  window.removeEventListener("load", e);
                }
              );
            })();
        })(),
        new u(),
        (function () {
          let e = new n(window.parent),
            t = null,
            o = null,
            i = null,
            r = !0,
            s = !1,
            l = new MutationObserver(() => {
              if (((o = p((t = h()))), t && o)) {
                let t = !1;
                (i = new MutationObserver(() => {
                  if (!o) return;
                  let n = w(o);
                  if (!n) return;
                  y(o)
                    ? ((n.style.visibility = "visible"),
                      r && ((r = !1), (s = null !== m(o))))
                    : (n.style.visibility = "hidden");
                  let i = m(o);
                  if (!i) {
                    (t = !1), e.post("preview-error-hidden");
                    return;
                  }
                  t ||
                    ((t = !0),
                    v({
                      errorDialog: i,
                      postMessageClient: e,
                      isCompileError: s,
                    }),
                    (s = !1));
                })).observe(o, { childList: !0, subtree: !0 }),
                  l.disconnect();
              }
            });
          l.observe(document.body, { childList: !0, subtree: !0 }),
            () => {
              l.disconnect(), null == i || i.disconnect();
            };
        })();
    },
    8455: (e, t, n) => {
      Promise.resolve().then(n.t.bind(n, 1959, 23)),
        Promise.resolve().then(n.t.bind(n, 7989, 23)),
        Promise.resolve().then(n.t.bind(n, 8785, 23)),
        Promise.resolve().then(n.t.bind(n, 3886, 23)),
        Promise.resolve().then(n.t.bind(n, 9766, 23)),
        Promise.resolve().then(n.t.bind(n, 5278, 23)),
        Promise.resolve().then(n.t.bind(n, 9390, 23)),
        Promise.resolve().then(n.t.bind(n, 8924, 23));
    },
    9393: () => {},
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [441, 493], () => (t(2970), t(1666), t(8455))), (_N_E = e.O());
  },
]);
