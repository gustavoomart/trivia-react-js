const BASE_URL = "https://opentdb.com/api.php";
const TOKEN_URL = "https://opentdb.com/api_token.php?command=request";
const RESET_TOKEN_URL = (token) => `https://opentdb.com/api_token.php?command=reset&token=${token}`;
const CATEGORIES_URL = "https://opentdb.com/api_category.php";
const TOKEN_KEY = "opentdb_token";
const RATE_LIMIT_DELAY = 5000;
let categoriesCache = null;
export const DIFFICULTIES = Object.freeze({
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
});

export const QUESTION_TYPES = Object.freeze({
    MULTIPLE: "multiple",
    BOOLEAN: "boolean",
});

let lastRequestTime = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForRateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
        const waitTime = RATE_LIMIT_DELAY - timeSinceLastRequest;
        await sleep(waitTime);
    }
    
    lastRequestTime = Date.now();
}

async function makeRequest(url) {
    await waitForRateLimit();
    const response = await fetch(url);
    return response.json();
}

async function getToken() {
    let token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        const data = await makeRequest(TOKEN_URL);
        
        if (data.response_code === 0 && data.token) {
            token = data.token;
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            throw new Error("Erro ao obter token da API");
        }
    }
    
    return token;
}

async function resetToken(token) {
    const data = await makeRequest(RESET_TOKEN_URL(token));
    return data.response_code === 0;
}

export async function fetchQuestions(amount = 10, difficulty, category, type) {
    try {
        const token = await getToken();

        const params = new URLSearchParams({
            amount,
            token,
        });

        if (difficulty) params.append("difficulty", difficulty);
        if (category) params.append("category", category);
        if (type) params.append("type", type);

        const url = `${BASE_URL}?${params.toString()}`;
        const data = await makeRequest(url);

        if (data.response_code === 3) {
            localStorage.removeItem(TOKEN_KEY);
            return fetchQuestions(amount, difficulty, category, type);
        }

        if (data.response_code === 4) {
            const resetOk = await resetToken(token);
            if (resetOk) {
                return fetchQuestions(amount, difficulty, category, type);
            } else {
                throw new Error("Não foi possível resetar o token.");
            }
        }

        if (data.response_code === 5) {
            await sleep(RATE_LIMIT_DELAY);
            return fetchQuestions(amount, difficulty, category, type);
        }

        if (data.response_code !== 0) {
            throw new Error(`Erro ao buscar perguntas da API. Código: ${data.response_code}`);
        }
        return data.results;
        
    } catch (error) {
        throw error;
    }
}

export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORIES_URL);
    const data = await response.json();

    if (!data.trivia_categories) {
      throw new Error("Erro ao carregar categorias");
    }
    categoriesCache = data.trivia_categories;
    return data.trivia_categories;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
}
export async function getCategoryName(categoryId) {
  if (!categoryId) return '';
  
  try {
    const categories = await fetchCategories();
    const category = categories.find(cat => cat.id.toString() === categoryId.toString());
    return category ? category.name : `Categoria ${categoryId}`;
  } catch (error) {
    console.error('Erro ao buscar nome da categoria:', error);
    return `Categoria ${categoryId}`;
  }
}
