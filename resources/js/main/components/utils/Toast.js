import {toast} from 'vue3-toastify';

export function showToast(content, type) {
    toast(content, {
        autoClose: 4000,
        theme: "colored",
        type: type,
        position: toast.POSITION.TOP_RIGHT,
    });
}
