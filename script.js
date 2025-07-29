switchMode(mode) {
        this.currentMode = mode;
        
        // 버튼 활성화 상태 변경
        const highwayBtn = document.getElementById('highway-mode');
        const seoulBtn = document.getElementById('seoul-mode');
        const routeBtn = document.getElementById('route-mode');
        const quizMode = document.getElementById('quiz-mode');
        const routeModePanel = document.getElementById('route-mode-panel');
        const quizPanel = document.querySelector('.quiz-panel');
        
        // 모든 버튼 비활성화
        [highwayBtn, seoulBtn, routeBtn].forEach(btn => btn.classList.remove('active'));
        
        if (mode === 'highway') {
            highwayBtn.classList.add('active');
            this.currentDataSet = highways;
            this.totalQuestions = 10;
            this.map.setView([36.5, 127.5], 7);
            document.getElementById('quiz-title').textContent = '🔍 이 고속도로는 무엇일까요?';
            document.getElementById('quiz-description').textContent = '파란색으로 표시된 고속도로의 이름이나 번호를 입력하세요.';
            
            // UI 전환
            quizMode.style.display = 'block';
            routeModePanel.style.display = 'none';
            quizPanel.classList.remove('route-mode-active');
            
            this.resetQuizMode();
        } else if (mode === 'seoul') {
            seoulBtn.classList.add('active');
            this.currentDataSet = seoulRoads;
            this.totalQuestions = 5;
            this.map.setView([37.5665, 126.9780], 10);
            document.getElementById('quiz-title').textContent = '🔍 이 서울 도로는 무엇일까요?';
            document.getElementById('quiz-description').textContent = '파란색으로 표시된 서울 도로의 이름을 입력하세요.';
            
            // UI 전환
            quizMode.style.display = 'block';
            routeModePanel.style.display = 'none';
            quizPanel.classList.remove('route-mode-active');
            
            this.resetQuizMode();
        } else if (mode === 'route') {
            routeBtn.classList.add('active');
            this.map.setView([36.5, 127.5], 7);
            
            // UI 전환
            quizMode.style.display = 'none';
            routeModePanel.style.display = 'block';
            quizPanel.classList.add('route-mode-active');
            
            this.clearMap();
            this.resetRouteMode();
        }
    }
    
    resetQuizMode() {
        // 게임 상태 초기화
        this.score = 0;
        this.currentQuestion = 1;
        this.usedItems = [];
        this.wrongAttempts = 0;
        
        // 총 문제 수 업데이트
        document.getElementById('total-questions').textContent = this.totalQuestions;
        
        this.startNewQuestion();
    }
    
    resetRouteMode() {
        // 경로 모드 초기화
        document.getElementById('start-city').value = '';
        document.getElementById('end-city').value = '';
        document.getElementById('route-options').style.display = 'none';
        document.getElementById('route-details').style.display = 'none';
        this.clearRoutePolylines();
    }
    
    clearMap() {
        // 모든 폴리라인 제거
        if (this.currentPolyline) {
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
        },
        {
            id: 2,
            name: "서해안고속도로 경유",
            distance: "340km",
            time: "약 4시간",
            highways: ["서해안고속도로", "호남고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.4563, 126.7052], [37.2636, 126.8003],
                [37.0841, 126.6120], [36.9776, 126.4307], [36.6053, 126.4953],
                [36.3504, 126.4580], [35.9716, 126.4953], [35.8242, 126.8830],
                [35.1596, 126.8526]
            ],
            details: [
                { step: "출발", description: "서울 → 서해안고속도로 진입" },
                { step: "환승", description: "서해안고속도로에서 호남고속도로로 환승" },
                { step: "도착", description: "광주 도착" }
            ]
        }
    ],
    "seoul-daegu": [
        {
            id: 1,
            name: "경부고속도로 직행",
            distance: "302km",
            time: "약 3시간 20분",
            highways: ["경부고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.4138, 127.5183], [37.2636, 127.0286],
                [36.9776, 127.0276], [36.8065, 127.1522], [36.3504, 127.3845],
                [36.0190, 127.3049], [35.8714, 127.7298], [35.8242, 128.1555],
                [35.8714, 128.6018]
            ],
            details: [
                { step: "출발", description: "서울 → 경부고속도로 진입" },
                { step: "경유", description: "수원, 천안, 대전, 김천, 구미 통과" },
                { step: "도착", description: "대구 도착" }
            ]
        },
        {
            id: 2,
            name: "중앙고속도로 경유",
            distance: "320km",
            time: "약 3시간 50분",
            highways: ["중앙고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.6364, 127.2678], [37.5326, 127.4370],
                [37.2820, 128.1555], [36.9776, 128.4102], [36.5384, 128.7298],
                [35.8714, 128.6018]
            ],
            details: [
                { step: "출발", description: "서울 → 중앙고속도로 진입" },
                { step: "경유", description: "춘천, 원주, 제천, 안동 통과" },
                { step: "도착", description: "대구 도착" }
            ]
        }
    ],
    "seoul-gangneung": [
        {
            id: 1,
            name: "영동고속도로 직행",
            distance: "165km",
            time: "약 2시간",
            highways: ["영동고속도로"],
            coordinates: [
                [37.5665, 126.9780], [37.6014, 127.0841], [37.6364, 127.2678],
                [37.5326, 127.4370], [37.4201, 127.6189], [37.3422, 127.9195],
                [37.2820, 128.1555], [37.3422, 128.4102], [37.8853, 128.8289], [37.7749, 129.0756]
            ],
            details: [
                { step: "출발", description: "서울 → 영동고속도로 진입" },
                { step: "경유", description: "하남, 여주, 원주, 평창 통과" },
                { step: "도착", description: "강릉 도착" }
            ]
        }
    ],
    "daejeon-busan": [
        {
            id: 1,
            name: "경부고속도로 직행",
            distance: "200km",
            time: "약 2시간 20분",
            highways: ["경부고속도로"],
            coordinates: [
                [36.3504, 127.3845], [36.0190, 127.3049], [35.8714, 127.7298],
                [35.8242, 128.1555], [35.8714, 128.6018], [35.5384, 128.7317],
                [35.1796, 129.0756]
            ],
            details: [
                { step: "출발", description: "대전 → 경부고속도로 진입" },
                { step: "경유", description: "김천, 구미, 대구 통과" },
                { step: "도착", description: "부산 도착" }
            ]
        }
    ]
};
// 한국 고속도로 데이터 (실제 좌표 기반) - 확장됨
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
    },
    {
        id: 4,
        name: "중부고속도로",
        number: "35호선",
        coordinates: [
            [37.5665, 126.9780], [37.4138, 127.2678], [37.1542, 127.4370],
            [36.9776, 127.9195], [36.7717, 128.0476], [36.6364, 128.2607],
            [36.5384, 128.4102], [36.4201, 128.6561], [36.0190, 128.8289]
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
            [35.1796, 129.0756], [35.2220, 128.6818], [35.2384, 128.2607],
            [35.1596, 127.9195], [34.9406, 127.7363], [34.7604, 126.8526], [34.8165, 126.4307]
        ],
        description: "부산에서 목포까지 남해안을 따라 이어지는 고속도로",
        hint: "남쪽 바다를 끼고 달리며, 한려해상국립공원을 지납니다.",
        acceptedAnswers: ["남해고속도로", "남해", "10호선", "10호", "namhae"]
    },
    {
        id: 6,
        name: "호남고속도로",
        number: "25호선",
        coordinates: [
            [37.5665, 126.9780], [37.2636, 127.0286], [36.9776, 127.0276],
            [36.8065, 127.1522], [36.3504, 127.3845], [36.1542, 126.9195],
            [35.8242, 126.8830], [35.1596, 126.8526]
        ],
        description: "논산에서 광주까지 호남지방을 연결하는 고속도로",
        hint: "호남 평야를 가로지르며 전라도 지역을 연결합니다.",
        acceptedAnswers: ["호남고속도로", "호남", "25호선", "25호", "honam"]
    },
    {
        id: 7,
        name: "중앙고속도로",
        number: "55호선",
        coordinates: [
            [37.5665, 126.9780], [37.6364, 127.2678], [37.5326, 127.4370],
            [37.2820, 128.1555], [36.9776, 128.4102], [36.5384, 128.7298],
            [35.8714, 128.6018], [35.1796, 129.0756]
        ],
        description: "춘천에서 부산까지 중앙 내륙을 관통하는 고속도로",
        hint: "한반도의 중앙 척추를 이루는 고속도로입니다.",
        acceptedAnswers: ["중앙고속도로", "중앙", "55호선", "55호", "jungang"]
    },
    {
        id: 8,
        name: "대전남부순환고속도로",
        number: "300호선",
        coordinates: [
            [36.2776, 127.2195], [36.2384, 127.3845], [36.3504, 127.4102],
            [36.4201, 127.3049], [36.3776, 127.2195]
        ],
        description: "대전 시내를 우회하는 순환 고속도로",
        hint: "대전 도심을 돌아가는 순환 형태의 고속도로입니다.",
        acceptedAnswers: ["대전남부순환고속도로", "대전남부순환", "300호선", "300호", "daejeon"]
    },
    {
        id: 9,
        name: "동해고속도로",
        number: "65호선",
        coordinates: [
            [37.7749, 129.0756], [37.5326, 129.1555], [36.9776, 129.3195],
            [36.4201, 129.3845], [35.8714, 129.2298], [35.1796, 129.0756]
        ],
        description: "강릉에서 부산까지 동해안을 따라 이어지는 고속도로",
        hint: "동쪽 바다를 끼고 달리는 최신 고속도로 중 하나입니다.",
        acceptedAnswers: ["동해고속도로", "동해", "65호선", "65호", "donghae"]
    },
    {
        id: 10,
        name: "제2경인고속도로",
        number: "120호선",
        coordinates: [
            [37.5665, 126.9780], [37.4563, 126.8052], [37.3636, 126.7003],
            [37.2776, 126.6120], [37.4563, 126.7052]
        ],
        description: "서울과 인천을 연결하는 제2의 고속도로",
        hint: "경인고속도로의 우회 역할을 하는 고속도로입니다.",
        acceptedAnswers: ["제2경인고속도로", "제2경인", "120호선", "120호", "gyeongin2"]
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
    },
    {
        id: 13,
        name: "올림픽대로",
        number: "",
        coordinates: [
            [37.5065, 126.8780], [37.5165, 126.9080], [37.5265, 126.9380],
            [37.5365, 126.9680], [37.5465, 126.9980], [37.5565, 127.0280]
        ],
        description: "한강 남쪽을 따라 이어지는 도로",
        hint: "1988년 서울올림픽을 기념해 만든 한강 남쪽 도로입니다.",
        acceptedAnswers: ["올림픽대로", "올림픽로", "olympic"]
    },
    {
        id: 14,
        name: "동부간선도로",
        number: "",
        coordinates: [
            [37.6365, 127.0480], [37.6165, 127.0680], [37.5965, 127.0880],
            [37.5765, 127.1080], [37.5565, 127.1280], [37.5365, 127.1480]
        ],
        description: "서울 동부지역을 남북으로 관통하는 간선도로",
        hint: "서울 동쪽을 남북으로 가로지르는 주요 간선도로입니다.",
        acceptedAnswers: ["동부간선도로", "동부간선", "dongbu arterial"]
    },
    {
        id: 15,
        name: "서부간선도로",
        number: "",
        coordinates: [
            [37.6165, 126.8280], [37.5965, 126.8480], [37.5765, 126.8680],
            [37.5565, 126.8880], [37.5365, 126.9080], [37.5165, 126.9280]
        ],
        description: "서울 서부지역을 남북으로 관통하는 간선도로",
        hint: "서울 서쪽을 남북으로 가로지르는 주요 간선도로입니다.",
        acceptedAnswers: ["서부간선도로", "서부간선", "seobu arterial"]
    }
];

class HighwayQuiz {
    constructor() {
        this.map = null;
        this.currentItem = null;
        this.currentPolyline = null;
        this.score = 0;
        this.currentQuestion = 1;
        this.totalQuestions = 15;
        this.usedItems = [];
        this.hintUsed = false;
        this.currentMode = 'highway'; // 'highway', 'seoul', 'route'
        this.currentDataSet = highways;
        this.currentRoutePolylines = []; // 경로 모드용 폴리라인들
        
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
        const highwayModeBtn = document.getElementById('highway-mode');
        const seoulModeBtn = document.getElementById('seoul-mode');
        const routeModeBtn = document.getElementById('route-mode');
        const findRouteBtn = document.getElementById('find-route-btn');
        
        submitBtn.addEventListener('click', () => this.checkAnswer());
        nextBtn.addEventListener('click', () => this.nextQuestion());
        hintBtn.addEventListener('click', () => this.showHint());
        
        // 모드 선택 버튼
        highwayModeBtn.addEventListener('click', () => this.switchMode('highway'));
        seoulModeBtn.addEventListener('click', () => this.switchMode('seoul'));
        routeModeBtn.addEventListener('click', () => this.switchMode('route'));
        
        // 경로 찾기 버튼
        findRouteBtn.addEventListener('click', () => this.findRoutes());
        
        // Enter 키로 정답 제출
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !submitBtn.disabled) {
                this.checkAnswer();
            }
        });
    }
    
    clearMap() {
        // 모든 폴리라인 제거
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline);
            this.currentPolyline = null;
        }
        this.clearRoutePolylines();
    }
    
    clearRoutePolylines() {
        // 경로 폴리라인들 제거
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
        
        // 경로 키 생성 (양방향 지원)
        const routeKey1 = `${startCity}-${endCity}`;
        const routeKey2 = `${endCity}-${startCity}`;
        
        let routes = predefinedRoutes[routeKey1] || predefinedRoutes[routeKey2];
        
        if (!routes) {
            alert('해당 구간의 경로 정보가 아직 준비되지 않았습니다.');
            return;
        }
        
        // 역방향인 경우 좌표 뒤집기
        if (predefinedRoutes[routeKey2] && !predefinedRoutes[routeKey1]) {
            routes = routes.map(route => ({
                ...route,
                coordinates: [...route.coordinates].reverse()
            }));
        }
        
        this.displayRouteOptions(routes, startCity, endCity);
    }
    
    displayRouteOptions(routes, startCity, endCity) {
        const routeOptionsDiv = document.getElementById('route-options');
        const routeListDiv = document.getElementById('route-list');
        
        // 기존 경로 제거
        this.clearRoutePolylines();
        
        // 경로 옵션 표시
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
        
        routeOptionsDiv.style.display = 'block';
        
        // 지도에 모든 경로를 연한 색으로 표시
        routes.forEach((route, index) => {
            const polyline = L.polyline(route.coordinates, {
                color: index === 0 ? '#3498db' : '#95a5a6',
                weight: 3,
                opacity: 0.6
            }).addTo(this.map);
            
            this.currentRoutePolylines.push(polyline);
        });
        
        // 지도 범위 조정
        if (routes.length > 0) {
            const allCoordinates = routes.flatMap(route => route.coordinates);
            const bounds = L.latLngBounds(allCoordinates);
            this.map.fitBounds(bounds, { padding: [20, 20] });
        }
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
        
        // 기존 폴리라인들을 연한 색으로 변경
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
        
        // 상세 정보 표시
        this.displayRouteDetails(route);
    }
    
    displayRouteDetails(route) {
        const routeDetailsDiv = document.getElementById('route-details');
        const routeInfoDiv = document.getElementById('route-info');
        
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
        
        routeDetailsDiv.style.display = 'block';
    }
    
    startNewQuestion() {
        // 사용하지 않은 항목 중에서 랜덤 선택
        const availableItems = this.currentDataSet.filter(item => !this.usedItems.includes(item.id));
        
        if (availableItems.length === 0) {
            this.endGame();
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        this.currentItem = availableItems[randomIndex];
        this.usedItems.push(this.currentItem.id);
        this.hintUsed = false;
        this.wrongAttempts = 0; // 새 문제마다 오답 횟수 초기화
        
        this.displayItem();
        this.resetUI();
        this.updateScore();
    }
    
    displayItem() {
        // 기존 폴리라인 제거
        if (this.currentPolyline) {
            this.map.removeLayer(this.currentPolyline);
        }
        
        // 새 폴리라인 생성 (파란색)
        this.currentPolyline = L.polyline(this.currentItem.coordinates, {
            color: '#3498db',
            weight: 4,
            opacity: 0.8
        }).addTo(this.map);
        
        // 지도 범위를 경로에 맞게 조정
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
        
        // 힌트 버튼 재활성화
        const hintBtn = document.getElementById('hint-btn');
        hintBtn.disabled = false;
        hintBtn.textContent = '💡 힌트';
        
        answerInput.focus();
    }
    
    checkAnswer() {
        const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
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
        // 점수 추가 (힌트 사용시 절반 점수)
        const points = this.hintUsed ? 5 : 10;
        this.score += points;
        
        // 폴리라인을 초록색으로 변경
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
            document.getElementById('next-btn').style.display = 'block';
        } else {
            setTimeout(() => this.endGame(), 2000);
        }
    }
    
    handleIncorrectAnswer() {
        this.wrongAttempts = (this.wrongAttempts || 0) + 1;
        
        // 3번 틀리면 정답 공개
        if (this.wrongAttempts >= 3) {
            const numberText = this.currentItem.number ? ` (${this.currentItem.number})` : '';
            const resultText = `❌ 오답입니다. 정답은 ${this.currentItem.name}${numberText}입니다.\n` +
                              `${this.currentItem.description}`;
            
            // 폴리라인을 빨간색으로 변경
            this.currentPolyline.setStyle({
                color: '#e74c3c',
                weight: 5
            });
            
            this.showResult(resultText, 'incorrect');
            this.disableInput();
            
            if (this.currentQuestion < this.totalQuestions) {
                document.getElementById('next-btn').style.display = 'block';
            } else {
                setTimeout(() => this.endGame(), 2000);
            }
        } else {
            this.showResult(`❌ 틀렸습니다. 다시 시도해보세요! (${this.wrongAttempts}/3)`, 'incorrect');
            
            // 3초 후 결과 메시지 지우기
            setTimeout(() => {
                document.getElementById('result-section').innerHTML = '';
                document.getElementById('result-section').className = 'result-section';
            }, 3000);
        }
    }
    
    showHint() {
        if (this.hintUsed) return;
        
        this.hintUsed = true;
        this.showResult(`💡 힌트: ${this.currentItem.hint}`, 'hint');
        
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
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('current-question').textContent = this.currentQuestion;
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
        
        // 모든 버튼 비활성화
        document.getElementById('hint-btn').disabled = true;
        document.getElementById('submit-btn').disabled = true;
    }
}

// 페이지 로드 완료 후 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new HighwayQuiz();
});
