

function setLocalStorage(value={}, key='aiqo') {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key='aiqo') {
    return JSON.parse(localStorage.getItem(key));
}

function removeLocalStorage(key='aiqo') {
    localStorage.removeItem(key);
}

export function invalidateJWTSession(self) {
    console.log("invalidateJWTSession");
    removeLocalStorage();
    self.$store.commit('setSessionActive', { flag: false });
    self.$store.commit('setCurrentUserData', {});
    self.$router.push("/login");
}

export function isSessionActive() {
    let authData = getLocalStorage();
    console.log("isSessionActive: ", !!(authData && authData.access_token && authData.refresh_token));
    return !!(authData && authData.access_token && authData.refresh_token);
}

export function fetchLoggedInUserData() {
    let authData = getLocalStorage();
    console.log("fetchLoggedInUserData: ", !!(authData && authData.access_token && authData.refresh_token));
    return ((authData && authData.access_token && authData.refresh_token) ? authData.userdata : {})
}

export let defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const appendAccessTokenHeader = ((header = defaultHeaders)=> {
    if(localStorage.hasOwnProperty('blinkpad')){
        let data = JSON.parse(localStorage.getItem('blinkpad'));
        console.log('data:' , data);
        header = {
            ...header,
            'Authorization': "Bearer " + data.access_token
        };
    }
    console.log('[appendAccessTokenHeader] defaultHeaders: ', header);
    return header
});

const appendRefreshTokenHeader = ((header = defaultHeaders)=> {
    if(localStorage.hasOwnProperty('aiqo')){
        let data = JSON.parse(localStorage.getItem('aiqo'));
        header = {
            ...header,
            'Authorization': "Bearer " + data.refresh_token
        };
    }
    console.log('[appendRefreshTokenHeader] defaultHeaders: ', header);
    return header
});

export const refreshToken = (self, callback, header) =>
  this.$http.post("/api/auth/refresh",{
        method: 'POST',
        headers: appendRefreshTokenHeader(header)
    }).then((res) => {
        console.log("Access Token Expired. Acquiring new access token with refresh token");
        if(res.status===200){
            res.json().then((token_data)=>{
                console.log('before localStorage: ', getLocalStorage());
                console.log('token_data : ', token_data);
                let local_storage_data = getLocalStorage();
                local_storage_data = {
                    ...local_storage_data,
                    'access_token': token_data.access_token,
                    'refresh_token': token_data.refresh_token
                };

                setLocalStorage(local_storage_data);
                console.log('after localStorage: ', getLocalStorage());
                callback(true);
            });
        }
        else {
            self.$store.commit('setSessionActive', { flag: false });
            invalidateJWTSession(self);
            callback(false);
        }
    }).catch((err) => {
        console.log("Error while accessing new access token with refresh token: " + err);
        return err;
    });
