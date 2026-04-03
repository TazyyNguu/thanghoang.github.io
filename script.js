async function predict() {
    let input = document.getElementById("input").value.trim();

    if (!input) {
        document.getElementById("result").innerText = "⚠️ Nhập dữ liệu!";
        return;
    }

    try {
        let arr = input.split(",");

        let res = await fetch("https://ai-backend-1-4bzm.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: arr })
        });

        let data = await res.json();

        document.getElementById("result").innerText =
            data.result || data.error;

    } catch (err) {
        document.getElementById("result").innerText = "❌ Lỗi kết nối API!";
    }
}
