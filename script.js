// ================== PREDICT AI ==================
async function predict() {
    let input = document.getElementById("input").value.trim();

    if (!input) {
        document.getElementById("result").innerText = "⚠️ Nhập dữ liệu!";
        return;
    }

    try {
        // giữ nguyên string (vì có tcp, http,...)
        let arr = input.split(",");

        let res = await fetch("https://ai-backend-1-4bzm.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: arr })
        });

        // kiểm tra lỗi HTTP
        if (!res.ok) {
            throw new Error("API lỗi: " + res.status);
        }

        let data = await res.json();

        if (data.result) {
            document.getElementById("result").innerText = "Kết quả: " + data.result;
        } else {
            document.getElementById("result").innerText = "Lỗi: " + data.error;
        }

    } catch (err) {
        console.error(err);
        document.getElementById("result").innerText = "❌ Lỗi kết nối API!";
    }
}


// ================== LOAD CSV ==================
function loadCSV() {
    let fileInput = document.getElementById("fileInput");

    if (!fileInput.files.length) {
        alert("⚠️ Chọn file CSV trước!");
        return;
    }

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        let text = e.target.result.trim();
        let rows = text.split("\n");

        let table = document.getElementById("table");
        table.innerHTML = "";

        rows.forEach(row => {
            if (row.trim() === "") return;

            let cols = row.split(",");
            let tr = document.createElement("tr");

            cols.forEach(col => {
                let td = document.createElement("td");
                td.textContent = col.trim();
                tr.appendChild(td);
            });

            table.appendChild(tr);
        });
    };

    reader.readAsText(file);
}
