const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const activityType = document.getElementById('activityType');
const difficulty = document.getElementById('difficulty');
const suggestLocationBtn = document.getElementById('suggestLocationBtn');

// Database of real adventure spots in India
const indiaAdventureSpots = {
    "dharamshala": {
        "hiking": {
            "easy": "Bhagsu Waterfall Trail: A pleasant 2km hike from McLeod Ganj to Bhagsu Nag temple and waterfall. Perfect for beginners with well-marked paths and stunning mountain views.",
            "moderate": "Triund Trek: A popular 9km day trek offering breathtaking views of the Dhauladhar range. The trail is well-marked but has some steep sections near the top.",
            "hard": "Indrahar Pass Trek: A challenging 14km trek beyond Triund that requires 2-3 days. Reaching 4,342m, you'll need good fitness and possibly a guide. Amazing views of both Kangra Valley and Chamba Valley."
        },
        "camping": {
            "easy": "Dharamkot Camping: Just 2km from McLeod Ganj, these established campsites offer tents with basic amenities, washrooms, and bonfire facilities. Perfect for families and beginners.",
            "moderate": "Triund Camping: At 2,875m, this popular camping spot requires a moderate 9km trek. Tents and basic food are available, or bring your own. The night views of stars and valley lights are unforgettable.",
            "hard": "Lahesh Cave Camping: A challenging option beyond Triund requiring a steep climb to 3,500m. This natural cave shelter requires experienced campers with proper gear for the alpine conditions."
        },
        "trekking": {
            "easy": "Dal Lake Trek: A simple 2km walk from McLeod Ganj to this small lake surrounded by deodar trees. Perfect for families and first-time trekkers.",
            "moderate": "Kareri Lake Trek: A beautiful 26km round trip trek to a glacial lake at 2,934m elevation. Typically done over 2 days with camping at the lake.",
            "hard": "Moon Peak Expedition: A serious 7-day trek reaching nearly 4,700m. Technical sections require mountaineering experience and proper equipment, with guide services recommended."
        },
        "sightseeing": {
            "easy": "Dalai Lama Temple Complex (Tsuglagkhang): The spiritual heart of Dharamshala with beautiful temples, prayer wheels, and meditation halls. Easy walking distance from McLeod Ganj.",
            "moderate": "Dharamshala Cricket Stadium: One of the world's highest cricket stadiums set against mountain backdrops. About 8km from McLeod Ganj, requiring transportation.",
            "hard": "Kangra Fort and Valley Tour: A full-day excursion 20km away exploring the ancient fort and traditional villages. Requires transportation arrangements and good mobility for exploring ruins."
        }
    },
    "shimla": {
        "hiking": {
            "easy": "Jakhu Hill: A pleasant 2km hike from Shimla Ridge to Jakhu Temple with beautiful forest paths. Watch out for playful monkeys along the way!",
            "moderate": "Chadwick Falls Trail: A 5km trail through dense forests leading to a seasonal 100m waterfall (best during monsoon). Some steep sections make this moderately challenging.",
            "hard": "Shali Tibba Trek: An 18km challenging trek to the 2,867m peak with steep ascents and rough terrain. The summit offers panoramic views of the Himalayas and Shimla town."
        },
        "camping": {
            "easy": "Naldehra Camping: Just 22km from Shimla, these established campsites in pine forests offer comfortable tents, toilets, and arranged campfire activities.",
            "moderate": "Chail Wildlife Sanctuary Camps: About 45km from Shimla with semi-permanent camps requiring some forest hiking. Offers wildlife spotting opportunities.",
            "hard": "Churdhar Peak Base Camp: Located at high elevation requiring a challenging approach trek. Minimal facilities mean you need proper equipment and experience."
        },
        "trekking": {
            "easy": "Glen Nature Walk: A 4km loop through forests with well-maintained paths and beautiful flora. Perfect for families and beginners.",
            "moderate": "Mashobra to Craignano Trail: A 12km trek through forests and apple orchards with some elevation changes. Takes about 5-6 hours round trip.",
            "hard": "Hatu Peak Trek: A challenging 20km trek reaching 3,400m with steep sections. Usually done over 2 days with tremendous views of the greater Himalayan ranges."
        },
        "sightseeing": {
            "easy": "The Ridge and Mall Road: The heart of Shimla with colonial architecture, shops, and cafes. Easy walking with many attractions in close proximity.",
            "moderate": "Kufri Adventure Park: 13km from Shimla city center with adventure activities and views. Requires transportation and moderate walking.",
            "hard": "Tattapani Hot Springs and Suketi Fossil Park Tour: A full-day journey 50km from Shimla combining geothermal springs and paleontological sites. Requires good planning and transportation."
        }
    },
    "manali": {
        "hiking": {
            "easy": "Solang Valley Nature Trail: A gentle 3km walk through meadows with mountain views. Suitable for all fitness levels with minimal elevation gain.",
            "moderate": "Jogini Waterfall Trek: A 5km round trip from Vashisht with some steep sections and stream crossings to reach beautiful multi-tiered falls.",
            "hard": "Beas Kund Trek: A challenging 18km trek to the glacial lake source of River Beas at 3,700m. Requires acclimatization and good fitness levels."
        },
        "camping": {
            "easy": "Solang Valley Camps: Established campsites with full facilities including washrooms, electricity, and organized activities. Accessible by road.",
            "moderate": "Hamta Valley Camping: These camps at 3,000m require a moderate 6km trek from the road head. Basic amenities with incredible valley views.",
            "hard": "Bhrigu Lake Base Camp: Located at 3,500m after a challenging trek, requiring proper high-altitude camping gear and experience. Stunning alpine landscape."
        },
        "trekking": {
            "easy": "Old Manali Heritage Walk: A 4km cultural trek through ancient villages with traditional architecture and apple orchards.",
            "moderate": "Lama Dugh Meadows: A beautiful day trek of 12km round trip reaching scenic high meadows at 3,300m. Some steep sections but well-marked paths.",
            "hard": "Hamta Pass Trek: A classic 5-day trek crossing from Kullu Valley to Spiti Valley at 4,270m. Requires guides, permits and high-altitude experience."
        },
        "sightseeing": {
            "easy": "Hadimba Temple and Manu Temple: Ancient wooden temples within Manali town showcasing traditional Himalayan architecture.",
            "moderate": "Rohtang Pass (by vehicle): A half-day excursion to 3,980m with snow views (May-Nov). Permits required and some walking on snowy terrain.",
            "hard": "Chandratal Lake Expedition: A full-day journey crossing Rohtang Pass to reach this crescent-shaped high-altitude lake in Spiti. Permits and 4x4 vehicle required."
        }
    },
    "rishikesh": {
        "hiking": {
            "easy": "Neer Gaddu Waterfall Trail: A pleasant 2km hike along a forested path to a refreshing waterfall. Perfect for families with children.",
            "moderate": "Kunjapuri Temple Trail: An 8km trek with 800m elevation gain leading to a temple with sunrise views of the Himalayas.",
            "hard": "Chandrashila Peak Trek: A challenging 22km trek reaching 4,000m with steep ascents. Usually done over 2-3 days with tremendous Himalayan panorama."
        },
        "camping": {
            "easy": "Beach Camps at Shivpuri: Comfortable riverside camps with attached bathrooms, organized activities, and easy road access just 16km from Rishikesh.",
            "moderate": "Byasi Jungle Camps: Located 30km from Rishikesh requiring some hiking through forests. Basic facilities with wildlife spotting opportunities.",
            "hard": "Chopta Base Camp: High-altitude camping at 2,700m with minimal facilities. Requires proper gear and preparation for colder temperatures."
        },
        "trekking": {
            "easy": "Beatles Ashram Trail: A 3km cultural walk exploring the abandoned ashram where the Beatles once stayed, with interesting graffiti and ruins.",
            "moderate": "Neelkanth Mahadev Temple Trek: A 12km forest trek with 600m elevation gain leading to an important Shiva temple.",
            "hard": "Valley of Flowers Trek: A multi-day 40km trek to the UNESCO World Heritage site known for its alpine meadows and flowers. Season-dependent (Jul-Sep)."
        },
        "sightseeing": {
            "easy": "Laxman Jhula and Ram Jhula: Iconic suspension bridges with nearby temples and markets. Easy walking with many cafes.",
            "moderate": "Vashishta Cave and Ganga Aarti: Requires some walking to reach the meditation cave and evening ceremony spots along different ghats.",
            "hard": "Rajaji National Park Safari: 20km from Rishikesh with jeep safaris requiring early starts and full-day commitment. Elephants, tigers and diverse wildlife."
        }
    },
    "ladakh": {
        "hiking": {
            "easy": "Shanti Stupa Trail: A 3km walk from Leh main market with stone steps leading to panoramic views of Leh city. Allow time to acclimatize first.",
            "moderate": "Hemis Monastery Loop: A 7km trail through dramatic landscapes connecting ancient Buddhist sites with moderate elevation changes.",
            "hard": "Stok Kangri Base Camp: A challenging 12km hike to 4,900m requiring proper acclimatization. The base camp offers spectacular views of the Stok range."
        },
        "camping": {
            "easy": "Pangong Tso Lake Camps: Established camps with basic amenities at this famous blue lake at 4,350m. Accessible by vehicle but requires acclimatization.",
            "moderate": "Nubra Valley Desert Camps: Located among sand dunes at 3,000m between mountain ranges. Double-humped camels nearby but limited facilities.",
            "hard": "Markha Valley Wilderness Camping: Remote camping during this multi-day trek requires carrying supplies and dealing with river crossings and high passes."
        },
        "trekking": {
            "easy": "Sham Valley Culture Trek: Known as the 'Baby Trek', this 3-day route connects traditional villages with comfortable homestays and moderate walking days.",
            "moderate": "Markha Valley Trek: A popular 8-day journey through remote villages and high passes reaching 5,200m. Requires good fitness and acclimatization.",
            "hard": "Chadar Winter Trek: The legendary frozen river trek on the Zanskar River. Extreme conditions (-30°C) require specialized gear and mental preparation. Only possible in winter (Jan-Feb)."
        },
        "sightseeing": {
            "easy": "Leh Palace and Old Town: Historic structures within walking distance in Leh with Tibetan architectural influences. Take it slow due to altitude.",
            "moderate": "Magnetic Hill and Confluence Tours: Day trips from Leh to natural phenomena and meeting points of Indus and Zanskar rivers. Requires vehicle.",
            "hard": "Tso Moriri Lake Expedition: Remote high-altitude lake requiring permits, 4x4 vehicle, and multiple days due to distance and acclimatization needs."
        }
    }
};

// Popular locations in India for adventures
const popularLocations = [
    "Dharamshala", "Shimla", "Manali", "Rishikesh", "Ladakh",
    "Munnar", "Coorg", "Andaman Islands", "Goa", "Darjeeling"
];

// Add comprehensive Indian locations database
const indianLocations = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Bomdila", "Ziro", "Pasighat"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Raigarh", "Jagdalpur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
    "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Dalhousie", "McLeod Ganj"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Malappuram", "Munnar"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Khajuraho"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh", "Williamnagar", "Baghmara"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Lawngtlai"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner", "Pushkar"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Ravangla", "Pelling"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Ooty"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Ambassa"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Allahabad", "Mathura"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Almora"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling"],
    "Delhi": ["New Delhi", "Delhi", "Noida", "Gurgaon", "Faridabad"]
};

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `p-2 rounded-lg chat-message ${sender === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-gray-900 mr-auto'} max-w-xs`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAdventureSuggestion(location, activity, level) {
    const normalizedLocation = location.toLowerCase().trim();
    if (indiaAdventureSpots[normalizedLocation]) {
        if (indiaAdventureSpots[normalizedLocation][activity] && 
            indiaAdventureSpots[normalizedLocation][activity][level]) {
            return indiaAdventureSpots[normalizedLocation][activity][level];
        } else {
            return `I don't have specific ${activity} suggestions for ${location} at ${level} difficulty level. Try another activity or location!`;
        }
    } else {
        return `I don't have information about ${location} yet. Try one of these popular locations: Dharamshala, Shimla, Manali, Rishikesh, or Ladakh.`;
    }
}

function setupLocationSearch() {
    const input = document.getElementById('userInput');
    const datalist = document.createElement('datalist');
    datalist.id = 'indian-locations';
    input.setAttribute('list', 'indian-locations');
    
    for (const state in indianLocations) {
        const stateOption = document.createElement('option');
        stateOption.value = state;
        datalist.appendChild(stateOption);
        
        indianLocations[state].forEach(city => {
            const cityOption = document.createElement('option');
            cityOption.value = `${city}, ${state}`;
            datalist.appendChild(cityOption);
        });
    }
    
    document.body.appendChild(datalist);
}

let currentMap = null;

function initializeMap(coordinates) {
    if (currentMap) {
        currentMap.remove();
    }
    
    const mapDiv = document.getElementById('map');
    currentMap = L.map('map').setView([coordinates.lat, coordinates.lon], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(currentMap);
    
    return currentMap;
}

function addMarkerToMap(map, place, activityType) {
    if (!place.lat || !place.lon) return;
    
    const marker = L.marker([place.lat, place.lon]).addTo(map);
    const popupContent = `
        <strong>${place.tags.name || 'Unnamed Location'}</strong><br>
        ${place.tags.tourism || place.tags.natural || 'Adventure Spot'}<br>
        ${place.tags.description || ''}
    `;
    marker.bindPopup(popupContent);
}

async function searchNearbyPlaces(location, activityType) {
    try {
        let searchLocation = location;
        let state = '';
        if (location.includes(',')) {
            [searchLocation, state] = location.split(',').map(s => s.trim());
        }

        const searchQuery = state ? 
            `${searchLocation}, ${state}, India` : 
            `${searchLocation}, India`;

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const geocodeResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?` + 
            `format=json&` +
            `q=${encodeURIComponent(searchQuery)}&` +
            `countrycodes=in&` +
            `limit=1`
        );

        const geocodeData = await geocodeResponse.json();

        if (!geocodeData || geocodeData.length === 0) {
            throw new Error('Location not found in India');
        }

        const lat = parseFloat(geocodeData[0].lat);
        const lon = parseFloat(geocodeData[0].lon);

        const searchCategories = {
            'hiking': [
                'node["tourism"="attraction"]["importance"~"national|international"]',
                'way["tourism"="attraction"]["importance"~"national|international"]',
                'node["natural"="peak"]["name"]',
                'way["natural"="peak"]["name"]',
                'node["leisure"="park"]["name"]',
                'way["leisure"="park"]["name"]',
                'node["tourism"="viewpoint"]["name"]',
                'way["tourism"="viewpoint"]["name"]'
            ],
            'camping': [
                'node["tourism"="camp_site"]["stars"]',
                'way["tourism"="camp_site"]["stars"]',
                'node["tourism"="camp_site"]["name"]',
                'way["tourism"="camp_site"]["name"]',
                'node["tourism"="resort"]["camp_site"="yes"]',
                'way["tourism"="resort"]["camp_site"="yes"]'
            ],
            'trekking': [
                'node["route"="hiking"]["importance"~"national|international"]',
                'way["route"="hiking"]["importance"~"national|international"]',
                'node["natural"="peak"]["name"]',
                'way["natural"="peak"]["name"]',
                'node["tourism"="trail"]["name"]',
                'way["tourism"="trail"]["name"]'
            ],
            'sightseeing': [
                'node["historic"="monument"]["wikidata"]',
                'way["historic"="monument"]["wikidata"]',
                'node["tourism"="attraction"]["wikidata"]',
                'way["tourism"="attraction"]["wikidata"]',
                'node["historic"="temple"]["wikidata"]',
                'way["historic"="temple"]["wikidata"]',
                'node["tourism"="viewpoint"]["name"]',
                'way["tourism"="viewpoint"]["name"]',
                'node["natural"="peak"]["name"]',
                'way["natural"="peak"]["name"]'
            ]
        };

        const query = `
            [out:json][timeout:60];
            (
                ${searchCategories[activityType].map(category => 
                    `${category}(around:25000,${lat},${lon});`
                ).join('\n')}
            );
            out body;
            >;
            out skel qt;
        `;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Overpass API');
        }

        const data = await response.json();

        if (!data || !data.elements || data.elements.length === 0) {
            throw new Error('No places found');
        }

        const places = data.elements
            .filter(place => {
                return place.tags && 
                       place.tags.name &&
                       !place.tags.name.toLowerCase().includes('private') &&
                       !place.tags.name.toLowerCase().includes('residential');
            })
            .sort((a, b) => {
                const getScore = (place) => {
                    let score = 0;
                    if (place.tags.name) score += 1;
                    if (place.tags.wikidata) score += 5;
                    if (place.tags.wikipedia) score += 5;
                    if (place.tags.importance === 'international') score += 10;
                    if (place.tags.importance === 'national') score += 8;
                    if (place.tags.stars) score += parseInt(place.tags.stars) || 0;
                    if (place.tags.historic === 'monument') score += 4;
                    if (place.tags.historic === 'temple') score += 4;
                    if (place.tags.natural === 'peak') score += 3;
                    if (place.tags.tourism === 'attraction') score += 3;
                    if (place.tags.description) score += 2;
                    return score;
                };
                return getScore(b) - getScore(a);
            })
            .slice(0, 2);

        if (places.length === 0) {
            throw new Error('No suitable places found');
        }

        const enhancedPlaces = places.map(place => {
            if (place.tags.wikidata) {
                place.tags.description = place.tags.description || "A popular tourist destination";
            }
            return place;
        });

        return {
            places: enhancedPlaces,
            coordinates: { lat, lon }
        };

    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

async function suggestActivities() {
    let userLocation = userInput.value.trim();
    if (!userLocation) {
        addMessage("Please enter a location in India first!", 'bot');
        return;
    }
    
    const selectedActivity = activityType.value;
    const selectedDifficulty = difficulty.value;
    
    addMessage(`Looking for popular ${selectedActivity} spots in ${userLocation}...`, 'user');
    userInput.value = '';

    document.getElementById('loading').style.display = 'block';

    try {
        const result = await searchNearbyPlaces(userLocation, selectedActivity);
        
        if (result && result.places && result.places.length > 0) {
            const map = initializeMap(result.coordinates);
            
            let response = `Here are the top ${result.places.length} ${selectedActivity} spots in ${userLocation}:\n\n`;
            
            result.places.forEach((place, index) => {
                const name = place.tags.name;
                const type = place.tags.tourism || place.tags.natural || place.tags.historic || 'Adventure Spot';
                
                response += `${index + 1}. ${name}\n`;
                response += `   Type: ${type}\n`;
                if (place.tags.description) {
                    response += `   ${place.tags.description}\n`;
                }
                if (place.tags.stars) {
                    response += `   Rating: ${place.tags.stars} stars\n`;
                }
                response += '\n';
                
                addMarkerToMap(map, place, selectedActivity);
            });
            
            addMessage(response, 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage(`Sorry, I couldn't find any popular ${selectedActivity} spots in ${userLocation}. Please try another location or activity.`, 'bot');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function suggestLocations() {
    const randomLocations = [];
    const availableLocations = Object.keys(indiaAdventureSpots).map(loc => loc.charAt(0).toUpperCase() + loc.slice(1));
    
    while (randomLocations.length < 3 && availableLocations.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableLocations.length);
        randomLocations.push(availableLocations[randomIndex]);
        availableLocations.splice(randomIndex, 1);
    }
    
    addMessage(`Try these popular adventure destinations: ${randomLocations.join(', ')}`, 'bot');
}

sendBtn.addEventListener('click', suggestActivities);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') suggestActivities();
});

suggestLocationBtn.addEventListener('click', suggestLocations);

window.addEventListener('DOMContentLoaded', () => {
    setupLocationSearch();
    addMessage("Welcome to the Indian Adventure Planner! Enter a location in India and I'll suggest real activities for you.", 'bot');
    addMessage("Try searching for any city or state in India!", 'bot');
});
