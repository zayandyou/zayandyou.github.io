let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");

const params = new URLSearchParams(window.location.search);
let username = params.get("name");

// 限制用户名长度，避免页面样式崩坏
const maxLength = 20;
const safeUsername = "乖乖";

// // 防止 `null` 变成 `"null"`
// if (username) {
//   questionText.innerText = questionText.innerText + safeUsername;
// }

let clickCount = 0; // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
  "？你认真的吗…",
  "要不再想想？",
  "不许选这个！ ",
  "我会很伤心…",
  "不行:(",
];

// No 按钮点击事件
noButton.addEventListener("click", function () {
  clickCount++;

  // 让 Yes 变大，每次放大 2 倍
  let yesSize = 1 + clickCount * 1.2;
  yesButton.style.transform = `scale(${yesSize})`;

  // 挤压 No 按钮，每次右移 50px
  let noOffset = clickCount * 50;
  noButton.style.transform = `translateX(${noOffset}px)`;

  // 让图片和文字往上移动
  let moveUp = clickCount * 25;
  mainImage.style.transform = `translateY(-${moveUp}px)`;
  questionText.style.transform = `translateY(-${moveUp}px)`;

  // No 文案变化（前 5 次变化）
  if (clickCount <= 5) {
    noButton.innerText = noTexts[clickCount - 1];
  }

  // 图片变化（前 5 次变化）
  if (clickCount === 1) {
    mainImage.src = "images/fail1.gif"; // 再次确认，期待
    questionText.innerText = "乖乖，我会一直一直对你好，只爱你一个人，做我女朋友好不好？";
  }
  if (clickCount === 2) {
        mainImage.src = "images/fail2.gif"; // 俏皮掩饰，希望成功
        questionText.innerText = "乖乖大美女，给你买好多好吃的，做我女朋友好不好？";
  }
  if (clickCount === 3) {
     mainImage.src = "images/fail3.gif"; // 委屈
     questionText.innerText = "乖乖大美女，求求你了，做我女朋友好不好？";
  }
  if (clickCount === 4) mainImage.src = "images/fail4.gif"; // 哭
  if (clickCount === 5) mainImage.src = "images/fail5.gif"; // 之后一直是哭
  if (clickCount >= 6) {
      noButton.style.display = "none";
      yesButton.innerText = "好，我答应你！";
    }
});

// Yes 按钮点击后，进入表白成功页面
const loveTest = `!!!喜欢你!! ( >᎑<)♡︎ᐝ  ${
  username ? `${safeUsername}  ♡︎ᐝ(>᎑< )` : ""
}`;

yesButton.addEventListener("click", function () {
  // 先创建基础 HTML 结构
  document.body.innerHTML = `
        <div class="yes-screen">
            <h1 class="yes-text"></h1>
            <img src="images/success.gif" alt="拥抱" class="yes-image">
        </div>
    `;

  // 确保用户名安全地插入
  document.querySelector(".yes-text").innerText = loveTest;

  // 禁止滚动，保持页面美观
  document.body.style.overflow = "hidden";
});
