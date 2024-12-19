//	euBRASIL(*), módulo de Serviços Externos( Correio, Shopee, Aliexpress, China Post, 
const jn = ({
    userID: a,
    onBackBtnClickHnd: t,
    create: s,
    product: i
}) => {
    Q();
    const {
        editProduct: n,
        addProduct: r
    } = ft(), {
        language: l
    } = N(), [o, c] = g.useState({
        id: "",
        nome: "",
        date: new Date().toISOString().split("T")[0],
        transportadora: "",
        codigo: "",
        orderID: ""
    }), [d, p] = g.useState(!1);
    g.useEffect(() => {
        i && c(i)
    }, [i]);
    const m = (h, v) => {
            c({
                ...o,
                [h]: v
            })
        },
        u = h => {
            let v = "";
            switch (o.transportadora) {
                case "Correios":
                case "Jadlog":
                    v = `https://app.melhorrastreio.com.br/app/${o.codigo}`;
                    break;
                case "Shopee":
                case "Aliexpress":
                case "Gear Best":
                case "China Post":
                    v = `https://www.muambator.com.br/pacotes/${o.codigo}/detalhes/`;
                    break;
                default:
                    v = `https://parcelsapp.com/pt/tracking/${o.codigo}`;
                    break
            }
            return v
        },
        x = async h => {
            if (h.preventDefault(), await ge("encomendas") === !0) return;
            if (d) {
                let f = `*${l.modal_table_info}:*
*${l.modal_product}:* ${o.nome}
*${l.modal_table_code}:* ${o.codigo}
*${l.modal_table_rastreio}:* ${u(o.id)}`;
                const j = a.length > 15 ? a + "@g.us" : a + "@c.us";
                k.Chat("sendTxt", {
                    id: j,
                    msg: f
                })
            }
            const v = {
                id: (i == null ? void 0 : i.id) || se(),
                nome: o.nome,
                date: o.date,
                transportadora: o.transportadora,
                codigo: o.codigo,
                orderID: o.orderID
            };
            v.nome.length > 0 && v.date.length > 0 && v.transportadora.length > 0 && v.codigo.length > 0 ? (s ? r(a, v) : n(a, (i == null ? void 0 : i.id) || "", v), t(), A({
                type: "Success",
                title: l.success,
                message: `${s?l.encomendas_Notif_success:l.encomendas_Notif_success_edit}`,
                position: "topRight"
            })) : A({
                type: "Error",
                title: l.error,
                message: l.agendamento_Notif_error,
                position: "topRight"
            })
        };
    return e.jsxs("form", {
        className: "w-[600px] grid gap-4 overflow-auto pr-1",
        style: {
            maxHeight: "calc(100vh - 70px)"
        },
        onSubmit: x,
        children: [e.jsx(z, {
            children: s ? l.modal_orders_title : l.modal_orders_title_edit
        }), e.jsxs("div", {
            className: "flex justify-between gap-6",
            children: [e.jsxs("div", {
                className: "form-control w-full",
                children: [e.jsx("label", {
                    className: "label",
                    children: e.jsx("span", {
                        className: "label-text",
                        children: l.modal_table_name
                    })
                }), e.jsx("input", {
                    type: "text",
                    placeholder: l.modal_table_insert_name,
                    className: "input input-bordered w-full input-sm",
                    value: o.nome,
                    onChange: h => m("nome", h.target.value)
                })]
            }), e.jsxs("div", {
                className: "form-control w-full",
                children: [e.jsx("label", {
                    className: "label",
                    children: e.jsx("span", {
                        className: "label-text",
                        children: `ID (${l.opcional})`
                    })
                }), e.jsx("input", {
                    type: "text",
                    placeholder: l.modal_table_insert_id,
                    className: "input input-bordered w-full input-sm",
                    value: o.orderID,
                    onChange: h => m("orderID", h.target.value)
                })]
            })]
        }), e.jsxs("div", {
            className: "flex justify-between gap-6",
            children: [e.jsxs("div", {
                className: "form-control w-full max-w-xs",
                children: [e.jsx("label", {
                    className: "label",
                    children: e.jsx("span", {
                        className: "label-text",
                        children: l.modal_table_data
                    })
                }), e.jsx("input", {
                    type: "Date",
                    className: "input input-bordered w-full max-w-xs input-sm",
                    value: o.date,
                    onChange: h => m("date", h.target.value)
                })]
            }), e.jsxs("div", {
                className: "form-control w-full max-w-xs",
                children: [e.jsx("label", {
                    className: "label",
                    children: e.jsx("span", {
                        className: "label-text",
                        children: l.modal_table_code
                    })
                }), e.jsx("input", {
                    type: "text",
                    className: "input input-bordered w-full max-w-xs input-sm",
                    placeholder: l.modal_table_insert_code,
                    value: o.codigo,
                    onChange: h => m("codigo", h.target.value)
                })]
            })]
        }), e.jsxs("div", {
            className: "form-control w-full",
            children: [e.jsx("label", {
                className: "label",
                children: e.jsx("span", {
                    className: "label-text",
                    children: l.modal_table_transport
                })
            }), e.jsxs("select", {
                className: "!py-0 select select-bordered !select-sm w-full",
                value: o.transportadora,
                onChange: h => m("transportadora", h.target.value),
                children: [e.jsx("option", {
                    value: "",
                    children: l.noneSelected
                }), e.jsx("option", {
                    value: "Correios",
                    children: "Correios"
                }), e.jsx("option", {
                    value: "Jadlog",
                    children: "Jadlog"
                }), e.jsx("option", {
                    value: "Shopee",
                    children: "Shopee"
                }), e.jsx("option", {
                    value: "Aliexpress",
                    children: "Aliexpress"
                }), e.jsx("option", {
                    value: "Gear Best",
                    children: "Gear Best"
                }), e.jsx("option", {
                    value: "China Post",
                    children: "China Post"
                }), e.jsx("option", {
                    value: l.modal_table_outras,
                    children: l.modal_table_outras
                })]
            })]
        }), e.jsxs("div", {
            className: "flex gap-3 w-full items-center",
            children: [e.jsx("input", {
                type: "checkbox",
                name: "Send Mensage",
                checked: d,
                onChange: () => p(!d)
            }), e.jsx(M, {
                children: l.modal_encomendas_checkBoxText
            })]
        }), e.jsxs("div", {
            className: "flex justify-between gap-2 pt-4 w-full",
            children: [e.jsx(R, {
                funcao: t,
                name: l.cancel
            }), e.jsx(R, {
                funcao: x,
                name: s ? l.modal_add : l.edit
            })]
        })]
    })
};
