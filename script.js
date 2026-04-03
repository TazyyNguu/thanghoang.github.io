function predict() {
    let input = document.getElementById("input").value;

    if (input === "") {
        document.getElementById("result").innerText = "⚠️ Nhập dữ liệu!";
    } else {
        // demo AI giả lập
        let result = input.length % 2 === 0 ? "Bình thường" : "Tấn công";

        document.getElementById("result").innerText = "Kết quả: " + result;
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
