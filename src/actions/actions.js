
//These are action creators.
// these make the things that will be dispatched out.
export function addItem(item){
  return {
    type: 'ADD_ITEM',
    item
  }
}

export function deleteItem(itemId){
  return {
    type: 'DELETE_ITEM',
    itemId
  }
}

export function cloneManifest(manifestId){
  let headers = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify({
      manifestId
    })
  }


  return (dispatch) => {
    fetch('http://localhost:3001/api/v1/cloneManifest',headers)
    .then(
      //
    )
  }
}

export function sendDeleteRequest(itemId){

  let url = `http://localhost:3001/api/v1/items/${itemId}`
  let headers = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    },
    body: JSON.stringify({
      itemId
    })
  }

  return (dispatch) => {
    fetch(url, headers)
    .then( (res) => {
        dispatch(deleteItem(itemId))
        return res
    }).then (
      (res)=> res.json()
    )
  }
}

export function saveCollections(){
  return {
    type: 'SAVE_COLLECTION'
  }
}

export function addManifest(manifest){
  return {
    type: 'ADD_MANIFEST',
    manifest
  }
}

export function loadInitialManifest(manifests){
  return {
    type: 'GET_MANIFEST',
    manifests
  }
}

export function onChangeNewManifest(manifestFormData){
  return {
    type: 'CHANGE_MANIFEST',
    manifestFormData
  }
}

export function setCollection(){
  return {
    type:'SET_COLLECTION'
  }
}

export function saveItem(item){
  return (dispatch) => {
    fetch()
  }
}

export function itemsFetchData(url) {
    return (dispatch) => {
        // dispatch(itemsIsLoading(true));
        fetch(url)
            .then((response) => {
                // if (!response.ok) {
                //     throw Error(response.statusText);
                // }
                // dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => items)
            // .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function itemsPostData(url, item) {
  return (dispatch) => {
    let headers = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
      item: item
      })
    }
    fetch(url, headers)
    .then((response) => {
      return response
    })
    .then((response) => response.json())
    .then((items) => items)
  };
}

export function manifestPostData(url, manifest) {

  return (dispatch) => {
    let headers = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
      manifest
      })
    }
    fetch(url, headers)
    .then((response) => {
      return response
    })
    .then((response) => response.json())
    .then( (json) => dispatch({
      type: 'ADD_MANIFEST',
      manifest: json
    }))
  };
}

export function getManifestData(url){
  return (dispatch) => {
    fetch(url)
    .then( (response) => {
      return response
    }).then((response) => response.json())
    .then( (json) => dispatch(loadInitialManifest(json)))
  }
}

export function getMyManifestData(url){
  let headers = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': localStorage.token
    }
  }
  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => {
      return response
    }).then((response) => response.json())
    .then( (json) => dispatch(loadInitialManifest(json)))
  }
}

export function loadManifestItems(url, manifestId){
  let headers = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
    manifestId
    })
  }
  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => {
      return response
    }).then((response) => response.json())
    .then( (json) => dispatch({
      type: 'GET_MANIFEST_ITEMS',
      items: json
    }))
  }
}

export function loadManifestItemPositions(url,manifestId) {

  let headers = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
    manifestId
    })
  }

  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => {
      dispatch(itemsAreLoading(true))
      return response
    }).then((response) => response.json())
    .then( (json) => dispatch({
      type: 'GET_MANIFEST_ITEM_POSITIONS',
      manifestItems: json
    })).then( () => {
      dispatch(itemsAreLoading(false))
    })
  }
}

export function saveManifestItemPosition(url,manifestItemId,itemId,x,y){
  let headers = {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
    left_position: x,
    top_position: y,
    manifestItemId: manifestItemId,
    itemId: itemId
    })
  }
  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => {
      return response
    }).then((response) => response.json())
  }
}

export function userLogin(user){
  return {type: 'USER_LOGIN', user: user}
}

export function authUser(url, {username,password}){
  let headers = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username,password
    })
  }
  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => response.json())
    .then((json) => {
      if(!json.error) {
        dispatch(userLogin(json.user))
        localStorage.setItem('token', json.token)
        return json
      } else {
        return json
      }
    })
    }

}

export function itemsAreLoading(bool) {
    return {
        type: 'ITEMS_ARE_LOADING',
        isLoading: bool
    };
}

export function addManifestItem(url,{name,description,price,brand,image}, manifestId) {
  let headers = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      manifestId,name,description,price,brand,image
    })
  }

  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => {
      dispatch(itemsAreLoading(true))
      return response
    }).then((response) => response.json())
    .then( (json)=>dispatch({type: 'ADD_MANIFEST_ITEM', item: json}))
    .then ( () => dispatch(itemsAreLoading(false)))
  }
}

export function signupUser(url, payload){
  let headers =  {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: payload.username,
        password: payload.password
      }
    })
  }
  return (dispatch) => {
    fetch(url,headers)
    .then( (response) => response.json())
    .then( (json) =>{
      dispatch(userLogin(json.user))
      localStorage.setItem('token',json.token)
      return json
    }
    )}
}

export function logoutUser(){
  return {
    type: 'USER_LOGOUT'
  }
}

export function userLoggedIn(){
  if (localStorage.token){
    let headers = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.token
      }
    }
    return (dispatch) => {
      fetch('http://localhost:3001/api/v1/authorize',headers)
      .then( (res)=>res.json())
      .then( (json) => {
        if (json.id){
          dispatch(userLogin(json))
        }
      })
    }
  } else {
    return {
      type: 'whatever'
    }
  }
}
