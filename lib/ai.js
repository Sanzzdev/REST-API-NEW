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
  return "Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi nanti.";
}


async function aiBlackbox(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('blackbox:' + text);
  if (cachedResponse) {
    console.log("Returning cached BlackBox response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to BlackBox AI service...`);
    const response = await axios.get('https://widipe.com/blackbox', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("BlackBox response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('blackbox:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected BlackBox response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiBlackbox:", error.message);
    return fallbackResponse(text);
  }
}

async function gpt4(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('blackbox:' + text);
  if (cachedResponse) {
    console.log("Returning cached BlackBox response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to GPT4 AI service...`);
    const response = await axios.get('https://widipe.com/gpt4', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("GPT4 response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('gpt4:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected BlackBox response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in gpt4:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK SIMI //

async function aiSimi(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('aiSimi:' + text);
  if (cachedResponse) {
    console.log("Returning cached SIMI response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to SIMI AI service...`);
    const response = await axios.get('https://widipe.com/simi', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("SIMI response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('simi:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected Simi response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiSimi:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK BARD //

async function aiBard(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('aiBard:' + text);
  if (cachedResponse) {
    console.log("Returning cached BARD response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to BARD AI service...`);
    const response = await axios.get('https://widipe.com/bard', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("BARD response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('bard:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected BARD response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiBard:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK BARD IMAGE //

async function aiBardImage(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('aiBardImage:' + text);
  if (cachedResponse) {
    console.log("Returning cached BARD response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to BARD IMAGE AI service...`);
    const response = await axios.get('https://widipe.com/bardimg', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("BARD IMAGE response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('bardimage:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected BARD response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiBardImage:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK BING //

async function aiBing(text) {
  // Cek cache terlebih dahulu
  const cachedResponse = myCache.get('aiBing:' + text);
  if (cachedResponse) {
    console.log("Returning cached BING response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to BING AI service...`);
    const response = await axios.get('https://widipe.com/bing', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("BING response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.result) {
      // Bersihkan respons dari prefix yang tidak diinginkan
      let cleanedResponse = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      
      // Simpan respons yang sudah dibersihkan ke cache
      myCache.set('bing:' + text, cleanedResponse);
      return cleanedResponse;
    } else {
      console.error("Unexpected BING response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiBing:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK DALLE //

async function aiDalle(text) {
  const cachedResponse = myCache.get('aiDalle:' + text);
  if (cachedResponse) {
    console.log("Returning cached DALLE response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to DALLE AI service...`);
    const response = await axios.get('https://widipe.com/dalle', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("DALLE response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    let imageUrl;
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'string') {
        imageUrl = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      } else if (Array.isArray(response.data.result) && response.data.result.length > 0) {
        imageUrl = response.data.result[0];
      } else {
        console.error("Unexpected DALLE response structure:", JSON.stringify(response.data));
        return fallbackResponse(text);
      }
      
      myCache.set('dalle:' + text, imageUrl);
      return imageUrl;
    } else {
      console.error("Unexpected DALLE response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiDalle:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK TOANIME //

async function aiToAnime(text) {
  const cachedResponse = myCache.get('aiToAnime:' + text);
  if (cachedResponse) {
    console.log("Returning cached TOANIME response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to TOANIME AI service...`);
    const response = await axios.get('https://widipe.com/toanime', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("TOANIME response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    let imageUrl;
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'string') {
        imageUrl = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      } else if (Array.isArray(response.data.result) && response.data.result.length > 0) {
        imageUrl = response.data.result[0];
      } else {
        console.error("Unexpected TOANIME response structure:", JSON.stringify(response.data));
        return fallbackResponse(text);
      }
      
      myCache.set('toanime:' + text, imageUrl);
      return imageUrl;
    } else {
      console.error("Unexpected TOANIME response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiToAnime:", error.message);
    return fallbackResponse(text);
  }
}

// LIBRARY AI UNTUK BING IMAGE //

async function aiBingImage(text) {
  const cachedResponse = myCache.get('aiBingImage:' + text);
  if (cachedResponse) {
    console.log("Returning cached BING IMAGE response");
    return cachedResponse;
  }

  try {
    console.log(`Attempting to connect to BING IMAGE AI service...`);
    const response = await axios.get('https://widipe.com/bingimg', {
      params: { text: text },
      headers: {
        'User-Agent': 'AETHERz/1.0',
      },
      timeout: 30000
    });

    console.log("BING IMAGE response received:", response.status, response.statusText);
    console.log("Full response data:", JSON.stringify(response.data, null, 2));
    
    let imageUrl;
    if (response.data && response.data.result) {
      if (typeof response.data.result === 'string') {
        imageUrl = response.data.result.replace(/^\$@\$v=undefined-rv1\$@\$/, '').trim();
      } else if (Array.isArray(response.data.result) && response.data.result.length > 0) {
        imageUrl = response.data.result[0];
      } else {
        console.error("Unexpected BING IMAGE response structure:", JSON.stringify(response.data));
        return fallbackResponse(text);
      }
      
      myCache.set('bingimage:' + text, imageUrl);
      return imageUrl;
    } else {
      console.error("Unexpected BING IMAGE response structure:", JSON.stringify(response.data));
      return fallbackResponse(text);
    }
  } catch (error) {
    console.error("Error in aiBingImage:", error.message);
    return fallbackResponse(text);
  }
}

module.exports = { 
  aiChat,
  aiBardImage,
  aiBingImage,
  aiDalle,
  aiToAnime,
  aiBing,
  aiBard,
  aiSimi,
  gpt4,
  aiBlackbox,
  fallbackResponse
};
