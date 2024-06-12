
        async function query(data) {
            const response = await fetch("https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6", {
                headers: {
                    Authorization: "Bearer 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",
                },
                method: "POST",
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        }

        async function getAnswer() {
            const questionInput = document.getElementById('question');
            const responseDiv = document.getElementById('response');

            try {
                const response = await query({
                    "inputs": questionInput.value,
                    "parameters": {
                        "max_length": 100
                    }
                });
                const summaryText = response[0].summary_text; // JSON 응답에서 summary_text만 추출
                responseDiv.textContent = summaryText; // 추출한 텍스트만 표시
                questionInput.value = ''; // 질문 입력 필드를 비웁니다.
            } catch (error) {
                console.error('오류 발생:', error);
                responseDiv.textContent = '죄송합니다. 오류가 발생했습니다.';
            }
        }
