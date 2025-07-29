// 주요 도시 좌표 데이터
const cities = {
    seoul: { name: "서울", coord: [37.5665, 126.9780] },
    busan: { name: "부산", coord: [35.1796, 129.0756] },
    daegu: { name: "대구", coord: [35.8714, 128.6018] },
    incheon: { name: "인천", coord: [37.4563, 126.7052] },
    gwangju: { name: "광주", coord: [35.1596, 126.8526] },
    daejeon: { name: "대전", coord: [36.3504, 127.3845] },
    ulsan: { name: "울산", coord: [35.5384, 129.3114] },
    sejong: { name: "세종", coord: [36.4800, 127.2890] },
    gangneung: { name: "강릉", coord: [37.7749, 129.0756] },
    jeonju: { name: "전주", coord: [35.8242, 127.1480] },
    cheonan: { name: "천안", coord: [36.8151, 127.1139] },
    suwon: { name: "수원", coord: [37.2636, 127.0286] }
};

// 미리 정의된 도시 간 경로 데이터
const predefinedRoutes = {
    "seoul-busan": [
        {
            id: 1,
            name: "경부고속도로 직행",
            distance: "417km",
            time: "약 4시간 30분",
            highways: ["경부고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.4138, 127.5183], [37.2636, 127.0286],
                [36.9776, 127.0276], [36.8065, 127.1522], [36.3504, 127.3845],
                [36.0190, 127.3049], [35.8714, 127.7298], [35.8242, 128.1555],
                [35.8714, 128.6018], [35.5384, 128.7317], [35.1796, 129.0756]
            ],
            details: [
                { step: "출발", description: "서울 → 경부고속도로 진입" },
                { step: "경유", description: "수원, 천안, 대전, 김천, 구미, 대구 통과" },
                { step: "도착", description: "부산 도착" }
            ]
        },
        {
            id: 2,
            name: "중부고속도로 경유",
            distance: "445km",
            time: "약 5시간",
            highways: ["중부고속도로", "경부고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.4138, 127.2678], [37.1542, 127.4370],
                [36.9776, 127.9195], [36.7717, 128.0476], [36.6364, 128.2607],
                [36.4201, 128.6561], [36.0190, 128.8289], [35.8714, 128.6018],
                [35.5384, 128.7317], [35.1796, 129.0756]
            ],
            details: [
                { step: "출발", description: "서울 → 중부고속도로 진입" },
                { step: "환승", description: "안동JC에서 경부고속도로로 환승" },
                { step: "도착", description: "경부고속도로를 통해 부산 도착" }
            ]
        }
    ],
    "seoul-gwangju": [
        {
            id: 1,
            name: "호남고속도로 직행",
            distance: "305km",
            time: "약 3시간 30분",
            highways: ["호남고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.2636, 127.0286], [36.9776, 127.0276],
                [36.8065, 127.1522], [36.3504, 127.3845], [36.1542, 126.9195],
                [35.8242, 126.8830], [35.1596, 126.8526]
            ],
            details: [
                { step: "출발", description: "서울 → 경부고속도로 진입" },
                { step: "환승", description: "논산JC에서 호남고속도로로 환승" },
                { step: "도착", description: "전주, 광주 방면으로 광주 도착" }
            ]
        }
    ]
};

// 한국 고속도로 데이터
const highways = [
    {
        id: 1,
        name: "경부고속도로",
        number: "1호선",
        coordinates: [
            [37.5665, 126.9780], [37.4138, 127.5183], [37.2636, 127.0286],
            [36.9776, 127.0276], [36.8065, 127.1522], [36.3504, 127.3845],
            [36.0190, 127.3049], [35.8714, 127.7298], [35.8242, 128.1555],
            [35.8714, 128.6018], [35.5384, 128.7317], [35.1796, 129.0756]
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
            [37.5665, 126.9780], [37.6014, 127.0841], [37.6364, 127.2678],
            [37.5326, 127.4370], [37.4201, 127.6189], [37.3422, 127.9195],
            [37.2820, 128.1555], [37.3422, 128.4102], [37.8853, 128.8289], [37.7749, 129.0756]
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
            [37.5665, 126.9780], [37.4563, 126.7052], [37.2636, 126.8003],
            [37.0841, 126.6120], [36.9776, 126.4307], [36.6053, 126.4953],
            [36.3504, 126.4580], [35.9716, 126.4953], [35.8242, 126.8830],
            [35.1596, 126.8526], [34.7604, 126.6120]
        ],
        description: "서울에서 목포까지 서해안을 따라 이어지는 고속도로",
        hint: "서쪽 바다를 끼고 달리는 고속도로로, 해안선을 따라 건설되었습니다.",
        acceptedAnswers: ["서해안고속도로", "서해안", "15호선", "15호", "seohae"]
    }
];

// 서울 주요 도로 데이터
const seoulRoads = [
    {
        id: 11,
        name: "외곽순환고속도로",
        number: "100호선",
        coordinates: [
            [37.7014, 126.8841], [37.6364, 127.0678], [37.5665, 127.2780],
            [37.4563, 127.1780], [37.4138, 126.9183], [37.5326, 126.8370],
            [37.6201, 126.7189], [37.7014, 126.8841]
        ],
        description: "서울 외곽을 순환하는 고속도로",
        hint: "서울을 둘러싸는 둥근 모양의 고속도로입니다.",
        acceptedAnswers: ["외곽순환고속도로", "외곽순환", "100호선", "100호", "seoul ring"]
    },
    {
        id: 12,
        name: "강변북로",
        number: "",
        coordinates: [
            [37.5265, 126.8980], [37.5465, 126.9280], [37.5565, 126.9580],
            [37.5765, 126.9880], [37.5965, 127.0180], [37.6165, 127.0480]
        ],
        description: "한강 북쪽을 따라 이어지는 도로",
        hint: "한강 북쪽 둑을 따라 달리는 서울의 대표적인 간선도로입니다.",
        acceptedAnswers: ["강변북로", "강북로", "gangbyeon north"]
    }
];

class HighwayQuiz {
    constructor() {
        console.log('HighwayQuiz 생성자 시작');
        this.map = null;
        this.currentItem = null;
        this.currentPolyline = null;
        this.score = 0;
        this.currentQuestion = 1;
        this.totalQuestions = 15;
        this.usedItems = [];
        this.hintUsed = false;
        this.wrongAttempts = 0;
        this.currentMode = 'highway';
        this.currentDataSet = highways;
        this.currentRoutePolylines = [];
        
        this.initMap();
        this.initEventListeners();
        this.startNewQuestion();
    }
    
    initMap() {
        console.log('지도 초기화 시작');
        try {
            this.map = L.map('map').setView([36.5, 127.5], 7);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
            
            console.log('지도 초기화 완료');
        } catch (error) {
            console.error('지도 초기화 실패:', error);
        }
    }
    
    initEventListeners() {
        console.log('이벤트 리스너 초기화');
        
        setTimeout(() => {
            const elements = {
                submitBtn: document.getElementById('submit-btn'),
                nextBtn: document.getElementById('next-btn'),
                hintBtn: document.getElementById('hint-btn'),
                answerInput: document.getElementById('answer-input'),
                highwayModeBtn: document.getElementById('highway-mode'),
                seoulModeBtn: document.getElementById('seoul-mode'),
                routeModeBtn: document.getElementById('route-mode'),
                findRouteBtn: document.getElementById('find-route-btn')
            };
            
            console.log('요소들:', elements);
            
            if (elements.submitBtn) {
                elements.submitBtn.addEventListener('click', () => this.checkAnswer());
            }
            if (elements.nextBtn) {
                elements.nextBtn.addEventListener('click', () => this.nextQuestion());
            }
            if (elements.hintBtn) {
                elements.hintBtn.addEventListener('click', () => this.showHint());
            }
            if (elements.highwayModeBtn) {
                elements.highwayModeBtn.addEventListener('click', () => this.switchMode('highway'));
            }
            if (elements.seoulModeBtn) {
                elements.seoulModeBtn.addEventListener('click', () => this.switchMode('seoul'));
            }
            if (elements.routeModeBtn) {
                elements.routeModeBtn.addEventListener('click', () => this.switchMode('route'));
                console.log('경로 학습 버튼 이벤트 연결됨');
            }
            if (elements.findRouteBtn) {
                elements.findRouteBtn.addEventListener('click', () => this.findRoutes());
            }
            if (elements.answerInput) {
                elements.answerInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && elements.submitBtn && !elements.submitBtn.disabled) {
                        this.checkAnswer();
                    }
                });
            }
        }, 200);
    }
    
    switchMode(mode) {
        console.log('모드 전환:', mode);
        this.currentMode = mode;
        
        const highwayBtn = document.getElementById('highway-mode');
        const seoulBtn = document.getElementById('seoul-mode');
        const routeBtn = document.getElementById('route-mode');
        const quizMode = document.getElementById('quiz-mode');
        const routeModePanel = document.getElementById('route-mode-panel');
        
        // 모든 버튼 비활성화
        [highwayBtn, seoulBtn, routeBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        
        if (mode === 'highway') {
            if (highwayBtn) highwayBtn.classList.add('active');
            this.currentDataSet = highways;
            this.totalQuestions = 3;
            this.map.setView([36.5, 127.5], 7);
            
            if (quizMode) quizMode.style.display = 'block';
            if (routeModePanel) routeModePanel.style.display = 'none';
            
            this.resetQuizMode();
        } else if (mode === 'seoul') {
            if (seoulBtn) seoulBtn.classList.add('active');
            this.currentDataSet = seoulRoads;
            this.totalQuestions = 2;
            this.map.setView([37.5665, 126.9780], 10);
            
            if (quizMode) quizMode.style.display = 'block';
            if (routeModePanel) routeModePanel.style.display = 'none';
            
            this.resetQuizMode();
        } else if (mode === 'route') {
            console.log('경로 모드 활성화');
            if (routeBtn) routeBtn.classList.add('active');
            this.map.setView([36.5, 127.5], 7);
            
            if (quizMode) quizMode.style.display = 'none';
            if (routeModePanel) routeModePanel.style.display = 'block';
            
            this.clearMap();
            this.resetRouteMode();
        }
    }
    
    resetQuizMode() {
        this.score = 0;
        this.currentQuestion = 1;
        this.usedItems = [];
        this.wrongAttempts = 0;
        
        document.getElementById('total-questions').textContent = this.totalQuestions;
        this.startNewQuestion();
    }
    
    resetRouteMode() {
        const startCity = document.getElementById('start-city');
        const endCity = document.getElementById('end-city');
        const routeOptions = document.getElementById('route-options');
        const routeDetails = document.getElementById('route-details');
        
        if (startCity) startCity.value = '';
        if (endCity) endCity.value = '';
        if (routeOptions) routeOptions.style.display = 'none';
        if (routeDetails) routeDetails.style.display = 'none';
        
        this.clearRoutePolylines();
    }
    
    clearMap() {
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline);
            this.currentPolyline = null;
        }
        this.clearRoutePolylines();
    }
    
    clearRoutePolylines() {
        this.currentRoutePolylines.forEach(polyline => {
            this.map.removeLayer(polyline);
        });
        this.currentRoutePolylines = [];
    }
    
    findRoutes() {
        const startCity = document.getElementById('start-city').value;
        const endCity = document.getElementById('end-city').value;
        
        if (!startCity || !endCity) {
            alert('출발지와 목적지를 모두 선택해주세요.');
            return;
        }
        
        if (startCity === endCity) {
            alert('출발지와 목적지가 같습니다. 다른 도시를 선택해주세요.');
            return;
        }
        
        const routeKey = `${startCity}-${endCity}`;
        let routes = predefinedRoutes[routeKey];
        
        if (!routes) {
            alert('해당 구간의 경로 정보가 아직 준비되지 않았습니다.');
            return;
        }
        
        this.displayRouteOptions(routes);
    }
    
    displayRouteOptions(routes) {
        const routeOptionsDiv = document.getElementById('route-options');
        const routeListDiv = document.getElementById('route-list');
        
        this.clearRoutePolylines();
        
        if (routeListDiv) {
            routeListDiv.innerHTML = '';
            routes.forEach((route, index) => {
                const routeDiv = document.createElement('div');
                routeDiv.className = 'route-option';
                routeDiv.innerHTML = `
                    <h4>${route.name}</h4>
                    <p>거리: ${route.distance} | 소요시간: ${route.time}</p>
                    <p>경유 고속도로: ${route.highways.join(' → ')}</p>
                `;
                
                routeDiv.addEventListener('click', () => this.selectRoute(route, index));
                routeListDiv.appendChild(routeDiv);
            });
        }
        
        if (routeOptionsDiv) {
            routeOptionsDiv.style.display = 'block';
        }
        
        // 지도에 경로 표시
        routes.forEach((route, index) => {
            const polyline = L.polyline(route.coordinates, {
                color: index === 0 ? '#3498db' : '#95a5a6',
                weight: 3,
                opacity: 0.6
            }).addTo(this.map);
            
            this.currentRoutePolylines.push(polyline);
        });
    }
    
    selectRoute(route, index) {
        // 선택된 경로 하이라이트
        document.querySelectorAll('.route-option').forEach((div, i) => {
            if (i === index) {
                div.classList.add('selected');
            } else {
                div.classList.remove('selected');
            }
        });
        
        // 폴리라인 스타일 변경
        this.currentRoutePolylines.forEach((polyline, i) => {
            if (i === index) {
                polyline.setStyle({
                    color: '#27ae60',
                    weight: 5,
                    opacity: 0.9
                });
            } else {
                polyline.setStyle({
                    color: '#bdc3c7',
                    weight: 2,
                    opacity: 0.4
                });
            }
        });
        
        this.displayRouteDetails(route);
    }
    
    displayRouteDetails(route) {
        const routeDetailsDiv = document.getElementById('route-details');
        const routeInfoDiv = document.getElementById('route-info');
        
        if (routeInfoDiv) {
            routeInfoDiv.innerHTML = `
                <h4>📍 ${route.name}</h4>
                <p><strong>총 거리:</strong> ${route.distance}</p>
                <p><strong>예상 소요시간:</strong> ${route.time}</p>
                <p><strong>경유 고속도로:</strong> ${route.highways.join(' → ')}</p>
                <div style="margin-top: 15px;">
                    <h5>🛣️ 상세 경로:</h5>
                    ${route.details.map(detail => `
                        <div class="route-step">
                            <h5>${detail.step}</h5>
                            <p>${detail.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        if (routeDetailsDiv) {
            routeDetailsDiv.style.display = 'block';
        }
    }
    
    startNewQuestion() {
        const availableItems = this.currentDataSet.filter(item => !this.usedItems.includes(item.id));
        
        if (availableItems.length === 0) {
            this.endGame();
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        this.currentItem = availableItems[randomIndex];
        this.usedItems.push(this.currentItem.id);
        this.hintUsed = false;
        this.wrongAttempts = 0;
        
        this.displayItem();
        this.resetUI();
        this.updateScore();
    }
    
    displayItem() {
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline);
        }
        
        this.currentPolyline = L.polyline(this.currentItem.coordinates, {
            color: '#3498db',
            weight: 4,
            opacity: 0.8
        }).addTo(this.map);
        
        this.map.fitBounds(this.currentPolyline.getBounds(), {
            padding: [20, 20]
        });
    }
    
    resetUI() {
        const answerInput = document.getElementById('answer-input');
        const submitBtn = document.getElementById('submit-btn');
        const nextBtn = document.getElementById('next-btn');
        const resultSection = document.getElementById('result-section');
        const hintBtn = document.getElementById('hint-btn');
        
        if (answerInput) {
            answerInput.value = '';
            answerInput.disabled = false;
        }
        if (submitBtn) submitBtn.disabled = false;
        if (nextBtn) nextBtn.style.display = 'none';
        if (resultSection) {
            resultSection.className = 'result-section';
            resultSection.innerHTML = '';
        }
        if (hintBtn) {
            hintBtn.disabled = false;
            hintBtn.textContent = '💡 힌트';
        }
        
        if (answerInput) answerInput.focus();
    }
    
    checkAnswer() {
        const answerInput = document.getElementById('answer-input');
        if (!answerInput) return;
        
        const userAnswer = answerInput.value.trim().toLowerCase();
        const acceptedAnswers = this.currentItem.acceptedAnswers.map(answer => answer.toLowerCase());
        
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
        const points = this.hintUsed ? 5 : 10;
        this.score += points;
        
        this.currentPolyline.setStyle({
            color: '#27ae60',
            weight: 5
        });
        
        const numberText = this.currentItem.number ? ` (${this.currentItem.number})` : '';
        const resultText = `🎉 정답입니다! (+${points}점)\n` +
                          `${this.currentItem.name}${numberText}\n` +
                          `${this.currentItem.description}`;
        
        this.showResult(resultText, 'correct');
        this.disableInput();
        
        if (this.currentQuestion < this.totalQuestions) {
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn) nextBtn.style.display = 'block';
        } else {
            setTimeout(() => this.endGame(), 2000);
        }
    }
    
    handleIncorrectAnswer() {
        this.wrongAttempts = (this.wrongAttempts || 0) + 1;
        
        if (this.wrongAttempts >= 3) {
            const numberText = this.currentItem.number ? ` (${this.currentItem.number})` : '';
            const resultText = `❌ 오답입니다. 정답은 ${this.currentItem.name}${numberText}입니다.\n` +
                              `${this.currentItem.description}`;
            
            this.currentPolyline.setStyle({
                color: '#e74c3c',
                weight: 5
            });
            
            this.showResult(resultText, 'incorrect');
            this.disableInput();
            
            if (this.currentQuestion < this.totalQuestions) {
                const nextBtn = document.getElementById('next-btn');
                if (nextBtn) nextBtn.style.display = 'block';
            } else {
                setTimeout(() => this.endGame(), 2000);
            }
        } else {
            this.showResult(`❌ 틀렸습니다. 다시 시도해보세요! (${this.wrongAttempts}/3)`, 'incorrect');
            
            setTimeout(() => {
                const resultSection = document.getElementById('result-section');
                if (resultSection) {
                    resultSection.innerHTML = '';
                    resultSection.className = 'result-section';
                }
            }, 3000);
        }
    }
    
    showHint() {
        if (this.hintUsed) return;
        
        this.hintUsed = true;
        this.showResult(`💡 힌트: ${this.currentItem.hint}`, 'hint');
        
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = true;
            hintBtn.textContent = '힌트 사용됨';
        }
    }
    
    showResult(message, type) {
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
            resultSection.className = `result-section ${type}`;
            resultSection.innerHTML = message.replace(/\n/g, '<br>');
        }
    }
    
    disableInput() {
        const answerInput = document.getElementById('answer-input');
        const submitBtn = document.getElementById('submit-btn');
        
        if (answerInput) answerInput.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.startNewQuestion();
    }
    
    updateScore() {
        const scoreElement = document.getElementById('score');
        const currentQuestionElement = document.getElementById('current-question');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (currentQuestionElement) currentQuestionElement.textContent = this.currentQuestion;
    }
    
    endGame() {
        const maxScore = this.totalQuestions * 10;
        const percentage = Math.round((this.score / maxScore) * 100);
        let grade = '';
        
        if (percentage >= 90) grade = '🏆 최고급';
        else if (percentage >= 80) grade = '🥇 우수';
        else if (percentage >= 70) grade = '🥈 양호';
        else if (percentage >= 60) grade = '🥉 보통';
        else grade = '📚 학습필요';
        
        const modeText = this.currentMode === 'highway' ? '고속도로' : '서울 도로';
        const finalMessage = 
            `🎊 ${modeText} 퀴즈 완료!\n\n` +
            `최종 점수: ${this.score}/${maxScore}점 (${percentage}%)\n` +
            `등급: ${grade}\n\n` +
            `다른 모드도 도전해보세요!`;
        
        this.showResult(finalMessage, 'correct');
        
        const hintBtn = document.getElementById('hint-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (hintBtn) hintBtn.disabled = true;
        if (submitBtn) submitBtn.disabled = true;
    }
}

// Leaflet 로딩 확인 후 게임 시작
if (typeof L !== 'undefined') {
    console.log('Leaflet 사용 가능, 게임 초기화');
    new HighwayQuiz();
} else {
    console.log('Leaflet 로딩 대기 중...');
    let retryCount = 0;
    const checkLeaflet = setInterval(() => {
        retryCount++;
        console.log('Leaflet 로딩 재시도', retryCount);
        if (typeof L !== 'undefined') {
            console.log('Leaflet 로딩 성공!');
            clearInterval(checkLeaflet);
            new HighwayQuiz();
        } else if (retryCount > 20) {
            console.error('Leaflet 로딩 실패');
            clearInterval(checkLeaflet);
            const mapDiv = document.getElementById('map');
            if (mapDiv) {
                mapDiv.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">지도를 불러올 수 없습니다. 페이지를 새로고침해주세요.</div>';
            }
        }
    }, 500);
}
