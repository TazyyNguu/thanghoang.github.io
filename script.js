async function predict() {
    let input = document.getElementById("input").value.trim();

    if (!input) {
        document.getElementById("result").innerText = "⚠️ Nhập dữ liệu!";
        return;
    }

    // nhập dạng: 1,2,3,4
    let arr = input.split(",").map(Number);

    try {
        let res = await fetch("https://ai-backend.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: arr })
        });

        let data = await res.json();

        if (data.result) {
            document.getElementById("result").innerText = "Kết quả: " + data.result;
        } else {
            document.getElementById("result").innerText = "Lỗi: " + data.error;
        }

    } catch (err) {
        document.getElementById("result").innerText = "Lỗi kết nối API!";
    }
}

// đọc CSV
function loadCSV() {
    let file = document.getElementById("fileInput").files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let text = e.target.result;
        let rows = text.split("\n");
        let table = document.getElementById("table");
        table.innerHTML = "";

        rows.forEach(row => {
            let cols = row.split(",");
            let tr = "<tr>";
            cols.forEach(col => {
                tr += "<td>" + col + "</td>";
            });
            tr += "</tr>";
            table.innerHTML += tr;
        });
    };
    reader.readAsText(file);
}
