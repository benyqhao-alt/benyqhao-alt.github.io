var layerGroup

function clearMap() {
    try {
        map.removeLayer(layerGroup);
    } catch(err) {
        console.log(err)
    }
}

// Initiate Button Calls
L.easyButton('<span class="material-symbols-outlined">public</span>', function (btn, map) {
    clearMap();
    fetchData('melbEthnOriginsStats', '中国居民比例（%）', '#fff', '#4a8dff')
}).addTo(map);

L.easyButton('<span class="material-symbols-outlined">local_police</span>', function (btn, map) {
    clearMap();
    fetchData('melbCrimeStats', '犯罪数（2013-2022）', '#fff', '#a70000');
}).addTo(map);

L.easyButton('<span class="material-symbols-outlined">paid</span>', function (btn, map) {
    clearMap();
    fetchData('melbMedianIncome', '每周个人收入（中位数）', '#fff', '#094f29');
}).addTo(map);

L.easyButton('<span class="material-symbols-outlined">close</span>', function (btn, map) {
    clearMap();
}).addTo(map);
