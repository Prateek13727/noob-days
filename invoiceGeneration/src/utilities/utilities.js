export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function getDataFrmLocalStorageByKey(key) {
	const persistentItems = localStorage.getItem(key);
	if(!persistentItems) {
		return [];
	} else {
		return JSON.parse(persistentItems);
	}
}