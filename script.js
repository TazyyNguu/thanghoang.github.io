function run() {
    let input = document.getElementById("input").value;

    if (input === "") {
        document.getElementById("output").innerText = "⚠️ Nhập dữ liệu!";
    } else {
        document.getElementById("output").innerText = "👉 Bạn nhập: " + input;
    }
}
