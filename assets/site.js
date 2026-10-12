(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "").toLowerCase().indexOf("zh") === 0 ? "zh" : "en");
  function apply(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "zh" ? "zh" : "en");
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  apply(lang);
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".lang-toggle");
    if (btn) btn.addEventListener("click", function () {
      apply(root.getAttribute("data-lang") === "zh" ? "en" : "zh");
    });
    document.querySelectorAll("main pre").forEach(function (pre) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "copy";
      b.innerHTML = '<span lang="zh">复制</span><span lang="en">Copy</span>';
      b.addEventListener("click", function () {
        var text = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          b.classList.add("done");
          setTimeout(function () { b.classList.remove("done"); }, 1200);
        });
      });
      pre.appendChild(b);
    });
  });
})();
