import store from "@/store";
import env from "@/config/env";
// 根据id返回数组中对应id的对象---挂载全局 $getArrOnceData
export const getArrOnceData = (id, arr, key) => {
  console.log(
    id,
    arr,
    key,
    arr.find(ele => ele[key ? key : id] === id)
  );
  return arr.find(ele => ele[key ? key : id] === id);
};
// 请求列表时前端要替后端做适配，并且有点多，封装请求列表时带有搜索的接口
// request: 调用vuex的actions名   listQuery: 传递给后端的参数
// 设置需要处理为精确查询的名单
const filterList = [
  "id",
  "tradeType",
  "payStatus",
  "createTime",
  "discountPrice"
];
export const getListQp = (request, listQuery) => {
  return new Promise((resolve, reject) => {
    store
      .dispatch(
        request,
        listQuery.key
          ? {
              ...listQuery,
              [`qp-${listQuery.key}-${
                filterList.indexOf(listQuery.key) !== -1 ? "eq" : "like"
              }`]: listQuery.search
            }
          : listQuery
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getList = (request, listQuery) => {
  return new Promise((resolve, reject) => {
    store
      .dispatch(
        request,
        listQuery.key
          ? {
              ...listQuery,
              [`${listQuery.key}`]: listQuery.search
            }
          : listQuery
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 压缩图片
export function base64ToFile(base64, filename) {
  var arr = base64.split(",");
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], filename, { type: mime });
  Object.assign(file, { uid: file.lastModified });
  return file;
}

// 获取并返回图片base64字符串对象
export function getBase64Str(base64, type) {
  const arr = base64.split(",");
  const fileContents = arr[1];
  const fileSuffix = arr[0];
  return {
    fileContents,
    fileSuffix
  };
}

// 将网络地址图片转换为base64
export const imgUrlToBase64 = imgUrl => {
  let image = new Image();
  image.crossOrigin = "anonymous"; //解决跨域问题
  image.src = imgUrl;
  return new Promise(resolve => {
    image.onload = function() {
      //image.onload为异步加载
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      //这里的base64Url就是base64类型
      //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
      resolve(canvas.toDataURL("image/jpeg", 1));
    };
  });
};

// 处理浏览器地址栏地址，获取请求头domain参数
export const getWindowUrl = url => {
  const newUrl = url.includes("http://")
    ? url.replace("http://", "")
    : url.replace("https://", "");
  const str = newUrl.substring(0, newUrl.indexOf("/"));
  const result = `${url.includes("http://") ? "http://" : "https://"}${str}`;
  // 下方注释为截取.com
  // const index1 = str.lastIndexOf(".");
  // const index2 = str.lastIndexOf(".", index1 - 1);
  // const result = str.substring(index2 + 1);
  return result;
};

// 根据环境返回domain地址--后端需要请求头携带浏览器地址，字段：domain
export const getDomainUrl = () => {
  return process.env.VUE_APP_ENV === "local"
    ? env.DOMAIN_URL
    : getWindowUrl(window.location.href);
};
