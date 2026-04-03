async function predict() {
    let input = document.getElementById("input").value.trim();

    if (!input) {
        document.getElementById("result").innerText = "⚠️ Nhập dữ liệu!";
        return;
    }

    try {
        // ví dụ nhập: 0,491,0,...
        let arr = input.split(",").map(Number);

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
        document.getElementById("result").innerText = "❌ Không kết nối được API!";
    }
}
