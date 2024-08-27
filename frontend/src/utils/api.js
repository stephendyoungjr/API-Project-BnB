

const csrfFetch = async (url, options = {}) => {

    options.method = options.method || 'GET';
  

    options.headers = options.headers || {};
  

    if (options.method.toUpperCase() !== 'GET') {
      options.headers['Content-Type'] =
        options.headers['Content-Type'] || 'application/json';
      options.headers['XSRF-TOKEN'] = sessionStorage.getItem('XSRF-TOKEN');
    }
  
  
    const res = await fetch(url, options);
  

    if (res.status >= 400) throw res;
  

    return res;
  };
  

  export const restoreCSRF = async () => {
    const res = await csrfFetch('/api/csrf/restore');
    const csrfToken = await res.json();
    sessionStorage.setItem('XSRF-TOKEN', csrfToken['XSRF-Token']);
  };
  
  export default csrfFetch;
  