// 전역 변수
let map;
let cityMarkers = {};
let currentHighlightedMarker = null;

// 한국 전통 요리 데이터 (JSON 구조)
const foodData = {
    cities: {
        seoul: {
            name: "서울",
            coordinates: [37.5665, 126.9780],
            foods: [
                {
                    id: "bulgogi",
                    name: "불고기",
                    description: "얇게 썬 쇠고기를 양념에 재워 구운 대표적인 한국 요리",
                    history: "고구려 시대 '맥적'에서 유래되었으며, 조선시대에 현재의 불고기 형태로 발달했습니다. 왕실에서 즐겨 먹던 고급 요리였으나, 서울이 수도가 되면서 전국으로 퍼져나갔습니다.",
                    geography: "서울이 정치·경제의 중심지가 되면서 전국의 좋은 식재료가 모이는 곳이 되었습니다. 한강 유역의 비옥한 토지에서 나는 우수한 농산물과 양념 재료들이 불고기의 발달을 도왔습니다.",
                    culture: "조선시대 왕실 문화의 영향으로 정교한 양념법이 발달했습니다. 현재는 한국을 대표하는 음식으로 세계에 알려져 있으며, 가족이 모이는 자리의 대표 음식입니다.",
                    trivia: "원래 이름은 '너비아니'였으며, 일제강점기에 '불고기'라는 이름으로 바뀌었습니다. NASA에서도 우주식량으로 연구할 정도로 영양가가 뛰어납니다."
                },
                {
                    id: "pyeongyang_naengmyeon",
                    name: "평양냉면",
                    description: "메밀로 만든 면을 시원한 육수에 말아 먹는 여름 별미",
                    history: "19세기 평양에서 시작되어 한국전쟁 이후 실향민들이 서울로 가져온 음식입니다. 을지로와 명동 일대의 평양냉면집들이 그 전통을 이어가고 있습니다.",
                    geography: "평양의 춥고 건조한 기후는 메밀 재배에 적합했습니다. 대동강의 깨끗한 물과 서늘한 기후가 냉면 문화를 만들어냈으며, 서울에서는 한강의 깨끗한 물이 그 역할을 대신했습니다.",
                    culture: "북한 실향민들의 고향에 대한 그리움이 담긴 음식입니다. 서울에서는 분단의 아픔과 동시에 통일에 대한 염원을 담은 음식으로 여겨집니다.",
                    trivia: "평양냉면의 면은 한 가닥이 매우 길어서 가위로 잘라 먹는 것이 일반적입니다. 이는 장수를 기원하는 의미가 담겨 있습니다."
                }
            ]
        },
        jeonju: {
            name: "전주",
            coordinates: [35.8242, 127.1480],
            foods: [
                {
                    id: "bibimbap",
                    name: "비빔밥",
                    description: "다양한 나물과 고기를 밥 위에 올리고 고추장과 함께 비벼 먹는 음식",
                    history: "조선시대 전주가 조선왕조의 본향이 되면서 궁중음식 문화가 발달했습니다. 왕실의 수라상에서 남은 음식들을 한 그릇에 담아 먹던 것이 시초가 되었습니다.",
                    geography: "전라도의 비옥한 호남평야에서 나는 다양한 채소와 곡물이 비빔밥의 기본이 되었습니다. 전주 일대의 풍부한 농산물이 다채로운 나물 문화를 만들어냈습니다.",
                    culture: "음양오행 사상에 따라 다섯 가지 색깔의 재료로 영양의 균형을 맞춘 한국의 대표적인 건강식입니다. 화합과 조화의 의미를 담고 있습니다.",
                    trivia: "UNESCO에서 선정한 '창의적 음식도시' 전주의 대표 음식입니다. 미국 항공사에서도 기내식으로 제공할 정도로 세계적으로 인정받고 있습니다."
                },
                {
                    id: "kongnamul_gukbap",
                    name: "콩나물국밥",
                    description: "콩나물이 들어간 시원한 국물에 밥을 말아 먹는 전주의 서민 음식",
                    history: "조선후기 전주 장터에서 상인들이 간단히 끼니를 해결하기 위해 먹던 음식입니다. 6.25 전쟁 이후 서민들의 든든한 한 끼 식사로 자리잡았습니다.",
                    geography: "전라도의 기름진 땅에서 자란 우수한 콩으로 만든 콩나물이 주재료입니다. 전주천 주변의 깨끗한 물이 맛있는 콩나물을 기르는 데 도움이 되었습니다.",
                    culture: "서민들의 소박하지만 든든한 음식으로, 새벽부터 밤늦게 장사를 하는 전주 사람들의 생활상이 담겨 있습니다. 해장음식으로도 유명합니다.",
                    trivia: "전주 콩나물국밥은 새우젓과 마늘, 고춧가루로 간을 맞추는 것이 특징입니다. 전주에만 100여 곳의 콩나물국밥집이 있을 정도로 인기가 높습니다."
                }
            ]
        },
        busan: {
            name: "부산",
            coordinates: [35.1796, 129.0756],
            foods: [
                {
                    id: "milmyeon",
                    name: "밀면",
                    description: "밀가루로 만든 면을 시원한 육수나 매콤한 양념장에 비벼 먹는 부산의 대표 음식",
                    history: "한국전쟁 당시 함흥에서 내려온 피난민들이 냉면을 그리워하며 구하기 쉬운 밀가루로 만든 것이 시초입니다. 1950년대 부산 동래구에서 처음 만들어졌습니다.",
                    geography: "부산의 따뜻한 해양성 기후로 인해 시원한 면 요리에 대한 수요가 많았습니다. 항구도시 특성상 밀가루 등 외래 식재료를 쉽게 구할 수 있었던 것도 밀면 발달에 영향을 주었습니다.",
                    culture: "전쟁의 아픔과 고향에 대한 그리움, 그리고 새로운 터전에서의 적응을 상징하는 음식입니다. 부산 사람들의 진취적이고 개방적인 기질이 반영되어 있습니다.",
                    trivia: "밀면은 냉면보다 면이 더 쫄깃하고 단맛이 나는 것이 특징입니다. 부산에는 '밀면 3대 맛집'이라 불리는 유명한 원조 집들이 있습니다."
                },
                {
                    id: "dwaeji_gukbap",
                    name: "돼지국밥",
                    description: "돼지뼈를 우린 진한 국물에 돼지고기와 밥을 넣어 끓인 부산의 향토음식",
                    history: "일제강점기 부산항 부두 노동자들이 값싸고 영양가 높은 음식으로 먹기 시작했습니다. 6.25 전쟁 이후 피난민들과 함께 부산의 대표 음식으로 자리잡았습니다.",
                    geography: "항구도시 부산의 특성상 육체노동이 많았고, 따뜻한 기후에서도 뜨거운 국물 음식을 즐기는 문화가 있었습니다. 부산 근교에서 기르는 돼지로 만든 국밥이 노동자들의 주요 식사였습니다.",
                    culture: "부산 사람들의 서민적이고 후덕한 인정을 상징하는 음식입니다. '정말 맛있게 끓였다'는 의미의 '끓인다'는 표현이 부산 방언으로 널리 쓰입니다.",
                    trivia: "부산 돼지국밥은 새우젓, 다진 마늘, 고춧가루를 넣어 먹는 것이 특징입니다. 24시간 영업하는 곳이 많아 '부산의 야식'이라고도 불립니다."
                }
            ]
        },
        andong: {
            name: "안동",
            coordinates: [36.5684, 128.7294],
            foods: [
                {
                    id: "andong_jjimdak",
                    name: "안동찜닭",
                    description: "닭고기와 각종 채소를 간장 양념으로 조린 안동의 대표 요리",
                    history: "1980년대 안동 구시장의 한 식당에서 처음 만들어졌습니다. 당시 비싼 닭고기 요리를 저렴하게 먹을 수 있도록 당면과 채소를 많이 넣어 만든 것이 시초입니다.",
                    geography: "안동은 낙동강 상류의 분지 지형으로 닭 사육에 적합한 환경을 가지고 있었습니다. 또한 전통적으로 간장 제조업이 발달해 양념 문화가 풍부했습니다.",
                    culture: "안동의 유교 문화와 선비 정신이 담긴 음식으로, 정성스럽게 끓여 가족이 함께 나누어 먹는 의미가 있습니다. 현재는 전국적으로 사랑받는 음식이 되었습니다.",
                    trivia: "안동찜닭은 1990년대 안동대학교 학생들 사이에서 인기를 얻으면서 전국으로 퍼져나갔습니다. 현재 안동에는 '찜닭 골목'이라 불리는 곳이 있을 정도로 유명합니다."
                }
            ]
        },
        jeju: {
            name: "제주",
            coordinates: [33.4996, 126.5312],
            foods: [
                {
                    id: "heukdwaeji",
                    name: "흑돼지",
                    description: "제주도 특산품인 검은 털을 가진 돼지로 만든 고기 요리",
                    history: "제주도에는 고려시대부터 흑돼지가 사육되어 왔습니다. 척박한 화산섬 환경에서 강인하게 자란 흑돼지는 조선시대 왕실에 진상품으로 올려질 정도로 귀한 식재료였습니다.",
                    geography: "제주도의 화산토 지형과 해양성 기후는 흑돼지 사육에 최적의 환경을 제공했습니다. 한라산의 청정한 물과 감귤박, 보리 등 제주 특산물로 기른 흑돼지는 독특한 맛을 가지게 되었습니다.",
                    culture: "제주도민들의 '돗'(돼지) 문화는 관혼상제와 밀접한 관련이 있습니다. 중요한 행사나 손님 접대 시 흑돼지를 잡는 것은 최고의 대접이었으며, 현재도 제주 문화의 상징입니다.",
                    trivia: "제주 흑돼지는 일반 돼지보다 지방이 적고 육질이 쫄깃한 것이 특징입니다. 제주어로 돼지를 '돗'이라 하는데, 이는 몽골어에서 유래된 것으로 추정됩니다."
                }
            ]
        }
    }
};

// 지도 초기화
function initMap() {
    console.log('지도 초기화 시작');
    
    // 한국 중심으로 지도 생성
    map = L.map('map', {
        center: [36.5, 127.5],
        zoom: 7,
        zoomControl: true
    });
    
    // OpenStreetMap 타일 레이어 추가
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // 도시 마커 추가
    addCityMarkers();
    
    console.log('지도 초기화 완료');
}

// 도시 마커 추가
function addCityMarkers() {
    Object.keys(foodData.cities).forEach(cityId => {
        const city = foodData.cities[cityId];
        
        // 커스텀 마커 생성
        const marker = L.circleMarker(city.coordinates, {
            radius: 8,
            fillColor: '#e74c3c',
            color: 'white',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8,
            className: 'city-marker'
        }).addTo(map);
        
        // 마커 클릭 이벤트
        marker.on('click', () => {
            showCityInfo(cityId);
            highlightMarker(marker);
        });
        
        // 툴팁 추가
        marker.bindTooltip(city.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -10]
        });
        
        cityMarkers[cityId] = marker;
    });
}

// 도시 정보 표시
function showCityInfo(cityId) {
    const city = foodData.cities[cityId];
    
    // 패널 전환
    document.getElementById('info-panel').querySelector('.welcome-message').style.display = 'none';
    document.getElementById('city-info').style.display = 'block';
    document.getElementById('food-detail').style.display = 'none';
    
    // 도시명 설정
    document.getElementById('city-name').textContent = city.name;
    
    // 음식 카드 생성
    const foodCardsContainer = document.getElementById('food-cards');
    foodCardsContainer.innerHTML = '';
    
    city.foods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <h3>${food.name}</h3>
            <p>${food.description}</p>
        `;
        
        foodCard.addEventListener('click', () => {
            showFoodDetail(food, cityId);
        });
        
        foodCardsContainer.appendChild(foodCard);
    });
}

// 음식 상세 정보 표시
function showFoodDetail(food, cityId) {
    // 패널 전환
    document.getElementById('city-info').style.display = 'none';
    document.getElementById('food-detail').style.display = 'block';
    
    // 음식 정보 설정
    document.getElementById('food-name').textContent = food.name;
    document.getElementById('food-history').textContent = food.history;
    document.getElementById('food-geography').textContent = food.geography;
    document.getElementById('food-culture').textContent = food.culture;
    document.getElementById('food-trivia').textContent = food.trivia;
    
    // 뒤로가기 버튼 이벤트
    document.getElementById('back-btn').onclick = () => {
        showCityInfo(cityId);
    };
}

// 마커 하이라이트
function highlightMarker(marker) {
    // 기존 하이라이트 제거
    if (currentHighlightedMarker) {
        currentHighlightedMarker.setStyle({
            fillColor: '#e74c3c',
            radius: 8
        });
    }
    
    // 새로운 마커 하이라이트
    marker.setStyle({
        fillColor: '#f39c12',
        radius: 12
    });
    
    currentHighlightedMarker = marker;
}

// 음식 검색 기능
function searchFood() {
    const searchTerm = document.getElementById('food-search').value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('검색할 음식명을 입력해주세요.');
        return;
    }
    
    let foundFood = null;
    let foundCityId = null;
    
    // 모든 도시의 음식에서 검색
    Object.keys(foodData.cities).forEach(cityId => {
        const city = foodData.cities[cityId];
        city.foods.forEach(food => {
            if (food.name.toLowerCase().includes(searchTerm) || 
                food.description.toLowerCase().includes(searchTerm)) {
                foundFood = food;
                foundCityId = cityId;
            }
        });
    });
    
    if (foundFood && foundCityId) {
        // 해당 도시로 지도 이동
        const city = foodData.cities[foundCityId];
        map.setView(city.coordinates, 10);
        
        // 마커 하이라이트
        highlightMarker(cityMarkers[foundCityId]);
        
        // 음식 상세 정보 표시
        showFoodDetail(foundFood, foundCityId);
        
        // 검색창 초기화
        document.getElementById('food-search').value = '';
    } else {
        alert(`"${searchTerm}"에 대한 검색 결과가 없습니다.\n\n검색 가능한 음식:\n불고기, 평양냉면, 비빔밥, 콩나물국밥, 밀면, 돼지국밥, 안동찜닭, 흑돼지`);
    }
}

// 초기화 기능
function resetMap() {
    // 지도를 초기 상태로 되돌리기
    map.setView([36.5, 127.5], 7);
    
    // 모든 마커 하이라이트 제거
    if (currentHighlightedMarker) {
        currentHighlightedMarker.setStyle({
            fillColor: '#e74c3c',
            radius: 8
        });
        currentHighlightedMarker = null;
    }
    
    // 패널을 초기 상태로 되돌리기
    document.getElementById('city-info').style.display = 'none';
    document.getElementById('food-detail').style.display = 'none';
    document.getElementById('info-panel').querySelector('.welcome-message').style.display = 'block';
    
    // 검색창 초기화
    document.getElementById('food-search').value = '';
}

// 이벤트 리스너 설정
function initEventListeners() {
    // 검색 버튼 이벤트
    document.getElementById('search-btn').addEventListener('click', searchFood);
    
    // 초기화 버튼 이벤트
    document.getElementById('reset-btn').addEventListener('click', resetMap);
    
    // 검색창 엔터 키 이벤트
    document.getElementById('food-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchFood();
        }
    });
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로드 완료');
    
    // Leaflet 로딩 확인
    if (typeof L !== 'undefined') {
        console.log('Leaflet 로드 성공');
        initMap();
        initEventListeners();
    } else {
        console.error('Leaflet 로드 실패');
        // 재시도 로직
        let retryCount = 0;
        const checkLeaflet = setInterval(() => {
            retryCount++;
            if (typeof L !== 'undefined') {
                console.log('Leaflet 로드 성공 (재시도)');
                clearInterval(checkLeaflet);
                initMap();
                initEventListeners();
            } else if (retryCount > 10) {
                console.error('Leaflet 로드 최종 실패');
                clearInterval(checkLeaflet);
                document.getElementById('map').innerHTML = 
                    '<div style="padding: 20px; text-align: center; color: red;">지도를 불러올 수 없습니다. 페이지를 새로고침해주세요.</div>';
            }
        }, 500);
    }
});
