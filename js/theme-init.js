/* 画面がちらつかないように、保存済みの「ダーク／ライト」を先に反映します。
   ふだんは編集しません。 */
(function () {
  try {
    var t = localStorage.getItem("rw-theme");
    if (t === "dark" || t === "light") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) { /* 保存できない環境では、何もしません */ }
})();
