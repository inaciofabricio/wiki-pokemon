export function convertePrimeiraLetraMaiuscula(text) {
    return text.substring(0,1).toUpperCase() + text.substring(1);    
}

export function minimizaStringEspecial(string) {
    return string.replace("special","s")
}

export function limpaStringVazia(str) {
    return str.trim() !== "";
}

export function compare(a, b) {
    
    if (a.id < b.id) {
      return -1;
    }

    if (a.id > b.id) {
      return 1;
    }

    return 0;
}

export function getCache(url) {
  
  let array = url.split("/");
  let nomeBD = array[0];
  let id = parseInt(array[1]);

  let data = null;

  let bd = getBD(nomeBD);

  bd.forEach(p => {
    if(p.id === id) {
      data = p.data;
    }
  });

  return data;

}

export function setCache(url, data) {
  
  let array = url.split("/");
  let nomeBD = array[0];
  let id = parseInt(array[1]);

  let bd = getBD(nomeBD);

  let cacheData = null;

  bd.forEach(p => {
    if(p.id === id) {
      cacheData = true;
    }
  });

  if(!cacheData){
    bd.push({id, data});
    bd.sort(compare);
    localStorage.setItem(nomeBD, JSON.stringify(bd));
  }

}

function getBD(nomeBD) {
  let bd = localStorage.getItem(nomeBD);

  if(!bd) {
    localStorage.setItem(nomeBD, JSON.stringify([]));
    bd = localStorage.getItem(nomeBD);
  } 

  return JSON.parse(bd);
}
