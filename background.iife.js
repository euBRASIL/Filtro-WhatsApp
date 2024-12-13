(function() {
    "use strict";

    function s(e, t, o) {
        chrome.tabs.query({
            url: e
        }, function(i) {
            i.length > 0 && i.forEach(n => {
                chrome.tabs.sendMessage(n.id, {
                    action: t,
                    dados: o
                })
            })
        })
    }
    async function c(e) {
        return new Promise((t, o) => {
            chrome.storage.local.get([e], function(i) {
                i[e] === void 0 ? o() : t(i[e])
            })
        })
    }

    function m(e) {
        const t = new Date(e),
            o = new Date,
            i = t.getTime() - o.getTime();
        return i <= 12e4 || i < 0
    }
    async function p() {
        const e = await c("notifications"),
            t = [],
            o = [];
        let i = 0;
        for (let n of e) !n.timeOut && m(`${n.date}T${n.time}`) && (n.timeOut = !0, o.push(n)), n.timeOut && !n.read && i++, t.push(n);
        s("https://web.whatsapp.com/*", "Update_Notificação", {
            update: t,
            dispart: o,
            tam: i
        })
    }
	
	/*
    const u = {
        name: "watidy",
        version: "7.2",
        cript_key: "ffce211a-7b07-4d91-ba5d-c40bb4034a83",
        backend: "https://painel.wascript.com.br/",
        webSocket: {
            "multi-atendimento": "https://multi-atendimento.wascript.com.br",
            "api-whatsapp": "https://api-whatsapp.wascript.com.br"
        },
        painel_Gestor: "https://waclientes.sigeapp.com.br/login.php",
        audio_transcriber: "https://audio-transcriber.wascript.com.br/transcription",
        domSelector: "https://domselector.watidy.com/index.php",
        logs_erros: "https://app.watools.com.br/api/public/waTidy-logs",
        midiaLimit: 50
    }; */
	
    async function l() {
        try {
            const t = await (await fetch(u.domSelector)).json();
            typeof t == "object" && typeof t.version == "string" && s("https://web.whatsapp.com/*", "Update_DomSelector", {
                version: t.version
            })
        } catch (e) {
            console.error("Error ao tentar Capturar o Dom Selector virtual", e)
        }
    }

    function a() {
        chrome.alarms.get("One_Minute", e => {
            e || chrome.alarms.create("One_Minute", {
                periodInMinutes: 1
            })
        }), chrome.alarms.get("Five_Minutes", e => {
            e || chrome.alarms.create("Five_Minutes", {
                periodInMinutes: 5
            })
        }), chrome.alarms.get("Ten_Minutes", e => {
            e || chrome.alarms.create("Ten_Minutes", {
                periodInMinutes: 10
            })
        }), chrome.alarms.get("Thirty_Minutes", e => {
            e || chrome.alarms.create("Thirty_Minutes", {
                periodInMinutes: 30
            })
        })
    }
    chrome.alarms.onAlarm.addListener(e => {
        switch (e.name) {
            case "One_Minute":
                s("https://web.whatsapp.com/*", "Update_Agendamento", {}), s("https://web.whatsapp.com/*", "Update_Status", {}), s("https://web.whatsapp.com/*", "Update_BackupAutomatico", {}), p();
                break;
            case "Five_Minutes":
                s("https://web.whatsapp.com/*", "license_update", {}), s("https://web.whatsapp.com/*", "dispatch_timing_follow", {});
                break;
            case "Ten_Minutes":
                l();
                break;
            case "Thirty_Minutes":
                s("https://web.whatsapp.com/*", "Remote-Notificacao", {});
                break
        }
    });
    async function h() {
        chrome.storage.local.get(null, e => {
            chrome.storage.local.set({
                agendamentos: e.agendamentos || [],
                agendamentosNaoDisparados: e.agendamentosNaoDisparados || [],
                sendAfterWhatsAppOpens: e.sendAfterWhatsAppOpens || !1,
                guardaMsg: e.guardaMsg || [],
                notifications: e.notifications || [],
                userTabs: e.userTabs || [],
                contatos: e.contatos || [],
                notes: e.notes || [],
                agendaMsg: e.agendaMsg || [],
                perfil: e.perfil || [],
                categoria: e.categoria || [],
                initSystem: e.initSystem || !1,
                backupAutomatico: e.backupAutomatico || {
                    date: "",
                    time: "",
                    recurrency: "",
                    items: []
                },
                crm: e.crm || [],
                agrupamentos: e.agrupamentos || [],
                relatorio: e.relatorio || [],
                medias: e.medias || [],
                encomendas: e.encomendas || [],
                autoatendimento: e.autoatendimento || [],
                FollowUp: e.FollowUp || [],
                webhook: e.webhook || [],
                IA: e.IA || {
                    activeIA: null,
                    keyGemini: "",
                    keyGPT: ""
                },
                status: e.status || [],
                pinChat: e.pinChat || [],
                atendimento: e.atendimento || void 0,
                whatsApi: e.whatsApi || {
                    active: !1,
                    token: "",
                    userID: ""
                },
                initDate: e.initDate || !1
            })
        })
    }

    function r() {
        chrome.tabs.query({
            url: "https://web.whatsapp.com/*"
        }, function(e) {
            e.length > 0 && e[0].id !== void 0 ? chrome.tabs.reload(e[0].id) : chrome.tabs.create({
                url: "https://web.whatsapp.com"
            })
        })
    }
	
/*
    function d() { chrome.runtime.setUninstallURL(`https://painel.wascript.com.br/api/urls/uninstalURL?id=${chrome.runtime.id}`) }

    function f(e) {
        e.reason === "install" && fetch(`https://painel.wascript.com.br/api/urls/install?id=${chrome.runtime.id}`).then(t => {
            if (!t.ok) throw new Error("Erro na requisição: " + t.status);
            return t.json()
        }).then(t => {
            t.success && chrome.tabs.create({
                url: t.url
            })
        }).catch(t => {
            console.error("Erro ao fazer a requisição:", t)
        })
    } */

    function w() {
        const e = chrome.runtime.getURL("crm/src/index.html");
        chrome.tabs.query({
            url: e
        }, function(t) {
            t.length > 0 && t.forEach(o => {
                o.id !== void 0 && chrome.tabs.remove(o.id)
            }), chrome.tabs.create({
                url: e
            })
        })
    }
    a(), chrome.action.onClicked.addListener(() => {
        a(), r()
    }), chrome.runtime.onInstalled.addListener(async function(e) {
        f(e), r(), a(), h(), d()
    }), chrome.runtime.onMessage.addListener((e, t, o) => {
        switch (e.message) {
            case "CRM":
                w();
                break
        }
        return !0
    })
})();