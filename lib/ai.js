const axios = require('axios');
const NodeCache = require('node-cache');
const FormData = require('form-data');

// Inisialisasi cache
const myCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

const UNSPLASH_ACCESS_KEY = 'A9Qsc7evIbLezk673miXI2SUbdZ-PK2TeQhY53f8v9U'; // Ganti dengan Access Key Anda

async function aiChat(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get(text);
  if (cachedResponse) {
    console.log("Returning cached response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to AI service...`);
    const response = await axios.get('https://rest-api.aetherss.xyz/api/ai', {
      params: { prompt: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("Response received:", response.status, response.statusText);
    
    if (response.data) {
      // Simpan respons ke cache
      myCache.set(text, response.data);
      return response.data;
    } else {
      console.error("Unexpected response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiChat:", error.message);
    return fallbackResponse(text);
  }
}

async function tryAlternativeAPI(text) {
  // Implementasi untuk API alternatif
  // Contoh menggunakan OpenAI API (Anda perlu menambahkan konfigurasi API key)
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }]
  }, {
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].message.content;
}

function fallbackResponse(text) {
  const responses = {
    "hello": ["Halo! Ada yang bisa saya bantu?", "Hai there! Apa kabar?", "Selamat datang! Bagaimana saya bisa membantu Anda hari ini?"],
    "how are you": ["Saya hanya AI sederhana, tapi saya berfungsi dengan baik. Bagaimana saya bisa membantu Anda?", "Saya selalu siap membantu! Apa yang Anda butuhkan?", "Terima kasih sudah bertanya. Saya di sini untuk membantu Anda!"],
    "what's your name": ["Saya adalah asisten AI sederhana. Anda bisa memanggil saya Helper.", "Nama saya Helper, senang berkenalan dengan Anda!", "Saya adalah AI assistant, biasanya dipanggil Helper."],
    "bye": ["Selamat tinggal! Semoga hari Anda menyenangkan!", "Sampai jumpa lagi! Jangan ragu untuk kembali jika Anda membutuhkan bantuan.", "Terima kasih atas percakapannya. Semoga harimu menyenangkan!"],
  };

  const lowercaseText = text.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseText.includes(key)) {
      return value[Math.floor(Math.random() * value.length)];
    }
  }
  return "Maaf, saya tidak memiliki respons spesifik untuk itu. Ada yang lain yang bisa saya bantu?";
}

async function aiImage(text) {
  try {
    console.log(`Attempting to find image for prompt: ${text}`);
    
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: text,
        per_page: 1
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    console.log("Image search response received:", response.status, response.statusText);
    
    if (response.data && response.data.results && response.data.results.length > 0) {
      const image = response.data.results[0];
      return {
        url: image.urls.regular,
        description: image.description || image.alt_description,
        author: image.user.name,
        author_url: image.user.links.html
      };
    } else {
      console.error("No images found");
      throw new Error("No images found for the given prompt");
    }
  } catch (error) {
    console.error("Error in aiImage:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
}

async function aiBlackbox(text) {
  try {
    console.log(`Attempting to get BlackBox AI response for: ${text}`);
    const response = await axios.get('https://www.blackbox.ai/agent/AETHERzkC6dJNu', {
      params: { input: text },
      headers: { 'User-Agent': 'AETHERz/1.0' }
    });
    console.log("BlackBox AI response received:", response.status, response.statusText);
    return response.data;
  } catch (error) {
    console.error("Error in aiBlackbox:", error.message);
    throw error;
  }
}

module.exports = { aiChat, aiImage, aiBlackbox, fallbackResponse };
