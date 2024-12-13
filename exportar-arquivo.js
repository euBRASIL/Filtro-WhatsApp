/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var i0 = {};
i0.version = "0.18.5";
var ts = 1252,
    Ac = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4],
    en = {
        0: 1252,
        1: 65001,
        2: 65001,
        77: 1e4,
        128: 932,
        129: 949,
        130: 1361,
        134: 936,
        136: 950,
        161: 1253,
        162: 1254,
        163: 1258,
        177: 1255,
        178: 1256,
        186: 1257,
        204: 1251,
        222: 874,
        238: 1250,
        255: 1252,
        69: 6969
    },
    rn = function(e) {
        Ac.indexOf(e) != -1 && (ts = en[0] = e)
    };

function yc() {
    rn(1252)
}
var zr = function(e) {
    rn(e)
};

function tn() {
    zr(1200), yc()
}

function $n(e) {
    for (var t = [], r = 0, a = e.length; r < a; ++r) t[r] = e.charCodeAt(r);
    return t
}

function Cc(e) {
    for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
    return t.join("")
}

function as(e) {
    for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
    return t.join("")
}
var va = function(e) {
        var t = e.charCodeAt(0),
            r = e.charCodeAt(1);
        return t == 255 && r == 254 ? Cc(e.slice(2)) : t == 254 && r == 255 ? as(e.slice(2)) : t == 65279 ? e.slice(1) : e
    },
    ja = function(t) {
        return String.fromCharCode(t)
    },
    Kn = function(t) {
        return String.fromCharCode(t)
    },
    mt, gt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function Aa(e) {
    for (var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0, c = 0, o = 0; o < e.length;) r = e.charCodeAt(o++), i = r >> 2, a = e.charCodeAt(o++), s = (r & 3) << 4 | a >> 4, n = e.charCodeAt(o++), f = (a & 15) << 2 | n >> 6, c = n & 63, isNaN(a) ? f = c = 64 : isNaN(n) && (c = 64), t += gt.charAt(i) + gt.charAt(s) + gt.charAt(f) + gt.charAt(c);
    return t
}

function Rr(e) {
    var t = "",
        r = 0,
        a = 0,
        n = 0,
        i = 0,
        s = 0,
        f = 0,
        c = 0;
    e = e.replace(/[^\w\+\/\=]/g, "");
    for (var o = 0; o < e.length;) i = gt.indexOf(e.charAt(o++)), s = gt.indexOf(e.charAt(o++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = gt.indexOf(e.charAt(o++)), a = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(a)), c = gt.indexOf(e.charAt(o++)), n = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(n));
    return t
}
var Te = function() {
        return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node
    }(),
    ht = function() {
        if (typeof Buffer < "u") {
            var e = !Buffer.from;
            if (!e) try {
                Buffer.from("foo", "utf8")
            } catch {
                e = !0
            }
            return e ? function(t, r) {
                return r ? new Buffer(t, r) : new Buffer(t)
            } : Buffer.from.bind(Buffer)
        }
        return function() {}
    }();

function wt(e) {
    return Te ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e)
}

function jn(e) {
    return Te ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e)
}
var Or = function(t) {
    return Te ? ht(t, "binary") : t.split("").map(function(r) {
        return r.charCodeAt(0) & 255
    })
};

function g0(e) {
    if (typeof ArrayBuffer > "u") return Or(e);
    for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), a = 0; a != e.length; ++a) r[a] = e.charCodeAt(a) & 255;
    return t
}

function St(e) {
    if (Array.isArray(e)) return e.map(function(a) {
        return String.fromCharCode(a)
    }).join("");
    for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
    return t.join("")
}

function Dc(e) {
    if (typeof Uint8Array > "u") throw new Error("Unsupported");
    return new Uint8Array(e)
}

function an(e) {
    if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
    if (e instanceof ArrayBuffer) return an(new Uint8Array(e));
    for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
    return t
}
var sr = Te ? function(e) {
    return Buffer.concat(e.map(function(t) {
        return Buffer.isBuffer(t) ? t : ht(t)
    }))
} : function(e) {
    if (typeof Uint8Array < "u") {
        var t = 0,
            r = 0;
        for (t = 0; t < e.length; ++t) r += e[t].length;
        var a = new Uint8Array(r),
            n = 0;
        for (t = 0, r = 0; t < e.length; r += n, ++t)
            if (n = e[t].length, e[t] instanceof Uint8Array) a.set(e[t], r);
            else {
                if (typeof e[t] == "string") throw "wtf";
                a.set(new Uint8Array(e[t]), r)
            } return a
    }
    return [].concat.apply([], e.map(function(i) {
        return Array.isArray(i) ? i : [].slice.call(i)
    }))
};

function Oc(e) {
    for (var t = [], r = 0, a = e.length + 250, n = wt(e.length + 255), i = 0; i < e.length; ++i) {
        var s = e.charCodeAt(i);
        if (s < 128) n[r++] = s;
        else if (s < 2048) n[r++] = 192 | s >> 6 & 31, n[r++] = 128 | s & 63;
        else if (s >= 55296 && s < 57344) {
            s = (s & 1023) + 64;
            var f = e.charCodeAt(++i) & 1023;
            n[r++] = 240 | s >> 8 & 7, n[r++] = 128 | s >> 2 & 63, n[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, n[r++] = 128 | f & 63
        } else n[r++] = 224 | s >> 12 & 15, n[r++] = 128 | s >> 6 & 63, n[r++] = 128 | s & 63;
        r > a && (t.push(n.slice(0, r)), r = 0, n = wt(65535), a = 65530)
    }
    return t.push(n.slice(0, r)), sr(t)
}
var Tr = /\u0000/g,
    pa = /[\u0001-\u0006]/g;

function qt(e) {
    for (var t = "", r = e.length - 1; r >= 0;) t += e.charAt(r--);
    return t
}

function $r(e, t) {
    var r = "" + e;
    return r.length >= t ? r : ze("0", t - r.length) + r
}

function nn(e, t) {
    var r = "" + e;
    return r.length >= t ? r : ze(" ", t - r.length) + r
}

function s0(e, t) {
    var r = "" + e;
    return r.length >= t ? r : r + ze(" ", t - r.length)
}

function Ic(e, t) {
    var r = "" + Math.round(e);
    return r.length >= t ? r : ze("0", t - r.length) + r
}

function Rc(e, t) {
    var r = "" + e;
    return r.length >= t ? r : ze("0", t - r.length) + r
}
var Yn = Math.pow(2, 32);

function Kt(e, t) {
    if (e > Yn || e < -Yn) return Ic(e, t);
    var r = Math.round(e);
    return Rc(r, t)
}

function f0(e, t) {
    return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108
}
var Jn = [
        ["Sun", "Sunday"],
        ["Mon", "Monday"],
        ["Tue", "Tuesday"],
        ["Wed", "Wednesday"],
        ["Thu", "Thursday"],
        ["Fri", "Friday"],
        ["Sat", "Saturday"]
    ],
    D0 = [
        ["J", "Jan", "January"],
        ["F", "Feb", "February"],
        ["M", "Mar", "March"],
        ["A", "Apr", "April"],
        ["M", "May", "May"],
        ["J", "Jun", "June"],
        ["J", "Jul", "July"],
        ["A", "Aug", "August"],
        ["S", "Sep", "September"],
        ["O", "Oct", "October"],
        ["N", "Nov", "November"],
        ["D", "Dec", "December"]
    ];

function Nc(e) {
    return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e
}
var ve = {
        0: "General",
        1: "0",
        2: "0.00",
        3: "#,##0",
        4: "#,##0.00",
        9: "0%",
        10: "0.00%",
        11: "0.00E+00",
        12: "# ?/?",
        13: "# ??/??",
        14: "m/d/yy",
        15: "d-mmm-yy",
        16: "d-mmm",
        17: "mmm-yy",
        18: "h:mm AM/PM",
        19: "h:mm:ss AM/PM",
        20: "h:mm",
        21: "h:mm:ss",
        22: "m/d/yy h:mm",
        37: "#,##0 ;(#,##0)",
        38: "#,##0 ;[Red](#,##0)",
        39: "#,##0.00;(#,##0.00)",
        40: "#,##0.00;[Red](#,##0.00)",
        45: "mm:ss",
        46: "[h]:mm:ss",
        47: "mmss.0",
        48: "##0.0E+0",
        49: "@",
        56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
    },
    Zn = {
        5: 37,
        6: 38,
        7: 39,
        8: 40,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 14,
        28: 14,
        29: 14,
        30: 14,
        31: 14,
        50: 14,
        51: 14,
        52: 14,
        53: 14,
        54: 14,
        55: 14,
        56: 14,
        57: 14,
        58: 14,
        59: 1,
        60: 2,
        61: 3,
        62: 4,
        67: 9,
        68: 10,
        69: 12,
        70: 13,
        71: 14,
        72: 14,
        73: 15,
        74: 16,
        75: 17,
        76: 20,
        77: 21,
        78: 22,
        79: 45,
        80: 46,
        81: 47,
        82: 0
    },
    bc = {
        5: '"$"#,##0_);\\("$"#,##0\\)',
        63: '"$"#,##0_);\\("$"#,##0\\)',
        6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
        42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
        43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
        44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
    };

function c0(e, t, r) {
    for (var a = e < 0 ? -1 : 1, n = e * a, i = 0, s = 1, f = 0, c = 1, o = 0, l = 0, h = Math.floor(n); o < t && (h = Math.floor(n), f = h * s + i, l = h * o + c, !(n - h < 5e-8));) n = 1 / (n - h), i = s, s = f, c = o, o = l;
    if (l > t && (o > t ? (l = c, f = i) : (l = o, f = s)), !r) return [0, a * f, l];
    var x = Math.floor(a * f / l);
    return [x, a * f - x * l, l]
}

function Ot(e, t, r) {
    if (e > 2958465 || e < 0) return null;
    var a = e | 0,
        n = Math.floor(86400 * (e - a)),
        i = 0,
        s = [],
        f = {
            D: a,
            T: n,
            u: 86400 * (e - a) - n,
            y: 0,
            m: 0,
            d: 0,
            H: 0,
            M: 0,
            S: 0,
            q: 0
        };
    if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (a += 1462), f.u > .9999 && (f.u = 0, ++n == 86400 && (f.T = n = 0, ++a, ++f.D)), a === 60) s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
    else if (a === 0) s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
    else {
        a > 60 && --a;
        var c = new Date(1900, 0, 1);
        c.setDate(c.getDate() + a - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), a < 60 && (i = (i + 6) % 7), r && (i = Wc(c, s))
    }
    return f.y = s[0], f.m = s[1], f.d = s[2], f.S = n % 60, n = Math.floor(n / 60), f.M = n % 60, n = Math.floor(n / 60), f.H = n, f.q = i, f
}
var ns = new Date(1899, 11, 31, 0, 0, 0),
    Pc = ns.getTime(),
    Lc = new Date(1900, 2, 1, 0, 0, 0);

function is(e, t) {
    var r = e.getTime();
    return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= Lc && (r += 24 * 60 * 60 * 1e3), (r - (Pc + (e.getTimezoneOffset() - ns.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
}

function sn(e) {
    return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1")
}

function Bc(e) {
    return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2")
}

function Mc(e) {
    var t = e < 0 ? 12 : 11,
        r = sn(e.toFixed(12));
    return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5)
}

function Uc(e) {
    var t = sn(e.toFixed(11));
    return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t
}

function ya(e) {
    var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
        r;
    return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Mc(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Uc(e), sn(Bc(r.toUpperCase()))
}

function Pt(e, t) {
    switch (typeof e) {
        case "string":
            return e;
        case "boolean":
            return e ? "TRUE" : "FALSE";
        case "number":
            return (e | 0) === e ? e.toString(10) : ya(e);
        case "undefined":
            return "";
        case "object":
            if (e == null) return "";
            if (e instanceof Date) return Vr(14, is(e, t && t.date1904), t)
    }
    throw new Error("unsupported value in General format: " + e)
}

function Wc(e, t) {
    t[0] -= 581;
    var r = e.getDay();
    return e < 60 && (r = (r + 6) % 7), r
}

function Hc(e, t, r, a) {
    var n = "",
        i = 0,
        s = 0,
        f = r.y,
        c, o = 0;
    switch (e) {
        case 98:
            f = r.y + 543;
        case 121:
            switch (t.length) {
                case 1:
                case 2:
                    c = f % 100, o = 2;
                    break;
                default:
                    c = f % 1e4, o = 4;
                    break
            }
            break;
        case 109:
            switch (t.length) {
                case 1:
                case 2:
                    c = r.m, o = t.length;
                    break;
                case 3:
                    return D0[r.m - 1][1];
                case 5:
                    return D0[r.m - 1][0];
                default:
                    return D0[r.m - 1][2]
            }
            break;
        case 100:
            switch (t.length) {
                case 1:
                case 2:
                    c = r.d, o = t.length;
                    break;
                case 3:
                    return Jn[r.q][0];
                default:
                    return Jn[r.q][1]
            }
            break;
        case 104:
            switch (t.length) {
                case 1:
                case 2:
                    c = 1 + (r.H + 11) % 12, o = t.length;
                    break;
                default:
                    throw "bad hour format: " + t
            }
            break;
        case 72:
            switch (t.length) {
                case 1:
                case 2:
                    c = r.H, o = t.length;
                    break;
                default:
                    throw "bad hour format: " + t
            }
            break;
        case 77:
            switch (t.length) {
                case 1:
                case 2:
                    c = r.M, o = t.length;
                    break;
                default:
                    throw "bad minute format: " + t
            }
            break;
        case 115:
            if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
            return r.u === 0 && (t == "s" || t == "ss") ? $r(r.S, t.length) : (a >= 2 ? s = a === 3 ? 1e3 : 100 : s = a === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (n = $r(i, 2 + a), t === "ss" ? n.substr(0, 2) : "." + n.substr(2, t.length - 1)));
        case 90:
            switch (t) {
                case "[h]":
                case "[hh]":
                    c = r.D * 24 + r.H;
                    break;
                case "[m]":
                case "[mm]":
                    c = (r.D * 24 + r.H) * 60 + r.M;
                    break;
                case "[s]":
                case "[ss]":
                    c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
                    break;
                default:
                    throw "bad abstime format: " + t
            }
            o = t.length === 3 ? 1 : 2;
            break;
        case 101:
            c = f, o = 1;
            break
    }
    var l = o > 0 ? $r(c, o) : "";
    return l
}

function _t(e) {
    var t = 3;
    if (e.length <= t) return e;
    for (var r = e.length % t, a = e.substr(0, r); r != e.length; r += t) a += (a.length > 0 ? "," : "") + e.substr(r, t);
    return a
}
var ss = /%/g;

function Vc(e, t, r) {
    var a = t.replace(ss, ""),
        n = t.length - a.length;
    return ft(e, a, r * Math.pow(10, 2 * n)) + ze("%", n)
}

function Gc(e, t, r) {
    for (var a = t.length - 1; t.charCodeAt(a - 1) === 44;) --a;
    return ft(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)))
}

function fs(e, t) {
    var r, a = e.indexOf("E") - e.indexOf(".") - 1;
    if (e.match(/^#+0.0E\+0$/)) {
        if (t == 0) return "0.0E+0";
        if (t < 0) return "-" + fs(e, -t);
        var n = e.indexOf(".");
        n === -1 && (n = e.indexOf("E"));
        var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
        if (i < 0 && (i += n), r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n), r.indexOf("e") === -1) {
            var s = Math.floor(Math.log(t) * Math.LOG10E);
            for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0.";) r = r.charAt(0) + r.substr(2, n) + "." + r.substr(2 + n), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
            r = r.replace(/\+-/, "-")
        }
        r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, o, l) {
            return c + o + l.substr(0, (n + i) % n) + "." + l.substr(i) + "E"
        })
    } else r = t.toExponential(a);
    return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E")
}
var cs = /# (\?+)( ?)\/( ?)(\d+)/;

function Xc(e, t, r) {
    var a = parseInt(e[4], 10),
        n = Math.round(t * a),
        i = Math.floor(n / a),
        s = n - i * a,
        f = a;
    return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? ze(" ", e[1].length + 1 + e[4].length) : nn(s, e[1].length) + e[2] + "/" + e[3] + $r(f, e[4].length))
}

function zc(e, t, r) {
    return r + (t === 0 ? "" : "" + t) + ze(" ", e[1].length + 2 + e[4].length)
}
var os = /^#*0*\.([0#]+)/,
    ls = /\).*[0#]/,
    hs = /\(###\) ###\\?-####/;

function kr(e) {
    for (var t = "", r, a = 0; a != e.length; ++a) switch (r = e.charCodeAt(a)) {
        case 35:
            break;
        case 63:
            t += " ";
            break;
        case 48:
            t += "0";
            break;
        default:
            t += String.fromCharCode(r)
    }
    return t
}

function qn(e, t) {
    var r = Math.pow(10, t);
    return "" + Math.round(e * r) / r
}

function Qn(e, t) {
    var r = e - Math.floor(e),
        a = Math.pow(10, t);
    return t < ("" + Math.round(r * a)).length ? 0 : Math.round(r * a)
}

function $c(e, t) {
    return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0
}

function Kc(e) {
    return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e)
}

function Lr(e, t, r) {
    if (e.charCodeAt(0) === 40 && !t.match(ls)) {
        var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
        return r >= 0 ? Lr("n", a, r) : "(" + Lr("n", a, -r) + ")"
    }
    if (t.charCodeAt(t.length - 1) === 44) return Gc(e, t, r);
    if (t.indexOf("%") !== -1) return Vc(e, t, r);
    if (t.indexOf("E") !== -1) return fs(t, r);
    if (t.charCodeAt(0) === 36) return "$" + Lr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
    var n, i, s, f, c = Math.abs(r),
        o = r < 0 ? "-" : "";
    if (t.match(/^00+$/)) return o + Kt(c, t.length);
    if (t.match(/^[#?]+$/)) return n = Kt(r, 0), n === "0" && (n = ""), n.length > t.length ? n : kr(t.substr(0, t.length - n.length)) + n;
    if (i = t.match(cs)) return Xc(i, c, o);
    if (t.match(/^#+0+$/)) return o + Kt(c, t.length - t.indexOf("0"));
    if (i = t.match(os)) return n = qn(r, i[1].length).replace(/^([^\.]+)$/, "$1." + kr(i[1])).replace(/\.$/, "." + kr(i[1])).replace(/\.(\d*)$/, function(v, u) {
        return "." + u + ze("0", kr(i[1]).length - u.length)
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
    if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/)) return o + qn(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
    if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + _t(Kt(c, 0));
    if (i = t.match(/^#,##0\.([#0]*0)$/)) return r < 0 ? "-" + Lr(e, t, -r) : _t("" + (Math.floor(r) + $c(r, i[1].length))) + "." + $r(Qn(r, i[1].length), i[1].length);
    if (i = t.match(/^#,#*,#0/)) return Lr(e, t.replace(/^#,#*,/, ""), r);
    if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return n = qt(Lr(e, t.replace(/[\\-]/g, ""), r)), s = 0, qt(qt(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
        return s < n.length ? n.charAt(s++) : v === "0" ? "0" : ""
    }));
    if (t.match(hs)) return n = Lr(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
    var l = "";
    if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return s = Math.min(i[4].length, 7), f = c0(c, Math.pow(10, s) - 1, !1), n = "" + o, l = ft("n", i[1], f[1]), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + i[2] + "/" + i[3], l = s0(f[2], s), l.length < i[4].length && (l = kr(i[4].substr(i[4].length - l.length)) + l), n += l, n;
    if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = c0(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? nn(f[1], s) + i[2] + "/" + i[3] + s0(f[2], s) : ze(" ", 2 * s + 1 + i[2].length + i[3].length));
    if (i = t.match(/^[#0?]+$/)) return n = Kt(r, 0), t.length <= n.length ? n : kr(t.substr(0, t.length - n.length)) + n;
    if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
        n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
        var h = t.indexOf(".") - s,
            x = t.length - n.length - h;
        return kr(t.substr(0, h) + n + t.substr(t.length - x))
    }
    if (i = t.match(/^00,000\.([#0]*0)$/)) return s = Qn(r, i[1].length), r < 0 ? "-" + Lr(e, t, -r) : _t(Kc(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
        return "00," + (v.length < 3 ? $r(0, 3 - v.length) : "") + v
    }) + "." + $r(s, i[1].length);
    switch (t) {
        case "###,##0.00":
            return Lr(e, "#,##0.00", r);
        case "###,###":
        case "##,###":
        case "#,###":
            var d = _t(Kt(c, 0));
            return d !== "0" ? o + d : "";
        case "###,###.00":
            return Lr(e, "###,##0.00", r).replace(/^0\./, ".");
        case "#,###.00":
            return Lr(e, "#,##0.00", r).replace(/^0\./, ".")
    }
    throw new Error("unsupported format |" + t + "|")
}

function jc(e, t, r) {
    for (var a = t.length - 1; t.charCodeAt(a - 1) === 44;) --a;
    return ft(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)))
}

function Yc(e, t, r) {
    var a = t.replace(ss, ""),
        n = t.length - a.length;
    return ft(e, a, r * Math.pow(10, 2 * n)) + ze("%", n)
}

function us(e, t) {
    var r, a = e.indexOf("E") - e.indexOf(".") - 1;
    if (e.match(/^#+0.0E\+0$/)) {
        if (t == 0) return "0.0E+0";
        if (t < 0) return "-" + us(e, -t);
        var n = e.indexOf(".");
        n === -1 && (n = e.indexOf("E"));
        var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
        if (i < 0 && (i += n), r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n), !r.match(/[Ee]/)) {
            var s = Math.floor(Math.log(t) * Math.LOG10E);
            r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-")
        }
        r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, o, l) {
            return c + o + l.substr(0, (n + i) % n) + "." + l.substr(i) + "E"
        })
    } else r = t.toExponential(a);
    return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E")
}

function qr(e, t, r) {
    if (e.charCodeAt(0) === 40 && !t.match(ls)) {
        var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
        return r >= 0 ? qr("n", a, r) : "(" + qr("n", a, -r) + ")"
    }
    if (t.charCodeAt(t.length - 1) === 44) return jc(e, t, r);
    if (t.indexOf("%") !== -1) return Yc(e, t, r);
    if (t.indexOf("E") !== -1) return us(t, r);
    if (t.charCodeAt(0) === 36) return "$" + qr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
    var n, i, s, f, c = Math.abs(r),
        o = r < 0 ? "-" : "";
    if (t.match(/^00+$/)) return o + $r(c, t.length);
    if (t.match(/^[#?]+$/)) return n = "" + r, r === 0 && (n = ""), n.length > t.length ? n : kr(t.substr(0, t.length - n.length)) + n;
    if (i = t.match(cs)) return zc(i, c, o);
    if (t.match(/^#+0+$/)) return o + $r(c, t.length - t.indexOf("0"));
    if (i = t.match(os)) return n = ("" + r).replace(/^([^\.]+)$/, "$1." + kr(i[1])).replace(/\.$/, "." + kr(i[1])), n = n.replace(/\.(\d*)$/, function(v, u) {
        return "." + u + ze("0", kr(i[1]).length - u.length)
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
    if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/)) return o + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
    if (i = t.match(/^#{1,3},##0(\.?)$/)) return o + _t("" + c);
    if (i = t.match(/^#,##0\.([#0]*0)$/)) return r < 0 ? "-" + qr(e, t, -r) : _t("" + r) + "." + ze("0", i[1].length);
    if (i = t.match(/^#,#*,#0/)) return qr(e, t.replace(/^#,#*,/, ""), r);
    if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/)) return n = qt(qr(e, t.replace(/[\\-]/g, ""), r)), s = 0, qt(qt(t.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
        return s < n.length ? n.charAt(s++) : v === "0" ? "0" : ""
    }));
    if (t.match(hs)) return n = qr(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
    var l = "";
    if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) return s = Math.min(i[4].length, 7), f = c0(c, Math.pow(10, s) - 1, !1), n = "" + o, l = ft("n", i[1], f[1]), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + i[2] + "/" + i[3], l = s0(f[2], s), l.length < i[4].length && (l = kr(i[4].substr(i[4].length - l.length)) + l), n += l, n;
    if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = c0(c, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? nn(f[1], s) + i[2] + "/" + i[3] + s0(f[2], s) : ze(" ", 2 * s + 1 + i[2].length + i[3].length));
    if (i = t.match(/^[#0?]+$/)) return n = "" + r, t.length <= n.length ? n : kr(t.substr(0, t.length - n.length)) + n;
    if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
        n = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = n.indexOf(".");
        var h = t.indexOf(".") - s,
            x = t.length - n.length - h;
        return kr(t.substr(0, h) + n + t.substr(t.length - x))
    }
    if (i = t.match(/^00,000\.([#0]*0)$/)) return r < 0 ? "-" + qr(e, t, -r) : _t("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
        return "00," + (v.length < 3 ? $r(0, 3 - v.length) : "") + v
    }) + "." + $r(0, i[1].length);
    switch (t) {
        case "###,###":
        case "##,###":
        case "#,###":
            var d = _t("" + c);
            return d !== "0" ? o + d : "";
        default:
            if (t.match(/\.[0#?]*$/)) return qr(e, t.slice(0, t.lastIndexOf(".")), r) + kr(t.slice(t.lastIndexOf(".")))
    }
    throw new Error("unsupported format |" + t + "|")
}

function ft(e, t, r) {
    return (r | 0) === r ? qr(e, t, r) : Lr(e, t, r)
}

function Jc(e) {
    for (var t = [], r = !1, a = 0, n = 0; a < e.length; ++a) switch (e.charCodeAt(a)) {
        case 34:
            r = !r;
            break;
        case 95:
        case 42:
        case 92:
            ++a;
            break;
        case 59:
            t[t.length] = e.substr(n, a - n), n = a + 1
    }
    if (t[t.length] = e.substr(n), r === !0) throw new Error("Format |" + e + "| unterminated string ");
    return t
}
var xs = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;

function ia(e) {
    for (var t = 0, r = "", a = ""; t < e.length;) switch (r = e.charAt(t)) {
        case "G":
            f0(e, t) && (t += 6), t++;
            break;
        case '"':
            for (; e.charCodeAt(++t) !== 34 && t < e.length;);
            ++t;
            break;
        case "\\":
            t += 2;
            break;
        case "_":
            t += 2;
            break;
        case "@":
            ++t;
            break;
        case "B":
        case "b":
            if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
        case "M":
        case "D":
        case "Y":
        case "H":
        case "S":
        case "E":
        case "m":
        case "d":
        case "y":
        case "h":
        case "s":
        case "e":
        case "g":
            return !0;
        case "A":
        case "a":
        case "上":
            if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
            ++t;
            break;
        case "[":
            for (a = r; e.charAt(t++) !== "]" && t < e.length;) a += e.charAt(t);
            if (a.match(xs)) return !0;
            break;
        case ".":
        case "0":
        case "#":
            for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1););
            break;
        case "?":
            for (; e.charAt(++t) === r;);
            break;
        case "*":
            ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
            break;
        case "(":
        case ")":
            ++t;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1;);
            break;
        case " ":
            ++t;
            break;
        default:
            ++t;
            break
    }
    return !1
}

function Zc(e, t, r, a) {
    for (var n = [], i = "", s = 0, f = "", c = "t", o, l, h, x = "H"; s < e.length;) switch (f = e.charAt(s)) {
        case "G":
            if (!f0(e, s)) throw new Error("unrecognized character " + f + " in " + e);
            n[n.length] = {
                t: "G",
                v: "General"
            }, s += 7;
            break;
        case '"':
            for (i = "";
                (h = e.charCodeAt(++s)) !== 34 && s < e.length;) i += String.fromCharCode(h);
            n[n.length] = {
                t: "t",
                v: i
            }, ++s;
            break;
        case "\\":
            var d = e.charAt(++s),
                v = d === "(" || d === ")" ? d : "t";
            n[n.length] = {
                t: v,
                v: d
            }, ++s;
            break;
        case "_":
            n[n.length] = {
                t: "t",
                v: " "
            }, s += 2;
            break;
        case "@":
            n[n.length] = {
                t: "T",
                v: t
            }, ++s;
            break;
        case "B":
        case "b":
            if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
                if (o == null && (o = Ot(t, r, e.charAt(s + 1) === "2"), o == null)) return "";
                n[n.length] = {
                    t: "X",
                    v: e.substr(s, 2)
                }, c = f, s += 2;
                break
            }
        case "M":
        case "D":
        case "Y":
        case "H":
        case "S":
        case "E":
            f = f.toLowerCase();
        case "m":
        case "d":
        case "y":
        case "h":
        case "s":
        case "e":
        case "g":
            if (t < 0 || o == null && (o = Ot(t, r), o == null)) return "";
            for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f;) i += f;
            f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = x), n[n.length] = {
                t: f,
                v: i
            }, c = f;
            break;
        case "A":
        case "a":
        case "上":
            var u = {
                t: f,
                v: f
            };
            if (o == null && (o = Ot(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (u.v = o.H >= 12 ? "P" : "A"), u.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (u.v = o.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (u.v = o.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, x = "h") : (u.t = "t", ++s), o == null && u.t === "T") return "";
            n[n.length] = u, c = f;
            break;
        case "[":
            for (i = f; e.charAt(s++) !== "]" && s < e.length;) i += e.charAt(s);
            if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
            if (i.match(xs)) {
                if (o == null && (o = Ot(t, r), o == null)) return "";
                n[n.length] = {
                    t: "Z",
                    v: i.toLowerCase()
                }, c = i.charAt(1)
            } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ia(e) || (n[n.length] = {
                t: "t",
                v: i
            }));
            break;
        case ".":
            if (o != null) {
                for (i = f; ++s < e.length && (f = e.charAt(s)) === "0";) i += f;
                n[n.length] = {
                    t: "s",
                    v: i
                };
                break
            }
        case "0":
        case "#":
            for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1;) i += f;
            n[n.length] = {
                t: "n",
                v: i
            };
            break;
        case "?":
            for (i = f; e.charAt(++s) === f;) i += f;
            n[n.length] = {
                t: f,
                v: i
            }, c = f;
            break;
        case "*":
            ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
            break;
        case "(":
        case ")":
            n[n.length] = {
                t: a === 1 ? "t" : f,
                v: f
            }, ++s;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1;) i += e.charAt(s);
            n[n.length] = {
                t: "D",
                v: i
            };
            break;
        case " ":
            n[n.length] = {
                t: f,
                v: f
            }, ++s;
            break;
        case "$":
            n[n.length] = {
                t: "t",
                v: "$"
            }, ++s;
            break;
        default:
            if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
            n[n.length] = {
                t: "t",
                v: f
            }, ++s;
            break
    }
    var p = 0,
        k = 0,
        A;
    for (s = n.length - 1, c = "t"; s >= 0; --s) switch (n[s].t) {
        case "h":
        case "H":
            n[s].t = x, c = "h", p < 1 && (p = 1);
            break;
        case "s":
            (A = n[s].v.match(/\.0+$/)) && (k = Math.max(k, A[0].length - 1)), p < 3 && (p = 3);
        case "d":
        case "y":
        case "M":
        case "e":
            c = n[s].t;
            break;
        case "m":
            c === "s" && (n[s].t = "M", p < 2 && (p = 2));
            break;
        case "X":
            break;
        case "Z":
            p < 1 && n[s].v.match(/[Hh]/) && (p = 1), p < 2 && n[s].v.match(/[Mm]/) && (p = 2), p < 3 && n[s].v.match(/[Ss]/) && (p = 3)
    }
    switch (p) {
        case 0:
            break;
        case 1:
            o.u >= .5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
            break;
        case 2:
            o.u >= .5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
            break
    }
    var g = "",
        O;
    for (s = 0; s < n.length; ++s) switch (n[s].t) {
        case "t":
        case "T":
        case " ":
        case "D":
            break;
        case "X":
            n[s].v = "", n[s].t = ";";
            break;
        case "d":
        case "m":
        case "y":
        case "h":
        case "H":
        case "M":
        case "s":
        case "e":
        case "b":
        case "Z":
            n[s].v = Hc(n[s].t.charCodeAt(0), n[s].v, o, k), n[s].t = "t";
            break;
        case "n":
        case "?":
            for (O = s + 1; n[O] != null && ((f = n[O].t) === "?" || f === "D" || (f === " " || f === "t") && n[O + 1] != null && (n[O + 1].t === "?" || n[O + 1].t === "t" && n[O + 1].v === "/") || n[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (n[O].v === "/" || n[O].v === " " && n[O + 1] != null && n[O + 1].t == "?"));) n[s].v += n[O].v, n[O] = {
                v: "",
                t: ";"
            }, ++O;
            g += n[s].v, s = O - 1;
            break;
        case "G":
            n[s].t = "t", n[s].v = Pt(t, r);
            break
    }
    var b = "",
        N, F;
    if (g.length > 0) {
        g.charCodeAt(0) == 40 ? (N = t < 0 && g.charCodeAt(0) === 45 ? -t : t, F = ft("n", g, N)) : (N = t < 0 && a > 1 ? -t : t, F = ft("n", g, N), N < 0 && n[0] && n[0].t == "t" && (F = F.substr(1), n[0].v = "-" + n[0].v)), O = F.length - 1;
        var B = n.length;
        for (s = 0; s < n.length; ++s)
            if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
                B = s;
                break
            } var I = n.length;
        if (B === n.length && F.indexOf("E") === -1) {
            for (s = n.length - 1; s >= 0; --s) n[s] == null || "n?".indexOf(n[s].t) === -1 || (O >= n[s].v.length - 1 ? (O -= n[s].v.length, n[s].v = F.substr(O + 1, n[s].v.length)) : O < 0 ? n[s].v = "" : (n[s].v = F.substr(0, O + 1), O = -1), n[s].t = "t", I = s);
            O >= 0 && I < n.length && (n[I].v = F.substr(0, O + 1) + n[I].v)
        } else if (B !== n.length && F.indexOf("E") === -1) {
            for (O = F.indexOf(".") - 1, s = B; s >= 0; --s)
                if (!(n[s] == null || "n?".indexOf(n[s].t) === -1)) {
                    for (l = n[s].v.indexOf(".") > -1 && s === B ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1, b = n[s].v.substr(l + 1); l >= 0; --l) O >= 0 && (n[s].v.charAt(l) === "0" || n[s].v.charAt(l) === "#") && (b = F.charAt(O--) + b);
                    n[s].v = b, n[s].t = "t", I = s
                } for (O >= 0 && I < n.length && (n[I].v = F.substr(0, O + 1) + n[I].v), O = F.indexOf(".") + 1, s = B; s < n.length; ++s)
                if (!(n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== B)) {
                    for (l = n[s].v.indexOf(".") > -1 && s === B ? n[s].v.indexOf(".") + 1 : 0, b = n[s].v.substr(0, l); l < n[s].v.length; ++l) O < F.length && (b += F.charAt(O++));
                    n[s].v = b, n[s].t = "t", I = s
                }
        }
    }
    for (s = 0; s < n.length; ++s) n[s] != null && "n?".indexOf(n[s].t) > -1 && (N = a > 1 && t < 0 && s > 0 && n[s - 1].v === "-" ? -t : t, n[s].v = ft(n[s].t, n[s].v, N), n[s].t = "t");
    var z = "";
    for (s = 0; s !== n.length; ++s) n[s] != null && (z += n[s].v);
    return z
}
var ei = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;

function ri(e, t) {
    if (t == null) return !1;
    var r = parseFloat(t[2]);
    switch (t[1]) {
        case "=":
            if (e == r) return !0;
            break;
        case ">":
            if (e > r) return !0;
            break;
        case "<":
            if (e < r) return !0;
            break;
        case "<>":
            if (e != r) return !0;
            break;
        case ">=":
            if (e >= r) return !0;
            break;
        case "<=":
            if (e <= r) return !0;
            break
    }
    return !1
}

function qc(e, t) {
    var r = Jc(e),
        a = r.length,
        n = r[a - 1].indexOf("@");
    if (a < 4 && n > -1 && --a, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
    if (typeof t != "number") return [4, r.length === 4 || n > -1 ? r[r.length - 1] : "@"];
    switch (r.length) {
        case 1:
            r = n > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
            break;
        case 2:
            r = n > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
            break;
        case 3:
            r = n > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
            break
    }
    var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
    if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [a, i];
    if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
        var s = r[0].match(ei),
            f = r[1].match(ei);
        return ri(t, s) ? [a, r[0]] : ri(t, f) ? [a, r[1]] : [a, r[s != null && f != null ? 2 : 1]]
    }
    return [a, i]
}

function Vr(e, t, r) {
    r == null && (r = {});
    var a = "";
    switch (typeof e) {
        case "string":
            e == "m/d/yy" && r.dateNF ? a = r.dateNF : a = e;
            break;
        case "number":
            e == 14 && r.dateNF ? a = r.dateNF : a = (r.table != null ? r.table : ve)[e], a == null && (a = r.table && r.table[Zn[e]] || ve[Zn[e]]), a == null && (a = bc[e] || "General");
            break
    }
    if (f0(a, 0)) return Pt(t, r);
    t instanceof Date && (t = is(t, r.date1904));
    var n = qc(a, t);
    if (f0(n[1])) return Pt(t, r);
    if (t === !0) t = "TRUE";
    else if (t === !1) t = "FALSE";
    else if (t === "" || t == null) return "";
    return Zc(n[1], t, r, n[0])
}

function ct(e, t) {
    if (typeof t != "number") {
        t = +t || -1;
        for (var r = 0; r < 392; ++r) {
            if (ve[r] == null) {
                t < 0 && (t = r);
                continue
            }
            if (ve[r] == e) {
                t = r;
                break
            }
        }
        t < 0 && (t = 391)
    }
    return ve[t] = e, t
}

function _0(e) {
    for (var t = 0; t != 392; ++t) e[t] !== void 0 && ct(e[t], t)
}

function sa() {
    ve = Nc()
}
var Qc = {
        5: '"$"#,##0_);\\("$"#,##0\\)',
        6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        23: "General",
        24: "General",
        25: "General",
        26: "General",
        27: "m/d/yy",
        28: "m/d/yy",
        29: "m/d/yy",
        30: "m/d/yy",
        31: "m/d/yy",
        32: "h:mm:ss",
        33: "h:mm:ss",
        34: "h:mm:ss",
        35: "h:mm:ss",
        36: "m/d/yy",
        41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
        42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
        43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
        44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
        50: "m/d/yy",
        51: "m/d/yy",
        52: "m/d/yy",
        53: "m/d/yy",
        54: "m/d/yy",
        55: "m/d/yy",
        56: "m/d/yy",
        57: "m/d/yy",
        58: "m/d/yy",
        59: "0",
        60: "0.00",
        61: "#,##0",
        62: "#,##0.00",
        63: '"$"#,##0_);\\("$"#,##0\\)',
        64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
        65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
        66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        67: "0%",
        68: "0.00%",
        69: "# ?/?",
        70: "# ??/??",
        71: "m/d/yy",
        72: "m/d/yy",
        73: "d-mmm-yy",
        74: "d-mmm",
        75: "mmm-yy",
        76: "h:mm",
        77: "h:mm:ss",
        78: "m/d/yy h:mm",
        79: "mm:ss",
        80: "[h]:mm:ss",
        81: "mmss.0"
    },
    ds = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;

function eo(e) {
    var t = typeof e == "number" ? ve[e] : e;
    return t = t.replace(ds, "(\\d+)"), new RegExp("^" + t + "$")
}

function ro(e, t, r) {
    var a = -1,
        n = -1,
        i = -1,
        s = -1,
        f = -1,
        c = -1;
    (t.match(ds) || []).forEach(function(h, x) {
        var d = parseInt(r[x + 1], 10);
        switch (h.toLowerCase().charAt(0)) {
            case "y":
                a = d;
                break;
            case "d":
                i = d;
                break;
            case "h":
                s = d;
                break;
            case "s":
                c = d;
                break;
            case "m":
                s >= 0 ? f = d : n = d;
                break
        }
    }), c >= 0 && f == -1 && n >= 0 && (f = n, n = -1);
    var o = ("" + (a >= 0 ? a : new Date().getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
    o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
    var l = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
    return s == -1 && f == -1 && c == -1 ? o : a == -1 && n == -1 && i == -1 ? l : o + "T" + l
}
var to = function() {
        var e = {};
        e.version = "1.2.0";

        function t() {
            for (var F = 0, B = new Array(256), I = 0; I != 256; ++I) F = I, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, B[I] = F;
            return typeof Int32Array < "u" ? new Int32Array(B) : B
        }
        var r = t();

        function a(F) {
            var B = 0,
                I = 0,
                z = 0,
                G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
            for (z = 0; z != 256; ++z) G[z] = F[z];
            for (z = 0; z != 256; ++z)
                for (I = F[z], B = 256 + z; B < 4096; B += 256) I = G[B] = I >>> 8 ^ F[I & 255];
            var L = [];
            for (z = 1; z != 16; ++z) L[z - 1] = typeof Int32Array < "u" ? G.subarray(z * 256, z * 256 + 256) : G.slice(z * 256, z * 256 + 256);
            return L
        }
        var n = a(r),
            i = n[0],
            s = n[1],
            f = n[2],
            c = n[3],
            o = n[4],
            l = n[5],
            h = n[6],
            x = n[7],
            d = n[8],
            v = n[9],
            u = n[10],
            p = n[11],
            k = n[12],
            A = n[13],
            g = n[14];

        function O(F, B) {
            for (var I = B ^ -1, z = 0, G = F.length; z < G;) I = I >>> 8 ^ r[(I ^ F.charCodeAt(z++)) & 255];
            return ~I
        }

        function b(F, B) {
            for (var I = B ^ -1, z = F.length - 15, G = 0; G < z;) I = g[F[G++] ^ I & 255] ^ A[F[G++] ^ I >> 8 & 255] ^ k[F[G++] ^ I >> 16 & 255] ^ p[F[G++] ^ I >>> 24] ^ u[F[G++]] ^ v[F[G++]] ^ d[F[G++]] ^ x[F[G++]] ^ h[F[G++]] ^ l[F[G++]] ^ o[F[G++]] ^ c[F[G++]] ^ f[F[G++]] ^ s[F[G++]] ^ i[F[G++]] ^ r[F[G++]];
            for (z += 15; G < z;) I = I >>> 8 ^ r[(I ^ F[G++]) & 255];
            return ~I
        }

        function N(F, B) {
            for (var I = B ^ -1, z = 0, G = F.length, L = 0, J = 0; z < G;) L = F.charCodeAt(z++), L < 128 ? I = I >>> 8 ^ r[(I ^ L) & 255] : L < 2048 ? (I = I >>> 8 ^ r[(I ^ (192 | L >> 6 & 31)) & 255], I = I >>> 8 ^ r[(I ^ (128 | L & 63)) & 255]) : L >= 55296 && L < 57344 ? (L = (L & 1023) + 64, J = F.charCodeAt(z++) & 1023, I = I >>> 8 ^ r[(I ^ (240 | L >> 8 & 7)) & 255], I = I >>> 8 ^ r[(I ^ (128 | L >> 2 & 63)) & 255], I = I >>> 8 ^ r[(I ^ (128 | J >> 6 & 15 | (L & 3) << 4)) & 255], I = I >>> 8 ^ r[(I ^ (128 | J & 63)) & 255]) : (I = I >>> 8 ^ r[(I ^ (224 | L >> 12 & 15)) & 255], I = I >>> 8 ^ r[(I ^ (128 | L >> 6 & 63)) & 255], I = I >>> 8 ^ r[(I ^ (128 | L & 63)) & 255]);
            return ~I
        }
        return e.table = r, e.bstr = O, e.buf = b, e.str = N, e
    }(),
    xe = function() {
        var t = {};
        t.version = "1.2.1";

        function r(m, E) {
            for (var _ = m.split("/"), w = E.split("/"), T = 0, S = 0, U = Math.min(_.length, w.length); T < U; ++T) {
                if (S = _[T].length - w[T].length) return S;
                if (_[T] != w[T]) return _[T] < w[T] ? -1 : 1
            }
            return _.length - w.length
        }

        function a(m) {
            if (m.charAt(m.length - 1) == "/") return m.slice(0, -1).indexOf("/") === -1 ? m : a(m.slice(0, -1));
            var E = m.lastIndexOf("/");
            return E === -1 ? m : m.slice(0, E + 1)
        }

        function n(m) {
            if (m.charAt(m.length - 1) == "/") return n(m.slice(0, -1));
            var E = m.lastIndexOf("/");
            return E === -1 ? m : m.slice(E + 1)
        }

        function i(m, E) {
            typeof E == "string" && (E = new Date(E));
            var _ = E.getHours();
            _ = _ << 6 | E.getMinutes(), _ = _ << 5 | E.getSeconds() >>> 1, m.write_shift(2, _);
            var w = E.getFullYear() - 1980;
            w = w << 4 | E.getMonth() + 1, w = w << 5 | E.getDate(), m.write_shift(2, w)
        }

        function s(m) {
            var E = m.read_shift(2) & 65535,
                _ = m.read_shift(2) & 65535,
                w = new Date,
                T = _ & 31;
            _ >>>= 5;
            var S = _ & 15;
            _ >>>= 4, w.setMilliseconds(0), w.setFullYear(_ + 1980), w.setMonth(S - 1), w.setDate(T);
            var U = E & 31;
            E >>>= 5;
            var K = E & 63;
            return E >>>= 6, w.setHours(E), w.setMinutes(K), w.setSeconds(U << 1), w
        }

        function f(m) {
            or(m, 0);
            for (var E = {}, _ = 0; m.l <= m.length - 4;) {
                var w = m.read_shift(2),
                    T = m.read_shift(2),
                    S = m.l + T,
                    U = {};
                switch (w) {
                    case 21589:
                        _ = m.read_shift(1), _ & 1 && (U.mtime = m.read_shift(4)), T > 5 && (_ & 2 && (U.atime = m.read_shift(4)), _ & 4 && (U.ctime = m.read_shift(4))), U.mtime && (U.mt = new Date(U.mtime * 1e3));
                        break
                }
                m.l = S, E[w] = U
            }
            return E
        }
        var c;

        function o() {
            return c || (c = {})
        }

        function l(m, E) {
            if (m[0] == 80 && m[1] == 75) return zn(m, E);
            if ((m[0] | 32) == 109 && (m[1] | 32) == 105) return wc(m, E);
            if (m.length < 512) throw new Error("CFB file size " + m.length + " < 512");
            var _ = 3,
                w = 512,
                T = 0,
                S = 0,
                U = 0,
                K = 0,
                M = 0,
                W = [],
                H = m.slice(0, 512);
            or(H, 0);
            var q = h(H);
            switch (_ = q[0], _) {
                case 3:
                    w = 512;
                    break;
                case 4:
                    w = 4096;
                    break;
                case 0:
                    if (q[1] == 0) return zn(m, E);
                default:
                    throw new Error("Major Version: Expected 3 or 4 saw " + _)
            }
            w !== 512 && (H = m.slice(0, w), or(H, 28));
            var se = m.slice(0, w);
            x(H, _);
            var he = H.read_shift(4, "i");
            if (_ === 3 && he !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + he);
            H.l += 4, U = H.read_shift(4, "i"), H.l += 4, H.chk("00100000", "Mini Stream Cutoff Size: "), K = H.read_shift(4, "i"), T = H.read_shift(4, "i"), M = H.read_shift(4, "i"), S = H.read_shift(4, "i");
            for (var ee = -1, oe = 0; oe < 109 && (ee = H.read_shift(4, "i"), !(ee < 0)); ++oe) W[oe] = ee;
            var _e = d(m, w);
            p(M, S, _e, w, W);
            var He = A(_e, U, W, w);
            He[U].name = "!Directory", T > 0 && K !== J && (He[K].name = "!MiniFAT"), He[W[0]].name = "!FAT", He.fat_addrs = W, He.ssz = w;
            var Ve = {},
                hr = [],
                ha = [],
                ua = [];
            g(U, He, _e, hr, T, Ve, ha, K), v(ha, ua, hr), hr.shift();
            var xa = {
                FileIndex: ha,
                FullPaths: ua
            };
            return E && E.raw && (xa.raw = {
                header: se,
                sectors: _e
            }), xa
        }

        function h(m) {
            if (m[m.l] == 80 && m[m.l + 1] == 75) return [0, 0];
            m.chk(le, "Header Signature: "), m.l += 16;
            var E = m.read_shift(2, "u");
            return [m.read_shift(2, "u"), E]
        }

        function x(m, E) {
            var _ = 9;
            switch (m.l += 2, _ = m.read_shift(2)) {
                case 9:
                    if (E != 3) throw new Error("Sector Shift: Expected 9 saw " + _);
                    break;
                case 12:
                    if (E != 4) throw new Error("Sector Shift: Expected 12 saw " + _);
                    break;
                default:
                    throw new Error("Sector Shift: Expected 9 or 12 saw " + _)
            }
            m.chk("0600", "Mini Sector Shift: "), m.chk("000000000000", "Reserved: ")
        }

        function d(m, E) {
            for (var _ = Math.ceil(m.length / E) - 1, w = [], T = 1; T < _; ++T) w[T - 1] = m.slice(T * E, (T + 1) * E);
            return w[_ - 1] = m.slice(_ * E), w
        }

        function v(m, E, _) {
            for (var w = 0, T = 0, S = 0, U = 0, K = 0, M = _.length, W = [], H = []; w < M; ++w) W[w] = H[w] = w, E[w] = _[w];
            for (; K < H.length; ++K) w = H[K], T = m[w].L, S = m[w].R, U = m[w].C, W[w] === w && (T !== -1 && W[T] !== T && (W[w] = W[T]), S !== -1 && W[S] !== S && (W[w] = W[S])), U !== -1 && (W[U] = w), T !== -1 && w != W[w] && (W[T] = W[w], H.lastIndexOf(T) < K && H.push(T)), S !== -1 && w != W[w] && (W[S] = W[w], H.lastIndexOf(S) < K && H.push(S));
            for (w = 1; w < M; ++w) W[w] === w && (S !== -1 && W[S] !== S ? W[w] = W[S] : T !== -1 && W[T] !== T && (W[w] = W[T]));
            for (w = 1; w < M; ++w)
                if (m[w].type !== 0) {
                    if (K = w, K != W[K])
                        do K = W[K], E[w] = E[K] + "/" + E[w]; while (K !== 0 && W[K] !== -1 && K != W[K]);
                    W[w] = -1
                } for (E[0] += "/", w = 1; w < M; ++w) m[w].type !== 2 && (E[w] += "/")
        }

        function u(m, E, _) {
            for (var w = m.start, T = m.size, S = [], U = w; _ && T > 0 && U >= 0;) S.push(E.slice(U * L, U * L + L)), T -= L, U = Dt(_, U * 4);
            return S.length === 0 ? X(0) : sr(S).slice(0, m.size)
        }

        function p(m, E, _, w, T) {
            var S = J;
            if (m === J) {
                if (E !== 0) throw new Error("DIFAT chain shorter than expected")
            } else if (m !== -1) {
                var U = _[m],
                    K = (w >>> 2) - 1;
                if (!U) return;
                for (var M = 0; M < K && (S = Dt(U, M * 4)) !== J; ++M) T.push(S);
                p(Dt(U, w - 4), E - 1, _, w, T)
            }
        }

        function k(m, E, _, w, T) {
            var S = [],
                U = [];
            T || (T = []);
            var K = w - 1,
                M = 0,
                W = 0;
            for (M = E; M >= 0;) {
                T[M] = !0, S[S.length] = M, U.push(m[M]);
                var H = _[Math.floor(M * 4 / w)];
                if (W = M * 4 & K, w < 4 + W) throw new Error("FAT boundary crossed: " + M + " 4 " + w);
                if (!m[H]) break;
                M = Dt(m[H], W)
            }
            return {
                nodes: S,
                data: xi([U])
            }
        }

        function A(m, E, _, w) {
            var T = m.length,
                S = [],
                U = [],
                K = [],
                M = [],
                W = w - 1,
                H = 0,
                q = 0,
                se = 0,
                he = 0;
            for (H = 0; H < T; ++H)
                if (K = [], se = H + E, se >= T && (se -= T), !U[se]) {
                    M = [];
                    var ee = [];
                    for (q = se; q >= 0;) {
                        ee[q] = !0, U[q] = !0, K[K.length] = q, M.push(m[q]);
                        var oe = _[Math.floor(q * 4 / w)];
                        if (he = q * 4 & W, w < 4 + he) throw new Error("FAT boundary crossed: " + q + " 4 " + w);
                        if (!m[oe] || (q = Dt(m[oe], he), ee[q])) break
                    }
                    S[se] = {
                        nodes: K,
                        data: xi([M])
                    }
                } return S
        }

        function g(m, E, _, w, T, S, U, K) {
            for (var M = 0, W = w.length ? 2 : 0, H = E[m].data, q = 0, se = 0, he; q < H.length; q += 128) {
                var ee = H.slice(q, q + 128);
                or(ee, 64), se = ee.read_shift(2), he = xn(ee, 0, se - W), w.push(he);
                var oe = {
                        name: he,
                        type: ee.read_shift(1),
                        color: ee.read_shift(1),
                        L: ee.read_shift(4, "i"),
                        R: ee.read_shift(4, "i"),
                        C: ee.read_shift(4, "i"),
                        clsid: ee.read_shift(16),
                        state: ee.read_shift(4, "i"),
                        start: 0,
                        size: 0
                    },
                    _e = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
                _e !== 0 && (oe.ct = O(ee, ee.l - 8));
                var He = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
                He !== 0 && (oe.mt = O(ee, ee.l - 8)), oe.start = ee.read_shift(4, "i"), oe.size = ee.read_shift(4, "i"), oe.size < 0 && oe.start < 0 && (oe.size = oe.type = 0, oe.start = J, oe.name = ""), oe.type === 5 ? (M = oe.start, T > 0 && M !== J && (E[M].name = "!StreamData")) : oe.size >= 4096 ? (oe.storage = "fat", E[oe.start] === void 0 && (E[oe.start] = k(_, oe.start, E.fat_addrs, E.ssz)), E[oe.start].name = oe.name, oe.content = E[oe.start].data.slice(0, oe.size)) : (oe.storage = "minifat", oe.size < 0 ? oe.size = 0 : M !== J && oe.start !== J && E[M] && (oe.content = u(oe, E[M].data, (E[K] || {}).data))), oe.content && or(oe.content, 0), S[he] = oe, U.push(oe)
            }
        }

        function O(m, E) {
            return new Date((Dr(m, E + 4) / 1e7 * Math.pow(2, 32) + Dr(m, E) / 1e7 - 11644473600) * 1e3)
        }

        function b(m, E) {
            return o(), l(c.readFileSync(m), E)
        }

        function N(m, E) {
            var _ = E && E.type;
            switch (_ || Te && Buffer.isBuffer(m) && (_ = "buffer"), _ || "base64") {
                case "file":
                    return b(m, E);
                case "base64":
                    return l(Or(Rr(m)), E);
                case "binary":
                    return l(Or(m), E)
            }
            return l(m, E)
        }

        function F(m, E) {
            var _ = E || {},
                w = _.root || "Root Entry";
            if (m.FullPaths || (m.FullPaths = []), m.FileIndex || (m.FileIndex = []), m.FullPaths.length !== m.FileIndex.length) throw new Error("inconsistent CFB structure");
            m.FullPaths.length === 0 && (m.FullPaths[0] = w + "/", m.FileIndex[0] = {
                name: w,
                type: 5
            }), _.CLSID && (m.FileIndex[0].clsid = _.CLSID), B(m)
        }

        function B(m) {
            var E = "Sh33tJ5";
            if (!xe.find(m, "/" + E)) {
                var _ = X(4);
                _[0] = 55, _[1] = _[3] = 50, _[2] = 54, m.FileIndex.push({
                    name: E,
                    type: 2,
                    content: _,
                    size: 4,
                    L: 69,
                    R: 69,
                    C: 69
                }), m.FullPaths.push(m.FullPaths[0] + E), I(m)
            }
        }

        function I(m, E) {
            F(m);
            for (var _ = !1, w = !1, T = m.FullPaths.length - 1; T >= 0; --T) {
                var S = m.FileIndex[T];
                switch (S.type) {
                    case 0:
                        w ? _ = !0 : (m.FileIndex.pop(), m.FullPaths.pop());
                        break;
                    case 1:
                    case 2:
                    case 5:
                        w = !0, isNaN(S.R * S.L * S.C) && (_ = !0), S.R > -1 && S.L > -1 && S.R == S.L && (_ = !0);
                        break;
                    default:
                        _ = !0;
                        break
                }
            }
            if (!(!_ && !E)) {
                var U = new Date(1987, 1, 19),
                    K = 0,
                    M = Object.create ? Object.create(null) : {},
                    W = [];
                for (T = 0; T < m.FullPaths.length; ++T) M[m.FullPaths[T]] = !0, m.FileIndex[T].type !== 0 && W.push([m.FullPaths[T], m.FileIndex[T]]);
                for (T = 0; T < W.length; ++T) {
                    var H = a(W[T][0]);
                    w = M[H], w || (W.push([H, {
                        name: n(H).replace("/", ""),
                        type: 1,
                        clsid: ue,
                        ct: U,
                        mt: U,
                        content: null
                    }]), M[H] = !0)
                }
                for (W.sort(function(he, ee) {
                        return r(he[0], ee[0])
                    }), m.FullPaths = [], m.FileIndex = [], T = 0; T < W.length; ++T) m.FullPaths[T] = W[T][0], m.FileIndex[T] = W[T][1];
                for (T = 0; T < W.length; ++T) {
                    var q = m.FileIndex[T],
                        se = m.FullPaths[T];
                    if (q.name = n(se).replace("/", ""), q.L = q.R = q.C = -(q.color = 1), q.size = q.content ? q.content.length : 0, q.start = 0, q.clsid = q.clsid || ue, T === 0) q.C = W.length > 1 ? 1 : -1, q.size = 0, q.type = 5;
                    else if (se.slice(-1) == "/") {
                        for (K = T + 1; K < W.length && a(m.FullPaths[K]) != se; ++K);
                        for (q.C = K >= W.length ? -1 : K, K = T + 1; K < W.length && a(m.FullPaths[K]) != a(se); ++K);
                        q.R = K >= W.length ? -1 : K, q.type = 1
                    } else a(m.FullPaths[T + 1] || "") == a(se) && (q.R = T + 1), q.type = 2
                }
            }
        }

        function z(m, E) {
            var _ = E || {};
            if (_.fileType == "mad") return kc(m, _);
            switch (I(m), _.fileType) {
                case "zip":
                    return dc(m, _)
            }
            var w = function(he) {
                    for (var ee = 0, oe = 0, _e = 0; _e < he.FileIndex.length; ++_e) {
                        var He = he.FileIndex[_e];
                        if (He.content) {
                            var Ve = He.content.length;
                            Ve > 0 && (Ve < 4096 ? ee += Ve + 63 >> 6 : oe += Ve + 511 >> 9)
                        }
                    }
                    for (var hr = he.FullPaths.length + 3 >> 2, ha = ee + 7 >> 3, ua = ee + 127 >> 7, xa = ha + oe + hr + ua, Ct = xa + 127 >> 7, C0 = Ct <= 109 ? 0 : Math.ceil((Ct - 109) / 127); xa + Ct + C0 + 127 >> 7 > Ct;) C0 = ++Ct <= 109 ? 0 : Math.ceil((Ct - 109) / 127);
                    var it = [1, C0, Ct, ua, hr, oe, ee, 0];
                    return he.FileIndex[0].size = ee << 6, it[7] = (he.FileIndex[0].start = it[0] + it[1] + it[2] + it[3] + it[4] + it[5]) + (it[6] + 7 >> 3), it
                }(m),
                T = X(w[7] << 9),
                S = 0,
                U = 0;
            {
                for (S = 0; S < 8; ++S) T.write_shift(1, ie[S]);
                for (S = 0; S < 8; ++S) T.write_shift(2, 0);
                for (T.write_shift(2, 62), T.write_shift(2, 3), T.write_shift(2, 65534), T.write_shift(2, 9), T.write_shift(2, 6), S = 0; S < 3; ++S) T.write_shift(2, 0);
                for (T.write_shift(4, 0), T.write_shift(4, w[2]), T.write_shift(4, w[0] + w[1] + w[2] + w[3] - 1), T.write_shift(4, 0), T.write_shift(4, 4096), T.write_shift(4, w[3] ? w[0] + w[1] + w[2] - 1 : J), T.write_shift(4, w[3]), T.write_shift(-4, w[1] ? w[0] - 1 : J), T.write_shift(4, w[1]), S = 0; S < 109; ++S) T.write_shift(-4, S < w[2] ? w[1] + S : -1)
            }
            if (w[1])
                for (U = 0; U < w[1]; ++U) {
                    for (; S < 236 + U * 127; ++S) T.write_shift(-4, S < w[2] ? w[1] + S : -1);
                    T.write_shift(-4, U === w[1] - 1 ? J : U + 1)
                }
            var K = function(he) {
                for (U += he; S < U - 1; ++S) T.write_shift(-4, S + 1);
                he && (++S, T.write_shift(-4, J))
            };
            for (U = S = 0, U += w[1]; S < U; ++S) T.write_shift(-4, ce.DIFSECT);
            for (U += w[2]; S < U; ++S) T.write_shift(-4, ce.FATSECT);
            K(w[3]), K(w[4]);
            for (var M = 0, W = 0, H = m.FileIndex[0]; M < m.FileIndex.length; ++M) H = m.FileIndex[M], H.content && (W = H.content.length, !(W < 4096) && (H.start = U, K(W + 511 >> 9)));
            for (K(w[6] + 7 >> 3); T.l & 511;) T.write_shift(-4, ce.ENDOFCHAIN);
            for (U = S = 0, M = 0; M < m.FileIndex.length; ++M) H = m.FileIndex[M], H.content && (W = H.content.length, !(!W || W >= 4096) && (H.start = U, K(W + 63 >> 6)));
            for (; T.l & 511;) T.write_shift(-4, ce.ENDOFCHAIN);
            for (S = 0; S < w[4] << 2; ++S) {
                var q = m.FullPaths[S];
                if (!q || q.length === 0) {
                    for (M = 0; M < 17; ++M) T.write_shift(4, 0);
                    for (M = 0; M < 3; ++M) T.write_shift(4, -1);
                    for (M = 0; M < 12; ++M) T.write_shift(4, 0);
                    continue
                }
                H = m.FileIndex[S], S === 0 && (H.start = H.size ? H.start - 1 : J);
                var se = S === 0 && _.root || H.name;
                if (W = 2 * (se.length + 1), T.write_shift(64, se, "utf16le"), T.write_shift(2, W), T.write_shift(1, H.type), T.write_shift(1, H.color), T.write_shift(-4, H.L), T.write_shift(-4, H.R), T.write_shift(-4, H.C), H.clsid) T.write_shift(16, H.clsid, "hex");
                else
                    for (M = 0; M < 4; ++M) T.write_shift(4, 0);
                T.write_shift(4, H.state || 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, H.start), T.write_shift(4, H.size), T.write_shift(4, 0)
            }
            for (S = 1; S < m.FileIndex.length; ++S)
                if (H = m.FileIndex[S], H.size >= 4096)
                    if (T.l = H.start + 1 << 9, Te && Buffer.isBuffer(H.content)) H.content.copy(T, T.l, 0, H.size), T.l += H.size + 511 & -512;
                    else {
                        for (M = 0; M < H.size; ++M) T.write_shift(1, H.content[M]);
                        for (; M & 511; ++M) T.write_shift(1, 0)
                    } for (S = 1; S < m.FileIndex.length; ++S)
                if (H = m.FileIndex[S], H.size > 0 && H.size < 4096)
                    if (Te && Buffer.isBuffer(H.content)) H.content.copy(T, T.l, 0, H.size), T.l += H.size + 63 & -64;
                    else {
                        for (M = 0; M < H.size; ++M) T.write_shift(1, H.content[M]);
                        for (; M & 63; ++M) T.write_shift(1, 0)
                    } if (Te) T.l = T.length;
            else
                for (; T.l < T.length;) T.write_shift(1, 0);
            return T
        }

        function G(m, E) {
            var _ = m.FullPaths.map(function(M) {
                    return M.toUpperCase()
                }),
                w = _.map(function(M) {
                    var W = M.split("/");
                    return W[W.length - (M.slice(-1) == "/" ? 2 : 1)]
                }),
                T = !1;
            E.charCodeAt(0) === 47 ? (T = !0, E = _[0].slice(0, -1) + E) : T = E.indexOf("/") !== -1;
            var S = E.toUpperCase(),
                U = T === !0 ? _.indexOf(S) : w.indexOf(S);
            if (U !== -1) return m.FileIndex[U];
            var K = !S.match(pa);
            for (S = S.replace(Tr, ""), K && (S = S.replace(pa, "!")), U = 0; U < _.length; ++U)
                if ((K ? _[U].replace(pa, "!") : _[U]).replace(Tr, "") == S || (K ? w[U].replace(pa, "!") : w[U]).replace(Tr, "") == S) return m.FileIndex[U];
            return null
        }
        var L = 64,
            J = -2,
            le = "d0cf11e0a1b11ae1",
            ie = [208, 207, 17, 224, 161, 177, 26, 225],
            ue = "00000000000000000000000000000000",
            ce = {
                MAXREGSECT: -6,
                DIFSECT: -4,
                FATSECT: -3,
                ENDOFCHAIN: J,
                FREESECT: -1,
                HEADER_SIGNATURE: le,
                HEADER_MINOR_VERSION: "3e00",
                MAXREGSID: -6,
                NOSTREAM: -1,
                HEADER_CLSID: ue,
                EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
            };

        function be(m, E, _) {
            o();
            var w = z(m, _);
            c.writeFileSync(E, w)
        }

        function V(m) {
            for (var E = new Array(m.length), _ = 0; _ < m.length; ++_) E[_] = String.fromCharCode(m[_]);
            return E.join("")
        }

        function de(m, E) {
            var _ = z(m, E);
            switch (E && E.type || "buffer") {
                case "file":
                    return o(), c.writeFileSync(E.filename, _), _;
                case "binary":
                    return typeof _ == "string" ? _ : V(_);
                case "base64":
                    return Aa(typeof _ == "string" ? _ : V(_));
                case "buffer":
                    if (Te) return Buffer.isBuffer(_) ? _ : ht(_);
                case "array":
                    return typeof _ == "string" ? Or(_) : _
            }
            return _
        }
        var ge;

        function C(m) {
            try {
                var E = m.InflateRaw,
                    _ = new E;
                if (_._processChunk(new Uint8Array([3, 0]), _._finishFlushFlag), _.bytesRead) ge = m;
                else throw new Error("zlib does not expose bytesRead")
            } catch (w) {
                console.error("cannot use native zlib: " + (w.message || w))
            }
        }

        function P(m, E) {
            if (!ge) return Gn(m, E);
            var _ = ge.InflateRaw,
                w = new _,
                T = w._processChunk(m.slice(m.l), w._finishFlushFlag);
            return m.l += w.bytesRead, T
        }

        function D(m) {
            return ge ? ge.deflateRawSync(m) : Se(m)
        }
        var R = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            j = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258],
            re = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];

        function te(m) {
            var E = (m << 1 | m << 11) & 139536 | (m << 5 | m << 15) & 558144;
            return (E >> 16 | E >> 8 | E) & 255
        }
        for (var Q = typeof Uint8Array < "u", Z = Q ? new Uint8Array(256) : [], Ee = 0; Ee < 256; ++Ee) Z[Ee] = te(Ee);

        function y(m, E) {
            var _ = Z[m & 255];
            return E <= 8 ? _ >>> 8 - E : (_ = _ << 8 | Z[m >> 8 & 255], E <= 16 ? _ >>> 16 - E : (_ = _ << 8 | Z[m >> 16 & 255], _ >>> 24 - E))
        }

        function Be(m, E) {
            var _ = E & 7,
                w = E >>> 3;
            return (m[w] | (_ <= 6 ? 0 : m[w + 1] << 8)) >>> _ & 3
        }

        function ye(m, E) {
            var _ = E & 7,
                w = E >>> 3;
            return (m[w] | (_ <= 5 ? 0 : m[w + 1] << 8)) >>> _ & 7
        }

        function Le(m, E) {
            var _ = E & 7,
                w = E >>> 3;
            return (m[w] | (_ <= 4 ? 0 : m[w + 1] << 8)) >>> _ & 15
        }

        function Ae(m, E) {
            var _ = E & 7,
                w = E >>> 3;
            return (m[w] | (_ <= 3 ? 0 : m[w + 1] << 8)) >>> _ & 31
        }

        function fe(m, E) {
            var _ = E & 7,
                w = E >>> 3;
            return (m[w] | (_ <= 1 ? 0 : m[w + 1] << 8)) >>> _ & 127
        }

        function je(m, E, _) {
            var w = E & 7,
                T = E >>> 3,
                S = (1 << _) - 1,
                U = m[T] >>> w;
            return _ < 8 - w || (U |= m[T + 1] << 8 - w, _ < 16 - w) || (U |= m[T + 2] << 16 - w, _ < 24 - w) || (U |= m[T + 3] << 24 - w), U & S
        }

        function Nr(m, E, _) {
            var w = E & 7,
                T = E >>> 3;
            return w <= 5 ? m[T] |= (_ & 7) << w : (m[T] |= _ << w & 255, m[T + 1] = (_ & 7) >> 8 - w), E + 3
        }

        function Yr(m, E, _) {
            var w = E & 7,
                T = E >>> 3;
            return _ = (_ & 1) << w, m[T] |= _, E + 1
        }

        function at(m, E, _) {
            var w = E & 7,
                T = E >>> 3;
            return _ <<= w, m[T] |= _ & 255, _ >>>= 8, m[T + 1] = _, E + 8
        }

        function oa(m, E, _) {
            var w = E & 7,
                T = E >>> 3;
            return _ <<= w, m[T] |= _ & 255, _ >>>= 8, m[T + 1] = _ & 255, m[T + 2] = _ >>> 8, E + 16
        }

        function dt(m, E) {
            var _ = m.length,
                w = 2 * _ > E ? 2 * _ : E + 5,
                T = 0;
            if (_ >= E) return m;
            if (Te) {
                var S = jn(w);
                if (m.copy) m.copy(S);
                else
                    for (; T < m.length; ++T) S[T] = m[T];
                return S
            } else if (Q) {
                var U = new Uint8Array(w);
                if (U.set) U.set(m);
                else
                    for (; T < _; ++T) U[T] = m[T];
                return U
            }
            return m.length = w, m
        }

        function yr(m) {
            for (var E = new Array(m), _ = 0; _ < m; ++_) E[_] = 0;
            return E
        }

        function nt(m, E, _) {
            var w = 1,
                T = 0,
                S = 0,
                U = 0,
                K = 0,
                M = m.length,
                W = Q ? new Uint16Array(32) : yr(32);
            for (S = 0; S < 32; ++S) W[S] = 0;
            for (S = M; S < _; ++S) m[S] = 0;
            M = m.length;
            var H = Q ? new Uint16Array(M) : yr(M);
            for (S = 0; S < M; ++S) W[T = m[S]]++, w < T && (w = T), H[S] = 0;
            for (W[0] = 0, S = 1; S <= w; ++S) W[S + 16] = K = K + W[S - 1] << 1;
            for (S = 0; S < M; ++S) K = m[S], K != 0 && (H[S] = W[K + 16]++);
            var q = 0;
            for (S = 0; S < M; ++S)
                if (q = m[S], q != 0)
                    for (K = y(H[S], w) >> w - q, U = (1 << w + 4 - q) - 1; U >= 0; --U) E[K | U << q] = q & 15 | S << 4;
            return w
        }
        var vt = Q ? new Uint16Array(512) : yr(512),
            la = Q ? new Uint16Array(32) : yr(32);
        if (!Q) {
            for (var wr = 0; wr < 512; ++wr) vt[wr] = 0;
            for (wr = 0; wr < 32; ++wr) la[wr] = 0
        }(function() {
            for (var m = [], E = 0; E < 32; E++) m.push(5);
            nt(m, la, 32);
            var _ = [];
            for (E = 0; E <= 143; E++) _.push(8);
            for (; E <= 255; E++) _.push(9);
            for (; E <= 279; E++) _.push(7);
            for (; E <= 287; E++) _.push(8);
            nt(_, vt, 288)
        })();
        var Jr = function() {
            for (var E = Q ? new Uint8Array(32768) : [], _ = 0, w = 0; _ < re.length - 1; ++_)
                for (; w < re[_ + 1]; ++w) E[w] = _;
            for (; w < 32768; ++w) E[w] = 29;
            var T = Q ? new Uint8Array(259) : [];
            for (_ = 0, w = 0; _ < j.length - 1; ++_)
                for (; w < j[_ + 1]; ++w) T[w] = _;

            function S(K, M) {
                for (var W = 0; W < K.length;) {
                    var H = Math.min(65535, K.length - W),
                        q = W + H == K.length;
                    for (M.write_shift(1, +q), M.write_shift(2, H), M.write_shift(2, ~H & 65535); H-- > 0;) M[M.l++] = K[W++]
                }
                return M.l
            }

            function U(K, M) {
                for (var W = 0, H = 0, q = Q ? new Uint16Array(32768) : []; H < K.length;) {
                    var se = Math.min(65535, K.length - H);
                    if (se < 10) {
                        for (W = Nr(M, W, +(H + se == K.length)), W & 7 && (W += 8 - (W & 7)), M.l = W / 8 | 0, M.write_shift(2, se), M.write_shift(2, ~se & 65535); se-- > 0;) M[M.l++] = K[H++];
                        W = M.l * 8;
                        continue
                    }
                    W = Nr(M, W, +(H + se == K.length) + 2);
                    for (var he = 0; se-- > 0;) {
                        var ee = K[H];
                        he = (he << 5 ^ ee) & 32767;
                        var oe = -1,
                            _e = 0;
                        if ((oe = q[he]) && (oe |= H & -32768, oe > H && (oe -= 32768), oe < H))
                            for (; K[oe + _e] == K[H + _e] && _e < 250;) ++_e;
                        if (_e > 2) {
                            ee = T[_e], ee <= 22 ? W = at(M, W, Z[ee + 1] >> 1) - 1 : (at(M, W, 3), W += 5, at(M, W, Z[ee - 23] >> 5), W += 3);
                            var He = ee < 8 ? 0 : ee - 4 >> 2;
                            He > 0 && (oa(M, W, _e - j[ee]), W += He), ee = E[H - oe], W = at(M, W, Z[ee] >> 3), W -= 3;
                            var Ve = ee < 4 ? 0 : ee - 2 >> 1;
                            Ve > 0 && (oa(M, W, H - oe - re[ee]), W += Ve);
                            for (var hr = 0; hr < _e; ++hr) q[he] = H & 32767, he = (he << 5 ^ K[H]) & 32767, ++H;
                            se -= _e - 1
                        } else ee <= 143 ? ee = ee + 48 : W = Yr(M, W, 1), W = at(M, W, Z[ee]), q[he] = H & 32767, ++H
                    }
                    W = at(M, W, 0) - 1
                }
                return M.l = (W + 7) / 8 | 0, M.l
            }
            return function(M, W) {
                return M.length < 8 ? S(M, W) : U(M, W)
            }
        }();

        function Se(m) {
            var E = X(50 + Math.floor(m.length * 1.1)),
                _ = Jr(m, E);
            return E.slice(0, _)
        }
        var Ye = Q ? new Uint16Array(32768) : yr(32768),
            br = Q ? new Uint16Array(32768) : yr(32768),
            tr = Q ? new Uint16Array(128) : yr(128),
            yt = 1,
            Vn = 1;

        function hc(m, E) {
            var _ = Ae(m, E) + 257;
            E += 5;
            var w = Ae(m, E) + 1;
            E += 5;
            var T = Le(m, E) + 4;
            E += 4;
            for (var S = 0, U = Q ? new Uint8Array(19) : yr(19), K = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], M = 1, W = Q ? new Uint8Array(8) : yr(8), H = Q ? new Uint8Array(8) : yr(8), q = U.length, se = 0; se < T; ++se) U[R[se]] = S = ye(m, E), M < S && (M = S), W[S]++, E += 3;
            var he = 0;
            for (W[0] = 0, se = 1; se <= M; ++se) H[se] = he = he + W[se - 1] << 1;
            for (se = 0; se < q; ++se)(he = U[se]) != 0 && (K[se] = H[he]++);
            var ee = 0;
            for (se = 0; se < q; ++se)
                if (ee = U[se], ee != 0) {
                    he = Z[K[se]] >> 8 - ee;
                    for (var oe = (1 << 7 - ee) - 1; oe >= 0; --oe) tr[he | oe << ee] = ee & 7 | se << 3
                } var _e = [];
            for (M = 1; _e.length < _ + w;) switch (he = tr[fe(m, E)], E += he & 7, he >>>= 3) {
                case 16:
                    for (S = 3 + Be(m, E), E += 2, he = _e[_e.length - 1]; S-- > 0;) _e.push(he);
                    break;
                case 17:
                    for (S = 3 + ye(m, E), E += 3; S-- > 0;) _e.push(0);
                    break;
                case 18:
                    for (S = 11 + fe(m, E), E += 7; S-- > 0;) _e.push(0);
                    break;
                default:
                    _e.push(he), M < he && (M = he);
                    break
            }
            var He = _e.slice(0, _),
                Ve = _e.slice(_);
            for (se = _; se < 286; ++se) He[se] = 0;
            for (se = w; se < 30; ++se) Ve[se] = 0;
            return yt = nt(He, Ye, 286), Vn = nt(Ve, br, 30), E
        }

        function uc(m, E) {
            if (m[0] == 3 && !(m[1] & 3)) return [wt(E), 2];
            for (var _ = 0, w = 0, T = jn(E || 1 << 18), S = 0, U = T.length >>> 0, K = 0, M = 0; !(w & 1);) {
                if (w = ye(m, _), _ += 3, w >>> 1) w >> 1 == 1 ? (K = 9, M = 5) : (_ = hc(m, _), K = yt, M = Vn);
                else {
                    _ & 7 && (_ += 8 - (_ & 7));
                    var W = m[_ >>> 3] | m[(_ >>> 3) + 1] << 8;
                    if (_ += 32, W > 0)
                        for (!E && U < S + W && (T = dt(T, S + W), U = T.length); W-- > 0;) T[S++] = m[_ >>> 3], _ += 8;
                    continue
                }
                for (;;) {
                    !E && U < S + 32767 && (T = dt(T, S + 32767), U = T.length);
                    var H = je(m, _, K),
                        q = w >>> 1 == 1 ? vt[H] : Ye[H];
                    if (_ += q & 15, q >>>= 4, !(q >>> 8 & 255)) T[S++] = q;
                    else {
                        if (q == 256) break;
                        q -= 257;
                        var se = q < 8 ? 0 : q - 4 >> 2;
                        se > 5 && (se = 0);
                        var he = S + j[q];
                        se > 0 && (he += je(m, _, se), _ += se), H = je(m, _, M), q = w >>> 1 == 1 ? la[H] : br[H], _ += q & 15, q >>>= 4;
                        var ee = q < 4 ? 0 : q - 2 >> 1,
                            oe = re[q];
                        for (ee > 0 && (oe += je(m, _, ee), _ += ee), !E && U < he && (T = dt(T, he + 100), U = T.length); S < he;) T[S] = T[S - oe], ++S
                    }
                }
            }
            return E ? [T, _ + 7 >>> 3] : [T.slice(0, S), _ + 7 >>> 3]
        }

        function Gn(m, E) {
            var _ = m.slice(m.l || 0),
                w = uc(_, E);
            return m.l += w[1], w[0]
        }

        function Xn(m, E) {
            if (m) typeof console < "u" && console.error(E);
            else throw new Error(E)
        }

        function zn(m, E) {
            var _ = m;
            or(_, 0);
            var w = [],
                T = [],
                S = {
                    FileIndex: w,
                    FullPaths: T
                };
            F(S, {
                root: E.root
            });
            for (var U = _.length - 4;
                (_[U] != 80 || _[U + 1] != 75 || _[U + 2] != 5 || _[U + 3] != 6) && U >= 0;) --U;
            _.l = U + 4, _.l += 4;
            var K = _.read_shift(2);
            _.l += 6;
            var M = _.read_shift(4);
            for (_.l = M, U = 0; U < K; ++U) {
                _.l += 20;
                var W = _.read_shift(4),
                    H = _.read_shift(4),
                    q = _.read_shift(2),
                    se = _.read_shift(2),
                    he = _.read_shift(2);
                _.l += 8;
                var ee = _.read_shift(4),
                    oe = f(_.slice(_.l + q, _.l + q + se));
                _.l += q + se + he;
                var _e = _.l;
                _.l = ee + 4, xc(_, W, H, S, oe), _.l = _e
            }
            return S
        }

        function xc(m, E, _, w, T) {
            m.l += 2;
            var S = m.read_shift(2),
                U = m.read_shift(2),
                K = s(m);
            if (S & 8257) throw new Error("Unsupported ZIP encryption");
            for (var M = m.read_shift(4), W = m.read_shift(4), H = m.read_shift(4), q = m.read_shift(2), se = m.read_shift(2), he = "", ee = 0; ee < q; ++ee) he += String.fromCharCode(m[m.l++]);
            if (se) {
                var oe = f(m.slice(m.l, m.l + se));
                (oe[21589] || {}).mt && (K = oe[21589].mt), ((T || {})[21589] || {}).mt && (K = T[21589].mt)
            }
            m.l += se;
            var _e = m.slice(m.l, m.l + W);
            switch (U) {
                case 8:
                    _e = P(m, H);
                    break;
                case 0:
                    break;
                default:
                    throw new Error("Unsupported ZIP Compression method " + U)
            }
            var He = !1;
            S & 8 && (M = m.read_shift(4), M == 134695760 && (M = m.read_shift(4), He = !0), W = m.read_shift(4), H = m.read_shift(4)), W != E && Xn(He, "Bad compressed size: " + E + " != " + W), H != _ && Xn(He, "Bad uncompressed size: " + _ + " != " + H), y0(w, he, _e, {
                unsafe: !0,
                mt: K
            })
        }

        function dc(m, E) {
            var _ = E || {},
                w = [],
                T = [],
                S = X(1),
                U = _.compression ? 8 : 0,
                K = 0,
                M = 0,
                W = 0,
                H = 0,
                q = 0,
                se = m.FullPaths[0],
                he = se,
                ee = m.FileIndex[0],
                oe = [],
                _e = 0;
            for (M = 1; M < m.FullPaths.length; ++M)
                if (he = m.FullPaths[M].slice(se.length), ee = m.FileIndex[M], !(!ee.size || !ee.content || he == "Sh33tJ5")) {
                    var He = H,
                        Ve = X(he.length);
                    for (W = 0; W < he.length; ++W) Ve.write_shift(1, he.charCodeAt(W) & 127);
                    Ve = Ve.slice(0, Ve.l), oe[q] = to.buf(ee.content, 0);
                    var hr = ee.content;
                    U == 8 && (hr = D(hr)), S = X(30), S.write_shift(4, 67324752), S.write_shift(2, 20), S.write_shift(2, K), S.write_shift(2, U), ee.mt ? i(S, ee.mt) : S.write_shift(4, 0), S.write_shift(-4, oe[q]), S.write_shift(4, hr.length), S.write_shift(4, ee.content.length), S.write_shift(2, Ve.length), S.write_shift(2, 0), H += S.length, w.push(S), H += Ve.length, w.push(Ve), H += hr.length, w.push(hr), S = X(46), S.write_shift(4, 33639248), S.write_shift(2, 0), S.write_shift(2, 20), S.write_shift(2, K), S.write_shift(2, U), S.write_shift(4, 0), S.write_shift(-4, oe[q]), S.write_shift(4, hr.length), S.write_shift(4, ee.content.length), S.write_shift(2, Ve.length), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(4, 0), S.write_shift(4, He), _e += S.l, T.push(S), _e += Ve.length, T.push(Ve), ++q
                } return S = X(22), S.write_shift(4, 101010256), S.write_shift(2, 0), S.write_shift(2, 0), S.write_shift(2, q), S.write_shift(2, q), S.write_shift(4, _e), S.write_shift(4, H), S.write_shift(2, 0), sr([sr(w), sr(T), S])
        }
        var Ka = {
            htm: "text/html",
            xml: "text/xml",
            gif: "image/gif",
            jpg: "image/jpeg",
            png: "image/png",
            mso: "application/x-mso",
            thmx: "application/vnd.ms-officetheme",
            sh33tj5: "application/octet-stream"
        };

        function vc(m, E) {
            if (m.ctype) return m.ctype;
            var _ = m.name || "",
                w = _.match(/\.([^\.]+)$/);
            return w && Ka[w[1]] || E && (w = (_ = E).match(/[\.\\]([^\.\\])+$/), w && Ka[w[1]]) ? Ka[w[1]] : "application/octet-stream"
        }

        function pc(m) {
            for (var E = Aa(m), _ = [], w = 0; w < E.length; w += 76) _.push(E.slice(w, w + 76));
            return _.join(`\r
`) + `\r
`
        }

        function mc(m) {
            var E = m.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(W) {
                var H = W.charCodeAt(0).toString(16).toUpperCase();
                return "=" + (H.length == 1 ? "0" + H : H)
            });
            E = E.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), E.charAt(0) == `
` && (E = "=0D" + E.slice(1)), E = E.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
            for (var _ = [], w = E.split(`\r
`), T = 0; T < w.length; ++T) {
                var S = w[T];
                if (S.length == 0) {
                    _.push("");
                    continue
                }
                for (var U = 0; U < S.length;) {
                    var K = 76,
                        M = S.slice(U, U + K);
                    M.charAt(K - 1) == "=" ? K-- : M.charAt(K - 2) == "=" ? K -= 2 : M.charAt(K - 3) == "=" && (K -= 3), M = S.slice(U, U + K), U += K, U < S.length && (M += "="), _.push(M)
                }
            }
            return _.join(`\r
`)
        }

        function gc(m) {
            for (var E = [], _ = 0; _ < m.length; ++_) {
                for (var w = m[_]; _ <= m.length && w.charAt(w.length - 1) == "=";) w = w.slice(0, w.length - 1) + m[++_];
                E.push(w)
            }
            for (var T = 0; T < E.length; ++T) E[T] = E[T].replace(/[=][0-9A-Fa-f]{2}/g, function(S) {
                return String.fromCharCode(parseInt(S.slice(1), 16))
            });
            return Or(E.join(`\r
`))
        }

        function _c(m, E, _) {
            for (var w = "", T = "", S = "", U, K = 0; K < 10; ++K) {
                var M = E[K];
                if (!M || M.match(/^\s*$/)) break;
                var W = M.match(/^(.*?):\s*([^\s].*)$/);
                if (W) switch (W[1].toLowerCase()) {
                    case "content-location":
                        w = W[2].trim();
                        break;
                    case "content-type":
                        S = W[2].trim();
                        break;
                    case "content-transfer-encoding":
                        T = W[2].trim();
                        break
                }
            }
            switch (++K, T.toLowerCase()) {
                case "base64":
                    U = Or(Rr(E.slice(K).join("")));
                    break;
                case "quoted-printable":
                    U = gc(E.slice(K));
                    break;
                default:
                    throw new Error("Unsupported Content-Transfer-Encoding " + T)
            }
            var H = y0(m, w.slice(_.length), U, {
                unsafe: !0
            });
            S && (H.ctype = S)
        }

        function wc(m, E) {
            if (V(m.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
            var _ = E && E.root || "",
                w = (Te && Buffer.isBuffer(m) ? m.toString("binary") : V(m)).split(`\r
`),
                T = 0,
                S = "";
            for (T = 0; T < w.length; ++T)
                if (S = w[T], !!/^Content-Location:/i.test(S) && (S = S.slice(S.indexOf("file")), _ || (_ = S.slice(0, S.lastIndexOf("/") + 1)), S.slice(0, _.length) != _))
                    for (; _.length > 0 && (_ = _.slice(0, _.length - 1), _ = _.slice(0, _.lastIndexOf("/") + 1), S.slice(0, _.length) != _););
            var U = (w[1] || "").match(/boundary="(.*?)"/);
            if (!U) throw new Error("MAD cannot find boundary");
            var K = "--" + (U[1] || ""),
                M = [],
                W = [],
                H = {
                    FileIndex: M,
                    FullPaths: W
                };
            F(H);
            var q, se = 0;
            for (T = 0; T < w.length; ++T) {
                var he = w[T];
                he !== K && he !== K + "--" || (se++ && _c(H, w.slice(q, T), _), q = T)
            }
            return H
        }

        function kc(m, E) {
            var _ = E || {},
                w = _.boundary || "SheetJS";
            w = "------=" + w;
            for (var T = ["MIME-Version: 1.0", 'Content-Type: multipart/related; boundary="' + w.slice(2) + '"', "", "", ""], S = m.FullPaths[0], U = S, K = m.FileIndex[0], M = 1; M < m.FullPaths.length; ++M)
                if (U = m.FullPaths[M].slice(S.length), K = m.FileIndex[M], !(!K.size || !K.content || U == "Sh33tJ5")) {
                    U = U.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(_e) {
                        return "_x" + _e.charCodeAt(0).toString(16) + "_"
                    }).replace(/[\u0080-\uFFFF]/g, function(_e) {
                        return "_u" + _e.charCodeAt(0).toString(16) + "_"
                    });
                    for (var W = K.content, H = Te && Buffer.isBuffer(W) ? W.toString("binary") : V(W), q = 0, se = Math.min(1024, H.length), he = 0, ee = 0; ee <= se; ++ee)(he = H.charCodeAt(ee)) >= 32 && he < 128 && ++q;
                    var oe = q >= se * 4 / 5;
                    T.push(w), T.push("Content-Location: " + (_.root || "file:///C:/SheetJS/") + U), T.push("Content-Transfer-Encoding: " + (oe ? "quoted-printable" : "base64")), T.push("Content-Type: " + vc(K, U)), T.push(""), T.push(oe ? mc(H) : pc(H))
                } return T.push(w + `--\r
`), T.join(`\r
`)
        }

        function Ec(m) {
            var E = {};
            return F(E, m), E
        }

        function y0(m, E, _, w) {
            var T = w && w.unsafe;
            T || F(m);
            var S = !T && xe.find(m, E);
            if (!S) {
                var U = m.FullPaths[0];
                E.slice(0, U.length) == U ? U = E : (U.slice(-1) != "/" && (U += "/"), U = (U + E).replace("//", "/")), S = {
                    name: n(E),
                    type: 2
                }, m.FileIndex.push(S), m.FullPaths.push(U), T || xe.utils.cfb_gc(m)
            }
            return S.content = _, S.size = _ ? _.length : 0, w && (w.CLSID && (S.clsid = w.CLSID), w.mt && (S.mt = w.mt), w.ct && (S.ct = w.ct)), S
        }

        function Tc(m, E) {
            F(m);
            var _ = xe.find(m, E);
            if (_) {
                for (var w = 0; w < m.FileIndex.length; ++w)
                    if (m.FileIndex[w] == _) return m.FileIndex.splice(w, 1), m.FullPaths.splice(w, 1), !0
            }
            return !1
        }

        function Sc(m, E, _) {
            F(m);
            var w = xe.find(m, E);
            if (w) {
                for (var T = 0; T < m.FileIndex.length; ++T)
                    if (m.FileIndex[T] == w) return m.FileIndex[T].name = n(_), m.FullPaths[T] = _, !0
            }
            return !1
        }

        function Fc(m) {
            I(m, !0)
        }
        return t.find = G, t.read = N, t.parse = l, t.write = de, t.writeFile = be, t.utils = {
            cfb_new: Ec,
            cfb_add: y0,
            cfb_del: Tc,
            cfb_mov: Sc,
            cfb_gc: Fc,
            ReadShift: ga,
            CheckField: Ls,
            prep_blob: or,
            bconcat: sr,
            use_zlib: C,
            _deflateRaw: Se,
            _inflateRaw: Gn,
            consts: ce
        }, t
    }();

function ao(e) {
    return typeof e == "string" ? g0(e) : Array.isArray(e) ? Dc(e) : e
}

function Ua(e, t, r) {
    if (typeof Deno < "u") {
        if (r && typeof t == "string") switch (r) {
            case "utf8":
                t = new TextEncoder(r).encode(t);
                break;
            case "binary":
                t = g0(t);
                break;
            default:
                throw new Error("Unsupported encoding " + r)
        }
        return Deno.writeFileSync(e, t)
    }
    var a = r == "utf8" ? et(t) : t;
    if (typeof IE_SaveFile < "u") return IE_SaveFile(a, e);
    if (typeof Blob < "u") {
        var n = new Blob([ao(a)], {
            type: "application/octet-stream"
        });
        if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(n, e);
        if (typeof saveAs < "u") return saveAs(n, e);
        if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
            var i = URL.createObjectURL(n);
            if (typeof chrome == "object" && typeof(chrome.downloads || {}).download == "function") return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
                URL.revokeObjectURL(i)
            }, 6e4), chrome.downloads.download({
                url: i,
                filename: e,
                saveAs: !0
            });
            var s = document.createElement("a");
            if (s.download != null) return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
                URL.revokeObjectURL(i)
            }, 6e4), i
        }
    }
    if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
        var f = File(e);
        return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = St(t)), f.write(t), f.close(), t
    } catch (c) {
        if (!c.message || !c.message.match(/onstruct/)) throw c
    }
    throw new Error("cannot save file " + e)
}

function no(e) {
    if (typeof Deno < "u") return Deno.readFileSync(e);
    if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
        var t = File(e);
        t.open("r"), t.encoding = "binary";
        var r = t.read();
        return t.close(), r
    } catch (a) {
        if (!a.message || !a.message.match(/onstruct/)) throw a
    }
    throw new Error("Cannot access file " + e)
}

function Ke(e) {
    for (var t = Object.keys(e), r = [], a = 0; a < t.length; ++a) Object.prototype.hasOwnProperty.call(e, t[a]) && r.push(t[a]);
    return r
}

function ti(e, t) {
    for (var r = [], a = Ke(e), n = 0; n !== a.length; ++n) r[e[a[n]][t]] == null && (r[e[a[n]][t]] = a[n]);
    return r
}

function w0(e) {
    for (var t = [], r = Ke(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = r[a];
    return t
}

function k0(e) {
    for (var t = [], r = Ke(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = parseInt(r[a], 10);
    return t
}

function io(e) {
    for (var t = [], r = Ke(e), a = 0; a !== r.length; ++a) t[e[r[a]]] == null && (t[e[r[a]]] = []), t[e[r[a]]].push(r[a]);
    return t
}
var o0 = new Date(1899, 11, 30, 0, 0, 0);

function nr(e, t) {
    var r = e.getTime(),
        a = o0.getTime() + (e.getTimezoneOffset() - o0.getTimezoneOffset()) * 6e4;
    return (r - a) / (24 * 60 * 60 * 1e3)
}
var vs = new Date,
    so = o0.getTime() + (vs.getTimezoneOffset() - o0.getTimezoneOffset()) * 6e4,
    ai = vs.getTimezoneOffset();

function E0(e) {
    var t = new Date;
    return t.setTime(e * 24 * 60 * 60 * 1e3 + so), t.getTimezoneOffset() !== ai && t.setTime(t.getTime() + (t.getTimezoneOffset() - ai) * 6e4), t
}

function fo(e) {
    var t = 0,
        r = 0,
        a = !1,
        n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
    if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
    for (var i = 1; i != n.length; ++i)
        if (n[i]) {
            switch (r = 1, i > 3 && (a = !0), n[i].slice(n[i].length - 1)) {
                case "Y":
                    throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
                case "D":
                    r *= 24;
                case "H":
                    r *= 60;
                case "M":
                    if (a) r *= 60;
                    else throw new Error("Unsupported ISO Duration Field: M")
            }
            t += r * parseInt(n[i], 10)
        } return t
}
var ni = new Date("2017-02-19T19:06:09.000Z"),
    ps = isNaN(ni.getFullYear()) ? new Date("2/19/17") : ni,
    co = ps.getFullYear() == 2017;

function Ue(e, t) {
    var r = new Date(e);
    if (co) return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
    if (e instanceof Date) return e;
    if (ps.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
        var a = r.getFullYear();
        return e.indexOf("" + a) > -1 || r.setFullYear(r.getFullYear() + 100), r
    }
    var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"],
        i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
    return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i
}

function Lt(e, t) {
    if (Te && Buffer.isBuffer(e)) {
        if (t) {
            if (e[0] == 255 && e[1] == 254) return et(e.slice(2).toString("utf16le"));
            if (e[1] == 254 && e[2] == 255) return et(as(e.slice(2).toString("binary")))
        }
        return e.toString("binary")
    }
    if (typeof TextDecoder < "u") try {
        if (t) {
            if (e[0] == 255 && e[1] == 254) return et(new TextDecoder("utf-16le").decode(e.slice(2)));
            if (e[0] == 254 && e[1] == 255) return et(new TextDecoder("utf-16be").decode(e.slice(2)))
        }
        var r = {
            "€": "",
            "‚": "",
            ƒ: "",
            "„": "",
            "…": "",
            "†": "",
            "‡": "",
            "ˆ": "",
            "‰": "",
            Š: "",
            "‹": "",
            Œ: "",
            Ž: "",
            "‘": "",
            "’": "",
            "“": "",
            "”": "",
            "•": "",
            "–": "",
            "—": "",
            "˜": "",
            "™": "",
            š: "",
            "›": "",
            œ: "",
            ž: "",
            Ÿ: ""
        };
        return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
            return r[i] || i
        })
    } catch {}
    for (var a = [], n = 0; n != e.length; ++n) a.push(String.fromCharCode(e[n]));
    return a.join("")
}

function We(e) {
    if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
    if (typeof e != "object" || e == null) return e;
    if (e instanceof Date) return new Date(e.getTime());
    var t = {};
    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = We(e[r]));
    return t
}

function ze(e, t) {
    for (var r = ""; r.length < t;) r += e;
    return r
}

function Kr(e) {
    var t = Number(e);
    if (!isNaN(t)) return isFinite(t) ? t : NaN;
    if (!/\d/.test(e)) return t;
    var r = 1,
        a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
            return r *= 100, ""
        });
    return !isNaN(t = Number(a)) || (a = a.replace(/[(](.*)[)]/, function(n, i) {
        return r = -r, i
    }), !isNaN(t = Number(a))) ? t / r : t
}
var oo = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function ta(e) {
    var t = new Date(e),
        r = new Date(NaN),
        a = t.getYear(),
        n = t.getMonth(),
        i = t.getDate();
    if (isNaN(i)) return r;
    var s = e.toLowerCase();
    if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
        if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && oo.indexOf(s) == -1) return r
    } else if (s.match(/[a-z]/)) return r;
    return a < 0 || a > 8099 ? r : (n > 0 || i > 1) && a != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t
}
var lo = function() {
    var e = "abacaba".split(/(:?b)/i).length == 5;
    return function(r, a, n) {
        if (e || typeof a == "string") return r.split(a);
        for (var i = r.split(a), s = [i[0]], f = 1; f < i.length; ++f) s.push(n), s.push(i[f]);
        return s
    }
}();

function ms(e) {
    return e ? e.content && e.type ? Lt(e.content, !0) : e.data ? va(e.data) : e.asNodeBuffer && Te ? va(e.asNodeBuffer().toString("binary")) : e.asBinary ? va(e.asBinary()) : e._data && e._data.getContent ? va(Lt(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null
}

function gs(e) {
    if (!e) return null;
    if (e.data) return $n(e.data);
    if (e.asNodeBuffer && Te) return e.asNodeBuffer();
    if (e._data && e._data.getContent) {
        var t = e._data.getContent();
        return typeof t == "string" ? $n(t) : Array.prototype.slice.call(t)
    }
    return e.content && e.type ? e.content : null
}

function ho(e) {
    return e && e.name.slice(-4) === ".bin" ? gs(e) : ms(e)
}

function Ur(e, t) {
    for (var r = e.FullPaths || Ke(e.files), a = t.toLowerCase().replace(/[\/]/g, "\\"), n = a.replace(/\\/g, "/"), i = 0; i < r.length; ++i) {
        var s = r[i].replace(/^Root Entry[\/]/, "").toLowerCase();
        if (a == s || n == s) return e.files ? e.files[r[i]] : e.FileIndex[i]
    }
    return null
}

function fn(e, t) {
    var r = Ur(e, t);
    if (r == null) throw new Error("Cannot find file " + t + " in zip");
    return r
}

function er(e, t, r) {
    if (!r) return ho(fn(e, t));
    if (!t) return null;
    try {
        return er(e, t)
    } catch {
        return null
    }
}

function Ir(e, t, r) {
    if (!r) return ms(fn(e, t));
    if (!t) return null;
    try {
        return Ir(e, t)
    } catch {
        return null
    }
}

function uo(e, t, r) {
    return gs(fn(e, t))
}

function ii(e) {
    for (var t = e.FullPaths || Ke(e.files), r = [], a = 0; a < t.length; ++a) t[a].slice(-1) != "/" && r.push(t[a].replace(/^Root Entry[\/]/, ""));
    return r.sort()
}

function ke(e, t, r) {
    if (e.FullPaths) {
        if (typeof r == "string") {
            var a;
            return Te ? a = ht(r) : a = Oc(r), xe.utils.cfb_add(e, t, a)
        }
        xe.utils.cfb_add(e, t, r)
    } else e.file(t, r)
}

function cn() {
    return xe.utils.cfb_new()
}

function _s(e, t) {
    switch (t.type) {
        case "base64":
            return xe.read(e, {
                type: "base64"
            });
        case "binary":
            return xe.read(e, {
                type: "binary"
            });
        case "buffer":
        case "array":
            return xe.read(e, {
                type: "buffer"
            })
    }
    throw new Error("Unrecognized type " + t.type)
}

function ma(e, t) {
    if (e.charAt(0) == "/") return e.slice(1);
    var r = t.split("/");
    t.slice(-1) != "/" && r.pop();
    for (var a = e.split("/"); a.length !== 0;) {
        var n = a.shift();
        n === ".." ? r.pop() : n !== "." && r.push(n)
    }
    return r.join("/")
}
var qe = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`,
    xo = /([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g,
    si = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s*[\/\?]?>/mg,
    vo = /<[^>]*>/g,
    _r = qe.match(si) ? si : vo,
    po = /<\w*:/,
    mo = /<(\/?)\w+:/;

function me(e, t, r) {
    for (var a = {}, n = 0, i = 0; n !== e.length && !((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13); ++n);
    if (t || (a[0] = e.slice(0, n)), n === e.length) return a;
    var s = e.match(xo),
        f = 0,
        c = "",
        o = 0,
        l = "",
        h = "",
        x = 1;
    if (s)
        for (o = 0; o != s.length; ++o) {
            for (h = s[o], i = 0; i != h.length && h.charCodeAt(i) !== 61; ++i);
            for (l = h.slice(0, i).trim(); h.charCodeAt(i + 1) == 32;) ++i;
            for (x = (n = h.charCodeAt(i + 1)) == 34 || n == 39 ? 1 : 0, c = h.slice(i + 1 + x, h.length - x), f = 0; f != l.length && l.charCodeAt(f) !== 58; ++f);
            if (f === l.length) l.indexOf("_") > 0 && (l = l.slice(0, l.indexOf("_"))), a[l] = c, a[l.toLowerCase()] = c;
            else {
                var d = (f === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(f + 1);
                if (a[d] && l.slice(f - 3, f) == "ext") continue;
                a[d] = c, a[d.toLowerCase()] = c
            }
        }
    return a
}

function rt(e) {
    return e.replace(mo, "<$1")
}
var ws = {
        "&quot;": '"',
        "&apos;": "'",
        "&gt;": ">",
        "&lt;": "<",
        "&amp;": "&"
    },
    on = w0(ws),
    Ce = function() {
        var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig,
            t = /_x([\da-fA-F]{4})_/ig;
        return function r(a) {
            var n = a + "",
                i = n.indexOf("<![CDATA[");
            if (i == -1) return n.replace(e, function(f, c) {
                return ws[f] || String.fromCharCode(parseInt(c, f.indexOf("x") > -1 ? 16 : 10)) || f
            }).replace(t, function(f, c) {
                return String.fromCharCode(parseInt(c, 16))
            });
            var s = n.indexOf("]]>");
            return r(n.slice(0, i)) + n.slice(i + 9, s) + r(n.slice(s + 3))
        }
    }(),
    ln = /[&<>'"]/g,
    go = /[\u0000-\u0008\u000b-\u001f]/g;

function Ne(e) {
    var t = e + "";
    return t.replace(ln, function(r) {
        return on[r]
    }).replace(go, function(r) {
        return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_"
    })
}

function fi(e) {
    return Ne(e).replace(/ /g, "_x0020_")
}
var ks = /[\u0000-\u001f]/g;

function hn(e) {
    var t = e + "";
    return t.replace(ln, function(r) {
        return on[r]
    }).replace(/\n/g, "<br/>").replace(ks, function(r) {
        return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";"
    })
}

function _o(e) {
    var t = e + "";
    return t.replace(ln, function(r) {
        return on[r]
    }).replace(ks, function(r) {
        return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";"
    })
}
var ci = function() {
    var e = /&#(\d+);/g;

    function t(r, a) {
        return String.fromCharCode(parseInt(a, 10))
    }
    return function(a) {
        return a.replace(e, t)
    }
}();

function wo(e) {
    return e.replace(/(\r\n|[\r\n])/g, "&#10;")
}

function Me(e) {
    switch (e) {
        case 1:
        case !0:
        case "1":
        case "true":
        case "TRUE":
            return !0;
        default:
            return !1
    }
}

function O0(e) {
    for (var t = "", r = 0, a = 0, n = 0, i = 0, s = 0, f = 0; r < e.length;) {
        if (a = e.charCodeAt(r++), a < 128) {
            t += String.fromCharCode(a);
            continue
        }
        if (n = e.charCodeAt(r++), a > 191 && a < 224) {
            s = (a & 31) << 6, s |= n & 63, t += String.fromCharCode(s);
            continue
        }
        if (i = e.charCodeAt(r++), a < 240) {
            t += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
            continue
        }
        s = e.charCodeAt(r++), f = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023))
    }
    return t
}

function oi(e) {
    var t = wt(2 * e.length),
        r, a, n = 1,
        i = 0,
        s = 0,
        f;
    for (a = 0; a < e.length; a += n) n = 1, (f = e.charCodeAt(a)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(a + 1) & 63), n = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63), n = 3) : (n = 4, r = (f & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
    return t.slice(0, i).toString("ucs2")
}

function li(e) {
    return ht(e, "binary").toString("utf8")
}
var Ya = "foo bar bazâð£",
    Pe = Te && (li(Ya) == O0(Ya) && li || oi(Ya) == O0(Ya) && oi) || O0,
    et = Te ? function(e) {
        return ht(e, "utf8").toString("binary")
    } : function(e) {
        for (var t = [], r = 0, a = 0, n = 0; r < e.length;) switch (a = e.charCodeAt(r++), !0) {
            case a < 128:
                t.push(String.fromCharCode(a));
                break;
            case a < 2048:
                t.push(String.fromCharCode(192 + (a >> 6))), t.push(String.fromCharCode(128 + (a & 63)));
                break;
            case (a >= 55296 && a < 57344):
                a -= 55296, n = e.charCodeAt(r++) - 56320 + (a << 10), t.push(String.fromCharCode(240 + (n >> 18 & 7))), t.push(String.fromCharCode(144 + (n >> 12 & 63))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
                break;
            default:
                t.push(String.fromCharCode(224 + (a >> 12))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)))
        }
        return t.join("")
    },
    Ca = function() {
        var e = {};
        return function(r, a) {
            var n = r + "|" + (a || "");
            return e[n] ? e[n] : e[n] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", a || "")
        }
    }(),
    Es = function() {
        var e = [
            ["nbsp", " "],
            ["middot", "·"],
            ["quot", '"'],
            ["apos", "'"],
            ["gt", ">"],
            ["lt", "<"],
            ["amp", "&"]
        ].map(function(t) {
            return [new RegExp("&" + t[0] + ";", "ig"), t[1]]
        });
        return function(r) {
            for (var a = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
            return a
        }
    }(),
    ko = function() {
        var e = {};
        return function(r) {
            return e[r] !== void 0 ? e[r] : e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g")
        }
    }(),
    Eo = /<\/?(?:vt:)?variant>/g,
    To = /<(?:vt:)([^>]*)>([\s\S]*)</;

function hi(e, t) {
    var r = me(e),
        a = e.match(ko(r.baseType)) || [],
        n = [];
    if (a.length != r.size) {
        if (t.WTF) throw new Error("unexpected vector length " + a.length + " != " + r.size);
        return n
    }
    return a.forEach(function(i) {
        var s = i.replace(Eo, "").match(To);
        s && n.push({
            v: Pe(s[2]),
            t: s[1]
        })
    }), n
}
var Ts = /(^\s|\s$|\n)/;

function lr(e, t) {
    return "<" + e + (t.match(Ts) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">"
}

function Da(e) {
    return Ke(e).map(function(t) {
        return " " + t + '="' + e[t] + '"'
    }).join("")
}

function ae(e, t, r) {
    return "<" + e + (r != null ? Da(r) : "") + (t != null ? (t.match(Ts) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">"
}

function G0(e, t) {
    try {
        return e.toISOString().replace(/\.\d*/, "")
    } catch (r) {
        if (t) throw r
    }
    return ""
}

function So(e, t) {
    switch (typeof e) {
        case "string":
            var r = ae("vt:lpwstr", Ne(e));
            return r = r.replace(/&quot;/g, "_x0022_"), r;
        case "number":
            return ae((e | 0) == e ? "vt:i4" : "vt:r8", Ne(String(e)));
        case "boolean":
            return ae("vt:bool", e ? "true" : "false")
    }
    if (e instanceof Date) return ae("vt:filetime", G0(e));
    throw new Error("Unable to serialize " + e)
}

function un(e) {
    if (Te && Buffer.isBuffer(e)) return e.toString("utf8");
    if (typeof e == "string") return e;
    if (typeof Uint8Array < "u" && e instanceof Uint8Array) return Pe(St(an(e)));
    throw new Error("Bad input format: expected Buffer or string")
}
var Oa = /<(\/?)([^\s?><!\/:]*:|)([^\s?<>:\/]+)(?:[\s?:\/][^>]*)?>/mg,
    ar = {
        CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
        CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
        EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
        CT: "http://schemas.openxmlformats.org/package/2006/content-types",
        RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
        TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
        dc: "http://purl.org/dc/elements/1.1/",
        dcterms: "http://purl.org/dc/terms/",
        dcmitype: "http://purl.org/dc/dcmitype/",
        mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
        r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
        vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        xsd: "http://www.w3.org/2001/XMLSchema"
    },
    Ht = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"],
    Cr = {
        o: "urn:schemas-microsoft-com:office:office",
        x: "urn:schemas-microsoft-com:office:excel",
        ss: "urn:schemas-microsoft-com:office:spreadsheet",
        dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
        mv: "http://macVmlSchemaUri",
        v: "urn:schemas-microsoft-com:vml",
        html: "http://www.w3.org/TR/REC-html40"
    };

function Fo(e, t) {
    for (var r = 1 - 2 * (e[t + 7] >>> 7), a = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), n = e[t + 6] & 15, i = 5; i >= 0; --i) n = n * 256 + e[t + i];
    return a == 2047 ? n == 0 ? r * (1 / 0) : NaN : (a == 0 ? a = -1022 : (a -= 1023, n += Math.pow(2, 52)), r * Math.pow(2, a - 52) * n)
}

function Ao(e, t, r) {
    var a = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7,
        n = 0,
        i = 0,
        s = a ? -t : t;
    isFinite(s) ? s == 0 ? n = i = 0 : (n = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - n), n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? n = -1022 : (i -= Math.pow(2, 52), n += 1023)) : (n = 2047, i = isNaN(t) ? 26985 : 0);
    for (var f = 0; f <= 5; ++f, i /= 256) e[r + f] = i & 255;
    e[r + 6] = (n & 15) << 4 | i & 15, e[r + 7] = n >> 4 | a
}
var ui = function(e) {
        for (var t = [], r = 10240, a = 0; a < e[0].length; ++a)
            if (e[0][a])
                for (var n = 0, i = e[0][a].length; n < i; n += r) t.push.apply(t, e[0][a].slice(n, n + r));
        return t
    },
    xi = Te ? function(e) {
        return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
            return Buffer.isBuffer(t) ? t : ht(t)
        })) : ui(e)
    } : ui,
    di = function(e, t, r) {
        for (var a = [], n = t; n < r; n += 2) a.push(String.fromCharCode(st(e, n)));
        return a.join("").replace(Tr, "")
    },
    xn = Te ? function(e, t, r) {
        return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Tr, "") : di(e, t, r)
    } : di,
    vi = function(e, t, r) {
        for (var a = [], n = t; n < t + r; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
        return a.join("")
    },
    Ss = Te ? function(e, t, r) {
        return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : vi(e, t, r)
    } : vi,
    pi = function(e, t, r) {
        for (var a = [], n = t; n < r; n++) a.push(String.fromCharCode(Jt(e, n)));
        return a.join("")
    },
    Wa = Te ? function(t, r, a) {
        return Buffer.isBuffer(t) ? t.toString("utf8", r, a) : pi(t, r, a)
    } : pi,
    Fs = function(e, t) {
        var r = Dr(e, t);
        return r > 0 ? Wa(e, t + 4, t + 4 + r - 1) : ""
    },
    As = Fs,
    ys = function(e, t) {
        var r = Dr(e, t);
        return r > 0 ? Wa(e, t + 4, t + 4 + r - 1) : ""
    },
    Cs = ys,
    Ds = function(e, t) {
        var r = 2 * Dr(e, t);
        return r > 0 ? Wa(e, t + 4, t + 4 + r - 1) : ""
    },
    Os = Ds,
    Is = function(t, r) {
        var a = Dr(t, r);
        return a > 0 ? xn(t, r + 4, r + 4 + a) : ""
    },
    Rs = Is,
    Ns = function(e, t) {
        var r = Dr(e, t);
        return r > 0 ? Wa(e, t + 4, t + 4 + r) : ""
    },
    bs = Ns,
    Ps = function(e, t) {
        return Fo(e, t)
    },
    l0 = Ps,
    dn = function(t) {
        return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array
    };
Te && (As = function(t, r) {
    if (!Buffer.isBuffer(t)) return Fs(t, r);
    var a = t.readUInt32LE(r);
    return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : ""
}, Cs = function(t, r) {
    if (!Buffer.isBuffer(t)) return ys(t, r);
    var a = t.readUInt32LE(r);
    return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : ""
}, Os = function(t, r) {
    if (!Buffer.isBuffer(t)) return Ds(t, r);
    var a = 2 * t.readUInt32LE(r);
    return t.toString("utf16le", r + 4, r + 4 + a - 1)
}, Rs = function(t, r) {
    if (!Buffer.isBuffer(t)) return Is(t, r);
    var a = t.readUInt32LE(r);
    return t.toString("utf16le", r + 4, r + 4 + a)
}, bs = function(t, r) {
    if (!Buffer.isBuffer(t)) return Ns(t, r);
    var a = t.readUInt32LE(r);
    return t.toString("utf8", r + 4, r + 4 + a)
}, l0 = function(t, r) {
    return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Ps(t, r)
}, dn = function(t) {
    return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array
});
var Jt = function(e, t) {
        return e[t]
    },
    st = function(e, t) {
        return e[t + 1] * 256 + e[t]
    },
    yo = function(e, t) {
        var r = e[t + 1] * 256 + e[t];
        return r < 32768 ? r : (65535 - r + 1) * -1
    },
    Dr = function(e, t) {
        return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t]
    },
    Dt = function(e, t) {
        return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]
    },
    Co = function(e, t) {
        return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
    };

function ga(e, t) {
    var r = "",
        a, n, i = [],
        s, f, c, o;
    switch (t) {
        case "dbcs":
            if (o = this.l, Te && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
            else
                for (c = 0; c < e; ++c) r += String.fromCharCode(st(this, o)), o += 2;
            e *= 2;
            break;
        case "utf8":
            r = Wa(this, this.l, this.l + e);
            break;
        case "utf16le":
            e *= 2, r = xn(this, this.l, this.l + e);
            break;
        case "wstr":
            return ga.call(this, e, "dbcs");
        case "lpstr-ansi":
            r = As(this, this.l), e = 4 + Dr(this, this.l);
            break;
        case "lpstr-cp":
            r = Cs(this, this.l), e = 4 + Dr(this, this.l);
            break;
        case "lpwstr":
            r = Os(this, this.l), e = 4 + 2 * Dr(this, this.l);
            break;
        case "lpp4":
            e = 4 + Dr(this, this.l), r = Rs(this, this.l), e & 2 && (e += 2);
            break;
        case "8lpp4":
            e = 4 + Dr(this, this.l), r = bs(this, this.l), e & 3 && (e += 4 - (e & 3));
            break;
        case "cstr":
            for (e = 0, r = "";
                (s = Jt(this, this.l + e++)) !== 0;) i.push(ja(s));
            r = i.join("");
            break;
        case "_wstr":
            for (e = 0, r = "";
                (s = st(this, this.l + e)) !== 0;) i.push(ja(s)), e += 2;
            e += 2, r = i.join("");
            break;
        case "dbcs-cont":
            for (r = "", o = this.l, c = 0; c < e; ++c) {
                if (this.lens && this.lens.indexOf(o) !== -1) return s = Jt(this, o), this.l = o + 1, f = ga.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
                i.push(ja(st(this, o))), o += 2
            }
            r = i.join(""), e *= 2;
            break;
        case "cpstr":
        case "sbcs-cont":
            for (r = "", o = this.l, c = 0; c != e; ++c) {
                if (this.lens && this.lens.indexOf(o) !== -1) return s = Jt(this, o), this.l = o + 1, f = ga.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
                i.push(ja(Jt(this, o))), o += 1
            }
            r = i.join("");
            break;
        default:
            switch (e) {
                case 1:
                    return a = Jt(this, this.l), this.l++, a;
                case 2:
                    return a = (t === "i" ? yo : st)(this, this.l), this.l += 2, a;
                case 4:
                case -4:
                    return t === "i" || !(this[this.l + 3] & 128) ? (a = (e > 0 ? Dt : Co)(this, this.l), this.l += 4, a) : (n = Dr(this, this.l), this.l += 4, n);
                case 8:
                case -8:
                    if (t === "f") return e == 8 ? n = l0(this, this.l) : n = l0([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, n;
                    e = 8;
                case 16:
                    r = Ss(this, this.l, e);
                    break
            }
    }
    return this.l += e, r
}
var Do = function(e, t, r) {
        e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255
    },
    Oo = function(e, t, r) {
        e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255
    },
    Io = function(e, t, r) {
        e[r] = t & 255, e[r + 1] = t >>> 8 & 255
    };

function Ro(e, t, r) {
    var a = 0,
        n = 0;
    if (r === "dbcs") {
        for (n = 0; n != t.length; ++n) Io(this, t.charCodeAt(n), this.l + 2 * n);
        a = 2 * t.length
    } else if (r === "sbcs") {
        for (t = t.replace(/[^\x00-\x7F]/g, "_"), n = 0; n != t.length; ++n) this[this.l + n] = t.charCodeAt(n) & 255;
        a = t.length
    } else if (r === "hex") {
        for (; n < e; ++n) this[this.l++] = parseInt(t.slice(2 * n, 2 * n + 2), 16) || 0;
        return this
    } else if (r === "utf16le") {
        var i = Math.min(this.l + e, this.length);
        for (n = 0; n < Math.min(t.length, e); ++n) {
            var s = t.charCodeAt(n);
            this[this.l++] = s & 255, this[this.l++] = s >> 8
        }
        for (; this.l < i;) this[this.l++] = 0;
        return this
    } else switch (e) {
        case 1:
            a = 1, this[this.l] = t & 255;
            break;
        case 2:
            a = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
            break;
        case 3:
            a = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
            break;
        case 4:
            a = 4, Do(this, t, this.l);
            break;
        case 8:
            if (a = 8, r === "f") {
                Ao(this, t, this.l);
                break
            }
        case 16:
            break;
        case -4:
            a = 4, Oo(this, t, this.l);
            break
    }
    return this.l += a, this
}

function Ls(e, t) {
    var r = Ss(this, this.l, e.length >> 1);
    if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
    this.l += e.length >> 1
}

function or(e, t) {
    e.l = t, e.read_shift = ga, e.chk = Ls, e.write_shift = Ro
}

function gr(e, t) {
    e.l += t
}

function X(e) {
    var t = wt(e);
    return or(t, 0), t
}

function ut(e, t, r) {
    if (e) {
        var a, n, i;
        or(e, e.l || 0);
        for (var s = e.length, f = 0, c = 0; e.l < s;) {
            f = e.read_shift(1), f & 128 && (f = (f & 127) + ((e.read_shift(1) & 127) << 7));
            var o = La[f] || La[65535];
            for (a = e.read_shift(1), i = a & 127, n = 1; n < 4 && a & 128; ++n) i += ((a = e.read_shift(1)) & 127) << 7 * n;
            c = e.l + i;
            var l = o.f && o.f(e, i, r);
            if (e.l = c, t(l, o, f)) return
        }
    }
}

function Fr() {
    var e = [],
        t = Te ? 256 : 2048,
        r = function(o) {
            var l = X(o);
            return or(l, 0), l
        },
        a = r(t),
        n = function() {
            a && (a.length > a.l && (a = a.slice(0, a.l), a.l = a.length), a.length > 0 && e.push(a), a = null)
        },
        i = function(o) {
            return a && o < a.length - a.l ? a : (n(), a = r(Math.max(o + 1, t)))
        },
        s = function() {
            return n(), sr(e)
        },
        f = function(o) {
            n(), a = o, a.l == null && (a.l = a.length), i(t)
        };
    return {
        next: i,
        push: f,
        end: s,
        _bufs: e
    }
}

function Y(e, t, r, a) {
    var n = +t,
        i;
    if (!isNaN(n)) {
        a || (a = La[n].p || (r || []).length || 0), i = 1 + (n >= 128 ? 1 : 0) + 1, a >= 128 && ++i, a >= 16384 && ++i, a >= 2097152 && ++i;
        var s = e.next(i);
        n <= 127 ? s.write_shift(1, n) : (s.write_shift(1, (n & 127) + 128), s.write_shift(1, n >> 7));
        for (var f = 0; f != 4; ++f)
            if (a >= 128) s.write_shift(1, (a & 127) + 128), a >>= 7;
            else {
                s.write_shift(1, a);
                break
            } a > 0 && dn(r) && e.push(r)
    }
}

function _a(e, t, r) {
    var a = We(e);
    if (t.s ? (a.cRel && (a.c += t.s.c), a.rRel && (a.r += t.s.r)) : (a.cRel && (a.c += t.c), a.rRel && (a.r += t.r)), !r || r.biff < 12) {
        for (; a.c >= 256;) a.c -= 256;
        for (; a.r >= 65536;) a.r -= 65536
    }
    return a
}

function mi(e, t, r) {
    var a = We(e);
    return a.s = _a(a.s, t.s, r), a.e = _a(a.e, t.s, r), a
}

function wa(e, t) {
    if (e.cRel && e.c < 0)
        for (e = We(e); e.c < 0;) e.c += t > 8 ? 16384 : 256;
    if (e.rRel && e.r < 0)
        for (e = We(e); e.r < 0;) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
    var r = pe(e);
    return !e.cRel && e.cRel != null && (r = Po(r)), !e.rRel && e.rRel != null && (r = No(r)), r
}

function I0(e, t) {
    return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + Ge(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Ge(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ze(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ze(e.e.r) : wa(e.s, t.biff) + ":" + wa(e.e, t.biff)
}

function vn(e) {
    return parseInt(bo(e), 10) - 1
}

function Ze(e) {
    return "" + (e + 1)
}

function No(e) {
    return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
}

function bo(e) {
    return e.replace(/\$(\d+)$/, "$1")
}

function pn(e) {
    for (var t = Lo(e), r = 0, a = 0; a !== t.length; ++a) r = 26 * r + t.charCodeAt(a) - 64;
    return r - 1
}

function Ge(e) {
    if (e < 0) throw new Error("invalid column " + e);
    var t = "";
    for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
    return t
}

function Po(e) {
    return e.replace(/^([A-Z])/, "$$$1")
}

function Lo(e) {
    return e.replace(/^\$([A-Z])/, "$1")
}

function Bo(e) {
    return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
}

function Xe(e) {
    for (var t = 0, r = 0, a = 0; a < e.length; ++a) {
        var n = e.charCodeAt(a);
        n >= 48 && n <= 57 ? t = 10 * t + (n - 48) : n >= 65 && n <= 90 && (r = 26 * r + (n - 64))
    }
    return {
        c: r - 1,
        r: t - 1
    }
}

function pe(e) {
    for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
    return r + (e.r + 1)
}

function Ar(e) {
    var t = e.indexOf(":");
    return t == -1 ? {
        s: Xe(e),
        e: Xe(e)
    } : {
        s: Xe(e.slice(0, t)),
        e: Xe(e.slice(t + 1))
    }
}

function we(e, t) {
    return typeof t > "u" || typeof t == "number" ? we(e.s, e.e) : (typeof e != "string" && (e = pe(e)), typeof t != "string" && (t = pe(t)), e == t ? e : e + ":" + t)
}

function De(e) {
    var t = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: 0
            }
        },
        r = 0,
        a = 0,
        n = 0,
        i = e.length;
    for (r = 0; a < i && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a) r = 26 * r + n;
    for (t.s.c = --r, r = 0; a < i && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a) r = 10 * r + n;
    if (t.s.r = --r, a === i || n != 10) return t.e.c = t.s.c, t.e.r = t.s.r, t;
    for (++a, r = 0; a != i && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a) r = 26 * r + n;
    for (t.e.c = --r, r = 0; a != i && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a) r = 10 * r + n;
    return t.e.r = --r, t
}

function gi(e, t) {
    var r = e.t == "d" && t instanceof Date;
    if (e.z != null) try {
        return e.w = Vr(e.z, r ? nr(t) : t)
    } catch {}
    try {
        return e.w = Vr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? nr(t) : t)
    } catch {
        return "" + t
    }
}

function lt(e, t, r) {
    return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? xt[e.v] || e.v : t == null ? gi(e, e.v) : gi(e, t))
}

function Ft(e, t) {
    var r = t && t.sheet ? t.sheet : "Sheet1",
        a = {};
    return a[r] = e, {
        SheetNames: [r],
        Sheets: a
    }
}

function Bs(e, t, r) {
    var a = r || {},
        n = e ? Array.isArray(e) : a.dense,
        i = e || (n ? [] : {}),
        s = 0,
        f = 0;
    if (i && a.origin != null) {
        if (typeof a.origin == "number") s = a.origin;
        else {
            var c = typeof a.origin == "string" ? Xe(a.origin) : a.origin;
            s = c.r, f = c.c
        }
        i["!ref"] || (i["!ref"] = "A1:A1")
    }
    var o = {
        s: {
            c: 1e7,
            r: 1e7
        },
        e: {
            c: 0,
            r: 0
        }
    };
    if (i["!ref"]) {
        var l = De(i["!ref"]);
        o.s.c = l.s.c, o.s.r = l.s.r, o.e.c = Math.max(o.e.c, l.e.c), o.e.r = Math.max(o.e.r, l.e.r), s == -1 && (o.e.r = s = l.e.r + 1)
    }
    for (var h = 0; h != t.length; ++h)
        if (t[h]) {
            if (!Array.isArray(t[h])) throw new Error("aoa_to_sheet expects an array of arrays");
            for (var x = 0; x != t[h].length; ++x)
                if (!(typeof t[h][x] > "u")) {
                    var d = {
                            v: t[h][x]
                        },
                        v = s + h,
                        u = f + x;
                    if (o.s.r > v && (o.s.r = v), o.s.c > u && (o.s.c = u), o.e.r < v && (o.e.r = v), o.e.c < u && (o.e.c = u), t[h][x] && typeof t[h][x] == "object" && !Array.isArray(t[h][x]) && !(t[h][x] instanceof Date)) d = t[h][x];
                    else if (Array.isArray(d.v) && (d.f = t[h][x][1], d.v = d.v[0]), d.v === null)
                        if (d.f) d.t = "n";
                        else if (a.nullError) d.t = "e", d.v = 0;
                    else if (a.sheetStubs) d.t = "z";
                    else continue;
                    else typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = a.dateNF || ve[14], a.cellDates ? (d.t = "d", d.w = Vr(d.z, nr(d.v))) : (d.t = "n", d.v = nr(d.v), d.w = Vr(d.z, d.v))) : d.t = "s";
                    if (n) i[v] || (i[v] = []), i[v][u] && i[v][u].z && (d.z = i[v][u].z), i[v][u] = d;
                    else {
                        var p = pe({
                            c: u,
                            r: v
                        });
                        i[p] && i[p].z && (d.z = i[p].z), i[p] = d
                    }
                }
        } return o.s.c < 1e7 && (i["!ref"] = we(o)), i
}

function fa(e, t) {
    return Bs(null, e, t)
}

function Mo(e) {
    return e.read_shift(4, "i")
}

function jr(e, t) {
    return t || (t = X(4)), t.write_shift(4, e), t
}

function mr(e) {
    var t = e.read_shift(4);
    return t === 0 ? "" : e.read_shift(t, "dbcs")
}

function fr(e, t) {
    var r = !1;
    return t == null && (r = !0, t = X(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t
}

function Uo(e) {
    return {
        ich: e.read_shift(2),
        ifnt: e.read_shift(2)
    }
}

function Wo(e, t) {
    return t || (t = X(4)), t.write_shift(2, 0), t.write_shift(2, 0), t
}

function mn(e, t) {
    var r = e.l,
        a = e.read_shift(1),
        n = mr(e),
        i = [],
        s = {
            t: n,
            h: n
        };
    if (a & 1) {
        for (var f = e.read_shift(4), c = 0; c != f; ++c) i.push(Uo(e));
        s.r = i
    } else s.r = [{
        ich: 0,
        ifnt: 0
    }];
    return e.l = r + t, s
}

function Ho(e, t) {
    var r = !1;
    return t == null && (r = !0, t = X(15 + 4 * e.t.length)), t.write_shift(1, 0), fr(e.t, t), r ? t.slice(0, t.l) : t
}
var Vo = mn;

function Go(e, t) {
    var r = !1;
    return t == null && (r = !0, t = X(23 + 4 * e.t.length)), t.write_shift(1, 1), fr(e.t, t), t.write_shift(4, 1), Wo({
        ich: 0,
        ifnt: 0
    }, t), r ? t.slice(0, t.l) : t
}

function Gr(e) {
    var t = e.read_shift(4),
        r = e.read_shift(2);
    return r += e.read_shift(1) << 16, e.l++, {
        c: t,
        iStyleRef: r
    }
}

function Vt(e, t) {
    return t == null && (t = X(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t
}

function Gt(e) {
    var t = e.read_shift(2);
    return t += e.read_shift(1) << 16, e.l++, {
        c: -1,
        iStyleRef: t
    }
}

function Xt(e, t) {
    return t == null && (t = X(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t
}
var Xo = mr,
    Ms = fr;

function gn(e) {
    var t = e.read_shift(4);
    return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs")
}

function h0(e, t) {
    var r = !1;
    return t == null && (r = !0, t = X(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t
}
var zo = mr,
    X0 = gn,
    _n = h0;

function wn(e) {
    var t = e.slice(e.l, e.l + 4),
        r = t[0] & 1,
        a = t[0] & 2;
    e.l += 4;
    var n = a === 0 ? l0([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : Dt(t, 0) >> 2;
    return r ? n / 100 : n
}

function Us(e, t) {
    t == null && (t = X(4));
    var r = 0,
        a = 0,
        n = e * 100;
    if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? a = 1 : n == (n | 0) && n >= -(1 << 29) && n < 1 << 29 && (a = 1, r = 1), a) t.write_shift(-4, ((r ? n : e) << 2) + (r + 2));
    else throw new Error("unsupported RkNumber " + e)
}

function Ws(e) {
    var t = {
        s: {},
        e: {}
    };
    return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t
}

function $o(e, t) {
    return t || (t = X(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t
}
var zt = Ws,
    ca = $o;

function pr(e) {
    if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
    return e.read_shift(8, "f")
}

function Bt(e, t) {
    return (t || X(8)).write_shift(8, e, "f")
}

function Ko(e) {
    var t = {},
        r = e.read_shift(1),
        a = r >>> 1,
        n = e.read_shift(1),
        i = e.read_shift(2, "i"),
        s = e.read_shift(1),
        f = e.read_shift(1),
        c = e.read_shift(1);
    switch (e.l++, a) {
        case 0:
            t.auto = 1;
            break;
        case 1:
            t.index = n;
            var o = It[n];
            o && (t.rgb = Ra(o));
            break;
        case 2:
            t.rgb = Ra([s, f, c]);
            break;
        case 3:
            t.theme = n;
            break
    }
    return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t
}

function u0(e, t) {
    if (t || (t = X(8)), !e || e.auto) return t.write_shift(4, 0), t.write_shift(4, 0), t;
    e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
    var r = e.tint || 0;
    if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null) t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
    else {
        var a = e.rgb || "FFFFFF";
        typeof a == "number" && (a = ("000000" + a.toString(16)).slice(-6)), t.write_shift(1, parseInt(a.slice(0, 2), 16)), t.write_shift(1, parseInt(a.slice(2, 4), 16)), t.write_shift(1, parseInt(a.slice(4, 6), 16)), t.write_shift(1, 255)
    }
    return t
}

function jo(e) {
    var t = e.read_shift(1);
    e.l++;
    var r = {
        fBold: t & 1,
        fItalic: t & 2,
        fUnderline: t & 4,
        fStrikeout: t & 8,
        fOutline: t & 16,
        fShadow: t & 32,
        fCondense: t & 64,
        fExtend: t & 128
    };
    return r
}

function Yo(e, t) {
    t || (t = X(2));
    var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
    return t.write_shift(1, r), t.write_shift(1, 0), t
}

function Hs(e, t) {
    var r = {
            2: "BITMAP",
            3: "METAFILEPICT",
            8: "DIB",
            14: "ENHMETAFILE"
        },
        a = e.read_shift(4);
    switch (a) {
        case 0:
            return "";
        case 4294967295:
        case 4294967294:
            return r[e.read_shift(4)] || ""
    }
    if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
    return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr")
}

function Jo(e) {
    return Hs(e, 1)
}

function Zo(e) {
    return Hs(e, 2)
}
var kn = 2,
    Sr = 3,
    Ja = 11,
    _i = 12,
    x0 = 19,
    Za = 64,
    qo = 65,
    Qo = 71,
    el = 4108,
    rl = 4126,
    ir = 80,
    Vs = 81,
    tl = [ir, Vs],
    z0 = {
        1: {
            n: "CodePage",
            t: kn
        },
        2: {
            n: "Category",
            t: ir
        },
        3: {
            n: "PresentationFormat",
            t: ir
        },
        4: {
            n: "ByteCount",
            t: Sr
        },
        5: {
            n: "LineCount",
            t: Sr
        },
        6: {
            n: "ParagraphCount",
            t: Sr
        },
        7: {
            n: "SlideCount",
            t: Sr
        },
        8: {
            n: "NoteCount",
            t: Sr
        },
        9: {
            n: "HiddenCount",
            t: Sr
        },
        10: {
            n: "MultimediaClipCount",
            t: Sr
        },
        11: {
            n: "ScaleCrop",
            t: Ja
        },
        12: {
            n: "HeadingPairs",
            t: el
        },
        13: {
            n: "TitlesOfParts",
            t: rl
        },
        14: {
            n: "Manager",
            t: ir
        },
        15: {
            n: "Company",
            t: ir
        },
        16: {
            n: "LinksUpToDate",
            t: Ja
        },
        17: {
            n: "CharacterCount",
            t: Sr
        },
        19: {
            n: "SharedDoc",
            t: Ja
        },
        22: {
            n: "HyperlinksChanged",
            t: Ja
        },
        23: {
            n: "AppVersion",
            t: Sr,
            p: "version"
        },
        24: {
            n: "DigSig",
            t: qo
        },
        26: {
            n: "ContentType",
            t: ir
        },
        27: {
            n: "ContentStatus",
            t: ir
        },
        28: {
            n: "Language",
            t: ir
        },
        29: {
            n: "Version",
            t: ir
        },
        255: {},
        2147483648: {
            n: "Locale",
            t: x0
        },
        2147483651: {
            n: "Behavior",
            t: x0
        },
        1919054434: {}
    },
    $0 = {
        1: {
            n: "CodePage",
            t: kn
        },
        2: {
            n: "Title",
            t: ir
        },
        3: {
            n: "Subject",
            t: ir
        },
        4: {
            n: "Author",
            t: ir
        },
        5: {
            n: "Keywords",
            t: ir
        },
        6: {
            n: "Comments",
            t: ir
        },
        7: {
            n: "Template",
            t: ir
        },
        8: {
            n: "LastAuthor",
            t: ir
        },
        9: {
            n: "RevNumber",
            t: ir
        },
        10: {
            n: "EditTime",
            t: Za
        },
        11: {
            n: "LastPrinted",
            t: Za
        },
        12: {
            n: "CreatedDate",
            t: Za
        },
        13: {
            n: "ModifiedDate",
            t: Za
        },
        14: {
            n: "PageCount",
            t: Sr
        },
        15: {
            n: "WordCount",
            t: Sr
        },
        16: {
            n: "CharCount",
            t: Sr
        },
        17: {
            n: "Thumbnail",
            t: Qo
        },
        18: {
            n: "Application",
            t: ir
        },
        19: {
            n: "DocSecurity",
            t: Sr
        },
        255: {},
        2147483648: {
            n: "Locale",
            t: x0
        },
        2147483651: {
            n: "Behavior",
            t: x0
        },
        1919054434: {}
    },
    wi = {
        1: "US",
        2: "CA",
        3: "",
        7: "RU",
        20: "EG",
        30: "GR",
        31: "NL",
        32: "BE",
        33: "FR",
        34: "ES",
        36: "HU",
        39: "IT",
        41: "CH",
        43: "AT",
        44: "GB",
        45: "DK",
        46: "SE",
        47: "NO",
        48: "PL",
        49: "DE",
        52: "MX",
        55: "BR",
        61: "AU",
        64: "NZ",
        66: "TH",
        81: "JP",
        82: "KR",
        84: "VN",
        86: "CN",
        90: "TR",
        105: "JS",
        213: "DZ",
        216: "MA",
        218: "LY",
        351: "PT",
        354: "IS",
        358: "FI",
        420: "CZ",
        886: "TW",
        961: "LB",
        962: "JO",
        963: "SY",
        964: "IQ",
        965: "KW",
        966: "SA",
        971: "AE",
        972: "IL",
        974: "QA",
        981: "IR",
        65535: "US"
    },
    al = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];

function nl(e) {
    return e.map(function(t) {
        return [t >> 16 & 255, t >> 8 & 255, t & 255]
    })
}
var il = nl([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    It = We(il),
    xt = {
        0: "#NULL!",
        7: "#DIV/0!",
        15: "#VALUE!",
        23: "#REF!",
        29: "#NAME?",
        36: "#NUM!",
        42: "#N/A",
        43: "#GETTING_DATA",
        255: "#WTF?"
    },
    Gs = {
        "#NULL!": 0,
        "#DIV/0!": 7,
        "#VALUE!": 15,
        "#REF!": 23,
        "#NAME?": 29,
        "#NUM!": 36,
        "#N/A": 42,
        "#GETTING_DATA": 43,
        "#WTF?": 255
    },
    K0 = {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
        "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
        "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
        "application/vnd.ms-excel.worksheet": "sheets",
        "application/vnd.ms-excel.binIndexWs": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
        "application/vnd.ms-excel.chartsheet": "charts",
        "application/vnd.ms-excel.macrosheet+xml": "macros",
        "application/vnd.ms-excel.macrosheet": "macros",
        "application/vnd.ms-excel.intlmacrosheet": "TODO",
        "application/vnd.ms-excel.binIndexMs": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
        "application/vnd.ms-excel.dialogsheet": "dialogs",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
        "application/vnd.ms-excel.sharedStrings": "strs",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
        "application/vnd.ms-excel.styles": "styles",
        "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
        "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
        "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
        "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
        "application/vnd.ms-excel.comments": "comments",
        "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
        "application/vnd.ms-excel.person+xml": "people",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
        "application/vnd.ms-excel.sheetMetadata": "metadata",
        "application/vnd.ms-excel.pivotTable": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
        "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
        "application/vnd.ms-office.chartstyle+xml": "TODO",
        "application/vnd.ms-office.chartex+xml": "TODO",
        "application/vnd.ms-excel.calcChain": "calcchains",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
        "application/vnd.ms-office.activeX": "TODO",
        "application/vnd.ms-office.activeX+xml": "TODO",
        "application/vnd.ms-excel.attachedToolbars": "TODO",
        "application/vnd.ms-excel.connections": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
        "application/vnd.ms-excel.externalLink": "links",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
        "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
        "application/vnd.ms-excel.pivotCacheRecords": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
        "application/vnd.ms-excel.queryTable": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
        "application/vnd.ms-excel.userNames": "TODO",
        "application/vnd.ms-excel.revisionHeaders": "TODO",
        "application/vnd.ms-excel.revisionLog": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
        "application/vnd.ms-excel.tableSingleCells": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
        "application/vnd.ms-excel.slicer": "TODO",
        "application/vnd.ms-excel.slicerCache": "TODO",
        "application/vnd.ms-excel.slicer+xml": "TODO",
        "application/vnd.ms-excel.slicerCache+xml": "TODO",
        "application/vnd.ms-excel.wsSortMap": "TODO",
        "application/vnd.ms-excel.table": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
        "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
        "application/vnd.ms-excel.Timeline+xml": "TODO",
        "application/vnd.ms-excel.TimelineCache+xml": "TODO",
        "application/vnd.ms-office.vbaProject": "vba",
        "application/vnd.ms-office.vbaProjectSignature": "TODO",
        "application/vnd.ms-office.volatileDependencies": "TODO",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
        "application/vnd.ms-excel.controlproperties+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.model+data": "TODO",
        "application/vnd.ms-excel.Survey+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
        "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
        "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
        "application/vnd.openxmlformats-package.relationships+xml": "rels",
        "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
        "image/png": "TODO",
        sheet: "js"
    },
    qa = {
        workbooks: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
            xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
            xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
            xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
            xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
        },
        strs: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
            xlsb: "application/vnd.ms-excel.sharedStrings"
        },
        comments: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
            xlsb: "application/vnd.ms-excel.comments"
        },
        sheets: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
            xlsb: "application/vnd.ms-excel.worksheet"
        },
        charts: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
            xlsb: "application/vnd.ms-excel.chartsheet"
        },
        dialogs: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
            xlsb: "application/vnd.ms-excel.dialogsheet"
        },
        macros: {
            xlsx: "application/vnd.ms-excel.macrosheet+xml",
            xlsb: "application/vnd.ms-excel.macrosheet"
        },
        metadata: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
            xlsb: "application/vnd.ms-excel.sheetMetadata"
        },
        styles: {
            xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
            xlsb: "application/vnd.ms-excel.styles"
        }
    };

function En() {
    return {
        workbooks: [],
        sheets: [],
        charts: [],
        dialogs: [],
        macros: [],
        rels: [],
        strs: [],
        comments: [],
        threadedcomments: [],
        links: [],
        coreprops: [],
        extprops: [],
        custprops: [],
        themes: [],
        styles: [],
        calcchains: [],
        vba: [],
        drawings: [],
        metadata: [],
        people: [],
        TODO: [],
        xmlns: ""
    }
}

function sl(e) {
    var t = En();
    if (!e || !e.match) return t;
    var r = {};
    if ((e.match(_r) || []).forEach(function(a) {
            var n = me(a);
            switch (n[0].replace(po, "<")) {
                case "<?xml":
                    break;
                case "<Types":
                    t.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
                    break;
                case "<Default":
                    r[n.Extension] = n.ContentType;
                    break;
                case "<Override":
                    t[K0[n.ContentType]] !== void 0 && t[K0[n.ContentType]].push(n.PartName);
                    break
            }
        }), t.xmlns !== ar.CT) throw new Error("Unknown Namespace: " + t.xmlns);
    return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t
}

function Xs(e, t) {
    var r = io(K0),
        a = [],
        n;
    a[a.length] = qe, a[a.length] = ae("Types", null, {
        xmlns: ar.CT,
        "xmlns:xsd": ar.xsd,
        "xmlns:xsi": ar.xsi
    }), a = a.concat([
        ["xml", "application/xml"],
        ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
        ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
        ["data", "application/vnd.openxmlformats-officedocument.model+data"],
        ["bmp", "image/bmp"],
        ["png", "image/png"],
        ["gif", "image/gif"],
        ["emf", "image/x-emf"],
        ["wmf", "image/x-wmf"],
        ["jpg", "image/jpeg"],
        ["jpeg", "image/jpeg"],
        ["tif", "image/tiff"],
        ["tiff", "image/tiff"],
        ["pdf", "application/pdf"],
        ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
    ].map(function(c) {
        return ae("Default", null, {
            Extension: c[0],
            ContentType: c[1]
        })
    }));
    var i = function(c) {
            e[c] && e[c].length > 0 && (n = e[c][0], a[a.length] = ae("Override", null, {
                PartName: (n[0] == "/" ? "" : "/") + n,
                ContentType: qa[c][t.bookType] || qa[c].xlsx
            }))
        },
        s = function(c) {
            (e[c] || []).forEach(function(o) {
                a[a.length] = ae("Override", null, {
                    PartName: (o[0] == "/" ? "" : "/") + o,
                    ContentType: qa[c][t.bookType] || qa[c].xlsx
                })
            })
        },
        f = function(c) {
            (e[c] || []).forEach(function(o) {
                a[a.length] = ae("Override", null, {
                    PartName: (o[0] == "/" ? "" : "/") + o,
                    ContentType: r[c][0]
                })
            })
        };
    return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), a.length > 2 && (a[a.length] = "</Types>", a[1] = a[1].replace("/>", ">")), a.join("")
}
var Fe = {
    WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
    VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
    XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
    XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
    XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
    CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
    CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
    CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
    CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
    EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
    CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
    SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
    STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
    THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
    CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
    CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
    CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
    WS: ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"],
    DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
    MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
    IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
    DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
    XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
    TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
    PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
    VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};

function Ia(e) {
    var t = e.lastIndexOf("/");
    return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels"
}

function ka(e, t) {
    var r = {
        "!id": {}
    };
    if (!e) return r;
    t.charAt(0) !== "/" && (t = "/" + t);
    var a = {};
    return (e.match(_r) || []).forEach(function(n) {
        var i = me(n);
        if (i[0] === "<Relationship") {
            var s = {};
            s.Type = i.Type, s.Target = i.Target, s.Id = i.Id, i.TargetMode && (s.TargetMode = i.TargetMode);
            var f = i.TargetMode === "External" ? i.Target : ma(i.Target, t);
            r[f] = s, a[i.Id] = s
        }
    }), r["!id"] = a, r
}

function Qt(e) {
    var t = [qe, ae("Relationships", null, {
        xmlns: ar.RELS
    })];
    return Ke(e["!id"]).forEach(function(r) {
        t[t.length] = ae("Relationship", null, e["!id"][r])
    }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("")
}

function Re(e, t, r, a, n, i) {
    if (n || (n = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
        for (t = e["!idx"]; e["!id"]["rId" + t]; ++t);
    if (e["!idx"] = t + 1, n.Id = "rId" + t, n.Type = a, n.Target = r, [Fe.HLINK, Fe.XPATH, Fe.XMISS].indexOf(n.Type) > -1 && (n.TargetMode = "External"), e["!id"][n.Id]) throw new Error("Cannot rewrite rId " + t);
    return e["!id"][n.Id] = n, e[("/" + n.Target).replace("//", "/")] = n, t
}
var fl = "application/vnd.oasis.opendocument.spreadsheet";

function cl(e, t) {
    for (var r = un(e), a, n; a = Oa.exec(r);) switch (a[3]) {
        case "manifest":
            break;
        case "file-entry":
            if (n = me(a[0], !1), n.path == "/" && n.type !== fl) throw new Error("This OpenDocument is not a spreadsheet");
            break;
        case "encryption-data":
        case "algorithm":
        case "start-key-generation":
        case "key-derivation":
            throw new Error("Unsupported ODS Encryption");
        default:
            if (t && t.WTF) throw a
    }
}

function ol(e) {
    var t = [qe];
    t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
    for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
    return t.push("</manifest:manifest>"), t.join("")
}

function ki(e, t, r) {
    return ['  <rdf:Description rdf:about="' + e + `">
`, '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`, `  </rdf:Description>
`].join("")
}

function ll(e, t) {
    return ['  <rdf:Description rdf:about="' + e + `">
`, '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`, `  </rdf:Description>
`].join("")
}

function hl(e) {
    var t = [qe];
    t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
    for (var r = 0; r != e.length; ++r) t.push(ki(e[r][0], e[r][1])), t.push(ll("", e[r][0]));
    return t.push(ki("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("")
}

function zs() {
    return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + i0.version + "</meta:generator></office:meta></office:document-meta>"
}
var Hr = [
        ["cp:category", "Category"],
        ["cp:contentStatus", "ContentStatus"],
        ["cp:keywords", "Keywords"],
        ["cp:lastModifiedBy", "LastAuthor"],
        ["cp:lastPrinted", "LastPrinted"],
        ["cp:revision", "RevNumber"],
        ["cp:version", "Version"],
        ["dc:creator", "Author"],
        ["dc:description", "Comments"],
        ["dc:identifier", "Identifier"],
        ["dc:language", "Language"],
        ["dc:subject", "Subject"],
        ["dc:title", "Title"],
        ["dcterms:created", "CreatedDate", "date"],
        ["dcterms:modified", "ModifiedDate", "date"]
    ],
    ul = function() {
        for (var e = new Array(Hr.length), t = 0; t < Hr.length; ++t) {
            var r = Hr[t],
                a = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
            e[t] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
        }
        return e
    }();

function $s(e) {
    var t = {};
    e = Pe(e);
    for (var r = 0; r < Hr.length; ++r) {
        var a = Hr[r],
            n = e.match(ul[r]);
        n != null && n.length > 0 && (t[a[1]] = Ce(n[1])), a[2] === "date" && t[a[1]] && (t[a[1]] = Ue(t[a[1]]))
    }
    return t
}

function R0(e, t, r, a, n) {
    n[e] != null || t == null || t === "" || (n[e] = t, t = Ne(t), a[a.length] = r ? ae(e, t, r) : lr(e, t))
}

function Ks(e, t) {
    var r = t || {},
        a = [qe, ae("cp:coreProperties", null, {
            "xmlns:cp": ar.CORE_PROPS,
            "xmlns:dc": ar.dc,
            "xmlns:dcterms": ar.dcterms,
            "xmlns:dcmitype": ar.dcmitype,
            "xmlns:xsi": ar.xsi
        })],
        n = {};
    if (!e && !r.Props) return a.join("");
    e && (e.CreatedDate != null && R0("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : G0(e.CreatedDate, r.WTF), {
        "xsi:type": "dcterms:W3CDTF"
    }, a, n), e.ModifiedDate != null && R0("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : G0(e.ModifiedDate, r.WTF), {
        "xsi:type": "dcterms:W3CDTF"
    }, a, n));
    for (var i = 0; i != Hr.length; ++i) {
        var s = Hr[i],
            f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
        f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && R0(s[0], f, null, a, n)
    }
    return a.length > 2 && (a[a.length] = "</cp:coreProperties>", a[1] = a[1].replace("/>", ">")), a.join("")
}
var Rt = [
        ["Application", "Application", "string"],
        ["AppVersion", "AppVersion", "string"],
        ["Company", "Company", "string"],
        ["DocSecurity", "DocSecurity", "string"],
        ["Manager", "Manager", "string"],
        ["HyperlinksChanged", "HyperlinksChanged", "bool"],
        ["SharedDoc", "SharedDoc", "bool"],
        ["LinksUpToDate", "LinksUpToDate", "bool"],
        ["ScaleCrop", "ScaleCrop", "bool"],
        ["HeadingPairs", "HeadingPairs", "raw"],
        ["TitlesOfParts", "TitlesOfParts", "raw"]
    ],
    js = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];

function Ys(e, t, r, a) {
    var n = [];
    if (typeof e == "string") n = hi(e, a);
    else
        for (var i = 0; i < e.length; ++i) n = n.concat(e[i].map(function(l) {
            return {
                v: l
            }
        }));
    var s = typeof t == "string" ? hi(t, a).map(function(l) {
            return l.v
        }) : t,
        f = 0,
        c = 0;
    if (s.length > 0)
        for (var o = 0; o !== n.length; o += 2) {
            switch (c = +n[o + 1].v, n[o].v) {
                case "Worksheets":
                case "工作表":
                case "Листы":
                case "أوراق العمل":
                case "ワークシート":
                case "גליונות עבודה":
                case "Arbeitsblätter":
                case "Çalışma Sayfaları":
                case "Feuilles de calcul":
                case "Fogli di lavoro":
                case "Folhas de cálculo":
                case "Planilhas":
                case "Regneark":
                case "Hojas de cálculo":
                case "Werkbladen":
                    r.Worksheets = c, r.SheetNames = s.slice(f, f + c);
                    break;
                case "Named Ranges":
                case "Rangos con nombre":
                case "名前付き一覧":
                case "Benannte Bereiche":
                case "Navngivne områder":
                    r.NamedRanges = c, r.DefinedNames = s.slice(f, f + c);
                    break;
                case "Charts":
                case "Diagramme":
                    r.Chartsheets = c, r.ChartNames = s.slice(f, f + c);
                    break
            }
            f += c
        }
}

function xl(e, t, r) {
    var a = {};
    return t || (t = {}), e = Pe(e), Rt.forEach(function(n) {
        var i = (e.match(Ca(n[0])) || [])[1];
        switch (n[2]) {
            case "string":
                i && (t[n[1]] = Ce(i));
                break;
            case "bool":
                t[n[1]] = i === "true";
                break;
            case "raw":
                var s = e.match(new RegExp("<" + n[0] + "[^>]*>([\\s\\S]*?)</" + n[0] + ">"));
                s && s.length > 0 && (a[n[1]] = s[1]);
                break
        }
    }), a.HeadingPairs && a.TitlesOfParts && Ys(a.HeadingPairs, a.TitlesOfParts, t, r), t
}

function Js(e) {
    var t = [],
        r = ae;
    return e || (e = {}), e.Application = "SheetJS", t[t.length] = qe, t[t.length] = ae("Properties", null, {
        xmlns: ar.EXT_PROPS,
        "xmlns:vt": ar.vt
    }), Rt.forEach(function(a) {
        if (e[a[1]] !== void 0) {
            var n;
            switch (a[2]) {
                case "string":
                    n = Ne(String(e[a[1]]));
                    break;
                case "bool":
                    n = e[a[1]] ? "true" : "false";
                    break
            }
            n !== void 0 && (t[t.length] = r(a[0], n))
        }
    }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), {
        size: 2,
        baseType: "variant"
    })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(a) {
        return "<vt:lpstr>" + Ne(a) + "</vt:lpstr>"
    }).join(""), {
        size: e.Worksheets,
        baseType: "lpstr"
    })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("")
}
var dl = /<[^>]+>[^<]*/g;

function vl(e, t) {
    var r = {},
        a = "",
        n = e.match(dl);
    if (n)
        for (var i = 0; i != n.length; ++i) {
            var s = n[i],
                f = me(s);
            switch (f[0]) {
                case "<?xml":
                    break;
                case "<Properties":
                    break;
                case "<property":
                    a = Ce(f.name);
                    break;
                case "</property>":
                    a = null;
                    break;
                default:
                    if (s.indexOf("<vt:") === 0) {
                        var c = s.split(">"),
                            o = c[0].slice(4),
                            l = c[1];
                        switch (o) {
                            case "lpstr":
                            case "bstr":
                            case "lpwstr":
                                r[a] = Ce(l);
                                break;
                            case "bool":
                                r[a] = Me(l);
                                break;
                            case "i1":
                            case "i2":
                            case "i4":
                            case "i8":
                            case "int":
                            case "uint":
                                r[a] = parseInt(l, 10);
                                break;
                            case "r4":
                            case "r8":
                            case "decimal":
                                r[a] = parseFloat(l);
                                break;
                            case "filetime":
                            case "date":
                                r[a] = Ue(l);
                                break;
                            case "cy":
                            case "error":
                                r[a] = Ce(l);
                                break;
                            default:
                                if (o.slice(-1) == "/") break;
                                t.WTF && typeof console < "u" && console.warn("Unexpected", s, o, c)
                        }
                    } else if (s.slice(0, 2) !== "</") {
                        if (t.WTF) throw new Error(s)
                    }
            }
        }
    return r
}

function Zs(e) {
    var t = [qe, ae("Properties", null, {
        xmlns: ar.CUST_PROPS,
        "xmlns:vt": ar.vt
    })];
    if (!e) return t.join("");
    var r = 1;
    return Ke(e).forEach(function(n) {
        ++r, t[t.length] = ae("property", So(e[n]), {
            fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
            pid: r,
            name: Ne(n)
        })
    }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("")
}
var j0 = {
        Title: "Title",
        Subject: "Subject",
        Author: "Author",
        Keywords: "Keywords",
        Comments: "Description",
        LastAuthor: "LastAuthor",
        RevNumber: "Revision",
        Application: "AppName",
        LastPrinted: "LastPrinted",
        CreatedDate: "Created",
        ModifiedDate: "LastSaved",
        Category: "Category",
        Manager: "Manager",
        Company: "Company",
        AppVersion: "Version",
        ContentStatus: "ContentStatus",
        Identifier: "Identifier",
        Language: "Language"
    },
    N0;

function pl(e, t, r) {
    N0 || (N0 = w0(j0)), t = N0[t] || t, e[t] = r
}

function ml(e, t) {
    var r = [];
    return Ke(j0).map(function(a) {
        for (var n = 0; n < Hr.length; ++n)
            if (Hr[n][1] == a) return Hr[n];
        for (n = 0; n < Rt.length; ++n)
            if (Rt[n][1] == a) return Rt[n];
        throw a
    }).forEach(function(a) {
        if (e[a[1]] != null) {
            var n = t && t.Props && t.Props[a[1]] != null ? t.Props[a[1]] : e[a[1]];
            switch (a[2]) {
                case "date":
                    n = new Date(n).toISOString().replace(/\.\d*Z/, "Z");
                    break
            }
            typeof n == "number" ? n = String(n) : n === !0 || n === !1 ? n = n ? "1" : "0" : n instanceof Date && (n = new Date(n).toISOString().replace(/\.\d*Z/, "")), r.push(lr(j0[a[1]] || a[1], n))
        }
    }), ae("DocumentProperties", r.join(""), {
        xmlns: Cr.o
    })
}

function gl(e, t) {
    var r = ["Worksheets", "SheetNames"],
        a = "CustomDocumentProperties",
        n = [];
    return e && Ke(e).forEach(function(i) {
        if (Object.prototype.hasOwnProperty.call(e, i)) {
            for (var s = 0; s < Hr.length; ++s)
                if (i == Hr[s][1]) return;
            for (s = 0; s < Rt.length; ++s)
                if (i == Rt[s][1]) return;
            for (s = 0; s < r.length; ++s)
                if (i == r[s]) return;
            var f = e[i],
                c = "string";
            typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), n.push(ae(fi(i), f, {
                "dt:dt": c
            }))
        }
    }), t && Ke(t).forEach(function(i) {
        if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
            var s = t[i],
                f = "string";
            typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), n.push(ae(fi(i), s, {
                "dt:dt": f
            }))
        }
    }), "<" + a + ' xmlns="' + Cr.o + '">' + n.join("") + "</" + a + ">"
}

function Tn(e) {
    var t = e.read_shift(4),
        r = e.read_shift(4);
    return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "")
}

function _l(e) {
    var t = typeof e == "string" ? new Date(Date.parse(e)) : e,
        r = t.getTime() / 1e3 + 11644473600,
        a = r % Math.pow(2, 32),
        n = (r - a) / Math.pow(2, 32);
    a *= 1e7, n *= 1e7;
    var i = a / Math.pow(2, 32) | 0;
    i > 0 && (a = a % Math.pow(2, 32), n += i);
    var s = X(8);
    return s.write_shift(4, a), s.write_shift(4, n), s
}

function qs(e, t, r) {
    var a = e.l,
        n = e.read_shift(0, "lpstr-cp");
    if (r)
        for (; e.l - a & 3;) ++e.l;
    return n
}

function Qs(e, t, r) {
    var a = e.read_shift(0, "lpwstr");
    return a
}

function ef(e, t, r) {
    return t === 31 ? Qs(e) : qs(e, t, r)
}

function Y0(e, t, r) {
    return ef(e, t, r === !1 ? 0 : 4)
}

function wl(e, t) {
    if (!t) throw new Error("VtUnalignedString must have positive length");
    return ef(e, t, 0)
}

function kl(e) {
    for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) {
        var n = e.l;
        r[a] = e.read_shift(0, "lpwstr").replace(Tr, ""), e.l - n & 2 && (e.l += 2)
    }
    return r
}

function El(e) {
    for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) r[a] = e.read_shift(0, "lpstr-cp").replace(Tr, "");
    return r
}

function Tl(e) {
    var t = e.l,
        r = d0(e, Vs);
    e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
    var a = d0(e, Sr);
    return [r, a]
}

function Sl(e) {
    for (var t = e.read_shift(4), r = [], a = 0; a < t / 2; ++a) r.push(Tl(e));
    return r
}

function Ei(e, t) {
    for (var r = e.read_shift(4), a = {}, n = 0; n != r; ++n) {
        var i = e.read_shift(4),
            s = e.read_shift(4);
        a[i] = e.read_shift(s, t === 1200 ? "utf16le" : "utf8").replace(Tr, "").replace(pa, "!"), t === 1200 && s % 2 && (e.l += 2)
    }
    return e.l & 3 && (e.l = e.l >> 3 << 2), a
}

function rf(e) {
    var t = e.read_shift(4),
        r = e.slice(e.l, e.l + t);
    return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r
}

function Fl(e) {
    var t = {};
    return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t
}

function d0(e, t, r) {
    var a = e.read_shift(2),
        n, i = r || {};
    if (e.l += 2, t !== _i && a !== t && tl.indexOf(t) === -1 && !((t & 65534) == 4126 && (a & 65534) == 4126)) throw new Error("Expected type " + t + " saw " + a);
    switch (t === _i ? a : t) {
        case 2:
            return n = e.read_shift(2, "i"), i.raw || (e.l += 2), n;
        case 3:
            return n = e.read_shift(4, "i"), n;
        case 11:
            return e.read_shift(4) !== 0;
        case 19:
            return n = e.read_shift(4), n;
        case 30:
            return qs(e, a, 4).replace(Tr, "");
        case 31:
            return Qs(e);
        case 64:
            return Tn(e);
        case 65:
            return rf(e);
        case 71:
            return Fl(e);
        case 80:
            return Y0(e, a, !i.raw).replace(Tr, "");
        case 81:
            return wl(e, a).replace(Tr, "");
        case 4108:
            return Sl(e);
        case 4126:
        case 4127:
            return a == 4127 ? kl(e) : El(e);
        default:
            throw new Error("TypedPropertyValue unrecognized type " + t + " " + a)
    }
}

function Ti(e, t) {
    var r = X(4),
        a = X(4);
    switch (r.write_shift(4, e == 80 ? 31 : e), e) {
        case 3:
            a.write_shift(-4, t);
            break;
        case 5:
            a = X(8), a.write_shift(8, t, "f");
            break;
        case 11:
            a.write_shift(4, t ? 1 : 0);
            break;
        case 64:
            a = _l(t);
            break;
        case 31:
        case 80:
            for (a = X(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), a.write_shift(4, t.length + 1), a.write_shift(0, t, "dbcs"); a.l != a.length;) a.write_shift(1, 0);
            break;
        default:
            throw new Error("TypedPropertyValue unrecognized type " + e + " " + t)
    }
    return sr([r, a])
}

function Si(e, t) {
    var r = e.l,
        a = e.read_shift(4),
        n = e.read_shift(4),
        i = [],
        s = 0,
        f = 0,
        c = -1,
        o = {};
    for (s = 0; s != n; ++s) {
        var l = e.read_shift(4),
            h = e.read_shift(4);
        i[s] = [l, h + r]
    }
    i.sort(function(A, g) {
        return A[1] - g[1]
    });
    var x = {};
    for (s = 0; s != n; ++s) {
        if (e.l !== i[s][1]) {
            var d = !0;
            if (s > 0 && t) switch (t[i[s - 1][0]].t) {
                case 2:
                    e.l + 2 === i[s][1] && (e.l += 2, d = !1);
                    break;
                case 80:
                    e.l <= i[s][1] && (e.l = i[s][1], d = !1);
                    break;
                case 4108:
                    e.l <= i[s][1] && (e.l = i[s][1], d = !1);
                    break
            }
            if ((!t || s == 0) && e.l <= i[s][1] && (d = !1, e.l = i[s][1]), d) throw new Error("Read Error: Expected address " + i[s][1] + " at " + e.l + " :" + s)
        }
        if (t) {
            var v = t[i[s][0]];
            if (x[v.n] = d0(e, v.t, {
                    raw: !0
                }), v.p === "version" && (x[v.n] = String(x[v.n] >> 16) + "." + ("0000" + String(x[v.n] & 65535)).slice(-4)), v.n == "CodePage") switch (x[v.n]) {
                case 0:
                    x[v.n] = 1252;
                case 874:
                case 932:
                case 936:
                case 949:
                case 950:
                case 1250:
                case 1251:
                case 1253:
                case 1254:
                case 1255:
                case 1256:
                case 1257:
                case 1258:
                case 1e4:
                case 1200:
                case 1201:
                case 1252:
                case 65e3:
                case -536:
                case 65001:
                case -535:
                    zr(f = x[v.n] >>> 0 & 65535);
                    break;
                default:
                    throw new Error("Unsupported CodePage: " + x[v.n])
            }
        } else if (i[s][0] === 1) {
            if (f = x.CodePage = d0(e, kn), zr(f), c !== -1) {
                var u = e.l;
                e.l = i[c][1], o = Ei(e, f), e.l = u
            }
        } else if (i[s][0] === 0) {
            if (f === 0) {
                c = s, e.l = i[s + 1][1];
                continue
            }
            o = Ei(e, f)
        } else {
            var p = o[i[s][0]],
                k;
            switch (e[e.l]) {
                case 65:
                    e.l += 4, k = rf(e);
                    break;
                case 30:
                    e.l += 4, k = Y0(e, e[e.l - 4]).replace(/\u0000+$/, "");
                    break;
                case 31:
                    e.l += 4, k = Y0(e, e[e.l - 4]).replace(/\u0000+$/, "");
                    break;
                case 3:
                    e.l += 4, k = e.read_shift(4, "i");
                    break;
                case 19:
                    e.l += 4, k = e.read_shift(4);
                    break;
                case 5:
                    e.l += 4, k = e.read_shift(8, "f");
                    break;
                case 11:
                    e.l += 4, k = Je(e, 4);
                    break;
                case 64:
                    e.l += 4, k = Ue(Tn(e));
                    break;
                default:
                    throw new Error("unparsed value: " + e[e.l])
            }
            x[p] = k
        }
    }
    return e.l = r + a, x
}
var tf = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];

function Al(e) {
    switch (typeof e) {
        case "boolean":
            return 11;
        case "number":
            return (e | 0) == e ? 3 : 5;
        case "string":
            return 31;
        case "object":
            if (e instanceof Date) return 64;
            break
    }
    return -1
}

function Fi(e, t, r) {
    var a = X(8),
        n = [],
        i = [],
        s = 8,
        f = 0,
        c = X(8),
        o = X(8);
    if (c.write_shift(4, 2), c.write_shift(4, 1200), o.write_shift(4, 1), i.push(c), n.push(o), s += 8 + c.length, !t) {
        o = X(8), o.write_shift(4, 0), n.unshift(o);
        var l = [X(4)];
        for (l[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
            var h = e[f][0];
            for (c = X(8 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, h.length + 1), c.write_shift(0, h, "dbcs"); c.l != c.length;) c.write_shift(1, 0);
            l.push(c)
        }
        c = sr(l), i.unshift(c), s += 8 + c.length
    }
    for (f = 0; f < e.length; ++f)
        if (!(t && !t[e[f][0]]) && !(tf.indexOf(e[f][0]) > -1 || js.indexOf(e[f][0]) > -1) && e[f][1] != null) {
            var x = e[f][1],
                d = 0;
            if (t) {
                d = +t[e[f][0]];
                var v = r[d];
                if (v.p == "version" && typeof x == "string") {
                    var u = x.split(".");
                    x = (+u[0] << 16) + (+u[1] || 0)
                }
                c = Ti(v.t, x)
            } else {
                var p = Al(x);
                p == -1 && (p = 31, x = String(x)), c = Ti(p, x)
            }
            i.push(c), o = X(8), o.write_shift(4, t ? d : 2 + f), n.push(o), s += 8 + c.length
        } var k = 8 * (i.length + 1);
    for (f = 0; f < i.length; ++f) n[f].write_shift(4, k), k += i[f].length;
    return a.write_shift(4, s), a.write_shift(4, i.length), sr([a].concat(n).concat(i))
}

function Ai(e, t, r) {
    var a = e.content;
    if (!a) return {};
    or(a, 0);
    var n, i, s, f, c = 0;
    a.chk("feff", "Byte Order: "), a.read_shift(2);
    var o = a.read_shift(4),
        l = a.read_shift(16);
    if (l !== xe.utils.consts.HEADER_CLSID && l !== r) throw new Error("Bad PropertySet CLSID " + l);
    if (n = a.read_shift(4), n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
    if (i = a.read_shift(16), f = a.read_shift(4), n === 1 && f !== a.l) throw new Error("Length mismatch: " + f + " !== " + a.l);
    n === 2 && (s = a.read_shift(16), c = a.read_shift(4));
    var h = Si(a, t),
        x = {
            SystemIdentifier: o
        };
    for (var d in h) x[d] = h[d];
    if (x.FMTID = i, n === 1) return x;
    if (c - a.l == 2 && (a.l += 2), a.l !== c) throw new Error("Length mismatch 2: " + a.l + " !== " + c);
    var v;
    try {
        v = Si(a, null)
    } catch {}
    for (d in v) x[d] = v[d];
    return x.FMTID = [i, s], x
}

function yi(e, t, r, a, n, i) {
    var s = X(n ? 68 : 48),
        f = [s];
    s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, xe.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, n ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, n ? 68 : 48);
    var c = Fi(e, r, a);
    if (f.push(c), n) {
        var o = Fi(n, null, null);
        s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(o)
    }
    return sr(f)
}

function pt(e, t) {
    return e.read_shift(t), null
}

function yl(e, t) {
    t || (t = X(e));
    for (var r = 0; r < e; ++r) t.write_shift(1, 0);
    return t
}

function Cl(e, t, r) {
    for (var a = [], n = e.l + t; e.l < n;) a.push(r(e, n - e.l));
    if (n !== e.l) throw new Error("Slurp error");
    return a
}

function Je(e, t) {
    return e.read_shift(t) === 1
}

function Er(e, t) {
    return t || (t = X(2)), t.write_shift(2, +!!e), t
}

function rr(e) {
    return e.read_shift(2, "u")
}

function Wr(e, t) {
    return t || (t = X(2)), t.write_shift(2, e), t
}

function af(e, t) {
    return Cl(e, t, rr)
}

function Dl(e) {
    var t = e.read_shift(1),
        r = e.read_shift(1);
    return r === 1 ? t : t === 1
}

function nf(e, t, r) {
    return r || (r = X(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r
}

function Ha(e, t, r) {
    var a = e.read_shift(r && r.biff >= 12 ? 2 : 1),
        n = "sbcs-cont";
    if (r && r.biff >= 8, !r || r.biff == 8) {
        var i = e.read_shift(1);
        i && (n = "dbcs-cont")
    } else r.biff == 12 && (n = "wstr");
    r.biff >= 2 && r.biff <= 5 && (n = "cpstr");
    var s = a ? e.read_shift(a, n) : "";
    return s
}

function Ol(e) {
    var t = e.read_shift(2),
        r = e.read_shift(1),
        a = r & 4,
        n = r & 8,
        i = 1 + (r & 1),
        s = 0,
        f, c = {};
    n && (s = e.read_shift(2)), a && (f = e.read_shift(4));
    var o = i == 2 ? "dbcs-cont" : "sbcs-cont",
        l = t === 0 ? "" : e.read_shift(t, o);
    return n && (e.l += 4 * s), a && (e.l += f), c.t = l, n || (c.raw = "<t>" + c.t + "</t>", c.r = c.t), c
}

function Il(e) {
    var t = e.t || "",
        r = X(3);
    r.write_shift(2, t.length), r.write_shift(1, 1);
    var a = X(2 * t.length);
    a.write_shift(2 * t.length, t, "utf16le");
    var n = [r, a];
    return sr(n)
}

function Mt(e, t, r) {
    var a;
    if (r) {
        if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
        if (r.biff >= 12) return e.read_shift(t, "dbcs-cont")
    }
    var n = e.read_shift(1);
    return n === 0 ? a = e.read_shift(t, "sbcs-cont") : a = e.read_shift(t, "dbcs-cont"), a
}

function Va(e, t, r) {
    var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
    return a === 0 ? (e.l++, "") : Mt(e, a, r)
}

function $t(e, t, r) {
    if (r.biff > 5) return Va(e, t, r);
    var a = e.read_shift(1);
    return a === 0 ? (e.l++, "") : e.read_shift(a, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont")
}

function sf(e, t, r) {
    return r || (r = X(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r
}

function Rl(e) {
    var t = e.read_shift(1);
    e.l++;
    var r = e.read_shift(2);
    return e.l += 2, [t, r]
}

function Nl(e) {
    var t = e.read_shift(4),
        r = e.l,
        a = !1;
    t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (a = !0), e.l = r);
    var n = e.read_shift((a ? t - 24 : t) >> 1, "utf16le").replace(Tr, "");
    return a && (e.l += 24), n
}

function bl(e) {
    for (var t = e.read_shift(2), r = ""; t-- > 0;) r += "../";
    var a = e.read_shift(0, "lpstr-ansi");
    if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
    var n = e.read_shift(4);
    if (n === 0) return r + a.replace(/\\/g, "/");
    var i = e.read_shift(4);
    if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
    var s = e.read_shift(i >> 1, "utf16le").replace(Tr, "");
    return r + s
}

function Pl(e, t) {
    var r = e.read_shift(16);
    switch (r) {
        case "e0c9ea79f9bace118c8200aa004ba90b":
            return Nl(e);
        case "0303000000000000c000000000000046":
            return bl(e);
        default:
            throw new Error("Unsupported Moniker " + r)
    }
}

function Qa(e) {
    var t = e.read_shift(4),
        r = t > 0 ? e.read_shift(t, "utf16le").replace(Tr, "") : "";
    return r
}

function Ci(e, t) {
    t || (t = X(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
    for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
    return t.write_shift(2, 0), t
}

function Ll(e, t) {
    var r = e.l + t,
        a = e.read_shift(4);
    if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
    var n = e.read_shift(2);
    e.l += 2;
    var i, s, f, c, o = "",
        l, h;
    n & 16 && (i = Qa(e, r - e.l)), n & 128 && (s = Qa(e, r - e.l)), (n & 257) === 257 && (f = Qa(e, r - e.l)), (n & 257) === 1 && (c = Pl(e, r - e.l)), n & 8 && (o = Qa(e, r - e.l)), n & 32 && (l = e.read_shift(16)), n & 64 && (h = Tn(e)), e.l = r;
    var x = s || f || c || "";
    x && o && (x += "#" + o), x || (x = "#" + o), n & 2 && x.charAt(0) == "/" && x.charAt(1) != "/" && (x = "file://" + x);
    var d = {
        Target: x
    };
    return l && (d.guid = l), h && (d.time = h), i && (d.Tooltip = i), d
}

function Bl(e) {
    var t = X(512),
        r = 0,
        a = e.Target;
    a.slice(0, 7) == "file://" && (a = a.slice(7));
    var n = a.indexOf("#"),
        i = n > -1 ? 31 : 23;
    switch (a.charAt(0)) {
        case "#":
            i = 28;
            break;
        case ".":
            i &= -3;
            break
    }
    t.write_shift(4, 2), t.write_shift(4, i);
    var s = [8, 6815827, 6619237, 4849780, 83];
    for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
    if (i == 28) a = a.slice(1), Ci(a, t);
    else if (i & 2) {
        for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
        var f = n > -1 ? a.slice(0, n) : a;
        for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r) t.write_shift(2, f.charCodeAt(r));
        t.write_shift(2, 0), i & 8 && Ci(n > -1 ? a.slice(n + 1) : "", t)
    } else {
        for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
        for (var c = 0; a.slice(c * 3, c * 3 + 3) == "../" || a.slice(c * 3, c * 3 + 3) == "..\\";) ++c;
        for (t.write_shift(2, c), t.write_shift(4, a.length - 3 * c + 1), r = 0; r < a.length - 3 * c; ++r) t.write_shift(1, a.charCodeAt(r + 3 * c) & 255);
        for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0)
    }
    return t.slice(0, t.l)
}

function ff(e) {
    var t = e.read_shift(1),
        r = e.read_shift(1),
        a = e.read_shift(1),
        n = e.read_shift(1);
    return [t, r, a, n]
}

function cf(e, t) {
    var r = ff(e);
    return r[3] = 0, r
}

function tt(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(2);
    return {
        r: t,
        c: r,
        ixfe: a
    }
}

function Ut(e, t, r, a) {
    return a || (a = X(6)), a.write_shift(2, e), a.write_shift(2, t), a.write_shift(2, r || 0), a
}

function Ml(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2);
    return e.l += 8, {
        type: t,
        flags: r
    }
}

function Ul(e, t, r) {
    return t === 0 ? "" : $t(e, t, r)
}

function Wl(e, t, r) {
    var a = r.biff > 8 ? 4 : 2,
        n = e.read_shift(a),
        i = e.read_shift(a, "i"),
        s = e.read_shift(a, "i");
    return [n, i, s]
}

function of(e) {
    var t = e.read_shift(2),
        r = wn(e);
    return [t, r]
}

function Hl(e, t, r) {
    e.l += 4, t -= 4;
    var a = e.l + t,
        n = Ha(e, t, r),
        i = e.read_shift(2);
    if (a -= e.l, i !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + i);
    return e.l += i, n
}

function T0(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(2),
        n = e.read_shift(2);
    return {
        s: {
            c: a,
            r: t
        },
        e: {
            c: n,
            r
        }
    }
}

function lf(e, t) {
    return t || (t = X(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t
}

function hf(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(1),
        n = e.read_shift(1);
    return {
        s: {
            c: a,
            r: t
        },
        e: {
            c: n,
            r
        }
    }
}
var Vl = hf;

function uf(e) {
    e.l += 4;
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(2);
    return e.l += 12, [r, t, a]
}

function Gl(e) {
    var t = {};
    return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t
}

function Xl(e) {
    var t = {};
    return e.l += 4, e.cf = e.read_shift(2), t
}

function ur(e) {
    e.l += 2, e.l += e.read_shift(2)
}
var zl = {
    0: ur,
    4: ur,
    5: ur,
    6: ur,
    7: Xl,
    8: ur,
    9: ur,
    10: ur,
    11: ur,
    12: ur,
    13: Gl,
    14: ur,
    15: ur,
    16: ur,
    17: ur,
    18: ur,
    19: ur,
    20: ur,
    21: uf
};

function $l(e, t) {
    for (var r = e.l + t, a = []; e.l < r;) {
        var n = e.read_shift(2);
        e.l -= 2;
        try {
            a.push(zl[n](e, r - e.l))
        } catch {
            return e.l = r, a
        }
    }
    return e.l != r && (e.l = r), a
}

function e0(e, t) {
    var r = {
        BIFFVer: 0,
        dt: 0
    };
    switch (r.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (r.dt = e.read_shift(2), e.l -= 2), r.BIFFVer) {
        case 1536:
        case 1280:
        case 1024:
        case 768:
        case 512:
        case 2:
        case 7:
            break;
        default:
            if (t > 6) throw new Error("Unexpected BIFF Ver " + r.BIFFVer)
    }
    return e.read_shift(t), r
}

function Sn(e, t, r) {
    var a = 1536,
        n = 16;
    switch (r.bookType) {
        case "biff8":
            break;
        case "biff5":
            a = 1280, n = 8;
            break;
        case "biff4":
            a = 4, n = 6;
            break;
        case "biff3":
            a = 3, n = 6;
            break;
        case "biff2":
            a = 2, n = 4;
            break;
        case "xla":
            break;
        default:
            throw new Error("unsupported BIFF version")
    }
    var i = X(n);
    return i.write_shift(2, a), i.write_shift(2, t), n > 4 && i.write_shift(2, 29282), n > 6 && i.write_shift(2, 1997), n > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i
}

function Kl(e, t) {
    return t === 0 || e.read_shift(2), 1200
}

function jl(e, t, r) {
    if (r.enc) return e.l += t, "";
    var a = e.l,
        n = $t(e, 0, r);
    return e.read_shift(t + a - e.l), n
}

function Yl(e, t) {
    var r = !t || t.biff == 8,
        a = X(r ? 112 : 54);
    for (a.write_shift(t.biff == 8 ? 2 : 1, 7), r && a.write_shift(1, 0), a.write_shift(4, 859007059), a.write_shift(4, 5458548 | (r ? 0 : 536870912)); a.l < a.length;) a.write_shift(1, r ? 0 : 32);
    return a
}

function Jl(e, t, r) {
    var a = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
    return {
        fDialog: a & 16,
        fBelow: a & 64,
        fRight: a & 128
    }
}

function Zl(e, t, r) {
    var a = e.read_shift(4),
        n = e.read_shift(1) & 3,
        i = e.read_shift(1);
    switch (i) {
        case 0:
            i = "Worksheet";
            break;
        case 1:
            i = "Macrosheet";
            break;
        case 2:
            i = "Chartsheet";
            break;
        case 6:
            i = "VBAModule";
            break
    }
    var s = Ha(e, 0, r);
    return s.length === 0 && (s = "Sheet1"), {
        pos: a,
        hs: n,
        dt: i,
        name: s
    }
}

function ql(e, t) {
    var r = !t || t.biff >= 8 ? 2 : 1,
        a = X(8 + r * e.name.length);
    a.write_shift(4, e.pos), a.write_shift(1, e.hs || 0), a.write_shift(1, e.dt), a.write_shift(1, e.name.length), t.biff >= 8 && a.write_shift(1, 1), a.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
    var n = a.slice(0, a.l);
    return n.l = a.l, n
}

function Ql(e, t) {
    for (var r = e.l + t, a = e.read_shift(4), n = e.read_shift(4), i = [], s = 0; s != n && e.l < r; ++s) i.push(Ol(e));
    return i.Count = a, i.Unique = n, i
}

function eh(e, t) {
    var r = X(8);
    r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
    for (var a = [], n = 0; n < e.length; ++n) a[n] = Il(e[n]);
    var i = sr([r].concat(a));
    return i.parts = [r.length].concat(a.map(function(s) {
        return s.length
    })), i
}

function rh(e, t) {
    var r = {};
    return r.dsst = e.read_shift(2), e.l += t - 2, r
}

function th(e) {
    var t = {};
    t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
    var r = e.read_shift(2);
    e.l += 4;
    var a = e.read_shift(1);
    return e.l += 3, a & 7 && (t.level = a & 7), a & 32 && (t.hidden = !0), a & 64 && (t.hpt = r / 20), t
}

function ah(e) {
    var t = Ml(e);
    if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
    var r = e.read_shift(4);
    return r !== 0
}

function nh(e) {
    return e.read_shift(2), e.read_shift(4)
}

function Di(e, t, r) {
    var a = 0;
    r && r.biff == 2 || (a = e.read_shift(2));
    var n = e.read_shift(2);
    r && r.biff == 2 && (a = 1 - (n >> 15), n &= 32767);
    var i = {
        Unsynced: a & 1,
        DyZero: (a & 2) >> 1,
        ExAsc: (a & 4) >> 2,
        ExDsc: (a & 8) >> 3
    };
    return [i, n]
}

function ih(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(2),
        n = e.read_shift(2),
        i = e.read_shift(2),
        s = e.read_shift(2),
        f = e.read_shift(2),
        c = e.read_shift(2),
        o = e.read_shift(2);
    return {
        Pos: [t, r],
        Dim: [a, n],
        Flags: i,
        CurTab: s,
        FirstTab: f,
        Selected: c,
        TabRatio: o
    }
}

function sh() {
    var e = X(18);
    return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e
}

function fh(e, t, r) {
    if (r && r.biff >= 2 && r.biff < 5) return {};
    var a = e.read_shift(2);
    return {
        RTL: a & 64
    }
}

function ch(e) {
    var t = X(18),
        r = 1718;
    return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t
}

function oh() {}

function lh(e, t, r) {
    var a = {
        dyHeight: e.read_shift(2),
        fl: e.read_shift(2)
    };
    switch (r && r.biff || 8) {
        case 2:
            break;
        case 3:
        case 4:
            e.l += 2;
            break;
        default:
            e.l += 10;
            break
    }
    return a.name = Ha(e, 0, r), a
}

function hh(e, t) {
    var r = e.name || "Arial",
        a = t && t.biff == 5,
        n = a ? 15 + r.length : 16 + 2 * r.length,
        i = X(n);
    return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), a || i.write_shift(1, 1), i.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le"), i
}

function uh(e) {
    var t = tt(e);
    return t.isst = e.read_shift(4), t
}

function xh(e, t, r, a) {
    var n = X(10);
    return Ut(e, t, a, n), n.write_shift(4, r), n
}

function dh(e, t, r) {
    r.biffguess && r.biff == 2 && (r.biff = 5);
    var a = e.l + t,
        n = tt(e);
    r.biff == 2 && e.l++;
    var i = Va(e, a - e.l, r);
    return n.val = i, n
}

function vh(e, t, r, a, n) {
    var i = !n || n.biff == 8,
        s = X(8 + +i + (1 + i) * r.length);
    return Ut(e, t, a, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s
}

function ph(e, t, r) {
    var a = e.read_shift(2),
        n = $t(e, 0, r);
    return [a, n]
}

function mh(e, t, r, a) {
    var n = r && r.biff == 5;
    a || (a = X(n ? 3 + t.length : 5 + 2 * t.length)), a.write_shift(2, e), a.write_shift(n ? 1 : 2, t.length), n || a.write_shift(1, 1), a.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le");
    var i = a.length > a.l ? a.slice(0, a.l) : a;
    return i.l == null && (i.l = i.length), i
}
var gh = $t;

function Oi(e, t, r) {
    var a = e.l + t,
        n = r.biff == 8 || !r.biff ? 4 : 2,
        i = e.read_shift(n),
        s = e.read_shift(n),
        f = e.read_shift(2),
        c = e.read_shift(2);
    return e.l = a, {
        s: {
            r: i,
            c: f
        },
        e: {
            r: s,
            c
        }
    }
}

function _h(e, t) {
    var r = t.biff == 8 || !t.biff ? 4 : 2,
        a = X(2 * r + 6);
    return a.write_shift(r, e.s.r), a.write_shift(r, e.e.r + 1), a.write_shift(2, e.s.c), a.write_shift(2, e.e.c + 1), a.write_shift(2, 0), a
}

function wh(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = of(e);
    return {
        r: t,
        c: r,
        ixfe: a[0],
        rknum: a[1]
    }
}

function kh(e, t) {
    for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r;) i.push(of(e));
    if (e.l !== r) throw new Error("MulRK read error");
    var s = e.read_shift(2);
    if (i.length != s - n + 1) throw new Error("MulRK length mismatch");
    return {
        r: a,
        c: n,
        C: s,
        rkrec: i
    }
}

function Eh(e, t) {
    for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), i = []; e.l < r;) i.push(e.read_shift(2));
    if (e.l !== r) throw new Error("MulBlank read error");
    var s = e.read_shift(2);
    if (i.length != s - n + 1) throw new Error("MulBlank length mismatch");
    return {
        r: a,
        c: n,
        C: s,
        ixfe: i
    }
}

function Th(e, t, r, a) {
    var n = {},
        i = e.read_shift(4),
        s = e.read_shift(4),
        f = e.read_shift(4),
        c = e.read_shift(2);
    return n.patternType = al[f >> 26], a.cellStyles && (n.alc = i & 7, n.fWrap = i >> 3 & 1, n.alcV = i >> 4 & 7, n.fJustLast = i >> 7 & 1, n.trot = i >> 8 & 255, n.cIndent = i >> 16 & 15, n.fShrinkToFit = i >> 20 & 1, n.iReadOrder = i >> 22 & 2, n.fAtrNum = i >> 26 & 1, n.fAtrFnt = i >> 27 & 1, n.fAtrAlc = i >> 28 & 1, n.fAtrBdr = i >> 29 & 1, n.fAtrPat = i >> 30 & 1, n.fAtrProt = i >> 31 & 1, n.dgLeft = s & 15, n.dgRight = s >> 4 & 15, n.dgTop = s >> 8 & 15, n.dgBottom = s >> 12 & 15, n.icvLeft = s >> 16 & 127, n.icvRight = s >> 23 & 127, n.grbitDiag = s >> 30 & 3, n.icvTop = f & 127, n.icvBottom = f >> 7 & 127, n.icvDiag = f >> 14 & 127, n.dgDiag = f >> 21 & 15, n.icvFore = c & 127, n.icvBack = c >> 7 & 127, n.fsxButton = c >> 14 & 1), n
}

function Sh(e, t, r) {
    var a = {};
    return a.ifnt = e.read_shift(2), a.numFmtId = e.read_shift(2), a.flags = e.read_shift(2), a.fStyle = a.flags >> 2 & 1, t -= 6, a.data = Th(e, t, a.fStyle, r), a
}

function Ii(e, t, r, a) {
    var n = r && r.biff == 5;
    a || (a = X(n ? 16 : 20)), a.write_shift(2, 0), e.style ? (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, 65524)) : (a.write_shift(2, e.numFmtId || 0), a.write_shift(2, t << 4));
    var i = 0;
    return e.numFmtId > 0 && n && (i |= 1024), a.write_shift(4, i), a.write_shift(4, 0), n || a.write_shift(4, 0), a.write_shift(2, 0), a
}

function Fh(e) {
    e.l += 4;
    var t = [e.read_shift(2), e.read_shift(2)];
    if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
    return t
}

function Ah(e) {
    var t = X(8);
    return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t
}

function Ri(e, t, r) {
    var a = tt(e);
    (r.biff == 2 || t == 9) && ++e.l;
    var n = Dl(e);
    return a.val = n, a.t = n === !0 || n === !1 ? "b" : "e", a
}

function yh(e, t, r, a, n, i) {
    var s = X(8);
    return Ut(e, t, a, s), nf(r, i, s), s
}

function Ch(e, t, r) {
    r.biffguess && r.biff == 2 && (r.biff = 5);
    var a = tt(e),
        n = pr(e);
    return a.val = n, a
}

function Dh(e, t, r, a) {
    var n = X(14);
    return Ut(e, t, a, n), Bt(r, n), n
}
var Ni = Ul;

function Oh(e, t, r) {
    var a = e.l + t,
        n = e.read_shift(2),
        i = e.read_shift(2);
    if (r.sbcch = i, i == 1025 || i == 14849) return [i, n];
    if (i < 1 || i > 255) throw new Error("Unexpected SupBook type: " + i);
    for (var s = Mt(e, i), f = []; a > e.l;) f.push(Va(e));
    return [i, n, s, f]
}

function bi(e, t, r) {
    var a = e.read_shift(2),
        n, i = {
            fBuiltIn: a & 1,
            fWantAdvise: a >>> 1 & 1,
            fWantPict: a >>> 2 & 1,
            fOle: a >>> 3 & 1,
            fOleLink: a >>> 4 & 1,
            cf: a >>> 5 & 1023,
            fIcon: a >>> 15 & 1
        };
    return r.sbcch === 14849 && (n = Hl(e, t - 2, r)), i.body = n || e.read_shift(t - 2), typeof n == "string" && (i.Name = n), i
}
var Ih = ["_xlnm.Consolidate_Area", "_xlnm.Auto_Open", "_xlnm.Auto_Close", "_xlnm.Extract", "_xlnm.Database", "_xlnm.Criteria", "_xlnm.Print_Area", "_xlnm.Print_Titles", "_xlnm.Recorder", "_xlnm.Data_Form", "_xlnm.Auto_Activate", "_xlnm.Auto_Deactivate", "_xlnm.Sheet_Title", "_xlnm._FilterDatabase"];

function Pi(e, t, r) {
    var a = e.l + t,
        n = e.read_shift(2),
        i = e.read_shift(1),
        s = e.read_shift(1),
        f = e.read_shift(r && r.biff == 2 ? 1 : 2),
        c = 0;
    (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), c = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
    var o = Mt(e, s, r);
    n & 32 && (o = Ih[o.charCodeAt(0)]);
    var l = a - e.l;
    r && r.biff == 2 && --l;
    var h = a == e.l || f === 0 || !(l > 0) ? [] : $d(e, l, r, f);
    return {
        chKey: i,
        Name: o,
        itab: c,
        rgce: h
    }
}

function xf(e, t, r) {
    if (r.biff < 8) return Rh(e, t, r);
    for (var a = [], n = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0;) a.push(Wl(e, r.biff > 8 ? 12 : 6, r));
    if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
    return a
}

function Rh(e, t, r) {
    e[e.l + 1] == 3 && e[e.l]++;
    var a = Ha(e, t, r);
    return a.charCodeAt(0) == 3 ? a.slice(1) : a
}

function Nh(e, t, r) {
    if (r.biff < 8) {
        e.l += t;
        return
    }
    var a = e.read_shift(2),
        n = e.read_shift(2),
        i = Mt(e, a, r),
        s = Mt(e, n, r);
    return [i, s]
}

function bh(e, t, r) {
    var a = hf(e);
    e.l++;
    var n = e.read_shift(1);
    return t -= 8, [Kd(e, t, r), n, a]
}

function Li(e, t, r) {
    var a = Vl(e);
    switch (r.biff) {
        case 2:
            e.l++, t -= 7;
            break;
        case 3:
        case 4:
            e.l += 2, t -= 8;
            break;
        default:
            e.l += 6, t -= 12
    }
    return [a, Xd(e, t, r)]
}

function Ph(e) {
    var t = e.read_shift(4) !== 0,
        r = e.read_shift(4) !== 0,
        a = e.read_shift(4);
    return [t, r, a]
}

function Lh(e, t, r) {
    if (!(r.biff < 8)) {
        var a = e.read_shift(2),
            n = e.read_shift(2),
            i = e.read_shift(2),
            s = e.read_shift(2),
            f = $t(e, 0, r);
        return r.biff < 8 && e.read_shift(1), [{
            r: a,
            c: n
        }, f, s, i]
    }
}

function Bh(e, t, r) {
    return Lh(e, t, r)
}

function Mh(e, t) {
    for (var r = [], a = e.read_shift(2); a--;) r.push(T0(e));
    return r
}

function Uh(e) {
    var t = X(2 + e.length * 8);
    t.write_shift(2, e.length);
    for (var r = 0; r < e.length; ++r) lf(e[r], t);
    return t
}

function Wh(e, t, r) {
    if (r && r.biff < 8) return Vh(e, t, r);
    var a = uf(e),
        n = $l(e, t - 22, a[1]);
    return {
        cmo: a,
        ft: n
    }
}
var Hh = {
    8: function(e, t) {
        var r = e.l + t;
        e.l += 10;
        var a = e.read_shift(2);
        e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
        var n = e.read_shift(1);
        return e.l += n, e.l = r, {
            fmt: a
        }
    }
};

function Vh(e, t, r) {
    e.l += 4;
    var a = e.read_shift(2),
        n = e.read_shift(2),
        i = e.read_shift(2);
    e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
    var s = [];
    return s.push((Hh[a] || gr)(e, t, r)), {
        cmo: [n, a, i],
        ft: s
    }
}

function Gh(e, t, r) {
    var a = e.l,
        n = "";
    try {
        e.l += 4;
        var i = (r.lastobj || {
                cmo: [0, 0]
            }).cmo[1],
            s;
        [0, 5, 7, 11, 12, 14].indexOf(i) == -1 ? e.l += 6 : s = Rl(e, 6, r);
        var f = e.read_shift(2);
        e.read_shift(2), rr(e, 2);
        var c = e.read_shift(2);
        e.l += c;
        for (var o = 1; o < e.lens.length - 1; ++o) {
            if (e.l - a != e.lens[o]) throw new Error("TxO: bad continue record");
            var l = e[e.l],
                h = Mt(e, e.lens[o + 1] - e.lens[o] - 1);
            if (n += h, n.length >= (l ? f : 2 * f)) break
        }
        if (n.length !== f && n.length !== f * 2) throw new Error("cchText: " + f + " != " + n.length);
        return e.l = a + t, {
            t: n
        }
    } catch {
        return e.l = a + t, {
            t: n
        }
    }
}

function Xh(e, t) {
    var r = T0(e);
    e.l += 16;
    var a = Ll(e, t - 24);
    return [r, a]
}

function zh(e) {
    var t = X(24),
        r = Xe(e[0]);
    t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
    for (var a = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), n = 0; n < 16; ++n) t.write_shift(1, parseInt(a[n], 16));
    return sr([t, Bl(e[1])])
}

function $h(e, t) {
    e.read_shift(2);
    var r = T0(e),
        a = e.read_shift((t - 10) / 2, "dbcs-cont");
    return a = a.replace(Tr, ""), [r, a]
}

function Kh(e) {
    var t = e[1].Tooltip,
        r = X(10 + 2 * (t.length + 1));
    r.write_shift(2, 2048);
    var a = Xe(e[0]);
    r.write_shift(2, a.r), r.write_shift(2, a.r), r.write_shift(2, a.c), r.write_shift(2, a.c);
    for (var n = 0; n < t.length; ++n) r.write_shift(2, t.charCodeAt(n));
    return r.write_shift(2, 0), r
}

function jh(e) {
    var t = [0, 0],
        r;
    return r = e.read_shift(2), t[0] = wi[r] || r, r = e.read_shift(2), t[1] = wi[r] || r, t
}

function Yh(e) {
    return e || (e = X(4)), e.write_shift(2, 1), e.write_shift(2, 1), e
}

function Jh(e) {
    for (var t = e.read_shift(2), r = []; t-- > 0;) r.push(cf(e));
    return r
}

function Zh(e) {
    for (var t = e.read_shift(2), r = []; t-- > 0;) r.push(cf(e));
    return r
}

function qh(e) {
    e.l += 2;
    var t = {
        cxfs: 0,
        crc: 0
    };
    return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t
}

function df(e, t, r) {
    if (!r.cellStyles) return gr(e, t);
    var a = r && r.biff >= 12 ? 4 : 2,
        n = e.read_shift(a),
        i = e.read_shift(a),
        s = e.read_shift(a),
        f = e.read_shift(a),
        c = e.read_shift(2);
    a == 2 && (e.l += 2);
    var o = {
        s: n,
        e: i,
        w: s,
        ixfe: f,
        flags: c
    };
    return (r.biff >= 5 || !r.biff) && (o.level = c >> 8 & 7), o
}

function Qh(e, t) {
    var r = X(12);
    r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
    var a = 0;
    return e.hidden && (a |= 1), r.write_shift(1, a), a = e.level || 0, r.write_shift(1, a), r.write_shift(2, 0), r
}

function eu(e, t) {
    var r = {};
    return t < 32 || (e.l += 16, r.header = pr(e), r.footer = pr(e), e.l += 2), r
}

function ru(e, t, r) {
    var a = {
        area: !1
    };
    if (r.biff != 5) return e.l += t, a;
    var n = e.read_shift(1);
    return e.l += 3, n & 16 && (a.area = !0), a
}

function tu(e) {
    for (var t = X(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
    return t
}
var au = tt,
    nu = af,
    iu = Va;

function su(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(4),
        n = {
            fmt: t,
            env: r,
            len: a,
            data: e.slice(e.l, e.l + a)
        };
    return e.l += a, n
}

function fu(e, t, r) {
    r.biffguess && r.biff == 5 && (r.biff = 2);
    var a = tt(e);
    ++e.l;
    var n = $t(e, t - 7, r);
    return a.t = "str", a.val = n, a
}

function cu(e) {
    var t = tt(e);
    ++e.l;
    var r = pr(e);
    return t.t = "n", t.val = r, t
}

function ou(e, t, r) {
    var a = X(15);
    return $a(a, e, t), a.write_shift(8, r, "f"), a
}

function lu(e) {
    var t = tt(e);
    ++e.l;
    var r = e.read_shift(2);
    return t.t = "n", t.val = r, t
}

function hu(e, t, r) {
    var a = X(9);
    return $a(a, e, t), a.write_shift(2, r), a
}

function uu(e) {
    var t = e.read_shift(1);
    return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont")
}

function xu(e, t) {
    e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13
}

function du(e, t, r) {
    var a = e.l + t,
        n = tt(e),
        i = e.read_shift(2),
        s = Mt(e, i, r);
    return e.l = a, n.t = "str", n.val = s, n
}
var vu = [2, 3, 48, 49, 131, 139, 140, 245],
    J0 = function() {
        var e = {
                1: 437,
                2: 850,
                3: 1252,
                4: 1e4,
                100: 852,
                101: 866,
                102: 865,
                103: 861,
                104: 895,
                105: 620,
                106: 737,
                107: 857,
                120: 950,
                121: 949,
                122: 936,
                123: 932,
                124: 874,
                125: 1255,
                126: 1256,
                150: 10007,
                151: 10029,
                152: 10006,
                200: 1250,
                201: 1251,
                202: 1254,
                203: 1253,
                0: 20127,
                8: 865,
                9: 437,
                10: 850,
                11: 437,
                13: 437,
                14: 850,
                15: 437,
                16: 850,
                17: 437,
                18: 850,
                19: 932,
                20: 850,
                21: 437,
                22: 850,
                23: 865,
                24: 437,
                25: 437,
                26: 850,
                27: 437,
                28: 863,
                29: 850,
                31: 852,
                34: 852,
                35: 852,
                36: 860,
                37: 850,
                38: 866,
                55: 850,
                64: 852,
                77: 936,
                78: 949,
                79: 950,
                80: 874,
                87: 1252,
                88: 1252,
                89: 1252,
                108: 863,
                134: 737,
                135: 852,
                136: 857,
                204: 1257,
                255: 16969
            },
            t = w0({
                1: 437,
                2: 850,
                3: 1252,
                4: 1e4,
                100: 852,
                101: 866,
                102: 865,
                103: 861,
                104: 895,
                105: 620,
                106: 737,
                107: 857,
                120: 950,
                121: 949,
                122: 936,
                123: 932,
                124: 874,
                125: 1255,
                126: 1256,
                150: 10007,
                151: 10029,
                152: 10006,
                200: 1250,
                201: 1251,
                202: 1254,
                203: 1253,
                0: 20127
            });

        function r(f, c) {
            var o = [],
                l = wt(1);
            switch (c.type) {
                case "base64":
                    l = Or(Rr(f));
                    break;
                case "binary":
                    l = Or(f);
                    break;
                case "buffer":
                case "array":
                    l = f;
                    break
            }
            or(l, 0);
            var h = l.read_shift(1),
                x = !!(h & 136),
                d = !1,
                v = !1;
            switch (h) {
                case 2:
                    break;
                case 3:
                    break;
                case 48:
                    d = !0, x = !0;
                    break;
                case 49:
                    d = !0, x = !0;
                    break;
                case 131:
                    break;
                case 139:
                    break;
                case 140:
                    v = !0;
                    break;
                case 245:
                    break;
                default:
                    throw new Error("DBF Unsupported Version: " + h.toString(16))
            }
            var u = 0,
                p = 521;
            h == 2 && (u = l.read_shift(2)), l.l += 3, h != 2 && (u = l.read_shift(4)), u > 1048576 && (u = 1e6), h != 2 && (p = l.read_shift(2));
            var k = l.read_shift(2),
                A = c.codepage || 1252;
            h != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && (A = e[l[l.l]]), l.l += 1, l.l += 2), v && (l.l += 36);
            for (var g = [], O = {}, b = Math.min(l.length, h == 2 ? 521 : p - 10 - (d ? 264 : 0)), N = v ? 32 : 11; l.l < b && l[l.l] != 13;) switch (O = {}, O.name = mt.utils.decode(A, l.slice(l.l, l.l + N)).replace(/[\u0000\r\n].*$/g, ""), l.l += N, O.type = String.fromCharCode(l.read_shift(1)), h != 2 && !v && (O.offset = l.read_shift(4)), O.len = l.read_shift(1), h == 2 && (O.offset = l.read_shift(2)), O.dec = l.read_shift(1), O.name.length && g.push(O), h != 2 && (l.l += v ? 13 : 14), O.type) {
                case "B":
                    (!d || O.len != 8) && c.WTF && console.log("Skipping " + O.name + ":" + O.type);
                    break;
                case "G":
                case "P":
                    c.WTF && console.log("Skipping " + O.name + ":" + O.type);
                    break;
                case "+":
                case "0":
                case "@":
                case "C":
                case "D":
                case "F":
                case "I":
                case "L":
                case "M":
                case "N":
                case "O":
                case "T":
                case "Y":
                    break;
                default:
                    throw new Error("Unknown Field Type: " + O.type)
            }
            if (l[l.l] !== 13 && (l.l = p - 1), l.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
            l.l = p;
            var F = 0,
                B = 0;
            for (o[0] = [], B = 0; B != g.length; ++B) o[0][B] = g[B].name;
            for (; u-- > 0;) {
                if (l[l.l] === 42) {
                    l.l += k;
                    continue
                }
                for (++l.l, o[++F] = [], B = 0, B = 0; B != g.length; ++B) {
                    var I = l.slice(l.l, l.l + g[B].len);
                    l.l += g[B].len, or(I, 0);
                    var z = mt.utils.decode(A, I);
                    switch (g[B].type) {
                        case "C":
                            z.trim().length && (o[F][B] = z.replace(/\s+$/, ""));
                            break;
                        case "D":
                            z.length === 8 ? o[F][B] = new Date(+z.slice(0, 4), +z.slice(4, 6) - 1, +z.slice(6, 8)) : o[F][B] = z;
                            break;
                        case "F":
                            o[F][B] = parseFloat(z.trim());
                            break;
                        case "+":
                        case "I":
                            o[F][B] = v ? I.read_shift(-4, "i") ^ 2147483648 : I.read_shift(4, "i");
                            break;
                        case "L":
                            switch (z.trim().toUpperCase()) {
                                case "Y":
                                case "T":
                                    o[F][B] = !0;
                                    break;
                                case "N":
                                case "F":
                                    o[F][B] = !1;
                                    break;
                                case "":
                                case "?":
                                    break;
                                default:
                                    throw new Error("DBF Unrecognized L:|" + z + "|")
                            }
                            break;
                        case "M":
                            if (!x) throw new Error("DBF Unexpected MEMO for type " + h.toString(16));
                            o[F][B] = "##MEMO##" + (v ? parseInt(z.trim(), 10) : I.read_shift(4));
                            break;
                        case "N":
                            z = z.replace(/\u0000/g, "").trim(), z && z != "." && (o[F][B] = +z || 0);
                            break;
                        case "@":
                            o[F][B] = new Date(I.read_shift(-8, "f") - 621356832e5);
                            break;
                        case "T":
                            o[F][B] = new Date((I.read_shift(4) - 2440588) * 864e5 + I.read_shift(4));
                            break;
                        case "Y":
                            o[F][B] = I.read_shift(4, "i") / 1e4 + I.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
                            break;
                        case "O":
                            o[F][B] = -I.read_shift(-8, "f");
                            break;
                        case "B":
                            if (d && g[B].len == 8) {
                                o[F][B] = I.read_shift(8, "f");
                                break
                            }
                        case "G":
                        case "P":
                            I.l += g[B].len;
                            break;
                        case "0":
                            if (g[B].name === "_NullFlags") break;
                        default:
                            throw new Error("DBF Unsupported data type " + g[B].type)
                    }
                }
            }
            if (h != 2 && l.l < l.length && l[l.l++] != 26) throw new Error("DBF EOF Marker missing " + (l.l - 1) + " of " + l.length + " " + l[l.l - 1].toString(16));
            return c && c.sheetRows && (o = o.slice(0, c.sheetRows)), c.DBF = g, o
        }

        function a(f, c) {
            var o = c || {};
            o.dateNF || (o.dateNF = "yyyymmdd");
            var l = fa(r(f, o), o);
            return l["!cols"] = o.DBF.map(function(h) {
                return {
                    wch: h.len,
                    DBF: h
                }
            }), delete o.DBF, l
        }

        function n(f, c) {
            try {
                return Ft(a(f, c), c)
            } catch (o) {
                if (c && c.WTF) throw o
            }
            return {
                SheetNames: [],
                Sheets: {}
            }
        }
        var i = {
            B: 8,
            C: 250,
            L: 1,
            D: 8,
            "?": 0,
            "": 0
        };

        function s(f, c) {
            var o = c || {};
            if (+o.codepage >= 0 && zr(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
            var l = Fr(),
                h = m0(f, {
                    header: 1,
                    raw: !0,
                    cellDates: !0
                }),
                x = h[0],
                d = h.slice(1),
                v = f["!cols"] || [],
                u = 0,
                p = 0,
                k = 0,
                A = 1;
            for (u = 0; u < x.length; ++u) {
                if (((v[u] || {}).DBF || {}).name) {
                    x[u] = v[u].DBF.name, ++k;
                    continue
                }
                if (x[u] != null) {
                    if (++k, typeof x[u] == "number" && (x[u] = x[u].toString(10)), typeof x[u] != "string") throw new Error("DBF Invalid column name " + x[u] + " |" + typeof x[u] + "|");
                    if (x.indexOf(x[u]) !== u) {
                        for (p = 0; p < 1024; ++p)
                            if (x.indexOf(x[u] + "_" + p) == -1) {
                                x[u] += "_" + p;
                                break
                            }
                    }
                }
            }
            var g = De(f["!ref"]),
                O = [],
                b = [],
                N = [];
            for (u = 0; u <= g.e.c - g.s.c; ++u) {
                var F = "",
                    B = "",
                    I = 0,
                    z = [];
                for (p = 0; p < d.length; ++p) d[p][u] != null && z.push(d[p][u]);
                if (z.length == 0 || x[u] == null) {
                    O[u] = "?";
                    continue
                }
                for (p = 0; p < z.length; ++p) {
                    switch (typeof z[p]) {
                        case "number":
                            B = "B";
                            break;
                        case "string":
                            B = "C";
                            break;
                        case "boolean":
                            B = "L";
                            break;
                        case "object":
                            B = z[p] instanceof Date ? "D" : "C";
                            break;
                        default:
                            B = "C"
                    }
                    I = Math.max(I, String(z[p]).length), F = F && F != B ? "C" : B
                }
                I > 250 && (I = 250), B = ((v[u] || {}).DBF || {}).type, B == "C" && v[u].DBF.len > I && (I = v[u].DBF.len), F == "B" && B == "N" && (F = "N", N[u] = v[u].DBF.dec, I = v[u].DBF.len), b[u] = F == "C" || B == "N" ? I : i[F] || 0, A += b[u], O[u] = F
            }
            var G = l.next(32);
            for (G.write_shift(4, 318902576), G.write_shift(4, d.length), G.write_shift(2, 296 + 32 * k), G.write_shift(2, A), u = 0; u < 4; ++u) G.write_shift(4, 0);
            for (G.write_shift(4, 0 | (+t[ts] || 3) << 8), u = 0, p = 0; u < x.length; ++u)
                if (x[u] != null) {
                    var L = l.next(32),
                        J = (x[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
                    L.write_shift(1, J, "sbcs"), L.write_shift(1, O[u] == "?" ? "C" : O[u], "sbcs"), L.write_shift(4, p), L.write_shift(1, b[u] || i[O[u]] || 0), L.write_shift(1, N[u] || 0), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(1, 0), L.write_shift(4, 0), L.write_shift(4, 0), p += b[u] || i[O[u]] || 0
                } var le = l.next(264);
            for (le.write_shift(4, 13), u = 0; u < 65; ++u) le.write_shift(4, 0);
            for (u = 0; u < d.length; ++u) {
                var ie = l.next(A);
                for (ie.write_shift(1, 0), p = 0; p < x.length; ++p)
                    if (x[p] != null) switch (O[p]) {
                        case "L":
                            ie.write_shift(1, d[u][p] == null ? 63 : d[u][p] ? 84 : 70);
                            break;
                        case "B":
                            ie.write_shift(8, d[u][p] || 0, "f");
                            break;
                        case "N":
                            var ue = "0";
                            for (typeof d[u][p] == "number" && (ue = d[u][p].toFixed(N[p] || 0)), k = 0; k < b[p] - ue.length; ++k) ie.write_shift(1, 32);
                            ie.write_shift(1, ue, "sbcs");
                            break;
                        case "D":
                            d[u][p] ? (ie.write_shift(4, ("0000" + d[u][p].getFullYear()).slice(-4), "sbcs"), ie.write_shift(2, ("00" + (d[u][p].getMonth() + 1)).slice(-2), "sbcs"), ie.write_shift(2, ("00" + d[u][p].getDate()).slice(-2), "sbcs")) : ie.write_shift(8, "00000000", "sbcs");
                            break;
                        case "C":
                            var ce = String(d[u][p] != null ? d[u][p] : "").slice(0, b[p]);
                            for (ie.write_shift(1, ce, "sbcs"), k = 0; k < b[p] - ce.length; ++k) ie.write_shift(1, 32);
                            break
                    }
            }
            return l.next(1).write_shift(1, 26), l.end()
        }
        return {
            to_workbook: n,
            to_sheet: a,
            from_sheet: s
        }
    }(),
    vf = function() {
        var e = {
                AA: "À",
                BA: "Á",
                CA: "Â",
                DA: 195,
                HA: "Ä",
                JA: 197,
                AE: "È",
                BE: "É",
                CE: "Ê",
                HE: "Ë",
                AI: "Ì",
                BI: "Í",
                CI: "Î",
                HI: "Ï",
                AO: "Ò",
                BO: "Ó",
                CO: "Ô",
                DO: 213,
                HO: "Ö",
                AU: "Ù",
                BU: "Ú",
                CU: "Û",
                HU: "Ü",
                Aa: "à",
                Ba: "á",
                Ca: "â",
                Da: 227,
                Ha: "ä",
                Ja: 229,
                Ae: "è",
                Be: "é",
                Ce: "ê",
                He: "ë",
                Ai: "ì",
                Bi: "í",
                Ci: "î",
                Hi: "ï",
                Ao: "ò",
                Bo: "ó",
                Co: "ô",
                Do: 245,
                Ho: "ö",
                Au: "ù",
                Bu: "ú",
                Cu: "û",
                Hu: "ü",
                KC: "Ç",
                Kc: "ç",
                q: "æ",
                z: "œ",
                a: "Æ",
                j: "Œ",
                DN: 209,
                Dn: 241,
                Hy: 255,
                S: 169,
                c: 170,
                R: 174,
                "B ": 180,
                0: 176,
                1: 177,
                2: 178,
                3: 179,
                5: 181,
                6: 182,
                7: 183,
                Q: 185,
                k: 186,
                b: 208,
                i: 216,
                l: 222,
                s: 240,
                y: 248,
                "!": 161,
                '"': 162,
                "#": 163,
                "(": 164,
                "%": 165,
                "'": 167,
                "H ": 168,
                "+": 171,
                ";": 187,
                "<": 188,
                "=": 189,
                ">": 190,
                "?": 191,
                "{": 223
            },
            t = new RegExp("\x1BN(" + Ke(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"),
            r = function(x, d) {
                var v = e[d];
                return typeof v == "number" ? Kn(v) : v
            },
            a = function(x, d, v) {
                var u = d.charCodeAt(0) - 32 << 4 | v.charCodeAt(0) - 48;
                return u == 59 ? x : Kn(u)
            };
        e["|"] = 254;

        function n(x, d) {
            switch (d.type) {
                case "base64":
                    return i(Rr(x), d);
                case "binary":
                    return i(x, d);
                case "buffer":
                    return i(Te && Buffer.isBuffer(x) ? x.toString("binary") : St(x), d);
                case "array":
                    return i(Lt(x), d)
            }
            throw new Error("Unrecognized type " + d.type)
        }

        function i(x, d) {
            var v = x.split(/[\n\r]+/),
                u = -1,
                p = -1,
                k = 0,
                A = 0,
                g = [],
                O = [],
                b = null,
                N = {},
                F = [],
                B = [],
                I = [],
                z = 0,
                G;
            for (+d.codepage >= 0 && zr(+d.codepage); k !== v.length; ++k) {
                z = 0;
                var L = v[k].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(t, r),
                    J = L.replace(/;;/g, "\0").split(";").map(function(R) {
                        return R.replace(/\u0000/g, ";")
                    }),
                    le = J[0],
                    ie;
                if (L.length > 0) switch (le) {
                    case "ID":
                        break;
                    case "E":
                        break;
                    case "B":
                        break;
                    case "O":
                        break;
                    case "W":
                        break;
                    case "P":
                        J[1].charAt(0) == "P" && O.push(L.slice(3).replace(/;;/g, ";"));
                        break;
                    case "C":
                        var ue = !1,
                            ce = !1,
                            be = !1,
                            V = !1,
                            de = -1,
                            ge = -1;
                        for (A = 1; A < J.length; ++A) switch (J[A].charAt(0)) {
                            case "A":
                                break;
                            case "X":
                                p = parseInt(J[A].slice(1)) - 1, ce = !0;
                                break;
                            case "Y":
                                for (u = parseInt(J[A].slice(1)) - 1, ce || (p = 0), G = g.length; G <= u; ++G) g[G] = [];
                                break;
                            case "K":
                                ie = J[A].slice(1), ie.charAt(0) === '"' ? ie = ie.slice(1, ie.length - 1) : ie === "TRUE" ? ie = !0 : ie === "FALSE" ? ie = !1 : isNaN(Kr(ie)) ? isNaN(ta(ie).getDate()) || (ie = Ue(ie)) : (ie = Kr(ie), b !== null && ia(b) && (ie = E0(ie))), ue = !0;
                                break;
                            case "E":
                                V = !0;
                                var C = ea(J[A].slice(1), {
                                    r: u,
                                    c: p
                                });
                                g[u][p] = [g[u][p], C];
                                break;
                            case "S":
                                be = !0, g[u][p] = [g[u][p], "S5S"];
                                break;
                            case "G":
                                break;
                            case "R":
                                de = parseInt(J[A].slice(1)) - 1;
                                break;
                            case "C":
                                ge = parseInt(J[A].slice(1)) - 1;
                                break;
                            default:
                                if (d && d.WTF) throw new Error("SYLK bad record " + L)
                        }
                        if (ue && (g[u][p] && g[u][p].length == 2 ? g[u][p][0] = ie : g[u][p] = ie, b = null), be) {
                            if (V) throw new Error("SYLK shared formula cannot have own formula");
                            var P = de > -1 && g[de][ge];
                            if (!P || !P[1]) throw new Error("SYLK shared formula cannot find base");
                            g[u][p][1] = Nf(P[1], {
                                r: u - de,
                                c: p - ge
                            })
                        }
                        break;
                    case "F":
                        var D = 0;
                        for (A = 1; A < J.length; ++A) switch (J[A].charAt(0)) {
                            case "X":
                                p = parseInt(J[A].slice(1)) - 1, ++D;
                                break;
                            case "Y":
                                for (u = parseInt(J[A].slice(1)) - 1, G = g.length; G <= u; ++G) g[G] = [];
                                break;
                            case "M":
                                z = parseInt(J[A].slice(1)) / 20;
                                break;
                            case "F":
                                break;
                            case "G":
                                break;
                            case "P":
                                b = O[parseInt(J[A].slice(1))];
                                break;
                            case "S":
                                break;
                            case "D":
                                break;
                            case "N":
                                break;
                            case "W":
                                for (I = J[A].slice(1).split(" "), G = parseInt(I[0], 10); G <= parseInt(I[1], 10); ++G) z = parseInt(I[2], 10), B[G - 1] = z === 0 ? {
                                    hidden: !0
                                } : {
                                    wch: z
                                }, kt(B[G - 1]);
                                break;
                            case "C":
                                p = parseInt(J[A].slice(1)) - 1, B[p] || (B[p] = {});
                                break;
                            case "R":
                                u = parseInt(J[A].slice(1)) - 1, F[u] || (F[u] = {}), z > 0 ? (F[u].hpt = z, F[u].hpx = na(z)) : z === 0 && (F[u].hidden = !0);
                                break;
                            default:
                                if (d && d.WTF) throw new Error("SYLK bad record " + L)
                        }
                        D < 1 && (b = null);
                        break;
                    default:
                        if (d && d.WTF) throw new Error("SYLK bad record " + L)
                }
            }
            return F.length > 0 && (N["!rows"] = F), B.length > 0 && (N["!cols"] = B), d && d.sheetRows && (g = g.slice(0, d.sheetRows)), [g, N]
        }

        function s(x, d) {
            var v = n(x, d),
                u = v[0],
                p = v[1],
                k = fa(u, d);
            return Ke(p).forEach(function(A) {
                k[A] = p[A]
            }), k
        }

        function f(x, d) {
            return Ft(s(x, d), d)
        }

        function c(x, d, v, u) {
            var p = "C;Y" + (v + 1) + ";X" + (u + 1) + ";K";
            switch (x.t) {
                case "n":
                    p += x.v || 0, x.f && !x.F && (p += ";E" + On(x.f, {
                        r: v,
                        c: u
                    }));
                    break;
                case "b":
                    p += x.v ? "TRUE" : "FALSE";
                    break;
                case "e":
                    p += x.w || x.v;
                    break;
                case "d":
                    p += '"' + (x.w || x.v) + '"';
                    break;
                case "s":
                    p += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
                    break
            }
            return p
        }

        function o(x, d) {
            d.forEach(function(v, u) {
                var p = "F;W" + (u + 1) + " " + (u + 1) + " ";
                v.hidden ? p += "0" : (typeof v.width == "number" && !v.wpx && (v.wpx = Na(v.width)), typeof v.wpx == "number" && !v.wch && (v.wch = ba(v.wpx)), typeof v.wch == "number" && (p += Math.round(v.wch))), p.charAt(p.length - 1) != " " && x.push(p)
            })
        }

        function l(x, d) {
            d.forEach(function(v, u) {
                var p = "F;";
                v.hidden ? p += "M0;" : v.hpt ? p += "M" + 20 * v.hpt + ";" : v.hpx && (p += "M" + 20 * Pa(v.hpx) + ";"), p.length > 2 && x.push(p + "R" + (u + 1))
            })
        }

        function h(x, d) {
            var v = ["ID;PWXL;N;E"],
                u = [],
                p = De(x["!ref"]),
                k, A = Array.isArray(x),
                g = `\r
`;
            v.push("P;PGeneral"), v.push("F;P0;DG0G8;M255"), x["!cols"] && o(v, x["!cols"]), x["!rows"] && l(v, x["!rows"]), v.push("B;Y" + (p.e.r - p.s.r + 1) + ";X" + (p.e.c - p.s.c + 1) + ";D" + [p.s.c, p.s.r, p.e.c, p.e.r].join(" "));
            for (var O = p.s.r; O <= p.e.r; ++O)
                for (var b = p.s.c; b <= p.e.c; ++b) {
                    var N = pe({
                        r: O,
                        c: b
                    });
                    k = A ? (x[O] || [])[b] : x[N], !(!k || k.v == null && (!k.f || k.F)) && u.push(c(k, x, O, b))
                }
            return v.join(g) + g + u.join(g) + g + "E" + g
        }
        return {
            to_workbook: f,
            to_sheet: s,
            from_sheet: h
        }
    }(),
    pf = function() {
        function e(i, s) {
            switch (s.type) {
                case "base64":
                    return t(Rr(i), s);
                case "binary":
                    return t(i, s);
                case "buffer":
                    return t(Te && Buffer.isBuffer(i) ? i.toString("binary") : St(i), s);
                case "array":
                    return t(Lt(i), s)
            }
            throw new Error("Unrecognized type " + s.type)
        }

        function t(i, s) {
            for (var f = i.split(`
`), c = -1, o = -1, l = 0, h = []; l !== f.length; ++l) {
                if (f[l].trim() === "BOT") {
                    h[++c] = [], o = 0;
                    continue
                }
                if (!(c < 0)) {
                    var x = f[l].trim().split(","),
                        d = x[0],
                        v = x[1];
                    ++l;
                    for (var u = f[l] || "";
                        (u.match(/["]/g) || []).length & 1 && l < f.length - 1;) u += `
` + f[++l];
                    switch (u = u.trim(), +d) {
                        case -1:
                            if (u === "BOT") {
                                h[++c] = [], o = 0;
                                continue
                            } else if (u !== "EOD") throw new Error("Unrecognized DIF special command " + u);
                            break;
                        case 0:
                            u === "TRUE" ? h[c][o] = !0 : u === "FALSE" ? h[c][o] = !1 : isNaN(Kr(v)) ? isNaN(ta(v).getDate()) ? h[c][o] = v : h[c][o] = Ue(v) : h[c][o] = Kr(v), ++o;
                            break;
                        case 1:
                            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), h[c][o++] = u !== "" ? u : null;
                            break
                    }
                    if (u === "EOD") break
                }
            }
            return s && s.sheetRows && (h = h.slice(0, s.sheetRows)), h
        }

        function r(i, s) {
            return fa(e(i, s), s)
        }

        function a(i, s) {
            return Ft(r(i, s), s)
        }
        var n = function() {
            var i = function(c, o, l, h, x) {
                    c.push(o), c.push(l + "," + h), c.push('"' + x.replace(/"/g, '""') + '"')
                },
                s = function(c, o, l, h) {
                    c.push(o + "," + l), c.push(o == 1 ? '"' + h.replace(/"/g, '""') + '"' : h)
                };
            return function(c) {
                var o = [],
                    l = De(c["!ref"]),
                    h, x = Array.isArray(c);
                i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, l.e.r - l.s.r + 1, ""), i(o, "TUPLES", 0, l.e.c - l.s.c + 1, ""), i(o, "DATA", 0, 0, "");
                for (var d = l.s.r; d <= l.e.r; ++d) {
                    s(o, -1, 0, "BOT");
                    for (var v = l.s.c; v <= l.e.c; ++v) {
                        var u = pe({
                            r: d,
                            c: v
                        });
                        if (h = x ? (c[d] || [])[v] : c[u], !h) {
                            s(o, 1, 0, "");
                            continue
                        }
                        switch (h.t) {
                            case "n":
                                var p = h.w;
                                !p && h.v != null && (p = h.v), p == null ? h.f && !h.F ? s(o, 1, 0, "=" + h.f) : s(o, 1, 0, "") : s(o, 0, p, "V");
                                break;
                            case "b":
                                s(o, 0, h.v ? 1 : 0, h.v ? "TRUE" : "FALSE");
                                break;
                            case "s":
                                s(o, 1, 0, isNaN(h.v) ? h.v : '="' + h.v + '"');
                                break;
                            case "d":
                                h.w || (h.w = Vr(h.z || ve[14], nr(Ue(h.v)))), s(o, 0, h.w, "V");
                                break;
                            default:
                                s(o, 1, 0, "")
                        }
                    }
                }
                s(o, -1, 0, "EOD");
                var k = `\r
`,
                    A = o.join(k);
                return A
            }
        }();
        return {
            to_workbook: a,
            to_sheet: r,
            from_sheet: n
        }
    }(),
    mf = function() {
        function e(h) {
            return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`)
        }

        function t(h) {
            return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n")
        }

        function r(h, x) {
            for (var d = h.split(`
`), v = -1, u = -1, p = 0, k = []; p !== d.length; ++p) {
                var A = d[p].trim().split(":");
                if (A[0] === "cell") {
                    var g = Xe(A[1]);
                    if (k.length <= g.r)
                        for (v = k.length; v <= g.r; ++v) k[v] || (k[v] = []);
                    switch (v = g.r, u = g.c, A[2]) {
                        case "t":
                            k[v][u] = e(A[3]);
                            break;
                        case "v":
                            k[v][u] = +A[3];
                            break;
                        case "vtf":
                            var O = A[A.length - 1];
                        case "vtc":
                            switch (A[3]) {
                                case "nl":
                                    k[v][u] = !!+A[4];
                                    break;
                                default:
                                    k[v][u] = +A[4];
                                    break
                            }
                            A[2] == "vtf" && (k[v][u] = [k[v][u], O])
                    }
                }
            }
            return x && x.sheetRows && (k = k.slice(0, x.sheetRows)), k
        }

        function a(h, x) {
            return fa(r(h, x), x)
        }

        function n(h, x) {
            return Ft(a(h, x), x)
        }
        var i = ["socialcalc:version:1.5", "MIME-Version: 1.0", "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"].join(`
`),
            s = ["--SocialCalcSpreadsheetControlSave", "Content-type: text/plain; charset=UTF-8"].join(`
`) + `
`,
            f = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join(`
`),
            c = "--SocialCalcSpreadsheetControlSave--";

        function o(h) {
            if (!h || !h["!ref"]) return "";
            for (var x = [], d = [], v, u = "", p = Ar(h["!ref"]), k = Array.isArray(h), A = p.s.r; A <= p.e.r; ++A)
                for (var g = p.s.c; g <= p.e.c; ++g)
                    if (u = pe({
                            r: A,
                            c: g
                        }), v = k ? (h[A] || [])[g] : h[u], !(!v || v.v == null || v.t === "z")) {
                        switch (d = ["cell", u, "t"], v.t) {
                            case "s":
                            case "str":
                                d.push(t(v.v));
                                break;
                            case "n":
                                v.f ? (d[2] = "vtf", d[3] = "n", d[4] = v.v, d[5] = t(v.f)) : (d[2] = "v", d[3] = v.v);
                                break;
                            case "b":
                                d[2] = "vt" + (v.f ? "f" : "c"), d[3] = "nl", d[4] = v.v ? "1" : "0", d[5] = t(v.f || (v.v ? "TRUE" : "FALSE"));
                                break;
                            case "d":
                                var O = nr(Ue(v.v));
                                d[2] = "vtc", d[3] = "nd", d[4] = "" + O, d[5] = v.w || Vr(v.z || ve[14], O);
                                break;
                            case "e":
                                continue
                        }
                        x.push(d.join(":"))
                    } return x.push("sheet:c:" + (p.e.c - p.s.c + 1) + ":r:" + (p.e.r - p.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
`)
        }

        function l(h) {
            return [i, s, f, s, o(h), c].join(`
`)
        }
        return {
            to_workbook: n,
            to_sheet: a,
            from_sheet: l
        }
    }(),
    aa = function() {
        function e(l, h, x, d, v) {
            v.raw ? h[x][d] = l : l === "" || (l === "TRUE" ? h[x][d] = !0 : l === "FALSE" ? h[x][d] = !1 : isNaN(Kr(l)) ? isNaN(ta(l).getDate()) ? h[x][d] = l : h[x][d] = Ue(l) : h[x][d] = Kr(l))
        }

        function t(l, h) {
            var x = h || {},
                d = [];
            if (!l || l.length === 0) return d;
            for (var v = l.split(/[\r\n]/), u = v.length - 1; u >= 0 && v[u].length === 0;) --u;
            for (var p = 10, k = 0, A = 0; A <= u; ++A) k = v[A].indexOf(" "), k == -1 ? k = v[A].length : k++, p = Math.max(p, k);
            for (A = 0; A <= u; ++A) {
                d[A] = [];
                var g = 0;
                for (e(v[A].slice(0, p).trim(), d, A, g, x), g = 1; g <= (v[A].length - p) / 10 + 1; ++g) e(v[A].slice(p + (g - 1) * 10, p + g * 10).trim(), d, A, g, x)
            }
            return x.sheetRows && (d = d.slice(0, x.sheetRows)), d
        }
        var r = {
                44: ",",
                9: "	",
                59: ";",
                124: "|"
            },
            a = {
                44: 3,
                9: 2,
                59: 1,
                124: 0
            };

        function n(l) {
            for (var h = {}, x = !1, d = 0, v = 0; d < l.length; ++d)(v = l.charCodeAt(d)) == 34 ? x = !x : !x && v in r && (h[v] = (h[v] || 0) + 1);
            v = [];
            for (d in h) Object.prototype.hasOwnProperty.call(h, d) && v.push([h[d], d]);
            if (!v.length) {
                h = a;
                for (d in h) Object.prototype.hasOwnProperty.call(h, d) && v.push([h[d], d])
            }
            return v.sort(function(u, p) {
                return u[0] - p[0] || a[u[1]] - a[p[1]]
            }), r[v.pop()[1]] || 44
        }

        function i(l, h) {
            var x = h || {},
                d = "",
                v = x.dense ? [] : {},
                u = {
                    s: {
                        c: 0,
                        r: 0
                    },
                    e: {
                        c: 0,
                        r: 0
                    }
                };
            l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (d = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (d = l.charAt(4), l = l.slice(6)) : d = n(l.slice(0, 1024)) : x && x.FS ? d = x.FS : d = n(l.slice(0, 1024));
            var p = 0,
                k = 0,
                A = 0,
                g = 0,
                O = 0,
                b = d.charCodeAt(0),
                N = !1,
                F = 0,
                B = l.charCodeAt(0);
            l = l.replace(/\r\n/mg, `
`);
            var I = x.dateNF != null ? eo(x.dateNF) : null;

            function z() {
                var G = l.slice(g, O),
                    L = {};
                if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0) L.t = "z";
                else if (x.raw) L.t = "s", L.v = G;
                else if (G.trim().length === 0) L.t = "s", L.v = G;
                else if (G.charCodeAt(0) == 61) G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (L.t = "s", L.v = G.slice(2, -1).replace(/""/g, '"')) : Ox(G) ? (L.t = "n", L.f = G.slice(1)) : (L.t = "s", L.v = G);
                else if (G == "TRUE") L.t = "b", L.v = !0;
                else if (G == "FALSE") L.t = "b", L.v = !1;
                else if (!isNaN(A = Kr(G))) L.t = "n", x.cellText !== !1 && (L.w = G), L.v = A;
                else if (!isNaN(ta(G).getDate()) || I && G.match(I)) {
                    L.z = x.dateNF || ve[14];
                    var J = 0;
                    I && G.match(I) && (G = ro(G, x.dateNF, G.match(I) || []), J = 1), x.cellDates ? (L.t = "d", L.v = Ue(G, J)) : (L.t = "n", L.v = nr(Ue(G, J))), x.cellText !== !1 && (L.w = Vr(L.z, L.v instanceof Date ? nr(L.v) : L.v)), x.cellNF || delete L.z
                } else L.t = "s", L.v = G;
                if (L.t == "z" || (x.dense ? (v[p] || (v[p] = []), v[p][k] = L) : v[pe({
                        c: k,
                        r: p
                    })] = L), g = O + 1, B = l.charCodeAt(g), u.e.c < k && (u.e.c = k), u.e.r < p && (u.e.r = p), F == b) ++k;
                else if (k = 0, ++p, x.sheetRows && x.sheetRows <= p) return !0
            }
            e: for (; O < l.length; ++O) switch (F = l.charCodeAt(O)) {
                case 34:
                    B === 34 && (N = !N);
                    break;
                case b:
                case 10:
                case 13:
                    if (!N && z()) break e;
                    break
            }
            return O - g > 0 && z(), v["!ref"] = we(u), v
        }

        function s(l, h) {
            return !(h && h.PRN) || h.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? i(l, h) : fa(t(l, h), h)
        }

        function f(l, h) {
            var x = "",
                d = h.type == "string" ? [0, 0, 0, 0] : Mn(l, h);
            switch (h.type) {
                case "base64":
                    x = Rr(l);
                    break;
                case "binary":
                    x = l;
                    break;
                case "buffer":
                    h.codepage == 65001 ? x = l.toString("utf8") : h.codepage && typeof mt < "u" ? x = mt.utils.decode(h.codepage, l) : x = Te && Buffer.isBuffer(l) ? l.toString("binary") : St(l);
                    break;
                case "array":
                    x = Lt(l);
                    break;
                case "string":
                    x = l;
                    break;
                default:
                    throw new Error("Unrecognized type " + h.type)
            }
            return d[0] == 239 && d[1] == 187 && d[2] == 191 ? x = Pe(x.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? x = Pe(x) : h.type == "binary" && typeof mt < "u" && h.codepage && (x = mt.utils.decode(h.codepage, mt.utils.encode(28591, x))), x.slice(0, 19) == "socialcalc:version:" ? mf.to_sheet(h.type == "string" ? x : Pe(x), h) : s(x, h)
        }

        function c(l, h) {
            return Ft(f(l, h), h)
        }

        function o(l) {
            for (var h = [], x = De(l["!ref"]), d, v = Array.isArray(l), u = x.s.r; u <= x.e.r; ++u) {
                for (var p = [], k = x.s.c; k <= x.e.c; ++k) {
                    var A = pe({
                        r: u,
                        c: k
                    });
                    if (d = v ? (l[u] || [])[k] : l[A], !d || d.v == null) {
                        p.push("          ");
                        continue
                    }
                    for (var g = (d.w || (lt(d), d.w) || "").slice(0, 10); g.length < 10;) g += " ";
                    p.push(g + (k === 0 ? " " : ""))
                }
                h.push(p.join(""))
            }
            return h.join(`
`)
        }
        return {
            to_workbook: c,
            to_sheet: f,
            from_sheet: o
        }
    }();

function pu(e, t) {
    var r = t || {},
        a = !!r.WTF;
    r.WTF = !0;
    try {
        var n = vf.to_workbook(e, r);
        return r.WTF = a, n
    } catch (i) {
        if (r.WTF = a, !i.message.match(/SYLK bad record ID/) && a) throw i;
        return aa.to_workbook(e, t)
    }
}
var Nt = function() {
    function e(C, P, D) {
        if (C) {
            or(C, C.l || 0);
            for (var R = D.Enum || de; C.l < C.length;) {
                var j = C.read_shift(2),
                    re = R[j] || R[65535],
                    te = C.read_shift(2),
                    Q = C.l + te,
                    Z = re.f && re.f(C, te, D);
                if (C.l = Q, P(Z, re, j)) return
            }
        }
    }

    function t(C, P) {
        switch (P.type) {
            case "base64":
                return r(Or(Rr(C)), P);
            case "binary":
                return r(Or(C), P);
            case "buffer":
            case "array":
                return r(C, P)
        }
        throw "Unsupported type " + P.type
    }

    function r(C, P) {
        if (!C) return C;
        var D = P || {},
            R = D.dense ? [] : {},
            j = "Sheet1",
            re = "",
            te = 0,
            Q = {},
            Z = [],
            Ee = [],
            y = {
                s: {
                    r: 0,
                    c: 0
                },
                e: {
                    r: 0,
                    c: 0
                }
            },
            Be = D.sheetRows || 0;
        if (C[2] == 0 && (C[3] == 8 || C[3] == 9) && C.length >= 16 && C[14] == 5 && C[15] === 108) throw new Error("Unsupported Works 3 for Mac file");
        if (C[2] == 2) D.Enum = de, e(C, function(fe, je, Nr) {
            switch (Nr) {
                case 0:
                    D.vers = fe, fe >= 4096 && (D.qpro = !0);
                    break;
                case 6:
                    y = fe;
                    break;
                case 204:
                    fe && (re = fe);
                    break;
                case 222:
                    re = fe;
                    break;
                case 15:
                case 51:
                    D.qpro || (fe[1].v = fe[1].v.slice(1));
                case 13:
                case 14:
                case 16:
                    Nr == 14 && (fe[2] & 112) == 112 && (fe[2] & 15) > 1 && (fe[2] & 15) < 15 && (fe[1].z = D.dateNF || ve[14], D.cellDates && (fe[1].t = "d", fe[1].v = E0(fe[1].v))), D.qpro && fe[3] > te && (R["!ref"] = we(y), Q[j] = R, Z.push(j), R = D.dense ? [] : {}, y = {
                        s: {
                            r: 0,
                            c: 0
                        },
                        e: {
                            r: 0,
                            c: 0
                        }
                    }, te = fe[3], j = re || "Sheet" + (te + 1), re = "");
                    var Yr = D.dense ? (R[fe[0].r] || [])[fe[0].c] : R[pe(fe[0])];
                    if (Yr) {
                        Yr.t = fe[1].t, Yr.v = fe[1].v, fe[1].z != null && (Yr.z = fe[1].z), fe[1].f != null && (Yr.f = fe[1].f);
                        break
                    }
                    D.dense ? (R[fe[0].r] || (R[fe[0].r] = []), R[fe[0].r][fe[0].c] = fe[1]) : R[pe(fe[0])] = fe[1];
                    break
            }
        }, D);
        else if (C[2] == 26 || C[2] == 14) D.Enum = ge, C[2] == 14 && (D.qpro = !0, C.l = 0), e(C, function(fe, je, Nr) {
            switch (Nr) {
                case 204:
                    j = fe;
                    break;
                case 22:
                    fe[1].v = fe[1].v.slice(1);
                case 23:
                case 24:
                case 25:
                case 37:
                case 39:
                case 40:
                    if (fe[3] > te && (R["!ref"] = we(y), Q[j] = R, Z.push(j), R = D.dense ? [] : {}, y = {
                            s: {
                                r: 0,
                                c: 0
                            },
                            e: {
                                r: 0,
                                c: 0
                            }
                        }, te = fe[3], j = "Sheet" + (te + 1)), Be > 0 && fe[0].r >= Be) break;
                    D.dense ? (R[fe[0].r] || (R[fe[0].r] = []), R[fe[0].r][fe[0].c] = fe[1]) : R[pe(fe[0])] = fe[1], y.e.c < fe[0].c && (y.e.c = fe[0].c), y.e.r < fe[0].r && (y.e.r = fe[0].r);
                    break;
                case 27:
                    fe[14e3] && (Ee[fe[14e3][0]] = fe[14e3][1]);
                    break;
                case 1537:
                    Ee[fe[0]] = fe[1], fe[0] == te && (j = fe[1]);
                    break
            }
        }, D);
        else throw new Error("Unrecognized LOTUS BOF " + C[2]);
        if (R["!ref"] = we(y), Q[re || j] = R, Z.push(re || j), !Ee.length) return {
            SheetNames: Z,
            Sheets: Q
        };
        for (var ye = {}, Le = [], Ae = 0; Ae < Ee.length; ++Ae) Q[Z[Ae]] ? (Le.push(Ee[Ae] || Z[Ae]), ye[Ee[Ae]] = Q[Ee[Ae]] || Q[Z[Ae]]) : (Le.push(Ee[Ae]), ye[Ee[Ae]] = {
            "!ref": "A1"
        });
        return {
            SheetNames: Le,
            Sheets: ye
        }
    }

    function a(C, P) {
        var D = P || {};
        if (+D.codepage >= 0 && zr(+D.codepage), D.type == "string") throw new Error("Cannot write WK1 to JS string");
        var R = Fr(),
            j = De(C["!ref"]),
            re = Array.isArray(C),
            te = [];
        ne(R, 0, i(1030)), ne(R, 6, c(j));
        for (var Q = Math.min(j.e.r, 8191), Z = j.s.r; Z <= Q; ++Z)
            for (var Ee = Ze(Z), y = j.s.c; y <= j.e.c; ++y) {
                Z === j.s.r && (te[y] = Ge(y));
                var Be = te[y] + Ee,
                    ye = re ? (C[Z] || [])[y] : C[Be];
                if (!(!ye || ye.t == "z"))
                    if (ye.t == "n")(ye.v | 0) == ye.v && ye.v >= -32768 && ye.v <= 32767 ? ne(R, 13, d(Z, y, ye.v)) : ne(R, 14, u(Z, y, ye.v));
                    else {
                        var Le = lt(ye);
                        ne(R, 15, h(Z, y, Le.slice(0, 239)))
                    }
            }
        return ne(R, 1), R.end()
    }

    function n(C, P) {
        var D = P || {};
        if (+D.codepage >= 0 && zr(+D.codepage), D.type == "string") throw new Error("Cannot write WK3 to JS string");
        var R = Fr();
        ne(R, 0, s(C));
        for (var j = 0, re = 0; j < C.SheetNames.length; ++j)(C.Sheets[C.SheetNames[j]] || {})["!ref"] && ne(R, 27, V(C.SheetNames[j], re++));
        var te = 0;
        for (j = 0; j < C.SheetNames.length; ++j) {
            var Q = C.Sheets[C.SheetNames[j]];
            if (!(!Q || !Q["!ref"])) {
                for (var Z = De(Q["!ref"]), Ee = Array.isArray(Q), y = [], Be = Math.min(Z.e.r, 8191), ye = Z.s.r; ye <= Be; ++ye)
                    for (var Le = Ze(ye), Ae = Z.s.c; Ae <= Z.e.c; ++Ae) {
                        ye === Z.s.r && (y[Ae] = Ge(Ae));
                        var fe = y[Ae] + Le,
                            je = Ee ? (Q[ye] || [])[Ae] : Q[fe];
                        if (!(!je || je.t == "z"))
                            if (je.t == "n") ne(R, 23, z(ye, Ae, te, je.v));
                            else {
                                var Nr = lt(je);
                                ne(R, 22, F(ye, Ae, te, Nr.slice(0, 239)))
                            }
                    }++te
            }
        }
        return ne(R, 1), R.end()
    }

    function i(C) {
        var P = X(2);
        return P.write_shift(2, C), P
    }

    function s(C) {
        var P = X(26);
        P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
        for (var D = 0, R = 0, j = 0, re = 0; re < C.SheetNames.length; ++re) {
            var te = C.SheetNames[re],
                Q = C.Sheets[te];
            if (!(!Q || !Q["!ref"])) {
                ++j;
                var Z = Ar(Q["!ref"]);
                D < Z.e.r && (D = Z.e.r), R < Z.e.c && (R = Z.e.c)
            }
        }
        return D > 8191 && (D = 8191), P.write_shift(2, D), P.write_shift(1, j), P.write_shift(1, R), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P
    }

    function f(C, P, D) {
        var R = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: 0
            }
        };
        return P == 8 && D.qpro ? (R.s.c = C.read_shift(1), C.l++, R.s.r = C.read_shift(2), R.e.c = C.read_shift(1), C.l++, R.e.r = C.read_shift(2), R) : (R.s.c = C.read_shift(2), R.s.r = C.read_shift(2), P == 12 && D.qpro && (C.l += 2), R.e.c = C.read_shift(2), R.e.r = C.read_shift(2), P == 12 && D.qpro && (C.l += 2), R.s.c == 65535 && (R.s.c = R.e.c = R.s.r = R.e.r = 0), R)
    }

    function c(C) {
        var P = X(8);
        return P.write_shift(2, C.s.c), P.write_shift(2, C.s.r), P.write_shift(2, C.e.c), P.write_shift(2, C.e.r), P
    }

    function o(C, P, D) {
        var R = [{
            c: 0,
            r: 0
        }, {
            t: "n",
            v: 0
        }, 0, 0];
        return D.qpro && D.vers != 20768 ? (R[0].c = C.read_shift(1), R[3] = C.read_shift(1), R[0].r = C.read_shift(2), C.l += 2) : (R[2] = C.read_shift(1), R[0].c = C.read_shift(2), R[0].r = C.read_shift(2)), R
    }

    function l(C, P, D) {
        var R = C.l + P,
            j = o(C, P, D);
        if (j[1].t = "s", D.vers == 20768) {
            C.l++;
            var re = C.read_shift(1);
            return j[1].v = C.read_shift(re, "utf8"), j
        }
        return D.qpro && C.l++, j[1].v = C.read_shift(R - C.l, "cstr"), j
    }

    function h(C, P, D) {
        var R = X(7 + D.length);
        R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(1, 39);
        for (var j = 0; j < R.length; ++j) {
            var re = D.charCodeAt(j);
            R.write_shift(1, re >= 128 ? 95 : re)
        }
        return R.write_shift(1, 0), R
    }

    function x(C, P, D) {
        var R = o(C, P, D);
        return R[1].v = C.read_shift(2, "i"), R
    }

    function d(C, P, D) {
        var R = X(7);
        return R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(2, D, "i"), R
    }

    function v(C, P, D) {
        var R = o(C, P, D);
        return R[1].v = C.read_shift(8, "f"), R
    }

    function u(C, P, D) {
        var R = X(13);
        return R.write_shift(1, 255), R.write_shift(2, P), R.write_shift(2, C), R.write_shift(8, D, "f"), R
    }

    function p(C, P, D) {
        var R = C.l + P,
            j = o(C, P, D);
        if (j[1].v = C.read_shift(8, "f"), D.qpro) C.l = R;
        else {
            var re = C.read_shift(2);
            O(C.slice(C.l, C.l + re), j), C.l += re
        }
        return j
    }

    function k(C, P, D) {
        var R = P & 32768;
        return P &= -32769, P = (R ? C : 0) + (P >= 8192 ? P - 16384 : P), (R ? "" : "$") + (D ? Ge(P) : Ze(P))
    }
    var A = {
            51: ["FALSE", 0],
            52: ["TRUE", 0],
            70: ["LEN", 1],
            80: ["SUM", 69],
            81: ["AVERAGEA", 69],
            82: ["COUNTA", 69],
            83: ["MINA", 69],
            84: ["MAXA", 69],
            111: ["T", 1]
        },
        g = ["", "", "", "", "", "", "", "", "", "+", "-", "*", "/", "^", "=", "<>", "<=", ">=", "<", ">", "", "", "", "", "&", "", "", "", "", "", "", ""];

    function O(C, P) {
        or(C, 0);
        for (var D = [], R = 0, j = "", re = "", te = "", Q = ""; C.l < C.length;) {
            var Z = C[C.l++];
            switch (Z) {
                case 0:
                    D.push(C.read_shift(8, "f"));
                    break;
                case 1:
                    re = k(P[0].c, C.read_shift(2), !0), j = k(P[0].r, C.read_shift(2), !1), D.push(re + j);
                    break;
                case 2: {
                    var Ee = k(P[0].c, C.read_shift(2), !0),
                        y = k(P[0].r, C.read_shift(2), !1);
                    re = k(P[0].c, C.read_shift(2), !0), j = k(P[0].r, C.read_shift(2), !1), D.push(Ee + y + ":" + re + j)
                }
                break;
                case 3:
                    if (C.l < C.length) {
                        console.error("WK1 premature formula end");
                        return
                    }
                    break;
                case 4:
                    D.push("(" + D.pop() + ")");
                    break;
                case 5:
                    D.push(C.read_shift(2));
                    break;
                case 6: {
                    for (var Be = ""; Z = C[C.l++];) Be += String.fromCharCode(Z);
                    D.push('"' + Be.replace(/"/g, '""') + '"')
                }
                break;
                case 8:
                    D.push("-" + D.pop());
                    break;
                case 23:
                    D.push("+" + D.pop());
                    break;
                case 22:
                    D.push("NOT(" + D.pop() + ")");
                    break;
                case 20:
                case 21:
                    Q = D.pop(), te = D.pop(), D.push(["AND", "OR"][Z - 20] + "(" + te + "," + Q + ")");
                    break;
                default:
                    if (Z < 32 && g[Z]) Q = D.pop(), te = D.pop(), D.push(te + g[Z] + Q);
                    else if (A[Z]) {
                        if (R = A[Z][1], R == 69 && (R = C[C.l++]), R > D.length) {
                            console.error("WK1 bad formula parse 0x" + Z.toString(16) + ":|" + D.join("|") + "|");
                            return
                        }
                        var ye = D.slice(-R);
                        D.length -= R, D.push(A[Z][0] + "(" + ye.join(",") + ")")
                    } else return Z <= 7 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 24 ? console.error("WK1 unsupported op " + Z.toString(16)) : Z <= 30 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 115 ? console.error("WK1 unsupported function opcode " + Z.toString(16)) : console.error("WK1 unrecognized opcode " + Z.toString(16))
            }
        }
        D.length == 1 ? P[1].f = "" + D[0] : console.error("WK1 bad formula parse |" + D.join("|") + "|")
    }

    function b(C) {
        var P = [{
            c: 0,
            r: 0
        }, {
            t: "n",
            v: 0
        }, 0];
        return P[0].r = C.read_shift(2), P[3] = C[C.l++], P[0].c = C[C.l++], P
    }

    function N(C, P) {
        var D = b(C);
        return D[1].t = "s", D[1].v = C.read_shift(P - 4, "cstr"), D
    }

    function F(C, P, D, R) {
        var j = X(6 + R.length);
        j.write_shift(2, C), j.write_shift(1, D), j.write_shift(1, P), j.write_shift(1, 39);
        for (var re = 0; re < R.length; ++re) {
            var te = R.charCodeAt(re);
            j.write_shift(1, te >= 128 ? 95 : te)
        }
        return j.write_shift(1, 0), j
    }

    function B(C, P) {
        var D = b(C);
        D[1].v = C.read_shift(2);
        var R = D[1].v >> 1;
        if (D[1].v & 1) switch (R & 7) {
            case 0:
                R = (R >> 3) * 5e3;
                break;
            case 1:
                R = (R >> 3) * 500;
                break;
            case 2:
                R = (R >> 3) / 20;
                break;
            case 3:
                R = (R >> 3) / 200;
                break;
            case 4:
                R = (R >> 3) / 2e3;
                break;
            case 5:
                R = (R >> 3) / 2e4;
                break;
            case 6:
                R = (R >> 3) / 16;
                break;
            case 7:
                R = (R >> 3) / 64;
                break
        }
        return D[1].v = R, D
    }

    function I(C, P) {
        var D = b(C),
            R = C.read_shift(4),
            j = C.read_shift(4),
            re = C.read_shift(2);
        if (re == 65535) return R === 0 && j === 3221225472 ? (D[1].t = "e", D[1].v = 15) : R === 0 && j === 3489660928 ? (D[1].t = "e", D[1].v = 42) : D[1].v = 0, D;
        var te = re & 32768;
        return re = (re & 32767) - 16446, D[1].v = (1 - te * 2) * (j * Math.pow(2, re + 32) + R * Math.pow(2, re)), D
    }

    function z(C, P, D, R) {
        var j = X(14);
        if (j.write_shift(2, C), j.write_shift(1, D), j.write_shift(1, P), R == 0) return j.write_shift(4, 0), j.write_shift(4, 0), j.write_shift(2, 65535), j;
        var re = 0,
            te = 0,
            Q = 0,
            Z = 0;
        return R < 0 && (re = 1, R = -R), te = Math.log2(R) | 0, R /= Math.pow(2, te - 31), Z = R >>> 0, Z & 2147483648 || (R /= 2, ++te, Z = R >>> 0), R -= Z, Z |= 2147483648, Z >>>= 0, R *= Math.pow(2, 32), Q = R >>> 0, j.write_shift(4, Q), j.write_shift(4, Z), te += 16383 + (re ? 32768 : 0), j.write_shift(2, te), j
    }

    function G(C, P) {
        var D = I(C);
        return C.l += P - 14, D
    }

    function L(C, P) {
        var D = b(C),
            R = C.read_shift(4);
        return D[1].v = R >> 6, D
    }

    function J(C, P) {
        var D = b(C),
            R = C.read_shift(8, "f");
        return D[1].v = R, D
    }

    function le(C, P) {
        var D = J(C);
        return C.l += P - 10, D
    }

    function ie(C, P) {
        return C[C.l + P - 1] == 0 ? C.read_shift(P, "cstr") : ""
    }

    function ue(C, P) {
        var D = C[C.l++];
        D > P - 1 && (D = P - 1);
        for (var R = ""; R.length < D;) R += String.fromCharCode(C[C.l++]);
        return R
    }

    function ce(C, P, D) {
        if (!(!D.qpro || P < 21)) {
            var R = C.read_shift(1);
            C.l += 17, C.l += 1, C.l += 2;
            var j = C.read_shift(P - 21, "cstr");
            return [R, j]
        }
    }

    function be(C, P) {
        for (var D = {}, R = C.l + P; C.l < R;) {
            var j = C.read_shift(2);
            if (j == 14e3) {
                for (D[j] = [0, ""], D[j][0] = C.read_shift(2); C[C.l];) D[j][1] += String.fromCharCode(C[C.l]), C.l++;
                C.l++
            }
        }
        return D
    }

    function V(C, P) {
        var D = X(5 + C.length);
        D.write_shift(2, 14e3), D.write_shift(2, P);
        for (var R = 0; R < C.length; ++R) {
            var j = C.charCodeAt(R);
            D[D.l++] = j > 127 ? 95 : j
        }
        return D[D.l++] = 0, D
    }
    var de = {
            0: {
                n: "BOF",
                f: rr
            },
            1: {
                n: "EOF"
            },
            2: {
                n: "CALCMODE"
            },
            3: {
                n: "CALCORDER"
            },
            4: {
                n: "SPLIT"
            },
            5: {
                n: "SYNC"
            },
            6: {
                n: "RANGE",
                f
            },
            7: {
                n: "WINDOW1"
            },
            8: {
                n: "COLW1"
            },
            9: {
                n: "WINTWO"
            },
            10: {
                n: "COLW2"
            },
            11: {
                n: "NAME"
            },
            12: {
                n: "BLANK"
            },
            13: {
                n: "INTEGER",
                f: x
            },
            14: {
                n: "NUMBER",
                f: v
            },
            15: {
                n: "LABEL",
                f: l
            },
            16: {
                n: "FORMULA",
                f: p
            },
            24: {
                n: "TABLE"
            },
            25: {
                n: "ORANGE"
            },
            26: {
                n: "PRANGE"
            },
            27: {
                n: "SRANGE"
            },
            28: {
                n: "FRANGE"
            },
            29: {
                n: "KRANGE1"
            },
            32: {
                n: "HRANGE"
            },
            35: {
                n: "KRANGE2"
            },
            36: {
                n: "PROTEC"
            },
            37: {
                n: "FOOTER"
            },
            38: {
                n: "HEADER"
            },
            39: {
                n: "SETUP"
            },
            40: {
                n: "MARGINS"
            },
            41: {
                n: "LABELFMT"
            },
            42: {
                n: "TITLES"
            },
            43: {
                n: "SHEETJS"
            },
            45: {
                n: "GRAPH"
            },
            46: {
                n: "NGRAPH"
            },
            47: {
                n: "CALCCOUNT"
            },
            48: {
                n: "UNFORMATTED"
            },
            49: {
                n: "CURSORW12"
            },
            50: {
                n: "WINDOW"
            },
            51: {
                n: "STRING",
                f: l
            },
            55: {
                n: "PASSWORD"
            },
            56: {
                n: "LOCKED"
            },
            60: {
                n: "QUERY"
            },
            61: {
                n: "QUERYNAME"
            },
            62: {
                n: "PRINT"
            },
            63: {
                n: "PRINTNAME"
            },
            64: {
                n: "GRAPH2"
            },
            65: {
                n: "GRAPHNAME"
            },
            66: {
                n: "ZOOM"
            },
            67: {
                n: "SYMSPLIT"
            },
            68: {
                n: "NSROWS"
            },
            69: {
                n: "NSCOLS"
            },
            70: {
                n: "RULER"
            },
            71: {
                n: "NNAME"
            },
            72: {
                n: "ACOMM"
            },
            73: {
                n: "AMACRO"
            },
            74: {
                n: "PARSE"
            },
            102: {
                n: "PRANGES??"
            },
            103: {
                n: "RRANGES??"
            },
            104: {
                n: "FNAME??"
            },
            105: {
                n: "MRANGES??"
            },
            204: {
                n: "SHEETNAMECS",
                f: ie
            },
            222: {
                n: "SHEETNAMELP",
                f: ue
            },
            65535: {
                n: ""
            }
        },
        ge = {
            0: {
                n: "BOF"
            },
            1: {
                n: "EOF"
            },
            2: {
                n: "PASSWORD"
            },
            3: {
                n: "CALCSET"
            },
            4: {
                n: "WINDOWSET"
            },
            5: {
                n: "SHEETCELLPTR"
            },
            6: {
                n: "SHEETLAYOUT"
            },
            7: {
                n: "COLUMNWIDTH"
            },
            8: {
                n: "HIDDENCOLUMN"
            },
            9: {
                n: "USERRANGE"
            },
            10: {
                n: "SYSTEMRANGE"
            },
            11: {
                n: "ZEROFORCE"
            },
            12: {
                n: "SORTKEYDIR"
            },
            13: {
                n: "FILESEAL"
            },
            14: {
                n: "DATAFILLNUMS"
            },
            15: {
                n: "PRINTMAIN"
            },
            16: {
                n: "PRINTSTRING"
            },
            17: {
                n: "GRAPHMAIN"
            },
            18: {
                n: "GRAPHSTRING"
            },
            19: {
                n: "??"
            },
            20: {
                n: "ERRCELL"
            },
            21: {
                n: "NACELL"
            },
            22: {
                n: "LABEL16",
                f: N
            },
            23: {
                n: "NUMBER17",
                f: I
            },
            24: {
                n: "NUMBER18",
                f: B
            },
            25: {
                n: "FORMULA19",
                f: G
            },
            26: {
                n: "FORMULA1A"
            },
            27: {
                n: "XFORMAT",
                f: be
            },
            28: {
                n: "DTLABELMISC"
            },
            29: {
                n: "DTLABELCELL"
            },
            30: {
                n: "GRAPHWINDOW"
            },
            31: {
                n: "CPA"
            },
            32: {
                n: "LPLAUTO"
            },
            33: {
                n: "QUERY"
            },
            34: {
                n: "HIDDENSHEET"
            },
            35: {
                n: "??"
            },
            37: {
                n: "NUMBER25",
                f: L
            },
            38: {
                n: "??"
            },
            39: {
                n: "NUMBER27",
                f: J
            },
            40: {
                n: "FORMULA28",
                f: le
            },
            142: {
                n: "??"
            },
            147: {
                n: "??"
            },
            150: {
                n: "??"
            },
            151: {
                n: "??"
            },
            152: {
                n: "??"
            },
            153: {
                n: "??"
            },
            154: {
                n: "??"
            },
            155: {
                n: "??"
            },
            156: {
                n: "??"
            },
            163: {
                n: "??"
            },
            174: {
                n: "??"
            },
            175: {
                n: "??"
            },
            176: {
                n: "??"
            },
            177: {
                n: "??"
            },
            184: {
                n: "??"
            },
            185: {
                n: "??"
            },
            186: {
                n: "??"
            },
            187: {
                n: "??"
            },
            188: {
                n: "??"
            },
            195: {
                n: "??"
            },
            201: {
                n: "??"
            },
            204: {
                n: "SHEETNAMECS",
                f: ie
            },
            205: {
                n: "??"
            },
            206: {
                n: "??"
            },
            207: {
                n: "??"
            },
            208: {
                n: "??"
            },
            256: {
                n: "??"
            },
            259: {
                n: "??"
            },
            260: {
                n: "??"
            },
            261: {
                n: "??"
            },
            262: {
                n: "??"
            },
            263: {
                n: "??"
            },
            265: {
                n: "??"
            },
            266: {
                n: "??"
            },
            267: {
                n: "??"
            },
            268: {
                n: "??"
            },
            270: {
                n: "??"
            },
            271: {
                n: "??"
            },
            384: {
                n: "??"
            },
            389: {
                n: "??"
            },
            390: {
                n: "??"
            },
            393: {
                n: "??"
            },
            396: {
                n: "??"
            },
            512: {
                n: "??"
            },
            514: {
                n: "??"
            },
            513: {
                n: "??"
            },
            516: {
                n: "??"
            },
            517: {
                n: "??"
            },
            640: {
                n: "??"
            },
            641: {
                n: "??"
            },
            642: {
                n: "??"
            },
            643: {
                n: "??"
            },
            644: {
                n: "??"
            },
            645: {
                n: "??"
            },
            646: {
                n: "??"
            },
            647: {
                n: "??"
            },
            648: {
                n: "??"
            },
            658: {
                n: "??"
            },
            659: {
                n: "??"
            },
            660: {
                n: "??"
            },
            661: {
                n: "??"
            },
            662: {
                n: "??"
            },
            665: {
                n: "??"
            },
            666: {
                n: "??"
            },
            768: {
                n: "??"
            },
            772: {
                n: "??"
            },
            1537: {
                n: "SHEETINFOQP",
                f: ce
            },
            1600: {
                n: "??"
            },
            1602: {
                n: "??"
            },
            1793: {
                n: "??"
            },
            1794: {
                n: "??"
            },
            1795: {
                n: "??"
            },
            1796: {
                n: "??"
            },
            1920: {
                n: "??"
            },
            2048: {
                n: "??"
            },
            2049: {
                n: "??"
            },
            2052: {
                n: "??"
            },
            2688: {
                n: "??"
            },
            10998: {
                n: "??"
            },
            12849: {
                n: "??"
            },
            28233: {
                n: "??"
            },
            28484: {
                n: "??"
            },
            65535: {
                n: ""
            }
        };
    return {
        sheet_to_wk1: a,
        book_to_wk3: n,
        to_workbook: t
    }
}();

function mu(e) {
    var t = {},
        r = e.match(_r),
        a = 0,
        n = !1;
    if (r)
        for (; a != r.length; ++a) {
            var i = me(r[a]);
            switch (i[0].replace(/\w*:/g, "")) {
                case "<condense":
                    break;
                case "<extend":
                    break;
                case "<shadow":
                    if (!i.val) break;
                case "<shadow>":
                case "<shadow/>":
                    t.shadow = 1;
                    break;
                case "</shadow>":
                    break;
                case "<charset":
                    if (i.val == "1") break;
                    t.cp = en[parseInt(i.val, 10)];
                    break;
                case "<outline":
                    if (!i.val) break;
                case "<outline>":
                case "<outline/>":
                    t.outline = 1;
                    break;
                case "</outline>":
                    break;
                case "<rFont":
                    t.name = i.val;
                    break;
                case "<sz":
                    t.sz = i.val;
                    break;
                case "<strike":
                    if (!i.val) break;
                case "<strike>":
                case "<strike/>":
                    t.strike = 1;
                    break;
                case "</strike>":
                    break;
                case "<u":
                    if (!i.val) break;
                    switch (i.val) {
                        case "double":
                            t.uval = "double";
                            break;
                        case "singleAccounting":
                            t.uval = "single-accounting";
                            break;
                        case "doubleAccounting":
                            t.uval = "double-accounting";
                            break
                    }
                case "<u>":
                case "<u/>":
                    t.u = 1;
                    break;
                case "</u>":
                    break;
                case "<b":
                    if (i.val == "0") break;
                case "<b>":
                case "<b/>":
                    t.b = 1;
                    break;
                case "</b>":
                    break;
                case "<i":
                    if (i.val == "0") break;
                case "<i>":
                case "<i/>":
                    t.i = 1;
                    break;
                case "</i>":
                    break;
                case "<color":
                    i.rgb && (t.color = i.rgb.slice(2, 8));
                    break;
                case "<color>":
                case "<color/>":
                case "</color>":
                    break;
                case "<family":
                    t.family = i.val;
                    break;
                case "<family>":
                case "<family/>":
                case "</family>":
                    break;
                case "<vertAlign":
                    t.valign = i.val;
                    break;
                case "<vertAlign>":
                case "<vertAlign/>":
                case "</vertAlign>":
                    break;
                case "<scheme":
                    break;
                case "<scheme>":
                case "<scheme/>":
                case "</scheme>":
                    break;
                case "<extLst":
                case "<extLst>":
                case "</extLst>":
                    break;
                case "<ext":
                    n = !0;
                    break;
                case "</ext>":
                    n = !1;
                    break;
                default:
                    if (i[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + i[0])
            }
        }
    return t
}
var gu = function() {
        var e = Ca("t"),
            t = Ca("rPr");

        function r(i) {
            var s = i.match(e);
            if (!s) return {
                t: "s",
                v: ""
            };
            var f = {
                    t: "s",
                    v: Ce(s[1])
                },
                c = i.match(t);
            return c && (f.s = mu(c[1])), f
        }
        var a = /<(?:\w+:)?r>/g,
            n = /<\/(?:\w+:)?r>/;
        return function(s) {
            return s.replace(a, "").split(n).map(r).filter(function(f) {
                return f.v
            })
        }
    }(),
    _u = function() {
        var t = /(\r\n|\n)/g;

        function r(n, i, s) {
            var f = [];
            n.u && f.push("text-decoration: underline;"), n.uval && f.push("text-underline-style:" + n.uval + ";"), n.sz && f.push("font-size:" + n.sz + "pt;"), n.outline && f.push("text-effect: outline;"), n.shadow && f.push("text-shadow: auto;"), i.push('<span style="' + f.join("") + '">'), n.b && (i.push("<b>"), s.push("</b>")), n.i && (i.push("<i>"), s.push("</i>")), n.strike && (i.push("<s>"), s.push("</s>"));
            var c = n.valign || "";
            return c == "superscript" || c == "super" ? c = "sup" : c == "subscript" && (c = "sub"), c != "" && (i.push("<" + c + ">"), s.push("</" + c + ">")), s.push("</span>"), n
        }

        function a(n) {
            var i = [
                [], n.v, []
            ];
            return n.v ? (n.s && r(n.s, i[0], i[2]), i[0].join("") + i[1].replace(t, "<br/>") + i[2].join("")) : ""
        }
        return function(i) {
            return i.map(a).join("")
        }
    }(),
    wu = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
    ku = /<(?:\w+:)?r>/,
    Eu = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;

function Fn(e, t) {
    var r = t ? t.cellHTML : !0,
        a = {};
    return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (a.t = Ce(Pe(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || "")), a.r = Pe(e), r && (a.h = hn(a.t))) : e.match(ku) && (a.r = Pe(e), a.t = Ce(Pe((e.replace(Eu, "").match(wu) || []).join("").replace(_r, ""))), r && (a.h = _u(gu(a.r)))), a) : {
        t: ""
    }
}
var Tu = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/,
    Su = /<(?:\w+:)?(?:si|sstItem)>/g,
    Fu = /<\/(?:\w+:)?(?:si|sstItem)>/;

function Au(e, t) {
    var r = [],
        a = "";
    if (!e) return r;
    var n = e.match(Tu);
    if (n) {
        a = n[2].replace(Su, "").split(Fu);
        for (var i = 0; i != a.length; ++i) {
            var s = Fn(a[i].trim(), t);
            s != null && (r[r.length] = s)
        }
        n = me(n[1]), r.Count = n.count, r.Unique = n.uniqueCount
    }
    return r
}
var yu = /^\s|\s$|[\t\n\r]/;

function gf(e, t) {
    if (!t.bookSST) return "";
    var r = [qe];
    r[r.length] = ae("sst", null, {
        xmlns: Ht[0],
        count: e.Count,
        uniqueCount: e.Unique
    });
    for (var a = 0; a != e.length; ++a)
        if (e[a] != null) {
            var n = e[a],
                i = "<si>";
            n.r ? i += n.r : (i += "<t", n.t || (n.t = ""), n.t.match(yu) && (i += ' xml:space="preserve"'), i += ">" + Ne(n.t) + "</t>"), i += "</si>", r[r.length] = i
        } return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("")
}

function Cu(e) {
    return [e.read_shift(4), e.read_shift(4)]
}

function Du(e, t) {
    var r = [],
        a = !1;
    return ut(e, function(i, s, f) {
        switch (f) {
            case 159:
                r.Count = i[0], r.Unique = i[1];
                break;
            case 19:
                r.push(i);
                break;
            case 160:
                return !0;
            case 35:
                a = !0;
                break;
            case 36:
                a = !1;
                break;
            default:
                if (s.T, !a || t.WTF) throw new Error("Unexpected record 0x" + f.toString(16))
        }
    }), r
}

function Ou(e, t) {
    return t || (t = X(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t
}
var Iu = Ho;

function Ru(e) {
    var t = Fr();
    Y(t, 159, Ou(e));
    for (var r = 0; r < e.length; ++r) Y(t, 19, Iu(e[r]));
    return Y(t, 160), t.end()
}

function _f(e) {
    for (var t = [], r = e.split(""), a = 0; a < r.length; ++a) t[a] = r[a].charCodeAt(0);
    return t
}

function ot(e, t) {
    var r = {};
    return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r
}

function Nu(e) {
    var t = {};
    return t.id = e.read_shift(0, "lpp4"), t.R = ot(e, 4), t.U = ot(e, 4), t.W = ot(e, 4), t
}

function bu(e) {
    for (var t = e.read_shift(4), r = e.l + t - 4, a = {}, n = e.read_shift(4), i = []; n-- > 0;) i.push({
        t: e.read_shift(4),
        v: e.read_shift(0, "lpp4")
    });
    if (a.name = e.read_shift(0, "lpp4"), a.comps = i, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
    return a
}

function Pu(e) {
    var t = [];
    e.l += 4;
    for (var r = e.read_shift(4); r-- > 0;) t.push(bu(e));
    return t
}

function Lu(e) {
    var t = [];
    e.l += 4;
    for (var r = e.read_shift(4); r-- > 0;) t.push(e.read_shift(0, "lpp4"));
    return t
}

function Bu(e) {
    var t = {};
    return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = ot(e, 4), t.U = ot(e, 4), t.W = ot(e, 4), t
}

function Mu(e) {
    var t = Bu(e);
    if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
    return t
}

function wf(e, t) {
    var r = e.l + t,
        a = {};
    a.Flags = e.read_shift(4) & 63, e.l += 4, a.AlgID = e.read_shift(4);
    var n = !1;
    switch (a.AlgID) {
        case 26126:
        case 26127:
        case 26128:
            n = a.Flags == 36;
            break;
        case 26625:
            n = a.Flags == 4;
            break;
        case 0:
            n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
            break;
        default:
            throw "Unrecognized encryption algorithm: " + a.AlgID
    }
    if (!n) throw new Error("Encryption Flags/AlgID mismatch");
    return a.AlgIDHash = e.read_shift(4), a.KeySize = e.read_shift(4), a.ProviderType = e.read_shift(4), e.l += 8, a.CSPName = e.read_shift(r - e.l >> 1, "utf16le"), e.l = r, a
}

function kf(e, t) {
    var r = {},
        a = e.l + t;
    return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, a), e.l = a, r
}

function Uu(e) {
    var t = ot(e);
    switch (t.Minor) {
        case 2:
            return [t.Minor, Wu(e)];
        case 3:
            return [t.Minor, Hu()];
        case 4:
            return [t.Minor, Vu(e)]
    }
    throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor)
}

function Wu(e) {
    var t = e.read_shift(4);
    if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
    var r = e.read_shift(4),
        a = wf(e, r),
        n = kf(e, e.length - e.l);
    return {
        t: "Std",
        h: a,
        v: n
    }
}

function Hu() {
    throw new Error("File is password-protected: ECMA-376 Extensible")
}

function Vu(e) {
    var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
    e.l += 4;
    var r = e.read_shift(e.length - e.l, "utf8"),
        a = {};
    return r.replace(_r, function(i) {
        var s = me(i);
        switch (rt(s[0])) {
            case "<?xml":
                break;
            case "<encryption":
            case "</encryption>":
                break;
            case "<keyData":
                t.forEach(function(f) {
                    a[f] = s[f]
                });
                break;
            case "<dataIntegrity":
                a.encryptedHmacKey = s.encryptedHmacKey, a.encryptedHmacValue = s.encryptedHmacValue;
                break;
            case "<keyEncryptors>":
            case "<keyEncryptors":
                a.encs = [];
                break;
            case "</keyEncryptors>":
                break;
            case "<keyEncryptor":
                a.uri = s.uri;
                break;
            case "</keyEncryptor>":
                break;
            case "<encryptedKey":
                a.encs.push(s);
                break;
            default:
                throw s[0]
        }
    }), a
}

function Gu(e, t) {
    var r = {},
        a = r.EncryptionVersionInfo = ot(e, 4);
    if (t -= 4, a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
    if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
    r.Flags = e.read_shift(4), t -= 4;
    var n = e.read_shift(4);
    return t -= 4, r.EncryptionHeader = wf(e, n), t -= n, r.EncryptionVerifier = kf(e, t), r
}

function Xu(e) {
    var t = {},
        r = t.EncryptionVersionInfo = ot(e, 4);
    if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
    return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t
}

function An(e) {
    var t = 0,
        r, a = _f(e),
        n = a.length + 1,
        i, s, f, c, o;
    for (r = wt(n), r[0] = a.length, i = 1; i != n; ++i) r[i] = a[i - 1];
    for (i = n - 1; i >= 0; --i) s = r[i], f = t & 16384 ? 1 : 0, c = t << 1 & 32767, o = f | c, t = o ^ s;
    return t ^ 52811
}
var Ef = function() {
        var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0],
            t = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163],
            r = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628],
            a = function(s) {
                return (s / 2 | s * 128) & 255
            },
            n = function(s, f) {
                return a(s ^ f)
            },
            i = function(s) {
                for (var f = t[s.length - 1], c = 104, o = s.length - 1; o >= 0; --o)
                    for (var l = s[o], h = 0; h != 7; ++h) l & 64 && (f ^= r[c]), l *= 2, --c;
                return f
            };
        return function(s) {
            for (var f = _f(s), c = i(f), o = f.length, l = wt(16), h = 0; h != 16; ++h) l[h] = 0;
            var x, d, v;
            for ((o & 1) === 1 && (x = c >> 8, l[o] = n(e[0], x), --o, x = c & 255, d = f[f.length - 1], l[o] = n(d, x)); o > 0;) --o, x = c >> 8, l[o] = n(f[o], x), --o, x = c & 255, l[o] = n(f[o], x);
            for (o = 15, v = 15 - f.length; v > 0;) x = c >> 8, l[o] = n(e[v], x), --o, --v, x = c & 255, l[o] = n(f[o], x), --o, --v;
            return l
        }
    }(),
    zu = function(e, t, r, a, n) {
        n || (n = t), a || (a = Ef(e));
        var i, s;
        for (i = 0; i != t.length; ++i) s = t[i], s ^= a[r], s = (s >> 5 | s << 3) & 255, n[i] = s, ++r;
        return [n, r, a]
    },
    $u = function(e) {
        var t = 0,
            r = Ef(e);
        return function(a) {
            var n = zu("", a, t, r);
            return t = n[1], n[0]
        }
    };

function Ku(e, t, r, a) {
    var n = {
        key: rr(e),
        verificationBytes: rr(e)
    };
    return r.password && (n.verifier = An(r.password)), a.valid = n.verificationBytes === n.verifier, a.valid && (a.insitu = $u(r.password)), n
}

function ju(e, t, r) {
    var a = r || {};
    return a.Info = e.read_shift(2), e.l -= 2, a.Info === 1 ? a.Data = Xu(e) : a.Data = Gu(e, t), a
}

function Yu(e, t, r) {
    var a = {
        Type: r.biff >= 8 ? e.read_shift(2) : 0
    };
    return a.Type ? ju(e, t - 2, a) : Ku(e, r.biff >= 8 ? t : t - 2, r, a), a
}
var Tf = function() {
    function e(n, i) {
        switch (i.type) {
            case "base64":
                return t(Rr(n), i);
            case "binary":
                return t(n, i);
            case "buffer":
                return t(Te && Buffer.isBuffer(n) ? n.toString("binary") : St(n), i);
            case "array":
                return t(Lt(n), i)
        }
        throw new Error("Unrecognized type " + i.type)
    }

    function t(n, i) {
        var s = i || {},
            f = s.dense ? [] : {},
            c = n.match(/\\trowd.*?\\row\b/g);
        if (!c.length) throw new Error("RTF missing table");
        var o = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: c.length - 1
            }
        };
        return c.forEach(function(l, h) {
            Array.isArray(f) && (f[h] = []);
            for (var x = /\\\w+\b/g, d = 0, v, u = -1; v = x.exec(l);) {
                switch (v[0]) {
                    case "\\cell":
                        var p = l.slice(d, x.lastIndex - v[0].length);
                        if (p[0] == " " && (p = p.slice(1)), ++u, p.length) {
                            var k = {
                                v: p,
                                t: "s"
                            };
                            Array.isArray(f) ? f[h][u] = k : f[pe({
                                r: h,
                                c: u
                            })] = k
                        }
                        break
                }
                d = x.lastIndex
            }
            u > o.e.c && (o.e.c = u)
        }), f["!ref"] = we(o), f
    }

    function r(n, i) {
        return Ft(e(n, i), i)
    }

    function a(n) {
        for (var i = ["{\\rtf1\\ansi"], s = De(n["!ref"]), f, c = Array.isArray(n), o = s.s.r; o <= s.e.r; ++o) {
            i.push("\\trowd\\trautofit1");
            for (var l = s.s.c; l <= s.e.c; ++l) i.push("\\cellx" + (l + 1));
            for (i.push("\\pard\\intbl"), l = s.s.c; l <= s.e.c; ++l) {
                var h = pe({
                    r: o,
                    c: l
                });
                f = c ? (n[o] || [])[l] : n[h], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (lt(f), f.w))), i.push("\\cell"))
            }
            i.push("\\pard\\intbl\\row")
        }
        return i.join("") + "}"
    }
    return {
        to_workbook: r,
        to_sheet: e,
        from_sheet: a
    }
}();

function Ju(e) {
    var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
    return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)]
}

function Ra(e) {
    for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
    return r.toString(16).toUpperCase().slice(1)
}

function Zu(e) {
    var t = e[0] / 255,
        r = e[1] / 255,
        a = e[2] / 255,
        n = Math.max(t, r, a),
        i = Math.min(t, r, a),
        s = n - i;
    if (s === 0) return [0, 0, t];
    var f = 0,
        c = 0,
        o = n + i;
    switch (c = s / (o > 1 ? 2 - o : o), n) {
        case t:
            f = ((r - a) / s + 6) % 6;
            break;
        case r:
            f = (a - t) / s + 2;
            break;
        case a:
            f = (t - r) / s + 4;
            break
    }
    return [f / 6, c, o / 2]
}

function qu(e) {
    var t = e[0],
        r = e[1],
        a = e[2],
        n = r * 2 * (a < .5 ? a : 1 - a),
        i = a - n / 2,
        s = [i, i, i],
        f = 6 * t,
        c;
    if (r !== 0) switch (f | 0) {
        case 0:
        case 6:
            c = n * f, s[0] += n, s[1] += c;
            break;
        case 1:
            c = n * (2 - f), s[0] += c, s[1] += n;
            break;
        case 2:
            c = n * (f - 2), s[1] += n, s[2] += c;
            break;
        case 3:
            c = n * (4 - f), s[1] += c, s[2] += n;
            break;
        case 4:
            c = n * (f - 4), s[2] += n, s[0] += c;
            break;
        case 5:
            c = n * (6 - f), s[2] += c, s[0] += n;
            break
    }
    for (var o = 0; o != 3; ++o) s[o] = Math.round(s[o] * 255);
    return s
}

function v0(e, t) {
    if (t === 0) return e;
    var r = Zu(Ju(e));
    return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), Ra(qu(r))
}
var Sf = 6,
    Qu = 15,
    e1 = 1,
    vr = Sf;

function Na(e) {
    return Math.floor((e + Math.round(128 / vr) / 256) * vr)
}

function ba(e) {
    return Math.floor((e - 5) / vr * 100 + .5) / 100
}

function p0(e) {
    return Math.round((e * vr + 5) / vr * 256) / 256
}

function b0(e) {
    return p0(ba(Na(e)))
}

function yn(e) {
    var t = Math.abs(e - b0(e)),
        r = vr;
    if (t > .005)
        for (vr = e1; vr < Qu; ++vr) Math.abs(e - b0(e)) <= t && (t = Math.abs(e - b0(e)), r = vr);
    vr = r
}

function kt(e) {
    e.width ? (e.wpx = Na(e.width), e.wch = ba(e.wpx), e.MDW = vr) : e.wpx ? (e.wch = ba(e.wpx), e.width = p0(e.wch), e.MDW = vr) : typeof e.wch == "number" && (e.width = p0(e.wch), e.wpx = Na(e.width), e.MDW = vr), e.customWidth && delete e.customWidth
}
var r1 = 96,
    Ff = r1;

function Pa(e) {
    return e * 96 / Ff
}

function na(e) {
    return e * Ff / 96
}
var t1 = {
    None: "none",
    Solid: "solid",
    Gray50: "mediumGray",
    Gray75: "darkGray",
    Gray25: "lightGray",
    HorzStripe: "darkHorizontal",
    VertStripe: "darkVertical",
    ReverseDiagStripe: "darkDown",
    DiagStripe: "darkUp",
    DiagCross: "darkGrid",
    ThickDiagCross: "darkTrellis",
    ThinHorzStripe: "lightHorizontal",
    ThinVertStripe: "lightVertical",
    ThinReverseDiagStripe: "lightDown",
    ThinHorzCross: "lightGrid"
};

function a1(e, t, r, a) {
    t.Borders = [];
    var n = {},
        i = !1;
    (e[0].match(_r) || []).forEach(function(s) {
        var f = me(s);
        switch (rt(f[0])) {
            case "<borders":
            case "<borders>":
            case "</borders>":
                break;
            case "<border":
            case "<border>":
            case "<border/>":
                n = {}, f.diagonalUp && (n.diagonalUp = Me(f.diagonalUp)), f.diagonalDown && (n.diagonalDown = Me(f.diagonalDown)), t.Borders.push(n);
                break;
            case "</border>":
                break;
            case "<left/>":
                break;
            case "<left":
            case "<left>":
                break;
            case "</left>":
                break;
            case "<right/>":
                break;
            case "<right":
            case "<right>":
                break;
            case "</right>":
                break;
            case "<top/>":
                break;
            case "<top":
            case "<top>":
                break;
            case "</top>":
                break;
            case "<bottom/>":
                break;
            case "<bottom":
            case "<bottom>":
                break;
            case "</bottom>":
                break;
            case "<diagonal":
            case "<diagonal>":
            case "<diagonal/>":
                break;
            case "</diagonal>":
                break;
            case "<horizontal":
            case "<horizontal>":
            case "<horizontal/>":
                break;
            case "</horizontal>":
                break;
            case "<vertical":
            case "<vertical>":
            case "<vertical/>":
                break;
            case "</vertical>":
                break;
            case "<start":
            case "<start>":
            case "<start/>":
                break;
            case "</start>":
                break;
            case "<end":
            case "<end>":
            case "<end/>":
                break;
            case "</end>":
                break;
            case "<color":
            case "<color>":
                break;
            case "<color/>":
            case "</color>":
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
                break;
            case "<ext":
                i = !0;
                break;
            case "</ext>":
                i = !1;
                break;
            default:
                if (a && a.WTF && !i) throw new Error("unrecognized " + f[0] + " in borders")
        }
    })
}

function n1(e, t, r, a) {
    t.Fills = [];
    var n = {},
        i = !1;
    (e[0].match(_r) || []).forEach(function(s) {
        var f = me(s);
        switch (rt(f[0])) {
            case "<fills":
            case "<fills>":
            case "</fills>":
                break;
            case "<fill>":
            case "<fill":
            case "<fill/>":
                n = {}, t.Fills.push(n);
                break;
            case "</fill>":
                break;
            case "<gradientFill>":
                break;
            case "<gradientFill":
            case "</gradientFill>":
                t.Fills.push(n), n = {};
                break;
            case "<patternFill":
            case "<patternFill>":
                f.patternType && (n.patternType = f.patternType);
                break;
            case "<patternFill/>":
            case "</patternFill>":
                break;
            case "<bgColor":
                n.bgColor || (n.bgColor = {}), f.indexed && (n.bgColor.indexed = parseInt(f.indexed, 10)), f.theme && (n.bgColor.theme = parseInt(f.theme, 10)), f.tint && (n.bgColor.tint = parseFloat(f.tint)), f.rgb && (n.bgColor.rgb = f.rgb.slice(-6));
                break;
            case "<bgColor/>":
            case "</bgColor>":
                break;
            case "<fgColor":
                n.fgColor || (n.fgColor = {}), f.theme && (n.fgColor.theme = parseInt(f.theme, 10)), f.tint && (n.fgColor.tint = parseFloat(f.tint)), f.rgb != null && (n.fgColor.rgb = f.rgb.slice(-6));
                break;
            case "<fgColor/>":
            case "</fgColor>":
                break;
            case "<stop":
            case "<stop/>":
                break;
            case "</stop>":
                break;
            case "<color":
            case "<color/>":
                break;
            case "</color>":
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
                break;
            case "<ext":
                i = !0;
                break;
            case "</ext>":
                i = !1;
                break;
            default:
                if (a && a.WTF && !i) throw new Error("unrecognized " + f[0] + " in fills")
        }
    })
}

function i1(e, t, r, a) {
    t.Fonts = [];
    var n = {},
        i = !1;
    (e[0].match(_r) || []).forEach(function(s) {
        var f = me(s);
        switch (rt(f[0])) {
            case "<fonts":
            case "<fonts>":
            case "</fonts>":
                break;
            case "<font":
            case "<font>":
                break;
            case "</font>":
            case "<font/>":
                t.Fonts.push(n), n = {};
                break;
            case "<name":
                f.val && (n.name = Pe(f.val));
                break;
            case "<name/>":
            case "</name>":
                break;
            case "<b":
                n.bold = f.val ? Me(f.val) : 1;
                break;
            case "<b/>":
                n.bold = 1;
                break;
            case "<i":
                n.italic = f.val ? Me(f.val) : 1;
                break;
            case "<i/>":
                n.italic = 1;
                break;
            case "<u":
                switch (f.val) {
                    case "none":
                        n.underline = 0;
                        break;
                    case "single":
                        n.underline = 1;
                        break;
                    case "double":
                        n.underline = 2;
                        break;
                    case "singleAccounting":
                        n.underline = 33;
                        break;
                    case "doubleAccounting":
                        n.underline = 34;
                        break
                }
                break;
            case "<u/>":
                n.underline = 1;
                break;
            case "<strike":
                n.strike = f.val ? Me(f.val) : 1;
                break;
            case "<strike/>":
                n.strike = 1;
                break;
            case "<outline":
                n.outline = f.val ? Me(f.val) : 1;
                break;
            case "<outline/>":
                n.outline = 1;
                break;
            case "<shadow":
                n.shadow = f.val ? Me(f.val) : 1;
                break;
            case "<shadow/>":
                n.shadow = 1;
                break;
            case "<condense":
                n.condense = f.val ? Me(f.val) : 1;
                break;
            case "<condense/>":
                n.condense = 1;
                break;
            case "<extend":
                n.extend = f.val ? Me(f.val) : 1;
                break;
            case "<extend/>":
                n.extend = 1;
                break;
            case "<sz":
                f.val && (n.sz = +f.val);
                break;
            case "<sz/>":
            case "</sz>":
                break;
            case "<vertAlign":
                f.val && (n.vertAlign = f.val);
                break;
            case "<vertAlign/>":
            case "</vertAlign>":
                break;
            case "<family":
                f.val && (n.family = parseInt(f.val, 10));
                break;
            case "<family/>":
            case "</family>":
                break;
            case "<scheme":
                f.val && (n.scheme = f.val);
                break;
            case "<scheme/>":
            case "</scheme>":
                break;
            case "<charset":
                if (f.val == "1") break;
                f.codepage = en[parseInt(f.val, 10)];
                break;
            case "<color":
                if (n.color || (n.color = {}), f.auto && (n.color.auto = Me(f.auto)), f.rgb) n.color.rgb = f.rgb.slice(-6);
                else if (f.indexed) {
                    n.color.index = parseInt(f.indexed, 10);
                    var c = It[n.color.index];
                    n.color.index == 81 && (c = It[1]), c || (c = It[1]), n.color.rgb = c[0].toString(16) + c[1].toString(16) + c[2].toString(16)
                } else f.theme && (n.color.theme = parseInt(f.theme, 10), f.tint && (n.color.tint = parseFloat(f.tint)), f.theme && r.themeElements && r.themeElements.clrScheme && (n.color.rgb = v0(r.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)));
                break;
            case "<color/>":
            case "</color>":
                break;
            case "<AlternateContent":
                i = !0;
                break;
            case "</AlternateContent>":
                i = !1;
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
                break;
            case "<ext":
                i = !0;
                break;
            case "</ext>":
                i = !1;
                break;
            default:
                if (a && a.WTF && !i) throw new Error("unrecognized " + f[0] + " in fonts")
        }
    })
}

function s1(e, t, r) {
    t.NumberFmt = [];
    for (var a = Ke(ve), n = 0; n < a.length; ++n) t.NumberFmt[a[n]] = ve[a[n]];
    var i = e[0].match(_r);
    if (i)
        for (n = 0; n < i.length; ++n) {
            var s = me(i[n]);
            switch (rt(s[0])) {
                case "<numFmts":
                case "</numFmts>":
                case "<numFmts/>":
                case "<numFmts>":
                    break;
                case "<numFmt": {
                    var f = Ce(Pe(s.formatCode)),
                        c = parseInt(s.numFmtId, 10);
                    if (t.NumberFmt[c] = f, c > 0) {
                        if (c > 392) {
                            for (c = 392; c > 60 && t.NumberFmt[c] != null; --c);
                            t.NumberFmt[c] = f
                        }
                        ct(f, c)
                    }
                }
                break;
                case "</numFmt>":
                    break;
                default:
                    if (r.WTF) throw new Error("unrecognized " + s[0] + " in numFmts")
            }
        }
}

function f1(e) {
    var t = ["<numFmts>"];
    return [
        [5, 8],
        [23, 26],
        [41, 44],
        [50, 392]
    ].forEach(function(r) {
        for (var a = r[0]; a <= r[1]; ++a) e[a] != null && (t[t.length] = ae("numFmt", null, {
            numFmtId: a,
            formatCode: Ne(e[a])
        }))
    }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = ae("numFmts", null, {
        count: t.length - 2
    }).replace("/>", ">"), t.join(""))
}
var r0 = ["numFmtId", "fillId", "fontId", "borderId", "xfId"],
    t0 = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];

function c1(e, t, r) {
    t.CellXf = [];
    var a, n = !1;
    (e[0].match(_r) || []).forEach(function(i) {
        var s = me(i),
            f = 0;
        switch (rt(s[0])) {
            case "<cellXfs":
            case "<cellXfs>":
            case "<cellXfs/>":
            case "</cellXfs>":
                break;
            case "<xf":
            case "<xf/>":
                for (a = s, delete a[0], f = 0; f < r0.length; ++f) a[r0[f]] && (a[r0[f]] = parseInt(a[r0[f]], 10));
                for (f = 0; f < t0.length; ++f) a[t0[f]] && (a[t0[f]] = Me(a[t0[f]]));
                if (t.NumberFmt && a.numFmtId > 392) {
                    for (f = 392; f > 60; --f)
                        if (t.NumberFmt[a.numFmtId] == t.NumberFmt[f]) {
                            a.numFmtId = f;
                            break
                        }
                }
                t.CellXf.push(a);
                break;
            case "</xf>":
                break;
            case "<alignment":
            case "<alignment/>":
                var c = {};
                s.vertical && (c.vertical = s.vertical), s.horizontal && (c.horizontal = s.horizontal), s.textRotation != null && (c.textRotation = s.textRotation), s.indent && (c.indent = s.indent), s.wrapText && (c.wrapText = Me(s.wrapText)), a.alignment = c;
                break;
            case "</alignment>":
                break;
            case "<protection":
                break;
            case "</protection>":
            case "<protection/>":
                break;
            case "<AlternateContent":
                n = !0;
                break;
            case "</AlternateContent>":
                n = !1;
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
                break;
            case "<ext":
                n = !0;
                break;
            case "</ext>":
                n = !1;
                break;
            default:
                if (r && r.WTF && !n) throw new Error("unrecognized " + s[0] + " in cellXfs")
        }
    })
}

function o1(e) {
    var t = [];
    return t[t.length] = ae("cellXfs", null), e.forEach(function(r) {
        t[t.length] = ae("xf", null, r)
    }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = ae("cellXfs", null, {
        count: t.length - 2
    }).replace("/>", ">"), t.join(""))
}
var l1 = function() {
    var t = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/,
        r = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/,
        a = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/,
        n = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/,
        i = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
    return function(f, c, o) {
        var l = {};
        if (!f) return l;
        f = f.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
        var h;
        return (h = f.match(t)) && s1(h, l, o), (h = f.match(n)) && i1(h, l, c, o), (h = f.match(a)) && n1(h, l, c, o), (h = f.match(i)) && a1(h, l, c, o), (h = f.match(r)) && c1(h, l, o), l
    }
}();

function Af(e, t) {
    var r = [qe, ae("styleSheet", null, {
            xmlns: Ht[0],
            "xmlns:vt": ar.vt
        })],
        a;
    return e.SSF && (a = f1(e.SSF)) != null && (r[r.length] = a), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (a = o1(t.cellXfs)) && (r[r.length] = a), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("")
}

function h1(e, t) {
    var r = e.read_shift(2),
        a = mr(e);
    return [r, a]
}

function u1(e, t, r) {
    r || (r = X(6 + 4 * t.length)), r.write_shift(2, e), fr(t, r);
    var a = r.length > r.l ? r.slice(0, r.l) : r;
    return r.l == null && (r.l = r.length), a
}

function x1(e, t, r) {
    var a = {};
    a.sz = e.read_shift(2) / 20;
    var n = jo(e);
    n.fItalic && (a.italic = 1), n.fCondense && (a.condense = 1), n.fExtend && (a.extend = 1), n.fShadow && (a.shadow = 1), n.fOutline && (a.outline = 1), n.fStrikeout && (a.strike = 1);
    var i = e.read_shift(2);
    switch (i === 700 && (a.bold = 1), e.read_shift(2)) {
        case 1:
            a.vertAlign = "superscript";
            break;
        case 2:
            a.vertAlign = "subscript";
            break
    }
    var s = e.read_shift(1);
    s != 0 && (a.underline = s);
    var f = e.read_shift(1);
    f > 0 && (a.family = f);
    var c = e.read_shift(1);
    switch (c > 0 && (a.charset = c), e.l++, a.color = Ko(e), e.read_shift(1)) {
        case 1:
            a.scheme = "major";
            break;
        case 2:
            a.scheme = "minor";
            break
    }
    return a.name = mr(e), a
}

function d1(e, t) {
    t || (t = X(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Yo(e, t), t.write_shift(2, e.bold ? 700 : 400);
    var r = 0;
    e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), u0(e.color, t);
    var a = 0;
    return e.scheme == "major" && (a = 1), e.scheme == "minor" && (a = 2), t.write_shift(1, a), fr(e.name, t), t.length > t.l ? t.slice(0, t.l) : t
}
var v1 = ["none", "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"],
    P0, p1 = gr;

function Bi(e, t) {
    t || (t = X(4 * 3 + 8 * 7 + 16 * 1)), P0 || (P0 = w0(v1));
    var r = P0[e.patternType];
    r == null && (r = 40), t.write_shift(4, r);
    var a = 0;
    if (r != 40)
        for (u0({
                auto: 1
            }, t), u0({
                auto: 1
            }, t); a < 12; ++a) t.write_shift(4, 0);
    else {
        for (; a < 4; ++a) t.write_shift(4, 0);
        for (; a < 12; ++a) t.write_shift(4, 0)
    }
    return t.length > t.l ? t.slice(0, t.l) : t
}

function m1(e, t) {
    var r = e.l + t,
        a = e.read_shift(2),
        n = e.read_shift(2);
    return e.l = r, {
        ixfe: a,
        numFmtId: n
    }
}

function yf(e, t, r) {
    r || (r = X(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
    var a = 0;
    return r.write_shift(1, a), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r
}

function da(e, t) {
    return t || (t = X(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t
}
var g1 = gr;

function _1(e, t) {
    return t || (t = X(51)), t.write_shift(1, 0), da(null, t), da(null, t), da(null, t), da(null, t), da(null, t), t.length > t.l ? t.slice(0, t.l) : t
}

function w1(e, t) {
    return t || (t = X(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), h0(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t
}

function k1(e, t, r) {
    var a = X(2052);
    return a.write_shift(4, e), h0(t, a), h0(r, a), a.length > a.l ? a.slice(0, a.l) : a
}

function E1(e, t, r) {
    var a = {};
    a.NumberFmt = [];
    for (var n in ve) a.NumberFmt[n] = ve[n];
    a.CellXf = [], a.Fonts = [];
    var i = [],
        s = !1;
    return ut(e, function(c, o, l) {
        switch (l) {
            case 44:
                a.NumberFmt[c[0]] = c[1], ct(c[1], c[0]);
                break;
            case 43:
                a.Fonts.push(c), c.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (c.color.rgb = v0(t.themeElements.clrScheme[c.color.theme].rgb, c.color.tint || 0));
                break;
            case 1025:
                break;
            case 45:
                break;
            case 46:
                break;
            case 47:
                i[i.length - 1] == 617 && a.CellXf.push(c);
                break;
            case 48:
            case 507:
            case 572:
            case 475:
                break;
            case 1171:
            case 2102:
            case 1130:
            case 512:
            case 2095:
            case 3072:
                break;
            case 35:
                s = !0;
                break;
            case 36:
                s = !1;
                break;
            case 37:
                i.push(l), s = !0;
                break;
            case 38:
                i.pop(), s = !1;
                break;
            default:
                if (o.T > 0) i.push(l);
                else if (o.T < 0) i.pop();
                else if (!s || r.WTF && i[i.length - 1] != 37) throw new Error("Unexpected record 0x" + l.toString(16))
        }
    }), a
}

function T1(e, t) {
    if (t) {
        var r = 0;
        [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function(a) {
            for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ++r
        }), r != 0 && (Y(e, 615, jr(r)), [
            [5, 8],
            [23, 26],
            [41, 44],
            [50, 392]
        ].forEach(function(a) {
            for (var n = a[0]; n <= a[1]; ++n) t[n] != null && Y(e, 44, u1(n, t[n]))
        }), Y(e, 616))
    }
}

function S1(e) {
    var t = 1;
    Y(e, 611, jr(t)), Y(e, 43, d1({
        sz: 12,
        color: {
            theme: 1
        },
        name: "Calibri",
        family: 2,
        scheme: "minor"
    })), Y(e, 612)
}

function F1(e) {
    var t = 2;
    Y(e, 603, jr(t)), Y(e, 45, Bi({
        patternType: "none"
    })), Y(e, 45, Bi({
        patternType: "gray125"
    })), Y(e, 604)
}

function A1(e) {
    var t = 1;
    Y(e, 613, jr(t)), Y(e, 46, _1()), Y(e, 614)
}

function y1(e) {
    var t = 1;
    Y(e, 626, jr(t)), Y(e, 47, yf({
        numFmtId: 0,
        fontId: 0,
        fillId: 0,
        borderId: 0
    }, 65535)), Y(e, 627)
}

function C1(e, t) {
    Y(e, 617, jr(t.length)), t.forEach(function(r) {
        Y(e, 47, yf(r, 0))
    }), Y(e, 618)
}

function D1(e) {
    var t = 1;
    Y(e, 619, jr(t)), Y(e, 48, w1({
        xfId: 0,
        builtinId: 0,
        name: "Normal"
    })), Y(e, 620)
}

function O1(e) {
    var t = 0;
    Y(e, 505, jr(t)), Y(e, 506)
}

function I1(e) {
    var t = 0;
    Y(e, 508, k1(t, "TableStyleMedium9", "PivotStyleMedium4")), Y(e, 509)
}

function R1(e, t) {
    var r = Fr();
    return Y(r, 278), T1(r, e.SSF), S1(r), F1(r), A1(r), y1(r), C1(r, t.cellXfs), D1(r), O1(r), I1(r), Y(r, 279), r.end()
}
var N1 = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>", "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"];

function b1(e, t, r) {
    t.themeElements.clrScheme = [];
    var a = {};
    (e[0].match(_r) || []).forEach(function(n) {
        var i = me(n);
        switch (i[0]) {
            case "<a:clrScheme":
            case "</a:clrScheme>":
                break;
            case "<a:srgbClr":
                a.rgb = i.val;
                break;
            case "<a:sysClr":
                a.rgb = i.lastClr;
                break;
            case "<a:dk1>":
            case "</a:dk1>":
            case "<a:lt1>":
            case "</a:lt1>":
            case "<a:dk2>":
            case "</a:dk2>":
            case "<a:lt2>":
            case "</a:lt2>":
            case "<a:accent1>":
            case "</a:accent1>":
            case "<a:accent2>":
            case "</a:accent2>":
            case "<a:accent3>":
            case "</a:accent3>":
            case "<a:accent4>":
            case "</a:accent4>":
            case "<a:accent5>":
            case "</a:accent5>":
            case "<a:accent6>":
            case "</a:accent6>":
            case "<a:hlink>":
            case "</a:hlink>":
            case "<a:folHlink>":
            case "</a:folHlink>":
                i[0].charAt(1) === "/" ? (t.themeElements.clrScheme[N1.indexOf(i[0])] = a, a = {}) : a.name = i[0].slice(3, i[0].length - 1);
                break;
            default:
                if (r && r.WTF) throw new Error("Unrecognized " + i[0] + " in clrScheme")
        }
    })
}

function P1() {}

function L1() {}
var B1 = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/,
    M1 = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/,
    U1 = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;

function W1(e, t, r) {
    t.themeElements = {};
    var a;
    [
        ["clrScheme", B1, b1],
        ["fontScheme", M1, P1],
        ["fmtScheme", U1, L1]
    ].forEach(function(n) {
        if (!(a = e.match(n[1]))) throw new Error(n[0] + " not found in themeElements");
        n[2](a, t, r)
    })
}
var H1 = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;

function Cf(e, t) {
    (!e || e.length === 0) && (e = Cn());
    var r, a = {};
    if (!(r = e.match(H1))) throw new Error("themeElements not found in theme");
    return W1(r[0], a, t), a.raw = e, a
}

function Cn(e, t) {
    if (t && t.themeXLSX) return t.themeXLSX;
    if (e && typeof e.raw == "string") return e.raw;
    var r = [qe];
    return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("")
}

function V1(e, t, r) {
    var a = e.l + t,
        n = e.read_shift(4);
    if (n !== 124226) {
        if (!r.cellStyles) {
            e.l = a;
            return
        }
        var i = e.slice(e.l);
        e.l = a;
        var s;
        try {
            s = _s(i, {
                type: "array"
            })
        } catch {
            return
        }
        var f = Ir(s, "theme/theme/theme1.xml", !0);
        if (f) return Cf(f, r)
    }
}

function G1(e) {
    return e.read_shift(4)
}

function X1(e) {
    var t = {};
    switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
        case 0:
            e.l += 4;
            break;
        case 1:
            t.xclrValue = z1(e, 4);
            break;
        case 2:
            t.xclrValue = ff(e);
            break;
        case 3:
            t.xclrValue = G1(e);
            break;
        case 4:
            e.l += 4;
            break
    }
    return e.l += 8, t
}

function z1(e, t) {
    return gr(e, t)
}

function $1(e, t) {
    return gr(e, t)
}

function K1(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2) - 4,
        a = [t];
    switch (t) {
        case 4:
        case 5:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 13:
            a[1] = X1(e);
            break;
        case 6:
            a[1] = $1(e, r);
            break;
        case 14:
        case 15:
            a[1] = e.read_shift(r === 1 ? 1 : 2);
            break;
        default:
            throw new Error("Unrecognized ExtProp type: " + t + " " + r)
    }
    return a
}

function j1(e, t) {
    var r = e.l + t;
    e.l += 2;
    var a = e.read_shift(2);
    e.l += 2;
    for (var n = e.read_shift(2), i = []; n-- > 0;) i.push(K1(e, r - e.l));
    return {
        ixfe: a,
        ext: i
    }
}

function Y1(e, t) {
    t.forEach(function(r) {
        switch (r[0]) {}
    })
}

function J1(e, t) {
    return {
        flags: e.read_shift(4),
        version: e.read_shift(4),
        name: mr(e)
    }
}

function Z1(e) {
    var t = X(12 + 2 * e.name.length);
    return t.write_shift(4, e.flags), t.write_shift(4, e.version), fr(e.name, t), t.slice(0, t.l)
}

function q1(e) {
    for (var t = [], r = e.read_shift(4); r-- > 0;) t.push([e.read_shift(4), e.read_shift(4)]);
    return t
}

function Q1(e) {
    var t = X(4 + 8 * e.length);
    t.write_shift(4, e.length);
    for (var r = 0; r < e.length; ++r) t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
    return t
}

function ex(e, t) {
    var r = X(8 + 2 * t.length);
    return r.write_shift(4, e), fr(t, r), r.slice(0, r.l)
}

function rx(e) {
    return e.l += 4, e.read_shift(4) != 0
}

function tx(e, t) {
    var r = X(8);
    return r.write_shift(4, e), r.write_shift(4, 1), r
}

function ax(e, t, r) {
    var a = {
            Types: [],
            Cell: [],
            Value: []
        },
        n = r || {},
        i = [],
        s = !1,
        f = 2;
    return ut(e, function(c, o, l) {
        switch (l) {
            case 335:
                a.Types.push({
                    name: c.name
                });
                break;
            case 51:
                c.forEach(function(h) {
                    f == 1 ? a.Cell.push({
                        type: a.Types[h[0] - 1].name,
                        index: h[1]
                    }) : f == 0 && a.Value.push({
                        type: a.Types[h[0] - 1].name,
                        index: h[1]
                    })
                });
                break;
            case 337:
                f = c ? 1 : 0;
                break;
            case 338:
                f = 2;
                break;
            case 35:
                i.push(l), s = !0;
                break;
            case 36:
                i.pop(), s = !1;
                break;
            default:
                if (!o.T) {
                    if (!s || n.WTF && i[i.length - 1] != 35) throw new Error("Unexpected record 0x" + l.toString(16))
                }
        }
    }), a
}

function nx() {
    var e = Fr();
    return Y(e, 332), Y(e, 334, jr(1)), Y(e, 335, Z1({
        name: "XLDAPR",
        version: 12e4,
        flags: 3496657072
    })), Y(e, 336), Y(e, 339, ex(1, "XLDAPR")), Y(e, 52), Y(e, 35, jr(514)), Y(e, 4096, jr(0)), Y(e, 4097, Wr(1)), Y(e, 36), Y(e, 53), Y(e, 340), Y(e, 337, tx(1)), Y(e, 51, Q1([
        [1, 0]
    ])), Y(e, 338), Y(e, 333), e.end()
}

function ix(e, t, r) {
    var a = {
        Types: [],
        Cell: [],
        Value: []
    };
    if (!e) return a;
    var n = !1,
        i = 2,
        s;
    return e.replace(_r, function(f) {
        var c = me(f);
        switch (rt(c[0])) {
            case "<?xml":
                break;
            case "<metadata":
            case "</metadata>":
                break;
            case "<metadataTypes":
            case "</metadataTypes>":
                break;
            case "<metadataType":
                a.Types.push({
                    name: c.name
                });
                break;
            case "</metadataType>":
                break;
            case "<futureMetadata":
                for (var o = 0; o < a.Types.length; ++o) a.Types[o].name == c.name && (s = a.Types[o]);
                break;
            case "</futureMetadata>":
                break;
            case "<bk>":
                break;
            case "</bk>":
                break;
            case "<rc":
                i == 1 ? a.Cell.push({
                    type: a.Types[c.t - 1].name,
                    index: +c.v
                }) : i == 0 && a.Value.push({
                    type: a.Types[c.t - 1].name,
                    index: +c.v
                });
                break;
            case "</rc>":
                break;
            case "<cellMetadata":
                i = 1;
                break;
            case "</cellMetadata>":
                i = 2;
                break;
            case "<valueMetadata":
                i = 0;
                break;
            case "</valueMetadata>":
                i = 2;
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
            case "<extLst/>":
                break;
            case "<ext":
                n = !0;
                break;
            case "</ext>":
                n = !1;
                break;
            case "<rvb":
                if (!s) break;
                s.offsets || (s.offsets = []), s.offsets.push(+c.i);
                break;
            default:
                if (!n && r.WTF) throw new Error("unrecognized " + c[0] + " in metadata")
        }
        return f
    }), a
}

function Df() {
    var e = [qe];
    return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("")
}

function sx(e) {
    var t = [];
    if (!e) return t;
    var r = 1;
    return (e.match(_r) || []).forEach(function(a) {
        var n = me(a);
        switch (n[0]) {
            case "<?xml":
                break;
            case "<calcChain":
            case "<calcChain>":
            case "</calcChain>":
                break;
            case "<c":
                delete n[0], n.i ? r = n.i : n.i = r, t.push(n);
                break
        }
    }), t
}

function fx(e) {
    var t = {};
    t.i = e.read_shift(4);
    var r = {};
    r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = pe(r);
    var a = e.read_shift(1);
    return a & 2 && (t.l = "1"), a & 8 && (t.a = "1"), t
}

function cx(e, t, r) {
    var a = [];
    return ut(e, function(i, s, f) {
        switch (f) {
            case 63:
                a.push(i);
                break;
            default:
                if (!s.T) throw new Error("Unexpected record 0x" + f.toString(16))
        }
    }), a
}

function ox(e, t, r, a) {
    if (!e) return e;
    var n = a || {},
        i = !1;
    ut(e, function(f, c, o) {
        switch (o) {
            case 359:
            case 363:
            case 364:
            case 366:
            case 367:
            case 368:
            case 369:
            case 370:
            case 371:
            case 472:
            case 577:
            case 578:
            case 579:
            case 580:
            case 581:
            case 582:
            case 583:
            case 584:
            case 585:
            case 586:
            case 587:
                break;
            case 35:
                i = !0;
                break;
            case 36:
                i = !1;
                break;
            default:
                if (!c.T) {
                    if (!i || n.WTF) throw new Error("Unexpected record 0x" + o.toString(16))
                }
        }
    }, n)
}

function lx(e, t) {
    if (!e) return "??";
    var r = (e.match(/<c:chart [^>]*r:id="([^"]*)"/) || ["", ""])[1];
    return t["!id"][r].Target
}
var Zt = 1024;

function Of(e, t) {
    for (var r = [21600, 21600], a = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), n = [ae("xml", null, {
            "xmlns:v": Cr.v,
            "xmlns:o": Cr.o,
            "xmlns:x": Cr.x,
            "xmlns:mv": Cr.mv
        }).replace(/\/>/, ">"), ae("o:shapelayout", ae("o:idmap", null, {
            "v:ext": "edit",
            data: e
        }), {
            "v:ext": "edit"
        }), ae("v:shapetype", [ae("v:stroke", null, {
            joinstyle: "miter"
        }), ae("v:path", null, {
            gradientshapeok: "t",
            "o:connecttype": "rect"
        })].join(""), {
            id: "_x0000_t202",
            "o:spt": 202,
            coordsize: r.join(","),
            path: a
        })]; Zt < e * 1e3;) Zt += 1e3;
    return t.forEach(function(i) {
        var s = Xe(i[0]),
            f = {
                color2: "#BEFF82",
                type: "gradient"
            };
        f.type == "gradient" && (f.angle = "-180");
        var c = f.type == "gradient" ? ae("o:fill", null, {
                type: "gradientUnscaled",
                "v:ext": "view"
            }) : null,
            o = ae("v:fill", c, f),
            l = {
                on: "t",
                obscured: "t"
            };
        ++Zt, n = n.concat(["<v:shape" + Da({
            id: "_x0000_s" + Zt,
            type: "#_x0000_t202",
            style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
            fillcolor: "#ECFAD4",
            strokecolor: "#edeaa1"
        }) + ">", o, ae("v:shadow", null, l), ae("v:path", null, {
            "o:connecttype": "none"
        }), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', "<x:MoveWithCells/>", "<x:SizeWithCells/>", lr("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")), lr("x:AutoFill", "False"), lr("x:Row", String(s.r)), lr("x:Column", String(s.c)), i[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"])
    }), n.push("</xml>"), n.join("")
}

function Mi(e, t, r, a) {
    var n = Array.isArray(e),
        i;
    t.forEach(function(s) {
        var f = Xe(s.ref);
        if (n ? (e[f.r] || (e[f.r] = []), i = e[f.r][f.c]) : i = e[s.ref], !i) {
            i = {
                t: "z"
            }, n ? e[f.r][f.c] = i : e[s.ref] = i;
            var c = De(e["!ref"] || "BDWGO1000001:A1");
            c.s.r > f.r && (c.s.r = f.r), c.e.r < f.r && (c.e.r = f.r), c.s.c > f.c && (c.s.c = f.c), c.e.c < f.c && (c.e.c = f.c);
            var o = we(c);
            o !== e["!ref"] && (e["!ref"] = o)
        }
        i.c || (i.c = []);
        var l = {
            a: s.author,
            t: s.t,
            r: s.r,
            T: r
        };
        s.h && (l.h = s.h);
        for (var h = i.c.length - 1; h >= 0; --h) {
            if (!r && i.c[h].T) return;
            r && !i.c[h].T && i.c.splice(h, 1)
        }
        if (r && a) {
            for (h = 0; h < a.length; ++h)
                if (l.a == a[h].id) {
                    l.a = a[h].name || l.a;
                    break
                }
        }
        i.c.push(l)
    })
}

function hx(e, t) {
    if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
    var r = [],
        a = [],
        n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
    n && n[1] && n[1].split(/<\/\w*:?author>/).forEach(function(s) {
        if (!(s === "" || s.trim() === "")) {
            var f = s.match(/<(?:\w+:)?author[^>]*>(.*)/);
            f && r.push(f[1])
        }
    });
    var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
    return i && i[1] && i[1].split(/<\/\w*:?comment>/).forEach(function(s) {
        if (!(s === "" || s.trim() === "")) {
            var f = s.match(/<(?:\w+:)?comment[^>]*>/);
            if (f) {
                var c = me(f[0]),
                    o = {
                        author: c.authorId && r[c.authorId] || "sheetjsghost",
                        ref: c.ref,
                        guid: c.guid
                    },
                    l = Xe(c.ref);
                if (!(t.sheetRows && t.sheetRows <= l.r)) {
                    var h = s.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/),
                        x = !!h && !!h[1] && Fn(h[1]) || {
                            r: "",
                            t: "",
                            h: ""
                        };
                    o.r = x.r, x.r == "<t></t>" && (x.t = x.h = ""), o.t = (x.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (o.h = x.h), a.push(o)
                }
            }
        }
    }), a
}

function If(e) {
    var t = [qe, ae("comments", null, {
            xmlns: Ht[0]
        })],
        r = [];
    return t.push("<authors>"), e.forEach(function(a) {
        a[1].forEach(function(n) {
            var i = Ne(n.a);
            r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), n.T && n.ID && r.indexOf("tc=" + n.ID) == -1 && (r.push("tc=" + n.ID), t.push("<author>tc=" + n.ID + "</author>"))
        })
    }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(a) {
        var n = 0,
            i = [];
        if (a[1][0] && a[1][0].T && a[1][0].ID ? n = r.indexOf("tc=" + a[1][0].ID) : a[1].forEach(function(c) {
                c.a && (n = r.indexOf(Ne(c.a))), i.push(c.t || "")
            }), t.push('<comment ref="' + a[0] + '" authorId="' + n + '"><text>'), i.length <= 1) t.push(lr("t", Ne(i[0] || "")));
        else {
            for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
            t.push(lr("t", Ne(s)))
        }
        t.push("</text></comment>")
    }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("")
}

function ux(e, t) {
    var r = [],
        a = !1,
        n = {},
        i = 0;
    return e.replace(_r, function(f, c) {
        var o = me(f);
        switch (rt(o[0])) {
            case "<?xml":
                break;
            case "<ThreadedComments":
                break;
            case "</ThreadedComments>":
                break;
            case "<threadedComment":
                n = {
                    author: o.personId,
                    guid: o.id,
                    ref: o.ref,
                    T: 1
                };
                break;
            case "</threadedComment>":
                n.t != null && r.push(n);
                break;
            case "<text>":
            case "<text":
                i = c + f.length;
                break;
            case "</text>":
                n.t = e.slice(i, c).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                break;
            case "<mentions":
            case "<mentions>":
                a = !0;
                break;
            case "</mentions>":
                a = !1;
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
            case "<extLst/>":
                break;
            case "<ext":
                a = !0;
                break;
            case "</ext>":
                a = !1;
                break;
            default:
                if (!a && t.WTF) throw new Error("unrecognized " + o[0] + " in threaded comments")
        }
        return f
    }), r
}

function xx(e, t, r) {
    var a = [qe, ae("ThreadedComments", null, {
        xmlns: ar.TCMNT
    }).replace(/[\/]>/, ">")];
    return e.forEach(function(n) {
        var i = "";
        (n[1] || []).forEach(function(s, f) {
            if (!s.T) {
                delete s.ID;
                return
            }
            s.a && t.indexOf(s.a) == -1 && t.push(s.a);
            var c = {
                ref: n[0],
                id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
            };
            f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), a.push(ae("threadedComment", lr("text", s.t || ""), c))
        })
    }), a.push("</ThreadedComments>"), a.join("")
}

function dx(e, t) {
    var r = [],
        a = !1;
    return e.replace(_r, function(i) {
        var s = me(i);
        switch (rt(s[0])) {
            case "<?xml":
                break;
            case "<personList":
                break;
            case "</personList>":
                break;
            case "<person":
                r.push({
                    name: s.displayname,
                    id: s.id
                });
                break;
            case "</person>":
                break;
            case "<extLst":
            case "<extLst>":
            case "</extLst>":
            case "<extLst/>":
                break;
            case "<ext":
                a = !0;
                break;
            case "</ext>":
                a = !1;
                break;
            default:
                if (!a && t.WTF) throw new Error("unrecognized " + s[0] + " in threaded comments")
        }
        return i
    }), r
}

function vx(e) {
    var t = [qe, ae("personList", null, {
        xmlns: ar.TCMNT,
        "xmlns:x": Ht[0]
    }).replace(/[\/]>/, ">")];
    return e.forEach(function(r, a) {
        t.push(ae("person", null, {
            displayName: r,
            id: "{54EE7950-7262-4200-6969-" + ("000000000000" + a).slice(-12) + "}",
            userId: r,
            providerId: "None"
        }))
    }), t.push("</personList>"), t.join("")
}

function px(e) {
    var t = {};
    t.iauthor = e.read_shift(4);
    var r = zt(e);
    return t.rfx = r.s, t.ref = pe(r.s), e.l += 16, t
}

function mx(e, t) {
    return t == null && (t = X(36)), t.write_shift(4, e[1].iauthor), ca(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t
}
var gx = mr;

function _x(e) {
    return fr(e.slice(0, 54))
}

function wx(e, t) {
    var r = [],
        a = [],
        n = {},
        i = !1;
    return ut(e, function(f, c, o) {
        switch (o) {
            case 632:
                a.push(f);
                break;
            case 635:
                n = f;
                break;
            case 637:
                n.t = f.t, n.h = f.h, n.r = f.r;
                break;
            case 636:
                if (n.author = a[n.iauthor], delete n.iauthor, t.sheetRows && n.rfx && t.sheetRows <= n.rfx.r) break;
                n.t || (n.t = ""), delete n.rfx, r.push(n);
                break;
            case 3072:
                break;
            case 35:
                i = !0;
                break;
            case 36:
                i = !1;
                break;
            case 37:
                break;
            case 38:
                break;
            default:
                if (!c.T) {
                    if (!i || t.WTF) throw new Error("Unexpected record 0x" + o.toString(16))
                }
        }
    }), r
}

function kx(e) {
    var t = Fr(),
        r = [];
    return Y(t, 628), Y(t, 630), e.forEach(function(a) {
        a[1].forEach(function(n) {
            r.indexOf(n.a) > -1 || (r.push(n.a.slice(0, 54)), Y(t, 632, _x(n.a)))
        })
    }), Y(t, 631), Y(t, 633), e.forEach(function(a) {
        a[1].forEach(function(n) {
            n.iauthor = r.indexOf(n.a);
            var i = {
                s: Xe(a[0]),
                e: Xe(a[0])
            };
            Y(t, 635, mx([i, n])), n.t && n.t.length > 0 && Y(t, 637, Go(n)), Y(t, 636), delete n.iauthor
        })
    }), Y(t, 634), Y(t, 629), t.end()
}
var Ex = "application/vnd.ms-office.vbaProject";

function Tx(e) {
    var t = xe.utils.cfb_new({
        root: "R"
    });
    return e.FullPaths.forEach(function(r, a) {
        if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
            var n = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
            xe.utils.cfb_add(t, n, e.FileIndex[a].content)
        }
    }), xe.write(t)
}

function Sx(e, t) {
    t.FullPaths.forEach(function(r, a) {
        if (a != 0) {
            var n = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
            n.slice(-1) !== "/" && xe.utils.cfb_add(e, n, t.FileIndex[a].content)
        }
    })
}
var Rf = ["xlsb", "xlsm", "xlam", "biff8", "xla"];

function Fx() {
    return {
        "!type": "dialog"
    }
}

function Ax() {
    return {
        "!type": "dialog"
    }
}

function yx() {
    return {
        "!type": "macro"
    }
}

function Cx() {
    return {
        "!type": "macro"
    }
}
var ea = function() {
        var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,
            t = {
                r: 0,
                c: 0
            };

        function r(a, n, i, s) {
            var f = !1,
                c = !1;
            i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
            var o = i.length > 0 ? parseInt(i, 10) | 0 : 0,
                l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
            return f ? l += t.c : --l, c ? o += t.r : --o, n + (f ? "" : "$") + Ge(l) + (c ? "" : "$") + Ze(o)
        }
        return function(n, i) {
            return t = i, n.replace(e, r)
        }
    }(),
    Dn = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,
    On = function() {
        return function(t, r) {
            return t.replace(Dn, function(a, n, i, s, f, c) {
                var o = pn(s) - (i ? 0 : r.c),
                    l = vn(c) - (f ? 0 : r.r),
                    h = l == 0 ? "" : f ? l + 1 : "[" + l + "]",
                    x = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
                return n + "R" + h + "C" + x
            })
        }
    }();

function Nf(e, t) {
    return e.replace(Dn, function(r, a, n, i, s, f) {
        return a + (n == "$" ? n + i : Ge(pn(i) + t.c)) + (s == "$" ? s + f : Ze(vn(f) + t.r))
    })
}

function Dx(e, t, r) {
    var a = Ar(t),
        n = a.s,
        i = Xe(r),
        s = {
            r: i.r - n.r,
            c: i.c - n.c
        };
    return Nf(e, s)
}

function Ox(e) {
    return e.length != 1
}

function Ui(e) {
    return e.replace(/_xlfn\./g, "")
}

function Qe(e) {
    e.l += 1
}

function Et(e, t) {
    var r = e.read_shift(2);
    return [r & 16383, r >> 14 & 1, r >> 15 & 1]
}

function bf(e, t, r) {
    var a = 2;
    if (r) {
        if (r.biff >= 2 && r.biff <= 5) return Pf(e);
        r.biff == 12 && (a = 4)
    }
    var n = e.read_shift(a),
        i = e.read_shift(a),
        s = Et(e),
        f = Et(e);
    return {
        s: {
            r: n,
            c: s[0],
            cRel: s[1],
            rRel: s[2]
        },
        e: {
            r: i,
            c: f[0],
            cRel: f[1],
            rRel: f[2]
        }
    }
}

function Pf(e) {
    var t = Et(e),
        r = Et(e),
        a = e.read_shift(1),
        n = e.read_shift(1);
    return {
        s: {
            r: t[0],
            c: a,
            cRel: t[1],
            rRel: t[2]
        },
        e: {
            r: r[0],
            c: n,
            cRel: r[1],
            rRel: r[2]
        }
    }
}

function Ix(e, t, r) {
    if (r.biff < 8) return Pf(e);
    var a = e.read_shift(r.biff == 12 ? 4 : 2),
        n = e.read_shift(r.biff == 12 ? 4 : 2),
        i = Et(e),
        s = Et(e);
    return {
        s: {
            r: a,
            c: i[0],
            cRel: i[1],
            rRel: i[2]
        },
        e: {
            r: n,
            c: s[0],
            cRel: s[1],
            rRel: s[2]
        }
    }
}

function Lf(e, t, r) {
    if (r && r.biff >= 2 && r.biff <= 5) return Rx(e);
    var a = e.read_shift(r && r.biff == 12 ? 4 : 2),
        n = Et(e);
    return {
        r: a,
        c: n[0],
        cRel: n[1],
        rRel: n[2]
    }
}

function Rx(e) {
    var t = Et(e),
        r = e.read_shift(1);
    return {
        r: t[0],
        c: r,
        cRel: t[1],
        rRel: t[2]
    }
}

function Nx(e) {
    var t = e.read_shift(2),
        r = e.read_shift(2);
    return {
        r: t,
        c: r & 255,
        fQuoted: !!(r & 16384),
        cRel: r >> 15,
        rRel: r >> 15
    }
}

function bx(e, t, r) {
    var a = r && r.biff ? r.biff : 8;
    if (a >= 2 && a <= 5) return Px(e);
    var n = e.read_shift(a >= 12 ? 4 : 2),
        i = e.read_shift(2),
        s = (i & 16384) >> 14,
        f = (i & 32768) >> 15;
    if (i &= 16383, f == 1)
        for (; n > 524287;) n -= 1048576;
    if (s == 1)
        for (; i > 8191;) i = i - 16384;
    return {
        r: n,
        c: i,
        cRel: s,
        rRel: f
    }
}

function Px(e) {
    var t = e.read_shift(2),
        r = e.read_shift(1),
        a = (t & 32768) >> 15,
        n = (t & 16384) >> 14;
    return t &= 16383, a == 1 && t >= 8192 && (t = t - 16384), n == 1 && r >= 128 && (r = r - 256), {
        r: t,
        c: r,
        cRel: n,
        rRel: a
    }
}

function Lx(e, t, r) {
    var a = (e[e.l++] & 96) >> 5,
        n = bf(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
    return [a, n]
}

function Bx(e, t, r) {
    var a = (e[e.l++] & 96) >> 5,
        n = e.read_shift(2, "i"),
        i = 8;
    if (r) switch (r.biff) {
        case 5:
            e.l += 12, i = 6;
            break;
        case 12:
            i = 12;
            break
    }
    var s = bf(e, i, r);
    return [a, n, s]
}

function Mx(e, t, r) {
    var a = (e[e.l++] & 96) >> 5;
    return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [a]
}

function Ux(e, t, r) {
    var a = (e[e.l++] & 96) >> 5,
        n = e.read_shift(2),
        i = 8;
    if (r) switch (r.biff) {
        case 5:
            e.l += 12, i = 6;
            break;
        case 12:
            i = 12;
            break
    }
    return e.l += i, [a, n]
}

function Wx(e, t, r) {
    var a = (e[e.l++] & 96) >> 5,
        n = Ix(e, t - 1, r);
    return [a, n]
}

function Hx(e, t, r) {
    var a = (e[e.l++] & 96) >> 5;
    return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [a]
}

function Wi(e) {
    var t = e[e.l + 1] & 1,
        r = 1;
    return e.l += 4, [t, r]
}

function Vx(e, t, r) {
    e.l += 2;
    for (var a = e.read_shift(r && r.biff == 2 ? 1 : 2), n = [], i = 0; i <= a; ++i) n.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
    return n
}

function Gx(e, t, r) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)]
}

function Xx(e, t, r) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)]
}

function zx(e) {
    var t = e[e.l + 1] & 255 ? 1 : 0;
    return e.l += 2, [t, e.read_shift(2)]
}

function $x(e, t, r) {
    var a = e[e.l + 1] & 255 ? 1 : 0;
    return e.l += r && r.biff == 2 ? 3 : 4, [a]
}

function Bf(e) {
    var t = e.read_shift(1),
        r = e.read_shift(1);
    return [t, r]
}

function Kx(e) {
    return e.read_shift(2), Bf(e)
}

function jx(e) {
    return e.read_shift(2), Bf(e)
}

function Yx(e, t, r) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = Lf(e, 0, r);
    return [a, n]
}

function Jx(e, t, r) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = bx(e, 0, r);
    return [a, n]
}

function Zx(e, t, r) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = e.read_shift(2);
    r && r.biff == 5 && (e.l += 12);
    var i = Lf(e, 0, r);
    return [a, n, i]
}

function qx(e, t, r) {
    var a = (e[e.l] & 96) >> 5;
    e.l += 1;
    var n = e.read_shift(r && r.biff <= 3 ? 1 : 2);
    return [rv[n], Wf[n], a]
}

function Qx(e, t, r) {
    var a = e[e.l++],
        n = e.read_shift(1),
        i = r && r.biff <= 3 ? [a == 88 ? -1 : 0, e.read_shift(1)] : ed(e);
    return [n, (i[0] === 0 ? Wf : ev)[i[1]]]
}

function ed(e) {
    return [e[e.l + 1] >> 7, e.read_shift(2) & 32767]
}

function rd(e, t, r) {
    e.l += r && r.biff == 2 ? 3 : 4
}

function td(e, t, r) {
    if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
    var a = e.read_shift(2),
        n = e.read_shift(r && r.biff == 2 ? 1 : 2);
    return [a, n]
}

function ad(e) {
    return e.l++, xt[e.read_shift(1)]
}

function nd(e) {
    return e.l++, e.read_shift(2)
}

function id(e) {
    return e.l++, e.read_shift(1) !== 0
}

function sd(e) {
    return e.l++, pr(e)
}

function fd(e, t, r) {
    return e.l++, Ha(e, t - 1, r)
}

function cd(e, t) {
    var r = [e.read_shift(1)];
    if (t == 12) switch (r[0]) {
        case 2:
            r[0] = 4;
            break;
        case 4:
            r[0] = 16;
            break;
        case 0:
            r[0] = 1;
            break;
        case 1:
            r[0] = 2;
            break
    }
    switch (r[0]) {
        case 4:
            r[1] = Je(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
            break;
        case 37:
        case 16:
            r[1] = xt[e[e.l]], e.l += t == 12 ? 4 : 8;
            break;
        case 0:
            e.l += 8;
            break;
        case 1:
            r[1] = pr(e);
            break;
        case 2:
            r[1] = $t(e, 0, {
                biff: t > 0 && t < 8 ? 2 : t
            });
            break;
        default:
            throw new Error("Bad SerAr: " + r[0])
    }
    return r
}

function od(e, t, r) {
    for (var a = e.read_shift(r.biff == 12 ? 4 : 2), n = [], i = 0; i != a; ++i) n.push((r.biff == 12 ? zt : T0)(e));
    return n
}

function ld(e, t, r) {
    var a = 0,
        n = 0;
    r.biff == 12 ? (a = e.read_shift(4), n = e.read_shift(4)) : (n = 1 + e.read_shift(1), a = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--a, --n == 0 && (n = 256));
    for (var i = 0, s = []; i != a && (s[i] = []); ++i)
        for (var f = 0; f != n; ++f) s[i][f] = cd(e, r.biff);
    return s
}

function hd(e, t, r) {
    var a = e.read_shift(1) >>> 5 & 3,
        n = !r || r.biff >= 8 ? 4 : 2,
        i = e.read_shift(n);
    switch (r.biff) {
        case 2:
            e.l += 5;
            break;
        case 3:
        case 4:
            e.l += 8;
            break;
        case 5:
            e.l += 12;
            break
    }
    return [a, 0, i]
}

function ud(e, t, r) {
    if (r.biff == 5) return xd(e);
    var a = e.read_shift(1) >>> 5 & 3,
        n = e.read_shift(2),
        i = e.read_shift(4);
    return [a, n, i]
}

function xd(e) {
    var t = e.read_shift(1) >>> 5 & 3,
        r = e.read_shift(2, "i");
    e.l += 8;
    var a = e.read_shift(2);
    return e.l += 12, [t, r, a]
}

function dd(e, t, r) {
    var a = e.read_shift(1) >>> 5 & 3;
    e.l += r && r.biff == 2 ? 3 : 4;
    var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
    return [a, n]
}

function vd(e, t, r) {
    var a = e.read_shift(1) >>> 5 & 3,
        n = e.read_shift(r && r.biff == 2 ? 1 : 2);
    return [a, n]
}

function pd(e, t, r) {
    var a = e.read_shift(1) >>> 5 & 3;
    return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [a]
}

function md(e, t, r) {
    var a = (e[e.l++] & 96) >> 5,
        n = e.read_shift(2),
        i = 4;
    if (r) switch (r.biff) {
        case 5:
            i = 15;
            break;
        case 12:
            i = 6;
            break
    }
    return e.l += i, [a, n]
}
var gd = gr,
    _d = gr,
    wd = gr;

function Ga(e, t, r) {
    return e.l += 2, [Nx(e)]
}

function In(e) {
    return e.l += 6, []
}
var kd = Ga,
    Ed = In,
    Td = In,
    Sd = Ga;

function Mf(e) {
    return e.l += 2, [rr(e), e.read_shift(2) & 1]
}
var Fd = Ga,
    Ad = Mf,
    yd = In,
    Cd = Ga,
    Dd = Ga,
    Od = ["Data", "All", "Headers", "??", "?Data2", "??", "?DataHeaders", "??", "Totals", "??", "??", "??", "?DataTotals", "??", "??", "??", "?Current"];

function Id(e) {
    e.l += 2;
    var t = e.read_shift(2),
        r = e.read_shift(2),
        a = e.read_shift(4),
        n = e.read_shift(2),
        i = e.read_shift(2),
        s = Od[r >> 2 & 31];
    return {
        ixti: t,
        coltype: r & 3,
        rt: s,
        idx: a,
        c: n,
        C: i
    }
}

function Rd(e) {
    return e.l += 2, [e.read_shift(4)]
}

function Nd(e, t, r) {
    return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"]
}

function bd(e, t, r) {
    return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"]
}

function Pd(e) {
    var t = e.read_shift(1) >>> 5 & 3,
        r = e.read_shift(2);
    return [t, r]
}

function Ld(e) {
    var t = e.read_shift(1) >>> 5 & 3,
        r = e.read_shift(2);
    return [t, r]
}

function Bd(e) {
    return e.l += 4, [0, 0]
}
var Hi = {
        1: {
            n: "PtgExp",
            f: td
        },
        2: {
            n: "PtgTbl",
            f: wd
        },
        3: {
            n: "PtgAdd",
            f: Qe
        },
        4: {
            n: "PtgSub",
            f: Qe
        },
        5: {
            n: "PtgMul",
            f: Qe
        },
        6: {
            n: "PtgDiv",
            f: Qe
        },
        7: {
            n: "PtgPower",
            f: Qe
        },
        8: {
            n: "PtgConcat",
            f: Qe
        },
        9: {
            n: "PtgLt",
            f: Qe
        },
        10: {
            n: "PtgLe",
            f: Qe
        },
        11: {
            n: "PtgEq",
            f: Qe
        },
        12: {
            n: "PtgGe",
            f: Qe
        },
        13: {
            n: "PtgGt",
            f: Qe
        },
        14: {
            n: "PtgNe",
            f: Qe
        },
        15: {
            n: "PtgIsect",
            f: Qe
        },
        16: {
            n: "PtgUnion",
            f: Qe
        },
        17: {
            n: "PtgRange",
            f: Qe
        },
        18: {
            n: "PtgUplus",
            f: Qe
        },
        19: {
            n: "PtgUminus",
            f: Qe
        },
        20: {
            n: "PtgPercent",
            f: Qe
        },
        21: {
            n: "PtgParen",
            f: Qe
        },
        22: {
            n: "PtgMissArg",
            f: Qe
        },
        23: {
            n: "PtgStr",
            f: fd
        },
        26: {
            n: "PtgSheet",
            f: Nd
        },
        27: {
            n: "PtgEndSheet",
            f: bd
        },
        28: {
            n: "PtgErr",
            f: ad
        },
        29: {
            n: "PtgBool",
            f: id
        },
        30: {
            n: "PtgInt",
            f: nd
        },
        31: {
            n: "PtgNum",
            f: sd
        },
        32: {
            n: "PtgArray",
            f: Hx
        },
        33: {
            n: "PtgFunc",
            f: qx
        },
        34: {
            n: "PtgFuncVar",
            f: Qx
        },
        35: {
            n: "PtgName",
            f: hd
        },
        36: {
            n: "PtgRef",
            f: Yx
        },
        37: {
            n: "PtgArea",
            f: Lx
        },
        38: {
            n: "PtgMemArea",
            f: dd
        },
        39: {
            n: "PtgMemErr",
            f: gd
        },
        40: {
            n: "PtgMemNoMem",
            f: _d
        },
        41: {
            n: "PtgMemFunc",
            f: vd
        },
        42: {
            n: "PtgRefErr",
            f: pd
        },
        43: {
            n: "PtgAreaErr",
            f: Mx
        },
        44: {
            n: "PtgRefN",
            f: Jx
        },
        45: {
            n: "PtgAreaN",
            f: Wx
        },
        46: {
            n: "PtgMemAreaN",
            f: Pd
        },
        47: {
            n: "PtgMemNoMemN",
            f: Ld
        },
        57: {
            n: "PtgNameX",
            f: ud
        },
        58: {
            n: "PtgRef3d",
            f: Zx
        },
        59: {
            n: "PtgArea3d",
            f: Bx
        },
        60: {
            n: "PtgRefErr3d",
            f: md
        },
        61: {
            n: "PtgAreaErr3d",
            f: Ux
        },
        255: {}
    },
    Md = {
        64: 32,
        96: 32,
        65: 33,
        97: 33,
        66: 34,
        98: 34,
        67: 35,
        99: 35,
        68: 36,
        100: 36,
        69: 37,
        101: 37,
        70: 38,
        102: 38,
        71: 39,
        103: 39,
        72: 40,
        104: 40,
        73: 41,
        105: 41,
        74: 42,
        106: 42,
        75: 43,
        107: 43,
        76: 44,
        108: 44,
        77: 45,
        109: 45,
        78: 46,
        110: 46,
        79: 47,
        111: 47,
        88: 34,
        120: 34,
        89: 57,
        121: 57,
        90: 58,
        122: 58,
        91: 59,
        123: 59,
        92: 60,
        124: 60,
        93: 61,
        125: 61
    },
    Ud = {
        1: {
            n: "PtgElfLel",
            f: Mf
        },
        2: {
            n: "PtgElfRw",
            f: Cd
        },
        3: {
            n: "PtgElfCol",
            f: kd
        },
        6: {
            n: "PtgElfRwV",
            f: Dd
        },
        7: {
            n: "PtgElfColV",
            f: Sd
        },
        10: {
            n: "PtgElfRadical",
            f: Fd
        },
        11: {
            n: "PtgElfRadicalS",
            f: yd
        },
        13: {
            n: "PtgElfColS",
            f: Ed
        },
        15: {
            n: "PtgElfColSV",
            f: Td
        },
        16: {
            n: "PtgElfRadicalLel",
            f: Ad
        },
        25: {
            n: "PtgList",
            f: Id
        },
        29: {
            n: "PtgSxName",
            f: Rd
        },
        255: {}
    },
    Wd = {
        0: {
            n: "PtgAttrNoop",
            f: Bd
        },
        1: {
            n: "PtgAttrSemi",
            f: $x
        },
        2: {
            n: "PtgAttrIf",
            f: Xx
        },
        4: {
            n: "PtgAttrChoose",
            f: Vx
        },
        8: {
            n: "PtgAttrGoto",
            f: Gx
        },
        16: {
            n: "PtgAttrSum",
            f: rd
        },
        32: {
            n: "PtgAttrBaxcel",
            f: Wi
        },
        33: {
            n: "PtgAttrBaxcel",
            f: Wi
        },
        64: {
            n: "PtgAttrSpace",
            f: Kx
        },
        65: {
            n: "PtgAttrSpaceSemi",
            f: jx
        },
        128: {
            n: "PtgAttrIfError",
            f: zx
        },
        255: {}
    };

function Xa(e, t, r, a) {
    if (a.biff < 8) return gr(e, t);
    for (var n = e.l + t, i = [], s = 0; s !== r.length; ++s) switch (r[s][0]) {
        case "PtgArray":
            r[s][1] = ld(e, 0, a), i.push(r[s][1]);
            break;
        case "PtgMemArea":
            r[s][2] = od(e, r[s][1], a), i.push(r[s][2]);
            break;
        case "PtgExp":
            a && a.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
            break;
        case "PtgList":
        case "PtgElfRadicalS":
        case "PtgElfColS":
        case "PtgElfColSV":
            throw "Unsupported " + r[s][0]
    }
    return t = n - e.l, t !== 0 && i.push(gr(e, t)), i
}

function za(e, t, r) {
    for (var a = e.l + t, n, i, s = []; a != e.l;) t = a - e.l, i = e[e.l], n = Hi[i] || Hi[Md[i]], (i === 24 || i === 25) && (n = (i === 24 ? Ud : Wd)[e[e.l + 1]]), !n || !n.f ? gr(e, t) : s.push([n.n, n.f(e, t, r)]);
    return s
}

function Hd(e) {
    for (var t = [], r = 0; r < e.length; ++r) {
        for (var a = e[r], n = [], i = 0; i < a.length; ++i) {
            var s = a[i];
            if (s) switch (s[0]) {
                case 2:
                    n.push('"' + s[1].replace(/"/g, '""') + '"');
                    break;
                default:
                    n.push(s[1])
            } else n.push("")
        }
        t.push(n.join(","))
    }
    return t.join(";")
}
var Vd = {
    PtgAdd: "+",
    PtgConcat: "&",
    PtgDiv: "/",
    PtgEq: "=",
    PtgGe: ">=",
    PtgGt: ">",
    PtgLe: "<=",
    PtgLt: "<",
    PtgMul: "*",
    PtgNe: "<>",
    PtgPower: "^",
    PtgSub: "-"
};

function Gd(e, t) {
    if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
    return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e
}

function Uf(e, t, r) {
    if (!e) return "SH33TJSERR0";
    if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
    if (!e.XTI) return "SH33TJSERR6";
    var a = e.XTI[t];
    if (r.biff < 8) return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
    if (!a) return "SH33TJSERR1";
    var n = "";
    if (r.biff > 8) switch (e[a[0]][0]) {
        case 357:
            return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]], a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
        case 358:
            return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[a[0]][0];
        case 355:
        default:
            return "SH33TJSSRC" + e[a[0]][0]
    }
    switch (e[a[0]][0][0]) {
        case 1025:
            return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3", a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
        case 14849:
            return e[a[0]].slice(1).map(function(i) {
                return i.Name
            }).join(";;");
        default:
            return e[a[0]][0][3] ? (n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4", a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]]) : "SH33TJSERR2"
    }
}

function Vi(e, t, r) {
    var a = Uf(e, t, r);
    return a == "#REF" ? a : Gd(a, r)
}

function dr(e, t, r, a, n) {
    var i = n && n.biff || 8,
        s = {
            s: {
                c: 0,
                r: 0
            },
            e: {
                c: 0,
                r: 0
            }
        },
        f = [],
        c, o, l, h = 0,
        x = 0,
        d, v = "";
    if (!e[0] || !e[0][0]) return "";
    for (var u = -1, p = "", k = 0, A = e[0].length; k < A; ++k) {
        var g = e[0][k];
        switch (g[0]) {
            case "PtgUminus":
                f.push("-" + f.pop());
                break;
            case "PtgUplus":
                f.push("+" + f.pop());
                break;
            case "PtgPercent":
                f.push(f.pop() + "%");
                break;
            case "PtgAdd":
            case "PtgConcat":
            case "PtgDiv":
            case "PtgEq":
            case "PtgGe":
            case "PtgGt":
            case "PtgLe":
            case "PtgLt":
            case "PtgMul":
            case "PtgNe":
            case "PtgPower":
            case "PtgSub":
                if (c = f.pop(), o = f.pop(), u >= 0) {
                    switch (e[0][u][1][0]) {
                        case 0:
                            p = ze(" ", e[0][u][1][1]);
                            break;
                        case 1:
                            p = ze("\r", e[0][u][1][1]);
                            break;
                        default:
                            if (p = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0])
                    }
                    o = o + p, u = -1
                }
                f.push(o + Vd[g[0]] + c);
                break;
            case "PtgIsect":
                c = f.pop(), o = f.pop(), f.push(o + " " + c);
                break;
            case "PtgUnion":
                c = f.pop(), o = f.pop(), f.push(o + "," + c);
                break;
            case "PtgRange":
                c = f.pop(), o = f.pop(), f.push(o + ":" + c);
                break;
            case "PtgAttrChoose":
                break;
            case "PtgAttrGoto":
                break;
            case "PtgAttrIf":
                break;
            case "PtgAttrIfError":
                break;
            case "PtgRef":
                l = _a(g[1][1], s, n), f.push(wa(l, i));
                break;
            case "PtgRefN":
                l = r ? _a(g[1][1], r, n) : g[1][1], f.push(wa(l, i));
                break;
            case "PtgRef3d":
                h = g[1][1], l = _a(g[1][2], s, n), v = Vi(a, h, n), f.push(v + "!" + wa(l, i));
                break;
            case "PtgFunc":
            case "PtgFuncVar":
                var O = g[1][0],
                    b = g[1][1];
                O || (O = 0), O &= 127;
                var N = O == 0 ? [] : f.slice(-O);
                f.length -= O, b === "User" && (b = N.shift()), f.push(b + "(" + N.join(",") + ")");
                break;
            case "PtgBool":
                f.push(g[1] ? "TRUE" : "FALSE");
                break;
            case "PtgInt":
                f.push(g[1]);
                break;
            case "PtgNum":
                f.push(String(g[1]));
                break;
            case "PtgStr":
                f.push('"' + g[1].replace(/"/g, '""') + '"');
                break;
            case "PtgErr":
                f.push(g[1]);
                break;
            case "PtgAreaN":
                d = mi(g[1][1], r ? {
                    s: r
                } : s, n), f.push(I0(d, n));
                break;
            case "PtgArea":
                d = mi(g[1][1], s, n), f.push(I0(d, n));
                break;
            case "PtgArea3d":
                h = g[1][1], d = g[1][2], v = Vi(a, h, n), f.push(v + "!" + I0(d, n));
                break;
            case "PtgAttrSum":
                f.push("SUM(" + f.pop() + ")");
                break;
            case "PtgAttrBaxcel":
            case "PtgAttrSemi":
                break;
            case "PtgName":
                x = g[1][2];
                var F = (a.names || [])[x - 1] || (a[0] || [])[x],
                    B = F ? F.Name : "SH33TJSNAME" + String(x);
                B && B.slice(0, 6) == "_xlfn." && !n.xlfn && (B = B.slice(6)), f.push(B);
                break;
            case "PtgNameX":
                var I = g[1][1];
                x = g[1][2];
                var z;
                if (n.biff <= 5) I < 0 && (I = -I), a[I] && (z = a[I][x]);
                else {
                    var G = "";
                    if (((a[I] || [])[0] || [])[0] == 14849 || (((a[I] || [])[0] || [])[0] == 1025 ? a[I][x] && a[I][x].itab > 0 && (G = a.SheetNames[a[I][x].itab - 1] + "!") : G = a.SheetNames[x - 1] + "!"), a[I] && a[I][x]) G += a[I][x].Name;
                    else if (a[0] && a[0][x]) G += a[0][x].Name;
                    else {
                        var L = (Uf(a, I, n) || "").split(";;");
                        L[x - 1] ? G = L[x - 1] : G += "SH33TJSERRX"
                    }
                    f.push(G);
                    break
                }
                z || (z = {
                    Name: "SH33TJSERRY"
                }), f.push(z.Name);
                break;
            case "PtgParen":
                var J = "(",
                    le = ")";
                if (u >= 0) {
                    switch (p = "", e[0][u][1][0]) {
                        case 2:
                            J = ze(" ", e[0][u][1][1]) + J;
                            break;
                        case 3:
                            J = ze("\r", e[0][u][1][1]) + J;
                            break;
                        case 4:
                            le = ze(" ", e[0][u][1][1]) + le;
                            break;
                        case 5:
                            le = ze("\r", e[0][u][1][1]) + le;
                            break;
                        default:
                            if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0])
                    }
                    u = -1
                }
                f.push(J + f.pop() + le);
                break;
            case "PtgRefErr":
                f.push("#REF!");
                break;
            case "PtgRefErr3d":
                f.push("#REF!");
                break;
            case "PtgExp":
                l = {
                    c: g[1][1],
                    r: g[1][0]
                };
                var ie = {
                    c: r.c,
                    r: r.r
                };
                if (a.sharedf[pe(l)]) {
                    var ue = a.sharedf[pe(l)];
                    f.push(dr(ue, s, ie, a, n))
                } else {
                    var ce = !1;
                    for (c = 0; c != a.arrayf.length; ++c)
                        if (o = a.arrayf[c], !(l.c < o[0].s.c || l.c > o[0].e.c) && !(l.r < o[0].s.r || l.r > o[0].e.r)) {
                            f.push(dr(o[1], s, ie, a, n)), ce = !0;
                            break
                        } ce || f.push(g[1])
                }
                break;
            case "PtgArray":
                f.push("{" + Hd(g[1]) + "}");
                break;
            case "PtgMemArea":
                break;
            case "PtgAttrSpace":
            case "PtgAttrSpaceSemi":
                u = k;
                break;
            case "PtgTbl":
                break;
            case "PtgMemErr":
                break;
            case "PtgMissArg":
                f.push("");
                break;
            case "PtgAreaErr":
                f.push("#REF!");
                break;
            case "PtgAreaErr3d":
                f.push("#REF!");
                break;
            case "PtgList":
                f.push("Table" + g[1].idx + "[#" + g[1].rt + "]");
                break;
            case "PtgMemAreaN":
            case "PtgMemNoMemN":
            case "PtgAttrNoop":
            case "PtgSheet":
            case "PtgEndSheet":
                break;
            case "PtgMemFunc":
                break;
            case "PtgMemNoMem":
                break;
            case "PtgElfCol":
            case "PtgElfColS":
            case "PtgElfColSV":
            case "PtgElfColV":
            case "PtgElfLel":
            case "PtgElfRadical":
            case "PtgElfRadicalLel":
            case "PtgElfRadicalS":
            case "PtgElfRw":
            case "PtgElfRwV":
                throw new Error("Unsupported ELFs");
            case "PtgSxName":
                throw new Error("Unrecognized Formula Token: " + String(g));
            default:
                throw new Error("Unrecognized Formula Token: " + String(g))
        }
        var be = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
        if (n.biff != 3 && u >= 0 && be.indexOf(e[0][k][0]) == -1) {
            g = e[0][u];
            var V = !0;
            switch (g[1][0]) {
                case 4:
                    V = !1;
                case 0:
                    p = ze(" ", g[1][1]);
                    break;
                case 5:
                    V = !1;
                case 1:
                    p = ze("\r", g[1][1]);
                    break;
                default:
                    if (p = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + g[1][0])
            }
            f.push((V ? p : "") + f.pop() + (V ? "" : p)), u = -1
        }
    }
    if (f.length > 1 && n.WTF) throw new Error("bad formula stack");
    return f[0]
}

function Xd(e, t, r) {
    var a = e.l + t,
        n = r.biff == 2 ? 1 : 2,
        i, s = e.read_shift(n);
    if (s == 65535) return [
        [], gr(e, t - 2)
    ];
    var f = za(e, s, r);
    return t !== s + n && (i = Xa(e, t - s - n, f, r)), e.l = a, [f, i]
}

function zd(e, t, r) {
    var a = e.l + t,
        n = r.biff == 2 ? 1 : 2,
        i, s = e.read_shift(n);
    if (s == 65535) return [
        [], gr(e, t - 2)
    ];
    var f = za(e, s, r);
    return t !== s + n && (i = Xa(e, t - s - n, f, r)), e.l = a, [f, i]
}

function $d(e, t, r, a) {
    var n = e.l + t,
        i = za(e, a, r),
        s;
    return n !== e.l && (s = Xa(e, n - e.l, i, r)), [i, s]
}

function Kd(e, t, r) {
    var a = e.l + t,
        n, i = e.read_shift(2),
        s = za(e, i, r);
    return i == 65535 ? [
        [], gr(e, t - 2)
    ] : (t !== i + 2 && (n = Xa(e, a - i - 2, s, r)), [s, n])
}

function jd(e) {
    var t;
    if (st(e, e.l + 6) !== 65535) return [pr(e), "n"];
    switch (e[e.l]) {
        case 0:
            return e.l += 8, ["String", "s"];
        case 1:
            return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
        case 2:
            return t = e[e.l + 2], e.l += 8, [t, "e"];
        case 3:
            return e.l += 8, ["", "s"]
    }
    return []
}

function Yd(e) {
    if (e == null) {
        var t = X(8);
        return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t
    } else if (typeof e == "number") return Bt(e);
    return Bt(0)
}

function L0(e, t, r) {
    var a = e.l + t,
        n = tt(e);
    r.biff == 2 && ++e.l;
    var i = jd(e),
        s = e.read_shift(1);
    r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
    var f = zd(e, a - e.l, r);
    return {
        cell: n,
        val: i[0],
        formula: f,
        shared: s >> 3 & 1,
        tt: i[1]
    }
}

function Jd(e, t, r, a, n) {
    var i = Ut(t, r, n),
        s = Yd(e.v),
        f = X(6),
        c = 33;
    f.write_shift(2, c), f.write_shift(4, 0);
    for (var o = X(e.bf.length), l = 0; l < e.bf.length; ++l) o[l] = e.bf[l];
    var h = sr([i, s, f, o]);
    return h
}

function S0(e, t, r) {
    var a = e.read_shift(4),
        n = za(e, a, r),
        i = e.read_shift(4),
        s = i > 0 ? Xa(e, i, n, r) : null;
    return [n, s]
}
var Zd = S0,
    F0 = S0,
    qd = S0,
    Qd = S0,
    ev = {
        0: "BEEP",
        1: "OPEN",
        2: "OPEN.LINKS",
        3: "CLOSE.ALL",
        4: "SAVE",
        5: "SAVE.AS",
        6: "FILE.DELETE",
        7: "PAGE.SETUP",
        8: "PRINT",
        9: "PRINTER.SETUP",
        10: "QUIT",
        11: "NEW.WINDOW",
        12: "ARRANGE.ALL",
        13: "WINDOW.SIZE",
        14: "WINDOW.MOVE",
        15: "FULL",
        16: "CLOSE",
        17: "RUN",
        22: "SET.PRINT.AREA",
        23: "SET.PRINT.TITLES",
        24: "SET.PAGE.BREAK",
        25: "REMOVE.PAGE.BREAK",
        26: "FONT",
        27: "DISPLAY",
        28: "PROTECT.DOCUMENT",
        29: "PRECISION",
        30: "A1.R1C1",
        31: "CALCULATE.NOW",
        32: "CALCULATION",
        34: "DATA.FIND",
        35: "EXTRACT",
        36: "DATA.DELETE",
        37: "SET.DATABASE",
        38: "SET.CRITERIA",
        39: "SORT",
        40: "DATA.SERIES",
        41: "TABLE",
        42: "FORMAT.NUMBER",
        43: "ALIGNMENT",
        44: "STYLE",
        45: "BORDER",
        46: "CELL.PROTECTION",
        47: "COLUMN.WIDTH",
        48: "UNDO",
        49: "CUT",
        50: "COPY",
        51: "PASTE",
        52: "CLEAR",
        53: "PASTE.SPECIAL",
        54: "EDIT.DELETE",
        55: "INSERT",
        56: "FILL.RIGHT",
        57: "FILL.DOWN",
        61: "DEFINE.NAME",
        62: "CREATE.NAMES",
        63: "FORMULA.GOTO",
        64: "FORMULA.FIND",
        65: "SELECT.LAST.CELL",
        66: "SHOW.ACTIVE.CELL",
        67: "GALLERY.AREA",
        68: "GALLERY.BAR",
        69: "GALLERY.COLUMN",
        70: "GALLERY.LINE",
        71: "GALLERY.PIE",
        72: "GALLERY.SCATTER",
        73: "COMBINATION",
        74: "PREFERRED",
        75: "ADD.OVERLAY",
        76: "GRIDLINES",
        77: "SET.PREFERRED",
        78: "AXES",
        79: "LEGEND",
        80: "ATTACH.TEXT",
        81: "ADD.ARROW",
        82: "SELECT.CHART",
        83: "SELECT.PLOT.AREA",
        84: "PATTERNS",
        85: "MAIN.CHART",
        86: "OVERLAY",
        87: "SCALE",
        88: "FORMAT.LEGEND",
        89: "FORMAT.TEXT",
        90: "EDIT.REPEAT",
        91: "PARSE",
        92: "JUSTIFY",
        93: "HIDE",
        94: "UNHIDE",
        95: "WORKSPACE",
        96: "FORMULA",
        97: "FORMULA.FILL",
        98: "FORMULA.ARRAY",
        99: "DATA.FIND.NEXT",
        100: "DATA.FIND.PREV",
        101: "FORMULA.FIND.NEXT",
        102: "FORMULA.FIND.PREV",
        103: "ACTIVATE",
        104: "ACTIVATE.NEXT",
        105: "ACTIVATE.PREV",
        106: "UNLOCKED.NEXT",
        107: "UNLOCKED.PREV",
        108: "COPY.PICTURE",
        109: "SELECT",
        110: "DELETE.NAME",
        111: "DELETE.FORMAT",
        112: "VLINE",
        113: "HLINE",
        114: "VPAGE",
        115: "HPAGE",
        116: "VSCROLL",
        117: "HSCROLL",
        118: "ALERT",
        119: "NEW",
        120: "CANCEL.COPY",
        121: "SHOW.CLIPBOARD",
        122: "MESSAGE",
        124: "PASTE.LINK",
        125: "APP.ACTIVATE",
        126: "DELETE.ARROW",
        127: "ROW.HEIGHT",
        128: "FORMAT.MOVE",
        129: "FORMAT.SIZE",
        130: "FORMULA.REPLACE",
        131: "SEND.KEYS",
        132: "SELECT.SPECIAL",
        133: "APPLY.NAMES",
        134: "REPLACE.FONT",
        135: "FREEZE.PANES",
        136: "SHOW.INFO",
        137: "SPLIT",
        138: "ON.WINDOW",
        139: "ON.DATA",
        140: "DISABLE.INPUT",
        142: "OUTLINE",
        143: "LIST.NAMES",
        144: "FILE.CLOSE",
        145: "SAVE.WORKBOOK",
        146: "DATA.FORM",
        147: "COPY.CHART",
        148: "ON.TIME",
        149: "WAIT",
        150: "FORMAT.FONT",
        151: "FILL.UP",
        152: "FILL.LEFT",
        153: "DELETE.OVERLAY",
        155: "SHORT.MENUS",
        159: "SET.UPDATE.STATUS",
        161: "COLOR.PALETTE",
        162: "DELETE.STYLE",
        163: "WINDOW.RESTORE",
        164: "WINDOW.MAXIMIZE",
        166: "CHANGE.LINK",
        167: "CALCULATE.DOCUMENT",
        168: "ON.KEY",
        169: "APP.RESTORE",
        170: "APP.MOVE",
        171: "APP.SIZE",
        172: "APP.MINIMIZE",
        173: "APP.MAXIMIZE",
        174: "BRING.TO.FRONT",
        175: "SEND.TO.BACK",
        185: "MAIN.CHART.TYPE",
        186: "OVERLAY.CHART.TYPE",
        187: "SELECT.END",
        188: "OPEN.MAIL",
        189: "SEND.MAIL",
        190: "STANDARD.FONT",
        191: "CONSOLIDATE",
        192: "SORT.SPECIAL",
        193: "GALLERY.3D.AREA",
        194: "GALLERY.3D.COLUMN",
        195: "GALLERY.3D.LINE",
        196: "GALLERY.3D.PIE",
        197: "VIEW.3D",
        198: "GOAL.SEEK",
        199: "WORKGROUP",
        200: "FILL.GROUP",
        201: "UPDATE.LINK",
        202: "PROMOTE",
        203: "DEMOTE",
        204: "SHOW.DETAIL",
        206: "UNGROUP",
        207: "OBJECT.PROPERTIES",
        208: "SAVE.NEW.OBJECT",
        209: "SHARE",
        210: "SHARE.NAME",
        211: "DUPLICATE",
        212: "APPLY.STYLE",
        213: "ASSIGN.TO.OBJECT",
        214: "OBJECT.PROTECTION",
        215: "HIDE.OBJECT",
        216: "SET.EXTRACT",
        217: "CREATE.PUBLISHER",
        218: "SUBSCRIBE.TO",
        219: "ATTRIBUTES",
        220: "SHOW.TOOLBAR",
        222: "PRINT.PREVIEW",
        223: "EDIT.COLOR",
        224: "SHOW.LEVELS",
        225: "FORMAT.MAIN",
        226: "FORMAT.OVERLAY",
        227: "ON.RECALC",
        228: "EDIT.SERIES",
        229: "DEFINE.STYLE",
        240: "LINE.PRINT",
        243: "ENTER.DATA",
        249: "GALLERY.RADAR",
        250: "MERGE.STYLES",
        251: "EDITION.OPTIONS",
        252: "PASTE.PICTURE",
        253: "PASTE.PICTURE.LINK",
        254: "SPELLING",
        256: "ZOOM",
        259: "INSERT.OBJECT",
        260: "WINDOW.MINIMIZE",
        265: "SOUND.NOTE",
        266: "SOUND.PLAY",
        267: "FORMAT.SHAPE",
        268: "EXTEND.POLYGON",
        269: "FORMAT.AUTO",
        272: "GALLERY.3D.BAR",
        273: "GALLERY.3D.SURFACE",
        274: "FILL.AUTO",
        276: "CUSTOMIZE.TOOLBAR",
        277: "ADD.TOOL",
        278: "EDIT.OBJECT",
        279: "ON.DOUBLECLICK",
        280: "ON.ENTRY",
        281: "WORKBOOK.ADD",
        282: "WORKBOOK.MOVE",
        283: "WORKBOOK.COPY",
        284: "WORKBOOK.OPTIONS",
        285: "SAVE.WORKSPACE",
        288: "CHART.WIZARD",
        289: "DELETE.TOOL",
        290: "MOVE.TOOL",
        291: "WORKBOOK.SELECT",
        292: "WORKBOOK.ACTIVATE",
        293: "ASSIGN.TO.TOOL",
        295: "COPY.TOOL",
        296: "RESET.TOOL",
        297: "CONSTRAIN.NUMERIC",
        298: "PASTE.TOOL",
        302: "WORKBOOK.NEW",
        305: "SCENARIO.CELLS",
        306: "SCENARIO.DELETE",
        307: "SCENARIO.ADD",
        308: "SCENARIO.EDIT",
        309: "SCENARIO.SHOW",
        310: "SCENARIO.SHOW.NEXT",
        311: "SCENARIO.SUMMARY",
        312: "PIVOT.TABLE.WIZARD",
        313: "PIVOT.FIELD.PROPERTIES",
        314: "PIVOT.FIELD",
        315: "PIVOT.ITEM",
        316: "PIVOT.ADD.FIELDS",
        318: "OPTIONS.CALCULATION",
        319: "OPTIONS.EDIT",
        320: "OPTIONS.VIEW",
        321: "ADDIN.MANAGER",
        322: "MENU.EDITOR",
        323: "ATTACH.TOOLBARS",
        324: "VBAActivate",
        325: "OPTIONS.CHART",
        328: "VBA.INSERT.FILE",
        330: "VBA.PROCEDURE.DEFINITION",
        336: "ROUTING.SLIP",
        338: "ROUTE.DOCUMENT",
        339: "MAIL.LOGON",
        342: "INSERT.PICTURE",
        343: "EDIT.TOOL",
        344: "GALLERY.DOUGHNUT",
        350: "CHART.TREND",
        352: "PIVOT.ITEM.PROPERTIES",
        354: "WORKBOOK.INSERT",
        355: "OPTIONS.TRANSITION",
        356: "OPTIONS.GENERAL",
        370: "FILTER.ADVANCED",
        373: "MAIL.ADD.MAILER",
        374: "MAIL.DELETE.MAILER",
        375: "MAIL.REPLY",
        376: "MAIL.REPLY.ALL",
        377: "MAIL.FORWARD",
        378: "MAIL.NEXT.LETTER",
        379: "DATA.LABEL",
        380: "INSERT.TITLE",
        381: "FONT.PROPERTIES",
        382: "MACRO.OPTIONS",
        383: "WORKBOOK.HIDE",
        384: "WORKBOOK.UNHIDE",
        385: "WORKBOOK.DELETE",
        386: "WORKBOOK.NAME",
        388: "GALLERY.CUSTOM",
        390: "ADD.CHART.AUTOFORMAT",
        391: "DELETE.CHART.AUTOFORMAT",
        392: "CHART.ADD.DATA",
        393: "AUTO.OUTLINE",
        394: "TAB.ORDER",
        395: "SHOW.DIALOG",
        396: "SELECT.ALL",
        397: "UNGROUP.SHEETS",
        398: "SUBTOTAL.CREATE",
        399: "SUBTOTAL.REMOVE",
        400: "RENAME.OBJECT",
        412: "WORKBOOK.SCROLL",
        413: "WORKBOOK.NEXT",
        414: "WORKBOOK.PREV",
        415: "WORKBOOK.TAB.SPLIT",
        416: "FULL.SCREEN",
        417: "WORKBOOK.PROTECT",
        420: "SCROLLBAR.PROPERTIES",
        421: "PIVOT.SHOW.PAGES",
        422: "TEXT.TO.COLUMNS",
        423: "FORMAT.CHARTTYPE",
        424: "LINK.FORMAT",
        425: "TRACER.DISPLAY",
        430: "TRACER.NAVIGATE",
        431: "TRACER.CLEAR",
        432: "TRACER.ERROR",
        433: "PIVOT.FIELD.GROUP",
        434: "PIVOT.FIELD.UNGROUP",
        435: "CHECKBOX.PROPERTIES",
        436: "LABEL.PROPERTIES",
        437: "LISTBOX.PROPERTIES",
        438: "EDITBOX.PROPERTIES",
        439: "PIVOT.REFRESH",
        440: "LINK.COMBO",
        441: "OPEN.TEXT",
        442: "HIDE.DIALOG",
        443: "SET.DIALOG.FOCUS",
        444: "ENABLE.OBJECT",
        445: "PUSHBUTTON.PROPERTIES",
        446: "SET.DIALOG.DEFAULT",
        447: "FILTER",
        448: "FILTER.SHOW.ALL",
        449: "CLEAR.OUTLINE",
        450: "FUNCTION.WIZARD",
        451: "ADD.LIST.ITEM",
        452: "SET.LIST.ITEM",
        453: "REMOVE.LIST.ITEM",
        454: "SELECT.LIST.ITEM",
        455: "SET.CONTROL.VALUE",
        456: "SAVE.COPY.AS",
        458: "OPTIONS.LISTS.ADD",
        459: "OPTIONS.LISTS.DELETE",
        460: "SERIES.AXES",
        461: "SERIES.X",
        462: "SERIES.Y",
        463: "ERRORBAR.X",
        464: "ERRORBAR.Y",
        465: "FORMAT.CHART",
        466: "SERIES.ORDER",
        467: "MAIL.LOGOFF",
        468: "CLEAR.ROUTING.SLIP",
        469: "APP.ACTIVATE.MICROSOFT",
        470: "MAIL.EDIT.MAILER",
        471: "ON.SHEET",
        472: "STANDARD.WIDTH",
        473: "SCENARIO.MERGE",
        474: "SUMMARY.INFO",
        475: "FIND.FILE",
        476: "ACTIVE.CELL.FONT",
        477: "ENABLE.TIPWIZARD",
        478: "VBA.MAKE.ADDIN",
        480: "INSERTDATATABLE",
        481: "WORKGROUP.OPTIONS",
        482: "MAIL.SEND.MAILER",
        485: "AUTOCORRECT",
        489: "POST.DOCUMENT",
        491: "PICKLIST",
        493: "VIEW.SHOW",
        494: "VIEW.DEFINE",
        495: "VIEW.DELETE",
        509: "SHEET.BACKGROUND",
        510: "INSERT.MAP.OBJECT",
        511: "OPTIONS.MENONO",
        517: "MSOCHECKS",
        518: "NORMAL",
        519: "LAYOUT",
        520: "RM.PRINT.AREA",
        521: "CLEAR.PRINT.AREA",
        522: "ADD.PRINT.AREA",
        523: "MOVE.BRK",
        545: "HIDECURR.NOTE",
        546: "HIDEALL.NOTES",
        547: "DELETE.NOTE",
        548: "TRAVERSE.NOTES",
        549: "ACTIVATE.NOTES",
        620: "PROTECT.REVISIONS",
        621: "UNPROTECT.REVISIONS",
        647: "OPTIONS.ME",
        653: "WEB.PUBLISH",
        667: "NEWWEBQUERY",
        673: "PIVOT.TABLE.CHART",
        753: "OPTIONS.SAVE",
        755: "OPTIONS.SPELL",
        808: "HIDEALL.INKANNOTS"
    },
    Wf = {
        0: "COUNT",
        1: "IF",
        2: "ISNA",
        3: "ISERROR",
        4: "SUM",
        5: "AVERAGE",
        6: "MIN",
        7: "MAX",
        8: "ROW",
        9: "COLUMN",
        10: "NA",
        11: "NPV",
        12: "STDEV",
        13: "DOLLAR",
        14: "FIXED",
        15: "SIN",
        16: "COS",
        17: "TAN",
        18: "ATAN",
        19: "PI",
        20: "SQRT",
        21: "EXP",
        22: "LN",
        23: "LOG10",
        24: "ABS",
        25: "INT",
        26: "SIGN",
        27: "ROUND",
        28: "LOOKUP",
        29: "INDEX",
        30: "REPT",
        31: "MID",
        32: "LEN",
        33: "VALUE",
        34: "TRUE",
        35: "FALSE",
        36: "AND",
        37: "OR",
        38: "NOT",
        39: "MOD",
        40: "DCOUNT",
        41: "DSUM",
        42: "DAVERAGE",
        43: "DMIN",
        44: "DMAX",
        45: "DSTDEV",
        46: "VAR",
        47: "DVAR",
        48: "TEXT",
        49: "LINEST",
        50: "TREND",
        51: "LOGEST",
        52: "GROWTH",
        53: "GOTO",
        54: "HALT",
        55: "RETURN",
        56: "PV",
        57: "FV",
        58: "NPER",
        59: "PMT",
        60: "RATE",
        61: "MIRR",
        62: "IRR",
        63: "RAND",
        64: "MATCH",
        65: "DATE",
        66: "TIME",
        67: "DAY",
        68: "MONTH",
        69: "YEAR",
        70: "WEEKDAY",
        71: "HOUR",
        72: "MINUTE",
        73: "SECOND",
        74: "NOW",
        75: "AREAS",
        76: "ROWS",
        77: "COLUMNS",
        78: "OFFSET",
        79: "ABSREF",
        80: "RELREF",
        81: "ARGUMENT",
        82: "SEARCH",
        83: "TRANSPOSE",
        84: "ERROR",
        85: "STEP",
        86: "TYPE",
        87: "ECHO",
        88: "SET.NAME",
        89: "CALLER",
        90: "DEREF",
        91: "WINDOWS",
        92: "SERIES",
        93: "DOCUMENTS",
        94: "ACTIVE.CELL",
        95: "SELECTION",
        96: "RESULT",
        97: "ATAN2",
        98: "ASIN",
        99: "ACOS",
        100: "CHOOSE",
        101: "HLOOKUP",
        102: "VLOOKUP",
        103: "LINKS",
        104: "INPUT",
        105: "ISREF",
        106: "GET.FORMULA",
        107: "GET.NAME",
        108: "SET.VALUE",
        109: "LOG",
        110: "EXEC",
        111: "CHAR",
        112: "LOWER",
        113: "UPPER",
        114: "PROPER",
        115: "LEFT",
        116: "RIGHT",
        117: "EXACT",
        118: "TRIM",
        119: "REPLACE",
        120: "SUBSTITUTE",
        121: "CODE",
        122: "NAMES",
        123: "DIRECTORY",
        124: "FIND",
        125: "CELL",
        126: "ISERR",
        127: "ISTEXT",
        128: "ISNUMBER",
        129: "ISBLANK",
        130: "T",
        131: "N",
        132: "FOPEN",
        133: "FCLOSE",
        134: "FSIZE",
        135: "FREADLN",
        136: "FREAD",
        137: "FWRITELN",
        138: "FWRITE",
        139: "FPOS",
        140: "DATEVALUE",
        141: "TIMEVALUE",
        142: "SLN",
        143: "SYD",
        144: "DDB",
        145: "GET.DEF",
        146: "REFTEXT",
        147: "TEXTREF",
        148: "INDIRECT",
        149: "REGISTER",
        150: "CALL",
        151: "ADD.BAR",
        152: "ADD.MENU",
        153: "ADD.COMMAND",
        154: "ENABLE.COMMAND",
        155: "CHECK.COMMAND",
        156: "RENAME.COMMAND",
        157: "SHOW.BAR",
        158: "DELETE.MENU",
        159: "DELETE.COMMAND",
        160: "GET.CHART.ITEM",
        161: "DIALOG.BOX",
        162: "CLEAN",
        163: "MDETERM",
        164: "MINVERSE",
        165: "MMULT",
        166: "FILES",
        167: "IPMT",
        168: "PPMT",
        169: "COUNTA",
        170: "CANCEL.KEY",
        171: "FOR",
        172: "WHILE",
        173: "BREAK",
        174: "NEXT",
        175: "INITIATE",
        176: "REQUEST",
        177: "POKE",
        178: "EXECUTE",
        179: "TERMINATE",
        180: "RESTART",
        181: "HELP",
        182: "GET.BAR",
        183: "PRODUCT",
        184: "FACT",
        185: "GET.CELL",
        186: "GET.WORKSPACE",
        187: "GET.WINDOW",
        188: "GET.DOCUMENT",
        189: "DPRODUCT",
        190: "ISNONTEXT",
        191: "GET.NOTE",
        192: "NOTE",
        193: "STDEVP",
        194: "VARP",
        195: "DSTDEVP",
        196: "DVARP",
        197: "TRUNC",
        198: "ISLOGICAL",
        199: "DCOUNTA",
        200: "DELETE.BAR",
        201: "UNREGISTER",
        204: "USDOLLAR",
        205: "FINDB",
        206: "SEARCHB",
        207: "REPLACEB",
        208: "LEFTB",
        209: "RIGHTB",
        210: "MIDB",
        211: "LENB",
        212: "ROUNDUP",
        213: "ROUNDDOWN",
        214: "ASC",
        215: "DBCS",
        216: "RANK",
        219: "ADDRESS",
        220: "DAYS360",
        221: "TODAY",
        222: "VDB",
        223: "ELSE",
        224: "ELSE.IF",
        225: "END.IF",
        226: "FOR.CELL",
        227: "MEDIAN",
        228: "SUMPRODUCT",
        229: "SINH",
        230: "COSH",
        231: "TANH",
        232: "ASINH",
        233: "ACOSH",
        234: "ATANH",
        235: "DGET",
        236: "CREATE.OBJECT",
        237: "VOLATILE",
        238: "LAST.ERROR",
        239: "CUSTOM.UNDO",
        240: "CUSTOM.REPEAT",
        241: "FORMULA.CONVERT",
        242: "GET.LINK.INFO",
        243: "TEXT.BOX",
        244: "INFO",
        245: "GROUP",
        246: "GET.OBJECT",
        247: "DB",
        248: "PAUSE",
        251: "RESUME",
        252: "FREQUENCY",
        253: "ADD.TOOLBAR",
        254: "DELETE.TOOLBAR",
        255: "User",
        256: "RESET.TOOLBAR",
        257: "EVALUATE",
        258: "GET.TOOLBAR",
        259: "GET.TOOL",
        260: "SPELLING.CHECK",
        261: "ERROR.TYPE",
        262: "APP.TITLE",
        263: "WINDOW.TITLE",
        264: "SAVE.TOOLBAR",
        265: "ENABLE.TOOL",
        266: "PRESS.TOOL",
        267: "REGISTER.ID",
        268: "GET.WORKBOOK",
        269: "AVEDEV",
        270: "BETADIST",
        271: "GAMMALN",
        272: "BETAINV",
        273: "BINOMDIST",
        274: "CHIDIST",
        275: "CHIINV",
        276: "COMBIN",
        277: "CONFIDENCE",
        278: "CRITBINOM",
        279: "EVEN",
        280: "EXPONDIST",
        281: "FDIST",
        282: "FINV",
        283: "FISHER",
        284: "FISHERINV",
        285: "FLOOR",
        286: "GAMMADIST",
        287: "GAMMAINV",
        288: "CEILING",
        289: "HYPGEOMDIST",
        290: "LOGNORMDIST",
        291: "LOGINV",
        292: "NEGBINOMDIST",
        293: "NORMDIST",
        294: "NORMSDIST",
        295: "NORMINV",
        296: "NORMSINV",
        297: "STANDARDIZE",
        298: "ODD",
        299: "PERMUT",
        300: "POISSON",
        301: "TDIST",
        302: "WEIBULL",
        303: "SUMXMY2",
        304: "SUMX2MY2",
        305: "SUMX2PY2",
        306: "CHITEST",
        307: "CORREL",
        308: "COVAR",
        309: "FORECAST",
        310: "FTEST",
        311: "INTERCEPT",
        312: "PEARSON",
        313: "RSQ",
        314: "STEYX",
        315: "SLOPE",
        316: "TTEST",
        317: "PROB",
        318: "DEVSQ",
        319: "GEOMEAN",
        320: "HARMEAN",
        321: "SUMSQ",
        322: "KURT",
        323: "SKEW",
        324: "ZTEST",
        325: "LARGE",
        326: "SMALL",
        327: "QUARTILE",
        328: "PERCENTILE",
        329: "PERCENTRANK",
        330: "MODE",
        331: "TRIMMEAN",
        332: "TINV",
        334: "MOVIE.COMMAND",
        335: "GET.MOVIE",
        336: "CONCATENATE",
        337: "POWER",
        338: "PIVOT.ADD.DATA",
        339: "GET.PIVOT.TABLE",
        340: "GET.PIVOT.FIELD",
        341: "GET.PIVOT.ITEM",
        342: "RADIANS",
        343: "DEGREES",
        344: "SUBTOTAL",
        345: "SUMIF",
        346: "COUNTIF",
        347: "COUNTBLANK",
        348: "SCENARIO.GET",
        349: "OPTIONS.LISTS.GET",
        350: "ISPMT",
        351: "DATEDIF",
        352: "DATESTRING",
        353: "NUMBERSTRING",
        354: "ROMAN",
        355: "OPEN.DIALOG",
        356: "SAVE.DIALOG",
        357: "VIEW.GET",
        358: "GETPIVOTDATA",
        359: "HYPERLINK",
        360: "PHONETIC",
        361: "AVERAGEA",
        362: "MAXA",
        363: "MINA",
        364: "STDEVPA",
        365: "VARPA",
        366: "STDEVA",
        367: "VARA",
        368: "BAHTTEXT",
        369: "THAIDAYOFWEEK",
        370: "THAIDIGIT",
        371: "THAIMONTHOFYEAR",
        372: "THAINUMSOUND",
        373: "THAINUMSTRING",
        374: "THAISTRINGLENGTH",
        375: "ISTHAIDIGIT",
        376: "ROUNDBAHTDOWN",
        377: "ROUNDBAHTUP",
        378: "THAIYEAR",
        379: "RTD",
        380: "CUBEVALUE",
        381: "CUBEMEMBER",
        382: "CUBEMEMBERPROPERTY",
        383: "CUBERANKEDMEMBER",
        384: "HEX2BIN",
        385: "HEX2DEC",
        386: "HEX2OCT",
        387: "DEC2BIN",
        388: "DEC2HEX",
        389: "DEC2OCT",
        390: "OCT2BIN",
        391: "OCT2HEX",
        392: "OCT2DEC",
        393: "BIN2DEC",
        394: "BIN2OCT",
        395: "BIN2HEX",
        396: "IMSUB",
        397: "IMDIV",
        398: "IMPOWER",
        399: "IMABS",
        400: "IMSQRT",
        401: "IMLN",
        402: "IMLOG2",
        403: "IMLOG10",
        404: "IMSIN",
        405: "IMCOS",
        406: "IMEXP",
        407: "IMARGUMENT",
        408: "IMCONJUGATE",
        409: "IMAGINARY",
        410: "IMREAL",
        411: "COMPLEX",
        412: "IMSUM",
        413: "IMPRODUCT",
        414: "SERIESSUM",
        415: "FACTDOUBLE",
        416: "SQRTPI",
        417: "QUOTIENT",
        418: "DELTA",
        419: "GESTEP",
        420: "ISEVEN",
        421: "ISODD",
        422: "MROUND",
        423: "ERF",
        424: "ERFC",
        425: "BESSELJ",
        426: "BESSELK",
        427: "BESSELY",
        428: "BESSELI",
        429: "XIRR",
        430: "XNPV",
        431: "PRICEMAT",
        432: "YIELDMAT",
        433: "INTRATE",
        434: "RECEIVED",
        435: "DISC",
        436: "PRICEDISC",
        437: "YIELDDISC",
        438: "TBILLEQ",
        439: "TBILLPRICE",
        440: "TBILLYIELD",
        441: "PRICE",
        442: "YIELD",
        443: "DOLLARDE",
        444: "DOLLARFR",
        445: "NOMINAL",
        446: "EFFECT",
        447: "CUMPRINC",
        448: "CUMIPMT",
        449: "EDATE",
        450: "EOMONTH",
        451: "YEARFRAC",
        452: "COUPDAYBS",
        453: "COUPDAYS",
        454: "COUPDAYSNC",
        455: "COUPNCD",
        456: "COUPNUM",
        457: "COUPPCD",
        458: "DURATION",
        459: "MDURATION",
        460: "ODDLPRICE",
        461: "ODDLYIELD",
        462: "ODDFPRICE",
        463: "ODDFYIELD",
        464: "RANDBETWEEN",
        465: "WEEKNUM",
        466: "AMORDEGRC",
        467: "AMORLINC",
        468: "CONVERT",
        724: "SHEETJS",
        469: "ACCRINT",
        470: "ACCRINTM",
        471: "WORKDAY",
        472: "NETWORKDAYS",
        473: "GCD",
        474: "MULTINOMIAL",
        475: "LCM",
        476: "FVSCHEDULE",
        477: "CUBEKPIMEMBER",
        478: "CUBESET",
        479: "CUBESETCOUNT",
        480: "IFERROR",
        481: "COUNTIFS",
        482: "SUMIFS",
        483: "AVERAGEIF",
        484: "AVERAGEIFS"
    },
    rv = {
        2: 1,
        3: 1,
        10: 0,
        15: 1,
        16: 1,
        17: 1,
        18: 1,
        19: 0,
        20: 1,
        21: 1,
        22: 1,
        23: 1,
        24: 1,
        25: 1,
        26: 1,
        27: 2,
        30: 2,
        31: 3,
        32: 1,
        33: 1,
        34: 0,
        35: 0,
        38: 1,
        39: 2,
        40: 3,
        41: 3,
        42: 3,
        43: 3,
        44: 3,
        45: 3,
        47: 3,
        48: 2,
        53: 1,
        61: 3,
        63: 0,
        65: 3,
        66: 3,
        67: 1,
        68: 1,
        69: 1,
        70: 1,
        71: 1,
        72: 1,
        73: 1,
        74: 0,
        75: 1,
        76: 1,
        77: 1,
        79: 2,
        80: 2,
        83: 1,
        85: 0,
        86: 1,
        89: 0,
        90: 1,
        94: 0,
        95: 0,
        97: 2,
        98: 1,
        99: 1,
        101: 3,
        102: 3,
        105: 1,
        106: 1,
        108: 2,
        111: 1,
        112: 1,
        113: 1,
        114: 1,
        117: 2,
        118: 1,
        119: 4,
        121: 1,
        126: 1,
        127: 1,
        128: 1,
        129: 1,
        130: 1,
        131: 1,
        133: 1,
        134: 1,
        135: 1,
        136: 2,
        137: 2,
        138: 2,
        140: 1,
        141: 1,
        142: 3,
        143: 4,
        144: 4,
        161: 1,
        162: 1,
        163: 1,
        164: 1,
        165: 2,
        172: 1,
        175: 2,
        176: 2,
        177: 3,
        178: 2,
        179: 1,
        184: 1,
        186: 1,
        189: 3,
        190: 1,
        195: 3,
        196: 3,
        197: 1,
        198: 1,
        199: 3,
        201: 1,
        207: 4,
        210: 3,
        211: 1,
        212: 2,
        213: 2,
        214: 1,
        215: 1,
        225: 0,
        229: 1,
        230: 1,
        231: 1,
        232: 1,
        233: 1,
        234: 1,
        235: 3,
        244: 1,
        247: 4,
        252: 2,
        257: 1,
        261: 1,
        271: 1,
        273: 4,
        274: 2,
        275: 2,
        276: 2,
        277: 3,
        278: 3,
        279: 1,
        280: 3,
        281: 3,
        282: 3,
        283: 1,
        284: 1,
        285: 2,
        286: 4,
        287: 3,
        288: 2,
        289: 4,
        290: 3,
        291: 3,
        292: 3,
        293: 4,
        294: 1,
        295: 3,
        296: 1,
        297: 3,
        298: 1,
        299: 2,
        300: 3,
        301: 3,
        302: 4,
        303: 2,
        304: 2,
        305: 2,
        306: 2,
        307: 2,
        308: 2,
        309: 3,
        310: 2,
        311: 2,
        312: 2,
        313: 2,
        314: 2,
        315: 2,
        316: 4,
        325: 2,
        326: 2,
        327: 2,
        328: 2,
        331: 2,
        332: 2,
        337: 2,
        342: 1,
        343: 1,
        346: 2,
        347: 1,
        350: 4,
        351: 3,
        352: 1,
        353: 2,
        360: 1,
        368: 1,
        369: 1,
        370: 1,
        371: 1,
        372: 1,
        373: 1,
        374: 1,
        375: 1,
        376: 1,
        377: 1,
        378: 1,
        382: 3,
        385: 1,
        392: 1,
        393: 1,
        396: 2,
        397: 2,
        398: 2,
        399: 1,
        400: 1,
        401: 1,
        402: 1,
        403: 1,
        404: 1,
        405: 1,
        406: 1,
        407: 1,
        408: 1,
        409: 1,
        410: 1,
        414: 4,
        415: 1,
        416: 1,
        417: 2,
        420: 1,
        421: 1,
        422: 2,
        424: 1,
        425: 2,
        426: 2,
        427: 2,
        428: 2,
        430: 3,
        438: 3,
        439: 3,
        440: 3,
        443: 2,
        444: 2,
        445: 2,
        446: 2,
        447: 6,
        448: 6,
        449: 2,
        450: 2,
        464: 2,
        468: 3,
        476: 2,
        479: 1,
        480: 2,
        65535: 0
    };

function Gi(e) {
    return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
        return r.replace(/\./g, "")
    }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";")
}

function tv(e) {
    var t = "of:=" + e.replace(Dn, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
    return t.replace(/;/g, "|").replace(/,/g, ";")
}

function B0(e) {
    var t = e.split(":"),
        r = t[0].split(".")[0];
    return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")]
}

function av(e) {
    return e.replace(/\./, "!")
}
var Ea = {},
    ra = {},
    Ta = typeof Map < "u";

function Rn(e, t, r) {
    var a = 0,
        n = e.length;
    if (r) {
        if (Ta ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
            for (var i = Ta ? r.get(t) : r[t]; a < i.length; ++a)
                if (e[i[a]].t === t) return e.Count++, i[a]
        }
    } else
        for (; a < n; ++a)
            if (e[a].t === t) return e.Count++, a;
    return e[n] = {
        t
    }, e.Count++, e.Unique++, r && (Ta ? (r.has(t) || r.set(t, []), r.get(t).push(n)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(n))), n
}

function A0(e, t) {
    var r = {
            min: e + 1,
            max: e + 1
        },
        a = -1;
    return t.MDW && (vr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? a = ba(t.wpx) : t.wch != null && (a = t.wch), a > -1 ? (r.width = p0(a), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r
}

function bt(e, t) {
    if (e) {
        var r = [.7, .7, .75, .75, .3, .3];
        t == "xlml" && (r = [1, 1, 1, 1, .5, .5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5])
    }
}

function At(e, t, r) {
    var a = r.revssf[t.z != null ? t.z : "General"],
        n = 60,
        i = e.length;
    if (a == null && r.ssf) {
        for (; n < 392; ++n)
            if (r.ssf[n] == null) {
                ct(t.z, n), r.ssf[n] = t.z, r.revssf[t.z] = a = n;
                break
            }
    }
    for (n = 0; n != i; ++n)
        if (e[n].numFmtId === a) return n;
    return e[i] = {
        numFmtId: a,
        fontId: 0,
        fillId: 0,
        borderId: 0,
        xfId: 0,
        applyNumberFormat: 1
    }, i
}

function Hf(e, t, r, a, n, i) {
    try {
        a.cellNF && (e.z = ve[t])
    } catch (f) {
        if (a.WTF) throw f
    }
    if (!(e.t === "z" && !a.cellStyles)) {
        if (e.t === "d" && typeof e.v == "string" && (e.v = Ue(e.v)), (!a || a.cellText !== !1) && e.t !== "z") try {
            if (ve[t] == null && ct(Qc[t] || "General", t), e.t === "e") e.w = e.w || xt[e.v];
            else if (t === 0)
                if (e.t === "n")(e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = ya(e.v);
                else if (e.t === "d") {
                var s = nr(e.v);
                (s | 0) === s ? e.w = s.toString(10) : e.w = ya(s)
            } else {
                if (e.v === void 0) return "";
                e.w = Pt(e.v, ra)
            } else e.t === "d" ? e.w = Vr(t, nr(e.v), ra) : e.w = Vr(t, e.v, ra)
        } catch (f) {
            if (a.WTF) throw f
        }
        if (a.cellStyles && r != null) try {
            e.s = i.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = v0(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), a.WTF && (e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = v0(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), a.WTF && (e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb))
        } catch (f) {
            if (a.WTF && i.Fills) throw f
        }
    }
}

function nv(e, t, r) {
    if (e && e["!ref"]) {
        var a = De(e["!ref"]);
        if (a.e.c < a.s.c || a.e.r < a.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"])
    }
}

function iv(e, t) {
    var r = De(t);
    r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = we(r))
}
var sv = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g,
    fv = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/,
    cv = /<(?:\w:)?hyperlink [^>]*>/mg,
    ov = /"(\w*:\w*)"/,
    lv = /<(?:\w:)?col\b[^>]*[\/]?>/g,
    hv = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g,
    uv = /<(?:\w:)?pageMargins[^>]*\/>/g,
    Vf = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/,
    xv = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/,
    dv = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;

function vv(e, t, r, a, n, i, s) {
    if (!e) return e;
    a || (a = {
        "!id": {}
    });
    var f = t.dense ? [] : {},
        c = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        },
        o = "",
        l = "",
        h = e.match(fv);
    h ? (o = e.slice(0, h.index), l = e.slice(h.index + h[0].length)) : o = l = e;
    var x = o.match(Vf);
    x ? Nn(x[0], f, n, r) : (x = o.match(xv)) && mv(x[0], x[1] || "", f, n, r);
    var d = (o.match(/<(?:\w*:)?dimension/) || {
        index: -1
    }).index;
    if (d > 0) {
        var v = o.slice(d, d + 50).match(ov);
        v && iv(f, v[1])
    }
    var u = o.match(dv);
    u && u[1] && Ov(u[1], n);
    var p = [];
    if (t.cellStyles) {
        var k = o.match(lv);
        k && Fv(p, k)
    }
    h && Nv(h[1], f, t, c, i, s);
    var A = l.match(hv);
    A && (f["!autofilter"] = yv(A[0]));
    var g = [],
        O = l.match(sv);
    if (O)
        for (d = 0; d != O.length; ++d) g[d] = De(O[d].slice(O[d].indexOf('"') + 1));
    var b = l.match(cv);
    b && Ev(f, b, a);
    var N = l.match(uv);
    if (N && (f["!margins"] = Tv(me(N[0]))), !f["!ref"] && c.e.c >= c.s.c && c.e.r >= c.s.r && (f["!ref"] = we(c)), t.sheetRows > 0 && f["!ref"]) {
        var F = De(f["!ref"]);
        t.sheetRows <= +F.e.r && (F.e.r = t.sheetRows - 1, F.e.r > c.e.r && (F.e.r = c.e.r), F.e.r < F.s.r && (F.s.r = F.e.r), F.e.c > c.e.c && (F.e.c = c.e.c), F.e.c < F.s.c && (F.s.c = F.e.c), f["!fullref"] = f["!ref"], f["!ref"] = we(F))
    }
    return p.length > 0 && (f["!cols"] = p), g.length > 0 && (f["!merges"] = g), f
}

function pv(e) {
    if (e.length === 0) return "";
    for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + we(e[r]) + '"/>';
    return t + "</mergeCells>"
}

function Nn(e, t, r, a) {
    var n = me(e);
    r.Sheets[a] || (r.Sheets[a] = {}), n.codeName && (r.Sheets[a].CodeName = Ce(Pe(n.codeName)))
}

function mv(e, t, r, a, n) {
    Nn(e.slice(0, e.indexOf(">")), r, a, n)
}

function gv(e, t, r, a, n) {
    var i = !1,
        s = {},
        f = null;
    if (a.bookType !== "xlsx" && t.vbaraw) {
        var c = t.SheetNames[r];
        try {
            t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c)
        } catch {}
        i = !0, s.codeName = et(Ne(c))
    }
    if (e && e["!outline"]) {
        var o = {
            summaryBelow: 1,
            summaryRight: 1
        };
        e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + ae("outlinePr", null, o)
    }!i && !f || (n[n.length] = ae("sheetPr", f, s))
}
var _v = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"],
    wv = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];

function kv(e) {
    var t = {
        sheet: 1
    };
    return _v.forEach(function(r) {
        e[r] != null && e[r] && (t[r] = "1")
    }), wv.forEach(function(r) {
        e[r] != null && !e[r] && (t[r] = "0")
    }), e.password && (t.password = An(e.password).toString(16).toUpperCase()), ae("sheetProtection", null, t)
}

function Ev(e, t, r) {
    for (var a = Array.isArray(e), n = 0; n != t.length; ++n) {
        var i = me(Pe(t[n]), !0);
        if (!i.ref) return;
        var s = ((r || {})["!id"] || [])[i.id];
        s ? (i.Target = s.Target, i.location && (i.Target += "#" + Ce(i.location))) : (i.Target = "#" + Ce(i.location), s = {
            Target: i.Target,
            TargetMode: "Internal"
        }), i.Rel = s, i.tooltip && (i.Tooltip = i.tooltip, delete i.tooltip);
        for (var f = De(i.ref), c = f.s.r; c <= f.e.r; ++c)
            for (var o = f.s.c; o <= f.e.c; ++o) {
                var l = pe({
                    c: o,
                    r: c
                });
                a ? (e[c] || (e[c] = []), e[c][o] || (e[c][o] = {
                    t: "z",
                    v: void 0
                }), e[c][o].l = i) : (e[l] || (e[l] = {
                    t: "z",
                    v: void 0
                }), e[l].l = i)
            }
    }
}

function Tv(e) {
    var t = {};
    return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
        e[r] && (t[r] = parseFloat(e[r]))
    }), t
}

function Sv(e) {
    return bt(e), ae("pageMargins", null, e)
}

function Fv(e, t) {
    for (var r = !1, a = 0; a != t.length; ++a) {
        var n = me(t[a], !0);
        n.hidden && (n.hidden = Me(n.hidden));
        var i = parseInt(n.min, 10) - 1,
            s = parseInt(n.max, 10) - 1;
        for (n.outlineLevel && (n.level = +n.outlineLevel || 0), delete n.min, delete n.max, n.width = +n.width, !r && n.width && (r = !0, yn(n.width)), kt(n); i <= s;) e[i++] = We(n)
    }
}

function Av(e, t) {
    for (var r = ["<cols>"], a, n = 0; n != t.length; ++n)(a = t[n]) && (r[r.length] = ae("col", null, A0(n, a)));
    return r[r.length] = "</cols>", r.join("")
}

function yv(e) {
    var t = {
        ref: (e.match(/ref="([^"]*)"/) || [])[1]
    };
    return t
}

function Cv(e, t, r, a) {
    var n = typeof e.ref == "string" ? e.ref : we(e.ref);
    r.Workbook || (r.Workbook = {
        Sheets: []
    }), r.Workbook.Names || (r.Workbook.Names = []);
    var i = r.Workbook.Names,
        s = Ar(n);
    s.s.r == s.e.r && (s.e.r = Ar(t["!ref"]).e.r, n = we(s));
    for (var f = 0; f < i.length; ++f) {
        var c = i[f];
        if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == a) {
            c.Ref = "'" + r.SheetNames[a] + "'!" + n;
            break
        }
    }
    return f == i.length && i.push({
        Name: "_xlnm._FilterDatabase",
        Sheet: a,
        Ref: "'" + r.SheetNames[a] + "'!" + n
    }), ae("autoFilter", null, {
        ref: n
    })
}
var Dv = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/;

function Ov(e, t) {
    t.Views || (t.Views = [{}]), (e.match(Dv) || []).forEach(function(r, a) {
        var n = me(r);
        t.Views[a] || (t.Views[a] = {}), +n.zoomScale && (t.Views[a].zoom = +n.zoomScale), Me(n.rightToLeft) && (t.Views[a].RTL = !0)
    })
}

function Iv(e, t, r, a) {
    var n = {
        workbookViewId: "0"
    };
    return (((a || {}).Workbook || {}).Views || [])[0] && (n.rightToLeft = a.Workbook.Views[0].RTL ? "1" : "0"), ae("sheetViews", ae("sheetView", null, n), {})
}

function Rv(e, t, r, a) {
    if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
    var n = "",
        i = e.t,
        s = e.v;
    if (e.t !== "z") switch (e.t) {
        case "b":
            n = e.v ? "1" : "0";
            break;
        case "n":
            n = "" + e.v;
            break;
        case "e":
            n = xt[e.v];
            break;
        case "d":
            a && a.cellDates ? n = Ue(e.v, -1).toISOString() : (e = We(e), e.t = "n", n = "" + (e.v = nr(Ue(e.v)))), typeof e.z > "u" && (e.z = ve[14]);
            break;
        default:
            n = e.v;
            break
    }
    var f = lr("v", Ne(n)),
        c = {
            r: t
        },
        o = At(a.cellXfs, e, a);
    switch (o !== 0 && (c.s = o), e.t) {
        case "n":
            break;
        case "d":
            c.t = "d";
            break;
        case "b":
            c.t = "b";
            break;
        case "e":
            c.t = "e";
            break;
        case "z":
            break;
        default:
            if (e.v == null) {
                delete e.t;
                break
            }
            if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
            if (a && a.bookSST) {
                f = lr("v", "" + Rn(a.Strings, e.v, a.revStrings)), c.t = "s";
                break
            }
            c.t = "str";
            break
    }
    if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
        var l = e.F && e.F.slice(0, t.length) == t ? {
            t: "array",
            ref: e.F
        } : null;
        f = ae("f", Ne(e.f), l) + (e.v != null ? f : "")
    }
    return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), ae("c", f, c)
}
var Nv = function() {
    var e = /<(?:\w+:)?c[ \/>]/,
        t = /<\/(?:\w+:)?row>/,
        r = /r=["']([^"']*)["']/,
        a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/,
        n = /ref=["']([^"']*)["']/,
        i = Ca("v"),
        s = Ca("f");
    return function(c, o, l, h, x, d) {
        for (var v = 0, u = "", p = [], k = [], A = 0, g = 0, O = 0, b = "", N, F, B = 0, I = 0, z, G, L = 0, J = 0, le = Array.isArray(d.CellXf), ie, ue = [], ce = [], be = Array.isArray(o), V = [], de = {}, ge = !1, C = !!l.sheetStubs, P = c.split(t), D = 0, R = P.length; D != R; ++D) {
            u = P[D].trim();
            var j = u.length;
            if (j !== 0) {
                var re = 0;
                e: for (v = 0; v < j; ++v) switch (u[v]) {
                    case ">":
                        if (u[v - 1] != "/") {
                            ++v;
                            break e
                        }
                        if (l && l.cellStyles) {
                            if (F = me(u.slice(re, v), !0), B = F.r != null ? parseInt(F.r, 10) : B + 1, I = -1, l.sheetRows && l.sheetRows < B) continue;
                            de = {}, ge = !1, F.ht && (ge = !0, de.hpt = parseFloat(F.ht), de.hpx = na(de.hpt)), F.hidden == "1" && (ge = !0, de.hidden = !0), F.outlineLevel != null && (ge = !0, de.level = +F.outlineLevel), ge && (V[B - 1] = de)
                        }
                        break;
                    case "<":
                        re = v;
                        break
                }
                if (re >= v) break;
                if (F = me(u.slice(re, v), !0), B = F.r != null ? parseInt(F.r, 10) : B + 1, I = -1, !(l.sheetRows && l.sheetRows < B)) {
                    h.s.r > B - 1 && (h.s.r = B - 1), h.e.r < B - 1 && (h.e.r = B - 1), l && l.cellStyles && (de = {}, ge = !1, F.ht && (ge = !0, de.hpt = parseFloat(F.ht), de.hpx = na(de.hpt)), F.hidden == "1" && (ge = !0, de.hidden = !0), F.outlineLevel != null && (ge = !0, de.level = +F.outlineLevel), ge && (V[B - 1] = de)), p = u.slice(v).split(e);
                    for (var te = 0; te != p.length && p[te].trim().charAt(0) == "<"; ++te);
                    for (p = p.slice(te), v = 0; v != p.length; ++v)
                        if (u = p[v].trim(), u.length !== 0) {
                            if (k = u.match(r), A = v, g = 0, O = 0, u = "<c " + (u.slice(0, 1) == "<" ? ">" : "") + u, k != null && k.length === 2) {
                                for (A = 0, b = k[1], g = 0; g != b.length && !((O = b.charCodeAt(g) - 64) < 1 || O > 26); ++g) A = 26 * A + O;
                                --A, I = A
                            } else ++I;
                            for (g = 0; g != u.length && u.charCodeAt(g) !== 62; ++g);
                            if (++g, F = me(u.slice(0, g), !0), F.r || (F.r = pe({
                                    r: B - 1,
                                    c: I
                                })), b = u.slice(g), N = {
                                    t: ""
                                }, (k = b.match(i)) != null && k[1] !== "" && (N.v = Ce(k[1])), l.cellFormula) {
                                if ((k = b.match(s)) != null && k[1] !== "") {
                                    if (N.f = Ce(Pe(k[1])).replace(/\r\n/g, `
`), l.xlfn || (N.f = Ui(N.f)), k[0].indexOf('t="array"') > -1) N.F = (b.match(n) || [])[1], N.F.indexOf(":") > -1 && ue.push([De(N.F), N.F]);
                                    else if (k[0].indexOf('t="shared"') > -1) {
                                        G = me(k[0]);
                                        var Q = Ce(Pe(k[1]));
                                        l.xlfn || (Q = Ui(Q)), ce[parseInt(G.si, 10)] = [G, Q, F.r]
                                    }
                                } else(k = b.match(/<f[^>]*\/>/)) && (G = me(k[0]), ce[G.si] && (N.f = Dx(ce[G.si][1], ce[G.si][2], F.r)));
                                var Z = Xe(F.r);
                                for (g = 0; g < ue.length; ++g) Z.r >= ue[g][0].s.r && Z.r <= ue[g][0].e.r && Z.c >= ue[g][0].s.c && Z.c <= ue[g][0].e.c && (N.F = ue[g][1])
                            }
                            if (F.t == null && N.v === void 0)
                                if (N.f || N.F) N.v = 0, N.t = "n";
                                else if (C) N.t = "z";
                            else continue;
                            else N.t = F.t || "n";
                            switch (h.s.c > I && (h.s.c = I), h.e.c < I && (h.e.c = I), N.t) {
                                case "n":
                                    if (N.v == "" || N.v == null) {
                                        if (!C) continue;
                                        N.t = "z"
                                    } else N.v = parseFloat(N.v);
                                    break;
                                case "s":
                                    if (typeof N.v > "u") {
                                        if (!C) continue;
                                        N.t = "z"
                                    } else z = Ea[parseInt(N.v, 10)], N.v = z.t, N.r = z.r, l.cellHTML && (N.h = z.h);
                                    break;
                                case "str":
                                    N.t = "s", N.v = N.v != null ? Pe(N.v) : "", l.cellHTML && (N.h = hn(N.v));
                                    break;
                                case "inlineStr":
                                    k = b.match(a), N.t = "s", k != null && (z = Fn(k[1])) ? (N.v = z.t, l.cellHTML && (N.h = z.h)) : N.v = "";
                                    break;
                                case "b":
                                    N.v = Me(N.v);
                                    break;
                                case "d":
                                    l.cellDates ? N.v = Ue(N.v, 1) : (N.v = nr(Ue(N.v, 1)), N.t = "n");
                                    break;
                                case "e":
                                    (!l || l.cellText !== !1) && (N.w = N.v), N.v = Gs[N.v];
                                    break
                            }
                            if (L = J = 0, ie = null, le && F.s !== void 0 && (ie = d.CellXf[F.s], ie != null && (ie.numFmtId != null && (L = ie.numFmtId), l.cellStyles && ie.fillId != null && (J = ie.fillId))), Hf(N, L, J, l, x, d), l.cellDates && le && N.t == "n" && ia(ve[L]) && (N.t = "d", N.v = E0(N.v)), F.cm && l.xlmeta) {
                                var Ee = (l.xlmeta.Cell || [])[+F.cm - 1];
                                Ee && Ee.type == "XLDAPR" && (N.D = !0)
                            }
                            if (be) {
                                var y = Xe(F.r);
                                o[y.r] || (o[y.r] = []), o[y.r][y.c] = N
                            } else o[F.r] = N
                        }
                }
            }
        }
        V.length > 0 && (o["!rows"] = V)
    }
}();

function bv(e, t, r, a) {
    var n = [],
        i = [],
        s = De(e["!ref"]),
        f = "",
        c, o = "",
        l = [],
        h = 0,
        x = 0,
        d = e["!rows"],
        v = Array.isArray(e),
        u = {
            r: o
        },
        p, k = -1;
    for (x = s.s.c; x <= s.e.c; ++x) l[x] = Ge(x);
    for (h = s.s.r; h <= s.e.r; ++h) {
        for (i = [], o = Ze(h), x = s.s.c; x <= s.e.c; ++x) {
            c = l[x] + o;
            var A = v ? (e[h] || [])[x] : e[c];
            A !== void 0 && (f = Rv(A, c, e, t)) != null && i.push(f)
        }(i.length > 0 || d && d[h]) && (u = {
            r: o
        }, d && d[h] && (p = d[h], p.hidden && (u.hidden = 1), k = -1, p.hpx ? k = Pa(p.hpx) : p.hpt && (k = p.hpt), k > -1 && (u.ht = k, u.customHeight = 1), p.level && (u.outlineLevel = p.level)), n[n.length] = ae("row", i.join(""), u))
    }
    if (d)
        for (; h < d.length; ++h) d && d[h] && (u = {
            r: h + 1
        }, p = d[h], p.hidden && (u.hidden = 1), k = -1, p.hpx ? k = Pa(p.hpx) : p.hpt && (k = p.hpt), k > -1 && (u.ht = k, u.customHeight = 1), p.level && (u.outlineLevel = p.level), n[n.length] = ae("row", "", u));
    return n.join("")
}

function Gf(e, t, r, a) {
    var n = [qe, ae("worksheet", null, {
            xmlns: Ht[0],
            "xmlns:r": ar.r
        })],
        i = r.SheetNames[e],
        s = 0,
        f = "",
        c = r.Sheets[i];
    c == null && (c = {});
    var o = c["!ref"] || "A1",
        l = De(o);
    if (l.e.c > 16383 || l.e.r > 1048575) {
        if (t.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
        l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575), o = we(l)
    }
    a || (a = {}), c["!comments"] = [];
    var h = [];
    gv(c, r, e, t, n), n[n.length] = ae("dimension", null, {
        ref: o
    }), n[n.length] = Iv(c, t, e, r), t.sheetFormat && (n[n.length] = ae("sheetFormatPr", null, {
        defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
        baseColWidth: t.sheetFormat.baseColWidth || "10",
        outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
    })), c["!cols"] != null && c["!cols"].length > 0 && (n[n.length] = Av(c, c["!cols"])), n[s = n.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = bv(c, t), f.length > 0 && (n[n.length] = f)), n.length > s + 1 && (n[n.length] = "</sheetData>", n[s] = n[s].replace("/>", ">")), c["!protect"] && (n[n.length] = kv(c["!protect"])), c["!autofilter"] != null && (n[n.length] = Cv(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (n[n.length] = pv(c["!merges"]));
    var x = -1,
        d, v = -1;
    return c["!links"].length > 0 && (n[n.length] = "<hyperlinks>", c["!links"].forEach(function(u) {
        u[1].Target && (d = {
            ref: u[0]
        }, u[1].Target.charAt(0) != "#" && (v = Re(a, -1, Ne(u[1].Target).replace(/#.*$/, ""), Fe.HLINK), d["r:id"] = "rId" + v), (x = u[1].Target.indexOf("#")) > -1 && (d.location = Ne(u[1].Target.slice(x + 1))), u[1].Tooltip && (d.tooltip = Ne(u[1].Tooltip)), n[n.length] = ae("hyperlink", null, d))
    }), n[n.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (n[n.length] = Sv(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (n[n.length] = lr("ignoredErrors", ae("ignoredError", null, {
        numberStoredAsText: 1,
        sqref: o
    }))), h.length > 0 && (v = Re(a, -1, "../drawings/drawing" + (e + 1) + ".xml", Fe.DRAW), n[n.length] = ae("drawing", null, {
        "r:id": "rId" + v
    }), c["!drawing"] = h), c["!comments"].length > 0 && (v = Re(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", Fe.VML), n[n.length] = ae("legacyDrawing", null, {
        "r:id": "rId" + v
    }), c["!legacy"] = v), n.length > 1 && (n[n.length] = "</worksheet>", n[1] = n[1].replace("/>", ">")), n.join("")
}

function Pv(e, t) {
    var r = {},
        a = e.l + t;
    r.r = e.read_shift(4), e.l += 4;
    var n = e.read_shift(2);
    e.l += 1;
    var i = e.read_shift(1);
    return e.l = a, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = n / 20), r
}

function Lv(e, t, r) {
    var a = X(145),
        n = (r["!rows"] || [])[e] || {};
    a.write_shift(4, e), a.write_shift(4, 0);
    var i = 320;
    n.hpx ? i = Pa(n.hpx) * 20 : n.hpt && (i = n.hpt * 20), a.write_shift(2, i), a.write_shift(1, 0);
    var s = 0;
    n.level && (s |= n.level), n.hidden && (s |= 16), (n.hpx || n.hpt) && (s |= 32), a.write_shift(1, s), a.write_shift(1, 0);
    var f = 0,
        c = a.l;
    a.l += 4;
    for (var o = {
            r: e,
            c: 0
        }, l = 0; l < 16; ++l)
        if (!(t.s.c > l + 1 << 10 || t.e.c < l << 10)) {
            for (var h = -1, x = -1, d = l << 10; d < l + 1 << 10; ++d) {
                o.c = d;
                var v = Array.isArray(r) ? (r[o.r] || [])[o.c] : r[pe(o)];
                v && (h < 0 && (h = d), x = d)
            }
            h < 0 || (++f, a.write_shift(4, h), a.write_shift(4, x))
        } var u = a.l;
    return a.l = c, a.write_shift(4, f), a.l = u, a.length > a.l ? a.slice(0, a.l) : a
}

function Bv(e, t, r, a) {
    var n = Lv(a, r, t);
    (n.length > 17 || (t["!rows"] || [])[a]) && Y(e, 0, n)
}
var Mv = zt,
    Uv = ca;

function Wv() {}

function Hv(e, t) {
    var r = {},
        a = e[e.l];
    return ++e.l, r.above = !(a & 64), r.left = !(a & 128), e.l += 18, r.name = Xo(e), r
}

function Vv(e, t, r) {
    r == null && (r = X(84 + 4 * e.length));
    var a = 192;
    t && (t.above && (a &= -65), t.left && (a &= -129)), r.write_shift(1, a);
    for (var n = 1; n < 3; ++n) r.write_shift(1, 0);
    return u0({
        auto: 1
    }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Ms(e, r), r.slice(0, r.l)
}

function Gv(e) {
    var t = Gr(e);
    return [t]
}

function Xv(e, t, r) {
    return r == null && (r = X(8)), Vt(t, r)
}

function zv(e) {
    var t = Gt(e);
    return [t]
}

function $v(e, t, r) {
    return r == null && (r = X(4)), Xt(t, r)
}

function Kv(e) {
    var t = Gr(e),
        r = e.read_shift(1);
    return [t, r, "b"]
}

function jv(e, t, r) {
    return r == null && (r = X(9)), Vt(t, r), r.write_shift(1, e.v ? 1 : 0), r
}

function Yv(e) {
    var t = Gt(e),
        r = e.read_shift(1);
    return [t, r, "b"]
}

function Jv(e, t, r) {
    return r == null && (r = X(5)), Xt(t, r), r.write_shift(1, e.v ? 1 : 0), r
}

function Zv(e) {
    var t = Gr(e),
        r = e.read_shift(1);
    return [t, r, "e"]
}

function qv(e, t, r) {
    return r == null && (r = X(9)), Vt(t, r), r.write_shift(1, e.v), r
}

function Qv(e) {
    var t = Gt(e),
        r = e.read_shift(1);
    return [t, r, "e"]
}

function e2(e, t, r) {
    return r == null && (r = X(8)), Xt(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r
}

function r2(e) {
    var t = Gr(e),
        r = e.read_shift(4);
    return [t, r, "s"]
}

function t2(e, t, r) {
    return r == null && (r = X(12)), Vt(t, r), r.write_shift(4, t.v), r
}

function a2(e) {
    var t = Gt(e),
        r = e.read_shift(4);
    return [t, r, "s"]
}

function n2(e, t, r) {
    return r == null && (r = X(8)), Xt(t, r), r.write_shift(4, t.v), r
}

function i2(e) {
    var t = Gr(e),
        r = pr(e);
    return [t, r, "n"]
}

function s2(e, t, r) {
    return r == null && (r = X(16)), Vt(t, r), Bt(e.v, r), r
}

function Xf(e) {
    var t = Gt(e),
        r = pr(e);
    return [t, r, "n"]
}

function f2(e, t, r) {
    return r == null && (r = X(12)), Xt(t, r), Bt(e.v, r), r
}

function c2(e) {
    var t = Gr(e),
        r = wn(e);
    return [t, r, "n"]
}

function o2(e, t, r) {
    return r == null && (r = X(12)), Vt(t, r), Us(e.v, r), r
}

function l2(e) {
    var t = Gt(e),
        r = wn(e);
    return [t, r, "n"]
}

function h2(e, t, r) {
    return r == null && (r = X(8)), Xt(t, r), Us(e.v, r), r
}

function u2(e) {
    var t = Gr(e),
        r = mn(e);
    return [t, r, "is"]
}

function x2(e) {
    var t = Gr(e),
        r = mr(e);
    return [t, r, "str"]
}

function d2(e, t, r) {
    return r == null && (r = X(12 + 4 * e.v.length)), Vt(t, r), fr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r
}

function v2(e) {
    var t = Gt(e),
        r = mr(e);
    return [t, r, "str"]
}

function p2(e, t, r) {
    return r == null && (r = X(8 + 4 * e.v.length)), Xt(t, r), fr(e.v, r), r.length > r.l ? r.slice(0, r.l) : r
}

function m2(e, t, r) {
    var a = e.l + t,
        n = Gr(e);
    n.r = r["!row"];
    var i = e.read_shift(1),
        s = [n, i, "b"];
    if (r.cellFormula) {
        e.l += 2;
        var f = F0(e, a - e.l, r);
        s[3] = dr(f, null, n, r.supbooks, r)
    } else e.l = a;
    return s
}

function g2(e, t, r) {
    var a = e.l + t,
        n = Gr(e);
    n.r = r["!row"];
    var i = e.read_shift(1),
        s = [n, i, "e"];
    if (r.cellFormula) {
        e.l += 2;
        var f = F0(e, a - e.l, r);
        s[3] = dr(f, null, n, r.supbooks, r)
    } else e.l = a;
    return s
}

function _2(e, t, r) {
    var a = e.l + t,
        n = Gr(e);
    n.r = r["!row"];
    var i = pr(e),
        s = [n, i, "n"];
    if (r.cellFormula) {
        e.l += 2;
        var f = F0(e, a - e.l, r);
        s[3] = dr(f, null, n, r.supbooks, r)
    } else e.l = a;
    return s
}

function w2(e, t, r) {
    var a = e.l + t,
        n = Gr(e);
    n.r = r["!row"];
    var i = mr(e),
        s = [n, i, "str"];
    if (r.cellFormula) {
        e.l += 2;
        var f = F0(e, a - e.l, r);
        s[3] = dr(f, null, n, r.supbooks, r)
    } else e.l = a;
    return s
}
var k2 = zt,
    E2 = ca;

function T2(e, t) {
    return t == null && (t = X(4)), t.write_shift(4, e), t
}

function S2(e, t) {
    var r = e.l + t,
        a = zt(e),
        n = gn(e),
        i = mr(e),
        s = mr(e),
        f = mr(e);
    e.l = r;
    var c = {
        rfx: a,
        relId: n,
        loc: i,
        display: f
    };
    return s && (c.Tooltip = s), c
}

function F2(e, t) {
    var r = X(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
    ca({
        s: Xe(e[0]),
        e: Xe(e[0])
    }, r), _n("rId" + t, r);
    var a = e[1].Target.indexOf("#"),
        n = a == -1 ? "" : e[1].Target.slice(a + 1);
    return fr(n || "", r), fr(e[1].Tooltip || "", r), fr("", r), r.slice(0, r.l)
}

function A2() {}

function y2(e, t, r) {
    var a = e.l + t,
        n = Ws(e),
        i = e.read_shift(1),
        s = [n];
    if (s[2] = i, r.cellFormula) {
        var f = Zd(e, a - e.l, r);
        s[1] = f
    } else e.l = a;
    return s
}

function C2(e, t, r) {
    var a = e.l + t,
        n = zt(e),
        i = [n];
    if (r.cellFormula) {
        var s = Qd(e, a - e.l, r);
        i[1] = s, e.l = a
    } else e.l = a;
    return i
}

function D2(e, t, r) {
    r == null && (r = X(18));
    var a = A0(e, t);
    r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (a.width || 10) * 256), r.write_shift(4, 0);
    var n = 0;
    return t.hidden && (n |= 1), typeof a.width == "number" && (n |= 2), t.level && (n |= t.level << 8), r.write_shift(2, n), r
}
var zf = ["left", "right", "top", "bottom", "header", "footer"];

function O2(e) {
    var t = {};
    return zf.forEach(function(r) {
        t[r] = pr(e)
    }), t
}

function I2(e, t) {
    return t == null && (t = X(6 * 8)), bt(e), zf.forEach(function(r) {
        Bt(e[r], t)
    }), t
}

function R2(e) {
    var t = e.read_shift(2);
    return e.l += 28, {
        RTL: t & 32
    }
}

function N2(e, t, r) {
    r == null && (r = X(30));
    var a = 924;
    return (((t || {}).Views || [])[0] || {}).RTL && (a |= 32), r.write_shift(2, a), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r
}

function b2(e) {
    var t = X(24);
    return t.write_shift(4, 4), t.write_shift(4, 1), ca(e, t), t
}

function P2(e, t) {
    return t == null && (t = X(16 * 4 + 2)), t.write_shift(2, e.password ? An(e.password) : 0), t.write_shift(4, 1), [
        ["objects", !1],
        ["scenarios", !1],
        ["formatCells", !0],
        ["formatColumns", !0],
        ["formatRows", !0],
        ["insertColumns", !0],
        ["insertRows", !0],
        ["insertHyperlinks", !0],
        ["deleteColumns", !0],
        ["deleteRows", !0],
        ["selectLockedCells", !1],
        ["sort", !0],
        ["autoFilter", !0],
        ["pivotTables", !0],
        ["selectUnlockedCells", !1]
    ].forEach(function(r) {
        r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1)
    }), t
}

function L2() {}

function B2() {}

function M2(e, t, r, a, n, i, s) {
    if (!e) return e;
    var f = t || {};
    a || (a = {
        "!id": {}
    });
    var c = f.dense ? [] : {},
        o, l = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        },
        h = !1,
        x = !1,
        d, v, u, p, k, A, g, O, b, N = [];
    f.biff = 12, f["!row"] = 0;
    var F = 0,
        B = !1,
        I = [],
        z = {},
        G = f.supbooks || n.supbooks || [
            []
        ];
    if (G.sharedf = z, G.arrayf = I, G.SheetNames = n.SheetNames || n.Sheets.map(function(be) {
            return be.name
        }), !f.supbooks && (f.supbooks = G, n.Names))
        for (var L = 0; L < n.Names.length; ++L) G[0][L + 1] = n.Names[L];
    var J = [],
        le = [],
        ie = !1;
    La[16] = {
        n: "BrtShortReal",
        f: Xf
    };
    var ue;
    if (ut(e, function(V, de, ge) {
            if (!x) switch (ge) {
                case 148:
                    o = V;
                    break;
                case 0:
                    d = V, f.sheetRows && f.sheetRows <= d.r && (x = !0), O = Ze(p = d.r), f["!row"] = d.r, (V.hidden || V.hpt || V.level != null) && (V.hpt && (V.hpx = na(V.hpt)), le[V.r] = V);
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 62:
                    switch (v = {
                            t: V[2]
                        }, V[2]) {
                        case "n":
                            v.v = V[1];
                            break;
                        case "s":
                            g = Ea[V[1]], v.v = g.t, v.r = g.r;
                            break;
                        case "b":
                            v.v = !!V[1];
                            break;
                        case "e":
                            v.v = V[1], f.cellText !== !1 && (v.w = xt[v.v]);
                            break;
                        case "str":
                            v.t = "s", v.v = V[1];
                            break;
                        case "is":
                            v.t = "s", v.v = V[1].t;
                            break
                    }
                    if ((u = s.CellXf[V[0].iStyleRef]) && Hf(v, u.numFmtId, null, f, i, s), k = V[0].c == -1 ? k + 1 : V[0].c, f.dense ? (c[p] || (c[p] = []), c[p][k] = v) : c[Ge(k) + O] = v, f.cellFormula) {
                        for (B = !1, F = 0; F < I.length; ++F) {
                            var C = I[F];
                            d.r >= C[0].s.r && d.r <= C[0].e.r && k >= C[0].s.c && k <= C[0].e.c && (v.F = we(C[0]), B = !0)
                        }!B && V.length > 3 && (v.f = V[3])
                    }
                    if (l.s.r > d.r && (l.s.r = d.r), l.s.c > k && (l.s.c = k), l.e.r < d.r && (l.e.r = d.r), l.e.c < k && (l.e.c = k), f.cellDates && u && v.t == "n" && ia(ve[u.numFmtId])) {
                        var P = Ot(v.v);
                        P && (v.t = "d", v.v = new Date(P.y, P.m - 1, P.d, P.H, P.M, P.S, P.u))
                    }
                    ue && (ue.type == "XLDAPR" && (v.D = !0), ue = void 0);
                    break;
                case 1:
                case 12:
                    if (!f.sheetStubs || h) break;
                    v = {
                        t: "z",
                        v: void 0
                    }, k = V[0].c == -1 ? k + 1 : V[0].c, f.dense ? (c[p] || (c[p] = []), c[p][k] = v) : c[Ge(k) + O] = v, l.s.r > d.r && (l.s.r = d.r), l.s.c > k && (l.s.c = k), l.e.r < d.r && (l.e.r = d.r), l.e.c < k && (l.e.c = k), ue && (ue.type == "XLDAPR" && (v.D = !0), ue = void 0);
                    break;
                case 176:
                    N.push(V);
                    break;
                case 49:
                    ue = ((f.xlmeta || {}).Cell || [])[V - 1];
                    break;
                case 494:
                    var D = a["!id"][V.relId];
                    for (D ? (V.Target = D.Target, V.loc && (V.Target += "#" + V.loc), V.Rel = D) : V.relId == "" && (V.Target = "#" + V.loc), p = V.rfx.s.r; p <= V.rfx.e.r; ++p)
                        for (k = V.rfx.s.c; k <= V.rfx.e.c; ++k) f.dense ? (c[p] || (c[p] = []), c[p][k] || (c[p][k] = {
                            t: "z",
                            v: void 0
                        }), c[p][k].l = V) : (A = pe({
                            c: k,
                            r: p
                        }), c[A] || (c[A] = {
                            t: "z",
                            v: void 0
                        }), c[A].l = V);
                    break;
                case 426:
                    if (!f.cellFormula) break;
                    I.push(V), b = f.dense ? c[p][k] : c[Ge(k) + O], b.f = dr(V[1], l, {
                        r: d.r,
                        c: k
                    }, G, f), b.F = we(V[0]);
                    break;
                case 427:
                    if (!f.cellFormula) break;
                    z[pe(V[0].s)] = V[1], b = f.dense ? c[p][k] : c[Ge(k) + O], b.f = dr(V[1], l, {
                        r: d.r,
                        c: k
                    }, G, f);
                    break;
                case 60:
                    if (!f.cellStyles) break;
                    for (; V.e >= V.s;) J[V.e--] = {
                        width: V.w / 256,
                        hidden: !!(V.flags & 1),
                        level: V.level
                    }, ie || (ie = !0, yn(V.w / 256)), kt(J[V.e + 1]);
                    break;
                case 161:
                    c["!autofilter"] = {
                        ref: we(V)
                    };
                    break;
                case 476:
                    c["!margins"] = V;
                    break;
                case 147:
                    n.Sheets[r] || (n.Sheets[r] = {}), V.name && (n.Sheets[r].CodeName = V.name), (V.above || V.left) && (c["!outline"] = {
                        above: V.above,
                        left: V.left
                    });
                    break;
                case 137:
                    n.Views || (n.Views = [{}]), n.Views[0] || (n.Views[0] = {}), V.RTL && (n.Views[0].RTL = !0);
                    break;
                case 485:
                    break;
                case 64:
                case 1053:
                    break;
                case 151:
                    break;
                case 152:
                case 175:
                case 644:
                case 625:
                case 562:
                case 396:
                case 1112:
                case 1146:
                case 471:
                case 1050:
                case 649:
                case 1105:
                case 589:
                case 607:
                case 564:
                case 1055:
                case 168:
                case 174:
                case 1180:
                case 499:
                case 507:
                case 550:
                case 171:
                case 167:
                case 1177:
                case 169:
                case 1181:
                case 551:
                case 552:
                case 661:
                case 639:
                case 478:
                case 537:
                case 477:
                case 536:
                case 1103:
                case 680:
                case 1104:
                case 1024:
                case 663:
                case 535:
                case 678:
                case 504:
                case 1043:
                case 428:
                case 170:
                case 3072:
                case 50:
                case 2070:
                case 1045:
                    break;
                case 35:
                    h = !0;
                    break;
                case 36:
                    h = !1;
                    break;
                case 37:
                    h = !0;
                    break;
                case 38:
                    h = !1;
                    break;
                default:
                    if (!de.T) {
                        if (!h || f.WTF) throw new Error("Unexpected record 0x" + ge.toString(16))
                    }
            }
        }, f), delete f.supbooks, delete f["!row"], !c["!ref"] && (l.s.r < 2e6 || o && (o.e.r > 0 || o.e.c > 0 || o.s.r > 0 || o.s.c > 0)) && (c["!ref"] = we(o || l)), f.sheetRows && c["!ref"]) {
        var ce = De(c["!ref"]);
        f.sheetRows <= +ce.e.r && (ce.e.r = f.sheetRows - 1, ce.e.r > l.e.r && (ce.e.r = l.e.r), ce.e.r < ce.s.r && (ce.s.r = ce.e.r), ce.e.c > l.e.c && (ce.e.c = l.e.c), ce.e.c < ce.s.c && (ce.s.c = ce.e.c), c["!fullref"] = c["!ref"], c["!ref"] = we(ce))
    }
    return N.length > 0 && (c["!merges"] = N), J.length > 0 && (c["!cols"] = J), le.length > 0 && (c["!rows"] = le), c
}

function U2(e, t, r, a, n, i, s) {
    if (t.v === void 0) return !1;
    var f = "";
    switch (t.t) {
        case "b":
            f = t.v ? "1" : "0";
            break;
        case "d":
            t = We(t), t.z = t.z || ve[14], t.v = nr(Ue(t.v)), t.t = "n";
            break;
        case "n":
        case "e":
            f = "" + t.v;
            break;
        default:
            f = t.v;
            break
    }
    var c = {
        r,
        c: a
    };
    switch (c.s = At(n.cellXfs, t, n), t.l && i["!links"].push([pe(c), t.l]), t.c && i["!comments"].push([pe(c), t.c]), t.t) {
        case "s":
        case "str":
            return n.bookSST ? (f = Rn(n.Strings, t.v, n.revStrings), c.t = "s", c.v = f, s ? Y(e, 18, n2(t, c)) : Y(e, 7, t2(t, c))) : (c.t = "str", s ? Y(e, 17, p2(t, c)) : Y(e, 6, d2(t, c))), !0;
        case "n":
            return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? Y(e, 13, h2(t, c)) : Y(e, 2, o2(t, c)) : s ? Y(e, 16, f2(t, c)) : Y(e, 5, s2(t, c)), !0;
        case "b":
            return c.t = "b", s ? Y(e, 15, Jv(t, c)) : Y(e, 4, jv(t, c)), !0;
        case "e":
            return c.t = "e", s ? Y(e, 14, e2(t, c)) : Y(e, 3, qv(t, c)), !0
    }
    return s ? Y(e, 12, $v(t, c)) : Y(e, 1, Xv(t, c)), !0
}

function W2(e, t, r, a) {
    var n = De(t["!ref"] || "A1"),
        i, s = "",
        f = [];
    Y(e, 145);
    var c = Array.isArray(t),
        o = n.e.r;
    t["!rows"] && (o = Math.max(n.e.r, t["!rows"].length - 1));
    for (var l = n.s.r; l <= o; ++l) {
        s = Ze(l), Bv(e, t, n, l);
        var h = !1;
        if (l <= n.e.r)
            for (var x = n.s.c; x <= n.e.c; ++x) {
                l === n.s.r && (f[x] = Ge(x)), i = f[x] + s;
                var d = c ? (t[l] || [])[x] : t[i];
                if (!d) {
                    h = !1;
                    continue
                }
                h = U2(e, d, l, x, a, t, h)
            }
    }
    Y(e, 146)
}

function H2(e, t) {
    !t || !t["!merges"] || (Y(e, 177, T2(t["!merges"].length)), t["!merges"].forEach(function(r) {
        Y(e, 176, E2(r))
    }), Y(e, 178))
}

function V2(e, t) {
    !t || !t["!cols"] || (Y(e, 390), t["!cols"].forEach(function(r, a) {
        r && Y(e, 60, D2(a, r))
    }), Y(e, 391))
}

function G2(e, t) {
    !t || !t["!ref"] || (Y(e, 648), Y(e, 649, b2(De(t["!ref"]))), Y(e, 650))
}

function X2(e, t, r) {
    t["!links"].forEach(function(a) {
        if (a[1].Target) {
            var n = Re(r, -1, a[1].Target.replace(/#.*$/, ""), Fe.HLINK);
            Y(e, 494, F2(a, n))
        }
    }), delete t["!links"]
}

function z2(e, t, r, a) {
    if (t["!comments"].length > 0) {
        var n = Re(a, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", Fe.VML);
        Y(e, 551, _n("rId" + n)), t["!legacy"] = n
    }
}

function $2(e, t, r, a) {
    if (t["!autofilter"]) {
        var n = t["!autofilter"],
            i = typeof n.ref == "string" ? n.ref : we(n.ref);
        r.Workbook || (r.Workbook = {
            Sheets: []
        }), r.Workbook.Names || (r.Workbook.Names = []);
        var s = r.Workbook.Names,
            f = Ar(i);
        f.s.r == f.e.r && (f.e.r = Ar(t["!ref"]).e.r, i = we(f));
        for (var c = 0; c < s.length; ++c) {
            var o = s[c];
            if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == a) {
                o.Ref = "'" + r.SheetNames[a] + "'!" + i;
                break
            }
        }
        c == s.length && s.push({
            Name: "_xlnm._FilterDatabase",
            Sheet: a,
            Ref: "'" + r.SheetNames[a] + "'!" + i
        }), Y(e, 161, ca(De(i))), Y(e, 162)
    }
}

function K2(e, t, r) {
    Y(e, 133), Y(e, 137, N2(t, r)), Y(e, 138), Y(e, 134)
}

function j2(e, t) {
    t["!protect"] && Y(e, 535, P2(t["!protect"]))
}

function Y2(e, t, r, a) {
    var n = Fr(),
        i = r.SheetNames[e],
        s = r.Sheets[i] || {},
        f = i;
    try {
        r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f)
    } catch {}
    var c = De(s["!ref"] || "A1");
    if (c.e.c > 16383 || c.e.r > 1048575) {
        if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
        c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575)
    }
    return s["!links"] = [], s["!comments"] = [], Y(n, 129), (r.vbaraw || s["!outline"]) && Y(n, 147, Vv(f, s["!outline"])), Y(n, 148, Uv(c)), K2(n, s, r.Workbook), V2(n, s), W2(n, s, e, t), j2(n, s), $2(n, s, r, e), H2(n, s), X2(n, s, a), s["!margins"] && Y(n, 476, I2(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && G2(n, s), z2(n, s, e, a), Y(n, 130), n.end()
}

function J2(e) {
    var t = [],
        r = e.match(/^<c:numCache>/),
        a;
    (e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/mg) || []).forEach(function(i) {
        var s = i.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
        s && (t[+s[1]] = r ? +s[2] : s[2])
    });
    var n = Ce((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
    return (e.match(/<c:f>(.*?)<\/c:f>/mg) || []).forEach(function(i) {
        a = i.replace(/<.*?>/g, "")
    }), [t, n, a]
}

function Z2(e, t, r, a, n, i) {
    var s = i || {
        "!type": "chart"
    };
    if (!e) return i;
    var f = 0,
        c = 0,
        o = "A",
        l = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        };
    return (e.match(/<c:numCache>[\s\S]*?<\/c:numCache>/gm) || []).forEach(function(h) {
        var x = J2(h);
        l.s.r = l.s.c = 0, l.e.c = f, o = Ge(f), x[0].forEach(function(d, v) {
            s[o + Ze(v)] = {
                t: "n",
                v: d,
                z: x[1]
            }, c = v
        }), l.e.r < c && (l.e.r = c), ++f
    }), f > 0 && (s["!ref"] = we(l)), s
}

function q2(e, t, r, a, n) {
    if (!e) return e;
    a || (a = {
        "!id": {}
    });
    var i = {
            "!type": "chart",
            "!drawel": null,
            "!rel": ""
        },
        s, f = e.match(Vf);
    return f && Nn(f[0], i, n, r), (s = e.match(/drawing r:id="(.*?)"/)) && (i["!rel"] = s[1]), a["!id"][i["!rel"]] && (i["!drawel"] = a["!id"][i["!rel"]]), i
}

function Q2(e, t) {
    e.l += 10;
    var r = mr(e);
    return {
        name: r
    }
}

function ep(e, t, r, a, n) {
    if (!e) return e;
    a || (a = {
        "!id": {}
    });
    var i = {
            "!type": "chart",
            "!drawel": null,
            "!rel": ""
        },
        s = !1;
    return ut(e, function(c, o, l) {
        switch (l) {
            case 550:
                i["!rel"] = c;
                break;
            case 651:
                n.Sheets[r] || (n.Sheets[r] = {}), c.name && (n.Sheets[r].CodeName = c.name);
                break;
            case 562:
            case 652:
            case 669:
            case 679:
            case 551:
            case 552:
            case 476:
            case 3072:
                break;
            case 35:
                s = !0;
                break;
            case 36:
                s = !1;
                break;
            case 37:
                break;
            case 38:
                break;
            default:
                if (!(o.T > 0)) {
                    if (!(o.T < 0)) {
                        if (!s || t.WTF) throw new Error("Unexpected record 0x" + l.toString(16))
                    }
                }
        }
    }, t), a["!id"][i["!rel"]] && (i["!drawel"] = a["!id"][i["!rel"]]), i
}
var bn = [
        ["allowRefreshQuery", !1, "bool"],
        ["autoCompressPictures", !0, "bool"],
        ["backupFile", !1, "bool"],
        ["checkCompatibility", !1, "bool"],
        ["CodeName", ""],
        ["date1904", !1, "bool"],
        ["defaultThemeVersion", 0, "int"],
        ["filterPrivacy", !1, "bool"],
        ["hidePivotFieldList", !1, "bool"],
        ["promptedSolutions", !1, "bool"],
        ["publishItems", !1, "bool"],
        ["refreshAllConnections", !1, "bool"],
        ["saveExternalLinkValues", !0, "bool"],
        ["showBorderUnselectedTables", !0, "bool"],
        ["showInkAnnotation", !0, "bool"],
        ["showObjects", "all"],
        ["showPivotChartFilter", !1, "bool"],
        ["updateLinks", "userSet"]
    ],
    rp = [
        ["activeTab", 0, "int"],
        ["autoFilterDateGrouping", !0, "bool"],
        ["firstSheet", 0, "int"],
        ["minimized", !1, "bool"],
        ["showHorizontalScroll", !0, "bool"],
        ["showSheetTabs", !0, "bool"],
        ["showVerticalScroll", !0, "bool"],
        ["tabRatio", 600, "int"],
        ["visibility", "visible"]
    ],
    tp = [],
    ap = [
        ["calcCompleted", "true"],
        ["calcMode", "auto"],
        ["calcOnSave", "true"],
        ["concurrentCalc", "true"],
        ["fullCalcOnLoad", "false"],
        ["fullPrecision", "true"],
        ["iterate", "false"],
        ["iterateCount", "100"],
        ["iterateDelta", "0.001"],
        ["refMode", "A1"]
    ];

function Xi(e, t) {
    for (var r = 0; r != e.length; ++r)
        for (var a = e[r], n = 0; n != t.length; ++n) {
            var i = t[n];
            if (a[i[0]] == null) a[i[0]] = i[1];
            else switch (i[2]) {
                case "bool":
                    typeof a[i[0]] == "string" && (a[i[0]] = Me(a[i[0]]));
                    break;
                case "int":
                    typeof a[i[0]] == "string" && (a[i[0]] = parseInt(a[i[0]], 10));
                    break
            }
        }
}

function zi(e, t) {
    for (var r = 0; r != t.length; ++r) {
        var a = t[r];
        if (e[a[0]] == null) e[a[0]] = a[1];
        else switch (a[2]) {
            case "bool":
                typeof e[a[0]] == "string" && (e[a[0]] = Me(e[a[0]]));
                break;
            case "int":
                typeof e[a[0]] == "string" && (e[a[0]] = parseInt(e[a[0]], 10));
                break
        }
    }
}

function $f(e) {
    zi(e.WBProps, bn), zi(e.CalcPr, ap), Xi(e.WBView, rp), Xi(e.Sheets, tp), ra.date1904 = Me(e.WBProps.date1904)
}

function np(e) {
    return !e.Workbook || !e.Workbook.WBProps ? "false" : Me(e.Workbook.WBProps.date1904) ? "true" : "false"
}
var ip = "][*?/\\".split("");

function Kf(e, t) {
    if (e.length > 31) throw new Error("Sheet names cannot exceed 31 chars");
    var r = !0;
    return ip.forEach(function(a) {
        if (e.indexOf(a) != -1) throw new Error("Sheet name cannot contain : \\ / ? * [ ]")
    }), r
}

function sp(e, t, r) {
    e.forEach(function(a, n) {
        Kf(a);
        for (var i = 0; i < n; ++i)
            if (a == e[i]) throw new Error("Duplicate Sheet Name: " + a);
        if (r) {
            var s = t && t[n] && t[n].CodeName || a;
            if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s)
        }
    })
}

function fp(e) {
    if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
    if (!e.SheetNames.length) throw new Error("Workbook is empty");
    var t = e.Workbook && e.Workbook.Sheets || [];
    sp(e.SheetNames, t, !!e.vbaraw);
    for (var r = 0; r < e.SheetNames.length; ++r) nv(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r)
}
var cp = /<\w+:workbook/;

function op(e, t) {
    if (!e) throw new Error("Could not find file");
    var r = {
            AppVersion: {},
            WBProps: {},
            WBView: [],
            Sheets: [],
            CalcPr: {},
            Names: [],
            xmlns: ""
        },
        a = !1,
        n = "xmlns",
        i = {},
        s = 0;
    if (e.replace(_r, function(c, o) {
            var l = me(c);
            switch (rt(l[0])) {
                case "<?xml":
                    break;
                case "<workbook":
                    c.match(cp) && (n = "xmlns" + c.match(/<(\w+):/)[1]), r.xmlns = l[n];
                    break;
                case "</workbook>":
                    break;
                case "<fileVersion":
                    delete l[0], r.AppVersion = l;
                    break;
                case "<fileVersion/>":
                case "</fileVersion>":
                    break;
                case "<fileSharing":
                    break;
                case "<fileSharing/>":
                    break;
                case "<workbookPr":
                case "<workbookPr/>":
                    bn.forEach(function(h) {
                        if (l[h[0]] != null) switch (h[2]) {
                            case "bool":
                                r.WBProps[h[0]] = Me(l[h[0]]);
                                break;
                            case "int":
                                r.WBProps[h[0]] = parseInt(l[h[0]], 10);
                                break;
                            default:
                                r.WBProps[h[0]] = l[h[0]]
                        }
                    }), l.codeName && (r.WBProps.CodeName = Pe(l.codeName));
                    break;
                case "</workbookPr>":
                    break;
                case "<workbookProtection":
                    break;
                case "<workbookProtection/>":
                    break;
                case "<bookViews":
                case "<bookViews>":
                case "</bookViews>":
                    break;
                case "<workbookView":
                case "<workbookView/>":
                    delete l[0], r.WBView.push(l);
                    break;
                case "</workbookView>":
                    break;
                case "<sheets":
                case "<sheets>":
                case "</sheets>":
                    break;
                case "<sheet":
                    switch (l.state) {
                        case "hidden":
                            l.Hidden = 1;
                            break;
                        case "veryHidden":
                            l.Hidden = 2;
                            break;
                        default:
                            l.Hidden = 0
                    }
                    delete l.state, l.name = Ce(Pe(l.name)), delete l[0], r.Sheets.push(l);
                    break;
                case "</sheet>":
                    break;
                case "<functionGroups":
                case "<functionGroups/>":
                    break;
                case "<functionGroup":
                    break;
                case "<externalReferences":
                case "</externalReferences>":
                case "<externalReferences>":
                    break;
                case "<externalReference":
                    break;
                case "<definedNames/>":
                    break;
                case "<definedNames>":
                case "<definedNames":
                    a = !0;
                    break;
                case "</definedNames>":
                    a = !1;
                    break;
                case "<definedName":
                    i = {}, i.Name = Pe(l.name), l.comment && (i.Comment = l.comment), l.localSheetId && (i.Sheet = +l.localSheetId), Me(l.hidden || "0") && (i.Hidden = !0), s = o + c.length;
                    break;
                case "</definedName>":
                    i.Ref = Ce(Pe(e.slice(s, o))), r.Names.push(i);
                    break;
                case "<definedName/>":
                    break;
                case "<calcPr":
                    delete l[0], r.CalcPr = l;
                    break;
                case "<calcPr/>":
                    delete l[0], r.CalcPr = l;
                    break;
                case "</calcPr>":
                    break;
                case "<oleSize":
                    break;
                case "<customWorkbookViews>":
                case "</customWorkbookViews>":
                case "<customWorkbookViews":
                    break;
                case "<customWorkbookView":
                case "</customWorkbookView>":
                    break;
                case "<pivotCaches>":
                case "</pivotCaches>":
                case "<pivotCaches":
                    break;
                case "<pivotCache":
                    break;
                case "<smartTagPr":
                case "<smartTagPr/>":
                    break;
                case "<smartTagTypes":
                case "<smartTagTypes>":
                case "</smartTagTypes>":
                    break;
                case "<smartTagType":
                    break;
                case "<webPublishing":
                case "<webPublishing/>":
                    break;
                case "<fileRecoveryPr":
                case "<fileRecoveryPr/>":
                    break;
                case "<webPublishObjects>":
                case "<webPublishObjects":
                case "</webPublishObjects>":
                    break;
                case "<webPublishObject":
                    break;
                case "<extLst":
                case "<extLst>":
                case "</extLst>":
                case "<extLst/>":
                    break;
                case "<ext":
                    a = !0;
                    break;
                case "</ext>":
                    a = !1;
                    break;
                case "<ArchID":
                    break;
                case "<AlternateContent":
                case "<AlternateContent>":
                    a = !0;
                    break;
                case "</AlternateContent>":
                    a = !1;
                    break;
                case "<revisionPtr":
                    break;
                default:
                    if (!a && t.WTF) throw new Error("unrecognized " + l[0] + " in workbook")
            }
            return c
        }), Ht.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
    return $f(r), r
}

function jf(e) {
    var t = [qe];
    t[t.length] = ae("workbook", null, {
        xmlns: Ht[0],
        "xmlns:r": ar.r
    });
    var r = e.Workbook && (e.Workbook.Names || []).length > 0,
        a = {
            codeName: "ThisWorkbook"
        };
    e.Workbook && e.Workbook.WBProps && (bn.forEach(function(f) {
        e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (a[f[0]] = e.Workbook.WBProps[f[0]])
    }), e.Workbook.WBProps.CodeName && (a.codeName = e.Workbook.WBProps.CodeName, delete a.CodeName)), t[t.length] = ae("workbookPr", null, a);
    var n = e.Workbook && e.Workbook.Sheets || [],
        i = 0;
    if (n && n[0] && n[0].Hidden) {
        for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!n[i] || !n[i].Hidden); ++i);
        i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>"
    }
    for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
        var s = {
            name: Ne(e.SheetNames[i].slice(0, 31))
        };
        if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), n[i]) switch (n[i].Hidden) {
            case 1:
                s.state = "hidden";
                break;
            case 2:
                s.state = "veryHidden";
                break
        }
        t[t.length] = ae("sheet", null, s)
    }
    return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
        var c = {
            name: f.Name
        };
        f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = ae("definedName", Ne(f.Ref), c))
    }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("")
}

function lp(e, t) {
    var r = {};
    return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = X0(e), r.name = mr(e), r
}

function hp(e, t) {
    return t || (t = X(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), _n(e.strRelID, t), fr(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t
}

function up(e, t) {
    var r = {},
        a = e.read_shift(4);
    r.defaultThemeVersion = e.read_shift(4);
    var n = t > 8 ? mr(e) : "";
    return n.length > 0 && (r.CodeName = n), r.autoCompressPictures = !!(a & 65536), r.backupFile = !!(a & 64), r.checkCompatibility = !!(a & 4096), r.date1904 = !!(a & 1), r.filterPrivacy = !!(a & 8), r.hidePivotFieldList = !!(a & 1024), r.promptedSolutions = !!(a & 16), r.publishItems = !!(a & 2048), r.refreshAllConnections = !!(a & 262144), r.saveExternalLinkValues = !!(a & 128), r.showBorderUnselectedTables = !!(a & 4), r.showInkAnnotation = !!(a & 32), r.showObjects = ["all", "placeholders", "none"][a >> 13 & 3], r.showPivotChartFilter = !!(a & 32768), r.updateLinks = ["userSet", "never", "always"][a >> 8 & 3], r
}

function xp(e, t) {
    t || (t = X(72));
    var r = 0;
    return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Ms(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l)
}

function dp(e, t) {
    var r = {};
    return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r
}

function vp(e, t, r) {
    var a = e.l + t;
    e.l += 4, e.l += 1;
    var n = e.read_shift(4),
        i = zo(e),
        s = qd(e, 0, r),
        f = gn(e);
    e.l = a;
    var c = {
        Name: i,
        Ptg: s
    };
    return n < 268435455 && (c.Sheet = n), f && (c.Comment = f), c
}

function pp(e, t) {
    var r = {
            AppVersion: {},
            WBProps: {},
            WBView: [],
            Sheets: [],
            CalcPr: {},
            xmlns: ""
        },
        a = [],
        n = !1;
    t || (t = {}), t.biff = 12;
    var i = [],
        s = [
            []
        ];
    return s.SheetNames = [], s.XTI = [], La[16] = {
        n: "BrtFRTArchID$",
        f: dp
    }, ut(e, function(c, o, l) {
        switch (l) {
            case 156:
                s.SheetNames.push(c.name), r.Sheets.push(c);
                break;
            case 153:
                r.WBProps = c;
                break;
            case 39:
                c.Sheet != null && (t.SID = c.Sheet), c.Ref = dr(c.Ptg, null, null, s, t), delete t.SID, delete c.Ptg, i.push(c);
                break;
            case 1036:
                break;
            case 357:
            case 358:
            case 355:
            case 667:
                s[0].length ? s.push([l, c]) : s[0] = [l, c], s[s.length - 1].XTI = [];
                break;
            case 362:
                s.length === 0 && (s[0] = [], s[0].XTI = []), s[s.length - 1].XTI = s[s.length - 1].XTI.concat(c), s.XTI = s.XTI.concat(c);
                break;
            case 361:
                break;
            case 2071:
            case 158:
            case 143:
            case 664:
            case 353:
                break;
            case 3072:
            case 3073:
            case 534:
            case 677:
            case 157:
            case 610:
            case 2050:
            case 155:
            case 548:
            case 676:
            case 128:
            case 665:
            case 2128:
            case 2125:
            case 549:
            case 2053:
            case 596:
            case 2076:
            case 2075:
            case 2082:
            case 397:
            case 154:
            case 1117:
            case 553:
            case 2091:
                break;
            case 35:
                a.push(l), n = !0;
                break;
            case 36:
                a.pop(), n = !1;
                break;
            case 37:
                a.push(l), n = !0;
                break;
            case 38:
                a.pop(), n = !1;
                break;
            case 16:
                break;
            default:
                if (!o.T) {
                    if (!n || t.WTF && a[a.length - 1] != 37 && a[a.length - 1] != 35) throw new Error("Unexpected record 0x" + l.toString(16))
                }
        }
    }, t), $f(r), r.Names = i, r.supbooks = s, r
}

function mp(e, t) {
    Y(e, 143);
    for (var r = 0; r != t.SheetNames.length; ++r) {
        var a = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0,
            n = {
                Hidden: a,
                iTabID: r + 1,
                strRelID: "rId" + (r + 1),
                name: t.SheetNames[r]
            };
        Y(e, 156, hp(n))
    }
    Y(e, 144)
}

function gp(e, t) {
    t || (t = X(127));
    for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
    return fr("SheetJS", t), fr(i0.version, t), fr(i0.version, t), fr("7262", t), t.length > t.l ? t.slice(0, t.l) : t
}

function _p(e, t) {
    t || (t = X(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
    var r = 120;
    return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t
}

function wp(e, t) {
    if (!(!t.Workbook || !t.Workbook.Sheets)) {
        for (var r = t.Workbook.Sheets, a = 0, n = -1, i = -1; a < r.length; ++a) !r[a] || !r[a].Hidden && n == -1 ? n = a : r[a].Hidden == 1 && i == -1 && (i = a);
        i > n || (Y(e, 135), Y(e, 158, _p(n)), Y(e, 136))
    }
}

function kp(e, t) {
    var r = Fr();
    return Y(r, 131), Y(r, 128, gp()), Y(r, 153, xp(e.Workbook && e.Workbook.WBProps || null)), wp(r, e), mp(r, e), Y(r, 132), r.end()
}

function Ep(e, t, r) {
    return t.slice(-4) === ".bin" ? pp(e, r) : op(e, r)
}

function Tp(e, t, r, a, n, i, s, f) {
    return t.slice(-4) === ".bin" ? M2(e, a, r, n, i, s, f) : vv(e, a, r, n, i, s, f)
}

function Sp(e, t, r, a, n, i, s, f) {
    return t.slice(-4) === ".bin" ? ep(e, a, r, n, i) : q2(e, a, r, n, i)
}

function Fp(e, t, r, a, n, i, s, f) {
    return t.slice(-4) === ".bin" ? yx() : Cx()
}

function Ap(e, t, r, a, n, i, s, f) {
    return t.slice(-4) === ".bin" ? Fx() : Ax()
}

function yp(e, t, r, a) {
    return t.slice(-4) === ".bin" ? E1(e, r, a) : l1(e, r, a)
}

function Cp(e, t, r) {
    return Cf(e, r)
}

function Dp(e, t, r) {
    return t.slice(-4) === ".bin" ? Du(e, r) : Au(e, r)
}

function Op(e, t, r) {
    return t.slice(-4) === ".bin" ? wx(e, r) : hx(e, r)
}

function Ip(e, t, r) {
    return t.slice(-4) === ".bin" ? cx(e) : sx(e)
}

function Rp(e, t, r, a) {
    return r.slice(-4) === ".bin" ? ox(e, t, r, a) : void 0
}

function Np(e, t, r) {
    return t.slice(-4) === ".bin" ? ax(e, t, r) : ix(e, t, r)
}

function bp(e, t, r) {
    return (t.slice(-4) === ".bin" ? kp : jf)(e)
}

function Pp(e, t, r, a, n) {
    return (t.slice(-4) === ".bin" ? Y2 : Gf)(e, r, a, n)
}

function Lp(e, t, r) {
    return (t.slice(-4) === ".bin" ? R1 : Af)(e, r)
}

function Bp(e, t, r) {
    return (t.slice(-4) === ".bin" ? Ru : gf)(e, r)
}

function Mp(e, t, r) {
    return (t.slice(-4) === ".bin" ? kx : If)(e)
}

function Up(e) {
    return (e.slice(-4) === ".bin" ? nx : Df)()
}
var Yf = /([\w:]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g,
    Jf = /([\w:]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;

function Xr(e, t) {
    var r = e.split(/\s+/),
        a = [];
    if (a[0] = r[0], r.length === 1) return a;
    var n = e.match(Yf),
        i, s, f, c;
    if (n)
        for (c = 0; c != n.length; ++c) i = n[c].match(Jf), (s = i[1].indexOf(":")) === -1 ? a[i[1]] = i[2].slice(1, i[2].length - 1) : (i[1].slice(0, 6) === "xmlns:" ? f = "xmlns" + i[1].slice(6) : f = i[1].slice(s + 1), a[f] = i[2].slice(1, i[2].length - 1));
    return a
}

function Wp(e) {
    var t = e.split(/\s+/),
        r = {};
    if (t.length === 1) return r;
    var a = e.match(Yf),
        n, i, s, f;
    if (a)
        for (f = 0; f != a.length; ++f) n = a[f].match(Jf), (i = n[1].indexOf(":")) === -1 ? r[n[1]] = n[2].slice(1, n[2].length - 1) : (n[1].slice(0, 6) === "xmlns:" ? s = "xmlns" + n[1].slice(6) : s = n[1].slice(i + 1), r[s] = n[2].slice(1, n[2].length - 1));
    return r
}
var Sa;

function Hp(e, t) {
    var r = Sa[e] || Ce(e);
    return r === "General" ? Pt(t) : Vr(r, t)
}

function Vp(e, t, r, a) {
    var n = a;
    switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
        case "boolean":
            n = Me(a);
            break;
        case "i2":
        case "int":
            n = parseInt(a, 10);
            break;
        case "r4":
        case "float":
            n = parseFloat(a);
            break;
        case "date":
        case "dateTime.tz":
            n = Ue(a);
            break;
        case "i8":
        case "string":
        case "fixed":
        case "uuid":
        case "bin.base64":
            break;
        default:
            throw new Error("bad custprop:" + r[0])
    }
    e[Ce(t)] = n
}

function Gp(e, t, r) {
    if (e.t !== "z") {
        if (!r || r.cellText !== !1) try {
            e.t === "e" ? e.w = e.w || xt[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = ya(e.v) : e.w = Pt(e.v) : e.w = Hp(t || "General", e.v)
        } catch (i) {
            if (r.WTF) throw i
        }
        try {
            var a = Sa[t] || t || "General";
            if (r.cellNF && (e.z = a), r.cellDates && e.t == "n" && ia(a)) {
                var n = Ot(e.v);
                n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u))
            }
        } catch (i) {
            if (r.WTF) throw i
        }
    }
}

function Xp(e, t, r) {
    if (r.cellStyles && t.Interior) {
        var a = t.Interior;
        a.Pattern && (a.patternType = t1[a.Pattern] || a.Pattern)
    }
    e[t.ID] = t
}

function zp(e, t, r, a, n, i, s, f, c, o) {
    var l = "General",
        h = a.StyleID,
        x = {};
    o = o || {};
    var d = [],
        v = 0;
    for (h === void 0 && f && (h = f.StyleID), h === void 0 && s && (h = s.StyleID); i[h] !== void 0 && (i[h].nf && (l = i[h].nf), i[h].Interior && d.push(i[h].Interior), !!i[h].Parent);) h = i[h].Parent;
    switch (r.Type) {
        case "Boolean":
            a.t = "b", a.v = Me(e);
            break;
        case "String":
            a.t = "s", a.r = ci(Ce(e)), a.v = e.indexOf("<") > -1 ? Ce(t || e).replace(/<.*?>/g, "") : a.r;
            break;
        case "DateTime":
            e.slice(-1) != "Z" && (e += "Z"), a.v = (Ue(e) - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1e3), a.v !== a.v ? a.v = Ce(e) : a.v < 60 && (a.v = a.v - 1), (!l || l == "General") && (l = "yyyy-mm-dd");
        case "Number":
            a.v === void 0 && (a.v = +e), a.t || (a.t = "n");
            break;
        case "Error":
            a.t = "e", a.v = Gs[e], o.cellText !== !1 && (a.w = e);
            break;
        default:
            e == "" && t == "" ? a.t = "z" : (a.t = "s", a.v = ci(t || e));
            break
    }
    if (Gp(a, l, o), o.cellFormula !== !1)
        if (a.Formula) {
            var u = Ce(a.Formula);
            u.charCodeAt(0) == 61 && (u = u.slice(1)), a.f = ea(u, n), delete a.Formula, a.ArrayRange == "RC" ? a.F = ea("RC:RC", n) : a.ArrayRange && (a.F = ea(a.ArrayRange, n), c.push([De(a.F), a.F]))
        } else
            for (v = 0; v < c.length; ++v) n.r >= c[v][0].s.r && n.r <= c[v][0].e.r && n.c >= c[v][0].s.c && n.c <= c[v][0].e.c && (a.F = c[v][1]);
    o.cellStyles && (d.forEach(function(p) {
        !x.patternType && p.patternType && (x.patternType = p.patternType)
    }), a.s = x), a.StyleID !== void 0 && (a.ixfe = a.StyleID)
}

function $p(e) {
    e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0
}

function M0(e, t) {
    var r = t || {};
    sa();
    var a = va(un(e));
    (r.type == "binary" || r.type == "array" || r.type == "base64") && (a = Pe(a));
    var n = a.slice(0, 1024).toLowerCase(),
        i = !1;
    if (n = n.replace(/".*?"/g, ""), (n.indexOf(">") & 1023) > Math.min(n.indexOf(",") & 1023, n.indexOf(";") & 1023)) {
        var s = We(r);
        return s.type = "string", aa.to_workbook(a, s)
    }
    if (n.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(je) {
            n.indexOf("<" + je) >= 0 && (i = !0)
        }), i) return Im(a, r);
    Sa = {
        "General Number": "General",
        "General Date": ve[22],
        "Long Date": "dddd, mmmm dd, yyyy",
        "Medium Date": ve[15],
        "Short Date": ve[14],
        "Long Time": ve[19],
        "Medium Time": ve[18],
        "Short Time": ve[20],
        Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
        Fixed: ve[2],
        Standard: ve[4],
        Percent: ve[10],
        Scientific: ve[11],
        "Yes/No": '"Yes";"Yes";"No";@',
        "True/False": '"True";"True";"False";@',
        "On/Off": '"Yes";"Yes";"No";@'
    };
    var f, c = [],
        o, l = {},
        h = [],
        x = r.dense ? [] : {},
        d = "",
        v = {},
        u = {},
        p = Xr('<Data ss:Type="String">'),
        k = 0,
        A = 0,
        g = 0,
        O = {
            s: {
                r: 2e6,
                c: 2e6
            },
            e: {
                r: 0,
                c: 0
            }
        },
        b = {},
        N = {},
        F = "",
        B = 0,
        I = [],
        z = {},
        G = {},
        L = 0,
        J = [],
        le = [],
        ie = {},
        ue = [],
        ce, be = !1,
        V = [],
        de = [],
        ge = {},
        C = 0,
        P = 0,
        D = {
            Sheets: [],
            WBProps: {
                date1904: !1
            }
        },
        R = {};
    Oa.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "");
    for (var j = ""; f = Oa.exec(a);) switch (f[3] = (j = f[3]).toLowerCase()) {
        case "data":
            if (j == "data") {
                if (f[1] === "/") {
                    if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
                } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
                break
            }
            if (c[c.length - 1][1]) break;
            f[1] === "/" ? zp(a.slice(k, f.index), F, p, c[c.length - 1][0] == "comment" ? ie : v, {
                c: A,
                r: g
            }, b, ue[A], u, V, r) : (F = "", p = Xr(f[0]), k = f.index + f[0].length);
            break;
        case "cell":
            if (f[1] === "/")
                if (le.length > 0 && (v.c = le), (!r.sheetRows || r.sheetRows > g) && v.v !== void 0 && (r.dense ? (x[g] || (x[g] = []), x[g][A] = v) : x[Ge(A) + Ze(g)] = v), v.HRef && (v.l = {
                        Target: Ce(v.HRef)
                    }, v.HRefScreenTip && (v.l.Tooltip = v.HRefScreenTip), delete v.HRef, delete v.HRefScreenTip), (v.MergeAcross || v.MergeDown) && (C = A + (parseInt(v.MergeAcross, 10) | 0), P = g + (parseInt(v.MergeDown, 10) | 0), I.push({
                        s: {
                            c: A,
                            r: g
                        },
                        e: {
                            c: C,
                            r: P
                        }
                    })), !r.sheetStubs) v.MergeAcross ? A = C + 1 : ++A;
                else if (v.MergeAcross || v.MergeDown) {
                for (var re = A; re <= C; ++re)
                    for (var te = g; te <= P; ++te)(re > A || te > g) && (r.dense ? (x[te] || (x[te] = []), x[te][re] = {
                        t: "z"
                    }) : x[Ge(re) + Ze(te)] = {
                        t: "z"
                    });
                A = C + 1
            } else ++A;
            else v = Wp(f[0]), v.Index && (A = +v.Index - 1), A < O.s.c && (O.s.c = A), A > O.e.c && (O.e.c = A), f[0].slice(-2) === "/>" && ++A, le = [];
            break;
        case "row":
            f[1] === "/" || f[0].slice(-2) === "/>" ? (g < O.s.r && (O.s.r = g), g > O.e.r && (O.e.r = g), f[0].slice(-2) === "/>" && (u = Xr(f[0]), u.Index && (g = +u.Index - 1)), A = 0, ++g) : (u = Xr(f[0]), u.Index && (g = +u.Index - 1), ge = {}, (u.AutoFitHeight == "0" || u.Height) && (ge.hpx = parseInt(u.Height, 10), ge.hpt = Pa(ge.hpx), de[g] = ge), u.Hidden == "1" && (ge.hidden = !0, de[g] = ge));
            break;
        case "worksheet":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
                h.push(d), O.s.r <= O.e.r && O.s.c <= O.e.c && (x["!ref"] = we(O), r.sheetRows && r.sheetRows <= O.e.r && (x["!fullref"] = x["!ref"], O.e.r = r.sheetRows - 1, x["!ref"] = we(O))), I.length && (x["!merges"] = I), ue.length > 0 && (x["!cols"] = ue), de.length > 0 && (x["!rows"] = de), l[d] = x
            } else O = {
                s: {
                    r: 2e6,
                    c: 2e6
                },
                e: {
                    r: 0,
                    c: 0
                }
            }, g = A = 0, c.push([f[3], !1]), o = Xr(f[0]), d = Ce(o.Name), x = r.dense ? [] : {}, I = [], V = [], de = [], R = {
                name: d,
                Hidden: 0
            }, D.Sheets.push(R);
            break;
        case "table":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
            } else {
                if (f[0].slice(-2) == "/>") break;
                c.push([f[3], !1]), ue = [], be = !1
            }
            break;
        case "style":
            f[1] === "/" ? Xp(b, N, r) : N = Xr(f[0]);
            break;
        case "numberformat":
            N.nf = Ce(Xr(f[0]).Format || "General"), Sa[N.nf] && (N.nf = Sa[N.nf]);
            for (var Q = 0; Q != 392 && ve[Q] != N.nf; ++Q);
            if (Q == 392) {
                for (Q = 57; Q != 392; ++Q)
                    if (ve[Q] == null) {
                        ct(N.nf, Q);
                        break
                    }
            }
            break;
        case "column":
            if (c[c.length - 1][0] !== "table") break;
            if (ce = Xr(f[0]), ce.Hidden && (ce.hidden = !0, delete ce.Hidden), ce.Width && (ce.wpx = parseInt(ce.Width, 10)), !be && ce.wpx > 10) {
                be = !0, vr = Sf;
                for (var Z = 0; Z < ue.length; ++Z) ue[Z] && kt(ue[Z])
            }
            be && kt(ce), ue[ce.Index - 1 || ue.length] = ce;
            for (var Ee = 0; Ee < +ce.Span; ++Ee) ue[ue.length] = We(ce);
            break;
        case "namedrange":
            if (f[1] === "/") break;
            D.Names || (D.Names = []);
            var y = me(f[0]),
                Be = {
                    Name: y.Name,
                    Ref: ea(y.RefersTo.slice(1), {
                        r: 0,
                        c: 0
                    })
                };
            D.Sheets.length > 0 && (Be.Sheet = D.Sheets.length - 1), D.Names.push(Be);
            break;
        case "namedcell":
            break;
        case "b":
            break;
        case "i":
            break;
        case "u":
            break;
        case "s":
            break;
        case "em":
            break;
        case "h2":
            break;
        case "h3":
            break;
        case "sub":
            break;
        case "sup":
            break;
        case "span":
            break;
        case "alignment":
            break;
        case "borders":
            break;
        case "border":
            break;
        case "font":
            if (f[0].slice(-2) === "/>") break;
            f[1] === "/" ? F += a.slice(B, f.index) : B = f.index + f[0].length;
            break;
        case "interior":
            if (!r.cellStyles) break;
            N.Interior = Xr(f[0]);
            break;
        case "protection":
            break;
        case "author":
        case "title":
        case "description":
        case "created":
        case "keywords":
        case "subject":
        case "category":
        case "company":
        case "lastauthor":
        case "lastsaved":
        case "lastprinted":
        case "version":
        case "revision":
        case "totaltime":
        case "hyperlinkbase":
        case "manager":
        case "contentstatus":
        case "identifier":
        case "language":
        case "appname":
            if (f[0].slice(-2) === "/>") break;
            f[1] === "/" ? pl(z, j, a.slice(L, f.index)) : L = f.index + f[0].length;
            break;
        case "paragraphs":
            break;
        case "styles":
        case "workbook":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
            } else c.push([f[3], !1]);
            break;
        case "comment":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"));
                $p(ie), le.push(ie)
            } else c.push([f[3], !1]), o = Xr(f[0]), ie = {
                a: o.Author
            };
            break;
        case "autofilter":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
            } else if (f[0].charAt(f[0].length - 2) !== "/") {
                var ye = Xr(f[0]);
                x["!autofilter"] = {
                    ref: ea(ye.Range).replace(/\$/g, "")
                }, c.push([f[3], !0])
            }
            break;
        case "name":
            break;
        case "datavalidation":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
            } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
            break;
        case "pixelsperinch":
            break;
        case "componentoptions":
        case "documentproperties":
        case "customdocumentproperties":
        case "officedocumentsettings":
        case "pivottable":
        case "pivotcache":
        case "names":
        case "mapinfo":
        case "pagebreaks":
        case "querytable":
        case "sorting":
        case "schema":
        case "conditionalformatting":
        case "smarttagtype":
        case "smarttags":
        case "excelworkbook":
        case "workbookoptions":
        case "worksheetoptions":
            if (f[1] === "/") {
                if ((o = c.pop())[0] !== f[3]) throw new Error("Bad state: " + o.join("|"))
            } else f[0].charAt(f[0].length - 2) !== "/" && c.push([f[3], !0]);
            break;
        case "null":
            break;
        default:
            if (c.length == 0 && f[3] == "document" || c.length == 0 && f[3] == "uof") return Ji(a, r);
            var Le = !0;
            switch (c[c.length - 1][0]) {
                case "officedocumentsettings":
                    switch (f[3]) {
                        case "allowpng":
                            break;
                        case "removepersonalinformation":
                            break;
                        case "downloadcomponents":
                            break;
                        case "locationofcomponents":
                            break;
                        case "colors":
                            break;
                        case "color":
                            break;
                        case "index":
                            break;
                        case "rgb":
                            break;
                        case "targetscreensize":
                            break;
                        case "readonlyrecommended":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "componentoptions":
                    switch (f[3]) {
                        case "toolbar":
                            break;
                        case "hideofficelogo":
                            break;
                        case "spreadsheetautofit":
                            break;
                        case "label":
                            break;
                        case "caption":
                            break;
                        case "maxheight":
                            break;
                        case "maxwidth":
                            break;
                        case "nextsheetnumber":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "excelworkbook":
                    switch (f[3]) {
                        case "date1904":
                            D.WBProps.date1904 = !0;
                            break;
                        case "windowheight":
                            break;
                        case "windowwidth":
                            break;
                        case "windowtopx":
                            break;
                        case "windowtopy":
                            break;
                        case "tabratio":
                            break;
                        case "protectstructure":
                            break;
                        case "protectwindow":
                            break;
                        case "protectwindows":
                            break;
                        case "activesheet":
                            break;
                        case "displayinknotes":
                            break;
                        case "firstvisiblesheet":
                            break;
                        case "supbook":
                            break;
                        case "sheetname":
                            break;
                        case "sheetindex":
                            break;
                        case "sheetindexfirst":
                            break;
                        case "sheetindexlast":
                            break;
                        case "dll":
                            break;
                        case "acceptlabelsinformulas":
                            break;
                        case "donotsavelinkvalues":
                            break;
                        case "iteration":
                            break;
                        case "maxiterations":
                            break;
                        case "maxchange":
                            break;
                        case "path":
                            break;
                        case "xct":
                            break;
                        case "count":
                            break;
                        case "selectedsheets":
                            break;
                        case "calculation":
                            break;
                        case "uncalced":
                            break;
                        case "startupprompt":
                            break;
                        case "crn":
                            break;
                        case "externname":
                            break;
                        case "formula":
                            break;
                        case "colfirst":
                            break;
                        case "collast":
                            break;
                        case "wantadvise":
                            break;
                        case "boolean":
                            break;
                        case "error":
                            break;
                        case "text":
                            break;
                        case "ole":
                            break;
                        case "noautorecover":
                            break;
                        case "publishobjects":
                            break;
                        case "donotcalculatebeforesave":
                            break;
                        case "number":
                            break;
                        case "refmoder1c1":
                            break;
                        case "embedsavesmarttags":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "workbookoptions":
                    switch (f[3]) {
                        case "owcversion":
                            break;
                        case "height":
                            break;
                        case "width":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "worksheetoptions":
                    switch (f[3]) {
                        case "visible":
                            if (f[0].slice(-2) !== "/>")
                                if (f[1] === "/") switch (a.slice(L, f.index)) {
                                    case "SheetHidden":
                                        R.Hidden = 1;
                                        break;
                                    case "SheetVeryHidden":
                                        R.Hidden = 2;
                                        break
                                } else L = f.index + f[0].length;
                            break;
                        case "header":
                            x["!margins"] || bt(x["!margins"] = {}, "xlml"), isNaN(+me(f[0]).Margin) || (x["!margins"].header = +me(f[0]).Margin);
                            break;
                        case "footer":
                            x["!margins"] || bt(x["!margins"] = {}, "xlml"), isNaN(+me(f[0]).Margin) || (x["!margins"].footer = +me(f[0]).Margin);
                            break;
                        case "pagemargins":
                            var Ae = me(f[0]);
                            x["!margins"] || bt(x["!margins"] = {}, "xlml"), isNaN(+Ae.Top) || (x["!margins"].top = +Ae.Top), isNaN(+Ae.Left) || (x["!margins"].left = +Ae.Left), isNaN(+Ae.Right) || (x["!margins"].right = +Ae.Right), isNaN(+Ae.Bottom) || (x["!margins"].bottom = +Ae.Bottom);
                            break;
                        case "displayrighttoleft":
                            D.Views || (D.Views = []), D.Views[0] || (D.Views[0] = {}), D.Views[0].RTL = !0;
                            break;
                        case "freezepanes":
                            break;
                        case "frozennosplit":
                            break;
                        case "splithorizontal":
                        case "splitvertical":
                            break;
                        case "donotdisplaygridlines":
                            break;
                        case "activerow":
                            break;
                        case "activecol":
                            break;
                        case "toprowbottompane":
                            break;
                        case "leftcolumnrightpane":
                            break;
                        case "unsynced":
                            break;
                        case "print":
                            break;
                        case "printerrors":
                            break;
                        case "panes":
                            break;
                        case "scale":
                            break;
                        case "pane":
                            break;
                        case "number":
                            break;
                        case "layout":
                            break;
                        case "pagesetup":
                            break;
                        case "selected":
                            break;
                        case "protectobjects":
                            break;
                        case "enableselection":
                            break;
                        case "protectscenarios":
                            break;
                        case "validprinterinfo":
                            break;
                        case "horizontalresolution":
                            break;
                        case "verticalresolution":
                            break;
                        case "numberofcopies":
                            break;
                        case "activepane":
                            break;
                        case "toprowvisible":
                            break;
                        case "leftcolumnvisible":
                            break;
                        case "fittopage":
                            break;
                        case "rangeselection":
                            break;
                        case "papersizeindex":
                            break;
                        case "pagelayoutzoom":
                            break;
                        case "pagebreakzoom":
                            break;
                        case "filteron":
                            break;
                        case "fitwidth":
                            break;
                        case "fitheight":
                            break;
                        case "commentslayout":
                            break;
                        case "zoom":
                            break;
                        case "lefttoright":
                            break;
                        case "gridlines":
                            break;
                        case "allowsort":
                            break;
                        case "allowfilter":
                            break;
                        case "allowinsertrows":
                            break;
                        case "allowdeleterows":
                            break;
                        case "allowinsertcols":
                            break;
                        case "allowdeletecols":
                            break;
                        case "allowinserthyperlinks":
                            break;
                        case "allowformatcells":
                            break;
                        case "allowsizecols":
                            break;
                        case "allowsizerows":
                            break;
                        case "nosummaryrowsbelowdetail":
                            x["!outline"] || (x["!outline"] = {}), x["!outline"].above = !0;
                            break;
                        case "tabcolorindex":
                            break;
                        case "donotdisplayheadings":
                            break;
                        case "showpagelayoutzoom":
                            break;
                        case "nosummarycolumnsrightdetail":
                            x["!outline"] || (x["!outline"] = {}), x["!outline"].left = !0;
                            break;
                        case "blackandwhite":
                            break;
                        case "donotdisplayzeros":
                            break;
                        case "displaypagebreak":
                            break;
                        case "rowcolheadings":
                            break;
                        case "donotdisplayoutline":
                            break;
                        case "noorientation":
                            break;
                        case "allowusepivottables":
                            break;
                        case "zeroheight":
                            break;
                        case "viewablerange":
                            break;
                        case "selection":
                            break;
                        case "protectcontents":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "pivottable":
                case "pivotcache":
                    switch (f[3]) {
                        case "immediateitemsondrop":
                            break;
                        case "showpagemultipleitemlabel":
                            break;
                        case "compactrowindent":
                            break;
                        case "location":
                            break;
                        case "pivotfield":
                            break;
                        case "orientation":
                            break;
                        case "layoutform":
                            break;
                        case "layoutsubtotallocation":
                            break;
                        case "layoutcompactrow":
                            break;
                        case "position":
                            break;
                        case "pivotitem":
                            break;
                        case "datatype":
                            break;
                        case "datafield":
                            break;
                        case "sourcename":
                            break;
                        case "parentfield":
                            break;
                        case "ptlineitems":
                            break;
                        case "ptlineitem":
                            break;
                        case "countofsameitems":
                            break;
                        case "item":
                            break;
                        case "itemtype":
                            break;
                        case "ptsource":
                            break;
                        case "cacheindex":
                            break;
                        case "consolidationreference":
                            break;
                        case "filename":
                            break;
                        case "reference":
                            break;
                        case "nocolumngrand":
                            break;
                        case "norowgrand":
                            break;
                        case "blanklineafteritems":
                            break;
                        case "hidden":
                            break;
                        case "subtotal":
                            break;
                        case "basefield":
                            break;
                        case "mapchilditems":
                            break;
                        case "function":
                            break;
                        case "refreshonfileopen":
                            break;
                        case "printsettitles":
                            break;
                        case "mergelabels":
                            break;
                        case "defaultversion":
                            break;
                        case "refreshname":
                            break;
                        case "refreshdate":
                            break;
                        case "refreshdatecopy":
                            break;
                        case "versionlastrefresh":
                            break;
                        case "versionlastupdate":
                            break;
                        case "versionupdateablemin":
                            break;
                        case "versionrefreshablemin":
                            break;
                        case "calculation":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "pagebreaks":
                    switch (f[3]) {
                        case "colbreaks":
                            break;
                        case "colbreak":
                            break;
                        case "rowbreaks":
                            break;
                        case "rowbreak":
                            break;
                        case "colstart":
                            break;
                        case "colend":
                            break;
                        case "rowend":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "autofilter":
                    switch (f[3]) {
                        case "autofiltercolumn":
                            break;
                        case "autofiltercondition":
                            break;
                        case "autofilterand":
                            break;
                        case "autofilteror":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "querytable":
                    switch (f[3]) {
                        case "id":
                            break;
                        case "autoformatfont":
                            break;
                        case "autoformatpattern":
                            break;
                        case "querysource":
                            break;
                        case "querytype":
                            break;
                        case "enableredirections":
                            break;
                        case "refreshedinxl9":
                            break;
                        case "urlstring":
                            break;
                        case "htmltables":
                            break;
                        case "connection":
                            break;
                        case "commandtext":
                            break;
                        case "refreshinfo":
                            break;
                        case "notitles":
                            break;
                        case "nextid":
                            break;
                        case "columninfo":
                            break;
                        case "overwritecells":
                            break;
                        case "donotpromptforfile":
                            break;
                        case "textwizardsettings":
                            break;
                        case "source":
                            break;
                        case "number":
                            break;
                        case "decimal":
                            break;
                        case "thousandseparator":
                            break;
                        case "trailingminusnumbers":
                            break;
                        case "formatsettings":
                            break;
                        case "fieldtype":
                            break;
                        case "delimiters":
                            break;
                        case "tab":
                            break;
                        case "comma":
                            break;
                        case "autoformatname":
                            break;
                        case "versionlastedit":
                            break;
                        case "versionlastrefresh":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "datavalidation":
                    switch (f[3]) {
                        case "range":
                            break;
                        case "type":
                            break;
                        case "min":
                            break;
                        case "max":
                            break;
                        case "sort":
                            break;
                        case "descending":
                            break;
                        case "order":
                            break;
                        case "casesensitive":
                            break;
                        case "value":
                            break;
                        case "errorstyle":
                            break;
                        case "errormessage":
                            break;
                        case "errortitle":
                            break;
                        case "inputmessage":
                            break;
                        case "inputtitle":
                            break;
                        case "combohide":
                            break;
                        case "inputhide":
                            break;
                        case "condition":
                            break;
                        case "qualifier":
                            break;
                        case "useblank":
                            break;
                        case "value1":
                            break;
                        case "value2":
                            break;
                        case "format":
                            break;
                        case "cellrangelist":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "sorting":
                case "conditionalformatting":
                    switch (f[3]) {
                        case "range":
                            break;
                        case "type":
                            break;
                        case "min":
                            break;
                        case "max":
                            break;
                        case "sort":
                            break;
                        case "descending":
                            break;
                        case "order":
                            break;
                        case "casesensitive":
                            break;
                        case "value":
                            break;
                        case "errorstyle":
                            break;
                        case "errormessage":
                            break;
                        case "errortitle":
                            break;
                        case "cellrangelist":
                            break;
                        case "inputmessage":
                            break;
                        case "inputtitle":
                            break;
                        case "combohide":
                            break;
                        case "inputhide":
                            break;
                        case "condition":
                            break;
                        case "qualifier":
                            break;
                        case "useblank":
                            break;
                        case "value1":
                            break;
                        case "value2":
                            break;
                        case "format":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "mapinfo":
                case "schema":
                case "data":
                    switch (f[3]) {
                        case "map":
                            break;
                        case "entry":
                            break;
                        case "range":
                            break;
                        case "xpath":
                            break;
                        case "field":
                            break;
                        case "xsdtype":
                            break;
                        case "filteron":
                            break;
                        case "aggregate":
                            break;
                        case "elementtype":
                            break;
                        case "attributetype":
                            break;
                        case "schema":
                        case "element":
                        case "complextype":
                        case "datatype":
                        case "all":
                        case "attribute":
                        case "extends":
                            break;
                        case "row":
                            break;
                        default:
                            Le = !1
                    }
                    break;
                case "smarttags":
                    break;
                default:
                    Le = !1;
                    break
            }
            if (Le || f[3].match(/!\[CDATA/)) break;
            if (!c[c.length - 1][1]) throw "Unrecognized tag: " + f[3] + "|" + c.join("|");
            if (c[c.length - 1][0] === "customdocumentproperties") {
                if (f[0].slice(-2) === "/>") break;
                f[1] === "/" ? Vp(G, j, J, a.slice(L, f.index)) : (J = f, L = f.index + f[0].length);
                break
            }
            if (r.WTF) throw "Unrecognized tag: " + f[3] + "|" + c.join("|")
    }
    var fe = {};
    return !r.bookSheets && !r.bookProps && (fe.Sheets = l), fe.SheetNames = h, fe.Workbook = D, fe.SSF = We(ve), fe.Props = z, fe.Custprops = G, fe
}

function Z0(e, t) {
    switch (Ln(t = t || {}), t.type || "base64") {
        case "base64":
            return M0(Rr(e), t);
        case "binary":
        case "buffer":
        case "file":
            return M0(e, t);
        case "array":
            return M0(St(e), t)
    }
}

function Kp(e, t) {
    var r = [];
    return e.Props && r.push(ml(e.Props, t)), e.Custprops && r.push(gl(e.Props, e.Custprops)), r.join("")
}

function jp() {
    return ""
}

function Yp(e, t) {
    var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
    return t.cellXfs.forEach(function(a, n) {
        var i = [];
        i.push(ae("NumberFormat", null, {
            "ss:Format": Ne(ve[a.numFmtId])
        }));
        var s = {
            "ss:ID": "s" + (21 + n)
        };
        r.push(ae("Style", i.join(""), s))
    }), ae("Styles", r.join(""))
}

function Zf(e) {
    return ae("NamedRange", null, {
        "ss:Name": e.Name,
        "ss:RefersTo": "=" + On(e.Ref, {
            r: 0,
            c: 0
        })
    })
}

function Jp(e) {
    if (!((e || {}).Workbook || {}).Names) return "";
    for (var t = e.Workbook.Names, r = [], a = 0; a < t.length; ++a) {
        var n = t[a];
        n.Sheet == null && (n.Name.match(/^_xlfn\./) || r.push(Zf(n)))
    }
    return ae("Names", r.join(""))
}

function Zp(e, t, r, a) {
    if (!e || !((a || {}).Workbook || {}).Names) return "";
    for (var n = a.Workbook.Names, i = [], s = 0; s < n.length; ++s) {
        var f = n[s];
        f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(Zf(f)))
    }
    return i.join("")
}

function qp(e, t, r, a) {
    if (!e) return "";
    var n = [];
    if (e["!margins"] && (n.push("<PageSetup>"), e["!margins"].header && n.push(ae("Header", null, {
            "x:Margin": e["!margins"].header
        })), e["!margins"].footer && n.push(ae("Footer", null, {
            "x:Margin": e["!margins"].footer
        })), n.push(ae("PageMargins", null, {
            "x:Bottom": e["!margins"].bottom || "0.75",
            "x:Left": e["!margins"].left || "0.7",
            "x:Right": e["!margins"].right || "0.7",
            "x:Top": e["!margins"].top || "0.75"
        })), n.push("</PageSetup>")), a && a.Workbook && a.Workbook.Sheets && a.Workbook.Sheets[r])
        if (a.Workbook.Sheets[r].Hidden) n.push(ae("Visible", a.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
        else {
            for (var i = 0; i < r && !(a.Workbook.Sheets[i] && !a.Workbook.Sheets[i].Hidden); ++i);
            i == r && n.push("<Selected/>")
        } return ((((a || {}).Workbook || {}).Views || [])[0] || {}).RTL && n.push("<DisplayRightToLeft/>"), e["!protect"] && (n.push(lr("ProtectContents", "True")), e["!protect"].objects && n.push(lr("ProtectObjects", "True")), e["!protect"].scenarios && n.push(lr("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? n.push(lr("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && n.push(lr("EnableSelection", "UnlockedCells")), [
        ["formatCells", "AllowFormatCells"],
        ["formatColumns", "AllowSizeCols"],
        ["formatRows", "AllowSizeRows"],
        ["insertColumns", "AllowInsertCols"],
        ["insertRows", "AllowInsertRows"],
        ["insertHyperlinks", "AllowInsertHyperlinks"],
        ["deleteColumns", "AllowDeleteCols"],
        ["deleteRows", "AllowDeleteRows"],
        ["sort", "AllowSort"],
        ["autoFilter", "AllowFilter"],
        ["pivotTables", "AllowUsePivotTables"]
    ].forEach(function(s) {
        e["!protect"][s[0]] && n.push("<" + s[1] + "/>")
    })), n.length == 0 ? "" : ae("WorksheetOptions", n.join(""), {
        xmlns: Cr.x
    })
}

function Qp(e) {
    return e.map(function(t) {
        var r = wo(t.t || ""),
            a = ae("ss:Data", r, {
                xmlns: "http://www.w3.org/TR/REC-html40"
            });
        return ae("Comment", a, {
            "ss:Author": t.a
        })
    }).join("")
}

function em(e, t, r, a, n, i, s) {
    if (!e || e.v == null && e.f == null) return "";
    var f = {};
    if (e.f && (f["ss:Formula"] = "=" + Ne(On(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
        var c = Xe(e.F.slice(t.length + 1));
        f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]")
    }
    if (e.l && e.l.Target && (f["ss:HRef"] = Ne(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Ne(e.l.Tooltip))), r["!merges"])
        for (var o = r["!merges"], l = 0; l != o.length; ++l) o[l].s.c != s.c || o[l].s.r != s.r || (o[l].e.c > o[l].s.c && (f["ss:MergeAcross"] = o[l].e.c - o[l].s.c), o[l].e.r > o[l].s.r && (f["ss:MergeDown"] = o[l].e.r - o[l].s.r));
    var h = "",
        x = "";
    switch (e.t) {
        case "z":
            if (!a.sheetStubs) return "";
            break;
        case "n":
            h = "Number", x = String(e.v);
            break;
        case "b":
            h = "Boolean", x = e.v ? "1" : "0";
            break;
        case "e":
            h = "Error", x = xt[e.v];
            break;
        case "d":
            h = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || ve[14]);
            break;
        case "s":
            h = "String", x = _o(e.v || "");
            break
    }
    var d = At(a.cellXfs, e, a);
    f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
    var v = e.v != null ? x : "",
        u = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + v + "</Data>";
    return (e.c || []).length > 0 && (u += Qp(e.c)), ae("Cell", u, f)
}

function rm(e, t) {
    var r = '<Row ss:Index="' + (e + 1) + '"';
    return t && (t.hpt && !t.hpx && (t.hpx = na(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">"
}

function tm(e, t, r, a) {
    if (!e["!ref"]) return "";
    var n = De(e["!ref"]),
        i = e["!merges"] || [],
        s = 0,
        f = [];
    e["!cols"] && e["!cols"].forEach(function(p, k) {
        kt(p);
        var A = !!p.width,
            g = A0(k, p),
            O = {
                "ss:Index": k + 1
            };
        A && (O["ss:Width"] = Na(g.width)), p.hidden && (O["ss:Hidden"] = "1"), f.push(ae("Column", null, O))
    });
    for (var c = Array.isArray(e), o = n.s.r; o <= n.e.r; ++o) {
        for (var l = [rm(o, (e["!rows"] || [])[o])], h = n.s.c; h <= n.e.c; ++h) {
            var x = !1;
            for (s = 0; s != i.length; ++s)
                if (!(i[s].s.c > h) && !(i[s].s.r > o) && !(i[s].e.c < h) && !(i[s].e.r < o)) {
                    (i[s].s.c != h || i[s].s.r != o) && (x = !0);
                    break
                } if (!x) {
                var d = {
                        r: o,
                        c: h
                    },
                    v = pe(d),
                    u = c ? (e[o] || [])[h] : e[v];
                l.push(em(u, v, e, t, r, a, d))
            }
        }
        l.push("</Row>"), l.length > 2 && f.push(l.join(""))
    }
    return f.join("")
}

function am(e, t, r) {
    var a = [],
        n = r.SheetNames[e],
        i = r.Sheets[n],
        s = i ? Zp(i, t, e, r) : "";
    return s.length > 0 && a.push("<Names>" + s + "</Names>"), s = i ? tm(i, t, e, r) : "", s.length > 0 && a.push("<Table>" + s + "</Table>"), a.push(qp(i, t, e, r)), a.join("")
}

function nm(e, t) {
    t || (t = {}), e.SSF || (e.SSF = We(ve)), e.SSF && (sa(), _0(e.SSF), t.revssf = k0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], At(t.cellXfs, {}, {
        revssf: {
            General: 0
        }
    }));
    var r = [];
    r.push(Kp(e, t)), r.push(jp()), r.push(""), r.push("");
    for (var a = 0; a < e.SheetNames.length; ++a) r.push(ae("Worksheet", am(a, t, e), {
        "ss:Name": Ne(e.SheetNames[a])
    }));
    return r[2] = Yp(e, t), r[3] = Jp(e), qe + ae("Workbook", r.join(""), {
        xmlns: Cr.ss,
        "xmlns:o": Cr.o,
        "xmlns:x": Cr.x,
        "xmlns:ss": Cr.ss,
        "xmlns:dt": Cr.dt,
        "xmlns:html": Cr.html
    })
}

function im(e) {
    var t = {},
        r = e.content;
    if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = Jo(r), r.length - r.l <= 4) return t;
    var a = r.read_shift(4);
    if (a == 0 || a > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (a = r.read_shift(4), a !== 1907505652) || (t.UnicodeClipboardFormat = Zo(r), a = r.read_shift(4), a == 0 || a > 40)) return t;
    r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr")
}
var sm = [60, 1084, 2066, 2165, 2175];

function fm(e, t, r, a, n) {
    var i = a,
        s = [],
        f = r.slice(r.l, r.l + i);
    if (n && n.enc && n.enc.insitu && f.length > 0) switch (e) {
        case 9:
        case 521:
        case 1033:
        case 2057:
        case 47:
        case 405:
        case 225:
        case 406:
        case 312:
        case 404:
        case 10:
            break;
        case 133:
            break;
        default:
            n.enc.insitu(f)
    }
    s.push(f), r.l += i;
    for (var c = st(r, r.l), o = q0[c], l = 0; o != null && sm.indexOf(c) > -1;) i = st(r, r.l + 2), l = r.l + 4, c == 2066 ? l += 4 : (c == 2165 || c == 2175) && (l += 12), f = r.slice(l, r.l + 4 + i), s.push(f), r.l += 4 + i, o = q0[c = st(r, r.l)];
    var h = sr(s);
    or(h, 0);
    var x = 0;
    h.lens = [];
    for (var d = 0; d < s.length; ++d) h.lens.push(x), x += s[d].length;
    if (h.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + h.length + " < " + a;
    return t.f(h, h.length, n)
}

function Zr(e, t, r) {
    if (e.t !== "z" && e.XF) {
        var a = 0;
        try {
            a = e.z || e.XF.numFmtId || 0, t.cellNF && (e.z = ve[a])
        } catch (i) {
            if (t.WTF) throw i
        }
        if (!t || t.cellText !== !1) try {
            e.t === "e" ? e.w = e.w || xt[e.v] : a === 0 || a == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = ya(e.v) : e.w = Pt(e.v) : e.w = Vr(a, e.v, {
                date1904: !!r,
                dateNF: t && t.dateNF
            })
        } catch (i) {
            if (t.WTF) throw i
        }
        if (t.cellDates && a && e.t == "n" && ia(ve[a] || String(a))) {
            var n = Ot(e.v);
            n && (e.t = "d", e.v = new Date(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u))
        }
    }
}

function a0(e, t, r) {
    return {
        v: e,
        ixfe: t,
        t: r
    }
}

function cm(e, t) {
    var r = {
            opts: {}
        },
        a = {},
        n = t.dense ? [] : {},
        i = {},
        s = {},
        f = null,
        c = [],
        o = "",
        l = {},
        h, x = "",
        d, v, u, p, k = {},
        A = [],
        g, O, b = [],
        N = [],
        F = {
            Sheets: [],
            WBProps: {
                date1904: !1
            },
            Views: [{}]
        },
        B = {},
        I = function(Se) {
            return Se < 8 ? It[Se] : Se < 64 && N[Se - 8] || It[Se]
        },
        z = function(Se, Ye, br) {
            var tr = Ye.XF.data;
            if (!(!tr || !tr.patternType || !br || !br.cellStyles)) {
                Ye.s = {}, Ye.s.patternType = tr.patternType;
                var yt;
                (yt = Ra(I(tr.icvFore))) && (Ye.s.fgColor = {
                    rgb: yt
                }), (yt = Ra(I(tr.icvBack))) && (Ye.s.bgColor = {
                    rgb: yt
                })
            }
        },
        G = function(Se, Ye, br) {
            if (!(ge > 1) && !(br.sheetRows && Se.r >= br.sheetRows)) {
                if (br.cellStyles && Ye.XF && Ye.XF.data && z(Se, Ye, br), delete Ye.ixfe, delete Ye.XF, h = Se, x = pe(Se), (!s || !s.s || !s.e) && (s = {
                        s: {
                            r: 0,
                            c: 0
                        },
                        e: {
                            r: 0,
                            c: 0
                        }
                    }), Se.r < s.s.r && (s.s.r = Se.r), Se.c < s.s.c && (s.s.c = Se.c), Se.r + 1 > s.e.r && (s.e.r = Se.r + 1), Se.c + 1 > s.e.c && (s.e.c = Se.c + 1), br.cellFormula && Ye.f) {
                    for (var tr = 0; tr < A.length; ++tr)
                        if (!(A[tr][0].s.c > Se.c || A[tr][0].s.r > Se.r) && !(A[tr][0].e.c < Se.c || A[tr][0].e.r < Se.r)) {
                            Ye.F = we(A[tr][0]), (A[tr][0].s.c != Se.c || A[tr][0].s.r != Se.r) && delete Ye.f, Ye.f && (Ye.f = "" + dr(A[tr][1], s, Se, V, L));
                            break
                        }
                }
                br.dense ? (n[Se.r] || (n[Se.r] = []), n[Se.r][Se.c] = Ye) : n[x] = Ye
            }
        },
        L = {
            enc: !1,
            sbcch: 0,
            snames: [],
            sharedf: k,
            arrayf: A,
            rrtabid: [],
            lastuser: "",
            biff: 8,
            codepage: 0,
            winlocked: 0,
            cellStyles: !!t && !!t.cellStyles,
            WTF: !!t && !!t.wtf
        };
    t.password && (L.password = t.password);
    var J, le = [],
        ie = [],
        ue = [],
        ce = [],
        be = !1,
        V = [];
    V.SheetNames = L.snames, V.sharedf = L.sharedf, V.arrayf = L.arrayf, V.names = [], V.XTI = [];
    var de = 0,
        ge = 0,
        C = 0,
        P = [],
        D = [],
        R;
    L.codepage = 1200, zr(1200);
    for (var j = !1; e.l < e.length - 1;) {
        var re = e.l,
            te = e.read_shift(2);
        if (te === 0 && de === 10) break;
        var Q = e.l === e.length ? 0 : e.read_shift(2),
            Z = q0[te];
        if (Z && Z.f) {
            if (t.bookSheets && de === 133 && te !== 133) break;
            if (de = te, Z.r === 2 || Z.r == 12) {
                var Ee = e.read_shift(2);
                if (Q -= 2, !L.enc && Ee !== te && ((Ee & 255) << 8 | Ee >> 8) !== te) throw new Error("rt mismatch: " + Ee + "!=" + te);
                Z.r == 12 && (e.l += 10, Q -= 10)
            }
            var y = {};
            if (te === 10 ? y = Z.f(e, Q, L) : y = fm(te, Z, e, Q, L), ge == 0 && [9, 521, 1033, 2057].indexOf(de) === -1) continue;
            switch (te) {
                case 34:
                    r.opts.Date1904 = F.WBProps.date1904 = y;
                    break;
                case 134:
                    r.opts.WriteProtect = !0;
                    break;
                case 47:
                    if (L.enc || (e.l = 0), L.enc = y, !t.password) throw new Error("File is password-protected");
                    if (y.valid == null) throw new Error("Encryption scheme unsupported");
                    if (!y.valid) throw new Error("Password is incorrect");
                    break;
                case 92:
                    L.lastuser = y;
                    break;
                case 66:
                    var Be = Number(y);
                    switch (Be) {
                        case 21010:
                            Be = 1200;
                            break;
                        case 32768:
                            Be = 1e4;
                            break;
                        case 32769:
                            Be = 1252;
                            break
                    }
                    zr(L.codepage = Be), j = !0;
                    break;
                case 317:
                    L.rrtabid = y;
                    break;
                case 25:
                    L.winlocked = y;
                    break;
                case 439:
                    r.opts.RefreshAll = y;
                    break;
                case 12:
                    r.opts.CalcCount = y;
                    break;
                case 16:
                    r.opts.CalcDelta = y;
                    break;
                case 17:
                    r.opts.CalcIter = y;
                    break;
                case 13:
                    r.opts.CalcMode = y;
                    break;
                case 14:
                    r.opts.CalcPrecision = y;
                    break;
                case 95:
                    r.opts.CalcSaveRecalc = y;
                    break;
                case 15:
                    L.CalcRefMode = y;
                    break;
                case 2211:
                    r.opts.FullCalc = y;
                    break;
                case 129:
                    y.fDialog && (n["!type"] = "dialog"), y.fBelow || ((n["!outline"] || (n["!outline"] = {})).above = !0), y.fRight || ((n["!outline"] || (n["!outline"] = {})).left = !0);
                    break;
                case 224:
                    b.push(y);
                    break;
                case 430:
                    V.push([y]), V[V.length - 1].XTI = [];
                    break;
                case 35:
                case 547:
                    V[V.length - 1].push(y);
                    break;
                case 24:
                case 536:
                    R = {
                        Name: y.Name,
                        Ref: dr(y.rgce, s, null, V, L)
                    }, y.itab > 0 && (R.Sheet = y.itab - 1), V.names.push(R), V[0] || (V[0] = [], V[0].XTI = []), V[V.length - 1].push(y), y.Name == "_xlnm._FilterDatabase" && y.itab > 0 && y.rgce && y.rgce[0] && y.rgce[0][0] && y.rgce[0][0][0] == "PtgArea3d" && (D[y.itab - 1] = {
                        ref: we(y.rgce[0][0][1][2])
                    });
                    break;
                case 22:
                    L.ExternCount = y;
                    break;
                case 23:
                    V.length == 0 && (V[0] = [], V[0].XTI = []), V[V.length - 1].XTI = V[V.length - 1].XTI.concat(y), V.XTI = V.XTI.concat(y);
                    break;
                case 2196:
                    if (L.biff < 8) break;
                    R != null && (R.Comment = y[1]);
                    break;
                case 18:
                    n["!protect"] = y;
                    break;
                case 19:
                    y !== 0 && L.WTF && console.error("Password verifier: " + y);
                    break;
                case 133:
                    i[y.pos] = y, L.snames.push(y.name);
                    break;
                case 10: {
                    if (--ge) break;
                    if (s.e) {
                        if (s.e.r > 0 && s.e.c > 0) {
                            if (s.e.r--, s.e.c--, n["!ref"] = we(s), t.sheetRows && t.sheetRows <= s.e.r) {
                                var ye = s.e.r;
                                s.e.r = t.sheetRows - 1, n["!fullref"] = n["!ref"], n["!ref"] = we(s), s.e.r = ye
                            }
                            s.e.r++, s.e.c++
                        }
                        le.length > 0 && (n["!merges"] = le), ie.length > 0 && (n["!objects"] = ie), ue.length > 0 && (n["!cols"] = ue), ce.length > 0 && (n["!rows"] = ce), F.Sheets.push(B)
                    }
                    o === "" ? l = n : a[o] = n, n = t.dense ? [] : {}
                }
                break;
                case 9:
                case 521:
                case 1033:
                case 2057: {
                    if (L.biff === 8 && (L.biff = {
                            9: 2,
                            521: 3,
                            1033: 4
                        } [te] || {
                            512: 2,
                            768: 3,
                            1024: 4,
                            1280: 5,
                            1536: 8,
                            2: 2,
                            7: 2
                        } [y.BIFFVer] || 8), L.biffguess = y.BIFFVer == 0, y.BIFFVer == 0 && y.dt == 4096 && (L.biff = 5, j = !0, zr(L.codepage = 28591)), L.biff == 8 && y.BIFFVer == 0 && y.dt == 16 && (L.biff = 2), ge++) break;
                    if (n = t.dense ? [] : {}, L.biff < 8 && !j && (j = !0, zr(L.codepage = t.codepage || 1252)), L.biff < 5 || y.BIFFVer == 0 && y.dt == 4096) {
                        o === "" && (o = "Sheet1"), s = {
                            s: {
                                r: 0,
                                c: 0
                            },
                            e: {
                                r: 0,
                                c: 0
                            }
                        };
                        var Le = {
                            pos: e.l - Q,
                            name: o
                        };
                        i[Le.pos] = Le, L.snames.push(o)
                    } else o = (i[re] || {
                        name: ""
                    }).name;
                    y.dt == 32 && (n["!type"] = "chart"), y.dt == 64 && (n["!type"] = "macro"), le = [], ie = [], L.arrayf = A = [], ue = [], ce = [], be = !1, B = {
                        Hidden: (i[re] || {
                            hs: 0
                        }).hs,
                        name: o
                    }
                }
                break;
                case 515:
                case 3:
                case 2:
                    n["!type"] == "chart" && (t.dense ? (n[y.r] || [])[y.c] : n[pe({
                        c: y.c,
                        r: y.r
                    })]) && ++y.c, g = {
                        ixfe: y.ixfe,
                        XF: b[y.ixfe] || {},
                        v: y.val,
                        t: "n"
                    }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t);
                    break;
                case 5:
                case 517:
                    g = {
                        ixfe: y.ixfe,
                        XF: b[y.ixfe],
                        v: y.val,
                        t: y.t
                    }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t);
                    break;
                case 638:
                    g = {
                        ixfe: y.ixfe,
                        XF: b[y.ixfe],
                        v: y.rknum,
                        t: "n"
                    }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t);
                    break;
                case 189:
                    for (var Ae = y.c; Ae <= y.C; ++Ae) {
                        var fe = y.rkrec[Ae - y.c][0];
                        g = {
                            ixfe: fe,
                            XF: b[fe],
                            v: y.rkrec[Ae - y.c][1],
                            t: "n"
                        }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                            c: Ae,
                            r: y.r
                        }, g, t)
                    }
                    break;
                case 6:
                case 518:
                case 1030: {
                    if (y.val == "String") {
                        f = y;
                        break
                    }
                    if (g = a0(y.val, y.cell.ixfe, y.tt), g.XF = b[g.ixfe], t.cellFormula) {
                        var je = y.formula;
                        if (je && je[0] && je[0][0] && je[0][0][0] == "PtgExp") {
                            var Nr = je[0][0][1][0],
                                Yr = je[0][0][1][1],
                                at = pe({
                                    r: Nr,
                                    c: Yr
                                });
                            k[at] ? g.f = "" + dr(y.formula, s, y.cell, V, L) : g.F = ((t.dense ? (n[Nr] || [])[Yr] : n[at]) || {}).F
                        } else g.f = "" + dr(y.formula, s, y.cell, V, L)
                    }
                    C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G(y.cell, g, t), f = y
                }
                break;
                case 7:
                case 519:
                    if (f) f.val = y, g = a0(y, f.cell.ixfe, "s"), g.XF = b[g.ixfe], t.cellFormula && (g.f = "" + dr(f.formula, s, f.cell, V, L)), C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G(f.cell, g, t), f = null;
                    else throw new Error("String record expects Formula");
                    break;
                case 33:
                case 545: {
                    A.push(y);
                    var oa = pe(y[0].s);
                    if (d = t.dense ? (n[y[0].s.r] || [])[y[0].s.c] : n[oa], t.cellFormula && d) {
                        if (!f || !oa || !d) break;
                        d.f = "" + dr(y[1], s, y[0], V, L), d.F = we(y[0])
                    }
                }
                break;
                case 1212: {
                    if (!t.cellFormula) break;
                    if (x) {
                        if (!f) break;
                        k[pe(f.cell)] = y[0], d = t.dense ? (n[f.cell.r] || [])[f.cell.c] : n[pe(f.cell)], (d || {}).f = "" + dr(y[0], s, h, V, L)
                    }
                }
                break;
                case 253:
                    g = a0(c[y.isst].t, y.ixfe, "s"), c[y.isst].h && (g.h = c[y.isst].h), g.XF = b[g.ixfe], C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t);
                    break;
                case 513:
                    t.sheetStubs && (g = {
                        ixfe: y.ixfe,
                        XF: b[y.ixfe],
                        t: "z"
                    }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t));
                    break;
                case 190:
                    if (t.sheetStubs)
                        for (var dt = y.c; dt <= y.C; ++dt) {
                            var yr = y.ixfe[dt - y.c];
                            g = {
                                ixfe: yr,
                                XF: b[yr],
                                t: "z"
                            }, C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                                c: dt,
                                r: y.r
                            }, g, t)
                        }
                    break;
                case 214:
                case 516:
                case 4:
                    g = a0(y.val, y.ixfe, "s"), g.XF = b[g.ixfe], C > 0 && (g.z = P[g.ixfe >> 8 & 63]), Zr(g, t, r.opts.Date1904), G({
                        c: y.c,
                        r: y.r
                    }, g, t);
                    break;
                case 0:
                case 512:
                    ge === 1 && (s = y);
                    break;
                case 252:
                    c = y;
                    break;
                case 1054:
                    if (L.biff == 4) {
                        P[C++] = y[1];
                        for (var nt = 0; nt < C + 163 && ve[nt] != y[1]; ++nt);
                        nt >= 163 && ct(y[1], C + 163)
                    } else ct(y[1], y[0]);
                    break;
                case 30: {
                    P[C++] = y;
                    for (var vt = 0; vt < C + 163 && ve[vt] != y; ++vt);
                    vt >= 163 && ct(y, C + 163)
                }
                break;
                case 229:
                    le = le.concat(y);
                    break;
                case 93:
                    ie[y.cmo[0]] = L.lastobj = y;
                    break;
                case 438:
                    L.lastobj.TxO = y;
                    break;
                case 127:
                    L.lastobj.ImData = y;
                    break;
                case 440:
                    for (p = y[0].s.r; p <= y[0].e.r; ++p)
                        for (u = y[0].s.c; u <= y[0].e.c; ++u) d = t.dense ? (n[p] || [])[u] : n[pe({
                            c: u,
                            r: p
                        })], d && (d.l = y[1]);
                    break;
                case 2048:
                    for (p = y[0].s.r; p <= y[0].e.r; ++p)
                        for (u = y[0].s.c; u <= y[0].e.c; ++u) d = t.dense ? (n[p] || [])[u] : n[pe({
                            c: u,
                            r: p
                        })], d && d.l && (d.l.Tooltip = y[1]);
                    break;
                case 28: {
                    if (L.biff <= 5 && L.biff >= 2) break;
                    d = t.dense ? (n[y[0].r] || [])[y[0].c] : n[pe(y[0])];
                    var la = ie[y[2]];
                    d || (t.dense ? (n[y[0].r] || (n[y[0].r] = []), d = n[y[0].r][y[0].c] = {
                        t: "z"
                    }) : d = n[pe(y[0])] = {
                        t: "z"
                    }, s.e.r = Math.max(s.e.r, y[0].r), s.s.r = Math.min(s.s.r, y[0].r), s.e.c = Math.max(s.e.c, y[0].c), s.s.c = Math.min(s.s.c, y[0].c)), d.c || (d.c = []), v = {
                        a: y[1],
                        t: la.TxO.t
                    }, d.c.push(v)
                }
                break;
                case 2173:
                    Y1(b[y.ixfe], y.ext);
                    break;
                case 125: {
                    if (!L.cellStyles) break;
                    for (; y.e >= y.s;) ue[y.e--] = {
                        width: y.w / 256,
                        level: y.level || 0,
                        hidden: !!(y.flags & 1)
                    }, be || (be = !0, yn(y.w / 256)), kt(ue[y.e + 1])
                }
                break;
                case 520: {
                    var wr = {};
                    y.level != null && (ce[y.r] = wr, wr.level = y.level), y.hidden && (ce[y.r] = wr, wr.hidden = !0), y.hpt && (ce[y.r] = wr, wr.hpt = y.hpt, wr.hpx = na(y.hpt))
                }
                break;
                case 38:
                case 39:
                case 40:
                case 41:
                    n["!margins"] || bt(n["!margins"] = {}), n["!margins"][{
                        38: "left",
                        39: "right",
                        40: "top",
                        41: "bottom"
                    } [te]] = y;
                    break;
                case 161:
                    n["!margins"] || bt(n["!margins"] = {}), n["!margins"].header = y.header, n["!margins"].footer = y.footer;
                    break;
                case 574:
                    y.RTL && (F.Views[0].RTL = !0);
                    break;
                case 146:
                    N = y;
                    break;
                case 2198:
                    J = y;
                    break;
                case 140:
                    O = y;
                    break;
                case 442:
                    o ? B.CodeName = y || B.name : F.WBProps.CodeName = y || "ThisWorkbook";
                    break
            }
        } else Z || console.error("Missing Info for XLS Record 0x" + te.toString(16)), e.l += Q
    }
    return r.SheetNames = Ke(i).sort(function(Jr, Se) {
        return Number(Jr) - Number(Se)
    }).map(function(Jr) {
        return i[Jr].name
    }), t.bookSheets || (r.Sheets = a), !r.SheetNames.length && l["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = l)) : r.Preamble = l, r.Sheets && D.forEach(function(Jr, Se) {
        r.Sheets[r.SheetNames[Se]]["!autofilter"] = Jr
    }), r.Strings = c, r.SSF = We(ve), L.enc && (r.Encryption = L.enc), J && (r.Themes = J), r.Metadata = {}, O !== void 0 && (r.Metadata.Country = O), V.names.length > 0 && (F.Names = V.names), r.Workbook = F, r
}
var Fa = {
    SI: "e0859ff2f94f6810ab9108002b27b3d9",
    DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
    UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};

function om(e, t, r) {
    var a = xe.find(e, "/!DocumentSummaryInformation");
    if (a && a.size > 0) try {
        var n = Ai(a, z0, Fa.DSI);
        for (var i in n) t[i] = n[i]
    } catch (o) {
        if (r.WTF) throw o
    }
    var s = xe.find(e, "/!SummaryInformation");
    if (s && s.size > 0) try {
        var f = Ai(s, $0, Fa.SI);
        for (var c in f) t[c] == null && (t[c] = f[c])
    } catch (o) {
        if (r.WTF) throw o
    }
    t.HeadingPairs && t.TitlesOfParts && (Ys(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts)
}

function lm(e, t) {
    var r = [],
        a = [],
        n = [],
        i = 0,
        s, f = ti(z0, "n"),
        c = ti($0, "n");
    if (e.Props)
        for (s = Ke(e.Props), i = 0; i < s.length; ++i)(Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Props[s[i]]]);
    if (e.Custprops)
        for (s = Ke(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? a : n).push([s[i], e.Custprops[s[i]]]);
    var o = [];
    for (i = 0; i < n.length; ++i) tf.indexOf(n[i][0]) > -1 || js.indexOf(n[i][0]) > -1 || n[i][1] != null && o.push(n[i]);
    a.length && xe.utils.cfb_add(t, "/SummaryInformation", yi(a, Fa.SI, c, $0)), (r.length || o.length) && xe.utils.cfb_add(t, "/DocumentSummaryInformation", yi(r, Fa.DSI, f, z0, o.length ? o : null, Fa.UDI))
}

function qf(e, t) {
    t || (t = {}), Ln(t), tn(), t.codepage && rn(t.codepage);
    var r, a;
    if (e.FullPaths) {
        if (xe.find(e, "/encryption")) throw new Error("File is password-protected");
        r = xe.find(e, "!CompObj"), a = xe.find(e, "/Workbook") || xe.find(e, "/Book")
    } else {
        switch (t.type) {
            case "base64":
                e = Or(Rr(e));
                break;
            case "binary":
                e = Or(e);
                break;
            case "buffer":
                break;
            case "array":
                Array.isArray(e) || (e = Array.prototype.slice.call(e));
                break
        }
        or(e, 0), a = {
            content: e
        }
    }
    var n, i;
    if (r && im(r), t.bookProps && !t.bookSheets) n = {};
    else {
        var s = Te ? "buffer" : "array";
        if (a && a.content) n = cm(a.content, t);
        else if ((i = xe.find(e, "PerfectOffice_MAIN")) && i.content) n = Nt.to_workbook(i.content, (t.type = s, t));
        else if ((i = xe.find(e, "NativeContent_MAIN")) && i.content) n = Nt.to_workbook(i.content, (t.type = s, t));
        else throw (i = xe.find(e, "MN0")) && i.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
        t.bookVBA && e.FullPaths && xe.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (n.vbaraw = Tx(e))
    }
    var f = {};
    return e.FullPaths && om(e, f, t), n.Props = n.Custprops = f, t.bookFiles && (n.cfb = e), n
}

function hm(e, t) {
    var r = t || {},
        a = xe.utils.cfb_new({
            root: "R"
        }),
        n = "/Workbook";
    switch (r.bookType || "xls") {
        case "xls":
            r.bookType = "biff8";
        case "xla":
            r.bookType || (r.bookType = "xla");
        case "biff8":
            n = "/Workbook", r.biff = 8;
            break;
        case "biff5":
            n = "/Book", r.biff = 5;
            break;
        default:
            throw new Error("invalid type " + r.bookType + " for XLS CFB")
    }
    return xe.utils.cfb_add(a, n, Qf(e, r)), r.biff == 8 && (e.Props || e.Custprops) && lm(e, a), r.biff == 8 && e.vbaraw && Sx(a, xe.read(e.vbaraw, {
        type: typeof e.vbaraw == "string" ? "binary" : "buffer"
    })), a
}
var La = {
        0: {
            f: Pv
        },
        1: {
            f: Gv
        },
        2: {
            f: c2
        },
        3: {
            f: Zv
        },
        4: {
            f: Kv
        },
        5: {
            f: i2
        },
        6: {
            f: x2
        },
        7: {
            f: r2
        },
        8: {
            f: w2
        },
        9: {
            f: _2
        },
        10: {
            f: m2
        },
        11: {
            f: g2
        },
        12: {
            f: zv
        },
        13: {
            f: l2
        },
        14: {
            f: Qv
        },
        15: {
            f: Yv
        },
        16: {
            f: Xf
        },
        17: {
            f: v2
        },
        18: {
            f: a2
        },
        19: {
            f: mn
        },
        20: {},
        21: {},
        22: {},
        23: {},
        24: {},
        25: {},
        26: {},
        27: {},
        28: {},
        29: {},
        30: {},
        31: {},
        32: {},
        33: {},
        34: {},
        35: {
            T: 1
        },
        36: {
            T: -1
        },
        37: {
            T: 1
        },
        38: {
            T: -1
        },
        39: {
            f: vp
        },
        40: {},
        42: {},
        43: {
            f: x1
        },
        44: {
            f: h1
        },
        45: {
            f: p1
        },
        46: {
            f: g1
        },
        47: {
            f: m1
        },
        48: {},
        49: {
            f: Mo
        },
        50: {},
        51: {
            f: q1
        },
        52: {
            T: 1
        },
        53: {
            T: -1
        },
        54: {
            T: 1
        },
        55: {
            T: -1
        },
        56: {
            T: 1
        },
        57: {
            T: -1
        },
        58: {},
        59: {},
        60: {
            f: df
        },
        62: {
            f: u2
        },
        63: {
            f: fx
        },
        64: {
            f: L2
        },
        65: {},
        66: {},
        67: {},
        68: {},
        69: {},
        70: {},
        128: {},
        129: {
            T: 1
        },
        130: {
            T: -1
        },
        131: {
            T: 1,
            f: gr,
            p: 0
        },
        132: {
            T: -1
        },
        133: {
            T: 1
        },
        134: {
            T: -1
        },
        135: {
            T: 1
        },
        136: {
            T: -1
        },
        137: {
            T: 1,
            f: R2
        },
        138: {
            T: -1
        },
        139: {
            T: 1
        },
        140: {
            T: -1
        },
        141: {
            T: 1
        },
        142: {
            T: -1
        },
        143: {
            T: 1
        },
        144: {
            T: -1
        },
        145: {
            T: 1
        },
        146: {
            T: -1
        },
        147: {
            f: Hv
        },
        148: {
            f: Mv,
            p: 16
        },
        151: {
            f: A2
        },
        152: {},
        153: {
            f: up
        },
        154: {},
        155: {},
        156: {
            f: lp
        },
        157: {},
        158: {},
        159: {
            T: 1,
            f: Cu
        },
        160: {
            T: -1
        },
        161: {
            T: 1,
            f: zt
        },
        162: {
            T: -1
        },
        163: {
            T: 1
        },
        164: {
            T: -1
        },
        165: {
            T: 1
        },
        166: {
            T: -1
        },
        167: {},
        168: {},
        169: {},
        170: {},
        171: {},
        172: {
            T: 1
        },
        173: {
            T: -1
        },
        174: {},
        175: {},
        176: {
            f: k2
        },
        177: {
            T: 1
        },
        178: {
            T: -1
        },
        179: {
            T: 1
        },
        180: {
            T: -1
        },
        181: {
            T: 1
        },
        182: {
            T: -1
        },
        183: {
            T: 1
        },
        184: {
            T: -1
        },
        185: {
            T: 1
        },
        186: {
            T: -1
        },
        187: {
            T: 1
        },
        188: {
            T: -1
        },
        189: {
            T: 1
        },
        190: {
            T: -1
        },
        191: {
            T: 1
        },
        192: {
            T: -1
        },
        193: {
            T: 1
        },
        194: {
            T: -1
        },
        195: {
            T: 1
        },
        196: {
            T: -1
        },
        197: {
            T: 1
        },
        198: {
            T: -1
        },
        199: {
            T: 1
        },
        200: {
            T: -1
        },
        201: {
            T: 1
        },
        202: {
            T: -1
        },
        203: {
            T: 1
        },
        204: {
            T: -1
        },
        205: {
            T: 1
        },
        206: {
            T: -1
        },
        207: {
            T: 1
        },
        208: {
            T: -1
        },
        209: {
            T: 1
        },
        210: {
            T: -1
        },
        211: {
            T: 1
        },
        212: {
            T: -1
        },
        213: {
            T: 1
        },
        214: {
            T: -1
        },
        215: {
            T: 1
        },
        216: {
            T: -1
        },
        217: {
            T: 1
        },
        218: {
            T: -1
        },
        219: {
            T: 1
        },
        220: {
            T: -1
        },
        221: {
            T: 1
        },
        222: {
            T: -1
        },
        223: {
            T: 1
        },
        224: {
            T: -1
        },
        225: {
            T: 1
        },
        226: {
            T: -1
        },
        227: {
            T: 1
        },
        228: {
            T: -1
        },
        229: {
            T: 1
        },
        230: {
            T: -1
        },
        231: {
            T: 1
        },
        232: {
            T: -1
        },
        233: {
            T: 1
        },
        234: {
            T: -1
        },
        235: {
            T: 1
        },
        236: {
            T: -1
        },
        237: {
            T: 1
        },
        238: {
            T: -1
        },
        239: {
            T: 1
        },
        240: {
            T: -1
        },
        241: {
            T: 1
        },
        242: {
            T: -1
        },
        243: {
            T: 1
        },
        244: {
            T: -1
        },
        245: {
            T: 1
        },
        246: {
            T: -1
        },
        247: {
            T: 1
        },
        248: {
            T: -1
        },
        249: {
            T: 1
        },
        250: {
            T: -1
        },
        251: {
            T: 1
        },
        252: {
            T: -1
        },
        253: {
            T: 1
        },
        254: {
            T: -1
        },
        255: {
            T: 1
        },
        256: {
            T: -1
        },
        257: {
            T: 1
        },
        258: {
            T: -1
        },
        259: {
            T: 1
        },
        260: {
            T: -1
        },
        261: {
            T: 1
        },
        262: {
            T: -1
        },
        263: {
            T: 1
        },
        264: {
            T: -1
        },
        265: {
            T: 1
        },
        266: {
            T: -1
        },
        267: {
            T: 1
        },
        268: {
            T: -1
        },
        269: {
            T: 1
        },
        270: {
            T: -1
        },
        271: {
            T: 1
        },
        272: {
            T: -1
        },
        273: {
            T: 1
        },
        274: {
            T: -1
        },
        275: {
            T: 1
        },
        276: {
            T: -1
        },
        277: {},
        278: {
            T: 1
        },
        279: {
            T: -1
        },
        280: {
            T: 1
        },
        281: {
            T: -1
        },
        282: {
            T: 1
        },
        283: {
            T: 1
        },
        284: {
            T: -1
        },
        285: {
            T: 1
        },
        286: {
            T: -1
        },
        287: {
            T: 1
        },
        288: {
            T: -1
        },
        289: {
            T: 1
        },
        290: {
            T: -1
        },
        291: {
            T: 1
        },
        292: {
            T: -1
        },
        293: {
            T: 1
        },
        294: {
            T: -1
        },
        295: {
            T: 1
        },
        296: {
            T: -1
        },
        297: {
            T: 1
        },
        298: {
            T: -1
        },
        299: {
            T: 1
        },
        300: {
            T: -1
        },
        301: {
            T: 1
        },
        302: {
            T: -1
        },
        303: {
            T: 1
        },
        304: {
            T: -1
        },
        305: {
            T: 1
        },
        306: {
            T: -1
        },
        307: {
            T: 1
        },
        308: {
            T: -1
        },
        309: {
            T: 1
        },
        310: {
            T: -1
        },
        311: {
            T: 1
        },
        312: {
            T: -1
        },
        313: {
            T: -1
        },
        314: {
            T: 1
        },
        315: {
            T: -1
        },
        316: {
            T: 1
        },
        317: {
            T: -1
        },
        318: {
            T: 1
        },
        319: {
            T: -1
        },
        320: {
            T: 1
        },
        321: {
            T: -1
        },
        322: {
            T: 1
        },
        323: {
            T: -1
        },
        324: {
            T: 1
        },
        325: {
            T: -1
        },
        326: {
            T: 1
        },
        327: {
            T: -1
        },
        328: {
            T: 1
        },
        329: {
            T: -1
        },
        330: {
            T: 1
        },
        331: {
            T: -1
        },
        332: {
            T: 1
        },
        333: {
            T: -1
        },
        334: {
            T: 1
        },
        335: {
            f: J1
        },
        336: {
            T: -1
        },
        337: {
            f: rx,
            T: 1
        },
        338: {
            T: -1
        },
        339: {
            T: 1
        },
        340: {
            T: -1
        },
        341: {
            T: 1
        },
        342: {
            T: -1
        },
        343: {
            T: 1
        },
        344: {
            T: -1
        },
        345: {
            T: 1
        },
        346: {
            T: -1
        },
        347: {
            T: 1
        },
        348: {
            T: -1
        },
        349: {
            T: 1
        },
        350: {
            T: -1
        },
        351: {},
        352: {},
        353: {
            T: 1
        },
        354: {
            T: -1
        },
        355: {
            f: X0
        },
        357: {},
        358: {},
        359: {},
        360: {
            T: 1
        },
        361: {},
        362: {
            f: xf
        },
        363: {},
        364: {},
        366: {},
        367: {},
        368: {},
        369: {},
        370: {},
        371: {},
        372: {
            T: 1
        },
        373: {
            T: -1
        },
        374: {
            T: 1
        },
        375: {
            T: -1
        },
        376: {
            T: 1
        },
        377: {
            T: -1
        },
        378: {
            T: 1
        },
        379: {
            T: -1
        },
        380: {
            T: 1
        },
        381: {
            T: -1
        },
        382: {
            T: 1
        },
        383: {
            T: -1
        },
        384: {
            T: 1
        },
        385: {
            T: -1
        },
        386: {
            T: 1
        },
        387: {
            T: -1
        },
        388: {
            T: 1
        },
        389: {
            T: -1
        },
        390: {
            T: 1
        },
        391: {
            T: -1
        },
        392: {
            T: 1
        },
        393: {
            T: -1
        },
        394: {
            T: 1
        },
        395: {
            T: -1
        },
        396: {},
        397: {},
        398: {},
        399: {},
        400: {},
        401: {
            T: 1
        },
        403: {},
        404: {},
        405: {},
        406: {},
        407: {},
        408: {},
        409: {},
        410: {},
        411: {},
        412: {},
        413: {},
        414: {},
        415: {},
        416: {},
        417: {},
        418: {},
        419: {},
        420: {},
        421: {},
        422: {
            T: 1
        },
        423: {
            T: 1
        },
        424: {
            T: -1
        },
        425: {
            T: -1
        },
        426: {
            f: y2
        },
        427: {
            f: C2
        },
        428: {},
        429: {
            T: 1
        },
        430: {
            T: -1
        },
        431: {
            T: 1
        },
        432: {
            T: -1
        },
        433: {
            T: 1
        },
        434: {
            T: -1
        },
        435: {
            T: 1
        },
        436: {
            T: -1
        },
        437: {
            T: 1
        },
        438: {
            T: -1
        },
        439: {
            T: 1
        },
        440: {
            T: -1
        },
        441: {
            T: 1
        },
        442: {
            T: -1
        },
        443: {
            T: 1
        },
        444: {
            T: -1
        },
        445: {
            T: 1
        },
        446: {
            T: -1
        },
        447: {
            T: 1
        },
        448: {
            T: -1
        },
        449: {
            T: 1
        },
        450: {
            T: -1
        },
        451: {
            T: 1
        },
        452: {
            T: -1
        },
        453: {
            T: 1
        },
        454: {
            T: -1
        },
        455: {
            T: 1
        },
        456: {
            T: -1
        },
        457: {
            T: 1
        },
        458: {
            T: -1
        },
        459: {
            T: 1
        },
        460: {
            T: -1
        },
        461: {
            T: 1
        },
        462: {
            T: -1
        },
        463: {
            T: 1
        },
        464: {
            T: -1
        },
        465: {
            T: 1
        },
        466: {
            T: -1
        },
        467: {
            T: 1
        },
        468: {
            T: -1
        },
        469: {
            T: 1
        },
        470: {
            T: -1
        },
        471: {},
        472: {},
        473: {
            T: 1
        },
        474: {
            T: -1
        },
        475: {},
        476: {
            f: O2
        },
        477: {},
        478: {},
        479: {
            T: 1
        },
        480: {
            T: -1
        },
        481: {
            T: 1
        },
        482: {
            T: -1
        },
        483: {
            T: 1
        },
        484: {
            T: -1
        },
        485: {
            f: Wv
        },
        486: {
            T: 1
        },
        487: {
            T: -1
        },
        488: {
            T: 1
        },
        489: {
            T: -1
        },
        490: {
            T: 1
        },
        491: {
            T: -1
        },
        492: {
            T: 1
        },
        493: {
            T: -1
        },
        494: {
            f: S2
        },
        495: {
            T: 1
        },
        496: {
            T: -1
        },
        497: {
            T: 1
        },
        498: {
            T: -1
        },
        499: {},
        500: {
            T: 1
        },
        501: {
            T: -1
        },
        502: {
            T: 1
        },
        503: {
            T: -1
        },
        504: {},
        505: {
            T: 1
        },
        506: {
            T: -1
        },
        507: {},
        508: {
            T: 1
        },
        509: {
            T: -1
        },
        510: {
            T: 1
        },
        511: {
            T: -1
        },
        512: {},
        513: {},
        514: {
            T: 1
        },
        515: {
            T: -1
        },
        516: {
            T: 1
        },
        517: {
            T: -1
        },
        518: {
            T: 1
        },
        519: {
            T: -1
        },
        520: {
            T: 1
        },
        521: {
            T: -1
        },
        522: {},
        523: {},
        524: {},
        525: {},
        526: {},
        527: {},
        528: {
            T: 1
        },
        529: {
            T: -1
        },
        530: {
            T: 1
        },
        531: {
            T: -1
        },
        532: {
            T: 1
        },
        533: {
            T: -1
        },
        534: {},
        535: {},
        536: {},
        537: {},
        538: {
            T: 1
        },
        539: {
            T: -1
        },
        540: {
            T: 1
        },
        541: {
            T: -1
        },
        542: {
            T: 1
        },
        548: {},
        549: {},
        550: {
            f: X0
        },
        551: {},
        552: {},
        553: {},
        554: {
            T: 1
        },
        555: {
            T: -1
        },
        556: {
            T: 1
        },
        557: {
            T: -1
        },
        558: {
            T: 1
        },
        559: {
            T: -1
        },
        560: {
            T: 1
        },
        561: {
            T: -1
        },
        562: {},
        564: {},
        565: {
            T: 1
        },
        566: {
            T: -1
        },
        569: {
            T: 1
        },
        570: {
            T: -1
        },
        572: {},
        573: {
            T: 1
        },
        574: {
            T: -1
        },
        577: {},
        578: {},
        579: {},
        580: {},
        581: {},
        582: {},
        583: {},
        584: {},
        585: {},
        586: {},
        587: {},
        588: {
            T: -1
        },
        589: {},
        590: {
            T: 1
        },
        591: {
            T: -1
        },
        592: {
            T: 1
        },
        593: {
            T: -1
        },
        594: {
            T: 1
        },
        595: {
            T: -1
        },
        596: {},
        597: {
            T: 1
        },
        598: {
            T: -1
        },
        599: {
            T: 1
        },
        600: {
            T: -1
        },
        601: {
            T: 1
        },
        602: {
            T: -1
        },
        603: {
            T: 1
        },
        604: {
            T: -1
        },
        605: {
            T: 1
        },
        606: {
            T: -1
        },
        607: {},
        608: {
            T: 1
        },
        609: {
            T: -1
        },
        610: {},
        611: {
            T: 1
        },
        612: {
            T: -1
        },
        613: {
            T: 1
        },
        614: {
            T: -1
        },
        615: {
            T: 1
        },
        616: {
            T: -1
        },
        617: {
            T: 1
        },
        618: {
            T: -1
        },
        619: {
            T: 1
        },
        620: {
            T: -1
        },
        625: {},
        626: {
            T: 1
        },
        627: {
            T: -1
        },
        628: {
            T: 1
        },
        629: {
            T: -1
        },
        630: {
            T: 1
        },
        631: {
            T: -1
        },
        632: {
            f: gx
        },
        633: {
            T: 1
        },
        634: {
            T: -1
        },
        635: {
            T: 1,
            f: px
        },
        636: {
            T: -1
        },
        637: {
            f: Vo
        },
        638: {
            T: 1
        },
        639: {},
        640: {
            T: -1
        },
        641: {
            T: 1
        },
        642: {
            T: -1
        },
        643: {
            T: 1
        },
        644: {},
        645: {
            T: -1
        },
        646: {
            T: 1
        },
        648: {
            T: 1
        },
        649: {},
        650: {
            T: -1
        },
        651: {
            f: Q2
        },
        652: {},
        653: {
            T: 1
        },
        654: {
            T: -1
        },
        655: {
            T: 1
        },
        656: {
            T: -1
        },
        657: {
            T: 1
        },
        658: {
            T: -1
        },
        659: {},
        660: {
            T: 1
        },
        661: {},
        662: {
            T: -1
        },
        663: {},
        664: {
            T: 1
        },
        665: {},
        666: {
            T: -1
        },
        667: {},
        668: {},
        669: {},
        671: {
            T: 1
        },
        672: {
            T: -1
        },
        673: {
            T: 1
        },
        674: {
            T: -1
        },
        675: {},
        676: {},
        677: {},
        678: {},
        679: {},
        680: {},
        681: {},
        1024: {},
        1025: {},
        1026: {
            T: 1
        },
        1027: {
            T: -1
        },
        1028: {
            T: 1
        },
        1029: {
            T: -1
        },
        1030: {},
        1031: {
            T: 1
        },
        1032: {
            T: -1
        },
        1033: {
            T: 1
        },
        1034: {
            T: -1
        },
        1035: {},
        1036: {},
        1037: {},
        1038: {
            T: 1
        },
        1039: {
            T: -1
        },
        1040: {},
        1041: {
            T: 1
        },
        1042: {
            T: -1
        },
        1043: {},
        1044: {},
        1045: {},
        1046: {
            T: 1
        },
        1047: {
            T: -1
        },
        1048: {
            T: 1
        },
        1049: {
            T: -1
        },
        1050: {},
        1051: {
            T: 1
        },
        1052: {
            T: 1
        },
        1053: {
            f: B2
        },
        1054: {
            T: 1
        },
        1055: {},
        1056: {
            T: 1
        },
        1057: {
            T: -1
        },
        1058: {
            T: 1
        },
        1059: {
            T: -1
        },
        1061: {},
        1062: {
            T: 1
        },
        1063: {
            T: -1
        },
        1064: {
            T: 1
        },
        1065: {
            T: -1
        },
        1066: {
            T: 1
        },
        1067: {
            T: -1
        },
        1068: {
            T: 1
        },
        1069: {
            T: -1
        },
        1070: {
            T: 1
        },
        1071: {
            T: -1
        },
        1072: {
            T: 1
        },
        1073: {
            T: -1
        },
        1075: {
            T: 1
        },
        1076: {
            T: -1
        },
        1077: {
            T: 1
        },
        1078: {
            T: -1
        },
        1079: {
            T: 1
        },
        1080: {
            T: -1
        },
        1081: {
            T: 1
        },
        1082: {
            T: -1
        },
        1083: {
            T: 1
        },
        1084: {
            T: -1
        },
        1085: {},
        1086: {
            T: 1
        },
        1087: {
            T: -1
        },
        1088: {
            T: 1
        },
        1089: {
            T: -1
        },
        1090: {
            T: 1
        },
        1091: {
            T: -1
        },
        1092: {
            T: 1
        },
        1093: {
            T: -1
        },
        1094: {
            T: 1
        },
        1095: {
            T: -1
        },
        1096: {},
        1097: {
            T: 1
        },
        1098: {},
        1099: {
            T: -1
        },
        1100: {
            T: 1
        },
        1101: {
            T: -1
        },
        1102: {},
        1103: {},
        1104: {},
        1105: {},
        1111: {},
        1112: {},
        1113: {
            T: 1
        },
        1114: {
            T: -1
        },
        1115: {
            T: 1
        },
        1116: {
            T: -1
        },
        1117: {},
        1118: {
            T: 1
        },
        1119: {
            T: -1
        },
        1120: {
            T: 1
        },
        1121: {
            T: -1
        },
        1122: {
            T: 1
        },
        1123: {
            T: -1
        },
        1124: {
            T: 1
        },
        1125: {
            T: -1
        },
        1126: {},
        1128: {
            T: 1
        },
        1129: {
            T: -1
        },
        1130: {},
        1131: {
            T: 1
        },
        1132: {
            T: -1
        },
        1133: {
            T: 1
        },
        1134: {
            T: -1
        },
        1135: {
            T: 1
        },
        1136: {
            T: -1
        },
        1137: {
            T: 1
        },
        1138: {
            T: -1
        },
        1139: {
            T: 1
        },
        1140: {
            T: -1
        },
        1141: {},
        1142: {
            T: 1
        },
        1143: {
            T: -1
        },
        1144: {
            T: 1
        },
        1145: {
            T: -1
        },
        1146: {},
        1147: {
            T: 1
        },
        1148: {
            T: -1
        },
        1149: {
            T: 1
        },
        1150: {
            T: -1
        },
        1152: {
            T: 1
        },
        1153: {
            T: -1
        },
        1154: {
            T: -1
        },
        1155: {
            T: -1
        },
        1156: {
            T: -1
        },
        1157: {
            T: 1
        },
        1158: {
            T: -1
        },
        1159: {
            T: 1
        },
        1160: {
            T: -1
        },
        1161: {
            T: 1
        },
        1162: {
            T: -1
        },
        1163: {
            T: 1
        },
        1164: {
            T: -1
        },
        1165: {
            T: 1
        },
        1166: {
            T: -1
        },
        1167: {
            T: 1
        },
        1168: {
            T: -1
        },
        1169: {
            T: 1
        },
        1170: {
            T: -1
        },
        1171: {},
        1172: {
            T: 1
        },
        1173: {
            T: -1
        },
        1177: {},
        1178: {
            T: 1
        },
        1180: {},
        1181: {},
        1182: {},
        2048: {
            T: 1
        },
        2049: {
            T: -1
        },
        2050: {},
        2051: {
            T: 1
        },
        2052: {
            T: -1
        },
        2053: {},
        2054: {},
        2055: {
            T: 1
        },
        2056: {
            T: -1
        },
        2057: {
            T: 1
        },
        2058: {
            T: -1
        },
        2060: {},
        2067: {},
        2068: {
            T: 1
        },
        2069: {
            T: -1
        },
        2070: {},
        2071: {},
        2072: {
            T: 1
        },
        2073: {
            T: -1
        },
        2075: {},
        2076: {},
        2077: {
            T: 1
        },
        2078: {
            T: -1
        },
        2079: {},
        2080: {
            T: 1
        },
        2081: {
            T: -1
        },
        2082: {},
        2083: {
            T: 1
        },
        2084: {
            T: -1
        },
        2085: {
            T: 1
        },
        2086: {
            T: -1
        },
        2087: {
            T: 1
        },
        2088: {
            T: -1
        },
        2089: {
            T: 1
        },
        2090: {
            T: -1
        },
        2091: {},
        2092: {},
        2093: {
            T: 1
        },
        2094: {
            T: -1
        },
        2095: {},
        2096: {
            T: 1
        },
        2097: {
            T: -1
        },
        2098: {
            T: 1
        },
        2099: {
            T: -1
        },
        2100: {
            T: 1
        },
        2101: {
            T: -1
        },
        2102: {},
        2103: {
            T: 1
        },
        2104: {
            T: -1
        },
        2105: {},
        2106: {
            T: 1
        },
        2107: {
            T: -1
        },
        2108: {},
        2109: {
            T: 1
        },
        2110: {
            T: -1
        },
        2111: {
            T: 1
        },
        2112: {
            T: -1
        },
        2113: {
            T: 1
        },
        2114: {
            T: -1
        },
        2115: {},
        2116: {},
        2117: {},
        2118: {
            T: 1
        },
        2119: {
            T: -1
        },
        2120: {},
        2121: {
            T: 1
        },
        2122: {
            T: -1
        },
        2123: {
            T: 1
        },
        2124: {
            T: -1
        },
        2125: {},
        2126: {
            T: 1
        },
        2127: {
            T: -1
        },
        2128: {},
        2129: {
            T: 1
        },
        2130: {
            T: -1
        },
        2131: {
            T: 1
        },
        2132: {
            T: -1
        },
        2133: {
            T: 1
        },
        2134: {},
        2135: {},
        2136: {},
        2137: {
            T: 1
        },
        2138: {
            T: -1
        },
        2139: {
            T: 1
        },
        2140: {
            T: -1
        },
        2141: {},
        3072: {},
        3073: {},
        4096: {
            T: 1
        },
        4097: {
            T: -1
        },
        5002: {
            T: 1
        },
        5003: {
            T: -1
        },
        5081: {
            T: 1
        },
        5082: {
            T: -1
        },
        5083: {},
        5084: {
            T: 1
        },
        5085: {
            T: -1
        },
        5086: {
            T: 1
        },
        5087: {
            T: -1
        },
        5088: {},
        5089: {},
        5090: {},
        5092: {
            T: 1
        },
        5093: {
            T: -1
        },
        5094: {},
        5095: {
            T: 1
        },
        5096: {
            T: -1
        },
        5097: {},
        5099: {},
        65535: {
            n: ""
        }
    },
    q0 = {
        6: {
            f: L0
        },
        10: {
            f: pt
        },
        12: {
            f: rr
        },
        13: {
            f: rr
        },
        14: {
            f: Je
        },
        15: {
            f: Je
        },
        16: {
            f: pr
        },
        17: {
            f: Je
        },
        18: {
            f: Je
        },
        19: {
            f: rr
        },
        20: {
            f: Ni
        },
        21: {
            f: Ni
        },
        23: {
            f: xf
        },
        24: {
            f: Pi
        },
        25: {
            f: Je
        },
        26: {},
        27: {},
        28: {
            f: Bh
        },
        29: {},
        34: {
            f: Je
        },
        35: {
            f: bi
        },
        38: {
            f: pr
        },
        39: {
            f: pr
        },
        40: {
            f: pr
        },
        41: {
            f: pr
        },
        42: {
            f: Je
        },
        43: {
            f: Je
        },
        47: {
            f: Yu
        },
        49: {
            f: lh
        },
        51: {
            f: rr
        },
        60: {},
        61: {
            f: ih
        },
        64: {
            f: Je
        },
        65: {
            f: oh
        },
        66: {
            f: rr
        },
        77: {},
        80: {},
        81: {},
        82: {},
        85: {
            f: rr
        },
        89: {},
        90: {},
        91: {},
        92: {
            f: jl
        },
        93: {
            f: Wh
        },
        94: {},
        95: {
            f: Je
        },
        96: {},
        97: {},
        99: {
            f: Je
        },
        125: {
            f: df
        },
        128: {
            f: Fh
        },
        129: {
            f: Jl
        },
        130: {
            f: rr
        },
        131: {
            f: Je
        },
        132: {
            f: Je
        },
        133: {
            f: Zl
        },
        134: {},
        140: {
            f: jh
        },
        141: {
            f: rr
        },
        144: {},
        146: {
            f: Zh
        },
        151: {},
        152: {},
        153: {},
        154: {},
        155: {},
        156: {
            f: rr
        },
        157: {},
        158: {},
        160: {
            f: nu
        },
        161: {
            f: eu
        },
        174: {},
        175: {},
        176: {},
        177: {},
        178: {},
        180: {},
        181: {},
        182: {},
        184: {},
        185: {},
        189: {
            f: kh
        },
        190: {
            f: Eh
        },
        193: {
            f: pt
        },
        197: {},
        198: {},
        199: {},
        200: {},
        201: {},
        202: {
            f: Je
        },
        203: {},
        204: {},
        205: {},
        206: {},
        207: {},
        208: {},
        209: {},
        210: {},
        211: {},
        213: {},
        215: {},
        216: {},
        217: {},
        218: {
            f: rr
        },
        220: {},
        221: {
            f: Je
        },
        222: {},
        224: {
            f: Sh
        },
        225: {
            f: Kl
        },
        226: {
            f: pt
        },
        227: {},
        229: {
            f: Mh
        },
        233: {},
        235: {},
        236: {},
        237: {},
        239: {},
        240: {},
        241: {},
        242: {},
        244: {},
        245: {},
        246: {},
        247: {},
        248: {},
        249: {},
        251: {},
        252: {
            f: Ql
        },
        253: {
            f: uh
        },
        255: {
            f: rh
        },
        256: {},
        259: {},
        290: {},
        311: {},
        312: {},
        315: {},
        317: {
            f: af
        },
        318: {},
        319: {},
        320: {},
        330: {},
        331: {},
        333: {},
        334: {},
        335: {},
        336: {},
        337: {},
        338: {},
        339: {},
        340: {},
        351: {},
        352: {
            f: Je
        },
        353: {
            f: pt
        },
        401: {},
        402: {},
        403: {},
        404: {},
        405: {},
        406: {},
        407: {},
        408: {},
        425: {},
        426: {},
        427: {},
        428: {},
        429: {},
        430: {
            f: Oh
        },
        431: {
            f: Je
        },
        432: {},
        433: {},
        434: {},
        437: {},
        438: {
            f: Gh
        },
        439: {
            f: Je
        },
        440: {
            f: Xh
        },
        441: {},
        442: {
            f: Va
        },
        443: {},
        444: {
            f: rr
        },
        445: {},
        446: {},
        448: {
            f: pt
        },
        449: {
            f: nh,
            r: 2
        },
        450: {
            f: pt
        },
        512: {
            f: Oi
        },
        513: {
            f: au
        },
        515: {
            f: Ch
        },
        516: {
            f: dh
        },
        517: {
            f: Ri
        },
        519: {
            f: iu
        },
        520: {
            f: th
        },
        523: {},
        545: {
            f: Li
        },
        549: {
            f: Di
        },
        566: {},
        574: {
            f: fh
        },
        638: {
            f: wh
        },
        659: {},
        1048: {},
        1054: {
            f: ph
        },
        1084: {},
        1212: {
            f: bh
        },
        2048: {
            f: $h
        },
        2049: {},
        2050: {},
        2051: {},
        2052: {},
        2053: {},
        2054: {},
        2055: {},
        2056: {},
        2057: {
            f: e0
        },
        2058: {},
        2059: {},
        2060: {},
        2061: {},
        2062: {},
        2063: {},
        2064: {},
        2066: {},
        2067: {},
        2128: {},
        2129: {},
        2130: {},
        2131: {},
        2132: {},
        2133: {},
        2134: {},
        2135: {},
        2136: {},
        2137: {},
        2138: {},
        2146: {},
        2147: {
            r: 12
        },
        2148: {},
        2149: {},
        2150: {},
        2151: {
            f: pt
        },
        2152: {},
        2154: {},
        2155: {},
        2156: {},
        2161: {},
        2162: {},
        2164: {},
        2165: {},
        2166: {},
        2167: {},
        2168: {},
        2169: {},
        2170: {},
        2171: {},
        2172: {
            f: qh,
            r: 12
        },
        2173: {
            f: j1,
            r: 12
        },
        2174: {},
        2175: {},
        2180: {},
        2181: {},
        2182: {},
        2183: {},
        2184: {},
        2185: {},
        2186: {},
        2187: {},
        2188: {
            f: Je,
            r: 12
        },
        2189: {},
        2190: {
            r: 12
        },
        2191: {},
        2192: {},
        2194: {},
        2195: {},
        2196: {
            f: Nh,
            r: 12
        },
        2197: {},
        2198: {
            f: V1,
            r: 12
        },
        2199: {},
        2200: {},
        2201: {},
        2202: {
            f: Ph,
            r: 12
        },
        2203: {
            f: pt
        },
        2204: {},
        2205: {},
        2206: {},
        2207: {},
        2211: {
            f: ah
        },
        2212: {},
        2213: {},
        2214: {},
        2215: {},
        4097: {},
        4098: {},
        4099: {},
        4102: {},
        4103: {},
        4105: {},
        4106: {},
        4107: {},
        4108: {},
        4109: {},
        4116: {},
        4117: {},
        4118: {},
        4119: {},
        4120: {},
        4121: {},
        4122: {},
        4123: {},
        4124: {},
        4125: {},
        4126: {},
        4127: {},
        4128: {},
        4129: {},
        4130: {},
        4132: {},
        4133: {},
        4134: {
            f: rr
        },
        4135: {},
        4146: {},
        4147: {},
        4148: {},
        4149: {},
        4154: {},
        4156: {},
        4157: {},
        4158: {},
        4159: {},
        4160: {},
        4161: {},
        4163: {},
        4164: {
            f: ru
        },
        4165: {},
        4166: {},
        4168: {},
        4170: {},
        4171: {},
        4174: {},
        4175: {},
        4176: {},
        4177: {},
        4187: {},
        4188: {
            f: Jh
        },
        4189: {},
        4191: {},
        4192: {},
        4193: {},
        4194: {},
        4195: {},
        4196: {},
        4197: {},
        4198: {},
        4199: {},
        4200: {},
        0: {
            f: Oi
        },
        1: {},
        2: {
            f: lu
        },
        3: {
            f: cu
        },
        4: {
            f: fu
        },
        5: {
            f: Ri
        },
        7: {
            f: uu
        },
        8: {},
        9: {
            f: e0
        },
        11: {},
        22: {
            f: rr
        },
        30: {
            f: gh
        },
        31: {},
        32: {},
        33: {
            f: Li
        },
        36: {},
        37: {
            f: Di
        },
        50: {
            f: xu
        },
        62: {},
        52: {},
        67: {},
        68: {
            f: rr
        },
        69: {},
        86: {},
        126: {},
        127: {
            f: su
        },
        135: {},
        136: {},
        137: {},
        145: {},
        148: {},
        149: {},
        150: {},
        169: {},
        171: {},
        188: {},
        191: {},
        192: {},
        194: {},
        195: {},
        214: {
            f: du
        },
        223: {},
        234: {},
        354: {},
        421: {},
        518: {
            f: L0
        },
        521: {
            f: e0
        },
        536: {
            f: Pi
        },
        547: {
            f: bi
        },
        561: {},
        579: {},
        1030: {
            f: L0
        },
        1033: {
            f: e0
        },
        1091: {},
        2157: {},
        2163: {},
        2177: {},
        2240: {},
        2241: {},
        2242: {},
        2243: {},
        2244: {},
        2245: {},
        2246: {},
        2247: {},
        2248: {},
        2249: {},
        2250: {},
        2251: {},
        2262: {
            r: 12
        },
        29282: {}
    };

function ne(e, t, r, a) {
    var n = t;
    if (!isNaN(n)) {
        var i = a || (r || []).length || 0,
            s = e.next(4);
        s.write_shift(2, n), s.write_shift(2, i), i > 0 && dn(r) && e.push(r)
    }
}

function um(e, t, r, a) {
    var n = (r || []).length || 0;
    if (n <= 8224) return ne(e, t, r, n);
    var i = t;
    if (!isNaN(i)) {
        for (var s = r.parts || [], f = 0, c = 0, o = 0; o + (s[f] || 8224) <= 8224;) o += s[f] || 8224, f++;
        var l = e.next(4);
        for (l.write_shift(2, i), l.write_shift(2, o), e.push(r.slice(c, c + o)), c += o; c < n;) {
            for (l = e.next(4), l.write_shift(2, 60), o = 0; o + (s[f] || 8224) <= 8224;) o += s[f] || 8224, f++;
            l.write_shift(2, o), e.push(r.slice(c, c + o)), c += o
        }
    }
}

function $a(e, t, r) {
    return e || (e = X(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e
}

function xm(e, t, r, a) {
    var n = X(9);
    return $a(n, e, t), nf(r, a || "b", n), n
}

function dm(e, t, r) {
    var a = X(8 + 2 * r.length);
    return $a(a, e, t), a.write_shift(1, r.length), a.write_shift(r.length, r, "sbcs"), a.l < a.length ? a.slice(0, a.l) : a
}

function vm(e, t, r, a) {
    if (t.v != null) switch (t.t) {
        case "d":
        case "n":
            var n = t.t == "d" ? nr(Ue(t.v)) : t.v;
            n == (n | 0) && n >= 0 && n < 65536 ? ne(e, 2, hu(r, a, n)) : ne(e, 3, ou(r, a, n));
            return;
        case "b":
        case "e":
            ne(e, 5, xm(r, a, t.v, t.t));
            return;
        case "s":
        case "str":
            ne(e, 4, dm(r, a, (t.v || "").slice(0, 255)));
            return
    }
    ne(e, 1, $a(null, r, a))
}

function pm(e, t, r, a) {
    var n = Array.isArray(t),
        i = De(t["!ref"] || "A1"),
        s, f = "",
        c = [];
    if (i.e.c > 255 || i.e.r > 16383) {
        if (a.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
        i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = we(i)
    }
    for (var o = i.s.r; o <= i.e.r; ++o) {
        f = Ze(o);
        for (var l = i.s.c; l <= i.e.c; ++l) {
            o === i.s.r && (c[l] = Ge(l)), s = c[l] + f;
            var h = n ? (t[o] || [])[l] : t[s];
            h && vm(e, h, o, l)
        }
    }
}

function mm(e, t) {
    for (var r = t || {}, a = Fr(), n = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (n = i);
    if (n == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
    return ne(a, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, Sn(e, 16, r)), pm(a, e.Sheets[e.SheetNames[n]], n, r), ne(a, 10), a.end()
}

function gm(e, t, r) {
    ne(e, 49, hh({
        sz: 12,
        color: {
            theme: 1
        },
        name: "Arial",
        family: 2,
        scheme: "minor"
    }, r))
}

function _m(e, t, r) {
    t && [
        [5, 8],
        [23, 26],
        [41, 44],
        [50, 392]
    ].forEach(function(a) {
        for (var n = a[0]; n <= a[1]; ++n) t[n] != null && ne(e, 1054, mh(n, t[n], r))
    })
}

function wm(e, t) {
    var r = X(19);
    r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), ne(e, 2151, r), r = X(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), lf(De(t["!ref"] || "A1"), r), r.write_shift(4, 4), ne(e, 2152, r)
}

function km(e, t) {
    for (var r = 0; r < 16; ++r) ne(e, 224, Ii({
        numFmtId: 0,
        style: !0
    }, 0, t));
    t.cellXfs.forEach(function(a) {
        ne(e, 224, Ii(a, 0, t))
    })
}

function Em(e, t) {
    for (var r = 0; r < t["!links"].length; ++r) {
        var a = t["!links"][r];
        ne(e, 440, zh(a)), a[1].Tooltip && ne(e, 2048, Kh(a))
    }
    delete t["!links"]
}

function Tm(e, t) {
    if (t) {
        var r = 0;
        t.forEach(function(a, n) {
            ++r <= 256 && a && ne(e, 125, Qh(A0(n, a), n))
        })
    }
}

function Sm(e, t, r, a, n) {
    var i = 16 + At(n.cellXfs, t, n);
    if (t.v == null && !t.bf) {
        ne(e, 513, Ut(r, a, i));
        return
    }
    if (t.bf) ne(e, 6, Jd(t, r, a, n, i));
    else switch (t.t) {
        case "d":
        case "n":
            var s = t.t == "d" ? nr(Ue(t.v)) : t.v;
            ne(e, 515, Dh(r, a, s, i));
            break;
        case "b":
        case "e":
            ne(e, 517, yh(r, a, t.v, i, n, t.t));
            break;
        case "s":
        case "str":
            if (n.bookSST) {
                var f = Rn(n.Strings, t.v, n.revStrings);
                ne(e, 253, xh(r, a, f, i))
            } else ne(e, 516, vh(r, a, (t.v || "").slice(0, 255), i, n));
            break;
        default:
            ne(e, 513, Ut(r, a, i))
    }
}

function Fm(e, t, r) {
    var a = Fr(),
        n = r.SheetNames[e],
        i = r.Sheets[n] || {},
        s = (r || {}).Workbook || {},
        f = (s.Sheets || [])[e] || {},
        c = Array.isArray(i),
        o = t.biff == 8,
        l, h = "",
        x = [],
        d = De(i["!ref"] || "A1"),
        v = o ? 65536 : 16384;
    if (d.e.c > 255 || d.e.r >= v) {
        if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
        d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, v - 1)
    }
    ne(a, 2057, Sn(r, 16, t)), ne(a, 13, Wr(1)), ne(a, 12, Wr(100)), ne(a, 15, Er(!0)), ne(a, 17, Er(!1)), ne(a, 16, Bt(.001)), ne(a, 95, Er(!0)), ne(a, 42, Er(!1)), ne(a, 43, Er(!1)), ne(a, 130, Wr(1)), ne(a, 128, Ah()), ne(a, 131, Er(!1)), ne(a, 132, Er(!1)), o && Tm(a, i["!cols"]), ne(a, 512, _h(d, t)), o && (i["!links"] = []);
    for (var u = d.s.r; u <= d.e.r; ++u) {
        h = Ze(u);
        for (var p = d.s.c; p <= d.e.c; ++p) {
            u === d.s.r && (x[p] = Ge(p)), l = x[p] + h;
            var k = c ? (i[u] || [])[p] : i[l];
            k && (Sm(a, k, u, p, t), o && k.l && i["!links"].push([l, k.l]))
        }
    }
    var A = f.CodeName || f.name || n;
    return o && ne(a, 574, ch((s.Views || [])[0])), o && (i["!merges"] || []).length && ne(a, 229, Uh(i["!merges"])), o && Em(a, i), ne(a, 442, sf(A)), o && wm(a, i), ne(a, 10), a.end()
}

function Am(e, t, r) {
    var a = Fr(),
        n = (e || {}).Workbook || {},
        i = n.Sheets || [],
        s = n.WBProps || {},
        f = r.biff == 8,
        c = r.biff == 5;
    if (ne(a, 2057, Sn(e, 5, r)), r.bookType == "xla" && ne(a, 135), ne(a, 225, f ? Wr(1200) : null), ne(a, 193, yl(2)), c && ne(a, 191), c && ne(a, 192), ne(a, 226), ne(a, 92, Yl("SheetJS", r)), ne(a, 66, Wr(f ? 1200 : 1252)), f && ne(a, 353, Wr(0)), f && ne(a, 448), ne(a, 317, tu(e.SheetNames.length)), f && e.vbaraw && ne(a, 211), f && e.vbaraw) {
        var o = s.CodeName || "ThisWorkbook";
        ne(a, 442, sf(o))
    }
    ne(a, 156, Wr(17)), ne(a, 25, Er(!1)), ne(a, 18, Er(!1)), ne(a, 19, Wr(0)), f && ne(a, 431, Er(!1)), f && ne(a, 444, Wr(0)), ne(a, 61, sh()), ne(a, 64, Er(!1)), ne(a, 141, Wr(0)), ne(a, 34, Er(np(e) == "true")), ne(a, 14, Er(!0)), f && ne(a, 439, Er(!1)), ne(a, 218, Wr(0)), gm(a, e, r), _m(a, e.SSF, r), km(a, r), f && ne(a, 352, Er(!1));
    var l = a.end(),
        h = Fr();
    f && ne(h, 140, Yh()), f && r.Strings && um(h, 252, eh(r.Strings)), ne(h, 10);
    var x = h.end(),
        d = Fr(),
        v = 0,
        u = 0;
    for (u = 0; u < e.SheetNames.length; ++u) v += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[u].length;
    var p = l.length + v + x.length;
    for (u = 0; u < e.SheetNames.length; ++u) {
        var k = i[u] || {};
        ne(d, 133, ql({
            pos: p,
            hs: k.Hidden || 0,
            dt: 0,
            name: e.SheetNames[u]
        }, r)), p += t[u].length
    }
    var A = d.end();
    if (v != A.length) throw new Error("BS8 " + v + " != " + A.length);
    var g = [];
    return l.length && g.push(l), A.length && g.push(A), x.length && g.push(x), sr(g)
}

function ym(e, t) {
    var r = t || {},
        a = [];
    e && !e.SSF && (e.SSF = We(ve)), e && e.SSF && (sa(), _0(e.SSF), r.revssf = k0(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = [], r.Strings.Count = 0, r.Strings.Unique = 0, Bn(r), r.cellXfs = [], At(r.cellXfs, {}, {
        revssf: {
            General: 0
        }
    }), e.Props || (e.Props = {});
    for (var n = 0; n < e.SheetNames.length; ++n) a[a.length] = Fm(n, r, e);
    return a.unshift(Am(e, a, r)), sr(a)
}

function Qf(e, t) {
    for (var r = 0; r <= e.SheetNames.length; ++r) {
        var a = e.Sheets[e.SheetNames[r]];
        if (!(!a || !a["!ref"])) {
            var n = Ar(a["!ref"]);
            n.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.")
        }
    }
    var i = t || {};
    switch (i.biff || 2) {
        case 8:
        case 5:
            return ym(e, t);
        case 4:
        case 3:
        case 2:
            return mm(e, t)
    }
    throw new Error("invalid type " + i.bookType + " for BIFF")
}

function $i(e, t) {
    var r = t || {},
        a = r.dense ? [] : {};
    e = e.replace(/<!--.*?-->/g, "");
    var n = e.match(/<table/i);
    if (!n) throw new Error("Invalid HTML: could not find <table>");
    var i = e.match(/<\/table/i),
        s = n.index,
        f = i && i.index || e.length,
        c = lo(e.slice(s, f), /(:?<tr[^>]*>)/i, "<tr>"),
        o = -1,
        l = 0,
        h = 0,
        x = 0,
        d = {
            s: {
                r: 1e7,
                c: 1e7
            },
            e: {
                r: 0,
                c: 0
            }
        },
        v = [];
    for (s = 0; s < c.length; ++s) {
        var u = c[s].trim(),
            p = u.slice(0, 3).toLowerCase();
        if (p == "<tr") {
            if (++o, r.sheetRows && r.sheetRows <= o) {
                --o;
                break
            }
            l = 0;
            continue
        }
        if (!(p != "<td" && p != "<th")) {
            var k = u.split(/<\/t[dh]>/i);
            for (f = 0; f < k.length; ++f) {
                var A = k[f].trim();
                if (A.match(/<t[dh]/i)) {
                    for (var g = A, O = 0; g.charAt(0) == "<" && (O = g.indexOf(">")) > -1;) g = g.slice(O + 1);
                    for (var b = 0; b < v.length; ++b) {
                        var N = v[b];
                        N.s.c == l && N.s.r < o && o <= N.e.r && (l = N.e.c + 1, b = -1)
                    }
                    var F = me(A.slice(0, A.indexOf(">")));
                    x = F.colspan ? +F.colspan : 1, ((h = +F.rowspan) > 1 || x > 1) && v.push({
                        s: {
                            r: o,
                            c: l
                        },
                        e: {
                            r: o + (h || 1) - 1,
                            c: l + x - 1
                        }
                    });
                    var B = F.t || F["data-t"] || "";
                    if (!g.length) {
                        l += x;
                        continue
                    }
                    if (g = Es(g), d.s.r > o && (d.s.r = o), d.e.r < o && (d.e.r = o), d.s.c > l && (d.s.c = l), d.e.c < l && (d.e.c = l), !g.length) {
                        l += x;
                        continue
                    }
                    var I = {
                        t: "s",
                        v: g
                    };
                    r.raw || !g.trim().length || B == "s" || (g === "TRUE" ? I = {
                        t: "b",
                        v: !0
                    } : g === "FALSE" ? I = {
                        t: "b",
                        v: !1
                    } : isNaN(Kr(g)) ? isNaN(ta(g).getDate()) || (I = {
                        t: "d",
                        v: Ue(g)
                    }, r.cellDates || (I = {
                        t: "n",
                        v: nr(I.v)
                    }), I.z = r.dateNF || ve[14]) : I = {
                        t: "n",
                        v: Kr(g)
                    }), r.dense ? (a[o] || (a[o] = []), a[o][l] = I) : a[pe({
                        r: o,
                        c: l
                    })] = I, l += x
                }
            }
        }
    }
    return a["!ref"] = we(d), v.length && (a["!merges"] = v), a
}

function Cm(e, t, r, a) {
    for (var n = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
        for (var f = 0, c = 0, o = 0; o < n.length; ++o)
            if (!(n[o].s.r > r || n[o].s.c > s) && !(n[o].e.r < r || n[o].e.c < s)) {
                if (n[o].s.r < r || n[o].s.c < s) {
                    f = -1;
                    break
                }
                f = n[o].e.r - n[o].s.r + 1, c = n[o].e.c - n[o].s.c + 1;
                break
            } if (!(f < 0)) {
            var l = pe({
                    r,
                    c: s
                }),
                h = a.dense ? (e[r] || [])[s] : e[l],
                x = h && h.v != null && (h.h || hn(h.w || (lt(h), h.w) || "")) || "",
                d = {};
            f > 1 && (d.rowspan = f), c > 1 && (d.colspan = c), a.editable ? x = '<span contenteditable="true">' + x + "</span>" : h && (d["data-t"] = h && h.t || "z", h.v != null && (d["data-v"] = h.v), h.z != null && (d["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + h.l.Target + '">' + x + "</a>")), d.id = (a.id || "sjs") + "-" + l, i.push(ae("td", x, d))
        }
    }
    var v = "<tr>";
    return v + i.join("") + "</tr>"
}
var Dm = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',
    Om = "</body></html>";

function Im(e, t) {
    var r = e.match(/<table[\s\S]*?>[\s\S]*?<\/table>/gi);
    if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
    if (r.length == 1) return Ft($i(r[0], t), t);
    var a = Wn();
    return r.forEach(function(n, i) {
        Hn(a, $i(n, t), "Sheet" + (i + 1))
    }), a
}

function Rm(e, t, r) {
    var a = [];
    return a.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">"
}

function ec(e, t) {
    var r = t || {},
        a = r.header != null ? r.header : Dm,
        n = r.footer != null ? r.footer : Om,
        i = [a],
        s = Ar(e["!ref"]);
    r.dense = Array.isArray(e), i.push(Rm(e, s, r));
    for (var f = s.s.r; f <= s.e.r; ++f) i.push(Cm(e, s, f, r));
    return i.push("</table>" + n), i.join("")
}

function rc(e, t, r) {
    var a = r || {},
        n = 0,
        i = 0;
    if (a.origin != null)
        if (typeof a.origin == "number") n = a.origin;
        else {
            var s = typeof a.origin == "string" ? Xe(a.origin) : a.origin;
            n = s.r, i = s.c
        } var f = t.getElementsByTagName("tr"),
        c = Math.min(a.sheetRows || 1e7, f.length),
        o = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: n,
                c: i
            }
        };
    if (e["!ref"]) {
        var l = Ar(e["!ref"]);
        o.s.r = Math.min(o.s.r, l.s.r), o.s.c = Math.min(o.s.c, l.s.c), o.e.r = Math.max(o.e.r, l.e.r), o.e.c = Math.max(o.e.c, l.e.c), n == -1 && (o.e.r = n = l.e.r + 1)
    }
    var h = [],
        x = 0,
        d = e["!rows"] || (e["!rows"] = []),
        v = 0,
        u = 0,
        p = 0,
        k = 0,
        A = 0,
        g = 0;
    for (e["!cols"] || (e["!cols"] = []); v < f.length && u < c; ++v) {
        var O = f[v];
        if (Ki(O)) {
            if (a.display) continue;
            d[u] = {
                hidden: !0
            }
        }
        var b = O.children;
        for (p = k = 0; p < b.length; ++p) {
            var N = b[p];
            if (!(a.display && Ki(N))) {
                var F = N.hasAttribute("data-v") ? N.getAttribute("data-v") : N.hasAttribute("v") ? N.getAttribute("v") : Es(N.innerHTML),
                    B = N.getAttribute("data-z") || N.getAttribute("z");
                for (x = 0; x < h.length; ++x) {
                    var I = h[x];
                    I.s.c == k + i && I.s.r < u + n && u + n <= I.e.r && (k = I.e.c + 1 - i, x = -1)
                }
                g = +N.getAttribute("colspan") || 1, ((A = +N.getAttribute("rowspan") || 1) > 1 || g > 1) && h.push({
                    s: {
                        r: u + n,
                        c: k + i
                    },
                    e: {
                        r: u + n + (A || 1) - 1,
                        c: k + i + (g || 1) - 1
                    }
                });
                var z = {
                        t: "s",
                        v: F
                    },
                    G = N.getAttribute("data-t") || N.getAttribute("t") || "";
                F != null && (F.length == 0 ? z.t = G || "z" : a.raw || F.trim().length == 0 || G == "s" || (F === "TRUE" ? z = {
                    t: "b",
                    v: !0
                } : F === "FALSE" ? z = {
                    t: "b",
                    v: !1
                } : isNaN(Kr(F)) ? isNaN(ta(F).getDate()) || (z = {
                    t: "d",
                    v: Ue(F)
                }, a.cellDates || (z = {
                    t: "n",
                    v: nr(z.v)
                }), z.z = a.dateNF || ve[14]) : z = {
                    t: "n",
                    v: Kr(F)
                })), z.z === void 0 && B != null && (z.z = B);
                var L = "",
                    J = N.getElementsByTagName("A");
                if (J && J.length)
                    for (var le = 0; le < J.length && !(J[le].hasAttribute("href") && (L = J[le].getAttribute("href"), L.charAt(0) != "#")); ++le);
                L && L.charAt(0) != "#" && (z.l = {
                    Target: L
                }), a.dense ? (e[u + n] || (e[u + n] = []), e[u + n][k + i] = z) : e[pe({
                    c: k + i,
                    r: u + n
                })] = z, o.e.c < k + i && (o.e.c = k + i), k += g
            }
        }++u
    }
    return h.length && (e["!merges"] = (e["!merges"] || []).concat(h)), o.e.r = Math.max(o.e.r, u - 1 + n), e["!ref"] = we(o), u >= c && (e["!fullref"] = we((o.e.r = f.length - v + u - 1 + n, o))), e
}

function tc(e, t) {
    var r = t || {},
        a = r.dense ? [] : {};
    return rc(a, e, t)
}

function Nm(e, t) {
    return Ft(tc(e, t), t)
}

function Ki(e) {
    var t = "",
        r = bm(e);
    return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none"
}

function bm(e) {
    return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null
}

function Pm(e) {
    var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(a, n) {
            return Array(parseInt(n, 10) + 1).join(" ")
        }).replace(/<text:tab[^>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`),
        r = Ce(t.replace(/<[^>]*>/g, ""));
    return [r]
}
var ji = {
    day: ["d", "dd"],
    month: ["m", "mm"],
    year: ["y", "yy"],
    hours: ["h", "hh"],
    minutes: ["m", "mm"],
    seconds: ["s", "ss"],
    "am-pm": ["A/P", "AM/PM"],
    "day-of-week": ["ddd", "dddd"],
    era: ["e", "ee"],
    quarter: ["\\Qm", 'm\\"th quarter"']
};

function ac(e, t) {
    var r = t || {},
        a = un(e),
        n = [],
        i, s, f = {
            name: ""
        },
        c = "",
        o = 0,
        l, h, x = {},
        d = [],
        v = r.dense ? [] : {},
        u, p, k = {
            value: ""
        },
        A = "",
        g = 0,
        O = [],
        b = -1,
        N = -1,
        F = {
            s: {
                r: 1e6,
                c: 1e7
            },
            e: {
                r: 0,
                c: 0
            }
        },
        B = 0,
        I = {},
        z = [],
        G = {},
        L = 0,
        J = 0,
        le = [],
        ie = 1,
        ue = 1,
        ce = [],
        be = {
            Names: []
        },
        V = {},
        de = ["", ""],
        ge = [],
        C = {},
        P = "",
        D = 0,
        R = !1,
        j = !1,
        re = 0;
    for (Oa.lastIndex = 0, a = a.replace(/<!--([\s\S]*?)-->/mg, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, ""); u = Oa.exec(a);) switch (u[3] = u[3].replace(/_.*$/, "")) {
        case "table":
        case "工作表":
            u[1] === "/" ? (F.e.c >= F.s.c && F.e.r >= F.s.r ? v["!ref"] = we(F) : v["!ref"] = "A1:A1", r.sheetRows > 0 && r.sheetRows <= F.e.r && (v["!fullref"] = v["!ref"], F.e.r = r.sheetRows - 1, v["!ref"] = we(F)), z.length && (v["!merges"] = z), le.length && (v["!rows"] = le), l.name = l.名称 || l.name, typeof JSON < "u" && JSON.stringify(l), d.push(l.name), x[l.name] = v, j = !1) : u[0].charAt(u[0].length - 2) !== "/" && (l = me(u[0], !1), b = N = -1, F.s.r = F.s.c = 1e7, F.e.r = F.e.c = 0, v = r.dense ? [] : {}, z = [], le = [], j = !0);
            break;
        case "table-row-group":
            u[1] === "/" ? --B : ++B;
            break;
        case "table-row":
        case "行":
            if (u[1] === "/") {
                b += ie, ie = 1;
                break
            }
            if (h = me(u[0], !1), h.行号 ? b = h.行号 - 1 : b == -1 && (b = 0), ie = +h["number-rows-repeated"] || 1, ie < 10)
                for (re = 0; re < ie; ++re) B > 0 && (le[b + re] = {
                    level: B
                });
            N = -1;
            break;
        case "covered-table-cell":
            u[1] !== "/" && ++N, r.sheetStubs && (r.dense ? (v[b] || (v[b] = []), v[b][N] = {
                t: "z"
            }) : v[pe({
                r: b,
                c: N
            })] = {
                t: "z"
            }), A = "", O = [];
            break;
        case "table-cell":
        case "数据":
            if (u[0].charAt(u[0].length - 2) === "/") ++N, k = me(u[0], !1), ue = parseInt(k["number-columns-repeated"] || "1", 10), p = {
                t: "z",
                v: null
            }, k.formula && r.cellFormula != !1 && (p.f = Gi(Ce(k.formula))), (k.数据类型 || k["value-type"]) == "string" && (p.t = "s", p.v = Ce(k["string-value"] || ""), r.dense ? (v[b] || (v[b] = []), v[b][N] = p) : v[pe({
                r: b,
                c: N
            })] = p), N += ue - 1;
            else if (u[1] !== "/") {
                ++N, A = "", g = 0, O = [], ue = 1;
                var te = ie ? b + ie - 1 : b;
                if (N > F.e.c && (F.e.c = N), N < F.s.c && (F.s.c = N), b < F.s.r && (F.s.r = b), te > F.e.r && (F.e.r = te), k = me(u[0], !1), ge = [], C = {}, p = {
                        t: k.数据类型 || k["value-type"],
                        v: null
                    }, r.cellFormula)
                    if (k.formula && (k.formula = Ce(k.formula)), k["number-matrix-columns-spanned"] && k["number-matrix-rows-spanned"] && (L = parseInt(k["number-matrix-rows-spanned"], 10) || 0, J = parseInt(k["number-matrix-columns-spanned"], 10) || 0, G = {
                            s: {
                                r: b,
                                c: N
                            },
                            e: {
                                r: b + L - 1,
                                c: N + J - 1
                            }
                        }, p.F = we(G), ce.push([G, p.F])), k.formula) p.f = Gi(k.formula);
                    else
                        for (re = 0; re < ce.length; ++re) b >= ce[re][0].s.r && b <= ce[re][0].e.r && N >= ce[re][0].s.c && N <= ce[re][0].e.c && (p.F = ce[re][1]);
                switch ((k["number-columns-spanned"] || k["number-rows-spanned"]) && (L = parseInt(k["number-rows-spanned"], 10) || 0, J = parseInt(k["number-columns-spanned"], 10) || 0, G = {
                        s: {
                            r: b,
                            c: N
                        },
                        e: {
                            r: b + L - 1,
                            c: N + J - 1
                        }
                    }, z.push(G)), k["number-columns-repeated"] && (ue = parseInt(k["number-columns-repeated"], 10)), p.t) {
                    case "boolean":
                        p.t = "b", p.v = Me(k["boolean-value"]);
                        break;
                    case "float":
                        p.t = "n", p.v = parseFloat(k.value);
                        break;
                    case "percentage":
                        p.t = "n", p.v = parseFloat(k.value);
                        break;
                    case "currency":
                        p.t = "n", p.v = parseFloat(k.value);
                        break;
                    case "date":
                        p.t = "d", p.v = Ue(k["date-value"]), r.cellDates || (p.t = "n", p.v = nr(p.v)), p.z = "m/d/yy";
                        break;
                    case "time":
                        p.t = "n", p.v = fo(k["time-value"]) / 86400, r.cellDates && (p.t = "d", p.v = E0(p.v)), p.z = "HH:MM:SS";
                        break;
                    case "number":
                        p.t = "n", p.v = parseFloat(k.数据数值);
                        break;
                    default:
                        if (p.t === "string" || p.t === "text" || !p.t) p.t = "s", k["string-value"] != null && (A = Ce(k["string-value"]), O = []);
                        else throw new Error("Unsupported value type " + p.t)
                }
            } else {
                if (R = !1, p.t === "s" && (p.v = A || "", O.length && (p.R = O), R = g == 0), V.Target && (p.l = V), ge.length > 0 && (p.c = ge, ge = []), A && r.cellText !== !1 && (p.w = A), R && (p.t = "z", delete p.v), (!R || r.sheetStubs) && !(r.sheetRows && r.sheetRows <= b))
                    for (var Q = 0; Q < ie; ++Q) {
                        if (ue = parseInt(k["number-columns-repeated"] || "1", 10), r.dense)
                            for (v[b + Q] || (v[b + Q] = []), v[b + Q][N] = Q == 0 ? p : We(p); --ue > 0;) v[b + Q][N + ue] = We(p);
                        else
                            for (v[pe({
                                    r: b + Q,
                                    c: N
                                })] = p; --ue > 0;) v[pe({
                                r: b + Q,
                                c: N + ue
                            })] = We(p);
                        F.e.c <= N && (F.e.c = N)
                    }
                ue = parseInt(k["number-columns-repeated"] || "1", 10), N += ue - 1, ue = 0, p = {}, A = "", O = []
            }
            V = {};
            break;
        case "document":
        case "document-content":
        case "电子表格文档":
        case "spreadsheet":
        case "主体":
        case "scripts":
        case "styles":
        case "font-face-decls":
        case "master-styles":
            if (u[1] === "/") {
                if ((i = n.pop())[0] !== u[3]) throw "Bad state: " + i
            } else u[0].charAt(u[0].length - 2) !== "/" && n.push([u[3], !0]);
            break;
        case "annotation":
            if (u[1] === "/") {
                if ((i = n.pop())[0] !== u[3]) throw "Bad state: " + i;
                C.t = A, O.length && (C.R = O), C.a = P, ge.push(C)
            } else u[0].charAt(u[0].length - 2) !== "/" && n.push([u[3], !1]);
            P = "", D = 0, A = "", g = 0, O = [];
            break;
        case "creator":
            u[1] === "/" ? P = a.slice(D, u.index) : D = u.index + u[0].length;
            break;
        case "meta":
        case "元数据":
        case "settings":
        case "config-item-set":
        case "config-item-map-indexed":
        case "config-item-map-entry":
        case "config-item-map-named":
        case "shapes":
        case "frame":
        case "text-box":
        case "image":
        case "data-pilot-tables":
        case "list-style":
        case "form":
        case "dde-links":
        case "event-listeners":
        case "chart":
            if (u[1] === "/") {
                if ((i = n.pop())[0] !== u[3]) throw "Bad state: " + i
            } else u[0].charAt(u[0].length - 2) !== "/" && n.push([u[3], !1]);
            A = "", g = 0, O = [];
            break;
        case "scientific-number":
            break;
        case "currency-symbol":
            break;
        case "currency-style":
            break;
        case "number-style":
        case "percentage-style":
        case "date-style":
        case "time-style":
            if (u[1] === "/") {
                if (I[f.name] = c, (i = n.pop())[0] !== u[3]) throw "Bad state: " + i
            } else u[0].charAt(u[0].length - 2) !== "/" && (c = "", f = me(u[0], !1), n.push([u[3], !0]));
            break;
        case "script":
            break;
        case "libraries":
            break;
        case "automatic-styles":
            break;
        case "default-style":
        case "page-layout":
            break;
        case "style":
            break;
        case "map":
            break;
        case "font-face":
            break;
        case "paragraph-properties":
            break;
        case "table-properties":
            break;
        case "table-column-properties":
            break;
        case "table-row-properties":
            break;
        case "table-cell-properties":
            break;
        case "number":
            switch (n[n.length - 1][0]) {
                case "time-style":
                case "date-style":
                    s = me(u[0], !1), c += ji[u[3]][s.style === "long" ? 1 : 0];
                    break
            }
            break;
        case "fraction":
            break;
        case "day":
        case "month":
        case "year":
        case "era":
        case "day-of-week":
        case "week-of-year":
        case "quarter":
        case "hours":
        case "minutes":
        case "seconds":
        case "am-pm":
            switch (n[n.length - 1][0]) {
                case "time-style":
                case "date-style":
                    s = me(u[0], !1), c += ji[u[3]][s.style === "long" ? 1 : 0];
                    break
            }
            break;
        case "boolean-style":
            break;
        case "boolean":
            break;
        case "text-style":
            break;
        case "text":
            if (u[0].slice(-2) === "/>") break;
            if (u[1] === "/") switch (n[n.length - 1][0]) {
                case "number-style":
                case "date-style":
                case "time-style":
                    c += a.slice(o, u.index);
                    break
            } else o = u.index + u[0].length;
            break;
        case "named-range":
            s = me(u[0], !1), de = B0(s["cell-range-address"]);
            var Z = {
                Name: s.name,
                Ref: de[0] + "!" + de[1]
            };
            j && (Z.Sheet = d.length), be.Names.push(Z);
            break;
        case "text-content":
            break;
        case "text-properties":
            break;
        case "embedded-text":
            break;
        case "body":
        case "电子表格":
            break;
        case "forms":
            break;
        case "table-column":
            break;
        case "table-header-rows":
            break;
        case "table-rows":
            break;
        case "table-column-group":
            break;
        case "table-header-columns":
            break;
        case "table-columns":
            break;
        case "null-date":
            break;
        case "graphic-properties":
            break;
        case "calculation-settings":
            break;
        case "named-expressions":
            break;
        case "label-range":
            break;
        case "label-ranges":
            break;
        case "named-expression":
            break;
        case "sort":
            break;
        case "sort-by":
            break;
        case "sort-groups":
            break;
        case "tab":
            break;
        case "line-break":
            break;
        case "span":
            break;
        case "p":
        case "文本串":
            if (["master-styles"].indexOf(n[n.length - 1][0]) > -1) break;
            if (u[1] === "/" && (!k || !k["string-value"])) {
                var Ee = Pm(a.slice(g, u.index));
                A = (A.length > 0 ? A + `
` : "") + Ee[0]
            } else me(u[0], !1), g = u.index + u[0].length;
            break;
        case "s":
            break;
        case "database-range":
            if (u[1] === "/") break;
            try {
                de = B0(me(u[0])["target-range-address"]), x[de[0]]["!autofilter"] = {
                    ref: de[1]
                }
            } catch {}
            break;
        case "date":
            break;
        case "object":
            break;
        case "title":
        case "标题":
            break;
        case "desc":
            break;
        case "binary-data":
            break;
        case "table-source":
            break;
        case "scenario":
            break;
        case "iteration":
            break;
        case "content-validations":
            break;
        case "content-validation":
            break;
        case "help-message":
            break;
        case "error-message":
            break;
        case "database-ranges":
            break;
        case "filter":
            break;
        case "filter-and":
            break;
        case "filter-or":
            break;
        case "filter-condition":
            break;
        case "list-level-style-bullet":
            break;
        case "list-level-style-number":
            break;
        case "list-level-properties":
            break;
        case "sender-firstname":
        case "sender-lastname":
        case "sender-initials":
        case "sender-title":
        case "sender-position":
        case "sender-email":
        case "sender-phone-private":
        case "sender-fax":
        case "sender-company":
        case "sender-phone-work":
        case "sender-street":
        case "sender-city":
        case "sender-postal-code":
        case "sender-country":
        case "sender-state-or-province":
        case "author-name":
        case "author-initials":
        case "chapter":
        case "file-name":
        case "template-name":
        case "sheet-name":
            break;
        case "event-listener":
            break;
        case "initial-creator":
        case "creation-date":
        case "print-date":
        case "generator":
        case "document-statistic":
        case "user-defined":
        case "editing-duration":
        case "editing-cycles":
            break;
        case "config-item":
            break;
        case "page-number":
            break;
        case "page-count":
            break;
        case "time":
            break;
        case "cell-range-source":
            break;
        case "detective":
            break;
        case "operation":
            break;
        case "highlighted-range":
            break;
        case "data-pilot-table":
        case "source-cell-range":
        case "source-service":
        case "data-pilot-field":
        case "data-pilot-level":
        case "data-pilot-subtotals":
        case "data-pilot-subtotal":
        case "data-pilot-members":
        case "data-pilot-member":
        case "data-pilot-display-info":
        case "data-pilot-sort-info":
        case "data-pilot-layout-info":
        case "data-pilot-field-reference":
        case "data-pilot-groups":
        case "data-pilot-group":
        case "data-pilot-group-member":
            break;
        case "rect":
            break;
        case "dde-connection-decls":
        case "dde-connection-decl":
        case "dde-link":
        case "dde-source":
            break;
        case "properties":
            break;
        case "property":
            break;
        case "a":
            if (u[1] !== "/") {
                if (V = me(u[0], !1), !V.href) break;
                V.Target = Ce(V.href), delete V.href, V.Target.charAt(0) == "#" && V.Target.indexOf(".") > -1 ? (de = B0(V.Target.slice(1)), V.Target = "#" + de[0] + "!" + de[1]) : V.Target.match(/^\.\.[\\\/]/) && (V.Target = V.Target.slice(3))
            }
            break;
        case "table-protection":
            break;
        case "data-pilot-grand-total":
            break;
        case "office-document-common-attrs":
            break;
        default:
            switch (u[2]) {
                case "dc:":
                case "calcext:":
                case "loext:":
                case "ooo:":
                case "chartooo:":
                case "draw:":
                case "style:":
                case "chart:":
                case "form:":
                case "uof:":
                case "表:":
                case "字:":
                    break;
                default:
                    if (r.WTF) throw new Error(u)
            }
    }
    var y = {
        Sheets: x,
        SheetNames: d,
        Workbook: be
    };
    return r.bookSheets && delete y.Sheets, y
}

function Yi(e, t) {
    t = t || {}, Ur(e, "META-INF/manifest.xml") && cl(er(e, "META-INF/manifest.xml"), t);
    var r = Ir(e, "content.xml");
    if (!r) throw new Error("Missing content.xml in ODS / UOF file");
    var a = ac(Pe(r), t);
    return Ur(e, "meta.xml") && (a.Props = $s(er(e, "meta.xml"))), a
}

function Ji(e, t) {
    return ac(e, t)
}
var Lm = function() {
        var e = ["<office:master-styles>", '<style:master-page style:name="mp1" style:page-layout-name="mp1">', "<style:header/>", '<style:header-left style:display="false"/>', "<style:footer/>", '<style:footer-left style:display="false"/>', "</style:master-page>", "</office:master-styles>"].join(""),
            t = "<office:document-styles " + Da({
                "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
                "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
                "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
                "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
                "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
                "office:version": "1.2"
            }) + ">" + e + "</office:document-styles>";
        return function() {
            return qe + t
        }
    }(),
    Zi = function() {
        var e = function(i) {
                return Ne(i).replace(/  +/g, function(s) {
                    return '<text:s text:c="' + s.length + '"/>'
                }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
            },
            t = `          <table:table-cell />
`,
            r = `          <table:covered-table-cell/>
`,
            a = function(i, s, f) {
                var c = [];
                c.push('      <table:table table:name="' + Ne(s.SheetNames[f]) + `" table:style-name="ta1">
`);
                var o = 0,
                    l = 0,
                    h = Ar(i["!ref"] || "A1"),
                    x = i["!merges"] || [],
                    d = 0,
                    v = Array.isArray(i);
                if (i["!cols"])
                    for (l = 0; l <= h.e.c; ++l) c.push("        <table:table-column" + (i["!cols"][l] ? ' table:style-name="co' + i["!cols"][l].ods + '"' : "") + `></table:table-column>
`);
                var u = "",
                    p = i["!rows"] || [];
                for (o = 0; o < h.s.r; ++o) u = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "", c.push("        <table:table-row" + u + `></table:table-row>
`);
                for (; o <= h.e.r; ++o) {
                    for (u = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "", c.push("        <table:table-row" + u + `>
`), l = 0; l < h.s.c; ++l) c.push(t);
                    for (; l <= h.e.c; ++l) {
                        var k = !1,
                            A = {},
                            g = "";
                        for (d = 0; d != x.length; ++d)
                            if (!(x[d].s.c > l) && !(x[d].s.r > o) && !(x[d].e.c < l) && !(x[d].e.r < o)) {
                                (x[d].s.c != l || x[d].s.r != o) && (k = !0), A["table:number-columns-spanned"] = x[d].e.c - x[d].s.c + 1, A["table:number-rows-spanned"] = x[d].e.r - x[d].s.r + 1;
                                break
                            } if (k) {
                            c.push(r);
                            continue
                        }
                        var O = pe({
                                r: o,
                                c: l
                            }),
                            b = v ? (i[o] || [])[l] : i[O];
                        if (b && b.f && (A["table:formula"] = Ne(tv(b.f)), b.F && b.F.slice(0, O.length) == O)) {
                            var N = Ar(b.F);
                            A["table:number-matrix-columns-spanned"] = N.e.c - N.s.c + 1, A["table:number-matrix-rows-spanned"] = N.e.r - N.s.r + 1
                        }
                        if (!b) {
                            c.push(t);
                            continue
                        }
                        switch (b.t) {
                            case "b":
                                g = b.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = b.v ? "true" : "false";
                                break;
                            case "n":
                                g = b.w || String(b.v || 0), A["office:value-type"] = "float", A["office:value"] = b.v || 0;
                                break;
                            case "s":
                            case "str":
                                g = b.v == null ? "" : b.v, A["office:value-type"] = "string";
                                break;
                            case "d":
                                g = b.w || Ue(b.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = Ue(b.v).toISOString(), A["table:style-name"] = "ce1";
                                break;
                            default:
                                c.push(t);
                                continue
                        }
                        var F = e(g);
                        if (b.l && b.l.Target) {
                            var B = b.l.Target;
                            B = B.charAt(0) == "#" ? "#" + av(B.slice(1)) : B, B.charAt(0) != "#" && !B.match(/^\w+:/) && (B = "../" + B), F = ae("text:a", F, {
                                "xlink:href": B.replace(/&/g, "&amp;")
                            })
                        }
                        c.push("          " + ae("table:table-cell", ae("text:p", F, {}), A) + `
`)
                    }
                    c.push(`        </table:table-row>
`)
                }
                return c.push(`      </table:table>
`), c.join("")
            },
            n = function(i, s) {
                i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
                var f = 0;
                s.SheetNames.map(function(o) {
                    return s.Sheets[o]
                }).forEach(function(o) {
                    if (o && o["!cols"]) {
                        for (var l = 0; l < o["!cols"].length; ++l)
                            if (o["!cols"][l]) {
                                var h = o["!cols"][l];
                                if (h.width == null && h.wpx == null && h.wch == null) continue;
                                kt(h), h.ods = f;
                                var x = o["!cols"][l].wpx + "px";
                                i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + x + `"/>
`), i.push(`  </style:style>
`), ++f
                            }
                    }
                });
                var c = 0;
                s.SheetNames.map(function(o) {
                    return s.Sheets[o]
                }).forEach(function(o) {
                    if (o && o["!rows"]) {
                        for (var l = 0; l < o["!rows"].length; ++l)
                            if (o["!rows"][l]) {
                                o["!rows"][l].ods = c;
                                var h = o["!rows"][l].hpx + "px";
                                i.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + h + `"/>
`), i.push(`  </style:style>
`), ++c
                            }
                    }
                }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`)
            };
        return function(s, f) {
            var c = [qe],
                o = Da({
                    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
                    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
                    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
                    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
                    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
                    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
                    "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
                    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
                    "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
                    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
                    "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
                    "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
                    "xmlns:math": "http://www.w3.org/1998/Math/MathML",
                    "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
                    "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
                    "xmlns:ooo": "http://openoffice.org/2004/office",
                    "xmlns:ooow": "http://openoffice.org/2004/writer",
                    "xmlns:oooc": "http://openoffice.org/2004/calc",
                    "xmlns:dom": "http://www.w3.org/2001/xml-events",
                    "xmlns:xforms": "http://www.w3.org/2002/xforms",
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
                    "xmlns:rpt": "http://openoffice.org/2005/report",
                    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
                    "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
                    "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
                    "xmlns:tableooo": "http://openoffice.org/2009/table",
                    "xmlns:drawooo": "http://openoffice.org/2010/draw",
                    "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
                    "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
                    "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
                    "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
                    "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
                    "office:version": "1.2"
                }),
                l = Da({
                    "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
                    "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
                });
            f.bookType == "fods" ? (c.push("<office:document" + o + l + `>
`), c.push(zs().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + o + `>
`), n(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
            for (var h = 0; h != s.SheetNames.length; ++h) c.push(a(s.Sheets[s.SheetNames[h]], s, h));
            return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("")
        }
    }();

function nc(e, t) {
    if (t.bookType == "fods") return Zi(e, t);
    var r = cn(),
        a = "",
        n = [],
        i = [];
    return a = "mimetype", ke(r, a, "application/vnd.oasis.opendocument.spreadsheet"), a = "content.xml", ke(r, a, Zi(e, t)), n.push([a, "text/xml"]), i.push([a, "ContentFile"]), a = "styles.xml", ke(r, a, Lm(e, t)), n.push([a, "text/xml"]), i.push([a, "StylesFile"]), a = "meta.xml", ke(r, a, qe + zs()), n.push([a, "text/xml"]), i.push([a, "MetadataFile"]), a = "manifest.rdf", ke(r, a, hl(i)), n.push([a, "application/rdf+xml"]), a = "META-INF/manifest.xml", ke(r, a, ol(n)), r
} /*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Wt(e) {
    return new DataView(e.buffer, e.byteOffset, e.byteLength)
}

function Q0(e) {
    return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : Pe(St(e))
}

function Bm(e) {
    return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Or(et(e))
}

function Mm(e, t) {
    e: for (var r = 0; r <= e.length - t.length; ++r) {
        for (var a = 0; a < t.length; ++a)
            if (e[r + a] != t[a]) continue e;
        return !0
    }
    return !1
}

function Tt(e) {
    var t = e.reduce(function(n, i) {
            return n + i.length
        }, 0),
        r = new Uint8Array(t),
        a = 0;
    return e.forEach(function(n) {
        r.set(n, a), a += n.length
    }), r
}

function qi(e) {
    return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24
}

function Um(e, t) {
    for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, a = e[t + 14] & 1, n = t + 13; n >= t; --n) a = a * 256 + e[n];
    return (e[t + 15] & 128 ? -a : a) * Math.pow(10, r - 6176)
}

function Wm(e, t, r) {
    var a = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20,
        n = r / Math.pow(10, a - 6176);
    e[t + 15] |= a >> 7, e[t + 14] |= (a & 127) << 1;
    for (var i = 0; n >= 1; ++i, n /= 256) e[t + i] = n & 255;
    e[t + 15] |= r >= 0 ? 0 : 128
}

function Ba(e, t) {
    var r = t ? t[0] : 0,
        a = e[r] & 127;
    e: if (e[r++] >= 128 && (a |= (e[r] & 127) << 7, e[r++] < 128 || (a |= (e[r] & 127) << 14, e[r++] < 128) || (a |= (e[r] & 127) << 21, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128))) break e;
    return t && (t[0] = r), a
}

function Ie(e) {
    var t = new Uint8Array(7);
    t[0] = e & 127;
    var r = 1;
    e: if (e > 127) {
        if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103)) break e;
        t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r
    }
    return t.slice(0, r)
}

function $e(e) {
    var t = 0,
        r = e[t] & 127;
    e: if (e[t++] >= 128) {
        if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128)) break e;
        r |= (e[t] & 127) << 28
    }
    return r
}

function Oe(e) {
    for (var t = [], r = [0]; r[0] < e.length;) {
        var a = r[0],
            n = Ba(e, r),
            i = n & 7;
        n = Math.floor(n / 8);
        var s = 0,
            f;
        if (n == 0) break;
        switch (i) {
            case 0: {
                for (var c = r[0]; e[r[0]++] >= 128;);
                f = e.slice(c, r[0])
            }
            break;
            case 5:
                s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
                break;
            case 1:
                s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
                break;
            case 2:
                s = Ba(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
                break;
            case 3:
            case 4:
            default:
                throw new Error("PB Type ".concat(i, " for Field ").concat(n, " at offset ").concat(a))
        }
        var o = {
            data: f,
            type: i
        };
        t[n] == null ? t[n] = [o] : t[n].push(o)
    }
    return t
}

function cr(e) {
    var t = [];
    return e.forEach(function(r, a) {
        r.forEach(function(n) {
            n.data && (t.push(Ie(a * 8 + n.type)), n.type == 2 && t.push(Ie(n.data.length)), t.push(n.data))
        })
    }), Tt(t)
}

function Pn(e, t) {
    return (e == null ? void 0 : e.map(function(r) {
        return t(r.data)
    })) || []
}

function Br(e) {
    for (var t, r = [], a = [0]; a[0] < e.length;) {
        var n = Ba(e, a),
            i = Oe(e.slice(a[0], a[0] + n));
        a[0] += n;
        var s = {
            id: $e(i[1][0].data),
            messages: []
        };
        i[2].forEach(function(f) {
            var c = Oe(f.data),
                o = $e(c[3][0].data);
            s.messages.push({
                meta: c,
                data: e.slice(a[0], a[0] + o)
            }), a[0] += o
        }), (t = i[3]) != null && t[0] && (s.merge = $e(i[3][0].data) >>> 0 > 0), r.push(s)
    }
    return r
}

function jt(e) {
    var t = [];
    return e.forEach(function(r) {
        var a = [];
        a[1] = [{
            data: Ie(r.id),
            type: 0
        }], a[2] = [], r.merge != null && (a[3] = [{
            data: Ie(+!!r.merge),
            type: 0
        }]);
        var n = [];
        r.messages.forEach(function(s) {
            n.push(s.data), s.meta[3] = [{
                type: 0,
                data: Ie(s.data.length)
            }], a[2].push({
                data: cr(s.meta),
                type: 2
            })
        });
        var i = cr(a);
        t.push(Ie(i.length)), t.push(i), n.forEach(function(s) {
            return t.push(s)
        })
    }), Tt(t)
}

function Hm(e, t) {
    if (e != 0) throw new Error("Unexpected Snappy chunk type ".concat(e));
    for (var r = [0], a = Ba(t, r), n = []; r[0] < t.length;) {
        var i = t[r[0]] & 3;
        if (i == 0) {
            var s = t[r[0]++] >> 2;
            if (s < 60) ++s;
            else {
                var f = s - 59;
                s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f
            }
            n.push(t.slice(r[0], r[0] + s)), r[0] += s;
            continue
        } else {
            var c = 0,
                o = 0;
            if (i == 1 ? (o = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (o = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), n = [Tt(n)], c == 0) throw new Error("Invalid offset 0");
            if (c > n[0].length) throw new Error("Invalid offset beyond length");
            if (o >= c)
                for (n.push(n[0].slice(-c)), o -= c; o >= n[n.length - 1].length;) n.push(n[n.length - 1]), o -= n[n.length - 1].length;
            n.push(n[0].slice(-c, -c + o))
        }
    }
    var l = Tt(n);
    if (l.length != a) throw new Error("Unexpected length: ".concat(l.length, " != ").concat(a));
    return l
}

function Mr(e) {
    for (var t = [], r = 0; r < e.length;) {
        var a = e[r++],
            n = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
        r += 3, t.push(Hm(a, e.slice(r, r + n))), r += n
    }
    if (r !== e.length) throw new Error("data is not a valid framed stream!");
    return Tt(t)
}

function Yt(e) {
    for (var t = [], r = 0; r < e.length;) {
        var a = Math.min(e.length - r, 268435455),
            n = new Uint8Array(4);
        t.push(n);
        var i = Ie(a),
            s = i.length;
        t.push(i), a <= 60 ? (s++, t.push(new Uint8Array([a - 1 << 2]))) : a <= 256 ? (s += 2, t.push(new Uint8Array([240, a - 1 & 255]))) : a <= 65536 ? (s += 3, t.push(new Uint8Array([244, a - 1 & 255, a - 1 >> 8 & 255]))) : a <= 16777216 ? (s += 4, t.push(new Uint8Array([248, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255]))) : a <= 4294967296 && (s += 5, t.push(new Uint8Array([252, a - 1 & 255, a - 1 >> 8 & 255, a - 1 >> 16 & 255, a - 1 >>> 24 & 255]))), t.push(e.slice(r, r + a)), s += a, n[0] = 0, n[1] = s & 255, n[2] = s >> 8 & 255, n[3] = s >> 16 & 255, r += a
    }
    return Tt(t)
}

function Vm(e, t, r, a) {
    var n = Wt(e),
        i = n.getUint32(4, !0),
        s = (a > 1 ? 12 : 8) + qi(i & (a > 1 ? 3470 : 398)) * 4,
        f = -1,
        c = -1,
        o = NaN,
        l = new Date(2001, 0, 1);
    i & 512 && (f = n.getUint32(s, !0), s += 4), s += qi(i & (a > 1 ? 12288 : 4096)) * 4, i & 16 && (c = n.getUint32(s, !0), s += 4), i & 32 && (o = n.getFloat64(s, !0), s += 8), i & 64 && (l.setTime(l.getTime() + n.getFloat64(s, !0) * 1e3), s += 8);
    var h;
    switch (e[2]) {
        case 0:
            break;
        case 2:
            h = {
                t: "n",
                v: o
            };
            break;
        case 3:
            h = {
                t: "s",
                v: t[c]
            };
            break;
        case 5:
            h = {
                t: "d",
                v: l
            };
            break;
        case 6:
            h = {
                t: "b",
                v: o > 0
            };
            break;
        case 7:
            h = {
                t: "n",
                v: o / 86400
            };
            break;
        case 8:
            h = {
                t: "e",
                v: 0
            };
            break;
        case 9:
            if (f > -1) h = {
                t: "s",
                v: r[f]
            };
            else if (c > -1) h = {
                t: "s",
                v: t[c]
            };
            else if (!isNaN(o)) h = {
                t: "n",
                v: o
            };
            else throw new Error("Unsupported cell type ".concat(e.slice(0, 4)));
            break;
        default:
            throw new Error("Unsupported cell type ".concat(e.slice(0, 4)))
    }
    return h
}

function Gm(e, t, r) {
    var a = Wt(e),
        n = a.getUint32(8, !0),
        i = 12,
        s = -1,
        f = -1,
        c = NaN,
        o = NaN,
        l = new Date(2001, 0, 1);
    n & 1 && (c = Um(e, i), i += 16), n & 2 && (o = a.getFloat64(i, !0), i += 8), n & 4 && (l.setTime(l.getTime() + a.getFloat64(i, !0) * 1e3), i += 8), n & 8 && (f = a.getUint32(i, !0), i += 4), n & 16 && (s = a.getUint32(i, !0), i += 4);
    var h;
    switch (e[1]) {
        case 0:
            break;
        case 2:
            h = {
                t: "n",
                v: c
            };
            break;
        case 3:
            h = {
                t: "s",
                v: t[f]
            };
            break;
        case 5:
            h = {
                t: "d",
                v: l
            };
            break;
        case 6:
            h = {
                t: "b",
                v: o > 0
            };
            break;
        case 7:
            h = {
                t: "n",
                v: o / 86400
            };
            break;
        case 8:
            h = {
                t: "e",
                v: 0
            };
            break;
        case 9:
            if (s > -1) h = {
                t: "s",
                v: r[s]
            };
            else throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)));
            break;
        case 10:
            h = {
                t: "n",
                v: c
            };
            break;
        default:
            throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e.slice(0, 4)))
    }
    return h
}

function U0(e, t) {
    var r = new Uint8Array(32),
        a = Wt(r),
        n = 12,
        i = 0;
    switch (r[0] = 5, e.t) {
        case "n":
            r[1] = 2, Wm(r, n, e.v), i |= 1, n += 16;
            break;
        case "b":
            r[1] = 6, a.setFloat64(n, e.v ? 1 : 0, !0), i |= 2, n += 8;
            break;
        case "s":
            if (t.indexOf(e.v) == -1) throw new Error("Value ".concat(e.v, " missing from SST!"));
            r[1] = 3, a.setUint32(n, t.indexOf(e.v), !0), i |= 8, n += 4;
            break;
        default:
            throw "unsupported cell type " + e.t
    }
    return a.setUint32(8, i, !0), r.slice(0, n)
}

function W0(e, t) {
    var r = new Uint8Array(32),
        a = Wt(r),
        n = 12,
        i = 0;
    switch (r[0] = 3, e.t) {
        case "n":
            r[2] = 2, a.setFloat64(n, e.v, !0), i |= 32, n += 8;
            break;
        case "b":
            r[2] = 6, a.setFloat64(n, e.v ? 1 : 0, !0), i |= 32, n += 8;
            break;
        case "s":
            if (t.indexOf(e.v) == -1) throw new Error("Value ".concat(e.v, " missing from SST!"));
            r[2] = 3, a.setUint32(n, t.indexOf(e.v), !0), i |= 16, n += 4;
            break;
        default:
            throw "unsupported cell type " + e.t
    }
    return a.setUint32(4, i, !0), r.slice(0, n)
}

function Xm(e, t, r) {
    switch (e[0]) {
        case 0:
        case 1:
        case 2:
        case 3:
            return Vm(e, t, r, e[0]);
        case 5:
            return Gm(e, t, r);
        default:
            throw new Error("Unsupported payload version ".concat(e[0]))
    }
}

function xr(e) {
    var t = Oe(e);
    return Ba(t[1][0].data)
}

function Qi(e, t) {
    var r = Oe(t.data),
        a = $e(r[1][0].data),
        n = r[3],
        i = [];
    return (n || []).forEach(function(s) {
        var f = Oe(s.data),
            c = $e(f[1][0].data) >>> 0;
        switch (a) {
            case 1:
                i[c] = Q0(f[3][0].data);
                break;
            case 8: {
                var o = e[xr(f[9][0].data)][0],
                    l = Oe(o.data),
                    h = e[xr(l[1][0].data)][0],
                    x = $e(h.meta[1][0].data);
                if (x != 2001) throw new Error("2000 unexpected reference to ".concat(x));
                var d = Oe(h.data);
                i[c] = d[3].map(function(v) {
                    return Q0(v.data)
                }).join("")
            }
            break
        }
    }), i
}

function zm(e, t) {
    var r, a, n, i, s, f, c, o, l, h, x, d, v, u, p = Oe(e),
        k = $e(p[1][0].data) >>> 0,
        A = $e(p[2][0].data) >>> 0,
        g = ((a = (r = p[8]) == null ? void 0 : r[0]) == null ? void 0 : a.data) && $e(p[8][0].data) > 0 || !1,
        O, b;
    if ((i = (n = p[7]) == null ? void 0 : n[0]) != null && i.data && t != 0) O = (f = (s = p[7]) == null ? void 0 : s[0]) == null ? void 0 : f.data, b = (o = (c = p[6]) == null ? void 0 : c[0]) == null ? void 0 : o.data;
    else if ((h = (l = p[4]) == null ? void 0 : l[0]) != null && h.data && t != 1) O = (d = (x = p[4]) == null ? void 0 : x[0]) == null ? void 0 : d.data, b = (u = (v = p[3]) == null ? void 0 : v[0]) == null ? void 0 : u.data;
    else throw "NUMBERS Tile missing ".concat(t, " cell storage");
    for (var N = g ? 4 : 1, F = Wt(O), B = [], I = 0; I < O.length / 2; ++I) {
        var z = F.getUint16(I * 2, !0);
        z < 65535 && B.push([I, z])
    }
    if (B.length != A) throw "Expected ".concat(A, " cells, found ").concat(B.length);
    var G = [];
    for (I = 0; I < B.length - 1; ++I) G[B[I][0]] = b.subarray(B[I][1] * N, B[I + 1][1] * N);
    return B.length >= 1 && (G[B[B.length - 1][0]] = b.subarray(B[B.length - 1][1] * N)), {
        R: k,
        cells: G
    }
}

function $m(e, t) {
    var r, a = Oe(t.data),
        n = (r = a == null ? void 0 : a[7]) != null && r[0] ? $e(a[7][0].data) >>> 0 > 0 ? 1 : 0 : -1,
        i = Pn(a[5], function(s) {
            return zm(s, n)
        });
    return {
        nrows: $e(a[4][0].data) >>> 0,
        data: i.reduce(function(s, f) {
            return s[f.R] || (s[f.R] = []), f.cells.forEach(function(c, o) {
                if (s[f.R][o]) throw new Error("Duplicate cell r=".concat(f.R, " c=").concat(o));
                s[f.R][o] = c
            }), s
        }, [])
    }
}

function Km(e, t, r) {
    var a, n = Oe(t.data),
        i = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: 0,
                c: 0
            }
        };
    if (i.e.r = ($e(n[6][0].data) >>> 0) - 1, i.e.r < 0) throw new Error("Invalid row varint ".concat(n[6][0].data));
    if (i.e.c = ($e(n[7][0].data) >>> 0) - 1, i.e.c < 0) throw new Error("Invalid col varint ".concat(n[7][0].data));
    r["!ref"] = we(i);
    var s = Oe(n[4][0].data),
        f = Qi(e, e[xr(s[4][0].data)][0]),
        c = (a = s[17]) != null && a[0] ? Qi(e, e[xr(s[17][0].data)][0]) : [],
        o = Oe(s[3][0].data),
        l = 0;
    o[1].forEach(function(h) {
        var x = Oe(h.data),
            d = e[xr(x[2][0].data)][0],
            v = $e(d.meta[1][0].data);
        if (v != 6002) throw new Error("6001 unexpected reference to ".concat(v));
        var u = $m(e, d);
        u.data.forEach(function(p, k) {
            p.forEach(function(A, g) {
                var O = pe({
                        r: l + k,
                        c: g
                    }),
                    b = Xm(A, f, c);
                b && (r[O] = b)
            })
        }), l += u.nrows
    })
}

function jm(e, t) {
    var r = Oe(t.data),
        a = {
            "!ref": "A1"
        },
        n = e[xr(r[2][0].data)],
        i = $e(n[0].meta[1][0].data);
    if (i != 6001) throw new Error("6000 unexpected reference to ".concat(i));
    return Km(e, n[0], a), a
}

function Ym(e, t) {
    var r, a = Oe(t.data),
        n = {
            name: (r = a[1]) != null && r[0] ? Q0(a[1][0].data) : "",
            sheets: []
        },
        i = Pn(a[2], xr);
    return i.forEach(function(s) {
        e[s].forEach(function(f) {
            var c = $e(f.meta[1][0].data);
            c == 6e3 && n.sheets.push(jm(e, f))
        })
    }), n
}

function Jm(e, t) {
    var r = Wn(),
        a = Oe(t.data),
        n = Pn(a[1], xr);
    if (n.forEach(function(i) {
            e[i].forEach(function(s) {
                var f = $e(s.meta[1][0].data);
                if (f == 2) {
                    var c = Ym(e, s);
                    c.sheets.forEach(function(o, l) {
                        Hn(r, o, l == 0 ? c.name : c.name + "_" + l, !0)
                    })
                }
            })
        }), r.SheetNames.length == 0) throw new Error("Empty NUMBERS file");
    return r
}

function H0(e) {
    var t, r, a, n, i = {},
        s = [];
    if (e.FullPaths.forEach(function(c) {
            if (c.match(/\.iwpv2/)) throw new Error("Unsupported password protection")
        }), e.FileIndex.forEach(function(c) {
            if (c.name.match(/\.iwa$/)) {
                var o;
                try {
                    o = Mr(c.content)
                } catch (h) {
                    return console.log("?? " + c.content.length + " " + (h.message || h))
                }
                var l;
                try {
                    l = Br(o)
                } catch (h) {
                    return console.log("## " + (h.message || h))
                }
                l.forEach(function(h) {
                    i[h.id] = h.messages, s.push(h.id)
                })
            }
        }), !s.length) throw new Error("File has no messages");
    var f = ((n = (a = (r = (t = i == null ? void 0 : i[1]) == null ? void 0 : t[0]) == null ? void 0 : r.meta) == null ? void 0 : a[1]) == null ? void 0 : n[0].data) && $e(i[1][0].meta[1][0].data) == 1 && i[1][0];
    if (f || s.forEach(function(c) {
            i[c].forEach(function(o) {
                var l = $e(o.meta[1][0].data) >>> 0;
                if (l == 1)
                    if (!f) f = o;
                    else throw new Error("Document has multiple roots")
            })
        }), !f) throw new Error("Cannot find Document root");
    return Jm(i, f)
}

function Zm(e, t, r) {
    var a, n, i, s;
    if (!((a = e[6]) != null && a[0]) || !((n = e[7]) != null && n[0])) throw "Mutation only works on post-BNC storages!";
    var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && $e(e[8][0].data) > 0 || !1;
    if (f) throw "Math only works with normal offsets";
    for (var c = 0, o = Wt(e[7][0].data), l = 0, h = [], x = Wt(e[4][0].data), d = 0, v = [], u = 0; u < t.length; ++u) {
        if (t[u] == null) {
            o.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535);
            continue
        }
        o.setUint16(u * 2, l, !0), x.setUint16(u * 2, d, !0);
        var p, k;
        switch (typeof t[u]) {
            case "string":
                p = U0({
                    t: "s",
                    v: t[u]
                }, r), k = W0({
                    t: "s",
                    v: t[u]
                }, r);
                break;
            case "number":
                p = U0({
                    t: "n",
                    v: t[u]
                }, r), k = W0({
                    t: "n",
                    v: t[u]
                }, r);
                break;
            case "boolean":
                p = U0({
                    t: "b",
                    v: t[u]
                }, r), k = W0({
                    t: "b",
                    v: t[u]
                }, r);
                break;
            default:
                throw new Error("Unsupported value " + t[u])
        }
        h.push(p), l += p.length, v.push(k), d += k.length, ++c
    }
    for (e[2][0].data = Ie(c); u < e[7][0].data.length / 2; ++u) o.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535, !0);
    return e[6][0].data = Tt(h), e[3][0].data = Tt(v), c
}

function qm(e, t) {
    if (!t || !t.numbers) throw new Error("Must pass a `numbers` option -- check the README");
    var r = e.Sheets[e.SheetNames[0]];
    e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
    var a = Ar(r["!ref"]);
    a.s.r = a.s.c = 0;
    var n = !1;
    a.e.c > 9 && (n = !0, a.e.c = 9), a.e.r > 49 && (n = !0, a.e.r = 49), n && console.error("The Numbers writer is currently limited to ".concat(we(a)));
    var i = m0(r, {
            range: a,
            header: 1
        }),
        s = ["~Sh33tJ5~"];
    i.forEach(function(P) {
        return P.forEach(function(D) {
            typeof D == "string" && s.push(D)
        })
    });
    var f = {},
        c = [],
        o = xe.read(t.numbers, {
            type: "base64"
        });
    o.FileIndex.map(function(P, D) {
        return [P, o.FullPaths[D]]
    }).forEach(function(P) {
        var D = P[0],
            R = P[1];
        if (D.type == 2 && D.name.match(/\.iwa/)) {
            var j = D.content,
                re = Mr(j),
                te = Br(re);
            te.forEach(function(Q) {
                c.push(Q.id), f[Q.id] = {
                    deps: [],
                    location: R,
                    type: $e(Q.messages[0].meta[1][0].data)
                }
            })
        }
    }), c.sort(function(P, D) {
        return P - D
    });
    var l = c.filter(function(P) {
        return P > 1
    }).map(function(P) {
        return [P, Ie(P)]
    });
    o.FileIndex.map(function(P, D) {
        return [P, o.FullPaths[D]]
    }).forEach(function(P) {
        var D = P[0];
        if (P[1], !!D.name.match(/\.iwa/)) {
            var R = Br(Mr(D.content));
            R.forEach(function(j) {
                j.messages.forEach(function(re) {
                    l.forEach(function(te) {
                        j.messages.some(function(Q) {
                            return $e(Q.meta[1][0].data) != 11006 && Mm(Q.data, te[1])
                        }) && f[te[0]].deps.push(j.id)
                    })
                })
            })
        }
    });
    for (var h = xe.find(o, f[1].location), x = Br(Mr(h.content)), d, v = 0; v < x.length; ++v) {
        var u = x[v];
        u.id == 1 && (d = u)
    }
    var p = xr(Oe(d.messages[0].data)[1][0].data);
    for (h = xe.find(o, f[p].location), x = Br(Mr(h.content)), v = 0; v < x.length; ++v) u = x[v], u.id == p && (d = u);
    for (p = xr(Oe(d.messages[0].data)[2][0].data), h = xe.find(o, f[p].location), x = Br(Mr(h.content)), v = 0; v < x.length; ++v) u = x[v], u.id == p && (d = u);
    for (p = xr(Oe(d.messages[0].data)[2][0].data), h = xe.find(o, f[p].location), x = Br(Mr(h.content)), v = 0; v < x.length; ++v) u = x[v], u.id == p && (d = u);
    var k = Oe(d.messages[0].data);
    {
        k[6][0].data = Ie(a.e.r + 1), k[7][0].data = Ie(a.e.c + 1);
        var A = xr(k[46][0].data),
            g = xe.find(o, f[A].location),
            O = Br(Mr(g.content));
        {
            for (var b = 0; b < O.length && O[b].id != A; ++b);
            if (O[b].id != A) throw "Bad ColumnRowUIDMapArchive";
            var N = Oe(O[b].messages[0].data);
            N[1] = [], N[2] = [], N[3] = [];
            for (var F = 0; F <= a.e.c; ++F) {
                var B = [];
                B[1] = B[2] = [{
                    type: 0,
                    data: Ie(F + 420690)
                }], N[1].push({
                    type: 2,
                    data: cr(B)
                }), N[2].push({
                    type: 0,
                    data: Ie(F)
                }), N[3].push({
                    type: 0,
                    data: Ie(F)
                })
            }
            N[4] = [], N[5] = [], N[6] = [];
            for (var I = 0; I <= a.e.r; ++I) B = [], B[1] = B[2] = [{
                type: 0,
                data: Ie(I + 726270)
            }], N[4].push({
                type: 2,
                data: cr(B)
            }), N[5].push({
                type: 0,
                data: Ie(I)
            }), N[6].push({
                type: 0,
                data: Ie(I)
            });
            O[b].messages[0].data = cr(N)
        }
        g.content = Yt(jt(O)), g.size = g.content.length, delete k[46];
        var z = Oe(k[4][0].data);
        {
            z[7][0].data = Ie(a.e.r + 1);
            var G = Oe(z[1][0].data),
                L = xr(G[2][0].data);
            g = xe.find(o, f[L].location), O = Br(Mr(g.content));
            {
                if (O[0].id != L) throw "Bad HeaderStorageBucket";
                var J = Oe(O[0].messages[0].data);
                for (I = 0; I < i.length; ++I) {
                    var le = Oe(J[2][0].data);
                    le[1][0].data = Ie(I), le[4][0].data = Ie(i[I].length), J[2][I] = {
                        type: J[2][0].type,
                        data: cr(le)
                    }
                }
                O[0].messages[0].data = cr(J)
            }
            g.content = Yt(jt(O)), g.size = g.content.length;
            var ie = xr(z[2][0].data);
            g = xe.find(o, f[ie].location), O = Br(Mr(g.content));
            {
                if (O[0].id != ie) throw "Bad HeaderStorageBucket";
                for (J = Oe(O[0].messages[0].data), F = 0; F <= a.e.c; ++F) le = Oe(J[2][0].data), le[1][0].data = Ie(F), le[4][0].data = Ie(a.e.r + 1), J[2][F] = {
                    type: J[2][0].type,
                    data: cr(le)
                };
                O[0].messages[0].data = cr(J)
            }
            g.content = Yt(jt(O)), g.size = g.content.length;
            var ue = xr(z[4][0].data);
            (function() {
                for (var P = xe.find(o, f[ue].location), D = Br(Mr(P.content)), R, j = 0; j < D.length; ++j) {
                    var re = D[j];
                    re.id == ue && (R = re)
                }
                var te = Oe(R.messages[0].data);
                {
                    te[3] = [];
                    var Q = [];
                    s.forEach(function(y, Be) {
                        Q[1] = [{
                            type: 0,
                            data: Ie(Be)
                        }], Q[2] = [{
                            type: 0,
                            data: Ie(1)
                        }], Q[3] = [{
                            type: 2,
                            data: Bm(y)
                        }], te[3].push({
                            type: 2,
                            data: cr(Q)
                        })
                    })
                }
                R.messages[0].data = cr(te);
                var Z = jt(D),
                    Ee = Yt(Z);
                P.content = Ee, P.size = P.content.length
            })();
            var ce = Oe(z[3][0].data);
            {
                var be = ce[1][0];
                delete ce[2];
                var V = Oe(be.data);
                {
                    var de = xr(V[2][0].data);
                    (function() {
                        for (var P = xe.find(o, f[de].location), D = Br(Mr(P.content)), R, j = 0; j < D.length; ++j) {
                            var re = D[j];
                            re.id == de && (R = re)
                        }
                        var te = Oe(R.messages[0].data);
                        {
                            delete te[6], delete ce[7];
                            var Q = new Uint8Array(te[5][0].data);
                            te[5] = [];
                            for (var Z = 0, Ee = 0; Ee <= a.e.r; ++Ee) {
                                var y = Oe(Q);
                                Z += Zm(y, i[Ee], s), y[1][0].data = Ie(Ee), te[5].push({
                                    data: cr(y),
                                    type: 2
                                })
                            }
                            te[1] = [{
                                type: 0,
                                data: Ie(a.e.c + 1)
                            }], te[2] = [{
                                type: 0,
                                data: Ie(a.e.r + 1)
                            }], te[3] = [{
                                type: 0,
                                data: Ie(Z)
                            }], te[4] = [{
                                type: 0,
                                data: Ie(a.e.r + 1)
                            }]
                        }
                        R.messages[0].data = cr(te);
                        var Be = jt(D),
                            ye = Yt(Be);
                        P.content = ye, P.size = P.content.length
                    })()
                }
                be.data = cr(V)
            }
            z[3][0].data = cr(ce)
        }
        k[4][0].data = cr(z)
    }
    d.messages[0].data = cr(k);
    var ge = jt(x),
        C = Yt(ge);
    return h.content = C, h.size = h.content.length, o
}

function ic(e) {
    return function(r) {
        for (var a = 0; a != e.length; ++a) {
            var n = e[a];
            r[n[0]] === void 0 && (r[n[0]] = n[1]), n[2] === "n" && (r[n[0]] = Number(r[n[0]]))
        }
    }
}

function Ln(e) {
    ic([
        ["cellNF", !1],
        ["cellHTML", !0],
        ["cellFormula", !0],
        ["cellStyles", !1],
        ["cellText", !0],
        ["cellDates", !1],
        ["sheetStubs", !1],
        ["sheetRows", 0, "n"],
        ["bookDeps", !1],
        ["bookSheets", !1],
        ["bookProps", !1],
        ["bookFiles", !1],
        ["bookVBA", !1],
        ["password", ""],
        ["WTF", !1]
    ])(e)
}

function Bn(e) {
    ic([
        ["cellDates", !1],
        ["bookSST", !1],
        ["bookType", "xlsx"],
        ["compression", !1],
        ["WTF", !1]
    ])(e)
}

function Qm(e) {
    return Fe.WS.indexOf(e) > -1 ? "sheet" : e == Fe.CS ? "chart" : e == Fe.DS ? "dialog" : e == Fe.MS ? "macro" : e && e.length ? e : "sheet"
}

function eg(e, t) {
    if (!e) return 0;
    try {
        e = t.map(function(a) {
            return a.id || (a.id = a.strRelID), [a.name, e["!id"][a.id].Target, Qm(e["!id"][a.id].Type)]
        })
    } catch {
        return null
    }
    return !e || e.length === 0 ? null : e
}

function rg(e, t, r, a, n, i, s, f, c, o, l, h) {
    try {
        i[a] = ka(Ir(e, r, !0), t);
        var x = er(e, t),
            d;
        switch (f) {
            case "sheet":
                d = Tp(x, t, n, c, i[a], o, l, h);
                break;
            case "chart":
                if (d = Sp(x, t, n, c, i[a], o, l, h), !d || !d["!drawel"]) break;
                var v = ma(d["!drawel"].Target, t),
                    u = Ia(v),
                    p = lx(Ir(e, v, !0), ka(Ir(e, u, !0), v)),
                    k = ma(p, v),
                    A = Ia(k);
                d = Z2(Ir(e, k, !0), k, c, ka(Ir(e, A, !0), k), o, d);
                break;
            case "macro":
                d = Fp(x, t, n, c, i[a], o, l, h);
                break;
            case "dialog":
                d = Ap(x, t, n, c, i[a], o, l, h);
                break;
            default:
                throw new Error("Unrecognized sheet type " + f)
        }
        s[a] = d;
        var g = [];
        i && i[a] && Ke(i[a]).forEach(function(O) {
            var b = "";
            if (i[a][O].Type == Fe.CMNT) {
                b = ma(i[a][O].Target, t);
                var N = Op(er(e, b, !0), b, c);
                if (!N || !N.length) return;
                Mi(d, N, !1)
            }
            i[a][O].Type == Fe.TCMNT && (b = ma(i[a][O].Target, t), g = g.concat(ux(er(e, b, !0), c)))
        }), g && g.length && Mi(d, g, !0, c.people || [])
    } catch (O) {
        if (c.WTF) throw O
    }
}

function Pr(e) {
    return e.charAt(0) == "/" ? e.slice(1) : e
}

function tg(e, t) {
    if (sa(), t = t || {}, Ln(t), Ur(e, "META-INF/manifest.xml") || Ur(e, "objectdata.xml")) return Yi(e, t);
    if (Ur(e, "Index/Document.iwa")) {
        if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
        if (typeof H0 < "u") {
            if (e.FileIndex) return H0(e);
            var r = xe.utils.cfb_new();
            return ii(e).forEach(function(le) {
                ke(r, le, uo(e, le))
            }), H0(r)
        }
        throw new Error("Unsupported NUMBERS file")
    }
    if (!Ur(e, "[Content_Types].xml")) throw Ur(e, "index.xml.gz") ? new Error("Unsupported NUMBERS 08 file") : Ur(e, "index.xml") ? new Error("Unsupported NUMBERS 09 file") : new Error("Unsupported ZIP file");
    var a = ii(e),
        n = sl(Ir(e, "[Content_Types].xml")),
        i = !1,
        s, f;
    if (n.workbooks.length === 0 && (f = "xl/workbook.xml", er(e, f, !0) && n.workbooks.push(f)), n.workbooks.length === 0) {
        if (f = "xl/workbook.bin", !er(e, f, !0)) throw new Error("Could not find workbook");
        n.workbooks.push(f), i = !0
    }
    n.workbooks[0].slice(-3) == "bin" && (i = !0);
    var c = {},
        o = {};
    if (!t.bookSheets && !t.bookProps) {
        if (Ea = [], n.sst) try {
            Ea = Dp(er(e, Pr(n.sst)), n.sst, t)
        } catch (le) {
            if (t.WTF) throw le
        }
        t.cellStyles && n.themes.length && (c = Cp(Ir(e, n.themes[0].replace(/^\//, ""), !0) || "", n.themes[0], t)), n.style && (o = yp(er(e, Pr(n.style)), n.style, c, t))
    }
    n.links.map(function(le) {
        try {
            var ie = ka(Ir(e, Ia(Pr(le))), le);
            return Rp(er(e, Pr(le)), ie, le, t)
        } catch {}
    });
    var l = Ep(er(e, Pr(n.workbooks[0])), n.workbooks[0], t),
        h = {},
        x = "";
    n.coreprops.length && (x = er(e, Pr(n.coreprops[0]), !0), x && (h = $s(x)), n.extprops.length !== 0 && (x = er(e, Pr(n.extprops[0]), !0), x && xl(x, h, t)));
    var d = {};
    (!t.bookSheets || t.bookProps) && n.custprops.length !== 0 && (x = Ir(e, Pr(n.custprops[0]), !0), x && (d = vl(x, t)));
    var v = {};
    if ((t.bookSheets || t.bookProps) && (l.Sheets ? s = l.Sheets.map(function(ie) {
            return ie.name
        }) : h.Worksheets && h.SheetNames.length > 0 && (s = h.SheetNames), t.bookProps && (v.Props = h, v.Custprops = d), t.bookSheets && typeof s < "u" && (v.SheetNames = s), t.bookSheets ? v.SheetNames : t.bookProps)) return v;
    s = {};
    var u = {};
    t.bookDeps && n.calcchain && (u = Ip(er(e, Pr(n.calcchain)), n.calcchain));
    var p = 0,
        k = {},
        A, g;
    {
        var O = l.Sheets;
        h.Worksheets = O.length, h.SheetNames = [];
        for (var b = 0; b != O.length; ++b) h.SheetNames[b] = O[b].name
    }
    var N = i ? "bin" : "xml",
        F = n.workbooks[0].lastIndexOf("/"),
        B = (n.workbooks[0].slice(0, F + 1) + "_rels/" + n.workbooks[0].slice(F + 1) + ".rels").replace(/^\//, "");
    Ur(e, B) || (B = "xl/_rels/workbook." + N + ".rels");
    var I = ka(Ir(e, B, !0), B.replace(/_rels.*/, "s5s"));
    (n.metadata || []).length >= 1 && (t.xlmeta = Np(er(e, Pr(n.metadata[0])), n.metadata[0], t)), (n.people || []).length >= 1 && (t.people = dx(er(e, Pr(n.people[0])), t)), I && (I = eg(I, l.Sheets));
    var z = er(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
    e: for (p = 0; p != h.Worksheets; ++p) {
        var G = "sheet";
        if (I && I[p] ? (A = "xl/" + I[p][1].replace(/[\/]?xl\//, ""), Ur(e, A) || (A = I[p][1]), Ur(e, A) || (A = B.replace(/_rels\/.*$/, "") + I[p][1]), G = I[p][2]) : (A = "xl/worksheets/sheet" + (p + 1 - z) + "." + N, A = A.replace(/sheet0\./, "sheet.")), g = A.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
            case "number":
                if (p != t.sheets) continue e;
                break;
            case "string":
                if (h.SheetNames[p].toLowerCase() != t.sheets.toLowerCase()) continue e;
                break;
            default:
                if (Array.isArray && Array.isArray(t.sheets)) {
                    for (var L = !1, J = 0; J != t.sheets.length; ++J) typeof t.sheets[J] == "number" && t.sheets[J] == p && (L = 1), typeof t.sheets[J] == "string" && t.sheets[J].toLowerCase() == h.SheetNames[p].toLowerCase() && (L = 1);
                    if (!L) continue e
                }
        }
        rg(e, A, g, h.SheetNames[p], p, k, s, G, t, l, c, o)
    }
    return v = {
        Directory: n,
        Workbook: l,
        Props: h,
        Custprops: d,
        Deps: u,
        Sheets: s,
        SheetNames: h.SheetNames,
        Strings: Ea,
        Styles: o,
        Themes: c,
        SSF: We(ve)
    }, t && t.bookFiles && (e.files ? (v.keys = a, v.files = e.files) : (v.keys = [], v.files = {}, e.FullPaths.forEach(function(le, ie) {
        le = le.replace(/^Root Entry[\/]/, ""), v.keys.push(le), v.files[le] = e.FileIndex[ie]
    }))), t && t.bookVBA && (n.vba.length > 0 ? v.vbaraw = er(e, Pr(n.vba[0]), !0) : n.defaults && n.defaults.bin === Ex && (v.vbaraw = er(e, "xl/vbaProject.bin", !0))), v
}

function ag(e, t) {
    var r = t || {},
        a = "Workbook",
        n = xe.find(e, a);
    try {
        if (a = "/!DataSpaces/Version", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        if (Nu(n.content), a = "/!DataSpaces/DataSpaceMap", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        var i = Pu(n.content);
        if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage") throw new Error("ECMA-376 Encrypted file bad " + a);
        if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        var s = Lu(n.content);
        if (s.length != 1 || s[0] != "StrongEncryptionTransform") throw new Error("ECMA-376 Encrypted file bad " + a);
        if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
        Mu(n.content)
    } catch {}
    if (a = "/EncryptionInfo", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var f = Uu(n.content);
    if (a = "/EncryptedPackage", n = xe.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if (f[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(f[1], n.content, r.password || "", r);
    if (f[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(f[1], n.content, r.password || "", r);
    throw new Error("File is password-protected")
}

function ng(e, t) {
    return t.bookType == "ods" ? nc(e, t) : t.bookType == "numbers" ? qm(e, t) : t.bookType == "xlsb" ? ig(e, t) : sg(e, t)
}

function ig(e, t) {
    Zt = 1024, e && !e.SSF && (e.SSF = We(ve)), e && e.SSF && (sa(), _0(e.SSF), t.revssf = k0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Ta ? t.revStrings = new Map : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
    var r = t.bookType == "xlsb" ? "bin" : "xml",
        a = Rf.indexOf(t.bookType) > -1,
        n = En();
    Bn(t = t || {});
    var i = cn(),
        s = "",
        f = 0;
    if (t.cellXfs = [], At(t.cellXfs, {}, {
            revssf: {
                General: 0
            }
        }), e.Props || (e.Props = {}), s = "docProps/core.xml", ke(i, s, Ks(e.Props, t)), n.coreprops.push(s), Re(t.rels, 2, s, Fe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
        if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
        else {
            for (var c = [], o = 0; o < e.SheetNames.length; ++o)(e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
            e.Props.SheetNames = c
        } for (e.Props.Worksheets = e.Props.SheetNames.length, ke(i, s, Js(e.Props)), n.extprops.push(s), Re(t.rels, 3, s, Fe.EXT_PROPS), e.Custprops !== e.Props && Ke(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ke(i, s, Zs(e.Custprops)), n.custprops.push(s), Re(t.rels, 4, s, Fe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
        var l = {
                "!id": {}
            },
            h = e.Sheets[e.SheetNames[f - 1]],
            x = (h || {})["!type"] || "sheet";
        switch (x) {
            case "chart":
            default:
                s = "xl/worksheets/sheet" + f + "." + r, ke(i, s, Pp(f - 1, s, t, e, l)), n.sheets.push(s), Re(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Fe.WS[0])
        }
        if (h) {
            var d = h["!comments"],
                v = !1,
                u = "";
            d && d.length > 0 && (u = "xl/comments" + f + "." + r, ke(i, u, Mp(d, u)), n.comments.push(u), Re(l, -1, "../comments" + f + "." + r, Fe.CMNT), v = !0), h["!legacy"] && v && ke(i, "xl/drawings/vmlDrawing" + f + ".vml", Of(f, h["!comments"])), delete h["!comments"], delete h["!legacy"]
        }
        l["!id"].rId1 && ke(i, Ia(s), Qt(l))
    }
    return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ke(i, s, Bp(t.Strings, s, t)), n.strs.push(s), Re(t.wbrels, -1, "sharedStrings." + r, Fe.SST)), s = "xl/workbook." + r, ke(i, s, bp(e, s)), n.workbooks.push(s), Re(t.rels, 1, s, Fe.WB), s = "xl/theme/theme1.xml", ke(i, s, Cn(e.Themes, t)), n.themes.push(s), Re(t.wbrels, -1, "theme/theme1.xml", Fe.THEME), s = "xl/styles." + r, ke(i, s, Lp(e, s, t)), n.styles.push(s), Re(t.wbrels, -1, "styles." + r, Fe.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", ke(i, s, e.vbaraw), n.vba.push(s), Re(t.wbrels, -1, "vbaProject.bin", Fe.VBA)), s = "xl/metadata." + r, ke(i, s, Up(s)), n.metadata.push(s), Re(t.wbrels, -1, "metadata." + r, Fe.XLMETA), ke(i, "[Content_Types].xml", Xs(n, t)), ke(i, "_rels/.rels", Qt(t.rels)), ke(i, "xl/_rels/workbook." + r + ".rels", Qt(t.wbrels)), delete t.revssf, delete t.ssf, i
}

function sg(e, t) {
    Zt = 1024, e && !e.SSF && (e.SSF = We(ve)), e && e.SSF && (sa(), _0(e.SSF), t.revssf = k0(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Ta ? t.revStrings = new Map : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
    var r = "xml",
        a = Rf.indexOf(t.bookType) > -1,
        n = En();
    Bn(t = t || {});
    var i = cn(),
        s = "",
        f = 0;
    if (t.cellXfs = [], At(t.cellXfs, {}, {
            revssf: {
                General: 0
            }
        }), e.Props || (e.Props = {}), s = "docProps/core.xml", ke(i, s, Ks(e.Props, t)), n.coreprops.push(s), Re(t.rels, 2, s, Fe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
        if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
        else {
            for (var c = [], o = 0; o < e.SheetNames.length; ++o)(e.Workbook.Sheets[o] || {}).Hidden != 2 && c.push(e.SheetNames[o]);
            e.Props.SheetNames = c
        } e.Props.Worksheets = e.Props.SheetNames.length, ke(i, s, Js(e.Props)), n.extprops.push(s), Re(t.rels, 3, s, Fe.EXT_PROPS), e.Custprops !== e.Props && Ke(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ke(i, s, Zs(e.Custprops)), n.custprops.push(s), Re(t.rels, 4, s, Fe.CUST_PROPS));
    var l = ["SheetJ5"];
    for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
        var h = {
                "!id": {}
            },
            x = e.Sheets[e.SheetNames[f - 1]],
            d = (x || {})["!type"] || "sheet";
        switch (d) {
            case "chart":
            default:
                s = "xl/worksheets/sheet" + f + "." + r, ke(i, s, Gf(f - 1, t, e, h)), n.sheets.push(s), Re(t.wbrels, -1, "worksheets/sheet" + f + "." + r, Fe.WS[0])
        }
        if (x) {
            var v = x["!comments"],
                u = !1,
                p = "";
            if (v && v.length > 0) {
                var k = !1;
                v.forEach(function(A) {
                    A[1].forEach(function(g) {
                        g.T == !0 && (k = !0)
                    })
                }), k && (p = "xl/threadedComments/threadedComment" + f + "." + r, ke(i, p, xx(v, l, t)), n.threadedcomments.push(p), Re(h, -1, "../threadedComments/threadedComment" + f + "." + r, Fe.TCMNT)), p = "xl/comments" + f + "." + r, ke(i, p, If(v)), n.comments.push(p), Re(h, -1, "../comments" + f + "." + r, Fe.CMNT), u = !0
            }
            x["!legacy"] && u && ke(i, "xl/drawings/vmlDrawing" + f + ".vml", Of(f, x["!comments"])), delete x["!comments"], delete x["!legacy"]
        }
        h["!id"].rId1 && ke(i, Ia(s), Qt(h))
    }
    return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ke(i, s, gf(t.Strings, t)), n.strs.push(s), Re(t.wbrels, -1, "sharedStrings." + r, Fe.SST)), s = "xl/workbook." + r, ke(i, s, jf(e)), n.workbooks.push(s), Re(t.rels, 1, s, Fe.WB), s = "xl/theme/theme1.xml", ke(i, s, Cn(e.Themes, t)), n.themes.push(s), Re(t.wbrels, -1, "theme/theme1.xml", Fe.THEME), s = "xl/styles." + r, ke(i, s, Af(e, t)), n.styles.push(s), Re(t.wbrels, -1, "styles." + r, Fe.STY), e.vbaraw && a && (s = "xl/vbaProject.bin", ke(i, s, e.vbaraw), n.vba.push(s), Re(t.wbrels, -1, "vbaProject.bin", Fe.VBA)), s = "xl/metadata." + r, ke(i, s, Df()), n.metadata.push(s), Re(t.wbrels, -1, "metadata." + r, Fe.XLMETA), l.length > 1 && (s = "xl/persons/person.xml", ke(i, s, vx(l)), n.people.push(s), Re(t.wbrels, -1, "persons/person.xml", Fe.PEOPLE)), ke(i, "[Content_Types].xml", Xs(n, t)), ke(i, "_rels/.rels", Qt(t.rels)), ke(i, "xl/_rels/workbook." + r + ".rels", Qt(t.wbrels)), delete t.revssf, delete t.ssf, i
}

function Mn(e, t) {
    var r = "";
    switch ((t || {}).type || "base64") {
        case "buffer":
            return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
        case "base64":
            r = Rr(e.slice(0, 12));
            break;
        case "binary":
            r = e;
            break;
        case "array":
            return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
        default:
            throw new Error("Unrecognized type " + (t && t.type || "undefined"))
    }
    return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)]
}

function fg(e, t) {
    return xe.find(e, "EncryptedPackage") ? ag(e, t) : qf(e, t)
}

function cg(e, t) {
    var r, a = e,
        n = t || {};
    return n.type || (n.type = Te && Buffer.isBuffer(e) ? "buffer" : "base64"), r = _s(a, n), tg(r, n)
}

function sc(e, t) {
    var r = 0;
    e: for (; r < e.length;) switch (e.charCodeAt(r)) {
        case 10:
        case 13:
        case 32:
            ++r;
            break;
        case 60:
            return Z0(e.slice(r), t);
        default:
            break e
    }
    return aa.to_workbook(e, t)
}

function og(e, t) {
    var r = "",
        a = Mn(e, t);
    switch (t.type) {
        case "base64":
            r = Rr(e);
            break;
        case "binary":
            r = e;
            break;
        case "buffer":
            r = e.toString("binary");
            break;
        case "array":
            r = Lt(e);
            break;
        default:
            throw new Error("Unrecognized type " + t.type)
    }
    return a[0] == 239 && a[1] == 187 && a[2] == 191 && (r = Pe(r)), t.type = "binary", sc(r, t)
}

function lg(e, t) {
    var r = e;
    return t.type == "base64" && (r = Rr(r)), r = mt.utils.decode(1200, r.slice(2), "str"), t.type = "binary", sc(r, t)
}

function hg(e) {
    return e.match(/[^\x00-\x7F]/) ? et(e) : e
}

function V0(e, t, r, a) {
    return a ? (r.type = "string", aa.to_workbook(e, r)) : aa.to_workbook(t, r)
}

function es(e, t) {
    tn();
    var r = t || {};
    if (typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return es(new Uint8Array(e), (r = We(r), r.type = "array", r));
    typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
    var a = e,
        n = [0, 0, 0, 0],
        i = !1;
    if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), ra = {}, r.dateNF && (ra.dateNF = r.dateNF), r.type || (r.type = Te && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = Te ? "buffer" : "binary", a = no(e), typeof Uint8Array < "u" && !Te && (r.type = "array")), r.type == "string" && (i = !0, r.type = "binary", r.codepage = 65001, a = hg(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
        var s = new ArrayBuffer(3),
            f = new Uint8Array(s);
        if (f.foo = "bar", !f.foo) return r = We(r), r.type = "array", es(an(a), r)
    }
    switch ((n = Mn(a, r))[0]) {
        case 208:
            if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return fg(xe.read(a, r), r);
            break;
        case 9:
            if (n[1] <= 8) return qf(a, r);
            break;
        case 60:
            return Z0(a, r);
        case 73:
            if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
            if (n[1] === 68) return pu(a, r);
            break;
        case 84:
            if (n[1] === 65 && n[2] === 66 && n[3] === 76) return pf.to_workbook(a, r);
            break;
        case 80:
            return n[1] === 75 && n[2] < 9 && n[3] < 9 ? cg(a, r) : V0(e, a, r, i);
        case 239:
            return n[3] === 60 ? Z0(a, r) : V0(e, a, r, i);
        case 255:
            if (n[1] === 254) return lg(a, r);
            if (n[1] === 0 && n[2] === 2 && n[3] === 0) return Nt.to_workbook(a, r);
            break;
        case 0:
            if (n[1] === 0 && (n[2] >= 2 && n[3] === 0 || n[2] === 0 && (n[3] === 8 || n[3] === 9))) return Nt.to_workbook(a, r);
            break;
        case 3:
        case 131:
        case 139:
        case 140:
            return J0.to_workbook(a, r);
        case 123:
            if (n[1] === 92 && n[2] === 114 && n[3] === 116) return Tf.to_workbook(a, r);
            break;
        case 10:
        case 13:
        case 32:
            return og(a, r);
        case 137:
            if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
            break
    }
    return vu.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31 ? J0.to_workbook(a, r) : V0(e, a, r, i)
}

function fc(e, t) {
    switch (t.type) {
        case "base64":
        case "binary":
            break;
        case "buffer":
        case "array":
            t.type = "";
            break;
        case "file":
            return Ua(t.file, xe.write(e, {
                type: Te ? "buffer" : ""
            }));
        case "string":
            throw new Error("'string' output type invalid for '" + t.bookType + "' files");
        default:
            throw new Error("Unrecognized type " + t.type)
    }
    return xe.write(e, t)
}

function ug(e, t) {
    var r = We(t || {}),
        a = ng(e, r);
    return xg(a, r)
}

function xg(e, t) {
    var r = {},
        a = Te ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
    if (t.compression && (r.compression = "DEFLATE"), t.password) r.type = a;
    else switch (t.type) {
        case "base64":
            r.type = "base64";
            break;
        case "binary":
            r.type = "string";
            break;
        case "string":
            throw new Error("'string' output type invalid for '" + t.bookType + "' files");
        case "buffer":
        case "file":
            r.type = a;
            break;
        default:
            throw new Error("Unrecognized type " + t.type)
    }
    var n = e.FullPaths ? xe.write(e, {
        fileType: "zip",
        type: {
            nodebuffer: "buffer",
            string: "binary"
        } [r.type] || r.type,
        compression: !!t.compression
    }) : e.generate(r);
    if (typeof Deno < "u" && typeof n == "string") {
        if (t.type == "binary" || t.type == "base64") return n;
        n = new Uint8Array(g0(n))
    }
    return t.password && typeof encrypt_agile < "u" ? fc(encrypt_agile(n, t.password), t) : t.type === "file" ? Ua(t.file, n) : t.type == "string" ? Pe(n) : n
}

function dg(e, t) {
    var r = t || {},
        a = hm(e, r);
    return fc(a, r)
}

function Qr(e, t, r) {
    r || (r = "");
    var a = r + e;
    switch (t.type) {
        case "base64":
            return Aa(et(a));
        case "binary":
            return et(a);
        case "string":
            return e;
        case "file":
            return Ua(t.file, a, "utf8");
        case "buffer":
            return Te ? ht(a, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(a) : Qr(a, {
                type: "binary"
            }).split("").map(function(n) {
                return n.charCodeAt(0)
            })
    }
    throw new Error("Unrecognized type " + t.type)
}

function vg(e, t) {
    switch (t.type) {
        case "base64":
            return Aa(e);
        case "binary":
            return e;
        case "string":
            return e;
        case "file":
            return Ua(t.file, e, "binary");
        case "buffer":
            return Te ? ht(e, "binary") : e.split("").map(function(r) {
                return r.charCodeAt(0)
            })
    }
    throw new Error("Unrecognized type " + t.type)
}

function n0(e, t) {
    switch (t.type) {
        case "string":
        case "base64":
        case "binary":
            for (var r = "", a = 0; a < e.length; ++a) r += String.fromCharCode(e[a]);
            return t.type == "base64" ? Aa(r) : t.type == "string" ? Pe(r) : r;
        case "file":
            return Ua(t.file, e);
        case "buffer":
            return e;
        default:
            throw new Error("Unrecognized type " + t.type)
    }
}

function pg(e, t) {
    tn(), fp(e);
    var r = We(t || {});
    if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
        r.type = "binary";
        var a = pg(e, r);
        return r.type = "array", g0(a)
    }
    var n = 0;
    if (r.sheet && (typeof r.sheet == "number" ? n = r.sheet : n = e.SheetNames.indexOf(r.sheet), !e.SheetNames[n])) throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
    switch (r.bookType || "xlsb") {
        case "xml":
        case "xlml":
            return Qr(nm(e, r), r);
        case "slk":
        case "sylk":
            return Qr(vf.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "htm":
        case "html":
            return Qr(ec(e.Sheets[e.SheetNames[n]], r), r);
        case "txt":
            return vg(cc(e.Sheets[e.SheetNames[n]], r), r);
        case "csv":
            return Qr(Un(e.Sheets[e.SheetNames[n]], r), r, "\uFEFF");
        case "dif":
            return Qr(pf.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "dbf":
            return n0(J0.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "prn":
            return Qr(aa.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "rtf":
            return Qr(Tf.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "eth":
            return Qr(mf.from_sheet(e.Sheets[e.SheetNames[n]], r), r);
        case "fods":
            return Qr(nc(e, r), r);
        case "wk1":
            return n0(Nt.sheet_to_wk1(e.Sheets[e.SheetNames[n]], r), r);
        case "wk3":
            return n0(Nt.book_to_wk3(e, r), r);
        case "biff2":
            r.biff || (r.biff = 2);
        case "biff3":
            r.biff || (r.biff = 3);
        case "biff4":
            return r.biff || (r.biff = 4), n0(Qf(e, r), r);
        case "biff5":
            r.biff || (r.biff = 5);
        case "biff8":
        case "xla":
        case "xls":
            return r.biff || (r.biff = 8), dg(e, r);
        case "xlsx":
        case "xlsm":
        case "xlam":
        case "xlsb":
        case "numbers":
        case "ods":
            return ug(e, r);
        default:
            throw new Error("Unrecognized bookType |" + r.bookType + "|")
    }
}

function mg(e, t, r, a, n, i, s, f) {
    var c = Ze(r),
        o = f.defval,
        l = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"),
        h = !0,
        x = n === 1 ? [] : {};
    if (n !== 1)
        if (Object.defineProperty) try {
            Object.defineProperty(x, "__rowNum__", {
                value: r,
                enumerable: !1
            })
        } catch {
            x.__rowNum__ = r
        } else x.__rowNum__ = r;
    if (!s || e[r])
        for (var d = t.s.c; d <= t.e.c; ++d) {
            var v = s ? e[r][d] : e[a[d] + c];
            if (v === void 0 || v.t === void 0) {
                if (o === void 0) continue;
                i[d] != null && (x[i[d]] = o);
                continue
            }
            var u = v.v;
            switch (v.t) {
                case "z":
                    if (u == null) break;
                    continue;
                case "e":
                    u = u == 0 ? null : void 0;
                    break;
                case "s":
                case "d":
                case "b":
                case "n":
                    break;
                default:
                    throw new Error("unrecognized type " + v.t)
            }
            if (i[d] != null) {
                if (u == null)
                    if (v.t == "e" && u === null) x[i[d]] = null;
                    else if (o !== void 0) x[i[d]] = o;
                else if (l && u === null) x[i[d]] = null;
                else continue;
                else x[i[d]] = l && (v.t !== "n" || v.t === "n" && f.rawNumbers !== !1) ? u : lt(v, u, f);
                u != null && (h = !1)
            }
        }
    return {
        row: x,
        isempty: h
    }
}

function m0(e, t) {
    if (e == null || e["!ref"] == null) return [];
    var r = {
            t: "n",
            v: 0
        },
        a = 0,
        n = 1,
        i = [],
        s = 0,
        f = "",
        c = {
            s: {
                r: 0,
                c: 0
            },
            e: {
                r: 0,
                c: 0
            }
        },
        o = t || {},
        l = o.range != null ? o.range : e["!ref"];
    switch (o.header === 1 ? a = 1 : o.header === "A" ? a = 2 : Array.isArray(o.header) ? a = 3 : o.header == null && (a = 0), typeof l) {
        case "string":
            c = De(l);
            break;
        case "number":
            c = De(e["!ref"]), c.s.r = l;
            break;
        default:
            c = l
    }
    a > 0 && (n = 0);
    var h = Ze(c.s.r),
        x = [],
        d = [],
        v = 0,
        u = 0,
        p = Array.isArray(e),
        k = c.s.r,
        A = 0,
        g = {};
    p && !e[k] && (e[k] = []);
    var O = o.skipHidden && e["!cols"] || [],
        b = o.skipHidden && e["!rows"] || [];
    for (A = c.s.c; A <= c.e.c; ++A)
        if (!(O[A] || {}).hidden) switch (x[A] = Ge(A), r = p ? e[k][A] : e[x[A] + h], a) {
            case 1:
                i[A] = A - c.s.c;
                break;
            case 2:
                i[A] = x[A];
                break;
            case 3:
                i[A] = o.header[A - c.s.c];
                break;
            default:
                if (r == null && (r = {
                        w: "__EMPTY",
                        t: "s"
                    }), f = s = lt(r, null, o), u = g[s] || 0, !u) g[s] = 1;
                else {
                    do f = s + "_" + u++; while (g[f]);
                    g[s] = u, g[f] = 1
                }
                i[A] = f
        }
    for (k = c.s.r + n; k <= c.e.r; ++k)
        if (!(b[k] || {}).hidden) {
            var N = mg(e, c, k, x, a, i, p, o);
            (N.isempty === !1 || (a === 1 ? o.blankrows !== !1 : o.blankrows)) && (d[v++] = N.row)
        } return d.length = v, d
}
var rs = /"/g;

function gg(e, t, r, a, n, i, s, f) {
    for (var c = !0, o = [], l = "", h = Ze(r), x = t.s.c; x <= t.e.c; ++x)
        if (a[x]) {
            var d = f.dense ? (e[r] || [])[x] : e[a[x] + h];
            if (d == null) l = "";
            else if (d.v != null) {
                c = !1, l = "" + (f.rawNumbers && d.t == "n" ? d.v : lt(d, null, f));
                for (var v = 0, u = 0; v !== l.length; ++v)
                    if ((u = l.charCodeAt(v)) === n || u === i || u === 34 || f.forceQuotes) {
                        l = '"' + l.replace(rs, '""') + '"';
                        break
                    } l == "ID" && (l = '"ID"')
            } else d.f != null && !d.F ? (c = !1, l = "=" + d.f, l.indexOf(",") >= 0 && (l = '"' + l.replace(rs, '""') + '"')) : l = "";
            o.push(l)
        } return f.blankrows === !1 && c ? null : o.join(s)
}

function Un(e, t) {
    var r = [],
        a = t ?? {};
    if (e == null || e["!ref"] == null) return "";
    var n = De(e["!ref"]),
        i = a.FS !== void 0 ? a.FS : ",",
        s = i.charCodeAt(0),
        f = a.RS !== void 0 ? a.RS : `
`,
        c = f.charCodeAt(0),
        o = new RegExp((i == "|" ? "\\|" : i) + "+$"),
        l = "",
        h = [];
    a.dense = Array.isArray(e);
    for (var x = a.skipHidden && e["!cols"] || [], d = a.skipHidden && e["!rows"] || [], v = n.s.c; v <= n.e.c; ++v)(x[v] || {}).hidden || (h[v] = Ge(v));
    for (var u = 0, p = n.s.r; p <= n.e.r; ++p)(d[p] || {}).hidden || (l = gg(e, n, p, h, s, c, i, a), l != null && (a.strip && (l = l.replace(o, "")), (l || a.blankrows !== !1) && r.push((u++ ? f : "") + l)));
    return delete a.dense, r.join("")
}

function cc(e, t) {
    t || (t = {}), t.FS = "	", t.RS = `
`;
    var r = Un(e, t);
    return r
}

function _g(e) {
    var t = "",
        r, a = "";
    if (e == null || e["!ref"] == null) return [];
    var n = De(e["!ref"]),
        i = "",
        s = [],
        f, c = [],
        o = Array.isArray(e);
    for (f = n.s.c; f <= n.e.c; ++f) s[f] = Ge(f);
    for (var l = n.s.r; l <= n.e.r; ++l)
        for (i = Ze(l), f = n.s.c; f <= n.e.c; ++f)
            if (t = s[f] + i, r = o ? (e[l] || [])[f] : e[t], a = "", r !== void 0) {
                if (r.F != null) {
                    if (t = r.F, !r.f) continue;
                    a = r.f, t.indexOf(":") == -1 && (t = t + ":" + t)
                }
                if (r.f != null) a = r.f;
                else {
                    if (r.t == "z") continue;
                    if (r.t == "n" && r.v != null) a = "" + r.v;
                    else if (r.t == "b") a = r.v ? "TRUE" : "FALSE";
                    else if (r.w !== void 0) a = "'" + r.w;
                    else {
                        if (r.v === void 0) continue;
                        r.t == "s" ? a = "'" + r.v : a = "" + r.v
                    }
                }
                c[c.length] = t + "=" + a
            } return c
}

function oc(e, t, r) {
    var a = r || {},
        n = +!a.skipHeader,
        i = e || {},
        s = 0,
        f = 0;
    if (i && a.origin != null)
        if (typeof a.origin == "number") s = a.origin;
        else {
            var c = typeof a.origin == "string" ? Xe(a.origin) : a.origin;
            s = c.r, f = c.c
        } var o, l = {
        s: {
            c: 0,
            r: 0
        },
        e: {
            c: f,
            r: s + t.length - 1 + n
        }
    };
    if (i["!ref"]) {
        var h = De(i["!ref"]);
        l.e.c = Math.max(l.e.c, h.e.c), l.e.r = Math.max(l.e.r, h.e.r), s == -1 && (s = h.e.r + 1, l.e.r = s + t.length - 1 + n)
    } else s == -1 && (s = 0, l.e.r = t.length - 1 + n);
    var x = a.header || [],
        d = 0;
    t.forEach(function(u, p) {
        Ke(u).forEach(function(k) {
            (d = x.indexOf(k)) == -1 && (x[d = x.length] = k);
            var A = u[k],
                g = "z",
                O = "",
                b = pe({
                    c: f + d,
                    r: s + p + n
                });
            o = Ma(i, b), A && typeof A == "object" && !(A instanceof Date) ? i[b] = A : (typeof A == "number" ? g = "n" : typeof A == "boolean" ? g = "b" : typeof A == "string" ? g = "s" : A instanceof Date ? (g = "d", a.cellDates || (g = "n", A = nr(A)), O = a.dateNF || ve[14]) : A === null && a.nullError && (g = "e", A = 0), o ? (o.t = g, o.v = A, delete o.w, delete o.R, O && (o.z = O)) : i[b] = o = {
                t: g,
                v: A
            }, O && (o.z = O))
        })
    }), l.e.c = Math.max(l.e.c, f + x.length - 1);
    var v = Ze(s);
    if (n)
        for (d = 0; d < x.length; ++d) i[Ge(d + f) + v] = {
            t: "s",
            v: x[d]
        };
    return i["!ref"] = we(l), i
}

function wg(e, t) {
    return oc(null, e, t)
}

function Ma(e, t, r) {
    if (typeof t == "string") {
        if (Array.isArray(e)) {
            var a = Xe(t);
            return e[a.r] || (e[a.r] = []), e[a.r][a.c] || (e[a.r][a.c] = {
                t: "z"
            })
        }
        return e[t] || (e[t] = {
            t: "z"
        })
    }
    return typeof t != "number" ? Ma(e, pe(t)) : Ma(e, pe({
        r: t,
        c: r || 0
    }))
}

function kg(e, t) {
    if (typeof t == "number") {
        if (t >= 0 && e.SheetNames.length > t) return t;
        throw new Error("Cannot find sheet # " + t)
    } else if (typeof t == "string") {
        var r = e.SheetNames.indexOf(t);
        if (r > -1) return r;
        throw new Error("Cannot find sheet name |" + t + "|")
    } else throw new Error("Cannot find sheet |" + t + "|")
}

function Wn() {
    return {
        SheetNames: [],
        Sheets: {}
    }
}

function Hn(e, t, r, a) {
    var n = 1;
    if (!r)
        for (; n <= 65535 && e.SheetNames.indexOf(r = "Sheet" + n) != -1; ++n, r = void 0);
    if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
    if (a && e.SheetNames.indexOf(r) >= 0) {
        var i = r.match(/(^.*?)(\d+)$/);
        n = i && +i[2] || 0;
        var s = i && i[1] || r;
        for (++n; n <= 65535 && e.SheetNames.indexOf(r = s + n) != -1; ++n);
    }
    if (Kf(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
    return e.SheetNames.push(r), e.Sheets[r] = t, r
}

function Eg(e, t, r) {
    e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
    var a = kg(e, t);
    switch (e.Workbook.Sheets[a] || (e.Workbook.Sheets[a] = {}), r) {
        case 0:
        case 1:
        case 2:
            break;
        default:
            throw new Error("Bad sheet visibility setting " + r)
    }
    e.Workbook.Sheets[a].Hidden = r
}

function Tg(e, t) {
    return e.z = t, e
}

function lc(e, t, r) {
    return t ? (e.l = {
        Target: t
    }, r && (e.l.Tooltip = r)) : delete e.l, e
}

function Sg(e, t, r) {
    return lc(e, "#" + t, r)
}

function Fg(e, t, r) {
    e.c || (e.c = []), e.c.push({
        t,
        a: r || "SheetJS"
    })
}

function Ag(e, t, r, a) {
    for (var n = typeof t != "string" ? t : De(t), i = typeof t == "string" ? t : we(t), s = n.s.r; s <= n.e.r; ++s)
        for (var f = n.s.c; f <= n.e.c; ++f) {
            var c = Ma(e, s, f);
            c.t = "n", c.F = i, delete c.v, s == n.s.r && f == n.s.c && (c.f = r, a && (c.D = !0))
        }
    return e
}
var yg = {
    encode_col: Ge,
    encode_row: Ze,
    encode_cell: pe,
    encode_range: we,
    decode_col: pn,
    decode_row: vn,
    split_cell: Bo,
    decode_cell: Xe,
    decode_range: Ar,
    format_cell: lt,
    sheet_add_aoa: Bs,
    sheet_add_json: oc,
    sheet_add_dom: rc,
    aoa_to_sheet: fa,
    json_to_sheet: wg,
    table_to_sheet: tc,
    table_to_book: Nm,
    sheet_to_csv: Un,
    sheet_to_txt: cc,
    sheet_to_json: m0,
    sheet_to_html: ec,
    sheet_to_formulae: _g,
    sheet_to_row_object_array: m0,
    sheet_get_cell: Ma,
    book_new: Wn,
    book_append_sheet: Hn,
    book_set_sheet_visibility: Eg,
    cell_set_number_format: Tg,
    cell_set_hyperlink: lc,
    cell_set_internal_link: Sg,
    cell_add_comment: Fg,
    sheet_set_array_formula: Ag,
    consts: {
        SHEET_VISIBLE: 0,
        SHEET_HIDDEN: 1,
        SHEET_VERY_HIDDEN: 2
    }
};
export {
    es as r, yg as u, pg as w
};
// This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}