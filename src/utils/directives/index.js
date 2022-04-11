import Vue from "vue";
import store from "@/store";

function findInput(el) {
  if (el.nodeName === "INPUT") {
    return el;
  } else if (el.nodeName === "DIV") {
    return findInputRe(el);
  }
  const childrenArray = [...el.children];
  const inputIndex = childrenArray.findIndex(item => item.nodeName === "INPUT");
  if (inputIndex > -1) {
    return childrenArray[inputIndex];
  }
  // 简单处理下，如果还有无法适配的输入框，再处理
  return findInput(childrenArray[0]);
}
function findInputRe(el) {
  for (const k of [...el.children]) {
    const arr = [...k.children];
    const inputIndex = arr.findIndex(item => item.nodeName === "INPUT");
    if (inputIndex > -1) {
      return arr[inputIndex];
    } else {
      findInputRe(k);
    }
  }
}

/**
 * 在要限制的按钮上 使用 v-isclick
 * 默认200毫秒
 * 可以传数值,设置禁用的秒数 例: v-isclick="2000" (毫秒)
 * 防止用户提交时多次点击按钮,导致事件重复触发
 */
export const isclick = Vue.directive("isclick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 200);
      }
    });
  }
});

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const _toString = Object.prototype.toString;
function isPlainObject(obj) {
  return _toString.call(obj).slice(8, -1);
}
/*
 * number 输入框限制只能输入数字
 * 在需要控制输入的输入框上使用 v-number-evolution,
 * -> 可传 number字符串 v-numbe-evolutionr="1"
 * -> 可传对象 { value: Number, max: Number, min: Number }
 *            value 小数 max 最大值 min 最小值
 *  ="{ value: 0, min: 0, max: 10 }"
 *  输入框的默认值最好是undefined
 */
export const numberEvolution = Vue.directive("number-evolution", {
  inserted: function(el, { value = 0 }) {
    el = findInput(el);
    if (!el) return;
    let val = value;
    if (isPlainObject(value) === "Object") {
      val = value.value || 0;
    } else {
      val = value;
    }
    var RegStr =
      val === 0 ? `^[\\+\\-]?\\d+\\d{0,0}` : `^[\\+\\-]?\\d+\\.?\\d{0,${val}}`;
    el.addEventListener("keyup", function() {
      console.log("键盘抬起1", el.value);
      const inpValArr = el.value.match(new RegExp(RegStr, "g"));
      console.log("键盘抬起2", inpValArr);
      const inpVal =
        inpValArr && Array.isArray(inpValArr)
          ? inpValArr[inpValArr.length - 1]
          : "";
      el.value = inpVal;
      el.dispatchEvent(new Event("input"));
    });
    el.addEventListener("blur", function() {
      const inpValArr = el.value.match(new RegExp(RegStr, "g"));
      let inpVal =
        inpValArr && Array.isArray(inpValArr)
          ? inpValArr[inpValArr.length - 1]
          : "";
      if (isPlainObject(value) === "Object") {
        if (Array.isArray(inpValArr)) {
          inpVal = Math.abs(inpVal);
          // const max = Object.keys(binding.modifiers)[0]
          // const min = Object.keys(binding.modifiers)[0]
          console.log("当前的最大值是", value.max);
          console.log("当前的最小值是", value);
          if (hasOwn(value, "max")) {
            const max = value.max;
            inpVal = inpVal > max ? max : inpVal;
          }
          if (hasOwn(value, "min")) {
            const min = value.min;
            inpVal = inpVal < min ? min : inpVal;
          }
          if (value.type === "price" && inpVal === 0) {
            inpVal = 1;
          }
        }
      }

      el.value = inpVal;
      el.dispatchEvent(new Event("input"));
    });
  }
});

/*
 * role-input 输入框限制只能输入英文字母、数字、下划线 _、横线 -
 * 在需要控制输入的输入框上使用 v-role-input
 */
export const roleInput = Vue.directive("role-input", {
  inserted: function(el) {
    el = findInput(el);
    if (!el) return;
    el.addEventListener("keyup", function() {
      const newVal = el.value.replace(/[^a-zA-Z0-9_-]/g, "");
      el.value = newVal;
      el.dispatchEvent(new Event("input"));
    });
    el.addEventListener("blur", function() {
      const newVal = el.value.replace(/[^a-zA-Z0-9_-]/g, "");
      el.value = newVal;
      el.dispatchEvent(new Event("input"));
    });
  }
});


/*
 * password-input 输入框限制只能输入英文字母、数字、还有指定特殊字符
 * 在需要控制输入的输入框上使用 v-password-input
 */
export const passwordInput = Vue.directive("password-input", {
  inserted: function(el) {
    el = findInput(el);
    if (!el) return;
    el.addEventListener("keyup", function() {
      const newVal = el.value.replace(/[^a-zA-Z0-9,-._=+!#$%*()<>?:""''@]/g, "");
      el.value = newVal;
      el.dispatchEvent(new Event("input"));
    });
    el.addEventListener("blur", function() {
      const newVal = el.value.replace(/[^a-zA-Z0-9,.-_=+!#$%*()<>?:""''@]/g, "");
      el.value = newVal;
      el.dispatchEvent(new Event("input"));
    });
  }
});

/**
 * 按钮权限控制指令
 * 可传递单个权限或对个权限-并且必须拥有所传递的权限，如果传递了多个，有一个没满足，还是没权限（全部匹配）
 * v-permission=''  或  v-permission='[]'
 * 多个权限的话，只需要任意一个权限符合即可正常展示（任一匹配）
 * v-permission.or=''  或  v-permission.or='[]'
 */
export const permission = Vue.directive("permission", {
  inserted: function(el, binding) {
    // 得到指令的绑定值，此值为js计算完成后的值,当前为需要的权限
    const { value, modifiers } = binding;
    const perms = store.state.user.perms;
    const routeMetaPrem = store.state.setting.routeMetaPrem;
    const routePermObj = perms.find(
      ele => ele.code.replace(":*", "") === routeMetaPrem
    );
    const routePermActions =
      routePermObj !== undefined ? routePermObj.actions : "";
    // console.log(el, value, modifiers, perms, routeMetaPrem);
    console.log(value, routePermActions);
    // 如果是所有权限的话，直接放行，*代表所有权限
    // 不是所有权限则继续进行判断
    if (
      routePermActions.indexOf("*") === -1 &&
      routePermActions.indexOf(value) === -1
    ) {
      //如果没有权限则直接删除此节点
      // el.parentNode && el.parentNode.removeChild(el);
    }
  }
});

