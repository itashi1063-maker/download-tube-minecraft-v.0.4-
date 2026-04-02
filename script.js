// روابط الأصوات من جوجل درايف
const STEVE_SOUND_URL = 'https://drive.google.com/uc?export=download&id=18LeZ09r94ttuQNvymB-FwcHHhFaQzpOe';
const BUTTON_SOUND_URL = 'https://drive.google.com/uc?export=download&id=1GTyfWJksOPYoGvrMcAy_A8DEU1O8zqPk';

const steveSound = new Audio(STEVE_SOUND_URL);
const buttonSound = new Audio(BUTTON_SOUND_URL);

const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');
const steveImg = document.querySelector('.steve-img');

const playSound = (audio) => {
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => console.log("بانتظار تفاعل المستخدم لتشغيل الصوت"));
};

// تفاعل ستيف
if (steveImg) {
    steveImg.addEventListener('click', () => {
        playSound(steveSound);
        steveImg.style.transform = 'scale(0.9)';
        setTimeout(() => steveImg.style.transform = 'scale(1)', 100);
    });
}

// معالجة التحميل
downloadBtn.addEventListener('click', async () => {
    playSound(buttonSound);
    const videoUrl = videoUrlInput.value.trim();

    if (!videoUrl) {
        statusMessage.innerText = "⚠️ لم تضع شيئاً في الفرن!";
        statusMessage.style.color = "#ff4d4d";
        return;
    }

    statusMessage.innerText = "⛏️ جاري التعدين وصهر البيانات...";
    statusMessage.style.color = "#ffd700";

    try {
        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error();
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Crafted_Data_${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        statusMessage.innerText = "✅ اكتملت الصياغة! تفقد صندوقك.";
        statusMessage.style.color = "#00ff88";
    } catch (error) {
        statusMessage.innerText = "❌ انكسرت المعولة: الرابط غير مدعوم أو محمي.";
        statusMessage.style.color = "#ff4d4d";
    }
});