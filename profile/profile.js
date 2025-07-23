const greetingElement = document.getElementById("Greeting");
const greetings = [
    "春风得意马蹄疾，一日看尽长安花。",
    "月落乌啼霜满天，夜深人静心更安。",
    "山高水长心自远，岁月静好笑风尘。",
    "星辰大海皆过客，唯愿与你共长天。",
    "白云苍狗皆过往，何若笑看人生路。",
    "花开半夏，岁月静好，现世安稳，现世安稳。",
    "人生得意须尽欢，莫使金樽空对月。",
];
const randomIndex = Math.floor(Math.random() * greetings.length);
greetingElement.textContent = greetings[randomIndex];
