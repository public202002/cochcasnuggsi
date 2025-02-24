const HTMLElement = (e => {
    function t() {}
    return t.prototype = window.HTMLElement.prototype, t
})();
class TokenList {
    constructor(e) {
        const t = e => /{(\w+|#)}/.test(e.textContent) && (e.text = e.textContent).match(/[^{]+(?=})/g).map(t => (this[t] || (this[t] = [])).push(e)),
            n = document.createNodeIterator(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, e => e.attributes && [].slice.call(e.attributes).map(t) || t(e), null);
        for (; n.nextNode(););
    }
    bind(e) {
        const t = t => n => n.textContent = n.textContent.split("{" + t + "}").join(e[t]);
        for (let n in this) "bind" != n && this[n].map(e => e.textContent = e.text);
        for (let n in this) "bind" != n && this[n].map(t(n))
    }
}(e => {
    function t(e) {
        let t = new XMLHttpRequest;
        t.link = e, t.onload = n, t.open("GET", e.href), t.responseType = "document", t.send()
    }

    function n() {
        let e = this.link,
            t = this.response,
            n = e.nextChild,
            l = e.content = t.querySelector("template");
        for (let s of document.querySelectorAll(e.id)) l && o.call(s, l);
        for (let o of t.querySelectorAll("style,link,script")) s(e, o, n)
    }

    function s(e, t, n) {
        let s = t.getAttribute("as"),
            o = document.createElement("script" == s ? s : t.localName);
        ["id", "rel", "href", "src", "textContent", "as", "defer", "crossOrigin"].map(e => t[e] && e in o && (o[e] = t[e])), "style" == s && (o.rel = "stylesheet"), "script" == s && (o.src = o.href), e.parentNode.insertBefore(o, n)
    }

    function o(e) {
        let t;
        e = document.importNode(e, !0), [].slice.call(e.attributes).map(e => !this.attributes[e.name] && this.setAttribute(e.name, e.value));
        for (let n of this.querySelectorAll("[slot]"))(t = (e.content || e).querySelector("slot[name=" + n.getAttribute("slot") + "]")) && t.parentNode.replaceChild(n, t);
        return this.innerHTML = e.innerHTML
    }
    new MutationObserver(e => {
        for (let n of e)
            for (let e of n.addedNodes) /^p/.test(e.rel) && /\-/.test(e.id) && t(e), /\-/.test(e.localName) && (link = document.querySelector("#" + e.localName)) && link.content && o.call(e, link.content) && customElements.upgrade(e)
    }).observe(document.documentElement, {
        childList: !0,
        subtree: !0
    }), [].slice.call(document.querySelectorAll('[rel^=pre][id~="-"]')).map(t)
})();
const Template = e => {
    let t = document.createRange();
    e = "string" == typeof e ? document.querySelector("template[name=" + e + "]") : e, t.selectNodeContents(e.content);
    let n = t.cloneContents(),
        s = (e, t) => {
            let s = n.cloneNode(!0);
            return "object" != typeof e && (e = {
                self: e
            }), e["#"] = t, new TokenList(s).bind(e), s
        };
    return t.setStartAfter(e), e.bind = (e => {
        t.deleteContents(), e && [].concat(e).map(s).reverse().map(e => t.insertNode(e))
    }), e
};

function ParentNode(e) {
    return class extends e {
        select() {
            return this.selectAll(...arguments)[0]
        }
        selectAll(e, ...t) {
            return e = [].concat(e), [].slice.call(this.querySelectorAll(t.reduce((t, n) => t + n + e.shift(), e.shift())))
        }
    }
}

function EventTarget(e) {
    return class extends e {
        on(e, t) {
            this.addEventListener(e, this.renderable(t))
        }
        renderable(e) {
            return t => !1 !== e.call(this, t) && t.defaultPrevented || this.render()
        }
        reflect(t) {
            /^on/.test(t) && t in e.prototype && this.on(t.substr(2), this[t])
        }
        register(e, t, n) {
            for (let s of [].slice.call(e.attributes)) /^on/.test(n = s.name) && (t = (/{\s*(\w+)/.exec(e[n]) || [])[1]) && (e[n] = this.renderable(this[t]))
        }
    }
}

function GlobalEventHandlers(e) {
    return class extends e {
        onconnect(e) {
            this.templates = this.selectAll("template[name]").map(Template), this.tokens = new TokenList(this), super.onconnect && super.onconnect(e)
        }
    }
}
window.customElements = window.customElements || {}, customElements.define = ((e, t) => {
    /\-/.test(e) && (customElements[e] = t) && [].slice.call(document.querySelectorAll(e)).map(customElements.upgrade)
}), customElements.upgrade = function(e) {
    Object.setPrototypeOf(e, customElements[e.localName].prototype), e.connectedCallback()
}, new MutationObserver(e => {
    for (let t of e)
        for (let e of t.addedNodes) /\-/.test(e.localName) && customElements[e.localName] && customElements.upgrade(e)
}).observe(document.documentElement, {
    childList: !0,
    subtree: !0
});
const Custom = e => (class extends(ParentNode(EventTarget(GlobalEventHandlers(e)))) {
        connectedCallback() {
            this.context = {}, super.initialize && super.initialize(), Object.getOwnPropertyNames(e.prototype).map(this.reflect, this), this.addEventListener("connect", this.onconnect), this.addEventListener("idle", super.onidle), this.dispatchEvent(new Event("connect")), this.render()
        }
        render() {
            for (let e of this.templates) e.bind(this[e.getAttribute("name")]);
            this.tokens.bind(this), this.register(this), this.selectAll("*").map(this.register, this), this.dispatchEvent(new Event("idle"))
        }
    }),
    Element = e => t => customElements.define(e + "", Custom(t));
