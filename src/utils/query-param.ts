/**
 * @description: 获取路径参数
 * @param {*} url
 * @return {*}
 */
export function parameteUrl(url: string) {
    var json: any = {}
    if (/\?/.test(url)) {
        var urlString = url.substring(url.indexOf("?") + 1);
        var urlArray = urlString.split("&");
        for (var i = 0; i < urlArray.length; i++) {
            var urlItem = urlArray[i];
            var item = urlItem.split("=");
            // console.log(item);
            json[item[0]] = item[1];
        }
        return json;
    }
    return {};
}

// get请求从config.url获取参数，post从config.body中获取参数
export function paramObj(url:string) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    )
  }