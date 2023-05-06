const darks = document.querySelectorAll(".-dark");
const lights = document.querySelectorAll(".-light");
const list = [...darks, ...lights];
const timertext = document.getElementById("timertext");
const avgmoney = document.getElementById("avgmoney");
let theme = localStorage.getItem("theme");
if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

const innercir = document.getElementById("innercir");
const root = document.documentElement.style;
const originalTextColor = getComputedStyle(document.body).getPropertyValue(
    "--text",
);
const telegramlogo = document.querySelector(".telegramlogo");

const toggle = () => {
    list.forEach((el) => {
        if (theme === "dark") {
            el.classList.remove("-dark");
            el.classList.add("-light");
        } else {
            el.classList.remove("-light");
            el.classList.add("-dark");
        }
    });
    if (theme === "dark") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");

        theme = "light";

        avgmoney?.classList.remove("darkText");
        avgmoney?.classList.add("lightText");

        innercir?.style.setProperty("stroke", "#000");
        timertext?.style.setProperty("stroke", "#000");

        telegramlogo.style.setProperty("filter", "invert(1)");

        document.querySelectorAll("select").forEach((x) => {
            x.style.setProperty(
                "background-image",
                `url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
            );
        });

        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");

        innercir?.style.setProperty("stroke", "#FFF");
        timertext?.style.setProperty("stroke", "#FFF");

        telegramlogo.style.setProperty("filter", "invert(0)");

        theme = "dark";

        avgmoney?.classList.remove("lightText");
        avgmoney?.classList.add("darkText");

        document.querySelectorAll("select").forEach((x) => {
            x.style.setProperty(
                "background-image",
                `url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>")`,
            );
        });

        localStorage.setItem("theme", "dark");
    }
};

const globalData = {
    names: [],
    data: [],
};

const fetchTicker = async (value) => {
    if (!globalData.data.find((x) => x.data.key === value + "inr")) {
        const response = await fetch("http://localhost:3000/tickers", {
            method: "POST",
            body: JSON.stringify({
                ticker: value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        // // // // console.log(data);

        return data;
    } else {
        return globalData.data.find((x) => x.data.key === value + "inr");
    }
};

const fivemins = document.getElementById("5mins");
const onehour = document.getElementById("1hour");
const oneday = document.getElementById("1day");
const oneweek = document.getElementById("1week");
const tickerlist = document.getElementById("tickerlist");

const renderTicker = async (value) => {
    const data = await fetchTicker(value);
    // console.log(data);
    avgmoney.innerHTML = " ₹ " + data.avg.toLocaleString();
    fivemins.innerHTML = data.FiveMins + "%";
    onehour.innerHTML = data.OneHour + "%";
    oneday.innerHTML = data.OneDay + "%";
    oneweek.innerHTML = data.OneWeek + "%";
    const x = data.data;

    /*
        <tr class="item -dark">
                    <td class="text">1</td>
                    <td class="platform">
                        <div class="logo">
                        <img src="./assets/telegram.png" alt="logo" >
                        </div>
                        <div class="text">telegram</div>
                    </td>
                    <td class="text">₹ 25,40,000</td>
                    <td class="text">₹ 25,27,500 / ₹ 25,40,000</td>
                    <td class="text down">-3.31 %</td>
                    <td class="text down">▼ ₹ 86,977</td>

                </tr>
        */
    const tr = document.createElement("tr");
    tr.classList.add("item");
    if (theme === "dark") {
        tr.classList.add("-dark");
    } else {
        tr.classList.add("-light");
    }
    const td1 = document.createElement("td");
    td1.classList.add("text");
    td1.innerHTML = 1;
    const td2 = document.createElement("td");
    td2.classList.add("platform");
    const div1 = document.createElement("div");
    div1.classList.add("logo");

    const div2 = document.createElement("div");
    div2.classList.add("text");
    div2.innerHTML = "WazirX";
    const img = document.createElement("img");
    img.src = "./assets/wazirX.png";
    img.alt = "logo";
    div1.appendChild(img);
    const td3 = document.createElement("td");
    td3.classList.add("text");
    td3.style.width = "128px";
    td3.innerHTML = "₹ " + parseInt(x.last).toLocaleString();
    const td4 = document.createElement("td");
    td4.classList.add("text");
    td4.id = "buy-sell";
    td4.innerHTML =
        "₹ " +
        parseFloat(parseFloat(x.buy).toFixed(2)).toLocaleString() +
        " / ₹ " +
        parseFloat(parseFloat(x.sell).toFixed(2)).toLocaleString();
    const td5 = document.createElement("td");
    td5.classList.add("text");
    td5.style.width = "129px";
    const change = data.avg - x.last;
    const changepercent = (change / data.avg) * 100;
    if (changepercent > 0) {
        td5.classList.add("up");
        td5.innerHTML = "▲ " + changepercent.toFixed(2) + " %";
    } else {
        td5.classList.add("down");
        td5.innerHTML = "▼ " + changepercent.toFixed(2) + " %";
    }
    const td6 = document.createElement("td");
    td6.style.width = "163px";
    td6.classList.add("text");
    if (change > 0) {
        td6.classList.add("up");
        td6.innerHTML = "▲ ₹ " + change.toLocaleString();
    } else {
        td6.classList.add("down");
        td6.innerHTML = "▼ ₹ " + change.toLocaleString();
    }

    td2.appendChild(div1);
    td2.appendChild(div2);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    list.push(tr);
    tickerlist.innerHTML = "";
    tickerlist.appendChild(tr);
};

const fetchNames = async () => {
    const response = await fetch("http://localhost:3000/tickers/names");
    const data = await response.json();
    // // console.log(data);

    return data;
};

const cryptomenu = document.getElementById("crypto");

const renderMenu = async () => {
    const data = await fetchNames();
    /*
    example

     <option value="BTC" role="menuitem">BTC</option>
                    <option value="ETH" role="menuitem">ETH</option>
                    <option value="USDT" role="menuitem">USDT</option>
                    <option value="XRP" role="menuitem">XRP</option>
                    <option value="TRX" role="menuitem">TRX</option>
                    <option value="DASH" role="menuitem">DASH</option>
                    <option value="ZEC" role="menuitem">ZEC</option>
                    <option value="XEM" role="menuitem">XEM</option>
                    <option value="IOST" role="menuitem">IOST</option>
                    <option value="WIN" role="menuitem">WIN</option>
                    <option value="BTT" role="menuitem">BTT</option>
                    <option value="WRX" role="menuitem">WRX</option>
    */
    cryptomenu.innerHTML = "";
    data.data.forEach((x) => {
        const option = document.createElement("option");
        option.value = x;
        option.innerHTML = x;
        cryptomenu.appendChild(option);
    });
};

const updateSelected = () => {
    const selected = cryptomenu.value;
    // // console.log(selected);
    renderTicker(selected);
};
const updateTickers = async () => {
    const response = await fetch("http://localhost:3000/tickers?limit=10");
    const data = await response.json();
    // // console.log(data);
    globalData.data = data.data;
    renderTicker(cryptomenu.value);
};
document.addEventListener("DOMContentLoaded", async () => {
    if (theme === "dark") {
        document.getElementById("theme").checked = true;
        innercir?.style.setProperty("stroke", "#FFF");
        timertext?.style.setProperty("stoke", "#FFF");
        avgmoney?.classList.remove("lightText");
        avgmoney?.classList.add("darkText");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        telegramlogo.style.setProperty("filter", "invert(0)");
        list.forEach((el) => {
            el.classList.remove("-light");
            el.classList.add("-dark");
        });
    } else {
        innercir?.style.setProperty("stroke", "#000");
        timertext?.style.setProperty("stroke", "#000");
        telegramlogo.style.setProperty("filter", "invert(1)");
        document.getElementById("theme").checked = false;
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        avgmoney?.classList.remove("darkText");
        avgmoney?.classList.add("lightText");

        list.forEach((el) => {
            el.classList.remove("-dark");
            el.classList.add("-light");
        });
    }
    globalData.names = (await fetchNames()).data;
    // console.log(globalData);
    renderMenu();
    updateTickers();
});
