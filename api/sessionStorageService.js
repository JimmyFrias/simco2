const SessionStorageService = (() => {
    let _service;

    function _getService() {
        if (!_service) {
            _service = this;
            return _service;
        }
        return _service;
    }

    function _setToken(tokenObj) {
        sessionStorage.setItem('auth', tokenObj.auth);
        sessionStorage.setItem('refresh', tokenObj.refresh);
    }

    function _getAccessToken() {
        return sessionStorage.getItem('auth');
    }

    function _getRefreshToken() {
        return sessionStorage.getItem('refresh');
    }

    function _clearToken() {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('refresh');
    }

    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearToken: _clearToken
    };

})();

export default SessionStorageService;