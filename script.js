// 한국 고속도로 데이터 (실제 좌표 기반)
const highways = [
    {
        id: 1,
        name: "경부고속도로",
        number: "1호선",
        coordinates: [
            [37.5665, 126.9780], // 서울
            [37.4138, 127.5183], // 서울 남부
            [37.2636, 127.0286], // 수원
            [36.9776, 127.0276], // 천안
            [36.8065, 127.1522], // 천안JC
            [36.3504, 127.3845], // 대전
            [36.0190, 127.3049], // 대전 남부
            [35.8714, 127.7298], // 김천
            [35.8242, 128.1555], // 구미
            [35.8714, 128.6018], // 대구
            [35.5384, 128.7317], // 경산
            [35.1796, 129.0756], // 부산
        ],
        description: "서울과 부산을 연결하는 한국 최초의 고속도로",
        hint: "한국에서 가장 유명한 고속도로로, 수도와 제2의 도시를 연결합니다.",
        acceptedAnswers: ["경부고속도로", "경부", "1호선", "1호", "kyeongbu"]
    },
    {
        id: 2,
        name: "영동고속도로",
        number: "50호선",
        coordinates: [
            [37.5665, 126.9780], // 서울
            [37.6014, 127.0841], // 서울 동부
            [37.6364, 127.2678], // 구리
            [37.5326, 127.4370], // 하남
            [37.4201, 127.6189], // 광주
            [37.3422, 127.9195], // 여주
            [37.2820, 128.1555], // 원주 서부
            [37.3422, 128.4102], // 원주
            [37.8853, 128.8289], // 평창
            [37.7749, 129.0756], // 강릉
        ],
        description: "서울에서 강릉을 연결하는 영서와 영동지방을 잇는 고속도로",
        hint: "올림픽이 열린 평창과 강릉을 지나는 고속도로입니다.",
        acceptedAnswers: ["영동고속도로", "영동", "50호선", "50호", "yeongdong"]
    },
    {
        id: 3,
        name: "서해안고속도로",
        number: "15호선",
        coordinates: [
            [37.5665, 126.9780], // 서울
            [37.4563, 126.7052], // 인천
            [37.2636, 126.8003], // 시흥
            [37.0841, 126.6120], // 안산
            [36.9776, 126.4307], // 평택
            [36.6053, 126.4953], // 서산
            [36.3504, 126.4580], // 보령
            [35.9716, 126.4953], // 군산
            [35.8242, 126.8830], // 전주
            [35.1596, 126.8526], // 광주
            [34.7604, 126.6120], // 목포
        ],
        description: "서울에서 목포까지 서해안을 따라 이어지는 고속도로",
        hint: "서쪽 바다를 끼고 달리는 고속도로로, 해안선을 따라 건설되었습니다.",
        acceptedAnswers: ["서해안고속도로", "서해안", "15호선", "15호", "seohae"]
    },
    {
        id: 4,
        name: "중부고속도로",
        number: "35호선",
        coordinates: [
            [37.5665, 126.9780], // 서울
            [37.4138, 127.2678], // 하남
            [37.1542, 127.4370], // 이천
            [36.9776, 127.9195], // 여주
            [36.7717, 128.0476], // 충주
            [36.6364, 128.2607], // 제천
            [36.5384, 128.4102], // 단양
            [36.4201, 128.6561], // 영주
            [36.0190, 128.8289], // 안동
        ],
        description: "수도권에서 영남지역을 잇는 내륙 고속도로",
        hint: "한반도의 중앙부를 관통하는 고속도로입니다.",
        acceptedAnswers: ["중부고속도로", "중부", "35호선", "35호", "jungbu"]
    },
    {
        id: 5,
        name: "남해고속도로",
        number: "10호선",
        coordinates: [
            [35.1796, 129.0756], // 부산
            [35.2220, 128.6818], // 김해
            [35.2384, 128.2607], // 진주
            [35.1596, 127.9195], // 사천
            [34.9406, 127.7363], // 순천
            [34.7604, 126.8526], // 광주
            [34.8165, 126.4307], // 목포
        ],
        description: "부산에서 목포까지 남해안을 따라 이어지는 고속도로",
        hint: "남쪽 바다를 끼고 달리며, 한려해상국립공원을 지납니다.",
        acceptedAnswers: ["남해고속도로", "남해", "10호선", "10호", "namhae"]
    }
];

class HighwayQuiz {
    constructor() {
        this.map = null;
        this.currentHighway = null;
        this.currentPolyline = null;
        this.score = 0;
        this.currentQuestion = 1;
        this.totalQuestions = highways.length;
        this.usedHighways = [];
        this.hintUsed = false;
        
        this.initMap();
        this.initEventListeners();
        this.startNewQuestion();
    }
    
    initMap() {
        // 한국 중심 좌표로 지도 초기화
        this.map = L.map('map').setView([36.5, 127.5], 7);
        
        // OpenStreetMap 타일 레이어 추가
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }
    
    initEventListeners() {
        const submitBtn = document.getElementById('submit-btn');
        const nextBtn = document.getElementById('next-btn');
        const hintBtn = document.getElementById('hint-btn');
        const answerInput = document.getElementById('answer-input');
        
        submitBtn.addEventListener('click', () => this.checkAnswer());
        nextBtn.addEventListener('click', () => this.nextQuestion());
        hintBtn.addEventListener('click', () => this.showHint());
        
        // Enter 키로 정답 제출
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitBtn.disabled) {
                this.checkAnswer();
            }
        });
    }
    
    startNewQuestion() {
        // 사용하지 않은 고속도로 중에서 랜덤 선택
        const availableHighways = highways.filter(h => !this.usedHighways.includes(h.id));
        
        if (availableHighways.length === 0) {
            this.endGame();
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableHighways.length);
        this.currentHighway = availableHighways[randomIndex];
        this.usedHighways.push(this.currentHighway.id);
        this.hintUsed = false;
        
        this.displayHighway();
        this.resetUI();
        this.updateScore();
    }
    
    displayHighway() {
        // 기존 폴리라인 제거
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline);
        }
        
        // 새 폴리라인 생성 (파란색)
        this.currentPolyline = L.polyline(this.currentHighway.coordinates, {
            color: '#3498db',
            weight: 4,
            opacity: 0.8
        }).addTo(this.map);
        
        // 지도 범위를 고속도로에 맞게 조정
        this.map.fitBounds(this.currentPolyline.getBounds(), {
            padding: [20, 20]
        });
    }
    
    resetUI() {
        const answerInput = document.getElementById('answer-input');
        const submitBtn = document.getElementById('submit-btn');
        const nextBtn = document.getElementById('next-btn');
        const resultSection = document.getElementById('result-section');
        
        answerInput.value = '';
        answerInput.disabled = false;
        submitBtn.disabled = false;
        nextBtn.style.display = 'none';
        resultSection.className = 'result-section';
        resultSection.innerHTML = '';
        
        answerInput.focus();
    }
    
    checkAnswer() {
        const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
        const acceptedAnswers = this.currentHighway.acceptedAnswers.map(answer => answer.toLowerCase());
        
        if (userAnswer === '') {
            this.showResult('답을 입력해주세요.', 'incorrect');
            return;
        }
        
        const isCorrect = acceptedAnswers.some(answer => 
            answer.includes(userAnswer) || userAnswer.includes(answer)
        );
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
    }
    
    handleCorrectAnswer() {
        // 점수 추가 (힌트 사용시 절반 점수)
        const points = this.hintUsed ? 5 : 10;
        this.score += points;
        
        // 폴리라인을 초록색으로 변경
        this.currentPolyline.setStyle({
            color: '#27ae60',
            weight: 5
        });
        
        const resultText = `🎉 정답입니다! (+${points}점)\n` +
                          `${this.currentHighway.name} (${this.currentHighway.number})\n` +
                          `${this.currentHighway.description}`;
        
        this.showResult(resultText, 'correct');
        this.disableInput();
        
        if (this.currentQuestion < this.totalQuestions) {
            document.getElementById('next-btn').style.display = 'block';
        } else {
            setTimeout(() => this.endGame(), 2000);
        }
    }
    
    handleIncorrectAnswer() {
        this.showResult('❌ 틀렸습니다. 다시 시도해보세요!', 'incorrect');
        
        // 3초 후 결과 메시지 지우기
        setTimeout(() => {
            document.getElementById('result-section').innerHTML = '';
            document.getElementById('result-section').className = 'result-section';
        }, 3000);
    }
    
    showHint() {
        if (this.hintUsed) return;
        
        this.hintUsed = true;
        this.showResult(`💡 힌트: ${this.currentHighway.hint}`, 'hint');
        
        // 힌트 버튼 비활성화
        document.getElementById('hint-btn').disabled = true;
        document.getElementById('hint-btn').textContent = '힌트 사용됨';
    }
    
    showResult(message, type) {
        const resultSection = document.getElementById('result-section');
        resultSection.className = `result-section ${type}`;
        resultSection.innerHTML = message.replace(/\n/g, '<br>');
    }
    
    disableInput() {
        document.getElementById('answer-input').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.startNewQuestion();
        
        // 힌트 버튼 재활성화
        const hintBtn = document.getElementById('hint-btn');
        hintBtn.disabled = false;
        hintBtn.textContent = '💡 힌트';
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('current-question').textContent = this.currentQuestion;
    }
    
    endGame() {
        const percentage = Math.round((this.score / (this.totalQuestions * 10)) * 100);
        let grade = '';
        
        if (percentage >= 90) grade = '🏆 최고급';
        else if (percentage >= 80) grade = '🥇 우수';
        else if (percentage >= 70) grade = '🥈 양호';
        else if (percentage >= 60) grade = '🥉 보통';
        else grade = '📚 학습필요';
        
        const finalMessage = 
            `🎊 퀴즈 완료!\n\n` +
            `최종 점수: ${this.score}/${this.totalQuestions * 10}점 (${percentage}%)\n` +
            `등급: ${grade}\n\n` +
            `페이지를 새로고침하면 다시 시작할 수 있습니다.`;
        
        this.showResult(finalMessage, 'correct');
        
        // 모든 버튼 비활성화
        document.getElementById('hint-btn').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    }
}

// 페이지 로드 완료 후 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new HighwayQuiz();
});
